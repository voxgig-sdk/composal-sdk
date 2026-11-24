# Composal Python SDK



The Python SDK for the Composal API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Agent()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from composal_sdk import ComposalSDK

client = ComposalSDK({
    "apikey": os.environ.get("COMPOSAL_APIKEY"),
})
```

### 2. List agent records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    agents = client.Agent().list({"organization_id": "example"})
    for agent in agents:
        print(agent.data_get())
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    agent = client.Agent().load({"organization_id": "example_organization_id", "id": "example_id"})
    print(agent.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Agent().create({"organization_id": "example_organization_id", "name": "example_name"})

# Remove
client.Agent().remove({"id": created.data_get()["id"], "organization_id": "example_organization_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    pageprojectrun = client.PageProjectRun().load({"id": "example_id", "organization_id": "example", "project_id": "example"})
    print(pageprojectrun.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ComposalSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
pageprojectrun = client.PageProjectRun().load({"id": "test01", "organization_id": "example", "project_id": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ComposalSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ComposalSDK

```python
from composal_sdk import ComposalSDK

client = ComposalSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ComposalSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ComposalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `patch` | `(reqdata, ctrl) -> any` | Change part of an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `str | None` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `str | None` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Any` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `str | None` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `str` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `str` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `str` |  |
| `last_reply_at` | `str | None` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `list` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `str | None` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `list` | Teammates named as managers beside the owner. |
| `model_change_action` | `str | None` | Advisory composer action. |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `persona` | `Any` |  |
| `preview` | `Any` |  |
| `preview_received_at` | `str | None` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Any` |  |
| `reply_triage` | `dict | None` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `str` | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` |  |
| `sharing_fixed` | `bool` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` |  |
| `slug` | `str` | Optional explicit API alias. |
| `status` | `str` |  |
| `team_role` | `str` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `str` |  |
| `url_slug` | `str` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `str` | Defaults to organization. |

#### Example: Load

```python
agent = client.Agent().load({"id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agents = client.Agent().list({"organization_id": "example"})
```

#### Example: Create

```python
agent = client.Agent().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```


### AgentAttachment

Create an instance: `agent_attachment = client.AgentAttachment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `int` |  |
| `content_type` | `str` |  |
| `file_name` | `str` |  |
| `id` | `str` |  |

#### Example: Create

```python
agent_attachment = client.AgentAttachment().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "byte_size": 1,  # int
    "content_type": "example_content_type",  # str
    "file_name": "example_file_name",  # str
})
```


### AgentAutomation

Create an instance: `agent_automation = client.AgentAutomation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `definition` | `dict` |  |
| `event_subscriptions` | `list` |  |
| `event_triggers` | `list` |  |
| `expected_revision` | `int` |  |
| `id` | `str` |  |
| `key` | `str` |  |
| `name` | `str` |  |
| `revision` | `int` |  |
| `schedule` | `Any` |  |
| `schedules` | `list` |  |
| `version` | `dict` |  |

#### Example: Load

```python
agent_automation = client.AgentAutomation().load({"id": "agent_automation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agent_automations = client.AgentAutomation().list({"agent_id": "example", "organization_id": "example"})
```


### AgentAvatar

Create an instance: `agent_avatar = client.AgentAvatar()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentCommand

Create an instance: `agent_command = client.AgentCommand()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `display_name` | `str` |  |
| `name` | `str` |  |
| `skill_model_visible` | `bool` |  |
| `source` | `str` |  |

#### Example: List

```python
agent_commands = client.AgentCommand().list({"agent_id": "example", "organization_id": "example"})
```


### AgentComputer

Create an instance: `agent_computer = client.AgentComputer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentConnection

Create an instance: `agent_connection = client.AgentConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `str` |  |
| `auth_scheme` | `str` |  |
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `connection` | `dict` |  |
| `credential` | `str | None` | Write-only outbound key. |
| `error_code` | `str | None` |  |
| `expected_generation` | `int` |  |
| `generation` | `int` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `remote_agent` | `str | None` |  |
| `requester_id` | `str` |  |
| `retired_at` | `str | None` |  |
| `revoked_at` | `str | None` |  |
| `scope_key` | `str` |  |
| `source_operation_id` | `str | None` |  |
| `state` | `str` |  |

#### Example: Load

```python
agent_connection = client.AgentConnection().load({"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agent_connections = client.AgentConnection().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_connection = client.AgentConnection().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "agent_card_url": "example_agent_card_url",  # str
    "auth_scheme": "example_auth_scheme",  # str
    "name": "example_name",  # str
})
```


### AgentControlFlow

Create an instance: `agent_control_flow = client.AgentControlFlow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel` | `bool` |  |
| `cancellation_requested` | `bool` |  |
| `device_name` | `str` |  |
| `flow_id` | `str` |  |
| `id` | `str` |  |
| `providers` | `list` |  |
| `repair_of_flow_id` | `str` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `str` |  |
| `step_count` | `int` |  |
| `title` | `str | None` |  |

#### Example: Load

```python
agent_control_flow = client.AgentControlFlow().load({"id": "agent_control_flow_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agent_control_flows = client.AgentControlFlow().list({"agent_id": "example", "organization_id": "example"})
```


### AgentCoordination

Create an instance: `agent_coordination = client.AgentCoordination()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AgentEmail

Create an instance: `agent_email = client.AgentEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `str | None` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `str` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `str` |  |
| `id` | `str` |  |
| `preview` | `str` |  |
| `received_at` | `str` |  |
| `recipient_tag` | `str | None` | The +tag the sender used, if any |
| `spam` | `bool` | SES judged it spam |
| `subject` | `str | None` |  |
| `text` | `str` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `list` |  |

#### Example: Load

```python
agent_email = client.AgentEmail().load({"id": "agent_email_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```


### AgentFile

Create an instance: `agent_file = client.AgentFile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_type` | `str` |  |
| `download_url` | `str` |  |
| `filename` | `str` |  |
| `id` | `str` |  |
| `size_bytes` | `int` |  |

#### Example: Load

```python
agent_file = client.AgentFile().load({"id": "agent_file_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```


### AgentInput

Create an instance: `agent_input = client.AgentInput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `list` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `list` |  |
| `browser_context` | `dict` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `dict` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `str` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `Any` |  |
| `requester_membership_id` | `str` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `str` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `str` |  |

#### Example: Create

```python
agent_input = client.AgentInput().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "browser_context": {},  # dict
    "client_time": {},  # dict
    "conversation_id": "example_conversation_id",  # str
    "text": "example_text",  # str
})
```


### AgentIntegration

Create an instance: `agent_integration = client.AgentIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `dict` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `str` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `list` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` |  |
| `can_manage_organization` | `bool` |  |
| `catalog` | `list` |  |
| `connect_as` | `str | None` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `dict` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `dict` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `str` |  |
| `connections` | `list` |  |
| `email` | `dict` | A native agent's own email address. |
| `enabled` | `bool` |  |
| `enabled_toolkits` | `list` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` |  |
| `pagination` | `dict` |  |
| `pending_counts` | `dict` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `dict` |  |
| `webhook_connections` | `list` |  |
| `webhooks_available` | `bool` |  |

#### Example: List

```python
agent_integrations = client.AgentIntegration().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_integration = client.AgentIntegration().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "connection_id": "example_connection_id",  # str
    "enabled": True,  # bool
    "generation": 1,  # int
})
```


### AgentInteraction

Create an instance: `agent_interaction = client.AgentInteraction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `interactions` | `list` |  |

#### Example: Load

```python
agent_interaction = client.AgentInteraction().load({"id": "agent_interaction_id", "agent_id": "agent_id", "organization_id": "organization_id", "conversation_id": "conversation_id"})
```

#### Example: List

```python
agent_interactions = client.AgentInteraction().list({"agent_id": "example", "organization_id": "example", "conversation_id": "example"})
```


### AgentLibrary

Create an instance: `agent_library = client.AgentLibrary()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AgentManager

Create an instance: `agent_manager = client.AgentManager()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `str | None` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `str | None` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `Any` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `str | None` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `str` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `str` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `str` |  |
| `last_reply_at` | `str | None` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `list` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `str | None` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `list` | Teammates named as managers beside the owner. |
| `model_change_action` | `str | None` | Advisory composer action. |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `persona` | `Any` |  |
| `preview` | `Any` |  |
| `preview_received_at` | `str | None` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `Any` |  |
| `reply_triage` | `dict | None` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `str` | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` |  |
| `sharing_fixed` | `bool` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `team_role` | `str` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `str` |  |
| `url_slug` | `str` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `str` |  |
| `visibility` | `str` |  |

#### Example: Create

```python
agent_manager = client.AgentManager().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "user_id": "example_user_id",  # str
})
```


### AgentManagerChoice

Create an instance: `agent_manager_choice = client.AgentManagerChoice()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `name` | `str` |  |

#### Example: List

```python
agent_manager_choices = client.AgentManagerChoice().list({"agent_id": "example", "organization_id": "example"})
```


### AgentMarketplace

Create an instance: `agent_marketplace = client.AgentMarketplace()`

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
| `bundle` | `dict` |  |
| `can_manage` | `bool` |  |
| `catalog_key` | `str | None` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `list` |  |
| `category` | `str` |  |
| `counts` | `dict` |  |
| `created_at` | `str` |  |
| `expected_version` | `int` |  |
| `explainer` | `str | None` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `str` |  |
| `installs_count` | `int` |  |
| `instructions` | `str` |  |
| `integration_toolkits` | `list` |  |
| `integrations` | `list` |  |
| `listing` | `Any` |  |
| `listings` | `list` |  |
| `memories` | `list` |  |
| `name` | `str` |  |
| `next_page` | `int | None` |  |
| `organization_name` | `str` |  |
| `page_apps` | `list` |  |
| `publisher_avatar_url` | `str | None` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `str` | "Composal" on listings Composal publishes. |
| `sections` | `list` |  |
| `share_token` | `str | None` | Present only for people who manage the listing. |
| `skills` | `list` |  |
| `slug` | `str` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `str` | The V2 agent this listing was published from. |
| `summary` | `str` |  |
| `updated_at` | `str` |  |
| `version` | `int` |  |
| `viewer` | `dict` | Who a public marketplace response was read for. |
| `visibility` | `str` |  |

#### Example: Load

```python
agent_marketplace = client.AgentMarketplace().load({"id": "agent_marketplace_id"})
```

#### Example: Create

```python
agent_marketplace = client.AgentMarketplace().create({
    "organization_id": "example_organization_id",  # str
    "bundle": {},  # dict
    "category": "example_category",  # str
    "name": "example_name",  # str
    "summary": "example_summary",  # str
})
```


### AgentMarketplaceShared

Create an instance: `agent_marketplace_shared = client.AgentMarketplaceShared()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `catalog_key` | `str | None` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `str` |  |
| `counts` | `dict` |  |
| `created_at` | `str` |  |
| `explainer` | `str | None` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `str` |  |
| `installs_count` | `int` |  |
| `instructions` | `str` |  |
| `integration_toolkits` | `list` |  |
| `integrations` | `list` |  |
| `listing` | `Any` |  |
| `memories` | `list` |  |
| `name` | `str` |  |
| `organization_name` | `str` |  |
| `page_apps` | `list` |  |
| `publisher_avatar_url` | `str | None` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `str` | "Composal" on listings Composal publishes. |
| `share_token` | `str | None` | Present only for people who manage the listing. |
| `skills` | `list` |  |
| `slug` | `str` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `str` |  |
| `updated_at` | `str` |  |
| `version` | `int` |  |
| `viewer` | `dict` | Who a public marketplace response was read for. |
| `visibility` | `str` |  |

#### Example: Load

```python
agent_marketplace_shared = client.AgentMarketplaceShared().load({"id": "agent_marketplace_shared_id"})
```


### AgentMissionControl

Create an instance: `agent_mission_control = client.AgentMissionControl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentOperation

Create an instance: `agent_operation = client.AgentOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `dict` | JSON object limited to 65536 encoded bytes. |
| `id` | `str` |  |
| `key` | `str` |  |
| `name` | `str` |  |
| `operation` | `dict` |  |
| `participant` | `str` |  |
| `requester_id` | `str` | Signed-in user public ID returned by discovery. |
| `scope_key` | `str` |  |

#### Example: Load

```python
agent_operation = client.AgentOperation().load({"id": "agent_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
agent_operation = client.AgentOperation().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "arguments": {},  # dict
    "key": "example_key",  # str
    "name": "example_name",  # str
    "requester_id": "example_requester_id",  # str
})
```


### AgentProvisioning

Create an instance: `agent_provisioning = client.AgentProvisioning()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentPullRequest

Create an instance: `agent_pull_request = client.AgentPullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `number` | `int` |  |
| `owners` | `list` |  |
| `repository` | `str` |  |
| `status` | `str` |  |
| `title` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
agent_pull_requests = client.AgentPullRequest().list({"agent_id": "example", "organization_id": "example"})
```


### AgentQuestion

Create an instance: `agent_question = client.AgentQuestion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AgentRepository

Create an instance: `agent_repository = client.AgentRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `environments` | `dict` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` |  |
| `id` | `str` |  |
| `repository_choices` | `list` |  |
| `repository_choices_error` | `str | None` | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` |  |
| `version` | `int` |  |
| `work_repositories` | `list` |  |

#### Example: List

```python
agent_repositorys = client.AgentRepository().list({"agent_id": "example", "organization_id": "example"})
```


### AgentResource

Create an instance: `agent_resource = client.AgentResource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |
| `uri` | `str` |  |

#### Example: List

```python
agent_resources = client.AgentResource().list({"agent_id": "example", "organization_id": "example"})
```


### AgentRoutine

Create an instance: `agent_routine = client.AgentRoutine()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `consecutive_errors` | `int` |  |
| `credit_wait` | `dict` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `str | None` |  |
| `enabled` | `bool` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `last_error` | `str | None` |  |
| `last_run_at` | `str | None` |  |
| `last_status` | `str | None` |  |
| `managed` | `bool` |  |
| `name` | `str` |  |
| `next_run_at` | `str | None` |  |
| `routine` | `dict` |  |
| `schedule` | `dict` |  |
| `schedule_label` | `str` |  |
| `utility_model` | `dict` |  |

#### Example: List

```python
agent_routines = client.AgentRoutine().list({"agent_id": "example", "organization_id": "example"})
```


### AgentRun

Create an instance: `agent_run = client.AgentRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `str | None` |  |
| `id` | `str` |  |
| `run_id` | `str` |  |
| `status` | `str` |  |

#### Example: Load

```python
agent_run = client.AgentRun().load({"id": "agent_run_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```


### AgentRuntime

Create an instance: `agent_runtime = client.AgentRuntime()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `list` |  |
| `can_manage` | `bool` |  |
| `can_reset` | `bool` |  |
| `image` | `str` |  |
| `memory_mb` | `int | None` |  |
| `platform` | `str` |  |
| `profile` | `str` |  |
| `provider` | `str` |  |
| `state` | `str` |  |
| `version` | `str` |  |
| `volume` | `dict | None` |  |


### AgentSetting

Create an instance: `agent_setting = client.AgentSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_version` | `str` |  |
| `instructions` | `str` |  |
| `version` | `str` |  |

#### Example: List

```python
agent_settings = client.AgentSetting().list({"agent_id": "example", "organization_id": "example"})
```


### AgentSharing

Create an instance: `agent_sharing = client.AgentSharing()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AgentSite

Create an instance: `agent_site = client.AgentSite()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed_at` | `str` |  |
| `deployments_count` | `int` |  |
| `hostname` | `str` |  |
| `https` | `str` | Whether the organization's certificate serves this site over HTTPS |
| `id` | `str` |  |
| `name` | `str` |  |
| `url` | `str` |  |
| `visibility` | `str` |  |

#### Example: List

```python
agent_sites = client.AgentSite().list({"agent_id": "example", "organization_id": "example"})
```


### AgentSkill

Create an instance: `agent_skill = client.AgentSkill()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `can_configure` | `bool` |  |
| `can_manage` | `bool` |  |
| `configuration_state` | `str` | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `str` |  |
| `enabled` | `bool` |  |
| `name` | `str` |  |
| `skills` | `list` |  |
| `version` | `str` |  |

#### Example: List

```python
agent_skills = client.AgentSkill().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_skill = client.AgentSkill().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "enabled": True,  # bool
    "name": "example_name",  # str
    "version": "example_version",  # str
})
```


### AgentSlack

Create an instance: `agent_slack = client.AgentSlack()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentSubagent

Create an instance: `agent_subagent = client.AgentSubagent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `attention` | `dict | None` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `str | None` |  |
| `id` | `str` |  |
| `model` | `str | None` |  |
| `parent_id` | `str` |  |
| `preview` | `str | None` |  |
| `started_at` | `str | None` |  |
| `state` | `str | None` | What the thread is to the viewer. |
| `status` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str | None` |  |

#### Example: List

```python
agent_subagents = client.AgentSubagent().list({"agent_id": "example", "organization_id": "example"})
```


### AgentSubscription

Create an instance: `agent_subscription = client.AgentSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
agent_subscriptions = client.AgentSubscription().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_subscription = client.AgentSubscription().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### AgentTeammate

Create an instance: `agent_teammate = client.AgentTeammate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `str | None` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `str` |  |
| `name` | `str` |  |
| `persona` | `Any` |  |
| `slug` | `str` |  |

#### Example: List

```python
agent_teammates = client.AgentTeammate().list({"agent_id": "example", "organization_id": "example"})
```


### AgentTerminal

Create an instance: `agent_terminal = client.AgentTerminal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentThread

Create an instance: `agent_thread = client.AgentThread()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `int | None` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` |  |
| `execution` | `Any` |  |
| `first_input` | `Any` |  |
| `first_input_key` | `str` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `str` | Membership the first message was sent as, for input_delivery. |
| `id` | `str` |  |
| `inherit_context` | `bool` | Include the source conversation through its last completed reply. |
| `local_activities` | `dict` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `str | None` |  |
| `local_scope_key` | `str | None` |  |
| `local_status_pending` | `bool` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `list` |  |
| `main_thread_id` | `str` |  |
| `message` | `str` | The thread's first message. |
| `next_cursor` | `str | None` |  |
| `parent_conversation_id` | `str` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `str` |  |
| `selected_thread` | `Any` |  |
| `thread` | `dict` |  |
| `threads` | `list` |  |
| `title` | `str` |  |
| `total_archived_count` | `int | None` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```python
agent_threads = client.AgentThread().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_thread = client.AgentThread().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### AgentTool

Create an instance: `agent_tool = client.AgentTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `inputSchema` | `dict` |  |
| `name` | `str` |  |

#### Example: List

```python
agent_tools = client.AgentTool().list({"agent_id": "example", "organization_id": "example"})
```


### AgentVerifyProject

Create an instance: `agent_verify_project = client.AgentVerifyProject()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` |  |
| `project_choices` | `list` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` |  |
| `verify_projects` | `list` |  |
| `version` | `int` |  |

#### Example: List

```python
agent_verify_projects = client.AgentVerifyProject().list({"agent_id": "example", "organization_id": "example"})
```


### AgentWait

Create an instance: `agent_wait = client.AgentWait()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AgentWebhook

Create an instance: `agent_webhook = client.AgentWebhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `connection` | `dict` |  |
| `deliveries` | `list` |  |
| `event_types` | `list` |  |
| `expected_generation` | `int` |  |
| `id` | `str` |  |
| `max_events_per_day` | `int` |  |
| `name` | `str` |  |
| `purpose` | `str` |  |
| `signing_key` | `str | None` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```python
agent_webhook = client.AgentWebhook().load({"id": "agent_webhook_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
agent_webhook = client.AgentWebhook().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "event_types": [],  # list
    "max_events_per_day": 1,  # int
    "name": "example_name",  # str
    "purpose": "example_purpose",  # str
})
```


### AgentWork

Create an instance: `agent_work = client.AgentWork()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AgentWorkflow

Create an instance: `agent_workflow = client.AgentWorkflow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_digest` | `str` |  |
| `path` | `str` |  |
| `source` | `str` | At most 262144 UTF-8 bytes |
| `template` | `str` | A template id from the catalog's templates |
| `templates` | `list` |  |
| `truncated` | `bool` |  |
| `workflows` | `list` |  |

#### Example: List

```python
agent_workflows = client.AgentWorkflow().list({"agent_id": "example", "organization_id": "example"})
```

#### Example: Create

```python
agent_workflow = client.AgentWorkflow().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "path": "example_path",  # str
    "template": "example_template",  # str
})
```


### AgentWorkflowProposal

Create an instance: `agent_workflow_proposal = client.AgentWorkflowProposal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `dict` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `str | None` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` |  |
| `can_revise` | `bool` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `str` |  |
| `definition` | `dict | None` |  |
| `digest` | `str` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `str | None` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `str` |  |
| `model_choices` | `list` | Models the viewer may choose for the agent steps before saving. |
| `name` | `str` |  |
| `native_rows` | `list` |  |
| `path` | `str` |  |
| `pipeline_checkpoints` | `dict` |  |
| `pipeline_commands` | `dict` |  |
| `reasoning_choices` | `list` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `int | None` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `dict | None` |  |
| `stale` | `bool` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `dict | None` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `str | None` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```python
agent_workflow_proposal = client.AgentWorkflowProposal().load({"id": "agent_workflow_proposal_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```


### AgentWorkflowRun

Create an instance: `agent_workflow_run = client.AgentWorkflowRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `automation` | `dict | None` | Saved native automation identity. |
| `budget_seconds` | `int | None` | The run stops once it has been running this long |
| `budget_usd` | `float | None` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `dict | None` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `str | None` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `dict` |  |
| `error` | `str | None` |  |
| `finished_at` | `str | None` |  |
| `flow_steps` | `list | None` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `str` | Public run ID. |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `str | None` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `str | None` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `str | None` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `str` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `str` |  |
| `started_by` | `dict | None` | The event that started the run |
| `status` | `str` |  |
| `step_count` | `int` |  |
| `steps` | `list` |  |
| `trigger_id` | `str | None` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `str | None` | When a sleeping run's step looks again |
| `workflow_digest` | `str | None` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `str | None` |  |

#### Example: Load

```python
agent_workflow_run = client.AgentWorkflowRun().load({"id": "agent_workflow_run_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agent_workflow_runs = client.AgentWorkflowRun().list({"agent_id": "example", "organization_id": "example"})
```


### AgentWorkflowTrigger

Create an instance: `agent_workflow_trigger = client.AgentWorkflowTrigger()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budget` | `dict | None` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` |  |
| `can_pause` | `bool` | It is running, so a manager can pause it |
| `can_resume` | `bool` | A person paused it, so a manager can resume it |
| `can_review` | `bool` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `int | None` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `str | None` | When the daily count starts again, at the organization's midnight |
| `id` | `str` |  |
| `kind` | `str` |  |
| `next_due_at` | `str | None` |  |
| `pause_cause` | `str | None` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `str | None` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `float | None` |  |
| `schedule` | `dict | None` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `str | None` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `str | None` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `str | None` |  |
| `starts` | `dict | None` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `str | None` | The event subscription that starts it |
| `time_zone` | `str` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `int | None` | Events that started a run today, for an event workflow |
| `trigger` | `dict` |  |
| `workflow_path` | `str` |  |

#### Example: Load

```python
agent_workflow_trigger = client.AgentWorkflowTrigger().load({"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: List

```python
agent_workflow_triggers = client.AgentWorkflowTrigger().list({"agent_id": "example", "organization_id": "example"})
```


### AgentWorkspace

Create an instance: `agent_workspace = client.AgentWorkspace()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `can_delete` | `bool` |  |
| `can_keep` | `bool` |  |
| `cleanup_after` | `str | None` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `reason` | `str` |  |
| `state` | `str` |  |

#### Example: List

```python
agent_workspaces = client.AgentWorkspace().list({"agent_id": "example", "organization_id": "example"})
```


### AgentWritePermission

Create an instance: `agent_write_permission = client.AgentWritePermission()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `str` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `str` |  |
| `granted_by` | `str | None` |  |
| `id` | `str` |  |
| `in_effect` | `bool` | Whether the permission approves writes now. |
| `last_used_at` | `str | None` |  |
| `tool` | `str` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```python
agent_write_permissions = client.AgentWritePermission().list({"agent_id": "example", "organization_id": "example"})
```


### AllocationLog

Create an instance: `allocation_log = client.AllocationLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `str` |  |
| `environment` | `str` |  |
| `fetched_at` | `str` |  |
| `location` | `str | None` |  |
| `logs` | `str` |  |
| `namespace` | `str` |  |
| `offset` | `int` |  |
| `origin` | `str` |  |
| `service` | `str` |  |
| `task` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
allocation_logs = client.AllocationLog().list({"allocation_id": "example", "app_id": "example"})
```


### App

Create an instance: `app = client.App()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `description` | `str | None` |  |
| `framework` | `str | None` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `repository_id` | `str` |  |
| `repository_kind` | `str | None` |  |
| `root_path` | `str` |  |
| `root_path_display` | `str` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: Load

```python
app = client.App().load({"id": "app_id"})
```

#### Example: List

```python
apps = client.App().list()
```

#### Example: Create

```python
app = client.App().create({
    "name": "example_name",  # str
    "organization_id": "example_organization_id",  # str
    "repository_id": "example_repository_id",  # str
    "root_path": "example_root_path",  # str
    "slug": "example_slug",  # str
})
```


### AppCdn

Create an instance: `app_cdn = client.AppCdn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `cache_path_prefix` | `str | None` |  |
| `cache_settings_json` | `str | None` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `distribution_kind` | `str` |  |
| `edge_hostname` | `str | None` |  |
| `failure_message` | `str | None` |  |
| `hosted_app_id` | `str` |  |
| `hostnames` | `list` |  |
| `id` | `str` |  |
| `last_deployed_at` | `str | None` |  |
| `last_deployed_at_label` | `str | None` |  |
| `last_purged_at` | `str | None` |  |
| `last_purged_at_label` | `str | None` |  |
| `last_synced_at` | `str | None` |  |
| `last_synced_at_label` | `str | None` |  |
| `name` | `str` |  |
| `origin_url` | `str` |  |
| `provisioned` | `bool` |  |
| `routing_settings_json` | `str | None` |  |
| `security_settings_json` | `str | None` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: Load

```python
app_cdn = client.AppCdn().load({"id": "app_cdn_id", "app_id": "app_id"})
```

#### Example: List

```python
app_cdns = client.AppCdn().list({"app_id": "example"})
```

#### Example: Create

```python
app_cdn = client.AppCdn().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "origin_url": "example_origin_url",  # str
    "slug": "example_slug",  # str
})
```


### AppConfigVariable

Create an instance: `app_config_variable = client.AppConfigVariable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `created_at` | `str` |  |
| `description` | `str | None` |  |
| `exposed_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `key` | `str` |  |
| `scope_kind` | `str` |  |
| `updated_at` | `str` |  |
| `value` | `str | None` |  |
| `value_kind` | `str` |  |

#### Example: Load

```python
app_config_variable = client.AppConfigVariable().load({"id": "app_config_variable_id", "app_id": "app_id"})
```

#### Example: List

```python
app_config_variables = client.AppConfigVariable().list({"app_id": "example"})
```

#### Example: Create

```python
app_config_variable = client.AppConfigVariable().create({
    "app_id": "example_app_id",  # str
    "exposed_to_build": True,  # bool
    "key": "example_key",  # str
    "scope_kind": "example_scope_kind",  # str
    "value_kind": "example_value_kind",  # str
})
```


### AppDataResource

Create an instance: `app_data_resource = client.AppDataResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `created_at` | `str` |  |
| `engine` | `str` |  |
| `failure_message` | `str | None` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `name` | `str` |  |
| `plan` | `str | None` |  |
| `provider_metadata` | `dict` |  |
| `region` | `str | None` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `storage_gb` | `int | None` |  |
| `storage_label` | `str | None` |  |
| `updated_at` | `str` |  |
| `version` | `str | None` |  |

#### Example: Load

```python
app_data_resource = client.AppDataResource().load({"id": "app_data_resource_id", "app_id": "app_id"})
```

#### Example: List

```python
app_data_resources = client.AppDataResource().list({"app_id": "example"})
```

#### Example: Create

```python
app_data_resource = client.AppDataResource().create({
    "app_id": "example_app_id",  # str
    "engine": "example_engine",  # str
    "kind": "example_kind",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### AppDeploy

Create an instance: `app_deploy = client.AppDeploy()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str` |  |
| `app_service_id` | `str` |  |
| `channel` | `str` |  |
| `command` | `str` |  |
| `commit_sha` | `str` |  |
| `desired_instances` | `int` |  |
| `environment` | `str` | Environment slug or public ID, all, or existing. |
| `image` | `str` |  |
| `region` | `str` |  |
| `rollout_predecessor` | `str` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `str` | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `str` |  |

#### Example: Create

```python
app_deploy = client.AppDeploy().create({
    "app_id": "example_app_id",  # str
    "image": "example_image",  # str
})
```


### AppDeployment

Create an instance: `app_deployment = client.AppDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str` |  |
| `app_service_id` | `str` |  |
| `app_service_placement_id` | `str` |  |
| `artifact_locator` | `str | None` |  |
| `build_role` | `str | None` |  |
| `commit_sha` | `str | None` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `creator_user_id` | `str | None` |  |
| `deployed_url` | `str | None` |  |
| `display_id` | `int` |  |
| `failure_message` | `str | None` |  |
| `finished_at` | `str | None` |  |
| `finished_at_label` | `str | None` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `idempotency_key` | `str | None` |  |
| `is_rollback` | `bool` |  |
| `location` | `Any` |  |
| `location_id` | `str` |  |
| `number` | `int` |  |
| `operation_key` | `str | None` |  |
| `organization_id` | `str` |  |
| `rollback_reason` | `str | None` |  |
| `rollback_source_deployment_id` | `str | None` |  |
| `rollback_source_release_id` | `str | None` |  |
| `rollback_target_release_id` | `str | None` |  |
| `source_ref` | `str | None` |  |
| `started_at` | `str | None` |  |
| `started_at_label` | `str | None` |  |
| `status` | `str` |  |
| `trigger_kind` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: Load

```python
app_deployment = client.AppDeployment().load({"id": "app_deployment_id", "app_id": "app_id"})
```

#### Example: List

```python
app_deployments = client.AppDeployment().list({"app_id": "example"})
```

#### Example: Create

```python
app_deployment = client.AppDeployment().create({
    "app_id": "example_app_id",  # str
})
```


### AppDeploymentOperation

Create an instance: `app_deployment_operation = client.AppDeploymentOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `dict` |  |
| `app_environment_id` | `str` |  |
| `app_service_id` | `str` |  |
| `app_service_placement_id` | `str` |  |
| `artifact_locator` | `str | None` |  |
| `build_duration_seconds` | `int | None` |  |
| `build_source` | `dict | None` |  |
| `build_status` | `str` |  |
| `children` | `list` |  |
| `ci_pipeline_id` | `str | None` |  |
| `ci_pipeline_run_id` | `str | None` |  |
| `commit_sha` | `str | None` |  |
| `created_at` | `str` |  |
| `creator` | `dict | None` |  |
| `deployed_url` | `str | None` |  |
| `duration_seconds` | `int | None` |  |
| `environment` | `dict` |  |
| `failure_message` | `str` |  |
| `finished_at` | `str` |  |
| `history_kind` | `str` |  |
| `history_reason` | `str | None` |  |
| `id` | `str` |  |
| `is_live` | `bool` |  |
| `is_rollback` | `bool` |  |
| `live_region_count` | `int` |  |
| `location_id` | `str` |  |
| `number` | `int` |  |
| `placement` | `dict | None` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollback_reason` | `str | None` |  |
| `rollback_source_release_id` | `str | None` |  |
| `rollback_target_release_id` | `str | None` |  |
| `rollout_predecessor_id` | `str | None` |  |
| `rollout_status` | `str` |  |
| `rollout_strategy` | `str` |  |
| `service` | `dict` |  |
| `source_ref` | `str | None` |  |
| `started_at` | `str` |  |
| `status` | `str` |  |
| `total_replicas` | `int` |  |
| `trigger_kind` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
app_deployment_operation = client.AppDeploymentOperation().load({"id": "app_deployment_operation_id", "app_id": "app_id"})
```

#### Example: List

```python
app_deployment_operations = client.AppDeploymentOperation().list({"app_id": "example"})
```

#### Example: Create

```python
app_deployment_operation = client.AppDeploymentOperation().create({
    "app_id": "example_app_id",  # str
})
```


### AppDeploymentRollback

Create an instance: `app_deployment_rollback = client.AppDeploymentRollback()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str` |  |
| `app_id` | `str` |  |
| `app_service_id` | `str` |  |
| `blockers` | `list` |  |
| `candidate_releases` | `list` |  |
| `confirmation_text` | `str` |  |
| `current_deployment` | `Any` |  |
| `current_release` | `Any` |  |
| `deployment` | `Any` |  |
| `desired_state` | `Any` |  |
| `environment` | `Any` |  |
| `execution_allowed` | `bool` |  |
| `force` | `bool` |  |
| `idempotency_key` | `str` |  |
| `idempotent_reuse` | `bool` |  |
| `location` | `Any` |  |
| `operation` | `Any` |  |
| `reason` | `str | None` |  |
| `rollback_release` | `Any` |  |
| `rollout` | `Any` |  |
| `service` | `Any` |  |
| `target_artifact_locator` | `str | None` |  |
| `target_release` | `Any` |  |
| `to` | `str` |  |
| `warnings` | `list` |  |

#### Example: Create

```python
app_deployment_rollback = client.AppDeploymentRollback().create({
    "app_id": "example_app_id",  # str
})
```


### AppEnvironment

Create an instance: `app_environment = client.AppEnvironment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `bool` |  |
| `base_domain` | `str | None` |  |
| `branch_pattern` | `str | None` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `location` | `Any` |  |
| `location_id` | `str` |  |
| `name` | `str` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: Load

```python
app_environment = client.AppEnvironment().load({"id": "app_environment_id", "app_id": "app_id"})
```

#### Example: List

```python
app_environments = client.AppEnvironment().list({"app_id": "example"})
```

#### Example: Create

```python
app_environment = client.AppEnvironment().create({
    "app_id": "example_app_id",  # str
    "auto_deploy": True,  # bool
    "kind": "example_kind",  # str
    "location_id": "example_location_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "status": "example_status",  # str
})
```


### AppLocation

Create an instance: `app_location = client.AppLocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `location_id` | `str` |  |
| `name` | `str` |  |
| `nomad_datacenter` | `str` |  |
| `updated_at` | `str` |  |

#### Example: List

```python
app_locations = client.AppLocation().list({"app_id": "example"})
```

#### Example: Create

```python
app_location = client.AppLocation().create({
    "app_id": "example_app_id",  # str
    "location_id": "example_location_id",  # str
})
```


### AppMetric

Create an instance: `app_metric = client.AppMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppPreview

Create an instance: `app_preview = client.AppPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `str` |  |
| `app_preview_profile_id` | `str` |  |
| `change_number` | `str` | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `int` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `int` | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `resource_overrides` | `dict` | Service public IDs mapped to resource overrides. |
| `retained` | `bool` |  |
| `shared_data_binding_ids` | `list` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `list` | Replace the explicitly shared captured service dependencies. |
| `slug` | `str` |  |
| `source_ref` | `str` |  |
| `storage_binding_resources` | `dict` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```python
app_preview = client.AppPreview().load({"id": "app_preview_id", "app_id": "app_id"})
```

#### Example: List

```python
app_previews = client.AppPreview().list({"app_id": "example"})
```

#### Example: Create

```python
app_preview = client.AppPreview().create({
    "app_id": "example_app_id",  # str
    "app_preview_profile_id": "example_app_preview_profile_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### AppPreviewProfile

Create an instance: `app_preview_profile = client.AppPreviewProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `bool` |  |
| `configuration` | `dict` |  |
| `created_at` | `str` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `slug` | `str` |  |
| `source_environment_id` | `str` |  |
| `ttl_days` | `int` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
app_preview_profile = client.AppPreviewProfile().load({"id": "app_preview_profile_id", "app_id": "app_id"})
```

#### Example: List

```python
app_preview_profiles = client.AppPreviewProfile().list({"app_id": "example"})
```

#### Example: Create

```python
app_preview_profile = client.AppPreviewProfile().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "source_environment_id": "example_source_environment_id",  # str
})
```


### AppRun

Create an instance: `app_run = client.AppRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `image` | `str` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

#### Example: Load

```python
app_run = client.AppRun().load({"id": "app_run_id"})
```

#### Example: List

```python
app_runs = client.AppRun().list()
```

#### Example: Create

```python
app_run = client.AppRun().create({
})
```


### AppSecret

Create an instance: `app_secret = client.AppSecret()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `description` | `str | None` |  |
| `env_key` | `str | None` |  |
| `expose_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `latest_version_number` | `int | None` |  |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `rotation_policy` | `str | None` |  |
| `scope_kind` | `str` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `value` | `str` |  |
| `value_digest` | `str | None` |  |
| `value_kind` | `str | None` |  |

#### Example: Load

```python
app_secret = client.AppSecret().load({"id": "app_secret_id", "app_id": "app_id"})
```

#### Example: List

```python
app_secrets = client.AppSecret().list({"app_id": "example"})
```

#### Example: Create

```python
app_secret = client.AppSecret().create({
    "app_id": "example_app_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### AppService

Create an instance: `app_service = client.AppService()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `bool` |  |
| `bindings` | `list` |  |
| `build_command` | `str | None` |  |
| `cpu_label` | `str | None` |  |
| `cpu_mhz` | `int | None` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `deploy_paths` | `list` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` |  |
| `disk_label` | `str | None` |  |
| `disk_mb` | `int | None` |  |
| `effective_deploy_paths` | `list` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `str | None` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `internal_port` | `int | None` |  |
| `kind` | `str` |  |
| `memory_label` | `str | None` |  |
| `memory_max_label` | `str | None` |  |
| `memory_max_mb` | `int | None` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `int | None` |  |
| `name` | `str` |  |
| `nomad_constraints_json` | `str | None` |  |
| `nomad_kill_timeout_seconds` | `int | None` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `str | None` |  |
| `nomad_region` | `str | None` |  |
| `nomad_shutdown_delay_seconds` | `int | None` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `str | None` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `str | None` |  |
| `prestart_command` | `str | None` |  |
| `publicly_accessible` | `bool` |  |
| `release_command` | `str | None` |  |
| `repo_source_path` | `str` |  |
| `runtime` | `str` |  |
| `runtime_adapter_kind` | `str` |  |
| `runtime_adapter_settings_json` | `str | None` |  |
| `schedule` | `str | None` |  |
| `slug` | `str` |  |
| `source_path` | `str` |  |
| `start_command` | `str | None` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: Load

```python
app_service = client.AppService().load({"id": "app_service_id", "app_id": "app_id"})
```

#### Example: List

```python
app_services = client.AppService().list({"app_id": "example"})
```

#### Example: Create

```python
app_service = client.AppService().create({
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


### AppServiceBinding

Create an instance: `app_service_binding = client.AppServiceBinding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
app_service_binding = client.AppServiceBinding().load({"id": "app_service_binding_id", "app_id": "app_id"})
```

#### Example: List

```python
app_service_bindings = client.AppServiceBinding().list({"app_id": "example"})
```

#### Example: Create

```python
app_service_binding = client.AppServiceBinding().create({
    "app_id": "example_app_id",  # str
})
```


### AppServicePlacement

Create an instance: `app_service_placement = client.AppServicePlacement()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str` |  |
| `app_service_id` | `str` |  |
| `created_at` | `str` |  |
| `deployment_channel` | `str | None` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `mode` | `str` |  |
| `organization_id` | `str` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollout_strategy` | `str` |  |
| `targets` | `list` |  |
| `total_replicas` | `int` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
app_service_placement = client.AppServicePlacement().load({"id": "app_service_placement_id", "app_id": "app_id"})
```

#### Example: List

```python
app_service_placements = client.AppServicePlacement().list({"app_id": "example"})
```


### AppStorageResource

Create an instance: `app_storage_resource = client.AppStorageResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `str` | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `str | None` |  |
| `attachment` | `dict | None` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `int | None` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `str | None` |  |
| `created_at` | `str` |  |
| `ephemeral` | `bool` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `str | None` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `location_code` | `str | None` |  |
| `location_id` | `str | None` | Volume datacenter pin (volume kind only) |
| `mount_path` | `str | None` |  |
| `name` | `str` |  |
| `provider` | `str` | Storage backend. |
| `provider_error` | `str | None` | Last provisioning/teardown error from the storage provider |
| `region` | `str | None` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
app_storage_resource = client.AppStorageResource().load({"id": "app_storage_resource_id", "app_id": "app_id"})
```

#### Example: List

```python
app_storage_resources = client.AppStorageResource().list({"app_id": "example"})
```

#### Example: Create

```python
app_storage_resource = client.AppStorageResource().create({
    "app_id": "example_app_id",  # str
    "access_mode": "example_access_mode",  # str
    "kind": "example_kind",  # str
    "name": "example_name",  # str
    "provider": "example_provider",  # str
    "slug": "example_slug",  # str
    "status": "example_status",  # str
})
```


### AttachmentPart

Create an instance: `attachment_part = client.AttachmentPart()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### AutomationEvent

Create an instance: `automation_event = client.AutomationEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `event_subscriptions` | `list` |  |
| `event_triggers` | `list` |  |
| `expected_revision` | `str | None` |  |
| `id` | `str` |  |
| `key` | `str` |  |
| `name` | `str` |  |
| `revision` | `int` |  |
| `schedule` | `Any` |  |
| `schedules` | `list` |  |
| `settings` | `dict` |  |
| `subscription_key` | `str` |  |
| `version` | `dict` |  |


### AutomationRun

Create an instance: `automation_run = client.AutomationRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `automation` | `dict | None` | Saved native automation identity. |
| `budget_seconds` | `int | None` | The run stops once it has been running this long |
| `budget_usd` | `float | None` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `dict | None` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `str | None` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `dict` |  |
| `error` | `str | None` |  |
| `finished_at` | `str | None` |  |
| `flow_steps` | `list | None` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `str` |  |
| `input` | `dict` |  |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `str | None` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `str | None` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `str` |  |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `str | None` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `str` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `str` |  |
| `started_by` | `dict | None` | The event that started the run |
| `status` | `str` |  |
| `step_count` | `int` |  |
| `steps` | `list` |  |
| `trigger_id` | `str | None` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `str` |  |
| `wake_at` | `str | None` | When a sleeping run's step looks again |
| `workflow_digest` | `str | None` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `str | None` |  |

#### Example: Create

```python
automation_run = client.AutomationRun().create({
    "agent_id": "example_agent_id",  # str
    "automation_id": "example_automation_id",  # str
    "organization_id": "example_organization_id",  # str
    "input": {},  # dict
    "request_id": "example_request_id",  # str
    "version_id": "example_version_id",  # str
})
```


### Binary

Create an instance: `binary = client.Binary()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts_versions` | `bool` |  |
| `arch` | `Any` |  |
| `archived_at` | `str | None` |  |
| `binary` | `dict` |  |
| `created_at` | `str` |  |
| `download_secret` | `str` |  |
| `download_url` | `str` |  |
| `executable` | `str` |  |
| `format` | `Any` |  |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `latest_version` | `Any` |  |
| `launch_args` | `list` |  |
| `name` | `str` |  |
| `needs_refresh` | `bool` |  |
| `operation` | `dict` |  |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `platform` | `Any` |  |
| `project_id` | `str` |  |
| `sha256` | `str` |  |
| `slug` | `str` |  |
| `version` | `dict` |  |
| `version_defaults` | `Any` |  |
| `versions` | `list` |  |
| `window_title` | `str` |  |

#### Example: Load

```python
binary = client.Binary().load({"id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
binarys = client.Binary().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
binary = client.Binary().create({
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


### BinaryVersion

Create an instance: `binary_version = client.BinaryVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arch` | `Any` |  |
| `cancelable` | `bool` |  |
| `configuration` | `dict` |  |
| `configuration_digest` | `str` |  |
| `created_at` | `str` |  |
| `deletable` | `bool` |  |
| `download_secret` | `str` |  |
| `download_url` | `str` |  |
| `environment_uses` | `list` |  |
| `executable` | `str` |  |
| `format` | `Any` |  |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `launch_args` | `list` |  |
| `operation` | `dict` |  |
| `package_sha256` | `str | None` |  |
| `package_size` | `int | None` |  |
| `permissions` | `dict` |  |
| `platform` | `Any` |  |
| `preparations` | `list` |  |
| `retryable` | `bool` |  |
| `sha256` | `str` |  |
| `status` | `str` |  |
| `version` | `dict` |  |
| `window_title` | `str` |  |

#### Example: Load

```python
binary_version = client.BinaryVersion().load({"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
binary_versions = client.BinaryVersion().list({"binary_id": "example", "organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
binary_version = client.BinaryVersion().create({
    "binary_id": "example_binary_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "download_url": "example_download_url",  # str
    "idempotency_key": "example_idempotency_key",  # str
})
```


### BrowserEgressCandidate

Create an instance: `browser_egress_candidate = client.BrowserEgressCandidate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
browser_egress_candidates = client.BrowserEgressCandidate().list({"organization_id": "example"})
```


### BrowserSession

Create an instance: `browser_session = client.BrowserSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `str | None` |  |
| `authentication_status` | `str` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `str | None` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `str | None` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `str | None` |  |
| `closure_basis` | `str | None` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` |  |
| `controller` | `str` |  |
| `credential_id` | `str | None` | Optional configured credential public ID within the selected project. |
| `environment_id` | `str` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `str | None` |  |
| `expires_at` | `str` |  |
| `failure_code` | `str | None` |  |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `initial_url` | `str` |  |
| `max_seconds` | `int` |  |
| `pending_control_id` | `str | None` |  |
| `project_id` | `str | None` | Optional project slug or public ID. |
| `reconciled_at` | `str | None` |  |
| `started_at` | `str | None` |  |
| `status` | `str` |  |
| `url` | `str` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `dict | None` |  |

#### Example: Load

```python
browser_session = client.BrowserSession().load({"id": "browser_session_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
browser_session = client.BrowserSession().create({
    "organization_id": "example_organization_id",  # str
})
```


### BrowserSessionConnection

Create an instance: `browser_session_connection = client.BrowserSessionConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `generation` | `int` |  |
| `idempotency_key` | `str` |  |

#### Example: Create

```python
browser_session_connection = client.BrowserSessionConnection().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
    "generation": 1,  # int
})
```


### BrowserSessionControl

Create an instance: `browser_session_control = client.BrowserSessionControl()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `str` |  |
| `completed_at` | `str | None` |  |
| `completed_generation` | `int | None` |  |
| `connection` | `dict | None` |  |
| `failure_code` | `str | None` |  |
| `id` | `str` |  |
| `requested_controller` | `str` |  |
| `requested_generation` | `int` |  |
| `status` | `str` |  |

#### Example: Load

```python
browser_session_control = client.BrowserSessionControl().load({"id": "browser_session_control_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```


### BrowserSessionEvent

Create an instance: `browser_session_event = client.BrowserSessionEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `str | None` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `payload` | `dict` |  |
| `source_sequence` | `int | None` |  |

#### Example: List

```python
browser_session_events = client.BrowserSessionEvent().list({"browser_session_id": "example", "organization_id": "example"})
```


### BrowserSessionMedia

Create an instance: `browser_session_media = client.BrowserSessionMedia()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `str` |  |
| `capture_omissions` | `dict | None` |  |
| `captured_at` | `str | None` |  |
| `ended_at` | `str | None` |  |
| `failure_code` | `str | None` |  |
| `files` | `list` |  |
| `frames` | `int | None` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `partial` | `bool` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `str` |  |
| `source` | `dict | None` | Screenshot provenance. |
| `status` | `str` |  |
| `stop_requested_at` | `str | None` |  |

#### Example: Load

```python
browser_session_media = client.BrowserSessionMedia().load({"id": "browser_session_media_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```


### BrowserSessionRecording

Create an instance: `browser_session_recording = client.BrowserSessionRecording()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```python
browser_session_recording = client.BrowserSessionRecording().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### BrowserSessionScreenshot

Create an instance: `browser_session_screenshot = client.BrowserSessionScreenshot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idempotency_key` | `str` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```python
browser_session_screenshot = client.BrowserSessionScreenshot().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### BrowserSessionTask

Create an instance: `browser_session_task = client.BrowserSessionTask()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `dict | None` |  |
| `browser_session_id` | `str` |  |
| `cancel_requested_at` | `str | None` |  |
| `completed_at` | `str | None` |  |
| `control_generation` | `int | None` |  |
| `deadline_at` | `str` |  |
| `effects_unknown` | `bool` |  |
| `failure_code` | `str | None` |  |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `instruction` | `str` |  |
| `max_rounds` | `int` |  |
| `max_seconds` | `int` |  |
| `model_selection` | `dict` |  |
| `outcome` | `str | None` |  |
| `result` | `dict` |  |
| `started_at` | `str | None` |  |
| `status` | `str` |  |

#### Example: Load

```python
browser_session_task = client.BrowserSessionTask().load({"id": "browser_session_task_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
browser_session_task = client.BrowserSessionTask().create({
    "browser_session_id": "example_browser_session_id",  # str
    "organization_id": "example_organization_id",  # str
    "instruction": "example_instruction",  # str
})
```


### CatalogSelector

Create an instance: `catalog_selector = client.CatalogSelector()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `dict` |  |

#### Example: List

```python
catalog_selectors = client.CatalogSelector().list({"app_id": "example"})
```


### CdnDeployment

Create an instance: `cdn_deployment = client.CdnDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
cdn_deployment = client.CdnDeployment().load({"id": "cdn_deployment_id", "app_id": "app_id", "cdn_id": "cdn_id"})
```

#### Example: List

```python
cdn_deployments = client.CdnDeployment().list({"app_id": "example", "cdn_id": "example"})
```

#### Example: Create

```python
cdn_deployment = client.CdnDeployment().create({
    "app_id": "example_app_id",  # str
    "cdn_id": "example_cdn_id",  # str
})
```


### CdnHostname

Create an instance: `cdn_hostname = client.CdnHostname()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_cdn_distribution_id` | `str` |  |
| `created_at` | `str` |  |
| `dns_status` | `str` |  |
| `force_ssl` | `bool` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `provider_hostname_id` | `str | None` |  |
| `tls_status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
cdn_hostname = client.CdnHostname().load({"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"})
```

#### Example: List

```python
cdn_hostnames = client.CdnHostname().list({"app_id": "example", "cdn_id": "example"})
```

#### Example: Create

```python
cdn_hostname = client.CdnHostname().create({
    "app_id": "example_app_id",  # str
    "cdn_id": "example_cdn_id",  # str
    "hostname": "example_hostname",  # str
})
```


### CdnSpace

Create an instance: `cdn_space = client.CdnSpace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
cdn_space = client.CdnSpace().load({"id": "cdn_space_id"})
```

#### Example: List

```python
cdn_spaces = client.CdnSpace().list({"organization_id": "example"})
```

#### Example: Create

```python
cdn_space = client.CdnSpace().create({
    "organization_id": "example_organization_id",  # str
})
```


### CdnSpaceObject

Create an instance: `cdn_space_object = client.CdnSpaceObject()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
cdn_space_object = client.CdnSpaceObject().load({"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"})
```

#### Example: List

```python
cdn_space_objects = client.CdnSpaceObject().list({"cdn_space_id": "example"})
```


### ConnectionRequest

Create an instance: `connection_request = client.ConnectionRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `str` |  |
| `auth_scheme` | `str` |  |
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `error_code` | `str | None` |  |
| `generation` | `int` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `remote_agent` | `str | None` |  |
| `retired_at` | `str | None` |  |
| `revoked_at` | `str | None` |  |
| `source_operation_id` | `str | None` |  |
| `state` | `str` |  |

#### Example: Load

```python
connection_request = client.ConnectionRequest().load({"id": "connection_request_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```


### ConnectionSource

Create an instance: `connection_source = client.ConnectionSource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `device_id` | `str` |  |
| `device_name` | `str` |  |
| `provider` | `str` |  |
| `source_operation_id` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
connection_sources = client.ConnectionSource().list({"agent_id": "example", "organization_id": "example"})
```


### CoordinationWait

Create an instance: `coordination_wait = client.CoordinationWait()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_stop` | `bool` |  |
| `expires_at` | `str` |  |
| `id` | `str` |  |
| `status` | `str` |  |
| `stop_state` | `str | None` |  |
| `wake_outcome` | `str | None` |  |

#### Example: List

```python
coordination_waits = client.CoordinationWait().list({"agent_id": "example", "coordination_id": "example", "organization_id": "example"})
```


### CredentialSignInCheck

Create an instance: `credential_sign_in_check = client.CredentialSignInCheck()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` | The project environment (app) to sign in to |
| `environment_name` | `str` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Create

```python
credential_sign_in_check = client.CredentialSignInCheck().create({
    "credential_id": "example_credential_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "environment_id": "example_environment_id",  # str
})
```


### DataResourceRotateCredential

Create an instance: `data_resource_rotate_credential = client.DataResourceRotateCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `created_at` | `str` |  |
| `engine` | `str` |  |
| `failure_message` | `str | None` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `name` | `str` |  |
| `plan` | `str | None` |  |
| `provider_metadata` | `dict` |  |
| `region` | `str | None` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `storage_gb` | `int | None` |  |
| `storage_label` | `str | None` |  |
| `updated_at` | `str` |  |
| `version` | `str | None` |  |

#### Example: Create

```python
data_resource_rotate_credential = client.DataResourceRotateCredential().create({
    "app_id": "example_app_id",  # str
    "data_resource_id": "example_data_resource_id",  # str
})
```


### DeepScan

Create an instance: `deep_scan = client.DeepScan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `active` | `list` |  |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` |  |
| `environment_name` | `str` |  |
| `explorations` | `list` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `launch_options` | `dict` | Present only when launch was requested by an admin |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `dict` |  |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Load

```python
deep_scan = client.DeepScan().load({"id": "deep_scan_id", "organization_id": "organization_id"})
```

#### Example: List

```python
deep_scans = client.DeepScan().list({"organization_id": "example"})
```

#### Example: Create

```python
deep_scan = client.DeepScan().create({
    "organization_id": "example_organization_id",  # str
    "environment_id": "example_environment_id",  # str
    "goal": "example_goal",  # str
})
```


### DeepScanFinding

Create an instance: `deep_scan_finding = client.DeepScanFinding()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding_count` | `int` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `list` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `list` |  |
| `findings_fix_prompt` | `str | None` |  |
| `free_findings_pending` | `bool` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `str` |  |
| `mode` | `str` |  |
| `permissions` | `dict` |  |
| `priority` | `str | None` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` |  |
| `reproduction_of` | `dict | None` |  |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `str` |  |
| `title` | `str` |  |
| `unlock` | `dict` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `str` |  |

#### Example: List

```python
deep_scan_findings = client.DeepScanFinding().list({"deep_scan_id": "example", "organization_id": "example"})
```


### DeepScanFlow

Create an instance: `deep_scan_flow = client.DeepScanFlow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `concurrency` | `int` |  |
| `environment_id` | `str` |  |
| `exploration_id` | `str` |  |
| `flow_names` | `list` |  |
| `idempotency_key` | `str` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `note` | `str | None` |  |

#### Example: Create

```python
deep_scan_flow = client.DeepScanFlow().create({
    "organization_id": "example_organization_id",  # str
    "flow_names": [],  # list
})
```


### DeepScanMappedFlow

Create an instance: `deep_scan_mapped_flow = client.DeepScanMappedFlow()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `environment_id` | `str` |  |
| `flow_map` | `dict | None` |  |
| `revision_id` | `str | None` |  |

#### Example: List

```python
deep_scan_mapped_flows = client.DeepScanMappedFlow().list({"organization_id": "example", "environment_id": "example"})
```


### DeepScanOption

Create an instance: `deep_scan_option = client.DeepScanOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `list` |  |
| `deep_scan_defaults` | `Any` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `dict | None` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `str` |  |
| `name` | `str` |  |
| `personas` | `list` |  |
| `preview` | `bool` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `str | None` |  |

#### Example: List

```python
deep_scan_options = client.DeepScanOption().list({"organization_id": "example"})
```


### DemoShare

Create an instance: `demo_share = client.DemoShare()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `str` |  |
| `id` | `str` |  |
| `recording` | `dict` |  |
| `summary` | `str` | What the recorded browser confirmed. |

#### Example: Load

```python
demo_share = client.DemoShare().load({"id": "demo_share_id"})
```


### DemoShareSegment

Create an instance: `demo_share_segment = client.DemoShareSegment()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
demo_share_segment = client.DemoShareSegment().load({"id": "demo_share_segment_id", "demo_share_id": "demo_share_id"})
```


### DeploymentDashboardNomad

Create an instance: `deployment_dashboard_nomad = client.DeploymentDashboardNomad()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentFile

Create an instance: `deployment_file = client.DeploymentFile()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DomainPathRule

Create an instance: `domain_path_rule = client.DomainPathRule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_kind` | `str` |  |
| `app_service_endpoint_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `backend_ref` | `str | None` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `last_error` | `str | None` |  |
| `path_prefix` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
domain_path_rule = client.DomainPathRule().load({"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"})
```

#### Example: List

```python
domain_path_rules = client.DomainPathRule().list({"app_id": "example", "domain_id": "example"})
```

#### Example: Create

```python
domain_path_rule = client.DomainPathRule().create({
    "app_id": "example_app_id",  # str
    "domain_id": "example_domain_id",  # str
    "app_service_id": "example_app_service_id",  # str | None
    "path_prefix": "example_path_prefix",  # str
})
```


### Dream

Create an instance: `dream = client.Dream()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `bool` | The dream skipped at least one run, which will not be retried |
| `changes` | `list` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `str | None` |  |
| `counts` | `dict` |  |
| `dream` | `Any` |  |
| `error_code` | `str | None` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `str` | Public id used in the dream's URL |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `phase` | `str` | Where the dream is. |
| `reason` | `str | None` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `str` | Local day whose finished runs it reviewed |
| `runs` | `list` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `str` | Project or unassigned environment name |
| `skipped` | `int` | Runs skipped after repeated rejected review output |
| `tab` | `str` |  |
| `timezone` | `str` | Organization timezone the dream used |

#### Example: Load

```python
dream = client.Dream().load({"id": "dream_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
dreams = client.Dream().list({"organization_id": "example", "project_id": "example"})
```


### Environment

Create an instance: `environment = client.Environment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_revision_id` | `str | None` |  |
| `agent_sign_up_available` | `bool` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `str` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `dict` |  |
| `cleanup` | `list` |  |
| `connection` | `str` |  |
| `created_at` | `str` |  |
| `default_policy` | `dict` |  |
| `default_policy_json` | `dict` |  |
| `discovery_defaults` | `dict` |  |
| `environment` | `dict` |  |
| `exploration_accounts` | `list` |  |
| `explorations` | `list` |  |
| `first_run` | `Any` |  |
| `hosted_app_id` | `str | None` |  |
| `id` | `str` |  |
| `imessage_number` | `str | None` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` |  |
| `managed_google_available` | `bool` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `str` |  |
| `messaging_tester_number` | `str | None` | One configured tester number. |
| `name` | `str` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `list` |  |
| `onboarding_discovery` | `Any` |  |
| `organization_id` | `str` |  |
| `pending_accounts` | `list` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `dict` |  |
| `project_id` | `str | None` | Owning project. |
| `repository_id` | `str | None` |  |
| `revisions` | `list` |  |
| `setup_discovery_id` | `str | None` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `str` |  |
| `status` | `str` |  |
| `target_kind` | `str | None` |  |
| `target_url` | `str | None` |  |
| `test_accounts` | `dict` |  |
| `updated_at` | `str` |  |
| `verify_network_connection_id` | `str | None` |  |
| `version` | `int` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```python
environment = client.Environment().load({"id": "environment_id", "organization_id": "organization_id"})
```

#### Example: List

```python
environments = client.Environment().list({"organization_id": "example"})
```

#### Example: Create

```python
environment = client.Environment().create({
    "organization_id": "example_organization_id",  # str
    "slug": "example_slug",  # str
})
```


### EnvironmentDiscoveryRun

Create an instance: `environment_discovery_run = client.EnvironmentDiscoveryRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` | Omit for anonymous exploration |
| `deadline_at` | `str` |  |
| `environment_revision_id` | `str` |  |
| `evidence` | `list` |  |
| `failure_code` | `str | None` |  |
| `id` | `str` |  |
| `queued_at` | `str` |  |
| `recording` | `dict` |  |
| `result` | `dict | None` |  |
| `status` | `str` |  |

#### Example: Load

```python
environment_discovery_run = client.EnvironmentDiscoveryRun().load({"id": "environment_discovery_run_id", "environment_id": "environment_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
environment_discovery_run = client.EnvironmentDiscoveryRun().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### EnvironmentExploration

Create an instance: `environment_exploration = client.EnvironmentExploration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` |  |
| `environment_name` | `str` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `persona_id` | `str | None` |  |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Create

```python
environment_exploration = client.EnvironmentExploration().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "goal": "example_goal",  # str
})
```


### EnvironmentFirstRun

Create an instance: `environment_first_run = client.EnvironmentFirstRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### EnvironmentRevision

Create an instance: `environment_revision = client.EnvironmentRevision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `list` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `str | None` |  |
| `app_release_id` | `str | None` |  |
| `blueprint` | `dict` |  |
| `blueprint_json` | `dict` |  |
| `cleanup_state` | `str` |  |
| `created_at` | `str` |  |
| `digest` | `str` |  |
| `dry_run` | `bool` |  |
| `expires_at` | `str | None` |  |
| `id` | `str` |  |
| `organization_id` | `str` |  |
| `ready_at` | `str | None` |  |
| `resolved_manifest_json` | `dict` |  |
| `retention_policy_json` | `dict` |  |
| `revision` | `int` |  |
| `revoked_at` | `str | None` |  |
| `runner_environment_revision_id` | `str | None` |  |
| `safety_policy_json` | `dict` |  |
| `schema_version` | `int` |  |
| `source_metadata` | `dict` |  |
| `source_metadata_json` | `dict` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `validation_json` | `dict` |  |
| `verify_environment_id` | `str` |  |

#### Example: Load

```python
environment_revision = client.EnvironmentRevision().load({"id": "environment_revision_id", "environment_id": "environment_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
environment_revision = client.EnvironmentRevision().create({
    "environment_id": "example_environment_id",  # str
    "organization_id": "example_organization_id",  # str
    "blueprint": {},  # dict
})
```


### EnvironmentSecretBinding

Create an instance: `environment_secret_binding = client.EnvironmentSecretBinding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `str` |  |
| `id` | `str` |  |
| `mode` | `str` |  |
| `secret_id` | `str` |  |
| `secret_version_id` | `str` |  |

#### Example: List

```python
environment_secret_bindings = client.EnvironmentSecretBinding().list({"app_id": "example", "environment_id": "example"})
```

#### Example: Create

```python
environment_secret_binding = client.EnvironmentSecretBinding().create({
    "app_id": "example_app_id",  # str
    "environment_id": "example_environment_id",  # str
    "env_key": "example_env_key",  # str
})
```


### EnvironmentTestAccount

Create an instance: `environment_test_account = client.EnvironmentTestAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `bool` |  |
| `credentials` | `list` |  |
| `id` | `str` |  |
| `persona` | `str` |  |
| `revision_id` | `str` |  |
| `role` | `str` |  |
| `tenant` | `str` |  |

#### Example: List

```python
environment_test_accounts = client.EnvironmentTestAccount().list({"environment_id": "example", "organization_id": "example"})
```


### Evidence

Create an instance: `evidence = client.Evidence()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
evidence = client.Evidence().load({"id": "evidence_id", "organization_id": "organization_id"})
```


### Exploration

Create an instance: `exploration = client.Exploration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `active` | `list` |  |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` |  |
| `environment_name` | `str` |  |
| `explorations` | `list` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `launch_options` | `dict` | Present only when launch was requested by an admin |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `dict` |  |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `persona_id` | `str | None` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Load

```python
exploration = client.Exploration().load({"id": "exploration_id", "organization_id": "organization_id"})
```

#### Example: List

```python
explorations = client.Exploration().list({"organization_id": "example"})
```

#### Example: Create

```python
exploration = client.Exploration().create({
    "organization_id": "example_organization_id",  # str
    "environment_id": "example_environment_id",  # str
    "goal": "example_goal",  # str
})
```


### ExplorationMessage

Create an instance: `exploration_message = client.ExplorationMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` |  |
| `environment_name` | `str` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `text` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Create

```python
exploration_message = client.ExplorationMessage().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
    "text": "example_text",  # str
})
```


### ExplorationReport

Create an instance: `exploration_report = client.ExplorationReport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ExplorationScenario

Create an instance: `exploration_scenario = client.ExplorationScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `dict` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `list` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `list` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `list` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `str` |  |
| `deadline_at` | `str` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `str` |  |
| `environment_name` | `str` |  |
| `explorer_activity` | `dict` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `list` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `str | None` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `str | None` |  |
| `goal` | `str` |  |
| `huntable_flows` | `list` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `str` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `str` |  |
| `next_scan_improvements` | `list` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `str` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `dict` |  |
| `priority_counts` | `dict` |  |
| `project_id` | `str | None` | Set when the exploration targets a project environment. |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `reproduction_of` | `dict | None` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `list` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `list` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `dict` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `str` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `str | None` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `str` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `str` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `Any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `str` | The run's page in the Composal web app |

#### Example: Create

```python
exploration_scenario = client.ExplorationScenario().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### Finding

Create an instance: `finding = client.Finding()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `str` |  |
| `created_at` | `str` |  |
| `deferred_until` | `str | None` | Required future time when status is deferred |
| `finding` | `dict` |  |
| `fingerprint` | `str` |  |
| `first_seen_at` | `str` |  |
| `id` | `str` |  |
| `last_seen_at` | `str` |  |
| `locked` | `bool` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` |  |
| `organization_id` | `str` |  |
| `permissions` | `dict` |  |
| `reason` | `str` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `dict | None` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `str | None` |  |
| `safe_summary` | `str` |  |
| `scenario_occurrences` | `list` |  |
| `severity` | `str` |  |
| `status` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `verification` | `Any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```python
finding = client.Finding().load({"id": "finding_id", "organization_id": "organization_id"})
```

#### Example: List

```python
findings = client.Finding().list({"organization_id": "example"})
```


### GithubConnection

Create an instance: `github_connection = client.GithubConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `list` |  |
| `github_app_installation_id` | `str` |  |
| `installations` | `list` |  |
| `project_id` | `str` | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `list` |  |

#### Example: List

```python
github_connections = client.GithubConnection().list({"organization_id": "example"})
```

#### Example: Create

```python
github_connection = client.GithubConnection().create({
    "organization_id": "example_organization_id",  # str
    "github_app_installation_id": "example_github_app_installation_id",  # str
    "repositories": [],  # list
})
```


### HostingAppDomain

Create an instance: `hosting_app_domain = client.HostingAppDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `certificate` | `dict | None` |  |
| `created_at` | `str` |  |
| `dns_mode` | `str` |  |
| `dns_status` | `str` |  |
| `failure_message` | `str | None` |  |
| `hosted_app_id` | `str` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `last_checked_at` | `str | None` |  |
| `path_rules` | `list` |  |
| `record_name` | `str | None` |  |
| `record_type` | `str | None` |  |
| `record_value` | `str | None` |  |
| `redirect_to` | `str | None` |  |
| `static_site_id` | `str | None` |  |
| `target_kind` | `str` |  |
| `tls_status` | `str` |  |
| `updated_at` | `str` |  |
| `verification_record` | `dict | None` |  |
| `verification_status` | `str` |  |

#### Example: Load

```python
hosting_app_domain = client.HostingAppDomain().load({"id": "hosting_app_domain_id", "app_id": "app_id"})
```

#### Example: List

```python
hosting_app_domains = client.HostingAppDomain().list({"app_id": "example"})
```

#### Example: Create

```python
hosting_app_domain = client.HostingAppDomain().create({
    "app_id": "example_app_id",  # str
    "app_service_id": "example_app_service_id",  # str | None
    "hostname": "example_hostname",  # str
    "kind": "example_kind",  # str
})
```


### ImageRepository

Create an instance: `image_repository = client.ImageRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_configured` | `bool` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `hosted_app_id` | `str | None` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `provider_kind` | `str` |  |
| `registry_auth_token` | `str` |  |
| `repository_path` | `str` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |
| `visibility` | `str` |  |

#### Example: List

```python
image_repositorys = client.ImageRepository().list({"organization_id": "example"})
```

#### Example: Create

```python
image_repository = client.ImageRepository().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### Integration

Create an instance: `integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `dict` |  |
| `gitlab` | `dict` |  |
| `permissions` | `dict` |  |
| `slack` | `dict` |  |

#### Example: List

```python
integrations = client.Integration().list({"organization_id": "example"})
```


### InteractionResponse

Create an instance: `interaction_response = client.InteractionResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `dict` |  |
| `conversation_id` | `str` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` |  |

#### Example: Create

```python
interaction_response = client.InteractionResponse().create({
    "agent_id": "example_agent_id",  # str
    "interaction_id": "example_interaction_id",  # str
    "organization_id": "example_organization_id",  # str
    "answer": {},  # dict
    "conversation_id": "example_conversation_id",  # str
    "expected_revision": 1,  # int
})
```


### Invitation

Create an instance: `invitation = client.Invitation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `str | None` |  |
| `accepted_by_user` | `Any` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `email` | `str` |  |
| `email_delivery_status` | `str` |  |
| `expires_at` | `str | None` |  |
| `expires_at_label` | `str | None` |  |
| `id` | `str` |  |
| `invite_url` | `str | None` |  |
| `invited_by_user` | `Any` |  |
| `organization` | `dict` |  |
| `revoked_at` | `str | None` |  |
| `role` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |

#### Example: List

```python
invitations = client.Invitation().list({"organization_id": "example"})
```

#### Example: Create

```python
invitation = client.Invitation().create({
    "organization_id": "example_organization_id",  # str
    "email": "example_email",  # str
    "role": "example_role",  # str
})
```


### JourneyVariantReplay

Create an instance: `journey_variant_replay = client.JourneyVariantReplay()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `str | None` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `str` |  |
| `failure_code` | `str | None` |  |
| `failure_message` | `str | None` |  |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `max_seconds` | `int` |  |
| `preparation_receipt` | `dict | None` |  |
| `qualification` | `Any` |  |
| `qualification_status` | `str` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `str` |  |
| `run_id` | `str | None` |  |
| `scenario_file` | `dict` |  |
| `scenario_run_id` | `str | None` |  |
| `source_digest` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `variant_id` | `str` |  |

#### Example: Create

```python
journey_variant_replay = client.JourneyVariantReplay().create({
    "journey_variant_id": "example_journey_variant_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
    "review_reason": "example_review_reason",  # str
    "scenario_file": {},  # dict
})
```


### Knowledge

Create an instance: `knowledge = client.Knowledge()`

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
| `content_digest` | `str` |  |
| `content_json` | `dict` |  |
| `document` | `dict` |  |
| `documents` | `list` |  |
| `dreaming` | `dict` |  |
| `expected_digest` | `str` |  |
| `history` | `list` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `markdown` | `str` |  |
| `observed_at` | `str` |  |
| `organization` | `dict` |  |
| `permissions` | `dict` |  |
| `project_id` | `str` |  |
| `project_name` | `str` |  |
| `projects` | `list` |  |
| `selected_project_id` | `str | None` |  |
| `source` | `dict` |  |
| `title` | `str` |  |
| `total` | `int` |  |

#### Example: Load

```python
knowledge = client.Knowledge().load({"id": "knowledge_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
knowledge = client.Knowledge().create({
    "organization_id": "example_organization_id",  # str
    "markdown": "example_markdown",  # str
    "project_id": "example_project_id",  # str
    "title": "example_title",  # str
})
```


### LocalThreadDelivery

Create an instance: `local_thread_delivery = client.LocalThreadDelivery()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `str` |  |
| `decision_pending` | `bool` |  |
| `delivery` | `dict` |  |
| `expected_version` | `int` |  |
| `id` | `str` |  |
| `policy` | `dict` |  |
| `recovery_message` | `str | None` |  |

#### Example: Load

```python
local_thread_delivery = client.LocalThreadDelivery().load({"id": "local_thread_delivery_id", "agent_id": "agent_id", "local_thread_id": "local_thread_id", "organization_id": "organization_id"})
```


### LocalThreadOperation

Create an instance: `local_thread_operation = client.LocalThreadOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `arguments` | `dict` |  |
| `created_at` | `str` |  |
| `delivery` | `dict` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `str` |  |
| `diagnostic_code` | `str` | Approved product error code retained after copied diagnostics expire. |
| `end` | `dict` |  |
| `expires_at` | `str` |  |
| `id` | `str` |  |
| `key` | `str` |  |
| `provider` | `str` |  |
| `references` | `dict` |  |
| `result` | `Any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `str` |  |

#### Example: Load

```python
local_thread_operation = client.LocalThreadOperation().load({"id": "local_thread_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
local_thread_operation = client.LocalThreadOperation().create({
    "agent_id": "example_agent_id",  # str
    "local_thread_id": "example_local_thread_id",  # str
    "organization_id": "example_organization_id",  # str
    "action": "example_action",  # str
    "arguments": {},  # dict
    "key": "example_key",  # str
})
```


### Location

Create an instance: `location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `created_at` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `nomad_datacenter` | `str` |  |
| `updated_at` | `str` |  |

#### Example: List

```python
locations = client.Location().list()
```


### Me

Create an instance: `me = client.Me()`

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
| `active_organization` | `Any` |  |
| `analytics_distinct_id` | `str` |  |
| `analytics_internal` | `bool` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `str` |  |
| `api_token` | `str` |  |
| `app_promotion` | `dict` |  |
| `commit_author_email` | `str` |  |
| `email` | `str` |  |
| `enabled_features` | `list` |  |
| `github_pr_user_authorization_connected` | `bool` |  |
| `github_pr_user_authorization_login` | `str | None` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `str` |  |
| `impersonation` | `dict | None` |  |
| `name` | `str | None` |  |
| `next_path` | `str` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `dict` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` |  |
| `openai_sign_in_enabled` | `bool` |  |
| `organizations` | `list` |  |
| `pending_organization_invitation_count` | `int` |  |
| `pending_organization_invitation_count_label` | `str` |  |
| `picture_url` | `str | None` |  |
| `superadmin` | `bool` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `str | None` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```python
me = client.Me().load({"id": "me_id"})
```


### MeEmail

Create an instance: `me_email = client.MeEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `bool` |  |
| `can_delete` | `bool` |  |
| `can_resend_verification` | `bool` |  |
| `can_set_account` | `bool` |  |
| `can_set_commit_author` | `bool` |  |
| `commit_author` | `bool` |  |
| `email` | `str` |  |
| `emails` | `list` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `verification_status` | `str` |  |
| `verified` | `bool` |  |

#### Example: List

```python
me_emails = client.MeEmail().list()
```

#### Example: Create

```python
me_email = client.MeEmail().create({
    "email": "example_email",  # str
})
```


### MeOnboarding

Create an instance: `me_onboarding = client.MeOnboarding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### MediaFile

Create an instance: `media_file = client.MediaFile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
media_file = client.MediaFile().load({"id": "media_file_id", "browser_session_id": "browser_session_id", "media_id": "media_id", "organization_id": "organization_id"})
```


### Member

Create an instance: `member = client.Member()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `str | None` |  |
| `accepted_by_user` | `Any` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `email` | `str` |  |
| `email_delivery_status` | `str` |  |
| `expires_at` | `str | None` |  |
| `expires_at_label` | `str | None` |  |
| `id` | `str` |  |
| `invite_url` | `str | None` |  |
| `invited_by_user` | `Any` |  |
| `is_self` | `bool` |  |
| `organization` | `dict` |  |
| `revoked_at` | `str | None` |  |
| `role` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |
| `user` | `dict` |  |

#### Example: List

```python
members = client.Member().list({"organization_id": "example"})
```


### Memory

Create an instance: `memory = client.Memory()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `str` |  |
| `created_at` | `str` |  |
| `environment_id` | `str` |  |
| `finding` | `str` |  |
| `history` | `list` |  |
| `id` | `str` |  |
| `indexed_at` | `str | None` |  |
| `memory` | `dict` |  |
| `project_id` | `str` |  |
| `response` | `str` |  |
| `scope` | `dict` |  |
| `source` | `dict` |  |
| `tags` | `list` |  |
| `title` | `str` |  |
| `workaround` | `str` |  |

#### Example: Load

```python
memory = client.Memory().load({"id": "memory_id", "organization_id": "organization_id"})
```

#### Example: List

```python
memorys = client.Memory().list({"organization_id": "example"})
```

#### Example: Create

```python
memory = client.Memory().create({
    "organization_id": "example_organization_id",  # str
    "finding": "example_finding",  # str
    "title": "example_title",  # str
})
```


### MergeRequest

Create an instance: `merge_request = client.MergeRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `list` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `str` |  |
| `branch` | `str` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `str | None` |  |
| `current_run` | `Any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` |  |
| `findings` | `list` |  |
| `github_repository` | `str | None` | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` |  |
| `head_sha` | `str` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `number` | `int` |  |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `str | None` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Any` |  |
| `project_id` | `str | None` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `str | None` |  |
| `provider` | `str` |  |
| `pull_request` | `dict` |  |
| `repository_id` | `str` |  |
| `request_label` | `str` |  |
| `requested_run_id` | `str | None` |  |
| `runs` | `list` |  |
| `source_branch` | `str | None` |  |
| `source_repository` | `str | None` |  |
| `source_url` | `str | None` |  |
| `state` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `web_path` | `str` |  |

#### Example: Load

```python
merge_request = client.MergeRequest().load({"id": "merge_request_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
merge_request = client.MergeRequest().create({
    "organization_id": "example_organization_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
    "number": 1,  # int
})
```


### MessagingConversationMessage

Create an instance: `messaging_conversation_message = client.MessagingConversationMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `client_operation_id` | `str` |  |
| `content` | `str` |  |
| `id` | `str` |  |
| `media` | `dict` |  |
| `media_upload_ids` | `list` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `list` |  |
| `reply_to` | `str` | Public ID of a visible message |
| `retry_attachment` | `bool` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `str | None` |  |
| `send_disposition` | `str` |  |
| `send_error` | `str | None` |  |
| `send_style` | `str | None` |  |

#### Example: Create

```python
messaging_conversation_message = client.MessagingConversationMessage().create({
    "messaging_conversation_id": "example_messaging_conversation_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "client_operation_id": "example_client_operation_id",  # str
    "content": "example_content",  # str
    "media": {},  # dict
})
```


### MessagingConversationUpload

Create an instance: `messaging_conversation_upload = client.MessagingConversationUpload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `dict` |  |
| `upload_id` | `str` |  |

#### Example: Create

```python
messaging_conversation_upload = client.MessagingConversationUpload().create({
    "messaging_conversation_id": "example_messaging_conversation_id",  # str
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```


### MetricQuery

Create an instance: `metric_query = client.MetricQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
metric_querys = client.MetricQuery().list()
```


### NetworkConnection

Create an instance: `network_connection = client.NetworkConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_client_vpn_profile` | `str` |  |
| `created_at` | `str` |  |
| `device_tag` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `oauth_client_id` | `str` |  |
| `oauth_client_secret` | `str` |  |
| `provider` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Create

```python
network_connection = client.NetworkConnection().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```


### NomadAllocation

Create an instance: `nomad_allocation = client.NomadAllocation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `str` |  |
| `client_status` | `str | None` |  |
| `create_time` | `str | None` |  |
| `datacenter` | `str | None` |  |
| `desired_description` | `str | None` |  |
| `desired_status` | `str | None` |  |
| `fetched_at` | `str` |  |
| `id` | `str` |  |
| `job_id` | `str | None` |  |
| `modify_time` | `str | None` |  |
| `name` | `str | None` |  |
| `namespace` | `str` |  |
| `node_id` | `str | None` |  |
| `node_name` | `str | None` |  |
| `resources` | `dict` |  |
| `task_group` | `str | None` |  |
| `task_states` | `list` |  |
| `verify_runner_images` | `list` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```python
nomad_allocation = client.NomadAllocation().load({"id": "nomad_allocation_id", "app_id": "app_id"})
```


### NomadLog

Create an instance: `nomad_log = client.NomadLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `str` |  |
| `environment` | `str` |  |
| `fetched_at` | `str` |  |
| `location` | `str | None` |  |
| `logs` | `str` |  |
| `namespace` | `str` |  |
| `offset` | `int` |  |
| `origin` | `str` |  |
| `service` | `str` |  |
| `task` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
nomad_logs = client.NomadLog().list({"app_id": "example"})
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `list` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `google_workspace_domain` | `str | None` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `str` |  |
| `logo_url` | `str | None` |  |
| `member_count` | `int` |  |
| `name` | `str` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `str | None` |  |
| `sandbox_region` | `str` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `str` |  |
| `source_control_providers` | `list` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `str` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Load

```python
organization = client.Organization().load({"id": "organization_id"})
```

#### Example: List

```python
organizations = client.Organization().list()
```

#### Example: Create

```python
organization = client.Organization().create({
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### Page

Create an instance: `page = client.Page()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `list` |  |
| `checkout_required` | `bool` |  |
| `cli_signed_in_at` | `str | None` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `dict` |  |
| `demo_project` | `dict | None` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `list` |  |
| `included_deep_scan` | `bool` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `Any` |  |
| `organization` | `dict` |  |
| `permissions` | `dict` |  |
| `project` | `Any` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `list` |  |
| `pull_requests` | `list` |  |
| `repositories` | `list` |  |
| `runs` | `list` |  |
| `runs_pagination` | `dict` |  |
| `suggested_app_url` | `str | None` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```python
page = client.Page().load({"organization_id": "organization_id"})
```


### PageAgent

Create an instance: `page_agent = client.PageAgent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `list` |  |
| `can_edit_integration_connections` | `bool` |  |
| `creation_enabled` | `bool` |  |
| `inbox` | `Any` |  |
| `integration_choices` | `list` |  |
| `integration_choices_truncated` | `bool` |  |
| `integration_selected` | `list` |  |
| `model_choices` | `list` |  |
| `new_configuration` | `Any` |  |
| `organization_id` | `str` |  |
| `pagination` | `dict` |  |
| `pinned_agent` | `Any` |  |
| `platform_event_types` | `list` |  |
| `repository_choices` | `list` | Empty compatibility field. |
| `repository_choices_truncated` | `bool` |  |
| `runtime_versions` | `list` | Runtime choices authorized for this organization. |
| `selected_agent` | `Any` |  |
| `selected_reference` | `str | None` |  |
| `viewer_id` | `str` |  |

#### Example: List

```python
page_agents = client.PageAgent().list({"organization_id": "example"})
```


### PageProjectRun

Create an instance: `page_project_run = client.PageProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `list` |  |
| `fix_scenario_count` | `int` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `list` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` |  |
| `id` | `str` |  |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `preparation_reason` | `str | None` |  |
| `project` | `dict` |  |
| `run` | `dict` |  |
| `scenario_runs` | `list` |  |
| `selected_scenario_run` | `Any` |  |
| `web_path` | `str` |  |

#### Example: Load

```python
page_project_run = client.PageProjectRun().load({"id": "page_project_run_id", "organization_id": "organization_id", "project_id": "project_id"})
```


### PagesProjectCredential

Create an instance: `pages_project_credential = client.PagesProjectCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `dict | None` |  |
| `composal_address` | `str | None` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` |  |
| `credential_keys` | `dict` |  |
| `description` | `str | None` |  |
| `email_link_auth_origins` | `list` |  |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `str` |  |
| `identity_provider` | `dict | None` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `str | None` |  |
| `login_method` | `str` |  |
| `login_url` | `str` |  |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `str` |  |
| `project_id` | `str` |  |
| `provider_guidance` | `str` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `str | None` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `username` | `str` |  |

#### Example: List

```python
pages_project_credentials = client.PagesProjectCredential().list({"organization_id": "example", "project_id": "example"})
```


### PagesProjectPersona

Create an instance: `pages_project_persona = client.PagesProjectPersona()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_count` | `int` |  |
| `credentials` | `list` |  |
| `needs_attention_count` | `int` |  |
| `permissions` | `dict` |  |
| `persona_states` | `dict` | Scenarios by the state of their latest execution. |
| `personas` | `list` |  |
| `project` | `dict` |  |

#### Example: List

```python
pages_project_personas = client.PagesProjectPersona().list({"organization_id": "example", "project_id": "example"})
```


### PagesProjectRun

Create an instance: `pages_project_run = client.PagesProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_query` | `str` |  |
| `environments` | `list` |  |
| `environments_has_more` | `bool` |  |
| `pagination` | `dict` |  |
| `runs` | `list` |  |
| `selected_environment` | `Any` |  |

#### Example: List

```python
pages_project_runs = client.PagesProjectRun().list({"organization_id": "example", "project_id": "example"})
```


### PagesProjectScenario

Create an instance: `pages_project_scenario = client.PagesProjectScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `str | None` |  |
| `id` | `str` |  |
| `kind` | `str | None` |  |
| `name` | `str` |  |

#### Example: List

```python
pages_project_scenarios = client.PagesProjectScenario().list({"organization_id": "example", "project_id": "example"})
```


### PersonalAccessToken

Create an instance: `personal_access_token = client.PersonalAccessToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
personal_access_tokens = client.PersonalAccessToken().list()
```

#### Example: Create

```python
personal_access_token = client.PersonalAccessToken().create({
})
```


### PreviewOperation

Create an instance: `preview_operation = client.PreviewOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
preview_operations = client.PreviewOperation().list({"app_id": "example", "preview_id": "example"})
```


### PreviewProfileSecretBinding

Create an instance: `preview_profile_secret_binding = client.PreviewProfileSecretBinding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `str` |  |
| `id` | `str` |  |
| `mode` | `str` |  |
| `secret_id` | `str` |  |
| `secret_version_id` | `str` |  |

#### Example: List

```python
preview_profile_secret_bindings = client.PreviewProfileSecretBinding().list({"app_id": "example", "preview_profile_id": "example"})
```

#### Example: Create

```python
preview_profile_secret_binding = client.PreviewProfileSecretBinding().create({
    "app_id": "example_app_id",  # str
    "preview_profile_id": "example_preview_profile_id",  # str
    "env_key": "example_env_key",  # str
})
```


### PreviewSecret

Create an instance: `preview_secret = client.PreviewSecret()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `slug` | `str` |  |
| `value` | `str` |  |

#### Example: Create

```python
preview_secret = client.PreviewSecret().create({
    "app_id": "example_app_id",  # str
    "preview_id": "example_preview_id",  # str
    "env_key": "example_env_key",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
    "value": "example_value",  # str
})
```


### PreviewSharingApproval

Create an instance: `preview_sharing_approval = client.PreviewSharingApproval()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `list` |  |
| `approved_build_secrets` | `list` |  |
| `approved_default_configuration` | `list` |  |
| `approved_default_secrets` | `list` |  |
| `approved_source_keys` | `list` |  |
| `build_keys` | `list` |  |
| `build_secrets` | `list` |  |
| `default_configuration` | `list` |  |
| `default_secrets` | `list` |  |
| `services` | `list` |  |
| `snapshot_version` | `int` |  |
| `source_keys` | `list` |  |

#### Example: List

```python
preview_sharing_approvals = client.PreviewSharingApproval().list({"app_id": "example", "preview_id": "example"})
```

#### Example: Create

```python
preview_sharing_approval = client.PreviewSharingApproval().create({
    "app_id": "example_app_id",  # str
    "preview_id": "example_preview_id",  # str
    "snapshot_version": 1,  # int
})
```


### ProductMapIdentityDecision

Create an instance: `product_map_identity_decision = client.ProductMapIdentityDecision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `list` |  |
| `operation` | `str` |  |
| `reason` | `str` |  |
| `target` | `dict` |  |

#### Example: Create

```python
product_map_identity_decision = client.ProductMapIdentityDecision().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "observations": [],  # list
    "operation": "example_operation",  # str
    "reason": "example_reason",  # str
    "target": {},  # dict
})
```


### ProductMapJourney

Create an instance: `product_map_journey = client.ProductMapJourney()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `str | None` |  |
| `goal` | `str` |  |
| `id` | `str` |  |
| `journey` | `dict` |  |
| `next_cursor` | `str | None` |  |
| `preview` | `Any` |  |
| `scope` | `dict` |  |
| `title` | `str` |  |
| `tree` | `dict` |  |
| `tree_loaded` | `bool` |  |
| `variant_count` | `int` |  |
| `variants` | `list` |  |

#### Example: Load

```python
product_map_journey = client.ProductMapJourney().load({"id": "product_map_journey_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
product_map_journeys = client.ProductMapJourney().list({"organization_id": "example", "project_id": "example"})
```


### ProductMapJourneyReplay

Create an instance: `product_map_journey_replay = client.ProductMapJourneyReplay()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `str | None` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `str` |  |
| `failure_code` | `str | None` |  |
| `failure_message` | `str | None` |  |
| `id` | `str` |  |
| `preparation_receipt` | `dict | None` |  |
| `qualification` | `Any` |  |
| `qualification_status` | `str` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `str` |  |
| `run_id` | `str | None` |  |
| `scenario_run_id` | `str | None` |  |
| `source_digest` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `variant_id` | `str` |  |

#### Example: Load

```python
product_map_journey_replay = client.ProductMapJourneyReplay().load({"id": "product_map_journey_replay_id", "organization_id": "organization_id", "project_id": "project_id"})
```


### ProductMapObservation

Create an instance: `product_map_observation = client.ProductMapObservation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `dict` |  |
| `events` | `list` |  |
| `evidence_id` | `str` |  |
| `id` | `str` |  |
| `observation_id` | `str` |  |
| `scope` | `dict` |  |
| `state` | `Any` |  |
| `status` | `str` |  |

#### Example: Load

```python
product_map_observation = client.ProductMapObservation().load({"id": "product_map_observation_id", "organization_id": "organization_id", "project_id": "project_id"})
```


### ProductMapQuestion

Create an instance: `product_map_question = client.ProductMapQuestion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` |  |
| `area` | `str` |  |
| `before` | `str` |  |
| `claims` | `list` |  |
| `evidence_truncated` | `bool` |  |
| `model` | `str` |  |
| `persona_id` | `str` |  |
| `query` | `str` |  |
| `question` | `str` |  |
| `reasoning_effort` | `str` |  |
| `revision_id` | `str` |  |
| `scope` | `dict` |  |
| `since` | `str` |  |
| `state_id` | `str` |  |
| `status` | `str` |  |
| `unknowns` | `list` |  |

#### Example: Create

```python
product_map_question = client.ProductMapQuestion().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "question": "example_question",  # str
})
```


### ProductMapState

Create an instance: `product_map_state = client.ProductMapState()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str | None` |  |
| `attempts` | `list` |  |
| `captured_at` | `str` |  |
| `id` | `str` |  |
| `incoming` | `list` |  |
| `labels` | `dict` |  |
| `layout` | `dict` |  |
| `observation_id` | `str` |  |
| `omitted_controls` | `int` |  |
| `outgoing` | `list` |  |
| `revision_id` | `str` |  |
| `scope` | `dict` |  |
| `screenshot_url` | `str | None` |  |
| `state` | `dict` |  |
| `truncated` | `bool` |  |
| `url` | `str` |  |

#### Example: Load

```python
product_map_state = client.ProductMapState().load({"id": "product_map_state_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
product_map_states = client.ProductMapState().list({"organization_id": "example", "project_id": "example"})
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `str | None` |  |
| `context` | `str | None` |  |
| `created_at` | `str` |  |
| `credentials` | `list` |  |
| `demo` | `bool` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `list` |  |
| `environments` | `list` |  |
| `execution_mode` | `str` |  |
| `icon_url` | `str | None` |  |
| `id` | `str` |  |
| `identity_provider` | `dict` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `network_connections` | `list` |  |
| `organization_id` | `str` |  |
| `overview` | `dict` |  |
| `permissions` | `dict` |  |
| `personas` | `list` |  |
| `project` | `dict` |  |
| `pull_request_options` | `dict` |  |
| `pull_requests` | `list` |  |
| `purpose` | `str | None` |  |
| `runs` | `list` |  |
| `scenario_history` | `dict` |  |
| `scenario_states` | `dict` | Scenarios by the state of their latest execution. |
| `scenarios` | `list` |  |
| `setup_required` | `bool` |  |
| `slug` | `str` |  |
| `updated_at` | `str` |  |
| `verifier_preferences` | `dict` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` |  |
| `website_url` | `str | None` |  |

#### Example: Load

```python
project = client.Project().load({"id": "project_id", "organization_id": "organization_id"})
```

#### Example: List

```python
projects = client.Project().list({"organization_id": "example"})
```

#### Example: Create

```python
project = client.Project().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
})
```


### ProjectAndroidApk

Create an instance: `project_android_apk = client.ProjectAndroidApk()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `dict` |  |
| `artifact_paths` | `list` |  |
| `description` | `str` |  |
| `image` | `str` |  |
| `ios` | `dict` |  |
| `launch_command` | `str` |  |
| `managed_binary` | `dict` |  |
| `platform` | `str` |  |
| `provider` | `str` |  |
| `setup_command` | `str` |  |

#### Example: Create

```python
project_android_apk = client.ProjectAndroidApk().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```


### ProjectCodeMap

Create an instance: `project_code_map = client.ProjectCodeMap()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_scan` | `bool` |  |
| `commit_sha` | `str` |  |
| `configured` | `bool` |  |
| `error_code` | `str | None` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `ref` | `str` |  |
| `repository_id` | `str` |  |
| `revision` | `dict` |  |
| `slug` | `str` |  |
| `status` | `str` |  |

#### Example: List

```python
project_code_maps = client.ProjectCodeMap().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
project_code_map = client.ProjectCodeMap().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "repository_id": "example_repository_id",  # str
})
```


### ProjectEnvironment

Create an instance: `project_environment = client.ProjectEnvironment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_actions` | `str` |  |
| `allowed_origins` | `list` |  |
| `archived_at` | `str | None` |  |
| `base_url` | `str | None` |  |
| `base_url_changeable` | `bool` | Whether an update may send a new base_url. |
| `binary` | `str` |  |
| `conversation_only_messaging` | `bool` |  |
| `created_at` | `str` |  |
| `desktop` | `dict | None` |  |
| `execution_mode` | `str` |  |
| `id` | `str` |  |
| `imessage_number` | `str | None` | International destination number; blank or null clears it on an added environment. |
| `kind` | `str` |  |
| `lock_version` | `int` |  |
| `messaging_conversation` | `Any` |  |
| `messaging_problem` | `str | None` |  |
| `messaging_source` | `Any` |  |
| `messaging_tester_number` | `str | None` | One configured tester number. |
| `name` | `str` |  |
| `project_id` | `str` |  |
| `pull_request` | `dict | None` |  |
| `source_branch` | `str | None` |  |
| `updated_at` | `str` |  |
| `verify_network_connection_id` | `str | None` |  |
| `version` | `int` |  |

#### Example: Load

```python
project_environment = client.ProjectEnvironment().load({"id": "project_environment_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
project_environments = client.ProjectEnvironment().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
project_environment = client.ProjectEnvironment().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
})
```


### ProjectFinding

Create an instance: `project_finding = client.ProjectFinding()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `str | None` |  |
| `environment_name` | `str` |  |
| `id` | `str` |  |
| `last_seen_at` | `str` |  |
| `locked` | `bool` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `str` |  |
| `source` | `str` | The workflow that produced the finding |
| `source_title` | `str` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `str` |  |
| `title` | `str` |  |
| `verification` | `Any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `str` | Where the finding is reviewed within its source |

#### Example: List

```python
project_findings = client.ProjectFinding().list({"organization_id": "example", "project_id": "example"})
```


### ProjectFixture

Create an instance: `project_fixture = client.ProjectFixture()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignments` | `list` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` |  |
| `content_type` | `str` |  |
| `credential_ids` | `list` |  |
| `credentials` | `list` |  |
| `environment_ids` | `list` |  |
| `environments` | `list` |  |
| `fixtures` | `list` |  |
| `id` | `str` |  |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `persona_ids` | `list` |  |
| `personas` | `list` |  |
| `project` | `dict` |  |
| `sha256` | `str` |  |
| `url` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
project_fixture = client.ProjectFixture().load({"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
project_fixtures = client.ProjectFixture().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
project_fixture = client.ProjectFixture().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```


### ProjectIosApp

Create an instance: `project_ios_app = client.ProjectIosApp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `dict` |  |
| `artifact_paths` | `list` |  |
| `description` | `str` |  |
| `image` | `str` |  |
| `ios` | `dict` |  |
| `launch_command` | `str` |  |
| `managed_binary` | `dict` |  |
| `platform` | `str` |  |
| `provider` | `str` |  |
| `setup_command` | `str` |  |

#### Example: Create

```python
project_ios_app = client.ProjectIosApp().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```


### ProjectMessagingConversation

Create an instance: `project_messaging_conversation = client.ProjectMessagingConversation()`

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
| `assistant_number` | `str` |  |
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `environment_name` | `str` |  |
| `id` | `str` |  |
| `leased` | `bool` |  |
| `messages` | `list` |  |
| `reconciled_at` | `str | None` |  |
| `retirable` | `bool` |  |
| `seeded` | `bool` |  |
| `send_blocked_reason` | `str | None` |  |
| `send_disposition` | `str` |  |
| `send_error` | `str | None` |  |
| `tester_number` | `str` |  |
| `unknown_send` | `bool` |  |
| `verify_environment_id` | `str` |  |

#### Example: Load

```python
project_messaging_conversation = client.ProjectMessagingConversation().load({"id": "project_messaging_conversation_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: Create

```python
project_messaging_conversation = client.ProjectMessagingConversation().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "assistant_number": "example_assistant_number",  # str
    "tester_number": "example_tester_number",  # str
    "verify_environment_id": "example_verify_environment_id",  # str
})
```


### ProjectOverviewMetric

Create an instance: `project_overview_metric = client.ProjectOverviewMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `dict` |  |

#### Example: List

```python
project_overview_metrics = client.ProjectOverviewMetric().list({"organization_id": "example", "project_id": "example"})
```


### ProjectOverviewPullRequest

Create an instance: `project_overview_pull_request = client.ProjectOverviewPullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `str` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `str | None` |  |
| `draft` | `bool` |  |
| `github_repository` | `str | None` | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` |  |
| `head_sha` | `str` |  |
| `id` | `str` |  |
| `latest_created_at` | `str | None` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `str | None` |  |
| `latest_reason` | `str | None` |  |
| `latest_run_id` | `str | None` |  |
| `latest_state` | `str | None` |  |
| `number` | `int` |  |
| `project_id` | `str | None` |  |
| `project_slug` | `str | None` |  |
| `provider` | `str` |  |
| `repository_id` | `str` |  |
| `request_label` | `str` |  |
| `source_branch` | `str | None` |  |
| `source_repository` | `str | None` |  |
| `source_url` | `str | None` |  |
| `state` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `web_path` | `str` |  |

#### Example: List

```python
project_overview_pull_requests = client.ProjectOverviewPullRequest().list({"organization_id": "example", "project_id": "example"})
```


### ProjectProductMap

Create an instance: `project_product_map = client.ProjectProductMap()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectRecording

Create an instance: `project_recording = client.ProjectRecording()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `dict` |  |
| `created_at` | `str` |  |
| `draft` | `Any` | Present once drafted. |
| `environment_id` | `str` | The project environment the browser opens. |
| `error` | `str | None` |  |
| `event_count` | `int` |  |
| `id` | `str` |  |
| `persona_id` | `str` | The project persona the journey acts as. |
| `phase` | `str` | What the owner can do now. |
| `signed_in_during_recording` | `bool` |  |
| `start_path` | `str` | A path on the environment to start at, such as /settings. |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
project_recording = client.ProjectRecording().load({"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: Create

```python
project_recording = client.ProjectRecording().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "environment_id": "example_environment_id",  # str
    "persona_id": "example_persona_id",  # str
})
```


### ProjectRunPlan

Create an instance: `project_run_plan = client.ProjectRunPlan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `str | None` |  |
| `base_url` | `str | None` |  |
| `created_at` | `str` |  |
| `dependencies` | `list` |  |
| `id` | `str` |  |
| `identity_probe` | `dict | None` |  |
| `kind` | `str | None` |  |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `nodes` | `list` |  |
| `preview` | `Any` |  |
| `project_id` | `str` |  |
| `updated_at` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
project_run_plan = client.ProjectRunPlan().load({"id": "project_run_plan_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
project_run_plans = client.ProjectRunPlan().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
project_run_plan = client.ProjectRunPlan().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "dependencies": [],  # list
    "identity_probe": {},  # dict | None
    "name": "example_name",  # str
    "nodes": [],  # list
})
```


### ProjectRunSchedule

Create an instance: `project_run_schedule = client.ProjectRunSchedule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_ids` | `dict` |  |
| `cron_expression` | `str | None` |  |
| `environment_id` | `str` | Project environment slug or public ID. |
| `environment_name` | `str` |  |
| `history` | `list` |  |
| `id` | `str` |  |
| `labels` | `list` |  |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `next_run_at` | `str` |  |
| `notification_channel` | `str` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` |  |
| `selection_mode` | `str` |  |
| `slack_subscription_id` | `str | None` |  |
| `source_scenario_id` | `str | None` |  |
| `state` | `str` |  |
| `time_of_day` | `str` |  |
| `time_zone` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
project_run_schedule = client.ProjectRunSchedule().load({"id": "project_run_schedule_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
project_run_schedules = client.ProjectRunSchedule().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
project_run_schedule = client.ProjectRunSchedule().create({
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


### ProjectScenarioOption

Create an instance: `project_scenario_option = client.ProjectScenarioOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `list` |  |
| `permissions` | `dict` |  |
| `personas` | `list` |  |
| `project` | `dict` |  |
| `scenario_states` | `dict` | Scenarios by the state of their latest execution. |
| `scenarios` | `list` |  |
| `schedule_options` | `Any` |  |
| `schedules` | `list` |  |

#### Example: List

```python
project_scenario_options = client.ProjectScenarioOption().list({"organization_id": "example", "project_id": "example"})
```


### ProjectScenarioRow

Create an instance: `project_scenario_row = client.ProjectScenarioRow()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `int` |  |
| `dependency_count` | `int` |  |
| `health` | `dict` |  |
| `id` | `str` |  |
| `labels` | `list` |  |
| `name` | `str` |  |
| `persona_id` | `str` |  |
| `selectable_for_run` | `bool` |  |
| `step_count` | `int` |  |

#### Example: List

```python
project_scenario_rows = client.ProjectScenarioRow().list({"organization_id": "example", "project_id": "example"})
```


### ProjectSetting

Create an instance: `project_setting = client.ProjectSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `list` |  |
| `messaging_conversations` | `list` |  |
| `messaging_enabled` | `bool` |  |
| `permissions` | `dict` |  |
| `project` | `dict` |  |
| `tester_numbers` | `list` |  |

#### Example: List

```python
project_settings = client.ProjectSetting().list({"organization_id": "example", "project_id": "example"})
```


### PullRequest

Create an instance: `pull_request = client.PullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `list` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `str` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `Any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `list` |  |
| `head_sha` | `str` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `str` |  |
| `idempotency_key` | `str` |  |
| `imessage_number` | `str` | International destination of this exact deployed commit. |
| `number` | `int` |  |
| `pagination` | `dict` |  |
| `permissions` | `dict` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `str | None` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `Any` |  |
| `project_id` | `str` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `dict` |  |
| `repository_id` | `str` |  |
| `runs` | `list` |  |

#### Example: Load

```python
pull_request = client.PullRequest().load({"id": "pull_request_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
pull_request = client.PullRequest().create({
    "organization_id": "example_organization_id",  # str
    "idempotency_key": "example_idempotency_key",  # str
})
```


### PullRequestSetting

Create an instance: `pull_request_setting = client.PullRequestSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `bots` | `list` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `dict | None` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `Any` |  |
| `demo_videos` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `str | None` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `str` |  |
| `enabled` | `bool` | Test PRs automatically. |
| `environment` | `str` | The environment whose test accounts sign in to the previews. |
| `environments` | `list` |  |
| `github_check_enabled` | `bool` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `list` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `str` |  |
| `imessage_comment_prefix` | `str | None` |  |
| `imessage_number` | `str | None` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `str` |  |
| `limits` | `dict` |  |
| `link_pattern` | `str | None` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `str | None` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` |  |
| `messaging_enabled` | `bool` |  |
| `messaging_tester_number` | `str | None` | One configured tester number. |
| `non_product_paths` | `list` |  |
| `permissions` | `dict` |  |
| `pr_check` | `bool` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `str` |  |
| `preview_comment_authors` | `list` |  |
| `preview_comment_pattern` | `str` |  |
| `preview_comment_wildcard` | `str | None` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `str | None` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `list` |  |
| `previews` | `str` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `str` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `list` |  |
| `provider` | `str` |  |
| `repositories` | `list` |  |
| `repository` | `str` | Repository ID; see repositories for its name. |
| `repository_id` | `str` |  |
| `repository_kind` | `str` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `Any` |  |
| `service` | `str | None` | composal: the public service the browsers open. |
| `settings` | `list` |  |
| `setup` | `Any` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `dict` | The answers a new setup starts from |
| `source_repository` | `str` |  |
| `target_mode` | `str` |  |
| `tester_numbers` | `list` |  |
| `trigger_label` | `str` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` |  |
| `trigger_on_label` | `bool` |  |
| `trigger_on_push` | `bool` |  |
| `trigger_on_ready` | `bool` |  |
| `triggers` | `dict` | When runs start. |
| `verify_environment_id` | `str` |  |
| `write_scenarios` | `bool` | Draft and validate focused scenarios for each change on its preview. |

#### Example: List

```python
pull_request_settings = client.PullRequestSetting().list({"organization_id": "example"})
```

#### Example: Create

```python
pull_request_setting = client.PullRequestSetting().create({
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


### PullRequestSettingAddRepository

Create an instance: `pull_request_setting_add_repository = client.PullRequestSettingAddRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `str` |  |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `list` |  |

#### Example: Create

```python
pull_request_setting_add_repository = client.PullRequestSettingAddRepository().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "repositories": [],  # list
})
```


### PullRequestSettingDetectComment

Create an instance: `pull_request_setting_detect_comment = client.PullRequestSettingDetectComment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `list` | The bots answer |
| `deployment` | `str` | The deployment answer |
| `example_url` | `str` |  |
| `imessage_comment_prefix` | `str` |  |
| `imessage_number` | `str | None` | International destination number; blank or null clears it on an added environment. |
| `kind` | `str` |  |
| `link_pattern` | `str` | The link_pattern answer |
| `project_id` | `str` | Project slug or ID. |
| `provider` | `str` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `str` | Repository slug, ID or owner/name. |
| `request_number` | `int` |  |

#### Example: Create

```python
pull_request_setting_detect_comment = client.PullRequestSettingDetectComment().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
})
```


### Recorder

Create an instance: `recorder = client.Recorder()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `name` | `str` |  |
| `slug` | `str` |  |

#### Example: Load

```python
recorder = client.Recorder().load({"organization_id": "organization_id"})
```


### Registry

Create an instance: `registry = client.Registry()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### RegistryV2

Create an instance: `registry_v2 = client.RegistryV2()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RelayAgentLocalThread

Create an instance: `relay_agent_local_thread = client.RelayAgentLocalThread()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### ReportReplay

Create an instance: `report_replay = client.ReportReplay()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `str` |  |
| `generated_at` | `str` |  |
| `id` | `str` |  |
| `recording` | `dict` |  |
| `replay_steps` | `list` |  |

#### Example: Load

```python
report_replay = client.ReportReplay().load({"id": "report_replay_id", "exploration_id": "exploration_id", "organization_id": "organization_id"})
```


### ReportScenario

Create an instance: `report_scenario = client.ReportScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_name` | `str` |  |
| `goal` | `str` |  |
| `id` | `str` |  |
| `mode` | `str` |  |
| `permissions` | `dict` |  |
| `project_id` | `str | None` |  |
| `related_explorations` | `list` |  |
| `report` | `dict` |  |
| `saves_scenarios` | `bool` |  |
| `scenario_generation` | `dict` |  |
| `status` | `str` |  |

#### Example: Create

```python
report_scenario = client.ReportScenario().create({
    "exploration_id": "example_exploration_id",  # str
    "organization_id": "example_organization_id",  # str
})
```


### RunScenarioRun

Create an instance: `run_scenario_run = client.RunScenarioRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### RunScheduleOption

Create an instance: `run_schedule_option = client.RunScheduleOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `name` | `str` |  |

#### Example: List

```python
run_schedule_options = client.RunScheduleOption().list({"organization_id": "example", "project_id": "example"})
```


### RunSearch

Create an instance: `run_search = client.RunSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `list` |  |

#### Example: Load

```python
run_search = client.RunSearch().load({"organization_id": "organization_id"})
```


### RunUpdate

Create an instance: `run_update = client.RunUpdate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `str` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `str | None` |  |
| `draft` | `bool` |  |
| `github_repository` | `str | None` | GitHub owner/repository associated with this pull request. |
| `github_url` | `str | None` |  |
| `head_sha` | `str` |  |
| `id` | `str` |  |
| `latest_created_at` | `str | None` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `str | None` |  |
| `latest_reason` | `str | None` |  |
| `latest_run_id` | `str | None` |  |
| `latest_state` | `str | None` |  |
| `number` | `int` |  |
| `project_id` | `str | None` |  |
| `project_slug` | `str | None` |  |
| `provider` | `str` |  |
| `repository_id` | `str` |  |
| `request_label` | `str` |  |
| `source_branch` | `str | None` |  |
| `source_repository` | `str | None` |  |
| `source_url` | `str | None` |  |
| `state` | `str` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `web_path` | `str` |  |

#### Example: List

```python
run_updates = client.RunUpdate().list({"organization_id": "example"})
```


### ScenarioRevision

Create an instance: `scenario_revision = client.ScenarioRevision()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `batch` | `str` | Shared by every revision one request or job saved. |
| `created_at` | `str` |  |
| `definition` | `dict` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `str` |  |
| `source` | `str` | The client the save came through. |
| `user` | `Any` | Null when a system job saved the Scenario. |
| `version` | `int` | The Scenario's lock_version after this save. |

#### Example: List

```python
scenario_revisions = client.ScenarioRevision().list({"organization_id": "example", "project_id": "example", "scenario_id": "example"})
```


### ScenarioRunLesson

Create an instance: `scenario_run_lesson = client.ScenarioRunLesson()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding` | `str` |  |
| `title` | `str` | Defaults to the Scenario's name. |
| `workaround` | `str` |  |

#### Example: Create

```python
scenario_run_lesson = client.ScenarioRunLesson().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "run_id": "example_run_id",  # str
    "scenario_run_id": "example_scenario_run_id",  # str
    "finding": "example_finding",  # str
    "workaround": "example_workaround",  # str
})
```


### ScenarioRunScenarioEdit

Create an instance: `scenario_run_scenario_edit = client.ScenarioRunScenarioEdit()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ServiceEndpoint

Create an instance: `service_endpoint = client.ServiceEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
service_endpoint = client.ServiceEndpoint().load({"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"})
```

#### Example: List

```python
service_endpoints = client.ServiceEndpoint().list({"app_id": "example", "service_id": "example"})
```

#### Example: Create

```python
service_endpoint = client.ServiceEndpoint().create({
    "app_id": "example_app_id",  # str
    "service_id": "example_service_id",  # str
})
```


### SitePreview

Create an instance: `site_preview = client.SitePreview()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `str | None` | The site's icon as a data: URL, up to 256 KB |
| `title` | `str | None` |  |
| `url` | `str` | The address as it will be saved |

#### Example: Load

```python
site_preview = client.SitePreview().load({"organization_id": "organization_id", "url": "url"})
```


### SlackChannel

Create an instance: `slack_channel = client.SlackChannel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `is_member` | `bool` |  |
| `is_private` | `bool` |  |
| `is_slack_connect` | `bool` |  |
| `name` | `str` |  |
| `published` | `bool` |  |

#### Example: List

```python
slack_channels = client.SlackChannel().list({"agent_id": "example", "organization_id": "example"})
```


### SparkAgentLocalThread

Create an instance: `spark_agent_local_thread = client.SparkAgentLocalThread()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` |  |
| `archived` | `bool` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `bool` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `bool` |  |
| `can_end` | `bool` |  |
| `can_interrupt` | `bool` |  |
| `can_send` | `bool` |  |
| `created_at` | `str` |  |
| `delivery` | `dict` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `str` |  |
| `device_name` | `str` |  |
| `diagnostic_code` | `str` | Approved product error code retained after copied diagnostics expire. |
| `end` | `Any` |  |
| `expires_at` | `str` |  |
| `full_title` | `str` | The native name or first prompt in full, for a tooltip. |
| `id` | `str` |  |
| `key` | `str` |  |
| `last_activity_at` | `str | None` |  |
| `native_thread_id` | `str` |  |
| `parent_conversation_id` | `str | None` |  |
| `provider` | `str` |  |
| `references` | `dict` |  |
| `relay_disconnected_at` | `str | None` |  |
| `relay_participant` | `dict` |  |
| `result` | `Any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `dict | bool` |  |
| `section` | `str` | Server-assigned section in the ordered computer thread directory. |
| `state` | `str` |  |
| `status` | `str | None` | What the native thread is doing. |
| `task_configured` | `bool` |  |
| `thread_id` | `str` |  |
| `title` | `str` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```python
spark_agent_local_thread = client.SparkAgentLocalThread().load({"id": "spark_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
spark_agent_local_thread = client.SparkAgentLocalThread().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "device_id": "example_device_id",  # str
    "key": "example_key",  # str
    "provider": "example_provider",  # str
    "thread_id": "example_thread_id",  # str
})
```


### StaticSite

Create an instance: `static_site = client.StaticSite()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployment_id` | `str | None` |  |
| `cdn_hostname` | `str` |  |
| `cdn_url` | `str` |  |
| `cname_target` | `str` |  |
| `created_at` | `str` |  |
| `default_url` | `str` |  |
| `description` | `str | None` |  |
| `error_document` | `str | None` |  |
| `failure_message` | `str | None` |  |
| `hosted_app_id` | `str | None` |  |
| `id` | `str` |  |
| `index_document` | `str` |  |
| `name` | `str` |  |
| `organization_id` | `str` |  |
| `provisioned` | `bool` |  |
| `provisioned_at` | `str | None` |  |
| `region` | `str | None` |  |
| `replication_regions` | `list` |  |
| `repository_id` | `str | None` |  |
| `slug` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
static_site = client.StaticSite().load({"id": "static_site_id"})
```

#### Example: List

```python
static_sites = client.StaticSite().list({"organization_id": "example"})
```

#### Example: Create

```python
static_site = client.StaticSite().create({
    "organization_id": "example_organization_id",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### StaticSiteDeployment

Create an instance: `static_site_deployment = client.StaticSiteDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `str | None` |  |
| `activated_at_label` | `str | None` |  |
| `commit_sha` | `str | None` |  |
| `created_at` | `str` |  |
| `created_at_label` | `str | None` |  |
| `creator_user_id` | `str | None` |  |
| `deploy_slug` | `str` |  |
| `failure_message` | `str | None` |  |
| `file_count` | `int` |  |
| `file_count_label` | `str` |  |
| `finished_at` | `str | None` |  |
| `finished_at_label` | `str | None` |  |
| `id` | `str` |  |
| `is_active` | `bool` |  |
| `source_ref` | `str | None` |  |
| `started_at` | `str | None` |  |
| `started_at_label` | `str | None` |  |
| `static_site_id` | `str` |  |
| `status` | `str` |  |
| `total_bytes` | `int` |  |
| `total_bytes_label` | `str` |  |
| `trigger_kind` | `str` |  |
| `updated_at` | `str` |  |
| `updated_at_label` | `str | None` |  |
| `uploaded_at` | `str | None` |  |
| `uploaded_at_label` | `str | None` |  |

#### Example: Load

```python
static_site_deployment = client.StaticSiteDeployment().load({"id": "static_site_deployment_id", "static_site_id": "static_site_id"})
```

#### Example: List

```python
static_site_deployments = client.StaticSiteDeployment().list({"static_site_id": "example"})
```

#### Example: Create

```python
static_site_deployment = client.StaticSiteDeployment().create({
    "static_site_id": "example_static_site_id",  # str
})
```


### StaticSiteDomain

Create an instance: `static_site_domain = client.StaticSiteDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `created_at` | `str` |  |
| `dns_mode` | `str` |  |
| `dns_status` | `str` |  |
| `failure_message` | `str | None` |  |
| `hosted_app_id` | `str | None` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `last_checked_at` | `str | None` |  |
| `record_name` | `str | None` |  |
| `record_type` | `str | None` |  |
| `record_value` | `str | None` |  |
| `redirect_to` | `str | None` |  |
| `static_site_id` | `str | None` |  |
| `target_kind` | `str` |  |
| `tls_status` | `str` |  |
| `updated_at` | `str` |  |
| `verification_status` | `str` |  |

#### Example: Load

```python
static_site_domain = client.StaticSiteDomain().load({"id": "static_site_domain_id", "static_site_id": "static_site_id"})
```

#### Example: List

```python
static_site_domains = client.StaticSiteDomain().list({"static_site_id": "example"})
```

#### Example: Create

```python
static_site_domain = client.StaticSiteDomain().create({
    "static_site_id": "example_static_site_id",  # str
    "hostname": "example_hostname",  # str
})
```


### SubscriptionModel

Create an instance: `subscription_model = client.SubscriptionModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_reasoning` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `provider` | `str` |  |
| `reasoning` | `list` | Effort levels this plan model accepts. |
| `speeds` | `list` | Speed modes advertised by this connected account and model. |

#### Example: List

```python
subscription_models = client.SubscriptionModel().list({"agent_id": "example", "organization_id": "example", "profile_id": "example"})
```


### ThreadPreview

Create an instance: `thread_preview = client.ThreadPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `str | None` |  |
| `port` | `int` |  |
| `url` | `str` |  |

#### Example: Create

```python
thread_preview = client.ThreadPreview().create({
    "agent_id": "example_agent_id",  # str
    "organization_id": "example_organization_id",  # str
    "thread_id": "example_thread_id",  # str
    "port": 1,  # int
})
```


### VerificationProjectCredential

Create an instance: `verification_project_credential = client.VerificationProjectCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `dict | None` |  |
| `browser_session` | `str` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `str | None` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `str` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | Select the Composal-managed Google test account when available. |
| `configured` | `bool` |  |
| `cookies` | `str` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `dict` |  |
| `description` | `str | None` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `list` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `str` |  |
| `identity_provider` | `dict | None` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `str | None` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `str` |  |
| `login_url` | `str` | Optional sign-in path or URL. |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `str` |  |
| `oidc` | `dict` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `str` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `str` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `str` |  |
| `provider_guidance` | `str` |  |
| `remove_browser_authentication` | `bool` |  |
| `remove_totp` | `bool` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `str | None` |  |
| `status` | `str` |  |
| `totp_secret` | `str` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `str` |  |
| `username` | `str` |  |

#### Example: Load

```python
verification_project_credential = client.VerificationProjectCredential().load({"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
verification_project_credentials = client.VerificationProjectCredential().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
verification_project_credential = client.VerificationProjectCredential().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "login_method": "example_login_method",  # str
    "name": "example_name",  # str
})
```


### VerificationProjectPersona

Create an instance: `verification_project_persona = client.VerificationProjectPersona()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `str` |  |
| `archived_at` | `str | None` |  |
| `capabilities` | `str | None` |  |
| `created_at` | `str` |  |
| `credential_id` | `str | None` | The credential this persona signs in with. |
| `goals` | `str | None` |  |
| `id` | `str` |  |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `project_id` | `str` |  |
| `role` | `str` |  |
| `updated_at` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
verification_project_persona = client.VerificationProjectPersona().load({"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
verification_project_personas = client.VerificationProjectPersona().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
verification_project_persona = client.VerificationProjectPersona().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
    "role": "example_role",  # str
})
```


### VerificationProjectRun

Create an instance: `verification_project_run = client.VerificationProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `str | None` |  |
| `approved_digest` | `str | None` |  |
| `archived_at` | `str | None` |  |
| `available_tests` | `list` |  |
| `can_archive` | `bool` |  |
| `can_restore` | `bool` |  |
| `can_start_another_run` | `bool` |  |
| `cleanup_state` | `str` |  |
| `concurrency` | `int` |  |
| `created_at` | `str` |  |
| `creator_name` | `str | None` |  |
| `definition_mode` | `str` |  |
| `environment_id` | `str | None` |  |
| `id` | `str` |  |
| `lock_version` | `int` |  |
| `max_seconds` | `int` |  |
| `outcome` | `str | None` |  |
| `permissions` | `dict` |  |
| `plan_digest` | `str | None` |  |
| `preparation_error_code` | `str | None` |  |
| `progress` | `dict` |  |
| `project` | `dict` |  |
| `project_id` | `str` |  |
| `pull_request` | `Any` |  |
| `queued_at` | `str | None` |  |
| `run` | `dict` |  |
| `run_plan_id` | `str | None` |  |
| `scenario_runs` | `list` |  |
| `source_run_id` | `str | None` |  |
| `source_versions` | `list | None` |  |
| `start_when_prepared` | `bool` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `str` |  |
| `target_snapshot` | `dict` |  |
| `title` | `str` |  |
| `updated_at` | `str` |  |
| `verifier_preferences_snapshot` | `dict` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `str` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```python
verification_project_run = client.VerificationProjectRun().load({"id": "verification_project_run_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
verification_project_runs = client.VerificationProjectRun().list({"organization_id": "example", "project_id": "example"})
```


### VerificationProjectScenario

Create an instance: `verification_project_scenario = client.VerificationProjectScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actors` | `dict` |  |
| `allowed_actions` | `str` |  |
| `archived_at` | `str | None` |  |
| `cleanup` | `list` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `str` |  |
| `dependencies` | `list` |  |
| `fixtures` | `list` | Files upload steps choose, ordered by name. |
| `health` | `dict` |  |
| `id` | `str` |  |
| `identity_probe` | `Any` |  |
| `if` | `str | None` | A documented subset of Actions expressions. |
| `labels` | `list` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `Any` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` |  |
| `name` | `str` |  |
| `on` | `Any` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `list` |  |
| `persona_id` | `str` |  |
| `primary_actor` | `str | None` |  |
| `project_id` | `str` |  |
| `selectable_for_run` | `bool` |  |
| `starting_conditions` | `str | None` |  |
| `steps` | `list` |  |
| `triggers` | `list` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
verification_project_scenario = client.VerificationProjectScenario().load({"id": "verification_project_scenario_id", "organization_id": "organization_id", "project_id": "project_id"})
```

#### Example: List

```python
verification_project_scenarios = client.VerificationProjectScenario().list({"organization_id": "example", "project_id": "example"})
```

#### Example: Create

```python
verification_project_scenario = client.VerificationProjectScenario().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "name": "example_name",  # str
})
```


### VerifyAppDomain

Create an instance: `verify_app_domain = client.VerifyAppDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Create

```python
verify_app_domain = client.VerifyAppDomain().create({
    "app_id": "example_app_id",  # str
    "id": "example_id",  # str
})
```


### VerifyBrowserSession

Create an instance: `verify_browser_session = client.VerifyBrowserSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` | The project's active credential to refresh; omit to create a credential. |
| `expires_at` | `str` |  |
| `id` | `str` |  |
| `name` | `str` | Required when opening a browser for a new credential. |
| `origin` | `str` |  |
| `project_id` | `str` | The project (slug or ID) whose credential receives the session. |
| `status` | `str` |  |
| `url` | `str` |  |
| `viewer_url` | `str | None` | Owner-only bearer link. |

#### Example: Load

```python
verify_browser_session = client.VerifyBrowserSession().load({"id": "verify_browser_session_id", "organization_id": "organization_id"})
```

#### Example: Create

```python
verify_browser_session = client.VerifyBrowserSession().create({
    "organization_id": "example_organization_id",  # str
    "project_id": "example_project_id",  # str
    "url": "example_url",  # str
})
```


### VerifyStaticSiteDomain

Create an instance: `verify_static_site_domain = client.VerifyStaticSiteDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `str | None` |  |
| `app_service_id` | `str | None` |  |
| `created_at` | `str` |  |
| `dns_mode` | `str` |  |
| `dns_status` | `str` |  |
| `failure_message` | `str | None` |  |
| `hosted_app_id` | `str | None` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` |  |
| `last_checked_at` | `str | None` |  |
| `record_name` | `str | None` |  |
| `record_type` | `str | None` |  |
| `record_value` | `str | None` |  |
| `redirect_to` | `str | None` |  |
| `static_site_id` | `str | None` |  |
| `target_kind` | `str` |  |
| `tls_status` | `str` |  |
| `updated_at` | `str` |  |
| `verification_status` | `str` |  |

#### Example: Create

```python
verify_static_site_domain = client.VerifyStaticSiteDomain().create({
    "id": "example_id",  # str
    "static_site_id": "example_static_site_id",  # str
})
```


### VersionLog

Create an instance: `version_log = client.VersionLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `str` |  |
| `failure_phase` | `str | None` |  |
| `id` | `str` |  |
| `image_digest` | `str | None` |  |
| `image_reference` | `str | None` |  |
| `installer_version` | `str` |  |
| `ready_at` | `str | None` |  |
| `receipt` | `dict | None` |  |
| `safe_error` | `str | None` |  |
| `started_at` | `str | None` |  |
| `status` | `str` |  |

#### Example: List

```python
version_logs = client.VersionLog().list({"binary_id": "example", "organization_id": "example", "version_id": "example", "project_id": "example"})
```


### WebBotAuth

Create an instance: `web_bot_auth = client.WebBotAuth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `str` |  |
| `origin` | `str` |  |
| `signatures` | `list` |  |

#### Example: Create

```python
web_bot_auth = client.WebBotAuth().create({
    "origin": "example_origin",  # str
})
```


### WorkflowRunStep

Create an instance: `workflow_run_step = client.WorkflowRunStep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### WorkflowRunStopNotice

Create an instance: `workflow_run_stop_notice = client.WorkflowRunStopNotice()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### WorkflowTriggerSkipped

Create an instance: `workflow_trigger_skipped = client.WorkflowTriggerSkipped()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── composal_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`composal_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
pageprojectrun = client.PageProjectRun()
pageprojectrun.load({"id": "example_id", "organization_id": "example", "project_id": "example"})

# pageprojectrun.data_get() now returns the pageprojectrun data from the last load
# pageprojectrun.match_get() returns the last match criteria
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
