# Composal Lua SDK



The Lua SDK for the Composal API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Agent()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("composal_sdk")

local client = sdk.new({
  apikey = os.getenv("COMPOSAL_APIKEY"),
})
```

### 2. List agent records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local agents, err = client:Agent():list({ organization_id = "example" })
if err then error(err) end

for _, item in ipairs(agents) do
  local rec = item:data_get()
  print(rec["id"])
end
```

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local agent, err = client:Agent():load({ organization_id = "example_organization_id", id = "example_id" })
if err then error(err) end
local rec = agent:data_get()
print(rec["id"])
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Agent():create({ organization_id = "example_organization_id", name = "example_name" })
if err then error(err) end

-- Remove
client:Agent():remove({ id = created:data_get()["id"], organization_id = "example_organization_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local pageprojectrun, err = client:PageProjectRun():load({ id = "example_id", organization_id = "example", project_id = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:PageProjectRun():load({ id = "test01", organization_id = "example", project_id = "example" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Verify the server over HTTPS

An `https://` request goes through LuaSocket and LuaSec, and the SDK checks
the server itself before any of the request is sent: its certificate against
the system's trust store, and its name against the host (an address against
the certificate's addresses). Nothing turns that off. `SSL_CERT_FILE` or
`SSL_CERT_DIR` names the trust store, as for OpenSSL; with neither set and no
system store found, an `https://` request fails rather than going unverified.
`COMPOSAL_CA_BUNDLE` names a PEM file of roots added to the store,
for a local service with its own certificate authority or a self-signed
certificate. A different policy is a custom fetch function, described next.

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COMPOSAL_TEST_LIVE=TRUE
COMPOSAL_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### ComposalSDK

```lua
local sdk = require("composal_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ComposalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `AgentAttachment` | `(data) -> AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `(data) -> AgentAutomationEntity` | Create an AgentAutomation entity instance. |
| `AgentAvatar` | `(data) -> AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `(data) -> AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer` | `(data) -> AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection` | `(data) -> AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentControlFlow` | `(data) -> AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `(data) -> AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `(data) -> AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentFile` | `(data) -> AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput` | `(data) -> AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration` | `(data) -> AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
| `AgentInteraction` | `(data) -> AgentInteractionEntity` | Create an AgentInteraction entity instance. |
| `AgentLibrary` | `(data) -> AgentLibraryEntity` | Create an AgentLibrary entity instance. |
| `AgentManager` | `(data) -> AgentManagerEntity` | Create an AgentManager entity instance. |
| `AgentManagerChoice` | `(data) -> AgentManagerChoiceEntity` | Create an AgentManagerChoice entity instance. |
| `AgentMarketplace` | `(data) -> AgentMarketplaceEntity` | Create an AgentMarketplace entity instance. |
| `AgentMarketplaceShared` | `(data) -> AgentMarketplaceSharedEntity` | Create an AgentMarketplaceShared entity instance. |
| `AgentMissionControl` | `(data) -> AgentMissionControlEntity` | Create an AgentMissionControl entity instance. |
| `AgentOperation` | `(data) -> AgentOperationEntity` | Create an AgentOperation entity instance. |
| `AgentProvisioning` | `(data) -> AgentProvisioningEntity` | Create an AgentProvisioning entity instance. |
| `AgentPullRequest` | `(data) -> AgentPullRequestEntity` | Create an AgentPullRequest entity instance. |
| `AgentQuestion` | `(data) -> AgentQuestionEntity` | Create an AgentQuestion entity instance. |
| `AgentRepository` | `(data) -> AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource` | `(data) -> AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoutine` | `(data) -> AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun` | `(data) -> AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime` | `(data) -> AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSetting` | `(data) -> AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing` | `(data) -> AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite` | `(data) -> AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill` | `(data) -> AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack` | `(data) -> AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `(data) -> AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `(data) -> AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentTeammate` | `(data) -> AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `(data) -> AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread` | `(data) -> AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool` | `(data) -> AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentVerifyProject` | `(data) -> AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `(data) -> AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebhook` | `(data) -> AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork` | `(data) -> AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `(data) -> AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `(data) -> AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `(data) -> AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `(data) -> AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `(data) -> AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `(data) -> AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `AllocationLog` | `(data) -> AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App` | `(data) -> AppEntity` | Create an App entity instance. |
| `AppCdn` | `(data) -> AppCdnEntity` | Create an AppCdn entity instance. |
| `AppConfigVariable` | `(data) -> AppConfigVariableEntity` | Create an AppConfigVariable entity instance. |
| `AppDataResource` | `(data) -> AppDataResourceEntity` | Create an AppDataResource entity instance. |
| `AppDeploy` | `(data) -> AppDeployEntity` | Create an AppDeploy entity instance. |
| `AppDeployment` | `(data) -> AppDeploymentEntity` | Create an AppDeployment entity instance. |
| `AppDeploymentOperation` | `(data) -> AppDeploymentOperationEntity` | Create an AppDeploymentOperation entity instance. |
| `AppDeploymentRollback` | `(data) -> AppDeploymentRollbackEntity` | Create an AppDeploymentRollback entity instance. |
| `AppEnvironment` | `(data) -> AppEnvironmentEntity` | Create an AppEnvironment entity instance. |
| `AppLocation` | `(data) -> AppLocationEntity` | Create an AppLocation entity instance. |
| `AppMetric` | `(data) -> AppMetricEntity` | Create an AppMetric entity instance. |
| `AppPreview` | `(data) -> AppPreviewEntity` | Create an AppPreview entity instance. |
| `AppPreviewProfile` | `(data) -> AppPreviewProfileEntity` | Create an AppPreviewProfile entity instance. |
| `AppRun` | `(data) -> AppRunEntity` | Create an AppRun entity instance. |
| `AppSecret` | `(data) -> AppSecretEntity` | Create an AppSecret entity instance. |
| `AppService` | `(data) -> AppServiceEntity` | Create an AppService entity instance. |
| `AppServiceBinding` | `(data) -> AppServiceBindingEntity` | Create an AppServiceBinding entity instance. |
| `AppServicePlacement` | `(data) -> AppServicePlacementEntity` | Create an AppServicePlacement entity instance. |
| `AppStorageResource` | `(data) -> AppStorageResourceEntity` | Create an AppStorageResource entity instance. |
| `AttachmentPart` | `(data) -> AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AutomationEvent` | `(data) -> AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `(data) -> AutomationRunEntity` | Create an AutomationRun entity instance. |
| `Binary` | `(data) -> BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion` | `(data) -> BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BrowserEgressCandidate` | `(data) -> BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `(data) -> BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `(data) -> BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `(data) -> BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `(data) -> BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `(data) -> BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `(data) -> BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `(data) -> BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `(data) -> BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CatalogSelector` | `(data) -> CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `(data) -> CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `(data) -> CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace` | `(data) -> CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `(data) -> CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `ConnectionRequest` | `(data) -> ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `(data) -> ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
| `CoordinationWait` | `(data) -> CoordinationWaitEntity` | Create a CoordinationWait entity instance. |
| `CredentialSignInCheck` | `(data) -> CredentialSignInCheckEntity` | Create a CredentialSignInCheck entity instance. |
| `DataResourceRotateCredential` | `(data) -> DataResourceRotateCredentialEntity` | Create a DataResourceRotateCredential entity instance. |
| `DeepScan` | `(data) -> DeepScanEntity` | Create a DeepScan entity instance. |
| `DeepScanFinding` | `(data) -> DeepScanFindingEntity` | Create a DeepScanFinding entity instance. |
| `DeepScanFlow` | `(data) -> DeepScanFlowEntity` | Create a DeepScanFlow entity instance. |
| `DeepScanMappedFlow` | `(data) -> DeepScanMappedFlowEntity` | Create a DeepScanMappedFlow entity instance. |
| `DeepScanOption` | `(data) -> DeepScanOptionEntity` | Create a DeepScanOption entity instance. |
| `DemoShare` | `(data) -> DemoShareEntity` | Create a DemoShare entity instance. |
| `DemoShareSegment` | `(data) -> DemoShareSegmentEntity` | Create a DemoShareSegment entity instance. |
| `DeploymentDashboardNomad` | `(data) -> DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentFile` | `(data) -> DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DomainPathRule` | `(data) -> DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream` | `(data) -> DreamEntity` | Create a Dream entity instance. |
| `Environment` | `(data) -> EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `(data) -> EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `(data) -> EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `(data) -> EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `(data) -> EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `(data) -> EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `(data) -> EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `(data) -> EvidenceEntity` | Create an Evidence entity instance. |
| `Exploration` | `(data) -> ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage` | `(data) -> ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `(data) -> ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `(data) -> ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding` | `(data) -> FindingEntity` | Create a Finding entity instance. |
| `GithubConnection` | `(data) -> GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `HostingAppDomain` | `(data) -> HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `ImageRepository` | `(data) -> ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `Integration` | `(data) -> IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse` | `(data) -> InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation` | `(data) -> InvitationEntity` | Create an Invitation entity instance. |
| `JourneyVariantReplay` | `(data) -> JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `(data) -> KnowledgeEntity` | Create a Knowledge entity instance. |
| `LocalThreadDelivery` | `(data) -> LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `(data) -> LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `Me` | `(data) -> MeEntity` | Create a Me entity instance. |
| `MeEmail` | `(data) -> MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding` | `(data) -> MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile` | `(data) -> MediaFileEntity` | Create a MediaFile entity instance. |
| `Member` | `(data) -> MemberEntity` | Create a Member entity instance. |
| `Memory` | `(data) -> MemoryEntity` | Create a Memory entity instance. |
| `MergeRequest` | `(data) -> MergeRequestEntity` | Create a MergeRequest entity instance. |
| `MessagingConversationMessage` | `(data) -> MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `(data) -> MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `(data) -> MetricQueryEntity` | Create a MetricQuery entity instance. |
| `NetworkConnection` | `(data) -> NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NomadAllocation` | `(data) -> NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog` | `(data) -> NomadLogEntity` | Create a NomadLog entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `Page` | `(data) -> PageEntity` | Create a Page entity instance. |
| `PageAgent` | `(data) -> PageAgentEntity` | Create a PageAgent entity instance. |
| `PageProjectRun` | `(data) -> PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PagesProjectCredential` | `(data) -> PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `(data) -> PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `(data) -> PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `(data) -> PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PersonalAccessToken` | `(data) -> PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `(data) -> PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `(data) -> PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `(data) -> PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `(data) -> PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
| `ProductMapIdentityDecision` | `(data) -> ProductMapIdentityDecisionEntity` | Create a ProductMapIdentityDecision entity instance. |
| `ProductMapJourney` | `(data) -> ProductMapJourneyEntity` | Create a ProductMapJourney entity instance. |
| `ProductMapJourneyReplay` | `(data) -> ProductMapJourneyReplayEntity` | Create a ProductMapJourneyReplay entity instance. |
| `ProductMapObservation` | `(data) -> ProductMapObservationEntity` | Create a ProductMapObservation entity instance. |
| `ProductMapQuestion` | `(data) -> ProductMapQuestionEntity` | Create a ProductMapQuestion entity instance. |
| `ProductMapState` | `(data) -> ProductMapStateEntity` | Create a ProductMapState entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `ProjectAndroidApk` | `(data) -> ProjectAndroidApkEntity` | Create a ProjectAndroidApk entity instance. |
| `ProjectCodeMap` | `(data) -> ProjectCodeMapEntity` | Create a ProjectCodeMap entity instance. |
| `ProjectEnvironment` | `(data) -> ProjectEnvironmentEntity` | Create a ProjectEnvironment entity instance. |
| `ProjectFinding` | `(data) -> ProjectFindingEntity` | Create a ProjectFinding entity instance. |
| `ProjectFixture` | `(data) -> ProjectFixtureEntity` | Create a ProjectFixture entity instance. |
| `ProjectIosApp` | `(data) -> ProjectIosAppEntity` | Create a ProjectIosApp entity instance. |
| `ProjectMessagingConversation` | `(data) -> ProjectMessagingConversationEntity` | Create a ProjectMessagingConversation entity instance. |
| `ProjectOverviewMetric` | `(data) -> ProjectOverviewMetricEntity` | Create a ProjectOverviewMetric entity instance. |
| `ProjectOverviewPullRequest` | `(data) -> ProjectOverviewPullRequestEntity` | Create a ProjectOverviewPullRequest entity instance. |
| `ProjectProductMap` | `(data) -> ProjectProductMapEntity` | Create a ProjectProductMap entity instance. |
| `ProjectRecording` | `(data) -> ProjectRecordingEntity` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan` | `(data) -> ProjectRunPlanEntity` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule` | `(data) -> ProjectRunScheduleEntity` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption` | `(data) -> ProjectScenarioOptionEntity` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow` | `(data) -> ProjectScenarioRowEntity` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting` | `(data) -> ProjectSettingEntity` | Create a ProjectSetting entity instance. |
| `PullRequest` | `(data) -> PullRequestEntity` | Create a PullRequest entity instance. |
| `PullRequestSetting` | `(data) -> PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `(data) -> PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `(data) -> PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `Recorder` | `(data) -> RecorderEntity` | Create a Recorder entity instance. |
| `Registry` | `(data) -> RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2` | `(data) -> RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentLocalThread` | `(data) -> RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `ReportReplay` | `(data) -> ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario` | `(data) -> ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RunScenarioRun` | `(data) -> RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `(data) -> RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `(data) -> RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate` | `(data) -> RunUpdateEntity` | Create a RunUpdate entity instance. |
| `ScenarioRevision` | `(data) -> ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `(data) -> ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `(data) -> ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `ServiceEndpoint` | `(data) -> ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `SitePreview` | `(data) -> SitePreviewEntity` | Create a SitePreview entity instance. |
| `SlackChannel` | `(data) -> SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SparkAgentLocalThread` | `(data) -> SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `StaticSite` | `(data) -> StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `(data) -> StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `(data) -> StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `SubscriptionModel` | `(data) -> SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `ThreadPreview` | `(data) -> ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `VerificationProjectCredential` | `(data) -> VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `(data) -> VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `(data) -> VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `(data) -> VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `(data) -> VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `(data) -> VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyStaticSiteDomain` | `(data) -> VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `(data) -> VersionLogEntity` | Create a VersionLog entity instance. |
| `WebBotAuth` | `(data) -> WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WorkflowRunStep` | `(data) -> WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `(data) -> WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `(data) -> WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `patch` | `(reqdata, ctrl) -> any, err` | Change part of an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `patch` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local agent, err = client:Agent():load({ id = "example_id", organization_id = "example" })
    if err then error(err) end
    -- agent is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Agent

| Field | Description |
| --- | --- |
| `attention` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` |  |
| `can_manage` |  |
| `can_manage_sharing` |  |
| `can_name_managers` | Whether the viewer may name managers now. |
| `can_queue_input` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` |  |
| `configuration_revision` |  |
| `configuration_version` | Opaque version token. |
| `control_connections_available` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` |  |
| `coordination_available` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` |  |
| `direct_chat_available` | Advisory availability of direct V1 chat. |
| `has_unread_updates` |  |
| `id` |  |
| `last_reply_at` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | Opaque version token. |
| `local_agent_control_available` | Whether this organization exposes paired local coding-agent control. |
| `managers` | Teammates named as managers beside the owner. |
| `model_change_action` | Advisory composer action. |
| `name` |  |
| `organization_id` |  |
| `persona` |  |
| `preview` |  |
| `preview_received_at` | When a newer canonical conversation preview was first projected. |
| `provisioning` |  |
| `reply_triage` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | Immutable execution runtime selected at creation. |
| `setup_pending` |  |
| `sharing_fixed` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` |  |
| `slug` | Optional explicit API alias. |
| `status` |  |
| `team_role` | What teammates may do once the agent is shared with the team. |
| `updated_at` |  |
| `url_slug` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | Defaults to organization. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened`

#### AgentAttachment

| Field | Description |
| --- | --- |
| `byte_size` |  |
| `content_type` |  |
| `file_name` |  |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete`

#### AgentAutomation

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `can_manage_events` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | Whether the viewer can request a manual Temporal run |
| `can_schedule` |  |
| `definition` |  |
| `event_subscriptions` |  |
| `event_triggers` |  |
| `expected_revision` |  |
| `id` |  |
| `key` |  |
| `name` |  |
| `revision` |  |
| `schedule` |  |
| `schedules` |  |
| `version` |  |

Operations: List, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations`

#### AgentAvatar

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/avatar/generate`

#### AgentCommand

| Field | Description |
| --- | --- |
| `description` |  |
| `display_name` |  |
| `name` |  |
| `skill_model_visible` |  |
| `source` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/commands`

#### AgentComputer

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer/connect`

#### AgentConnection

| Field | Description |
| --- | --- |
| `agent_card_url` |  |
| `auth_scheme` |  |
| `can_configure` |  |
| `can_disconnect` |  |
| `can_setup` |  |
| `connection` |  |
| `credential` | Write-only outbound key. |
| `error_code` |  |
| `expected_generation` |  |
| `generation` |  |
| `id` |  |
| `name` |  |
| `remote_agent` |  |
| `requester_id` |  |
| `retired_at` |  |
| `revoked_at` |  |
| `scope_key` |  |
| `source_operation_id` |  |
| `state` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup`

#### AgentControlFlow

| Field | Description |
| --- | --- |
| `can_cancel` |  |
| `cancellation_requested` |  |
| `device_name` |  |
| `flow_id` |  |
| `id` |  |
| `providers` |  |
| `repair_of_flow_id` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` |  |
| `step_count` |  |
| `title` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel`

#### AgentCoordination

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/stop`

#### AgentEmail

| Field | Description |
| --- | --- |
| `delivery` | What SES reported for mail the agent sent; null for received mail |
| `direction` | inbound: mail the agent received; outbound: mail it sent |
| `from` |  |
| `id` |  |
| `preview` |  |
| `received_at` |  |
| `recipient_tag` | The +tag the sender used, if any |
| `spam` | SES judged it spam |
| `subject` |  |
| `text` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}`

#### AgentFile

| Field | Description |
| --- | --- |
| `content_type` |  |
| `download_url` |  |
| `filename` |  |
| `id` |  |
| `size_bytes` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/files/{file_id}`

#### AgentInput

| Field | Description |
| --- | --- |
| `attachment_ids` | Completed uploads from the attachments endpoint, in order. |
| `attachments` |  |
| `browser_context` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` |  |
| `requester_membership_id` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/inputs`

#### AgentIntegration

| Field | Description |
| --- | --- |
| `account_counts` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` |  |
| `can_manage_organization` |  |
| `catalog` |  |
| `connect_as` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` |  |
| `connections` |  |
| `email` | A native agent's own email address. |
| `enabled` |  |
| `enabled_toolkits` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` |  |
| `pagination` |  |
| `pending_counts` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | The personal account creation endpoint honors a creation key. |
| `private_agent` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` |  |
| `webhook_connections` |  |
| `webhooks_available` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations`

#### AgentInteraction

| Field | Description |
| --- | --- |
| `id` |  |
| `interactions` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel`

#### AgentLibrary

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/library/{artifact_id}/download`

#### AgentManager

| Field | Description |
| --- | --- |
| `attention` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` |  |
| `can_manage` |  |
| `can_manage_sharing` |  |
| `can_name_managers` | Whether the viewer may name managers now. |
| `can_queue_input` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` |  |
| `configuration_revision` |  |
| `configuration_version` | Opaque version token. |
| `control_connections_available` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` |  |
| `coordination_available` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` |  |
| `direct_chat_available` | Advisory availability of direct V1 chat. |
| `has_unread_updates` |  |
| `id` |  |
| `last_reply_at` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | Opaque version token. |
| `local_agent_control_available` | Whether this organization exposes paired local coding-agent control. |
| `managers` | Teammates named as managers beside the owner. |
| `model_change_action` | Advisory composer action. |
| `name` |  |
| `organization_id` |  |
| `persona` |  |
| `preview` |  |
| `preview_received_at` | When a newer canonical conversation preview was first projected. |
| `provisioning` |  |
| `reply_triage` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | Immutable execution runtime selected at creation. |
| `setup_pending` |  |
| `sharing_fixed` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` |  |
| `slug` |  |
| `status` |  |
| `team_role` | What teammates may do once the agent is shared with the team. |
| `updated_at` |  |
| `url_slug` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` |  |
| `visibility` |  |

Operations: Create, Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/managers`

#### AgentManagerChoice

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/manager_choices`

#### AgentMarketplace

| Field | Description |
| --- | --- |
| `bundle` |  |
| `can_manage` |  |
| `catalog_key` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` |  |
| `category` |  |
| `counts` |  |
| `created_at` |  |
| `expected_version` |  |
| `explainer` | The listing's public write-up in Markdown. |
| `featured` |  |
| `from_composal` | One of Composal's ready-made listings. |
| `id` |  |
| `installs_count` |  |
| `instructions` |  |
| `integration_toolkits` |  |
| `integrations` |  |
| `listing` |  |
| `listings` |  |
| `memories` |  |
| `name` |  |
| `next_page` |  |
| `organization_name` |  |
| `page_apps` |  |
| `publisher_avatar_url` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | "Composal" on listings Composal publishes. |
| `sections` |  |
| `share_token` | Present only for people who manage the listing. |
| `skills` |  |
| `slug` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | The V2 agent this listing was published from. |
| `summary` |  |
| `updated_at` |  |
| `version` |  |
| `viewer` | Who a public marketplace response was read for. |
| `visibility` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_marketplace/{id}/install`

#### AgentMarketplaceShared

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `catalog_key` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` |  |
| `counts` |  |
| `created_at` |  |
| `explainer` | The listing's public write-up in Markdown. |
| `featured` |  |
| `from_composal` | One of Composal's ready-made listings. |
| `id` |  |
| `installs_count` |  |
| `instructions` |  |
| `integration_toolkits` |  |
| `integrations` |  |
| `listing` |  |
| `memories` |  |
| `name` |  |
| `organization_name` |  |
| `page_apps` |  |
| `publisher_avatar_url` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | "Composal" on listings Composal publishes. |
| `share_token` | Present only for people who manage the listing. |
| `skills` |  |
| `slug` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` |  |
| `updated_at` |  |
| `version` |  |
| `viewer` | Who a public marketplace response was read for. |
| `visibility` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install`

#### AgentMissionControl

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/mission_control/feedback`

#### AgentOperation

| Field | Description |
| --- | --- |
| `arguments` | JSON object limited to 65536 encoded bytes. |
| `id` |  |
| `key` |  |
| `name` |  |
| `operation` |  |
| `participant` |  |
| `requester_id` | Signed-in user public ID returned by discovery. |
| `scope_key` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations`

#### AgentProvisioning

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/provisioning/retry`

#### AgentPullRequest

| Field | Description |
| --- | --- |
| `id` |  |
| `number` |  |
| `owners` |  |
| `repository` |  |
| `status` |  |
| `title` |  |
| `url` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/pull_requests`

#### AgentQuestion

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/questions/{question_id}/answer`

#### AgentRepository

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `environments` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` |  |
| `id` |  |
| `repository_choices` |  |
| `repository_choices_error` | GitHub discovery warning. |
| `repository_choices_truncated` |  |
| `version` |  |
| `work_repositories` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories`

#### AgentResource

| Field | Description |
| --- | --- |
| `name` |  |
| `uri` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resources`

#### AgentRoutine

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `consecutive_errors` |  |
| `credit_wait` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` |  |
| `enabled` |  |
| `id` |  |
| `kind` |  |
| `last_error` |  |
| `last_run_at` |  |
| `last_status` |  |
| `managed` |  |
| `name` |  |
| `next_run_at` |  |
| `routine` |  |
| `schedule` |  |
| `schedule_label` |  |
| `utility_model` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/routines`

#### AgentRun

| Field | Description |
| --- | --- |
| `error` |  |
| `id` |  |
| `run_id` |  |
| `status` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/runs/{run_id}`

#### AgentRuntime

| Field | Description |
| --- | --- |
| `available_profiles` |  |
| `can_manage` |  |
| `can_reset` |  |
| `image` |  |
| `memory_mb` |  |
| `platform` |  |
| `profile` |  |
| `provider` |  |
| `state` |  |
| `version` |  |
| `volume` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset`

#### AgentSetting

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `expected_version` |  |
| `instructions` |  |
| `version` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/settings`

#### AgentSharing

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/sharing/review`

#### AgentSite

| Field | Description |
| --- | --- |
| `deployed_at` |  |
| `deployments_count` |  |
| `hostname` |  |
| `https` | Whether the organization's certificate serves this site over HTTPS |
| `id` |  |
| `name` |  |
| `url` |  |
| `visibility` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/sites`

#### AgentSkill

| Field | Description |
| --- | --- |
| `available` |  |
| `can_configure` |  |
| `can_manage` |  |
| `configuration_state` | The requested managed skill selection is awaiting runtime qualification. |
| `description` |  |
| `enabled` |  |
| `name` |  |
| `skills` |  |
| `version` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/skills`

#### AgentSlack

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/app`

#### AgentSubagent

| Field | Description |
| --- | --- |
| `active` |  |
| `attention` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` |  |
| `id` |  |
| `model` |  |
| `parent_id` |  |
| `preview` |  |
| `started_at` |  |
| `state` | What the thread is to the viewer. |
| `status` |  |
| `title` |  |
| `updated_at` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subagents`

#### AgentSubscription

| Field | Description |
| --- | --- |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions`

#### AgentTeammate

| Field | Description |
| --- | --- |
| `avatar` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` |  |
| `name` |  |
| `persona` |  |
| `slug` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/teammates`

#### AgentTerminal

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/terminal/connect`

#### AgentThread

| Field | Description |
| --- | --- |
| `archived_count` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` |  |
| `execution` |  |
| `first_input` |  |
| `first_input_key` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | Membership the first message was sent as, for input_delivery. |
| `id` |  |
| `inherit_context` | Include the source conversation through its last completed reply. |
| `local_activities` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` |  |
| `local_scope_key` |  |
| `local_status_pending` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` |  |
| `main_thread_id` |  |
| `message` | The thread's first message. |
| `next_cursor` |  |
| `parent_conversation_id` | Optional source conversation belonging to this agent. |
| `requester_membership_id` |  |
| `selected_thread` |  |
| `thread` |  |
| `threads` |  |
| `title` |  |
| `total_archived_count` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `description` |  |
| `inputSchema` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools`

#### AgentVerifyProject

| Field | Description |
| --- | --- |
| `available` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` |  |
| `project_choices` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` |  |
| `verify_projects` |  |
| `version` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects`

#### AgentWait

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/waits/{wait_id}/stop`

#### AgentWebhook

| Field | Description |
| --- | --- |
| `action` |  |
| `connection` |  |
| `deliveries` |  |
| `event_types` |  |
| `expected_generation` |  |
| `id` |  |
| `max_events_per_day` |  |
| `name` |  |
| `purpose` |  |
| `signing_key` | Revealed only by the first successful creation or rotation response. |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks`

#### AgentWork

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/work/{work_id}/handled`

#### AgentWorkflow

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `expected_digest` |  |
| `path` |  |
| `source` | At most 262144 UTF-8 bytes |
| `template` | A template id from the catalog's templates |
| `templates` |  |
| `truncated` |  |
| `workflows` |  |

Operations: Create, List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflows`

#### AgentWorkflowProposal

| Field | Description |
| --- | --- |
| `agent_steps` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` |  |
| `can_revise` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` |  |
| `definition` |  |
| `digest` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` |  |
| `model_choices` | Models the viewer may choose for the agent steps before saving. |
| `name` |  |
| `native_rows` |  |
| `path` |  |
| `pipeline_checkpoints` |  |
| `pipeline_commands` |  |
| `reasoning_choices` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` |  |
| `stale` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | Why the save could not set the trigger; only in the reply to that save. |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise`

#### AgentWorkflowRun

| Field | Description |
| --- | --- |
| `action` |  |
| `automation` | Saved native automation identity. |
| `budget_seconds` | The run stops once it has been running this long |
| `budget_usd` | The run stops before a step once it has spent this much |
| `can_answer` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | The thread the run works in, which the person opens to follow it |
| `decision_history` |  |
| `error` |  |
| `finished_at` |  |
| `flow_steps` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | Public run ID. |
| `needs_you` | Whether a step stopped the run for the person, who can answer it |
| `note` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` |  |
| `running_seconds` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` |  |
| `spent_tokens` | The tokens the run's agent steps have used so far |
| `spent_usd` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` |  |
| `started_by` | The event that started the run |
| `status` |  |
| `step_count` |  |
| `steps` |  |
| `trigger_id` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | When a sleeping run's step looks again |
| `workflow_digest` | SHA-256 of the immutable definition this run uses |
| `workflow_path` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer`

#### AgentWorkflowTrigger

| Field | Description |
| --- | --- |
| `budget` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` |  |
| `can_pause` | It is running, so a manager can pause it |
| `can_resume` | A person paused it, so a manager can resume it |
| `can_review` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | How many events a day may start an event workflow's runs |
| `day_resets_at` | When the daily count starts again, at the organization's midnight |
| `id` |  |
| `kind` |  |
| `next_due_at` |  |
| `pause_cause` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` |  |
| `schedule` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | Events skipped today, over the daily limit or while paused |
| `stale_at` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` |  |
| `starts` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | The event subscription that starts it |
| `time_zone` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | Events that started a run today, for an event workflow |
| `trigger` |  |
| `workflow_path` |  |

Operations: List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers`

#### AgentWorkspace

| Field | Description |
| --- | --- |
| `action` |  |
| `can_delete` |  |
| `can_keep` |  |
| `cleanup_after` |  |
| `created_at` |  |
| `id` |  |
| `name` |  |
| `reason` |  |
| `state` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workspaces`

#### AgentWritePermission

| Field | Description |
| --- | --- |
| `account` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` |  |
| `granted_by` |  |
| `id` |  |
| `in_effect` | Whether the permission approves writes now. |
| `last_used_at` |  |
| `tool` | The tool the agent writes with, such as linear.update_issue. |

Operations: List, Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/write_permissions`

#### AllocationLog

| Field | Description |
| --- | --- |
| `allocation_id` |  |
| `environment` |  |
| `fetched_at` |  |
| `location` |  |
| `logs` |  |
| `namespace` |  |
| `offset` |  |
| `origin` |  |
| `service` |  |
| `task` |  |
| `type` |  |

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs`

#### App

| Field | Description |
| --- | --- |
| `created_at` |  |
| `created_at_label` |  |
| `description` |  |
| `framework` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `repository_id` |  |
| `repository_kind` |  |
| `root_path` |  |
| `root_path_display` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{id}/activate`

#### AppCdn

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `cache_path_prefix` |  |
| `cache_settings_json` |  |
| `created_at` |  |
| `created_at_label` |  |
| `distribution_kind` |  |
| `edge_hostname` |  |
| `failure_message` |  |
| `hosted_app_id` |  |
| `hostnames` |  |
| `id` |  |
| `last_deployed_at` |  |
| `last_deployed_at_label` |  |
| `last_purged_at` |  |
| `last_purged_at_label` |  |
| `last_synced_at` |  |
| `last_synced_at_label` |  |
| `name` |  |
| `origin_url` |  |
| `provisioned` |  |
| `routing_settings_json` |  |
| `security_settings_json` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{id}/archive`

#### AppConfigVariable

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `created_at` |  |
| `description` |  |
| `exposed_to_build` |  |
| `has_value` |  |
| `hosted_app_id` |  |
| `id` |  |
| `key` |  |
| `scope_kind` |  |
| `updated_at` |  |
| `value` |  |
| `value_kind` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/config_variables/{id}/disable`

#### AppDataResource

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `created_at` |  |
| `engine` |  |
| `failure_message` |  |
| `high_availability` |  |
| `hosted_app_id` |  |
| `id` |  |
| `kind` |  |
| `name` |  |
| `plan` |  |
| `provider_metadata` |  |
| `region` |  |
| `slug` |  |
| `status` |  |
| `storage_gb` |  |
| `storage_label` |  |
| `updated_at` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/data_resources/{id}/archive`

#### AppDeploy

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `channel` |  |
| `command` |  |
| `commit_sha` |  |
| `desired_instances` |  |
| `environment` | Environment slug or public ID, all, or existing. |
| `image` |  |
| `region` |  |
| `rollout_predecessor` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/deploys`

#### AppDeployment

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `app_service_placement_id` |  |
| `artifact_locator` |  |
| `build_role` |  |
| `commit_sha` |  |
| `created_at` |  |
| `created_at_label` |  |
| `creator_user_id` |  |
| `deployed_url` |  |
| `display_id` |  |
| `failure_message` |  |
| `finished_at` |  |
| `finished_at_label` |  |
| `hosted_app_id` |  |
| `id` |  |
| `idempotency_key` |  |
| `is_rollback` |  |
| `location` |  |
| `location_id` |  |
| `number` |  |
| `operation_key` |  |
| `organization_id` |  |
| `rollback_reason` |  |
| `rollback_source_deployment_id` |  |
| `rollback_source_release_id` |  |
| `rollback_target_release_id` |  |
| `source_ref` |  |
| `started_at` |  |
| `started_at_label` |  |
| `status` |  |
| `trigger_kind` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/deployments/{id}/cancel`

#### AppDeploymentOperation

| Field | Description |
| --- | --- |
| `app` |  |
| `app_environment_id` |  |
| `app_service_id` |  |
| `app_service_placement_id` |  |
| `artifact_locator` |  |
| `build_duration_seconds` |  |
| `build_source` |  |
| `build_status` |  |
| `children` |  |
| `ci_pipeline_id` |  |
| `ci_pipeline_run_id` |  |
| `commit_sha` |  |
| `created_at` |  |
| `creator` |  |
| `deployed_url` |  |
| `duration_seconds` |  |
| `environment` |  |
| `failure_message` |  |
| `finished_at` |  |
| `history_kind` |  |
| `history_reason` |  |
| `id` |  |
| `is_live` |  |
| `is_rollback` |  |
| `live_region_count` |  |
| `location_id` |  |
| `number` |  |
| `placement` |  |
| `region_count` |  |
| `replicas_per_region` |  |
| `rollback_reason` |  |
| `rollback_source_release_id` |  |
| `rollback_target_release_id` |  |
| `rollout_predecessor_id` |  |
| `rollout_status` |  |
| `rollout_strategy` |  |
| `service` |  |
| `source_ref` |  |
| `started_at` |  |
| `status` |  |
| `total_replicas` |  |
| `trigger_kind` |  |
| `updated_at` |  |

Operations: Create, List, Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel`

#### AppDeploymentRollback

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_id` |  |
| `app_service_id` |  |
| `blockers` |  |
| `candidate_releases` |  |
| `confirmation_text` |  |
| `current_deployment` |  |
| `current_release` |  |
| `deployment` |  |
| `desired_state` |  |
| `environment` |  |
| `execution_allowed` |  |
| `force` |  |
| `idempotency_key` |  |
| `idempotent_reuse` |  |
| `location` |  |
| `operation` |  |
| `reason` |  |
| `rollback_release` |  |
| `rollout` |  |
| `service` |  |
| `target_artifact_locator` |  |
| `target_release` |  |
| `to` |  |
| `warnings` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/deployment_rollbacks`

#### AppEnvironment

| Field | Description |
| --- | --- |
| `auto_deploy` |  |
| `base_domain` |  |
| `branch_pattern` |  |
| `created_at` |  |
| `created_at_label` |  |
| `hosted_app_id` |  |
| `id` |  |
| `kind` |  |
| `location` |  |
| `location_id` |  |
| `name` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/environments/{id}/archive`

#### AppLocation

| Field | Description |
| --- | --- |
| `code` |  |
| `created_at` |  |
| `id` |  |
| `location_id` |  |
| `name` |  |
| `nomad_datacenter` |  |
| `updated_at` |  |

Operations: Create, List, Remove.

API path: `/api/v1/hosting/apps/{app_id}/locations`

#### AppMetric

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/metrics/query_range`

#### AppPreview

| Field | Description |
| --- | --- |
| `access` |  |
| `app_preview_profile_id` |  |
| `change_number` | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` |  |
| `id` |  |
| `name` |  |
| `resource_overrides` | Service public IDs mapped to resource overrides. |
| `retained` |  |
| `shared_data_binding_ids` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | Replace the explicitly shared captured service dependencies. |
| `slug` |  |
| `source_ref` |  |
| `storage_binding_resources` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/archive`

#### AppPreviewProfile

| Field | Description |
| --- | --- |
| `automatic` |  |
| `configuration` |  |
| `created_at` |  |
| `hosted_app_id` |  |
| `id` |  |
| `name` |  |
| `slug` |  |
| `source_environment_id` |  |
| `ttl_days` |  |
| `updated_at` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles`

#### AppRun

| Field | Description |
| --- | --- |
| `id` |  |
| `image` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

Operations: Create, List, Load.

API path: `/api/v1/hosting/app_runs/{id}/cancel`

#### AppSecret

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` |  |
| `env_key` |  |
| `expose_to_build` |  |
| `has_value` |  |
| `hosted_app_id` |  |
| `id` |  |
| `latest_version_number` |  |
| `name` |  |
| `organization_id` |  |
| `rotation_policy` |  |
| `scope_kind` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `value` |  |
| `value_digest` |  |
| `value_kind` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/secrets/{id}/set_value`

#### AppService

| Field | Description |
| --- | --- |
| `auto_deploy` |  |
| `bindings` |  |
| `build_command` |  |
| `cpu_label` |  |
| `cpu_mhz` |  |
| `created_at` |  |
| `created_at_label` |  |
| `deploy_paths` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` |  |
| `disk_label` |  |
| `disk_mb` |  |
| `effective_deploy_paths` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` |  |
| `hosted_app_id` |  |
| `id` |  |
| `internal_port` |  |
| `kind` |  |
| `memory_label` |  |
| `memory_max_label` |  |
| `memory_max_mb` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` |  |
| `name` |  |
| `nomad_constraints_json` |  |
| `nomad_kill_timeout_seconds` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` |  |
| `nomad_region` |  |
| `nomad_shutdown_delay_seconds` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` |  |
| `prestart_command` |  |
| `publicly_accessible` |  |
| `release_command` |  |
| `repo_source_path` |  |
| `runtime` |  |
| `runtime_adapter_kind` |  |
| `runtime_adapter_settings_json` |  |
| `schedule` |  |
| `slug` |  |
| `source_path` |  |
| `start_command` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{id}/archive`

#### AppServiceBinding

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable`

#### AppServicePlacement

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `created_at` |  |
| `deployment_channel` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` |  |
| `id` |  |
| `mode` |  |
| `organization_id` |  |
| `region_count` |  |
| `replicas_per_region` |  |
| `rollout_strategy` |  |
| `targets` |  |
| `total_replicas` |  |
| `updated_at` |  |

Operations: List, Load, Update.

API path: `/api/v1/hosting/apps/{app_id}/service_placements`

#### AppStorageResource

| Field | Description |
| --- | --- |
| `access_mode` | Object-store semantics only; ignored for volume resources |
| `app_environment_id` |  |
| `attachment` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` |  |
| `created_at` |  |
| `ephemeral` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` |  |
| `id` |  |
| `kind` |  |
| `location_code` |  |
| `location_id` | Volume datacenter pin (volume kind only) |
| `mount_path` |  |
| `name` |  |
| `provider` | Storage backend. |
| `provider_error` | Last provisioning/teardown error from the storage provider |
| `region` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}`

#### AutomationEvent

| Field | Description |
| --- | --- |
| `action` |  |
| `can_manage` |  |
| `can_manage_events` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | Whether the viewer can request a manual Temporal run |
| `can_schedule` |  |
| `event_subscriptions` |  |
| `event_triggers` |  |
| `expected_revision` |  |
| `id` |  |
| `key` |  |
| `name` |  |
| `revision` |  |
| `schedule` |  |
| `schedules` |  |
| `settings` |  |
| `subscription_key` |  |
| `version` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events`

#### AutomationRun

| Field | Description |
| --- | --- |
| `action` |  |
| `automation` | Saved native automation identity. |
| `budget_seconds` | The run stops once it has been running this long |
| `budget_usd` | The run stops before a step once it has spent this much |
| `can_answer` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | The thread the run works in, which the person opens to follow it |
| `decision_history` |  |
| `error` |  |
| `finished_at` |  |
| `flow_steps` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` |  |
| `input` |  |
| `needs_you` | Whether a step stopped the run for the person, who can answer it |
| `note` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` |  |
| `resume_count` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` |  |
| `running_seconds` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` |  |
| `spent_tokens` | The tokens the run's agent steps have used so far |
| `spent_usd` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` |  |
| `started_by` | The event that started the run |
| `status` |  |
| `step_count` |  |
| `steps` |  |
| `trigger_id` | The run settings that started it, for a run an event or schedule started |
| `version_id` |  |
| `wake_at` | When a sleeping run's step looks again |
| `workflow_digest` | SHA-256 of the immutable definition this run uses |
| `workflow_path` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs`

#### Binary

| Field | Description |
| --- | --- |
| `accepts_versions` |  |
| `arch` |  |
| `archived_at` |  |
| `binary` |  |
| `created_at` |  |
| `download_secret` |  |
| `download_url` |  |
| `executable` |  |
| `format` |  |
| `id` |  |
| `idempotency_key` |  |
| `latest_version` |  |
| `launch_args` |  |
| `name` |  |
| `needs_refresh` |  |
| `operation` |  |
| `pagination` |  |
| `permissions` |  |
| `platform` |  |
| `project_id` |  |
| `sha256` |  |
| `slug` |  |
| `version` |  |
| `version_defaults` |  |
| `versions` |  |
| `window_title` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{id}/archive`

#### BinaryVersion

| Field | Description |
| --- | --- |
| `arch` |  |
| `cancelable` |  |
| `configuration` |  |
| `configuration_digest` |  |
| `created_at` |  |
| `deletable` |  |
| `download_secret` |  |
| `download_url` |  |
| `environment_uses` |  |
| `executable` |  |
| `format` |  |
| `id` |  |
| `idempotency_key` |  |
| `launch_args` |  |
| `operation` |  |
| `package_sha256` |  |
| `package_size` |  |
| `permissions` |  |
| `platform` |  |
| `preparations` |  |
| `retryable` |  |
| `sha256` |  |
| `status` |  |
| `version` |  |
| `window_title` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel`

#### BrowserEgressCandidate

| Field | Description |
| --- | --- |
| `id` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/browser_egress/candidates`

#### BrowserSession

| Field | Description |
| --- | --- |
| `active_task_id` |  |
| `authentication_status` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` |  |
| `closure_basis` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` |  |
| `controller` |  |
| `credential_id` | Optional configured credential public ID within the selected project. |
| `environment_id` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` |  |
| `expires_at` |  |
| `failure_code` |  |
| `id` |  |
| `idempotency_key` |  |
| `initial_url` |  |
| `max_seconds` |  |
| `pending_control_id` |  |
| `project_id` | Optional project slug or public ID. |
| `reconciled_at` |  |
| `started_at` |  |
| `status` |  |
| `url` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control`

#### BrowserSessionConnection

| Field | Description |
| --- | --- |
| `generation` |  |
| `idempotency_key` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections`

#### BrowserSessionControl

| Field | Description |
| --- | --- |
| `browser_session_id` |  |
| `completed_at` |  |
| `completed_generation` |  |
| `connection` |  |
| `failure_code` |  |
| `id` |  |
| `requested_controller` |  |
| `requested_generation` |  |
| `status` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}`

#### BrowserSessionEvent

| Field | Description |
| --- | --- |
| `browser_task_id` |  |
| `created_at` |  |
| `id` |  |
| `kind` |  |
| `payload` |  |
| `source_sequence` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events`

#### BrowserSessionMedia

| Field | Description |
| --- | --- |
| `browser_session_id` |  |
| `capture_omissions` |  |
| `captured_at` |  |
| `ended_at` |  |
| `failure_code` |  |
| `files` |  |
| `frames` |  |
| `id` |  |
| `kind` |  |
| `partial` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` |  |
| `source` | Screenshot provenance. |
| `status` |  |
| `stop_requested_at` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}`

#### BrowserSessionRecording

| Field | Description |
| --- | --- |
| `id` |  |
| `idempotency_key` |  |
| `wait` | Only screenshots support wait: true. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings/{id}/stop`

#### BrowserSessionScreenshot

| Field | Description |
| --- | --- |
| `idempotency_key` |  |
| `wait` | Only screenshots support wait: true. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/screenshots`

#### BrowserSessionTask

| Field | Description |
| --- | --- |
| `activity` |  |
| `browser_session_id` |  |
| `cancel_requested_at` |  |
| `completed_at` |  |
| `control_generation` |  |
| `deadline_at` |  |
| `effects_unknown` |  |
| `failure_code` |  |
| `id` |  |
| `idempotency_key` |  |
| `instruction` |  |
| `max_rounds` |  |
| `max_seconds` |  |
| `model_selection` |  |
| `outcome` |  |
| `result` |  |
| `started_at` |  |
| `status` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}/cancel`

#### CatalogSelector

| Field | Description |
| --- | --- |
| `app` |  |

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/catalog/selectors`

#### CdnDeployment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments`

#### CdnHostname

| Field | Description |
| --- | --- |
| `app_cdn_distribution_id` |  |
| `created_at` |  |
| `dns_status` |  |
| `force_ssl` |  |
| `hostname` |  |
| `id` |  |
| `provider_hostname_id` |  |
| `tls_status` |  |
| `updated_at` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames`

#### CdnSpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/cdn_spaces/{id}/archive`

#### CdnSpaceObject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: List, Load, Remove, Update.

API path: `/api/v1/cdn_spaces/{cdn_space_id}/objects`

#### ConnectionRequest

| Field | Description |
| --- | --- |
| `agent_card_url` |  |
| `auth_scheme` |  |
| `can_configure` |  |
| `can_disconnect` |  |
| `can_setup` |  |
| `error_code` |  |
| `generation` |  |
| `id` |  |
| `name` |  |
| `remote_agent` |  |
| `retired_at` |  |
| `revoked_at` |  |
| `source_operation_id` |  |
| `state` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}`

#### ConnectionSource

| Field | Description |
| --- | --- |
| `device_id` |  |
| `device_name` |  |
| `provider` |  |
| `source_operation_id` |  |
| `title` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/sources`

#### CoordinationWait

| Field | Description |
| --- | --- |
| `can_stop` |  |
| `expires_at` |  |
| `id` |  |
| `status` |  |
| `stop_state` |  |
| `wake_outcome` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/waits`

#### CredentialSignInCheck

| Field | Description |
| --- | --- |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | The project environment (app) to sign in to |
| `environment_name` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks`

#### DataResourceRotateCredential

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `created_at` |  |
| `engine` |  |
| `failure_message` |  |
| `high_availability` |  |
| `hosted_app_id` |  |
| `id` |  |
| `kind` |  |
| `name` |  |
| `plan` |  |
| `provider_metadata` |  |
| `region` |  |
| `slug` |  |
| `status` |  |
| `storage_gb` |  |
| `storage_label` |  |
| `updated_at` |  |
| `version` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials`

#### DeepScan

| Field | Description |
| --- | --- |
| `account_id` |  |
| `active` |  |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` |  |
| `environment_name` |  |
| `explorations` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `idempotency_key` |  |
| `launch_options` | Present only when launch was requested by an admin |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` |  |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce`

#### DeepScanFinding

| Field | Description |
| --- | --- |
| `finding_count` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | Original team order used by legacy hash links and rerun indices. |
| `findings` |  |
| `findings_fix_prompt` |  |
| `free_findings_pending` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` |  |
| `mode` |  |
| `permissions` |  |
| `priority` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` |  |
| `project_id` |  |
| `reproduction_of` |  |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` |  |
| `title` |  |
| `unlock` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings`

#### DeepScanFlow

| Field | Description |
| --- | --- |
| `account_id` |  |
| `concurrency` |  |
| `environment_id` |  |
| `exploration_id` |  |
| `flow_names` |  |
| `idempotency_key` |  |
| `max_seconds` |  |
| `max_testers` |  |
| `note` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/flows`

#### DeepScanMappedFlow

| Field | Description |
| --- | --- |
| `account_id` |  |
| `environment_id` |  |
| `flow_map` |  |
| `revision_id` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/mapped_flows`

#### DeepScanOption

| Field | Description |
| --- | --- |
| `accounts` |  |
| `deep_scan_defaults` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` |  |
| `name` |  |
| `personas` |  |
| `preview` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/options`

#### DemoShare

| Field | Description |
| --- | --- |
| `head_sha` |  |
| `id` |  |
| `recording` |  |
| `summary` | What the recorded browser confirmed. |

Operations: Load.

API path: `/api/v1/verify/demo_shares/{token}`

#### DemoShareSegment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/verify/demo_shares/{token}/segments/{segment_id}`

#### DeploymentDashboardNomad

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation`

#### DeploymentFile

| Field | Description |
| --- | --- |

Operations: Update.

API path: `/api/v1/static_sites/{static_site_id}/deployments/{id}/files`

#### DomainPathRule

| Field | Description |
| --- | --- |
| `action_kind` |  |
| `app_service_endpoint_id` |  |
| `app_service_id` |  |
| `backend_ref` |  |
| `created_at` |  |
| `id` |  |
| `last_error` |  |
| `path_prefix` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules`

#### Dream

| Field | Description |
| --- | --- |
| `attention` | The dream skipped at least one run, which will not be retried |
| `changes` | One page of changes when tab is changes; empty otherwise |
| `completed_at` |  |
| `counts` |  |
| `dream` |  |
| `error_code` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | Public id used in the dream's URL |
| `pagination` |  |
| `permissions` |  |
| `phase` | Where the dream is. |
| `reason` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | Local day whose finished runs it reviewed |
| `runs` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | Project or unassigned environment name |
| `skipped` | Runs skipped after repeated rejected review output |
| `tab` |  |
| `timezone` | Organization timezone the dream used |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/dreams/{id}/resume`

#### Environment

| Field | Description |
| --- | --- |
| `active_revision_id` |  |
| `agent_sign_up_available` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | read_only only looks around; writes may create, change and delete data. |
| `billing` |  |
| `cleanup` |  |
| `connection` |  |
| `created_at` |  |
| `default_policy` |  |
| `default_policy_json` |  |
| `discovery_defaults` |  |
| `environment` |  |
| `exploration_accounts` |  |
| `explorations` |  |
| `first_run` |  |
| `hosted_app_id` |  |
| `id` |  |
| `imessage_number` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` |  |
| `managed_google_available` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` |  |
| `messaging_tester_number` | One configured tester number. |
| `name` | Optional for a website target; defaults to its hostname. |
| `network_connections` |  |
| `onboarding_discovery` |  |
| `organization_id` |  |
| `pending_accounts` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` |  |
| `project_id` | Owning project. |
| `repository_id` |  |
| `revisions` |  |
| `setup_discovery_id` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | Whether a test account's live sign-in check can run on this app. |
| `slug` |  |
| `status` |  |
| `target_kind` |  |
| `target_url` |  |
| `test_accounts` |  |
| `updated_at` |  |
| `verify_network_connection_id` |  |
| `version` | Required for target or tester changes; use lock_version from the environment. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments`

#### EnvironmentDiscoveryRun

| Field | Description |
| --- | --- |
| `account_id` | Omit for anonymous exploration |
| `deadline_at` |  |
| `environment_revision_id` |  |
| `evidence` |  |
| `failure_code` |  |
| `id` |  |
| `queued_at` |  |
| `recording` |  |
| `result` |  |
| `status` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop`

#### EnvironmentExploration

| Field | Description |
| --- | --- |
| `account_id` |  |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` |  |
| `environment_name` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `idempotency_key` |  |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `persona_id` |  |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{environment_id}/explorations`

#### EnvironmentFirstRun

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run/start`

#### EnvironmentRevision

| Field | Description |
| --- | --- |
| `allowed_origins` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` |  |
| `app_release_id` |  |
| `blueprint` |  |
| `blueprint_json` |  |
| `cleanup_state` |  |
| `created_at` |  |
| `digest` |  |
| `dry_run` |  |
| `expires_at` |  |
| `id` |  |
| `organization_id` |  |
| `ready_at` |  |
| `resolved_manifest_json` |  |
| `retention_policy_json` |  |
| `revision` |  |
| `revoked_at` |  |
| `runner_environment_revision_id` |  |
| `safety_policy_json` |  |
| `schema_version` |  |
| `source_metadata` |  |
| `source_metadata_json` |  |
| `status` |  |
| `updated_at` |  |
| `validation_json` |  |
| `verify_environment_id` |  |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision`

#### EnvironmentSecretBinding

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `mode` |  |
| `secret_id` |  |
| `secret_version_id` |  |

Operations: Create, List, Remove.

API path: `/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings`

#### EnvironmentTestAccount

| Field | Description |
| --- | --- |
| `configured` |  |
| `credentials` |  |
| `id` |  |
| `persona` |  |
| `revision_id` |  |
| `role` |  |
| `tenant` |  |

Operations: List, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts`

#### Evidence

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/evidence/{id}`

#### Exploration

| Field | Description |
| --- | --- |
| `account_id` |  |
| `active` |  |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` |  |
| `environment_name` |  |
| `explorations` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `idempotency_key` |  |
| `launch_options` | Present only when launch was requested by an admin |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` |  |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `persona_id` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/retry_startup`

#### ExplorationMessage

| Field | Description |
| --- | --- |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` |  |
| `environment_name` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `text` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/messages`

#### ExplorationReport

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/refresh`

#### ExplorationScenario

| Field | Description |
| --- | --- |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `deadline_at` |  |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` |  |
| `environment_name` |  |
| `explorer_activity` | What the team is doing now. |
| `finding_count` | Findings at every priority, locked ones included. |
| `findings` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` |  |
| `goal` |  |
| `huntable_flows` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` |  |
| `max_seconds` |  |
| `max_testers` |  |
| `mode` |  |
| `next_scan_improvements` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` |  |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` |  |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` |  |
| `time_limit_reached` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios`

#### Finding

| Field | Description |
| --- | --- |
| `confidence` |  |
| `created_at` |  |
| `deferred_until` | Required future time when status is deferred |
| `finding` |  |
| `fingerprint` |  |
| `first_seen_at` |  |
| `id` |  |
| `last_seen_at` |  |
| `locked` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` |  |
| `organization_id` |  |
| `permissions` |  |
| `reason` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` |  |
| `safe_summary` |  |
| `scenario_occurrences` |  |
| `severity` |  |
| `status` |  |
| `title` |  |
| `updated_at` |  |
| `verification` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

Operations: List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/findings`

#### GithubConnection

| Field | Description |
| --- | --- |
| `accounts` |  |
| `github_app_installation_id` |  |
| `installations` |  |
| `project_id` | Project slug or public ID the repositories are added to. |
| `replace` | Make these the project's only repositories. |
| `repositories` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/verify/github_connections`

#### HostingAppDomain

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `certificate` |  |
| `created_at` |  |
| `dns_mode` |  |
| `dns_status` |  |
| `failure_message` |  |
| `hosted_app_id` |  |
| `hostname` |  |
| `id` |  |
| `kind` |  |
| `last_checked_at` |  |
| `path_rules` |  |
| `record_name` |  |
| `record_type` |  |
| `record_value` |  |
| `redirect_to` |  |
| `static_site_id` |  |
| `target_kind` |  |
| `tls_status` |  |
| `updated_at` |  |
| `verification_record` |  |
| `verification_status` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/disable`

#### ImageRepository

| Field | Description |
| --- | --- |
| `auth_configured` |  |
| `created_at` |  |
| `created_at_label` |  |
| `hosted_app_id` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `provider_kind` |  |
| `registry_auth_token` |  |
| `repository_path` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `visibility` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{org_slug}/image_repositories`

#### Integration

| Field | Description |
| --- | --- |
| `github` |  |
| `gitlab` |  |
| `permissions` |  |
| `slack` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/integrations`

#### InteractionResponse

| Field | Description |
| --- | --- |
| `answer` |  |
| `conversation_id` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses`

#### Invitation

| Field | Description |
| --- | --- |
| `accepted_at` |  |
| `accepted_by_user` |  |
| `created_at` |  |
| `created_at_label` |  |
| `email` |  |
| `email_delivery_status` |  |
| `expires_at` |  |
| `expires_at_label` |  |
| `id` |  |
| `invite_url` |  |
| `invited_by_user` |  |
| `organization` |  |
| `revoked_at` |  |
| `role` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{organization_id}/invitations`

#### JourneyVariantReplay

| Field | Description |
| --- | --- |
| `actor_id` |  |
| `can_request_qualification` |  |
| `created_at` |  |
| `failure_code` |  |
| `failure_message` |  |
| `id` |  |
| `idempotency_key` |  |
| `max_seconds` |  |
| `preparation_receipt` |  |
| `qualification` |  |
| `qualification_status` |  |
| `replay_required` |  |
| `review_reason` |  |
| `run_id` |  |
| `scenario_file` |  |
| `scenario_run_id` |  |
| `source_digest` |  |
| `status` |  |
| `updated_at` |  |
| `variant_id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays`

#### Knowledge

| Field | Description |
| --- | --- |
| `content_digest` |  |
| `content_json` |  |
| `document` |  |
| `documents` |  |
| `dreaming` |  |
| `expected_digest` |  |
| `history` |  |
| `id` |  |
| `kind` |  |
| `markdown` |  |
| `observed_at` |  |
| `organization` |  |
| `permissions` |  |
| `project_id` |  |
| `project_name` |  |
| `projects` |  |
| `selected_project_id` |  |
| `source` |  |
| `title` |  |
| `total` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verify/knowledge`

#### LocalThreadDelivery

| Field | Description |
| --- | --- |
| `decision` |  |
| `decision_pending` |  |
| `delivery` |  |
| `expected_version` |  |
| `id` |  |
| `policy` |  |
| `recovery_message` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}`

#### LocalThreadOperation

| Field | Description |
| --- | --- |
| `action` |  |
| `arguments` |  |
| `created_at` |  |
| `delivery` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` |  |
| `diagnostic_code` | Approved product error code retained after copied diagnostics expire. |
| `end` |  |
| `expires_at` |  |
| `id` |  |
| `key` |  |
| `provider` |  |
| `references` |  |
| `result` |  |
| `result_expired` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations`

#### Location

| Field | Description |
| --- | --- |
| `code` |  |
| `created_at` |  |
| `id` |  |
| `name` |  |
| `nomad_datacenter` |  |
| `updated_at` |  |

Operations: List.

API path: `/api/v1/hosting/locations`

#### Me

| Field | Description |
| --- | --- |
| `active_organization` |  |
| `analytics_distinct_id` |  |
| `analytics_internal` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` |  |
| `api_token` |  |
| `app_promotion` |  |
| `commit_author_email` |  |
| `email` |  |
| `enabled_features` |  |
| `github_pr_user_authorization_connected` |  |
| `github_pr_user_authorization_login` |  |
| `github_prs_authored_by_change_author` |  |
| `id` |  |
| `impersonation` |  |
| `name` |  |
| `next_path` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | V2 agent onboarding progress. |
| `openai_sign_in_connected` |  |
| `openai_sign_in_enabled` |  |
| `organizations` |  |
| `pending_organization_invitation_count` |  |
| `pending_organization_invitation_count_label` |  |
| `picture_url` |  |
| `superadmin` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | The IANA zone the person chose for their agents' replies; null follows their app. |

Operations: Create, Load, Remove, Update.

API path: `/api/v1/me/account_deletion`

#### MeEmail

| Field | Description |
| --- | --- |
| `account` |  |
| `can_delete` |  |
| `can_resend_verification` |  |
| `can_set_account` |  |
| `can_set_commit_author` |  |
| `commit_author` |  |
| `email` |  |
| `emails` |  |
| `id` |  |
| `message` |  |
| `verification_status` |  |
| `verified` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/me/emails/{id}/resend_verification`

#### MeOnboarding

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/me/onboarding/call`

#### MediaFile

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}/files/{file_id}`

#### Member

| Field | Description |
| --- | --- |
| `accepted_at` |  |
| `accepted_by_user` |  |
| `created_at` |  |
| `created_at_label` |  |
| `email` |  |
| `email_delivery_status` |  |
| `expires_at` |  |
| `expires_at_label` |  |
| `id` |  |
| `invite_url` |  |
| `invited_by_user` |  |
| `is_self` |  |
| `organization` |  |
| `revoked_at` |  |
| `role` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `user` |  |

Operations: List, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/members`

#### Memory

| Field | Description |
| --- | --- |
| `confidence` |  |
| `created_at` |  |
| `environment_id` |  |
| `finding` |  |
| `history` |  |
| `id` |  |
| `indexed_at` |  |
| `memory` |  |
| `project_id` |  |
| `response` |  |
| `scope` |  |
| `source` |  |
| `tags` |  |
| `title` |  |
| `workaround` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/memories`

#### MergeRequest

| Field | Description |
| --- | --- |
| `available_tests` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` |  |
| `branch` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` |  |
| `current_run` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` |  |
| `findings` |  |
| `github_repository` | GitHub owner/repository associated with this pull request. |
| `github_url` |  |
| `head_sha` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` |  |
| `idempotency_key` |  |
| `number` |  |
| `pagination` |  |
| `permissions` |  |
| `preview_cleanup_ready` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` |  |
| `project_id` | Composal project slug or public ID for PR preview environments. |
| `project_slug` |  |
| `provider` |  |
| `pull_request` |  |
| `repository_id` |  |
| `request_label` |  |
| `requested_run_id` |  |
| `runs` |  |
| `source_branch` |  |
| `source_repository` |  |
| `source_url` |  |
| `state` |  |
| `title` |  |
| `updated_at` |  |
| `web_path` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun`

#### MessagingConversationMessage

| Field | Description |
| --- | --- |
| `attachment_limit` |  |
| `attachment_max_bytes` |  |
| `client_operation_id` |  |
| `content` |  |
| `id` |  |
| `media` |  |
| `media_upload_ids` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` |  |
| `reply_to` | Public ID of a visible message |
| `retry_attachment` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` |  |
| `send_disposition` |  |
| `send_error` |  |
| `send_style` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction`

#### MessagingConversationUpload

| Field | Description |
| --- | --- |
| `attachment` |  |
| `upload_id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads`

#### MetricQuery

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/hosting/metrics/queries`

#### NetworkConnection

| Field | Description |
| --- | --- |
| `aws_client_vpn_profile` |  |
| `created_at` |  |
| `device_tag` |  |
| `id` |  |
| `name` |  |
| `oauth_client_id` |  |
| `oauth_client_secret` |  |
| `provider` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/network_connections`

#### NomadAllocation

| Field | Description |
| --- | --- |
| `allocation_id` |  |
| `client_status` |  |
| `create_time` |  |
| `datacenter` |  |
| `desired_description` |  |
| `desired_status` |  |
| `fetched_at` |  |
| `id` |  |
| `job_id` |  |
| `modify_time` |  |
| `name` |  |
| `namespace` |  |
| `node_id` |  |
| `node_name` |  |
| `resources` |  |
| `task_group` |  |
| `task_states` |  |
| `verify_runner_images` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}`

#### NomadLog

| Field | Description |
| --- | --- |
| `allocation_id` |  |
| `environment` |  |
| `fetched_at` |  |
| `location` |  |
| `logs` |  |
| `namespace` |  |
| `offset` |  |
| `origin` |  |
| `service` |  |
| `task` |  |
| `type` |  |

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs`

#### Organization

| Field | Description |
| --- | --- |
| `activated_products` | Products this organization has activated (PRD 144). |
| `agents_only` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` |  |
| `created_at_label` |  |
| `github_prs_authored_by_change_author` |  |
| `google_workspace_domain` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` |  |
| `logo_url` |  |
| `member_count` |  |
| `name` |  |
| `pending_invitation_count` |  |
| `personal` |  |
| `repository_count` |  |
| `role` |  |
| `sandbox_region` |  |
| `shared_agent_personal_accounts_enabled` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` |  |
| `source_control_providers` | Connected source control providers for this organization. |
| `source_ui_enabled` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` |  |
| `updated_at_label` |  |
| `verify_pr_scenario_writing_enabled` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations`

#### Page

| Field | Description |
| --- | --- |
| `active_runs` |  |
| `checkout_required` |  |
| `cli_signed_in_at` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` |  |
| `demo_project` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` |  |
| `included_deep_scan` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` |  |
| `organization` |  |
| `permissions` |  |
| `project` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` |  |
| `pull_requests` |  |
| `repositories` |  |
| `runs` |  |
| `runs_pagination` |  |
| `suggested_app_url` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/page`

#### PageAgent

| Field | Description |
| --- | --- |
| `agents` |  |
| `can_edit_integration_connections` |  |
| `creation_enabled` |  |
| `inbox` |  |
| `integration_choices` |  |
| `integration_choices_truncated` |  |
| `integration_selected` |  |
| `model_choices` |  |
| `new_configuration` |  |
| `organization_id` |  |
| `pagination` |  |
| `pinned_agent` |  |
| `platform_event_types` |  |
| `repository_choices` | Empty compatibility field. |
| `repository_choices_truncated` |  |
| `runtime_versions` | Runtime choices authorized for this organization. |
| `selected_agent` |  |
| `selected_reference` |  |
| `viewer_id` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/page/activity`

#### PageProjectRun

| Field | Description |
| --- | --- |
| `available_tests` |  |
| `fix_scenario_count` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | The fixable scenarios an agent handoff covers. |
| `fixable_count` |  |
| `id` |  |
| `pagination` |  |
| `permissions` |  |
| `preparation_reason` |  |
| `project` |  |
| `run` |  |
| `scenario_runs` |  |
| `selected_scenario_run` |  |
| `web_path` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/page`

#### PagesProjectCredential

| Field | Description |
| --- | --- |
| `browser_authentication` |  |
| `composal_address` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` |  |
| `credential_keys` |  |
| `description` |  |
| `email_link_auth_origins` |  |
| `has_inbox` | Whether Composal provisioned this address and can show the mail it receives |
| `id` |  |
| `identity_provider` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` |  |
| `login_method` |  |
| `login_url` |  |
| `managed` |  |
| `mfa_enabled` |  |
| `name` |  |
| `project_id` |  |
| `provider_guidance` |  |
| `sign_in_verified` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` |  |
| `status` |  |
| `updated_at` |  |
| `username` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/credentials`

#### PagesProjectPersona

| Field | Description |
| --- | --- |
| `active_count` |  |
| `credentials` |  |
| `needs_attention_count` |  |
| `permissions` |  |
| `persona_states` | Scenarios by the state of their latest execution. |
| `personas` |  |
| `project` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas`

#### PagesProjectRun

| Field | Description |
| --- | --- |
| `environment_query` |  |
| `environments` |  |
| `environments_has_more` |  |
| `pagination` |  |
| `runs` |  |
| `selected_environment` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs`

#### PagesProjectScenario

| Field | Description |
| --- | --- |
| `base_url` |  |
| `id` |  |
| `kind` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenarios`

#### PersonalAccessToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Remove.

API path: `/api/v1/personal_access_tokens`

#### PreviewOperation

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/operations`

#### PreviewProfileSecretBinding

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `mode` |  |
| `secret_id` |  |
| `secret_version_id` |  |

Operations: Create, List, Remove.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings`

#### PreviewSecret

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `name` |  |
| `slug` |  |
| `value` |  |

Operations: Create, Remove.

API path: `/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate`

#### PreviewSharingApproval

| Field | Description |
| --- | --- |
| `approved_build_keys` |  |
| `approved_build_secrets` |  |
| `approved_default_configuration` |  |
| `approved_default_secrets` |  |
| `approved_source_keys` |  |
| `build_keys` |  |
| `build_secrets` |  |
| `default_configuration` |  |
| `default_secrets` |  |
| `services` |  |
| `snapshot_version` |  |
| `source_keys` |  |

Operations: Create, List.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals`

#### ProductMapIdentityDecision

| Field | Description |
| --- | --- |
| `observations` |  |
| `operation` |  |
| `reason` |  |
| `target` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions`

#### ProductMapJourney

| Field | Description |
| --- | --- |
| `default_variant_id` |  |
| `goal` |  |
| `id` |  |
| `journey` |  |
| `next_cursor` |  |
| `preview` |  |
| `scope` |  |
| `title` |  |
| `tree` |  |
| `tree_loaded` |  |
| `variant_count` |  |
| `variants` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys`

#### ProductMapJourneyReplay

| Field | Description |
| --- | --- |
| `actor_id` |  |
| `can_request_qualification` |  |
| `created_at` |  |
| `failure_code` |  |
| `failure_message` |  |
| `id` |  |
| `preparation_receipt` |  |
| `qualification` |  |
| `qualification_status` |  |
| `replay_required` |  |
| `review_reason` |  |
| `run_id` |  |
| `scenario_run_id` |  |
| `source_digest` |  |
| `status` |  |
| `updated_at` |  |
| `variant_id` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification`

#### ProductMapObservation

| Field | Description |
| --- | --- |
| `capture` |  |
| `events` |  |
| `evidence_id` |  |
| `id` |  |
| `observation_id` |  |
| `scope` |  |
| `state` |  |
| `status` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}`

#### ProductMapQuestion

| Field | Description |
| --- | --- |
| `account_id` |  |
| `area` |  |
| `before` |  |
| `claims` |  |
| `evidence_truncated` |  |
| `model` |  |
| `persona_id` |  |
| `query` |  |
| `question` |  |
| `reasoning_effort` |  |
| `revision_id` |  |
| `scope` |  |
| `since` |  |
| `state_id` |  |
| `status` |  |
| `unknowns` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions`

#### ProductMapState

| Field | Description |
| --- | --- |
| `account_id` |  |
| `attempts` |  |
| `captured_at` |  |
| `id` |  |
| `incoming` |  |
| `labels` |  |
| `layout` |  |
| `observation_id` |  |
| `omitted_controls` |  |
| `outgoing` |  |
| `revision_id` |  |
| `scope` |  |
| `screenshot_url` |  |
| `state` |  |
| `truncated` |  |
| `url` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/states`

#### Project

| Field | Description |
| --- | --- |
| `archived_at` |  |
| `context` |  |
| `created_at` |  |
| `credentials` |  |
| `demo` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` |  |
| `environments` |  |
| `execution_mode` |  |
| `icon_url` |  |
| `id` |  |
| `identity_provider` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` |  |
| `name` |  |
| `network_connections` |  |
| `organization_id` |  |
| `overview` |  |
| `permissions` |  |
| `personas` |  |
| `project` |  |
| `pull_request_options` |  |
| `pull_requests` |  |
| `purpose` |  |
| `runs` |  |
| `scenario_history` |  |
| `scenario_states` | Scenarios by the state of their latest execution. |
| `scenarios` |  |
| `setup_required` |  |
| `slug` |  |
| `updated_at` |  |
| `verifier_preferences` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` |  |
| `website_url` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/discovery`

#### ProjectAndroidApk

| Field | Description |
| --- | --- |
| `android` |  |
| `artifact_paths` |  |
| `description` |  |
| `image` |  |
| `ios` |  |
| `launch_command` |  |
| `managed_binary` |  |
| `platform` |  |
| `provider` |  |
| `setup_command` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/android_apks`

#### ProjectCodeMap

| Field | Description |
| --- | --- |
| `can_scan` |  |
| `commit_sha` |  |
| `configured` |  |
| `error_code` |  |
| `id` |  |
| `name` |  |
| `ref` |  |
| `repository_id` |  |
| `revision` |  |
| `slug` |  |
| `status` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps`

#### ProjectEnvironment

| Field | Description |
| --- | --- |
| `allowed_actions` |  |
| `allowed_origins` |  |
| `archived_at` |  |
| `base_url` |  |
| `base_url_changeable` | Whether an update may send a new base_url. |
| `binary` |  |
| `conversation_only_messaging` |  |
| `created_at` |  |
| `desktop` |  |
| `execution_mode` |  |
| `id` |  |
| `imessage_number` | International destination number; blank or null clears it on an added environment. |
| `kind` |  |
| `lock_version` |  |
| `messaging_conversation` |  |
| `messaging_problem` |  |
| `messaging_source` |  |
| `messaging_tester_number` | One configured tester number. |
| `name` |  |
| `project_id` |  |
| `pull_request` |  |
| `source_branch` |  |
| `updated_at` |  |
| `verify_network_connection_id` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive`

#### ProjectFinding

| Field | Description |
| --- | --- |
| `deferred_until` |  |
| `environment_name` |  |
| `id` |  |
| `last_seen_at` |  |
| `locked` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` |  |
| `source` | The workflow that produced the finding |
| `source_title` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` |  |
| `title` |  |
| `verification` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | Where the finding is reviewed within its source |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings`

#### ProjectFixture

| Field | Description |
| --- | --- |
| `assignments` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` |  |
| `content_type` |  |
| `credential_ids` |  |
| `credentials` |  |
| `environment_ids` |  |
| `environments` |  |
| `fixtures` |  |
| `id` |  |
| `lock_version` |  |
| `name` |  |
| `pagination` |  |
| `permissions` |  |
| `persona_ids` |  |
| `personas` |  |
| `project` |  |
| `sha256` |  |
| `url` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures`

#### ProjectIosApp

| Field | Description |
| --- | --- |
| `android` |  |
| `artifact_paths` |  |
| `description` |  |
| `image` |  |
| `ios` |  |
| `launch_command` |  |
| `managed_binary` |  |
| `platform` |  |
| `provider` |  |
| `setup_command` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps`

#### ProjectMessagingConversation

| Field | Description |
| --- | --- |
| `assistant_number` |  |
| `attachment_limit` |  |
| `attachment_max_bytes` |  |
| `environment_name` |  |
| `id` |  |
| `leased` |  |
| `messages` |  |
| `reconciled_at` |  |
| `retirable` |  |
| `seeded` |  |
| `send_blocked_reason` |  |
| `send_disposition` |  |
| `send_error` |  |
| `tester_number` |  |
| `unknown_send` |  |
| `verify_environment_id` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read`

#### ProjectOverviewMetric

| Field | Description |
| --- | --- |
| `counts` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_metrics`

#### ProjectOverviewPullRequest

| Field | Description |
| --- | --- |
| `base_sha` |  |
| `can_verify` |  |
| `comment_url` |  |
| `draft` |  |
| `github_repository` | GitHub owner/repository associated with this pull request. |
| `github_url` |  |
| `head_sha` |  |
| `id` |  |
| `latest_created_at` |  |
| `latest_current` |  |
| `latest_head_sha` |  |
| `latest_reason` |  |
| `latest_run_id` |  |
| `latest_state` |  |
| `number` |  |
| `project_id` |  |
| `project_slug` |  |
| `provider` |  |
| `repository_id` |  |
| `request_label` |  |
| `source_branch` |  |
| `source_repository` |  |
| `source_url` |  |
| `state` |  |
| `title` |  |
| `updated_at` |  |
| `web_path` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests`

#### ProjectProductMap

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview`

#### ProjectRecording

| Field | Description |
| --- | --- |
| `browser` |  |
| `created_at` |  |
| `draft` | Present once drafted. |
| `environment_id` | The project environment the browser opens. |
| `error` |  |
| `event_count` |  |
| `id` |  |
| `persona_id` | The project persona the journey acts as. |
| `phase` | What the owner can do now. |
| `signed_in_during_recording` |  |
| `start_path` | A path on the environment to start at, such as /settings. |
| `status` |  |
| `updated_at` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish`

#### ProjectRunPlan

| Field | Description |
| --- | --- |
| `archived_at` |  |
| `base_url` |  |
| `created_at` |  |
| `dependencies` |  |
| `id` |  |
| `identity_probe` |  |
| `kind` |  |
| `lock_version` |  |
| `name` |  |
| `nodes` |  |
| `preview` |  |
| `project_id` |  |
| `updated_at` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive`

#### ProjectRunSchedule

| Field | Description |
| --- | --- |
| `credential_ids` |  |
| `cron_expression` |  |
| `environment_id` | Project environment slug or public ID. |
| `environment_name` |  |
| `history` |  |
| `id` |  |
| `labels` |  |
| `lock_version` |  |
| `name` |  |
| `next_run_at` |  |
| `notification_channel` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` |  |
| `selection_mode` |  |
| `slack_subscription_id` |  |
| `source_scenario_id` |  |
| `state` |  |
| `time_of_day` |  |
| `time_zone` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules`

#### ProjectScenarioOption

| Field | Description |
| --- | --- |
| `environments` |  |
| `permissions` |  |
| `personas` |  |
| `project` |  |
| `scenario_states` | Scenarios by the state of their latest execution. |
| `scenarios` |  |
| `schedule_options` |  |
| `schedules` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_options`

#### ProjectScenarioRow

| Field | Description |
| --- | --- |
| `actor_count` |  |
| `dependency_count` |  |
| `health` |  |
| `id` |  |
| `labels` |  |
| `name` |  |
| `persona_id` |  |
| `selectable_for_run` |  |
| `step_count` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows`

#### ProjectSetting

| Field | Description |
| --- | --- |
| `available_messaging_environments` |  |
| `messaging_conversations` |  |
| `messaging_enabled` |  |
| `permissions` |  |
| `project` |  |
| `tester_numbers` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/settings`

#### PullRequest

| Field | Description |
| --- | --- |
| `available_tests` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` |  |
| `head_sha` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` |  |
| `idempotency_key` |  |
| `imessage_number` | International destination of this exact deployed commit. |
| `number` |  |
| `pagination` |  |
| `permissions` |  |
| `preview_cleanup_ready` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` |  |
| `project_id` | Composal project slug or public ID for PR preview environments. |
| `pull_request` |  |
| `repository_id` |  |
| `runs` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share`

#### PullRequestSetting

| Field | Description |
| --- | --- |
| `app_preview_profile_id` |  |
| `app_service_id` |  |
| `bots` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` |  |
| `demo_videos` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` |  |
| `enabled` | Test PRs automatically. |
| `environment` | The environment whose test accounts sign in to the previews. |
| `environments` |  |
| `github_check_enabled` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | Hosting services that build PR previews and the setup answers each needs |
| `id` |  |
| `imessage_comment_prefix` |  |
| `imessage_number` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` |  |
| `limits` |  |
| `link_pattern` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` |  |
| `messaging_enabled` |  |
| `messaging_tester_number` | One configured tester number. |
| `non_product_paths` |  |
| `permissions` |  |
| `pr_check` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` |  |
| `preview_comment_authors` |  |
| `preview_comment_pattern` |  |
| `preview_comment_wildcard` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | composal: the preview profile that builds each PR. |
| `preview_profiles` |  |
| `previews` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | Composal project owning this PR Testing configuration. |
| `project_repositories` |  |
| `provider` |  |
| `repositories` |  |
| `repository` | Repository ID; see repositories for its name. |
| `repository_id` |  |
| `repository_kind` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` |  |
| `service` | composal: the public service the browsers open. |
| `settings` |  |
| `setup` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | The answers a new setup starts from |
| `source_repository` |  |
| `target_mode` |  |
| `tester_numbers` |  |
| `trigger_label` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` |  |
| `trigger_on_label` |  |
| `trigger_on_push` |  |
| `trigger_on_ready` |  |
| `triggers` | When runs start. |
| `verify_environment_id` |  |
| `write_scenarios` | Draft and validate focused scenarios for each change on its preview. |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings`

#### PullRequestSettingAddRepository

| Field | Description |
| --- | --- |
| `project_id` |  |
| `replace` | Make these the project's only repositories. |
| `repositories` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories`

#### PullRequestSettingDetectComment

| Field | Description |
| --- | --- |
| `bots` | The bots answer |
| `deployment` | The deployment answer |
| `example_url` |  |
| `imessage_comment_prefix` |  |
| `imessage_number` | International destination number; blank or null clears it on an added environment. |
| `kind` |  |
| `link_pattern` | The link_pattern answer |
| `project_id` | Project slug or ID. |
| `provider` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | Repository slug, ID or owner/name. |
| `request_number` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments`

#### Recorder

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `slug` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/recorder`

#### Registry

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/registry/namespace`

#### RegistryV2

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/registry/v2/authorize`

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay`

#### ReportReplay

| Field | Description |
| --- | --- |
| `agent_id` |  |
| `generated_at` |  |
| `id` |  |
| `recording` |  |
| `replay_steps` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}`

#### ReportScenario

| Field | Description |
| --- | --- |
| `environment_name` |  |
| `goal` |  |
| `id` |  |
| `mode` |  |
| `permissions` |  |
| `project_id` |  |
| `related_explorations` |  |
| `report` |  |
| `saves_scenarios` |  |
| `scenario_generation` |  |
| `status` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios`

#### RunScenarioRun

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame`

#### RunScheduleOption

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/options`

#### RunSearch

| Field | Description |
| --- | --- |
| `runs` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/run_search`

#### RunUpdate

| Field | Description |
| --- | --- |
| `base_sha` |  |
| `can_verify` |  |
| `comment_url` |  |
| `draft` |  |
| `github_repository` | GitHub owner/repository associated with this pull request. |
| `github_url` |  |
| `head_sha` |  |
| `id` |  |
| `latest_created_at` |  |
| `latest_current` |  |
| `latest_head_sha` |  |
| `latest_reason` |  |
| `latest_run_id` |  |
| `latest_state` |  |
| `number` |  |
| `project_id` |  |
| `project_slug` |  |
| `provider` |  |
| `repository_id` |  |
| `request_label` |  |
| `source_branch` |  |
| `source_repository` |  |
| `source_url` |  |
| `state` |  |
| `title` |  |
| `updated_at` |  |
| `web_path` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/run_updates`

#### ScenarioRevision

| Field | Description |
| --- | --- |
| `action` |  |
| `batch` | Shared by every revision one request or job saved. |
| `created_at` |  |
| `definition` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` |  |
| `source` | The client the save came through. |
| `user` | Null when a system job saved the Scenario. |
| `version` | The Scenario's lock_version after this save. |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/revisions`

#### ScenarioRunLesson

| Field | Description |
| --- | --- |
| `finding` |  |
| `title` | Defaults to the Scenario's name. |
| `workaround` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons`

#### ScenarioRunScenarioEdit

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints`

#### SitePreview

| Field | Description |
| --- | --- |
| `icon_data_url` | The site's icon as a data: URL, up to 256 KB |
| `title` |  |
| `url` | The address as it will be saved |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/site_preview`

#### SlackChannel

| Field | Description |
| --- | --- |
| `id` |  |
| `is_member` |  |
| `is_private` |  |
| `is_slack_connect` |  |
| `name` |  |
| `published` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/channels`

#### SparkAgentLocalThread

| Field | Description |
| --- | --- |
| `action` |  |
| `archived` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` |  |
| `can_end` |  |
| `can_interrupt` |  |
| `can_send` |  |
| `created_at` |  |
| `delivery` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` |  |
| `device_name` |  |
| `diagnostic_code` | Approved product error code retained after copied diagnostics expire. |
| `end` |  |
| `expires_at` |  |
| `full_title` | The native name or first prompt in full, for a tooltip. |
| `id` |  |
| `key` |  |
| `last_activity_at` |  |
| `native_thread_id` |  |
| `parent_conversation_id` |  |
| `provider` |  |
| `references` |  |
| `relay_disconnected_at` |  |
| `relay_participant` |  |
| `result` |  |
| `result_expired` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` |  |
| `section` | Server-assigned section in the ordered computer thread directory. |
| `state` |  |
| `status` | What the native thread is doing. |
| `task_configured` |  |
| `thread_id` |  |
| `title` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads`

#### StaticSite

| Field | Description |
| --- | --- |
| `active_deployment_id` |  |
| `cdn_hostname` |  |
| `cdn_url` |  |
| `cname_target` |  |
| `created_at` |  |
| `default_url` |  |
| `description` |  |
| `error_document` |  |
| `failure_message` |  |
| `hosted_app_id` |  |
| `id` |  |
| `index_document` |  |
| `name` |  |
| `organization_id` |  |
| `provisioned` |  |
| `provisioned_at` |  |
| `region` |  |
| `replication_regions` |  |
| `repository_id` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/static_sites/{id}/provision`

#### StaticSiteDeployment

| Field | Description |
| --- | --- |
| `activated_at` |  |
| `activated_at_label` |  |
| `commit_sha` |  |
| `created_at` |  |
| `created_at_label` |  |
| `creator_user_id` |  |
| `deploy_slug` |  |
| `failure_message` |  |
| `file_count` |  |
| `file_count_label` |  |
| `finished_at` |  |
| `finished_at_label` |  |
| `id` |  |
| `is_active` |  |
| `source_ref` |  |
| `started_at` |  |
| `started_at_label` |  |
| `static_site_id` |  |
| `status` |  |
| `total_bytes` |  |
| `total_bytes_label` |  |
| `trigger_kind` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `uploaded_at` |  |
| `uploaded_at_label` |  |

Operations: Create, List, Load.

API path: `/api/v1/static_sites/{static_site_id}/deployments/{id}/activate`

#### StaticSiteDomain

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `created_at` |  |
| `dns_mode` |  |
| `dns_status` |  |
| `failure_message` |  |
| `hosted_app_id` |  |
| `hostname` |  |
| `id` |  |
| `kind` |  |
| `last_checked_at` |  |
| `record_name` |  |
| `record_type` |  |
| `record_value` |  |
| `redirect_to` |  |
| `static_site_id` |  |
| `target_kind` |  |
| `tls_status` |  |
| `updated_at` |  |
| `verification_status` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/static_sites/{static_site_id}/domains/{id}/provision`

#### SubscriptionModel

| Field | Description |
| --- | --- |
| `default_reasoning` |  |
| `id` |  |
| `name` |  |
| `provider` |  |
| `reasoning` | Effort levels this plan model accepts. |
| `speeds` | Speed modes advertised by this connected account and model. |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions/models`

#### ThreadPreview

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `port` |  |
| `url` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews`

#### VerificationProjectCredential

| Field | Description |
| --- | --- |
| `browser_authentication` |  |
| `browser_session` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | Select the Composal-managed Google test account when available. |
| `configured` |  |
| `cookies` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` |  |
| `description` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | Whether Composal provisioned this address and can show the mail it receives |
| `id` |  |
| `identity_provider` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` |  |
| `login_url` | Optional sign-in path or URL. |
| `managed` |  |
| `mfa_enabled` |  |
| `name` |  |
| `oidc` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` |  |
| `provider_guidance` |  |
| `remove_browser_authentication` |  |
| `remove_totp` |  |
| `sign_in_verified` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` |  |
| `status` |  |
| `totp_secret` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` |  |
| `username` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable`

#### VerificationProjectPersona

| Field | Description |
| --- | --- |
| `access_mode` |  |
| `archived_at` |  |
| `capabilities` |  |
| `created_at` |  |
| `credential_id` | The credential this persona signs in with. |
| `goals` |  |
| `id` |  |
| `lock_version` |  |
| `name` |  |
| `project_id` |  |
| `role` |  |
| `updated_at` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive`

#### VerificationProjectRun

| Field | Description |
| --- | --- |
| `approved_at` |  |
| `approved_digest` |  |
| `archived_at` |  |
| `available_tests` |  |
| `can_archive` |  |
| `can_restore` |  |
| `can_start_another_run` |  |
| `cleanup_state` |  |
| `concurrency` |  |
| `created_at` |  |
| `creator_name` |  |
| `definition_mode` |  |
| `environment_id` |  |
| `id` |  |
| `lock_version` |  |
| `max_seconds` |  |
| `outcome` |  |
| `permissions` |  |
| `plan_digest` |  |
| `preparation_error_code` |  |
| `progress` |  |
| `project` |  |
| `project_id` |  |
| `pull_request` |  |
| `queued_at` |  |
| `run` |  |
| `run_plan_id` |  |
| `scenario_runs` |  |
| `source_run_id` |  |
| `source_versions` |  |
| `start_when_prepared` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` |  |
| `target_snapshot` |  |
| `title` |  |
| `updated_at` |  |
| `verifier_preferences_snapshot` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | Path of the run's page in the web app, where it can be watched live. |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/archive`

#### VerificationProjectScenario

| Field | Description |
| --- | --- |
| `actors` |  |
| `allowed_actions` |  |
| `archived_at` |  |
| `cleanup` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` |  |
| `dependencies` |  |
| `fixtures` | Files upload steps choose, ordered by name. |
| `health` |  |
| `id` |  |
| `identity_probe` |  |
| `if` | A documented subset of Actions expressions. |
| `labels` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` |  |
| `name` |  |
| `on` | Explicit Actions-style automatic execution rules. |
| `outcomes` |  |
| `persona_id` |  |
| `primary_actor` |  |
| `project_id` |  |
| `selectable_for_run` |  |
| `starting_conditions` |  |
| `steps` |  |
| `triggers` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` |  |
| `version` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/archive`

#### VerifyAppDomain

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/verify`

#### VerifyBrowserSession

| Field | Description |
| --- | --- |
| `account_id` | The project's active credential to refresh; omit to create a credential. |
| `expires_at` |  |
| `id` |  |
| `name` | Required when opening a browser for a new credential. |
| `origin` |  |
| `project_id` | The project (slug or ID) whose credential receives the session. |
| `status` |  |
| `url` |  |
| `viewer_url` | Owner-only bearer link. |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/browser_sessions/{id}/save`

#### VerifyStaticSiteDomain

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `created_at` |  |
| `dns_mode` |  |
| `dns_status` |  |
| `failure_message` |  |
| `hosted_app_id` |  |
| `hostname` |  |
| `id` |  |
| `kind` |  |
| `last_checked_at` |  |
| `record_name` |  |
| `record_type` |  |
| `record_value` |  |
| `redirect_to` |  |
| `static_site_id` |  |
| `target_kind` |  |
| `tls_status` |  |
| `updated_at` |  |
| `verification_status` |  |

Operations: Create.

API path: `/api/v1/static_sites/{static_site_id}/domains/{id}/verify`

#### VersionLog

| Field | Description |
| --- | --- |
| `base_image` |  |
| `failure_phase` |  |
| `id` |  |
| `image_digest` |  |
| `image_reference` |  |
| `installer_version` |  |
| `ready_at` |  |
| `receipt` |  |
| `safe_error` |  |
| `started_at` |  |
| `status` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs`

#### WebBotAuth

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `origin` |  |
| `signatures` |  |

Operations: Create.

API path: `/api/v1/verify/web_bot_auth`

#### WorkflowRunStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/steps/{step_id}/output`

#### WorkflowRunStopNotice

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/stop_notice/dismissal`

#### WorkflowTriggerSkipped

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run`



## Entities


### Agent

Create an instance: `local agent = client:Agent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `string|nil` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string|nil` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_name_managers` | `boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `number` |  |
| `configuration_version` | `string|nil` | Opaque version token. |
| `control_connections_available` | `boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` |  |
| `id` | `string` |  |
| `last_reply_at` | `string|nil` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `table` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string|nil` | Opaque version token. |
| `local_agent_control_available` | `boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `table` | Teammates named as managers beside the owner. |
| `model_change_action` | `string|nil` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `string|nil` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `table|nil` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` |  |
| `sharing_fixed` | `boolean` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` |  |
| `slug` | `string` | Optional explicit API alias. |
| `status` | `string` |  |
| `team_role` | `string` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` |  |
| `url_slug` | `string` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `string` | Defaults to organization. |

#### Example: Load

```lua
local agent, err = client:Agent():load({ id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agents, err = client:Agent():list({ organization_id = "example" })
```

#### Example: Create

```lua
local agent, err = client:Agent():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
})
```


### AgentAttachment

Create an instance: `local agent_attachment = client:AgentAttachment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `number` |  |
| `content_type` | `string` |  |
| `file_name` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```lua
local agent_attachment, err = client:AgentAttachment():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  byte_size = 1, -- number
  content_type = "example_content_type", -- string
  file_name = "example_file_name", -- string
})
```


### AgentAutomation

Create an instance: `local agent_automation = client:AgentAutomation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `can_manage_events` | `boolean` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` |  |
| `definition` | `table` |  |
| `event_subscriptions` | `table` |  |
| `event_triggers` | `table` |  |
| `expected_revision` | `number` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `number` |  |
| `schedule` | `any` |  |
| `schedules` | `table` |  |
| `version` | `table` |  |

#### Example: Load

```lua
local agent_automation, err = client:AgentAutomation():load({ id = "agent_automation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_automations, err = client:AgentAutomation():list({ agent_id = "example", organization_id = "example" })
```


### AgentAvatar

Create an instance: `local agent_avatar = client:AgentAvatar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentCommand

Create an instance: `local agent_command = client:AgentCommand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `display_name` | `string` |  |
| `name` | `string` |  |
| `skill_model_visible` | `boolean` |  |
| `source` | `string` |  |

#### Example: List

```lua
local agent_commands, err = client:AgentCommand():list({ agent_id = "example", organization_id = "example" })
```


### AgentComputer

Create an instance: `local agent_computer = client:AgentComputer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentConnection

Create an instance: `local agent_connection = client:AgentConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `string` |  |
| `auth_scheme` | `string` |  |
| `can_configure` | `boolean` |  |
| `can_disconnect` | `boolean` |  |
| `can_setup` | `boolean` |  |
| `connection` | `table` |  |
| `credential` | `string|nil` | Write-only outbound key. |
| `error_code` | `string|nil` |  |
| `expected_generation` | `number` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `string|nil` |  |
| `requester_id` | `string` |  |
| `retired_at` | `string|nil` |  |
| `revoked_at` | `string|nil` |  |
| `scope_key` | `string` |  |
| `source_operation_id` | `string|nil` |  |
| `state` | `string` |  |

#### Example: Load

```lua
local agent_connection, err = client:AgentConnection():load({ id = "agent_connection_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_connections, err = client:AgentConnection():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_connection, err = client:AgentConnection():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  agent_card_url = "example_agent_card_url", -- string
  auth_scheme = "example_auth_scheme", -- string
  name = "example_name", -- string
})
```


### AgentControlFlow

Create an instance: `local agent_control_flow = client:AgentControlFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel` | `boolean` |  |
| `cancellation_requested` | `boolean` |  |
| `device_name` | `string` |  |
| `flow_id` | `string` |  |
| `id` | `string` |  |
| `providers` | `table` |  |
| `repair_of_flow_id` | `string` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` |  |
| `step_count` | `number` |  |
| `title` | `string|nil` |  |

#### Example: Load

```lua
local agent_control_flow, err = client:AgentControlFlow():load({ id = "agent_control_flow_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_control_flows, err = client:AgentControlFlow():list({ agent_id = "example", organization_id = "example" })
```


### AgentCoordination

Create an instance: `local agent_coordination = client:AgentCoordination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentEmail

Create an instance: `local agent_email = client:AgentEmail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `string|nil` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` |  |
| `id` | `string` |  |
| `preview` | `string` |  |
| `received_at` | `string` |  |
| `recipient_tag` | `string|nil` | The +tag the sender used, if any |
| `spam` | `boolean` | SES judged it spam |
| `subject` | `string|nil` |  |
| `text` | `string` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `table` |  |

#### Example: Load

```lua
local agent_email, err = client:AgentEmail():load({ id = "agent_email_id", agent_id = "agent_id", organization_id = "organization_id" })
```


### AgentFile

Create an instance: `local agent_file = client:AgentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_type` | `string` |  |
| `download_url` | `string` |  |
| `filename` | `string` |  |
| `id` | `string` |  |
| `size_bytes` | `number` |  |

#### Example: Load

```lua
local agent_file, err = client:AgentFile():load({ id = "agent_file_id", agent_id = "agent_id", organization_id = "organization_id" })
```


### AgentInput

Create an instance: `local agent_input = client:AgentInput(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `table` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `table` |  |
| `browser_context` | `table` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `table` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` |  |
| `requester_membership_id` | `string` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` |  |

#### Example: Create

```lua
local agent_input, err = client:AgentInput():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  browser_context = {}, -- table
  client_time = {}, -- table
  conversation_id = "example_conversation_id", -- string
  text = "example_text", -- string
})
```


### AgentIntegration

Create an instance: `local agent_integration = client:AgentIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `table` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `table` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `boolean` |  |
| `can_manage_organization` | `boolean` |  |
| `catalog` | `table` |  |
| `connect_as` | `string|nil` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `table` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `table` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` |  |
| `connections` | `table` |  |
| `email` | `table` | A native agent's own email address. |
| `enabled` | `boolean` |  |
| `enabled_toolkits` | `table` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `number` |  |
| `pagination` | `table` |  |
| `pending_counts` | `table` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `boolean` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `boolean` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `table` |  |
| `webhook_connections` | `table` |  |
| `webhooks_available` | `boolean` |  |

#### Example: List

```lua
local agent_integrations, err = client:AgentIntegration():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_integration, err = client:AgentIntegration():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  connection_id = "example_connection_id", -- string
  enabled = true, -- boolean
  generation = 1, -- number
})
```


### AgentInteraction

Create an instance: `local agent_interaction = client:AgentInteraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `interactions` | `table` |  |

#### Example: Load

```lua
local agent_interaction, err = client:AgentInteraction():load({ id = "agent_interaction_id", agent_id = "agent_id", organization_id = "organization_id", conversation_id = "conversation_id" })
```

#### Example: List

```lua
local agent_interactions, err = client:AgentInteraction():list({ agent_id = "example", organization_id = "example", conversation_id = "example" })
```


### AgentLibrary

Create an instance: `local agent_library = client:AgentLibrary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentManager

Create an instance: `local agent_manager = client:AgentManager(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `string|nil` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string|nil` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_name_managers` | `boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `number` |  |
| `configuration_version` | `string|nil` | Opaque version token. |
| `control_connections_available` | `boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` |  |
| `id` | `string` |  |
| `last_reply_at` | `string|nil` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `table` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string|nil` | Opaque version token. |
| `local_agent_control_available` | `boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `table` | Teammates named as managers beside the owner. |
| `model_change_action` | `string|nil` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `string|nil` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `table|nil` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` |  |
| `sharing_fixed` | `boolean` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `team_role` | `string` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` |  |
| `url_slug` | `string` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` |  |
| `visibility` | `string` |  |

#### Example: Create

```lua
local agent_manager, err = client:AgentManager():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  user_id = "example_user_id", -- string
})
```


### AgentManagerChoice

Create an instance: `local agent_manager_choice = client:AgentManagerChoice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```lua
local agent_manager_choices, err = client:AgentManagerChoice():list({ agent_id = "example", organization_id = "example" })
```


### AgentMarketplace

Create an instance: `local agent_marketplace = client:AgentMarketplace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bundle` | `table` |  |
| `can_manage` | `boolean` |  |
| `catalog_key` | `string|nil` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `table` |  |
| `category` | `string` |  |
| `counts` | `table` |  |
| `created_at` | `string` |  |
| `expected_version` | `number` |  |
| `explainer` | `string|nil` | The listing's public write-up in Markdown. |
| `featured` | `boolean` |  |
| `from_composal` | `boolean` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `number` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `table` |  |
| `integrations` | `table` |  |
| `listing` | `any` |  |
| `listings` | `table` |  |
| `memories` | `table` |  |
| `name` | `string` |  |
| `next_page` | `number|nil` |  |
| `organization_name` | `string` |  |
| `page_apps` | `table` |  |
| `publisher_avatar_url` | `string|nil` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `sections` | `table` |  |
| `share_token` | `string|nil` | Present only for people who manage the listing. |
| `skills` | `table` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | The V2 agent this listing was published from. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |
| `viewer` | `table` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```lua
local agent_marketplace, err = client:AgentMarketplace():load({ id = "agent_marketplace_id" })
```

#### Example: Create

```lua
local agent_marketplace, err = client:AgentMarketplace():create({
  organization_id = "example_organization_id", -- string
  bundle = {}, -- table
  category = "example_category", -- string
  name = "example_name", -- string
  summary = "example_summary", -- string
})
```


### AgentMarketplaceShared

Create an instance: `local agent_marketplace_shared = client:AgentMarketplaceShared(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `catalog_key` | `string|nil` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` |  |
| `counts` | `table` |  |
| `created_at` | `string` |  |
| `explainer` | `string|nil` | The listing's public write-up in Markdown. |
| `featured` | `boolean` |  |
| `from_composal` | `boolean` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `number` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `table` |  |
| `integrations` | `table` |  |
| `listing` | `any` |  |
| `memories` | `table` |  |
| `name` | `string` |  |
| `organization_name` | `string` |  |
| `page_apps` | `table` |  |
| `publisher_avatar_url` | `string|nil` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `share_token` | `string|nil` | Present only for people who manage the listing. |
| `skills` | `table` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |
| `viewer` | `table` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```lua
local agent_marketplace_shared, err = client:AgentMarketplaceShared():load({ id = "agent_marketplace_shared_id" })
```


### AgentMissionControl

Create an instance: `local agent_mission_control = client:AgentMissionControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentOperation

Create an instance: `local agent_operation = client:AgentOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `table` | JSON object limited to 65536 encoded bytes. |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `operation` | `table` |  |
| `participant` | `string` |  |
| `requester_id` | `string` | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` |  |

#### Example: Load

```lua
local agent_operation, err = client:AgentOperation():load({ id = "agent_operation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local agent_operation, err = client:AgentOperation():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  arguments = {}, -- table
  key = "example_key", -- string
  name = "example_name", -- string
  requester_id = "example_requester_id", -- string
})
```


### AgentProvisioning

Create an instance: `local agent_provisioning = client:AgentProvisioning(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentPullRequest

Create an instance: `local agent_pull_request = client:AgentPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `number` | `number` |  |
| `owners` | `table` |  |
| `repository` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local agent_pull_requests, err = client:AgentPullRequest():list({ agent_id = "example", organization_id = "example" })
```


### AgentQuestion

Create an instance: `local agent_question = client:AgentQuestion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentRepository

Create an instance: `local agent_repository = client:AgentRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `environments` | `table` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `repository_choices` | `table` |  |
| `repository_choices_error` | `string|nil` | GitHub discovery warning. |
| `repository_choices_truncated` | `boolean` |  |
| `version` | `number` |  |
| `work_repositories` | `table` |  |

#### Example: List

```lua
local agent_repositorys, err = client:AgentRepository():list({ agent_id = "example", organization_id = "example" })
```


### AgentResource

Create an instance: `local agent_resource = client:AgentResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `uri` | `string` |  |

#### Example: List

```lua
local agent_resources, err = client:AgentResource():list({ agent_id = "example", organization_id = "example" })
```


### AgentRoutine

Create an instance: `local agent_routine = client:AgentRoutine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `consecutive_errors` | `number` |  |
| `credit_wait` | `table` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `string|nil` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_error` | `string|nil` |  |
| `last_run_at` | `string|nil` |  |
| `last_status` | `string|nil` |  |
| `managed` | `boolean` |  |
| `name` | `string` |  |
| `next_run_at` | `string|nil` |  |
| `routine` | `table` |  |
| `schedule` | `table` |  |
| `schedule_label` | `string` |  |
| `utility_model` | `table` |  |

#### Example: List

```lua
local agent_routines, err = client:AgentRoutine():list({ agent_id = "example", organization_id = "example" })
```


### AgentRun

Create an instance: `local agent_run = client:AgentRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string|nil` |  |
| `id` | `string` |  |
| `run_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local agent_run, err = client:AgentRun():load({ id = "agent_run_id", agent_id = "agent_id", organization_id = "organization_id" })
```


### AgentRuntime

Create an instance: `local agent_runtime = client:AgentRuntime(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `table` |  |
| `can_manage` | `boolean` |  |
| `can_reset` | `boolean` |  |
| `image` | `string` |  |
| `memory_mb` | `number|nil` |  |
| `platform` | `string` |  |
| `profile` | `string` |  |
| `provider` | `string` |  |
| `state` | `string` |  |
| `version` | `string` |  |
| `volume` | `table|nil` |  |


### AgentSetting

Create an instance: `local agent_setting = client:AgentSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `expected_version` | `string` |  |
| `instructions` | `string` |  |
| `version` | `string` |  |

#### Example: List

```lua
local agent_settings, err = client:AgentSetting():list({ agent_id = "example", organization_id = "example" })
```


### AgentSharing

Create an instance: `local agent_sharing = client:AgentSharing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AgentSite

Create an instance: `local agent_site = client:AgentSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed_at` | `string` |  |
| `deployments_count` | `number` |  |
| `hostname` | `string` |  |
| `https` | `string` | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```lua
local agent_sites, err = client:AgentSite():list({ agent_id = "example", organization_id = "example" })
```


### AgentSkill

Create an instance: `local agent_skill = client:AgentSkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` |  |
| `can_configure` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `configuration_state` | `string` | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` |  |
| `enabled` | `boolean` |  |
| `name` | `string` |  |
| `skills` | `table` |  |
| `version` | `string` |  |

#### Example: List

```lua
local agent_skills, err = client:AgentSkill():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_skill, err = client:AgentSkill():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  enabled = true, -- boolean
  name = "example_name", -- string
  version = "example_version", -- string
})
```


### AgentSlack

Create an instance: `local agent_slack = client:AgentSlack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentSubagent

Create an instance: `local agent_subagent = client:AgentSubagent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `attention` | `table|nil` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `string|nil` |  |
| `id` | `string` |  |
| `model` | `string|nil` |  |
| `parent_id` | `string` |  |
| `preview` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `state` | `string|nil` | What the thread is to the viewer. |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string|nil` |  |

#### Example: List

```lua
local agent_subagents, err = client:AgentSubagent():list({ agent_id = "example", organization_id = "example" })
```


### AgentSubscription

Create an instance: `local agent_subscription = client:AgentSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local agent_subscriptions, err = client:AgentSubscription():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_subscription, err = client:AgentSubscription():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### AgentTeammate

Create an instance: `local agent_teammate = client:AgentTeammate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `string|nil` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` |  |
| `name` | `string` |  |
| `persona` | `any` |  |
| `slug` | `string` |  |

#### Example: List

```lua
local agent_teammates, err = client:AgentTeammate():list({ agent_id = "example", organization_id = "example" })
```


### AgentTerminal

Create an instance: `local agent_terminal = client:AgentTerminal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentThread

Create an instance: `local agent_thread = client:AgentThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `number|nil` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `boolean` |  |
| `execution` | `any` |  |
| `first_input` | `any` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `id` | `string` |  |
| `inherit_context` | `boolean` | Include the source conversation through its last completed reply. |
| `local_activities` | `table` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `number` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `string|nil` |  |
| `local_scope_key` | `string|nil` |  |
| `local_status_pending` | `boolean` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `table` |  |
| `main_thread_id` | `string` |  |
| `message` | `string` | The thread's first message. |
| `next_cursor` | `string|nil` |  |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` |  |
| `selected_thread` | `any` |  |
| `thread` | `table` |  |
| `threads` | `table` |  |
| `title` | `string` |  |
| `total_archived_count` | `number|nil` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```lua
local agent_threads, err = client:AgentThread():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_thread, err = client:AgentThread():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### AgentTool

Create an instance: `local agent_tool = client:AgentTool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `inputSchema` | `table` |  |
| `name` | `string` |  |

#### Example: List

```lua
local agent_tools, err = client:AgentTool():list({ agent_id = "example", organization_id = "example" })
```


### AgentVerifyProject

Create an instance: `local agent_verify_project = client:AgentVerifyProject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `boolean` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `number` |  |
| `project_choices` | `table` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `boolean` |  |
| `verify_projects` | `table` |  |
| `version` | `number` |  |

#### Example: List

```lua
local agent_verify_projects, err = client:AgentVerifyProject():list({ agent_id = "example", organization_id = "example" })
```


### AgentWait

Create an instance: `local agent_wait = client:AgentWait(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWebhook

Create an instance: `local agent_webhook = client:AgentWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `connection` | `table` |  |
| `deliveries` | `table` |  |
| `event_types` | `table` |  |
| `expected_generation` | `number` |  |
| `id` | `string` |  |
| `max_events_per_day` | `number` |  |
| `name` | `string` |  |
| `purpose` | `string` |  |
| `signing_key` | `string|nil` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```lua
local agent_webhook, err = client:AgentWebhook():load({ id = "agent_webhook_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local agent_webhook, err = client:AgentWebhook():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  event_types = {}, -- table
  max_events_per_day = 1, -- number
  name = "example_name", -- string
  purpose = "example_purpose", -- string
})
```


### AgentWork

Create an instance: `local agent_work = client:AgentWork(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWorkflow

Create an instance: `local agent_workflow = client:AgentWorkflow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `expected_digest` | `string` |  |
| `path` | `string` |  |
| `source` | `string` | At most 262144 UTF-8 bytes |
| `template` | `string` | A template id from the catalog's templates |
| `templates` | `table` |  |
| `truncated` | `boolean` |  |
| `workflows` | `table` |  |

#### Example: List

```lua
local agent_workflows, err = client:AgentWorkflow():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_workflow, err = client:AgentWorkflow():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  path = "example_path", -- string
  template = "example_template", -- string
})
```


### AgentWorkflowProposal

Create an instance: `local agent_workflow_proposal = client:AgentWorkflowProposal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `table` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `string|nil` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `boolean` |  |
| `can_revise` | `boolean` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `boolean` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `boolean` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` |  |
| `definition` | `table|nil` |  |
| `digest` | `string` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `string|nil` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` |  |
| `model_choices` | `table` | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` |  |
| `native_rows` | `table` |  |
| `path` | `string` |  |
| `pipeline_checkpoints` | `table` |  |
| `pipeline_commands` | `table` |  |
| `reasoning_choices` | `table` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `number|nil` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `table|nil` |  |
| `stale` | `boolean` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `table|nil` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `string|nil` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```lua
local agent_workflow_proposal, err = client:AgentWorkflowProposal():load({ id = "agent_workflow_proposal_id", agent_id = "agent_id", organization_id = "organization_id" })
```


### AgentWorkflowRun

Create an instance: `local agent_workflow_run = client:AgentWorkflowRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `table|nil` | Saved native automation identity. |
| `budget_seconds` | `number|nil` | The run stops once it has been running this long |
| `budget_usd` | `number|nil` | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `table|nil` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string|nil` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `table` |  |
| `error` | `string|nil` |  |
| `finished_at` | `string|nil` |  |
| `flow_steps` | `table|nil` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Public run ID. |
| `needs_you` | `boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `string|nil` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string|nil` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `number` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string|nil` |  |
| `running_seconds` | `number` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `number` | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `table|nil` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `number` |  |
| `steps` | `table` |  |
| `trigger_id` | `string|nil` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `string|nil` | When a sleeping run's step looks again |
| `workflow_digest` | `string|nil` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string|nil` |  |

#### Example: Load

```lua
local agent_workflow_run, err = client:AgentWorkflowRun():load({ id = "agent_workflow_run_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_workflow_runs, err = client:AgentWorkflowRun():list({ agent_id = "example", organization_id = "example" })
```


### AgentWorkflowTrigger

Create an instance: `local agent_workflow_trigger = client:AgentWorkflowTrigger(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budget` | `table|nil` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `boolean` |  |
| `can_pause` | `boolean` | It is running, so a manager can pause it |
| `can_resume` | `boolean` | A person paused it, so a manager can resume it |
| `can_review` | `boolean` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `number|nil` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `string|nil` | When the daily count starts again, at the organization's midnight |
| `id` | `string` |  |
| `kind` | `string` |  |
| `next_due_at` | `string|nil` |  |
| `pause_cause` | `string|nil` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `boolean` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `string|nil` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `number|nil` |  |
| `schedule` | `table|nil` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `string|nil` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `number` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `string|nil` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `string|nil` |  |
| `starts` | `table|nil` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `string|nil` | The event subscription that starts it |
| `time_zone` | `string` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `number|nil` | Events that started a run today, for an event workflow |
| `trigger` | `table` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```lua
local agent_workflow_trigger, err = client:AgentWorkflowTrigger():load({ id = "agent_workflow_trigger_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_workflow_triggers, err = client:AgentWorkflowTrigger():list({ agent_id = "example", organization_id = "example" })
```


### AgentWorkspace

Create an instance: `local agent_workspace = client:AgentWorkspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_delete` | `boolean` |  |
| `can_keep` | `boolean` |  |
| `cleanup_after` | `string|nil` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `reason` | `string` |  |
| `state` | `string` |  |

#### Example: List

```lua
local agent_workspaces, err = client:AgentWorkspace():list({ agent_id = "example", organization_id = "example" })
```


### AgentWritePermission

Create an instance: `local agent_write_permission = client:AgentWritePermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `string` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` |  |
| `granted_by` | `string|nil` |  |
| `id` | `string` |  |
| `in_effect` | `boolean` | Whether the permission approves writes now. |
| `last_used_at` | `string|nil` |  |
| `tool` | `string` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```lua
local agent_write_permissions, err = client:AgentWritePermission():list({ agent_id = "example", organization_id = "example" })
```


### AllocationLog

Create an instance: `local allocation_log = client:AllocationLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `environment` | `string` |  |
| `fetched_at` | `string` |  |
| `location` | `string|nil` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `number` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```lua
local allocation_logs, err = client:AllocationLog():list({ allocation_id = "example", app_id = "example" })
```


### App

Create an instance: `local app = client:App(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `description` | `string|nil` |  |
| `framework` | `string|nil` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string` |  |
| `repository_kind` | `string|nil` |  |
| `root_path` | `string` |  |
| `root_path_display` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local app, err = client:App():load({ id = "app_id" })
```

#### Example: List

```lua
local apps, err = client:App():list()
```

#### Example: Create

```lua
local app, err = client:App():create({
  name = "example_name", -- string
  organization_id = "example_organization_id", -- string
  repository_id = "example_repository_id", -- string
  root_path = "example_root_path", -- string
  slug = "example_slug", -- string
})
```


### AppCdn

Create an instance: `local app_cdn = client:AppCdn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `cache_path_prefix` | `string|nil` |  |
| `cache_settings_json` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `distribution_kind` | `string` |  |
| `edge_hostname` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `hostnames` | `table` |  |
| `id` | `string` |  |
| `last_deployed_at` | `string|nil` |  |
| `last_deployed_at_label` | `string|nil` |  |
| `last_purged_at` | `string|nil` |  |
| `last_purged_at_label` | `string|nil` |  |
| `last_synced_at` | `string|nil` |  |
| `last_synced_at_label` | `string|nil` |  |
| `name` | `string` |  |
| `origin_url` | `string` |  |
| `provisioned` | `boolean` |  |
| `routing_settings_json` | `string|nil` |  |
| `security_settings_json` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local app_cdn, err = client:AppCdn():load({ id = "app_cdn_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_cdns, err = client:AppCdn():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_cdn, err = client:AppCdn():create({
  app_id = "example_app_id", -- string
  name = "example_name", -- string
  origin_url = "example_origin_url", -- string
  slug = "example_slug", -- string
})
```


### AppConfigVariable

Create an instance: `local app_config_variable = client:AppConfigVariable(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `description` | `string|nil` |  |
| `exposed_to_build` | `boolean` |  |
| `has_value` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `scope_kind` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string|nil` |  |
| `value_kind` | `string` |  |

#### Example: Load

```lua
local app_config_variable, err = client:AppConfigVariable():load({ id = "app_config_variable_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_config_variables, err = client:AppConfigVariable():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_config_variable, err = client:AppConfigVariable():create({
  app_id = "example_app_id", -- string
  exposed_to_build = true, -- boolean
  key = "example_key", -- string
  scope_kind = "example_scope_kind", -- string
  value_kind = "example_value_kind", -- string
})
```


### AppDataResource

Create an instance: `local app_data_resource = client:AppDataResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `string|nil` |  |
| `high_availability` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `string|nil` |  |
| `provider_metadata` | `table` |  |
| `region` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `number|nil` |  |
| `storage_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `version` | `string|nil` |  |

#### Example: Load

```lua
local app_data_resource, err = client:AppDataResource():load({ id = "app_data_resource_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_data_resources, err = client:AppDataResource():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_data_resource, err = client:AppDataResource():create({
  app_id = "example_app_id", -- string
  engine = "example_engine", -- string
  kind = "example_kind", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### AppDeploy

Create an instance: `local app_deploy = client:AppDeploy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `channel` | `string` |  |
| `command` | `string` |  |
| `commit_sha` | `string` |  |
| `desired_instances` | `number` |  |
| `environment` | `string` | Environment slug or public ID, all, or existing. |
| `image` | `string` |  |
| `region` | `string` |  |
| `rollout_predecessor` | `string` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` |  |

#### Example: Create

```lua
local app_deploy, err = client:AppDeploy():create({
  app_id = "example_app_id", -- string
  image = "example_image", -- string
})
```


### AppDeployment

Create an instance: `local app_deployment = client:AppDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `string|nil` |  |
| `build_role` | `string|nil` |  |
| `commit_sha` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `creator_user_id` | `string|nil` |  |
| `deployed_url` | `string|nil` |  |
| `display_id` | `number` |  |
| `failure_message` | `string|nil` |  |
| `finished_at` | `string|nil` |  |
| `finished_at_label` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string|nil` |  |
| `is_rollback` | `boolean` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `number` | `number` |  |
| `operation_key` | `string|nil` |  |
| `organization_id` | `string` |  |
| `rollback_reason` | `string|nil` |  |
| `rollback_source_deployment_id` | `string|nil` |  |
| `rollback_source_release_id` | `string|nil` |  |
| `rollback_target_release_id` | `string|nil` |  |
| `source_ref` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `started_at_label` | `string|nil` |  |
| `status` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local app_deployment, err = client:AppDeployment():load({ id = "app_deployment_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_deployments, err = client:AppDeployment():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_deployment, err = client:AppDeployment():create({
  app_id = "example_app_id", -- string
})
```


### AppDeploymentOperation

Create an instance: `local app_deployment_operation = client:AppDeploymentOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `table` |  |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `string|nil` |  |
| `build_duration_seconds` | `number|nil` |  |
| `build_source` | `table|nil` |  |
| `build_status` | `string` |  |
| `children` | `table` |  |
| `ci_pipeline_id` | `string|nil` |  |
| `ci_pipeline_run_id` | `string|nil` |  |
| `commit_sha` | `string|nil` |  |
| `created_at` | `string` |  |
| `creator` | `table|nil` |  |
| `deployed_url` | `string|nil` |  |
| `duration_seconds` | `number|nil` |  |
| `environment` | `table` |  |
| `failure_message` | `string` |  |
| `finished_at` | `string` |  |
| `history_kind` | `string` |  |
| `history_reason` | `string|nil` |  |
| `id` | `string` |  |
| `is_live` | `boolean` |  |
| `is_rollback` | `boolean` |  |
| `live_region_count` | `number` |  |
| `location_id` | `string` |  |
| `number` | `number` |  |
| `placement` | `table|nil` |  |
| `region_count` | `number` |  |
| `replicas_per_region` | `number` |  |
| `rollback_reason` | `string|nil` |  |
| `rollback_source_release_id` | `string|nil` |  |
| `rollback_target_release_id` | `string|nil` |  |
| `rollout_predecessor_id` | `string|nil` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `table` |  |
| `source_ref` | `string|nil` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `total_replicas` | `number` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local app_deployment_operation, err = client:AppDeploymentOperation():load({ id = "app_deployment_operation_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_deployment_operations, err = client:AppDeploymentOperation():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_deployment_operation, err = client:AppDeploymentOperation():create({
  app_id = "example_app_id", -- string
})
```


### AppDeploymentRollback

Create an instance: `local app_deployment_rollback = client:AppDeploymentRollback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_id` | `string` |  |
| `app_service_id` | `string` |  |
| `blockers` | `table` |  |
| `candidate_releases` | `table` |  |
| `confirmation_text` | `string` |  |
| `current_deployment` | `any` |  |
| `current_release` | `any` |  |
| `deployment` | `any` |  |
| `desired_state` | `any` |  |
| `environment` | `any` |  |
| `execution_allowed` | `boolean` |  |
| `force` | `boolean` |  |
| `idempotency_key` | `string` |  |
| `idempotent_reuse` | `boolean` |  |
| `location` | `any` |  |
| `operation` | `any` |  |
| `reason` | `string|nil` |  |
| `rollback_release` | `any` |  |
| `rollout` | `any` |  |
| `service` | `any` |  |
| `target_artifact_locator` | `string|nil` |  |
| `target_release` | `any` |  |
| `to` | `string` |  |
| `warnings` | `table` |  |

#### Example: Create

```lua
local app_deployment_rollback, err = client:AppDeploymentRollback():create({
  app_id = "example_app_id", -- string
})
```


### AppEnvironment

Create an instance: `local app_environment = client:AppEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `boolean` |  |
| `base_domain` | `string|nil` |  |
| `branch_pattern` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local app_environment, err = client:AppEnvironment():load({ id = "app_environment_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_environments, err = client:AppEnvironment():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_environment, err = client:AppEnvironment():create({
  app_id = "example_app_id", -- string
  auto_deploy = true, -- boolean
  kind = "example_kind", -- string
  location_id = "example_location_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
  status = "example_status", -- string
})
```


### AppLocation

Create an instance: `local app_location = client:AppLocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `location_id` | `string` |  |
| `name` | `string` |  |
| `nomad_datacenter` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local app_locations, err = client:AppLocation():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_location, err = client:AppLocation():create({
  app_id = "example_app_id", -- string
  location_id = "example_location_id", -- string
})
```


### AppMetric

Create an instance: `local app_metric = client:AppMetric(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppPreview

Create an instance: `local app_preview = client:AppPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` |  |
| `app_preview_profile_id` | `string` |  |
| `change_number` | `string` | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `number` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `number` | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `resource_overrides` | `table` | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` |  |
| `shared_data_binding_ids` | `table` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `table` | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` |  |
| `source_ref` | `string` |  |
| `storage_binding_resources` | `table` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```lua
local app_preview, err = client:AppPreview():load({ id = "app_preview_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_previews, err = client:AppPreview():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_preview, err = client:AppPreview():create({
  app_id = "example_app_id", -- string
  app_preview_profile_id = "example_app_preview_profile_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### AppPreviewProfile

Create an instance: `local app_preview_profile = client:AppPreviewProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `boolean` |  |
| `configuration` | `table` |  |
| `created_at` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `source_environment_id` | `string` |  |
| `ttl_days` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local app_preview_profile, err = client:AppPreviewProfile():load({ id = "app_preview_profile_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_preview_profiles, err = client:AppPreviewProfile():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_preview_profile, err = client:AppPreviewProfile():create({
  app_id = "example_app_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
  source_environment_id = "example_source_environment_id", -- string
})
```


### AppRun

Create an instance: `local app_run = client:AppRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `image` | `string` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

#### Example: Load

```lua
local app_run, err = client:AppRun():load({ id = "app_run_id" })
```

#### Example: List

```lua
local app_runs, err = client:AppRun():list()
```

#### Example: Create

```lua
local app_run, err = client:AppRun():create({
})
```


### AppSecret

Create an instance: `local app_secret = client:AppSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `description` | `string|nil` |  |
| `env_key` | `string|nil` |  |
| `expose_to_build` | `boolean` |  |
| `has_value` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_version_number` | `number|nil` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `rotation_policy` | `string|nil` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string` |  |
| `value_digest` | `string|nil` |  |
| `value_kind` | `string|nil` |  |

#### Example: Load

```lua
local app_secret, err = client:AppSecret():load({ id = "app_secret_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_secrets, err = client:AppSecret():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_secret, err = client:AppSecret():create({
  app_id = "example_app_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### AppService

Create an instance: `local app_service = client:AppService(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `boolean` |  |
| `bindings` | `table` |  |
| `build_command` | `string|nil` |  |
| `cpu_label` | `string|nil` |  |
| `cpu_mhz` | `number|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `deploy_paths` | `table` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `number` |  |
| `disk_label` | `string|nil` |  |
| `disk_mb` | `number|nil` |  |
| `effective_deploy_paths` | `table` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `internal_port` | `number|nil` |  |
| `kind` | `string` |  |
| `memory_label` | `string|nil` |  |
| `memory_max_label` | `string|nil` |  |
| `memory_max_mb` | `number|nil` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `number|nil` |  |
| `name` | `string` |  |
| `nomad_constraints_json` | `string|nil` |  |
| `nomad_kill_timeout_seconds` | `number|nil` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `string|nil` |  |
| `nomad_region` | `string|nil` |  |
| `nomad_shutdown_delay_seconds` | `number|nil` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `string|nil` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `string|nil` |  |
| `prestart_command` | `string|nil` |  |
| `publicly_accessible` | `boolean` |  |
| `release_command` | `string|nil` |  |
| `repo_source_path` | `string` |  |
| `runtime` | `string` |  |
| `runtime_adapter_kind` | `string` |  |
| `runtime_adapter_settings_json` | `string|nil` |  |
| `schedule` | `string|nil` |  |
| `slug` | `string` |  |
| `source_path` | `string` |  |
| `start_command` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local app_service, err = client:AppService():load({ id = "app_service_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_services, err = client:AppService():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_service, err = client:AppService():create({
  app_id = "example_app_id", -- string
  auto_deploy = true, -- boolean
  desired_instances = 1, -- number
  kind = "example_kind", -- string
  name = "example_name", -- string
  publicly_accessible = true, -- boolean
  runtime = "example_runtime", -- string
  runtime_adapter_kind = "example_runtime_adapter_kind", -- string
  slug = "example_slug", -- string
  source_path = "example_source_path", -- string
  start_command = "example_start_command", -- string|nil
})
```


### AppServiceBinding

Create an instance: `local app_service_binding = client:AppServiceBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local app_service_binding, err = client:AppServiceBinding():load({ id = "app_service_binding_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_service_bindings, err = client:AppServiceBinding():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_service_binding, err = client:AppServiceBinding():create({
  app_id = "example_app_id", -- string
})
```


### AppServicePlacement

Create an instance: `local app_service_placement = client:AppServicePlacement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `created_at` | `string` |  |
| `deployment_channel` | `string|nil` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `organization_id` | `string` |  |
| `region_count` | `number` |  |
| `replicas_per_region` | `number` |  |
| `rollout_strategy` | `string` |  |
| `targets` | `table` |  |
| `total_replicas` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local app_service_placement, err = client:AppServicePlacement():load({ id = "app_service_placement_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_service_placements, err = client:AppServicePlacement():list({ app_id = "example" })
```


### AppStorageResource

Create an instance: `local app_storage_resource = client:AppStorageResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `string` | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `string|nil` |  |
| `attachment` | `table|nil` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `number|nil` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `string|nil` |  |
| `created_at` | `string` |  |
| `ephemeral` | `boolean` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `string|nil` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location_code` | `string|nil` |  |
| `location_id` | `string|nil` | Volume datacenter pin (volume kind only) |
| `mount_path` | `string|nil` |  |
| `name` | `string` |  |
| `provider` | `string` | Storage backend. |
| `provider_error` | `string|nil` | Last provisioning/teardown error from the storage provider |
| `region` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local app_storage_resource, err = client:AppStorageResource():load({ id = "app_storage_resource_id", app_id = "app_id" })
```

#### Example: List

```lua
local app_storage_resources, err = client:AppStorageResource():list({ app_id = "example" })
```

#### Example: Create

```lua
local app_storage_resource, err = client:AppStorageResource():create({
  app_id = "example_app_id", -- string
  access_mode = "example_access_mode", -- string
  kind = "example_kind", -- string
  name = "example_name", -- string
  provider = "example_provider", -- string
  slug = "example_slug", -- string
  status = "example_status", -- string
})
```


### AttachmentPart

Create an instance: `local attachment_part = client:AttachmentPart(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AutomationEvent

Create an instance: `local automation_event = client:AutomationEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_manage` | `boolean` |  |
| `can_manage_events` | `boolean` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` |  |
| `event_subscriptions` | `table` |  |
| `event_triggers` | `table` |  |
| `expected_revision` | `string|nil` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `number` |  |
| `schedule` | `any` |  |
| `schedules` | `table` |  |
| `settings` | `table` |  |
| `subscription_key` | `string` |  |
| `version` | `table` |  |


### AutomationRun

Create an instance: `local automation_run = client:AutomationRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `table|nil` | Saved native automation identity. |
| `budget_seconds` | `number|nil` | The run stops once it has been running this long |
| `budget_usd` | `number|nil` | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `table|nil` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string|nil` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `table` |  |
| `error` | `string|nil` |  |
| `finished_at` | `string|nil` |  |
| `flow_steps` | `table|nil` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` |  |
| `input` | `table` |  |
| `needs_you` | `boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `string|nil` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string|nil` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` |  |
| `resume_count` | `number` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string|nil` |  |
| `running_seconds` | `number` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `number` | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `table|nil` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `number` |  |
| `steps` | `table` |  |
| `trigger_id` | `string|nil` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` |  |
| `wake_at` | `string|nil` | When a sleeping run's step looks again |
| `workflow_digest` | `string|nil` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string|nil` |  |

#### Example: Create

```lua
local automation_run, err = client:AutomationRun():create({
  agent_id = "example_agent_id", -- string
  automation_id = "example_automation_id", -- string
  organization_id = "example_organization_id", -- string
  input = {}, -- table
  request_id = "example_request_id", -- string
  version_id = "example_version_id", -- string
})
```


### Binary

Create an instance: `local binary = client:Binary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts_versions` | `boolean` |  |
| `arch` | `any` |  |
| `archived_at` | `string|nil` |  |
| `binary` | `table` |  |
| `created_at` | `string` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `latest_version` | `any` |  |
| `launch_args` | `table` |  |
| `name` | `string` |  |
| `needs_refresh` | `boolean` |  |
| `operation` | `table` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `platform` | `any` |  |
| `project_id` | `string` |  |
| `sha256` | `string` |  |
| `slug` | `string` |  |
| `version` | `table` |  |
| `version_defaults` | `any` |  |
| `versions` | `table` |  |
| `window_title` | `string` |  |

#### Example: Load

```lua
local binary, err = client:Binary():load({ id = "binary_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local binarys, err = client:Binary():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local binary, err = client:Binary():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  download_url = "example_download_url", -- string
  executable = "example_executable", -- string
  format = "example_format", -- any
  idempotency_key = "example_idempotency_key", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
  window_title = "example_window_title", -- string
})
```


### BinaryVersion

Create an instance: `local binary_version = client:BinaryVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arch` | `any` |  |
| `cancelable` | `boolean` |  |
| `configuration` | `table` |  |
| `configuration_digest` | `string` |  |
| `created_at` | `string` |  |
| `deletable` | `boolean` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `environment_uses` | `table` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_args` | `table` |  |
| `operation` | `table` |  |
| `package_sha256` | `string|nil` |  |
| `package_size` | `number|nil` |  |
| `permissions` | `table` |  |
| `platform` | `any` |  |
| `preparations` | `table` |  |
| `retryable` | `boolean` |  |
| `sha256` | `string` |  |
| `status` | `string` |  |
| `version` | `table` |  |
| `window_title` | `string` |  |

#### Example: Load

```lua
local binary_version, err = client:BinaryVersion():load({ id = "binary_version_id", binary_id = "binary_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local binary_versions, err = client:BinaryVersion():list({ binary_id = "example", organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local binary_version, err = client:BinaryVersion():create({
  binary_id = "example_binary_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  download_url = "example_download_url", -- string
  idempotency_key = "example_idempotency_key", -- string
})
```


### BrowserEgressCandidate

Create an instance: `local browser_egress_candidate = client:BrowserEgressCandidate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```lua
local browser_egress_candidates, err = client:BrowserEgressCandidate():list({ organization_id = "example" })
```


### BrowserSession

Create an instance: `local browser_session = client:BrowserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `string|nil` |  |
| `authentication_status` | `string` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `string|nil` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `string|nil` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `string|nil` |  |
| `closure_basis` | `string|nil` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `number` |  |
| `controller` | `string` |  |
| `credential_id` | `string|nil` | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `string|nil` |  |
| `expires_at` | `string` |  |
| `failure_code` | `string|nil` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `initial_url` | `string` |  |
| `max_seconds` | `number` |  |
| `pending_control_id` | `string|nil` |  |
| `project_id` | `string|nil` | Optional project slug or public ID. |
| `reconciled_at` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `status` | `string` |  |
| `url` | `string` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `table|nil` |  |

#### Example: Load

```lua
local browser_session, err = client:BrowserSession():load({ id = "browser_session_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local browser_session, err = client:BrowserSession():create({
  organization_id = "example_organization_id", -- string
})
```


### BrowserSessionConnection

Create an instance: `local browser_session_connection = client:BrowserSessionConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `generation` | `number` |  |
| `idempotency_key` | `string` |  |

#### Example: Create

```lua
local browser_session_connection, err = client:BrowserSessionConnection():create({
  browser_session_id = "example_browser_session_id", -- string
  organization_id = "example_organization_id", -- string
  generation = 1, -- number
})
```


### BrowserSessionControl

Create an instance: `local browser_session_control = client:BrowserSessionControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `completed_at` | `string|nil` |  |
| `completed_generation` | `number|nil` |  |
| `connection` | `table|nil` |  |
| `failure_code` | `string|nil` |  |
| `id` | `string` |  |
| `requested_controller` | `string` |  |
| `requested_generation` | `number` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local browser_session_control, err = client:BrowserSessionControl():load({ id = "browser_session_control_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```


### BrowserSessionEvent

Create an instance: `local browser_session_event = client:BrowserSessionEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `payload` | `table` |  |
| `source_sequence` | `number|nil` |  |

#### Example: List

```lua
local browser_session_events, err = client:BrowserSessionEvent():list({ browser_session_id = "example", organization_id = "example" })
```


### BrowserSessionMedia

Create an instance: `local browser_session_media = client:BrowserSessionMedia(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `capture_omissions` | `table|nil` |  |
| `captured_at` | `string|nil` |  |
| `ended_at` | `string|nil` |  |
| `failure_code` | `string|nil` |  |
| `files` | `table` |  |
| `frames` | `number|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `partial` | `boolean` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` |  |
| `source` | `table|nil` | Screenshot provenance. |
| `status` | `string` |  |
| `stop_requested_at` | `string|nil` |  |

#### Example: Load

```lua
local browser_session_media, err = client:BrowserSessionMedia():load({ id = "browser_session_media_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```


### BrowserSessionRecording

Create an instance: `local browser_session_recording = client:BrowserSessionRecording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `wait` | `boolean` | Only screenshots support wait: true. |

#### Example: Create

```lua
local browser_session_recording, err = client:BrowserSessionRecording():create({
  browser_session_id = "example_browser_session_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### BrowserSessionScreenshot

Create an instance: `local browser_session_screenshot = client:BrowserSessionScreenshot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idempotency_key` | `string` |  |
| `wait` | `boolean` | Only screenshots support wait: true. |

#### Example: Create

```lua
local browser_session_screenshot, err = client:BrowserSessionScreenshot():create({
  browser_session_id = "example_browser_session_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### BrowserSessionTask

Create an instance: `local browser_session_task = client:BrowserSessionTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `table|nil` |  |
| `browser_session_id` | `string` |  |
| `cancel_requested_at` | `string|nil` |  |
| `completed_at` | `string|nil` |  |
| `control_generation` | `number|nil` |  |
| `deadline_at` | `string` |  |
| `effects_unknown` | `boolean` |  |
| `failure_code` | `string|nil` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `instruction` | `string` |  |
| `max_rounds` | `number` |  |
| `max_seconds` | `number` |  |
| `model_selection` | `table` |  |
| `outcome` | `string|nil` |  |
| `result` | `table` |  |
| `started_at` | `string|nil` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local browser_session_task, err = client:BrowserSessionTask():load({ id = "browser_session_task_id", browser_session_id = "browser_session_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local browser_session_task, err = client:BrowserSessionTask():create({
  browser_session_id = "example_browser_session_id", -- string
  organization_id = "example_organization_id", -- string
  instruction = "example_instruction", -- string
})
```


### CatalogSelector

Create an instance: `local catalog_selector = client:CatalogSelector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `table` |  |

#### Example: List

```lua
local catalog_selectors, err = client:CatalogSelector():list({ app_id = "example" })
```


### CdnDeployment

Create an instance: `local cdn_deployment = client:CdnDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local cdn_deployment, err = client:CdnDeployment():load({ id = "cdn_deployment_id", app_id = "app_id", cdn_id = "cdn_id" })
```

#### Example: List

```lua
local cdn_deployments, err = client:CdnDeployment():list({ app_id = "example", cdn_id = "example" })
```

#### Example: Create

```lua
local cdn_deployment, err = client:CdnDeployment():create({
  app_id = "example_app_id", -- string
  cdn_id = "example_cdn_id", -- string
})
```


### CdnHostname

Create an instance: `local cdn_hostname = client:CdnHostname(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_cdn_distribution_id` | `string` |  |
| `created_at` | `string` |  |
| `dns_status` | `string` |  |
| `force_ssl` | `boolean` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `provider_hostname_id` | `string|nil` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local cdn_hostname, err = client:CdnHostname():load({ id = "cdn_hostname_id", app_id = "app_id", cdn_id = "cdn_id" })
```

#### Example: List

```lua
local cdn_hostnames, err = client:CdnHostname():list({ app_id = "example", cdn_id = "example" })
```

#### Example: Create

```lua
local cdn_hostname, err = client:CdnHostname():create({
  app_id = "example_app_id", -- string
  cdn_id = "example_cdn_id", -- string
  hostname = "example_hostname", -- string
})
```


### CdnSpace

Create an instance: `local cdn_space = client:CdnSpace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local cdn_space, err = client:CdnSpace():load({ id = "cdn_space_id" })
```

#### Example: List

```lua
local cdn_spaces, err = client:CdnSpace():list({ organization_id = "example" })
```

#### Example: Create

```lua
local cdn_space, err = client:CdnSpace():create({
  organization_id = "example_organization_id", -- string
})
```


### CdnSpaceObject

Create an instance: `local cdn_space_object = client:CdnSpaceObject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local cdn_space_object, err = client:CdnSpaceObject():load({ id = "cdn_space_object_id", cdn_space_id = "cdn_space_id" })
```

#### Example: List

```lua
local cdn_space_objects, err = client:CdnSpaceObject():list({ cdn_space_id = "example" })
```


### ConnectionRequest

Create an instance: `local connection_request = client:ConnectionRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `string` |  |
| `auth_scheme` | `string` |  |
| `can_configure` | `boolean` |  |
| `can_disconnect` | `boolean` |  |
| `can_setup` | `boolean` |  |
| `error_code` | `string|nil` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `string|nil` |  |
| `retired_at` | `string|nil` |  |
| `revoked_at` | `string|nil` |  |
| `source_operation_id` | `string|nil` |  |
| `state` | `string` |  |

#### Example: Load

```lua
local connection_request, err = client:ConnectionRequest():load({ id = "connection_request_id", agent_id = "agent_id", organization_id = "organization_id" })
```


### ConnectionSource

Create an instance: `local connection_source = client:ConnectionSource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `provider` | `string` |  |
| `source_operation_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local connection_sources, err = client:ConnectionSource():list({ agent_id = "example", organization_id = "example" })
```


### CoordinationWait

Create an instance: `local coordination_wait = client:CoordinationWait(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_stop` | `boolean` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `stop_state` | `string|nil` |  |
| `wake_outcome` | `string|nil` |  |

#### Example: List

```lua
local coordination_waits, err = client:CoordinationWait():list({ agent_id = "example", coordination_id = "example", organization_id = "example" })
```


### CredentialSignInCheck

Create an instance: `local credential_sign_in_check = client:CredentialSignInCheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | The project environment (app) to sign in to |
| `environment_name` | `string` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```lua
local credential_sign_in_check, err = client:CredentialSignInCheck():create({
  credential_id = "example_credential_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  environment_id = "example_environment_id", -- string
})
```


### DataResourceRotateCredential

Create an instance: `local data_resource_rotate_credential = client:DataResourceRotateCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `string|nil` |  |
| `high_availability` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `string|nil` |  |
| `provider_metadata` | `table` |  |
| `region` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `number|nil` |  |
| `storage_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `version` | `string|nil` |  |

#### Example: Create

```lua
local data_resource_rotate_credential, err = client:DataResourceRotateCredential():create({
  app_id = "example_app_id", -- string
  data_resource_id = "example_data_resource_id", -- string
})
```


### DeepScan

Create an instance: `local deep_scan = client:DeepScan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `active` | `table` |  |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `table` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `table` | Present only when launch was requested by an admin |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `table` |  |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```lua
local deep_scan, err = client:DeepScan():load({ id = "deep_scan_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local deep_scans, err = client:DeepScan():list({ organization_id = "example" })
```

#### Example: Create

```lua
local deep_scan, err = client:DeepScan():create({
  organization_id = "example_organization_id", -- string
  environment_id = "example_environment_id", -- string
  goal = "example_goal", -- string
})
```


### DeepScanFinding

Create an instance: `local deep_scan_finding = client:DeepScanFinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding_count` | `number` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `table` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `table` |  |
| `findings_fix_prompt` | `string|nil` |  |
| `free_findings_pending` | `boolean` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `table` |  |
| `priority` | `string|nil` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` |  |
| `reproduction_of` | `table|nil` |  |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `boolean` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` |  |
| `title` | `string` |  |
| `unlock` | `table` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` |  |

#### Example: List

```lua
local deep_scan_findings, err = client:DeepScanFinding():list({ deep_scan_id = "example", organization_id = "example" })
```


### DeepScanFlow

Create an instance: `local deep_scan_flow = client:DeepScanFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `concurrency` | `number` |  |
| `environment_id` | `string` |  |
| `exploration_id` | `string` |  |
| `flow_names` | `table` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `note` | `string|nil` |  |

#### Example: Create

```lua
local deep_scan_flow, err = client:DeepScanFlow():create({
  organization_id = "example_organization_id", -- string
  flow_names = {}, -- table
})
```


### DeepScanMappedFlow

Create an instance: `local deep_scan_mapped_flow = client:DeepScanMappedFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `environment_id` | `string` |  |
| `flow_map` | `table|nil` |  |
| `revision_id` | `string|nil` |  |

#### Example: List

```lua
local deep_scan_mapped_flows, err = client:DeepScanMappedFlow():list({ organization_id = "example", environment_id = "example" })
```


### DeepScanOption

Create an instance: `local deep_scan_option = client:DeepScanOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `table` |  |
| `deep_scan_defaults` | `any` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `table|nil` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` |  |
| `name` | `string` |  |
| `personas` | `table` |  |
| `preview` | `boolean` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `string|nil` |  |

#### Example: List

```lua
local deep_scan_options, err = client:DeepScanOption():list({ organization_id = "example" })
```


### DemoShare

Create an instance: `local demo_share = client:DemoShare(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `recording` | `table` |  |
| `summary` | `string` | What the recorded browser confirmed. |

#### Example: Load

```lua
local demo_share, err = client:DemoShare():load({ id = "demo_share_id" })
```


### DemoShareSegment

Create an instance: `local demo_share_segment = client:DemoShareSegment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local demo_share_segment, err = client:DemoShareSegment():load({ id = "demo_share_segment_id", demo_share_id = "demo_share_id" })
```


### DeploymentDashboardNomad

Create an instance: `local deployment_dashboard_nomad = client:DeploymentDashboardNomad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentFile

Create an instance: `local deployment_file = client:DeploymentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DomainPathRule

Create an instance: `local domain_path_rule = client:DomainPathRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_kind` | `string` |  |
| `app_service_endpoint_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `backend_ref` | `string|nil` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string|nil` |  |
| `path_prefix` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local domain_path_rule, err = client:DomainPathRule():load({ id = "domain_path_rule_id", app_id = "app_id", domain_id = "domain_id" })
```

#### Example: List

```lua
local domain_path_rules, err = client:DomainPathRule():list({ app_id = "example", domain_id = "example" })
```

#### Example: Create

```lua
local domain_path_rule, err = client:DomainPathRule():create({
  app_id = "example_app_id", -- string
  domain_id = "example_domain_id", -- string
  app_service_id = "example_app_service_id", -- string|nil
  path_prefix = "example_path_prefix", -- string
})
```


### Dream

Create an instance: `local dream = client:Dream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `boolean` | The dream skipped at least one run, which will not be retried |
| `changes` | `table` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `string|nil` |  |
| `counts` | `table` |  |
| `dream` | `any` |  |
| `error_code` | `string|nil` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Public id used in the dream's URL |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `phase` | `string` | Where the dream is. |
| `reason` | `string|nil` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `number` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Local day whose finished runs it reviewed |
| `runs` | `table` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Project or unassigned environment name |
| `skipped` | `number` | Runs skipped after repeated rejected review output |
| `tab` | `string` |  |
| `timezone` | `string` | Organization timezone the dream used |

#### Example: Load

```lua
local dream, err = client:Dream():load({ id = "dream_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local dreams, err = client:Dream():list({ organization_id = "example", project_id = "example" })
```


### Environment

Create an instance: `local environment = client:Environment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_revision_id` | `string|nil` |  |
| `agent_sign_up_available` | `boolean` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `table` |  |
| `cleanup` | `table` |  |
| `connection` | `string` |  |
| `created_at` | `string` |  |
| `default_policy` | `table` |  |
| `default_policy_json` | `table` |  |
| `discovery_defaults` | `table` |  |
| `environment` | `table` |  |
| `exploration_accounts` | `table` |  |
| `explorations` | `table` |  |
| `first_run` | `any` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `imessage_number` | `string|nil` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `boolean` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `number` |  |
| `managed_google_available` | `boolean` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` |  |
| `messaging_tester_number` | `string|nil` | One configured tester number. |
| `name` | `string` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `table` |  |
| `onboarding_discovery` | `any` |  |
| `organization_id` | `string` |  |
| `pending_accounts` | `table` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `table` |  |
| `project_id` | `string|nil` | Owning project. |
| `repository_id` | `string|nil` |  |
| `revisions` | `table` |  |
| `setup_discovery_id` | `string|nil` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `boolean` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `target_kind` | `string|nil` |  |
| `target_url` | `string|nil` |  |
| `test_accounts` | `table` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `string|nil` |  |
| `version` | `number` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```lua
local environment, err = client:Environment():load({ id = "environment_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local environments, err = client:Environment():list({ organization_id = "example" })
```

#### Example: Create

```lua
local environment, err = client:Environment():create({
  organization_id = "example_organization_id", -- string
  slug = "example_slug", -- string
})
```


### EnvironmentDiscoveryRun

Create an instance: `local environment_discovery_run = client:EnvironmentDiscoveryRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` | Omit for anonymous exploration |
| `deadline_at` | `string` |  |
| `environment_revision_id` | `string` |  |
| `evidence` | `table` |  |
| `failure_code` | `string|nil` |  |
| `id` | `string` |  |
| `queued_at` | `string` |  |
| `recording` | `table` |  |
| `result` | `table|nil` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local environment_discovery_run, err = client:EnvironmentDiscoveryRun():load({ id = "environment_discovery_run_id", environment_id = "environment_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local environment_discovery_run, err = client:EnvironmentDiscoveryRun():create({
  environment_id = "example_environment_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### EnvironmentExploration

Create an instance: `local environment_exploration = client:EnvironmentExploration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `persona_id` | `string|nil` |  |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```lua
local environment_exploration, err = client:EnvironmentExploration():create({
  environment_id = "example_environment_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  goal = "example_goal", -- string
})
```


### EnvironmentFirstRun

Create an instance: `local environment_first_run = client:EnvironmentFirstRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### EnvironmentRevision

Create an instance: `local environment_revision = client:EnvironmentRevision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `table` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `string|nil` |  |
| `app_release_id` | `string|nil` |  |
| `blueprint` | `table` |  |
| `blueprint_json` | `table` |  |
| `cleanup_state` | `string` |  |
| `created_at` | `string` |  |
| `digest` | `string` |  |
| `dry_run` | `boolean` |  |
| `expires_at` | `string|nil` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `ready_at` | `string|nil` |  |
| `resolved_manifest_json` | `table` |  |
| `retention_policy_json` | `table` |  |
| `revision` | `number` |  |
| `revoked_at` | `string|nil` |  |
| `runner_environment_revision_id` | `string|nil` |  |
| `safety_policy_json` | `table` |  |
| `schema_version` | `number` |  |
| `source_metadata` | `table` |  |
| `source_metadata_json` | `table` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `validation_json` | `table` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```lua
local environment_revision, err = client:EnvironmentRevision():load({ id = "environment_revision_id", environment_id = "environment_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local environment_revision, err = client:EnvironmentRevision():create({
  environment_id = "example_environment_id", -- string
  organization_id = "example_organization_id", -- string
  blueprint = {}, -- table
})
```


### EnvironmentSecretBinding

Create an instance: `local environment_secret_binding = client:EnvironmentSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: List

```lua
local environment_secret_bindings, err = client:EnvironmentSecretBinding():list({ app_id = "example", environment_id = "example" })
```

#### Example: Create

```lua
local environment_secret_binding, err = client:EnvironmentSecretBinding():create({
  app_id = "example_app_id", -- string
  environment_id = "example_environment_id", -- string
  env_key = "example_env_key", -- string
})
```


### EnvironmentTestAccount

Create an instance: `local environment_test_account = client:EnvironmentTestAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `boolean` |  |
| `credentials` | `table` |  |
| `id` | `string` |  |
| `persona` | `string` |  |
| `revision_id` | `string` |  |
| `role` | `string` |  |
| `tenant` | `string` |  |

#### Example: List

```lua
local environment_test_accounts, err = client:EnvironmentTestAccount():list({ environment_id = "example", organization_id = "example" })
```


### Evidence

Create an instance: `local evidence = client:Evidence(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local evidence, err = client:Evidence():load({ id = "evidence_id", organization_id = "organization_id" })
```


### Exploration

Create an instance: `local exploration = client:Exploration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `active` | `table` |  |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `table` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `table` | Present only when launch was requested by an admin |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `table` |  |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `persona_id` | `string|nil` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```lua
local exploration, err = client:Exploration():load({ id = "exploration_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local explorations, err = client:Exploration():list({ organization_id = "example" })
```

#### Example: Create

```lua
local exploration, err = client:Exploration():create({
  organization_id = "example_organization_id", -- string
  environment_id = "example_environment_id", -- string
  goal = "example_goal", -- string
})
```


### ExplorationMessage

Create an instance: `local exploration_message = client:ExplorationMessage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `text` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```lua
local exploration_message, err = client:ExplorationMessage():create({
  exploration_id = "example_exploration_id", -- string
  organization_id = "example_organization_id", -- string
  text = "example_text", -- string
})
```


### ExplorationReport

Create an instance: `local exploration_report = client:ExplorationReport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ExplorationScenario

Create an instance: `local exploration_scenario = client:ExplorationScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `table` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `table` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string|nil` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string|nil` |  |
| `goal` | `string` |  |
| `huntable_flows` | `table` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `table` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `table` |  |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `table` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```lua
local exploration_scenario, err = client:ExplorationScenario():create({
  exploration_id = "example_exploration_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### Finding

Create an instance: `local finding = client:Finding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `created_at` | `string` |  |
| `deferred_until` | `string|nil` | Required future time when status is deferred |
| `finding` | `table` |  |
| `fingerprint` | `string` |  |
| `first_seen_at` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `boolean` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `number` |  |
| `organization_id` | `string` |  |
| `permissions` | `table` |  |
| `reason` | `string` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `table|nil` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `string|nil` |  |
| `safe_summary` | `string` |  |
| `scenario_occurrences` | `table` |  |
| `severity` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verification` | `any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```lua
local finding, err = client:Finding():load({ id = "finding_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local findings, err = client:Finding():list({ organization_id = "example" })
```


### GithubConnection

Create an instance: `local github_connection = client:GithubConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `table` |  |
| `github_app_installation_id` | `string` |  |
| `installations` | `table` |  |
| `project_id` | `string` | Project slug or public ID the repositories are added to. |
| `replace` | `boolean` | Make these the project's only repositories. |
| `repositories` | `table` |  |

#### Example: List

```lua
local github_connections, err = client:GithubConnection():list({ organization_id = "example" })
```

#### Example: Create

```lua
local github_connection, err = client:GithubConnection():create({
  organization_id = "example_organization_id", -- string
  github_app_installation_id = "example_github_app_installation_id", -- string
  repositories = {}, -- table
})
```


### HostingAppDomain

Create an instance: `local hosting_app_domain = client:HostingAppDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `certificate` | `table|nil` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string|nil` |  |
| `path_rules` | `table` |  |
| `record_name` | `string|nil` |  |
| `record_type` | `string|nil` |  |
| `record_value` | `string|nil` |  |
| `redirect_to` | `string|nil` |  |
| `static_site_id` | `string|nil` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_record` | `table|nil` |  |
| `verification_status` | `string` |  |

#### Example: Load

```lua
local hosting_app_domain, err = client:HostingAppDomain():load({ id = "hosting_app_domain_id", app_id = "app_id" })
```

#### Example: List

```lua
local hosting_app_domains, err = client:HostingAppDomain():list({ app_id = "example" })
```

#### Example: Create

```lua
local hosting_app_domain, err = client:HostingAppDomain():create({
  app_id = "example_app_id", -- string
  app_service_id = "example_app_service_id", -- string|nil
  hostname = "example_hostname", -- string
  kind = "example_kind", -- string
})
```


### ImageRepository

Create an instance: `local image_repository = client:ImageRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_configured` | `boolean` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider_kind` | `string` |  |
| `registry_auth_token` | `string` |  |
| `repository_path` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `visibility` | `string` |  |

#### Example: List

```lua
local image_repositorys, err = client:ImageRepository():list({ organization_id = "example" })
```

#### Example: Create

```lua
local image_repository, err = client:ImageRepository():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### Integration

Create an instance: `local integration = client:Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `table` |  |
| `gitlab` | `table` |  |
| `permissions` | `table` |  |
| `slack` | `table` |  |

#### Example: List

```lua
local integrations, err = client:Integration():list({ organization_id = "example" })
```


### InteractionResponse

Create an instance: `local interaction_response = client:InteractionResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `table` |  |
| `conversation_id` | `string` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `number` |  |

#### Example: Create

```lua
local interaction_response, err = client:InteractionResponse():create({
  agent_id = "example_agent_id", -- string
  interaction_id = "example_interaction_id", -- string
  organization_id = "example_organization_id", -- string
  answer = {}, -- table
  conversation_id = "example_conversation_id", -- string
  expected_revision = 1, -- number
})
```


### Invitation

Create an instance: `local invitation = client:Invitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `string|nil` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `string|nil` |  |
| `expires_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `invite_url` | `string|nil` |  |
| `invited_by_user` | `any` |  |
| `organization` | `table` |  |
| `revoked_at` | `string|nil` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local invitations, err = client:Invitation():list({ organization_id = "example" })
```

#### Example: Create

```lua
local invitation, err = client:Invitation():create({
  organization_id = "example_organization_id", -- string
  email = "example_email", -- string
  role = "example_role", -- string
})
```


### JourneyVariantReplay

Create an instance: `local journey_variant_replay = client:JourneyVariantReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `string|nil` |  |
| `can_request_qualification` | `boolean` |  |
| `created_at` | `string` |  |
| `failure_code` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `preparation_receipt` | `table|nil` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `boolean` |  |
| `review_reason` | `string` |  |
| `run_id` | `string|nil` |  |
| `scenario_file` | `table` |  |
| `scenario_run_id` | `string|nil` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Create

```lua
local journey_variant_replay, err = client:JourneyVariantReplay():create({
  journey_variant_id = "example_journey_variant_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  idempotency_key = "example_idempotency_key", -- string
  review_reason = "example_review_reason", -- string
  scenario_file = {}, -- table
})
```


### Knowledge

Create an instance: `local knowledge = client:Knowledge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_digest` | `string` |  |
| `content_json` | `table` |  |
| `document` | `table` |  |
| `documents` | `table` |  |
| `dreaming` | `table` |  |
| `expected_digest` | `string` |  |
| `history` | `table` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `markdown` | `string` |  |
| `observed_at` | `string` |  |
| `organization` | `table` |  |
| `permissions` | `table` |  |
| `project_id` | `string` |  |
| `project_name` | `string` |  |
| `projects` | `table` |  |
| `selected_project_id` | `string|nil` |  |
| `source` | `table` |  |
| `title` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```lua
local knowledge, err = client:Knowledge():load({ id = "knowledge_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local knowledge, err = client:Knowledge():create({
  organization_id = "example_organization_id", -- string
  markdown = "example_markdown", -- string
  project_id = "example_project_id", -- string
  title = "example_title", -- string
})
```


### LocalThreadDelivery

Create an instance: `local local_thread_delivery = client:LocalThreadDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `string` |  |
| `decision_pending` | `boolean` |  |
| `delivery` | `table` |  |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `policy` | `table` |  |
| `recovery_message` | `string|nil` |  |

#### Example: Load

```lua
local local_thread_delivery, err = client:LocalThreadDelivery():load({ id = "local_thread_delivery_id", agent_id = "agent_id", local_thread_id = "local_thread_id", organization_id = "organization_id" })
```


### LocalThreadOperation

Create an instance: `local local_thread_operation = client:LocalThreadOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `table` |  |
| `created_at` | `string` |  |
| `delivery` | `table` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `table` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `table` |  |
| `result` | `any` |  |
| `result_expired` | `boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```lua
local local_thread_operation, err = client:LocalThreadOperation():load({ id = "local_thread_operation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local local_thread_operation, err = client:LocalThreadOperation():create({
  agent_id = "example_agent_id", -- string
  local_thread_id = "example_local_thread_id", -- string
  organization_id = "example_organization_id", -- string
  action = "example_action", -- string
  arguments = {}, -- table
  key = "example_key", -- string
})
```


### Location

Create an instance: `local location = client:Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `nomad_datacenter` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local locations, err = client:Location():list()
```


### Me

Create an instance: `local me = client:Me(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_organization` | `any` |  |
| `analytics_distinct_id` | `string` |  |
| `analytics_internal` | `boolean` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` |  |
| `api_token` | `string` |  |
| `app_promotion` | `table` |  |
| `commit_author_email` | `string` |  |
| `email` | `string` |  |
| `enabled_features` | `table` |  |
| `github_pr_user_authorization_connected` | `boolean` |  |
| `github_pr_user_authorization_login` | `string|nil` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `impersonation` | `table|nil` |  |
| `name` | `string|nil` |  |
| `next_path` | `string` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `table` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `boolean` |  |
| `openai_sign_in_enabled` | `boolean` |  |
| `organizations` | `table` |  |
| `pending_organization_invitation_count` | `number` |  |
| `pending_organization_invitation_count_label` | `string` |  |
| `picture_url` | `string|nil` |  |
| `superadmin` | `boolean` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `string|nil` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```lua
local me, err = client:Me():load({ id = "me_id" })
```


### MeEmail

Create an instance: `local me_email = client:MeEmail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `boolean` |  |
| `can_delete` | `boolean` |  |
| `can_resend_verification` | `boolean` |  |
| `can_set_account` | `boolean` |  |
| `can_set_commit_author` | `boolean` |  |
| `commit_author` | `boolean` |  |
| `email` | `string` |  |
| `emails` | `table` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `verification_status` | `string` |  |
| `verified` | `boolean` |  |

#### Example: List

```lua
local me_emails, err = client:MeEmail():list()
```

#### Example: Create

```lua
local me_email, err = client:MeEmail():create({
  email = "example_email", -- string
})
```


### MeOnboarding

Create an instance: `local me_onboarding = client:MeOnboarding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### MediaFile

Create an instance: `local media_file = client:MediaFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local media_file, err = client:MediaFile():load({ id = "media_file_id", browser_session_id = "browser_session_id", media_id = "media_id", organization_id = "organization_id" })
```


### Member

Create an instance: `local member = client:Member(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `string|nil` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `string|nil` |  |
| `expires_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `invite_url` | `string|nil` |  |
| `invited_by_user` | `any` |  |
| `is_self` | `boolean` |  |
| `organization` | `table` |  |
| `revoked_at` | `string|nil` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `user` | `table` |  |

#### Example: List

```lua
local members, err = client:Member():list({ organization_id = "example" })
```


### Memory

Create an instance: `local memory = client:Memory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `created_at` | `string` |  |
| `environment_id` | `string` |  |
| `finding` | `string` |  |
| `history` | `table` |  |
| `id` | `string` |  |
| `indexed_at` | `string|nil` |  |
| `memory` | `table` |  |
| `project_id` | `string` |  |
| `response` | `string` |  |
| `scope` | `table` |  |
| `source` | `table` |  |
| `tags` | `table` |  |
| `title` | `string` |  |
| `workaround` | `string` |  |

#### Example: Load

```lua
local memory, err = client:Memory():load({ id = "memory_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local memorys, err = client:Memory():list({ organization_id = "example" })
```

#### Example: Create

```lua
local memory, err = client:Memory():create({
  organization_id = "example_organization_id", -- string
  finding = "example_finding", -- string
  title = "example_title", -- string
})
```


### MergeRequest

Create an instance: `local merge_request = client:MergeRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `table` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` |  |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `string|nil` |  |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `boolean` |  |
| `findings` | `table` |  |
| `github_repository` | `string|nil` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `number` | `number` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `preview_cleanup_ready` | `boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string|nil` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `string|nil` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `string|nil` |  |
| `provider` | `string` |  |
| `pull_request` | `table` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `requested_run_id` | `string|nil` |  |
| `runs` | `table` |  |
| `source_branch` | `string|nil` |  |
| `source_repository` | `string|nil` |  |
| `source_url` | `string|nil` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: Load

```lua
local merge_request, err = client:MergeRequest():load({ id = "merge_request_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local merge_request, err = client:MergeRequest():create({
  organization_id = "example_organization_id", -- string
  idempotency_key = "example_idempotency_key", -- string
  number = 1, -- number
})
```


### MessagingConversationMessage

Create an instance: `local messaging_conversation_message = client:MessagingConversationMessage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_limit` | `number` |  |
| `attachment_max_bytes` | `number` |  |
| `client_operation_id` | `string` |  |
| `content` | `string` |  |
| `id` | `string` |  |
| `media` | `table` |  |
| `media_upload_ids` | `table` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `table` |  |
| `reply_to` | `string` | Public ID of a visible message |
| `retry_attachment` | `boolean` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `string|nil` |  |
| `send_disposition` | `string` |  |
| `send_error` | `string|nil` |  |
| `send_style` | `string|nil` |  |

#### Example: Create

```lua
local messaging_conversation_message, err = client:MessagingConversationMessage():create({
  messaging_conversation_id = "example_messaging_conversation_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  client_operation_id = "example_client_operation_id", -- string
  content = "example_content", -- string
  media = {}, -- table
})
```


### MessagingConversationUpload

Create an instance: `local messaging_conversation_upload = client:MessagingConversationUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `table` |  |
| `upload_id` | `string` |  |

#### Example: Create

```lua
local messaging_conversation_upload, err = client:MessagingConversationUpload():create({
  messaging_conversation_id = "example_messaging_conversation_id", -- string
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
})
```


### MetricQuery

Create an instance: `local metric_query = client:MetricQuery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local metric_querys, err = client:MetricQuery():list()
```


### NetworkConnection

Create an instance: `local network_connection = client:NetworkConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_client_vpn_profile` | `string` |  |
| `created_at` | `string` |  |
| `device_tag` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `oauth_client_id` | `string` |  |
| `oauth_client_secret` | `string` |  |
| `provider` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Create

```lua
local network_connection, err = client:NetworkConnection():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
})
```


### NomadAllocation

Create an instance: `local nomad_allocation = client:NomadAllocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `client_status` | `string|nil` |  |
| `create_time` | `string|nil` |  |
| `datacenter` | `string|nil` |  |
| `desired_description` | `string|nil` |  |
| `desired_status` | `string|nil` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `job_id` | `string|nil` |  |
| `modify_time` | `string|nil` |  |
| `name` | `string|nil` |  |
| `namespace` | `string` |  |
| `node_id` | `string|nil` |  |
| `node_name` | `string|nil` |  |
| `resources` | `table` |  |
| `task_group` | `string|nil` |  |
| `task_states` | `table` |  |
| `verify_runner_images` | `table` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```lua
local nomad_allocation, err = client:NomadAllocation():load({ id = "nomad_allocation_id", app_id = "app_id" })
```


### NomadLog

Create an instance: `local nomad_log = client:NomadLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `environment` | `string` |  |
| `fetched_at` | `string` |  |
| `location` | `string|nil` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `number` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```lua
local nomad_logs, err = client:NomadLog():list({ app_id = "example" })
```


### Organization

Create an instance: `local organization = client:Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `table` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `google_workspace_domain` | `string|nil` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` |  |
| `logo_url` | `string|nil` |  |
| `member_count` | `number` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `repository_count` | `number` |  |
| `role` | `string|nil` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `table` | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `verify_pr_scenario_writing_enabled` | `boolean` |  |

#### Example: Load

```lua
local organization, err = client:Organization():load({ id = "organization_id" })
```

#### Example: List

```lua
local organizations, err = client:Organization():list()
```

#### Example: Create

```lua
local organization, err = client:Organization():create({
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### Page

Create an instance: `local page = client:Page(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `table` |  |
| `checkout_required` | `boolean` |  |
| `cli_signed_in_at` | `string|nil` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `table` |  |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `table` |  |
| `included_deep_scan` | `boolean` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` |  |
| `organization` | `table` |  |
| `permissions` | `table` |  |
| `project` | `any` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `table` |  |
| `pull_requests` | `table` |  |
| `repositories` | `table` |  |
| `runs` | `table` |  |
| `runs_pagination` | `table` |  |
| `suggested_app_url` | `string|nil` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `boolean` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```lua
local page, err = client:Page():load({ organization_id = "organization_id" })
```


### PageAgent

Create an instance: `local page_agent = client:PageAgent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `table` |  |
| `can_edit_integration_connections` | `boolean` |  |
| `creation_enabled` | `boolean` |  |
| `inbox` | `any` |  |
| `integration_choices` | `table` |  |
| `integration_choices_truncated` | `boolean` |  |
| `integration_selected` | `table` |  |
| `model_choices` | `table` |  |
| `new_configuration` | `any` |  |
| `organization_id` | `string` |  |
| `pagination` | `table` |  |
| `pinned_agent` | `any` |  |
| `platform_event_types` | `table` |  |
| `repository_choices` | `table` | Empty compatibility field. |
| `repository_choices_truncated` | `boolean` |  |
| `runtime_versions` | `table` | Runtime choices authorized for this organization. |
| `selected_agent` | `any` |  |
| `selected_reference` | `string|nil` |  |
| `viewer_id` | `string` |  |

#### Example: List

```lua
local page_agents, err = client:PageAgent():list({ organization_id = "example" })
```


### PageProjectRun

Create an instance: `local page_project_run = client:PageProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `table` |  |
| `fix_scenario_count` | `number` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `table` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `number` |  |
| `id` | `string` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `preparation_reason` | `string|nil` |  |
| `project` | `table` |  |
| `run` | `table` |  |
| `scenario_runs` | `table` |  |
| `selected_scenario_run` | `any` |  |
| `web_path` | `string` |  |

#### Example: Load

```lua
local page_project_run, err = client:PageProjectRun():load({ id = "page_project_run_id", organization_id = "organization_id", project_id = "project_id" })
```


### PagesProjectCredential

Create an instance: `local pages_project_credential = client:PagesProjectCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `table|nil` |  |
| `composal_address` | `string|nil` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `boolean` |  |
| `credential_keys` | `table` |  |
| `description` | `string|nil` |  |
| `email_link_auth_origins` | `table` |  |
| `has_inbox` | `boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `table|nil` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string|nil` |  |
| `login_method` | `string` |  |
| `login_url` | `string` |  |
| `managed` | `boolean` |  |
| `mfa_enabled` | `boolean` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `sign_in_verified` | `boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string|nil` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: List

```lua
local pages_project_credentials, err = client:PagesProjectCredential():list({ organization_id = "example", project_id = "example" })
```


### PagesProjectPersona

Create an instance: `local pages_project_persona = client:PagesProjectPersona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_count` | `number` |  |
| `credentials` | `table` |  |
| `needs_attention_count` | `number` |  |
| `permissions` | `table` |  |
| `persona_states` | `table` | Scenarios by the state of their latest execution. |
| `personas` | `table` |  |
| `project` | `table` |  |

#### Example: List

```lua
local pages_project_personas, err = client:PagesProjectPersona():list({ organization_id = "example", project_id = "example" })
```


### PagesProjectRun

Create an instance: `local pages_project_run = client:PagesProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_query` | `string` |  |
| `environments` | `table` |  |
| `environments_has_more` | `boolean` |  |
| `pagination` | `table` |  |
| `runs` | `table` |  |
| `selected_environment` | `any` |  |

#### Example: List

```lua
local pages_project_runs, err = client:PagesProjectRun():list({ organization_id = "example", project_id = "example" })
```


### PagesProjectScenario

Create an instance: `local pages_project_scenario = client:PagesProjectScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `string|nil` |  |
| `id` | `string` |  |
| `kind` | `string|nil` |  |
| `name` | `string` |  |

#### Example: List

```lua
local pages_project_scenarios, err = client:PagesProjectScenario():list({ organization_id = "example", project_id = "example" })
```


### PersonalAccessToken

Create an instance: `local personal_access_token = client:PersonalAccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```lua
local personal_access_tokens, err = client:PersonalAccessToken():list()
```

#### Example: Create

```lua
local personal_access_token, err = client:PersonalAccessToken():create({
})
```


### PreviewOperation

Create an instance: `local preview_operation = client:PreviewOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local preview_operations, err = client:PreviewOperation():list({ app_id = "example", preview_id = "example" })
```


### PreviewProfileSecretBinding

Create an instance: `local preview_profile_secret_binding = client:PreviewProfileSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: List

```lua
local preview_profile_secret_bindings, err = client:PreviewProfileSecretBinding():list({ app_id = "example", preview_profile_id = "example" })
```

#### Example: Create

```lua
local preview_profile_secret_binding, err = client:PreviewProfileSecretBinding():create({
  app_id = "example_app_id", -- string
  preview_profile_id = "example_preview_profile_id", -- string
  env_key = "example_env_key", -- string
})
```


### PreviewSecret

Create an instance: `local preview_secret = client:PreviewSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `value` | `string` |  |

#### Example: Create

```lua
local preview_secret, err = client:PreviewSecret():create({
  app_id = "example_app_id", -- string
  preview_id = "example_preview_id", -- string
  env_key = "example_env_key", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
  value = "example_value", -- string
})
```


### PreviewSharingApproval

Create an instance: `local preview_sharing_approval = client:PreviewSharingApproval(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `table` |  |
| `approved_build_secrets` | `table` |  |
| `approved_default_configuration` | `table` |  |
| `approved_default_secrets` | `table` |  |
| `approved_source_keys` | `table` |  |
| `build_keys` | `table` |  |
| `build_secrets` | `table` |  |
| `default_configuration` | `table` |  |
| `default_secrets` | `table` |  |
| `services` | `table` |  |
| `snapshot_version` | `number` |  |
| `source_keys` | `table` |  |

#### Example: List

```lua
local preview_sharing_approvals, err = client:PreviewSharingApproval():list({ app_id = "example", preview_id = "example" })
```

#### Example: Create

```lua
local preview_sharing_approval, err = client:PreviewSharingApproval():create({
  app_id = "example_app_id", -- string
  preview_id = "example_preview_id", -- string
  snapshot_version = 1, -- number
})
```


### ProductMapIdentityDecision

Create an instance: `local product_map_identity_decision = client:ProductMapIdentityDecision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `table` |  |
| `operation` | `string` |  |
| `reason` | `string` |  |
| `target` | `table` |  |

#### Example: Create

```lua
local product_map_identity_decision, err = client:ProductMapIdentityDecision():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  observations = {}, -- table
  operation = "example_operation", -- string
  reason = "example_reason", -- string
  target = {}, -- table
})
```


### ProductMapJourney

Create an instance: `local product_map_journey = client:ProductMapJourney(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `string|nil` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `journey` | `table` |  |
| `next_cursor` | `string|nil` |  |
| `preview` | `any` |  |
| `scope` | `table` |  |
| `title` | `string` |  |
| `tree` | `table` |  |
| `tree_loaded` | `boolean` |  |
| `variant_count` | `number` |  |
| `variants` | `table` |  |

#### Example: Load

```lua
local product_map_journey, err = client:ProductMapJourney():load({ id = "product_map_journey_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local product_map_journeys, err = client:ProductMapJourney():list({ organization_id = "example", project_id = "example" })
```


### ProductMapJourneyReplay

Create an instance: `local product_map_journey_replay = client:ProductMapJourneyReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `string|nil` |  |
| `can_request_qualification` | `boolean` |  |
| `created_at` | `string` |  |
| `failure_code` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `id` | `string` |  |
| `preparation_receipt` | `table|nil` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `boolean` |  |
| `review_reason` | `string` |  |
| `run_id` | `string|nil` |  |
| `scenario_run_id` | `string|nil` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Load

```lua
local product_map_journey_replay, err = client:ProductMapJourneyReplay():load({ id = "product_map_journey_replay_id", organization_id = "organization_id", project_id = "project_id" })
```


### ProductMapObservation

Create an instance: `local product_map_observation = client:ProductMapObservation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `table` |  |
| `events` | `table` |  |
| `evidence_id` | `string` |  |
| `id` | `string` |  |
| `observation_id` | `string` |  |
| `scope` | `table` |  |
| `state` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local product_map_observation, err = client:ProductMapObservation():load({ id = "product_map_observation_id", organization_id = "organization_id", project_id = "project_id" })
```


### ProductMapQuestion

Create an instance: `local product_map_question = client:ProductMapQuestion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `area` | `string` |  |
| `before` | `string` |  |
| `claims` | `table` |  |
| `evidence_truncated` | `boolean` |  |
| `model` | `string` |  |
| `persona_id` | `string` |  |
| `query` | `string` |  |
| `question` | `string` |  |
| `reasoning_effort` | `string` |  |
| `revision_id` | `string` |  |
| `scope` | `table` |  |
| `since` | `string` |  |
| `state_id` | `string` |  |
| `status` | `string` |  |
| `unknowns` | `table` |  |

#### Example: Create

```lua
local product_map_question, err = client:ProductMapQuestion():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  question = "example_question", -- string
})
```


### ProductMapState

Create an instance: `local product_map_state = client:ProductMapState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `attempts` | `table` |  |
| `captured_at` | `string` |  |
| `id` | `string` |  |
| `incoming` | `table` |  |
| `labels` | `table` |  |
| `layout` | `table` |  |
| `observation_id` | `string` |  |
| `omitted_controls` | `number` |  |
| `outgoing` | `table` |  |
| `revision_id` | `string` |  |
| `scope` | `table` |  |
| `screenshot_url` | `string|nil` |  |
| `state` | `table` |  |
| `truncated` | `boolean` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local product_map_state, err = client:ProductMapState():load({ id = "product_map_state_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local product_map_states, err = client:ProductMapState():list({ organization_id = "example", project_id = "example" })
```


### Project

Create an instance: `local project = client:Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `string|nil` |  |
| `context` | `string|nil` |  |
| `created_at` | `string` |  |
| `credentials` | `table` |  |
| `demo` | `boolean` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `table` |  |
| `environments` | `table` |  |
| `execution_mode` | `string` |  |
| `icon_url` | `string|nil` |  |
| `id` | `string` |  |
| `identity_provider` | `table` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `network_connections` | `table` |  |
| `organization_id` | `string` |  |
| `overview` | `table` |  |
| `permissions` | `table` |  |
| `personas` | `table` |  |
| `project` | `table` |  |
| `pull_request_options` | `table` |  |
| `pull_requests` | `table` |  |
| `purpose` | `string|nil` |  |
| `runs` | `table` |  |
| `scenario_history` | `table` |  |
| `scenario_states` | `table` | Scenarios by the state of their latest execution. |
| `scenarios` | `table` |  |
| `setup_required` | `boolean` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences` | `table` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `number` |  |
| `website_url` | `string|nil` |  |

#### Example: Load

```lua
local project, err = client:Project():load({ id = "project_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local projects, err = client:Project():list({ organization_id = "example" })
```

#### Example: Create

```lua
local project, err = client:Project():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
})
```


### ProjectAndroidApk

Create an instance: `local project_android_apk = client:ProjectAndroidApk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `table` |  |
| `artifact_paths` | `table` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `table` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `table` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```lua
local project_android_apk, err = client:ProjectAndroidApk():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
})
```


### ProjectCodeMap

Create an instance: `local project_code_map = client:ProjectCodeMap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_scan` | `boolean` |  |
| `commit_sha` | `string` |  |
| `configured` | `boolean` |  |
| `error_code` | `string|nil` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `ref` | `string` |  |
| `repository_id` | `string` |  |
| `revision` | `table` |  |
| `slug` | `string` |  |
| `status` | `string` |  |

#### Example: List

```lua
local project_code_maps, err = client:ProjectCodeMap():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local project_code_map, err = client:ProjectCodeMap():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  repository_id = "example_repository_id", -- string
})
```


### ProjectEnvironment

Create an instance: `local project_environment = client:ProjectEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_actions` | `string` |  |
| `allowed_origins` | `table` |  |
| `archived_at` | `string|nil` |  |
| `base_url` | `string|nil` |  |
| `base_url_changeable` | `boolean` | Whether an update may send a new base_url. |
| `binary` | `string` |  |
| `conversation_only_messaging` | `boolean` |  |
| `created_at` | `string` |  |
| `desktop` | `table|nil` |  |
| `execution_mode` | `string` |  |
| `id` | `string` |  |
| `imessage_number` | `string|nil` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `lock_version` | `number` |  |
| `messaging_conversation` | `any` |  |
| `messaging_problem` | `string|nil` |  |
| `messaging_source` | `any` |  |
| `messaging_tester_number` | `string|nil` | One configured tester number. |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `pull_request` | `table|nil` |  |
| `source_branch` | `string|nil` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `string|nil` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local project_environment, err = client:ProjectEnvironment():load({ id = "project_environment_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local project_environments, err = client:ProjectEnvironment():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local project_environment, err = client:ProjectEnvironment():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  name = "example_name", -- string
})
```


### ProjectFinding

Create an instance: `local project_finding = client:ProjectFinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `string|nil` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `boolean` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` |  |
| `source` | `string` | The workflow that produced the finding |
| `source_title` | `string` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` |  |
| `title` | `string` |  |
| `verification` | `any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Where the finding is reviewed within its source |

#### Example: List

```lua
local project_findings, err = client:ProjectFinding():list({ organization_id = "example", project_id = "example" })
```


### ProjectFixture

Create an instance: `local project_fixture = client:ProjectFixture(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignments` | `table` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `number` |  |
| `content_type` | `string` |  |
| `credential_ids` | `table` |  |
| `credentials` | `table` |  |
| `environment_ids` | `table` |  |
| `environments` | `table` |  |
| `fixtures` | `table` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `persona_ids` | `table` |  |
| `personas` | `table` |  |
| `project` | `table` |  |
| `sha256` | `string` |  |
| `url` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local project_fixture, err = client:ProjectFixture():load({ id = "project_fixture_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local project_fixtures, err = client:ProjectFixture():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local project_fixture, err = client:ProjectFixture():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
})
```


### ProjectIosApp

Create an instance: `local project_ios_app = client:ProjectIosApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `table` |  |
| `artifact_paths` | `table` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `table` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `table` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```lua
local project_ios_app, err = client:ProjectIosApp():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
})
```


### ProjectMessagingConversation

Create an instance: `local project_messaging_conversation = client:ProjectMessagingConversation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assistant_number` | `string` |  |
| `attachment_limit` | `number` |  |
| `attachment_max_bytes` | `number` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `leased` | `boolean` |  |
| `messages` | `table` |  |
| `reconciled_at` | `string|nil` |  |
| `retirable` | `boolean` |  |
| `seeded` | `boolean` |  |
| `send_blocked_reason` | `string|nil` |  |
| `send_disposition` | `string` |  |
| `send_error` | `string|nil` |  |
| `tester_number` | `string` |  |
| `unknown_send` | `boolean` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```lua
local project_messaging_conversation, err = client:ProjectMessagingConversation():load({ id = "project_messaging_conversation_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: Create

```lua
local project_messaging_conversation, err = client:ProjectMessagingConversation():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  assistant_number = "example_assistant_number", -- string
  tester_number = "example_tester_number", -- string
  verify_environment_id = "example_verify_environment_id", -- string
})
```


### ProjectOverviewMetric

Create an instance: `local project_overview_metric = client:ProjectOverviewMetric(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `table` |  |

#### Example: List

```lua
local project_overview_metrics, err = client:ProjectOverviewMetric():list({ organization_id = "example", project_id = "example" })
```


### ProjectOverviewPullRequest

Create an instance: `local project_overview_pull_request = client:ProjectOverviewPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `boolean` |  |
| `comment_url` | `string|nil` |  |
| `draft` | `boolean` |  |
| `github_repository` | `string|nil` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `string|nil` |  |
| `latest_current` | `boolean` |  |
| `latest_head_sha` | `string|nil` |  |
| `latest_reason` | `string|nil` |  |
| `latest_run_id` | `string|nil` |  |
| `latest_state` | `string|nil` |  |
| `number` | `number` |  |
| `project_id` | `string|nil` |  |
| `project_slug` | `string|nil` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `string|nil` |  |
| `source_repository` | `string|nil` |  |
| `source_url` | `string|nil` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```lua
local project_overview_pull_requests, err = client:ProjectOverviewPullRequest():list({ organization_id = "example", project_id = "example" })
```


### ProjectProductMap

Create an instance: `local project_product_map = client:ProjectProductMap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectRecording

Create an instance: `local project_recording = client:ProjectRecording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `table` |  |
| `created_at` | `string` |  |
| `draft` | `any` | Present once drafted. |
| `environment_id` | `string` | The project environment the browser opens. |
| `error` | `string|nil` |  |
| `event_count` | `number` |  |
| `id` | `string` |  |
| `persona_id` | `string` | The project persona the journey acts as. |
| `phase` | `string` | What the owner can do now. |
| `signed_in_during_recording` | `boolean` |  |
| `start_path` | `string` | A path on the environment to start at, such as /settings. |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local project_recording, err = client:ProjectRecording():load({ id = "project_recording_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: Create

```lua
local project_recording, err = client:ProjectRecording():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  environment_id = "example_environment_id", -- string
  persona_id = "example_persona_id", -- string
})
```


### ProjectRunPlan

Create an instance: `local project_run_plan = client:ProjectRunPlan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `string|nil` |  |
| `base_url` | `string|nil` |  |
| `created_at` | `string` |  |
| `dependencies` | `table` |  |
| `id` | `string` |  |
| `identity_probe` | `table|nil` |  |
| `kind` | `string|nil` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `nodes` | `table` |  |
| `preview` | `any` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local project_run_plan, err = client:ProjectRunPlan():load({ id = "project_run_plan_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local project_run_plans, err = client:ProjectRunPlan():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local project_run_plan, err = client:ProjectRunPlan():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  dependencies = {}, -- table
  identity_probe = {}, -- table|nil
  name = "example_name", -- string
  nodes = {}, -- table
})
```


### ProjectRunSchedule

Create an instance: `local project_run_schedule = client:ProjectRunSchedule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_ids` | `table` |  |
| `cron_expression` | `string|nil` |  |
| `environment_id` | `string` | Project environment slug or public ID. |
| `environment_name` | `string` |  |
| `history` | `table` |  |
| `id` | `string` |  |
| `labels` | `table` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `next_run_at` | `string` |  |
| `notification_channel` | `string` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `number` |  |
| `selection_mode` | `string` |  |
| `slack_subscription_id` | `string|nil` |  |
| `source_scenario_id` | `string|nil` |  |
| `state` | `string` |  |
| `time_of_day` | `string` |  |
| `time_zone` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local project_run_schedule, err = client:ProjectRunSchedule():load({ id = "project_run_schedule_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local project_run_schedules, err = client:ProjectRunSchedule():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local project_run_schedule, err = client:ProjectRunSchedule():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  credential_ids = {}, -- table
  environment_id = "example_environment_id", -- string
  labels = {}, -- table
  name = "example_name", -- string
  selection_mode = "example_selection_mode", -- string
  state = "example_state", -- string
  time_of_day = "example_time_of_day", -- string
  time_zone = "example_time_zone", -- string
})
```


### ProjectScenarioOption

Create an instance: `local project_scenario_option = client:ProjectScenarioOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `table` |  |
| `permissions` | `table` |  |
| `personas` | `table` |  |
| `project` | `table` |  |
| `scenario_states` | `table` | Scenarios by the state of their latest execution. |
| `scenarios` | `table` |  |
| `schedule_options` | `any` |  |
| `schedules` | `table` |  |

#### Example: List

```lua
local project_scenario_options, err = client:ProjectScenarioOption():list({ organization_id = "example", project_id = "example" })
```


### ProjectScenarioRow

Create an instance: `local project_scenario_row = client:ProjectScenarioRow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `number` |  |
| `dependency_count` | `number` |  |
| `health` | `table` |  |
| `id` | `string` |  |
| `labels` | `table` |  |
| `name` | `string` |  |
| `persona_id` | `string` |  |
| `selectable_for_run` | `boolean` |  |
| `step_count` | `number` |  |

#### Example: List

```lua
local project_scenario_rows, err = client:ProjectScenarioRow():list({ organization_id = "example", project_id = "example" })
```


### ProjectSetting

Create an instance: `local project_setting = client:ProjectSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `table` |  |
| `messaging_conversations` | `table` |  |
| `messaging_enabled` | `boolean` |  |
| `permissions` | `table` |  |
| `project` | `table` |  |
| `tester_numbers` | `table` |  |

#### Example: List

```lua
local project_settings, err = client:ProjectSetting():list({ organization_id = "example", project_id = "example" })
```


### PullRequest

Create an instance: `local pull_request = client:PullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `table` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `boolean` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `table` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `imessage_number` | `string` | International destination of this exact deployed commit. |
| `number` | `number` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `preview_cleanup_ready` | `boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string|nil` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `string` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `table` |  |
| `repository_id` | `string` |  |
| `runs` | `table` |  |

#### Example: Load

```lua
local pull_request, err = client:PullRequest():load({ id = "pull_request_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local pull_request, err = client:PullRequest():create({
  organization_id = "example_organization_id", -- string
  idempotency_key = "example_idempotency_key", -- string
})
```


### PullRequestSetting

Create an instance: `local pull_request_setting = client:PullRequestSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `bots` | `table` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `boolean` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `table|nil` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `number` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` |  |
| `demo_videos` | `boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `string|nil` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` |  |
| `enabled` | `boolean` | Test PRs automatically. |
| `environment` | `string` | The environment whose test accounts sign in to the previews. |
| `environments` | `table` |  |
| `github_check_enabled` | `boolean` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `table` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` |  |
| `imessage_comment_prefix` | `string|nil` |  |
| `imessage_number` | `string|nil` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` |  |
| `limits` | `table` |  |
| `link_pattern` | `string|nil` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `string|nil` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `number` |  |
| `messaging_enabled` | `boolean` |  |
| `messaging_tester_number` | `string|nil` | One configured tester number. |
| `non_product_paths` | `table` |  |
| `permissions` | `table` |  |
| `pr_check` | `boolean` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` |  |
| `preview_comment_authors` | `table` |  |
| `preview_comment_pattern` | `string` |  |
| `preview_comment_wildcard` | `string|nil` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `string|nil` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `table` |  |
| `previews` | `string` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `table` |  |
| `provider` | `string` |  |
| `repositories` | `table` |  |
| `repository` | `string` | Repository ID; see repositories for its name. |
| `repository_id` | `string` |  |
| `repository_kind` | `string` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` |  |
| `service` | `string|nil` | composal: the public service the browsers open. |
| `settings` | `table` |  |
| `setup` | `any` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `table` | The answers a new setup starts from |
| `source_repository` | `string` |  |
| `target_mode` | `string` |  |
| `tester_numbers` | `table` |  |
| `trigger_label` | `string` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `boolean` |  |
| `trigger_on_label` | `boolean` |  |
| `trigger_on_push` | `boolean` |  |
| `trigger_on_ready` | `boolean` |  |
| `triggers` | `table` | When runs start. |
| `verify_environment_id` | `string` |  |
| `write_scenarios` | `boolean` | Draft and validate focused scenarios for each change on its preview. |

#### Example: List

```lua
local pull_request_settings, err = client:PullRequestSetting():list({ organization_id = "example" })
```

#### Example: Create

```lua
local pull_request_setting, err = client:PullRequestSetting():create({
  organization_id = "example_organization_id", -- string
  bots = {}, -- table
  demo_videos = true, -- boolean
  deployment = "example_deployment", -- string|nil
  enabled = true, -- boolean
  environment = "example_environment", -- string
  imessage_comment_prefix = "example_imessage_comment_prefix", -- string|nil
  imessage_number = "example_imessage_number", -- string|nil
  imessage_number_source = "example_imessage_number_source", -- string
  limits = {}, -- table
  link_pattern = "example_link_pattern", -- string|nil
  links = "example_links", -- string|nil
  messaging_tester_number = "example_messaging_tester_number", -- string|nil
  pr_check = true, -- boolean
  preview_comment_wildcard = "example_preview_comment_wildcard", -- string|nil
  preview_profile = "example_preview_profile", -- string|nil
  previews = "example_previews", -- string
  project_id = "example_project_id", -- string
  provider = "example_provider", -- string
  repository = "example_repository", -- string
  repository_id = "example_repository_id", -- string
  repository_kind = "example_repository_kind", -- string
  service = "example_service", -- string|nil
  target_mode = "example_target_mode", -- string
  trigger_label = "example_trigger_label", -- string
  triggers = {}, -- table
  verify_environment_id = "example_verify_environment_id", -- string
  write_scenarios = true, -- boolean
})
```


### PullRequestSettingAddRepository

Create an instance: `local pull_request_setting_add_repository = client:PullRequestSettingAddRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `string` |  |
| `replace` | `boolean` | Make these the project's only repositories. |
| `repositories` | `table` |  |

#### Example: Create

```lua
local pull_request_setting_add_repository, err = client:PullRequestSettingAddRepository():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  repositories = {}, -- table
})
```


### PullRequestSettingDetectComment

Create an instance: `local pull_request_setting_detect_comment = client:PullRequestSettingDetectComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `table` | The bots answer |
| `deployment` | `string` | The deployment answer |
| `example_url` | `string` |  |
| `imessage_comment_prefix` | `string` |  |
| `imessage_number` | `string|nil` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `link_pattern` | `string` | The link_pattern answer |
| `project_id` | `string` | Project slug or ID. |
| `provider` | `string` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | Repository slug, ID or owner/name. |
| `request_number` | `number` |  |

#### Example: Create

```lua
local pull_request_setting_detect_comment, err = client:PullRequestSettingDetectComment():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
})
```


### Recorder

Create an instance: `local recorder = client:Recorder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |

#### Example: Load

```lua
local recorder, err = client:Recorder():load({ organization_id = "organization_id" })
```


### Registry

Create an instance: `local registry = client:Registry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### RegistryV2

Create an instance: `local registry_v2 = client:RegistryV2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RelayAgentLocalThread

Create an instance: `local relay_agent_local_thread = client:RelayAgentLocalThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### ReportReplay

Create an instance: `local report_replay = client:ReportReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `generated_at` | `string` |  |
| `id` | `string` |  |
| `recording` | `table` |  |
| `replay_steps` | `table` |  |

#### Example: Load

```lua
local report_replay, err = client:ReportReplay():load({ id = "report_replay_id", exploration_id = "exploration_id", organization_id = "organization_id" })
```


### ReportScenario

Create an instance: `local report_scenario = client:ReportScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_name` | `string` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `table` |  |
| `project_id` | `string|nil` |  |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `saves_scenarios` | `boolean` |  |
| `scenario_generation` | `table` |  |
| `status` | `string` |  |

#### Example: Create

```lua
local report_scenario, err = client:ReportScenario():create({
  exploration_id = "example_exploration_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### RunScenarioRun

Create an instance: `local run_scenario_run = client:RunScenarioRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RunScheduleOption

Create an instance: `local run_schedule_option = client:RunScheduleOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```lua
local run_schedule_options, err = client:RunScheduleOption():list({ organization_id = "example", project_id = "example" })
```


### RunSearch

Create an instance: `local run_search = client:RunSearch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `table` |  |

#### Example: Load

```lua
local run_search, err = client:RunSearch():load({ organization_id = "organization_id" })
```


### RunUpdate

Create an instance: `local run_update = client:RunUpdate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `boolean` |  |
| `comment_url` | `string|nil` |  |
| `draft` | `boolean` |  |
| `github_repository` | `string|nil` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string|nil` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `string|nil` |  |
| `latest_current` | `boolean` |  |
| `latest_head_sha` | `string|nil` |  |
| `latest_reason` | `string|nil` |  |
| `latest_run_id` | `string|nil` |  |
| `latest_state` | `string|nil` |  |
| `number` | `number` |  |
| `project_id` | `string|nil` |  |
| `project_slug` | `string|nil` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `string|nil` |  |
| `source_repository` | `string|nil` |  |
| `source_url` | `string|nil` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```lua
local run_updates, err = client:RunUpdate():list({ organization_id = "example" })
```


### ScenarioRevision

Create an instance: `local scenario_revision = client:ScenarioRevision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `batch` | `string` | Shared by every revision one request or job saved. |
| `created_at` | `string` |  |
| `definition` | `table` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` |  |
| `source` | `string` | The client the save came through. |
| `user` | `any` | Null when a system job saved the Scenario. |
| `version` | `number` | The Scenario's lock_version after this save. |

#### Example: List

```lua
local scenario_revisions, err = client:ScenarioRevision():list({ organization_id = "example", project_id = "example", scenario_id = "example" })
```


### ScenarioRunLesson

Create an instance: `local scenario_run_lesson = client:ScenarioRunLesson(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding` | `string` |  |
| `title` | `string` | Defaults to the Scenario's name. |
| `workaround` | `string` |  |

#### Example: Create

```lua
local scenario_run_lesson, err = client:ScenarioRunLesson():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  run_id = "example_run_id", -- string
  scenario_run_id = "example_scenario_run_id", -- string
  finding = "example_finding", -- string
  workaround = "example_workaround", -- string
})
```


### ScenarioRunScenarioEdit

Create an instance: `local scenario_run_scenario_edit = client:ScenarioRunScenarioEdit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ServiceEndpoint

Create an instance: `local service_endpoint = client:ServiceEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local service_endpoint, err = client:ServiceEndpoint():load({ id = "service_endpoint_id", app_id = "app_id", service_id = "service_id" })
```

#### Example: List

```lua
local service_endpoints, err = client:ServiceEndpoint():list({ app_id = "example", service_id = "example" })
```

#### Example: Create

```lua
local service_endpoint, err = client:ServiceEndpoint():create({
  app_id = "example_app_id", -- string
  service_id = "example_service_id", -- string
})
```


### SitePreview

Create an instance: `local site_preview = client:SitePreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `string|nil` | The site's icon as a data: URL, up to 256 KB |
| `title` | `string|nil` |  |
| `url` | `string` | The address as it will be saved |

#### Example: Load

```lua
local site_preview, err = client:SitePreview():load({ organization_id = "organization_id", url = "url" })
```


### SlackChannel

Create an instance: `local slack_channel = client:SlackChannel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `is_member` | `boolean` |  |
| `is_private` | `boolean` |  |
| `is_slack_connect` | `boolean` |  |
| `name` | `string` |  |
| `published` | `boolean` |  |

#### Example: List

```lua
local slack_channels, err = client:SlackChannel():list({ agent_id = "example", organization_id = "example" })
```


### SparkAgentLocalThread

Create an instance: `local spark_agent_local_thread = client:SparkAgentLocalThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `archived` | `boolean` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `boolean` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `boolean` |  |
| `can_end` | `boolean` |  |
| `can_interrupt` | `boolean` |  |
| `can_send` | `boolean` |  |
| `created_at` | `string` |  |
| `delivery` | `table` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` |  |
| `expires_at` | `string` |  |
| `full_title` | `string` | The native name or first prompt in full, for a tooltip. |
| `id` | `string` |  |
| `key` | `string` |  |
| `last_activity_at` | `string|nil` |  |
| `native_thread_id` | `string` |  |
| `parent_conversation_id` | `string|nil` |  |
| `provider` | `string` |  |
| `references` | `table` |  |
| `relay_disconnected_at` | `string|nil` |  |
| `relay_participant` | `table` |  |
| `result` | `any` |  |
| `result_expired` | `boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `table|boolean` |  |
| `section` | `string` | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` |  |
| `status` | `string|nil` | What the native thread is doing. |
| `task_configured` | `boolean` |  |
| `thread_id` | `string` |  |
| `title` | `string` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```lua
local spark_agent_local_thread, err = client:SparkAgentLocalThread():load({ id = "spark_agent_local_thread_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local spark_agent_local_thread, err = client:SparkAgentLocalThread():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  device_id = "example_device_id", -- string
  key = "example_key", -- string
  provider = "example_provider", -- string
  thread_id = "example_thread_id", -- string
})
```


### StaticSite

Create an instance: `local static_site = client:StaticSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployment_id` | `string|nil` |  |
| `cdn_hostname` | `string` |  |
| `cdn_url` | `string` |  |
| `cname_target` | `string` |  |
| `created_at` | `string` |  |
| `default_url` | `string` |  |
| `description` | `string|nil` |  |
| `error_document` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `index_document` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provisioned` | `boolean` |  |
| `provisioned_at` | `string|nil` |  |
| `region` | `string|nil` |  |
| `replication_regions` | `table` |  |
| `repository_id` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local static_site, err = client:StaticSite():load({ id = "static_site_id" })
```

#### Example: List

```lua
local static_sites, err = client:StaticSite():list({ organization_id = "example" })
```

#### Example: Create

```lua
local static_site, err = client:StaticSite():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### StaticSiteDeployment

Create an instance: `local static_site_deployment = client:StaticSiteDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `string|nil` |  |
| `activated_at_label` | `string|nil` |  |
| `commit_sha` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `creator_user_id` | `string|nil` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `string|nil` |  |
| `file_count` | `number` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `string|nil` |  |
| `finished_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `is_active` | `boolean` |  |
| `source_ref` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `started_at_label` | `string|nil` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `number` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `uploaded_at` | `string|nil` |  |
| `uploaded_at_label` | `string|nil` |  |

#### Example: Load

```lua
local static_site_deployment, err = client:StaticSiteDeployment():load({ id = "static_site_deployment_id", static_site_id = "static_site_id" })
```

#### Example: List

```lua
local static_site_deployments, err = client:StaticSiteDeployment():list({ static_site_id = "example" })
```

#### Example: Create

```lua
local static_site_deployment, err = client:StaticSiteDeployment():create({
  static_site_id = "example_static_site_id", -- string
})
```


### StaticSiteDomain

Create an instance: `local static_site_domain = client:StaticSiteDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string|nil` |  |
| `record_name` | `string|nil` |  |
| `record_type` | `string|nil` |  |
| `record_value` | `string|nil` |  |
| `redirect_to` | `string|nil` |  |
| `static_site_id` | `string|nil` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Load

```lua
local static_site_domain, err = client:StaticSiteDomain():load({ id = "static_site_domain_id", static_site_id = "static_site_id" })
```

#### Example: List

```lua
local static_site_domains, err = client:StaticSiteDomain():list({ static_site_id = "example" })
```

#### Example: Create

```lua
local static_site_domain, err = client:StaticSiteDomain():create({
  static_site_id = "example_static_site_id", -- string
  hostname = "example_hostname", -- string
})
```


### SubscriptionModel

Create an instance: `local subscription_model = client:SubscriptionModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_reasoning` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `reasoning` | `table` | Effort levels this plan model accepts. |
| `speeds` | `table` | Speed modes advertised by this connected account and model. |

#### Example: List

```lua
local subscription_models, err = client:SubscriptionModel():list({ agent_id = "example", organization_id = "example", profile_id = "example" })
```


### ThreadPreview

Create an instance: `local thread_preview = client:ThreadPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string|nil` |  |
| `port` | `number` |  |
| `url` | `string` |  |

#### Example: Create

```lua
local thread_preview, err = client:ThreadPreview():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  thread_id = "example_thread_id", -- string
  port = 1, -- number
})
```


### VerificationProjectCredential

Create an instance: `local verification_project_credential = client:VerificationProjectCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `table|nil` |  |
| `browser_session` | `string` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `string|nil` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `boolean` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `boolean` | Select the Composal-managed Google test account when available. |
| `configured` | `boolean` |  |
| `cookies` | `string` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `table` |  |
| `description` | `string|nil` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `table` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `table|nil` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string|nil` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` |  |
| `login_url` | `string` | Optional sign-in path or URL. |
| `managed` | `boolean` |  |
| `mfa_enabled` | `boolean` |  |
| `name` | `string` |  |
| `oidc` | `table` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `remove_browser_authentication` | `boolean` |  |
| `remove_totp` | `boolean` |  |
| `sign_in_verified` | `boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string|nil` |  |
| `status` | `string` |  |
| `totp_secret` | `string` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: Load

```lua
local verification_project_credential, err = client:VerificationProjectCredential():load({ id = "verification_project_credential_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local verification_project_credentials, err = client:VerificationProjectCredential():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local verification_project_credential, err = client:VerificationProjectCredential():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  login_method = "example_login_method", -- string
  name = "example_name", -- string
})
```


### VerificationProjectPersona

Create an instance: `local verification_project_persona = client:VerificationProjectPersona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `string` |  |
| `archived_at` | `string|nil` |  |
| `capabilities` | `string|nil` |  |
| `created_at` | `string` |  |
| `credential_id` | `string|nil` | The credential this persona signs in with. |
| `goals` | `string|nil` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local verification_project_persona, err = client:VerificationProjectPersona():load({ id = "verification_project_persona_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local verification_project_personas, err = client:VerificationProjectPersona():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local verification_project_persona, err = client:VerificationProjectPersona():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  name = "example_name", -- string
  role = "example_role", -- string
})
```


### VerificationProjectRun

Create an instance: `local verification_project_run = client:VerificationProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `string|nil` |  |
| `approved_digest` | `string|nil` |  |
| `archived_at` | `string|nil` |  |
| `available_tests` | `table` |  |
| `can_archive` | `boolean` |  |
| `can_restore` | `boolean` |  |
| `can_start_another_run` | `boolean` |  |
| `cleanup_state` | `string` |  |
| `concurrency` | `number` |  |
| `created_at` | `string` |  |
| `creator_name` | `string|nil` |  |
| `definition_mode` | `string` |  |
| `environment_id` | `string|nil` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `max_seconds` | `number` |  |
| `outcome` | `string|nil` |  |
| `permissions` | `table` |  |
| `plan_digest` | `string|nil` |  |
| `preparation_error_code` | `string|nil` |  |
| `progress` | `table` |  |
| `project` | `table` |  |
| `project_id` | `string` |  |
| `pull_request` | `any` |  |
| `queued_at` | `string|nil` |  |
| `run` | `table` |  |
| `run_plan_id` | `string|nil` |  |
| `scenario_runs` | `table` |  |
| `source_run_id` | `string|nil` |  |
| `source_versions` | `table|nil` |  |
| `start_when_prepared` | `boolean` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` |  |
| `target_snapshot` | `table` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences_snapshot` | `table` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```lua
local verification_project_run, err = client:VerificationProjectRun():load({ id = "verification_project_run_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local verification_project_runs, err = client:VerificationProjectRun():list({ organization_id = "example", project_id = "example" })
```


### VerificationProjectScenario

Create an instance: `local verification_project_scenario = client:VerificationProjectScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actors` | `table` |  |
| `allowed_actions` | `string` |  |
| `archived_at` | `string|nil` |  |
| `cleanup` | `table` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` |  |
| `dependencies` | `table` |  |
| `fixtures` | `table` | Files upload steps choose, ordered by name. |
| `health` | `table` |  |
| `id` | `string` |  |
| `identity_probe` | `any` |  |
| `if` | `string|nil` | A documented subset of Actions expressions. |
| `labels` | `table` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `on` | `any` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `table` |  |
| `persona_id` | `string` |  |
| `primary_actor` | `string|nil` |  |
| `project_id` | `string` |  |
| `selectable_for_run` | `boolean` |  |
| `starting_conditions` | `string|nil` |  |
| `steps` | `table` |  |
| `triggers` | `table` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local verification_project_scenario, err = client:VerificationProjectScenario():load({ id = "verification_project_scenario_id", organization_id = "organization_id", project_id = "project_id" })
```

#### Example: List

```lua
local verification_project_scenarios, err = client:VerificationProjectScenario():list({ organization_id = "example", project_id = "example" })
```

#### Example: Create

```lua
local verification_project_scenario, err = client:VerificationProjectScenario():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  name = "example_name", -- string
})
```


### VerifyAppDomain

Create an instance: `local verify_app_domain = client:VerifyAppDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```lua
local verify_app_domain, err = client:VerifyAppDomain():create({
  app_id = "example_app_id", -- string
  id = "example_id", -- string
})
```


### VerifyBrowserSession

Create an instance: `local verify_browser_session = client:VerifyBrowserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` | Required when opening a browser for a new credential. |
| `origin` | `string` |  |
| `project_id` | `string` | The project (slug or ID) whose credential receives the session. |
| `status` | `string` |  |
| `url` | `string` |  |
| `viewer_url` | `string|nil` | Owner-only bearer link. |

#### Example: Load

```lua
local verify_browser_session, err = client:VerifyBrowserSession():load({ id = "verify_browser_session_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local verify_browser_session, err = client:VerifyBrowserSession():create({
  organization_id = "example_organization_id", -- string
  project_id = "example_project_id", -- string
  url = "example_url", -- string
})
```


### VerifyStaticSiteDomain

Create an instance: `local verify_static_site_domain = client:VerifyStaticSiteDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string|nil` |  |
| `record_name` | `string|nil` |  |
| `record_type` | `string|nil` |  |
| `record_value` | `string|nil` |  |
| `redirect_to` | `string|nil` |  |
| `static_site_id` | `string|nil` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Create

```lua
local verify_static_site_domain, err = client:VerifyStaticSiteDomain():create({
  id = "example_id", -- string
  static_site_id = "example_static_site_id", -- string
})
```


### VersionLog

Create an instance: `local version_log = client:VersionLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `string` |  |
| `failure_phase` | `string|nil` |  |
| `id` | `string` |  |
| `image_digest` | `string|nil` |  |
| `image_reference` | `string|nil` |  |
| `installer_version` | `string` |  |
| `ready_at` | `string|nil` |  |
| `receipt` | `table|nil` |  |
| `safe_error` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `status` | `string` |  |

#### Example: List

```lua
local version_logs, err = client:VersionLog():list({ binary_id = "example", organization_id = "example", version_id = "example", project_id = "example" })
```


### WebBotAuth

Create an instance: `local web_bot_auth = client:WebBotAuth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string` |  |
| `origin` | `string` |  |
| `signatures` | `table` |  |

#### Example: Create

```lua
local web_bot_auth, err = client:WebBotAuth():create({
  origin = "example_origin", -- string
})
```


### WorkflowRunStep

Create an instance: `local workflow_run_step = client:WorkflowRunStep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStopNotice

Create an instance: `local workflow_run_stop_notice = client:WorkflowRunStopNotice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### WorkflowTriggerSkipped

Create an instance: `local workflow_trigger_skipped = client:WorkflowTriggerSkipped(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

12 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `agent_automation` | `definition` | 12 | 10 levels |
| `agent_automation` | `version` | 12 | 12 levels |
| `agent_interaction` | `interactions` | 12 | 17 levels |
| `automation_event` | `version` | 12 | 12 levels |
| `local_thread_operation` | `result` | 10 | 2 levels |
| `spark_agent_local_thread` | `result` | 10 | 2 levels |
| `page_agent` | `inbox` | 6 | 14 levels |
| `agent` | `configuration` | 5 | 9 levels |
| `agent_manager` | `configuration` | 5 | 9 levels |
| `interaction_response` | `answer` | 5 | 3 levels |
| `page_agent` | `new_configuration` | 5 | 9 levels |
| `page_agent` | `selected_agent` | 5 | 15 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── composal_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`composal_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local pageprojectrun = client:PageProjectRun()
pageprojectrun:load({ id = "example_id", organization_id = "example", project_id = "example" })

-- pageprojectrun:data_get() now returns the pageprojectrun data from the last load
-- pageprojectrun:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
