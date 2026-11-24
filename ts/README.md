# Composal TypeScript SDK



The TypeScript SDK for the Composal API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Agent()` — each with a small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/composal-sdk
npm install ./composal-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ComposalSDK } from '@voxgig-sdk/composal-sdk'

const client = new ComposalSDK({
  apikey: process.env.COMPOSAL_APIKEY,
})
```

### 2. List agent records

`list()` resolves to an array of Agent ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const agents = await client.Agent().list({ organization_id: "example" })

for (const agent of agents) {
  console.log(agent.data())
}
```

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const agent = await client.Agent().load({
    organization_id: 'example_organization_id',
    id: 'example_id',
  })
  console.log(agent.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Agent ENTITY (.data() for the record)
const created = await client.Agent().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})

// Remove
await client.Agent().remove({
  id: created.data().id!,
  organization_id: 'example_organization_id',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const pageprojectrun = await client.PageProjectRun().load({ id: "example_id", organization_id: "example", project_id: "example" })
  console.log(pageprojectrun.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ComposalSDK.test()

const pageprojectrun = await client.PageProjectRun().load({ id: 'test01', organization_id: 'example_organization_id', project_id: 'example_project_id' })
// pageprojectrun is the PageProjectRun entity; .data() reads its mock record
console.log(pageprojectrun.data())
```

You can also use the instance method:

```ts
const client = new ComposalSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.PageProjectRun()

// First call runs the operation and stores its result
await entity.load({ id: 'example', organization_id: 'example_organization_id', project_id: 'example_project_id' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ComposalSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### ComposalSDK

#### Constructor

```ts
new ComposalSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Agent(data?)` | `AgentEntity` | Create an Agent entity instance. |
| `AgentAttachment(data?)` | `AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation(data?)` | `AgentAutomationEntity` | Create an AgentAutomation entity instance. |
| `AgentAvatar(data?)` | `AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand(data?)` | `AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer(data?)` | `AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection(data?)` | `AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentControlFlow(data?)` | `AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination(data?)` | `AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail(data?)` | `AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentFile(data?)` | `AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput(data?)` | `AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration(data?)` | `AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
| `AgentInteraction(data?)` | `AgentInteractionEntity` | Create an AgentInteraction entity instance. |
| `AgentLibrary(data?)` | `AgentLibraryEntity` | Create an AgentLibrary entity instance. |
| `AgentManager(data?)` | `AgentManagerEntity` | Create an AgentManager entity instance. |
| `AgentManagerChoice(data?)` | `AgentManagerChoiceEntity` | Create an AgentManagerChoice entity instance. |
| `AgentMarketplace(data?)` | `AgentMarketplaceEntity` | Create an AgentMarketplace entity instance. |
| `AgentMarketplaceShared(data?)` | `AgentMarketplaceSharedEntity` | Create an AgentMarketplaceShared entity instance. |
| `AgentMissionControl(data?)` | `AgentMissionControlEntity` | Create an AgentMissionControl entity instance. |
| `AgentOperation(data?)` | `AgentOperationEntity` | Create an AgentOperation entity instance. |
| `AgentProvisioning(data?)` | `AgentProvisioningEntity` | Create an AgentProvisioning entity instance. |
| `AgentPullRequest(data?)` | `AgentPullRequestEntity` | Create an AgentPullRequest entity instance. |
| `AgentQuestion(data?)` | `AgentQuestionEntity` | Create an AgentQuestion entity instance. |
| `AgentRepository(data?)` | `AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource(data?)` | `AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoutine(data?)` | `AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun(data?)` | `AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime(data?)` | `AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSetting(data?)` | `AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing(data?)` | `AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite(data?)` | `AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill(data?)` | `AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack(data?)` | `AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent(data?)` | `AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription(data?)` | `AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentTeammate(data?)` | `AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal(data?)` | `AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread(data?)` | `AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool(data?)` | `AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentVerifyProject(data?)` | `AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait(data?)` | `AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebhook(data?)` | `AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork(data?)` | `AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow(data?)` | `AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal(data?)` | `AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun(data?)` | `AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger(data?)` | `AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace(data?)` | `AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission(data?)` | `AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `AllocationLog(data?)` | `AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App(data?)` | `AppEntity` | Create an App entity instance. |
| `AppCdn(data?)` | `AppCdnEntity` | Create an AppCdn entity instance. |
| `AppConfigVariable(data?)` | `AppConfigVariableEntity` | Create an AppConfigVariable entity instance. |
| `AppDataResource(data?)` | `AppDataResourceEntity` | Create an AppDataResource entity instance. |
| `AppDeploy(data?)` | `AppDeployEntity` | Create an AppDeploy entity instance. |
| `AppDeployment(data?)` | `AppDeploymentEntity` | Create an AppDeployment entity instance. |
| `AppDeploymentOperation(data?)` | `AppDeploymentOperationEntity` | Create an AppDeploymentOperation entity instance. |
| `AppDeploymentRollback(data?)` | `AppDeploymentRollbackEntity` | Create an AppDeploymentRollback entity instance. |
| `AppEnvironment(data?)` | `AppEnvironmentEntity` | Create an AppEnvironment entity instance. |
| `AppLocation(data?)` | `AppLocationEntity` | Create an AppLocation entity instance. |
| `AppMetric(data?)` | `AppMetricEntity` | Create an AppMetric entity instance. |
| `AppPreview(data?)` | `AppPreviewEntity` | Create an AppPreview entity instance. |
| `AppPreviewProfile(data?)` | `AppPreviewProfileEntity` | Create an AppPreviewProfile entity instance. |
| `AppRun(data?)` | `AppRunEntity` | Create an AppRun entity instance. |
| `AppSecret(data?)` | `AppSecretEntity` | Create an AppSecret entity instance. |
| `AppService(data?)` | `AppServiceEntity` | Create an AppService entity instance. |
| `AppServiceBinding(data?)` | `AppServiceBindingEntity` | Create an AppServiceBinding entity instance. |
| `AppServicePlacement(data?)` | `AppServicePlacementEntity` | Create an AppServicePlacement entity instance. |
| `AppStorageResource(data?)` | `AppStorageResourceEntity` | Create an AppStorageResource entity instance. |
| `AttachmentPart(data?)` | `AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AutomationEvent(data?)` | `AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun(data?)` | `AutomationRunEntity` | Create an AutomationRun entity instance. |
| `Binary(data?)` | `BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion(data?)` | `BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BrowserEgressCandidate(data?)` | `BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession(data?)` | `BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection(data?)` | `BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl(data?)` | `BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent(data?)` | `BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia(data?)` | `BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording(data?)` | `BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot(data?)` | `BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask(data?)` | `BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CatalogSelector(data?)` | `CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment(data?)` | `CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname(data?)` | `CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace(data?)` | `CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject(data?)` | `CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `ConnectionRequest(data?)` | `ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource(data?)` | `ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
| `CoordinationWait(data?)` | `CoordinationWaitEntity` | Create a CoordinationWait entity instance. |
| `CredentialSignInCheck(data?)` | `CredentialSignInCheckEntity` | Create a CredentialSignInCheck entity instance. |
| `DataResourceRotateCredential(data?)` | `DataResourceRotateCredentialEntity` | Create a DataResourceRotateCredential entity instance. |
| `DeepScan(data?)` | `DeepScanEntity` | Create a DeepScan entity instance. |
| `DeepScanFinding(data?)` | `DeepScanFindingEntity` | Create a DeepScanFinding entity instance. |
| `DeepScanFlow(data?)` | `DeepScanFlowEntity` | Create a DeepScanFlow entity instance. |
| `DeepScanMappedFlow(data?)` | `DeepScanMappedFlowEntity` | Create a DeepScanMappedFlow entity instance. |
| `DeepScanOption(data?)` | `DeepScanOptionEntity` | Create a DeepScanOption entity instance. |
| `DemoShare(data?)` | `DemoShareEntity` | Create a DemoShare entity instance. |
| `DemoShareSegment(data?)` | `DemoShareSegmentEntity` | Create a DemoShareSegment entity instance. |
| `DeploymentDashboardNomad(data?)` | `DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentFile(data?)` | `DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DomainPathRule(data?)` | `DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream(data?)` | `DreamEntity` | Create a Dream entity instance. |
| `Environment(data?)` | `EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun(data?)` | `EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration(data?)` | `EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun(data?)` | `EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision(data?)` | `EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding(data?)` | `EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount(data?)` | `EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence(data?)` | `EvidenceEntity` | Create an Evidence entity instance. |
| `Exploration(data?)` | `ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage(data?)` | `ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport(data?)` | `ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario(data?)` | `ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding(data?)` | `FindingEntity` | Create a Finding entity instance. |
| `GithubConnection(data?)` | `GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `HostingAppDomain(data?)` | `HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `ImageRepository(data?)` | `ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `Integration(data?)` | `IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse(data?)` | `InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation(data?)` | `InvitationEntity` | Create an Invitation entity instance. |
| `JourneyVariantReplay(data?)` | `JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge(data?)` | `KnowledgeEntity` | Create a Knowledge entity instance. |
| `LocalThreadDelivery(data?)` | `LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation(data?)` | `LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Me(data?)` | `MeEntity` | Create a Me entity instance. |
| `MeEmail(data?)` | `MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding(data?)` | `MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile(data?)` | `MediaFileEntity` | Create a MediaFile entity instance. |
| `Member(data?)` | `MemberEntity` | Create a Member entity instance. |
| `Memory(data?)` | `MemoryEntity` | Create a Memory entity instance. |
| `MergeRequest(data?)` | `MergeRequestEntity` | Create a MergeRequest entity instance. |
| `MessagingConversationMessage(data?)` | `MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload(data?)` | `MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery(data?)` | `MetricQueryEntity` | Create a MetricQuery entity instance. |
| `NetworkConnection(data?)` | `NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NomadAllocation(data?)` | `NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog(data?)` | `NomadLogEntity` | Create a NomadLog entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `Page(data?)` | `PageEntity` | Create a Page entity instance. |
| `PageAgent(data?)` | `PageAgentEntity` | Create a PageAgent entity instance. |
| `PageProjectRun(data?)` | `PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PagesProjectCredential(data?)` | `PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona(data?)` | `PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun(data?)` | `PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario(data?)` | `PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PersonalAccessToken(data?)` | `PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation(data?)` | `PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding(data?)` | `PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret(data?)` | `PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval(data?)` | `PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
| `ProductMapIdentityDecision(data?)` | `ProductMapIdentityDecisionEntity` | Create a ProductMapIdentityDecision entity instance. |
| `ProductMapJourney(data?)` | `ProductMapJourneyEntity` | Create a ProductMapJourney entity instance. |
| `ProductMapJourneyReplay(data?)` | `ProductMapJourneyReplayEntity` | Create a ProductMapJourneyReplay entity instance. |
| `ProductMapObservation(data?)` | `ProductMapObservationEntity` | Create a ProductMapObservation entity instance. |
| `ProductMapQuestion(data?)` | `ProductMapQuestionEntity` | Create a ProductMapQuestion entity instance. |
| `ProductMapState(data?)` | `ProductMapStateEntity` | Create a ProductMapState entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `ProjectAndroidApk(data?)` | `ProjectAndroidApkEntity` | Create a ProjectAndroidApk entity instance. |
| `ProjectCodeMap(data?)` | `ProjectCodeMapEntity` | Create a ProjectCodeMap entity instance. |
| `ProjectEnvironment(data?)` | `ProjectEnvironmentEntity` | Create a ProjectEnvironment entity instance. |
| `ProjectFinding(data?)` | `ProjectFindingEntity` | Create a ProjectFinding entity instance. |
| `ProjectFixture(data?)` | `ProjectFixtureEntity` | Create a ProjectFixture entity instance. |
| `ProjectIosApp(data?)` | `ProjectIosAppEntity` | Create a ProjectIosApp entity instance. |
| `ProjectMessagingConversation(data?)` | `ProjectMessagingConversationEntity` | Create a ProjectMessagingConversation entity instance. |
| `ProjectOverviewMetric(data?)` | `ProjectOverviewMetricEntity` | Create a ProjectOverviewMetric entity instance. |
| `ProjectOverviewPullRequest(data?)` | `ProjectOverviewPullRequestEntity` | Create a ProjectOverviewPullRequest entity instance. |
| `ProjectProductMap(data?)` | `ProjectProductMapEntity` | Create a ProjectProductMap entity instance. |
| `ProjectRecording(data?)` | `ProjectRecordingEntity` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan(data?)` | `ProjectRunPlanEntity` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule(data?)` | `ProjectRunScheduleEntity` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption(data?)` | `ProjectScenarioOptionEntity` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow(data?)` | `ProjectScenarioRowEntity` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting(data?)` | `ProjectSettingEntity` | Create a ProjectSetting entity instance. |
| `PullRequest(data?)` | `PullRequestEntity` | Create a PullRequest entity instance. |
| `PullRequestSetting(data?)` | `PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository(data?)` | `PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment(data?)` | `PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `Recorder(data?)` | `RecorderEntity` | Create a Recorder entity instance. |
| `Registry(data?)` | `RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2(data?)` | `RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentLocalThread(data?)` | `RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `ReportReplay(data?)` | `ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario(data?)` | `ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RunScenarioRun(data?)` | `RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption(data?)` | `RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch(data?)` | `RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate(data?)` | `RunUpdateEntity` | Create a RunUpdate entity instance. |
| `ScenarioRevision(data?)` | `ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson(data?)` | `ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit(data?)` | `ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `ServiceEndpoint(data?)` | `ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `SitePreview(data?)` | `SitePreviewEntity` | Create a SitePreview entity instance. |
| `SlackChannel(data?)` | `SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SparkAgentLocalThread(data?)` | `SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `StaticSite(data?)` | `StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment(data?)` | `StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain(data?)` | `StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `SubscriptionModel(data?)` | `SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `ThreadPreview(data?)` | `ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `VerificationProjectCredential(data?)` | `VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona(data?)` | `VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun(data?)` | `VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario(data?)` | `VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain(data?)` | `VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession(data?)` | `VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyStaticSiteDomain(data?)` | `VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog(data?)` | `VersionLogEntity` | Create a VersionLog entity instance. |
| `WebBotAuth(data?)` | `WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WorkflowRunStep(data?)` | `WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice(data?)` | `WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped(data?)` | `WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |
| `tester(testopts?, sdkopts?)` | `ComposalSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ComposalSDK.test(testopts?, sdkopts?)` | `ComposalSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `patch` | `patch(reqdata?, ctrl?): Promise<Entity>` | Change part of an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ComposalSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create`, `update` and `patch` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create, list, load, remove, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened`

#### AgentAttachment

| Field | Description |
| --- | --- |
| `byte_size` |  |
| `content_type` |  |
| `file_name` |  |
| `id` |  |

Operations: create.

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

Operations: list, load, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations`

#### AgentAvatar

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/avatar/generate`

#### AgentCommand

| Field | Description |
| --- | --- |
| `description` |  |
| `display_name` |  |
| `name` |  |
| `skill_model_visible` |  |
| `source` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/commands`

#### AgentComputer

| Field | Description |
| --- | --- |

Operations: create, load.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel`

#### AgentCoordination

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

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

Operations: load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}`

#### AgentFile

| Field | Description |
| --- | --- |
| `content_type` |  |
| `download_url` |  |
| `filename` |  |
| `id` |  |
| `size_bytes` |  |

Operations: load.

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

Operations: create.

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

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations`

#### AgentInteraction

| Field | Description |
| --- | --- |
| `id` |  |
| `interactions` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel`

#### AgentLibrary

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

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

Operations: create, remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/managers`

#### AgentManagerChoice

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: list.

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

Operations: create, load, patch, remove, update.

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

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install`

#### AgentMissionControl

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations`

#### AgentProvisioning

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/pull_requests`

#### AgentQuestion

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

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

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories`

#### AgentResource

| Field | Description |
| --- | --- |
| `name` |  |
| `uri` |  |

Operations: list.

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

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/routines`

#### AgentRun

| Field | Description |
| --- | --- |
| `error` |  |
| `id` |  |
| `run_id` |  |
| `status` |  |

Operations: load.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset`

#### AgentSetting

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `expected_version` |  |
| `instructions` |  |
| `version` |  |

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/settings`

#### AgentSharing

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

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

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/skills`

#### AgentSlack

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subagents`

#### AgentSubscription

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions`

#### AgentTeammate

| Field | Description |
| --- | --- |
| `avatar` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` |  |
| `name` |  |
| `persona` |  |
| `slug` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/teammates`

#### AgentTerminal

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `description` |  |
| `inputSchema` |  |
| `name` |  |

Operations: list.

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

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects`

#### AgentWait

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

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

Operations: create, load, update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks`

#### AgentWork

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

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

Operations: create, list, update.

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

Operations: create, load.

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

Operations: create, list, load.

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

Operations: list, load, remove, update.

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

Operations: list, update.

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

Operations: list, remove.

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

Operations: list.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load.

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

Operations: create.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, remove.

API path: `/api/v1/hosting/apps/{app_id}/locations`

#### AppMetric

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles`

#### AppRun

| Field | Description |
| --- | --- |
| `id` |  |
| `image` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

Operations: create, list, load.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/services/{id}/archive`

#### AppServiceBinding

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

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

Operations: list, load, update.

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

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

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

Operations: update.

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

Operations: create.

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

Operations: create, list, load.

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

Operations: create, list, load, remove.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel`

#### BrowserEgressCandidate

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list.

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

Operations: create, load, remove.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control`

#### BrowserSessionConnection

| Field | Description |
| --- | --- |
| `generation` |  |
| `idempotency_key` |  |

Operations: create.

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

Operations: load.

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

Operations: list.

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

Operations: load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}`

#### BrowserSessionRecording

| Field | Description |
| --- | --- |
| `id` |  |
| `idempotency_key` |  |
| `wait` | Only screenshots support wait: true. |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings/{id}/stop`

#### BrowserSessionScreenshot

| Field | Description |
| --- | --- |
| `idempotency_key` |  |
| `wait` | Only screenshots support wait: true. |

Operations: create.

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

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}/cancel`

#### CatalogSelector

| Field | Description |
| --- | --- |
| `app` |  |

Operations: list.

API path: `/api/v1/hosting/apps/{app_id}/catalog/selectors`

#### CdnDeployment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

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

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames`

#### CdnSpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/cdn_spaces/{id}/archive`

#### CdnSpaceObject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list, load, remove, update.

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

Operations: load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}`

#### ConnectionSource

| Field | Description |
| --- | --- |
| `device_id` |  |
| `device_name` |  |
| `provider` |  |
| `source_operation_id` |  |
| `title` |  |

Operations: list.

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

Operations: list.

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

Operations: create.

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

Operations: create.

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

Operations: create, list, load.

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

Operations: list.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/flows`

#### DeepScanMappedFlow

| Field | Description |
| --- | --- |
| `account_id` |  |
| `environment_id` |  |
| `flow_map` |  |
| `revision_id` |  |

Operations: list.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/options`

#### DemoShare

| Field | Description |
| --- | --- |
| `head_sha` |  |
| `id` |  |
| `recording` |  |
| `summary` | What the recorded browser confirmed. |

Operations: load.

API path: `/api/v1/verify/demo_shares/{token}`

#### DemoShareSegment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/verify/demo_shares/{token}/segments/{segment_id}`

#### DeploymentDashboardNomad

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation`

#### DeploymentFile

| Field | Description |
| --- | --- |

Operations: update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, load.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{environment_id}/explorations`

#### EnvironmentFirstRun

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create, load, update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision`

#### EnvironmentSecretBinding

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `mode` |  |
| `secret_id` |  |
| `secret_version_id` |  |

Operations: create, list, remove.

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

Operations: list, patch, update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts`

#### Evidence

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

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

Operations: create, list, load.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/messages`

#### ExplorationReport

| Field | Description |
| --- | --- |

Operations: create, load.

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

Operations: create.

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

Operations: list, load, patch, update.

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

Operations: create, list.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list.

API path: `/api/v1/organizations/{org_slug}/image_repositories`

#### Integration

| Field | Description |
| --- | --- |
| `github` |  |
| `gitlab` |  |
| `permissions` |  |
| `slack` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/integrations`

#### InteractionResponse

| Field | Description |
| --- | --- |
| `answer` |  |
| `conversation_id` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` |  |

Operations: create.

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

Operations: create, list, remove.

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

Operations: create.

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

Operations: create, load, patch, remove, update.

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

Operations: load, update.

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

Operations: create, load.

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

Operations: list.

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

Operations: create, load, remove, update.

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

Operations: create, list, patch, remove, update.

API path: `/api/v1/me/emails/{id}/resend_verification`

#### MeOnboarding

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/me/onboarding/call`

#### MediaFile

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

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

Operations: list, patch, remove, update.

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

Operations: create, list, load, remove.

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

Operations: create, load.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction`

#### MessagingConversationUpload

| Field | Description |
| --- | --- |
| `attachment` |  |
| `upload_id` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads`

#### MetricQuery

| Field | Description |
| --- | --- |

Operations: list.

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

Operations: create, patch, update.

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

Operations: load.

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

Operations: list.

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

Operations: create, list, load, patch, update.

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

Operations: load.

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

Operations: create, list, load.

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

Operations: load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs`

#### PagesProjectScenario

| Field | Description |
| --- | --- |
| `base_url` |  |
| `id` |  |
| `kind` |  |
| `name` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenarios`

#### PersonalAccessToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, remove.

API path: `/api/v1/personal_access_tokens`

#### PreviewOperation

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/operations`

#### PreviewProfileSecretBinding

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `mode` |  |
| `secret_id` |  |
| `secret_version_id` |  |

Operations: create, list, remove.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings`

#### PreviewSecret

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `name` |  |
| `slug` |  |
| `value` |  |

Operations: create, remove.

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

Operations: create, list.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals`

#### ProductMapIdentityDecision

| Field | Description |
| --- | --- |
| `observations` |  |
| `operation` |  |
| `reason` |  |
| `target` |  |

Operations: create.

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

Operations: list, load.

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

Operations: create, load.

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

Operations: load.

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

Operations: create.

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

Operations: list, load.

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

Operations: create, list, load, patch, update.

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

Operations: create.

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

Operations: create, list.

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

Operations: create, list, load, patch, update.

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

Operations: list.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create.

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

Operations: create, load, patch, update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read`

#### ProjectOverviewMetric

| Field | Description |
| --- | --- |
| `counts` |  |

Operations: list.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests`

#### ProjectProductMap

| Field | Description |
| --- | --- |

Operations: create, load.

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

Operations: create, load, remove.

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

Operations: create, list, load, patch, update.

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

Operations: create, list, load, patch, update.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: create, load, remove.

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

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings`

#### PullRequestSettingAddRepository

| Field | Description |
| --- | --- |
| `project_id` |  |
| `replace` | Make these the project's only repositories. |
| `repositories` |  |

Operations: create.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments`

#### Recorder

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `slug` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/verification/recorder`

#### Registry

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/registry/namespace`

#### RegistryV2

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/registry/v2/authorize`

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay`

#### ReportReplay

| Field | Description |
| --- | --- |
| `agent_id` |  |
| `generated_at` |  |
| `id` |  |
| `recording` |  |
| `replay_steps` |  |

Operations: load.

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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios`

#### RunScenarioRun

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load, update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame`

#### RunScheduleOption

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/options`

#### RunSearch

| Field | Description |
| --- | --- |
| `runs` |  |

Operations: load.

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

Operations: list.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/revisions`

#### ScenarioRunLesson

| Field | Description |
| --- | --- |
| `finding` |  |
| `title` | Defaults to the Scenario's name. |
| `workaround` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons`

#### ScenarioRunScenarioEdit

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints`

#### SitePreview

| Field | Description |
| --- | --- |
| `icon_data_url` | The site's icon as a data: URL, up to 256 KB |
| `title` |  |
| `url` | The address as it will be saved |

Operations: load.

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

Operations: list.

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

Operations: create, load, update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load.

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

Operations: create, list, load, patch, remove, update.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions/models`

#### ThreadPreview

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `port` |  |
| `url` |  |

Operations: create.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load, patch, remove, update.

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

Operations: create, list, load.

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

Operations: create, list, load, patch, update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/archive`

#### VerifyAppDomain

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

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

Operations: create, load, remove.

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

Operations: create.

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

Operations: list.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs`

#### WebBotAuth

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `origin` |  |
| `signatures` |  |

Operations: create.

API path: `/api/v1/verify/web_bot_auth`

#### WorkflowRunStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/steps/{step_id}/output`

#### WorkflowRunStopNotice

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/stop_notice/dismissal`

#### WorkflowTriggerSkipped

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run`



## Entities


### Agent

Create an instance: `const agent = client.Agent()`

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
| `attention` | `string | null` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string | null` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_name_managers` | `boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `number` |  |
| `configuration_version` | `string | null` | Opaque version token. |
| `control_connections_available` | `boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` |  |
| `id` | `string` |  |
| `last_reply_at` | `string | null` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `any[]` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string | null` | Opaque version token. |
| `local_agent_control_available` | `boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `any[]` | Teammates named as managers beside the owner. |
| `model_change_action` | `string | null` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `string | null` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `Record<string, any> | null` | A model's verdict on the agent's latest reply, judged once when it arrived. |
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

```ts
const agent = await client.Agent().load({ id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agents = await client.Agent().list({ organization_id: "example" })
```

#### Example: Create

```ts
const agent = await client.Agent().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```


### AgentAttachment

Create an instance: `const agent_attachment = client.AgentAttachment()`

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

```ts
const agent_attachment = await client.AgentAttachment().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  byte_size: 1,
  content_type: 'example_content_type',
  file_name: 'example_file_name',
})
```


### AgentAutomation

Create an instance: `const agent_automation = client.AgentAutomation()`

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
| `definition` | `Record<string, any>` |  |
| `event_subscriptions` | `any[]` |  |
| `event_triggers` | `any[]` |  |
| `expected_revision` | `number` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `number` |  |
| `schedule` | `any` |  |
| `schedules` | `any[]` |  |
| `version` | `Record<string, any>` |  |

#### Example: Load

```ts
const agent_automation = await client.AgentAutomation().load({ id: 'agent_automation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_automations = await client.AgentAutomation().list({ agent_id: "example", organization_id: "example" })
```


### AgentAvatar

Create an instance: `const agent_avatar = client.AgentAvatar()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentCommand

Create an instance: `const agent_command = client.AgentCommand()`

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

```ts
const agent_commands = await client.AgentCommand().list({ agent_id: "example", organization_id: "example" })
```


### AgentComputer

Create an instance: `const agent_computer = client.AgentComputer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentConnection

Create an instance: `const agent_connection = client.AgentConnection()`

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
| `connection` | `Record<string, any>` |  |
| `credential` | `string | null` | Write-only outbound key. |
| `error_code` | `string | null` |  |
| `expected_generation` | `number` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `string | null` |  |
| `requester_id` | `string` |  |
| `retired_at` | `string | null` |  |
| `revoked_at` | `string | null` |  |
| `scope_key` | `string` |  |
| `source_operation_id` | `string | null` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const agent_connection = await client.AgentConnection().load({ id: 'agent_connection_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_connections = await client.AgentConnection().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_connection = await client.AgentConnection().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  agent_card_url: 'example_agent_card_url',
  auth_scheme: 'example_auth_scheme',
  name: 'example_name',
})
```


### AgentControlFlow

Create an instance: `const agent_control_flow = client.AgentControlFlow()`

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
| `providers` | `any[]` |  |
| `repair_of_flow_id` | `string` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` |  |
| `step_count` | `number` |  |
| `title` | `string | null` |  |

#### Example: Load

```ts
const agent_control_flow = await client.AgentControlFlow().load({ id: 'agent_control_flow_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_control_flows = await client.AgentControlFlow().list({ agent_id: "example", organization_id: "example" })
```


### AgentCoordination

Create an instance: `const agent_coordination = client.AgentCoordination()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentEmail

Create an instance: `const agent_email = client.AgentEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `string | null` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` |  |
| `id` | `string` |  |
| `preview` | `string` |  |
| `received_at` | `string` |  |
| `recipient_tag` | `string | null` | The +tag the sender used, if any |
| `spam` | `boolean` | SES judged it spam |
| `subject` | `string | null` |  |
| `text` | `string` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `any[]` |  |

#### Example: Load

```ts
const agent_email = await client.AgentEmail().load({ id: 'agent_email_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```


### AgentFile

Create an instance: `const agent_file = client.AgentFile()`

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

```ts
const agent_file = await client.AgentFile().load({ id: 'agent_file_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```


### AgentInput

Create an instance: `const agent_input = client.AgentInput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `any[]` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `any[]` |  |
| `browser_context` | `Record<string, any>` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `Record<string, any>` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` |  |
| `requester_membership_id` | `string` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` |  |

#### Example: Create

```ts
const agent_input = await client.AgentInput().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  browser_context: {},
  client_time: {},
  conversation_id: 'example_conversation_id',
  text: 'example_text',
})
```


### AgentIntegration

Create an instance: `const agent_integration = client.AgentIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `Record<string, any>` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `any[]` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `boolean` |  |
| `can_manage_organization` | `boolean` |  |
| `catalog` | `any[]` |  |
| `connect_as` | `string | null` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `Record<string, any>` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `Record<string, any>` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` |  |
| `connections` | `any[]` |  |
| `email` | `Record<string, any>` | A native agent's own email address. |
| `enabled` | `boolean` |  |
| `enabled_toolkits` | `any[]` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `number` |  |
| `pagination` | `Record<string, any>` |  |
| `pending_counts` | `Record<string, any>` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `boolean` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `boolean` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `Record<string, any>` |  |
| `webhook_connections` | `any[]` |  |
| `webhooks_available` | `boolean` |  |

#### Example: List

```ts
const agent_integrations = await client.AgentIntegration().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_integration = await client.AgentIntegration().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  connection_id: 'example_connection_id',
  enabled: true,
  generation: 1,
})
```


### AgentInteraction

Create an instance: `const agent_interaction = client.AgentInteraction()`

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
| `interactions` | `any[]` |  |

#### Example: Load

```ts
const agent_interaction = await client.AgentInteraction().load({ id: 'agent_interaction_id', agent_id: 'agent_id', organization_id: 'organization_id', conversation_id: 'conversation_id' })
```

#### Example: List

```ts
const agent_interactions = await client.AgentInteraction().list({ agent_id: "example", organization_id: "example", conversation_id: "example" })
```


### AgentLibrary

Create an instance: `const agent_library = client.AgentLibrary()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentManager

Create an instance: `const agent_manager = client.AgentManager()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `string | null` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string | null` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_name_managers` | `boolean` | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `number` |  |
| `configuration_version` | `string | null` | Opaque version token. |
| `control_connections_available` | `boolean` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `boolean` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `boolean` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` |  |
| `id` | `string` |  |
| `last_reply_at` | `string | null` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `any[]` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string | null` | Opaque version token. |
| `local_agent_control_available` | `boolean` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `any[]` | Teammates named as managers beside the owner. |
| `model_change_action` | `string | null` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `string | null` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `Record<string, any> | null` | A model's verdict on the agent's latest reply, judged once when it arrived. |
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

```ts
const agent_manager = await client.AgentManager().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  user_id: 'example_user_id',
})
```


### AgentManagerChoice

Create an instance: `const agent_manager_choice = client.AgentManagerChoice()`

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

```ts
const agent_manager_choices = await client.AgentManagerChoice().list({ agent_id: "example", organization_id: "example" })
```


### AgentMarketplace

Create an instance: `const agent_marketplace = client.AgentMarketplace()`

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
| `bundle` | `Record<string, any>` |  |
| `can_manage` | `boolean` |  |
| `catalog_key` | `string | null` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `any[]` |  |
| `category` | `string` |  |
| `counts` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `expected_version` | `number` |  |
| `explainer` | `string | null` | The listing's public write-up in Markdown. |
| `featured` | `boolean` |  |
| `from_composal` | `boolean` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `number` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `any[]` |  |
| `integrations` | `any[]` |  |
| `listing` | `any` |  |
| `listings` | `any[]` |  |
| `memories` | `any[]` |  |
| `name` | `string` |  |
| `next_page` | `number | null` |  |
| `organization_name` | `string` |  |
| `page_apps` | `any[]` |  |
| `publisher_avatar_url` | `string | null` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `sections` | `any[]` |  |
| `share_token` | `string | null` | Present only for people who manage the listing. |
| `skills` | `any[]` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | The V2 agent this listing was published from. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |
| `viewer` | `Record<string, any>` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```ts
const agent_marketplace = await client.AgentMarketplace().load({ id: 'agent_marketplace_id' })
```

#### Example: Create

```ts
const agent_marketplace = await client.AgentMarketplace().create({
  organization_id: 'example_organization_id',
  bundle: {},
  category: 'example_category',
  name: 'example_name',
  summary: 'example_summary',
})
```


### AgentMarketplaceShared

Create an instance: `const agent_marketplace_shared = client.AgentMarketplaceShared()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `catalog_key` | `string | null` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` |  |
| `counts` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `explainer` | `string | null` | The listing's public write-up in Markdown. |
| `featured` | `boolean` |  |
| `from_composal` | `boolean` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `number` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `any[]` |  |
| `integrations` | `any[]` |  |
| `listing` | `any` |  |
| `memories` | `any[]` |  |
| `name` | `string` |  |
| `organization_name` | `string` |  |
| `page_apps` | `any[]` |  |
| `publisher_avatar_url` | `string | null` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `share_token` | `string | null` | Present only for people who manage the listing. |
| `skills` | `any[]` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |
| `viewer` | `Record<string, any>` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```ts
const agent_marketplace_shared = await client.AgentMarketplaceShared().load({ id: 'agent_marketplace_shared_id' })
```


### AgentMissionControl

Create an instance: `const agent_mission_control = client.AgentMissionControl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentOperation

Create an instance: `const agent_operation = client.AgentOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Record<string, any>` | JSON object limited to 65536 encoded bytes. |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `operation` | `Record<string, any>` |  |
| `participant` | `string` |  |
| `requester_id` | `string` | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` |  |

#### Example: Load

```ts
const agent_operation = await client.AgentOperation().load({ id: 'agent_operation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const agent_operation = await client.AgentOperation().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  arguments: {},
  key: 'example_key',
  name: 'example_name',
  requester_id: 'example_requester_id',
})
```


### AgentProvisioning

Create an instance: `const agent_provisioning = client.AgentProvisioning()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentPullRequest

Create an instance: `const agent_pull_request = client.AgentPullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `number` | `number` |  |
| `owners` | `any[]` |  |
| `repository` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const agent_pull_requests = await client.AgentPullRequest().list({ agent_id: "example", organization_id: "example" })
```


### AgentQuestion

Create an instance: `const agent_question = client.AgentQuestion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentRepository

Create an instance: `const agent_repository = client.AgentRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `environments` | `Record<string, any>` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `repository_choices` | `any[]` |  |
| `repository_choices_error` | `string | null` | GitHub discovery warning. |
| `repository_choices_truncated` | `boolean` |  |
| `version` | `number` |  |
| `work_repositories` | `any[]` |  |

#### Example: List

```ts
const agent_repositorys = await client.AgentRepository().list({ agent_id: "example", organization_id: "example" })
```


### AgentResource

Create an instance: `const agent_resource = client.AgentResource()`

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

```ts
const agent_resources = await client.AgentResource().list({ agent_id: "example", organization_id: "example" })
```


### AgentRoutine

Create an instance: `const agent_routine = client.AgentRoutine()`

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
| `credit_wait` | `Record<string, any>` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `string | null` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_error` | `string | null` |  |
| `last_run_at` | `string | null` |  |
| `last_status` | `string | null` |  |
| `managed` | `boolean` |  |
| `name` | `string` |  |
| `next_run_at` | `string | null` |  |
| `routine` | `Record<string, any>` |  |
| `schedule` | `Record<string, any>` |  |
| `schedule_label` | `string` |  |
| `utility_model` | `Record<string, any>` |  |

#### Example: List

```ts
const agent_routines = await client.AgentRoutine().list({ agent_id: "example", organization_id: "example" })
```


### AgentRun

Create an instance: `const agent_run = client.AgentRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string | null` |  |
| `id` | `string` |  |
| `run_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const agent_run = await client.AgentRun().load({ id: 'agent_run_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```


### AgentRuntime

Create an instance: `const agent_runtime = client.AgentRuntime()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `any[]` |  |
| `can_manage` | `boolean` |  |
| `can_reset` | `boolean` |  |
| `image` | `string` |  |
| `memory_mb` | `number | null` |  |
| `platform` | `string` |  |
| `profile` | `string` |  |
| `provider` | `string` |  |
| `state` | `string` |  |
| `version` | `string` |  |
| `volume` | `Record<string, any> | null` |  |


### AgentSetting

Create an instance: `const agent_setting = client.AgentSetting()`

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

```ts
const agent_settings = await client.AgentSetting().list({ agent_id: "example", organization_id: "example" })
```


### AgentSharing

Create an instance: `const agent_sharing = client.AgentSharing()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AgentSite

Create an instance: `const agent_site = client.AgentSite()`

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

```ts
const agent_sites = await client.AgentSite().list({ agent_id: "example", organization_id: "example" })
```


### AgentSkill

Create an instance: `const agent_skill = client.AgentSkill()`

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
| `skills` | `any[]` |  |
| `version` | `string` |  |

#### Example: List

```ts
const agent_skills = await client.AgentSkill().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_skill = await client.AgentSkill().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  enabled: true,
  name: 'example_name',
  version: 'example_version',
})
```


### AgentSlack

Create an instance: `const agent_slack = client.AgentSlack()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentSubagent

Create an instance: `const agent_subagent = client.AgentSubagent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `attention` | `Record<string, any> | null` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `string | null` |  |
| `id` | `string` |  |
| `model` | `string | null` |  |
| `parent_id` | `string` |  |
| `preview` | `string | null` |  |
| `started_at` | `string | null` |  |
| `state` | `string | null` | What the thread is to the viewer. |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string | null` |  |

#### Example: List

```ts
const agent_subagents = await client.AgentSubagent().list({ agent_id: "example", organization_id: "example" })
```


### AgentSubscription

Create an instance: `const agent_subscription = client.AgentSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const agent_subscriptions = await client.AgentSubscription().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_subscription = await client.AgentSubscription().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
})
```


### AgentTeammate

Create an instance: `const agent_teammate = client.AgentTeammate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `string | null` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` |  |
| `name` | `string` |  |
| `persona` | `any` |  |
| `slug` | `string` |  |

#### Example: List

```ts
const agent_teammates = await client.AgentTeammate().list({ agent_id: "example", organization_id: "example" })
```


### AgentTerminal

Create an instance: `const agent_terminal = client.AgentTerminal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentThread

Create an instance: `const agent_thread = client.AgentThread()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `number | null` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `boolean` |  |
| `execution` | `any` |  |
| `first_input` | `any` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `id` | `string` |  |
| `inherit_context` | `boolean` | Include the source conversation through its last completed reply. |
| `local_activities` | `Record<string, any>` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `number` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `string | null` |  |
| `local_scope_key` | `string | null` |  |
| `local_status_pending` | `boolean` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `any[]` |  |
| `main_thread_id` | `string` |  |
| `message` | `string` | The thread's first message. |
| `next_cursor` | `string | null` |  |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` |  |
| `selected_thread` | `any` |  |
| `thread` | `Record<string, any>` |  |
| `threads` | `any[]` |  |
| `title` | `string` |  |
| `total_archived_count` | `number | null` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```ts
const agent_threads = await client.AgentThread().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_thread = await client.AgentThread().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
})
```


### AgentTool

Create an instance: `const agent_tool = client.AgentTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `inputSchema` | `Record<string, any>` |  |
| `name` | `string` |  |

#### Example: List

```ts
const agent_tools = await client.AgentTool().list({ agent_id: "example", organization_id: "example" })
```


### AgentVerifyProject

Create an instance: `const agent_verify_project = client.AgentVerifyProject()`

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
| `project_choices` | `any[]` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `boolean` |  |
| `verify_projects` | `any[]` |  |
| `version` | `number` |  |

#### Example: List

```ts
const agent_verify_projects = await client.AgentVerifyProject().list({ agent_id: "example", organization_id: "example" })
```


### AgentWait

Create an instance: `const agent_wait = client.AgentWait()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWebhook

Create an instance: `const agent_webhook = client.AgentWebhook()`

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
| `connection` | `Record<string, any>` |  |
| `deliveries` | `any[]` |  |
| `event_types` | `any[]` |  |
| `expected_generation` | `number` |  |
| `id` | `string` |  |
| `max_events_per_day` | `number` |  |
| `name` | `string` |  |
| `purpose` | `string` |  |
| `signing_key` | `string | null` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```ts
const agent_webhook = await client.AgentWebhook().load({ id: 'agent_webhook_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const agent_webhook = await client.AgentWebhook().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  event_types: [],
  max_events_per_day: 1,
  name: 'example_name',
  purpose: 'example_purpose',
})
```


### AgentWork

Create an instance: `const agent_work = client.AgentWork()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWorkflow

Create an instance: `const agent_workflow = client.AgentWorkflow()`

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
| `templates` | `any[]` |  |
| `truncated` | `boolean` |  |
| `workflows` | `any[]` |  |

#### Example: List

```ts
const agent_workflows = await client.AgentWorkflow().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_workflow = await client.AgentWorkflow().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  path: 'example_path',
  template: 'example_template',
})
```


### AgentWorkflowProposal

Create an instance: `const agent_workflow_proposal = client.AgentWorkflowProposal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `Record<string, any>` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `string | null` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `boolean` |  |
| `can_revise` | `boolean` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `boolean` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `boolean` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` |  |
| `definition` | `Record<string, any> | null` |  |
| `digest` | `string` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `string | null` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` |  |
| `model_choices` | `any[]` | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` |  |
| `native_rows` | `any[]` |  |
| `path` | `string` |  |
| `pipeline_checkpoints` | `Record<string, any>` |  |
| `pipeline_commands` | `Record<string, any>` |  |
| `reasoning_choices` | `any[]` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `number | null` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `Record<string, any> | null` |  |
| `stale` | `boolean` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `Record<string, any> | null` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `string | null` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```ts
const agent_workflow_proposal = await client.AgentWorkflowProposal().load({ id: 'agent_workflow_proposal_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```


### AgentWorkflowRun

Create an instance: `const agent_workflow_run = client.AgentWorkflowRun()`

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
| `automation` | `Record<string, any> | null` | Saved native automation identity. |
| `budget_seconds` | `number | null` | The run stops once it has been running this long |
| `budget_usd` | `number | null` | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Record<string, any> | null` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string | null` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Record<string, any>` |  |
| `error` | `string | null` |  |
| `finished_at` | `string | null` |  |
| `flow_steps` | `any[] | null` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Public run ID. |
| `needs_you` | `boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `string | null` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string | null` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `number` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string | null` |  |
| `running_seconds` | `number` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `number` | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `Record<string, any> | null` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `number` |  |
| `steps` | `any[]` |  |
| `trigger_id` | `string | null` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `string | null` | When a sleeping run's step looks again |
| `workflow_digest` | `string | null` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string | null` |  |

#### Example: Load

```ts
const agent_workflow_run = await client.AgentWorkflowRun().load({ id: 'agent_workflow_run_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_workflow_runs = await client.AgentWorkflowRun().list({ agent_id: "example", organization_id: "example" })
```


### AgentWorkflowTrigger

Create an instance: `const agent_workflow_trigger = client.AgentWorkflowTrigger()`

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
| `budget` | `Record<string, any> | null` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `boolean` |  |
| `can_pause` | `boolean` | It is running, so a manager can pause it |
| `can_resume` | `boolean` | A person paused it, so a manager can resume it |
| `can_review` | `boolean` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `number | null` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `string | null` | When the daily count starts again, at the organization's midnight |
| `id` | `string` |  |
| `kind` | `string` |  |
| `next_due_at` | `string | null` |  |
| `pause_cause` | `string | null` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `boolean` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `string | null` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `number | null` |  |
| `schedule` | `Record<string, any> | null` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `string | null` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `number` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `string | null` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `string | null` |  |
| `starts` | `Record<string, any> | null` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `string | null` | The event subscription that starts it |
| `time_zone` | `string` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `number | null` | Events that started a run today, for an event workflow |
| `trigger` | `Record<string, any>` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```ts
const agent_workflow_trigger = await client.AgentWorkflowTrigger().load({ id: 'agent_workflow_trigger_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_workflow_triggers = await client.AgentWorkflowTrigger().list({ agent_id: "example", organization_id: "example" })
```


### AgentWorkspace

Create an instance: `const agent_workspace = client.AgentWorkspace()`

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
| `cleanup_after` | `string | null` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `reason` | `string` |  |
| `state` | `string` |  |

#### Example: List

```ts
const agent_workspaces = await client.AgentWorkspace().list({ agent_id: "example", organization_id: "example" })
```


### AgentWritePermission

Create an instance: `const agent_write_permission = client.AgentWritePermission()`

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
| `granted_by` | `string | null` |  |
| `id` | `string` |  |
| `in_effect` | `boolean` | Whether the permission approves writes now. |
| `last_used_at` | `string | null` |  |
| `tool` | `string` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```ts
const agent_write_permissions = await client.AgentWritePermission().list({ agent_id: "example", organization_id: "example" })
```


### AllocationLog

Create an instance: `const allocation_log = client.AllocationLog()`

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
| `location` | `string | null` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `number` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```ts
const allocation_logs = await client.AllocationLog().list({ allocation_id: "example", app_id: "example" })
```


### App

Create an instance: `const app = client.App()`

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
| `created_at_label` | `string | null` |  |
| `description` | `string | null` |  |
| `framework` | `string | null` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string` |  |
| `repository_kind` | `string | null` |  |
| `root_path` | `string` |  |
| `root_path_display` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const app = await client.App().load({ id: 'app_id' })
```

#### Example: List

```ts
const apps = await client.App().list()
```

#### Example: Create

```ts
const app = await client.App().create({
  name: 'example_name',
  organization_id: 'example_organization_id',
  repository_id: 'example_repository_id',
  root_path: 'example_root_path',
  slug: 'example_slug',
})
```


### AppCdn

Create an instance: `const app_cdn = client.AppCdn()`

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
| `app_environment_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `cache_path_prefix` | `string | null` |  |
| `cache_settings_json` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `distribution_kind` | `string` |  |
| `edge_hostname` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `hostnames` | `any[]` |  |
| `id` | `string` |  |
| `last_deployed_at` | `string | null` |  |
| `last_deployed_at_label` | `string | null` |  |
| `last_purged_at` | `string | null` |  |
| `last_purged_at_label` | `string | null` |  |
| `last_synced_at` | `string | null` |  |
| `last_synced_at_label` | `string | null` |  |
| `name` | `string` |  |
| `origin_url` | `string` |  |
| `provisioned` | `boolean` |  |
| `routing_settings_json` | `string | null` |  |
| `security_settings_json` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const app_cdn = await client.AppCdn().load({ id: 'app_cdn_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_cdns = await client.AppCdn().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_cdn = await client.AppCdn().create({
  app_id: 'example_app_id',
  name: 'example_name',
  origin_url: 'example_origin_url',
  slug: 'example_slug',
})
```


### AppConfigVariable

Create an instance: `const app_config_variable = client.AppConfigVariable()`

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
| `app_environment_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `created_at` | `string` |  |
| `description` | `string | null` |  |
| `exposed_to_build` | `boolean` |  |
| `has_value` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `scope_kind` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string | null` |  |
| `value_kind` | `string` |  |

#### Example: Load

```ts
const app_config_variable = await client.AppConfigVariable().load({ id: 'app_config_variable_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_config_variables = await client.AppConfigVariable().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_config_variable = await client.AppConfigVariable().create({
  app_id: 'example_app_id',
  exposed_to_build: true,
  key: 'example_key',
  scope_kind: 'example_scope_kind',
  value_kind: 'example_value_kind',
})
```


### AppDataResource

Create an instance: `const app_data_resource = client.AppDataResource()`

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
| `app_environment_id` | `string | null` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `string | null` |  |
| `high_availability` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `string | null` |  |
| `provider_metadata` | `Record<string, any>` |  |
| `region` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `number | null` |  |
| `storage_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `version` | `string | null` |  |

#### Example: Load

```ts
const app_data_resource = await client.AppDataResource().load({ id: 'app_data_resource_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_data_resources = await client.AppDataResource().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_data_resource = await client.AppDataResource().create({
  app_id: 'example_app_id',
  engine: 'example_engine',
  kind: 'example_kind',
  name: 'example_name',
  slug: 'example_slug',
})
```


### AppDeploy

Create an instance: `const app_deploy = client.AppDeploy()`

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

```ts
const app_deploy = await client.AppDeploy().create({
  app_id: 'example_app_id',
  image: 'example_image',
})
```


### AppDeployment

Create an instance: `const app_deployment = client.AppDeployment()`

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
| `artifact_locator` | `string | null` |  |
| `build_role` | `string | null` |  |
| `commit_sha` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `creator_user_id` | `string | null` |  |
| `deployed_url` | `string | null` |  |
| `display_id` | `number` |  |
| `failure_message` | `string | null` |  |
| `finished_at` | `string | null` |  |
| `finished_at_label` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string | null` |  |
| `is_rollback` | `boolean` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `number` | `number` |  |
| `operation_key` | `string | null` |  |
| `organization_id` | `string` |  |
| `rollback_reason` | `string | null` |  |
| `rollback_source_deployment_id` | `string | null` |  |
| `rollback_source_release_id` | `string | null` |  |
| `rollback_target_release_id` | `string | null` |  |
| `source_ref` | `string | null` |  |
| `started_at` | `string | null` |  |
| `started_at_label` | `string | null` |  |
| `status` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const app_deployment = await client.AppDeployment().load({ id: 'app_deployment_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_deployments = await client.AppDeployment().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_deployment = await client.AppDeployment().create({
  app_id: 'example_app_id',
})
```


### AppDeploymentOperation

Create an instance: `const app_deployment_operation = client.AppDeploymentOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Record<string, any>` |  |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `string | null` |  |
| `build_duration_seconds` | `number | null` |  |
| `build_source` | `Record<string, any> | null` |  |
| `build_status` | `string` |  |
| `children` | `any[]` |  |
| `ci_pipeline_id` | `string | null` |  |
| `ci_pipeline_run_id` | `string | null` |  |
| `commit_sha` | `string | null` |  |
| `created_at` | `string` |  |
| `creator` | `Record<string, any> | null` |  |
| `deployed_url` | `string | null` |  |
| `duration_seconds` | `number | null` |  |
| `environment` | `Record<string, any>` |  |
| `failure_message` | `string` |  |
| `finished_at` | `string` |  |
| `history_kind` | `string` |  |
| `history_reason` | `string | null` |  |
| `id` | `string` |  |
| `is_live` | `boolean` |  |
| `is_rollback` | `boolean` |  |
| `live_region_count` | `number` |  |
| `location_id` | `string` |  |
| `number` | `number` |  |
| `placement` | `Record<string, any> | null` |  |
| `region_count` | `number` |  |
| `replicas_per_region` | `number` |  |
| `rollback_reason` | `string | null` |  |
| `rollback_source_release_id` | `string | null` |  |
| `rollback_target_release_id` | `string | null` |  |
| `rollout_predecessor_id` | `string | null` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `Record<string, any>` |  |
| `source_ref` | `string | null` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `total_replicas` | `number` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const app_deployment_operation = await client.AppDeploymentOperation().load({ id: 'app_deployment_operation_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_deployment_operations = await client.AppDeploymentOperation().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_deployment_operation = await client.AppDeploymentOperation().create({
  app_id: 'example_app_id',
})
```


### AppDeploymentRollback

Create an instance: `const app_deployment_rollback = client.AppDeploymentRollback()`

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
| `blockers` | `any[]` |  |
| `candidate_releases` | `any[]` |  |
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
| `reason` | `string | null` |  |
| `rollback_release` | `any` |  |
| `rollout` | `any` |  |
| `service` | `any` |  |
| `target_artifact_locator` | `string | null` |  |
| `target_release` | `any` |  |
| `to` | `string` |  |
| `warnings` | `any[]` |  |

#### Example: Create

```ts
const app_deployment_rollback = await client.AppDeploymentRollback().create({
  app_id: 'example_app_id',
})
```


### AppEnvironment

Create an instance: `const app_environment = client.AppEnvironment()`

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
| `base_domain` | `string | null` |  |
| `branch_pattern` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const app_environment = await client.AppEnvironment().load({ id: 'app_environment_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_environments = await client.AppEnvironment().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_environment = await client.AppEnvironment().create({
  app_id: 'example_app_id',
  auto_deploy: true,
  kind: 'example_kind',
  location_id: 'example_location_id',
  name: 'example_name',
  slug: 'example_slug',
  status: 'example_status',
})
```


### AppLocation

Create an instance: `const app_location = client.AppLocation()`

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

```ts
const app_locations = await client.AppLocation().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_location = await client.AppLocation().create({
  app_id: 'example_app_id',
  location_id: 'example_location_id',
})
```


### AppMetric

Create an instance: `const app_metric = client.AppMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppPreview

Create an instance: `const app_preview = client.AppPreview()`

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
| `resource_overrides` | `Record<string, any>` | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` |  |
| `shared_data_binding_ids` | `any[]` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `any[]` | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` |  |
| `source_ref` | `string` |  |
| `storage_binding_resources` | `Record<string, any>` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```ts
const app_preview = await client.AppPreview().load({ id: 'app_preview_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_previews = await client.AppPreview().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_preview = await client.AppPreview().create({
  app_id: 'example_app_id',
  app_preview_profile_id: 'example_app_preview_profile_id',
  name: 'example_name',
  slug: 'example_slug',
})
```


### AppPreviewProfile

Create an instance: `const app_preview_profile = client.AppPreviewProfile()`

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
| `configuration` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `source_environment_id` | `string` |  |
| `ttl_days` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const app_preview_profile = await client.AppPreviewProfile().load({ id: 'app_preview_profile_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_preview_profiles = await client.AppPreviewProfile().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_preview_profile = await client.AppPreviewProfile().create({
  app_id: 'example_app_id',
  name: 'example_name',
  slug: 'example_slug',
  source_environment_id: 'example_source_environment_id',
})
```


### AppRun

Create an instance: `const app_run = client.AppRun()`

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

```ts
const app_run = await client.AppRun().load({ id: 'app_run_id' })
```

#### Example: List

```ts
const app_runs = await client.AppRun().list()
```

#### Example: Create

```ts
const app_run = await client.AppRun().create({
})
```


### AppSecret

Create an instance: `const app_secret = client.AppSecret()`

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
| `description` | `string | null` |  |
| `env_key` | `string | null` |  |
| `expose_to_build` | `boolean` |  |
| `has_value` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_version_number` | `number | null` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `rotation_policy` | `string | null` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string` |  |
| `value_digest` | `string | null` |  |
| `value_kind` | `string | null` |  |

#### Example: Load

```ts
const app_secret = await client.AppSecret().load({ id: 'app_secret_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_secrets = await client.AppSecret().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_secret = await client.AppSecret().create({
  app_id: 'example_app_id',
  name: 'example_name',
  slug: 'example_slug',
})
```


### AppService

Create an instance: `const app_service = client.AppService()`

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
| `bindings` | `any[]` |  |
| `build_command` | `string | null` |  |
| `cpu_label` | `string | null` |  |
| `cpu_mhz` | `number | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `deploy_paths` | `any[]` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `number` |  |
| `disk_label` | `string | null` |  |
| `disk_mb` | `number | null` |  |
| `effective_deploy_paths` | `any[]` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `internal_port` | `number | null` |  |
| `kind` | `string` |  |
| `memory_label` | `string | null` |  |
| `memory_max_label` | `string | null` |  |
| `memory_max_mb` | `number | null` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `number | null` |  |
| `name` | `string` |  |
| `nomad_constraints_json` | `string | null` |  |
| `nomad_kill_timeout_seconds` | `number | null` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `string | null` |  |
| `nomad_region` | `string | null` |  |
| `nomad_shutdown_delay_seconds` | `number | null` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `string | null` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `string | null` |  |
| `prestart_command` | `string | null` |  |
| `publicly_accessible` | `boolean` |  |
| `release_command` | `string | null` |  |
| `repo_source_path` | `string` |  |
| `runtime` | `string` |  |
| `runtime_adapter_kind` | `string` |  |
| `runtime_adapter_settings_json` | `string | null` |  |
| `schedule` | `string | null` |  |
| `slug` | `string` |  |
| `source_path` | `string` |  |
| `start_command` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const app_service = await client.AppService().load({ id: 'app_service_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_services = await client.AppService().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_service = await client.AppService().create({
  app_id: 'example_app_id',
  auto_deploy: true,
  desired_instances: 1,
  kind: 'example_kind',
  name: 'example_name',
  publicly_accessible: true,
  runtime: 'example_runtime',
  runtime_adapter_kind: 'example_runtime_adapter_kind',
  slug: 'example_slug',
  source_path: 'example_source_path',
  start_command: 'example_start_command',
})
```


### AppServiceBinding

Create an instance: `const app_service_binding = client.AppServiceBinding()`

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

```ts
const app_service_binding = await client.AppServiceBinding().load({ id: 'app_service_binding_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_service_bindings = await client.AppServiceBinding().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_service_binding = await client.AppServiceBinding().create({
  app_id: 'example_app_id',
})
```


### AppServicePlacement

Create an instance: `const app_service_placement = client.AppServicePlacement()`

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
| `deployment_channel` | `string | null` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `organization_id` | `string` |  |
| `region_count` | `number` |  |
| `replicas_per_region` | `number` |  |
| `rollout_strategy` | `string` |  |
| `targets` | `any[]` |  |
| `total_replicas` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const app_service_placement = await client.AppServicePlacement().load({ id: 'app_service_placement_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_service_placements = await client.AppServicePlacement().list({ app_id: "example" })
```


### AppStorageResource

Create an instance: `const app_storage_resource = client.AppStorageResource()`

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
| `app_environment_id` | `string | null` |  |
| `attachment` | `Record<string, any> | null` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `number | null` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `string | null` |  |
| `created_at` | `string` |  |
| `ephemeral` | `boolean` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `string | null` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location_code` | `string | null` |  |
| `location_id` | `string | null` | Volume datacenter pin (volume kind only) |
| `mount_path` | `string | null` |  |
| `name` | `string` |  |
| `provider` | `string` | Storage backend. |
| `provider_error` | `string | null` | Last provisioning/teardown error from the storage provider |
| `region` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const app_storage_resource = await client.AppStorageResource().load({ id: 'app_storage_resource_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_storage_resources = await client.AppStorageResource().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_storage_resource = await client.AppStorageResource().create({
  app_id: 'example_app_id',
  access_mode: 'example_access_mode',
  kind: 'example_kind',
  name: 'example_name',
  provider: 'example_provider',
  slug: 'example_slug',
  status: 'example_status',
})
```


### AttachmentPart

Create an instance: `const attachment_part = client.AttachmentPart()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AutomationEvent

Create an instance: `const automation_event = client.AutomationEvent()`

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
| `event_subscriptions` | `any[]` |  |
| `event_triggers` | `any[]` |  |
| `expected_revision` | `string | null` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `number` |  |
| `schedule` | `any` |  |
| `schedules` | `any[]` |  |
| `settings` | `Record<string, any>` |  |
| `subscription_key` | `string` |  |
| `version` | `Record<string, any>` |  |


### AutomationRun

Create an instance: `const automation_run = client.AutomationRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `Record<string, any> | null` | Saved native automation identity. |
| `budget_seconds` | `number | null` | The run stops once it has been running this long |
| `budget_usd` | `number | null` | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Record<string, any> | null` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string | null` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Record<string, any>` |  |
| `error` | `string | null` |  |
| `finished_at` | `string | null` |  |
| `flow_steps` | `any[] | null` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` |  |
| `input` | `Record<string, any>` |  |
| `needs_you` | `boolean` | Whether a step stopped the run for the person, who can answer it |
| `note` | `string | null` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string | null` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` |  |
| `resume_count` | `number` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string | null` |  |
| `running_seconds` | `number` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `number` | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `Record<string, any> | null` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `number` |  |
| `steps` | `any[]` |  |
| `trigger_id` | `string | null` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` |  |
| `wake_at` | `string | null` | When a sleeping run's step looks again |
| `workflow_digest` | `string | null` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string | null` |  |

#### Example: Create

```ts
const automation_run = await client.AutomationRun().create({
  agent_id: 'example_agent_id',
  automation_id: 'example_automation_id',
  organization_id: 'example_organization_id',
  input: {},
  request_id: 'example_request_id',
  version_id: 'example_version_id',
})
```


### Binary

Create an instance: `const binary = client.Binary()`

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
| `archived_at` | `string | null` |  |
| `binary` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `latest_version` | `any` |  |
| `launch_args` | `any[]` |  |
| `name` | `string` |  |
| `needs_refresh` | `boolean` |  |
| `operation` | `Record<string, any>` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `platform` | `any` |  |
| `project_id` | `string` |  |
| `sha256` | `string` |  |
| `slug` | `string` |  |
| `version` | `Record<string, any>` |  |
| `version_defaults` | `any` |  |
| `versions` | `any[]` |  |
| `window_title` | `string` |  |

#### Example: Load

```ts
const binary = await client.Binary().load({ id: 'binary_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const binarys = await client.Binary().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const binary = await client.Binary().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  download_url: 'example_download_url',
  executable: 'example_executable',
  format: 'example_format',
  idempotency_key: 'example_idempotency_key',
  name: 'example_name',
  slug: 'example_slug',
  window_title: 'example_window_title',
})
```


### BinaryVersion

Create an instance: `const binary_version = client.BinaryVersion()`

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
| `configuration` | `Record<string, any>` |  |
| `configuration_digest` | `string` |  |
| `created_at` | `string` |  |
| `deletable` | `boolean` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `environment_uses` | `any[]` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_args` | `any[]` |  |
| `operation` | `Record<string, any>` |  |
| `package_sha256` | `string | null` |  |
| `package_size` | `number | null` |  |
| `permissions` | `Record<string, any>` |  |
| `platform` | `any` |  |
| `preparations` | `any[]` |  |
| `retryable` | `boolean` |  |
| `sha256` | `string` |  |
| `status` | `string` |  |
| `version` | `Record<string, any>` |  |
| `window_title` | `string` |  |

#### Example: Load

```ts
const binary_version = await client.BinaryVersion().load({ id: 'binary_version_id', binary_id: 'binary_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const binary_versions = await client.BinaryVersion().list({ binary_id: "example", organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const binary_version = await client.BinaryVersion().create({
  binary_id: 'example_binary_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  download_url: 'example_download_url',
  idempotency_key: 'example_idempotency_key',
})
```


### BrowserEgressCandidate

Create an instance: `const browser_egress_candidate = client.BrowserEgressCandidate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const browser_egress_candidates = await client.BrowserEgressCandidate().list({ organization_id: "example" })
```


### BrowserSession

Create an instance: `const browser_session = client.BrowserSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `string | null` |  |
| `authentication_status` | `string` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `string | null` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `string | null` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `string | null` |  |
| `closure_basis` | `string | null` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `number` |  |
| `controller` | `string` |  |
| `credential_id` | `string | null` | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `string | null` |  |
| `expires_at` | `string` |  |
| `failure_code` | `string | null` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `initial_url` | `string` |  |
| `max_seconds` | `number` |  |
| `pending_control_id` | `string | null` |  |
| `project_id` | `string | null` | Optional project slug or public ID. |
| `reconciled_at` | `string | null` |  |
| `started_at` | `string | null` |  |
| `status` | `string` |  |
| `url` | `string` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `Record<string, any> | null` |  |

#### Example: Load

```ts
const browser_session = await client.BrowserSession().load({ id: 'browser_session_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const browser_session = await client.BrowserSession().create({
  organization_id: 'example_organization_id',
})
```


### BrowserSessionConnection

Create an instance: `const browser_session_connection = client.BrowserSessionConnection()`

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

```ts
const browser_session_connection = await client.BrowserSessionConnection().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
  generation: 1,
})
```


### BrowserSessionControl

Create an instance: `const browser_session_control = client.BrowserSessionControl()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `completed_at` | `string | null` |  |
| `completed_generation` | `number | null` |  |
| `connection` | `Record<string, any> | null` |  |
| `failure_code` | `string | null` |  |
| `id` | `string` |  |
| `requested_controller` | `string` |  |
| `requested_generation` | `number` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const browser_session_control = await client.BrowserSessionControl().load({ id: 'browser_session_control_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```


### BrowserSessionEvent

Create an instance: `const browser_session_event = client.BrowserSessionEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `string | null` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `payload` | `Record<string, any>` |  |
| `source_sequence` | `number | null` |  |

#### Example: List

```ts
const browser_session_events = await client.BrowserSessionEvent().list({ browser_session_id: "example", organization_id: "example" })
```


### BrowserSessionMedia

Create an instance: `const browser_session_media = client.BrowserSessionMedia()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `capture_omissions` | `Record<string, any> | null` |  |
| `captured_at` | `string | null` |  |
| `ended_at` | `string | null` |  |
| `failure_code` | `string | null` |  |
| `files` | `any[]` |  |
| `frames` | `number | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `partial` | `boolean` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` |  |
| `source` | `Record<string, any> | null` | Screenshot provenance. |
| `status` | `string` |  |
| `stop_requested_at` | `string | null` |  |

#### Example: Load

```ts
const browser_session_media = await client.BrowserSessionMedia().load({ id: 'browser_session_media_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```


### BrowserSessionRecording

Create an instance: `const browser_session_recording = client.BrowserSessionRecording()`

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

```ts
const browser_session_recording = await client.BrowserSessionRecording().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
})
```


### BrowserSessionScreenshot

Create an instance: `const browser_session_screenshot = client.BrowserSessionScreenshot()`

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

```ts
const browser_session_screenshot = await client.BrowserSessionScreenshot().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
})
```


### BrowserSessionTask

Create an instance: `const browser_session_task = client.BrowserSessionTask()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `Record<string, any> | null` |  |
| `browser_session_id` | `string` |  |
| `cancel_requested_at` | `string | null` |  |
| `completed_at` | `string | null` |  |
| `control_generation` | `number | null` |  |
| `deadline_at` | `string` |  |
| `effects_unknown` | `boolean` |  |
| `failure_code` | `string | null` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `instruction` | `string` |  |
| `max_rounds` | `number` |  |
| `max_seconds` | `number` |  |
| `model_selection` | `Record<string, any>` |  |
| `outcome` | `string | null` |  |
| `result` | `Record<string, any>` |  |
| `started_at` | `string | null` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const browser_session_task = await client.BrowserSessionTask().load({ id: 'browser_session_task_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const browser_session_task = await client.BrowserSessionTask().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
  instruction: 'example_instruction',
})
```


### CatalogSelector

Create an instance: `const catalog_selector = client.CatalogSelector()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Record<string, any>` |  |

#### Example: List

```ts
const catalog_selectors = await client.CatalogSelector().list({ app_id: "example" })
```


### CdnDeployment

Create an instance: `const cdn_deployment = client.CdnDeployment()`

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

```ts
const cdn_deployment = await client.CdnDeployment().load({ id: 'cdn_deployment_id', app_id: 'app_id', cdn_id: 'cdn_id' })
```

#### Example: List

```ts
const cdn_deployments = await client.CdnDeployment().list({ app_id: "example", cdn_id: "example" })
```

#### Example: Create

```ts
const cdn_deployment = await client.CdnDeployment().create({
  app_id: 'example_app_id',
  cdn_id: 'example_cdn_id',
})
```


### CdnHostname

Create an instance: `const cdn_hostname = client.CdnHostname()`

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
| `provider_hostname_id` | `string | null` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const cdn_hostname = await client.CdnHostname().load({ id: 'cdn_hostname_id', app_id: 'app_id', cdn_id: 'cdn_id' })
```

#### Example: List

```ts
const cdn_hostnames = await client.CdnHostname().list({ app_id: "example", cdn_id: "example" })
```

#### Example: Create

```ts
const cdn_hostname = await client.CdnHostname().create({
  app_id: 'example_app_id',
  cdn_id: 'example_cdn_id',
  hostname: 'example_hostname',
})
```


### CdnSpace

Create an instance: `const cdn_space = client.CdnSpace()`

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

```ts
const cdn_space = await client.CdnSpace().load({ id: 'cdn_space_id' })
```

#### Example: List

```ts
const cdn_spaces = await client.CdnSpace().list({ organization_id: "example" })
```

#### Example: Create

```ts
const cdn_space = await client.CdnSpace().create({
  organization_id: 'example_organization_id',
})
```


### CdnSpaceObject

Create an instance: `const cdn_space_object = client.CdnSpaceObject()`

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

```ts
const cdn_space_object = await client.CdnSpaceObject().load({ id: 'cdn_space_object_id', cdn_space_id: 'cdn_space_id' })
```

#### Example: List

```ts
const cdn_space_objects = await client.CdnSpaceObject().list({ cdn_space_id: "example" })
```


### ConnectionRequest

Create an instance: `const connection_request = client.ConnectionRequest()`

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
| `error_code` | `string | null` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `string | null` |  |
| `retired_at` | `string | null` |  |
| `revoked_at` | `string | null` |  |
| `source_operation_id` | `string | null` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const connection_request = await client.ConnectionRequest().load({ id: 'connection_request_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```


### ConnectionSource

Create an instance: `const connection_source = client.ConnectionSource()`

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

```ts
const connection_sources = await client.ConnectionSource().list({ agent_id: "example", organization_id: "example" })
```


### CoordinationWait

Create an instance: `const coordination_wait = client.CoordinationWait()`

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
| `stop_state` | `string | null` |  |
| `wake_outcome` | `string | null` |  |

#### Example: List

```ts
const coordination_waits = await client.CoordinationWait().list({ agent_id: "example", coordination_id: "example", organization_id: "example" })
```


### CredentialSignInCheck

Create an instance: `const credential_sign_in_check = client.CredentialSignInCheck()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | The project environment (app) to sign in to |
| `environment_name` | `string` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```ts
const credential_sign_in_check = await client.CredentialSignInCheck().create({
  credential_id: 'example_credential_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  environment_id: 'example_environment_id',
})
```


### DataResourceRotateCredential

Create an instance: `const data_resource_rotate_credential = client.DataResourceRotateCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string | null` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `string | null` |  |
| `high_availability` | `boolean` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `string | null` |  |
| `provider_metadata` | `Record<string, any>` |  |
| `region` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `number | null` |  |
| `storage_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `version` | `string | null` |  |

#### Example: Create

```ts
const data_resource_rotate_credential = await client.DataResourceRotateCredential().create({
  app_id: 'example_app_id',
  data_resource_id: 'example_data_resource_id',
})
```


### DeepScan

Create an instance: `const deep_scan = client.DeepScan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `active` | `any[]` |  |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `any[]` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `Record<string, any>` | Present only when launch was requested by an admin |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Record<string, any>` |  |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```ts
const deep_scan = await client.DeepScan().load({ id: 'deep_scan_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const deep_scans = await client.DeepScan().list({ organization_id: "example" })
```

#### Example: Create

```ts
const deep_scan = await client.DeepScan().create({
  organization_id: 'example_organization_id',
  environment_id: 'example_environment_id',
  goal: 'example_goal',
})
```


### DeepScanFinding

Create an instance: `const deep_scan_finding = client.DeepScanFinding()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding_count` | `number` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `any[]` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `any[]` |  |
| `findings_fix_prompt` | `string | null` |  |
| `free_findings_pending` | `boolean` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `Record<string, any>` |  |
| `priority` | `string | null` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` |  |
| `reproduction_of` | `Record<string, any> | null` |  |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `boolean` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` |  |
| `title` | `string` |  |
| `unlock` | `Record<string, any>` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` |  |

#### Example: List

```ts
const deep_scan_findings = await client.DeepScanFinding().list({ deep_scan_id: "example", organization_id: "example" })
```


### DeepScanFlow

Create an instance: `const deep_scan_flow = client.DeepScanFlow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `concurrency` | `number` |  |
| `environment_id` | `string` |  |
| `exploration_id` | `string` |  |
| `flow_names` | `any[]` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `note` | `string | null` |  |

#### Example: Create

```ts
const deep_scan_flow = await client.DeepScanFlow().create({
  organization_id: 'example_organization_id',
  flow_names: [],
})
```


### DeepScanMappedFlow

Create an instance: `const deep_scan_mapped_flow = client.DeepScanMappedFlow()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `environment_id` | `string` |  |
| `flow_map` | `Record<string, any> | null` |  |
| `revision_id` | `string | null` |  |

#### Example: List

```ts
const deep_scan_mapped_flows = await client.DeepScanMappedFlow().list({ organization_id: "example", environment_id: "example" })
```


### DeepScanOption

Create an instance: `const deep_scan_option = client.DeepScanOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `any[]` |  |
| `deep_scan_defaults` | `any` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `Record<string, any> | null` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` |  |
| `name` | `string` |  |
| `personas` | `any[]` |  |
| `preview` | `boolean` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `string | null` |  |

#### Example: List

```ts
const deep_scan_options = await client.DeepScanOption().list({ organization_id: "example" })
```


### DemoShare

Create an instance: `const demo_share = client.DemoShare()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `recording` | `Record<string, any>` |  |
| `summary` | `string` | What the recorded browser confirmed. |

#### Example: Load

```ts
const demo_share = await client.DemoShare().load({ id: 'demo_share_id' })
```


### DemoShareSegment

Create an instance: `const demo_share_segment = client.DemoShareSegment()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const demo_share_segment = await client.DemoShareSegment().load({ id: 'demo_share_segment_id', demo_share_id: 'demo_share_id' })
```


### DeploymentDashboardNomad

Create an instance: `const deployment_dashboard_nomad = client.DeploymentDashboardNomad()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentFile

Create an instance: `const deployment_file = client.DeploymentFile()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DomainPathRule

Create an instance: `const domain_path_rule = client.DomainPathRule()`

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
| `app_service_endpoint_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `backend_ref` | `string | null` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string | null` |  |
| `path_prefix` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const domain_path_rule = await client.DomainPathRule().load({ id: 'domain_path_rule_id', app_id: 'app_id', domain_id: 'domain_id' })
```

#### Example: List

```ts
const domain_path_rules = await client.DomainPathRule().list({ app_id: "example", domain_id: "example" })
```

#### Example: Create

```ts
const domain_path_rule = await client.DomainPathRule().create({
  app_id: 'example_app_id',
  domain_id: 'example_domain_id',
  app_service_id: 'example_app_service_id',
  path_prefix: 'example_path_prefix',
})
```


### Dream

Create an instance: `const dream = client.Dream()`

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
| `changes` | `any[]` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `string | null` |  |
| `counts` | `Record<string, any>` |  |
| `dream` | `any` |  |
| `error_code` | `string | null` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Public id used in the dream's URL |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `phase` | `string` | Where the dream is. |
| `reason` | `string | null` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `number` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Local day whose finished runs it reviewed |
| `runs` | `any[]` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Project or unassigned environment name |
| `skipped` | `number` | Runs skipped after repeated rejected review output |
| `tab` | `string` |  |
| `timezone` | `string` | Organization timezone the dream used |

#### Example: Load

```ts
const dream = await client.Dream().load({ id: 'dream_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const dreams = await client.Dream().list({ organization_id: "example", project_id: "example" })
```


### Environment

Create an instance: `const environment = client.Environment()`

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
| `active_revision_id` | `string | null` |  |
| `agent_sign_up_available` | `boolean` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `Record<string, any>` |  |
| `cleanup` | `any[]` |  |
| `connection` | `string` |  |
| `created_at` | `string` |  |
| `default_policy` | `Record<string, any>` |  |
| `default_policy_json` | `Record<string, any>` |  |
| `discovery_defaults` | `Record<string, any>` |  |
| `environment` | `Record<string, any>` |  |
| `exploration_accounts` | `any[]` |  |
| `explorations` | `any[]` |  |
| `first_run` | `any` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `imessage_number` | `string | null` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `boolean` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `number` |  |
| `managed_google_available` | `boolean` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` |  |
| `messaging_tester_number` | `string | null` | One configured tester number. |
| `name` | `string` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `any[]` |  |
| `onboarding_discovery` | `any` |  |
| `organization_id` | `string` |  |
| `pending_accounts` | `any[]` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `Record<string, any>` |  |
| `project_id` | `string | null` | Owning project. |
| `repository_id` | `string | null` |  |
| `revisions` | `any[]` |  |
| `setup_discovery_id` | `string | null` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `boolean` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `target_kind` | `string | null` |  |
| `target_url` | `string | null` |  |
| `test_accounts` | `Record<string, any>` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `string | null` |  |
| `version` | `number` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```ts
const environment = await client.Environment().load({ id: 'environment_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const environments = await client.Environment().list({ organization_id: "example" })
```

#### Example: Create

```ts
const environment = await client.Environment().create({
  organization_id: 'example_organization_id',
  slug: 'example_slug',
})
```


### EnvironmentDiscoveryRun

Create an instance: `const environment_discovery_run = client.EnvironmentDiscoveryRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` | Omit for anonymous exploration |
| `deadline_at` | `string` |  |
| `environment_revision_id` | `string` |  |
| `evidence` | `any[]` |  |
| `failure_code` | `string | null` |  |
| `id` | `string` |  |
| `queued_at` | `string` |  |
| `recording` | `Record<string, any>` |  |
| `result` | `Record<string, any> | null` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const environment_discovery_run = await client.EnvironmentDiscoveryRun().load({ id: 'environment_discovery_run_id', environment_id: 'environment_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const environment_discovery_run = await client.EnvironmentDiscoveryRun().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
})
```


### EnvironmentExploration

Create an instance: `const environment_exploration = client.EnvironmentExploration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `persona_id` | `string | null` |  |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```ts
const environment_exploration = await client.EnvironmentExploration().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  goal: 'example_goal',
})
```


### EnvironmentFirstRun

Create an instance: `const environment_first_run = client.EnvironmentFirstRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### EnvironmentRevision

Create an instance: `const environment_revision = client.EnvironmentRevision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `any[]` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `string | null` |  |
| `app_release_id` | `string | null` |  |
| `blueprint` | `Record<string, any>` |  |
| `blueprint_json` | `Record<string, any>` |  |
| `cleanup_state` | `string` |  |
| `created_at` | `string` |  |
| `digest` | `string` |  |
| `dry_run` | `boolean` |  |
| `expires_at` | `string | null` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `ready_at` | `string | null` |  |
| `resolved_manifest_json` | `Record<string, any>` |  |
| `retention_policy_json` | `Record<string, any>` |  |
| `revision` | `number` |  |
| `revoked_at` | `string | null` |  |
| `runner_environment_revision_id` | `string | null` |  |
| `safety_policy_json` | `Record<string, any>` |  |
| `schema_version` | `number` |  |
| `source_metadata` | `Record<string, any>` |  |
| `source_metadata_json` | `Record<string, any>` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `validation_json` | `Record<string, any>` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```ts
const environment_revision = await client.EnvironmentRevision().load({ id: 'environment_revision_id', environment_id: 'environment_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const environment_revision = await client.EnvironmentRevision().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
  blueprint: {},
})
```


### EnvironmentSecretBinding

Create an instance: `const environment_secret_binding = client.EnvironmentSecretBinding()`

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

```ts
const environment_secret_bindings = await client.EnvironmentSecretBinding().list({ app_id: "example", environment_id: "example" })
```

#### Example: Create

```ts
const environment_secret_binding = await client.EnvironmentSecretBinding().create({
  app_id: 'example_app_id',
  environment_id: 'example_environment_id',
  env_key: 'example_env_key',
})
```


### EnvironmentTestAccount

Create an instance: `const environment_test_account = client.EnvironmentTestAccount()`

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
| `credentials` | `any[]` |  |
| `id` | `string` |  |
| `persona` | `string` |  |
| `revision_id` | `string` |  |
| `role` | `string` |  |
| `tenant` | `string` |  |

#### Example: List

```ts
const environment_test_accounts = await client.EnvironmentTestAccount().list({ environment_id: "example", organization_id: "example" })
```


### Evidence

Create an instance: `const evidence = client.Evidence()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const evidence = await client.Evidence().load({ id: 'evidence_id', organization_id: 'organization_id' })
```


### Exploration

Create an instance: `const exploration = client.Exploration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `active` | `any[]` |  |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `any[]` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `Record<string, any>` | Present only when launch was requested by an admin |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Record<string, any>` |  |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `persona_id` | `string | null` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```ts
const exploration = await client.Exploration().load({ id: 'exploration_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const explorations = await client.Exploration().list({ organization_id: "example" })
```

#### Example: Create

```ts
const exploration = await client.Exploration().create({
  organization_id: 'example_organization_id',
  environment_id: 'example_environment_id',
  goal: 'example_goal',
})
```


### ExplorationMessage

Create an instance: `const exploration_message = client.ExplorationMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `text` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```ts
const exploration_message = await client.ExplorationMessage().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
  text: 'example_text',
})
```


### ExplorationReport

Create an instance: `const exploration_report = client.ExplorationReport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ExplorationScenario

Create an instance: `const exploration_scenario = client.ExplorationScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `any[]` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `Record<string, any>` | What the team is doing now. |
| `finding_count` | `number` | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` |  |
| `goal` | `string` |  |
| `huntable_flows` | `any[]` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `number` |  |
| `max_testers` | `number` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `any[]` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` |  |
| `priority_counts` | `Record<string, any>` |  |
| `project_id` | `string | null` | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `reproduction_of` | `Record<string, any> | null` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` |  |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `boolean` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```ts
const exploration_scenario = await client.ExplorationScenario().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
})
```


### Finding

Create an instance: `const finding = client.Finding()`

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
| `deferred_until` | `string | null` | Required future time when status is deferred |
| `finding` | `Record<string, any>` |  |
| `fingerprint` | `string` |  |
| `first_seen_at` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `boolean` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `number` |  |
| `organization_id` | `string` |  |
| `permissions` | `Record<string, any>` |  |
| `reason` | `string` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `Record<string, any> | null` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `string | null` |  |
| `safe_summary` | `string` |  |
| `scenario_occurrences` | `any[]` |  |
| `severity` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verification` | `any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```ts
const finding = await client.Finding().load({ id: 'finding_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const findings = await client.Finding().list({ organization_id: "example" })
```


### GithubConnection

Create an instance: `const github_connection = client.GithubConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `any[]` |  |
| `github_app_installation_id` | `string` |  |
| `installations` | `any[]` |  |
| `project_id` | `string` | Project slug or public ID the repositories are added to. |
| `replace` | `boolean` | Make these the project's only repositories. |
| `repositories` | `any[]` |  |

#### Example: List

```ts
const github_connections = await client.GithubConnection().list({ organization_id: "example" })
```

#### Example: Create

```ts
const github_connection = await client.GithubConnection().create({
  organization_id: 'example_organization_id',
  github_app_installation_id: 'example_github_app_installation_id',
  repositories: [],
})
```


### HostingAppDomain

Create an instance: `const hosting_app_domain = client.HostingAppDomain()`

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
| `app_environment_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `certificate` | `Record<string, any> | null` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string | null` |  |
| `path_rules` | `any[]` |  |
| `record_name` | `string | null` |  |
| `record_type` | `string | null` |  |
| `record_value` | `string | null` |  |
| `redirect_to` | `string | null` |  |
| `static_site_id` | `string | null` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_record` | `Record<string, any> | null` |  |
| `verification_status` | `string` |  |

#### Example: Load

```ts
const hosting_app_domain = await client.HostingAppDomain().load({ id: 'hosting_app_domain_id', app_id: 'app_id' })
```

#### Example: List

```ts
const hosting_app_domains = await client.HostingAppDomain().list({ app_id: "example" })
```

#### Example: Create

```ts
const hosting_app_domain = await client.HostingAppDomain().create({
  app_id: 'example_app_id',
  app_service_id: 'example_app_service_id',
  hostname: 'example_hostname',
  kind: 'example_kind',
})
```


### ImageRepository

Create an instance: `const image_repository = client.ImageRepository()`

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
| `created_at_label` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider_kind` | `string` |  |
| `registry_auth_token` | `string` |  |
| `repository_path` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `visibility` | `string` |  |

#### Example: List

```ts
const image_repositorys = await client.ImageRepository().list({ organization_id: "example" })
```

#### Example: Create

```ts
const image_repository = await client.ImageRepository().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  slug: 'example_slug',
})
```


### Integration

Create an instance: `const integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `Record<string, any>` |  |
| `gitlab` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `slack` | `Record<string, any>` |  |

#### Example: List

```ts
const integrations = await client.Integration().list({ organization_id: "example" })
```


### InteractionResponse

Create an instance: `const interaction_response = client.InteractionResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `Record<string, any>` |  |
| `conversation_id` | `string` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `number` |  |

#### Example: Create

```ts
const interaction_response = await client.InteractionResponse().create({
  agent_id: 'example_agent_id',
  interaction_id: 'example_interaction_id',
  organization_id: 'example_organization_id',
  answer: {},
  conversation_id: 'example_conversation_id',
  expected_revision: 1,
})
```


### Invitation

Create an instance: `const invitation = client.Invitation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `string | null` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `string | null` |  |
| `expires_at_label` | `string | null` |  |
| `id` | `string` |  |
| `invite_url` | `string | null` |  |
| `invited_by_user` | `any` |  |
| `organization` | `Record<string, any>` |  |
| `revoked_at` | `string | null` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const invitations = await client.Invitation().list({ organization_id: "example" })
```

#### Example: Create

```ts
const invitation = await client.Invitation().create({
  organization_id: 'example_organization_id',
  email: 'example_email',
  role: 'example_role',
})
```


### JourneyVariantReplay

Create an instance: `const journey_variant_replay = client.JourneyVariantReplay()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `string | null` |  |
| `can_request_qualification` | `boolean` |  |
| `created_at` | `string` |  |
| `failure_code` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `number` |  |
| `preparation_receipt` | `Record<string, any> | null` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `boolean` |  |
| `review_reason` | `string` |  |
| `run_id` | `string | null` |  |
| `scenario_file` | `Record<string, any>` |  |
| `scenario_run_id` | `string | null` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Create

```ts
const journey_variant_replay = await client.JourneyVariantReplay().create({
  journey_variant_id: 'example_journey_variant_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  idempotency_key: 'example_idempotency_key',
  review_reason: 'example_review_reason',
  scenario_file: {},
})
```


### Knowledge

Create an instance: `const knowledge = client.Knowledge()`

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
| `content_json` | `Record<string, any>` |  |
| `document` | `Record<string, any>` |  |
| `documents` | `any[]` |  |
| `dreaming` | `Record<string, any>` |  |
| `expected_digest` | `string` |  |
| `history` | `any[]` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `markdown` | `string` |  |
| `observed_at` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `project_id` | `string` |  |
| `project_name` | `string` |  |
| `projects` | `any[]` |  |
| `selected_project_id` | `string | null` |  |
| `source` | `Record<string, any>` |  |
| `title` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const knowledge = await client.Knowledge().load({ id: 'knowledge_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const knowledge = await client.Knowledge().create({
  organization_id: 'example_organization_id',
  markdown: 'example_markdown',
  project_id: 'example_project_id',
  title: 'example_title',
})
```


### LocalThreadDelivery

Create an instance: `const local_thread_delivery = client.LocalThreadDelivery()`

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
| `delivery` | `Record<string, any>` |  |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `policy` | `Record<string, any>` |  |
| `recovery_message` | `string | null` |  |

#### Example: Load

```ts
const local_thread_delivery = await client.LocalThreadDelivery().load({ id: 'local_thread_delivery_id', agent_id: 'agent_id', local_thread_id: 'local_thread_id', organization_id: 'organization_id' })
```


### LocalThreadOperation

Create an instance: `const local_thread_operation = client.LocalThreadOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `delivery` | `Record<string, any>` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `Record<string, any>` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `Record<string, any>` |  |
| `result` | `any` |  |
| `result_expired` | `boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```ts
const local_thread_operation = await client.LocalThreadOperation().load({ id: 'local_thread_operation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const local_thread_operation = await client.LocalThreadOperation().create({
  agent_id: 'example_agent_id',
  local_thread_id: 'example_local_thread_id',
  organization_id: 'example_organization_id',
  action: 'example_action',
  arguments: {},
  key: 'example_key',
})
```


### Location

Create an instance: `const location = client.Location()`

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

```ts
const locations = await client.Location().list()
```


### Me

Create an instance: `const me = client.Me()`

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
| `app_promotion` | `Record<string, any>` |  |
| `commit_author_email` | `string` |  |
| `email` | `string` |  |
| `enabled_features` | `any[]` |  |
| `github_pr_user_authorization_connected` | `boolean` |  |
| `github_pr_user_authorization_login` | `string | null` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `impersonation` | `Record<string, any> | null` |  |
| `name` | `string | null` |  |
| `next_path` | `string` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `Record<string, any>` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `boolean` |  |
| `openai_sign_in_enabled` | `boolean` |  |
| `organizations` | `any[]` |  |
| `pending_organization_invitation_count` | `number` |  |
| `pending_organization_invitation_count_label` | `string` |  |
| `picture_url` | `string | null` |  |
| `superadmin` | `boolean` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `string | null` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```ts
const me = await client.Me().load({ id: 'me_id' })
```


### MeEmail

Create an instance: `const me_email = client.MeEmail()`

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
| `emails` | `any[]` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `verification_status` | `string` |  |
| `verified` | `boolean` |  |

#### Example: List

```ts
const me_emails = await client.MeEmail().list()
```

#### Example: Create

```ts
const me_email = await client.MeEmail().create({
  email: 'example_email',
})
```


### MeOnboarding

Create an instance: `const me_onboarding = client.MeOnboarding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### MediaFile

Create an instance: `const media_file = client.MediaFile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const media_file = await client.MediaFile().load({ id: 'media_file_id', browser_session_id: 'browser_session_id', media_id: 'media_id', organization_id: 'organization_id' })
```


### Member

Create an instance: `const member = client.Member()`

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
| `accepted_at` | `string | null` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `string | null` |  |
| `expires_at_label` | `string | null` |  |
| `id` | `string` |  |
| `invite_url` | `string | null` |  |
| `invited_by_user` | `any` |  |
| `is_self` | `boolean` |  |
| `organization` | `Record<string, any>` |  |
| `revoked_at` | `string | null` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `user` | `Record<string, any>` |  |

#### Example: List

```ts
const members = await client.Member().list({ organization_id: "example" })
```


### Memory

Create an instance: `const memory = client.Memory()`

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
| `history` | `any[]` |  |
| `id` | `string` |  |
| `indexed_at` | `string | null` |  |
| `memory` | `Record<string, any>` |  |
| `project_id` | `string` |  |
| `response` | `string` |  |
| `scope` | `Record<string, any>` |  |
| `source` | `Record<string, any>` |  |
| `tags` | `any[]` |  |
| `title` | `string` |  |
| `workaround` | `string` |  |

#### Example: Load

```ts
const memory = await client.Memory().load({ id: 'memory_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const memorys = await client.Memory().list({ organization_id: "example" })
```

#### Example: Create

```ts
const memory = await client.Memory().create({
  organization_id: 'example_organization_id',
  finding: 'example_finding',
  title: 'example_title',
})
```


### MergeRequest

Create an instance: `const merge_request = client.MergeRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `any[]` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` |  |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `string | null` |  |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `boolean` |  |
| `findings` | `any[]` |  |
| `github_repository` | `string | null` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `number` | `number` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `preview_cleanup_ready` | `boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string | null` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `string | null` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `string | null` |  |
| `provider` | `string` |  |
| `pull_request` | `Record<string, any>` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `requested_run_id` | `string | null` |  |
| `runs` | `any[]` |  |
| `source_branch` | `string | null` |  |
| `source_repository` | `string | null` |  |
| `source_url` | `string | null` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: Load

```ts
const merge_request = await client.MergeRequest().load({ id: 'merge_request_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const merge_request = await client.MergeRequest().create({
  organization_id: 'example_organization_id',
  idempotency_key: 'example_idempotency_key',
  number: 1,
})
```


### MessagingConversationMessage

Create an instance: `const messaging_conversation_message = client.MessagingConversationMessage()`

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
| `media` | `Record<string, any>` |  |
| `media_upload_ids` | `any[]` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `any[]` |  |
| `reply_to` | `string` | Public ID of a visible message |
| `retry_attachment` | `boolean` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `string | null` |  |
| `send_disposition` | `string` |  |
| `send_error` | `string | null` |  |
| `send_style` | `string | null` |  |

#### Example: Create

```ts
const messaging_conversation_message = await client.MessagingConversationMessage().create({
  messaging_conversation_id: 'example_messaging_conversation_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  client_operation_id: 'example_client_operation_id',
  content: 'example_content',
  media: {},
})
```


### MessagingConversationUpload

Create an instance: `const messaging_conversation_upload = client.MessagingConversationUpload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `Record<string, any>` |  |
| `upload_id` | `string` |  |

#### Example: Create

```ts
const messaging_conversation_upload = await client.MessagingConversationUpload().create({
  messaging_conversation_id: 'example_messaging_conversation_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```


### MetricQuery

Create an instance: `const metric_query = client.MetricQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const metric_querys = await client.MetricQuery().list()
```


### NetworkConnection

Create an instance: `const network_connection = client.NetworkConnection()`

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

```ts
const network_connection = await client.NetworkConnection().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```


### NomadAllocation

Create an instance: `const nomad_allocation = client.NomadAllocation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `client_status` | `string | null` |  |
| `create_time` | `string | null` |  |
| `datacenter` | `string | null` |  |
| `desired_description` | `string | null` |  |
| `desired_status` | `string | null` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `job_id` | `string | null` |  |
| `modify_time` | `string | null` |  |
| `name` | `string | null` |  |
| `namespace` | `string` |  |
| `node_id` | `string | null` |  |
| `node_name` | `string | null` |  |
| `resources` | `Record<string, any>` |  |
| `task_group` | `string | null` |  |
| `task_states` | `any[]` |  |
| `verify_runner_images` | `any[]` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```ts
const nomad_allocation = await client.NomadAllocation().load({ id: 'nomad_allocation_id', app_id: 'app_id' })
```


### NomadLog

Create an instance: `const nomad_log = client.NomadLog()`

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
| `location` | `string | null` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `number` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```ts
const nomad_logs = await client.NomadLog().list({ app_id: "example" })
```


### Organization

Create an instance: `const organization = client.Organization()`

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
| `activated_products` | `any[]` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `google_workspace_domain` | `string | null` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` |  |
| `logo_url` | `string | null` |  |
| `member_count` | `number` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `repository_count` | `number` |  |
| `role` | `string | null` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `any[]` | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `verify_pr_scenario_writing_enabled` | `boolean` |  |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.Organization().list()
```

#### Example: Create

```ts
const organization = await client.Organization().create({
  name: 'example_name',
  slug: 'example_slug',
})
```


### Page

Create an instance: `const page = client.Page()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `any[]` |  |
| `checkout_required` | `boolean` |  |
| `cli_signed_in_at` | `string | null` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `Record<string, any>` |  |
| `demo_project` | `Record<string, any> | null` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `any[]` |  |
| `included_deep_scan` | `boolean` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` |  |
| `organization` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `project` | `any` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `any[]` |  |
| `pull_requests` | `any[]` |  |
| `repositories` | `any[]` |  |
| `runs` | `any[]` |  |
| `runs_pagination` | `Record<string, any>` |  |
| `suggested_app_url` | `string | null` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `boolean` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```ts
const page = await client.Page().load({ organization_id: 'organization_id' })
```


### PageAgent

Create an instance: `const page_agent = client.PageAgent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `any[]` |  |
| `can_edit_integration_connections` | `boolean` |  |
| `creation_enabled` | `boolean` |  |
| `inbox` | `any` |  |
| `integration_choices` | `any[]` |  |
| `integration_choices_truncated` | `boolean` |  |
| `integration_selected` | `any[]` |  |
| `model_choices` | `any[]` |  |
| `new_configuration` | `any` |  |
| `organization_id` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `pinned_agent` | `any` |  |
| `platform_event_types` | `any[]` |  |
| `repository_choices` | `any[]` | Empty compatibility field. |
| `repository_choices_truncated` | `boolean` |  |
| `runtime_versions` | `any[]` | Runtime choices authorized for this organization. |
| `selected_agent` | `any` |  |
| `selected_reference` | `string | null` |  |
| `viewer_id` | `string` |  |

#### Example: List

```ts
const page_agents = await client.PageAgent().list({ organization_id: "example" })
```


### PageProjectRun

Create an instance: `const page_project_run = client.PageProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `any[]` |  |
| `fix_scenario_count` | `number` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `any[]` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `number` |  |
| `id` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `preparation_reason` | `string | null` |  |
| `project` | `Record<string, any>` |  |
| `run` | `Record<string, any>` |  |
| `scenario_runs` | `any[]` |  |
| `selected_scenario_run` | `any` |  |
| `web_path` | `string` |  |

#### Example: Load

```ts
const page_project_run = await client.PageProjectRun().load({ id: 'page_project_run_id', organization_id: 'organization_id', project_id: 'project_id' })
```


### PagesProjectCredential

Create an instance: `const pages_project_credential = client.PagesProjectCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `Record<string, any> | null` |  |
| `composal_address` | `string | null` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `boolean` |  |
| `credential_keys` | `Record<string, any>` |  |
| `description` | `string | null` |  |
| `email_link_auth_origins` | `any[]` |  |
| `has_inbox` | `boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `Record<string, any> | null` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string | null` |  |
| `login_method` | `string` |  |
| `login_url` | `string` |  |
| `managed` | `boolean` |  |
| `mfa_enabled` | `boolean` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `sign_in_verified` | `boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string | null` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: List

```ts
const pages_project_credentials = await client.PagesProjectCredential().list({ organization_id: "example", project_id: "example" })
```


### PagesProjectPersona

Create an instance: `const pages_project_persona = client.PagesProjectPersona()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_count` | `number` |  |
| `credentials` | `any[]` |  |
| `needs_attention_count` | `number` |  |
| `permissions` | `Record<string, any>` |  |
| `persona_states` | `Record<string, any>` | Scenarios by the state of their latest execution. |
| `personas` | `any[]` |  |
| `project` | `Record<string, any>` |  |

#### Example: List

```ts
const pages_project_personas = await client.PagesProjectPersona().list({ organization_id: "example", project_id: "example" })
```


### PagesProjectRun

Create an instance: `const pages_project_run = client.PagesProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_query` | `string` |  |
| `environments` | `any[]` |  |
| `environments_has_more` | `boolean` |  |
| `pagination` | `Record<string, any>` |  |
| `runs` | `any[]` |  |
| `selected_environment` | `any` |  |

#### Example: List

```ts
const pages_project_runs = await client.PagesProjectRun().list({ organization_id: "example", project_id: "example" })
```


### PagesProjectScenario

Create an instance: `const pages_project_scenario = client.PagesProjectScenario()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string | null` |  |
| `name` | `string` |  |

#### Example: List

```ts
const pages_project_scenarios = await client.PagesProjectScenario().list({ organization_id: "example", project_id: "example" })
```


### PersonalAccessToken

Create an instance: `const personal_access_token = client.PersonalAccessToken()`

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

```ts
const personal_access_tokens = await client.PersonalAccessToken().list()
```

#### Example: Create

```ts
const personal_access_token = await client.PersonalAccessToken().create({
})
```


### PreviewOperation

Create an instance: `const preview_operation = client.PreviewOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const preview_operations = await client.PreviewOperation().list({ app_id: "example", preview_id: "example" })
```


### PreviewProfileSecretBinding

Create an instance: `const preview_profile_secret_binding = client.PreviewProfileSecretBinding()`

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

```ts
const preview_profile_secret_bindings = await client.PreviewProfileSecretBinding().list({ app_id: "example", preview_profile_id: "example" })
```

#### Example: Create

```ts
const preview_profile_secret_binding = await client.PreviewProfileSecretBinding().create({
  app_id: 'example_app_id',
  preview_profile_id: 'example_preview_profile_id',
  env_key: 'example_env_key',
})
```


### PreviewSecret

Create an instance: `const preview_secret = client.PreviewSecret()`

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

```ts
const preview_secret = await client.PreviewSecret().create({
  app_id: 'example_app_id',
  preview_id: 'example_preview_id',
  env_key: 'example_env_key',
  name: 'example_name',
  slug: 'example_slug',
  value: 'example_value',
})
```


### PreviewSharingApproval

Create an instance: `const preview_sharing_approval = client.PreviewSharingApproval()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `any[]` |  |
| `approved_build_secrets` | `any[]` |  |
| `approved_default_configuration` | `any[]` |  |
| `approved_default_secrets` | `any[]` |  |
| `approved_source_keys` | `any[]` |  |
| `build_keys` | `any[]` |  |
| `build_secrets` | `any[]` |  |
| `default_configuration` | `any[]` |  |
| `default_secrets` | `any[]` |  |
| `services` | `any[]` |  |
| `snapshot_version` | `number` |  |
| `source_keys` | `any[]` |  |

#### Example: List

```ts
const preview_sharing_approvals = await client.PreviewSharingApproval().list({ app_id: "example", preview_id: "example" })
```

#### Example: Create

```ts
const preview_sharing_approval = await client.PreviewSharingApproval().create({
  app_id: 'example_app_id',
  preview_id: 'example_preview_id',
  snapshot_version: 1,
})
```


### ProductMapIdentityDecision

Create an instance: `const product_map_identity_decision = client.ProductMapIdentityDecision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `any[]` |  |
| `operation` | `string` |  |
| `reason` | `string` |  |
| `target` | `Record<string, any>` |  |

#### Example: Create

```ts
const product_map_identity_decision = await client.ProductMapIdentityDecision().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  observations: [],
  operation: 'example_operation',
  reason: 'example_reason',
  target: {},
})
```


### ProductMapJourney

Create an instance: `const product_map_journey = client.ProductMapJourney()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `string | null` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `journey` | `Record<string, any>` |  |
| `next_cursor` | `string | null` |  |
| `preview` | `any` |  |
| `scope` | `Record<string, any>` |  |
| `title` | `string` |  |
| `tree` | `Record<string, any>` |  |
| `tree_loaded` | `boolean` |  |
| `variant_count` | `number` |  |
| `variants` | `any[]` |  |

#### Example: Load

```ts
const product_map_journey = await client.ProductMapJourney().load({ id: 'product_map_journey_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const product_map_journeys = await client.ProductMapJourney().list({ organization_id: "example", project_id: "example" })
```


### ProductMapJourneyReplay

Create an instance: `const product_map_journey_replay = client.ProductMapJourneyReplay()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `string | null` |  |
| `can_request_qualification` | `boolean` |  |
| `created_at` | `string` |  |
| `failure_code` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `id` | `string` |  |
| `preparation_receipt` | `Record<string, any> | null` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `boolean` |  |
| `review_reason` | `string` |  |
| `run_id` | `string | null` |  |
| `scenario_run_id` | `string | null` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Load

```ts
const product_map_journey_replay = await client.ProductMapJourneyReplay().load({ id: 'product_map_journey_replay_id', organization_id: 'organization_id', project_id: 'project_id' })
```


### ProductMapObservation

Create an instance: `const product_map_observation = client.ProductMapObservation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `Record<string, any>` |  |
| `events` | `any[]` |  |
| `evidence_id` | `string` |  |
| `id` | `string` |  |
| `observation_id` | `string` |  |
| `scope` | `Record<string, any>` |  |
| `state` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const product_map_observation = await client.ProductMapObservation().load({ id: 'product_map_observation_id', organization_id: 'organization_id', project_id: 'project_id' })
```


### ProductMapQuestion

Create an instance: `const product_map_question = client.ProductMapQuestion()`

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
| `claims` | `any[]` |  |
| `evidence_truncated` | `boolean` |  |
| `model` | `string` |  |
| `persona_id` | `string` |  |
| `query` | `string` |  |
| `question` | `string` |  |
| `reasoning_effort` | `string` |  |
| `revision_id` | `string` |  |
| `scope` | `Record<string, any>` |  |
| `since` | `string` |  |
| `state_id` | `string` |  |
| `status` | `string` |  |
| `unknowns` | `any[]` |  |

#### Example: Create

```ts
const product_map_question = await client.ProductMapQuestion().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  question: 'example_question',
})
```


### ProductMapState

Create an instance: `const product_map_state = client.ProductMapState()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string | null` |  |
| `attempts` | `any[]` |  |
| `captured_at` | `string` |  |
| `id` | `string` |  |
| `incoming` | `any[]` |  |
| `labels` | `Record<string, any>` |  |
| `layout` | `Record<string, any>` |  |
| `observation_id` | `string` |  |
| `omitted_controls` | `number` |  |
| `outgoing` | `any[]` |  |
| `revision_id` | `string` |  |
| `scope` | `Record<string, any>` |  |
| `screenshot_url` | `string | null` |  |
| `state` | `Record<string, any>` |  |
| `truncated` | `boolean` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const product_map_state = await client.ProductMapState().load({ id: 'product_map_state_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const product_map_states = await client.ProductMapState().list({ organization_id: "example", project_id: "example" })
```


### Project

Create an instance: `const project = client.Project()`

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
| `archived_at` | `string | null` |  |
| `context` | `string | null` |  |
| `created_at` | `string` |  |
| `credentials` | `any[]` |  |
| `demo` | `boolean` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `any[]` |  |
| `environments` | `any[]` |  |
| `execution_mode` | `string` |  |
| `icon_url` | `string | null` |  |
| `id` | `string` |  |
| `identity_provider` | `Record<string, any>` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `network_connections` | `any[]` |  |
| `organization_id` | `string` |  |
| `overview` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `personas` | `any[]` |  |
| `project` | `Record<string, any>` |  |
| `pull_request_options` | `Record<string, any>` |  |
| `pull_requests` | `any[]` |  |
| `purpose` | `string | null` |  |
| `runs` | `any[]` |  |
| `scenario_history` | `Record<string, any>` |  |
| `scenario_states` | `Record<string, any>` | Scenarios by the state of their latest execution. |
| `scenarios` | `any[]` |  |
| `setup_required` | `boolean` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences` | `Record<string, any>` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `number` |  |
| `website_url` | `string | null` |  |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const projects = await client.Project().list({ organization_id: "example" })
```

#### Example: Create

```ts
const project = await client.Project().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```


### ProjectAndroidApk

Create an instance: `const project_android_apk = client.ProjectAndroidApk()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `Record<string, any>` |  |
| `artifact_paths` | `any[]` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `Record<string, any>` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `Record<string, any>` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```ts
const project_android_apk = await client.ProjectAndroidApk().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```


### ProjectCodeMap

Create an instance: `const project_code_map = client.ProjectCodeMap()`

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
| `error_code` | `string | null` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `ref` | `string` |  |
| `repository_id` | `string` |  |
| `revision` | `Record<string, any>` |  |
| `slug` | `string` |  |
| `status` | `string` |  |

#### Example: List

```ts
const project_code_maps = await client.ProjectCodeMap().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const project_code_map = await client.ProjectCodeMap().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  repository_id: 'example_repository_id',
})
```


### ProjectEnvironment

Create an instance: `const project_environment = client.ProjectEnvironment()`

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
| `allowed_origins` | `any[]` |  |
| `archived_at` | `string | null` |  |
| `base_url` | `string | null` |  |
| `base_url_changeable` | `boolean` | Whether an update may send a new base_url. |
| `binary` | `string` |  |
| `conversation_only_messaging` | `boolean` |  |
| `created_at` | `string` |  |
| `desktop` | `Record<string, any> | null` |  |
| `execution_mode` | `string` |  |
| `id` | `string` |  |
| `imessage_number` | `string | null` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `lock_version` | `number` |  |
| `messaging_conversation` | `any` |  |
| `messaging_problem` | `string | null` |  |
| `messaging_source` | `any` |  |
| `messaging_tester_number` | `string | null` | One configured tester number. |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `pull_request` | `Record<string, any> | null` |  |
| `source_branch` | `string | null` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `string | null` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const project_environment = await client.ProjectEnvironment().load({ id: 'project_environment_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const project_environments = await client.ProjectEnvironment().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const project_environment = await client.ProjectEnvironment().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
})
```


### ProjectFinding

Create an instance: `const project_finding = client.ProjectFinding()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `string | null` |  |
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

```ts
const project_findings = await client.ProjectFinding().list({ organization_id: "example", project_id: "example" })
```


### ProjectFixture

Create an instance: `const project_fixture = client.ProjectFixture()`

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
| `assignments` | `any[]` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `number` |  |
| `content_type` | `string` |  |
| `credential_ids` | `any[]` |  |
| `credentials` | `any[]` |  |
| `environment_ids` | `any[]` |  |
| `environments` | `any[]` |  |
| `fixtures` | `any[]` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `persona_ids` | `any[]` |  |
| `personas` | `any[]` |  |
| `project` | `Record<string, any>` |  |
| `sha256` | `string` |  |
| `url` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const project_fixture = await client.ProjectFixture().load({ id: 'project_fixture_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const project_fixtures = await client.ProjectFixture().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const project_fixture = await client.ProjectFixture().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```


### ProjectIosApp

Create an instance: `const project_ios_app = client.ProjectIosApp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `Record<string, any>` |  |
| `artifact_paths` | `any[]` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `Record<string, any>` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `Record<string, any>` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```ts
const project_ios_app = await client.ProjectIosApp().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```


### ProjectMessagingConversation

Create an instance: `const project_messaging_conversation = client.ProjectMessagingConversation()`

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
| `messages` | `any[]` |  |
| `reconciled_at` | `string | null` |  |
| `retirable` | `boolean` |  |
| `seeded` | `boolean` |  |
| `send_blocked_reason` | `string | null` |  |
| `send_disposition` | `string` |  |
| `send_error` | `string | null` |  |
| `tester_number` | `string` |  |
| `unknown_send` | `boolean` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```ts
const project_messaging_conversation = await client.ProjectMessagingConversation().load({ id: 'project_messaging_conversation_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: Create

```ts
const project_messaging_conversation = await client.ProjectMessagingConversation().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  assistant_number: 'example_assistant_number',
  tester_number: 'example_tester_number',
  verify_environment_id: 'example_verify_environment_id',
})
```


### ProjectOverviewMetric

Create an instance: `const project_overview_metric = client.ProjectOverviewMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `Record<string, any>` |  |

#### Example: List

```ts
const project_overview_metrics = await client.ProjectOverviewMetric().list({ organization_id: "example", project_id: "example" })
```


### ProjectOverviewPullRequest

Create an instance: `const project_overview_pull_request = client.ProjectOverviewPullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `boolean` |  |
| `comment_url` | `string | null` |  |
| `draft` | `boolean` |  |
| `github_repository` | `string | null` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `string | null` |  |
| `latest_current` | `boolean` |  |
| `latest_head_sha` | `string | null` |  |
| `latest_reason` | `string | null` |  |
| `latest_run_id` | `string | null` |  |
| `latest_state` | `string | null` |  |
| `number` | `number` |  |
| `project_id` | `string | null` |  |
| `project_slug` | `string | null` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `string | null` |  |
| `source_repository` | `string | null` |  |
| `source_url` | `string | null` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```ts
const project_overview_pull_requests = await client.ProjectOverviewPullRequest().list({ organization_id: "example", project_id: "example" })
```


### ProjectProductMap

Create an instance: `const project_product_map = client.ProjectProductMap()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectRecording

Create an instance: `const project_recording = client.ProjectRecording()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `draft` | `any` | Present once drafted. |
| `environment_id` | `string` | The project environment the browser opens. |
| `error` | `string | null` |  |
| `event_count` | `number` |  |
| `id` | `string` |  |
| `persona_id` | `string` | The project persona the journey acts as. |
| `phase` | `string` | What the owner can do now. |
| `signed_in_during_recording` | `boolean` |  |
| `start_path` | `string` | A path on the environment to start at, such as /settings. |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const project_recording = await client.ProjectRecording().load({ id: 'project_recording_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: Create

```ts
const project_recording = await client.ProjectRecording().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  environment_id: 'example_environment_id',
  persona_id: 'example_persona_id',
})
```


### ProjectRunPlan

Create an instance: `const project_run_plan = client.ProjectRunPlan()`

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
| `archived_at` | `string | null` |  |
| `base_url` | `string | null` |  |
| `created_at` | `string` |  |
| `dependencies` | `any[]` |  |
| `id` | `string` |  |
| `identity_probe` | `Record<string, any> | null` |  |
| `kind` | `string | null` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `nodes` | `any[]` |  |
| `preview` | `any` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const project_run_plan = await client.ProjectRunPlan().load({ id: 'project_run_plan_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const project_run_plans = await client.ProjectRunPlan().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const project_run_plan = await client.ProjectRunPlan().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  dependencies: [],
  identity_probe: {},
  name: 'example_name',
  nodes: [],
})
```


### ProjectRunSchedule

Create an instance: `const project_run_schedule = client.ProjectRunSchedule()`

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
| `credential_ids` | `Record<string, any>` |  |
| `cron_expression` | `string | null` |  |
| `environment_id` | `string` | Project environment slug or public ID. |
| `environment_name` | `string` |  |
| `history` | `any[]` |  |
| `id` | `string` |  |
| `labels` | `any[]` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `next_run_at` | `string` |  |
| `notification_channel` | `string` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `number` |  |
| `selection_mode` | `string` |  |
| `slack_subscription_id` | `string | null` |  |
| `source_scenario_id` | `string | null` |  |
| `state` | `string` |  |
| `time_of_day` | `string` |  |
| `time_zone` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const project_run_schedule = await client.ProjectRunSchedule().load({ id: 'project_run_schedule_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const project_run_schedules = await client.ProjectRunSchedule().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const project_run_schedule = await client.ProjectRunSchedule().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  credential_ids: {},
  environment_id: 'example_environment_id',
  labels: [],
  name: 'example_name',
  selection_mode: 'example_selection_mode',
  state: 'example_state',
  time_of_day: 'example_time_of_day',
  time_zone: 'example_time_zone',
})
```


### ProjectScenarioOption

Create an instance: `const project_scenario_option = client.ProjectScenarioOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `any[]` |  |
| `permissions` | `Record<string, any>` |  |
| `personas` | `any[]` |  |
| `project` | `Record<string, any>` |  |
| `scenario_states` | `Record<string, any>` | Scenarios by the state of their latest execution. |
| `scenarios` | `any[]` |  |
| `schedule_options` | `any` |  |
| `schedules` | `any[]` |  |

#### Example: List

```ts
const project_scenario_options = await client.ProjectScenarioOption().list({ organization_id: "example", project_id: "example" })
```


### ProjectScenarioRow

Create an instance: `const project_scenario_row = client.ProjectScenarioRow()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `number` |  |
| `dependency_count` | `number` |  |
| `health` | `Record<string, any>` |  |
| `id` | `string` |  |
| `labels` | `any[]` |  |
| `name` | `string` |  |
| `persona_id` | `string` |  |
| `selectable_for_run` | `boolean` |  |
| `step_count` | `number` |  |

#### Example: List

```ts
const project_scenario_rows = await client.ProjectScenarioRow().list({ organization_id: "example", project_id: "example" })
```


### ProjectSetting

Create an instance: `const project_setting = client.ProjectSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `any[]` |  |
| `messaging_conversations` | `any[]` |  |
| `messaging_enabled` | `boolean` |  |
| `permissions` | `Record<string, any>` |  |
| `project` | `Record<string, any>` |  |
| `tester_numbers` | `any[]` |  |

#### Example: List

```ts
const project_settings = await client.ProjectSetting().list({ organization_id: "example", project_id: "example" })
```


### PullRequest

Create an instance: `const pull_request = client.PullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `any[]` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `boolean` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `any[]` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `imessage_number` | `string` | International destination of this exact deployed commit. |
| `number` | `number` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `preview_cleanup_ready` | `boolean` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string | null` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `string` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `Record<string, any>` |  |
| `repository_id` | `string` |  |
| `runs` | `any[]` |  |

#### Example: Load

```ts
const pull_request = await client.PullRequest().load({ id: 'pull_request_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const pull_request = await client.PullRequest().create({
  organization_id: 'example_organization_id',
  idempotency_key: 'example_idempotency_key',
})
```


### PullRequestSetting

Create an instance: `const pull_request_setting = client.PullRequestSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `bots` | `any[]` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `boolean` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `Record<string, any> | null` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `number` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` |  |
| `demo_videos` | `boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `boolean` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `string | null` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` |  |
| `enabled` | `boolean` | Test PRs automatically. |
| `environment` | `string` | The environment whose test accounts sign in to the previews. |
| `environments` | `any[]` |  |
| `github_check_enabled` | `boolean` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `any[]` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` |  |
| `imessage_comment_prefix` | `string | null` |  |
| `imessage_number` | `string | null` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` |  |
| `limits` | `Record<string, any>` |  |
| `link_pattern` | `string | null` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `string | null` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `number` |  |
| `messaging_enabled` | `boolean` |  |
| `messaging_tester_number` | `string | null` | One configured tester number. |
| `non_product_paths` | `any[]` |  |
| `permissions` | `Record<string, any>` |  |
| `pr_check` | `boolean` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` |  |
| `preview_comment_authors` | `any[]` |  |
| `preview_comment_pattern` | `string` |  |
| `preview_comment_wildcard` | `string | null` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `string | null` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `any[]` |  |
| `previews` | `string` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `any[]` |  |
| `provider` | `string` |  |
| `repositories` | `any[]` |  |
| `repository` | `string` | Repository ID; see repositories for its name. |
| `repository_id` | `string` |  |
| `repository_kind` | `string` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` |  |
| `service` | `string | null` | composal: the public service the browsers open. |
| `settings` | `any[]` |  |
| `setup` | `any` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `Record<string, any>` | The answers a new setup starts from |
| `source_repository` | `string` |  |
| `target_mode` | `string` |  |
| `tester_numbers` | `any[]` |  |
| `trigger_label` | `string` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `boolean` |  |
| `trigger_on_label` | `boolean` |  |
| `trigger_on_push` | `boolean` |  |
| `trigger_on_ready` | `boolean` |  |
| `triggers` | `Record<string, any>` | When runs start. |
| `verify_environment_id` | `string` |  |
| `write_scenarios` | `boolean` | Draft and validate focused scenarios for each change on its preview. |

#### Example: List

```ts
const pull_request_settings = await client.PullRequestSetting().list({ organization_id: "example" })
```

#### Example: Create

```ts
const pull_request_setting = await client.PullRequestSetting().create({
  organization_id: 'example_organization_id',
  bots: [],
  demo_videos: true,
  deployment: 'example_deployment',
  enabled: true,
  environment: 'example_environment',
  imessage_comment_prefix: 'example_imessage_comment_prefix',
  imessage_number: 'example_imessage_number',
  imessage_number_source: 'example_imessage_number_source',
  limits: {},
  link_pattern: 'example_link_pattern',
  links: 'example_links',
  messaging_tester_number: 'example_messaging_tester_number',
  pr_check: true,
  preview_comment_wildcard: 'example_preview_comment_wildcard',
  preview_profile: 'example_preview_profile',
  previews: 'example_previews',
  project_id: 'example_project_id',
  provider: 'example_provider',
  repository: 'example_repository',
  repository_id: 'example_repository_id',
  repository_kind: 'example_repository_kind',
  service: 'example_service',
  target_mode: 'example_target_mode',
  trigger_label: 'example_trigger_label',
  triggers: {},
  verify_environment_id: 'example_verify_environment_id',
  write_scenarios: true,
})
```


### PullRequestSettingAddRepository

Create an instance: `const pull_request_setting_add_repository = client.PullRequestSettingAddRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `string` |  |
| `replace` | `boolean` | Make these the project's only repositories. |
| `repositories` | `any[]` |  |

#### Example: Create

```ts
const pull_request_setting_add_repository = await client.PullRequestSettingAddRepository().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  repositories: [],
})
```


### PullRequestSettingDetectComment

Create an instance: `const pull_request_setting_detect_comment = client.PullRequestSettingDetectComment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `any[]` | The bots answer |
| `deployment` | `string` | The deployment answer |
| `example_url` | `string` |  |
| `imessage_comment_prefix` | `string` |  |
| `imessage_number` | `string | null` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `link_pattern` | `string` | The link_pattern answer |
| `project_id` | `string` | Project slug or ID. |
| `provider` | `string` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | Repository slug, ID or owner/name. |
| `request_number` | `number` |  |

#### Example: Create

```ts
const pull_request_setting_detect_comment = await client.PullRequestSettingDetectComment().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```


### Recorder

Create an instance: `const recorder = client.Recorder()`

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

```ts
const recorder = await client.Recorder().load({ organization_id: 'organization_id' })
```


### Registry

Create an instance: `const registry = client.Registry()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### RegistryV2

Create an instance: `const registry_v2 = client.RegistryV2()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RelayAgentLocalThread

Create an instance: `const relay_agent_local_thread = client.RelayAgentLocalThread()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### ReportReplay

Create an instance: `const report_replay = client.ReportReplay()`

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
| `recording` | `Record<string, any>` |  |
| `replay_steps` | `any[]` |  |

#### Example: Load

```ts
const report_replay = await client.ReportReplay().load({ id: 'report_replay_id', exploration_id: 'exploration_id', organization_id: 'organization_id' })
```


### ReportScenario

Create an instance: `const report_scenario = client.ReportScenario()`

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
| `permissions` | `Record<string, any>` |  |
| `project_id` | `string | null` |  |
| `related_explorations` | `any[]` |  |
| `report` | `Record<string, any>` |  |
| `saves_scenarios` | `boolean` |  |
| `scenario_generation` | `Record<string, any>` |  |
| `status` | `string` |  |

#### Example: Create

```ts
const report_scenario = await client.ReportScenario().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
})
```


### RunScenarioRun

Create an instance: `const run_scenario_run = client.RunScenarioRun()`

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

Create an instance: `const run_schedule_option = client.RunScheduleOption()`

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

```ts
const run_schedule_options = await client.RunScheduleOption().list({ organization_id: "example", project_id: "example" })
```


### RunSearch

Create an instance: `const run_search = client.RunSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `any[]` |  |

#### Example: Load

```ts
const run_search = await client.RunSearch().load({ organization_id: 'organization_id' })
```


### RunUpdate

Create an instance: `const run_update = client.RunUpdate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `boolean` |  |
| `comment_url` | `string | null` |  |
| `draft` | `boolean` |  |
| `github_repository` | `string | null` | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `string | null` |  |
| `latest_current` | `boolean` |  |
| `latest_head_sha` | `string | null` |  |
| `latest_reason` | `string | null` |  |
| `latest_run_id` | `string | null` |  |
| `latest_state` | `string | null` |  |
| `number` | `number` |  |
| `project_id` | `string | null` |  |
| `project_slug` | `string | null` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `string | null` |  |
| `source_repository` | `string | null` |  |
| `source_url` | `string | null` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```ts
const run_updates = await client.RunUpdate().list({ organization_id: "example" })
```


### ScenarioRevision

Create an instance: `const scenario_revision = client.ScenarioRevision()`

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
| `definition` | `Record<string, any>` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` |  |
| `source` | `string` | The client the save came through. |
| `user` | `any` | Null when a system job saved the Scenario. |
| `version` | `number` | The Scenario's lock_version after this save. |

#### Example: List

```ts
const scenario_revisions = await client.ScenarioRevision().list({ organization_id: "example", project_id: "example", scenario_id: "example" })
```


### ScenarioRunLesson

Create an instance: `const scenario_run_lesson = client.ScenarioRunLesson()`

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

```ts
const scenario_run_lesson = await client.ScenarioRunLesson().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  run_id: 'example_run_id',
  scenario_run_id: 'example_scenario_run_id',
  finding: 'example_finding',
  workaround: 'example_workaround',
})
```


### ScenarioRunScenarioEdit

Create an instance: `const scenario_run_scenario_edit = client.ScenarioRunScenarioEdit()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ServiceEndpoint

Create an instance: `const service_endpoint = client.ServiceEndpoint()`

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

```ts
const service_endpoint = await client.ServiceEndpoint().load({ id: 'service_endpoint_id', app_id: 'app_id', service_id: 'service_id' })
```

#### Example: List

```ts
const service_endpoints = await client.ServiceEndpoint().list({ app_id: "example", service_id: "example" })
```

#### Example: Create

```ts
const service_endpoint = await client.ServiceEndpoint().create({
  app_id: 'example_app_id',
  service_id: 'example_service_id',
})
```


### SitePreview

Create an instance: `const site_preview = client.SitePreview()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `string | null` | The site's icon as a data: URL, up to 256 KB |
| `title` | `string | null` |  |
| `url` | `string` | The address as it will be saved |

#### Example: Load

```ts
const site_preview = await client.SitePreview().load({ organization_id: 'organization_id', url: 'url' })
```


### SlackChannel

Create an instance: `const slack_channel = client.SlackChannel()`

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

```ts
const slack_channels = await client.SlackChannel().list({ agent_id: "example", organization_id: "example" })
```


### SparkAgentLocalThread

Create an instance: `const spark_agent_local_thread = client.SparkAgentLocalThread()`

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
| `delivery` | `Record<string, any>` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` |  |
| `expires_at` | `string` |  |
| `full_title` | `string` | The native name or first prompt in full, for a tooltip. |
| `id` | `string` |  |
| `key` | `string` |  |
| `last_activity_at` | `string | null` |  |
| `native_thread_id` | `string` |  |
| `parent_conversation_id` | `string | null` |  |
| `provider` | `string` |  |
| `references` | `Record<string, any>` |  |
| `relay_disconnected_at` | `string | null` |  |
| `relay_participant` | `Record<string, any>` |  |
| `result` | `any` |  |
| `result_expired` | `boolean` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `Record<string, any> | boolean` |  |
| `section` | `string` | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` |  |
| `status` | `string | null` | What the native thread is doing. |
| `task_configured` | `boolean` |  |
| `thread_id` | `string` |  |
| `title` | `string` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```ts
const spark_agent_local_thread = await client.SparkAgentLocalThread().load({ id: 'spark_agent_local_thread_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const spark_agent_local_thread = await client.SparkAgentLocalThread().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  device_id: 'example_device_id',
  key: 'example_key',
  provider: 'example_provider',
  thread_id: 'example_thread_id',
})
```


### StaticSite

Create an instance: `const static_site = client.StaticSite()`

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
| `active_deployment_id` | `string | null` |  |
| `cdn_hostname` | `string` |  |
| `cdn_url` | `string` |  |
| `cname_target` | `string` |  |
| `created_at` | `string` |  |
| `default_url` | `string` |  |
| `description` | `string | null` |  |
| `error_document` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `index_document` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provisioned` | `boolean` |  |
| `provisioned_at` | `string | null` |  |
| `region` | `string | null` |  |
| `replication_regions` | `any[]` |  |
| `repository_id` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const static_site = await client.StaticSite().load({ id: 'static_site_id' })
```

#### Example: List

```ts
const static_sites = await client.StaticSite().list({ organization_id: "example" })
```

#### Example: Create

```ts
const static_site = await client.StaticSite().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  slug: 'example_slug',
})
```


### StaticSiteDeployment

Create an instance: `const static_site_deployment = client.StaticSiteDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `string | null` |  |
| `activated_at_label` | `string | null` |  |
| `commit_sha` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `creator_user_id` | `string | null` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `string | null` |  |
| `file_count` | `number` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `string | null` |  |
| `finished_at_label` | `string | null` |  |
| `id` | `string` |  |
| `is_active` | `boolean` |  |
| `source_ref` | `string | null` |  |
| `started_at` | `string | null` |  |
| `started_at_label` | `string | null` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `number` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `uploaded_at` | `string | null` |  |
| `uploaded_at_label` | `string | null` |  |

#### Example: Load

```ts
const static_site_deployment = await client.StaticSiteDeployment().load({ id: 'static_site_deployment_id', static_site_id: 'static_site_id' })
```

#### Example: List

```ts
const static_site_deployments = await client.StaticSiteDeployment().list({ static_site_id: "example" })
```

#### Example: Create

```ts
const static_site_deployment = await client.StaticSiteDeployment().create({
  static_site_id: 'example_static_site_id',
})
```


### StaticSiteDomain

Create an instance: `const static_site_domain = client.StaticSiteDomain()`

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
| `app_environment_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string | null` |  |
| `record_name` | `string | null` |  |
| `record_type` | `string | null` |  |
| `record_value` | `string | null` |  |
| `redirect_to` | `string | null` |  |
| `static_site_id` | `string | null` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Load

```ts
const static_site_domain = await client.StaticSiteDomain().load({ id: 'static_site_domain_id', static_site_id: 'static_site_id' })
```

#### Example: List

```ts
const static_site_domains = await client.StaticSiteDomain().list({ static_site_id: "example" })
```

#### Example: Create

```ts
const static_site_domain = await client.StaticSiteDomain().create({
  static_site_id: 'example_static_site_id',
  hostname: 'example_hostname',
})
```


### SubscriptionModel

Create an instance: `const subscription_model = client.SubscriptionModel()`

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
| `reasoning` | `any[]` | Effort levels this plan model accepts. |
| `speeds` | `any[]` | Speed modes advertised by this connected account and model. |

#### Example: List

```ts
const subscription_models = await client.SubscriptionModel().list({ agent_id: "example", organization_id: "example", profile_id: "example" })
```


### ThreadPreview

Create an instance: `const thread_preview = client.ThreadPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string | null` |  |
| `port` | `number` |  |
| `url` | `string` |  |

#### Example: Create

```ts
const thread_preview = await client.ThreadPreview().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  thread_id: 'example_thread_id',
  port: 1,
})
```


### VerificationProjectCredential

Create an instance: `const verification_project_credential = client.VerificationProjectCredential()`

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
| `browser_authentication` | `Record<string, any> | null` |  |
| `browser_session` | `string` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `string | null` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `boolean` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `boolean` | Select the Composal-managed Google test account when available. |
| `configured` | `boolean` |  |
| `cookies` | `string` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `Record<string, any>` |  |
| `description` | `string | null` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `any[]` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `boolean` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `Record<string, any> | null` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string | null` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` |  |
| `login_url` | `string` | Optional sign-in path or URL. |
| `managed` | `boolean` |  |
| `mfa_enabled` | `boolean` |  |
| `name` | `string` |  |
| `oidc` | `Record<string, any>` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `remove_browser_authentication` | `boolean` |  |
| `remove_totp` | `boolean` |  |
| `sign_in_verified` | `boolean` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string | null` |  |
| `status` | `string` |  |
| `totp_secret` | `string` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: Load

```ts
const verification_project_credential = await client.VerificationProjectCredential().load({ id: 'verification_project_credential_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const verification_project_credentials = await client.VerificationProjectCredential().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const verification_project_credential = await client.VerificationProjectCredential().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  login_method: 'example_login_method',
  name: 'example_name',
})
```


### VerificationProjectPersona

Create an instance: `const verification_project_persona = client.VerificationProjectPersona()`

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
| `archived_at` | `string | null` |  |
| `capabilities` | `string | null` |  |
| `created_at` | `string` |  |
| `credential_id` | `string | null` | The credential this persona signs in with. |
| `goals` | `string | null` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const verification_project_persona = await client.VerificationProjectPersona().load({ id: 'verification_project_persona_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const verification_project_personas = await client.VerificationProjectPersona().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const verification_project_persona = await client.VerificationProjectPersona().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
  role: 'example_role',
})
```


### VerificationProjectRun

Create an instance: `const verification_project_run = client.VerificationProjectRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `string | null` |  |
| `approved_digest` | `string | null` |  |
| `archived_at` | `string | null` |  |
| `available_tests` | `any[]` |  |
| `can_archive` | `boolean` |  |
| `can_restore` | `boolean` |  |
| `can_start_another_run` | `boolean` |  |
| `cleanup_state` | `string` |  |
| `concurrency` | `number` |  |
| `created_at` | `string` |  |
| `creator_name` | `string | null` |  |
| `definition_mode` | `string` |  |
| `environment_id` | `string | null` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `max_seconds` | `number` |  |
| `outcome` | `string | null` |  |
| `permissions` | `Record<string, any>` |  |
| `plan_digest` | `string | null` |  |
| `preparation_error_code` | `string | null` |  |
| `progress` | `Record<string, any>` |  |
| `project` | `Record<string, any>` |  |
| `project_id` | `string` |  |
| `pull_request` | `any` |  |
| `queued_at` | `string | null` |  |
| `run` | `Record<string, any>` |  |
| `run_plan_id` | `string | null` |  |
| `scenario_runs` | `any[]` |  |
| `source_run_id` | `string | null` |  |
| `source_versions` | `any[] | null` |  |
| `start_when_prepared` | `boolean` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` |  |
| `target_snapshot` | `Record<string, any>` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences_snapshot` | `Record<string, any>` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```ts
const verification_project_run = await client.VerificationProjectRun().load({ id: 'verification_project_run_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const verification_project_runs = await client.VerificationProjectRun().list({ organization_id: "example", project_id: "example" })
```


### VerificationProjectScenario

Create an instance: `const verification_project_scenario = client.VerificationProjectScenario()`

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
| `actors` | `Record<string, any>` |  |
| `allowed_actions` | `string` |  |
| `archived_at` | `string | null` |  |
| `cleanup` | `any[]` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` |  |
| `dependencies` | `any[]` |  |
| `fixtures` | `any[]` | Files upload steps choose, ordered by name. |
| `health` | `Record<string, any>` |  |
| `id` | `string` |  |
| `identity_probe` | `any` |  |
| `if` | `string | null` | A documented subset of Actions expressions. |
| `labels` | `any[]` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `on` | `any` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `any[]` |  |
| `persona_id` | `string` |  |
| `primary_actor` | `string | null` |  |
| `project_id` | `string` |  |
| `selectable_for_run` | `boolean` |  |
| `starting_conditions` | `string | null` |  |
| `steps` | `any[]` |  |
| `triggers` | `any[]` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const verification_project_scenario = await client.VerificationProjectScenario().load({ id: 'verification_project_scenario_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### Example: List

```ts
const verification_project_scenarios = await client.VerificationProjectScenario().list({ organization_id: "example", project_id: "example" })
```

#### Example: Create

```ts
const verification_project_scenario = await client.VerificationProjectScenario().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
})
```


### VerifyAppDomain

Create an instance: `const verify_app_domain = client.VerifyAppDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```ts
const verify_app_domain = await client.VerifyAppDomain().create({
  app_id: 'example_app_id',
  id: 'example_id',
})
```


### VerifyBrowserSession

Create an instance: `const verify_browser_session = client.VerifyBrowserSession()`

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
| `viewer_url` | `string | null` | Owner-only bearer link. |

#### Example: Load

```ts
const verify_browser_session = await client.VerifyBrowserSession().load({ id: 'verify_browser_session_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const verify_browser_session = await client.VerifyBrowserSession().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  url: 'example_url',
})
```


### VerifyStaticSiteDomain

Create an instance: `const verify_static_site_domain = client.VerifyStaticSiteDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `string | null` |  |
| `record_name` | `string | null` |  |
| `record_type` | `string | null` |  |
| `record_value` | `string | null` |  |
| `redirect_to` | `string | null` |  |
| `static_site_id` | `string | null` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Create

```ts
const verify_static_site_domain = await client.VerifyStaticSiteDomain().create({
  id: 'example_id',
  static_site_id: 'example_static_site_id',
})
```


### VersionLog

Create an instance: `const version_log = client.VersionLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `string` |  |
| `failure_phase` | `string | null` |  |
| `id` | `string` |  |
| `image_digest` | `string | null` |  |
| `image_reference` | `string | null` |  |
| `installer_version` | `string` |  |
| `ready_at` | `string | null` |  |
| `receipt` | `Record<string, any> | null` |  |
| `safe_error` | `string | null` |  |
| `started_at` | `string | null` |  |
| `status` | `string` |  |

#### Example: List

```ts
const version_logs = await client.VersionLog().list({ binary_id: "example", organization_id: "example", version_id: "example", project_id: "example" })
```


### WebBotAuth

Create an instance: `const web_bot_auth = client.WebBotAuth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string` |  |
| `origin` | `string` |  |
| `signatures` | `any[]` |  |

#### Example: Create

```ts
const web_bot_auth = await client.WebBotAuth().create({
  origin: 'example_origin',
})
```


### WorkflowRunStep

Create an instance: `const workflow_run_step = client.WorkflowRunStep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStopNotice

Create an instance: `const workflow_run_stop_notice = client.WorkflowRunStopNotice()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### WorkflowTriggerSkipped

Create an instance: `const workflow_trigger_skipped = client.WorkflowTriggerSkipped()`

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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
composal/
├── src/
│   ├── ComposalSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ComposalSDK } from '@voxgig-sdk/composal-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const pageprojectrun = client.PageProjectRun()
await pageprojectrun.load({ id: "example_id", organization_id: "example", project_id: "example" })

// pageprojectrun.data() now returns the pageprojectrun data from the last `load`
// pageprojectrun.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
