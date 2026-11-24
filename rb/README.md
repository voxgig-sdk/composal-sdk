# Composal Ruby SDK



The Ruby SDK for the Composal API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Agent` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/composal-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-composal-sdk", path: "./composal-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Composal_sdk"

client = ComposalSDK.new({
  "apikey" => ENV["COMPOSAL_APIKEY"],
})
```

### 2. List agent records

```ruby
begin
  # list returns an Array of Agent entities, one per record; data_get reads the record.
  agents = client.Agent.list({ "organization_id" => "example" })
  agents.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["attention"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Agent record (raises on error).
  agent = client.Agent.load({ "organization_id" => "example_organization_id", "id" => "example_id" })
  puts agent.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Agent record.
created = client.Agent.create({ "organization_id" => "example_organization_id", "name" => "example_name" })

# Remove
client.Agent.remove({ "id" => created.data_get["id"], "organization_id" => "example_organization_id" })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  pageprojectrun = client.PageProjectRun.load({ "id" => "example_id", "organization_id" => "example", "project_id" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = ComposalSDK.test({
  "entity" => { "page_project_run" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
pageprojectrun = client.PageProjectRun.load({ "id" => "test01", "organization_id" => "example", "project_id" => "example" })
puts pageprojectrun.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ComposalSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ComposalSDK

```ruby
require_relative "Composal_sdk"
client = ComposalSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ComposalSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ComposalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `patch` | `(reqdata, ctrl) -> any` | Change part of an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`ComposalError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `agent = client.Agent`

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
| `attention` | `Object` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `Object` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `Boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `Boolean` |  |
| `can_manage` | `Boolean` |  |
| `can_manage_sharing` | `Boolean` |  |
| `can_name_managers` | `Boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `Boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `Boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Object` |  |
| `configuration_revision` | `Integer` |  |
| `configuration_version` | `Object` | Opaque version token. |
| `control_connections_available` | `Boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `String` |  |
| `coordination_available` | `Boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `String` |  |
| `direct_chat_available` | `Boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `Boolean` |  |
| `id` | `String` |  |
| `last_reply_at` | `Object` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `Array` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `Object` | Opaque version token. |
| `local_agent_control_available` | `Boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `Array` | Teammates named as managers beside the owner. |
| `model_change_action` | `Object` | Advisory composer action. |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `persona` | `Object` |  |
| `preview` | `Object` |  |
| `preview_received_at` | `Object` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Object` |  |
| `reply_triage` | `Object` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `String` | Immutable execution runtime selected at creation. |
| `setup_pending` | `Boolean` |  |
| `sharing_fixed` | `Boolean` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `Integer` |  |
| `slug` | `String` | Optional explicit API alias. |
| `status` | `String` |  |
| `team_role` | `String` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `String` |  |
| `url_slug` | `String` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `String` | Defaults to organization. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Agent record (raises on error).
agent = client.Agent.load({ "id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Agent entities, one per record (raises on error).
agents = client.Agent.list({ "organization_id" => "example" })
agents.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent = client.Agent.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```


### AgentAttachment

Create an instance: `agent_attachment = client.AgentAttachment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `Integer` |  |
| `content_type` | `String` |  |
| `file_name` | `String` |  |
| `id` | `String` |  |

#### Example: Create

```ruby
agent_attachment = client.AgentAttachment.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "byte_size" => 1, # Integer
  "content_type" => "example_content_type", # String
  "file_name" => "example_file_name", # String
})
```


### AgentAutomation

Create an instance: `agent_automation = client.AgentAutomation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `can_manage_events` | `Boolean` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `Boolean` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `Boolean` |  |
| `definition` | `Hash` |  |
| `event_subscriptions` | `Array` |  |
| `event_triggers` | `Array` |  |
| `expected_revision` | `Integer` |  |
| `id` | `String` |  |
| `key` | `String` |  |
| `name` | `String` |  |
| `revision` | `Integer` |  |
| `schedule` | `Object` |  |
| `schedules` | `Array` |  |
| `version` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentAutomation record (raises on error).
agent_automation = client.AgentAutomation.load({ "id" => "agent_automation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentAutomation entities, one per record (raises on error).
agent_automations = client.AgentAutomation.list({ "agent_id" => "example", "organization_id" => "example" })
agent_automations.each { |item| puts item.data_get }
```


### AgentAvatar

Create an instance: `agent_avatar = client.AgentAvatar`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentCommand

Create an instance: `agent_command = client.AgentCommand`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `display_name` | `String` |  |
| `name` | `String` |  |
| `skill_model_visible` | `Boolean` |  |
| `source` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentCommand entities, one per record (raises on error).
agent_commands = client.AgentCommand.list({ "agent_id" => "example", "organization_id" => "example" })
agent_commands.each { |item| puts item.data_get }
```


### AgentComputer

Create an instance: `agent_computer = client.AgentComputer`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentConnection

Create an instance: `agent_connection = client.AgentConnection`

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
| `agent_card_url` | `String` |  |
| `auth_scheme` | `String` |  |
| `can_configure` | `Boolean` |  |
| `can_disconnect` | `Boolean` |  |
| `can_setup` | `Boolean` |  |
| `connection` | `Hash` |  |
| `credential` | `Object` | Write-only outbound key. |
| `error_code` | `Object` |  |
| `expected_generation` | `Integer` |  |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `remote_agent` | `Object` |  |
| `requester_id` | `String` |  |
| `retired_at` | `Object` |  |
| `revoked_at` | `Object` |  |
| `scope_key` | `String` |  |
| `source_operation_id` | `Object` |  |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentConnection record (raises on error).
agent_connection = client.AgentConnection.load({ "id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentConnection entities, one per record (raises on error).
agent_connections = client.AgentConnection.list({ "agent_id" => "example", "organization_id" => "example" })
agent_connections.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_connection = client.AgentConnection.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "agent_card_url" => "example_agent_card_url", # String
  "auth_scheme" => "example_auth_scheme", # String
  "name" => "example_name", # String
})
```


### AgentControlFlow

Create an instance: `agent_control_flow = client.AgentControlFlow`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel` | `Boolean` |  |
| `cancellation_requested` | `Boolean` |  |
| `device_name` | `String` |  |
| `flow_id` | `String` |  |
| `id` | `String` |  |
| `providers` | `Array` |  |
| `repair_of_flow_id` | `String` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `String` |  |
| `step_count` | `Integer` |  |
| `title` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentControlFlow record (raises on error).
agent_control_flow = client.AgentControlFlow.load({ "id" => "agent_control_flow_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentControlFlow entities, one per record (raises on error).
agent_control_flows = client.AgentControlFlow.list({ "agent_id" => "example", "organization_id" => "example" })
agent_control_flows.each { |item| puts item.data_get }
```


### AgentCoordination

Create an instance: `agent_coordination = client.AgentCoordination`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentEmail

Create an instance: `agent_email = client.AgentEmail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `Object` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `String` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `String` |  |
| `id` | `String` |  |
| `preview` | `String` |  |
| `received_at` | `String` |  |
| `recipient_tag` | `Object` | The +tag the sender used, if any |
| `spam` | `Boolean` | SES judged it spam |
| `subject` | `Object` |  |
| `text` | `String` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentEmail record (raises on error).
agent_email = client.AgentEmail.load({ "id" => "agent_email_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```


### AgentFile

Create an instance: `agent_file = client.AgentFile`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_type` | `String` |  |
| `download_url` | `String` |  |
| `filename` | `String` |  |
| `id` | `String` |  |
| `size_bytes` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentFile record (raises on error).
agent_file = client.AgentFile.load({ "id" => "agent_file_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```


### AgentInput

Create an instance: `agent_input = client.AgentInput`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `Array` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `Array` |  |
| `browser_context` | `Hash` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `Hash` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `String` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `Object` |  |
| `requester_membership_id` | `String` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `String` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `String` |  |

#### Example: Create

```ruby
agent_input = client.AgentInput.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "browser_context" => {}, # Hash
  "client_time" => {}, # Hash
  "conversation_id" => "example_conversation_id", # String
  "text" => "example_text", # String
})
```


### AgentIntegration

Create an instance: `agent_integration = client.AgentIntegration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `Hash` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `String` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `Array` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `Boolean` |  |
| `can_manage_organization` | `Boolean` |  |
| `catalog` | `Array` |  |
| `connect_as` | `Object` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `Hash` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `Hash` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `String` |  |
| `connections` | `Array` |  |
| `email` | `Hash` | A native agent's own email address. |
| `enabled` | `Boolean` |  |
| `enabled_toolkits` | `Array` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `Integer` |  |
| `pagination` | `Hash` |  |
| `pending_counts` | `Hash` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `Boolean` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `Boolean` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `Boolean` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `Hash` |  |
| `webhook_connections` | `Array` |  |
| `webhooks_available` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of AgentIntegration entities, one per record (raises on error).
agent_integrations = client.AgentIntegration.list({ "agent_id" => "example", "organization_id" => "example" })
agent_integrations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_integration = client.AgentIntegration.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "connection_id" => "example_connection_id", # String
  "enabled" => true, # Boolean
  "generation" => 1, # Integer
})
```


### AgentInteraction

Create an instance: `agent_interaction = client.AgentInteraction`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `interactions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentInteraction record (raises on error).
agent_interaction = client.AgentInteraction.load({ "id" => "agent_interaction_id", "agent_id" => "agent_id", "organization_id" => "organization_id", "conversation_id" => "conversation_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentInteraction entities, one per record (raises on error).
agent_interactions = client.AgentInteraction.list({ "agent_id" => "example", "organization_id" => "example", "conversation_id" => "example" })
agent_interactions.each { |item| puts item.data_get }
```


### AgentLibrary

Create an instance: `agent_library = client.AgentLibrary`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentManager

Create an instance: `agent_manager = client.AgentManager`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `Object` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `Object` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `Boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `Boolean` |  |
| `can_manage` | `Boolean` |  |
| `can_manage_sharing` | `Boolean` |  |
| `can_name_managers` | `Boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `Boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `Boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Object` |  |
| `configuration_revision` | `Integer` |  |
| `configuration_version` | `Object` | Opaque version token. |
| `control_connections_available` | `Boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `String` |  |
| `coordination_available` | `Boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `String` |  |
| `direct_chat_available` | `Boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `Boolean` |  |
| `id` | `String` |  |
| `last_reply_at` | `Object` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `Array` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `Object` | Opaque version token. |
| `local_agent_control_available` | `Boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `Array` | Teammates named as managers beside the owner. |
| `model_change_action` | `Object` | Advisory composer action. |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `persona` | `Object` |  |
| `preview` | `Object` |  |
| `preview_received_at` | `Object` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Object` |  |
| `reply_triage` | `Object` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `String` | Immutable execution runtime selected at creation. |
| `setup_pending` | `Boolean` |  |
| `sharing_fixed` | `Boolean` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `Integer` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `team_role` | `String` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `String` |  |
| `url_slug` | `String` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `String` |  |
| `visibility` | `String` |  |

#### Example: Create

```ruby
agent_manager = client.AgentManager.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "user_id" => "example_user_id", # String
})
```


### AgentManagerChoice

Create an instance: `agent_manager_choice = client.AgentManagerChoice`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentManagerChoice entities, one per record (raises on error).
agent_manager_choices = client.AgentManagerChoice.list({ "agent_id" => "example", "organization_id" => "example" })
agent_manager_choices.each { |item| puts item.data_get }
```


### AgentMarketplace

Create an instance: `agent_marketplace = client.AgentMarketplace`

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
| `bundle` | `Hash` |  |
| `can_manage` | `Boolean` |  |
| `catalog_key` | `Object` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `Array` |  |
| `category` | `String` |  |
| `counts` | `Hash` |  |
| `created_at` | `String` |  |
| `expected_version` | `Integer` |  |
| `explainer` | `Object` | The listing's public write-up in Markdown. |
| `featured` | `Boolean` |  |
| `from_composal` | `Boolean` | One of Composal's ready-made listings. |
| `id` | `String` |  |
| `installs_count` | `Integer` |  |
| `instructions` | `String` |  |
| `integration_toolkits` | `Array` |  |
| `integrations` | `Array` |  |
| `listing` | `Object` |  |
| `listings` | `Array` |  |
| `memories` | `Array` |  |
| `name` | `String` |  |
| `next_page` | `Object` |  |
| `organization_name` | `String` |  |
| `page_apps` | `Array` |  |
| `publisher_avatar_url` | `Object` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `String` | "Composal" on listings Composal publishes. |
| `sections` | `Array` |  |
| `share_token` | `Object` | Present only for people who manage the listing. |
| `skills` | `Array` |  |
| `slug` | `String` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `String` | The V2 agent this listing was published from. |
| `summary` | `String` |  |
| `updated_at` | `String` |  |
| `version` | `Integer` |  |
| `viewer` | `Hash` | Who a public marketplace response was read for. |
| `visibility` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentMarketplace record (raises on error).
agent_marketplace = client.AgentMarketplace.load({ "id" => "agent_marketplace_id" })
```

#### Example: Create

```ruby
agent_marketplace = client.AgentMarketplace.create({
  "organization_id" => "example_organization_id", # String
  "bundle" => {}, # Hash
  "category" => "example_category", # String
  "name" => "example_name", # String
  "summary" => "example_summary", # String
})
```


### AgentMarketplaceShared

Create an instance: `agent_marketplace_shared = client.AgentMarketplaceShared`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `catalog_key` | `Object` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `String` |  |
| `counts` | `Hash` |  |
| `created_at` | `String` |  |
| `explainer` | `Object` | The listing's public write-up in Markdown. |
| `featured` | `Boolean` |  |
| `from_composal` | `Boolean` | One of Composal's ready-made listings. |
| `id` | `String` |  |
| `installs_count` | `Integer` |  |
| `instructions` | `String` |  |
| `integration_toolkits` | `Array` |  |
| `integrations` | `Array` |  |
| `listing` | `Object` |  |
| `memories` | `Array` |  |
| `name` | `String` |  |
| `organization_name` | `String` |  |
| `page_apps` | `Array` |  |
| `publisher_avatar_url` | `Object` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `String` | "Composal" on listings Composal publishes. |
| `share_token` | `Object` | Present only for people who manage the listing. |
| `skills` | `Array` |  |
| `slug` | `String` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `String` |  |
| `updated_at` | `String` |  |
| `version` | `Integer` |  |
| `viewer` | `Hash` | Who a public marketplace response was read for. |
| `visibility` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentMarketplaceShared record (raises on error).
agent_marketplace_shared = client.AgentMarketplaceShared.load({ "id" => "agent_marketplace_shared_id" })
```


### AgentMissionControl

Create an instance: `agent_mission_control = client.AgentMissionControl`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentOperation

Create an instance: `agent_operation = client.AgentOperation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Hash` | JSON object limited to 65536 encoded bytes. |
| `id` | `String` |  |
| `key` | `String` |  |
| `name` | `String` |  |
| `operation` | `Hash` |  |
| `participant` | `String` |  |
| `requester_id` | `String` | Signed-in user public ID returned by discovery. |
| `scope_key` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentOperation record (raises on error).
agent_operation = client.AgentOperation.load({ "id" => "agent_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
agent_operation = client.AgentOperation.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
  "name" => "example_name", # String
  "requester_id" => "example_requester_id", # String
})
```


### AgentProvisioning

Create an instance: `agent_provisioning = client.AgentProvisioning`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentPullRequest

Create an instance: `agent_pull_request = client.AgentPullRequest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `number` | `Integer` |  |
| `owners` | `Array` |  |
| `repository` | `String` |  |
| `status` | `String` |  |
| `title` | `String` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentPullRequest entities, one per record (raises on error).
agent_pull_requests = client.AgentPullRequest.list({ "agent_id" => "example", "organization_id" => "example" })
agent_pull_requests.each { |item| puts item.data_get }
```


### AgentQuestion

Create an instance: `agent_question = client.AgentQuestion`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentRepository

Create an instance: `agent_repository = client.AgentRepository`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `environments` | `Hash` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `Integer` |  |
| `id` | `String` |  |
| `repository_choices` | `Array` |  |
| `repository_choices_error` | `Object` | GitHub discovery warning. |
| `repository_choices_truncated` | `Boolean` |  |
| `version` | `Integer` |  |
| `work_repositories` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of AgentRepository entities, one per record (raises on error).
agent_repositorys = client.AgentRepository.list({ "agent_id" => "example", "organization_id" => "example" })
agent_repositorys.each { |item| puts item.data_get }
```


### AgentResource

Create an instance: `agent_resource = client.AgentResource`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` |  |
| `uri` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentResource entities, one per record (raises on error).
agent_resources = client.AgentResource.list({ "agent_id" => "example", "organization_id" => "example" })
agent_resources.each { |item| puts item.data_get }
```


### AgentRoutine

Create an instance: `agent_routine = client.AgentRoutine`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `consecutive_errors` | `Integer` |  |
| `credit_wait` | `Hash` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `Object` |  |
| `enabled` | `Boolean` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `last_error` | `Object` |  |
| `last_run_at` | `Object` |  |
| `last_status` | `Object` |  |
| `managed` | `Boolean` |  |
| `name` | `String` |  |
| `next_run_at` | `Object` |  |
| `routine` | `Hash` |  |
| `schedule` | `Hash` |  |
| `schedule_label` | `String` |  |
| `utility_model` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of AgentRoutine entities, one per record (raises on error).
agent_routines = client.AgentRoutine.list({ "agent_id" => "example", "organization_id" => "example" })
agent_routines.each { |item| puts item.data_get }
```


### AgentRun

Create an instance: `agent_run = client.AgentRun`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `Object` |  |
| `id` | `String` |  |
| `run_id` | `String` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentRun record (raises on error).
agent_run = client.AgentRun.load({ "id" => "agent_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```


### AgentRuntime

Create an instance: `agent_runtime = client.AgentRuntime`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `Array` |  |
| `can_manage` | `Boolean` |  |
| `can_reset` | `Boolean` |  |
| `image` | `String` |  |
| `memory_mb` | `Object` |  |
| `platform` | `String` |  |
| `profile` | `String` |  |
| `provider` | `String` |  |
| `state` | `String` |  |
| `version` | `String` |  |
| `volume` | `Object` |  |


### AgentSetting

Create an instance: `agent_setting = client.AgentSetting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `expected_version` | `String` |  |
| `instructions` | `String` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentSetting entities, one per record (raises on error).
agent_settings = client.AgentSetting.list({ "agent_id" => "example", "organization_id" => "example" })
agent_settings.each { |item| puts item.data_get }
```


### AgentSharing

Create an instance: `agent_sharing = client.AgentSharing`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AgentSite

Create an instance: `agent_site = client.AgentSite`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed_at` | `String` |  |
| `deployments_count` | `Integer` |  |
| `hostname` | `String` |  |
| `https` | `String` | Whether the organization's certificate serves this site over HTTPS |
| `id` | `String` |  |
| `name` | `String` |  |
| `url` | `String` |  |
| `visibility` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentSite entities, one per record (raises on error).
agent_sites = client.AgentSite.list({ "agent_id" => "example", "organization_id" => "example" })
agent_sites.each { |item| puts item.data_get }
```


### AgentSkill

Create an instance: `agent_skill = client.AgentSkill`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `Boolean` |  |
| `can_configure` | `Boolean` |  |
| `can_manage` | `Boolean` |  |
| `configuration_state` | `String` | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `String` |  |
| `enabled` | `Boolean` |  |
| `name` | `String` |  |
| `skills` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentSkill entities, one per record (raises on error).
agent_skills = client.AgentSkill.list({ "agent_id" => "example", "organization_id" => "example" })
agent_skills.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_skill = client.AgentSkill.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "enabled" => true, # Boolean
  "name" => "example_name", # String
  "version" => "example_version", # String
})
```


### AgentSlack

Create an instance: `agent_slack = client.AgentSlack`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentSubagent

Create an instance: `agent_subagent = client.AgentSubagent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` |  |
| `attention` | `Object` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `Object` |  |
| `id` | `String` |  |
| `model` | `Object` |  |
| `parent_id` | `String` |  |
| `preview` | `Object` |  |
| `started_at` | `Object` |  |
| `state` | `Object` | What the thread is to the viewer. |
| `status` | `String` |  |
| `title` | `String` |  |
| `updated_at` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of AgentSubagent entities, one per record (raises on error).
agent_subagents = client.AgentSubagent.list({ "agent_id" => "example", "organization_id" => "example" })
agent_subagents.each { |item| puts item.data_get }
```


### AgentSubscription

Create an instance: `agent_subscription = client.AgentSubscription`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of AgentSubscription entities, one per record (raises on error).
agent_subscriptions = client.AgentSubscription.list({ "agent_id" => "example", "organization_id" => "example" })
agent_subscriptions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_subscription = client.AgentSubscription.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### AgentTeammate

Create an instance: `agent_teammate = client.AgentTeammate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `Object` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `String` |  |
| `name` | `String` |  |
| `persona` | `Object` |  |
| `slug` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentTeammate entities, one per record (raises on error).
agent_teammates = client.AgentTeammate.list({ "agent_id" => "example", "organization_id" => "example" })
agent_teammates.each { |item| puts item.data_get }
```


### AgentTerminal

Create an instance: `agent_terminal = client.AgentTerminal`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentThread

Create an instance: `agent_thread = client.AgentThread`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `Object` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `Boolean` |  |
| `execution` | `Object` |  |
| `first_input` | `Object` |  |
| `first_input_key` | `String` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `String` | Membership the first message was sent as, for input_delivery. |
| `id` | `String` |  |
| `inherit_context` | `Boolean` | Include the source conversation through its last completed reply. |
| `local_activities` | `Hash` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `Integer` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `Object` |  |
| `local_scope_key` | `Object` |  |
| `local_status_pending` | `Boolean` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `Array` |  |
| `main_thread_id` | `String` |  |
| `message` | `String` | The thread's first message. |
| `next_cursor` | `Object` |  |
| `parent_conversation_id` | `String` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `String` |  |
| `selected_thread` | `Object` |  |
| `thread` | `Hash` |  |
| `threads` | `Array` |  |
| `title` | `String` |  |
| `total_archived_count` | `Object` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```ruby
# list returns an Array of AgentThread entities, one per record (raises on error).
agent_threads = client.AgentThread.list({ "agent_id" => "example", "organization_id" => "example" })
agent_threads.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_thread = client.AgentThread.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### AgentTool

Create an instance: `agent_tool = client.AgentTool`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `inputSchema` | `Hash` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentTool entities, one per record (raises on error).
agent_tools = client.AgentTool.list({ "agent_id" => "example", "organization_id" => "example" })
agent_tools.each { |item| puts item.data_get }
```


### AgentVerifyProject

Create an instance: `agent_verify_project = client.AgentVerifyProject`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `Boolean` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `Boolean` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `Integer` |  |
| `project_choices` | `Array` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `Boolean` |  |
| `verify_projects` | `Array` |  |
| `version` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of AgentVerifyProject entities, one per record (raises on error).
agent_verify_projects = client.AgentVerifyProject.list({ "agent_id" => "example", "organization_id" => "example" })
agent_verify_projects.each { |item| puts item.data_get }
```


### AgentWait

Create an instance: `agent_wait = client.AgentWait`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentWebhook

Create an instance: `agent_webhook = client.AgentWebhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `connection` | `Hash` |  |
| `deliveries` | `Array` |  |
| `event_types` | `Array` |  |
| `expected_generation` | `Integer` |  |
| `id` | `String` |  |
| `max_events_per_day` | `Integer` |  |
| `name` | `String` |  |
| `purpose` | `String` |  |
| `signing_key` | `Object` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWebhook record (raises on error).
agent_webhook = client.AgentWebhook.load({ "id" => "agent_webhook_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
agent_webhook = client.AgentWebhook.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "event_types" => [], # Array
  "max_events_per_day" => 1, # Integer
  "name" => "example_name", # String
  "purpose" => "example_purpose", # String
})
```


### AgentWork

Create an instance: `agent_work = client.AgentWork`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentWorkflow

Create an instance: `agent_workflow = client.AgentWorkflow`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `expected_digest` | `String` |  |
| `path` | `String` |  |
| `source` | `String` | At most 262144 UTF-8 bytes |
| `template` | `String` | A template id from the catalog's templates |
| `templates` | `Array` |  |
| `truncated` | `Boolean` |  |
| `workflows` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of AgentWorkflow entities, one per record (raises on error).
agent_workflows = client.AgentWorkflow.list({ "agent_id" => "example", "organization_id" => "example" })
agent_workflows.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_workflow = client.AgentWorkflow.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "path" => "example_path", # String
  "template" => "example_template", # String
})
```


### AgentWorkflowProposal

Create an instance: `agent_workflow_proposal = client.AgentWorkflowProposal`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `Hash` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `Object` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `Boolean` |  |
| `can_revise` | `Boolean` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `Boolean` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `Boolean` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `String` |  |
| `definition` | `Object` |  |
| `digest` | `String` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `Object` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `String` |  |
| `model_choices` | `Array` | Models the viewer may choose for the agent steps before saving. |
| `name` | `String` |  |
| `native_rows` | `Array` |  |
| `path` | `String` |  |
| `pipeline_checkpoints` | `Hash` |  |
| `pipeline_commands` | `Hash` |  |
| `reasoning_choices` | `Array` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `Object` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `Object` |  |
| `stale` | `Boolean` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `Object` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `Object` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWorkflowProposal record (raises on error).
agent_workflow_proposal = client.AgentWorkflowProposal.load({ "id" => "agent_workflow_proposal_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```


### AgentWorkflowRun

Create an instance: `agent_workflow_run = client.AgentWorkflowRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `automation` | `Object` | Saved native automation identity. |
| `budget_seconds` | `Object` | The run stops once it has been running this long |
| `budget_usd` | `Object` | The run stops before a step once it has spent this much |
| `can_answer` | `Boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `Boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `Boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Object` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `Object` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Hash` |  |
| `error` | `Object` |  |
| `finished_at` | `Object` |  |
| `flow_steps` | `Object` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `String` | Public run ID. |
| `needs_you` | `Boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `Object` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `Object` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `Integer` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `Object` |  |
| `running_seconds` | `Integer` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `String` |  |
| `spent_tokens` | `Integer` | The tokens the run's agent steps have used so far |
| `spent_usd` | `Float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `Boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `String` |  |
| `started_by` | `Object` | The event that started the run |
| `status` | `String` |  |
| `step_count` | `Integer` |  |
| `steps` | `Array` |  |
| `trigger_id` | `Object` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `Object` | When a sleeping run's step looks again |
| `workflow_digest` | `Object` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWorkflowRun record (raises on error).
agent_workflow_run = client.AgentWorkflowRun.load({ "id" => "agent_workflow_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentWorkflowRun entities, one per record (raises on error).
agent_workflow_runs = client.AgentWorkflowRun.list({ "agent_id" => "example", "organization_id" => "example" })
agent_workflow_runs.each { |item| puts item.data_get }
```


### AgentWorkflowTrigger

Create an instance: `agent_workflow_trigger = client.AgentWorkflowTrigger`

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
| `budget` | `Object` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `Boolean` |  |
| `can_pause` | `Boolean` | It is running, so a manager can pause it |
| `can_resume` | `Boolean` | A person paused it, so a manager can resume it |
| `can_review` | `Boolean` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `Object` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `Object` | When the daily count starts again, at the organization's midnight |
| `id` | `String` |  |
| `kind` | `String` |  |
| `next_due_at` | `Object` |  |
| `pause_cause` | `Object` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `Boolean` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `Object` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `Object` |  |
| `schedule` | `Object` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `Object` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `Integer` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `Object` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `Object` |  |
| `starts` | `Object` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `Object` | The event subscription that starts it |
| `time_zone` | `String` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `Object` | Events that started a run today, for an event workflow |
| `trigger` | `Hash` |  |
| `workflow_path` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWorkflowTrigger record (raises on error).
agent_workflow_trigger = client.AgentWorkflowTrigger.load({ "id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentWorkflowTrigger entities, one per record (raises on error).
agent_workflow_triggers = client.AgentWorkflowTrigger.list({ "agent_id" => "example", "organization_id" => "example" })
agent_workflow_triggers.each { |item| puts item.data_get }
```


### AgentWorkspace

Create an instance: `agent_workspace = client.AgentWorkspace`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `can_delete` | `Boolean` |  |
| `can_keep` | `Boolean` |  |
| `cleanup_after` | `Object` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `reason` | `String` |  |
| `state` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentWorkspace entities, one per record (raises on error).
agent_workspaces = client.AgentWorkspace.list({ "agent_id" => "example", "organization_id" => "example" })
agent_workspaces.each { |item| puts item.data_get }
```


### AgentWritePermission

Create an instance: `agent_write_permission = client.AgentWritePermission`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `String` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `String` |  |
| `granted_by` | `Object` |  |
| `id` | `String` |  |
| `in_effect` | `Boolean` | Whether the permission approves writes now. |
| `last_used_at` | `Object` |  |
| `tool` | `String` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```ruby
# list returns an Array of AgentWritePermission entities, one per record (raises on error).
agent_write_permissions = client.AgentWritePermission.list({ "agent_id" => "example", "organization_id" => "example" })
agent_write_permissions.each { |item| puts item.data_get }
```


### AllocationLog

Create an instance: `allocation_log = client.AllocationLog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `String` |  |
| `environment` | `String` |  |
| `fetched_at` | `String` |  |
| `location` | `Object` |  |
| `logs` | `String` |  |
| `namespace` | `String` |  |
| `offset` | `Integer` |  |
| `origin` | `String` |  |
| `service` | `String` |  |
| `task` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AllocationLog entities, one per record (raises on error).
allocation_logs = client.AllocationLog.list({ "allocation_id" => "example", "app_id" => "example" })
allocation_logs.each { |item| puts item.data_get }
```


### App

Create an instance: `app = client.App`

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
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `description` | `Object` |  |
| `framework` | `Object` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `repository_id` | `String` |  |
| `repository_kind` | `Object` |  |
| `root_path` | `String` |  |
| `root_path_display` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the App record (raises on error).
app = client.App.load({ "id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of App entities, one per record (raises on error).
apps = client.App.list
apps.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app = client.App.create({
  "name" => "example_name", # String
  "organization_id" => "example_organization_id", # String
  "repository_id" => "example_repository_id", # String
  "root_path" => "example_root_path", # String
  "slug" => "example_slug", # String
})
```


### AppCdn

Create an instance: `app_cdn = client.AppCdn`

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
| `app_environment_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `cache_path_prefix` | `Object` |  |
| `cache_settings_json` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `distribution_kind` | `String` |  |
| `edge_hostname` | `Object` |  |
| `failure_message` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `hostnames` | `Array` |  |
| `id` | `String` |  |
| `last_deployed_at` | `Object` |  |
| `last_deployed_at_label` | `Object` |  |
| `last_purged_at` | `Object` |  |
| `last_purged_at_label` | `Object` |  |
| `last_synced_at` | `Object` |  |
| `last_synced_at_label` | `Object` |  |
| `name` | `String` |  |
| `origin_url` | `String` |  |
| `provisioned` | `Boolean` |  |
| `routing_settings_json` | `Object` |  |
| `security_settings_json` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppCdn record (raises on error).
app_cdn = client.AppCdn.load({ "id" => "app_cdn_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppCdn entities, one per record (raises on error).
app_cdns = client.AppCdn.list({ "app_id" => "example" })
app_cdns.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_cdn = client.AppCdn.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "origin_url" => "example_origin_url", # String
  "slug" => "example_slug", # String
})
```


### AppConfigVariable

Create an instance: `app_config_variable = client.AppConfigVariable`

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
| `app_environment_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `created_at` | `String` |  |
| `description` | `Object` |  |
| `exposed_to_build` | `Boolean` |  |
| `has_value` | `Boolean` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `key` | `String` |  |
| `scope_kind` | `String` |  |
| `updated_at` | `String` |  |
| `value` | `Object` |  |
| `value_kind` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppConfigVariable record (raises on error).
app_config_variable = client.AppConfigVariable.load({ "id" => "app_config_variable_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppConfigVariable entities, one per record (raises on error).
app_config_variables = client.AppConfigVariable.list({ "app_id" => "example" })
app_config_variables.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_config_variable = client.AppConfigVariable.create({
  "app_id" => "example_app_id", # String
  "exposed_to_build" => true, # Boolean
  "key" => "example_key", # String
  "scope_kind" => "example_scope_kind", # String
  "value_kind" => "example_value_kind", # String
})
```


### AppDataResource

Create an instance: `app_data_resource = client.AppDataResource`

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
| `app_environment_id` | `Object` |  |
| `created_at` | `String` |  |
| `engine` | `String` |  |
| `failure_message` | `Object` |  |
| `high_availability` | `Boolean` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `name` | `String` |  |
| `plan` | `Object` |  |
| `provider_metadata` | `Hash` |  |
| `region` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `storage_gb` | `Object` |  |
| `storage_label` | `Object` |  |
| `updated_at` | `String` |  |
| `version` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppDataResource record (raises on error).
app_data_resource = client.AppDataResource.load({ "id" => "app_data_resource_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppDataResource entities, one per record (raises on error).
app_data_resources = client.AppDataResource.list({ "app_id" => "example" })
app_data_resources.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_data_resource = client.AppDataResource.create({
  "app_id" => "example_app_id", # String
  "engine" => "example_engine", # String
  "kind" => "example_kind", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### AppDeploy

Create an instance: `app_deploy = client.AppDeploy`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `String` |  |
| `app_service_id` | `String` |  |
| `channel` | `String` |  |
| `command` | `String` |  |
| `commit_sha` | `String` |  |
| `desired_instances` | `Integer` |  |
| `environment` | `String` | Environment slug or public ID, all, or existing. |
| `image` | `String` |  |
| `region` | `String` |  |
| `rollout_predecessor` | `String` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `String` | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `String` |  |

#### Example: Create

```ruby
app_deploy = client.AppDeploy.create({
  "app_id" => "example_app_id", # String
  "image" => "example_image", # String
})
```


### AppDeployment

Create an instance: `app_deployment = client.AppDeployment`

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
| `app_environment_id` | `String` |  |
| `app_service_id` | `String` |  |
| `app_service_placement_id` | `String` |  |
| `artifact_locator` | `Object` |  |
| `build_role` | `Object` |  |
| `commit_sha` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `creator_user_id` | `Object` |  |
| `deployed_url` | `Object` |  |
| `display_id` | `Integer` |  |
| `failure_message` | `Object` |  |
| `finished_at` | `Object` |  |
| `finished_at_label` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `idempotency_key` | `Object` |  |
| `is_rollback` | `Boolean` |  |
| `location` | `Object` |  |
| `location_id` | `String` |  |
| `number` | `Integer` |  |
| `operation_key` | `Object` |  |
| `organization_id` | `String` |  |
| `rollback_reason` | `Object` |  |
| `rollback_source_deployment_id` | `Object` |  |
| `rollback_source_release_id` | `Object` |  |
| `rollback_target_release_id` | `Object` |  |
| `source_ref` | `Object` |  |
| `started_at` | `Object` |  |
| `started_at_label` | `Object` |  |
| `status` | `String` |  |
| `trigger_kind` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppDeployment record (raises on error).
app_deployment = client.AppDeployment.load({ "id" => "app_deployment_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppDeployment entities, one per record (raises on error).
app_deployments = client.AppDeployment.list({ "app_id" => "example" })
app_deployments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_deployment = client.AppDeployment.create({
  "app_id" => "example_app_id", # String
})
```


### AppDeploymentOperation

Create an instance: `app_deployment_operation = client.AppDeploymentOperation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Hash` |  |
| `app_environment_id` | `String` |  |
| `app_service_id` | `String` |  |
| `app_service_placement_id` | `String` |  |
| `artifact_locator` | `Object` |  |
| `build_duration_seconds` | `Object` |  |
| `build_source` | `Object` |  |
| `build_status` | `String` |  |
| `children` | `Array` |  |
| `ci_pipeline_id` | `Object` |  |
| `ci_pipeline_run_id` | `Object` |  |
| `commit_sha` | `Object` |  |
| `created_at` | `String` |  |
| `creator` | `Object` |  |
| `deployed_url` | `Object` |  |
| `duration_seconds` | `Object` |  |
| `environment` | `Hash` |  |
| `failure_message` | `String` |  |
| `finished_at` | `String` |  |
| `history_kind` | `String` |  |
| `history_reason` | `Object` |  |
| `id` | `String` |  |
| `is_live` | `Boolean` |  |
| `is_rollback` | `Boolean` |  |
| `live_region_count` | `Integer` |  |
| `location_id` | `String` |  |
| `number` | `Integer` |  |
| `placement` | `Object` |  |
| `region_count` | `Integer` |  |
| `replicas_per_region` | `Integer` |  |
| `rollback_reason` | `Object` |  |
| `rollback_source_release_id` | `Object` |  |
| `rollback_target_release_id` | `Object` |  |
| `rollout_predecessor_id` | `Object` |  |
| `rollout_status` | `String` |  |
| `rollout_strategy` | `String` |  |
| `service` | `Hash` |  |
| `source_ref` | `Object` |  |
| `started_at` | `String` |  |
| `status` | `String` |  |
| `total_replicas` | `Integer` |  |
| `trigger_kind` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppDeploymentOperation record (raises on error).
app_deployment_operation = client.AppDeploymentOperation.load({ "id" => "app_deployment_operation_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppDeploymentOperation entities, one per record (raises on error).
app_deployment_operations = client.AppDeploymentOperation.list({ "app_id" => "example" })
app_deployment_operations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_deployment_operation = client.AppDeploymentOperation.create({
  "app_id" => "example_app_id", # String
})
```


### AppDeploymentRollback

Create an instance: `app_deployment_rollback = client.AppDeploymentRollback`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `String` |  |
| `app_id` | `String` |  |
| `app_service_id` | `String` |  |
| `blockers` | `Array` |  |
| `candidate_releases` | `Array` |  |
| `confirmation_text` | `String` |  |
| `current_deployment` | `Object` |  |
| `current_release` | `Object` |  |
| `deployment` | `Object` |  |
| `desired_state` | `Object` |  |
| `environment` | `Object` |  |
| `execution_allowed` | `Boolean` |  |
| `force` | `Boolean` |  |
| `idempotency_key` | `String` |  |
| `idempotent_reuse` | `Boolean` |  |
| `location` | `Object` |  |
| `operation` | `Object` |  |
| `reason` | `Object` |  |
| `rollback_release` | `Object` |  |
| `rollout` | `Object` |  |
| `service` | `Object` |  |
| `target_artifact_locator` | `Object` |  |
| `target_release` | `Object` |  |
| `to` | `String` |  |
| `warnings` | `Array` |  |

#### Example: Create

```ruby
app_deployment_rollback = client.AppDeploymentRollback.create({
  "app_id" => "example_app_id", # String
})
```


### AppEnvironment

Create an instance: `app_environment = client.AppEnvironment`

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
| `auto_deploy` | `Boolean` |  |
| `base_domain` | `Object` |  |
| `branch_pattern` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `location` | `Object` |  |
| `location_id` | `String` |  |
| `name` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppEnvironment record (raises on error).
app_environment = client.AppEnvironment.load({ "id" => "app_environment_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppEnvironment entities, one per record (raises on error).
app_environments = client.AppEnvironment.list({ "app_id" => "example" })
app_environments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_environment = client.AppEnvironment.create({
  "app_id" => "example_app_id", # String
  "auto_deploy" => true, # Boolean
  "kind" => "example_kind", # String
  "location_id" => "example_location_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "status" => "example_status", # String
})
```


### AppLocation

Create an instance: `app_location = client.AppLocation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `location_id` | `String` |  |
| `name` | `String` |  |
| `nomad_datacenter` | `String` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AppLocation entities, one per record (raises on error).
app_locations = client.AppLocation.list({ "app_id" => "example" })
app_locations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_location = client.AppLocation.create({
  "app_id" => "example_app_id", # String
  "location_id" => "example_location_id", # String
})
```


### AppMetric

Create an instance: `app_metric = client.AppMetric`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppPreview

Create an instance: `app_preview = client.AppPreview`

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
| `access` | `String` |  |
| `app_preview_profile_id` | `String` |  |
| `change_number` | `String` | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `Integer` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `Integer` | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `resource_overrides` | `Hash` | Service public IDs mapped to resource overrides. |
| `retained` | `Boolean` |  |
| `shared_data_binding_ids` | `Array` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `Array` | Replace the explicitly shared captured service dependencies. |
| `slug` | `String` |  |
| `source_ref` | `String` |  |
| `storage_binding_resources` | `Hash` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppPreview record (raises on error).
app_preview = client.AppPreview.load({ "id" => "app_preview_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppPreview entities, one per record (raises on error).
app_previews = client.AppPreview.list({ "app_id" => "example" })
app_previews.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_preview = client.AppPreview.create({
  "app_id" => "example_app_id", # String
  "app_preview_profile_id" => "example_app_preview_profile_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### AppPreviewProfile

Create an instance: `app_preview_profile = client.AppPreviewProfile`

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
| `automatic` | `Boolean` |  |
| `configuration` | `Hash` |  |
| `created_at` | `String` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `slug` | `String` |  |
| `source_environment_id` | `String` |  |
| `ttl_days` | `Integer` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppPreviewProfile record (raises on error).
app_preview_profile = client.AppPreviewProfile.load({ "id" => "app_preview_profile_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppPreviewProfile entities, one per record (raises on error).
app_preview_profiles = client.AppPreviewProfile.list({ "app_id" => "example" })
app_preview_profiles.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_preview_profile = client.AppPreviewProfile.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "source_environment_id" => "example_source_environment_id", # String
})
```


### AppRun

Create an instance: `app_run = client.AppRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `image` | `String` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppRun record (raises on error).
app_run = client.AppRun.load({ "id" => "app_run_id" })
```

#### Example: List

```ruby
# list returns an Array of AppRun entities, one per record (raises on error).
app_runs = client.AppRun.list
app_runs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_run = client.AppRun.create({
})
```


### AppSecret

Create an instance: `app_secret = client.AppSecret`

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
| `created_at` | `String` |  |
| `description` | `Object` |  |
| `env_key` | `Object` |  |
| `expose_to_build` | `Boolean` |  |
| `has_value` | `Boolean` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `latest_version_number` | `Object` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `rotation_policy` | `Object` |  |
| `scope_kind` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `value` | `String` |  |
| `value_digest` | `Object` |  |
| `value_kind` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppSecret record (raises on error).
app_secret = client.AppSecret.load({ "id" => "app_secret_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppSecret entities, one per record (raises on error).
app_secrets = client.AppSecret.list({ "app_id" => "example" })
app_secrets.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_secret = client.AppSecret.create({
  "app_id" => "example_app_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### AppService

Create an instance: `app_service = client.AppService`

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
| `auto_deploy` | `Boolean` |  |
| `bindings` | `Array` |  |
| `build_command` | `Object` |  |
| `cpu_label` | `Object` |  |
| `cpu_mhz` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `deploy_paths` | `Array` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `Integer` |  |
| `disk_label` | `Object` |  |
| `disk_mb` | `Object` |  |
| `effective_deploy_paths` | `Array` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `internal_port` | `Object` |  |
| `kind` | `String` |  |
| `memory_label` | `Object` |  |
| `memory_max_label` | `Object` |  |
| `memory_max_mb` | `Object` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `Object` |  |
| `name` | `String` |  |
| `nomad_constraints_json` | `Object` |  |
| `nomad_kill_timeout_seconds` | `Object` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `Object` |  |
| `nomad_region` | `Object` |  |
| `nomad_shutdown_delay_seconds` | `Object` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `Object` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `Object` |  |
| `prestart_command` | `Object` |  |
| `publicly_accessible` | `Boolean` |  |
| `release_command` | `Object` |  |
| `repo_source_path` | `String` |  |
| `runtime` | `String` |  |
| `runtime_adapter_kind` | `String` |  |
| `runtime_adapter_settings_json` | `Object` |  |
| `schedule` | `Object` |  |
| `slug` | `String` |  |
| `source_path` | `String` |  |
| `start_command` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppService record (raises on error).
app_service = client.AppService.load({ "id" => "app_service_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppService entities, one per record (raises on error).
app_services = client.AppService.list({ "app_id" => "example" })
app_services.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_service = client.AppService.create({
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


### AppServiceBinding

Create an instance: `app_service_binding = client.AppServiceBinding`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppServiceBinding record (raises on error).
app_service_binding = client.AppServiceBinding.load({ "id" => "app_service_binding_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppServiceBinding entities, one per record (raises on error).
app_service_bindings = client.AppServiceBinding.list({ "app_id" => "example" })
app_service_bindings.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_service_binding = client.AppServiceBinding.create({
  "app_id" => "example_app_id", # String
})
```


### AppServicePlacement

Create an instance: `app_service_placement = client.AppServicePlacement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `String` |  |
| `app_service_id` | `String` |  |
| `created_at` | `String` |  |
| `deployment_channel` | `Object` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `organization_id` | `String` |  |
| `region_count` | `Integer` |  |
| `replicas_per_region` | `Integer` |  |
| `rollout_strategy` | `String` |  |
| `targets` | `Array` |  |
| `total_replicas` | `Integer` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppServicePlacement record (raises on error).
app_service_placement = client.AppServicePlacement.load({ "id" => "app_service_placement_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppServicePlacement entities, one per record (raises on error).
app_service_placements = client.AppServicePlacement.list({ "app_id" => "example" })
app_service_placements.each { |item| puts item.data_get }
```


### AppStorageResource

Create an instance: `app_storage_resource = client.AppStorageResource`

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
| `access_mode` | `String` | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `Object` |  |
| `attachment` | `Object` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `Object` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `Object` |  |
| `created_at` | `String` |  |
| `ephemeral` | `Boolean` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `Object` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `location_code` | `Object` |  |
| `location_id` | `Object` | Volume datacenter pin (volume kind only) |
| `mount_path` | `Object` |  |
| `name` | `String` |  |
| `provider` | `String` | Storage backend. |
| `provider_error` | `Object` | Last provisioning/teardown error from the storage provider |
| `region` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppStorageResource record (raises on error).
app_storage_resource = client.AppStorageResource.load({ "id" => "app_storage_resource_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of AppStorageResource entities, one per record (raises on error).
app_storage_resources = client.AppStorageResource.list({ "app_id" => "example" })
app_storage_resources.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
app_storage_resource = client.AppStorageResource.create({
  "app_id" => "example_app_id", # String
  "access_mode" => "example_access_mode", # String
  "kind" => "example_kind", # String
  "name" => "example_name", # String
  "provider" => "example_provider", # String
  "slug" => "example_slug", # String
  "status" => "example_status", # String
})
```


### AttachmentPart

Create an instance: `attachment_part = client.AttachmentPart`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AutomationEvent

Create an instance: `automation_event = client.AutomationEvent`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `can_manage` | `Boolean` |  |
| `can_manage_events` | `Boolean` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `Boolean` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `Boolean` |  |
| `event_subscriptions` | `Array` |  |
| `event_triggers` | `Array` |  |
| `expected_revision` | `Object` |  |
| `id` | `String` |  |
| `key` | `String` |  |
| `name` | `String` |  |
| `revision` | `Integer` |  |
| `schedule` | `Object` |  |
| `schedules` | `Array` |  |
| `settings` | `Hash` |  |
| `subscription_key` | `String` |  |
| `version` | `Hash` |  |


### AutomationRun

Create an instance: `automation_run = client.AutomationRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `automation` | `Object` | Saved native automation identity. |
| `budget_seconds` | `Object` | The run stops once it has been running this long |
| `budget_usd` | `Object` | The run stops before a step once it has spent this much |
| `can_answer` | `Boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `Boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `Boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Object` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `Object` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Hash` |  |
| `error` | `Object` |  |
| `finished_at` | `Object` |  |
| `flow_steps` | `Object` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `String` |  |
| `input` | `Hash` |  |
| `needs_you` | `Boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `Object` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `Object` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `String` |  |
| `resume_count` | `Integer` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `Object` |  |
| `running_seconds` | `Integer` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `String` |  |
| `spent_tokens` | `Integer` | The tokens the run's agent steps have used so far |
| `spent_usd` | `Float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `Boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `String` |  |
| `started_by` | `Object` | The event that started the run |
| `status` | `String` |  |
| `step_count` | `Integer` |  |
| `steps` | `Array` |  |
| `trigger_id` | `Object` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `String` |  |
| `wake_at` | `Object` | When a sleeping run's step looks again |
| `workflow_digest` | `Object` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `Object` |  |

#### Example: Create

```ruby
automation_run = client.AutomationRun.create({
  "agent_id" => "example_agent_id", # String
  "automation_id" => "example_automation_id", # String
  "organization_id" => "example_organization_id", # String
  "input" => {}, # Hash
  "request_id" => "example_request_id", # String
  "version_id" => "example_version_id", # String
})
```


### Binary

Create an instance: `binary = client.Binary`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts_versions` | `Boolean` |  |
| `arch` | `Object` |  |
| `archived_at` | `Object` |  |
| `binary` | `Hash` |  |
| `created_at` | `String` |  |
| `download_secret` | `String` |  |
| `download_url` | `String` |  |
| `executable` | `String` |  |
| `format` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `latest_version` | `Object` |  |
| `launch_args` | `Array` |  |
| `name` | `String` |  |
| `needs_refresh` | `Boolean` |  |
| `operation` | `Hash` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `platform` | `Object` |  |
| `project_id` | `String` |  |
| `sha256` | `String` |  |
| `slug` | `String` |  |
| `version` | `Hash` |  |
| `version_defaults` | `Object` |  |
| `versions` | `Array` |  |
| `window_title` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Binary record (raises on error).
binary = client.Binary.load({ "id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Binary entities, one per record (raises on error).
binarys = client.Binary.list({ "organization_id" => "example", "project_id" => "example" })
binarys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
binary = client.Binary.create({
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


### BinaryVersion

Create an instance: `binary_version = client.BinaryVersion`

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
| `arch` | `Object` |  |
| `cancelable` | `Boolean` |  |
| `configuration` | `Hash` |  |
| `configuration_digest` | `String` |  |
| `created_at` | `String` |  |
| `deletable` | `Boolean` |  |
| `download_secret` | `String` |  |
| `download_url` | `String` |  |
| `environment_uses` | `Array` |  |
| `executable` | `String` |  |
| `format` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `launch_args` | `Array` |  |
| `operation` | `Hash` |  |
| `package_sha256` | `Object` |  |
| `package_size` | `Object` |  |
| `permissions` | `Hash` |  |
| `platform` | `Object` |  |
| `preparations` | `Array` |  |
| `retryable` | `Boolean` |  |
| `sha256` | `String` |  |
| `status` | `String` |  |
| `version` | `Hash` |  |
| `window_title` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BinaryVersion record (raises on error).
binary_version = client.BinaryVersion.load({ "id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of BinaryVersion entities, one per record (raises on error).
binary_versions = client.BinaryVersion.list({ "binary_id" => "example", "organization_id" => "example", "project_id" => "example" })
binary_versions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
binary_version = client.BinaryVersion.create({
  "binary_id" => "example_binary_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "download_url" => "example_download_url", # String
  "idempotency_key" => "example_idempotency_key", # String
})
```


### BrowserEgressCandidate

Create an instance: `browser_egress_candidate = client.BrowserEgressCandidate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of BrowserEgressCandidate entities, one per record (raises on error).
browser_egress_candidates = client.BrowserEgressCandidate.list({ "organization_id" => "example" })
browser_egress_candidates.each { |item| puts item.data_get }
```


### BrowserSession

Create an instance: `browser_session = client.BrowserSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `Object` |  |
| `authentication_status` | `String` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `Object` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `Object` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `Object` |  |
| `closure_basis` | `Object` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `Integer` |  |
| `controller` | `String` |  |
| `credential_id` | `Object` | Optional configured credential public ID within the selected project. |
| `environment_id` | `String` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `Object` |  |
| `expires_at` | `String` |  |
| `failure_code` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `initial_url` | `String` |  |
| `max_seconds` | `Integer` |  |
| `pending_control_id` | `Object` |  |
| `project_id` | `Object` | Optional project slug or public ID. |
| `reconciled_at` | `Object` |  |
| `started_at` | `Object` |  |
| `status` | `String` |  |
| `url` | `String` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BrowserSession record (raises on error).
browser_session = client.BrowserSession.load({ "id" => "browser_session_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
browser_session = client.BrowserSession.create({
  "organization_id" => "example_organization_id", # String
})
```


### BrowserSessionConnection

Create an instance: `browser_session_connection = client.BrowserSessionConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `generation` | `Integer` |  |
| `idempotency_key` | `String` |  |

#### Example: Create

```ruby
browser_session_connection = client.BrowserSessionConnection.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
  "generation" => 1, # Integer
})
```


### BrowserSessionControl

Create an instance: `browser_session_control = client.BrowserSessionControl`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `String` |  |
| `completed_at` | `Object` |  |
| `completed_generation` | `Object` |  |
| `connection` | `Object` |  |
| `failure_code` | `Object` |  |
| `id` | `String` |  |
| `requested_controller` | `String` |  |
| `requested_generation` | `Integer` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BrowserSessionControl record (raises on error).
browser_session_control = client.BrowserSessionControl.load({ "id" => "browser_session_control_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```


### BrowserSessionEvent

Create an instance: `browser_session_event = client.BrowserSessionEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `Object` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `payload` | `Hash` |  |
| `source_sequence` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of BrowserSessionEvent entities, one per record (raises on error).
browser_session_events = client.BrowserSessionEvent.list({ "browser_session_id" => "example", "organization_id" => "example" })
browser_session_events.each { |item| puts item.data_get }
```


### BrowserSessionMedia

Create an instance: `browser_session_media = client.BrowserSessionMedia`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `String` |  |
| `capture_omissions` | `Object` |  |
| `captured_at` | `Object` |  |
| `ended_at` | `Object` |  |
| `failure_code` | `Object` |  |
| `files` | `Array` |  |
| `frames` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `partial` | `Boolean` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `String` |  |
| `source` | `Object` | Screenshot provenance. |
| `status` | `String` |  |
| `stop_requested_at` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BrowserSessionMedia record (raises on error).
browser_session_media = client.BrowserSessionMedia.load({ "id" => "browser_session_media_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```


### BrowserSessionRecording

Create an instance: `browser_session_recording = client.BrowserSessionRecording`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `wait` | `Boolean` | Only screenshots support wait: true. |

#### Example: Create

```ruby
browser_session_recording = client.BrowserSessionRecording.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### BrowserSessionScreenshot

Create an instance: `browser_session_screenshot = client.BrowserSessionScreenshot`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idempotency_key` | `String` |  |
| `wait` | `Boolean` | Only screenshots support wait: true. |

#### Example: Create

```ruby
browser_session_screenshot = client.BrowserSessionScreenshot.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### BrowserSessionTask

Create an instance: `browser_session_task = client.BrowserSessionTask`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `Object` |  |
| `browser_session_id` | `String` |  |
| `cancel_requested_at` | `Object` |  |
| `completed_at` | `Object` |  |
| `control_generation` | `Object` |  |
| `deadline_at` | `String` |  |
| `effects_unknown` | `Boolean` |  |
| `failure_code` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `instruction` | `String` |  |
| `max_rounds` | `Integer` |  |
| `max_seconds` | `Integer` |  |
| `model_selection` | `Hash` |  |
| `outcome` | `Object` |  |
| `result` | `Hash` |  |
| `started_at` | `Object` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BrowserSessionTask record (raises on error).
browser_session_task = client.BrowserSessionTask.load({ "id" => "browser_session_task_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
browser_session_task = client.BrowserSessionTask.create({
  "browser_session_id" => "example_browser_session_id", # String
  "organization_id" => "example_organization_id", # String
  "instruction" => "example_instruction", # String
})
```


### CatalogSelector

Create an instance: `catalog_selector = client.CatalogSelector`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of CatalogSelector entities, one per record (raises on error).
catalog_selectors = client.CatalogSelector.list({ "app_id" => "example" })
catalog_selectors.each { |item| puts item.data_get }
```


### CdnDeployment

Create an instance: `cdn_deployment = client.CdnDeployment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CdnDeployment record (raises on error).
cdn_deployment = client.CdnDeployment.load({ "id" => "cdn_deployment_id", "app_id" => "app_id", "cdn_id" => "cdn_id" })
```

#### Example: List

```ruby
# list returns an Array of CdnDeployment entities, one per record (raises on error).
cdn_deployments = client.CdnDeployment.list({ "app_id" => "example", "cdn_id" => "example" })
cdn_deployments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
cdn_deployment = client.CdnDeployment.create({
  "app_id" => "example_app_id", # String
  "cdn_id" => "example_cdn_id", # String
})
```


### CdnHostname

Create an instance: `cdn_hostname = client.CdnHostname`

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
| `app_cdn_distribution_id` | `String` |  |
| `created_at` | `String` |  |
| `dns_status` | `String` |  |
| `force_ssl` | `Boolean` |  |
| `hostname` | `String` |  |
| `id` | `String` |  |
| `provider_hostname_id` | `Object` |  |
| `tls_status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CdnHostname record (raises on error).
cdn_hostname = client.CdnHostname.load({ "id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id" })
```

#### Example: List

```ruby
# list returns an Array of CdnHostname entities, one per record (raises on error).
cdn_hostnames = client.CdnHostname.list({ "app_id" => "example", "cdn_id" => "example" })
cdn_hostnames.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
cdn_hostname = client.CdnHostname.create({
  "app_id" => "example_app_id", # String
  "cdn_id" => "example_cdn_id", # String
  "hostname" => "example_hostname", # String
})
```


### CdnSpace

Create an instance: `cdn_space = client.CdnSpace`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CdnSpace record (raises on error).
cdn_space = client.CdnSpace.load({ "id" => "cdn_space_id" })
```

#### Example: List

```ruby
# list returns an Array of CdnSpace entities, one per record (raises on error).
cdn_spaces = client.CdnSpace.list({ "organization_id" => "example" })
cdn_spaces.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
cdn_space = client.CdnSpace.create({
  "organization_id" => "example_organization_id", # String
})
```


### CdnSpaceObject

Create an instance: `cdn_space_object = client.CdnSpaceObject`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CdnSpaceObject record (raises on error).
cdn_space_object = client.CdnSpaceObject.load({ "id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id" })
```

#### Example: List

```ruby
# list returns an Array of CdnSpaceObject entities, one per record (raises on error).
cdn_space_objects = client.CdnSpaceObject.list({ "cdn_space_id" => "example" })
cdn_space_objects.each { |item| puts item.data_get }
```


### ConnectionRequest

Create an instance: `connection_request = client.ConnectionRequest`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `String` |  |
| `auth_scheme` | `String` |  |
| `can_configure` | `Boolean` |  |
| `can_disconnect` | `Boolean` |  |
| `can_setup` | `Boolean` |  |
| `error_code` | `Object` |  |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `remote_agent` | `Object` |  |
| `retired_at` | `Object` |  |
| `revoked_at` | `Object` |  |
| `source_operation_id` | `Object` |  |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConnectionRequest record (raises on error).
connection_request = client.ConnectionRequest.load({ "id" => "connection_request_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```


### ConnectionSource

Create an instance: `connection_source = client.ConnectionSource`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `device_id` | `String` |  |
| `device_name` | `String` |  |
| `provider` | `String` |  |
| `source_operation_id` | `String` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ConnectionSource entities, one per record (raises on error).
connection_sources = client.ConnectionSource.list({ "agent_id" => "example", "organization_id" => "example" })
connection_sources.each { |item| puts item.data_get }
```


### CoordinationWait

Create an instance: `coordination_wait = client.CoordinationWait`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_stop` | `Boolean` |  |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `status` | `String` |  |
| `stop_state` | `Object` |  |
| `wake_outcome` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of CoordinationWait entities, one per record (raises on error).
coordination_waits = client.CoordinationWait.list({ "agent_id" => "example", "coordination_id" => "example", "organization_id" => "example" })
coordination_waits.each { |item| puts item.data_get }
```


### CredentialSignInCheck

Create an instance: `credential_sign_in_check = client.CredentialSignInCheck`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` | The project environment (app) to sign in to |
| `environment_name` | `String` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Create

```ruby
credential_sign_in_check = client.CredentialSignInCheck.create({
  "credential_id" => "example_credential_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "environment_id" => "example_environment_id", # String
})
```


### DataResourceRotateCredential

Create an instance: `data_resource_rotate_credential = client.DataResourceRotateCredential`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `Object` |  |
| `created_at` | `String` |  |
| `engine` | `String` |  |
| `failure_message` | `Object` |  |
| `high_availability` | `Boolean` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `name` | `String` |  |
| `plan` | `Object` |  |
| `provider_metadata` | `Hash` |  |
| `region` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `storage_gb` | `Object` |  |
| `storage_label` | `Object` |  |
| `updated_at` | `String` |  |
| `version` | `Object` |  |

#### Example: Create

```ruby
data_resource_rotate_credential = client.DataResourceRotateCredential.create({
  "app_id" => "example_app_id", # String
  "data_resource_id" => "example_data_resource_id", # String
})
```


### DeepScan

Create an instance: `deep_scan = client.DeepScan`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `active` | `Array` |  |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `explorations` | `Array` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `launch_options` | `Hash` | Present only when launch was requested by an admin |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Hash` |  |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeepScan record (raises on error).
deep_scan = client.DeepScan.load({ "id" => "deep_scan_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of DeepScan entities, one per record (raises on error).
deep_scans = client.DeepScan.list({ "organization_id" => "example" })
deep_scans.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
deep_scan = client.DeepScan.create({
  "organization_id" => "example_organization_id", # String
  "environment_id" => "example_environment_id", # String
  "goal" => "example_goal", # String
})
```


### DeepScanFinding

Create an instance: `deep_scan_finding = client.DeepScanFinding`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding_count` | `Integer` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `Array` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `Array` |  |
| `findings_fix_prompt` | `Object` |  |
| `free_findings_pending` | `Boolean` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `String` |  |
| `mode` | `String` |  |
| `permissions` | `Hash` |  |
| `priority` | `Object` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` |  |
| `reproduction_of` | `Object` |  |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `Boolean` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `String` |  |
| `title` | `String` |  |
| `unlock` | `Hash` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DeepScanFinding entities, one per record (raises on error).
deep_scan_findings = client.DeepScanFinding.list({ "deep_scan_id" => "example", "organization_id" => "example" })
deep_scan_findings.each { |item| puts item.data_get }
```


### DeepScanFlow

Create an instance: `deep_scan_flow = client.DeepScanFlow`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `concurrency` | `Integer` |  |
| `environment_id` | `String` |  |
| `exploration_id` | `String` |  |
| `flow_names` | `Array` |  |
| `idempotency_key` | `String` |  |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `note` | `Object` |  |

#### Example: Create

```ruby
deep_scan_flow = client.DeepScanFlow.create({
  "organization_id" => "example_organization_id", # String
  "flow_names" => [], # Array
})
```


### DeepScanMappedFlow

Create an instance: `deep_scan_mapped_flow = client.DeepScanMappedFlow`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `environment_id` | `String` |  |
| `flow_map` | `Object` |  |
| `revision_id` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of DeepScanMappedFlow entities, one per record (raises on error).
deep_scan_mapped_flows = client.DeepScanMappedFlow.list({ "organization_id" => "example", "environment_id" => "example" })
deep_scan_mapped_flows.each { |item| puts item.data_get }
```


### DeepScanOption

Create an instance: `deep_scan_option = client.DeepScanOption`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `Array` |  |
| `deep_scan_defaults` | `Object` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `Object` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `String` |  |
| `name` | `String` |  |
| `personas` | `Array` |  |
| `preview` | `Boolean` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of DeepScanOption entities, one per record (raises on error).
deep_scan_options = client.DeepScanOption.list({ "organization_id" => "example" })
deep_scan_options.each { |item| puts item.data_get }
```


### DemoShare

Create an instance: `demo_share = client.DemoShare`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `String` |  |
| `id` | `String` |  |
| `recording` | `Hash` |  |
| `summary` | `String` | What the recorded browser confirmed. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DemoShare record (raises on error).
demo_share = client.DemoShare.load({ "id" => "demo_share_id" })
```


### DemoShareSegment

Create an instance: `demo_share_segment = client.DemoShareSegment`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DemoShareSegment record (raises on error).
demo_share_segment = client.DemoShareSegment.load({ "id" => "demo_share_segment_id", "demo_share_id" => "demo_share_id" })
```


### DeploymentDashboardNomad

Create an instance: `deployment_dashboard_nomad = client.DeploymentDashboardNomad`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentFile

Create an instance: `deployment_file = client.DeploymentFile`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DomainPathRule

Create an instance: `domain_path_rule = client.DomainPathRule`

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
| `action_kind` | `String` |  |
| `app_service_endpoint_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `backend_ref` | `Object` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `last_error` | `Object` |  |
| `path_prefix` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainPathRule record (raises on error).
domain_path_rule = client.DomainPathRule.load({ "id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id" })
```

#### Example: List

```ruby
# list returns an Array of DomainPathRule entities, one per record (raises on error).
domain_path_rules = client.DomainPathRule.list({ "app_id" => "example", "domain_id" => "example" })
domain_path_rules.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_path_rule = client.DomainPathRule.create({
  "app_id" => "example_app_id", # String
  "domain_id" => "example_domain_id", # String
  "app_service_id" => "example_app_service_id", # Object
  "path_prefix" => "example_path_prefix", # String
})
```


### Dream

Create an instance: `dream = client.Dream`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `Boolean` | The dream skipped at least one run, which will not be retried |
| `changes` | `Array` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `Object` |  |
| `counts` | `Hash` |  |
| `dream` | `Object` |  |
| `error_code` | `Object` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `String` | Public id used in the dream's URL |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `phase` | `String` | Where the dream is. |
| `reason` | `Object` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `Integer` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `String` | Local day whose finished runs it reviewed |
| `runs` | `Array` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `String` | Project or unassigned environment name |
| `skipped` | `Integer` | Runs skipped after repeated rejected review output |
| `tab` | `String` |  |
| `timezone` | `String` | Organization timezone the dream used |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Dream record (raises on error).
dream = client.Dream.load({ "id" => "dream_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Dream entities, one per record (raises on error).
dreams = client.Dream.list({ "organization_id" => "example", "project_id" => "example" })
dreams.each { |item| puts item.data_get }
```


### Environment

Create an instance: `environment = client.Environment`

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
| `active_revision_id` | `Object` |  |
| `agent_sign_up_available` | `Boolean` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `String` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `Hash` |  |
| `cleanup` | `Array` |  |
| `connection` | `String` |  |
| `created_at` | `String` |  |
| `default_policy` | `Hash` |  |
| `default_policy_json` | `Hash` |  |
| `discovery_defaults` | `Hash` |  |
| `environment` | `Hash` |  |
| `exploration_accounts` | `Array` |  |
| `explorations` | `Array` |  |
| `first_run` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `imessage_number` | `Object` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `Boolean` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `Integer` |  |
| `managed_google_available` | `Boolean` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `String` |  |
| `messaging_tester_number` | `Object` | One configured tester number. |
| `name` | `String` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `Array` |  |
| `onboarding_discovery` | `Object` |  |
| `organization_id` | `String` |  |
| `pending_accounts` | `Array` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `Hash` |  |
| `project_id` | `Object` | Owning project. |
| `repository_id` | `Object` |  |
| `revisions` | `Array` |  |
| `setup_discovery_id` | `Object` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `Boolean` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `String` |  |
| `status` | `String` |  |
| `target_kind` | `Object` |  |
| `target_url` | `Object` |  |
| `test_accounts` | `Hash` |  |
| `updated_at` | `String` |  |
| `verify_network_connection_id` | `Object` |  |
| `version` | `Integer` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Environment record (raises on error).
environment = client.Environment.load({ "id" => "environment_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Environment entities, one per record (raises on error).
environments = client.Environment.list({ "organization_id" => "example" })
environments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
environment = client.Environment.create({
  "organization_id" => "example_organization_id", # String
  "slug" => "example_slug", # String
})
```


### EnvironmentDiscoveryRun

Create an instance: `environment_discovery_run = client.EnvironmentDiscoveryRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` | Omit for anonymous exploration |
| `deadline_at` | `String` |  |
| `environment_revision_id` | `String` |  |
| `evidence` | `Array` |  |
| `failure_code` | `Object` |  |
| `id` | `String` |  |
| `queued_at` | `String` |  |
| `recording` | `Hash` |  |
| `result` | `Object` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EnvironmentDiscoveryRun record (raises on error).
environment_discovery_run = client.EnvironmentDiscoveryRun.load({ "id" => "environment_discovery_run_id", "environment_id" => "environment_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
environment_discovery_run = client.EnvironmentDiscoveryRun.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### EnvironmentExploration

Create an instance: `environment_exploration = client.EnvironmentExploration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `persona_id` | `Object` |  |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Create

```ruby
environment_exploration = client.EnvironmentExploration.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "goal" => "example_goal", # String
})
```


### EnvironmentFirstRun

Create an instance: `environment_first_run = client.EnvironmentFirstRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### EnvironmentRevision

Create an instance: `environment_revision = client.EnvironmentRevision`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `Array` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `Object` |  |
| `app_release_id` | `Object` |  |
| `blueprint` | `Hash` |  |
| `blueprint_json` | `Hash` |  |
| `cleanup_state` | `String` |  |
| `created_at` | `String` |  |
| `digest` | `String` |  |
| `dry_run` | `Boolean` |  |
| `expires_at` | `Object` |  |
| `id` | `String` |  |
| `organization_id` | `String` |  |
| `ready_at` | `Object` |  |
| `resolved_manifest_json` | `Hash` |  |
| `retention_policy_json` | `Hash` |  |
| `revision` | `Integer` |  |
| `revoked_at` | `Object` |  |
| `runner_environment_revision_id` | `Object` |  |
| `safety_policy_json` | `Hash` |  |
| `schema_version` | `Integer` |  |
| `source_metadata` | `Hash` |  |
| `source_metadata_json` | `Hash` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `validation_json` | `Hash` |  |
| `verify_environment_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EnvironmentRevision record (raises on error).
environment_revision = client.EnvironmentRevision.load({ "id" => "environment_revision_id", "environment_id" => "environment_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
environment_revision = client.EnvironmentRevision.create({
  "environment_id" => "example_environment_id", # String
  "organization_id" => "example_organization_id", # String
  "blueprint" => {}, # Hash
})
```


### EnvironmentSecretBinding

Create an instance: `environment_secret_binding = client.EnvironmentSecretBinding`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `secret_id` | `String` |  |
| `secret_version_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of EnvironmentSecretBinding entities, one per record (raises on error).
environment_secret_bindings = client.EnvironmentSecretBinding.list({ "app_id" => "example", "environment_id" => "example" })
environment_secret_bindings.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
environment_secret_binding = client.EnvironmentSecretBinding.create({
  "app_id" => "example_app_id", # String
  "environment_id" => "example_environment_id", # String
  "env_key" => "example_env_key", # String
})
```


### EnvironmentTestAccount

Create an instance: `environment_test_account = client.EnvironmentTestAccount`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `Boolean` |  |
| `credentials` | `Array` |  |
| `id` | `String` |  |
| `persona` | `String` |  |
| `revision_id` | `String` |  |
| `role` | `String` |  |
| `tenant` | `String` |  |

#### Example: List

```ruby
# list returns an Array of EnvironmentTestAccount entities, one per record (raises on error).
environment_test_accounts = client.EnvironmentTestAccount.list({ "environment_id" => "example", "organization_id" => "example" })
environment_test_accounts.each { |item| puts item.data_get }
```


### Evidence

Create an instance: `evidence = client.Evidence`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Evidence record (raises on error).
evidence = client.Evidence.load({ "id" => "evidence_id", "organization_id" => "organization_id" })
```


### Exploration

Create an instance: `exploration = client.Exploration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `active` | `Array` |  |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `explorations` | `Array` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `launch_options` | `Hash` | Present only when launch was requested by an admin |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Hash` |  |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `persona_id` | `Object` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Exploration record (raises on error).
exploration = client.Exploration.load({ "id" => "exploration_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Exploration entities, one per record (raises on error).
explorations = client.Exploration.list({ "organization_id" => "example" })
explorations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
exploration = client.Exploration.create({
  "organization_id" => "example_organization_id", # String
  "environment_id" => "example_environment_id", # String
  "goal" => "example_goal", # String
})
```


### ExplorationMessage

Create an instance: `exploration_message = client.ExplorationMessage`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `text` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Create

```ruby
exploration_message = client.ExplorationMessage.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
  "text" => "example_text", # String
})
```


### ExplorationReport

Create an instance: `exploration_report = client.ExplorationReport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ExplorationScenario

Create an instance: `exploration_scenario = client.ExplorationScenario`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `deadline_at` | `String` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `Boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `explorer_activity` | `Hash` | What the team is doing now. |
| `finding_count` | `Integer` | Findings at every priority, locked ones included. |
| `findings` | `Array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `Object` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `Object` |  |
| `goal` | `String` |  |
| `huntable_flows` | `Array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `String` |  |
| `max_seconds` | `Integer` |  |
| `max_testers` | `Integer` |  |
| `mode` | `String` |  |
| `next_scan_improvements` | `Array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `String` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `Boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `Boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Hash` |  |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Hash` |  |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `Boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `String` |  |
| `time_limit_reached` | `Boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `String` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Object` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `String` | The run's page in the Composal web app |

#### Example: Create

```ruby
exploration_scenario = client.ExplorationScenario.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### Finding

Create an instance: `finding = client.Finding`

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
| `confidence` | `String` |  |
| `created_at` | `String` |  |
| `deferred_until` | `Object` | Required future time when status is deferred |
| `finding` | `Hash` |  |
| `fingerprint` | `String` |  |
| `first_seen_at` | `String` |  |
| `id` | `String` |  |
| `last_seen_at` | `String` |  |
| `locked` | `Boolean` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `Integer` |  |
| `organization_id` | `String` |  |
| `permissions` | `Hash` |  |
| `reason` | `String` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `Object` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `Object` |  |
| `safe_summary` | `String` |  |
| `scenario_occurrences` | `Array` |  |
| `severity` | `String` |  |
| `status` | `String` |  |
| `title` | `String` |  |
| `updated_at` | `String` |  |
| `verification` | `Object` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Finding record (raises on error).
finding = client.Finding.load({ "id" => "finding_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Finding entities, one per record (raises on error).
findings = client.Finding.list({ "organization_id" => "example" })
findings.each { |item| puts item.data_get }
```


### GithubConnection

Create an instance: `github_connection = client.GithubConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `Array` |  |
| `github_app_installation_id` | `String` |  |
| `installations` | `Array` |  |
| `project_id` | `String` | Project slug or public ID the repositories are added to. |
| `replace` | `Boolean` | Make these the project's only repositories. |
| `repositories` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of GithubConnection entities, one per record (raises on error).
github_connections = client.GithubConnection.list({ "organization_id" => "example" })
github_connections.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
github_connection = client.GithubConnection.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "repositories" => [], # Array
})
```


### HostingAppDomain

Create an instance: `hosting_app_domain = client.HostingAppDomain`

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
| `app_environment_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `certificate` | `Object` |  |
| `created_at` | `String` |  |
| `dns_mode` | `String` |  |
| `dns_status` | `String` |  |
| `failure_message` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `hostname` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `last_checked_at` | `Object` |  |
| `path_rules` | `Array` |  |
| `record_name` | `Object` |  |
| `record_type` | `Object` |  |
| `record_value` | `Object` |  |
| `redirect_to` | `Object` |  |
| `static_site_id` | `Object` |  |
| `target_kind` | `String` |  |
| `tls_status` | `String` |  |
| `updated_at` | `String` |  |
| `verification_record` | `Object` |  |
| `verification_status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HostingAppDomain record (raises on error).
hosting_app_domain = client.HostingAppDomain.load({ "id" => "hosting_app_domain_id", "app_id" => "app_id" })
```

#### Example: List

```ruby
# list returns an Array of HostingAppDomain entities, one per record (raises on error).
hosting_app_domains = client.HostingAppDomain.list({ "app_id" => "example" })
hosting_app_domains.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
hosting_app_domain = client.HostingAppDomain.create({
  "app_id" => "example_app_id", # String
  "app_service_id" => "example_app_service_id", # Object
  "hostname" => "example_hostname", # String
  "kind" => "example_kind", # String
})
```


### ImageRepository

Create an instance: `image_repository = client.ImageRepository`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_configured` | `Boolean` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `provider_kind` | `String` |  |
| `registry_auth_token` | `String` |  |
| `repository_path` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `visibility` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ImageRepository entities, one per record (raises on error).
image_repositorys = client.ImageRepository.list({ "organization_id" => "example" })
image_repositorys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
image_repository = client.ImageRepository.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### Integration

Create an instance: `integration = client.Integration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `Hash` |  |
| `gitlab` | `Hash` |  |
| `permissions` | `Hash` |  |
| `slack` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of Integration entities, one per record (raises on error).
integrations = client.Integration.list({ "organization_id" => "example" })
integrations.each { |item| puts item.data_get }
```


### InteractionResponse

Create an instance: `interaction_response = client.InteractionResponse`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `Hash` |  |
| `conversation_id` | `String` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `Integer` |  |

#### Example: Create

```ruby
interaction_response = client.InteractionResponse.create({
  "agent_id" => "example_agent_id", # String
  "interaction_id" => "example_interaction_id", # String
  "organization_id" => "example_organization_id", # String
  "answer" => {}, # Hash
  "conversation_id" => "example_conversation_id", # String
  "expected_revision" => 1, # Integer
})
```


### Invitation

Create an instance: `invitation = client.Invitation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `Object` |  |
| `accepted_by_user` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `email` | `String` |  |
| `email_delivery_status` | `String` |  |
| `expires_at` | `Object` |  |
| `expires_at_label` | `Object` |  |
| `id` | `String` |  |
| `invite_url` | `Object` |  |
| `invited_by_user` | `Object` |  |
| `organization` | `Hash` |  |
| `revoked_at` | `Object` |  |
| `role` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of Invitation entities, one per record (raises on error).
invitations = client.Invitation.list({ "organization_id" => "example" })
invitations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
invitation = client.Invitation.create({
  "organization_id" => "example_organization_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
```


### JourneyVariantReplay

Create an instance: `journey_variant_replay = client.JourneyVariantReplay`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `Object` |  |
| `can_request_qualification` | `Boolean` |  |
| `created_at` | `String` |  |
| `failure_code` | `Object` |  |
| `failure_message` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `max_seconds` | `Integer` |  |
| `preparation_receipt` | `Object` |  |
| `qualification` | `Object` |  |
| `qualification_status` | `String` |  |
| `replay_required` | `Boolean` |  |
| `review_reason` | `String` |  |
| `run_id` | `Object` |  |
| `scenario_file` | `Hash` |  |
| `scenario_run_id` | `Object` |  |
| `source_digest` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `variant_id` | `String` |  |

#### Example: Create

```ruby
journey_variant_replay = client.JourneyVariantReplay.create({
  "journey_variant_id" => "example_journey_variant_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "idempotency_key" => "example_idempotency_key", # String
  "review_reason" => "example_review_reason", # String
  "scenario_file" => {}, # Hash
})
```


### Knowledge

Create an instance: `knowledge = client.Knowledge`

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
| `content_digest` | `String` |  |
| `content_json` | `Hash` |  |
| `document` | `Hash` |  |
| `documents` | `Array` |  |
| `dreaming` | `Hash` |  |
| `expected_digest` | `String` |  |
| `history` | `Array` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `markdown` | `String` |  |
| `observed_at` | `String` |  |
| `organization` | `Hash` |  |
| `permissions` | `Hash` |  |
| `project_id` | `String` |  |
| `project_name` | `String` |  |
| `projects` | `Array` |  |
| `selected_project_id` | `Object` |  |
| `source` | `Hash` |  |
| `title` | `String` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Knowledge record (raises on error).
knowledge = client.Knowledge.load({ "id" => "knowledge_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
knowledge = client.Knowledge.create({
  "organization_id" => "example_organization_id", # String
  "markdown" => "example_markdown", # String
  "project_id" => "example_project_id", # String
  "title" => "example_title", # String
})
```


### LocalThreadDelivery

Create an instance: `local_thread_delivery = client.LocalThreadDelivery`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `String` |  |
| `decision_pending` | `Boolean` |  |
| `delivery` | `Hash` |  |
| `expected_version` | `Integer` |  |
| `id` | `String` |  |
| `policy` | `Hash` |  |
| `recovery_message` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LocalThreadDelivery record (raises on error).
local_thread_delivery = client.LocalThreadDelivery.load({ "id" => "local_thread_delivery_id", "agent_id" => "agent_id", "local_thread_id" => "local_thread_id", "organization_id" => "organization_id" })
```


### LocalThreadOperation

Create an instance: `local_thread_operation = client.LocalThreadOperation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `arguments` | `Hash` |  |
| `created_at` | `String` |  |
| `delivery` | `Hash` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `String` |  |
| `diagnostic_code` | `String` | Approved product error code retained after copied diagnostics expire. |
| `end` | `Hash` |  |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `key` | `String` |  |
| `provider` | `String` |  |
| `references` | `Hash` |  |
| `result` | `Object` |  |
| `result_expired` | `Boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LocalThreadOperation record (raises on error).
local_thread_operation = client.LocalThreadOperation.load({ "id" => "local_thread_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
local_thread_operation = client.LocalThreadOperation.create({
  "agent_id" => "example_agent_id", # String
  "local_thread_id" => "example_local_thread_id", # String
  "organization_id" => "example_organization_id", # String
  "action" => "example_action", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
})
```


### Location

Create an instance: `location = client.Location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `nomad_datacenter` | `String` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Location entities, one per record (raises on error).
locations = client.Location.list
locations.each { |item| puts item.data_get }
```


### Me

Create an instance: `me = client.Me`

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
| `active_organization` | `Object` |  |
| `analytics_distinct_id` | `String` |  |
| `analytics_internal` | `Boolean` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `String` |  |
| `api_token` | `String` |  |
| `app_promotion` | `Hash` |  |
| `commit_author_email` | `String` |  |
| `email` | `String` |  |
| `enabled_features` | `Array` |  |
| `github_pr_user_authorization_connected` | `Boolean` |  |
| `github_pr_user_authorization_login` | `Object` |  |
| `github_prs_authored_by_change_author` | `Boolean` |  |
| `id` | `String` |  |
| `impersonation` | `Object` |  |
| `name` | `Object` |  |
| `next_path` | `String` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `Hash` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `Boolean` |  |
| `openai_sign_in_enabled` | `Boolean` |  |
| `organizations` | `Array` |  |
| `pending_organization_invitation_count` | `Integer` |  |
| `pending_organization_invitation_count_label` | `String` |  |
| `picture_url` | `Object` |  |
| `superadmin` | `Boolean` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `Object` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Me record (raises on error).
me = client.Me.load({ "id" => "me_id" })
```


### MeEmail

Create an instance: `me_email = client.MeEmail`

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
| `account` | `Boolean` |  |
| `can_delete` | `Boolean` |  |
| `can_resend_verification` | `Boolean` |  |
| `can_set_account` | `Boolean` |  |
| `can_set_commit_author` | `Boolean` |  |
| `commit_author` | `Boolean` |  |
| `email` | `String` |  |
| `emails` | `Array` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `verification_status` | `String` |  |
| `verified` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of MeEmail entities, one per record (raises on error).
me_emails = client.MeEmail.list
me_emails.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
me_email = client.MeEmail.create({
  "email" => "example_email", # String
})
```


### MeOnboarding

Create an instance: `me_onboarding = client.MeOnboarding`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### MediaFile

Create an instance: `media_file = client.MediaFile`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MediaFile record (raises on error).
media_file = client.MediaFile.load({ "id" => "media_file_id", "browser_session_id" => "browser_session_id", "media_id" => "media_id", "organization_id" => "organization_id" })
```


### Member

Create an instance: `member = client.Member`

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
| `accepted_at` | `Object` |  |
| `accepted_by_user` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `email` | `String` |  |
| `email_delivery_status` | `String` |  |
| `expires_at` | `Object` |  |
| `expires_at_label` | `Object` |  |
| `id` | `String` |  |
| `invite_url` | `Object` |  |
| `invited_by_user` | `Object` |  |
| `is_self` | `Boolean` |  |
| `organization` | `Hash` |  |
| `revoked_at` | `Object` |  |
| `role` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `user` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of Member entities, one per record (raises on error).
members = client.Member.list({ "organization_id" => "example" })
members.each { |item| puts item.data_get }
```


### Memory

Create an instance: `memory = client.Memory`

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
| `confidence` | `String` |  |
| `created_at` | `String` |  |
| `environment_id` | `String` |  |
| `finding` | `String` |  |
| `history` | `Array` |  |
| `id` | `String` |  |
| `indexed_at` | `Object` |  |
| `memory` | `Hash` |  |
| `project_id` | `String` |  |
| `response` | `String` |  |
| `scope` | `Hash` |  |
| `source` | `Hash` |  |
| `tags` | `Array` |  |
| `title` | `String` |  |
| `workaround` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Memory record (raises on error).
memory = client.Memory.load({ "id" => "memory_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Memory entities, one per record (raises on error).
memorys = client.Memory.list({ "organization_id" => "example" })
memorys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
memory = client.Memory.create({
  "organization_id" => "example_organization_id", # String
  "finding" => "example_finding", # String
  "title" => "example_title", # String
})
```


### MergeRequest

Create an instance: `merge_request = client.MergeRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `Array` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `String` |  |
| `branch` | `String` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `Object` |  |
| `current_run` | `Object` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `Boolean` |  |
| `findings` | `Array` |  |
| `github_repository` | `Object` | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` |  |
| `head_sha` | `String` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `number` | `Integer` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `preview_cleanup_ready` | `Boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `Object` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Object` |  |
| `project_id` | `Object` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `Object` |  |
| `provider` | `String` |  |
| `pull_request` | `Hash` |  |
| `repository_id` | `String` |  |
| `request_label` | `String` |  |
| `requested_run_id` | `Object` |  |
| `runs` | `Array` |  |
| `source_branch` | `Object` |  |
| `source_repository` | `Object` |  |
| `source_url` | `Object` |  |
| `state` | `String` |  |
| `title` | `String` |  |
| `updated_at` | `String` |  |
| `web_path` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MergeRequest record (raises on error).
merge_request = client.MergeRequest.load({ "id" => "merge_request_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
merge_request = client.MergeRequest.create({
  "organization_id" => "example_organization_id", # String
  "idempotency_key" => "example_idempotency_key", # String
  "number" => 1, # Integer
})
```


### MessagingConversationMessage

Create an instance: `messaging_conversation_message = client.MessagingConversationMessage`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_limit` | `Integer` |  |
| `attachment_max_bytes` | `Integer` |  |
| `client_operation_id` | `String` |  |
| `content` | `String` |  |
| `id` | `String` |  |
| `media` | `Hash` |  |
| `media_upload_ids` | `Array` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `Array` |  |
| `reply_to` | `String` | Public ID of a visible message |
| `retry_attachment` | `Boolean` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `Object` |  |
| `send_disposition` | `String` |  |
| `send_error` | `Object` |  |
| `send_style` | `Object` |  |

#### Example: Create

```ruby
messaging_conversation_message = client.MessagingConversationMessage.create({
  "messaging_conversation_id" => "example_messaging_conversation_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "client_operation_id" => "example_client_operation_id", # String
  "content" => "example_content", # String
  "media" => {}, # Hash
})
```


### MessagingConversationUpload

Create an instance: `messaging_conversation_upload = client.MessagingConversationUpload`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `Hash` |  |
| `upload_id` | `String` |  |

#### Example: Create

```ruby
messaging_conversation_upload = client.MessagingConversationUpload.create({
  "messaging_conversation_id" => "example_messaging_conversation_id", # String
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```


### MetricQuery

Create an instance: `metric_query = client.MetricQuery`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of MetricQuery entities, one per record (raises on error).
metric_querys = client.MetricQuery.list
metric_querys.each { |item| puts item.data_get }
```


### NetworkConnection

Create an instance: `network_connection = client.NetworkConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_client_vpn_profile` | `String` |  |
| `created_at` | `String` |  |
| `device_tag` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `oauth_client_id` | `String` |  |
| `oauth_client_secret` | `String` |  |
| `provider` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Create

```ruby
network_connection = client.NetworkConnection.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```


### NomadAllocation

Create an instance: `nomad_allocation = client.NomadAllocation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `String` |  |
| `client_status` | `Object` |  |
| `create_time` | `Object` |  |
| `datacenter` | `Object` |  |
| `desired_description` | `Object` |  |
| `desired_status` | `Object` |  |
| `fetched_at` | `String` |  |
| `id` | `String` |  |
| `job_id` | `Object` |  |
| `modify_time` | `Object` |  |
| `name` | `Object` |  |
| `namespace` | `String` |  |
| `node_id` | `Object` |  |
| `node_name` | `Object` |  |
| `resources` | `Hash` |  |
| `task_group` | `Object` |  |
| `task_states` | `Array` |  |
| `verify_runner_images` | `Array` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NomadAllocation record (raises on error).
nomad_allocation = client.NomadAllocation.load({ "id" => "nomad_allocation_id", "app_id" => "app_id" })
```


### NomadLog

Create an instance: `nomad_log = client.NomadLog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `String` |  |
| `environment` | `String` |  |
| `fetched_at` | `String` |  |
| `location` | `Object` |  |
| `logs` | `String` |  |
| `namespace` | `String` |  |
| `offset` | `Integer` |  |
| `origin` | `String` |  |
| `service` | `String` |  |
| `task` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of NomadLog entities, one per record (raises on error).
nomad_logs = client.NomadLog.list({ "app_id" => "example" })
nomad_logs.each { |item| puts item.data_get }
```


### Organization

Create an instance: `organization = client.Organization`

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
| `activated_products` | `Array` | Products this organization has activated (PRD 144). |
| `agents_only` | `Boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `Boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `github_prs_authored_by_change_author` | `Boolean` |  |
| `google_workspace_domain` | `Object` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `String` |  |
| `logo_url` | `Object` |  |
| `member_count` | `Integer` |  |
| `name` | `String` |  |
| `pending_invitation_count` | `Integer` |  |
| `personal` | `Boolean` |  |
| `repository_count` | `Integer` |  |
| `role` | `Object` |  |
| `sandbox_region` | `String` |  |
| `shared_agent_personal_accounts_enabled` | `Boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `String` |  |
| `source_control_providers` | `Array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `Boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `String` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `verify_pr_scenario_writing_enabled` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Organization record (raises on error).
organization = client.Organization.load({ "id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Organization entities, one per record (raises on error).
organizations = client.Organization.list
organizations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
organization = client.Organization.create({
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### Page

Create an instance: `page = client.Page`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `Array` |  |
| `checkout_required` | `Boolean` |  |
| `cli_signed_in_at` | `Object` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `Hash` |  |
| `demo_project` | `Object` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `Array` |  |
| `included_deep_scan` | `Boolean` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `Object` |  |
| `organization` | `Hash` |  |
| `permissions` | `Hash` |  |
| `project` | `Object` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `Array` |  |
| `pull_requests` | `Array` |  |
| `repositories` | `Array` |  |
| `runs` | `Array` |  |
| `runs_pagination` | `Hash` |  |
| `suggested_app_url` | `Object` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `Boolean` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Page record (raises on error).
page = client.Page.load({ "organization_id" => "organization_id" })
```


### PageAgent

Create an instance: `page_agent = client.PageAgent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `Array` |  |
| `can_edit_integration_connections` | `Boolean` |  |
| `creation_enabled` | `Boolean` |  |
| `inbox` | `Object` |  |
| `integration_choices` | `Array` |  |
| `integration_choices_truncated` | `Boolean` |  |
| `integration_selected` | `Array` |  |
| `model_choices` | `Array` |  |
| `new_configuration` | `Object` |  |
| `organization_id` | `String` |  |
| `pagination` | `Hash` |  |
| `pinned_agent` | `Object` |  |
| `platform_event_types` | `Array` |  |
| `repository_choices` | `Array` | Empty compatibility field. |
| `repository_choices_truncated` | `Boolean` |  |
| `runtime_versions` | `Array` | Runtime choices authorized for this organization. |
| `selected_agent` | `Object` |  |
| `selected_reference` | `Object` |  |
| `viewer_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PageAgent entities, one per record (raises on error).
page_agents = client.PageAgent.list({ "organization_id" => "example" })
page_agents.each { |item| puts item.data_get }
```


### PageProjectRun

Create an instance: `page_project_run = client.PageProjectRun`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `Array` |  |
| `fix_scenario_count` | `Integer` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `Array` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `Integer` |  |
| `id` | `String` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `preparation_reason` | `Object` |  |
| `project` | `Hash` |  |
| `run` | `Hash` |  |
| `scenario_runs` | `Array` |  |
| `selected_scenario_run` | `Object` |  |
| `web_path` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PageProjectRun record (raises on error).
page_project_run = client.PageProjectRun.load({ "id" => "page_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```


### PagesProjectCredential

Create an instance: `pages_project_credential = client.PagesProjectCredential`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `Object` |  |
| `composal_address` | `Object` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `Boolean` |  |
| `credential_keys` | `Hash` |  |
| `description` | `Object` |  |
| `email_link_auth_origins` | `Array` |  |
| `has_inbox` | `Boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `String` |  |
| `identity_provider` | `Object` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `Object` |  |
| `login_method` | `String` |  |
| `login_url` | `String` |  |
| `managed` | `Boolean` |  |
| `mfa_enabled` | `Boolean` |  |
| `name` | `String` |  |
| `project_id` | `String` |  |
| `provider_guidance` | `String` |  |
| `sign_in_verified` | `Boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `Object` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `username` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PagesProjectCredential entities, one per record (raises on error).
pages_project_credentials = client.PagesProjectCredential.list({ "organization_id" => "example", "project_id" => "example" })
pages_project_credentials.each { |item| puts item.data_get }
```


### PagesProjectPersona

Create an instance: `pages_project_persona = client.PagesProjectPersona`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_count` | `Integer` |  |
| `credentials` | `Array` |  |
| `needs_attention_count` | `Integer` |  |
| `permissions` | `Hash` |  |
| `persona_states` | `Hash` | Scenarios by the state of their latest execution. |
| `personas` | `Array` |  |
| `project` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of PagesProjectPersona entities, one per record (raises on error).
pages_project_personas = client.PagesProjectPersona.list({ "organization_id" => "example", "project_id" => "example" })
pages_project_personas.each { |item| puts item.data_get }
```


### PagesProjectRun

Create an instance: `pages_project_run = client.PagesProjectRun`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_query` | `String` |  |
| `environments` | `Array` |  |
| `environments_has_more` | `Boolean` |  |
| `pagination` | `Hash` |  |
| `runs` | `Array` |  |
| `selected_environment` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of PagesProjectRun entities, one per record (raises on error).
pages_project_runs = client.PagesProjectRun.list({ "organization_id" => "example", "project_id" => "example" })
pages_project_runs.each { |item| puts item.data_get }
```


### PagesProjectScenario

Create an instance: `pages_project_scenario = client.PagesProjectScenario`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `Object` |  |
| `id` | `String` |  |
| `kind` | `Object` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PagesProjectScenario entities, one per record (raises on error).
pages_project_scenarios = client.PagesProjectScenario.list({ "organization_id" => "example", "project_id" => "example" })
pages_project_scenarios.each { |item| puts item.data_get }
```


### PersonalAccessToken

Create an instance: `personal_access_token = client.PersonalAccessToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PersonalAccessToken entities, one per record (raises on error).
personal_access_tokens = client.PersonalAccessToken.list
personal_access_tokens.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
personal_access_token = client.PersonalAccessToken.create({
})
```


### PreviewOperation

Create an instance: `preview_operation = client.PreviewOperation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of PreviewOperation entities, one per record (raises on error).
preview_operations = client.PreviewOperation.list({ "app_id" => "example", "preview_id" => "example" })
preview_operations.each { |item| puts item.data_get }
```


### PreviewProfileSecretBinding

Create an instance: `preview_profile_secret_binding = client.PreviewProfileSecretBinding`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `secret_id` | `String` |  |
| `secret_version_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PreviewProfileSecretBinding entities, one per record (raises on error).
preview_profile_secret_bindings = client.PreviewProfileSecretBinding.list({ "app_id" => "example", "preview_profile_id" => "example" })
preview_profile_secret_bindings.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
preview_profile_secret_binding = client.PreviewProfileSecretBinding.create({
  "app_id" => "example_app_id", # String
  "preview_profile_id" => "example_preview_profile_id", # String
  "env_key" => "example_env_key", # String
})
```


### PreviewSecret

Create an instance: `preview_secret = client.PreviewSecret`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `slug` | `String` |  |
| `value` | `String` |  |

#### Example: Create

```ruby
preview_secret = client.PreviewSecret.create({
  "app_id" => "example_app_id", # String
  "preview_id" => "example_preview_id", # String
  "env_key" => "example_env_key", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
  "value" => "example_value", # String
})
```


### PreviewSharingApproval

Create an instance: `preview_sharing_approval = client.PreviewSharingApproval`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `Array` |  |
| `approved_build_secrets` | `Array` |  |
| `approved_default_configuration` | `Array` |  |
| `approved_default_secrets` | `Array` |  |
| `approved_source_keys` | `Array` |  |
| `build_keys` | `Array` |  |
| `build_secrets` | `Array` |  |
| `default_configuration` | `Array` |  |
| `default_secrets` | `Array` |  |
| `services` | `Array` |  |
| `snapshot_version` | `Integer` |  |
| `source_keys` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of PreviewSharingApproval entities, one per record (raises on error).
preview_sharing_approvals = client.PreviewSharingApproval.list({ "app_id" => "example", "preview_id" => "example" })
preview_sharing_approvals.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
preview_sharing_approval = client.PreviewSharingApproval.create({
  "app_id" => "example_app_id", # String
  "preview_id" => "example_preview_id", # String
  "snapshot_version" => 1, # Integer
})
```


### ProductMapIdentityDecision

Create an instance: `product_map_identity_decision = client.ProductMapIdentityDecision`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `Array` |  |
| `operation` | `String` |  |
| `reason` | `String` |  |
| `target` | `Hash` |  |

#### Example: Create

```ruby
product_map_identity_decision = client.ProductMapIdentityDecision.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "observations" => [], # Array
  "operation" => "example_operation", # String
  "reason" => "example_reason", # String
  "target" => {}, # Hash
})
```


### ProductMapJourney

Create an instance: `product_map_journey = client.ProductMapJourney`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `Object` |  |
| `goal` | `String` |  |
| `id` | `String` |  |
| `journey` | `Hash` |  |
| `next_cursor` | `Object` |  |
| `preview` | `Object` |  |
| `scope` | `Hash` |  |
| `title` | `String` |  |
| `tree` | `Hash` |  |
| `tree_loaded` | `Boolean` |  |
| `variant_count` | `Integer` |  |
| `variants` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProductMapJourney record (raises on error).
product_map_journey = client.ProductMapJourney.load({ "id" => "product_map_journey_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProductMapJourney entities, one per record (raises on error).
product_map_journeys = client.ProductMapJourney.list({ "organization_id" => "example", "project_id" => "example" })
product_map_journeys.each { |item| puts item.data_get }
```


### ProductMapJourneyReplay

Create an instance: `product_map_journey_replay = client.ProductMapJourneyReplay`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `Object` |  |
| `can_request_qualification` | `Boolean` |  |
| `created_at` | `String` |  |
| `failure_code` | `Object` |  |
| `failure_message` | `Object` |  |
| `id` | `String` |  |
| `preparation_receipt` | `Object` |  |
| `qualification` | `Object` |  |
| `qualification_status` | `String` |  |
| `replay_required` | `Boolean` |  |
| `review_reason` | `String` |  |
| `run_id` | `Object` |  |
| `scenario_run_id` | `Object` |  |
| `source_digest` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `variant_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProductMapJourneyReplay record (raises on error).
product_map_journey_replay = client.ProductMapJourneyReplay.load({ "id" => "product_map_journey_replay_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```


### ProductMapObservation

Create an instance: `product_map_observation = client.ProductMapObservation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `Hash` |  |
| `events` | `Array` |  |
| `evidence_id` | `String` |  |
| `id` | `String` |  |
| `observation_id` | `String` |  |
| `scope` | `Hash` |  |
| `state` | `Object` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProductMapObservation record (raises on error).
product_map_observation = client.ProductMapObservation.load({ "id" => "product_map_observation_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```


### ProductMapQuestion

Create an instance: `product_map_question = client.ProductMapQuestion`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `String` |  |
| `area` | `String` |  |
| `before` | `String` |  |
| `claims` | `Array` |  |
| `evidence_truncated` | `Boolean` |  |
| `model` | `String` |  |
| `persona_id` | `String` |  |
| `query` | `String` |  |
| `question` | `String` |  |
| `reasoning_effort` | `String` |  |
| `revision_id` | `String` |  |
| `scope` | `Hash` |  |
| `since` | `String` |  |
| `state_id` | `String` |  |
| `status` | `String` |  |
| `unknowns` | `Array` |  |

#### Example: Create

```ruby
product_map_question = client.ProductMapQuestion.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "question" => "example_question", # String
})
```


### ProductMapState

Create an instance: `product_map_state = client.ProductMapState`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `attempts` | `Array` |  |
| `captured_at` | `String` |  |
| `id` | `String` |  |
| `incoming` | `Array` |  |
| `labels` | `Hash` |  |
| `layout` | `Hash` |  |
| `observation_id` | `String` |  |
| `omitted_controls` | `Integer` |  |
| `outgoing` | `Array` |  |
| `revision_id` | `String` |  |
| `scope` | `Hash` |  |
| `screenshot_url` | `Object` |  |
| `state` | `Hash` |  |
| `truncated` | `Boolean` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProductMapState record (raises on error).
product_map_state = client.ProductMapState.load({ "id" => "product_map_state_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProductMapState entities, one per record (raises on error).
product_map_states = client.ProductMapState.list({ "organization_id" => "example", "project_id" => "example" })
product_map_states.each { |item| puts item.data_get }
```


### Project

Create an instance: `project = client.Project`

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
| `archived_at` | `Object` |  |
| `context` | `Object` |  |
| `created_at` | `String` |  |
| `credentials` | `Array` |  |
| `demo` | `Boolean` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `Array` |  |
| `environments` | `Array` |  |
| `execution_mode` | `String` |  |
| `icon_url` | `Object` |  |
| `id` | `String` |  |
| `identity_provider` | `Hash` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `network_connections` | `Array` |  |
| `organization_id` | `String` |  |
| `overview` | `Hash` |  |
| `permissions` | `Hash` |  |
| `personas` | `Array` |  |
| `project` | `Hash` |  |
| `pull_request_options` | `Hash` |  |
| `pull_requests` | `Array` |  |
| `purpose` | `Object` |  |
| `runs` | `Array` |  |
| `scenario_history` | `Hash` |  |
| `scenario_states` | `Hash` | Scenarios by the state of their latest execution. |
| `scenarios` | `Array` |  |
| `setup_required` | `Boolean` |  |
| `slug` | `String` |  |
| `updated_at` | `String` |  |
| `verifier_preferences` | `Hash` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `Integer` |  |
| `website_url` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Project record (raises on error).
project = client.Project.load({ "id" => "project_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Project entities, one per record (raises on error).
projects = client.Project.list({ "organization_id" => "example" })
projects.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project = client.Project.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
})
```


### ProjectAndroidApk

Create an instance: `project_android_apk = client.ProjectAndroidApk`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `Hash` |  |
| `artifact_paths` | `Array` |  |
| `description` | `String` |  |
| `image` | `String` |  |
| `ios` | `Hash` |  |
| `launch_command` | `String` |  |
| `managed_binary` | `Hash` |  |
| `platform` | `String` |  |
| `provider` | `String` |  |
| `setup_command` | `String` |  |

#### Example: Create

```ruby
project_android_apk = client.ProjectAndroidApk.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```


### ProjectCodeMap

Create an instance: `project_code_map = client.ProjectCodeMap`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_scan` | `Boolean` |  |
| `commit_sha` | `String` |  |
| `configured` | `Boolean` |  |
| `error_code` | `Object` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `ref` | `String` |  |
| `repository_id` | `String` |  |
| `revision` | `Hash` |  |
| `slug` | `String` |  |
| `status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ProjectCodeMap entities, one per record (raises on error).
project_code_maps = client.ProjectCodeMap.list({ "organization_id" => "example", "project_id" => "example" })
project_code_maps.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project_code_map = client.ProjectCodeMap.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "repository_id" => "example_repository_id", # String
})
```


### ProjectEnvironment

Create an instance: `project_environment = client.ProjectEnvironment`

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
| `allowed_actions` | `String` |  |
| `allowed_origins` | `Array` |  |
| `archived_at` | `Object` |  |
| `base_url` | `Object` |  |
| `base_url_changeable` | `Boolean` | Whether an update may send a new base_url. |
| `binary` | `String` |  |
| `conversation_only_messaging` | `Boolean` |  |
| `created_at` | `String` |  |
| `desktop` | `Object` |  |
| `execution_mode` | `String` |  |
| `id` | `String` |  |
| `imessage_number` | `Object` | International destination number; blank or null clears it on an added environment. |
| `kind` | `String` |  |
| `lock_version` | `Integer` |  |
| `messaging_conversation` | `Object` |  |
| `messaging_problem` | `Object` |  |
| `messaging_source` | `Object` |  |
| `messaging_tester_number` | `Object` | One configured tester number. |
| `name` | `String` |  |
| `project_id` | `String` |  |
| `pull_request` | `Object` |  |
| `source_branch` | `Object` |  |
| `updated_at` | `String` |  |
| `verify_network_connection_id` | `Object` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectEnvironment record (raises on error).
project_environment = client.ProjectEnvironment.load({ "id" => "project_environment_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProjectEnvironment entities, one per record (raises on error).
project_environments = client.ProjectEnvironment.list({ "organization_id" => "example", "project_id" => "example" })
project_environments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project_environment = client.ProjectEnvironment.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
})
```


### ProjectFinding

Create an instance: `project_finding = client.ProjectFinding`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `Object` |  |
| `environment_name` | `String` |  |
| `id` | `String` |  |
| `last_seen_at` | `String` |  |
| `locked` | `Boolean` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `String` |  |
| `source` | `String` | The workflow that produced the finding |
| `source_title` | `String` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `String` |  |
| `title` | `String` |  |
| `verification` | `Object` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `String` | Where the finding is reviewed within its source |

#### Example: List

```ruby
# list returns an Array of ProjectFinding entities, one per record (raises on error).
project_findings = client.ProjectFinding.list({ "organization_id" => "example", "project_id" => "example" })
project_findings.each { |item| puts item.data_get }
```


### ProjectFixture

Create an instance: `project_fixture = client.ProjectFixture`

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
| `assignments` | `Array` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `Integer` |  |
| `content_type` | `String` |  |
| `credential_ids` | `Array` |  |
| `credentials` | `Array` |  |
| `environment_ids` | `Array` |  |
| `environments` | `Array` |  |
| `fixtures` | `Array` |  |
| `id` | `String` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `persona_ids` | `Array` |  |
| `personas` | `Array` |  |
| `project` | `Hash` |  |
| `sha256` | `String` |  |
| `url` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectFixture record (raises on error).
project_fixture = client.ProjectFixture.load({ "id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProjectFixture entities, one per record (raises on error).
project_fixtures = client.ProjectFixture.list({ "organization_id" => "example", "project_id" => "example" })
project_fixtures.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project_fixture = client.ProjectFixture.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```


### ProjectIosApp

Create an instance: `project_ios_app = client.ProjectIosApp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `Hash` |  |
| `artifact_paths` | `Array` |  |
| `description` | `String` |  |
| `image` | `String` |  |
| `ios` | `Hash` |  |
| `launch_command` | `String` |  |
| `managed_binary` | `Hash` |  |
| `platform` | `String` |  |
| `provider` | `String` |  |
| `setup_command` | `String` |  |

#### Example: Create

```ruby
project_ios_app = client.ProjectIosApp.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```


### ProjectMessagingConversation

Create an instance: `project_messaging_conversation = client.ProjectMessagingConversation`

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
| `assistant_number` | `String` |  |
| `attachment_limit` | `Integer` |  |
| `attachment_max_bytes` | `Integer` |  |
| `environment_name` | `String` |  |
| `id` | `String` |  |
| `leased` | `Boolean` |  |
| `messages` | `Array` |  |
| `reconciled_at` | `Object` |  |
| `retirable` | `Boolean` |  |
| `seeded` | `Boolean` |  |
| `send_blocked_reason` | `Object` |  |
| `send_disposition` | `String` |  |
| `send_error` | `Object` |  |
| `tester_number` | `String` |  |
| `unknown_send` | `Boolean` |  |
| `verify_environment_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectMessagingConversation record (raises on error).
project_messaging_conversation = client.ProjectMessagingConversation.load({ "id" => "project_messaging_conversation_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: Create

```ruby
project_messaging_conversation = client.ProjectMessagingConversation.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "assistant_number" => "example_assistant_number", # String
  "tester_number" => "example_tester_number", # String
  "verify_environment_id" => "example_verify_environment_id", # String
})
```


### ProjectOverviewMetric

Create an instance: `project_overview_metric = client.ProjectOverviewMetric`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of ProjectOverviewMetric entities, one per record (raises on error).
project_overview_metrics = client.ProjectOverviewMetric.list({ "organization_id" => "example", "project_id" => "example" })
project_overview_metrics.each { |item| puts item.data_get }
```


### ProjectOverviewPullRequest

Create an instance: `project_overview_pull_request = client.ProjectOverviewPullRequest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `String` |  |
| `can_verify` | `Boolean` |  |
| `comment_url` | `Object` |  |
| `draft` | `Boolean` |  |
| `github_repository` | `Object` | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` |  |
| `head_sha` | `String` |  |
| `id` | `String` |  |
| `latest_created_at` | `Object` |  |
| `latest_current` | `Boolean` |  |
| `latest_head_sha` | `Object` |  |
| `latest_reason` | `Object` |  |
| `latest_run_id` | `Object` |  |
| `latest_state` | `Object` |  |
| `number` | `Integer` |  |
| `project_id` | `Object` |  |
| `project_slug` | `Object` |  |
| `provider` | `String` |  |
| `repository_id` | `String` |  |
| `request_label` | `String` |  |
| `source_branch` | `Object` |  |
| `source_repository` | `Object` |  |
| `source_url` | `Object` |  |
| `state` | `String` |  |
| `title` | `String` |  |
| `updated_at` | `String` |  |
| `web_path` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ProjectOverviewPullRequest entities, one per record (raises on error).
project_overview_pull_requests = client.ProjectOverviewPullRequest.list({ "organization_id" => "example", "project_id" => "example" })
project_overview_pull_requests.each { |item| puts item.data_get }
```


### ProjectProductMap

Create an instance: `project_product_map = client.ProjectProductMap`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectRecording

Create an instance: `project_recording = client.ProjectRecording`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `Hash` |  |
| `created_at` | `String` |  |
| `draft` | `Object` | Present once drafted. |
| `environment_id` | `String` | The project environment the browser opens. |
| `error` | `Object` |  |
| `event_count` | `Integer` |  |
| `id` | `String` |  |
| `persona_id` | `String` | The project persona the journey acts as. |
| `phase` | `String` | What the owner can do now. |
| `signed_in_during_recording` | `Boolean` |  |
| `start_path` | `String` | A path on the environment to start at, such as /settings. |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectRecording record (raises on error).
project_recording = client.ProjectRecording.load({ "id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: Create

```ruby
project_recording = client.ProjectRecording.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "environment_id" => "example_environment_id", # String
  "persona_id" => "example_persona_id", # String
})
```


### ProjectRunPlan

Create an instance: `project_run_plan = client.ProjectRunPlan`

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
| `archived_at` | `Object` |  |
| `base_url` | `Object` |  |
| `created_at` | `String` |  |
| `dependencies` | `Array` |  |
| `id` | `String` |  |
| `identity_probe` | `Object` |  |
| `kind` | `Object` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `nodes` | `Array` |  |
| `preview` | `Object` |  |
| `project_id` | `String` |  |
| `updated_at` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectRunPlan record (raises on error).
project_run_plan = client.ProjectRunPlan.load({ "id" => "project_run_plan_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProjectRunPlan entities, one per record (raises on error).
project_run_plans = client.ProjectRunPlan.list({ "organization_id" => "example", "project_id" => "example" })
project_run_plans.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project_run_plan = client.ProjectRunPlan.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "dependencies" => [], # Array
  "identity_probe" => {}, # Object
  "name" => "example_name", # String
  "nodes" => [], # Array
})
```


### ProjectRunSchedule

Create an instance: `project_run_schedule = client.ProjectRunSchedule`

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
| `credential_ids` | `Hash` |  |
| `cron_expression` | `Object` |  |
| `environment_id` | `String` | Project environment slug or public ID. |
| `environment_name` | `String` |  |
| `history` | `Array` |  |
| `id` | `String` |  |
| `labels` | `Array` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `next_run_at` | `String` |  |
| `notification_channel` | `String` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `Integer` |  |
| `selection_mode` | `String` |  |
| `slack_subscription_id` | `Object` |  |
| `source_scenario_id` | `Object` |  |
| `state` | `String` |  |
| `time_of_day` | `String` |  |
| `time_zone` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectRunSchedule record (raises on error).
project_run_schedule = client.ProjectRunSchedule.load({ "id" => "project_run_schedule_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of ProjectRunSchedule entities, one per record (raises on error).
project_run_schedules = client.ProjectRunSchedule.list({ "organization_id" => "example", "project_id" => "example" })
project_run_schedules.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
project_run_schedule = client.ProjectRunSchedule.create({
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


### ProjectScenarioOption

Create an instance: `project_scenario_option = client.ProjectScenarioOption`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `Array` |  |
| `permissions` | `Hash` |  |
| `personas` | `Array` |  |
| `project` | `Hash` |  |
| `scenario_states` | `Hash` | Scenarios by the state of their latest execution. |
| `scenarios` | `Array` |  |
| `schedule_options` | `Object` |  |
| `schedules` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of ProjectScenarioOption entities, one per record (raises on error).
project_scenario_options = client.ProjectScenarioOption.list({ "organization_id" => "example", "project_id" => "example" })
project_scenario_options.each { |item| puts item.data_get }
```


### ProjectScenarioRow

Create an instance: `project_scenario_row = client.ProjectScenarioRow`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `Integer` |  |
| `dependency_count` | `Integer` |  |
| `health` | `Hash` |  |
| `id` | `String` |  |
| `labels` | `Array` |  |
| `name` | `String` |  |
| `persona_id` | `String` |  |
| `selectable_for_run` | `Boolean` |  |
| `step_count` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of ProjectScenarioRow entities, one per record (raises on error).
project_scenario_rows = client.ProjectScenarioRow.list({ "organization_id" => "example", "project_id" => "example" })
project_scenario_rows.each { |item| puts item.data_get }
```


### ProjectSetting

Create an instance: `project_setting = client.ProjectSetting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `Array` |  |
| `messaging_conversations` | `Array` |  |
| `messaging_enabled` | `Boolean` |  |
| `permissions` | `Hash` |  |
| `project` | `Hash` |  |
| `tester_numbers` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of ProjectSetting entities, one per record (raises on error).
project_settings = client.ProjectSetting.list({ "organization_id" => "example", "project_id" => "example" })
project_settings.each { |item| puts item.data_get }
```


### PullRequest

Create an instance: `pull_request = client.PullRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `Array` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `String` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `Boolean` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `Object` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `Array` |  |
| `head_sha` | `String` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `imessage_number` | `String` | International destination of this exact deployed commit. |
| `number` | `Integer` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `preview_cleanup_ready` | `Boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `Object` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Object` |  |
| `project_id` | `String` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `Hash` |  |
| `repository_id` | `String` |  |
| `runs` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PullRequest record (raises on error).
pull_request = client.PullRequest.load({ "id" => "pull_request_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
pull_request = client.PullRequest.create({
  "organization_id" => "example_organization_id", # String
  "idempotency_key" => "example_idempotency_key", # String
})
```


### PullRequestSetting

Create an instance: `pull_request_setting = client.PullRequestSetting`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `bots` | `Array` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `Boolean` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `Object` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `Integer` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `Object` |  |
| `demo_videos` | `Boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `Boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `Object` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `String` |  |
| `enabled` | `Boolean` | Test PRs automatically. |
| `environment` | `String` | The environment whose test accounts sign in to the previews. |
| `environments` | `Array` |  |
| `github_check_enabled` | `Boolean` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `Array` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `String` |  |
| `imessage_comment_prefix` | `Object` |  |
| `imessage_number` | `Object` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `String` |  |
| `limits` | `Hash` |  |
| `link_pattern` | `Object` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `Object` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `Integer` |  |
| `messaging_enabled` | `Boolean` |  |
| `messaging_tester_number` | `Object` | One configured tester number. |
| `non_product_paths` | `Array` |  |
| `permissions` | `Hash` |  |
| `pr_check` | `Boolean` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `String` |  |
| `preview_comment_authors` | `Array` |  |
| `preview_comment_pattern` | `String` |  |
| `preview_comment_wildcard` | `Object` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `Object` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `Array` |  |
| `previews` | `String` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `String` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `Array` |  |
| `provider` | `String` |  |
| `repositories` | `Array` |  |
| `repository` | `String` | Repository ID; see repositories for its name. |
| `repository_id` | `String` |  |
| `repository_kind` | `String` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `Object` |  |
| `service` | `Object` | composal: the public service the browsers open. |
| `settings` | `Array` |  |
| `setup` | `Object` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `Hash` | The answers a new setup starts from |
| `source_repository` | `String` |  |
| `target_mode` | `String` |  |
| `tester_numbers` | `Array` |  |
| `trigger_label` | `String` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `Boolean` |  |
| `trigger_on_label` | `Boolean` |  |
| `trigger_on_push` | `Boolean` |  |
| `trigger_on_ready` | `Boolean` |  |
| `triggers` | `Hash` | When runs start. |
| `verify_environment_id` | `String` |  |
| `write_scenarios` | `Boolean` | Draft and validate focused scenarios for each change on its preview. |

#### Example: List

```ruby
# list returns an Array of PullRequestSetting entities, one per record (raises on error).
pull_request_settings = client.PullRequestSetting.list({ "organization_id" => "example" })
pull_request_settings.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
pull_request_setting = client.PullRequestSetting.create({
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


### PullRequestSettingAddRepository

Create an instance: `pull_request_setting_add_repository = client.PullRequestSettingAddRepository`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `String` |  |
| `replace` | `Boolean` | Make these the project's only repositories. |
| `repositories` | `Array` |  |

#### Example: Create

```ruby
pull_request_setting_add_repository = client.PullRequestSettingAddRepository.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "repositories" => [], # Array
})
```


### PullRequestSettingDetectComment

Create an instance: `pull_request_setting_detect_comment = client.PullRequestSettingDetectComment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `Array` | The bots answer |
| `deployment` | `String` | The deployment answer |
| `example_url` | `String` |  |
| `imessage_comment_prefix` | `String` |  |
| `imessage_number` | `Object` | International destination number; blank or null clears it on an added environment. |
| `kind` | `String` |  |
| `link_pattern` | `String` | The link_pattern answer |
| `project_id` | `String` | Project slug or ID. |
| `provider` | `String` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `String` | Repository slug, ID or owner/name. |
| `request_number` | `Integer` |  |

#### Example: Create

```ruby
pull_request_setting_detect_comment = client.PullRequestSettingDetectComment.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
})
```


### Recorder

Create an instance: `recorder = client.Recorder`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `name` | `String` |  |
| `slug` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Recorder record (raises on error).
recorder = client.Recorder.load({ "organization_id" => "organization_id" })
```


### Registry

Create an instance: `registry = client.Registry`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### RegistryV2

Create an instance: `registry_v2 = client.RegistryV2`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RelayAgentLocalThread

Create an instance: `relay_agent_local_thread = client.RelayAgentLocalThread`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### ReportReplay

Create an instance: `report_replay = client.ReportReplay`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `String` |  |
| `generated_at` | `String` |  |
| `id` | `String` |  |
| `recording` | `Hash` |  |
| `replay_steps` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ReportReplay record (raises on error).
report_replay = client.ReportReplay.load({ "id" => "report_replay_id", "exploration_id" => "exploration_id", "organization_id" => "organization_id" })
```


### ReportScenario

Create an instance: `report_scenario = client.ReportScenario`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_name` | `String` |  |
| `goal` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `permissions` | `Hash` |  |
| `project_id` | `Object` |  |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `saves_scenarios` | `Boolean` |  |
| `scenario_generation` | `Hash` |  |
| `status` | `String` |  |

#### Example: Create

```ruby
report_scenario = client.ReportScenario.create({
  "exploration_id" => "example_exploration_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### RunScenarioRun

Create an instance: `run_scenario_run = client.RunScenarioRun`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### RunScheduleOption

Create an instance: `run_schedule_option = client.RunScheduleOption`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of RunScheduleOption entities, one per record (raises on error).
run_schedule_options = client.RunScheduleOption.list({ "organization_id" => "example", "project_id" => "example" })
run_schedule_options.each { |item| puts item.data_get }
```


### RunSearch

Create an instance: `run_search = client.RunSearch`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RunSearch record (raises on error).
run_search = client.RunSearch.load({ "organization_id" => "organization_id" })
```


### RunUpdate

Create an instance: `run_update = client.RunUpdate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `String` |  |
| `can_verify` | `Boolean` |  |
| `comment_url` | `Object` |  |
| `draft` | `Boolean` |  |
| `github_repository` | `Object` | GitHub owner/repository associated with this pull request. |
| `github_url` | `Object` |  |
| `head_sha` | `String` |  |
| `id` | `String` |  |
| `latest_created_at` | `Object` |  |
| `latest_current` | `Boolean` |  |
| `latest_head_sha` | `Object` |  |
| `latest_reason` | `Object` |  |
| `latest_run_id` | `Object` |  |
| `latest_state` | `Object` |  |
| `number` | `Integer` |  |
| `project_id` | `Object` |  |
| `project_slug` | `Object` |  |
| `provider` | `String` |  |
| `repository_id` | `String` |  |
| `request_label` | `String` |  |
| `source_branch` | `Object` |  |
| `source_repository` | `Object` |  |
| `source_url` | `Object` |  |
| `state` | `String` |  |
| `title` | `String` |  |
| `updated_at` | `String` |  |
| `web_path` | `String` |  |

#### Example: List

```ruby
# list returns an Array of RunUpdate entities, one per record (raises on error).
run_updates = client.RunUpdate.list({ "organization_id" => "example" })
run_updates.each { |item| puts item.data_get }
```


### ScenarioRevision

Create an instance: `scenario_revision = client.ScenarioRevision`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `batch` | `String` | Shared by every revision one request or job saved. |
| `created_at` | `String` |  |
| `definition` | `Hash` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `String` |  |
| `source` | `String` | The client the save came through. |
| `user` | `Object` | Null when a system job saved the Scenario. |
| `version` | `Integer` | The Scenario's lock_version after this save. |

#### Example: List

```ruby
# list returns an Array of ScenarioRevision entities, one per record (raises on error).
scenario_revisions = client.ScenarioRevision.list({ "organization_id" => "example", "project_id" => "example", "scenario_id" => "example" })
scenario_revisions.each { |item| puts item.data_get }
```


### ScenarioRunLesson

Create an instance: `scenario_run_lesson = client.ScenarioRunLesson`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding` | `String` |  |
| `title` | `String` | Defaults to the Scenario's name. |
| `workaround` | `String` |  |

#### Example: Create

```ruby
scenario_run_lesson = client.ScenarioRunLesson.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "run_id" => "example_run_id", # String
  "scenario_run_id" => "example_scenario_run_id", # String
  "finding" => "example_finding", # String
  "workaround" => "example_workaround", # String
})
```


### ScenarioRunScenarioEdit

Create an instance: `scenario_run_scenario_edit = client.ScenarioRunScenarioEdit`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ServiceEndpoint

Create an instance: `service_endpoint = client.ServiceEndpoint`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ServiceEndpoint record (raises on error).
service_endpoint = client.ServiceEndpoint.load({ "id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id" })
```

#### Example: List

```ruby
# list returns an Array of ServiceEndpoint entities, one per record (raises on error).
service_endpoints = client.ServiceEndpoint.list({ "app_id" => "example", "service_id" => "example" })
service_endpoints.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
service_endpoint = client.ServiceEndpoint.create({
  "app_id" => "example_app_id", # String
  "service_id" => "example_service_id", # String
})
```


### SitePreview

Create an instance: `site_preview = client.SitePreview`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `Object` | The site's icon as a data: URL, up to 256 KB |
| `title` | `Object` |  |
| `url` | `String` | The address as it will be saved |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SitePreview record (raises on error).
site_preview = client.SitePreview.load({ "organization_id" => "organization_id", "url" => "url" })
```


### SlackChannel

Create an instance: `slack_channel = client.SlackChannel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `is_member` | `Boolean` |  |
| `is_private` | `Boolean` |  |
| `is_slack_connect` | `Boolean` |  |
| `name` | `String` |  |
| `published` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of SlackChannel entities, one per record (raises on error).
slack_channels = client.SlackChannel.list({ "agent_id" => "example", "organization_id" => "example" })
slack_channels.each { |item| puts item.data_get }
```


### SparkAgentLocalThread

Create an instance: `spark_agent_local_thread = client.SparkAgentLocalThread`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `archived` | `Boolean` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `Boolean` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `Boolean` |  |
| `can_end` | `Boolean` |  |
| `can_interrupt` | `Boolean` |  |
| `can_send` | `Boolean` |  |
| `created_at` | `String` |  |
| `delivery` | `Hash` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `String` |  |
| `device_name` | `String` |  |
| `diagnostic_code` | `String` | Approved product error code retained after copied diagnostics expire. |
| `end` | `Object` |  |
| `expires_at` | `String` |  |
| `full_title` | `String` | The native name or first prompt in full, for a tooltip. |
| `id` | `String` |  |
| `key` | `String` |  |
| `last_activity_at` | `Object` |  |
| `native_thread_id` | `String` |  |
| `parent_conversation_id` | `Object` |  |
| `provider` | `String` |  |
| `references` | `Hash` |  |
| `relay_disconnected_at` | `Object` |  |
| `relay_participant` | `Hash` |  |
| `result` | `Object` |  |
| `result_expired` | `Boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `Object` |  |
| `section` | `String` | Server-assigned section in the ordered computer thread directory. |
| `state` | `String` |  |
| `status` | `Object` | What the native thread is doing. |
| `task_configured` | `Boolean` |  |
| `thread_id` | `String` |  |
| `title` | `String` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SparkAgentLocalThread record (raises on error).
spark_agent_local_thread = client.SparkAgentLocalThread.load({ "id" => "spark_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
spark_agent_local_thread = client.SparkAgentLocalThread.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "device_id" => "example_device_id", # String
  "key" => "example_key", # String
  "provider" => "example_provider", # String
  "thread_id" => "example_thread_id", # String
})
```


### StaticSite

Create an instance: `static_site = client.StaticSite`

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
| `active_deployment_id` | `Object` |  |
| `cdn_hostname` | `String` |  |
| `cdn_url` | `String` |  |
| `cname_target` | `String` |  |
| `created_at` | `String` |  |
| `default_url` | `String` |  |
| `description` | `Object` |  |
| `error_document` | `Object` |  |
| `failure_message` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `index_document` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `provisioned` | `Boolean` |  |
| `provisioned_at` | `Object` |  |
| `region` | `Object` |  |
| `replication_regions` | `Array` |  |
| `repository_id` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StaticSite record (raises on error).
static_site = client.StaticSite.load({ "id" => "static_site_id" })
```

#### Example: List

```ruby
# list returns an Array of StaticSite entities, one per record (raises on error).
static_sites = client.StaticSite.list({ "organization_id" => "example" })
static_sites.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
static_site = client.StaticSite.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### StaticSiteDeployment

Create an instance: `static_site_deployment = client.StaticSiteDeployment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `Object` |  |
| `activated_at_label` | `Object` |  |
| `commit_sha` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `creator_user_id` | `Object` |  |
| `deploy_slug` | `String` |  |
| `failure_message` | `Object` |  |
| `file_count` | `Integer` |  |
| `file_count_label` | `String` |  |
| `finished_at` | `Object` |  |
| `finished_at_label` | `Object` |  |
| `id` | `String` |  |
| `is_active` | `Boolean` |  |
| `source_ref` | `Object` |  |
| `started_at` | `Object` |  |
| `started_at_label` | `Object` |  |
| `static_site_id` | `String` |  |
| `status` | `String` |  |
| `total_bytes` | `Integer` |  |
| `total_bytes_label` | `String` |  |
| `trigger_kind` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `uploaded_at` | `Object` |  |
| `uploaded_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StaticSiteDeployment record (raises on error).
static_site_deployment = client.StaticSiteDeployment.load({ "id" => "static_site_deployment_id", "static_site_id" => "static_site_id" })
```

#### Example: List

```ruby
# list returns an Array of StaticSiteDeployment entities, one per record (raises on error).
static_site_deployments = client.StaticSiteDeployment.list({ "static_site_id" => "example" })
static_site_deployments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
static_site_deployment = client.StaticSiteDeployment.create({
  "static_site_id" => "example_static_site_id", # String
})
```


### StaticSiteDomain

Create an instance: `static_site_domain = client.StaticSiteDomain`

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
| `app_environment_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `created_at` | `String` |  |
| `dns_mode` | `String` |  |
| `dns_status` | `String` |  |
| `failure_message` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `hostname` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `last_checked_at` | `Object` |  |
| `record_name` | `Object` |  |
| `record_type` | `Object` |  |
| `record_value` | `Object` |  |
| `redirect_to` | `Object` |  |
| `static_site_id` | `Object` |  |
| `target_kind` | `String` |  |
| `tls_status` | `String` |  |
| `updated_at` | `String` |  |
| `verification_status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StaticSiteDomain record (raises on error).
static_site_domain = client.StaticSiteDomain.load({ "id" => "static_site_domain_id", "static_site_id" => "static_site_id" })
```

#### Example: List

```ruby
# list returns an Array of StaticSiteDomain entities, one per record (raises on error).
static_site_domains = client.StaticSiteDomain.list({ "static_site_id" => "example" })
static_site_domains.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
static_site_domain = client.StaticSiteDomain.create({
  "static_site_id" => "example_static_site_id", # String
  "hostname" => "example_hostname", # String
})
```


### SubscriptionModel

Create an instance: `subscription_model = client.SubscriptionModel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_reasoning` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `provider` | `String` |  |
| `reasoning` | `Array` | Effort levels this plan model accepts. |
| `speeds` | `Array` | Speed modes advertised by this connected account and model. |

#### Example: List

```ruby
# list returns an Array of SubscriptionModel entities, one per record (raises on error).
subscription_models = client.SubscriptionModel.list({ "agent_id" => "example", "organization_id" => "example", "profile_id" => "example" })
subscription_models.each { |item| puts item.data_get }
```


### ThreadPreview

Create an instance: `thread_preview = client.ThreadPreview`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `Object` |  |
| `port` | `Integer` |  |
| `url` | `String` |  |

#### Example: Create

```ruby
thread_preview = client.ThreadPreview.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "thread_id" => "example_thread_id", # String
  "port" => 1, # Integer
})
```


### VerificationProjectCredential

Create an instance: `verification_project_credential = client.VerificationProjectCredential`

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
| `browser_authentication` | `Object` |  |
| `browser_session` | `String` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `Object` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `Boolean` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `String` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `Boolean` | Select the Composal-managed Google test account when available. |
| `configured` | `Boolean` |  |
| `cookies` | `String` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `Hash` |  |
| `description` | `Object` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `Array` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `Boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `String` |  |
| `identity_provider` | `Object` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `Object` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `String` |  |
| `login_url` | `String` | Optional sign-in path or URL. |
| `managed` | `Boolean` |  |
| `mfa_enabled` | `Boolean` |  |
| `name` | `String` |  |
| `oidc` | `Hash` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `String` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `String` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `String` |  |
| `provider_guidance` | `String` |  |
| `remove_browser_authentication` | `Boolean` |  |
| `remove_totp` | `Boolean` |  |
| `sign_in_verified` | `Boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `Object` |  |
| `status` | `String` |  |
| `totp_secret` | `String` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `String` |  |
| `username` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerificationProjectCredential record (raises on error).
verification_project_credential = client.VerificationProjectCredential.load({ "id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of VerificationProjectCredential entities, one per record (raises on error).
verification_project_credentials = client.VerificationProjectCredential.list({ "organization_id" => "example", "project_id" => "example" })
verification_project_credentials.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
verification_project_credential = client.VerificationProjectCredential.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "login_method" => "example_login_method", # String
  "name" => "example_name", # String
})
```


### VerificationProjectPersona

Create an instance: `verification_project_persona = client.VerificationProjectPersona`

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
| `access_mode` | `String` |  |
| `archived_at` | `Object` |  |
| `capabilities` | `Object` |  |
| `created_at` | `String` |  |
| `credential_id` | `Object` | The credential this persona signs in with. |
| `goals` | `Object` |  |
| `id` | `String` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `project_id` | `String` |  |
| `role` | `String` |  |
| `updated_at` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerificationProjectPersona record (raises on error).
verification_project_persona = client.VerificationProjectPersona.load({ "id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of VerificationProjectPersona entities, one per record (raises on error).
verification_project_personas = client.VerificationProjectPersona.list({ "organization_id" => "example", "project_id" => "example" })
verification_project_personas.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
verification_project_persona = client.VerificationProjectPersona.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
  "role" => "example_role", # String
})
```


### VerificationProjectRun

Create an instance: `verification_project_run = client.VerificationProjectRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `Object` |  |
| `approved_digest` | `Object` |  |
| `archived_at` | `Object` |  |
| `available_tests` | `Array` |  |
| `can_archive` | `Boolean` |  |
| `can_restore` | `Boolean` |  |
| `can_start_another_run` | `Boolean` |  |
| `cleanup_state` | `String` |  |
| `concurrency` | `Integer` |  |
| `created_at` | `String` |  |
| `creator_name` | `Object` |  |
| `definition_mode` | `String` |  |
| `environment_id` | `Object` |  |
| `id` | `String` |  |
| `lock_version` | `Integer` |  |
| `max_seconds` | `Integer` |  |
| `outcome` | `Object` |  |
| `permissions` | `Hash` |  |
| `plan_digest` | `Object` |  |
| `preparation_error_code` | `Object` |  |
| `progress` | `Hash` |  |
| `project` | `Hash` |  |
| `project_id` | `String` |  |
| `pull_request` | `Object` |  |
| `queued_at` | `Object` |  |
| `run` | `Hash` |  |
| `run_plan_id` | `Object` |  |
| `scenario_runs` | `Array` |  |
| `source_run_id` | `Object` |  |
| `source_versions` | `Object` |  |
| `start_when_prepared` | `Boolean` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `String` |  |
| `target_snapshot` | `Hash` |  |
| `title` | `String` |  |
| `updated_at` | `String` |  |
| `verifier_preferences_snapshot` | `Hash` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `String` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerificationProjectRun record (raises on error).
verification_project_run = client.VerificationProjectRun.load({ "id" => "verification_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of VerificationProjectRun entities, one per record (raises on error).
verification_project_runs = client.VerificationProjectRun.list({ "organization_id" => "example", "project_id" => "example" })
verification_project_runs.each { |item| puts item.data_get }
```


### VerificationProjectScenario

Create an instance: `verification_project_scenario = client.VerificationProjectScenario`

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
| `actors` | `Hash` |  |
| `allowed_actions` | `String` |  |
| `archived_at` | `Object` |  |
| `cleanup` | `Array` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `String` |  |
| `dependencies` | `Array` |  |
| `fixtures` | `Array` | Files upload steps choose, ordered by name. |
| `health` | `Hash` |  |
| `id` | `String` |  |
| `identity_probe` | `Object` |  |
| `if` | `Object` | A documented subset of Actions expressions. |
| `labels` | `Array` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `Object` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `on` | `Object` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `Array` |  |
| `persona_id` | `String` |  |
| `primary_actor` | `Object` |  |
| `project_id` | `String` |  |
| `selectable_for_run` | `Boolean` |  |
| `starting_conditions` | `Object` |  |
| `steps` | `Array` |  |
| `triggers` | `Array` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerificationProjectScenario record (raises on error).
verification_project_scenario = client.VerificationProjectScenario.load({ "id" => "verification_project_scenario_id", "organization_id" => "organization_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of VerificationProjectScenario entities, one per record (raises on error).
verification_project_scenarios = client.VerificationProjectScenario.list({ "organization_id" => "example", "project_id" => "example" })
verification_project_scenarios.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
verification_project_scenario = client.VerificationProjectScenario.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "name" => "example_name", # String
})
```


### VerifyAppDomain

Create an instance: `verify_app_domain = client.VerifyAppDomain`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Create

```ruby
verify_app_domain = client.VerifyAppDomain.create({
  "app_id" => "example_app_id", # String
  "id" => "example_id", # String
})
```


### VerifyBrowserSession

Create an instance: `verify_browser_session = client.VerifyBrowserSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `String` | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` | Required when opening a browser for a new credential. |
| `origin` | `String` |  |
| `project_id` | `String` | The project (slug or ID) whose credential receives the session. |
| `status` | `String` |  |
| `url` | `String` |  |
| `viewer_url` | `Object` | Owner-only bearer link. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerifyBrowserSession record (raises on error).
verify_browser_session = client.VerifyBrowserSession.load({ "id" => "verify_browser_session_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
verify_browser_session = client.VerifyBrowserSession.create({
  "organization_id" => "example_organization_id", # String
  "project_id" => "example_project_id", # String
  "url" => "example_url", # String
})
```


### VerifyStaticSiteDomain

Create an instance: `verify_static_site_domain = client.VerifyStaticSiteDomain`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `created_at` | `String` |  |
| `dns_mode` | `String` |  |
| `dns_status` | `String` |  |
| `failure_message` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `hostname` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `last_checked_at` | `Object` |  |
| `record_name` | `Object` |  |
| `record_type` | `Object` |  |
| `record_value` | `Object` |  |
| `redirect_to` | `Object` |  |
| `static_site_id` | `Object` |  |
| `target_kind` | `String` |  |
| `tls_status` | `String` |  |
| `updated_at` | `String` |  |
| `verification_status` | `String` |  |

#### Example: Create

```ruby
verify_static_site_domain = client.VerifyStaticSiteDomain.create({
  "id" => "example_id", # String
  "static_site_id" => "example_static_site_id", # String
})
```


### VersionLog

Create an instance: `version_log = client.VersionLog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `String` |  |
| `failure_phase` | `Object` |  |
| `id` | `String` |  |
| `image_digest` | `Object` |  |
| `image_reference` | `Object` |  |
| `installer_version` | `String` |  |
| `ready_at` | `Object` |  |
| `receipt` | `Object` |  |
| `safe_error` | `Object` |  |
| `started_at` | `Object` |  |
| `status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of VersionLog entities, one per record (raises on error).
version_logs = client.VersionLog.list({ "binary_id" => "example", "organization_id" => "example", "version_id" => "example", "project_id" => "example" })
version_logs.each { |item| puts item.data_get }
```


### WebBotAuth

Create an instance: `web_bot_auth = client.WebBotAuth`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `String` |  |
| `origin` | `String` |  |
| `signatures` | `Array` |  |

#### Example: Create

```ruby
web_bot_auth = client.WebBotAuth.create({
  "origin" => "example_origin", # String
})
```


### WorkflowRunStep

Create an instance: `workflow_run_step = client.WorkflowRunStep`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### WorkflowRunStopNotice

Create an instance: `workflow_run_stop_notice = client.WorkflowRunStopNotice`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### WorkflowTriggerSkipped

Create an instance: `workflow_trigger_skipped = client.WorkflowTriggerSkipped`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

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

Features are the extension mechanism. A feature is a Ruby class
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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Composal_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Composal_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
pageprojectrun = client.PageProjectRun
pageprojectrun.load({ "id" => "example_id", "organization_id" => "example", "project_id" => "example" })

# pageprojectrun.data_get now returns the pageprojectrun data from the last load
# pageprojectrun.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
