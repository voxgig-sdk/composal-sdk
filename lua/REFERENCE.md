# Composal Lua SDK Reference

Complete API reference for the Composal Lua SDK.


## ComposalSDK

### Constructor

```lua
local sdk = require("composal_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Agent(data)`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentAttachment(data)`

Create a new `AgentAttachment` entity instance. Pass `nil` for no initial data.

#### `AgentAutomation(data)`

Create a new `AgentAutomation` entity instance. Pass `nil` for no initial data.

#### `AgentAvatar(data)`

Create a new `AgentAvatar` entity instance. Pass `nil` for no initial data.

#### `AgentCommand(data)`

Create a new `AgentCommand` entity instance. Pass `nil` for no initial data.

#### `AgentComputer(data)`

Create a new `AgentComputer` entity instance. Pass `nil` for no initial data.

#### `AgentConnection(data)`

Create a new `AgentConnection` entity instance. Pass `nil` for no initial data.

#### `AgentControlFlow(data)`

Create a new `AgentControlFlow` entity instance. Pass `nil` for no initial data.

#### `AgentCoordination(data)`

Create a new `AgentCoordination` entity instance. Pass `nil` for no initial data.

#### `AgentEmail(data)`

Create a new `AgentEmail` entity instance. Pass `nil` for no initial data.

#### `AgentFile(data)`

Create a new `AgentFile` entity instance. Pass `nil` for no initial data.

#### `AgentInput(data)`

Create a new `AgentInput` entity instance. Pass `nil` for no initial data.

#### `AgentIntegration(data)`

Create a new `AgentIntegration` entity instance. Pass `nil` for no initial data.

#### `AgentInteraction(data)`

Create a new `AgentInteraction` entity instance. Pass `nil` for no initial data.

#### `AgentLibrary(data)`

Create a new `AgentLibrary` entity instance. Pass `nil` for no initial data.

#### `AgentManager(data)`

Create a new `AgentManager` entity instance. Pass `nil` for no initial data.

#### `AgentManagerChoice(data)`

Create a new `AgentManagerChoice` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplace(data)`

Create a new `AgentMarketplace` entity instance. Pass `nil` for no initial data.

#### `AgentMarketplaceShared(data)`

Create a new `AgentMarketplaceShared` entity instance. Pass `nil` for no initial data.

#### `AgentMissionControl(data)`

Create a new `AgentMissionControl` entity instance. Pass `nil` for no initial data.

#### `AgentOperation(data)`

Create a new `AgentOperation` entity instance. Pass `nil` for no initial data.

#### `AgentProvisioning(data)`

Create a new `AgentProvisioning` entity instance. Pass `nil` for no initial data.

#### `AgentPullRequest(data)`

Create a new `AgentPullRequest` entity instance. Pass `nil` for no initial data.

#### `AgentQuestion(data)`

Create a new `AgentQuestion` entity instance. Pass `nil` for no initial data.

#### `AgentRepository(data)`

Create a new `AgentRepository` entity instance. Pass `nil` for no initial data.

#### `AgentResource(data)`

Create a new `AgentResource` entity instance. Pass `nil` for no initial data.

#### `AgentRoutine(data)`

Create a new `AgentRoutine` entity instance. Pass `nil` for no initial data.

#### `AgentRun(data)`

Create a new `AgentRun` entity instance. Pass `nil` for no initial data.

#### `AgentRuntime(data)`

Create a new `AgentRuntime` entity instance. Pass `nil` for no initial data.

#### `AgentSetting(data)`

Create a new `AgentSetting` entity instance. Pass `nil` for no initial data.

#### `AgentSharing(data)`

Create a new `AgentSharing` entity instance. Pass `nil` for no initial data.

#### `AgentSite(data)`

Create a new `AgentSite` entity instance. Pass `nil` for no initial data.

#### `AgentSkill(data)`

Create a new `AgentSkill` entity instance. Pass `nil` for no initial data.

#### `AgentSlack(data)`

Create a new `AgentSlack` entity instance. Pass `nil` for no initial data.

#### `AgentSubagent(data)`

Create a new `AgentSubagent` entity instance. Pass `nil` for no initial data.

#### `AgentSubscription(data)`

Create a new `AgentSubscription` entity instance. Pass `nil` for no initial data.

#### `AgentTeammate(data)`

Create a new `AgentTeammate` entity instance. Pass `nil` for no initial data.

#### `AgentTerminal(data)`

Create a new `AgentTerminal` entity instance. Pass `nil` for no initial data.

#### `AgentThread(data)`

Create a new `AgentThread` entity instance. Pass `nil` for no initial data.

#### `AgentTool(data)`

Create a new `AgentTool` entity instance. Pass `nil` for no initial data.

#### `AgentVerifyProject(data)`

Create a new `AgentVerifyProject` entity instance. Pass `nil` for no initial data.

#### `AgentWait(data)`

Create a new `AgentWait` entity instance. Pass `nil` for no initial data.

#### `AgentWebhook(data)`

Create a new `AgentWebhook` entity instance. Pass `nil` for no initial data.

#### `AgentWork(data)`

Create a new `AgentWork` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflow(data)`

Create a new `AgentWorkflow` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowProposal(data)`

Create a new `AgentWorkflowProposal` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowRun(data)`

Create a new `AgentWorkflowRun` entity instance. Pass `nil` for no initial data.

#### `AgentWorkflowTrigger(data)`

Create a new `AgentWorkflowTrigger` entity instance. Pass `nil` for no initial data.

#### `AgentWorkspace(data)`

Create a new `AgentWorkspace` entity instance. Pass `nil` for no initial data.

#### `AgentWritePermission(data)`

Create a new `AgentWritePermission` entity instance. Pass `nil` for no initial data.

#### `AllocationLog(data)`

Create a new `AllocationLog` entity instance. Pass `nil` for no initial data.

#### `App(data)`

Create a new `App` entity instance. Pass `nil` for no initial data.

#### `AppCdn(data)`

Create a new `AppCdn` entity instance. Pass `nil` for no initial data.

#### `AppConfigVariable(data)`

Create a new `AppConfigVariable` entity instance. Pass `nil` for no initial data.

#### `AppDataResource(data)`

Create a new `AppDataResource` entity instance. Pass `nil` for no initial data.

#### `AppDeploy(data)`

Create a new `AppDeploy` entity instance. Pass `nil` for no initial data.

#### `AppDeployment(data)`

Create a new `AppDeployment` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentOperation(data)`

Create a new `AppDeploymentOperation` entity instance. Pass `nil` for no initial data.

#### `AppDeploymentRollback(data)`

Create a new `AppDeploymentRollback` entity instance. Pass `nil` for no initial data.

#### `AppEnvironment(data)`

Create a new `AppEnvironment` entity instance. Pass `nil` for no initial data.

#### `AppLocation(data)`

Create a new `AppLocation` entity instance. Pass `nil` for no initial data.

#### `AppMetric(data)`

Create a new `AppMetric` entity instance. Pass `nil` for no initial data.

#### `AppPreview(data)`

Create a new `AppPreview` entity instance. Pass `nil` for no initial data.

#### `AppPreviewProfile(data)`

Create a new `AppPreviewProfile` entity instance. Pass `nil` for no initial data.

#### `AppRun(data)`

Create a new `AppRun` entity instance. Pass `nil` for no initial data.

#### `AppSecret(data)`

Create a new `AppSecret` entity instance. Pass `nil` for no initial data.

#### `AppService(data)`

Create a new `AppService` entity instance. Pass `nil` for no initial data.

#### `AppServiceBinding(data)`

Create a new `AppServiceBinding` entity instance. Pass `nil` for no initial data.

#### `AppServicePlacement(data)`

Create a new `AppServicePlacement` entity instance. Pass `nil` for no initial data.

#### `AppStorageResource(data)`

Create a new `AppStorageResource` entity instance. Pass `nil` for no initial data.

#### `AttachmentPart(data)`

Create a new `AttachmentPart` entity instance. Pass `nil` for no initial data.

#### `AutomationEvent(data)`

Create a new `AutomationEvent` entity instance. Pass `nil` for no initial data.

#### `AutomationRun(data)`

Create a new `AutomationRun` entity instance. Pass `nil` for no initial data.

#### `Binary(data)`

Create a new `Binary` entity instance. Pass `nil` for no initial data.

#### `BinaryVersion(data)`

Create a new `BinaryVersion` entity instance. Pass `nil` for no initial data.

#### `BrowserEgressCandidate(data)`

Create a new `BrowserEgressCandidate` entity instance. Pass `nil` for no initial data.

#### `BrowserSession(data)`

Create a new `BrowserSession` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionConnection(data)`

Create a new `BrowserSessionConnection` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionControl(data)`

Create a new `BrowserSessionControl` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionEvent(data)`

Create a new `BrowserSessionEvent` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionMedia(data)`

Create a new `BrowserSessionMedia` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionRecording(data)`

Create a new `BrowserSessionRecording` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionScreenshot(data)`

Create a new `BrowserSessionScreenshot` entity instance. Pass `nil` for no initial data.

#### `BrowserSessionTask(data)`

Create a new `BrowserSessionTask` entity instance. Pass `nil` for no initial data.

#### `CatalogSelector(data)`

Create a new `CatalogSelector` entity instance. Pass `nil` for no initial data.

#### `CdnDeployment(data)`

Create a new `CdnDeployment` entity instance. Pass `nil` for no initial data.

#### `CdnHostname(data)`

Create a new `CdnHostname` entity instance. Pass `nil` for no initial data.

#### `CdnSpace(data)`

Create a new `CdnSpace` entity instance. Pass `nil` for no initial data.

#### `CdnSpaceObject(data)`

Create a new `CdnSpaceObject` entity instance. Pass `nil` for no initial data.

#### `ConnectionRequest(data)`

Create a new `ConnectionRequest` entity instance. Pass `nil` for no initial data.

#### `ConnectionSource(data)`

Create a new `ConnectionSource` entity instance. Pass `nil` for no initial data.

#### `CoordinationWait(data)`

Create a new `CoordinationWait` entity instance. Pass `nil` for no initial data.

#### `CredentialSignInCheck(data)`

Create a new `CredentialSignInCheck` entity instance. Pass `nil` for no initial data.

#### `DataResourceRotateCredential(data)`

Create a new `DataResourceRotateCredential` entity instance. Pass `nil` for no initial data.

#### `DeepScan(data)`

Create a new `DeepScan` entity instance. Pass `nil` for no initial data.

#### `DeepScanFinding(data)`

Create a new `DeepScanFinding` entity instance. Pass `nil` for no initial data.

#### `DeepScanFlow(data)`

Create a new `DeepScanFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanMappedFlow(data)`

Create a new `DeepScanMappedFlow` entity instance. Pass `nil` for no initial data.

#### `DeepScanOption(data)`

Create a new `DeepScanOption` entity instance. Pass `nil` for no initial data.

#### `DemoShare(data)`

Create a new `DemoShare` entity instance. Pass `nil` for no initial data.

#### `DemoShareSegment(data)`

Create a new `DemoShareSegment` entity instance. Pass `nil` for no initial data.

#### `DeploymentDashboardNomad(data)`

Create a new `DeploymentDashboardNomad` entity instance. Pass `nil` for no initial data.

#### `DeploymentFile(data)`

Create a new `DeploymentFile` entity instance. Pass `nil` for no initial data.

#### `DomainPathRule(data)`

Create a new `DomainPathRule` entity instance. Pass `nil` for no initial data.

#### `Dream(data)`

Create a new `Dream` entity instance. Pass `nil` for no initial data.

#### `Environment(data)`

Create a new `Environment` entity instance. Pass `nil` for no initial data.

#### `EnvironmentDiscoveryRun(data)`

Create a new `EnvironmentDiscoveryRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentExploration(data)`

Create a new `EnvironmentExploration` entity instance. Pass `nil` for no initial data.

#### `EnvironmentFirstRun(data)`

Create a new `EnvironmentFirstRun` entity instance. Pass `nil` for no initial data.

#### `EnvironmentRevision(data)`

Create a new `EnvironmentRevision` entity instance. Pass `nil` for no initial data.

#### `EnvironmentSecretBinding(data)`

Create a new `EnvironmentSecretBinding` entity instance. Pass `nil` for no initial data.

#### `EnvironmentTestAccount(data)`

Create a new `EnvironmentTestAccount` entity instance. Pass `nil` for no initial data.

#### `Evidence(data)`

Create a new `Evidence` entity instance. Pass `nil` for no initial data.

#### `Exploration(data)`

Create a new `Exploration` entity instance. Pass `nil` for no initial data.

#### `ExplorationMessage(data)`

Create a new `ExplorationMessage` entity instance. Pass `nil` for no initial data.

#### `ExplorationReport(data)`

Create a new `ExplorationReport` entity instance. Pass `nil` for no initial data.

#### `ExplorationScenario(data)`

Create a new `ExplorationScenario` entity instance. Pass `nil` for no initial data.

#### `Finding(data)`

Create a new `Finding` entity instance. Pass `nil` for no initial data.

#### `GithubConnection(data)`

Create a new `GithubConnection` entity instance. Pass `nil` for no initial data.

#### `HostingAppDomain(data)`

Create a new `HostingAppDomain` entity instance. Pass `nil` for no initial data.

#### `ImageRepository(data)`

Create a new `ImageRepository` entity instance. Pass `nil` for no initial data.

#### `Integration(data)`

Create a new `Integration` entity instance. Pass `nil` for no initial data.

#### `InteractionResponse(data)`

Create a new `InteractionResponse` entity instance. Pass `nil` for no initial data.

#### `Invitation(data)`

Create a new `Invitation` entity instance. Pass `nil` for no initial data.

#### `JourneyVariantReplay(data)`

Create a new `JourneyVariantReplay` entity instance. Pass `nil` for no initial data.

#### `Knowledge(data)`

Create a new `Knowledge` entity instance. Pass `nil` for no initial data.

#### `LocalThreadDelivery(data)`

Create a new `LocalThreadDelivery` entity instance. Pass `nil` for no initial data.

#### `LocalThreadOperation(data)`

Create a new `LocalThreadOperation` entity instance. Pass `nil` for no initial data.

#### `Location(data)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Me(data)`

Create a new `Me` entity instance. Pass `nil` for no initial data.

#### `MeEmail(data)`

Create a new `MeEmail` entity instance. Pass `nil` for no initial data.

#### `MeOnboarding(data)`

Create a new `MeOnboarding` entity instance. Pass `nil` for no initial data.

#### `MediaFile(data)`

Create a new `MediaFile` entity instance. Pass `nil` for no initial data.

#### `Member(data)`

Create a new `Member` entity instance. Pass `nil` for no initial data.

#### `Memory(data)`

Create a new `Memory` entity instance. Pass `nil` for no initial data.

#### `MergeRequest(data)`

Create a new `MergeRequest` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationMessage(data)`

Create a new `MessagingConversationMessage` entity instance. Pass `nil` for no initial data.

#### `MessagingConversationUpload(data)`

Create a new `MessagingConversationUpload` entity instance. Pass `nil` for no initial data.

#### `MetricQuery(data)`

Create a new `MetricQuery` entity instance. Pass `nil` for no initial data.

#### `NetworkConnection(data)`

Create a new `NetworkConnection` entity instance. Pass `nil` for no initial data.

#### `NomadAllocation(data)`

Create a new `NomadAllocation` entity instance. Pass `nil` for no initial data.

#### `NomadLog(data)`

Create a new `NomadLog` entity instance. Pass `nil` for no initial data.

#### `Organization(data)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `Page(data)`

Create a new `Page` entity instance. Pass `nil` for no initial data.

#### `PageAgent(data)`

Create a new `PageAgent` entity instance. Pass `nil` for no initial data.

#### `PageProjectRun(data)`

Create a new `PageProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectCredential(data)`

Create a new `PagesProjectCredential` entity instance. Pass `nil` for no initial data.

#### `PagesProjectPersona(data)`

Create a new `PagesProjectPersona` entity instance. Pass `nil` for no initial data.

#### `PagesProjectRun(data)`

Create a new `PagesProjectRun` entity instance. Pass `nil` for no initial data.

#### `PagesProjectScenario(data)`

Create a new `PagesProjectScenario` entity instance. Pass `nil` for no initial data.

#### `PersonalAccessToken(data)`

Create a new `PersonalAccessToken` entity instance. Pass `nil` for no initial data.

#### `PreviewOperation(data)`

Create a new `PreviewOperation` entity instance. Pass `nil` for no initial data.

#### `PreviewProfileSecretBinding(data)`

Create a new `PreviewProfileSecretBinding` entity instance. Pass `nil` for no initial data.

#### `PreviewSecret(data)`

Create a new `PreviewSecret` entity instance. Pass `nil` for no initial data.

#### `PreviewSharingApproval(data)`

Create a new `PreviewSharingApproval` entity instance. Pass `nil` for no initial data.

#### `ProductMapIdentityDecision(data)`

Create a new `ProductMapIdentityDecision` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourney(data)`

Create a new `ProductMapJourney` entity instance. Pass `nil` for no initial data.

#### `ProductMapJourneyReplay(data)`

Create a new `ProductMapJourneyReplay` entity instance. Pass `nil` for no initial data.

#### `ProductMapObservation(data)`

Create a new `ProductMapObservation` entity instance. Pass `nil` for no initial data.

#### `ProductMapQuestion(data)`

Create a new `ProductMapQuestion` entity instance. Pass `nil` for no initial data.

#### `ProductMapState(data)`

Create a new `ProductMapState` entity instance. Pass `nil` for no initial data.

#### `Project(data)`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `ProjectAndroidApk(data)`

Create a new `ProjectAndroidApk` entity instance. Pass `nil` for no initial data.

#### `ProjectCodeMap(data)`

Create a new `ProjectCodeMap` entity instance. Pass `nil` for no initial data.

#### `ProjectEnvironment(data)`

Create a new `ProjectEnvironment` entity instance. Pass `nil` for no initial data.

#### `ProjectFinding(data)`

Create a new `ProjectFinding` entity instance. Pass `nil` for no initial data.

#### `ProjectFixture(data)`

Create a new `ProjectFixture` entity instance. Pass `nil` for no initial data.

#### `ProjectIosApp(data)`

Create a new `ProjectIosApp` entity instance. Pass `nil` for no initial data.

#### `ProjectMessagingConversation(data)`

Create a new `ProjectMessagingConversation` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewMetric(data)`

Create a new `ProjectOverviewMetric` entity instance. Pass `nil` for no initial data.

#### `ProjectOverviewPullRequest(data)`

Create a new `ProjectOverviewPullRequest` entity instance. Pass `nil` for no initial data.

#### `ProjectProductMap(data)`

Create a new `ProjectProductMap` entity instance. Pass `nil` for no initial data.

#### `ProjectRecording(data)`

Create a new `ProjectRecording` entity instance. Pass `nil` for no initial data.

#### `ProjectRunPlan(data)`

Create a new `ProjectRunPlan` entity instance. Pass `nil` for no initial data.

#### `ProjectRunSchedule(data)`

Create a new `ProjectRunSchedule` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioOption(data)`

Create a new `ProjectScenarioOption` entity instance. Pass `nil` for no initial data.

#### `ProjectScenarioRow(data)`

Create a new `ProjectScenarioRow` entity instance. Pass `nil` for no initial data.

#### `ProjectSetting(data)`

Create a new `ProjectSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequest(data)`

Create a new `PullRequest` entity instance. Pass `nil` for no initial data.

#### `PullRequestSetting(data)`

Create a new `PullRequestSetting` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingAddRepository(data)`

Create a new `PullRequestSettingAddRepository` entity instance. Pass `nil` for no initial data.

#### `PullRequestSettingDetectComment(data)`

Create a new `PullRequestSettingDetectComment` entity instance. Pass `nil` for no initial data.

#### `Recorder(data)`

Create a new `Recorder` entity instance. Pass `nil` for no initial data.

#### `Registry(data)`

Create a new `Registry` entity instance. Pass `nil` for no initial data.

#### `RegistryV2(data)`

Create a new `RegistryV2` entity instance. Pass `nil` for no initial data.

#### `RelayAgentLocalThread(data)`

Create a new `RelayAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `ReportReplay(data)`

Create a new `ReportReplay` entity instance. Pass `nil` for no initial data.

#### `ReportScenario(data)`

Create a new `ReportScenario` entity instance. Pass `nil` for no initial data.

#### `RunScenarioRun(data)`

Create a new `RunScenarioRun` entity instance. Pass `nil` for no initial data.

#### `RunScheduleOption(data)`

Create a new `RunScheduleOption` entity instance. Pass `nil` for no initial data.

#### `RunSearch(data)`

Create a new `RunSearch` entity instance. Pass `nil` for no initial data.

#### `RunUpdate(data)`

Create a new `RunUpdate` entity instance. Pass `nil` for no initial data.

#### `ScenarioRevision(data)`

Create a new `ScenarioRevision` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunLesson(data)`

Create a new `ScenarioRunLesson` entity instance. Pass `nil` for no initial data.

#### `ScenarioRunScenarioEdit(data)`

Create a new `ScenarioRunScenarioEdit` entity instance. Pass `nil` for no initial data.

#### `ServiceEndpoint(data)`

Create a new `ServiceEndpoint` entity instance. Pass `nil` for no initial data.

#### `SitePreview(data)`

Create a new `SitePreview` entity instance. Pass `nil` for no initial data.

#### `SlackChannel(data)`

Create a new `SlackChannel` entity instance. Pass `nil` for no initial data.

#### `SparkAgentLocalThread(data)`

Create a new `SparkAgentLocalThread` entity instance. Pass `nil` for no initial data.

#### `StaticSite(data)`

Create a new `StaticSite` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDeployment(data)`

Create a new `StaticSiteDeployment` entity instance. Pass `nil` for no initial data.

#### `StaticSiteDomain(data)`

Create a new `StaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `SubscriptionModel(data)`

Create a new `SubscriptionModel` entity instance. Pass `nil` for no initial data.

#### `ThreadPreview(data)`

Create a new `ThreadPreview` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectCredential(data)`

Create a new `VerificationProjectCredential` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectPersona(data)`

Create a new `VerificationProjectPersona` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectRun(data)`

Create a new `VerificationProjectRun` entity instance. Pass `nil` for no initial data.

#### `VerificationProjectScenario(data)`

Create a new `VerificationProjectScenario` entity instance. Pass `nil` for no initial data.

#### `VerifyAppDomain(data)`

Create a new `VerifyAppDomain` entity instance. Pass `nil` for no initial data.

#### `VerifyBrowserSession(data)`

Create a new `VerifyBrowserSession` entity instance. Pass `nil` for no initial data.

#### `VerifyStaticSiteDomain(data)`

Create a new `VerifyStaticSiteDomain` entity instance. Pass `nil` for no initial data.

#### `VersionLog(data)`

Create a new `VersionLog` entity instance. Pass `nil` for no initial data.

#### `WebBotAuth(data)`

Create a new `WebBotAuth` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStep(data)`

Create a new `WorkflowRunStep` entity instance. Pass `nil` for no initial data.

#### `WorkflowRunStopNotice(data)`

Create a new `WorkflowRunStopNotice` entity instance. Pass `nil` for no initial data.

#### `WorkflowTriggerSkipped(data)`

Create a new `WorkflowTriggerSkipped` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AgentEntity

```lua
local agent = client:Agent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `string|nil` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string|nil` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_sharing` | `boolean` | No |  |
| `can_name_managers` | `boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `number` | Yes |  |
| `configuration_version` | `string|nil` | Yes | Opaque version token. |
| `control_connections_available` | `boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `string|nil` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `table` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string|nil` | Yes | Opaque version token. |
| `local_agent_control_available` | `boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `table` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `string|nil` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `string|nil` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `table|nil` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` | Yes |  |
| `sharing_fixed` | `boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` | No |  |
| `slug` | `string` | Yes | Optional explicit API alias. |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `string` | No | Defaults to organization. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Agent():create({
  organization_id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Agent():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Agent():load({ id = "agent_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Agent():remove({ id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentAttachmentEntity

```lua
local agent_attachment = client:AgentAttachment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `number` | Yes |  |
| `content_type` | `string` | Yes |  |
| `file_name` | `string` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentAttachment():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  byte_size = --[[ number ]],
  content_type = --[[ string ]],
  file_name = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAttachmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentAutomationEntity

```lua
local agent_automation = client:AgentAutomation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_events` | `boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` | Yes |  |
| `definition` | `table` | Yes |  |
| `event_subscriptions` | `table` | Yes |  |
| `event_triggers` | `table` | Yes |  |
| `expected_revision` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `number` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `table` | Yes |  |
| `version` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentAutomation():list({ agent_id = "example", organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentAutomation():load({ id = "agent_automation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentAutomation():update({
  id = "agent_automation_id",
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAutomationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentAvatarEntity

```lua
local agent_avatar = client:AgentAvatar(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentAvatarEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentCommandEntity

```lua
local agent_command = client:AgentCommand(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `skill_model_visible` | `boolean` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentCommand():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCommandEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentComputerEntity

```lua
local agent_computer = client:AgentComputer(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentComputerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentConnectionEntity

```lua
local agent_connection = client:AgentConnection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_disconnect` | `boolean` | Yes |  |
| `can_setup` | `boolean` | Yes |  |
| `connection` | `table` | Yes |  |
| `credential` | `string|nil` | No | Write-only outbound key. |
| `error_code` | `string|nil` | Yes |  |
| `expected_generation` | `number` | Yes |  |
| `generation` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `string|nil` | Yes |  |
| `requester_id` | `string` | Yes |  |
| `retired_at` | `string|nil` | Yes |  |
| `revoked_at` | `string|nil` | Yes |  |
| `scope_key` | `string` | Yes |  |
| `source_operation_id` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentConnection():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  agent_card_url = --[[ string ]],
  auth_scheme = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentConnection():list({ agent_id = "example", organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentConnection():load({ id = "agent_connection_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AgentConnection():remove({ id = "agent_connection_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentConnection():update({
  id = "agent_connection_id",
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentConnectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentControlFlowEntity

```lua
local agent_control_flow = client:AgentControlFlow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `boolean` | Yes |  |
| `cancellation_requested` | `boolean` | Yes |  |
| `device_name` | `string` | Yes |  |
| `flow_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `providers` | `table` | Yes |  |
| `repair_of_flow_id` | `string` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `title` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentControlFlow():list({ agent_id = "example", organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentControlFlow():load({ id = "agent_control_flow_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentControlFlowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentCoordinationEntity

```lua
local agent_coordination = client:AgentCoordination(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCoordinationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentEmailEntity

```lua
local agent_email = client:AgentEmail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `string|nil` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `preview` | `string` | No |  |
| `received_at` | `string` | Yes |  |
| `recipient_tag` | `string|nil` | Yes | The +tag the sender used, if any |
| `spam` | `boolean` | Yes | SES judged it spam |
| `subject` | `string|nil` | Yes |  |
| `text` | `string` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentEmail():load({ id = "agent_email_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEmailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentFileEntity

```lua
local agent_file = client:AgentFile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `string` | Yes |  |
| `download_url` | `string` | Yes |  |
| `filename` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `size_bytes` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentFile():load({ id = "agent_file_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentFileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentInputEntity

```lua
local agent_input = client:AgentInput(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `table` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `table` | No |  |
| `browser_context` | `table` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `table` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` | No |  |
| `requester_membership_id` | `string` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentInput():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  browser_context = --[[ table ]],
  client_time = --[[ table ]],
  conversation_id = --[[ string ]],
  text = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentInputEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentIntegrationEntity

```lua
local agent_integration = client:AgentIntegration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `table` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `table` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_organization` | `boolean` | Yes |  |
| `catalog` | `table` | Yes |  |
| `connect_as` | `string|nil` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `table` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `table` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` | Yes |  |
| `connections` | `table` | Yes |  |
| `email` | `table` | Yes | A native agent's own email address. |
| `enabled` | `boolean` | Yes |  |
| `enabled_toolkits` | `table` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `number` | Yes |  |
| `pagination` | `table` | Yes |  |
| `pending_counts` | `table` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `boolean` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `boolean` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `boolean` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `table` | Yes |  |
| `webhook_connections` | `table` | Yes |  |
| `webhooks_available` | `boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentIntegration():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  connection_id = --[[ string ]],
  enabled = --[[ boolean ]],
  generation = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentIntegration():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentIntegrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentInteractionEntity

```lua
local agent_interaction = client:AgentInteraction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `interactions` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentInteraction():list({ agent_id = "example", organization_id = "example", conversation_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentInteraction():load({ id = "agent_interaction_id", agent_id = "agent_id", organization_id = "organization_id", conversation_id = "conversation_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentInteractionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentLibraryEntity

```lua
local agent_library = client:AgentLibrary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentLibraryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentManagerEntity

```lua
local agent_manager = client:AgentManager(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `string|nil` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string|nil` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_sharing` | `boolean` | No |  |
| `can_name_managers` | `boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `number` | Yes |  |
| `configuration_version` | `string|nil` | Yes | Opaque version token. |
| `control_connections_available` | `boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `string|nil` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `table` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string|nil` | Yes | Opaque version token. |
| `local_agent_control_available` | `boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `table` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `string|nil` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `string|nil` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `table|nil` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` | Yes |  |
| `sharing_fixed` | `boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` | No |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` | Yes |  |
| `visibility` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentManager():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  user_id = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AgentManager():remove({ id = "agent_manager_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentManagerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentManagerChoiceEntity

```lua
local agent_manager_choice = client:AgentManagerChoice(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentManagerChoice():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentManagerChoiceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentMarketplaceEntity

```lua
local agent_marketplace = client:AgentMarketplace(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `table` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `catalog_key` | `string|nil` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `table` | Yes |  |
| `category` | `string` | Yes |  |
| `counts` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expected_version` | `number` | Yes |  |
| `explainer` | `string|nil` | Yes | The listing's public write-up in Markdown. |
| `featured` | `boolean` | Yes |  |
| `from_composal` | `boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `number` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `table` | Yes |  |
| `integrations` | `table` | Yes |  |
| `listing` | `any` | Yes |  |
| `listings` | `table` | Yes |  |
| `memories` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `next_page` | `number|nil` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `table` | Yes |  |
| `publisher_avatar_url` | `string|nil` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `table` | Yes |  |
| `share_token` | `string|nil` | Yes | Present only for people who manage the listing. |
| `skills` | `table` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | No | The V2 agent this listing was published from. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |
| `viewer` | `table` | Yes | Who a public marketplace response was read for. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplace():create({
  organization_id = --[[ string ]],
  bundle = --[[ table ]],
  category = --[[ string ]],
  name = --[[ string ]],
  summary = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplace():load({ id = "agent_marketplace_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplace():patch({
  id = "agent_marketplace_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplace():remove({ id = "agent_marketplace_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplace():update({
  id = "agent_marketplace_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMarketplaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentMarketplaceSharedEntity

```lua
local agent_marketplace_shared = client:AgentMarketplaceShared(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `catalog_key` | `string|nil` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` | Yes |  |
| `counts` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `explainer` | `string|nil` | Yes | The listing's public write-up in Markdown. |
| `featured` | `boolean` | Yes |  |
| `from_composal` | `boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `number` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `table` | Yes |  |
| `integrations` | `table` | Yes |  |
| `listing` | `any` | Yes |  |
| `memories` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `table` | Yes |  |
| `publisher_avatar_url` | `string|nil` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `string|nil` | Yes | Present only for people who manage the listing. |
| `skills` | `table` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |
| `viewer` | `table` | Yes | Who a public marketplace response was read for. |
| `visibility` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentMarketplaceShared():load({ id = "agent_marketplace_shared_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMarketplaceSharedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentMissionControlEntity

```lua
local agent_mission_control = client:AgentMissionControl(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentMissionControlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentOperationEntity

```lua
local agent_operation = client:AgentOperation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `table` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `operation` | `table` | Yes |  |
| `participant` | `string` | Yes |  |
| `requester_id` | `string` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentOperation():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  arguments = --[[ table ]],
  key = --[[ string ]],
  name = --[[ string ]],
  requester_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentOperation():load({ id = "agent_operation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentOperationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentProvisioningEntity

```lua
local agent_provisioning = client:AgentProvisioning(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentProvisioningEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentPullRequestEntity

```lua
local agent_pull_request = client:AgentPullRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `owners` | `table` | Yes |  |
| `repository` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentPullRequest():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentPullRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentQuestionEntity

```lua
local agent_question = client:AgentQuestion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentQuestionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentRepositoryEntity

```lua
local agent_repository = client:AgentRepository(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `environments` | `table` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `number` | Yes |  |
| `id` | `string` | No |  |
| `repository_choices` | `table` | Yes |  |
| `repository_choices_error` | `string|nil` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `boolean` | Yes |  |
| `version` | `number` | Yes |  |
| `work_repositories` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentRepository():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentRepository():update({
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRepositoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentResourceEntity

```lua
local agent_resource = client:AgentResource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `uri` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentResource():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentRoutineEntity

```lua
local agent_routine = client:AgentRoutine(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `consecutive_errors` | `number` | Yes |  |
| `credit_wait` | `table` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `string|nil` | Yes |  |
| `enabled` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_error` | `string|nil` | Yes |  |
| `last_run_at` | `string|nil` | Yes |  |
| `last_status` | `string|nil` | Yes |  |
| `managed` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string|nil` | Yes |  |
| `routine` | `table` | Yes |  |
| `schedule` | `table` | Yes |  |
| `schedule_label` | `string` | Yes |  |
| `utility_model` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentRoutine():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentRoutine():update({
  agent_id = "agent_id",
  id = "id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRoutineEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentRunEntity

```lua
local agent_run = client:AgentRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string|nil` | No |  |
| `id` | `string` | No |  |
| `run_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentRun():load({ id = "agent_run_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentRuntimeEntity

```lua
local agent_runtime = client:AgentRuntime(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `table` | No |  |
| `can_manage` | `boolean` | Yes |  |
| `can_reset` | `boolean` | No |  |
| `image` | `string` | Yes |  |
| `memory_mb` | `number|nil` | Yes |  |
| `platform` | `string` | No |  |
| `profile` | `string` | Yes |  |
| `provider` | `string` | No |  |
| `state` | `string` | Yes |  |
| `version` | `string` | Yes |  |
| `volume` | `table|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentRuntimeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSettingEntity

```lua
local agent_setting = client:AgentSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `expected_version` | `string` | Yes |  |
| `instructions` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentSetting():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentSetting():update({
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSharingEntity

```lua
local agent_sharing = client:AgentSharing(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSharingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSiteEntity

```lua
local agent_site = client:AgentSite(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `string` | Yes |  |
| `deployments_count` | `number` | Yes |  |
| `hostname` | `string` | Yes |  |
| `https` | `string` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `visibility` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentSite():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSiteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSkillEntity

```lua
local agent_skill = client:AgentSkill(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `configuration_state` | `string` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` | Yes |  |
| `enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `skills` | `table` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentSkill():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  enabled = --[[ boolean ]],
  name = --[[ string ]],
  version = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentSkill():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSkillEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSlackEntity

```lua
local agent_slack = client:AgentSlack(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSlackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSubagentEntity

```lua
local agent_subagent = client:AgentSubagent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `attention` | `table|nil` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `model` | `string|nil` | Yes |  |
| `parent_id` | `string` | Yes |  |
| `preview` | `string|nil` | Yes |  |
| `started_at` | `string|nil` | Yes |  |
| `state` | `string|nil` | Yes | What the thread is to the viewer. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string|nil` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentSubagent():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSubagentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentSubscriptionEntity

```lua
local agent_subscription = client:AgentSubscription(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentSubscription():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentSubscription():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentSubscriptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentTeammateEntity

```lua
local agent_teammate = client:AgentTeammate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `string|nil` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `slug` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentTeammate():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentTeammateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentTerminalEntity

```lua
local agent_terminal = client:AgentTerminal(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentTerminalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentThreadEntity

```lua
local agent_thread = client:AgentThread(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `number|nil` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `boolean` | Yes |  |
| `execution` | `any` | No |  |
| `first_input` | `any` | No |  |
| `first_input_key` | `string` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `string` | No |  |
| `inherit_context` | `boolean` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `table` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `number` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `string|nil` | Yes |  |
| `local_scope_key` | `string|nil` | Yes |  |
| `local_status_pending` | `boolean` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `table` | Yes |  |
| `main_thread_id` | `string` | Yes |  |
| `message` | `string` | No | The thread's first message. |
| `next_cursor` | `string|nil` | Yes |  |
| `parent_conversation_id` | `string` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` | No |  |
| `selected_thread` | `any` | Yes |  |
| `thread` | `table` | Yes |  |
| `threads` | `table` | Yes |  |
| `title` | `string` | No |  |
| `total_archived_count` | `number|nil` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentThread():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentThread():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentThreadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentToolEntity

```lua
local agent_tool = client:AgentTool(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `inputSchema` | `table` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentTool():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentToolEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentVerifyProjectEntity

```lua
local agent_verify_project = client:AgentVerifyProject(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `boolean` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `number` | Yes |  |
| `project_choices` | `table` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `boolean` | Yes |  |
| `verify_projects` | `table` | Yes |  |
| `version` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentVerifyProject():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentVerifyProject():update({
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentVerifyProjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWaitEntity

```lua
local agent_wait = client:AgentWait(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWaitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWebhookEntity

```lua
local agent_webhook = client:AgentWebhook(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `connection` | `table` | Yes |  |
| `deliveries` | `table` | Yes |  |
| `event_types` | `table` | Yes |  |
| `expected_generation` | `number` | Yes |  |
| `id` | `string` | No |  |
| `max_events_per_day` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `purpose` | `string` | Yes |  |
| `signing_key` | `string|nil` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWebhook():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  event_types = --[[ table ]],
  max_events_per_day = --[[ number ]],
  name = --[[ string ]],
  purpose = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentWebhook():load({ id = "agent_webhook_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWebhook():update({
  id = "agent_webhook_id",
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWebhookEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkEntity

```lua
local agent_work = client:AgentWork(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkflowEntity

```lua
local agent_workflow = client:AgentWorkflow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `path` | `string` | Yes |  |
| `source` | `string` | Yes | At most 262144 UTF-8 bytes |
| `template` | `string` | Yes | A template id from the catalog's templates |
| `templates` | `table` | Yes |  |
| `truncated` | `boolean` | Yes |  |
| `workflows` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflow():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  path = --[[ string ]],
  template = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentWorkflow():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflow():update({
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkflowProposalEntity

```lua
local agent_workflow_proposal = client:AgentWorkflowProposal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `table` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `string|nil` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `boolean` | Yes |  |
| `can_revise` | `boolean` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `boolean` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `boolean` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` | Yes |  |
| `definition` | `table|nil` | Yes |  |
| `digest` | `string` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `string|nil` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` | Yes |  |
| `model_choices` | `table` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` | Yes |  |
| `native_rows` | `table` | No |  |
| `path` | `string` | Yes |  |
| `pipeline_checkpoints` | `table` | Yes |  |
| `pipeline_commands` | `table` | Yes |  |
| `reasoning_choices` | `table` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `number|nil` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `table|nil` | Yes |  |
| `stale` | `boolean` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `table|nil` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `string|nil` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflowProposal():load({ id = "agent_workflow_proposal_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowProposalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkflowRunEntity

```lua
local agent_workflow_run = client:AgentWorkflowRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `table|nil` | Yes | Saved native automation identity. |
| `budget_seconds` | `number|nil` | Yes | The run stops once it has been running this long |
| `budget_usd` | `number|nil` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `table|nil` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string|nil` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `table` | Yes |  |
| `error` | `string|nil` | Yes |  |
| `finished_at` | `string|nil` | Yes |  |
| `flow_steps` | `table|nil` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes | Public run ID. |
| `needs_you` | `boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `string|nil` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string|nil` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `number` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string|nil` | Yes |  |
| `running_seconds` | `number` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `number` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `table|nil` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `steps` | `table` | Yes |  |
| `trigger_id` | `string|nil` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `string|nil` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `string|nil` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentWorkflowRun():list({ agent_id = "example", organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflowRun():load({ id = "agent_workflow_run_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkflowTriggerEntity

```lua
local agent_workflow_trigger = client:AgentWorkflowTrigger(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `table|nil` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `boolean` | Yes |  |
| `can_pause` | `boolean` | Yes | It is running, so a manager can pause it |
| `can_resume` | `boolean` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `boolean` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `number|nil` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `string|nil` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `next_due_at` | `string|nil` | Yes |  |
| `pause_cause` | `string|nil` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `boolean` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `string|nil` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `number|nil` | Yes |  |
| `schedule` | `table|nil` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `string|nil` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `number` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `string|nil` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `string|nil` | Yes |  |
| `starts` | `table|nil` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `string|nil` | Yes | The event subscription that starts it |
| `time_zone` | `string` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `number|nil` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `table` | Yes |  |
| `workflow_path` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentWorkflowTrigger():list({ agent_id = "example", organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflowTrigger():load({ id = "agent_workflow_trigger_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflowTrigger():remove({ id = "agent_workflow_trigger_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkflowTrigger():update({
  id = "agent_workflow_trigger_id",
  agent_id = "agent_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkflowTriggerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWorkspaceEntity

```lua
local agent_workspace = client:AgentWorkspace(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_delete` | `boolean` | Yes |  |
| `can_keep` | `boolean` | Yes |  |
| `cleanup_after` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentWorkspace():list({ agent_id = "example", organization_id = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AgentWorkspace():update({
  agent_id = "agent_id",
  id = "id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWorkspaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentWritePermissionEntity

```lua
local agent_write_permission = client:AgentWritePermission(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `string` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` | Yes |  |
| `granted_by` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `in_effect` | `boolean` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `string|nil` | Yes |  |
| `tool` | `string` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AgentWritePermission():list({ agent_id = "example", organization_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AgentWritePermission():remove({ id = "agent_write_permission_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentWritePermissionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AllocationLogEntity

```lua
local allocation_log = client:AllocationLog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `string|nil` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `number` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AllocationLog():list({ allocation_id = "example", app_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AllocationLogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppEntity

```lua
local app = client:App(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `description` | `string|nil` | Yes |  |
| `framework` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string|nil` | Yes |  |
| `root_path` | `string` | Yes |  |
| `root_path_display` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:App():create({
  name = --[[ string ]],
  organization_id = --[[ string ]],
  repository_id = --[[ string ]],
  root_path = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:App():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:App():load({ id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:App():patch({
  id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:App():remove({ id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:App():update({
  id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppCdnEntity

```lua
local app_cdn = client:AppCdn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `cache_path_prefix` | `string|nil` | No |  |
| `cache_settings_json` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `distribution_kind` | `string` | Yes |  |
| `edge_hostname` | `string|nil` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostnames` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `last_deployed_at` | `string|nil` | Yes |  |
| `last_deployed_at_label` | `string|nil` | Yes |  |
| `last_purged_at` | `string|nil` | Yes |  |
| `last_purged_at_label` | `string|nil` | Yes |  |
| `last_synced_at` | `string|nil` | Yes |  |
| `last_synced_at_label` | `string|nil` | Yes |  |
| `name` | `string` | Yes |  |
| `origin_url` | `string` | Yes |  |
| `provisioned` | `boolean` | Yes |  |
| `routing_settings_json` | `string|nil` | Yes |  |
| `security_settings_json` | `string|nil` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppCdn():create({
  app_id = --[[ string ]],
  name = --[[ string ]],
  origin_url = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppCdn():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppCdn():load({ id = "app_cdn_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppCdn():patch({
  id = "app_cdn_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppCdn():remove({ id = "app_cdn_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppCdn():update({
  id = "app_cdn_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppCdnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppConfigVariableEntity

```lua
local app_config_variable = client:AppConfigVariable(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string|nil` | Yes |  |
| `exposed_to_build` | `boolean` | Yes |  |
| `has_value` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `scope_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `value` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppConfigVariable():create({
  app_id = --[[ string ]],
  exposed_to_build = --[[ boolean ]],
  key = --[[ string ]],
  scope_kind = --[[ string ]],
  value_kind = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppConfigVariable():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppConfigVariable():load({ id = "app_config_variable_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppConfigVariable():patch({
  id = "app_config_variable_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppConfigVariable():remove({ id = "app_config_variable_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppConfigVariable():update({
  id = "app_config_variable_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppConfigVariableEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppDataResourceEntity

```lua
local app_data_resource = client:AppDataResource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `high_availability` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string|nil` | Yes |  |
| `provider_metadata` | `table` | Yes |  |
| `region` | `string|nil` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `number|nil` | Yes |  |
| `storage_label` | `string|nil` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDataResource():create({
  app_id = --[[ string ]],
  engine = --[[ string ]],
  kind = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppDataResource():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppDataResource():load({ id = "app_data_resource_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDataResource():patch({
  id = "app_data_resource_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppDataResource():remove({ id = "app_data_resource_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDataResource():update({
  id = "app_data_resource_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDataResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppDeployEntity

```lua
local app_deploy = client:AppDeploy(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `channel` | `string` | No |  |
| `command` | `string` | No |  |
| `commit_sha` | `string` | No |  |
| `desired_instances` | `number` | No |  |
| `environment` | `string` | No | Environment slug or public ID, all, or existing. |
| `image` | `string` | Yes |  |
| `region` | `string` | No |  |
| `rollout_predecessor` | `string` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeploy():create({
  app_id = --[[ string ]],
  image = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeployEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppDeploymentEntity

```lua
local app_deployment = client:AppDeployment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `string|nil` | Yes |  |
| `build_role` | `string|nil` | Yes |  |
| `commit_sha` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `creator_user_id` | `string|nil` | Yes |  |
| `deployed_url` | `string|nil` | Yes |  |
| `display_id` | `number` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `finished_at` | `string|nil` | Yes |  |
| `finished_at_label` | `string|nil` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string|nil` | Yes |  |
| `is_rollback` | `boolean` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `operation_key` | `string|nil` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rollback_reason` | `string|nil` | Yes |  |
| `rollback_source_deployment_id` | `string|nil` | Yes |  |
| `rollback_source_release_id` | `string|nil` | Yes |  |
| `rollback_target_release_id` | `string|nil` | Yes |  |
| `source_ref` | `string|nil` | Yes |  |
| `started_at` | `string|nil` | Yes |  |
| `started_at_label` | `string|nil` | Yes |  |
| `status` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeployment():create({
  app_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppDeployment():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppDeployment():load({ id = "app_deployment_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeployment():patch({
  id = "app_deployment_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppDeployment():remove({ id = "app_deployment_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeployment():update({
  id = "app_deployment_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppDeploymentOperationEntity

```lua
local app_deployment_operation = client:AppDeploymentOperation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `table` | Yes |  |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `string|nil` | Yes |  |
| `build_duration_seconds` | `number|nil` | Yes |  |
| `build_source` | `table|nil` | Yes |  |
| `build_status` | `string` | Yes |  |
| `children` | `table` | Yes |  |
| `ci_pipeline_id` | `string|nil` | Yes |  |
| `ci_pipeline_run_id` | `string|nil` | Yes |  |
| `commit_sha` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator` | `table|nil` | Yes |  |
| `deployed_url` | `string|nil` | Yes |  |
| `duration_seconds` | `number|nil` | Yes |  |
| `environment` | `table` | Yes |  |
| `failure_message` | `string` | No |  |
| `finished_at` | `string` | No |  |
| `history_kind` | `string` | Yes |  |
| `history_reason` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `is_live` | `boolean` | Yes |  |
| `is_rollback` | `boolean` | Yes |  |
| `live_region_count` | `number` | Yes |  |
| `location_id` | `string` | No |  |
| `number` | `number` | Yes |  |
| `placement` | `table|nil` | Yes |  |
| `region_count` | `number` | Yes |  |
| `replicas_per_region` | `number` | Yes |  |
| `rollback_reason` | `string|nil` | Yes |  |
| `rollback_source_release_id` | `string|nil` | Yes |  |
| `rollback_target_release_id` | `string|nil` | Yes |  |
| `rollout_predecessor_id` | `string|nil` | Yes |  |
| `rollout_status` | `string` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `service` | `table` | Yes |  |
| `source_ref` | `string|nil` | Yes |  |
| `started_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `total_replicas` | `number` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeploymentOperation():create({
  app_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppDeploymentOperation():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppDeploymentOperation():load({ id = "app_deployment_operation_id", app_id = "app_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentOperationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppDeploymentRollbackEntity

```lua
local app_deployment_rollback = client:AppDeploymentRollback(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_id` | `string` | Yes |  |
| `app_service_id` | `string` | No |  |
| `blockers` | `table` | Yes |  |
| `candidate_releases` | `table` | Yes |  |
| `confirmation_text` | `string` | Yes |  |
| `current_deployment` | `any` | Yes |  |
| `current_release` | `any` | Yes |  |
| `deployment` | `any` | Yes |  |
| `desired_state` | `any` | Yes |  |
| `environment` | `any` | Yes |  |
| `execution_allowed` | `boolean` | Yes |  |
| `force` | `boolean` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `idempotent_reuse` | `boolean` | Yes |  |
| `location` | `any` | Yes |  |
| `operation` | `any` | Yes |  |
| `reason` | `string|nil` | Yes |  |
| `rollback_release` | `any` | Yes |  |
| `rollout` | `any` | Yes |  |
| `service` | `any` | Yes |  |
| `target_artifact_locator` | `string|nil` | Yes |  |
| `target_release` | `any` | Yes |  |
| `to` | `string` | No |  |
| `warnings` | `table` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppDeploymentRollback():create({
  app_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppDeploymentRollbackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppEnvironmentEntity

```lua
local app_environment = client:AppEnvironment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `boolean` | Yes |  |
| `base_domain` | `string|nil` | Yes |  |
| `branch_pattern` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppEnvironment():create({
  app_id = --[[ string ]],
  auto_deploy = --[[ boolean ]],
  kind = --[[ string ]],
  location_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
  status = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppEnvironment():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppEnvironment():load({ id = "app_environment_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppEnvironment():patch({
  id = "app_environment_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppEnvironment():remove({ id = "app_environment_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppEnvironment():update({
  id = "app_environment_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEnvironmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppLocationEntity

```lua
local app_location = client:AppLocation(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppLocation():create({
  app_id = --[[ string ]],
  location_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppLocation():list({ app_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppLocation():remove({ id = "app_location_id", app_id = "app_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppLocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppMetricEntity

```lua
local app_metric = client:AppMetric(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppMetricEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppPreviewEntity

```lua
local app_preview = client:AppPreview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No |  |
| `app_preview_profile_id` | `string` | Yes |  |
| `change_number` | `string` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `number` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `number` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `resource_overrides` | `table` | No | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` | No |  |
| `shared_data_binding_ids` | `table` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `table` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` | Yes |  |
| `source_ref` | `string` | No |  |
| `storage_binding_resources` | `table` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreview():create({
  app_id = --[[ string ]],
  app_preview_profile_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppPreview():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppPreview():load({ id = "app_preview_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreview():patch({
  id = "app_preview_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppPreview():remove({ id = "app_preview_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreview():update({
  id = "app_preview_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppPreviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppPreviewProfileEntity

```lua
local app_preview_profile = client:AppPreviewProfile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `boolean` | No |  |
| `configuration` | `table` | No |  |
| `created_at` | `string` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_environment_id` | `string` | Yes |  |
| `ttl_days` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreviewProfile():create({
  app_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
  source_environment_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppPreviewProfile():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppPreviewProfile():load({ id = "app_preview_profile_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreviewProfile():patch({
  id = "app_preview_profile_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppPreviewProfile():remove({ id = "app_preview_profile_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppPreviewProfile():update({
  id = "app_preview_profile_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppPreviewProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppRunEntity

```lua
local app_run = client:AppRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppRun():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppRun():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppRun():load({ id = "app_run_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppSecretEntity

```lua
local app_secret = client:AppSecret(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string|nil` | No |  |
| `env_key` | `string|nil` | No |  |
| `expose_to_build` | `boolean` | No |  |
| `has_value` | `boolean` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_version_number` | `number|nil` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rotation_policy` | `string|nil` | No |  |
| `scope_kind` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `value` | `string` | No |  |
| `value_digest` | `string|nil` | No |  |
| `value_kind` | `string|nil` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppSecret():create({
  app_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppSecret():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppSecret():load({ id = "app_secret_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppSecret():patch({
  id = "app_secret_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppSecret():remove({ id = "app_secret_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppSecret():update({
  id = "app_secret_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppSecretEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppServiceEntity

```lua
local app_service = client:AppService(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `boolean` | Yes |  |
| `bindings` | `table` | Yes |  |
| `build_command` | `string|nil` | Yes |  |
| `cpu_label` | `string|nil` | Yes |  |
| `cpu_mhz` | `number|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `deploy_paths` | `table` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `number` | Yes |  |
| `disk_label` | `string|nil` | Yes |  |
| `disk_mb` | `number|nil` | Yes |  |
| `effective_deploy_paths` | `table` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `string|nil` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `internal_port` | `number|nil` | Yes |  |
| `kind` | `string` | Yes |  |
| `memory_label` | `string|nil` | Yes |  |
| `memory_max_label` | `string|nil` | Yes |  |
| `memory_max_mb` | `number|nil` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `number|nil` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_constraints_json` | `string|nil` | Yes |  |
| `nomad_kill_timeout_seconds` | `number|nil` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `string|nil` | Yes |  |
| `nomad_region` | `string|nil` | Yes |  |
| `nomad_shutdown_delay_seconds` | `number|nil` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `string|nil` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `string|nil` | Yes |  |
| `prestart_command` | `string|nil` | Yes |  |
| `publicly_accessible` | `boolean` | Yes |  |
| `release_command` | `string|nil` | Yes |  |
| `repo_source_path` | `string` | Yes |  |
| `runtime` | `string` | Yes |  |
| `runtime_adapter_kind` | `string` | Yes |  |
| `runtime_adapter_settings_json` | `string|nil` | Yes |  |
| `schedule` | `string|nil` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_path` | `string` | Yes |  |
| `start_command` | `string|nil` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppService():create({
  app_id = --[[ string ]],
  auto_deploy = --[[ boolean ]],
  desired_instances = --[[ number ]],
  kind = --[[ string ]],
  name = --[[ string ]],
  publicly_accessible = --[[ boolean ]],
  runtime = --[[ string ]],
  runtime_adapter_kind = --[[ string ]],
  slug = --[[ string ]],
  source_path = --[[ string ]],
  start_command = --[[ string|nil ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppService():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppService():load({ id = "app_service_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppService():patch({
  id = "app_service_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppService():remove({ id = "app_service_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppService():update({
  id = "app_service_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServiceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppServiceBindingEntity

```lua
local app_service_binding = client:AppServiceBinding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppServiceBinding():create({
  app_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppServiceBinding():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppServiceBinding():load({ id = "app_service_binding_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppServiceBinding():patch({
  id = "app_service_binding_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppServiceBinding():remove({ id = "app_service_binding_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppServiceBinding():update({
  id = "app_service_binding_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServiceBindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppServicePlacementEntity

```lua
local app_service_placement = client:AppServicePlacement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment_channel` | `string|nil` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `region_count` | `number` | Yes |  |
| `replicas_per_region` | `number` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `targets` | `table` | Yes |  |
| `total_replicas` | `number` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppServicePlacement():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppServicePlacement():load({ id = "app_service_placement_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppServicePlacementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AppStorageResourceEntity

```lua
local app_storage_resource = client:AppStorageResource(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `string|nil` | Yes |  |
| `attachment` | `table|nil` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `number|nil` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `ephemeral` | `boolean` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `string|nil` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location_code` | `string|nil` | Yes |  |
| `location_id` | `string|nil` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `string|nil` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes | Storage backend. |
| `provider_error` | `string|nil` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AppStorageResource():create({
  app_id = --[[ string ]],
  access_mode = --[[ string ]],
  kind = --[[ string ]],
  name = --[[ string ]],
  provider = --[[ string ]],
  slug = --[[ string ]],
  status = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AppStorageResource():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AppStorageResource():load({ id = "app_storage_resource_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:AppStorageResource():patch({
  id = "app_storage_resource_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AppStorageResource():remove({ id = "app_storage_resource_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AppStorageResource():update({
  id = "app_storage_resource_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppStorageResourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AttachmentPartEntity

```lua
local attachment_part = client:AttachmentPart(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AttachmentPart():update({
  agent_id = "agent_id",
  attachment_id = "attachment_id",
  id = "id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AttachmentPartEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AutomationEventEntity

```lua
local automation_event = client:AutomationEvent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_events` | `boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` | Yes |  |
| `event_subscriptions` | `table` | Yes |  |
| `event_triggers` | `table` | Yes |  |
| `expected_revision` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `number` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `table` | Yes |  |
| `settings` | `table` | No |  |
| `subscription_key` | `string` | Yes |  |
| `version` | `table` | Yes |  |

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AutomationEvent():update({
  agent_id = "agent_id",
  automation_id = "automation_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AutomationEventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AutomationRunEntity

```lua
local automation_run = client:AutomationRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `table|nil` | Yes | Saved native automation identity. |
| `budget_seconds` | `number|nil` | Yes | The run stops once it has been running this long |
| `budget_usd` | `number|nil` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `table|nil` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string|nil` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `table` | Yes |  |
| `error` | `string|nil` | Yes |  |
| `finished_at` | `string|nil` | Yes |  |
| `flow_steps` | `table|nil` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes |  |
| `input` | `table` | Yes |  |
| `needs_you` | `boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `string|nil` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string|nil` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` | Yes |  |
| `resume_count` | `number` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string|nil` | Yes |  |
| `running_seconds` | `number` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `number` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `table|nil` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `steps` | `table` | Yes |  |
| `trigger_id` | `string|nil` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` | Yes |  |
| `wake_at` | `string|nil` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `string|nil` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AutomationRun():create({
  agent_id = --[[ string ]],
  automation_id = --[[ string ]],
  organization_id = --[[ string ]],
  input = --[[ table ]],
  request_id = --[[ string ]],
  version_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AutomationRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BinaryEntity

```lua
local binary = client:Binary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `boolean` | Yes |  |
| `arch` | `any` | No |  |
| `archived_at` | `string|nil` | Yes |  |
| `binary` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `executable` | `string` | Yes |  |
| `format` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `latest_version` | `any` | Yes |  |
| `launch_args` | `table` | No |  |
| `name` | `string` | Yes |  |
| `needs_refresh` | `boolean` | Yes |  |
| `operation` | `table` | Yes |  |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `platform` | `any` | No |  |
| `project_id` | `string` | Yes |  |
| `sha256` | `string` | No |  |
| `slug` | `string` | Yes |  |
| `version` | `table` | Yes |  |
| `version_defaults` | `any` | No |  |
| `versions` | `table` | Yes |  |
| `window_title` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Binary():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  download_url = --[[ string ]],
  executable = --[[ string ]],
  format = --[[ any ]],
  idempotency_key = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
  window_title = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Binary():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Binary():load({ id = "binary_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BinaryVersionEntity

```lua
local binary_version = client:BinaryVersion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `any` | No |  |
| `cancelable` | `boolean` | Yes |  |
| `configuration` | `table` | Yes |  |
| `configuration_digest` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deletable` | `boolean` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `environment_uses` | `table` | Yes |  |
| `executable` | `string` | No |  |
| `format` | `any` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `launch_args` | `table` | No |  |
| `operation` | `table` | Yes |  |
| `package_sha256` | `string|nil` | Yes |  |
| `package_size` | `number|nil` | Yes |  |
| `permissions` | `table` | Yes |  |
| `platform` | `any` | No |  |
| `preparations` | `table` | Yes |  |
| `retryable` | `boolean` | Yes |  |
| `sha256` | `string` | No |  |
| `status` | `string` | Yes |  |
| `version` | `table` | Yes |  |
| `window_title` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BinaryVersion():create({
  binary_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  download_url = --[[ string ]],
  idempotency_key = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:BinaryVersion():list({ binary_id = "example", organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BinaryVersion():load({ id = "binary_version_id", binary_id = "binary_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:BinaryVersion():remove({ id = "binary_version_id", binary_id = "binary_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinaryVersionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserEgressCandidateEntity

```lua
local browser_egress_candidate = client:BrowserEgressCandidate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:BrowserEgressCandidate():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserEgressCandidateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionEntity

```lua
local browser_session = client:BrowserSession(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `string|nil` | No |  |
| `authentication_status` | `string` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `string|nil` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `string|nil` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `string|nil` | No |  |
| `closure_basis` | `string|nil` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `number` | Yes |  |
| `controller` | `string` | Yes |  |
| `credential_id` | `string|nil` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `string|nil` | No |  |
| `expires_at` | `string` | Yes |  |
| `failure_code` | `string|nil` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `initial_url` | `string` | Yes |  |
| `max_seconds` | `number` | No |  |
| `pending_control_id` | `string|nil` | No |  |
| `project_id` | `string|nil` | No | Optional project slug or public ID. |
| `reconciled_at` | `string|nil` | No |  |
| `started_at` | `string|nil` | No |  |
| `status` | `string` | Yes |  |
| `url` | `string` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `table|nil` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSession():create({
  organization_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSession():load({ id = "browser_session_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSession():remove({ id = "browser_session_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionConnectionEntity

```lua
local browser_session_connection = client:BrowserSessionConnection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `number` | Yes |  |
| `idempotency_key` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionConnection():create({
  browser_session_id = --[[ string ]],
  organization_id = --[[ string ]],
  generation = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionConnectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionControlEntity

```lua
local browser_session_control = client:BrowserSessionControl(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `completed_at` | `string|nil` | No |  |
| `completed_generation` | `number|nil` | No |  |
| `connection` | `table|nil` | No |  |
| `failure_code` | `string|nil` | No |  |
| `id` | `string` | Yes |  |
| `requested_controller` | `string` | Yes |  |
| `requested_generation` | `number` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionControl():load({ id = "browser_session_control_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionControlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionEventEntity

```lua
local browser_session_event = client:BrowserSessionEvent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `string|nil` | No |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `payload` | `table` | Yes |  |
| `source_sequence` | `number|nil` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:BrowserSessionEvent():list({ browser_session_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionEventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionMediaEntity

```lua
local browser_session_media = client:BrowserSessionMedia(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `capture_omissions` | `table|nil` | No |  |
| `captured_at` | `string|nil` | No |  |
| `ended_at` | `string|nil` | No |  |
| `failure_code` | `string|nil` | No |  |
| `files` | `table` | Yes |  |
| `frames` | `number|nil` | No |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `partial` | `boolean` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` | Yes |  |
| `source` | `table|nil` | No | Screenshot provenance. |
| `status` | `string` | Yes |  |
| `stop_requested_at` | `string|nil` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionMedia():load({ id = "browser_session_media_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionMediaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionRecordingEntity

```lua
local browser_session_recording = client:BrowserSessionRecording(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | No |  |
| `wait` | `boolean` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionRecording():create({
  browser_session_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionRecordingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionScreenshotEntity

```lua
local browser_session_screenshot = client:BrowserSessionScreenshot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `string` | No |  |
| `wait` | `boolean` | No | Only screenshots support wait: true. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionScreenshot():create({
  browser_session_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionScreenshotEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BrowserSessionTaskEntity

```lua
local browser_session_task = client:BrowserSessionTask(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `table|nil` | No |  |
| `browser_session_id` | `string` | Yes |  |
| `cancel_requested_at` | `string|nil` | No |  |
| `completed_at` | `string|nil` | No |  |
| `control_generation` | `number|nil` | No |  |
| `deadline_at` | `string` | Yes |  |
| `effects_unknown` | `boolean` | Yes |  |
| `failure_code` | `string|nil` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `instruction` | `string` | Yes |  |
| `max_rounds` | `number` | Yes |  |
| `max_seconds` | `number` | No |  |
| `model_selection` | `table` | Yes |  |
| `outcome` | `string|nil` | No |  |
| `result` | `table` | Yes |  |
| `started_at` | `string|nil` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionTask():create({
  browser_session_id = --[[ string ]],
  organization_id = --[[ string ]],
  instruction = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BrowserSessionTask():load({ id = "browser_session_task_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BrowserSessionTaskEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CatalogSelectorEntity

```lua
local catalog_selector = client:CatalogSelector(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CatalogSelector():list({ app_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatalogSelectorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CdnDeploymentEntity

```lua
local cdn_deployment = client:CdnDeployment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnDeployment():create({
  app_id = --[[ string ]],
  cdn_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CdnDeployment():list({ app_id = "example", cdn_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CdnDeployment():load({ id = "cdn_deployment_id", app_id = "app_id", cdn_id = "cdn_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnDeploymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CdnHostnameEntity

```lua
local cdn_hostname = client:CdnHostname(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `force_ssl` | `boolean` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `provider_hostname_id` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnHostname():create({
  app_id = --[[ string ]],
  cdn_id = --[[ string ]],
  hostname = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CdnHostname():list({ app_id = "example", cdn_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CdnHostname():load({ id = "cdn_hostname_id", app_id = "app_id", cdn_id = "cdn_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnHostname():patch({
  id = "cdn_hostname_id",
  app_id = "app_id",
  cdn_id = "cdn_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:CdnHostname():remove({ id = "cdn_hostname_id", app_id = "app_id", cdn_id = "cdn_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnHostname():update({
  id = "cdn_hostname_id",
  app_id = "app_id",
  cdn_id = "cdn_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnHostnameEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CdnSpaceEntity

```lua
local cdn_space = client:CdnSpace(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpace():create({
  organization_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CdnSpace():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpace():load({ id = "cdn_space_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpace():patch({
  id = "cdn_space_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpace():remove({ id = "cdn_space_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpace():update({
  id = "cdn_space_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnSpaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CdnSpaceObjectEntity

```lua
local cdn_space_object = client:CdnSpaceObject(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CdnSpaceObject():list({ cdn_space_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpaceObject():load({ id = "cdn_space_object_id", cdn_space_id = "cdn_space_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpaceObject():remove({ id = "cdn_space_object_id", cdn_space_id = "cdn_space_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CdnSpaceObject():update({
  cdn_space_id = "cdn_space_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnSpaceObjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConnectionRequestEntity

```lua
local connection_request = client:ConnectionRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_disconnect` | `boolean` | Yes |  |
| `can_setup` | `boolean` | Yes |  |
| `error_code` | `string|nil` | Yes |  |
| `generation` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `string|nil` | Yes |  |
| `retired_at` | `string|nil` | Yes |  |
| `revoked_at` | `string|nil` | Yes |  |
| `source_operation_id` | `string|nil` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ConnectionRequest():load({ id = "connection_request_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConnectionSourceEntity

```lua
local connection_source = client:ConnectionSource(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ConnectionSource():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionSourceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoordinationWaitEntity

```lua
local coordination_wait = client:CoordinationWait(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `boolean` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `stop_state` | `string|nil` | Yes |  |
| `wake_outcome` | `string|nil` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CoordinationWait():list({ agent_id = "example", coordination_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoordinationWaitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CredentialSignInCheckEntity

```lua
local credential_sign_in_check = client:CredentialSignInCheck(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes | The project environment (app) to sign in to |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CredentialSignInCheck():create({
  credential_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  environment_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialSignInCheckEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DataResourceRotateCredentialEntity

```lua
local data_resource_rotate_credential = client:DataResourceRotateCredential(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `high_availability` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string|nil` | Yes |  |
| `provider_metadata` | `table` | Yes |  |
| `region` | `string|nil` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `number|nil` | Yes |  |
| `storage_label` | `string|nil` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DataResourceRotateCredential():create({
  app_id = --[[ string ]],
  data_resource_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataResourceRotateCredentialEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeepScanEntity

```lua
local deep_scan = client:DeepScan(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | No |  |
| `active` | `table` | Yes |  |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `table` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `table` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `table` | Yes |  |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DeepScan():create({
  organization_id = --[[ string ]],
  environment_id = --[[ string ]],
  goal = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DeepScan():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DeepScan():load({ id = "deep_scan_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeepScanFindingEntity

```lua
local deep_scan_finding = client:DeepScanFinding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `number` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `table` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `table` | Yes |  |
| `findings_fix_prompt` | `string|nil` | Yes |  |
| `free_findings_pending` | `boolean` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `table` | Yes |  |
| `priority` | `string|nil` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | Yes |  |
| `reproduction_of` | `table|nil` | Yes |  |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `boolean` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `unlock` | `table` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DeepScanFinding():list({ deep_scan_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanFindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeepScanFlowEntity

```lua
local deep_scan_flow = client:DeepScanFlow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | No |  |
| `concurrency` | `number` | No |  |
| `environment_id` | `string` | No |  |
| `exploration_id` | `string` | No |  |
| `flow_names` | `table` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `number` | No |  |
| `max_testers` | `number` | No |  |
| `note` | `string|nil` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DeepScanFlow():create({
  organization_id = --[[ string ]],
  flow_names = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanFlowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeepScanMappedFlowEntity

```lua
local deep_scan_mapped_flow = client:DeepScanMappedFlow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | Yes |  |
| `environment_id` | `string` | Yes |  |
| `flow_map` | `table|nil` | Yes |  |
| `revision_id` | `string|nil` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DeepScanMappedFlow():list({ organization_id = "example", environment_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanMappedFlowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeepScanOptionEntity

```lua
local deep_scan_option = client:DeepScanOption(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `table` | Yes |  |
| `deep_scan_defaults` | `any` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `table|nil` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `personas` | `table` | No |  |
| `preview` | `boolean` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `string|nil` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DeepScanOption():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeepScanOptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DemoShareEntity

```lua
local demo_share = client:DemoShare(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `table` | Yes |  |
| `summary` | `string` | Yes | What the recorded browser confirmed. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DemoShare():load({ id = "demo_share_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DemoShareEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DemoShareSegmentEntity

```lua
local demo_share_segment = client:DemoShareSegment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DemoShareSegment():load({ id = "demo_share_segment_id", demo_share_id = "demo_share_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DemoShareSegmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeploymentDashboardNomadEntity

```lua
local deployment_dashboard_nomad = client:DeploymentDashboardNomad(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentDashboardNomadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeploymentFileEntity

```lua
local deployment_file = client:DeploymentFile(nil)
```

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DeploymentFile():update({
  deployment_id = "deployment_id",
  static_site_id = "static_site_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentFileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainPathRuleEntity

```lua
local domain_path_rule = client:DomainPathRule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `string` | Yes |  |
| `app_service_endpoint_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `backend_ref` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_error` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainPathRule():create({
  app_id = --[[ string ]],
  domain_id = --[[ string ]],
  app_service_id = --[[ string|nil ]],
  path_prefix = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainPathRule():list({ app_id = "example", domain_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainPathRule():load({ id = "domain_path_rule_id", app_id = "app_id", domain_id = "domain_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainPathRule():patch({
  id = "domain_path_rule_id",
  app_id = "app_id",
  domain_id = "domain_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainPathRule():remove({ id = "domain_path_rule_id", app_id = "app_id", domain_id = "domain_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainPathRule():update({
  id = "domain_path_rule_id",
  app_id = "app_id",
  domain_id = "domain_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainPathRuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DreamEntity

```lua
local dream = client:Dream(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `boolean` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `table` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `string|nil` | Yes |  |
| `counts` | `table` | Yes |  |
| `dream` | `any` | Yes |  |
| `error_code` | `string|nil` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Yes | Public id used in the dream's URL |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `phase` | `string` | Yes | Where the dream is. |
| `reason` | `string|nil` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `number` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Yes | Local day whose finished runs it reviewed |
| `runs` | `table` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Yes | Project or unassigned environment name |
| `skipped` | `number` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `string` | Yes |  |
| `timezone` | `string` | Yes | Organization timezone the dream used |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Dream():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Dream():load({ id = "dream_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DreamEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentEntity

```lua
local environment = client:Environment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `string|nil` | Yes |  |
| `agent_sign_up_available` | `boolean` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `table` | Yes |  |
| `cleanup` | `table` | Yes |  |
| `connection` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_policy` | `table` | No |  |
| `default_policy_json` | `table` | Yes |  |
| `discovery_defaults` | `table` | Yes |  |
| `environment` | `table` | Yes |  |
| `exploration_accounts` | `table` | No |  |
| `explorations` | `table` | No |  |
| `first_run` | `any` | No |  |
| `hosted_app_id` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `string|nil` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `boolean` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `number` | Yes |  |
| `managed_google_available` | `boolean` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` | Yes |  |
| `messaging_tester_number` | `string|nil` | No | One configured tester number. |
| `name` | `string` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `table` | Yes |  |
| `onboarding_discovery` | `any` | No |  |
| `organization_id` | `string` | Yes |  |
| `pending_accounts` | `table` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `table` | Yes |  |
| `project_id` | `string|nil` | Yes | Owning project. |
| `repository_id` | `string|nil` | Yes |  |
| `revisions` | `table` | Yes |  |
| `setup_discovery_id` | `string|nil` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `boolean` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `target_kind` | `string|nil` | Yes |  |
| `target_url` | `string|nil` | Yes |  |
| `test_accounts` | `table` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `string|nil` | Yes |  |
| `version` | `number` | No | Required for target or tester changes; use lock_version from the environment. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Environment():create({
  organization_id = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Environment():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Environment():load({ id = "environment_id", organization_id = "organization_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Environment():patch({
  id = "environment_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Environment():remove({ id = "environment_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Environment():update({
  id = "environment_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentDiscoveryRunEntity

```lua
local environment_discovery_run = client:EnvironmentDiscoveryRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | Yes | Omit for anonymous exploration |
| `deadline_at` | `string` | Yes |  |
| `environment_revision_id` | `string` | Yes |  |
| `evidence` | `table` | No |  |
| `failure_code` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `queued_at` | `string` | Yes |  |
| `recording` | `table` | Yes |  |
| `result` | `table|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentDiscoveryRun():create({
  environment_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentDiscoveryRun():load({ id = "environment_discovery_run_id", environment_id = "environment_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentExplorationEntity

```lua
local environment_exploration = client:EnvironmentExploration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | No |  |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `persona_id` | `string|nil` | No |  |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentExploration():create({
  environment_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  goal = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentExplorationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentFirstRunEntity

```lua
local environment_first_run = client:EnvironmentFirstRun(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentFirstRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentRevisionEntity

```lua
local environment_revision = client:EnvironmentRevision(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `table` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_release_id` | `string|nil` | Yes |  |
| `blueprint` | `table` | Yes |  |
| `blueprint_json` | `table` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `digest` | `string` | Yes |  |
| `dry_run` | `boolean` | No |  |
| `expires_at` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `ready_at` | `string|nil` | Yes |  |
| `resolved_manifest_json` | `table` | Yes |  |
| `retention_policy_json` | `table` | Yes |  |
| `revision` | `number` | Yes |  |
| `revoked_at` | `string|nil` | Yes |  |
| `runner_environment_revision_id` | `string|nil` | Yes |  |
| `safety_policy_json` | `table` | Yes |  |
| `schema_version` | `number` | Yes |  |
| `source_metadata` | `table` | No |  |
| `source_metadata_json` | `table` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `validation_json` | `table` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentRevision():create({
  environment_id = --[[ string ]],
  organization_id = --[[ string ]],
  blueprint = --[[ table ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentRevision():load({ id = "environment_revision_id", environment_id = "environment_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentRevision():update({
  id = "environment_revision_id",
  environment_id = "environment_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentRevisionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentSecretBindingEntity

```lua
local environment_secret_binding = client:EnvironmentSecretBinding(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentSecretBinding():create({
  app_id = --[[ string ]],
  environment_id = --[[ string ]],
  env_key = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:EnvironmentSecretBinding():list({ app_id = "example", environment_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentSecretBinding():remove({ id = "environment_secret_binding_id", app_id = "app_id", environment_id = "environment_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentSecretBindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EnvironmentTestAccountEntity

```lua
local environment_test_account = client:EnvironmentTestAccount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `boolean` | Yes |  |
| `credentials` | `table` | Yes |  |
| `id` | `string` | No |  |
| `persona` | `string` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `tenant` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:EnvironmentTestAccount():list({ environment_id = "example", organization_id = "example" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentTestAccount():patch({
  environment_id = "environment_id",
  id = "id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:EnvironmentTestAccount():update({
  environment_id = "environment_id",
  id = "id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnvironmentTestAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EvidenceEntity

```lua
local evidence = client:Evidence(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Evidence():load({ id = "evidence_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EvidenceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExplorationEntity

```lua
local exploration = client:Exploration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | No |  |
| `active` | `table` | Yes |  |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `table` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `table` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `table` | Yes |  |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `persona_id` | `string|nil` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Exploration():create({
  organization_id = --[[ string ]],
  environment_id = --[[ string ]],
  goal = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Exploration():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Exploration():load({ id = "exploration_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExplorationMessageEntity

```lua
local exploration_message = client:ExplorationMessage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ExplorationMessage():create({
  exploration_id = --[[ string ]],
  organization_id = --[[ string ]],
  text = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationMessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExplorationReportEntity

```lua
local exploration_report = client:ExplorationReport(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationReportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExplorationScenarioEntity

```lua
local exploration_scenario = client:ExplorationScenario(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `table` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `table` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `table` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `table` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `table` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `table` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` | Yes |  |
| `priority_counts` | `table` | Yes |  |
| `project_id` | `string|nil` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `reproduction_of` | `table|nil` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ExplorationScenario():create({
  exploration_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExplorationScenarioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FindingEntity

```lua
local finding = client:Finding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deferred_until` | `string|nil` | No | Required future time when status is deferred |
| `finding` | `table` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `first_seen_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `boolean` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `number` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `permissions` | `table` | Yes |  |
| `reason` | `string` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `table|nil` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `string|nil` | Yes |  |
| `safe_summary` | `string` | Yes |  |
| `scenario_occurrences` | `table` | No |  |
| `severity` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Finding():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Finding():load({ id = "finding_id", organization_id = "organization_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Finding():patch({
  id = "finding_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Finding():update({
  id = "finding_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GithubConnectionEntity

```lua
local github_connection = client:GithubConnection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `table` | Yes |  |
| `github_app_installation_id` | `string` | Yes |  |
| `installations` | `table` | Yes |  |
| `project_id` | `string` | No | Project slug or public ID the repositories are added to. |
| `replace` | `boolean` | No | Make these the project's only repositories. |
| `repositories` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:GithubConnection():create({
  organization_id = --[[ string ]],
  github_app_installation_id = --[[ string ]],
  repositories = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:GithubConnection():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GithubConnectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HostingAppDomainEntity

```lua
local hosting_app_domain = client:HostingAppDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `certificate` | `table|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string|nil` | Yes |  |
| `path_rules` | `table` | Yes |  |
| `record_name` | `string|nil` | Yes |  |
| `record_type` | `string|nil` | Yes |  |
| `record_value` | `string|nil` | Yes |  |
| `redirect_to` | `string|nil` | Yes |  |
| `static_site_id` | `string|nil` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_record` | `table|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingAppDomain():create({
  app_id = --[[ string ]],
  app_service_id = --[[ string|nil ]],
  hostname = --[[ string ]],
  kind = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:HostingAppDomain():list({ app_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:HostingAppDomain():load({ id = "hosting_app_domain_id", app_id = "app_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingAppDomain():patch({
  id = "hosting_app_domain_id",
  app_id = "app_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:HostingAppDomain():remove({ id = "hosting_app_domain_id", app_id = "app_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingAppDomain():update({
  id = "hosting_app_domain_id",
  app_id = "app_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingAppDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImageRepositoryEntity

```lua
local image_repository = client:ImageRepository(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `hosted_app_id` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provider_kind` | `string` | Yes |  |
| `registry_auth_token` | `string` | No |  |
| `repository_path` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ImageRepository():create({
  organization_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ImageRepository():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageRepositoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IntegrationEntity

```lua
local integration = client:Integration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `table` | Yes |  |
| `gitlab` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `slack` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Integration():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InteractionResponseEntity

```lua
local interaction_response = client:InteractionResponse(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `table` | Yes |  |
| `conversation_id` | `string` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `number` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:InteractionResponse():create({
  agent_id = --[[ string ]],
  interaction_id = --[[ string ]],
  organization_id = --[[ string ]],
  answer = --[[ table ]],
  conversation_id = --[[ string ]],
  expected_revision = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionResponseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InvitationEntity

```lua
local invitation = client:Invitation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `string|nil` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `string|nil` | Yes |  |
| `expires_at_label` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `string|nil` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `organization` | `table` | Yes |  |
| `revoked_at` | `string|nil` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Invitation():create({
  organization_id = --[[ string ]],
  email = --[[ string ]],
  role = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Invitation():list({ organization_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Invitation():remove({ id = "invitation_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvitationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JourneyVariantReplayEntity

```lua
local journey_variant_replay = client:JourneyVariantReplay(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `string|nil` | Yes |  |
| `can_request_qualification` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `string|nil` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `max_seconds` | `number` | No |  |
| `preparation_receipt` | `table|nil` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `boolean` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `string|nil` | Yes |  |
| `scenario_file` | `table` | Yes |  |
| `scenario_run_id` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:JourneyVariantReplay():create({
  journey_variant_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  idempotency_key = --[[ string ]],
  review_reason = --[[ string ]],
  scenario_file = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JourneyVariantReplayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## KnowledgeEntity

```lua
local knowledge = client:Knowledge(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `string` | Yes |  |
| `content_json` | `table` | Yes |  |
| `document` | `table` | Yes |  |
| `documents` | `table` | Yes |  |
| `dreaming` | `table` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `history` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `markdown` | `string` | Yes |  |
| `observed_at` | `string` | Yes |  |
| `organization` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `project_id` | `string` | Yes |  |
| `project_name` | `string` | Yes |  |
| `projects` | `table` | Yes |  |
| `selected_project_id` | `string|nil` | Yes |  |
| `source` | `table` | Yes |  |
| `title` | `string` | Yes |  |
| `total` | `number` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Knowledge():create({
  organization_id = --[[ string ]],
  markdown = --[[ string ]],
  project_id = --[[ string ]],
  title = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Knowledge():load({ id = "knowledge_id", organization_id = "organization_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Knowledge():patch({
  id = "knowledge_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Knowledge():remove({ id = "knowledge_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Knowledge():update({
  id = "knowledge_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KnowledgeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocalThreadDeliveryEntity

```lua
local local_thread_delivery = client:LocalThreadDelivery(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `string` | Yes |  |
| `decision_pending` | `boolean` | Yes |  |
| `delivery` | `table` | Yes |  |
| `expected_version` | `number` | Yes |  |
| `id` | `string` | No |  |
| `policy` | `table` | Yes |  |
| `recovery_message` | `string|nil` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LocalThreadDelivery():load({ id = "local_thread_delivery_id", agent_id = "agent_id", local_thread_id = "local_thread_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LocalThreadDelivery():update({
  id = "local_thread_delivery_id",
  agent_id = "agent_id",
  local_thread_id = "local_thread_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocalThreadDeliveryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocalThreadOperationEntity

```lua
local local_thread_operation = client:LocalThreadOperation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `arguments` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `table` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `table` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `table` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LocalThreadOperation():create({
  agent_id = --[[ string ]],
  local_thread_id = --[[ string ]],
  organization_id = --[[ string ]],
  action = --[[ string ]],
  arguments = --[[ table ]],
  key = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LocalThreadOperation():load({ id = "local_thread_operation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocalThreadOperationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocationEntity

```lua
local location = client:Location(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Location():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeEntity

```lua
local me = client:Me(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `any` | Yes |  |
| `analytics_distinct_id` | `string` | No |  |
| `analytics_internal` | `boolean` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` | No |  |
| `api_token` | `string` | No |  |
| `app_promotion` | `table` | Yes |  |
| `commit_author_email` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `enabled_features` | `table` | Yes |  |
| `github_pr_user_authorization_connected` | `boolean` | Yes |  |
| `github_pr_user_authorization_login` | `string|nil` | Yes |  |
| `github_prs_authored_by_change_author` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `impersonation` | `table|nil` | Yes |  |
| `name` | `string|nil` | Yes |  |
| `next_path` | `string` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `table` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `boolean` | No |  |
| `openai_sign_in_enabled` | `boolean` | No |  |
| `organizations` | `table` | Yes |  |
| `pending_organization_invitation_count` | `number` | Yes |  |
| `pending_organization_invitation_count_label` | `string` | Yes |  |
| `picture_url` | `string|nil` | Yes |  |
| `superadmin` | `boolean` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `string|nil` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Me():load({ id = "me_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Me():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeEmailEntity

```lua
local me_email = client:MeEmail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `boolean` | Yes |  |
| `can_delete` | `boolean` | Yes |  |
| `can_resend_verification` | `boolean` | Yes |  |
| `can_set_account` | `boolean` | Yes |  |
| `can_set_commit_author` | `boolean` | Yes |  |
| `commit_author` | `boolean` | Yes |  |
| `email` | `string` | Yes |  |
| `emails` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | No |  |
| `verification_status` | `string` | Yes |  |
| `verified` | `boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MeEmail():create({
  email = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MeEmail():list()
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:MeEmail():patch({
  id = "me_email_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:MeEmail():remove({ id = "me_email_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:MeEmail():update({
  id = "me_email_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeEmailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeOnboardingEntity

```lua
local me_onboarding = client:MeOnboarding(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeOnboardingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MediaFileEntity

```lua
local media_file = client:MediaFile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:MediaFile():load({ id = "media_file_id", browser_session_id = "browser_session_id", media_id = "media_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MediaFileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MemberEntity

```lua
local member = client:Member(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `string|nil` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `string|nil` | Yes |  |
| `expires_at_label` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `string|nil` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `is_self` | `boolean` | Yes |  |
| `organization` | `table` | Yes |  |
| `revoked_at` | `string|nil` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |
| `user` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Member():list({ organization_id = "example" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Member():patch({
  id = "member_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Member():remove({ id = "member_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Member():update({
  id = "member_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MemberEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MemoryEntity

```lua
local memory = client:Memory(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `environment_id` | `string` | No |  |
| `finding` | `string` | Yes |  |
| `history` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `indexed_at` | `string|nil` | Yes |  |
| `memory` | `table` | Yes |  |
| `project_id` | `string` | No |  |
| `response` | `string` | No |  |
| `scope` | `table` | Yes |  |
| `source` | `table` | Yes |  |
| `tags` | `table` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Memory():create({
  organization_id = --[[ string ]],
  finding = --[[ string ]],
  title = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Memory():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Memory():load({ id = "memory_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Memory():remove({ id = "memory_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MemoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MergeRequestEntity

```lua
local merge_request = client:MergeRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `table` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` | Yes |  |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `string|nil` | Yes |  |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `boolean` | Yes |  |
| `findings` | `table` | Yes |  |
| `github_repository` | `string|nil` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` | Yes |  |
| `head_sha` | `string` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `preview_cleanup_ready` | `boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string|nil` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `string|nil` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `string|nil` | Yes |  |
| `provider` | `string` | Yes |  |
| `pull_request` | `table` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `requested_run_id` | `string|nil` | Yes |  |
| `runs` | `table` | Yes |  |
| `source_branch` | `string|nil` | Yes |  |
| `source_repository` | `string|nil` | Yes |  |
| `source_url` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MergeRequest():create({
  organization_id = --[[ string ]],
  idempotency_key = --[[ string ]],
  number = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:MergeRequest():load({ id = "merge_request_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MergeRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MessagingConversationMessageEntity

```lua
local messaging_conversation_message = client:MessagingConversationMessage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `number` | Yes |  |
| `attachment_max_bytes` | `number` | Yes |  |
| `client_operation_id` | `string` | Yes |  |
| `content` | `string` | Yes |  |
| `id` | `string` | No |  |
| `media` | `table` | Yes |  |
| `media_upload_ids` | `table` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `table` | Yes |  |
| `reply_to` | `string` | No | Public ID of a visible message |
| `retry_attachment` | `boolean` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `string|nil` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `string|nil` | No |  |
| `send_style` | `string|nil` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MessagingConversationMessage():create({
  messaging_conversation_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  client_operation_id = --[[ string ]],
  content = --[[ string ]],
  media = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessagingConversationMessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MessagingConversationUploadEntity

```lua
local messaging_conversation_upload = client:MessagingConversationUpload(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `table` | Yes |  |
| `upload_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MessagingConversationUpload():create({
  messaging_conversation_id = --[[ string ]],
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessagingConversationUploadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetricQueryEntity

```lua
local metric_query = client:MetricQuery(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MetricQuery():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetricQueryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NetworkConnectionEntity

```lua
local network_connection = client:NetworkConnection(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:NetworkConnection():create({
  organization_id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:NetworkConnection():patch({
  id = "id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:NetworkConnection():update({
  id = "id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkConnectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NomadAllocationEntity

```lua
local nomad_allocation = client:NomadAllocation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `client_status` | `string|nil` | Yes |  |
| `create_time` | `string|nil` | Yes |  |
| `datacenter` | `string|nil` | Yes |  |
| `desired_description` | `string|nil` | Yes |  |
| `desired_status` | `string|nil` | Yes |  |
| `fetched_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `job_id` | `string|nil` | Yes |  |
| `modify_time` | `string|nil` | Yes |  |
| `name` | `string|nil` | Yes |  |
| `namespace` | `string` | Yes |  |
| `node_id` | `string|nil` | Yes |  |
| `node_name` | `string|nil` | Yes |  |
| `resources` | `table` | Yes |  |
| `task_group` | `string|nil` | Yes |  |
| `task_states` | `table` | Yes |  |
| `verify_runner_images` | `table` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:NomadAllocation():load({ id = "nomad_allocation_id", app_id = "app_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NomadAllocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NomadLogEntity

```lua
local nomad_log = client:NomadLog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `string|nil` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `number` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:NomadLog():list({ app_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NomadLogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganizationEntity

```lua
local organization = client:Organization(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `table` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `github_prs_authored_by_change_author` | `boolean` | Yes |  |
| `google_workspace_domain` | `string|nil` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` | Yes |  |
| `logo_url` | `string|nil` | Yes |  |
| `member_count` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `pending_invitation_count` | `number` | Yes |  |
| `personal` | `boolean` | Yes |  |
| `repository_count` | `number` | Yes |  |
| `role` | `string|nil` | Yes |  |
| `sandbox_region` | `string` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` | Yes |  |
| `source_control_providers` | `table` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |
| `verify_pr_scenario_writing_enabled` | `boolean` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Organization():create({
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Organization():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Organization():load({ id = "organization_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Organization():patch({
  id = "organization_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Organization():update({
  id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PageEntity

```lua
local page = client:Page(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `table` | Yes |  |
| `checkout_required` | `boolean` | Yes |  |
| `cli_signed_in_at` | `string|nil` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `table` | Yes |  |
| `demo_project` | `table|nil` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `table` | Yes |  |
| `included_deep_scan` | `boolean` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` | No |  |
| `organization` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `project` | `any` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `table` | No |  |
| `pull_requests` | `table` | No |  |
| `repositories` | `table` | Yes |  |
| `runs` | `table` | Yes |  |
| `runs_pagination` | `table` | Yes |  |
| `suggested_app_url` | `string|nil` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `boolean` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Page():load({ organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PageAgentEntity

```lua
local page_agent = client:PageAgent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `table` | Yes |  |
| `can_edit_integration_connections` | `boolean` | Yes |  |
| `creation_enabled` | `boolean` | Yes |  |
| `inbox` | `any` | No |  |
| `integration_choices` | `table` | Yes |  |
| `integration_choices_truncated` | `boolean` | Yes |  |
| `integration_selected` | `table` | Yes |  |
| `model_choices` | `table` | No |  |
| `new_configuration` | `any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `pagination` | `table` | Yes |  |
| `pinned_agent` | `any` | Yes |  |
| `platform_event_types` | `table` | Yes |  |
| `repository_choices` | `table` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `boolean` | Yes |  |
| `runtime_versions` | `table` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `any` | Yes |  |
| `selected_reference` | `string|nil` | Yes |  |
| `viewer_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PageAgent():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageAgentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PageProjectRunEntity

```lua
local page_project_run = client:PageProjectRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `table` | Yes |  |
| `fix_scenario_count` | `number` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `table` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `number` | Yes |  |
| `id` | `string` | No |  |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `preparation_reason` | `string|nil` | Yes |  |
| `project` | `table` | Yes |  |
| `run` | `table` | Yes |  |
| `scenario_runs` | `table` | Yes |  |
| `selected_scenario_run` | `any` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PageProjectRun():load({ id = "page_project_run_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PageProjectRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PagesProjectCredentialEntity

```lua
local pages_project_credential = client:PagesProjectCredential(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `table|nil` | No |  |
| `composal_address` | `string|nil` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `boolean` | Yes |  |
| `credential_keys` | `table` | Yes |  |
| `description` | `string|nil` | Yes |  |
| `email_link_auth_origins` | `table` | Yes |  |
| `has_inbox` | `boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `table|nil` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string|nil` | Yes |  |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes |  |
| `managed` | `boolean` | Yes |  |
| `mfa_enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `sign_in_verified` | `boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string|nil` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `username` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PagesProjectCredential():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectCredentialEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PagesProjectPersonaEntity

```lua
local pages_project_persona = client:PagesProjectPersona(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `number` | Yes |  |
| `credentials` | `table` | Yes |  |
| `needs_attention_count` | `number` | Yes |  |
| `permissions` | `table` | Yes |  |
| `persona_states` | `table` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `table` | Yes |  |
| `project` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PagesProjectPersona():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectPersonaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PagesProjectRunEntity

```lua
local pages_project_run = client:PagesProjectRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `string` | Yes |  |
| `environments` | `table` | Yes |  |
| `environments_has_more` | `boolean` | Yes |  |
| `pagination` | `table` | Yes |  |
| `runs` | `table` | Yes |  |
| `selected_environment` | `any` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PagesProjectRun():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PagesProjectScenarioEntity

```lua
local pages_project_scenario = client:PagesProjectScenario(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string|nil` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PagesProjectScenario():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PagesProjectScenarioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PersonalAccessTokenEntity

```lua
local personal_access_token = client:PersonalAccessToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PersonalAccessToken():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PersonalAccessToken():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:PersonalAccessToken():remove({ id = "personal_access_token_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PersonalAccessTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PreviewOperationEntity

```lua
local preview_operation = client:PreviewOperation(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PreviewOperation():list({ app_id = "example", preview_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewOperationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PreviewProfileSecretBindingEntity

```lua
local preview_profile_secret_binding = client:PreviewProfileSecretBinding(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PreviewProfileSecretBinding():create({
  app_id = --[[ string ]],
  preview_profile_id = --[[ string ]],
  env_key = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PreviewProfileSecretBinding():list({ app_id = "example", preview_profile_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:PreviewProfileSecretBinding():remove({ id = "preview_profile_secret_binding_id", app_id = "app_id", preview_profile_id = "preview_profile_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewProfileSecretBindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PreviewSecretEntity

```lua
local preview_secret = client:PreviewSecret(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PreviewSecret():create({
  app_id = --[[ string ]],
  preview_id = --[[ string ]],
  env_key = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
  value = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:PreviewSecret():remove({ id = "preview_secret_id", app_id = "app_id", preview_id = "preview_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewSecretEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PreviewSharingApprovalEntity

```lua
local preview_sharing_approval = client:PreviewSharingApproval(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `table` | Yes |  |
| `approved_build_secrets` | `table` | Yes |  |
| `approved_default_configuration` | `table` | Yes |  |
| `approved_default_secrets` | `table` | Yes |  |
| `approved_source_keys` | `table` | Yes |  |
| `build_keys` | `table` | No |  |
| `build_secrets` | `table` | No |  |
| `default_configuration` | `table` | No |  |
| `default_secrets` | `table` | No |  |
| `services` | `table` | Yes |  |
| `snapshot_version` | `number` | Yes |  |
| `source_keys` | `table` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PreviewSharingApproval():create({
  app_id = --[[ string ]],
  preview_id = --[[ string ]],
  snapshot_version = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PreviewSharingApproval():list({ app_id = "example", preview_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PreviewSharingApprovalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapIdentityDecisionEntity

```lua
local product_map_identity_decision = client:ProductMapIdentityDecision(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `table` | Yes |  |
| `operation` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `target` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapIdentityDecision():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  observations = --[[ table ]],
  operation = --[[ string ]],
  reason = --[[ string ]],
  target = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapIdentityDecisionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapJourneyEntity

```lua
local product_map_journey = client:ProductMapJourney(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `string|nil` | No |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `journey` | `table` | Yes |  |
| `next_cursor` | `string|nil` | Yes |  |
| `preview` | `any` | No |  |
| `scope` | `table` | Yes |  |
| `title` | `string` | Yes |  |
| `tree` | `table` | Yes |  |
| `tree_loaded` | `boolean` | No |  |
| `variant_count` | `number` | Yes |  |
| `variants` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProductMapJourney():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapJourney():load({ id = "product_map_journey_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapJourneyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapJourneyReplayEntity

```lua
local product_map_journey_replay = client:ProductMapJourneyReplay(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `string|nil` | Yes |  |
| `can_request_qualification` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `string|nil` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `preparation_receipt` | `table|nil` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `boolean` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `string|nil` | Yes |  |
| `scenario_run_id` | `string|nil` | Yes |  |
| `source_digest` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variant_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapJourneyReplay():load({ id = "product_map_journey_replay_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapJourneyReplayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapObservationEntity

```lua
local product_map_observation = client:ProductMapObservation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `table` | Yes |  |
| `events` | `table` | Yes |  |
| `evidence_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `observation_id` | `string` | Yes |  |
| `scope` | `table` | Yes |  |
| `state` | `any` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapObservation():load({ id = "product_map_observation_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapObservationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapQuestionEntity

```lua
local product_map_question = client:ProductMapQuestion(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `area` | `string` | No |  |
| `before` | `string` | No |  |
| `claims` | `table` | Yes |  |
| `evidence_truncated` | `boolean` | Yes |  |
| `model` | `string` | Yes |  |
| `persona_id` | `string` | No |  |
| `query` | `string` | No |  |
| `question` | `string` | Yes |  |
| `reasoning_effort` | `string` | Yes |  |
| `revision_id` | `string` | No |  |
| `scope` | `table` | Yes |  |
| `since` | `string` | No |  |
| `state_id` | `string` | No |  |
| `status` | `string` | Yes |  |
| `unknowns` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapQuestion():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  question = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapQuestionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductMapStateEntity

```lua
local product_map_state = client:ProductMapState(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string|nil` | Yes |  |
| `attempts` | `table` | Yes |  |
| `captured_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `incoming` | `table` | Yes |  |
| `labels` | `table` | Yes |  |
| `layout` | `table` | Yes |  |
| `observation_id` | `string` | Yes |  |
| `omitted_controls` | `number` | Yes |  |
| `outgoing` | `table` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `scope` | `table` | Yes |  |
| `screenshot_url` | `string|nil` | Yes |  |
| `state` | `table` | Yes |  |
| `truncated` | `boolean` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProductMapState():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProductMapState():load({ id = "product_map_state_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductMapStateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectEntity

```lua
local project = client:Project(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `string|nil` | Yes |  |
| `context` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credentials` | `table` | Yes |  |
| `demo` | `boolean` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `table` | Yes |  |
| `environments` | `table` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `icon_url` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_provider` | `table` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `network_connections` | `table` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `overview` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `personas` | `table` | Yes |  |
| `project` | `table` | Yes |  |
| `pull_request_options` | `table` | Yes |  |
| `pull_requests` | `table` | Yes |  |
| `purpose` | `string|nil` | Yes |  |
| `runs` | `table` | Yes |  |
| `scenario_history` | `table` | Yes |  |
| `scenario_states` | `table` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `table` | Yes |  |
| `setup_required` | `boolean` | No |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences` | `table` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `number` | Yes |  |
| `website_url` | `string|nil` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Project():create({
  organization_id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Project():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Project():load({ id = "project_id", organization_id = "organization_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:Project():patch({
  id = "project_id",
  organization_id = "organization_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Project():update({
  id = "project_id",
  organization_id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectAndroidApkEntity

```lua
local project_android_apk = client:ProjectAndroidApk(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `table` | Yes |  |
| `artifact_paths` | `table` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `table` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `table` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectAndroidApk():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectAndroidApkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectCodeMapEntity

```lua
local project_code_map = client:ProjectCodeMap(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `boolean` | Yes |  |
| `commit_sha` | `string` | Yes |  |
| `configured` | `boolean` | Yes |  |
| `error_code` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `repository_id` | `string` | Yes |  |
| `revision` | `table` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectCodeMap():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  repository_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectCodeMap():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectCodeMapEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectEnvironmentEntity

```lua
local project_environment = client:ProjectEnvironment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `string` | Yes |  |
| `allowed_origins` | `table` | Yes |  |
| `archived_at` | `string|nil` | Yes |  |
| `base_url` | `string|nil` | Yes |  |
| `base_url_changeable` | `boolean` | Yes | Whether an update may send a new base_url. |
| `binary` | `string` | No |  |
| `conversation_only_messaging` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `desktop` | `table|nil` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `string|nil` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `messaging_conversation` | `any` | Yes |  |
| `messaging_problem` | `string|nil` | Yes |  |
| `messaging_source` | `any` | Yes |  |
| `messaging_tester_number` | `string|nil` | Yes | One configured tester number. |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `table|nil` | Yes |  |
| `source_branch` | `string|nil` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `string|nil` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectEnvironment():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectEnvironment():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectEnvironment():load({ id = "project_environment_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectEnvironment():patch({
  id = "project_environment_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectEnvironment():update({
  id = "project_environment_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEnvironmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectFindingEntity

```lua
local project_finding = client:ProjectFinding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `string|nil` | No |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `boolean` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` | Yes |  |
| `source` | `string` | Yes | The workflow that produced the finding |
| `source_title` | `string` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Yes | Where the finding is reviewed within its source |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectFinding():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectFindingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectFixtureEntity

```lua
local project_fixture = client:ProjectFixture(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `table` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `number` | Yes |  |
| `content_type` | `string` | Yes |  |
| `credential_ids` | `table` | Yes |  |
| `credentials` | `table` | Yes |  |
| `environment_ids` | `table` | Yes |  |
| `environments` | `table` | Yes |  |
| `fixtures` | `table` | Yes |  |
| `id` | `string` | No |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `persona_ids` | `table` | Yes |  |
| `personas` | `table` | Yes |  |
| `project` | `table` | Yes |  |
| `sha256` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectFixture():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectFixture():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectFixture():load({ id = "project_fixture_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectFixture():patch({
  id = "project_fixture_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ProjectFixture():remove({ id = "project_fixture_id", organization_id = "organization_id", project_id = "project_id", version = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectFixture():update({
  id = "project_fixture_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectFixtureEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectIosAppEntity

```lua
local project_ios_app = client:ProjectIosApp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `table` | Yes |  |
| `artifact_paths` | `table` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `table` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `table` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectIosApp():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectIosAppEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectMessagingConversationEntity

```lua
local project_messaging_conversation = client:ProjectMessagingConversation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `string` | Yes |  |
| `attachment_limit` | `number` | Yes |  |
| `attachment_max_bytes` | `number` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `leased` | `boolean` | Yes |  |
| `messages` | `table` | Yes |  |
| `reconciled_at` | `string|nil` | Yes |  |
| `retirable` | `boolean` | Yes |  |
| `seeded` | `boolean` | Yes |  |
| `send_blocked_reason` | `string|nil` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `string|nil` | No |  |
| `tester_number` | `string` | Yes |  |
| `unknown_send` | `boolean` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectMessagingConversation():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  assistant_number = --[[ string ]],
  tester_number = --[[ string ]],
  verify_environment_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectMessagingConversation():load({ id = "project_messaging_conversation_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectMessagingConversation():patch({
  id = "project_messaging_conversation_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectMessagingConversation():update({
  id = "project_messaging_conversation_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectMessagingConversationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectOverviewMetricEntity

```lua
local project_overview_metric = client:ProjectOverviewMetric(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectOverviewMetric():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectOverviewMetricEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectOverviewPullRequestEntity

```lua
local project_overview_pull_request = client:ProjectOverviewPullRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `boolean` | Yes |  |
| `comment_url` | `string|nil` | Yes |  |
| `draft` | `boolean` | Yes |  |
| `github_repository` | `string|nil` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `string|nil` | Yes |  |
| `latest_current` | `boolean` | Yes |  |
| `latest_head_sha` | `string|nil` | Yes |  |
| `latest_reason` | `string|nil` | Yes |  |
| `latest_run_id` | `string|nil` | Yes |  |
| `latest_state` | `string|nil` | Yes |  |
| `number` | `number` | Yes |  |
| `project_id` | `string|nil` | Yes |  |
| `project_slug` | `string|nil` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `string|nil` | Yes |  |
| `source_repository` | `string|nil` | Yes |  |
| `source_url` | `string|nil` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectOverviewPullRequest():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectOverviewPullRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectProductMapEntity

```lua
local project_product_map = client:ProjectProductMap(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectProductMapEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectRecordingEntity

```lua
local project_recording = client:ProjectRecording(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `draft` | `any` | Yes | Present once drafted. |
| `environment_id` | `string` | Yes | The project environment the browser opens. |
| `error` | `string|nil` | Yes |  |
| `event_count` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `persona_id` | `string` | Yes | The project persona the journey acts as. |
| `phase` | `string` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `boolean` | Yes |  |
| `start_path` | `string` | No | A path on the environment to start at, such as /settings. |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRecording():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  environment_id = --[[ string ]],
  persona_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRecording():load({ id = "project_recording_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRecording():remove({ id = "project_recording_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRecordingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectRunPlanEntity

```lua
local project_run_plan = client:ProjectRunPlan(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `string|nil` | Yes |  |
| `base_url` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dependencies` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `table|nil` | Yes |  |
| `kind` | `string|nil` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `nodes` | `table` | Yes |  |
| `preview` | `any` | Yes |  |
| `project_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunPlan():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  dependencies = --[[ table ]],
  identity_probe = --[[ table|nil ]],
  name = --[[ string ]],
  nodes = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectRunPlan():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunPlan():load({ id = "project_run_plan_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunPlan():patch({
  id = "project_run_plan_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunPlan():update({
  id = "project_run_plan_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRunPlanEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectRunScheduleEntity

```lua
local project_run_schedule = client:ProjectRunSchedule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `table` | Yes |  |
| `cron_expression` | `string|nil` | No |  |
| `environment_id` | `string` | Yes | Project environment slug or public ID. |
| `environment_name` | `string` | No |  |
| `history` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `table` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string` | Yes |  |
| `notification_channel` | `string` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `number` | Yes |  |
| `selection_mode` | `string` | Yes |  |
| `slack_subscription_id` | `string|nil` | No |  |
| `source_scenario_id` | `string|nil` | No |  |
| `state` | `string` | Yes |  |
| `time_of_day` | `string` | Yes |  |
| `time_zone` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunSchedule():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  credential_ids = --[[ table ]],
  environment_id = --[[ string ]],
  labels = --[[ table ]],
  name = --[[ string ]],
  selection_mode = --[[ string ]],
  state = --[[ string ]],
  time_of_day = --[[ string ]],
  time_zone = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectRunSchedule():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunSchedule():load({ id = "project_run_schedule_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunSchedule():patch({
  id = "project_run_schedule_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ProjectRunSchedule():update({
  id = "project_run_schedule_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRunScheduleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectScenarioOptionEntity

```lua
local project_scenario_option = client:ProjectScenarioOption(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `personas` | `table` | Yes |  |
| `project` | `table` | Yes |  |
| `scenario_states` | `table` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `table` | Yes |  |
| `schedule_options` | `any` | No |  |
| `schedules` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectScenarioOption():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectScenarioOptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectScenarioRowEntity

```lua
local project_scenario_row = client:ProjectScenarioRow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `number` | Yes |  |
| `dependency_count` | `number` | Yes |  |
| `health` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `selectable_for_run` | `boolean` | Yes |  |
| `step_count` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectScenarioRow():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectScenarioRowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectSettingEntity

```lua
local project_setting = client:ProjectSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `table` | Yes |  |
| `messaging_conversations` | `table` | Yes |  |
| `messaging_enabled` | `boolean` | Yes |  |
| `permissions` | `table` | Yes |  |
| `project` | `table` | Yes |  |
| `tester_numbers` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ProjectSetting():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PullRequestEntity

```lua
local pull_request = client:PullRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `table` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `boolean` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `table` | Yes |  |
| `head_sha` | `string` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | Yes |  |
| `imessage_number` | `string` | No | International destination of this exact deployed commit. |
| `number` | `number` | No |  |
| `pagination` | `table` | Yes |  |
| `permissions` | `table` | Yes |  |
| `preview_cleanup_ready` | `boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string|nil` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `string` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `table` | Yes |  |
| `repository_id` | `string` | No |  |
| `runs` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PullRequest():create({
  organization_id = --[[ string ]],
  idempotency_key = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PullRequest():load({ id = "pull_request_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PullRequestSettingEntity

```lua
local pull_request_setting = client:PullRequestSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `string|nil` | No |  |
| `app_service_id` | `string|nil` | No |  |
| `bots` | `table` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `boolean` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `table|nil` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `number` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` | Yes |  |
| `demo_videos` | `boolean` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `boolean` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `string|nil` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` | No |  |
| `enabled` | `boolean` | Yes | Test PRs automatically. |
| `environment` | `string` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `table` | Yes |  |
| `github_check_enabled` | `boolean` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `table` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` | Yes |  |
| `imessage_comment_prefix` | `string|nil` | Yes |  |
| `imessage_number` | `string|nil` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` | Yes |  |
| `limits` | `table` | Yes |  |
| `link_pattern` | `string|nil` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `string|nil` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `number` | No |  |
| `messaging_enabled` | `boolean` | Yes |  |
| `messaging_tester_number` | `string|nil` | Yes | One configured tester number. |
| `non_product_paths` | `table` | No |  |
| `permissions` | `table` | Yes |  |
| `pr_check` | `boolean` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` | No |  |
| `preview_comment_authors` | `table` | No |  |
| `preview_comment_pattern` | `string` | No |  |
| `preview_comment_wildcard` | `string|nil` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `string|nil` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `table` | Yes |  |
| `previews` | `string` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `table` | Yes |  |
| `provider` | `string` | Yes |  |
| `repositories` | `table` | Yes |  |
| `repository` | `string` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` | Yes |  |
| `service` | `string|nil` | Yes | composal: the public service the browsers open. |
| `settings` | `table` | Yes |  |
| `setup` | `any` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `table` | Yes | The answers a new setup starts from |
| `source_repository` | `string` | Yes |  |
| `target_mode` | `string` | Yes |  |
| `tester_numbers` | `table` | Yes |  |
| `trigger_label` | `string` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `boolean` | No |  |
| `trigger_on_label` | `boolean` | No |  |
| `trigger_on_push` | `boolean` | No |  |
| `trigger_on_ready` | `boolean` | No |  |
| `triggers` | `table` | Yes | When runs start. |
| `verify_environment_id` | `string` | Yes |  |
| `write_scenarios` | `boolean` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PullRequestSetting():create({
  organization_id = --[[ string ]],
  bots = --[[ table ]],
  demo_videos = --[[ boolean ]],
  deployment = --[[ string|nil ]],
  enabled = --[[ boolean ]],
  environment = --[[ string ]],
  imessage_comment_prefix = --[[ string|nil ]],
  imessage_number = --[[ string|nil ]],
  imessage_number_source = --[[ string ]],
  limits = --[[ table ]],
  link_pattern = --[[ string|nil ]],
  links = --[[ string|nil ]],
  messaging_tester_number = --[[ string|nil ]],
  pr_check = --[[ boolean ]],
  preview_comment_wildcard = --[[ string|nil ]],
  preview_profile = --[[ string|nil ]],
  previews = --[[ string ]],
  project_id = --[[ string ]],
  provider = --[[ string ]],
  repository = --[[ string ]],
  repository_id = --[[ string ]],
  repository_kind = --[[ string ]],
  service = --[[ string|nil ]],
  target_mode = --[[ string ]],
  trigger_label = --[[ string ]],
  triggers = --[[ table ]],
  verify_environment_id = --[[ string ]],
  write_scenarios = --[[ boolean ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PullRequestSetting():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PullRequestSettingAddRepositoryEntity

```lua
local pull_request_setting_add_repository = client:PullRequestSettingAddRepository(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `string` | Yes |  |
| `replace` | `boolean` | No | Make these the project's only repositories. |
| `repositories` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PullRequestSettingAddRepository():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  repositories = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PullRequestSettingDetectCommentEntity

```lua
local pull_request_setting_detect_comment = client:PullRequestSettingDetectComment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `table` | No | The bots answer |
| `deployment` | `string` | No | The deployment answer |
| `example_url` | `string` | No |  |
| `imessage_comment_prefix` | `string` | No |  |
| `imessage_number` | `string|nil` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `link_pattern` | `string` | No | The link_pattern answer |
| `project_id` | `string` | Yes | Project slug or ID. |
| `provider` | `string` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | No | Repository slug, ID or owner/name. |
| `request_number` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PullRequestSettingDetectComment():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecorderEntity

```lua
local recorder = client:Recorder(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Recorder():load({ organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecorderEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegistryEntity

```lua
local registry = client:Registry(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegistryV2Entity

```lua
local registry_v2 = client:RegistryV2(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistryV2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RelayAgentLocalThreadEntity

```lua
local relay_agent_local_thread = client:RelayAgentLocalThread(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:RelayAgentLocalThread():remove({ id = "relay_agent_local_thread_id", agent_id = "agent_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RelayAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportReplayEntity

```lua
local report_replay = client:ReportReplay(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes |  |
| `generated_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `table` | Yes |  |
| `replay_steps` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ReportReplay():load({ id = "report_replay_id", exploration_id = "exploration_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportReplayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportScenarioEntity

```lua
local report_scenario = client:ReportScenario(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `string` | Yes |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `table` | Yes |  |
| `project_id` | `string|nil` | Yes |  |
| `related_explorations` | `table` | Yes |  |
| `report` | `table` | Yes |  |
| `saves_scenarios` | `boolean` | Yes |  |
| `scenario_generation` | `table` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ReportScenario():create({
  exploration_id = --[[ string ]],
  organization_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportScenarioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RunScenarioRunEntity

```lua
local run_scenario_run = client:RunScenarioRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunScenarioRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RunScheduleOptionEntity

```lua
local run_schedule_option = client:RunScheduleOption(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:RunScheduleOption():list({ organization_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunScheduleOptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RunSearchEntity

```lua
local run_search = client:RunSearch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:RunSearch():load({ organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunSearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RunUpdateEntity

```lua
local run_update = client:RunUpdate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `boolean` | Yes |  |
| `comment_url` | `string|nil` | Yes |  |
| `draft` | `boolean` | Yes |  |
| `github_repository` | `string|nil` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `string|nil` | Yes |  |
| `latest_current` | `boolean` | Yes |  |
| `latest_head_sha` | `string|nil` | Yes |  |
| `latest_reason` | `string|nil` | Yes |  |
| `latest_run_id` | `string|nil` | Yes |  |
| `latest_state` | `string|nil` | Yes |  |
| `number` | `number` | Yes |  |
| `project_id` | `string|nil` | Yes |  |
| `project_slug` | `string|nil` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `string|nil` | Yes |  |
| `source_repository` | `string|nil` | Yes |  |
| `source_url` | `string|nil` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:RunUpdate():list({ organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunUpdateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScenarioRevisionEntity

```lua
local scenario_revision = client:ScenarioRevision(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `batch` | `string` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `string` | Yes |  |
| `definition` | `table` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` | Yes |  |
| `source` | `string` | Yes | The client the save came through. |
| `user` | `any` | Yes | Null when a system job saved the Scenario. |
| `version` | `number` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ScenarioRevision():list({ organization_id = "example", project_id = "example", scenario_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRevisionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScenarioRunLessonEntity

```lua
local scenario_run_lesson = client:ScenarioRunLesson(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `string` | Yes |  |
| `title` | `string` | No | Defaults to the Scenario's name. |
| `workaround` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ScenarioRunLesson():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  run_id = --[[ string ]],
  scenario_run_id = --[[ string ]],
  finding = --[[ string ]],
  workaround = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRunLessonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScenarioRunScenarioEditEntity

```lua
local scenario_run_scenario_edit = client:ScenarioRunScenarioEdit(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScenarioRunScenarioEditEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ServiceEndpointEntity

```lua
local service_endpoint = client:ServiceEndpoint(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ServiceEndpoint():create({
  app_id = --[[ string ]],
  service_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ServiceEndpoint():list({ app_id = "example", service_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ServiceEndpoint():load({ id = "service_endpoint_id", app_id = "app_id", service_id = "service_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:ServiceEndpoint():patch({
  id = "service_endpoint_id",
  app_id = "app_id",
  service_id = "service_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ServiceEndpoint():remove({ id = "service_endpoint_id", app_id = "app_id", service_id = "service_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ServiceEndpoint():update({
  id = "service_endpoint_id",
  app_id = "app_id",
  service_id = "service_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceEndpointEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SitePreviewEntity

```lua
local site_preview = client:SitePreview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `string|nil` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `string|nil` | Yes |  |
| `url` | `string` | Yes | The address as it will be saved |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SitePreview():load({ organization_id = "organization_id", url = "url" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SitePreviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SlackChannelEntity

```lua
local slack_channel = client:SlackChannel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `is_member` | `boolean` | Yes |  |
| `is_private` | `boolean` | Yes |  |
| `is_slack_connect` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `published` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:SlackChannel():list({ agent_id = "example", organization_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SlackChannelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SparkAgentLocalThreadEntity

```lua
local spark_agent_local_thread = client:SparkAgentLocalThread(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `archived` | `boolean` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `boolean` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `boolean` | No |  |
| `can_end` | `boolean` | Yes |  |
| `can_interrupt` | `boolean` | Yes |  |
| `can_send` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `table` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `device_name` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `full_title` | `string` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `last_activity_at` | `string|nil` | Yes |  |
| `native_thread_id` | `string` | Yes |  |
| `parent_conversation_id` | `string|nil` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `table` | Yes |  |
| `relay_disconnected_at` | `string|nil` | No |  |
| `relay_participant` | `table` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `table|boolean` | No |  |
| `section` | `string` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` | Yes |  |
| `status` | `string|nil` | Yes | What the native thread is doing. |
| `task_configured` | `boolean` | Yes |  |
| `thread_id` | `string` | Yes |  |
| `title` | `string` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:SparkAgentLocalThread():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  device_id = --[[ string ]],
  key = --[[ string ]],
  provider = --[[ string ]],
  thread_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SparkAgentLocalThread():load({ id = "spark_agent_local_thread_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SparkAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StaticSiteEntity

```lua
local static_site = client:StaticSite(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `string|nil` | Yes |  |
| `cdn_hostname` | `string` | Yes |  |
| `cdn_url` | `string` | Yes |  |
| `cname_target` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_url` | `string` | Yes |  |
| `description` | `string|nil` | Yes |  |
| `error_document` | `string|nil` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `hosted_app_id` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `index_document` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provisioned` | `boolean` | Yes |  |
| `provisioned_at` | `string|nil` | Yes |  |
| `region` | `string|nil` | Yes |  |
| `replication_regions` | `table` | Yes |  |
| `repository_id` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSite():create({
  organization_id = --[[ string ]],
  name = --[[ string ]],
  slug = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:StaticSite():list({ organization_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:StaticSite():load({ id = "static_site_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSite():patch({
  id = "static_site_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:StaticSite():remove({ id = "static_site_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSite():update({
  id = "static_site_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StaticSiteDeploymentEntity

```lua
local static_site_deployment = client:StaticSiteDeployment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `string|nil` | Yes |  |
| `activated_at_label` | `string|nil` | Yes |  |
| `commit_sha` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string|nil` | Yes |  |
| `creator_user_id` | `string|nil` | Yes |  |
| `deploy_slug` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `file_count` | `number` | Yes |  |
| `file_count_label` | `string` | Yes |  |
| `finished_at` | `string|nil` | Yes |  |
| `finished_at_label` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `is_active` | `boolean` | Yes |  |
| `source_ref` | `string|nil` | Yes |  |
| `started_at` | `string|nil` | Yes |  |
| `started_at_label` | `string|nil` | Yes |  |
| `static_site_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `total_bytes` | `number` | Yes |  |
| `total_bytes_label` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string|nil` | Yes |  |
| `uploaded_at` | `string|nil` | Yes |  |
| `uploaded_at_label` | `string|nil` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDeployment():create({
  static_site_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:StaticSiteDeployment():list({ static_site_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDeployment():load({ id = "static_site_deployment_id", static_site_id = "static_site_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteDeploymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StaticSiteDomainEntity

```lua
local static_site_domain = client:StaticSiteDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `hosted_app_id` | `string|nil` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string|nil` | Yes |  |
| `record_name` | `string|nil` | Yes |  |
| `record_type` | `string|nil` | Yes |  |
| `record_value` | `string|nil` | Yes |  |
| `redirect_to` | `string|nil` | Yes |  |
| `static_site_id` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDomain():create({
  static_site_id = --[[ string ]],
  hostname = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:StaticSiteDomain():list({ static_site_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDomain():load({ id = "static_site_domain_id", static_site_id = "static_site_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDomain():patch({
  id = "static_site_domain_id",
  static_site_id = "static_site_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDomain():remove({ id = "static_site_domain_id", static_site_id = "static_site_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:StaticSiteDomain():update({
  id = "static_site_domain_id",
  static_site_id = "static_site_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StaticSiteDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SubscriptionModelEntity

```lua
local subscription_model = client:SubscriptionModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `reasoning` | `table` | No | Effort levels this plan model accepts. |
| `speeds` | `table` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:SubscriptionModel():list({ agent_id = "example", organization_id = "example", profile_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThreadPreviewEntity

```lua
local thread_preview = client:ThreadPreview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string|nil` | Yes |  |
| `port` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ThreadPreview():create({
  agent_id = --[[ string ]],
  organization_id = --[[ string ]],
  thread_id = --[[ string ]],
  port = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreadPreviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerificationProjectCredentialEntity

```lua
local verification_project_credential = client:VerificationProjectCredential(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `table|nil` | No |  |
| `browser_session` | `string` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `string|nil` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `boolean` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `boolean` | No | Select the Composal-managed Google test account when available. |
| `configured` | `boolean` | Yes |  |
| `cookies` | `string` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `table` | Yes |  |
| `description` | `string|nil` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `table` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `table|nil` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string|nil` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes | Optional sign-in path or URL. |
| `managed` | `boolean` | Yes |  |
| `mfa_enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `oidc` | `table` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `remove_browser_authentication` | `boolean` | No |  |
| `remove_totp` | `boolean` | No |  |
| `sign_in_verified` | `boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string|nil` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectCredential():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  login_method = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VerificationProjectCredential():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectCredential():load({ id = "verification_project_credential_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectCredential():patch({
  id = "verification_project_credential_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectCredential():remove({ id = "verification_project_credential_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectCredential():update({
  id = "verification_project_credential_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectCredentialEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerificationProjectPersonaEntity

```lua
local verification_project_persona = client:VerificationProjectPersona(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes |  |
| `archived_at` | `string|nil` | Yes |  |
| `capabilities` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credential_id` | `string|nil` | Yes | The credential this persona signs in with. |
| `goals` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectPersona():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  name = --[[ string ]],
  role = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VerificationProjectPersona():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectPersona():load({ id = "verification_project_persona_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectPersona():patch({
  id = "verification_project_persona_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectPersona():remove({ id = "verification_project_persona_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectPersona():update({
  id = "verification_project_persona_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectPersonaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerificationProjectRunEntity

```lua
local verification_project_run = client:VerificationProjectRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `string|nil` | Yes |  |
| `approved_digest` | `string|nil` | Yes |  |
| `archived_at` | `string|nil` | Yes |  |
| `available_tests` | `table` | Yes |  |
| `can_archive` | `boolean` | Yes |  |
| `can_restore` | `boolean` | Yes |  |
| `can_start_another_run` | `boolean` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `concurrency` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator_name` | `string|nil` | Yes |  |
| `definition_mode` | `string` | Yes |  |
| `environment_id` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `outcome` | `string|nil` | Yes |  |
| `permissions` | `table` | Yes |  |
| `plan_digest` | `string|nil` | Yes |  |
| `preparation_error_code` | `string|nil` | Yes |  |
| `progress` | `table` | Yes |  |
| `project` | `table` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `any` | Yes |  |
| `queued_at` | `string|nil` | Yes |  |
| `run` | `table` | Yes |  |
| `run_plan_id` | `string|nil` | No |  |
| `scenario_runs` | `table` | Yes |  |
| `source_run_id` | `string|nil` | Yes |  |
| `source_versions` | `table|nil` | Yes |  |
| `start_when_prepared` | `boolean` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` | Yes |  |
| `target_snapshot` | `table` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences_snapshot` | `table` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VerificationProjectRun():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectRun():load({ id = "verification_project_run_id", organization_id = "organization_id", project_id = "project_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerificationProjectScenarioEntity

```lua
local verification_project_scenario = client:VerificationProjectScenario(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `table` | No |  |
| `allowed_actions` | `string` | Yes |  |
| `archived_at` | `string|nil` | Yes |  |
| `cleanup` | `table` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` | Yes |  |
| `dependencies` | `table` | Yes |  |
| `fixtures` | `table` | No | Files upload steps choose, ordered by name. |
| `health` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `any` | No |  |
| `if` | `string|nil` | No | A documented subset of Actions expressions. |
| `labels` | `table` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `on` | `any` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `table` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `primary_actor` | `string|nil` | No |  |
| `project_id` | `string` | Yes |  |
| `selectable_for_run` | `boolean` | Yes |  |
| `starting_conditions` | `string|nil` | Yes |  |
| `steps` | `table` | Yes |  |
| `triggers` | `table` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectScenario():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VerificationProjectScenario():list({ organization_id = "example", project_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectScenario():load({ id = "verification_project_scenario_id", organization_id = "organization_id", project_id = "project_id" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectScenario():patch({
  id = "verification_project_scenario_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:VerificationProjectScenario():update({
  id = "verification_project_scenario_id",
  organization_id = "organization_id",
  project_id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationProjectScenarioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerifyAppDomainEntity

```lua
local verify_app_domain = client:VerifyAppDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerifyAppDomain():create({
  app_id = --[[ string ]],
  id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyAppDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerifyBrowserSessionEntity

```lua
local verify_browser_session = client:VerifyBrowserSession(nil)
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
| `viewer_url` | `string|nil` | Yes | Owner-only bearer link. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerifyBrowserSession():create({
  organization_id = --[[ string ]],
  project_id = --[[ string ]],
  url = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VerifyBrowserSession():load({ id = "verify_browser_session_id", organization_id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:VerifyBrowserSession():remove({ id = "verify_browser_session_id", organization_id = "organization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyBrowserSessionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerifyStaticSiteDomainEntity

```lua
local verify_static_site_domain = client:VerifyStaticSiteDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string|nil` | Yes |  |
| `app_service_id` | `string|nil` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string|nil` | Yes |  |
| `hosted_app_id` | `string|nil` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string|nil` | Yes |  |
| `record_name` | `string|nil` | Yes |  |
| `record_type` | `string|nil` | Yes |  |
| `record_value` | `string|nil` | Yes |  |
| `redirect_to` | `string|nil` | Yes |  |
| `static_site_id` | `string|nil` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_status` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:VerifyStaticSiteDomain():create({
  id = --[[ string ]],
  static_site_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerifyStaticSiteDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VersionLogEntity

```lua
local version_log = client:VersionLog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `string` | Yes |  |
| `failure_phase` | `string|nil` | Yes |  |
| `id` | `string` | Yes |  |
| `image_digest` | `string|nil` | Yes |  |
| `image_reference` | `string|nil` | Yes |  |
| `installer_version` | `string` | Yes |  |
| `ready_at` | `string|nil` | Yes |  |
| `receipt` | `table|nil` | Yes |  |
| `safe_error` | `string|nil` | Yes |  |
| `started_at` | `string|nil` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VersionLog():list({ binary_id = "example", organization_id = "example", version_id = "example", project_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionLogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebBotAuthEntity

```lua
local web_bot_auth = client:WebBotAuth(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string` | Yes |  |
| `origin` | `string` | Yes |  |
| `signatures` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:WebBotAuth():create({
  origin = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebBotAuthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkflowRunStepEntity

```lua
local workflow_run_step = client:WorkflowRunStep(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowRunStepEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkflowRunStopNoticeEntity

```lua
local workflow_run_stop_notice = client:WorkflowRunStopNotice(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowRunStopNoticeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorkflowTriggerSkippedEntity

```lua
local workflow_trigger_skipped = client:WorkflowTriggerSkipped(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorkflowTriggerSkippedEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    secrets = { active = true },
    test = { active = true },
    timeout = { active = true },
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

