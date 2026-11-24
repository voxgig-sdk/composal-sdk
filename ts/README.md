# Composal TypeScript SDK



The TypeScript SDK for the Composal API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.A2aWellKnown()` — each with a small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`)
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


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const agentoperation = await client.AgentOperation().load({ agent_id: "example", id: "example_id", organization_id: "example" })
  console.log(agentoperation.data())
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

const agentoperation = await client.AgentOperation().load({ id: 'test01', agent_id: 'example_agent_id', organization_id: 'example_organization_id' })
// agentoperation is the AgentOperation entity; .data() reads its mock record
console.log(agentoperation.data())
```

You can also use the instance method:

```ts
const client = new ComposalSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.AgentOperation()

// First call runs the operation and stores its result
await entity.load({ id: 'example', agent_id: 'example_agent_id', organization_id: 'example_organization_id' })

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
| `A2aWellKnown(data?)` | `A2aWellKnownEntity` | Create an A2aWellKnown entity instance. |
| `AdminOrg(data?)` | `AdminOrgEntity` | Create an AdminOrg entity instance. |
| `Agent(data?)` | `AgentEntity` | Create an Agent entity instance. |
| `AgentApp(data?)` | `AgentAppEntity` | Create an AgentApp entity instance. |
| `AgentAppInstall(data?)` | `AgentAppInstallEntity` | Create an AgentAppInstall entity instance. |
| `AgentAttachment(data?)` | `AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation(data?)` | `AgentAutomationEntity` | Create an AgentAutomation entity instance. |
| `AgentAvatar(data?)` | `AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand(data?)` | `AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer(data?)` | `AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection(data?)` | `AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentConnectionDelegation(data?)` | `AgentConnectionDelegationEntity` | Create an AgentConnectionDelegation entity instance. |
| `AgentConnectionGrant(data?)` | `AgentConnectionGrantEntity` | Create an AgentConnectionGrant entity instance. |
| `AgentConnectionResource(data?)` | `AgentConnectionResourceEntity` | Create an AgentConnectionResource entity instance. |
| `AgentConnectionSafetyControl(data?)` | `AgentConnectionSafetyControlEntity` | Create an AgentConnectionSafetyControl entity instance. |
| `AgentConnectionTriggerSubscription(data?)` | `AgentConnectionTriggerSubscriptionEntity` | Create an AgentConnectionTriggerSubscription entity instance. |
| `AgentContextCheckpoint(data?)` | `AgentContextCheckpointEntity` | Create an AgentContextCheckpoint entity instance. |
| `AgentControlFlow(data?)` | `AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination(data?)` | `AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail(data?)` | `AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentEvent(data?)` | `AgentEventEntity` | Create an AgentEvent entity instance. |
| `AgentFile(data?)` | `AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput(data?)` | `AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration(data?)` | `AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
| `AgentIntegrationAccount(data?)` | `AgentIntegrationAccountEntity` | Create an AgentIntegrationAccount entity instance. |
| `AgentIntegrationCallback(data?)` | `AgentIntegrationCallbackEntity` | Create an AgentIntegrationCallback entity instance. |
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
| `AgentRelayFileGrant(data?)` | `AgentRelayFileGrantEntity` | Create an AgentRelayFileGrant entity instance. |
| `AgentRelayFileGrantAccount(data?)` | `AgentRelayFileGrantAccountEntity` | Create an AgentRelayFileGrantAccount entity instance. |
| `AgentRepository(data?)` | `AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource(data?)` | `AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoder(data?)` | `AgentRoderEntity` | Create an AgentRoder entity instance. |
| `AgentRoutine(data?)` | `AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun(data?)` | `AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime(data?)` | `AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSession(data?)` | `AgentSessionEntity` | Create an AgentSession entity instance. |
| `AgentSessionCheckpoint(data?)` | `AgentSessionCheckpointEntity` | Create an AgentSessionCheckpoint entity instance. |
| `AgentSessionRoderHandoff(data?)` | `AgentSessionRoderHandoffEntity` | Create an AgentSessionRoderHandoff entity instance. |
| `AgentSetting(data?)` | `AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing(data?)` | `AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite(data?)` | `AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill(data?)` | `AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack(data?)` | `AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent(data?)` | `AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription(data?)` | `AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentSwarm(data?)` | `AgentSwarmEntity` | Create an AgentSwarm entity instance. |
| `AgentTeammate(data?)` | `AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal(data?)` | `AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread(data?)` | `AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool(data?)` | `AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentUsage(data?)` | `AgentUsageEntity` | Create an AgentUsage entity instance. |
| `AgentVerifyProject(data?)` | `AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait(data?)` | `AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebPreview(data?)` | `AgentWebPreviewEntity` | Create an AgentWebPreview entity instance. |
| `AgentWebhook(data?)` | `AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork(data?)` | `AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow(data?)` | `AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal(data?)` | `AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun(data?)` | `AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger(data?)` | `AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace(data?)` | `AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission(data?)` | `AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `Agreement(data?)` | `AgreementEntity` | Create an Agreement entity instance. |
| `AgreementAccessRequest(data?)` | `AgreementAccessRequestEntity` | Create an AgreementAccessRequest entity instance. |
| `AlertRuleEvent(data?)` | `AlertRuleEventEntity` | Create an AlertRuleEvent entity instance. |
| `AllocationLog(data?)` | `AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App(data?)` | `AppEntity` | Create an App entity instance. |
| `AppAccess(data?)` | `AppAccessEntity` | Create an AppAccess entity instance. |
| `AppAccessJwk(data?)` | `AppAccessJwkEntity` | Create an AppAccessJwk entity instance. |
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
| `Artefact(data?)` | `ArtefactEntity` | Create an Artefact entity instance. |
| `ArtefactCommentThread(data?)` | `ArtefactCommentThreadEntity` | Create an ArtefactCommentThread entity instance. |
| `ArtefactRevision(data?)` | `ArtefactRevisionEntity` | Create an ArtefactRevision entity instance. |
| `ArtefactViewToken(data?)` | `ArtefactViewTokenEntity` | Create an ArtefactViewToken entity instance. |
| `Artifact(data?)` | `ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactCacheNamespace(data?)` | `ArtifactCacheNamespaceEntity` | Create an ArtifactCacheNamespace entity instance. |
| `ArtifactImageRepository(data?)` | `ArtifactImageRepositoryEntity` | Create an ArtifactImageRepository entity instance. |
| `ArtifactPackageMirror(data?)` | `ArtifactPackageMirrorEntity` | Create an ArtifactPackageMirror entity instance. |
| `ArtifactRetentionPolicy(data?)` | `ArtifactRetentionPolicyEntity` | Create an ArtifactRetentionPolicy entity instance. |
| `AttachmentPart(data?)` | `AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AuditEvent(data?)` | `AuditEventEntity` | Create an AuditEvent entity instance. |
| `Auth(data?)` | `AuthEntity` | Create an Auth entity instance. |
| `AuthCli(data?)` | `AuthCliEntity` | Create an AuthCli entity instance. |
| `AuthGithub(data?)` | `AuthGithubEntity` | Create an AuthGithub entity instance. |
| `AuthGoogle(data?)` | `AuthGoogleEntity` | Create an AuthGoogle entity instance. |
| `AuthOpenai(data?)` | `AuthOpenaiEntity` | Create an AuthOpenai entity instance. |
| `AuthPasswordReset(data?)` | `AuthPasswordResetEntity` | Create an AuthPasswordReset entity instance. |
| `AuthRegistrationOption(data?)` | `AuthRegistrationOptionEntity` | Create an AuthRegistrationOption entity instance. |
| `AutomationEvent(data?)` | `AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun(data?)` | `AutomationRunEntity` | Create an AutomationRun entity instance. |
| `BackendRunnerPool(data?)` | `BackendRunnerPoolEntity` | Create a BackendRunnerPool entity instance. |
| `Bazel(data?)` | `BazelEntity` | Create a Bazel entity instance. |
| `BazelActionResult(data?)` | `BazelActionResultEntity` | Create a BazelActionResult entity instance. |
| `BazelBackend(data?)` | `BazelBackendEntity` | Create a BazelBackend entity instance. |
| `BazelBlob(data?)` | `BazelBlobEntity` | Create a BazelBlob entity instance. |
| `BazelExecution(data?)` | `BazelExecutionEntity` | Create a BazelExecution entity instance. |
| `BazelFindMissingBlob(data?)` | `BazelFindMissingBlobEntity` | Create a BazelFindMissingBlob entity instance. |
| `Billing(data?)` | `BillingEntity` | Create a Billing entity instance. |
| `BillingAddon(data?)` | `BillingAddonEntity` | Create a BillingAddon entity instance. |
| `BillingBudget(data?)` | `BillingBudgetEntity` | Create a BillingBudget entity instance. |
| `BillingCheckoutSession(data?)` | `BillingCheckoutSessionEntity` | Create a BillingCheckoutSession entity instance. |
| `BillingContact(data?)` | `BillingContactEntity` | Create a BillingContact entity instance. |
| `BillingExtraSpend(data?)` | `BillingExtraSpendEntity` | Create a BillingExtraSpend entity instance. |
| `BillingInvoice(data?)` | `BillingInvoiceEntity` | Create a BillingInvoice entity instance. |
| `BillingPackage(data?)` | `BillingPackageEntity` | Create a BillingPackage entity instance. |
| `BillingPortalSession(data?)` | `BillingPortalSessionEntity` | Create a BillingPortalSession entity instance. |
| `BillingPrepaidPeriod(data?)` | `BillingPrepaidPeriodEntity` | Create a BillingPrepaidPeriod entity instance. |
| `BillingPrepaidPurchase(data?)` | `BillingPrepaidPurchaseEntity` | Create a BillingPrepaidPurchase entity instance. |
| `BillingSubscription(data?)` | `BillingSubscriptionEntity` | Create a BillingSubscription entity instance. |
| `BillingTokenTopUp(data?)` | `BillingTokenTopUpEntity` | Create a BillingTokenTopUp entity instance. |
| `BillingUsage(data?)` | `BillingUsageEntity` | Create a BillingUsage entity instance. |
| `Binary(data?)` | `BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion(data?)` | `BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BookmarkProtectionRefreshGithubRequiredCheck(data?)` | `BookmarkProtectionRefreshGithubRequiredCheckEntity` | Create a BookmarkProtectionRefreshGithubRequiredCheck entity instance. |
| `BrowserEgressCandidate(data?)` | `BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession(data?)` | `BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection(data?)` | `BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl(data?)` | `BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent(data?)` | `BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia(data?)` | `BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording(data?)` | `BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot(data?)` | `BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask(data?)` | `BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CacheNamespaceEntry(data?)` | `CacheNamespaceEntryEntity` | Create a CacheNamespaceEntry entity instance. |
| `CatalogSelector(data?)` | `CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment(data?)` | `CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname(data?)` | `CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace(data?)` | `CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject(data?)` | `CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `Change(data?)` | `ChangeEntity` | Create a Change entity instance. |
| `ChangeAsset(data?)` | `ChangeAssetEntity` | Create a ChangeAsset entity instance. |
| `ChangeComment(data?)` | `ChangeCommentEntity` | Create a ChangeComment entity instance. |
| `ChangeFileReviewCheckpoint(data?)` | `ChangeFileReviewCheckpointEntity` | Create a ChangeFileReviewCheckpoint entity instance. |
| `ChangeGitBranchSubmission(data?)` | `ChangeGitBranchSubmissionEntity` | Create a ChangeGitBranchSubmission entity instance. |
| `ChangeGitCommitIdentity(data?)` | `ChangeGitCommitIdentityEntity` | Create a ChangeGitCommitIdentity entity instance. |
| `ChangeGitPublication(data?)` | `ChangeGitPublicationEntity` | Create a ChangeGitPublication entity instance. |
| `ChangeGroupMember(data?)` | `ChangeGroupMemberEntity` | Create a ChangeGroupMember entity instance. |
| `ChangeLabel(data?)` | `ChangeLabelEntity` | Create a ChangeLabel entity instance. |
| `ChangeLandingHold(data?)` | `ChangeLandingHoldEntity` | Create a ChangeLandingHold entity instance. |
| `ChangeLandingRequest(data?)` | `ChangeLandingRequestEntity` | Create a ChangeLandingRequest entity instance. |
| `ChangeRequestChange(data?)` | `ChangeRequestChangeEntity` | Create a ChangeRequestChange entity instance. |
| `ChangeReviewer(data?)` | `ChangeReviewerEntity` | Create a ChangeReviewer entity instance. |
| `ChangeTranscript(data?)` | `ChangeTranscriptEntity` | Create a ChangeTranscript entity instance. |
| `ChangeTranscriptSummary(data?)` | `ChangeTranscriptSummaryEntity` | Create a ChangeTranscriptSummary entity instance. |
| `CheckpointPrepareChunk(data?)` | `CheckpointPrepareChunkEntity` | Create a CheckpointPrepareChunk entity instance. |
| `CiNode(data?)` | `CiNodeEntity` | Create a CiNode entity instance. |
| `CiPipeline(data?)` | `CiPipelineEntity` | Create a CiPipeline entity instance. |
| `CiPipelineRun(data?)` | `CiPipelineRunEntity` | Create a CiPipelineRun entity instance. |
| `CiRunnerPool(data?)` | `CiRunnerPoolEntity` | Create a CiRunnerPool entity instance. |
| `CiStatus(data?)` | `CiStatusEntity` | Create a CiStatus entity instance. |
| `CliEvent(data?)` | `CliEventEntity` | Create a CliEvent entity instance. |
| `CliRelease(data?)` | `CliReleaseEntity` | Create a CliRelease entity instance. |
| `CloudWorkspaceBackupObject(data?)` | `CloudWorkspaceBackupObjectEntity` | Create a CloudWorkspaceBackupObject entity instance. |
| `CodeRuleEvaluation(data?)` | `CodeRuleEvaluationEntity` | Create a CodeRuleEvaluation entity instance. |
| `ComSiteAccess(data?)` | `ComSiteAccessEntity` | Create a ComSiteAccess entity instance. |
| `ComSiteAccessSession(data?)` | `ComSiteAccessSessionEntity` | Create a ComSiteAccessSession entity instance. |
| `CommentThreadComment(data?)` | `CommentThreadCommentEntity` | Create a CommentThreadComment entity instance. |
| `CommitDiff(data?)` | `CommitDiffEntity` | Create a CommitDiff entity instance. |
| `ConnectionRequest(data?)` | `ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource(data?)` | `ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
| `ContactSubmission(data?)` | `ContactSubmissionEntity` | Create a ContactSubmission entity instance. |
| `ControlComputer(data?)` | `ControlComputerEntity` | Create a ControlComputer entity instance. |
| `ControlComputerControlOperation(data?)` | `ControlComputerControlOperationEntity` | Create a ControlComputerControlOperation entity instance. |
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
| `Deployment(data?)` | `DeploymentEntity` | Create a Deployment entity instance. |
| `DeploymentDashboardNomad(data?)` | `DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentDetail(data?)` | `DeploymentDetailEntity` | Create a DeploymentDetail entity instance. |
| `DeploymentFile(data?)` | `DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DeploymentLog(data?)` | `DeploymentLogEntity` | Create a DeploymentLog entity instance. |
| `DeploymentMetric(data?)` | `DeploymentMetricEntity` | Create a DeploymentMetric entity instance. |
| `DeploymentPreview(data?)` | `DeploymentPreviewEntity` | Create a DeploymentPreview entity instance. |
| `DeploymentSetting(data?)` | `DeploymentSettingEntity` | Create a DeploymentSetting entity instance. |
| `DesktopLocalAgentModel(data?)` | `DesktopLocalAgentModelEntity` | Create a DesktopLocalAgentModel entity instance. |
| `DesktopLocalAgentResponse(data?)` | `DesktopLocalAgentResponseEntity` | Create a DesktopLocalAgentResponse entity instance. |
| `Device(data?)` | `DeviceEntity` | Create a Device entity instance. |
| `DeviceBrowserOperation(data?)` | `DeviceBrowserOperationEntity` | Create a DeviceBrowserOperation entity instance. |
| `DeviceControlMessage(data?)` | `DeviceControlMessageEntity` | Create a DeviceControlMessage entity instance. |
| `DeviceControlOperation(data?)` | `DeviceControlOperationEntity` | Create a DeviceControlOperation entity instance. |
| `DeviceEnterpriseRelay(data?)` | `DeviceEnterpriseRelayEntity` | Create a DeviceEnterpriseRelay entity instance. |
| `DeviceFolderListing(data?)` | `DeviceFolderListingEntity` | Create a DeviceFolderListing entity instance. |
| `DeviceGrant(data?)` | `DeviceGrantEntity` | Create a DeviceGrant entity instance. |
| `DeviceInvocation(data?)` | `DeviceInvocationEntity` | Create a DeviceInvocation entity instance. |
| `DeviceLocalEvent(data?)` | `DeviceLocalEventEntity` | Create a DeviceLocalEvent entity instance. |
| `DevicePairing(data?)` | `DevicePairingEntity` | Create a DevicePairing entity instance. |
| `DeviceProject(data?)` | `DeviceProjectEntity` | Create a DeviceProject entity instance. |
| `DeviceScheduledCheckIn(data?)` | `DeviceScheduledCheckInEntity` | Create a DeviceScheduledCheckIn entity instance. |
| `DockerBuilder(data?)` | `DockerBuilderEntity` | Create a DockerBuilder entity instance. |
| `DockerBuilderSession(data?)` | `DockerBuilderSessionEntity` | Create a DockerBuilderSession entity instance. |
| `DockerBuilderSetting(data?)` | `DockerBuilderSettingEntity` | Create a DockerBuilderSetting entity instance. |
| `DomainDnsIntegration(data?)` | `DomainDnsIntegrationEntity` | Create a DomainDnsIntegration entity instance. |
| `DomainPathRule(data?)` | `DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream(data?)` | `DreamEntity` | Create a Dream entity instance. |
| `Edge(data?)` | `EdgeEntity` | Create an Edge entity instance. |
| `EmailVerification(data?)` | `EmailVerificationEntity` | Create an EmailVerification entity instance. |
| `Environment(data?)` | `EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun(data?)` | `EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration(data?)` | `EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun(data?)` | `EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision(data?)` | `EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding(data?)` | `EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount(data?)` | `EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence(data?)` | `EvidenceEntity` | Create an Evidence entity instance. |
| `ExecutionDesiredState(data?)` | `ExecutionDesiredStateEntity` | Create an ExecutionDesiredState entity instance. |
| `ExecutionReconcilerTick(data?)` | `ExecutionReconcilerTickEntity` | Create an ExecutionReconcilerTick entity instance. |
| `ExecutionRelease(data?)` | `ExecutionReleaseEntity` | Create an ExecutionRelease entity instance. |
| `ExecutionRuntimeInstance(data?)` | `ExecutionRuntimeInstanceEntity` | Create an ExecutionRuntimeInstance entity instance. |
| `Exploration(data?)` | `ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage(data?)` | `ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport(data?)` | `ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario(data?)` | `ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding(data?)` | `FindingEntity` | Create a Finding entity instance. |
| `Gh(data?)` | `GhEntity` | Create a Gh entity instance. |
| `GitImport(data?)` | `GitImportEntity` | Create a GitImport entity instance. |
| `Github(data?)` | `GithubEntity` | Create a Github entity instance. |
| `GithubApp(data?)` | `GithubAppEntity` | Create a GithubApp entity instance. |
| `GithubAppImportableRepository(data?)` | `GithubAppImportableRepositoryEntity` | Create a GithubAppImportableRepository entity instance. |
| `GithubAppInstallation(data?)` | `GithubAppInstallationEntity` | Create a GithubAppInstallation entity instance. |
| `GithubAppInstallationAuthorization(data?)` | `GithubAppInstallationAuthorizationEntity` | Create a GithubAppInstallationAuthorization entity instance. |
| `GithubAppUserAuthorization(data?)` | `GithubAppUserAuthorizationEntity` | Create a GithubAppUserAuthorization entity instance. |
| `GithubCiRepository(data?)` | `GithubCiRepositoryEntity` | Create a GithubCiRepository entity instance. |
| `GithubCiRepositoryCompatibilityReport(data?)` | `GithubCiRepositoryCompatibilityReportEntity` | Create a GithubCiRepositoryCompatibilityReport entity instance. |
| `GithubConnection(data?)` | `GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `GithubIntegration(data?)` | `GithubIntegrationEntity` | Create a GithubIntegration entity instance. |
| `GithubOnboarding(data?)` | `GithubOnboardingEntity` | Create a GithubOnboarding entity instance. |
| `GithubOnboardingBranch(data?)` | `GithubOnboardingBranchEntity` | Create a GithubOnboardingBranch entity instance. |
| `GithubOnboardingImport(data?)` | `GithubOnboardingImportEntity` | Create a GithubOnboardingImport entity instance. |
| `GithubOnboardingImportBatch(data?)` | `GithubOnboardingImportBatchEntity` | Create a GithubOnboardingImportBatch entity instance. |
| `GithubOnboardingImportItem(data?)` | `GithubOnboardingImportItemEntity` | Create a GithubOnboardingImportItem entity instance. |
| `GithubPullRequest(data?)` | `GithubPullRequestEntity` | Create a GithubPullRequest entity instance. |
| `GithubRunnerAdmission(data?)` | `GithubRunnerAdmissionEntity` | Create a GithubRunnerAdmission entity instance. |
| `GithubRunnerCache(data?)` | `GithubRunnerCacheEntity` | Create a GithubRunnerCache entity instance. |
| `GithubRunnerEgress(data?)` | `GithubRunnerEgressEntity` | Create a GithubRunnerEgress entity instance. |
| `GithubRunnerHistory(data?)` | `GithubRunnerHistoryEntity` | Create a GithubRunnerHistory entity instance. |
| `GithubRunnerImage(data?)` | `GithubRunnerImageEntity` | Create a GithubRunnerImage entity instance. |
| `GithubRunnerPool(data?)` | `GithubRunnerPoolEntity` | Create a GithubRunnerPool entity instance. |
| `GithubRunnerSetup(data?)` | `GithubRunnerSetupEntity` | Create a GithubRunnerSetup entity instance. |
| `Gitlab(data?)` | `GitlabEntity` | Create a Gitlab entity instance. |
| `GitlabConnection(data?)` | `GitlabConnectionEntity` | Create a GitlabConnection entity instance. |
| `GitlabImport(data?)` | `GitlabImportEntity` | Create a GitlabImport entity instance. |
| `GitlabOauth(data?)` | `GitlabOauthEntity` | Create a GitlabOauth entity instance. |
| `GrantAllAgent(data?)` | `GrantAllAgentEntity` | Create a GrantAllAgent entity instance. |
| `HostingAppDomain(data?)` | `HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `IdentityOrganization(data?)` | `IdentityOrganizationEntity` | Create an IdentityOrganization entity instance. |
| `ImageRepository(data?)` | `ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `ImageRepositoryTag(data?)` | `ImageRepositoryTagEntity` | Create an ImageRepositoryTag entity instance. |
| `ImportBranchPolicy(data?)` | `ImportBranchPolicyEntity` | Create an ImportBranchPolicy entity instance. |
| `Integration(data?)` | `IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse(data?)` | `InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation(data?)` | `InvitationEntity` | Create an Invitation entity instance. |
| `InvocationControl(data?)` | `InvocationControlEntity` | Create an InvocationControl entity instance. |
| `JobLogChunk(data?)` | `JobLogChunkEntity` | Create a JobLogChunk entity instance. |
| `JobStep(data?)` | `JobStepEntity` | Create a JobStep entity instance. |
| `JobWorkspace(data?)` | `JobWorkspaceEntity` | Create a JobWorkspace entity instance. |
| `JourneyVariantReplay(data?)` | `JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge(data?)` | `KnowledgeEntity` | Create a Knowledge entity instance. |
| `Known(data?)` | `KnownEntity` | Create a Known entity instance. |
| `Label(data?)` | `LabelEntity` | Create a Label entity instance. |
| `LeaseArtifact(data?)` | `LeaseArtifactEntity` | Create a LeaseArtifact entity instance. |
| `LeaseCache(data?)` | `LeaseCacheEntity` | Create a LeaseCache entity instance. |
| `LeaseLogChunk(data?)` | `LeaseLogChunkEntity` | Create a LeaseLogChunk entity instance. |
| `LeaseReconciliation(data?)` | `LeaseReconciliationEntity` | Create a LeaseReconciliation entity instance. |
| `LeaseStep(data?)` | `LeaseStepEntity` | Create a LeaseStep entity instance. |
| `LeaseVerifyDiagnostic(data?)` | `LeaseVerifyDiagnosticEntity` | Create a LeaseVerifyDiagnostic entity instance. |
| `LeaseVerifySecret(data?)` | `LeaseVerifySecretEntity` | Create a LeaseVerifySecret entity instance. |
| `LeaseWorkspace(data?)` | `LeaseWorkspaceEntity` | Create a LeaseWorkspace entity instance. |
| `LocalAgentDecision(data?)` | `LocalAgentDecisionEntity` | Create a LocalAgentDecision entity instance. |
| `LocalAgentResponse(data?)` | `LocalAgentResponseEntity` | Create a LocalAgentResponse entity instance. |
| `LocalThreadDelivery(data?)` | `LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation(data?)` | `LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `LogStreamChunk(data?)` | `LogStreamChunkEntity` | Create a LogStreamChunk entity instance. |
| `LogoImage(data?)` | `LogoImageEntity` | Create a LogoImage entity instance. |
| `MarketingSetting(data?)` | `MarketingSettingEntity` | Create a MarketingSetting entity instance. |
| `McpOauth(data?)` | `McpOauthEntity` | Create a McpOauth entity instance. |
| `Me(data?)` | `MeEntity` | Create a Me entity instance. |
| `MeEmail(data?)` | `MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding(data?)` | `MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile(data?)` | `MediaFileEntity` | Create a MediaFile entity instance. |
| `Member(data?)` | `MemberEntity` | Create a Member entity instance. |
| `Memory(data?)` | `MemoryEntity` | Create a Memory entity instance. |
| `MergeQueueEntry(data?)` | `MergeQueueEntryEntity` | Create a MergeQueueEntry entity instance. |
| `MergeRequest(data?)` | `MergeRequestEntity` | Create a MergeRequest entity instance. |
| `MergeResolution(data?)` | `MergeResolutionEntity` | Create a MergeResolution entity instance. |
| `MessagingConversationMessage(data?)` | `MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload(data?)` | `MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery(data?)` | `MetricQueryEntity` | Create a MetricQuery entity instance. |
| `MetronomeWebhook(data?)` | `MetronomeWebhookEntity` | Create a MetronomeWebhook entity instance. |
| `ModelSubscriptionAccount(data?)` | `ModelSubscriptionAccountEntity` | Create a ModelSubscriptionAccount entity instance. |
| `ModelSubscriptionAccountConnection(data?)` | `ModelSubscriptionAccountConnectionEntity` | Create a ModelSubscriptionAccountConnection entity instance. |
| `NetworkConnection(data?)` | `NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NetworkingSpace(data?)` | `NetworkingSpaceEntity` | Create a NetworkingSpace entity instance. |
| `Node(data?)` | `NodeEntity` | Create a Node entity instance. |
| `NodeCertificate(data?)` | `NodeCertificateEntity` | Create a NodeCertificate entity instance. |
| `NodeLease(data?)` | `NodeLeaseEntity` | Create a NodeLease entity instance. |
| `NomadAllocation(data?)` | `NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog(data?)` | `NomadLogEntity` | Create a NomadLog entity instance. |
| `Now(data?)` | `NowEntity` | Create a Now entity instance. |
| `ObservabilityClickhouseCluster(data?)` | `ObservabilityClickhouseClusterEntity` | Create an ObservabilityClickhouseCluster entity instance. |
| `ObservabilityQuickwitCluster(data?)` | `ObservabilityQuickwitClusterEntity` | Create an ObservabilityQuickwitCluster entity instance. |
| `ObservabilitySpace(data?)` | `ObservabilitySpaceEntity` | Create an ObservabilitySpace entity instance. |
| `Openapi(data?)` | `OpenapiEntity` | Create an Openapi entity instance. |
| `OrgInvitation(data?)` | `OrgInvitationEntity` | Create an OrgInvitation entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationApp(data?)` | `OrganizationAppEntity` | Create an OrganizationApp entity instance. |
| `OrganizationControl(data?)` | `OrganizationControlEntity` | Create an OrganizationControl entity instance. |
| `OrganizationDevice(data?)` | `OrganizationDeviceEntity` | Create an OrganizationDevice entity instance. |
| `OrganizationIdentityCertificate(data?)` | `OrganizationIdentityCertificateEntity` | Create an OrganizationIdentityCertificate entity instance. |
| `OrganizationInteraction(data?)` | `OrganizationInteractionEntity` | Create an OrganizationInteraction entity instance. |
| `OrganizationInvitation(data?)` | `OrganizationInvitationEntity` | Create an OrganizationInvitation entity instance. |
| `OrganizationMessageFile(data?)` | `OrganizationMessageFileEntity` | Create an OrganizationMessageFile entity instance. |
| `OrganizationOidcTrust(data?)` | `OrganizationOidcTrustEntity` | Create an OrganizationOidcTrust entity instance. |
| `OrganizationRunEvent(data?)` | `OrganizationRunEventEntity` | Create an OrganizationRunEvent entity instance. |
| `OrganizationRunOutcome(data?)` | `OrganizationRunOutcomeEntity` | Create an OrganizationRunOutcome entity instance. |
| `OrganizationRunUsage(data?)` | `OrganizationRunUsageEntity` | Create an OrganizationRunUsage entity instance. |
| `OrganizationSandbox(data?)` | `OrganizationSandboxEntity` | Create an OrganizationSandbox entity instance. |
| `OrganizationSecret(data?)` | `OrganizationSecretEntity` | Create an OrganizationSecret entity instance. |
| `OrganizationServiceAccount(data?)` | `OrganizationServiceAccountEntity` | Create an OrganizationServiceAccount entity instance. |
| `OrganizationSetting(data?)` | `OrganizationSettingEntity` | Create an OrganizationSetting entity instance. |
| `OrganizationSite(data?)` | `OrganizationSiteEntity` | Create an OrganizationSite entity instance. |
| `OrganizationSubscription(data?)` | `OrganizationSubscriptionEntity` | Create an OrganizationSubscription entity instance. |
| `OrganizationTool(data?)` | `OrganizationToolEntity` | Create an OrganizationTool entity instance. |
| `OrganizationWorkloadIdentity(data?)` | `OrganizationWorkloadIdentityEntity` | Create an OrganizationWorkloadIdentity entity instance. |
| `OtelIngest(data?)` | `OtelIngestEntity` | Create an OtelIngest entity instance. |
| `Page(data?)` | `PageEntity` | Create a Page entity instance. |
| `PageAgent(data?)` | `PageAgentEntity` | Create a PageAgent entity instance. |
| `PageArtefact(data?)` | `PageArtefactEntity` | Create a PageArtefact entity instance. |
| `PageCiPipelineRun(data?)` | `PageCiPipelineRunEntity` | Create a PageCiPipelineRun entity instance. |
| `PageProjectRun(data?)` | `PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PageRepoVcCommit(data?)` | `PageRepoVcCommitEntity` | Create a PageRepoVcCommit entity instance. |
| `PagesBilling(data?)` | `PagesBillingEntity` | Create a PagesBilling entity instance. |
| `PagesGithubOnboarding(data?)` | `PagesGithubOnboardingEntity` | Create a PagesGithubOnboarding entity instance. |
| `PagesMember(data?)` | `PagesMemberEntity` | Create a PagesMember entity instance. |
| `PagesProjectCredential(data?)` | `PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona(data?)` | `PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun(data?)` | `PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario(data?)` | `PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PagesRegistry(data?)` | `PagesRegistryEntity` | Create a PagesRegistry entity instance. |
| `PagesSession(data?)` | `PagesSessionEntity` | Create a PagesSession entity instance. |
| `Pairing(data?)` | `PairingEntity` | Create a Pairing entity instance. |
| `PairingEvent(data?)` | `PairingEventEntity` | Create a PairingEvent entity instance. |
| `ParallelV1(data?)` | `ParallelV1Entity` | Create a ParallelV1 entity instance. |
| `PatchsetDiff(data?)` | `PatchsetDiffEntity` | Create a PatchsetDiff entity instance. |
| `PersonalAccessToken(data?)` | `PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation(data?)` | `PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding(data?)` | `PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret(data?)` | `PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval(data?)` | `PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
| `ProactiveAgentWaitlistEntry(data?)` | `ProactiveAgentWaitlistEntryEntity` | Create a ProactiveAgentWaitlistEntry entity instance. |
| `Product(data?)` | `ProductEntity` | Create a Product entity instance. |
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
| `PullRequestAction(data?)` | `PullRequestActionEntity` | Create a PullRequestAction entity instance. |
| `PullRequestMagicMerge(data?)` | `PullRequestMagicMergeEntity` | Create a PullRequestMagicMerge entity instance. |
| `PullRequestSetting(data?)` | `PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository(data?)` | `PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment(data?)` | `PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `PullRequestTranscript(data?)` | `PullRequestTranscriptEntity` | Create a PullRequestTranscript entity instance. |
| `PullZone(data?)` | `PullZoneEntity` | Create a PullZone entity instance. |
| `Recorder(data?)` | `RecorderEntity` | Create a Recorder entity instance. |
| `Registry(data?)` | `RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2(data?)` | `RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentConnection(data?)` | `RelayAgentConnectionEntity` | Create a RelayAgentConnection entity instance. |
| `RelayAgentLocalThread(data?)` | `RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `RelaySignal(data?)` | `RelaySignalEntity` | Create a RelaySignal entity instance. |
| `ReleaseRollout(data?)` | `ReleaseRolloutEntity` | Create a ReleaseRollout entity instance. |
| `Repo(data?)` | `RepoEntity` | Create a Repo entity instance. |
| `RepoAccessToken(data?)` | `RepoAccessTokenEntity` | Create a RepoAccessToken entity instance. |
| `RepoAction(data?)` | `RepoActionEntity` | Create a RepoAction entity instance. |
| `RepoAgentCheckpoint(data?)` | `RepoAgentCheckpointEntity` | Create a RepoAgentCheckpoint entity instance. |
| `RepoAgentSession(data?)` | `RepoAgentSessionEntity` | Create a RepoAgentSession entity instance. |
| `RepoBookmarkProtection(data?)` | `RepoBookmarkProtectionEntity` | Create a RepoBookmarkProtection entity instance. |
| `RepoBookmarkProtectionEvent(data?)` | `RepoBookmarkProtectionEventEntity` | Create a RepoBookmarkProtectionEvent entity instance. |
| `RepoCloudWorkspaceBackup(data?)` | `RepoCloudWorkspaceBackupEntity` | Create a RepoCloudWorkspaceBackup entity instance. |
| `RepoCodeRule(data?)` | `RepoCodeRuleEntity` | Create a RepoCodeRule entity instance. |
| `RepoSetting(data?)` | `RepoSettingEntity` | Create a RepoSetting entity instance. |
| `RepoStat(data?)` | `RepoStatEntity` | Create a RepoStat entity instance. |
| `RepoVc(data?)` | `RepoVcEntity` | Create a RepoVc entity instance. |
| `RepoVcCommit(data?)` | `RepoVcCommitEntity` | Create a RepoVcCommit entity instance. |
| `ReportReplay(data?)` | `ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario(data?)` | `ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RepositoryAccess(data?)` | `RepositoryAccessEntity` | Create a RepositoryAccess entity instance. |
| `RepositoryAccessResolve(data?)` | `RepositoryAccessResolveEntity` | Create a RepositoryAccessResolve entity instance. |
| `RepositoryEvent(data?)` | `RepositoryEventEntity` | Create a RepositoryEvent entity instance. |
| `RepositoryImport(data?)` | `RepositoryImportEntity` | Create a RepositoryImport entity instance. |
| `RepositoryImportSession(data?)` | `RepositoryImportSessionEntity` | Create a RepositoryImportSession entity instance. |
| `RepositoryImportSessionRepository(data?)` | `RepositoryImportSessionRepositoryEntity` | Create a RepositoryImportSessionRepository entity instance. |
| `RepositoryImportSessionSelection(data?)` | `RepositoryImportSessionSelectionEntity` | Create a RepositoryImportSessionSelection entity instance. |
| `RepositorySandboxEnvironment(data?)` | `RepositorySandboxEnvironmentEntity` | Create a RepositorySandboxEnvironment entity instance. |
| `RoderCodeRepair(data?)` | `RoderCodeRepairEntity` | Create a RoderCodeRepair entity instance. |
| `RoderCodeRepairSetting(data?)` | `RoderCodeRepairSettingEntity` | Create a RoderCodeRepairSetting entity instance. |
| `RoderMachine(data?)` | `RoderMachineEntity` | Create a RoderMachine entity instance. |
| `RoderRun(data?)` | `RoderRunEntity` | Create a RoderRun entity instance. |
| `RoderWorkspaceCredential(data?)` | `RoderWorkspaceCredentialEntity` | Create a RoderWorkspaceCredential entity instance. |
| `RunArtifact(data?)` | `RunArtifactEntity` | Create a RunArtifact entity instance. |
| `RunJob(data?)` | `RunJobEntity` | Create a RunJob entity instance. |
| `RunScenarioRun(data?)` | `RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption(data?)` | `RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch(data?)` | `RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate(data?)` | `RunUpdateEntity` | Create a RunUpdate entity instance. |
| `RunWorkspaceCredential(data?)` | `RunWorkspaceCredentialEntity` | Create a RunWorkspaceCredential entity instance. |
| `RunnerLease(data?)` | `RunnerLeaseEntity` | Create a RunnerLease entity instance. |
| `RunnerPoolNodeEnrollmentToken(data?)` | `RunnerPoolNodeEnrollmentTokenEntity` | Create a RunnerPoolNodeEnrollmentToken entity instance. |
| `RunnerPoolRunner(data?)` | `RunnerPoolRunnerEntity` | Create a RunnerPoolRunner entity instance. |
| `RuntimeInstanceHealthSnapshot(data?)` | `RuntimeInstanceHealthSnapshotEntity` | Create a RuntimeInstanceHealthSnapshot entity instance. |
| `SandboxIntegration(data?)` | `SandboxIntegrationEntity` | Create a SandboxIntegration entity instance. |
| `ScenarioRevision(data?)` | `ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson(data?)` | `ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit(data?)` | `ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `SecretGrant(data?)` | `SecretGrantEntity` | Create a SecretGrant entity instance. |
| `SecretVersion(data?)` | `SecretVersionEntity` | Create a SecretVersion entity instance. |
| `ServiceEndpoint(data?)` | `ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `Setting(data?)` | `SettingEntity` | Create a Setting entity instance. |
| `SettingMutationLease(data?)` | `SettingMutationLeaseEntity` | Create a SettingMutationLease entity instance. |
| `Signal(data?)` | `SignalEntity` | Create a Signal entity instance. |
| `SignalInbound(data?)` | `SignalInboundEntity` | Create a SignalInbound entity instance. |
| `SignalIntegration(data?)` | `SignalIntegrationEntity` | Create a SignalIntegration entity instance. |
| `SignalIntegrationDelivery(data?)` | `SignalIntegrationDeliveryEntity` | Create a SignalIntegrationDelivery entity instance. |
| `SignalIntegrationTarget(data?)` | `SignalIntegrationTargetEntity` | Create a SignalIntegrationTarget entity instance. |
| `SignalSubscription(data?)` | `SignalSubscriptionEntity` | Create a SignalSubscription entity instance. |
| `Site(data?)` | `SiteEntity` | Create a Site entity instance. |
| `SiteAccessKey(data?)` | `SiteAccessKeyEntity` | Create a SiteAccessKey entity instance. |
| `SitePreview(data?)` | `SitePreviewEntity` | Create a SitePreview entity instance. |
| `SiteSecret(data?)` | `SiteSecretEntity` | Create a SiteSecret entity instance. |
| `SlackChannel(data?)` | `SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SourceConnection(data?)` | `SourceConnectionEntity` | Create a SourceConnection entity instance. |
| `SpaceAlertRule(data?)` | `SpaceAlertRuleEntity` | Create a SpaceAlertRule entity instance. |
| `SpaceAuditEvent(data?)` | `SpaceAuditEventEntity` | Create a SpaceAuditEvent entity instance. |
| `SpaceDnsRecord(data?)` | `SpaceDnsRecordEntity` | Create a SpaceDnsRecord entity instance. |
| `SpaceEnrollmentToken(data?)` | `SpaceEnrollmentTokenEntity` | Create a SpaceEnrollmentToken entity instance. |
| `SpaceGateway(data?)` | `SpaceGatewayEntity` | Create a SpaceGateway entity instance. |
| `SpaceGroup(data?)` | `SpaceGroupEntity` | Create a SpaceGroup entity instance. |
| `SpaceGroupMembership(data?)` | `SpaceGroupMembershipEntity` | Create a SpaceGroupMembership entity instance. |
| `SpaceLogStream(data?)` | `SpaceLogStreamEntity` | Create a SpaceLogStream entity instance. |
| `SpaceMetricSery(data?)` | `SpaceMetricSeryEntity` | Create a SpaceMetricSery entity instance. |
| `SpaceOtelCollector(data?)` | `SpaceOtelCollectorEntity` | Create a SpaceOtelCollector entity instance. |
| `SpacePeer(data?)` | `SpacePeerEntity` | Create a SpacePeer entity instance. |
| `SpacePeerAttachment(data?)` | `SpacePeerAttachmentEntity` | Create a SpacePeerAttachment entity instance. |
| `SpacePolicy(data?)` | `SpacePolicyEntity` | Create a SpacePolicy entity instance. |
| `SpaceSegment(data?)` | `SpaceSegmentEntity` | Create a SpaceSegment entity instance. |
| `SpaceTraceSpan(data?)` | `SpaceTraceSpanEntity` | Create a SpaceTraceSpan entity instance. |
| `Spark(data?)` | `SparkEntity` | Create a Spark entity instance. |
| `SparkAgentIntegration(data?)` | `SparkAgentIntegrationEntity` | Create a SparkAgentIntegration entity instance. |
| `SparkAgentLocalThread(data?)` | `SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `SparkAgentSite(data?)` | `SparkAgentSiteEntity` | Create a SparkAgentSite entity instance. |
| `SparkAgentSkill(data?)` | `SparkAgentSkillEntity` | Create a SparkAgentSkill entity instance. |
| `SparkAgentThread(data?)` | `SparkAgentThreadEntity` | Create a SparkAgentThread entity instance. |
| `SparkCredit(data?)` | `SparkCreditEntity` | Create a SparkCredit entity instance. |
| `SparkCreditAgentUsage(data?)` | `SparkCreditAgentUsageEntity` | Create a SparkCreditAgentUsage entity instance. |
| `SparkCreditUsageTotal(data?)` | `SparkCreditUsageTotalEntity` | Create a SparkCreditUsageTotal entity instance. |
| `StaticSite(data?)` | `StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment(data?)` | `StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain(data?)` | `StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `StatusChange(data?)` | `StatusChangeEntity` | Create a StatusChange entity instance. |
| `StatusCommit(data?)` | `StatusCommitEntity` | Create a StatusCommit entity instance. |
| `StatusPatchset(data?)` | `StatusPatchsetEntity` | Create a StatusPatchset entity instance. |
| `StripeWebhook(data?)` | `StripeWebhookEntity` | Create a StripeWebhook entity instance. |
| `SubmitTelemetry(data?)` | `SubmitTelemetryEntity` | Create a SubmitTelemetry entity instance. |
| `SubscriptionModel(data?)` | `SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `SwarmEvent(data?)` | `SwarmEventEntity` | Create a SwarmEvent entity instance. |
| `SwarmLive(data?)` | `SwarmLiveEntity` | Create a SwarmLive entity instance. |
| `SwarmNote(data?)` | `SwarmNoteEntity` | Create a SwarmNote entity instance. |
| `SwarmTask(data?)` | `SwarmTaskEntity` | Create a SwarmTask entity instance. |
| `TaskLease(data?)` | `TaskLeaseEntity` | Create a TaskLease entity instance. |
| `ThreadPreview(data?)` | `ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `ThreadPreviewAccess(data?)` | `ThreadPreviewAccessEntity` | Create a ThreadPreviewAccess entity instance. |
| `ToolFeedback(data?)` | `ToolFeedbackEntity` | Create a ToolFeedback entity instance. |
| `Transcript(data?)` | `TranscriptEntity` | Create a Transcript entity instance. |
| `V1Message(data?)` | `V1MessageEntity` | Create a V1Message entity instance. |
| `VcBranch(data?)` | `VcBranchEntity` | Create a VcBranch entity instance. |
| `VcBrowser(data?)` | `VcBrowserEntity` | Create a VcBrowser entity instance. |
| `VcChange(data?)` | `VcChangeEntity` | Create a VcChange entity instance. |
| `VcChangeGroup(data?)` | `VcChangeGroupEntity` | Create a VcChangeGroup entity instance. |
| `VcFile(data?)` | `VcFileEntity` | Create a VcFile entity instance. |
| `VcMergeQueue(data?)` | `VcMergeQueueEntity` | Create a VcMergeQueue entity instance. |
| `VcStack(data?)` | `VcStackEntity` | Create a VcStack entity instance. |
| `VcsNode(data?)` | `VcsNodeEntity` | Create a VcsNode entity instance. |
| `VcsSetting(data?)` | `VcsSettingEntity` | Create a VcsSetting entity instance. |
| `VerificationProjectCredential(data?)` | `VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona(data?)` | `VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun(data?)` | `VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario(data?)` | `VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain(data?)` | `VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession(data?)` | `VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyEmailVerification(data?)` | `VerifyEmailVerificationEntity` | Create a VerifyEmailVerification entity instance. |
| `VerifySignalIntegration(data?)` | `VerifySignalIntegrationEntity` | Create a VerifySignalIntegration entity instance. |
| `VerifyStaticSiteDomain(data?)` | `VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog(data?)` | `VersionLogEntity` | Create a VersionLog entity instance. |
| `WaitlistApplication(data?)` | `WaitlistApplicationEntity` | Create a WaitlistApplication entity instance. |
| `WebBotAuth(data?)` | `WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WebhookGitlab(data?)` | `WebhookGitlabEntity` | Create a WebhookGitlab entity instance. |
| `WorkflowRunStep(data?)` | `WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice(data?)` | `WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped(data?)` | `WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |
| `WorkspaceActivity(data?)` | `WorkspaceActivityEntity` | Create a WorkspaceActivity entity instance. |
| `WorkspaceActivityNotification(data?)` | `WorkspaceActivityNotificationEntity` | Create a WorkspaceActivityNotification entity instance. |
| `WorkspaceSpace(data?)` | `WorkspaceSpaceEntity` | Create a WorkspaceSpace entity instance. |
| `WorkspaceSpacePreference(data?)` | `WorkspaceSpacePreferenceEntity` | Create a WorkspaceSpacePreference entity instance. |
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

#### A2aWellKnown

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/control/a2a/{connection_id}/.well-known/agent-card.json`

#### AdminOrg

| Field | Description |
| --- | --- |
| `billing_email` |  |
| `billing_reason` | Required when setting an agreed price |
| `customize_onboarding_packages` |  |
| `deployment_usage_visibility` |  |
| `deployment_usage_visible` |  |
| `id` |  |
| `monthly_price_dollars` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` |  |
| `name` |  |
| `onboarding_custom_pricing` |  |
| `onboarding_package_keys` | Package keys offered when customizing onboarding. |
| `owner_email` |  |
| `package_id` | Active customer package public ID. |
| `skip_payment` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` |  |

Operations: create, list, load, update.

API path: `/api/v1/admin/organizations/{org_slug}/checkout_session`

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

#### AgentApp

| Field | Description |
| --- | --- |
| `author` |  |
| `can_message` | The viewer may send input to the author agent |
| `deployments_count` | Increases with every deploy of the site |
| `description` |  |
| `hidden_install_count` | Installs by agents the viewer cannot open |
| `id` |  |
| `install_count` |  |
| `install_targets` | Active agents the viewer owns or manages, which they can install apps on |
| `installed_by` |  |
| `installed_target_ids` | Install targets of the viewer that have this app installed |
| `items` |  |
| `mcp_url` |  |
| `next_cursor` | Pass as cursor to load older apps |
| `owner` | The person who controls the author agent |
| `thread` | The thread that published the app, when the viewer can open the author agent |
| `title` |  |
| `url` |  |
| `visibility` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/opened`

#### AgentAppInstall

| Field | Description |
| --- | --- |
| `id` |  |
| `installed` |  |

Operations: remove, update.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/installs/{agent_id}`

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
| `actions` |  |
| `activity` |  |
| `admin_disabled_at` |  |
| `agent_tools` |  |
| `authentication` |  |
| `authorized_at` |  |
| `can_create_account` | Whether another account can be created directly from this provider. |
| `capabilities` |  |
| `catalog_section` | Server-owned grouping in the agent integration catalog. |
| `category` | Short product label, such as CRM or Email. |
| `certification` |  |
| `checked_at` |  |
| `connection` |  |
| `consent` |  |
| `created_at` |  |
| `creation_key` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` |  |
| `description` | One-line catalog description of the app. |
| `disabled_reason` |  |
| `failure_code` |  |
| `generation` |  |
| `grants` |  |
| `grants_pagination` |  |
| `id` |  |
| `limits` |  |
| `name` |  |
| `organization_id` |  |
| `owner_name` |  |
| `ownership_kind` |  |
| `pagination` |  |
| `policy_digest` |  |
| `provider` |  |
| `provider_disabled_reason` |  |
| `provider_identity` |  |
| `revoked_at` |  |
| `schema_version` |  |
| `status` |  |
| `toolkit` |  |
| `triggers` |  |
| `updated_at` |  |
| `user_id` |  |
| `version` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody`

#### AgentConnectionDelegation

| Field | Description |
| --- | --- |
| `authorized_by_id` |  |
| `automation_connection_grant_id` |  |
| `created_at` |  |
| `id` |  |
| `member_name` |  |
| `revoked_at` |  |
| `roles` |  |
| `usable` |  |
| `user_id` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/delegations`

#### AgentConnectionGrant

| Field | Description |
| --- | --- |
| `actions` |  |
| `agent_connection_id` |  |
| `automation_id` |  |
| `connection_generation` |  |
| `created_at` |  |
| `id` |  |
| `organization_id` |  |
| `revision` |  |
| `revoked_at` |  |
| `status` |  |
| `usable` |  |
| `user_id` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/grants`

#### AgentConnectionResource

| Field | Description |
| --- | --- |
| `cursor` |  |
| `next_cursor` |  |
| `query` |  |
| `resources` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/resources`

#### AgentConnectionSafetyControl

| Field | Description |
| --- | --- |
| `admin_disabled_at` |  |
| `authorized_at` |  |
| `checked_at` |  |
| `created_at` |  |
| `custodian_id` |  |
| `failure_code` |  |
| `generation` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `owner_name` |  |
| `ownership_kind` |  |
| `provider_disabled_reason` |  |
| `provider_identity` |  |
| `revoked_at` |  |
| `status` |  |
| `toolkit` |  |
| `updated_at` |  |
| `user_id` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agent_connections/safety_controls`

#### AgentConnectionTriggerSubscription

| Field | Description |
| --- | --- |
| `agent_connection_id` |  |
| `configuration` |  |
| `created_at` |  |
| `defaults` |  |
| `delivery` |  |
| `enabled` |  |
| `failure_code` |  |
| `failure_request_id` |  |
| `id` |  |
| `latency` |  |
| `name` |  |
| `reconcile_at` |  |
| `reconciliation_uncertain` |  |
| `remote_enabled` |  |
| `replacement_id` |  |
| `retired_at` |  |
| `retirement_completed_at` |  |
| `schema` |  |
| `slug` |  |
| `status` |  |
| `toolkit` |  |
| `toolkit_version` |  |
| `trigger_slug` |  |
| `updated_at` |  |
| `version` |  |
| `waiting_for_retirement` |  |

Operations: create, list, patch, remove, update.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover`

#### AgentContextCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/agent_context/checkpoints/{checkpoint_id}/transcript`

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

#### AgentEvent

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/events`

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
| `can_cancel_sign_in` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` |  |
| `can_disconnect` |  |
| `can_enable` |  |
| `can_manage` |  |
| `can_manage_sharing` |  |
| `can_reconnect` |  |
| `can_sync` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` |  |
| `connected_by` | Name of the person whose sign-in this account is. |
| `connected_by_you` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | Signed-in accounts per toolkit, across all account pages. |
| `connections` |  |
| `creation_key` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` |  |
| `id` |  |
| `name` |  |
| `pagination` |  |
| `pending_counts` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` |  |
| `provider_identity` |  |
| `provider_name` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | Agent account audience, including legacy personal and paused access. |
| `status` |  |
| `team_sharing_enabled` |  |
| `team_sharing_version` |  |
| `toolkit` |  |

Operations: create, list, load, remove.

API path: `/api/v1/organizations/{organization_id}/agent_integrations/{id}/authorize`

#### AgentIntegrationAccount

| Field | Description |
| --- | --- |
| `can_cancel_sign_in` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` |  |
| `can_disconnect` |  |
| `can_enable` |  |
| `can_manage_sharing` |  |
| `can_reconnect` |  |
| `can_sync` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `connected_by` | Name of the person whose sign-in this account is. |
| `connected_by_you` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` |  |
| `id` |  |
| `name` |  |
| `provider_disabled_reason` |  |
| `provider_identity` |  |
| `reference` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | Agent account audience, including legacy personal and paused access. |
| `status` |  |
| `team_sharing_enabled` |  |
| `team_sharing_version` |  |
| `toolkit` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agent_integrations/accounts`

#### AgentIntegrationCallback

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/agent_integration_callback`

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

#### AgentRelayFileGrant

| Field | Description |
| --- | --- |
| `access_mode` |  |
| `connection_generation` |  |
| `connection_id` |  |
| `connection_name` | Current display name of the selected account. |
| `created_at` |  |
| `expected_generation` |  |
| `id` |  |
| `key` |  |
| `provider` |  |
| `resource_id` |  |
| `resource_kind` |  |
| `revoked` |  |
| `revoked_at` |  |
| `snapshot_supported` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` |  |

Operations: create, list, load, remove.

API path: `/api/v1/organizations/{organization_id}/agent_relay_file_grants`

#### AgentRelayFileGrantAccount

| Field | Description |
| --- | --- |
| `access_modes` | Supported file access modes. |
| `generation` |  |
| `id` |  |
| `name` |  |
| `provider` |  |
| `resource_kind` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agent_relay_file_grants/accounts`

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

#### AgentRoder

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/agent/roder/browser_executor_authorization`

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

#### AgentSession

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/agent_sessions/{session_id}/transcript`

#### AgentSessionCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize`

#### AgentSessionRoderHandoff

| Field | Description |
| --- | --- |
| `checkpoint_id` | Public id of the checkpoint to hand off. |
| `purpose` | Handoff intent; defaults to `continue`. |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs`

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
| `author` |  |
| `can_message` | The viewer may send input to the author agent |
| `deployments_count` | Increases with every deploy of the site |
| `description` | The team app description, when the site is a team app |
| `icon_url` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` |  |
| `name` | The site's DNS label |
| `owner` | The person who controls the author agent |
| `thread` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | The team app title, or the site name read as words |
| `url` |  |
| `visibility` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/agent_sites/{id}/opened`

#### AgentSkill

| Field | Description |
| --- | --- |
| `agents` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` |  |
| `can_manage_library` |  |
| `content` | The skill's SKILL.md |
| `files` |  |
| `id` |  |
| `marketplace` |  |
| `pending` | Some agent is still applying a change; check again shortly |
| `plugin` | The marketplace entry id |
| `revision` | The commit SHA returned by preview |
| `skill` |  |
| `skills` |  |
| `source` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

Operations: create, list, load, remove, update.

API path: `/api/v1/organizations/{organization_id}/agent_skills`

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

#### AgentSwarm

| Field | Description |
| --- | --- |
| `base_bookmark` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` |  |
| `base_revision` | 64-hex commit id; skips the head lookup |
| `budget` |  |
| `canceled_at` |  |
| `canceled_count` |  |
| `concurrency_key` |  |
| `created_at` |  |
| `created_at_label` |  |
| `creator_user_id` |  |
| `deadline_at` |  |
| `display_id` |  |
| `done_count` |  |
| `environment` |  |
| `failed_count` |  |
| `finished_at` |  |
| `finished_at_label` |  |
| `github` |  |
| `goal` |  |
| `id` |  |
| `model` |  |
| `model_provider` |  |
| `number` |  |
| `organization_id` |  |
| `organization_slug` |  |
| `outcome` |  |
| `phase` |  |
| `policy` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` |  |
| `queued_at_label` |  |
| `repository` | Repository slug inside the organization |
| `repository_id` |  |
| `repository_slug` |  |
| `reserved` |  |
| `scheduler_generation` |  |
| `skipped_count` |  |
| `slug` |  |
| `started_at` |  |
| `started_at_label` |  |
| `status` |  |
| `summary` |  |
| `target` | Where the swarm lands. |
| `task_count` |  |
| `task_template_json` |  |
| `tasks` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `usage` |  |

Operations: create, list, load, update.

API path: `/api/v1/agent/swarms/{id}/cancel`

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
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/agent/threads/{id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `description` |  |
| `inputSchema` |  |
| `name` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools`

#### AgentUsage

| Field | Description |
| --- | --- |
| `days` | One cell per (day, model), ascending by day then model. |
| `ended_at` |  |
| `pricing_version` | The price table in effect now; rows carry the version they were priced at. |
| `source` | Which store served the rows. |
| `started_at` |  |
| `user_days` | One cell per (day, person), ascending by day. |
| `users` | One row per (person, model), descending by tokens. |
| `window` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/agent_usage`

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

#### AgentWebPreview

| Field | Description |
| --- | --- |
| `description` |  |
| `icon_url` |  |
| `image_url` |  |
| `title` |  |

Operations: list.

API path: `/api/v1/agent_web_previews`

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

#### Agreement

| Field | Description |
| --- | --- |
| `body` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` |  |
| `key` |  |
| `summary` |  |
| `title` |  |
| `version` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/agreements`

#### AgreementAccessRequest

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agreement_access_request`

#### AlertRuleEvent

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, remove.

API path: `/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge`

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

#### AppAccess

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/app_access/callback`

#### AppAccessJwk

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/app_access/jwks`

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

#### Artefact

| Field | Description |
| --- | --- |
| `automation_invocation_id` |  |
| `byte_size` |  |
| `checksum_sha256` |  |
| `content_type` |  |
| `created_at` |  |
| `created_by_user_id` |  |
| `description` |  |
| `document_key` | Stable document identity shared by all revisions. |
| `entrypoint` |  |
| `expires_at` |  |
| `filename` |  |
| `files` |  |
| `harness` |  |
| `harness_version` |  |
| `id` |  |
| `kind` |  |
| `model` |  |
| `organization_id` |  |
| `published_at` |  |
| `repository_id` |  |
| `slug` |  |
| `source` |  |
| `status` |  |
| `title` |  |
| `vcs_agent_checkpoint_id` |  |
| `vcs_agent_session_id` |  |
| `version` |  |
| `view_url` |  |
| `web_url` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{organization_id}/artefacts`

#### ArtefactCommentThread

| Field | Description |
| --- | --- |
| `anchor` | The `#anchor` written into the Markdown. |
| `body` |  |
| `comments` |  |
| `id` | The anchor key. |
| `quote` |  |
| `resolved` |  |

Operations: create, list, update.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads`

#### ArtefactRevision

| Field | Description |
| --- | --- |
| `base_version` | The newest version the editor started from. |
| `content` | Markdown, including CriticMarkup suggestions and comment anchors. |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions`

#### ArtefactViewToken

| Field | Description |
| --- | --- |
| `expires_in` |  |
| `file` | Exact manifest path. |
| `organization_slug` | If provided, must match the organization addressed by the route. |
| `version` |  |
| `viewer_url` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens`

#### Artifact

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/artifacts/{id}/expire`

#### ArtifactCacheNamespace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/cache_namespaces/{id}/archive`

#### ArtifactImageRepository

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/image_repositories/{id}/archive`

#### ArtifactPackageMirror

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/package_mirrors/{id}/pause`

#### ArtifactRetentionPolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/retention_policies`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}`

#### AuditEvent

| Field | Description |
| --- | --- |
| `action` |  |
| `actor_kind` |  |
| `actor_user_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `observability_space_id` |  |
| `organization_id` |  |
| `payload` |  |
| `request_id` |  |
| `severity` |  |
| `subject_id` |  |
| `subject_kind` |  |
| `subject_name` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/audit_events`

#### Auth

| Field | Description |
| --- | --- |

Operations: create, load, remove.

API path: `/api/v1/auth/apple`

#### AuthCli

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/auth/cli/complete`

#### AuthGithub

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/auth/github/start`

#### AuthGoogle

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/auth/google/start`

#### AuthOpenai

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/auth/openai/callback`

#### AuthPasswordReset

| Field | Description |
| --- | --- |
| `email` |  |
| `message` |  |
| `password` |  |
| `token` |  |

Operations: create, update.

API path: `/api/v1/auth/password_resets`

#### AuthRegistrationOption

| Field | Description |
| --- | --- |
| `email_password_signup_enabled` |  |
| `openai_sign_in_enabled` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` |  |
| `waitlist_enabled` | New public signups require waitlist approval when enabled. |

Operations: list.

API path: `/api/v1/auth/registration_options`

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

#### BackendRunnerPool

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, remove.

API path: `/api/v1/bazel/backends/{backend_id}/runner_pools`

#### Bazel

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/bazel/authorize`

#### BazelActionResult

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load, update.

API path: `/api/v1/bazel/action_results/{hash}/{size_bytes}`

#### BazelBackend

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/bazel/backends/{id}/issue_token`

#### BazelBlob

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load, update.

API path: `/api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}`

#### BazelExecution

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load.

API path: `/api/v1/bazel/executions/{id}/complete`

#### BazelFindMissingBlob

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/bazel/find_missing_blobs`

#### Billing

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/billing`

#### BillingAddon

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `id` |  |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `quantity` |  |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/billing/addons/{addon_key}`

#### BillingBudget

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | Null clears the budget. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: patch, update.

API path: `/api/v1/organizations/{organization_id}/billing/budget`

#### BillingCheckoutSession

| Field | Description |
| --- | --- |
| `cancel_url` |  |
| `coupon_code` |  |
| `entry_point` | Where the owner chose to pay, for product analytics. |
| `package_key` |  |
| `package_revision` |  |
| `success_url` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/billing/checkout_sessions`

#### BillingContact

| Field | Description |
| --- | --- |
| `addons` |  |
| `billing_email` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: patch, update.

API path: `/api/v1/organizations/{organization_id}/billing/contact`

#### BillingExtraSpend

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `enabled` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: patch, update.

API path: `/api/v1/organizations/{organization_id}/billing/extra_spend`

#### BillingInvoice

| Field | Description |
| --- | --- |
| `amount_due_cents` |  |
| `created_at` |  |
| `currency` |  |
| `hosted_invoice_url` |  |
| `id` |  |
| `invoice_pdf` |  |
| `metronome_invoice_id` | Metronome's id for the invoice it pushed |
| `number` |  |
| `period_ended_at` |  |
| `period_started_at` |  |
| `status` |  |
| `total_cents` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/billing/invoices`

#### BillingPackage

| Field | Description |
| --- | --- |
| `addons` |  |
| `base_price_cents` |  |
| `billing_interval` |  |
| `billing_policy` |  |
| `ci_included_spend_cents` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` |  |
| `key` |  |
| `max_seats` |  |
| `name` |  |
| `pay_as_you_go_enabled` |  |
| `rates` |  |
| `revision` |  |
| `roder_daily_run_limit` |  |
| `roder_run_concurrency_limit` |  |
| `seat_price_cents` |  |
| `trial_days` |  |
| `visibility` |  |

Operations: list.

API path: `/api/v1/billing/packages`

#### BillingPortalSession

| Field | Description |
| --- | --- |
| `return_url` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/billing/portal_sessions`

#### BillingPrepaidPeriod

| Field | Description |
| --- | --- |
| `activated_at` |  |
| `created_at` |  |
| `currency` |  |
| `id` |  |
| `last_error` |  |
| `minutes` |  |
| `net_amount_cents` |  |
| `paid_at` |  |
| `paid_total_cents` |  |
| `payment_action_url` |  |
| `period_ended_at` |  |
| `period_started_at` |  |
| `receipt_url` |  |
| `refunded_net_cents` |  |
| `state` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}`

#### BillingPrepaidPurchase

| Field | Description |
| --- | --- |
| `activated_at` |  |
| `created_at` |  |
| `currency` |  |
| `id` |  |
| `last_error` |  |
| `minutes` |  |
| `net_amount_cents` |  |
| `paid_at` |  |
| `paid_total_cents` |  |
| `payment_action_url` |  |
| `prepaid` |  |
| `purchase` |  |
| `receipt_url` |  |
| `refunded_net_cents` |  |
| `request_key` |  |
| `state` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/billing/prepaid_purchases`

#### BillingSubscription

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `cancel_at_period_end` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: patch, update.

API path: `/api/v1/organizations/{organization_id}/billing/subscription`

#### BillingTokenTopUp

| Field | Description |
| --- | --- |
| `amount_cents` |  |
| `request_key` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/billing/token_top_ups`

#### BillingUsage

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/billing/usage/breakdown`

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

#### BookmarkProtectionRefreshGithubRequiredCheck

| Field | Description |
| --- | --- |
| `exclusions` |  |
| `fetched_at` |  |
| `fetched_at_label` |  |
| `github_branch` |  |
| `github_owner` |  |
| `github_repository_name` |  |
| `last_error` |  |
| `proven` |  |
| `requirements` |  |
| `stale` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/refresh_github_required_checks`

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

#### CacheNamespaceEntry

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict`

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

#### Change

| Field | Description |
| --- | --- |
| `counts` | Counts for each state across the active non-state filters. |
| `filters` |  |
| `github_sync` |  |
| `result` | What this page is a page of. |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/changes`

#### ChangeAsset

| Field | Description |
| --- | --- |
| `alias` |  |
| `byte_size` |  |
| `checksum_md5` |  |
| `checksum_sha256` |  |
| `content_type` |  |
| `filename` |  |
| `id` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize`

#### ChangeComment

| Field | Description |
| --- | --- |
| `body` |  |
| `capabilities` |  |
| `change_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `kind` |  |
| `line` |  |
| `outdated` |  |
| `parent_comment_id` |  |
| `patchset_id` |  |
| `patchset_number` |  |
| `path` |  |
| `replies` |  |
| `resolved` |  |
| `resolved_at` |  |
| `resolved_at_label` |  |
| `resolved_by` |  |
| `side` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `user` |  |

Operations: create, list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve`

#### ChangeFileReviewCheckpoint

| Field | Description |
| --- | --- |
| `patchset_id` |  |
| `path` |  |
| `request_id` |  |
| `review_action` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/file_review_checkpoints`

#### ChangeGitBranchSubmission

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_branch_submissions`

#### ChangeGitCommitIdentity

| Field | Description |
| --- | --- |
| `change_id` |  |
| `change_number` |  |
| `git_commit_id` |  |
| `git_commit_ids` |  |
| `id` |  |
| `identities` |  |
| `missing_git_commit_ids` |  |
| `patchset_number` |  |

Operations: create, load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities`

#### ChangeGitPublication

| Field | Description |
| --- | --- |
| `expected_target_commit_id` |  |
| `id` |  |
| `operation_key` |  |
| `publication_id` |  |
| `request` |  |
| `request_digest` |  |
| `revisions` |  |
| `status` |  |
| `transfer_refs` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

Operations: create, load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications`

#### ChangeGroupMember

| Field | Description |
| --- | --- |
| `change_id` | Change number |
| `changes` |  |
| `id` |  |
| `name` |  |
| `number` |  |
| `status` |  |
| `title` |  |

Operations: create, remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members`

#### ChangeLabel

| Field | Description |
| --- | --- |
| `accepted` |  |
| `add` |  |
| `approval` |  |
| `assets` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | Human user summary or organization automation identity. |
| `capabilities` |  |
| `change_key` |  |
| `checks` |  |
| `checks_status` |  |
| `comments` |  |
| `comments_count` |  |
| `comments_count_label` |  |
| `commit_message` |  |
| `current_patchset` |  |
| `description` |  |
| `draft` |  |
| `folded_into_number` |  |
| `github_projection_status` |  |
| `github_pull_request` |  |
| `github_pull_requests` |  |
| `group` |  |
| `has_description` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` |  |
| `jj_change_id` |  |
| `labels` |  |
| `landable` |  |
| `landed_by` |  |
| `number` |  |
| `orphaned` |  |
| `orphaned_at` |  |
| `orphaned_at_label` |  |
| `orphaned_reason` |  |
| `parent_change_id` |  |
| `parent_change_number` |  |
| `patchset_number` |  |
| `patchsets` |  |
| `primary_status` |  |
| `public_id` |  |
| `relation_chain` |  |
| `remove` |  |
| `requested_changes` |  |
| `restack_state` |  |
| `reviewer_candidates` | Organization members available to the reviewer picker on this page. |
| `reviewers` |  |
| `stable_change_id` |  |
| `stack` |  |
| `status` |  |
| `target_branch` |  |
| `title` |  |
| `unresolved_comments_count_label` |  |
| `url` |  |
| `votes` |  |

Operations: update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels`

#### ChangeLandingHold

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_hold/release`

#### ChangeLandingRequest

| Field | Description |
| --- | --- |
| `change_ids` |  |
| `count` |  |
| `defer_until_ready` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` |  |
| `expected_scope_version` |  |
| `head_change_id` |  |
| `id` |  |
| `numbers` |  |
| `override_acknowledged` |  |
| `override_codes` |  |
| `position` |  |
| `priority` |  |
| `scope_version` |  |
| `state` |  |
| `version` |  |

Operations: create, remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests`

#### ChangeRequestChange

| Field | Description |
| --- | --- |
| `message` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/request_changes`

#### ChangeReviewer

| Field | Description |
| --- | --- |
| `add` |  |
| `email` |  |
| `name` |  |
| `remove` |  |
| `removed_reviewers` |  |
| `requested_reviewers` |  |
| `reviewers` |  |

Operations: list, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/reviewers`

#### ChangeTranscript

| Field | Description |
| --- | --- |
| `capture_kind` |  |
| `captured_at` |  |
| `harness` |  |
| `id` |  |
| `original_resume` |  |
| `patchset_commit_id` |  |
| `patchset_number` |  |
| `redaction_count` |  |
| `session_id` |  |
| `session_title` |  |
| `status` |  |
| `superseded` |  |
| `user` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts`

#### ChangeTranscriptSummary

| Field | Description |
| --- | --- |
| `summaries` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/changes/transcript_summaries`

#### CheckpointPrepareChunk

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/prepare_chunks`

#### CiNode

| Field | Description |
| --- | --- |
| `architecture` |  |
| `bazel_enabled` |  |
| `bazel_properties_json` |  |
| `ci_runner_pool_id` |  |
| `cordoned_at` |  |
| `cordoned_at_label` |  |
| `created_at` |  |
| `created_at_label` |  |
| `health_state` |  |
| `heartbeat_age_seconds` |  |
| `id` |  |
| `kind` |  |
| `labels_csv` |  |
| `last_seen_at` |  |
| `last_seen_at_label` |  |
| `name` |  |
| `network_peer_id` |  |
| `node_capabilities_csv` |  |
| `node_certificate_expires_at` |  |
| `node_certificate_expires_at_label` |  |
| `node_certificate_fingerprint_sha256` |  |
| `node_certificate_serial` |  |
| `offline_at` |  |
| `offline_at_label` |  |
| `online_at` |  |
| `online_at_label` |  |
| `organization_id` |  |
| `os` |  |
| `revoked_at` |  |
| `revoked_at_label` |  |
| `schedulable` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `version` |  |

Operations: create, load.

API path: `/api/v1/ci/nodes/{id}/cordon`

#### CiPipeline

| Field | Description |
| --- | --- |
| `ci_runner_pool_id` |  |
| `concurrency_key` |  |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `hosted_app_id` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `repository_id` |  |
| `required_capabilities_csv` |  |
| `runner_pool` |  |
| `runs` |  |
| `slug` |  |
| `source_kind` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |
| `trigger_on_pull_request` |  |
| `trigger_on_push` |  |
| `trigger_on_schedule` |  |
| `updated_at` |  |
| `workflow_path` |  |

Operations: create, list, load.

API path: `/api/v1/ci/pipelines`

#### CiPipelineRun

| Field | Description |
| --- | --- |
| `active` |  |
| `canceled_at` |  |
| `ci_pipeline_id` |  |
| `ci_runner_pool_id` |  |
| `commit_sha` |  |
| `concurrency_key` |  |
| `created_at` |  |
| `creator_user_id` |  |
| `display_id` |  |
| `failed` |  |
| `finished_at` |  |
| `hosted_app_id` |  |
| `id` |  |
| `jobs` |  |
| `message` |  |
| `number` |  |
| `organization_id` |  |
| `parameters_json` |  |
| `queued_at` |  |
| `ref_name` |  |
| `repository_id` |  |
| `required_capabilities_csv` |  |
| `retry_number` |  |
| `retryable` |  |
| `slug` |  |
| `source_url` |  |
| `started_at` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |
| `trigger_kind` |  |
| `updated_at` |  |

Operations: create, list, load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry`

#### CiRunnerPool

| Field | Description |
| --- | --- |
| `bazel_enabled` |  |
| `bazel_properties_json` |  |
| `created_at` |  |
| `description` |  |
| `elastic_config_json` |  |
| `elastic_provider_kind` |  |
| `id` |  |
| `isolation_mode` |  |
| `labels_csv` |  |
| `max_concurrency` |  |
| `modal_capacity` |  |
| `modal_runner_invocations` |  |
| `name` |  |
| `network_space_id` |  |
| `node_capabilities_csv` |  |
| `organization_id` |  |
| `runner_count_label` |  |
| `runner_kind` |  |
| `runners` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, list, load, patch, update.

API path: `/api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime`

#### CiStatus

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/ref`

#### CliEvent

| Field | Description |
| --- | --- |
| `event` |  |
| `properties` |  |

Operations: create.

API path: `/api/v1/cli_events`

#### CliRelease

| Field | Description |
| --- | --- |

Operations: create, list, load.

API path: `/api/v1/cli_releases`

#### CloudWorkspaceBackupObject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/objects/{object_key}`

#### CodeRuleEvaluation

| Field | Description |
| --- | --- |
| `advisory` |  |
| `coverage` |  |
| `diff` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` |  |
| `evaluator_version` |  |
| `input_digest` |  |
| `limits` |  |
| `model` |  |
| `requests` |  |
| `schema_version` |  |
| `snapshot_digest` |  |
| `unchecked` |  |
| `verdicts` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations`

#### ComSiteAccess

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/com_site_access/redeem`

#### ComSiteAccessSession

| Field | Description |
| --- | --- |
| `cookie_name` |  |
| `host` | Site hostname, for example docs.acme.composal.page |
| `max_age` |  |
| `session_token` |  |

Operations: create.

API path: `/api/v1/com_site_access/sessions`

#### CommentThreadComment

| Field | Description |
| --- | --- |
| `body` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments`

#### CommitDiff

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |
| `parent_id` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/diff/{fingerprint}`

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

#### ContactSubmission

| Field | Description |
| --- | --- |
| `company` |  |
| `email` | Stored downcased and stripped. |
| `message` |  |
| `name` |  |
| `website` | Honeypot. |

Operations: create.

API path: `/api/v1/contact_submissions`

#### ControlComputer

| Field | Description |
| --- | --- |
| `connection` | A point-in-time control transport observation. |
| `consent` |  |
| `device` |  |
| `id` |  |
| `provider_status` |  |

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/control_computers`

#### ControlComputerControlOperation

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

API path: `/api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations`

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

#### Deployment

| Field | Description |
| --- | --- |
| `app` |  |
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
| `history_kind` |  |
| `history_reason` |  |
| `id` |  |
| `is_live` |  |
| `is_rollback` |  |
| `live_region_count` |  |
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
| `status` |  |
| `total_replicas` |  |
| `trigger_kind` |  |
| `updated_at` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}`

#### DeploymentDashboardNomad

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation`

#### DeploymentDetail

| Field | Description |
| --- | --- |
| `activity` |  |
| `app` |  |
| `app_id` |  |
| `audit_events` |  |
| `capacity` |  |
| `data_resources` |  |
| `deploy_targets` |  |
| `deployments` |  |
| `desired_states` |  |
| `environments` |  |
| `filters` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | The rolled-up state of the selected scope. |
| `nomad` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` |  |
| `placements` |  |
| `reconciler_ticks` |  |
| `releases` |  |
| `runtime_instances` |  |
| `service_bindings` |  |
| `service_views` |  |
| `storage_resources` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/details`

#### DeploymentFile

| Field | Description |
| --- | --- |

Operations: update.

API path: `/api/v1/static_sites/{static_site_id}/deployments/{id}/files`

#### DeploymentLog

| Field | Description |
| --- | --- |
| `allocation_id` |  |
| `app_environment_id` |  |
| `app_release_id` |  |
| `app_service_id` |  |
| `details` |  |
| `environment_name` |  |
| `release_version` |  |
| `service_name` |  |
| `status` |  |
| `task` |  |
| `unreachable_reason` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/logs`

#### DeploymentMetric

| Field | Description |
| --- | --- |
| `auto_deploy` |  |
| `environment_id` |  |
| `environment_name` |  |
| `placement_id` |  |
| `redeploy` |  |
| `region_count` |  |
| `replicas_per_region` |  |
| `rollout_strategy` |  |
| `service_id` |  |
| `service_name` |  |
| `source_ref` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/metrics`

#### DeploymentPreview

| Field | Description |
| --- | --- |
| `access` |  |
| `app_environment_id` |  |
| `app_name` |  |
| `app_preview_profile_id` |  |
| `app_slug` |  |
| `change_number` |  |
| `created_at` |  |
| `created_by_user_id` |  |
| `expires_at` |  |
| `generation` |  |
| `health` |  |
| `hosted_app_id` |  |
| `id` |  |
| `latest_operation_status` |  |
| `name` |  |
| `owner_name` |  |
| `profile_name` |  |
| `resource_overrides` | Service public IDs mapped to resource overrides. |
| `retained` |  |
| `slug` |  |
| `snapshot_version` |  |
| `source_revision` |  |
| `status` |  |
| `updated_at` |  |
| `urls` |  |
| `vcs_change_id` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/previews`

#### DeploymentSetting

| Field | Description |
| --- | --- |
| `code` |  |
| `created_at` |  |
| `id` |  |
| `name` |  |
| `nomad_datacenter` |  |
| `updated_at` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/settings`

#### DesktopLocalAgentModel

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/desktop_local_agent/models`

#### DesktopLocalAgentResponse

| Field | Description |
| --- | --- |
| `input` |  |
| `max_output_tokens` |  |
| `model` |  |
| `store` |  |
| `stream` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/desktop_local_agent/responses`

#### Device

| Field | Description |
| --- | --- |
| `architecture` |  |
| `channel` |  |
| `coding_connection` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | Display-only native presence. |
| `control_delivery_policy` |  |
| `control_spawn_policy` |  |
| `created_at` |  |
| `device` |  |
| `environment` |  |
| `execution_available` |  |
| `id` |  |
| `name` |  |
| `native_device_id` |  |
| `paired_at` |  |
| `pairing_generation` |  |
| `platform` |  |
| `project_visibility` | Folder discovery and new-thread selection. |
| `provider_status` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` |  |
| `scheduled_check_ins` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection`

#### DeviceBrowserOperation

| Field | Description |
| --- | --- |
| `command` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `created_at` |  |
| `id` |  |

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations/{id}/claim`

#### DeviceControlMessage

| Field | Description |
| --- | --- |
| `agent_id` |  |
| `agent_name` |  |
| `expires_at` |  |
| `id` |  |
| `sender` |  |
| `text` |  |
| `text_omitted` |  |
| `thread` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages`

#### DeviceControlOperation

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

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations`

#### DeviceEnterpriseRelay

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/spark/devices/enterprise_relays`

#### DeviceFolderListing

| Field | Description |
| --- | --- |
| `code` |  |
| `error` |  |
| `folders` |  |
| `id` |  |
| `key` | Stable idempotency key for this listing. |
| `parent` |  |
| `path` | The resolved folder. |
| `state` |  |
| `truncated` |  |

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings`

#### DeviceGrant

| Field | Description |
| --- | --- |
| `active_grants` |  |
| `agent_choices` | Eligible picker choices, with current owner grant targets, on the first page only. |
| `agent_id` |  |
| `all_agents_access` | Whether every agent the owner can use may use this computer for the owner's messages, including agents added later. |
| `capabilities` |  |
| `execution_available` |  |
| `grants` |  |
| `id` |  |
| `next_cursor` |  |
| `principal_id` |  |

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise`

#### DeviceInvocation

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge`

#### DeviceLocalEvent

| Field | Description |
| --- | --- |
| `event` |  |
| `recorded` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/local_events`

#### DevicePairing

| Field | Description |
| --- | --- |
| `architecture` |  |
| `channel` |  |
| `id` |  |
| `name` |  |
| `platform` |  |
| `public_key` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete`

#### DeviceProject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/projects/{id}`

#### DeviceScheduledCheckIn

| Field | Description |
| --- | --- |
| `enabled` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/scheduled_check_ins`

#### DockerBuilder

| Field | Description |
| --- | --- |
| `backend` |  |
| `created_at` |  |
| `gateway_url` | Organization-addressed public WSS gateway; null until configured |
| `generation` |  |
| `id` |  |
| `last_activity_at` |  |
| `organization_id` |  |
| `ready_at` |  |
| `slept_at` |  |
| `slug` |  |
| `startup_attempt` |  |
| `startup_failure` | Safe failure reason for the most recent startup attempt |
| `startup_stage` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, list, load, patch, update.

API path: `/api/v1/organizations/{organization_id}/docker_builders/{id}/recover`

#### DockerBuilderSession

| Field | Description |
| --- | --- |
| `created_at` |  |
| `docker_builder_id` |  |
| `expires_at` |  |
| `gateway_url` | Organization-addressed public WSS gateway; null until configured |
| `generation` |  |
| `id` |  |
| `organization_id` |  |
| `revoked_at` |  |
| `user_id` |  |

Operations: create, load, remove.

API path: `/api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions`

#### DockerBuilderSetting

| Field | Description |
| --- | --- |
| `docker_builder_settings` |  |
| `idle_timeout_seconds` |  |
| `max_concurrency` |  |
| `organization_id` |  |
| `region` |  |
| `runtime_timeout_seconds` |  |

Operations: list, patch, update.

API path: `/api/v1/organizations/{organization_id}/docker_builder_settings`

#### DomainDnsIntegration

| Field | Description |
| --- | --- |
| `account_label` |  |
| `api_token` |  |
| `created_at` |  |
| `failure_message` |  |
| `has_token` |  |
| `id` |  |
| `last_verified_at` |  |
| `organization_id` |  |
| `provider` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/domain_dns_integrations`

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

#### Edge

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/edge/tls-check`

#### EmailVerification

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/email_verifications/resend`

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

#### ExecutionDesiredState

| Field | Description |
| --- | --- |
| `desired_state` |  |
| `id` |  |
| `stop_observed` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/execution/desired_states/{id}/reconcile`

#### ExecutionReconcilerTick

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/execution/reconciler_ticks`

#### ExecutionRelease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/execution/releases/{id}/activate`

#### ExecutionRuntimeInstance

| Field | Description |
| --- | --- |
| `adapter_kind` |  |
| `app_environment_id` |  |
| `app_release_id` |  |
| `app_service_id` |  |
| `booted_at` |  |
| `booted_at_label` |  |
| `created_at` |  |
| `created_at_label` |  |
| `hosted_app_id` |  |
| `id` |  |
| `instance_key` |  |
| `last_reconciled_at` |  |
| `last_reconciled_at_label` |  |
| `last_seen_at` |  |
| `last_seen_at_label` |  |
| `location` |  |
| `location_id` |  |
| `network_peer_id` |  |
| `nomad_allocation_id` |  |
| `nomad_task_name` |  |
| `organization_id` |  |
| `private_ipv4` |  |
| `private_ipv6` |  |
| `provider_instance_id` |  |
| `public_endpoint` |  |
| `service_name` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` |  |
| `status` |  |
| `terminated_at` |  |
| `terminated_at_label` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/execution/runtime_instances/{id}/refresh`

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

#### Gh

| Field | Description |
| --- | --- |
| `capabilities` |  |
| `content` |  |
| `fetched_at` |  |
| `id` |  |
| `magic_merge` |  |
| `pull_request` |  |
| `stack` |  |
| `transcript_paths` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}`

#### GitImport

| Field | Description |
| --- | --- |
| `destination_mode` |  |
| `error` |  |
| `git_default_branch` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` |  |
| `git_url` |  |
| `id` |  |
| `idempotency_key` |  |
| `name` |  |
| `native_status` |  |
| `organization` |  |
| `repository_id` |  |
| `root_path` |  |
| `slug` |  |
| `source_branch` |  |
| `target_branch` |  |

Operations: create, load.

API path: `/api/v1/git_imports/{id}/complete`

#### Github

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/github/repository_lookup`

#### GithubApp

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/github_app/webhook`

#### GithubAppImportableRepository

| Field | Description |
| --- | --- |
| `account_login` |  |
| `github_app_installation_id` |  |
| `next_page` | Next GitHub page for this installation |
| `repositories` |  |

Operations: list.

API path: `/api/v1/github_app/importable_repositories`

#### GithubAppInstallation

| Field | Description |
| --- | --- |
| `account_avatar_url` |  |
| `account_id` |  |
| `account_login` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `installation_id` |  |
| `installed_at` |  |
| `installed_at_label` |  |
| `manage_access_url` |  |
| `organization_id` |  |
| `permission_entries` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` |  |
| `status` |  |
| `suspended_at` |  |
| `suspended_at_label` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: create, list, remove.

API path: `/api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection`

#### GithubAppInstallationAuthorization

| Field | Description |
| --- | --- |
| `installation_url` |  |
| `organization_slug` | Vex organization slug whose installation will be linked. |
| `return_target` | Server-validated Vex application target used after verification. |

Operations: create.

API path: `/api/v1/github_app/installation_authorizations`

#### GithubAppUserAuthorization

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/github_app/user_authorizations`

#### GithubCiRepository

| Field | Description |
| --- | --- |
| `adoption_mode` |  |
| `check_name_prefix` |  |
| `ci_runner_pool_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `default_branch` |  |
| `github_app_installation_id` |  |
| `github_repository_id` |  |
| `id` |  |
| `last_compatibility_status` |  |
| `last_error_message` |  |
| `last_head_sha` |  |
| `last_pull_request_number` |  |
| `last_ref` |  |
| `last_webhook_action` |  |
| `last_webhook_at` |  |
| `last_webhook_at_label` |  |
| `last_webhook_delivery_id` |  |
| `last_webhook_event` |  |
| `metadata` |  |
| `organization_id` |  |
| `permission_status` |  |
| `repository_full_name` |  |
| `repository_name` |  |
| `repository_owner` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `webhook_delivery_count` |  |

Operations: create, list, load, patch, update.

API path: `/api/v1/organizations/{organization_id}/github_ci_repositories`

#### GithubCiRepositoryCompatibilityReport

| Field | Description |
| --- | --- |
| `analyzed_at` |  |
| `analyzed_at_label` |  |
| `ci_pipeline_id` |  |
| `ci_pipeline_run_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `diagnostics` |  |
| `errors` |  |
| `event_action` |  |
| `event_name` |  |
| `execution_allowed` |  |
| `github_ci_repository_id` |  |
| `head_sha` |  |
| `id` |  |
| `metadata` |  |
| `organization_id` |  |
| `parser_version` |  |
| `pull_request_number` |  |
| `ref_name` |  |
| `referenced_actions` |  |
| `required_secrets` |  |
| `runner_labels` |  |
| `source_blob_sha` |  |
| `source_sha` |  |
| `status` |  |
| `supported_features` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `warnings` |  |
| `workflow_name` |  |
| `workflow_path` |  |

Operations: list, load.

API path: `/api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports`

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

#### GithubIntegration

| Field | Description |
| --- | --- |
| `account_avatar_url` |  |
| `account_login` |  |
| `connection_status` |  |
| `connection_status_label` |  |
| `github_installation` |  |
| `health` |  |
| `id` |  |
| `imported_repositories_count` |  |
| `imported_repositories_count_label` |  |
| `organization` |  |
| `pagination` |  |
| `repositories` |  |

Operations: list, load.

API path: `/api/v1/organizations/{org_slug}/pages/github_integrations`

#### GithubOnboarding

| Field | Description |
| --- | --- |
| `accounts` |  |
| `active_batch_id` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` |  |
| `capabilities` |  |
| `installations` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding`

#### GithubOnboardingBranch

| Field | Description |
| --- | --- |
| `branches` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/branches`

#### GithubOnboardingImport

| Field | Description |
| --- | --- |
| `account_login` |  |
| `complete` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` |  |
| `failed_item_count` |  |
| `github_app_installation_id` |  |
| `id` |  |
| `imported_item_count` |  |
| `item_count` |  |
| `items` |  |
| `repositories` |  |
| `status` |  |
| `terminal_item_count` |  |
| `updated_at` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/imports`

#### GithubOnboardingImportBatch

| Field | Description |
| --- | --- |
| `account_login` |  |
| `complete` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` |  |
| `failed_item_count` |  |
| `github_app_installation_id` |  |
| `id` |  |
| `imported_item_count` |  |
| `item_count` |  |
| `items` |  |
| `status` |  |
| `terminal_item_count` |  |
| `updated_at` |  |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}`

#### GithubOnboardingImportItem

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/import_items/{github_import_batch_item_id}/retry`

#### GithubPullRequest

| Field | Description |
| --- | --- |
| `capabilities` |  |
| `content` |  |
| `fetched_at` |  |
| `id` |  |
| `magic_merge` |  |
| `pull_request` |  |
| `stack` |  |
| `transcript_paths` |  |

Operations: create, load.

API path: `/api/v1/organizations/{org_slug}/github/pull_requests/refresh`

#### GithubRunnerAdmission

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/github_runner_admission`

#### GithubRunnerCache

| Field | Description |
| --- | --- |
| `entry_id` |  |
| `key` |  |
| `matched_key` |  |
| `ok` |  |
| `operation` |  |
| `restore_keys` |  |
| `signed_download_url` |  |
| `size_bytes` |  |
| `upload_path` |  |
| `version` |  |

Operations: create.

API path: `/api/v1/github_runner_cache`

#### GithubRunnerEgress

| Field | Description |
| --- | --- |
| `can_request` |  |
| `cidr` |  |
| `ipv4` |  |
| `requested_at_label` |  |
| `status` |  |

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/github_runner_egress`

#### GithubRunnerHistory

| Field | Description |
| --- | --- |
| `activity` |  |
| `counts` |  |
| `observed_at` |  |
| `pagination` |  |
| `repositories` |  |
| `runs` |  |
| `setup` | CI onboarding. |
| `success_rate` |  |
| `usage` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/github_runner_history`

#### GithubRunnerImage

| Field | Description |
| --- | --- |
| `created_at` |  |
| `id` |  |
| `image_reference` | Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+ |
| `last_error` |  |
| `modal_image_id` |  |
| `name` |  |
| `registry_secret_name` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` |  |
| `updated_at` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/github_runner_images/{id}/prepare`

#### GithubRunnerPool

| Field | Description |
| --- | --- |
| `cpu_millicores` |  |
| `enabled` |  |
| `github_app_installation_id` |  |
| `github_repository_id` |  |
| `github_runner_image` |  |
| `id` |  |
| `image` | Organization image name or ID; null restores the standard image |
| `invocations` |  |
| `label` |  |
| `last_error` |  |
| `last_polled_at` |  |
| `max_concurrency` |  |
| `memory_mb` |  |
| `organization_id` |  |
| `provider` |  |
| `repository_full_name` |  |
| `runtime_kind` |  |
| `timeout_seconds` |  |

Operations: create, list, update.

API path: `/api/v1/organizations/{organization_id}/github_runner_pools`

#### GithubRunnerSetup

| Field | Description |
| --- | --- |
| `error` |  |
| `github_repository_connection_id` |  |
| `id` |  |
| `pull_request_url` |  |
| `repository_full_name` |  |
| `roder_thread_id` |  |
| `runner_labels` |  |
| `status` |  |
| `status_label` |  |
| `summary` |  |

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/github_runner_setup`

#### Gitlab

| Field | Description |
| --- | --- |
| `configured` |  |
| `connections` |  |
| `integrations` |  |
| `inventory_error` |  |
| `next_page` |  |
| `organization` |  |
| `projects` |  |
| `redirect_uri` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` |  |

Operations: create, load.

API path: `/api/v1/organizations/{org_slug}/gitlab/authorize`

#### GitlabConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/gitlab/connections/{connection_id}/control`

#### GitlabImport

| Field | Description |
| --- | --- |
| `integration_id` |  |
| `project_id` |  |
| `repo_slug` |  |
| `source_branch` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/gitlab/imports`

#### GitlabOauth

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/gitlab/oauth/callback`

#### GrantAllAgent

| Field | Description |
| --- | --- |
| `all_agents_access` |  |
| `enabled` |  |
| `execution_available` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/all_agents`

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

#### IdentityOrganization

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/identity/organizations/{organization_id}/catalog`

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

#### ImageRepositoryTag

| Field | Description |
| --- | --- |
| `image_repository` |  |
| `name` |  |
| `registry_url` |  |
| `tags` |  |

Operations: list.

API path: `/api/v1/artifacts/image_repositories/{id}/tags`

#### ImportBranchPolicy

| Field | Description |
| --- | --- |
| `can_manage_pr_scenario_writing` |  |
| `can_manage_sandbox_region` |  |
| `dedicated_outbound_ip_addresses` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` |  |
| `organization` |  |
| `sandbox_regions` |  |

Operations: load, patch, update.

API path: `/api/v1/organizations/{organization_id}/import_branch_policy`

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

#### InvocationControl

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/control/challenge`

#### JobLogChunk

| Field | Description |
| --- | --- |
| `byte_size` |  |
| `ci_job_id` |  |
| `ci_pipeline_run_id` |  |
| `ci_step_id` |  |
| `content` |  |
| `content_format` |  |
| `created_at` |  |
| `id` |  |
| `organization_id` |  |
| `sequence_number` |  |
| `stream` |  |
| `updated_at` |  |

Operations: create, list.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks`

#### JobStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, patch, update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps`

#### JobWorkspace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, patch, update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces`

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

#### Known

| Field | Description |
| --- | --- |

Operations: load.

API path: `/.well-known/agent-card.json`

#### Label

| Field | Description |
| --- | --- |
| `changes_count` |  |
| `id` |  |
| `name` | Display name |
| `slug` | Normalized identity used for filtering and lookup. |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/labels`

#### LeaseArtifact

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/artifacts`

#### LeaseCache

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore`

#### LeaseLogChunk

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/log_chunks`

#### LeaseReconciliation

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/reconciliations/{reconciliation_id}/output`

#### LeaseStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id}`

#### LeaseVerifyDiagnostic

| Field | Description |
| --- | --- |
| `browser_events` |  |
| `live_browser` |  |
| `live_view` | The tester's read-only live stream for page viewers. |
| `steps` |  |

Operations: create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics`

#### LeaseVerifySecret

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets`

#### LeaseWorkspace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id}`

#### LocalAgentDecision

| Field | Description |
| --- | --- |
| `request` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/local_agent/decisions`

#### LocalAgentResponse

| Field | Description |
| --- | --- |
| `input` |  |
| `model` |  |
| `service_tier` |  |
| `store` |  |
| `stream` |  |
| `tools` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/local_agent/responses`

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

#### LogStreamChunk

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks`

#### LogoImage

| Field | Description |
| --- | --- |
| `activated_products` | Products this organization has activated (PRD 144). |
| `agents_only` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` |  |
| `created_at_label` |  |
| `github_prs_authored_by_change_author` |  |
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

Operations: remove, update.

API path: `/api/v1/organizations/{organization_id}/logo_image`

#### MarketingSetting

| Field | Description |
| --- | --- |
| `call_first` |  |

Operations: list.

API path: `/api/v1/marketing_settings`

#### McpOauth

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/mcp/oauth/consent`

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

#### MergeQueueEntry

| Field | Description |
| --- | --- |
| `analytics` | Queue performance for the reporting window. |
| `change_id` |  |
| `expected_target_commit_id` |  |
| `expected_target_version` |  |
| `expected_version` |  |
| `github_pr_number` |  |
| `id` |  |
| `idempotency_key` |  |
| `kind` |  |
| `policy` |  |
| `priority` |  |
| `queue` |  |
| `target_branches` | Bookmark names for the target picker. |
| `when_ready` |  |

Operations: create, remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge`

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

#### MergeResolution

| Field | Description |
| --- | --- |
| `action` |  |
| `base` | Common ancestor file contents |
| `content` |  |
| `context` | Optional surrounding files keyed by path |
| `duration_ms` |  |
| `fallback` |  |
| `model` |  |
| `ours` | Current / left file contents |
| `path` | Repository-relative path of the conflicted file |
| `resolved` |  |
| `theirs` | Incoming / right file contents |

Operations: create.

API path: `/api/v1/merge_resolutions`

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

#### MetronomeWebhook

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/metronome/webhooks`

#### ModelSubscriptionAccount

| Field | Description |
| --- | --- |
| `accounts` |  |
| `agents` |  |
| `can_disconnect` |  |
| `connection_agent` |  |
| `email` |  |
| `id` |  |
| `label` |  |
| `provider` |  |
| `saved` |  |
| `status` |  |
| `usable` |  |

Operations: create, list, patch, remove, update.

API path: `/api/v1/model_subscription_accounts`

#### ModelSubscriptionAccountConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load, update.

API path: `/api/v1/model_subscription_accounts/connection/{agent_id}`

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

#### NetworkingSpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{id}/activate`

#### Node

| Field | Description |
| --- | --- |
| `account_avatar_url` |  |
| `account_id` |  |
| `account_login` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `installation_id` |  |
| `installed_at` |  |
| `installed_at_label` |  |
| `manage_access_url` |  |
| `organization_id` |  |
| `permission_entries` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` |  |
| `status` |  |
| `suspended_at` |  |
| `suspended_at_label` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/pages/nodes`

#### NodeCertificate

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/ci/nodes/{id}/certificate/rotate`

#### NodeLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/claim`

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

#### Now

| Field | Description |
| --- | --- |
| `needs_attention` |  |
| `pagination` |  |
| `recently_landed` |  |
| `shipping_now` |  |
| `summary` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/now`

#### ObservabilityClickhouseCluster

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/observability/clickhouse_clusters/{id}/activate`

#### ObservabilityQuickwitCluster

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/observability/quickwit_clusters/{id}/activate`

#### ObservabilitySpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/observability/spaces/{id}/activate`

#### Openapi

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/openapi`

#### OrgInvitation

| Field | Description |
| --- | --- |
| `id` |  |
| `invitation` |  |
| `registration_options` |  |
| `requires_password_setup` |  |
| `start_guided_setup` |  |

Operations: create, load.

API path: `/api/v1/org_invitations/{token}/accept`

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

#### OrganizationApp

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list, remove, update.

API path: `/api/v1/spark/organizations/{organization_id}/apps`

#### OrganizationControl

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/control/admission`

#### OrganizationDevice

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/control`

#### OrganizationIdentityCertificate

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/identity_certificates/{id}/expire`

#### OrganizationInteraction

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/interactions`

#### OrganizationInvitation

| Field | Description |
| --- | --- |
| `email` |  |
| `id` |  |
| `role` |  |

Operations: create, remove.

API path: `/api/v1/admin/organizations/{org_slug}/invitations`

#### OrganizationMessageFile

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/message_files`

#### OrganizationOidcTrust

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate`

#### OrganizationRunEvent

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/run_events`

#### OrganizationRunOutcome

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/run_outcomes`

#### OrganizationRunUsage

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/run_usages`

#### OrganizationSandbox

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/sandbox/automation-cleanup`

#### OrganizationSecret

| Field | Description |
| --- | --- |
| `app_environment_id` |  |
| `app_service_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `created_by` |  |
| `current_version` |  |
| `description` |  |
| `env_key` |  |
| `expose_to_build` |  |
| `expose_to_ci` |  |
| `hosted_app_id` |  |
| `id` |  |
| `last_accessed_at` |  |
| `last_accessed_at_label` |  |
| `last_accessed_by` |  |
| `latest_version_number` |  |
| `name` |  |
| `organization_id` |  |
| `owner_service_account_id` |  |
| `rotation_policy` |  |
| `scope_kind` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{id}/disable`

#### OrganizationServiceAccount

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate`

#### OrganizationSetting

| Field | Description |
| --- | --- |
| `concurrent_run_limit_override` |  |
| `customize_onboarding_packages` |  |
| `daily_run_limit_override` |  |
| `deployment_usage_visibility` |  |
| `monthly_browser_minutes_limit_override` |  |
| `monthly_budget_dollars` |  |
| `name` |  |
| `onboarding_custom_pricing` |  |
| `onboarding_package_keys` |  |

Operations: update.

API path: `/api/v1/admin/organizations/{org_slug}/settings`

#### OrganizationSite

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, remove, update.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/token`

#### OrganizationSubscription

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/subscriptions/selection`

#### OrganizationTool

| Field | Description |
| --- | --- |
| `arguments` |  |
| `native_agent_id` |  |
| `tool` |  |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/tools`

#### OrganizationWorkloadIdentity

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate`

#### OtelIngest

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/otel_ingest/authorize`

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

#### PageArtefact

| Field | Description |
| --- | --- |
| `artefact` |  |
| `automation` |  |
| `automation_invocation_id` |  |
| `byte_size` |  |
| `checksum_sha256` |  |
| `comment_threads` |  |
| `content_type` |  |
| `created_at` |  |
| `created_by_user_id` |  |
| `description` |  |
| `document_key` | Stable document identity shared by all revisions. |
| `draft` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` |  |
| `expires_at` |  |
| `filename` |  |
| `files` |  |
| `harness` |  |
| `harness_version` |  |
| `id` |  |
| `kind` |  |
| `kinds` |  |
| `model` |  |
| `organization` |  |
| `organization_id` |  |
| `pagination` |  |
| `permissions` |  |
| `preview` |  |
| `published_at` |  |
| `published_at_label` |  |
| `publisher` |  |
| `repository` |  |
| `repository_id` |  |
| `selected_path` |  |
| `slug` |  |
| `source` |  |
| `status` |  |
| `title` |  |
| `vcs_agent_checkpoint_id` |  |
| `vcs_agent_session_id` |  |
| `version` |  |
| `versions` |  |
| `view_url` |  |
| `web_url` |  |

Operations: list, load.

API path: `/api/v1/organizations/{organization_id}/artefacts/page`

#### PageCiPipelineRun

| Field | Description |
| --- | --- |
| `error` |  |
| `id` |  |
| `jobs` |  |

Operations: load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page`

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

#### PageRepoVcCommit

| Field | Description |
| --- | --- |
| `commit` |  |
| `diff_path` | Fingerprinted path serving this commit range's file diff. |
| `id` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/page`

#### PagesBilling

| Field | Description |
| --- | --- |
| `addons` |  |
| `breakdown` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` |  |
| `can_manage_contact` |  |
| `can_manage_extra_spend` |  |
| `can_manage_local_subscription` |  |
| `can_manage_payment_method` |  |
| `can_set_up_billing` |  |
| `customer` |  |
| `deployment_usage_visible` |  |
| `entitlements` |  |
| `extra_spend_enabled` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | Whether the `billing` feature is on for this organization. |
| `organization_id` |  |
| `package` |  |
| `prepaid` |  |
| `preview` | Metronome draft invoice and credits, or null. |
| `storage_usage` |  |
| `stripe` |  |
| `subscription` |  |
| `token_account` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/billing`

#### PagesGithubOnboarding

| Field | Description |
| --- | --- |
| `onboarding` |  |
| `organization` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/github_onboarding`

#### PagesMember

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

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/members`

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

#### PagesRegistry

| Field | Description |
| --- | --- |
| `active_repository_count` |  |
| `error` |  |
| `pagination` |  |
| `repositories` |  |
| `repository_count` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/registry`

#### PagesSession

| Field | Description |
| --- | --- |
| `adapter` |  |
| `created_at` |  |
| `cursor` |  |
| `ended_at` |  |
| `external_session_id` |  |
| `facets` |  |
| `from` |  |
| `github_access_warnings` |  |
| `harness` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` |  |
| `last_activity_at` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` |  |
| `limit` |  |
| `markers` |  |
| `max_bytes` |  |
| `mode` |  |
| `offset` |  |
| `pagination` |  |
| `query` |  |
| `repo` |  |
| `repository` |  |
| `search` |  |
| `search_enabled` |  |
| `session` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` |  |
| `started_at` |  |
| `stats` |  |
| `status` |  |
| `title` |  |
| `to` |  |
| `token_stats` |  |
| `transcript_index` |  |
| `transcript_stats` |  |
| `updated_at` |  |
| `user` |  |
| `user_id` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{org_slug}/pages/sessions`

#### Pairing

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/relay/pairings`

#### PairingEvent

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/relay/pairings/{id}/events`

#### ParallelV1

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/local_agent/parallel/v1/extract`

#### PatchsetDiff

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |
| `patchset` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}`

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

#### ProactiveAgentWaitlistEntry

| Field | Description |
| --- | --- |
| `email` |  |
| `first_task` | The first job they would hand an agent. |
| `invite_code` | The referral code of the invite link they arrived through. |
| `places_per_referral` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | 1-based place in the queue. |
| `position_after_next_referral` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | Shared in this entry's invite link. |
| `referral_count` | People who joined through this entry's link. |
| `total` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | Honeypot. |

Operations: create, load.

API path: `/api/v1/proactive_agent_waitlist_entries`

#### Product

| Field | Description |
| --- | --- |
| `activated_products` | Products this organization has activated (PRD 144). |
| `agents_only` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` |  |
| `created_at_label` |  |
| `github_prs_authored_by_change_author` |  |
| `id` |  |
| `logo_url` |  |
| `member_count` |  |
| `name` |  |
| `pending_invitation_count` |  |
| `personal` |  |
| `product` |  |
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

Operations: create.

API path: `/api/v1/organizations/{organization_id}/products`

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

#### PullRequestAction

| Field | Description |
| --- | --- |
| `action_name` |  |
| `body` |  |
| `comment_id` |  |
| `comments` |  |
| `event` |  |
| `expected_head_sha` |  |
| `id` |  |
| `label` |  |
| `line` |  |
| `node_id` |  |
| `operation_key` |  |
| `path` |  |
| `run_id` |  |
| `side` |  |
| `start_line` |  |
| `start_side` |  |
| `thread_id` |  |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions`

#### PullRequestMagicMerge

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge`

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

#### PullRequestTranscript

| Field | Description |
| --- | --- |
| `adapter` |  |
| `created_at` |  |
| `ended_at` |  |
| `external_session_id` |  |
| `harness` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` |  |
| `last_activity_at` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` |  |
| `repository` |  |
| `started_at` |  |
| `stats` |  |
| `status` |  |
| `title` |  |
| `updated_at` |  |
| `user` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts`

#### PullZone

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `slug` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/pull_zones`

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

#### RelayAgentConnection

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

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay`

#### RelaySignal

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/relay/signals`

#### ReleaseRollout

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/execution/releases/{release_id}/rollouts/{id}/complete`

#### Repo

| Field | Description |
| --- | --- |
| `can_retry_import` | True when a failed client import can be requeued for CLI resume. |
| `can_retry_sync` | True when the latest sync run failed and can be retried. |
| `disclaimer` |  |
| `federated_in_home` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` |  |
| `icon_name` |  |
| `id` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` |  |
| `is_home` |  |
| `name` |  |
| `remote_repository` |  |
| `root_path` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` |  |
| `sync_error_message` |  |
| `sync_provider` |  |
| `sync_status` |  |

Operations: list, load, remove.

API path: `/api/v1/organizations/{org_slug}/repos`

#### RepoAccessToken

| Field | Description |
| --- | --- |
| `access_token` |  |
| `active` |  |
| `created_at` |  |
| `created_at_label` |  |
| `credential_purpose` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` |  |
| `expires_at_label` |  |
| `expires_in_days` |  |
| `id` |  |
| `last_used_at` |  |
| `last_used_at_label` |  |
| `name` |  |
| `permission_level` |  |
| `plain_text_token` |  |
| `revoked_at` |  |
| `revoked_at_label` |  |
| `token_preview` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: create, list, remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens`

#### RepoAction

| Field | Description |
| --- | --- |
| `pipeline` |  |
| `run` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/actions`

#### RepoAgentCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_checkpoints/{id}`

#### RepoAgentSession

| Field | Description |
| --- | --- |
| `adapter` |  |
| `agent_session` |  |
| `external_session_id` |  |
| `id` |  |
| `status` |  |
| `title` |  |

Operations: create, list, load, patch, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete`

#### RepoBookmarkProtection

| Field | Description |
| --- | --- |
| `actor_policy` |  |
| `bypass_mode` |  |
| `created_at` |  |
| `created_by_user_id` |  |
| `enabled` |  |
| `id` |  |
| `name` |  |
| `organization_id` |  |
| `priority` |  |
| `repository_id` |  |
| `requirements` |  |
| `target_kind` |  |
| `target_pattern` |  |
| `updated_at` |  |
| `updated_by_user_id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections`

#### RepoBookmarkProtectionEvent

| Field | Description |
| --- | --- |
| `action` |  |
| `actor_kind` |  |
| `actor_label` |  |
| `actor_user_id` |  |
| `bookmark_name` |  |
| `bookmark_protection_rule_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `decision` |  |
| `id` |  |
| `intent` |  |
| `metadata` |  |
| `new_target` |  |
| `old_target` |  |
| `organization_id` |  |
| `reason_codes` |  |
| `repository_id` |  |
| `source_request_id` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events`

#### RepoCloudWorkspaceBackup

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/restore_request`

#### RepoCodeRule

| Field | Description |
| --- | --- |
| `active_revision_number` |  |
| `capabilities` |  |
| `code_rule` |  |
| `created_at` |  |
| `definition` |  |
| `draft_pending` | The latest revision is not the active one |
| `enabled` |  |
| `expected_version` |  |
| `id` |  |
| `latest_revision_number` |  |
| `name` | Name of the latest revision |
| `repository` |  |
| `scope` |  |
| `slug` |  |
| `state_version` | Send back as expected_version on every mutation |
| `updated_at` |  |
| `web_url` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules`

#### RepoSetting

| Field | Description |
| --- | --- |
| `active` |  |
| `created_at` |  |
| `created_at_label` |  |
| `description` |  |
| `expires_at` |  |
| `expires_at_label` |  |
| `icon_name` |  |
| `id` |  |
| `last_used_at` |  |
| `last_used_at_label` |  |
| `merge_authority` |  |
| `name` |  |
| `organization_id` |  |
| `permission_level` |  |
| `revoked_at` |  |
| `revoked_at_label` |  |
| `slug` |  |
| `status` |  |
| `token_preview` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings`

#### RepoStat

| Field | Description |
| --- | --- |
| `repository_stats` |  |

Operations: create, list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/stats/refresh`

#### RepoVc

| Field | Description |
| --- | --- |

Operations: create, load, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commit_file`

#### RepoVcCommit

| Field | Description |
| --- | --- |
| `name` |  |
| `target_commit_id` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits`

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

#### RepositoryAccess

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/repository_access/authorize`

#### RepositoryAccessResolve

| Field | Description |
| --- | --- |
| `default_branch` |  |
| `git_auth_username` |  |
| `git_https_clone_url` |  |
| `git_https_supported` |  |
| `github_access_warnings` |  |
| `id` |  |
| `membership_role` |  |
| `organization_id` |  |
| `organization_name` |  |
| `organization_slug` |  |
| `repository_id` |  |
| `repository_name` |  |
| `repository_slug` |  |

Operations: load.

API path: `/api/v1/repository_access/resolve/{org_slug}/{repo_slug}`

#### RepositoryEvent

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/repository_events/walgit`

#### RepositoryImport

| Field | Description |
| --- | --- |
| `can_manage_connections` |  |
| `github_imports` |  |
| `github_installations` |  |
| `gitlab_configured` |  |
| `gitlab_imports` |  |
| `gitlab_integrations` |  |
| `gitlab_redirect_uri` |  |
| `gitlab_self_managed_available` |  |
| `inventory_errors` |  |
| `organization_id` |  |
| `repositories` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/repository_import`

#### RepositoryImportSession

| Field | Description |
| --- | --- |
| `action_required` |  |
| `authorization_endpoint` |  |
| `can_authorize_github` |  |
| `client_name` |  |
| `client_version` |  |
| `created_at` |  |
| `error_message` |  |
| `expires_at` |  |
| `git_imports` |  |
| `github_app_installation_id` |  |
| `github_connected` |  |
| `id` |  |
| `idempotency_key` |  |
| `organization_id` |  |
| `organization_slug` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, load.

API path: `/api/v1/repository_import_sessions/{id}/authorization`

#### RepositoryImportSessionRepository

| Field | Description |
| --- | --- |
| `default_branch` |  |
| `full_name` |  |
| `name` |  |
| `owner` |  |
| `private` |  |
| `reason` |  |
| `selectable` |  |
| `status` |  |
| `visibility` |  |

Operations: list.

API path: `/api/v1/repository_import_sessions/{id}/repositories`

#### RepositoryImportSessionSelection

| Field | Description |
| --- | --- |
| `repositories` |  |

Operations: create.

API path: `/api/v1/repository_import_sessions/{id}/selections`

#### RepositorySandboxEnvironment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load.

API path: `/api/v1/repositories/{repository}/sandbox_environments/validate`

#### RoderCodeRepair

| Field | Description |
| --- | --- |
| `base_sha` |  |
| `cancel_requested` |  |
| `failure_code` |  |
| `id` |  |
| `launch_state` |  |
| `organization_id` |  |
| `repository_slug` |  |
| `roder_thread_id` |  |
| `roder_turn_id` |  |
| `scenario_run_id` |  |
| `task` |  |
| `trigger_kind` |  |

Operations: create, list, load.

API path: `/api/v1/agent/roder/code_repairs/{id}/cancel`

#### RoderCodeRepairSetting

| Field | Description |
| --- | --- |
| `available` |  |
| `daily_limit` |  |
| `enabled` |  |
| `enabled_at` |  |
| `operator_user_id` |  |
| `organization_id` |  |
| `repository_slug` | Connected Composal repository required when enabling |

Operations: create, list.

API path: `/api/v1/agent/roder/code_repair_settings`

#### RoderMachine

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/agent/roder/machines/{public_id}`

#### RoderRun

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/agent/roder/run/swarm_activity`

#### RoderWorkspaceCredential

| Field | Description |
| --- | --- |
| `api_token` | Short-lived personal access token for the spawning user. |
| `author_email` |  |
| `author_name` |  |
| `clone_url` |  |
| `default_branch` |  |
| `expires_at` |  |
| `organization_id` |  |
| `repository_id` |  |
| `repository_slug` |  |
| `repository_spec` | The explicitly selected physical repository address. |
| `required_lifetime_seconds` | Lifetime the pending clone or command must be able to complete within. |
| `token` | Short-lived read/write repository credential. |
| `username` |  |

Operations: create.

API path: `/api/v1/agent/roder/workspace_credentials`

#### RunArtifact

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts`

#### RunJob

| Field | Description |
| --- | --- |
| `active` |  |
| `allow_failure` |  |
| `cache_archive_observations` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` |  |
| `ci_runner_id` |  |
| `created_at` |  |
| `dependencies_csv` |  |
| `display_id` |  |
| `environment_csv` |  |
| `execution_order` |  |
| `execution_profile` |  |
| `exit_code` |  |
| `failed` |  |
| `finished_at` |  |
| `id` |  |
| `kind` |  |
| `log_chunks` |  |
| `name` |  |
| `number` |  |
| `organization_id` |  |
| `queued_at` |  |
| `reconciliation_id` |  |
| `retry_number` |  |
| `reuse` |  |
| `runner_label_selector` |  |
| `slug` |  |
| `started_at` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |
| `steps` |  |
| `timeout_seconds` |  |
| `updated_at` |  |

Operations: create, list, load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs`

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

#### RunWorkspaceCredential

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/agent/roder/run/workspace_credentials`

#### RunnerLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim`

#### RunnerPoolNodeEnrollmentToken

| Field | Description |
| --- | --- |
| `capabilities_csv` |  |
| `ci_runner_pool_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `creator_user_id` |  |
| `description` |  |
| `expires_at` |  |
| `expires_at_label` |  |
| `id` |  |
| `kind` |  |
| `last_used_at` |  |
| `last_used_at_label` |  |
| `name` |  |
| `organization_id` |  |
| `raw_token` |  |
| `revoked_at` |  |
| `status` |  |
| `token_hint` |  |
| `updated_at` |  |
| `updated_at_label` |  |
| `usage_count` |  |
| `usage_count_label` |  |

Operations: create, list.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens/{id}/revoke`

#### RunnerPoolRunner

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, update.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat`

#### RuntimeInstanceHealthSnapshot

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots`

#### SandboxIntegration

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `catalog` |  |
| `configuration` |  |
| `connected_profiles` | Connected profiles per provider across the organization. |
| `credentials` |  |
| `enabled` |  |
| `id` |  |
| `integrations` |  |
| `name` |  |
| `provider` |  |
| `version` |  |

Operations: create, list, patch, update.

API path: `/api/v1/organizations/{organization_id}/sandbox_integrations`

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

#### SecretGrant

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore`

#### SecretVersion

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints`

#### Setting

| Field | Description |
| --- | --- |
| `can_manage_pr_scenario_writing` |  |
| `can_manage_sandbox_region` |  |
| `dedicated_outbound_ip_addresses` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` |  |
| `organization` |  |
| `sandbox_regions` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/settings`

#### SettingMutationLease

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/mutation_lease/clear`

#### Signal

| Field | Description |
| --- | --- |
| `acked_at` |  |
| `acked_by` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | Dispatched-run summary (docs §6c). |
| `app_service_id` |  |
| `attribution` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` |  |
| `hosted_app_id` |  |
| `id` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` |  |
| `payload` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | Recovery pairing (docs §6b). |
| `severity` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` |  |
| `subject_type` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/signals/{id}/ack`

#### SignalInbound

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/signals/inbound/{provider}/{inbound_token}`

#### SignalIntegration

| Field | Description |
| --- | --- |
| `api_token` | Optional provider API token for target discovery and backfill. |
| `api_token_stored` |  |
| `config` |  |
| `created_at` |  |
| `failure_message` |  |
| `id` | Public id (`sint_…`). |
| `inbound_path` |  |
| `inbound_url` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` |  |
| `last_verified_at` |  |
| `mode` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` |  |
| `organization_id` |  |
| `provider` |  |
| `rejected_signature_count` | Deliveries rejected for a bad or missing signature. |
| `status` |  |
| `target_count` |  |
| `unmapped_delivery_count` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` |  |
| `webhook_secret` | The provider's signing secret. |
| `webhook_secret_stored` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token`

#### SignalIntegrationDelivery

| Field | Description |
| --- | --- |
| `attempt_count` |  |
| `created_at` |  |
| `delivery_id` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` |  |
| `id` | Public id (`sdel_…`). |
| `last_error` |  |
| `ops_signal_id` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` |  |
| `processed_at` |  |
| `provider` |  |
| `received_at` |  |
| `signal_integration_id` |  |
| `state` |  |

Operations: list.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries`

#### SignalIntegrationTarget

| Field | Description |
| --- | --- |
| `app_service_id` |  |
| `created_at` |  |
| `display_name` |  |
| `enabled` |  |
| `external_id` |  |
| `external_kind` |  |
| `external_slug` |  |
| `hosted_app_id` |  |
| `id` | Public id (`stgt_…`). |
| `organization_id` |  |
| `signal_integration_id` |  |
| `signal_integration_targets` |  |
| `targets` |  |
| `updated_at` |  |

Operations: list, update.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets`

#### SignalSubscription

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/organizations/{organization_id}/signal_subscriptions`

#### Site

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

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/sites`

#### SiteAccessKey

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, remove.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys`

#### SitePreview

| Field | Description |
| --- | --- |
| `icon_data_url` | The site's icon as a data: URL, up to 256 KB |
| `title` |  |
| `url` | The address as it will be saved |

Operations: load.

API path: `/api/v1/organizations/{organization_id}/verify/site_preview`

#### SiteSecret

| Field | Description |
| --- | --- |
| `id` |  |
| `native_agent_id` |  |
| `value` |  |

Operations: remove, update.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}`

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

#### SourceConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/source_connections/{id}/refresh`

#### SpaceAlertRule

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/observability/spaces/{space_id}/alert_rules/{id}/activate`

#### SpaceAuditEvent

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/observability/spaces/{space_id}/audit_events`

#### SpaceDnsRecord

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/dns_records`

#### SpaceEnrollmentToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke`

#### SpaceGateway

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat`

#### SpaceGroup

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/groups`

#### SpaceGroupMembership

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/group_memberships`

#### SpaceLogStream

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/observability/spaces/{space_id}/log_streams`

#### SpaceMetricSery

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/observability/spaces/{space_id}/metric_series`

#### SpaceOtelCollector

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate`

#### SpacePeer

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/peers/{id}/approve`

#### SpacePeerAttachment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/peer_attachments`

#### SpacePolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/policies/{id}/activate`

#### SpaceSegment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/v1/networking/spaces/{space_id}/segments`

#### SpaceTraceSpan

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/api/v1/observability/spaces/{space_id}/trace_spans`

#### Spark

| Field | Description |
| --- | --- |
| `activated_products` | Products this organization has activated (PRD 144). |
| `agents_only` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` |  |
| `compute_credit_cents` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` |  |
| `created_at_label` |  |
| `credit_cents` | Inference credit the workspace started Sparks with. |
| `first_spark` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` |  |
| `github_prs_authored_by_change_author` |  |
| `id` |  |
| `jsonrpc` |  |
| `logo_url` |  |
| `member_count` |  |
| `method` |  |
| `name` |  |
| `params` |  |
| `pending_invitation_count` |  |
| `personal` |  |
| `repository_count` |  |
| `role` |  |
| `sandbox_region` |  |
| `shared_agent_personal_accounts_enabled` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` |  |
| `source_control_providers` | Connected source control providers for this organization. |
| `source_ui_enabled` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | Whether the workspace has started Sparks. |
| `timezone` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` |  |
| `updated_at_label` |  |
| `verify_pr_scenario_writing_enabled` |  |

Operations: create, list.

API path: `/api/v1/organizations/{organization_id}/sparks`

#### SparkAgentIntegration

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

#### SparkAgentSite

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

#### SparkAgentSkill

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

#### SparkAgentThread

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

#### SparkCredit

| Field | Description |
| --- | --- |
| `amount_cents` | Purchase amount in USD cents. |
| `autofill` |  |
| `autofill_payment_unconfirmed` |  |
| `available_usd` |  |
| `billing_unit` | Compute minute quote version returned by the billing summary. |
| `can_manage` |  |
| `compute_minutes` |  |
| `compute_usd` |  |
| `credits_per_usd` |  |
| `inference_usd` |  |
| `kind` |  |
| `payment_method` |  |
| `payments_enabled` |  |
| `plan` |  |
| `plans` |  |
| `quoted_credits_cents` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` |  |
| `refill_options` |  |
| `refill_thresholds_cents` |  |
| `request_key` |  |
| `settings` |  |
| `starter_cents` |  |
| `top_up_max_cents` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | Minimum manual top-up and increment, in USD cents. |

Operations: create, list, load, patch, update.

API path: `/api/v1/organizations/{org_slug}/spark_credits`

#### SparkCreditAgentUsage

| Field | Description |
| --- | --- |
| `agents` |  |
| `all` |  |
| `days` |  |
| `id` |  |
| `owners` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/spark_credits/agent_usage/{agent_id}`

#### SparkCreditUsageTotal

| Field | Description |
| --- | --- |
| `compute_minutes_used` |  |
| `compute_usd` |  |
| `inference_usd` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/spark_credits/usage_totals`

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

#### StatusChange

| Field | Description |
| --- | --- |
| `change_id` |  |
| `id` |  |
| `patchsets` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/changes/{id}`

#### StatusCommit

| Field | Description |
| --- | --- |
| `checks` |  |
| `commit_sha` |  |
| `counts` |  |
| `id` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |
| `total` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/commits/{commit_sha}`

#### StatusPatchset

| Field | Description |
| --- | --- |
| `checks` |  |
| `checks_status` |  |
| `commit_sha` |  |
| `counts` |  |
| `id` |  |
| `patchset_id` |  |
| `status` |  |
| `status_label` |  |
| `status_state` |  |
| `status_tone` |  |
| `total` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/patchsets/{id}`

#### StripeWebhook

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/stripe/webhooks`

#### SubmitTelemetry

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/submit_telemetry`

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

#### SwarmEvent

| Field | Description |
| --- | --- |
| `agent_swarm_id` |  |
| `attempt_id` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `kind` |  |
| `payload` |  |
| `reason` |  |
| `scheduler_generation` |  |
| `task_id` |  |

Operations: list.

API path: `/api/v1/agent/swarms/{swarm_id}/events`

#### SwarmLive

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/agent/swarms/{id}/live/replay`

#### SwarmNote

| Field | Description |
| --- | --- |
| `task_id` | A task public id; omitted |
| `text` |  |

Operations: create.

API path: `/api/v1/agent/swarms/{swarm_id}/notes`

#### SwarmTask

| Field | Description |
| --- | --- |
| `acceptance_commands` |  |
| `agent_swarm_id` |  |
| `assigned_runner_id` |  |
| `blocked_reason` |  |
| `changes` |  |
| `commit_count` |  |
| `commit_sha_result` |  |
| `created_at` |  |
| `created_at_label` |  |
| `current_attempt_id` |  |
| `deadline_at` |  |
| `depends_on_task_ids` |  |
| `depth` |  |
| `diff_artifact_url` |  |
| `display_id` |  |
| `environment_profile` |  |
| `error_message` |  |
| `failure_code` |  |
| `finished_at` |  |
| `finished_at_label` |  |
| `harness` |  |
| `id` |  |
| `input_revision` |  |
| `iteration` |  |
| `landing_state` |  |
| `model` |  |
| `model_provider` |  |
| `number` |  |
| `organization_id` |  |
| `owned_paths` |  |
| `parent_task_id` |  |
| `position` |  |
| `prompt` |  |
| `queued_at` |  |
| `queued_at_label` |  |
| `reasoning_effort` |  |
| `recent_activity` |  |
| `repo_url` |  |
| `result` |  |
| `retry_number` |  |
| `role` |  |
| `run_id` |  |
| `stack_after_task_id` |  |
| `started_at` |  |
| `started_at_label` |  |
| `status` |  |
| `title` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list, load.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks`

#### TaskLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_jev`

#### ThreadPreview

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `port` |  |
| `url` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews`

#### ThreadPreviewAccess

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/api/v1/thread_preview_access/redeem`

#### ToolFeedback

| Field | Description |
| --- | --- |
| `category` |  |
| `created_at` |  |
| `details` |  |
| `feedback` |  |
| `id` |  |
| `metadata` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` |  |
| `source` |  |
| `summary` |  |
| `user_id` |  |

Operations: create, load.

API path: `/api/v1/organizations/{organization_id}/tool_feedbacks`

#### Transcript

| Field | Description |
| --- | --- |
| `agent` |  |
| `author` |  |
| `checkpoint_pagination` |  |
| `checkpoints` |  |
| `id` |  |
| `last_checkpoint_at` |  |
| `selected_checkpoint` |  |
| `source_url` |  |
| `started_at` |  |
| `status` |  |
| `title` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{org_slug}/transcripts/search`

#### V1Message

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/spark/organizations/{organization_id}/inference/v1/messages`

#### VcBranch

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `target_commit_id` |  |

Operations: create, list, remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches`

#### VcBrowser

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/browser/file`

#### VcChange

| Field | Description |
| --- | --- |
| `activity` |  |
| `canonical_path` |  |
| `change` |  |
| `checks` |  |
| `checks_status` |  |
| `description` |  |
| `group` |  |
| `id` |  |
| `jj_change_id` |  |
| `labels` |  |
| `landing` | Server-computed submitted-together closure and landing preflight. |
| `number` |  |
| `patchset_number` |  |
| `previews` |  |
| `primary_status` |  |
| `public_id` |  |
| `related_changes` |  |
| `relation_chain` |  |
| `restack_state` |  |
| `review_summary` |  |
| `stack` |  |
| `status` |  |
| `sync` |  |
| `target` |  |
| `target_advanced` |  |
| `target_branch` |  |
| `title` |  |
| `url` |  |

Operations: create, list, load, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/abandon`

#### VcChangeGroup

| Field | Description |
| --- | --- |
| `changes` |  |
| `id` |  |
| `name` |  |
| `number` |  |
| `status` |  |
| `title` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups`

#### VcFile

| Field | Description |
| --- | --- |
| `paths` |  |
| `truncated` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/files`

#### VcMergeQueue

| Field | Description |
| --- | --- |
| `analytics` | Queue performance for the reporting window. |
| `id` |  |
| `policy` |  |
| `queue` |  |
| `target_branches` | Bookmark names for the target picker. |

Operations: create, list, load, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause`

#### VcStack

| Field | Description |
| --- | --- |
| `alias_ref_name` |  |
| `changes` |  |
| `code` |  |
| `id` |  |
| `landing` | Compact landing state for the Stack CLI. |
| `member_count` |  |
| `name` |  |
| `ref_name` |  |
| `status` |  |
| `tip_change_number` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list, load, update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks`

#### VcsNode

| Field | Description |
| --- | --- |
| `account_avatar_url` |  |
| `account_id` |  |
| `account_login` |  |
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `installation_id` |  |
| `installed_at` |  |
| `installed_at_label` |  |
| `manage_access_url` |  |
| `organization_id` |  |
| `permission_entries` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` |  |
| `status` |  |
| `suspended_at` |  |
| `suspended_at_label` |  |
| `updated_at` |  |
| `updated_at_label` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/vcs_nodes`

#### VcsSetting

| Field | Description |
| --- | --- |
| `can_manage_pr_scenario_writing` |  |
| `can_manage_sandbox_region` |  |
| `dedicated_outbound_ip_addresses` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` |  |
| `organization` |  |
| `sandbox_regions` |  |

Operations: list.

API path: `/api/v1/organizations/{org_slug}/pages/vcs_settings`

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

#### VerifyEmailVerification

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/email_verifications/verify`

#### VerifySignalIntegration

| Field | Description |
| --- | --- |
| `api_token_stored` |  |
| `config` |  |
| `created_at` |  |
| `failure_message` |  |
| `id` | Public id (`sint_…`). |
| `inbound_path` |  |
| `inbound_url` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` |  |
| `last_verified_at` |  |
| `mode` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` |  |
| `organization_id` |  |
| `provider` |  |
| `rejected_signature_count` | Deliveries rejected for a bad or missing signature. |
| `status` |  |
| `target_count` |  |
| `unmapped_delivery_count` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` |  |
| `webhook_secret_stored` |  |

Operations: create.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{id}/verify`

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

#### WaitlistApplication

| Field | Description |
| --- | --- |

Operations: create.

API path: `/api/v1/waitlist_applications`

#### WebBotAuth

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `origin` |  |
| `signatures` |  |

Operations: create.

API path: `/api/v1/verify/web_bot_auth`

#### WebhookGitlab

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/webhooks/gitlab/{connection_key}`

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

#### WorkspaceActivity

| Field | Description |
| --- | --- |
| `live_activity` |  |
| `recent_items` |  |
| `unresolved_notification_count` |  |

Operations: load.

API path: `/api/v1/organizations/{org_slug}/pages/workspace_activity`

#### WorkspaceActivityNotification

| Field | Description |
| --- | --- |
| `id` |  |

Operations: update.

API path: `/api/v1/organizations/{org_slug}/workspace_activity/notifications/{id}/dismissal`

#### WorkspaceSpace

| Field | Description |
| --- | --- |
| `created_at` |  |
| `default_branch` |  |
| `description` |  |
| `hidden` |  |
| `icon_name` |  |
| `id` |  |
| `import_status` |  |
| `name` |  |
| `organization_id` |  |
| `position` |  |
| `repository_id` |  |
| `repository_slug` |  |
| `slug` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, list, load.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces`

#### WorkspaceSpacePreference

| Field | Description |
| --- | --- |
| `preferences` |  |
| `spaces` |  |

Operations: update.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces/preferences`



## Entities


### A2aWellKnown

Create an instance: `const a2a_well_known = client.A2aWellKnown()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AdminOrg

Create an instance: `const admin_org = client.AdminOrg()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_email` | `string | null` |  |
| `billing_reason` | `string` | Required when setting an agreed price |
| `customize_onboarding_packages` | `boolean` |  |
| `deployment_usage_visibility` | `string` |  |
| `deployment_usage_visible` | `boolean` |  |
| `id` | `string` |  |
| `monthly_price_dollars` | `string | number` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` | `number | null` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `boolean` |  |
| `onboarding_package_keys` | `any[] | null` | Package keys offered when customizing onboarding. |
| `owner_email` | `string` |  |
| `package_id` | `string | null` | Active customer package public ID. |
| `skip_payment` | `boolean` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` | `string` |  |

#### Example: Load

```ts
const admin_org = await client.AdminOrg().load({ id: 'admin_org_id' })
```

#### Example: List

```ts
const admin_orgs = await client.AdminOrg().list()
```

#### Example: Create

```ts
const admin_org = await client.AdminOrg().create({
  name: 'example_name',
  owner_email: 'example_owner_email',
  slug: 'example_slug',
})
```


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


### AgentApp

Create an instance: `const agent_app = client.AgentApp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `Record<string, any>` |  |
| `can_message` | `boolean` | The viewer may send input to the author agent |
| `deployments_count` | `number` | Increases with every deploy of the site |
| `description` | `string` |  |
| `hidden_install_count` | `number` | Installs by agents the viewer cannot open |
| `id` | `string` |  |
| `install_count` | `number` |  |
| `install_targets` | `any[]` | Active agents the viewer owns or manages, which they can install apps on |
| `installed_by` | `any[]` |  |
| `installed_target_ids` | `any[]` | Install targets of the viewer that have this app installed |
| `items` | `any[]` |  |
| `mcp_url` | `string | null` |  |
| `next_cursor` | `string | null` | Pass as cursor to load older apps |
| `owner` | `Record<string, any>` | The person who controls the author agent |
| `thread` | `any` | The thread that published the app, when the viewer can open the author agent |
| `title` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```ts
const agent_app = await client.AgentApp().load({ id: 'agent_app_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_apps = await client.AgentApp().list({ organization_id: "example" })
```


### AgentAppInstall

Create an instance: `const agent_app_install = client.AgentAppInstall()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `installed` | `boolean` |  |


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
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `any[]` |  |
| `activity` | `any[]` |  |
| `admin_disabled_at` | `string | null` |  |
| `agent_tools` | `boolean` |  |
| `authentication` | `string` |  |
| `authorized_at` | `string | null` |  |
| `can_create_account` | `boolean` | Whether another account can be created directly from this provider. |
| `capabilities` | `Record<string, any>` |  |
| `catalog_section` | `string` | Server-owned grouping in the agent integration catalog. |
| `category` | `string` | Short product label, such as CRM or Email. |
| `certification` | `string` |  |
| `checked_at` | `string | null` |  |
| `connection` | `Record<string, any>` |  |
| `consent` | `Record<string, any> | null` |  |
| `created_at` | `string` |  |
| `creation_key` | `string` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` | `string | null` |  |
| `description` | `string` | One-line catalog description of the app. |
| `disabled_reason` | `string | null` |  |
| `failure_code` | `string | null` |  |
| `generation` | `number` |  |
| `grants` | `any[]` |  |
| `grants_pagination` | `Record<string, any>` |  |
| `id` | `string` |  |
| `limits` | `Record<string, any>` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `policy_digest` | `string` |  |
| `provider` | `Record<string, any>` |  |
| `provider_disabled_reason` | `string | null` |  |
| `provider_identity` | `Record<string, any>` |  |
| `revoked_at` | `string | null` |  |
| `schema_version` | `number` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `triggers` | `any[]` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const agent_connection = await client.AgentConnection().load({ id: 'agent_connection_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_connections = await client.AgentConnection().list({ organization_id: "example" })
```

#### Example: Create

```ts
const agent_connection = await client.AgentConnection().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  toolkit: 'example_toolkit',
})
```


### AgentConnectionDelegation

Create an instance: `const agent_connection_delegation = client.AgentConnectionDelegation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authorized_by_id` | `string` |  |
| `automation_connection_grant_id` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `member_name` | `string` |  |
| `revoked_at` | `string | null` |  |
| `roles` | `any[]` |  |
| `usable` | `boolean` |  |
| `user_id` | `string` |  |

#### Example: List

```ts
const agent_connection_delegations = await client.AgentConnectionDelegation().list({ agent_connection_id: "example", organization_id: "example" })
```


### AgentConnectionGrant

Create an instance: `const agent_connection_grant = client.AgentConnectionGrant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `any[]` |  |
| `agent_connection_id` | `string` |  |
| `automation_id` | `string` |  |
| `connection_generation` | `number` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revision` | `number` |  |
| `revoked_at` | `string | null` |  |
| `status` | `string` |  |
| `usable` | `boolean` |  |
| `user_id` | `string` |  |

#### Example: List

```ts
const agent_connection_grants = await client.AgentConnectionGrant().list({ agent_connection_id: "example", organization_id: "example" })
```


### AgentConnectionResource

Create an instance: `const agent_connection_resource = client.AgentConnectionResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `string | null` |  |
| `next_cursor` | `string | null` |  |
| `query` | `string` |  |
| `resources` | `any[]` |  |

#### Example: Create

```ts
const agent_connection_resource = await client.AgentConnectionResource().create({
  agent_connection_id: 'example_agent_connection_id',
  organization_id: 'example_organization_id',
})
```


### AgentConnectionSafetyControl

Create an instance: `const agent_connection_safety_control = client.AgentConnectionSafetyControl()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_disabled_at` | `string | null` |  |
| `authorized_at` | `string | null` |  |
| `checked_at` | `string | null` |  |
| `created_at` | `string` |  |
| `custodian_id` | `string | null` |  |
| `failure_code` | `string | null` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `provider_disabled_reason` | `string | null` |  |
| `provider_identity` | `Record<string, any>` |  |
| `revoked_at` | `string | null` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |

#### Example: List

```ts
const agent_connection_safety_controls = await client.AgentConnectionSafetyControl().list({ organization_id: "example" })
```


### AgentConnectionTriggerSubscription

Create an instance: `const agent_connection_trigger_subscription = client.AgentConnectionTriggerSubscription()`

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
| `agent_connection_id` | `string` |  |
| `configuration` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `defaults` | `Record<string, any>` |  |
| `delivery` | `string` |  |
| `enabled` | `boolean` |  |
| `failure_code` | `string | null` |  |
| `failure_request_id` | `string | null` |  |
| `id` | `string` |  |
| `latency` | `string` |  |
| `name` | `string` |  |
| `reconcile_at` | `string` |  |
| `reconciliation_uncertain` | `boolean` |  |
| `remote_enabled` | `boolean | null` |  |
| `replacement_id` | `string | null` |  |
| `retired_at` | `string | null` |  |
| `retirement_completed_at` | `string | null` |  |
| `schema` | `Record<string, any>` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `toolkit_version` | `string` |  |
| `trigger_slug` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `string` |  |
| `waiting_for_retirement` | `boolean` |  |

#### Example: List

```ts
const agent_connection_trigger_subscriptions = await client.AgentConnectionTriggerSubscription().list({ agent_connection_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const agent_connection_trigger_subscription = await client.AgentConnectionTriggerSubscription().create({
  agent_connection_id: 'example_agent_connection_id',
  organization_id: 'example_organization_id',
  configuration: {},
  trigger_slug: 'example_trigger_slug',
})
```


### AgentContextCheckpoint

Create an instance: `const agent_context_checkpoint = client.AgentContextCheckpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### AgentEvent

Create an instance: `const agent_event = client.AgentEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const agent_events = await client.AgentEvent().list({ agent_id: "example", organization_id: "example" })
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
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `Record<string, any>` | Accounts the viewer can see per toolkit, across all account pages. |
| `can_cancel_sign_in` | `boolean` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `boolean` |  |
| `can_disconnect` | `boolean` |  |
| `can_enable` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_reconnect` | `boolean` |  |
| `can_sync` | `boolean` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` | `any[]` |  |
| `connected_by` | `string | null` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `boolean` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | `Record<string, any>` | Signed-in accounts per toolkit, across all account pages. |
| `connections` | `any[]` |  |
| `creation_key` | `string` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | `string | null` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `pending_counts` | `Record<string, any>` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` | `string | null` |  |
| `provider_identity` | `Record<string, any>` |  |
| `provider_name` | `string | null` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `boolean` |  |
| `team_sharing_version` | `number` |  |
| `toolkit` | `string` |  |

#### Example: Load

```ts
const agent_integration = await client.AgentIntegration().load({ id: 'agent_integration_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_integrations = await client.AgentIntegration().list({ organization_id: "example" })
```

#### Example: Create

```ts
const agent_integration = await client.AgentIntegration().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  toolkit: 'example_toolkit',
})
```


### AgentIntegrationAccount

Create an instance: `const agent_integration_account = client.AgentIntegrationAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel_sign_in` | `boolean` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `boolean` |  |
| `can_disconnect` | `boolean` |  |
| `can_enable` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_reconnect` | `boolean` |  |
| `can_sync` | `boolean` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `connected_by` | `string | null` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `boolean` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | `string | null` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider_disabled_reason` | `string | null` |  |
| `provider_identity` | `Record<string, any>` |  |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `boolean` |  |
| `team_sharing_version` | `number` |  |
| `toolkit` | `string` |  |

#### Example: List

```ts
const agent_integration_accounts = await client.AgentIntegrationAccount().list({ organization_id: "example" })
```


### AgentIntegrationCallback

Create an instance: `const agent_integration_callback = client.AgentIntegrationCallback()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const agent_integration_callback = await client.AgentIntegrationCallback().load({ connection_id: 'connection_id', state: 'state' })
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


### AgentRelayFileGrant

Create an instance: `const agent_relay_file_grant = client.AgentRelayFileGrant()`

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
| `access_mode` | `string` |  |
| `connection_generation` | `number` |  |
| `connection_id` | `string` |  |
| `connection_name` | `string` | Current display name of the selected account. |
| `created_at` | `string` |  |
| `expected_generation` | `number` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `resource_id` | `string` |  |
| `resource_kind` | `string` |  |
| `revoked` | `boolean` |  |
| `revoked_at` | `string | null` |  |
| `snapshot_supported` | `boolean` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` | `string` |  |

#### Example: Load

```ts
const agent_relay_file_grant = await client.AgentRelayFileGrant().load({ id: 'agent_relay_file_grant_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_relay_file_grants = await client.AgentRelayFileGrant().list({ organization_id: "example" })
```

#### Example: Create

```ts
const agent_relay_file_grant = await client.AgentRelayFileGrant().create({
  organization_id: 'example_organization_id',
  access_mode: 'example_access_mode',
  connection_id: 'example_connection_id',
  expected_generation: 1,
  key: 'example_key',
  resource_id: 'example_resource_id',
  resource_kind: 'example_resource_kind',
  source_operation_id: 'example_source_operation_id',
})
```


### AgentRelayFileGrantAccount

Create an instance: `const agent_relay_file_grant_account = client.AgentRelayFileGrantAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_modes` | `any[]` | Supported file access modes. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `resource_kind` | `string` |  |

#### Example: List

```ts
const agent_relay_file_grant_accounts = await client.AgentRelayFileGrantAccount().list({ organization_id: "example", source_operation_id: "example" })
```


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


### AgentRoder

Create an instance: `const agent_roder = client.AgentRoder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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


### AgentSession

Create an instance: `const agent_session = client.AgentSession()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentSessionCheckpoint

Create an instance: `const agent_session_checkpoint = client.AgentSessionCheckpoint()`

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
const agent_session_checkpoint = await client.AgentSessionCheckpoint().load({ id: 'agent_session_checkpoint_id', agent_session_id: 'agent_session_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const agent_session_checkpoints = await client.AgentSessionCheckpoint().list({ agent_session_id: "example", organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const agent_session_checkpoint = await client.AgentSessionCheckpoint().create({
  agent_session_id: 'example_agent_session_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### AgentSessionRoderHandoff

Create an instance: `const agent_session_roder_handoff = client.AgentSessionRoderHandoff()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checkpoint_id` | `string` | Public id of the checkpoint to hand off. |
| `purpose` | `string` | Handoff intent; defaults to `continue`. |

#### Example: Create

```ts
const agent_session_roder_handoff = await client.AgentSessionRoderHandoff().create({
  agent_session_id: 'example_agent_session_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


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
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `Record<string, any>` |  |
| `can_message` | `boolean` | The viewer may send input to the author agent |
| `deployments_count` | `number` | Increases with every deploy of the site |
| `description` | `string | null` | The team app description, when the site is a team app |
| `icon_url` | `string | null` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` | `string` |  |
| `name` | `string` | The site's DNS label |
| `owner` | `Record<string, any>` | The person who controls the author agent |
| `thread` | `any` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | `string` | The team app title, or the site name read as words |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```ts
const agent_site = await client.AgentSite().load({ id: 'agent_site_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_sites = await client.AgentSite().list({ organization_id: "example" })
```


### AgentSkill

Create an instance: `const agent_skill = client.AgentSkill()`

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
| `agents` | `any[]` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` | `Record<string, any>` |  |
| `can_manage_library` | `boolean` |  |
| `content` | `string` | The skill's SKILL.md |
| `files` | `any[]` |  |
| `id` | `string` |  |
| `marketplace` | `string` |  |
| `pending` | `boolean` | Some agent is still applying a change; check again shortly |
| `plugin` | `string` | The marketplace entry id |
| `revision` | `string` | The commit SHA returned by preview |
| `skill` | `Record<string, any>` |  |
| `skills` | `any[]` |  |
| `source` | `string` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

#### Example: Load

```ts
const agent_skill = await client.AgentSkill().load({ id: 'agent_skill_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const agent_skills = await client.AgentSkill().list({ organization_id: "example" })
```

#### Example: Create

```ts
const agent_skill = await client.AgentSkill().create({
  organization_id: 'example_organization_id',
  audience: {},
  revision: 'example_revision',
  skills: [],
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


### AgentSwarm

Create an instance: `const agent_swarm = client.AgentSwarm()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_bookmark` | `string | null` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` | `string | null` |  |
| `base_revision` | `string | null` | 64-hex commit id; skips the head lookup |
| `budget` | `Record<string, any>` |  |
| `canceled_at` | `string | null` |  |
| `canceled_count` | `number` |  |
| `concurrency_key` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `creator_user_id` | `string | null` |  |
| `deadline_at` | `string | null` |  |
| `display_id` | `number` |  |
| `done_count` | `number` |  |
| `environment` | `Record<string, any>` |  |
| `failed_count` | `number` |  |
| `finished_at` | `string | null` |  |
| `finished_at_label` | `string | null` |  |
| `github` | `Record<string, any>` |  |
| `goal` | `string | null` |  |
| `id` | `string` |  |
| `model` | `string | null` |  |
| `model_provider` | `string | null` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string | null` |  |
| `outcome` | `string | null` |  |
| `phase` | `string | null` |  |
| `policy` | `Record<string, any>` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` | `string | null` |  |
| `queued_at_label` | `string | null` |  |
| `repository` | `string` | Repository slug inside the organization |
| `repository_id` | `string | null` |  |
| `repository_slug` | `string | null` |  |
| `reserved` | `Record<string, any>` |  |
| `scheduler_generation` | `number` |  |
| `skipped_count` | `number` |  |
| `slug` | `string` |  |
| `started_at` | `string | null` |  |
| `started_at_label` | `string | null` |  |
| `status` | `string` |  |
| `summary` | `Record<string, any>` |  |
| `target` | `Record<string, any>` | Where the swarm lands. |
| `task_count` | `number` |  |
| `task_template_json` | `string | null` |  |
| `tasks` | `any[]` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `usage` | `Record<string, any>` |  |

#### Example: Load

```ts
const agent_swarm = await client.AgentSwarm().load({ id: 'agent_swarm_id' })
```

#### Example: List

```ts
const agent_swarms = await client.AgentSwarm().list({ org: "example" })
```

#### Example: Create

```ts
const agent_swarm = await client.AgentSwarm().create({
  organization_slug: 'example_organization_slug',
  target: {},
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const agent_thread = await client.AgentThread().load({ id: 'agent_thread_id' })
```

#### Example: List

```ts
const agent_threads = await client.AgentThread().list()
```

#### Example: Create

```ts
const agent_thread = await client.AgentThread().create({
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


### AgentUsage

Create an instance: `const agent_usage = client.AgentUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `days` | `any[]` | One cell per (day, model), ascending by day then model. |
| `ended_at` | `string` |  |
| `pricing_version` | `string` | The price table in effect now; rows carry the version they were priced at. |
| `source` | `string` | Which store served the rows. |
| `started_at` | `string` |  |
| `user_days` | `any[]` | One cell per (day, person), ascending by day. |
| `users` | `any[]` | One row per (person, model), descending by tokens. |
| `window` | `string` |  |

#### Example: Load

```ts
const agent_usage = await client.AgentUsage().load({ organization_id: 'organization_id' })
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


### AgentWebPreview

Create an instance: `const agent_web_preview = client.AgentWebPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string | null` |  |
| `icon_url` | `string | null` |  |
| `image_url` | `string | null` |  |
| `title` | `string | null` |  |

#### Example: List

```ts
const agent_web_previews = await client.AgentWebPreview().list({ token: "example" })
```


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


### Agreement

Create an instance: `const agreement = client.Agreement()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string | null` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` | `string` |  |
| `key` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: List

```ts
const agreements = await client.Agreement().list({ organization_id: "example" })
```


### AgreementAccessRequest

Create an instance: `const agreement_access_request = client.AgreementAccessRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const agreement_access_request = await client.AgreementAccessRequest().create({
  organization_id: 'example_organization_id',
})
```


### AlertRuleEvent

Create an instance: `const alert_rule_event = client.AlertRuleEvent()`

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
| `id` | `string` |  |

#### Example: Load

```ts
const alert_rule_event = await client.AlertRuleEvent().load({ id: 'alert_rule_event_id', alert_rule_id: 'alert_rule_id', space_id: 'space_id' })
```

#### Example: List

```ts
const alert_rule_events = await client.AlertRuleEvent().list({ alert_rule_id: "example", space_id: "example" })
```

#### Example: Create

```ts
const alert_rule_event = await client.AlertRuleEvent().create({
  alert_rule_id: 'example_alert_rule_id',
  space_id: 'example_space_id',
})
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


### AppAccess

Create an instance: `const app_access = client.AppAccess()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppAccessJwk

Create an instance: `const app_access_jwk = client.AppAccessJwk()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const app_access_jwks = await client.AppAccessJwk().list()
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


### Artefact

Create an instance: `const artefact = client.Artefact()`

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
| `automation_invocation_id` | `string | null` |  |
| `byte_size` | `number` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `created_at` | `string | null` |  |
| `created_by_user_id` | `string | null` |  |
| `description` | `string | null` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `entrypoint` | `string` |  |
| `expires_at` | `string | null` |  |
| `filename` | `string` |  |
| `files` | `any[]` |  |
| `harness` | `string | null` |  |
| `harness_version` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `model` | `string | null` |  |
| `organization_id` | `string` |  |
| `published_at` | `string | null` |  |
| `repository_id` | `string | null` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `string | null` |  |
| `vcs_agent_session_id` | `string | null` |  |
| `version` | `number` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```ts
const artefact = await client.Artefact().load({ id: 'artefact_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const artefacts = await client.Artefact().list({ organization_id: "example" })
```

#### Example: Create

```ts
const artefact = await client.Artefact().create({
  organization_id: 'example_organization_id',
})
```


### ArtefactCommentThread

Create an instance: `const artefact_comment_thread = client.ArtefactCommentThread()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anchor` | `string` | The `#anchor` written into the Markdown. |
| `body` | `string` |  |
| `comments` | `any[]` |  |
| `id` | `string` | The anchor key. |
| `quote` | `string` |  |
| `resolved` | `boolean` |  |

#### Example: List

```ts
const artefact_comment_threads = await client.ArtefactCommentThread().list({ artefact_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const artefact_comment_thread = await client.ArtefactCommentThread().create({
  artefact_id: 'example_artefact_id',
  organization_id: 'example_organization_id',
  anchor: 'example_anchor',
  body: 'example_body',
})
```


### ArtefactRevision

Create an instance: `const artefact_revision = client.ArtefactRevision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_version` | `number` | The newest version the editor started from. |
| `content` | `string` | Markdown, including CriticMarkup suggestions and comment anchors. |

#### Example: Create

```ts
const artefact_revision = await client.ArtefactRevision().create({
  artefact_id: 'example_artefact_id',
  organization_id: 'example_organization_id',
  base_version: 1,
  content: 'example_content',
})
```


### ArtefactViewToken

Create an instance: `const artefact_view_token = client.ArtefactViewToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_in` | `number` |  |
| `file` | `string` | Exact manifest path. |
| `organization_slug` | `string` | If provided, must match the organization addressed by the route. |
| `version` | `number` |  |
| `viewer_url` | `string` |  |

#### Example: Create

```ts
const artefact_view_token = await client.ArtefactViewToken().create({
  artefact_id: 'example_artefact_id',
  organization_id: 'example_organization_id',
})
```


### Artifact

Create an instance: `const artifact = client.Artifact()`

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
const artifact = await client.Artifact().load({ id: 'artifact_id' })
```

#### Example: List

```ts
const artifacts = await client.Artifact().list()
```

#### Example: Create

```ts
const artifact = await client.Artifact().create({
})
```


### ArtifactCacheNamespace

Create an instance: `const artifact_cache_namespace = client.ArtifactCacheNamespace()`

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
const artifact_cache_namespace = await client.ArtifactCacheNamespace().load({ id: 'artifact_cache_namespace_id' })
```

#### Example: List

```ts
const artifact_cache_namespaces = await client.ArtifactCacheNamespace().list()
```

#### Example: Create

```ts
const artifact_cache_namespace = await client.ArtifactCacheNamespace().create({
})
```


### ArtifactImageRepository

Create an instance: `const artifact_image_repository = client.ArtifactImageRepository()`

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
const artifact_image_repository = await client.ArtifactImageRepository().load({ id: 'artifact_image_repository_id' })
```

#### Example: List

```ts
const artifact_image_repositorys = await client.ArtifactImageRepository().list()
```

#### Example: Create

```ts
const artifact_image_repository = await client.ArtifactImageRepository().create({
})
```


### ArtifactPackageMirror

Create an instance: `const artifact_package_mirror = client.ArtifactPackageMirror()`

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
const artifact_package_mirror = await client.ArtifactPackageMirror().load({ id: 'artifact_package_mirror_id' })
```

#### Example: List

```ts
const artifact_package_mirrors = await client.ArtifactPackageMirror().list()
```

#### Example: Create

```ts
const artifact_package_mirror = await client.ArtifactPackageMirror().create({
})
```


### ArtifactRetentionPolicy

Create an instance: `const artifact_retention_policy = client.ArtifactRetentionPolicy()`

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
const artifact_retention_policy = await client.ArtifactRetentionPolicy().load({ id: 'artifact_retention_policy_id' })
```

#### Example: List

```ts
const artifact_retention_policys = await client.ArtifactRetentionPolicy().list()
```

#### Example: Create

```ts
const artifact_retention_policy = await client.ArtifactRetentionPolicy().create({
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


### AuditEvent

Create an instance: `const audit_event = client.AuditEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_user_id` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `id` | `string` |  |
| `observability_space_id` | `string | null` |  |
| `organization_id` | `string` |  |
| `payload` | `any` |  |
| `request_id` | `string | null` |  |
| `severity` | `string` |  |
| `subject_id` | `string` |  |
| `subject_kind` | `string` |  |
| `subject_name` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const audit_events = await client.AuditEvent().list({ organization_id: "example" })
```


### Auth

Create an instance: `const auth = client.Auth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |


### AuthCli

Create an instance: `const auth_cli = client.AuthCli()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AuthGithub

Create an instance: `const auth_github = client.AuthGithub()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthGoogle

Create an instance: `const auth_google = client.AuthGoogle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthOpenai

Create an instance: `const auth_openai = client.AuthOpenai()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthPasswordReset

Create an instance: `const auth_password_reset = client.AuthPasswordReset()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```ts
const auth_password_reset = await client.AuthPasswordReset().create({
  email: 'example_email',
})
```


### AuthRegistrationOption

Create an instance: `const auth_registration_option = client.AuthRegistrationOption()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_password_signup_enabled` | `boolean` |  |
| `openai_sign_in_enabled` | `boolean` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` | `string | null` |  |
| `waitlist_enabled` | `boolean` | New public signups require waitlist approval when enabled. |

#### Example: List

```ts
const auth_registration_options = await client.AuthRegistrationOption().list()
```


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


### BackendRunnerPool

Create an instance: `const backend_runner_pool = client.BackendRunnerPool()`

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
const backend_runner_pools = await client.BackendRunnerPool().list({ backend_id: "example" })
```

#### Example: Create

```ts
const backend_runner_pool = await client.BackendRunnerPool().create({
  backend_id: 'example_backend_id',
})
```


### Bazel

Create an instance: `const bazel = client.Bazel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### BazelActionResult

Create an instance: `const bazel_action_result = client.BazelActionResult()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const bazel_action_result = await client.BazelActionResult().load({ id: 'bazel_action_result_id', action_result_id: 'action_result_id' })
```


### BazelBackend

Create an instance: `const bazel_backend = client.BazelBackend()`

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
const bazel_backend = await client.BazelBackend().load({ id: 'bazel_backend_id' })
```

#### Example: List

```ts
const bazel_backends = await client.BazelBackend().list()
```

#### Example: Create

```ts
const bazel_backend = await client.BazelBackend().create({
})
```


### BazelBlob

Create an instance: `const bazel_blob = client.BazelBlob()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const bazel_blob = await client.BazelBlob().load({ id: 'bazel_blob_id', blob_id: 'blob_id', hash: 'hash' })
```


### BazelExecution

Create an instance: `const bazel_execution = client.BazelExecution()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const bazel_execution = await client.BazelExecution().load({ id: 'bazel_execution_id' })
```

#### Example: Create

```ts
const bazel_execution = await client.BazelExecution().create({
})
```


### BazelFindMissingBlob

Create an instance: `const bazel_find_missing_blob = client.BazelFindMissingBlob()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const bazel_find_missing_blob = await client.BazelFindMissingBlob().create({
})
```


### Billing

Create an instance: `const billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |

#### Example: Load

```ts
const billing = await client.Billing().load({ organization_id: 'organization_id' })
```


### BillingAddon

Create an instance: `const billing_addon = client.BillingAddon()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `quantity` | `number` |  |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |


### BillingBudget

Create an instance: `const billing_budget = client.BillingBudget()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `number | null` | Null clears the budget. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |


### BillingCheckoutSession

Create an instance: `const billing_checkout_session = client.BillingCheckoutSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cancel_url` | `string` |  |
| `coupon_code` | `string` |  |
| `entry_point` | `string` | Where the owner chose to pay, for product analytics. |
| `package_key` | `string` |  |
| `package_revision` | `number` |  |
| `success_url` | `string` |  |

#### Example: Create

```ts
const billing_checkout_session = await client.BillingCheckoutSession().create({
  organization_id: 'example_organization_id',
})
```


### BillingContact

Create an instance: `const billing_contact = client.BillingContact()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `billing_email` | `string` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |


### BillingExtraSpend

Create an instance: `const billing_extra_spend = client.BillingExtraSpend()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `enabled` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `number | null` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |


### BillingInvoice

Create an instance: `const billing_invoice = client.BillingInvoice()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_due_cents` | `number` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `hosted_invoice_url` | `string | null` |  |
| `id` | `string` |  |
| `invoice_pdf` | `string | null` |  |
| `metronome_invoice_id` | `string | null` | Metronome's id for the invoice it pushed |
| `number` | `string | null` |  |
| `period_ended_at` | `string | null` |  |
| `period_started_at` | `string | null` |  |
| `status` | `string` |  |
| `total_cents` | `number` |  |

#### Example: List

```ts
const billing_invoices = await client.BillingInvoice().list({ organization_id: "example" })
```


### BillingPackage

Create an instance: `const billing_package = client.BillingPackage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `base_price_cents` | `number` |  |
| `billing_interval` | `string` |  |
| `billing_policy` | `string` |  |
| `ci_included_spend_cents` | `number` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` | `string` |  |
| `key` | `string` |  |
| `max_seats` | `number | null` |  |
| `name` | `string` |  |
| `pay_as_you_go_enabled` | `boolean` |  |
| `rates` | `any[]` |  |
| `revision` | `number` |  |
| `roder_daily_run_limit` | `number` |  |
| `roder_run_concurrency_limit` | `number` |  |
| `seat_price_cents` | `number` |  |
| `trial_days` | `number` |  |
| `visibility` | `string` |  |

#### Example: List

```ts
const billing_packages = await client.BillingPackage().list()
```


### BillingPortalSession

Create an instance: `const billing_portal_session = client.BillingPortalSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `return_url` | `string` |  |

#### Example: Create

```ts
const billing_portal_session = await client.BillingPortalSession().create({
  organization_id: 'example_organization_id',
})
```


### BillingPrepaidPeriod

Create an instance: `const billing_prepaid_period = client.BillingPrepaidPeriod()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `string | null` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string | null` |  |
| `minutes` | `number` |  |
| `net_amount_cents` | `number` |  |
| `paid_at` | `string | null` |  |
| `paid_total_cents` | `number | null` |  |
| `payment_action_url` | `string | null` |  |
| `period_ended_at` | `string` |  |
| `period_started_at` | `string` |  |
| `receipt_url` | `string | null` |  |
| `refunded_net_cents` | `number` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const billing_prepaid_period = await client.BillingPrepaidPeriod().load({ id: 'billing_prepaid_period_id', organization_id: 'organization_id' })
```


### BillingPrepaidPurchase

Create an instance: `const billing_prepaid_purchase = client.BillingPrepaidPurchase()`

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
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string | null` |  |
| `minutes` | `number` |  |
| `net_amount_cents` | `number` |  |
| `paid_at` | `string | null` |  |
| `paid_total_cents` | `number | null` |  |
| `payment_action_url` | `string | null` |  |
| `prepaid` | `Record<string, any>` |  |
| `purchase` | `Record<string, any>` |  |
| `receipt_url` | `string | null` |  |
| `refunded_net_cents` | `number` |  |
| `request_key` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const billing_prepaid_purchase = await client.BillingPrepaidPurchase().load({ id: 'billing_prepaid_purchase_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const billing_prepaid_purchases = await client.BillingPrepaidPurchase().list({ organization_id: "example" })
```

#### Example: Create

```ts
const billing_prepaid_purchase = await client.BillingPrepaidPurchase().create({
  organization_id: 'example_organization_id',
  minutes: 1,
  request_key: 'example_request_key',
})
```


### BillingSubscription

Create an instance: `const billing_subscription = client.BillingSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `cancel_at_period_end` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |


### BillingTokenTopUp

Create an instance: `const billing_token_top_up = client.BillingTokenTopUp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_cents` | `number` |  |
| `request_key` | `string` |  |

#### Example: Create

```ts
const billing_token_top_up = await client.BillingTokenTopUp().create({
  organization_id: 'example_organization_id',
  amount_cents: 1,
  request_key: 'example_request_key',
})
```


### BillingUsage

Create an instance: `const billing_usage = client.BillingUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


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


### BookmarkProtectionRefreshGithubRequiredCheck

Create an instance: `const bookmark_protection_refresh_github_required_check = client.BookmarkProtectionRefreshGithubRequiredCheck()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exclusions` | `any[]` |  |
| `fetched_at` | `string | null` |  |
| `fetched_at_label` | `string | null` |  |
| `github_branch` | `string` |  |
| `github_owner` | `string | null` |  |
| `github_repository_name` | `string | null` |  |
| `last_error` | `string | null` |  |
| `proven` | `boolean` |  |
| `requirements` | `any[]` |  |
| `stale` | `boolean` |  |

#### Example: Create

```ts
const bookmark_protection_refresh_github_required_check = await client.BookmarkProtectionRefreshGithubRequiredCheck().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
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


### CacheNamespaceEntry

Create an instance: `const cache_namespace_entry = client.CacheNamespaceEntry()`

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
const cache_namespace_entry = await client.CacheNamespaceEntry().load({ id: 'cache_namespace_entry_id', cache_namespace_id: 'cache_namespace_id' })
```

#### Example: List

```ts
const cache_namespace_entrys = await client.CacheNamespaceEntry().list({ cache_namespace_id: "example" })
```

#### Example: Create

```ts
const cache_namespace_entry = await client.CacheNamespaceEntry().create({
  cache_namespace_id: 'example_cache_namespace_id',
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


### Change

Create an instance: `const change = client.Change()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `Record<string, any>` | Counts for each state across the active non-state filters. |
| `filters` | `Record<string, any>` |  |
| `github_sync` | `Record<string, any>` |  |
| `result` | `any` | What this page is a page of. |

#### Example: List

```ts
const changes = await client.Change().list({ organization_id: "example" })
```


### ChangeAsset

Create an instance: `const change_asset = client.ChangeAsset()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` |  |
| `byte_size` | `number` |  |
| `checksum_md5` | `string` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `filename` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```ts
const change_asset = await client.ChangeAsset().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  alias: 'example_alias',
  byte_size: 1,
  checksum_md5: 'example_checksum_md5',
  checksum_sha256: 'example_checksum_sha256',
  content_type: 'example_content_type',
  filename: 'example_filename',
})
```


### ChangeComment

Create an instance: `const change_comment = client.ChangeComment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `capabilities` | `Record<string, any>` |  |
| `change_id` | `string | null` |  |
| `created_at` | `string | null` |  |
| `created_at_label` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string | null` |  |
| `line` | `number | null` |  |
| `outdated` | `boolean` |  |
| `parent_comment_id` | `string | null` |  |
| `patchset_id` | `string | null` |  |
| `patchset_number` | `number | null` |  |
| `path` | `string | null` |  |
| `replies` | `any[]` |  |
| `resolved` | `boolean` |  |
| `resolved_at` | `string | null` |  |
| `resolved_at_label` | `string | null` |  |
| `resolved_by` | `Record<string, any>` |  |
| `side` | `string | null` |  |
| `updated_at` | `string | null` |  |
| `updated_at_label` | `string | null` |  |
| `user` | `Record<string, any>` |  |

#### Example: List

```ts
const change_comments = await client.ChangeComment().list({ change_id: "example", organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const change_comment = await client.ChangeComment().create({
  change_id: 'example_change_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  body: 'example_body',
})
```


### ChangeFileReviewCheckpoint

Create an instance: `const change_file_review_checkpoint = client.ChangeFileReviewCheckpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `patchset_id` | `string` |  |
| `path` | `string` |  |
| `request_id` | `string` |  |
| `review_action` | `string` |  |

#### Example: Create

```ts
const change_file_review_checkpoint = await client.ChangeFileReviewCheckpoint().create({
  change_id: 'example_change_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  patchset_id: 'example_patchset_id',
  path: 'example_path',
  request_id: 'example_request_id',
  review_action: 'example_review_action',
})
```


### ChangeGitBranchSubmission

Create an instance: `const change_git_branch_submission = client.ChangeGitBranchSubmission()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const change_git_branch_submission = await client.ChangeGitBranchSubmission().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### ChangeGitCommitIdentity

Create an instance: `const change_git_commit_identity = client.ChangeGitCommitIdentity()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `change_number` | `number` |  |
| `git_commit_id` | `string` |  |
| `git_commit_ids` | `any[]` |  |
| `id` | `string` |  |
| `identities` | `any[]` |  |
| `missing_git_commit_ids` | `any[]` |  |
| `patchset_number` | `number` |  |

#### Example: Load

```ts
const change_git_commit_identity = await client.ChangeGitCommitIdentity().load({ id: 'change_git_commit_identity_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: Create

```ts
const change_git_commit_identity = await client.ChangeGitCommitIdentity().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  git_commit_ids: [],
})
```


### ChangeGitPublication

Create an instance: `const change_git_publication = client.ChangeGitPublication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expected_target_commit_id` | `string` |  |
| `id` | `string` |  |
| `operation_key` | `string` |  |
| `publication_id` | `string` |  |
| `request` | `Record<string, any>` |  |
| `request_digest` | `string` |  |
| `revisions` | `any[]` |  |
| `status` | `string` |  |
| `transfer_refs` | `any[]` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

#### Example: Load

```ts
const change_git_publication = await client.ChangeGitPublication().load({ id: 'change_git_publication_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: Create

```ts
const change_git_publication = await client.ChangeGitPublication().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  operation_key: 'example_operation_key',
  request: {},
})
```


### ChangeGroupMember

Create an instance: `const change_group_member = client.ChangeGroupMember()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` | Change number |
| `changes` | `any[]` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |

#### Example: Create

```ts
const change_group_member = await client.ChangeGroupMember().create({
  change_group_id: 'example_change_group_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  change_id: 'example_change_id',
})
```


### ChangeLabel

Create an instance: `const change_label = client.ChangeLabel()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | `boolean` |  |
| `add` | `any[]` |  |
| `approval` | `Record<string, any>` |  |
| `assets` | `any[]` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | `any` | Human user summary or organization automation identity. |
| `capabilities` | `Record<string, any>` |  |
| `change_key` | `string` |  |
| `checks` | `any[]` |  |
| `checks_status` | `string` |  |
| `comments` | `any[]` |  |
| `comments_count` | `number` |  |
| `comments_count_label` | `string` |  |
| `commit_message` | `string | null` |  |
| `current_patchset` | `Record<string, any>` |  |
| `description` | `string | null` |  |
| `draft` | `boolean` |  |
| `folded_into_number` | `number | null` |  |
| `github_projection_status` | `string | null` |  |
| `github_pull_request` | `Record<string, any>` |  |
| `github_pull_requests` | `any[]` |  |
| `group` | `Record<string, any> | null` |  |
| `has_description` | `boolean` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` | `string` |  |
| `jj_change_id` | `string | null` |  |
| `labels` | `any[]` |  |
| `landable` | `boolean` |  |
| `landed_by` | `Record<string, any>` |  |
| `number` | `number` |  |
| `orphaned` | `boolean` |  |
| `orphaned_at` | `string` |  |
| `orphaned_at_label` | `string` |  |
| `orphaned_reason` | `string` |  |
| `parent_change_id` | `string | null` |  |
| `parent_change_number` | `number | null` |  |
| `patchset_number` | `number | null` |  |
| `patchsets` | `any[]` |  |
| `primary_status` | `string | null` |  |
| `public_id` | `string` |  |
| `relation_chain` | `any[]` |  |
| `remove` | `any[]` |  |
| `requested_changes` | `boolean` |  |
| `restack_state` | `string` |  |
| `reviewer_candidates` | `any[]` | Organization members available to the reviewer picker on this page. |
| `reviewers` | `any[]` |  |
| `stable_change_id` | `string` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `unresolved_comments_count_label` | `string` |  |
| `url` | `string` |  |
| `votes` | `any[]` |  |


### ChangeLandingHold

Create an instance: `const change_landing_hold = client.ChangeLandingHold()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ChangeLandingRequest

Create an instance: `const change_landing_request = client.ChangeLandingRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_ids` | `any[]` |  |
| `count` | `number` |  |
| `defer_until_ready` | `boolean` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` | `string` |  |
| `expected_scope_version` | `string` |  |
| `head_change_id` | `string` |  |
| `id` | `string | null` |  |
| `numbers` | `any[]` |  |
| `override_acknowledged` | `boolean` |  |
| `override_codes` | `any[]` |  |
| `position` | `number` |  |
| `priority` | `string` |  |
| `scope_version` | `string` |  |
| `state` | `string` |  |
| `version` | `number` |  |

#### Example: Create

```ts
const change_landing_request = await client.ChangeLandingRequest().create({
  change_id: 'example_change_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### ChangeRequestChange

Create an instance: `const change_request_change = client.ChangeRequestChange()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string | null` |  |

#### Example: Create

```ts
const change_request_change = await client.ChangeRequestChange().create({
  change_id: 'example_change_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### ChangeReviewer

Create an instance: `const change_reviewer = client.ChangeReviewer()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `any[]` |  |
| `email` | `string` |  |
| `name` | `string | null` |  |
| `remove` | `any[]` |  |
| `removed_reviewers` | `any[]` |  |
| `requested_reviewers` | `any[]` |  |
| `reviewers` | `any[]` |  |

#### Example: List

```ts
const change_reviewers = await client.ChangeReviewer().list({ change_id: "example", organization_id: "example", repo_id: "example" })
```


### ChangeTranscript

Create an instance: `const change_transcript = client.ChangeTranscript()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture_kind` | `string` |  |
| `captured_at` | `string` |  |
| `harness` | `Record<string, any>` |  |
| `id` | `string` |  |
| `original_resume` | `any` |  |
| `patchset_commit_id` | `string` |  |
| `patchset_number` | `number` |  |
| `redaction_count` | `number` |  |
| `session_id` | `string | null` |  |
| `session_title` | `string | null` |  |
| `status` | `string` |  |
| `superseded` | `boolean` |  |
| `user` | `Record<string, any>` |  |

#### Example: List

```ts
const change_transcripts = await client.ChangeTranscript().list({ change_id: "example", organization_id: "example", repo_id: "example" })
```


### ChangeTranscriptSummary

Create an instance: `const change_transcript_summary = client.ChangeTranscriptSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `summaries` | `Record<string, any>` |  |

#### Example: List

```ts
const change_transcript_summarys = await client.ChangeTranscriptSummary().list({ organization_id: "example", ids: "example" })
```


### CheckpointPrepareChunk

Create an instance: `const checkpoint_prepare_chunk = client.CheckpointPrepareChunk()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const checkpoint_prepare_chunk = await client.CheckpointPrepareChunk().create({
  agent_session_id: 'example_agent_session_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### CiNode

Create an instance: `const ci_node = client.CiNode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `string | null` |  |
| `bazel_enabled` | `boolean` |  |
| `bazel_properties_json` | `string | null` |  |
| `ci_runner_pool_id` | `string` |  |
| `cordoned_at` | `string | null` |  |
| `cordoned_at_label` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `health_state` | `string` |  |
| `heartbeat_age_seconds` | `number | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `labels_csv` | `string | null` |  |
| `last_seen_at` | `string | null` |  |
| `last_seen_at_label` | `string | null` |  |
| `name` | `string` |  |
| `network_peer_id` | `string | null` |  |
| `node_capabilities_csv` | `string | null` |  |
| `node_certificate_expires_at` | `string | null` |  |
| `node_certificate_expires_at_label` | `string | null` |  |
| `node_certificate_fingerprint_sha256` | `string | null` |  |
| `node_certificate_serial` | `string | null` |  |
| `offline_at` | `string | null` |  |
| `offline_at_label` | `string | null` |  |
| `online_at` | `string | null` |  |
| `online_at_label` | `string | null` |  |
| `organization_id` | `string` |  |
| `os` | `string | null` |  |
| `revoked_at` | `string | null` |  |
| `revoked_at_label` | `string | null` |  |
| `schedulable` | `boolean` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `version` | `string | null` |  |

#### Example: Load

```ts
const ci_node = await client.CiNode().load({ id: 'ci_node_id' })
```


### CiPipeline

Create an instance: `const ci_pipeline = client.CiPipeline()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ci_runner_pool_id` | `string | null` |  |
| `concurrency_key` | `string | null` |  |
| `created_at` | `string` |  |
| `default_branch` | `string | null` |  |
| `description` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string | null` |  |
| `required_capabilities_csv` | `string | null` |  |
| `runner_pool` | `Record<string, any> | null` |  |
| `runs` | `any[]` |  |
| `slug` | `string` |  |
| `source_kind` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_on_pull_request` | `boolean` |  |
| `trigger_on_push` | `boolean` |  |
| `trigger_on_schedule` | `boolean` |  |
| `updated_at` | `string` |  |
| `workflow_path` | `string | null` |  |

#### Example: Load

```ts
const ci_pipeline = await client.CiPipeline().load({ id: 'ci_pipeline_id' })
```

#### Example: List

```ts
const ci_pipelines = await client.CiPipeline().list()
```

#### Example: Create

```ts
const ci_pipeline = await client.CiPipeline().create({
})
```


### CiPipelineRun

Create an instance: `const ci_pipeline_run = client.CiPipelineRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `canceled_at` | `string | null` |  |
| `ci_pipeline_id` | `string` |  |
| `ci_runner_pool_id` | `string | null` |  |
| `commit_sha` | `string | null` |  |
| `concurrency_key` | `string | null` |  |
| `created_at` | `string` |  |
| `creator_user_id` | `string | null` |  |
| `display_id` | `number` |  |
| `failed` | `boolean` |  |
| `finished_at` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `jobs` | `any[]` |  |
| `message` | `string | null` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `parameters_json` | `string | null` |  |
| `queued_at` | `string | null` |  |
| `ref_name` | `string | null` |  |
| `repository_id` | `string | null` |  |
| `required_capabilities_csv` | `string | null` |  |
| `retry_number` | `number` |  |
| `retryable` | `boolean` |  |
| `slug` | `string` |  |
| `source_url` | `string | null` |  |
| `started_at` | `string | null` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const ci_pipeline_run = await client.CiPipelineRun().load({ id: 'ci_pipeline_run_id', pipeline_id: 'pipeline_id' })
```

#### Example: List

```ts
const ci_pipeline_runs = await client.CiPipelineRun().list({ pipeline_id: "example" })
```

#### Example: Create

```ts
const ci_pipeline_run = await client.CiPipelineRun().create({
  pipeline_id: 'example_pipeline_id',
})
```


### CiRunnerPool

Create an instance: `const ci_runner_pool = client.CiRunnerPool()`

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
| `bazel_enabled` | `boolean` |  |
| `bazel_properties_json` | `string | null` |  |
| `created_at` | `string` |  |
| `description` | `string | null` |  |
| `elastic_config_json` | `string | null` |  |
| `elastic_provider_kind` | `string | null` |  |
| `id` | `string` |  |
| `isolation_mode` | `string` |  |
| `labels_csv` | `string | null` |  |
| `max_concurrency` | `number` |  |
| `modal_capacity` | `Record<string, any>` |  |
| `modal_runner_invocations` | `any[]` |  |
| `name` | `string` |  |
| `network_space_id` | `string | null` |  |
| `node_capabilities_csv` | `string | null` |  |
| `organization_id` | `string` |  |
| `runner_count_label` | `string` |  |
| `runner_kind` | `string` |  |
| `runners` | `any[]` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const ci_runner_pool = await client.CiRunnerPool().load({ id: 'ci_runner_pool_id' })
```

#### Example: List

```ts
const ci_runner_pools = await client.CiRunnerPool().list()
```

#### Example: Create

```ts
const ci_runner_pool = await client.CiRunnerPool().create({
})
```


### CiStatus

Create an instance: `const ci_status = client.CiStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### CliEvent

Create an instance: `const cli_event = client.CliEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `properties` | `Record<string, any>` |  |

#### Example: Create

```ts
const cli_event = await client.CliEvent().create({
  event: 'example_event',
  properties: {},
})
```


### CliRelease

Create an instance: `const cli_release = client.CliRelease()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: List

```ts
const cli_releases = await client.CliRelease().list()
```

#### Example: Create

```ts
const cli_release = await client.CliRelease().create({
})
```


### CloudWorkspaceBackupObject

Create an instance: `const cloud_workspace_backup_object = client.CloudWorkspaceBackupObject()`

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
const cloud_workspace_backup_object = await client.CloudWorkspaceBackupObject().load({ id: 'cloud_workspace_backup_object_id', cloud_workspace_backup_id: 'cloud_workspace_backup_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### CodeRuleEvaluation

Create an instance: `const code_rule_evaluation = client.CodeRuleEvaluation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advisory` | `boolean` |  |
| `coverage` | `Record<string, any>` |  |
| `diff` | `string` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` | `number` |  |
| `evaluator_version` | `string` |  |
| `input_digest` | `string | null` |  |
| `limits` | `Record<string, any>` |  |
| `model` | `string` |  |
| `requests` | `Record<string, any>` |  |
| `schema_version` | `number` |  |
| `snapshot_digest` | `string | null` |  |
| `unchecked` | `any[]` |  |
| `verdicts` | `any[]` |  |

#### Example: Create

```ts
const code_rule_evaluation = await client.CodeRuleEvaluation().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  diff: 'example_diff',
})
```


### ComSiteAccess

Create an instance: `const com_site_access = client.ComSiteAccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ComSiteAccessSession

Create an instance: `const com_site_access_session = client.ComSiteAccessSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookie_name` | `string` |  |
| `host` | `string` | Site hostname, for example docs.acme.composal.page |
| `max_age` | `number` |  |
| `session_token` | `string` |  |

#### Example: Create

```ts
const com_site_access_session = await client.ComSiteAccessSession().create({
  host: 'example_host',
})
```


### CommentThreadComment

Create an instance: `const comment_thread_comment = client.CommentThreadComment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |

#### Example: Create

```ts
const comment_thread_comment = await client.CommentThreadComment().create({
  artefact_id: 'example_artefact_id',
  comment_thread_id: 'example_comment_thread_id',
  organization_id: 'example_organization_id',
  body: 'example_body',
})
```


### CommitDiff

Create an instance: `const commit_diff = client.CommitDiff()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `any[]` |  |
| `id` | `string` |  |
| `parent_id` | `string | null` |  |

#### Example: Load

```ts
const commit_diff = await client.CommitDiff().load({ id: 'commit_diff_id', commit_id: 'commit_id', organization_id: 'organization_id', repo_id: 'repo_id' })
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


### ContactSubmission

Create an instance: `const contact_submission = client.ContactSubmission()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `string | null` |  |
| `email` | `string` | Stored downcased and stripped. |
| `message` | `string` |  |
| `name` | `string` |  |
| `website` | `string | null` | Honeypot. |

#### Example: Create

```ts
const contact_submission = await client.ContactSubmission().create({
  email: 'example_email',
  message: 'example_message',
  name: 'example_name',
})
```


### ControlComputer

Create an instance: `const control_computer = client.ControlComputer()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `Record<string, any>` | A point-in-time control transport observation. |
| `consent` | `Record<string, any>` |  |
| `device` | `Record<string, any>` |  |
| `id` | `string` |  |
| `provider_status` | `any[]` |  |

#### Example: List

```ts
const control_computers = await client.ControlComputer().list({ organization_id: "example", persistent_agent_id: "example" })
```


### ControlComputerControlOperation

Create an instance: `const control_computer_control_operation = client.ControlComputerControlOperation()`

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
const control_computer_control_operation = await client.ControlComputerControlOperation().load({ id: 'control_computer_control_operation_id', control_computer_id: 'control_computer_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const control_computer_control_operation = await client.ControlComputerControlOperation().create({
  control_computer_id: 'example_control_computer_id',
  organization_id: 'example_organization_id',
  action: 'example_action',
  arguments: {},
  key: 'example_key',
})
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


### Deployment

Create an instance: `const deployment = client.Deployment()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Record<string, any>` |  |
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
| `history_kind` | `string` |  |
| `history_reason` | `string | null` |  |
| `id` | `string` |  |
| `is_live` | `boolean` |  |
| `is_rollback` | `boolean` |  |
| `live_region_count` | `number` |  |
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
| `status` | `string` |  |
| `total_replicas` | `number` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const deployment = await client.Deployment().load({ id: 'deployment_id', organization_id: 'organization_id' })
```


### DeploymentDashboardNomad

Create an instance: `const deployment_dashboard_nomad = client.DeploymentDashboardNomad()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentDetail

Create an instance: `const deployment_detail = client.DeploymentDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `any[]` |  |
| `app` | `any` |  |
| `app_id` | `string | null` |  |
| `audit_events` | `any[]` |  |
| `capacity` | `Record<string, any>` |  |
| `data_resources` | `any[]` |  |
| `deploy_targets` | `any[]` |  |
| `deployments` | `any[]` |  |
| `desired_states` | `any[]` |  |
| `environments` | `any[]` |  |
| `filters` | `Record<string, any>` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | `Record<string, any>` | The rolled-up state of the selected scope. |
| `nomad` | `Record<string, any>` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` | `any[]` |  |
| `placements` | `any[]` |  |
| `reconciler_ticks` | `any[]` |  |
| `releases` | `any[]` |  |
| `runtime_instances` | `any[]` |  |
| `service_bindings` | `any[]` |  |
| `service_views` | `any[]` |  |
| `storage_resources` | `any[]` |  |

#### Example: List

```ts
const deployment_details = await client.DeploymentDetail().list({ organization_id: "example" })
```


### DeploymentFile

Create an instance: `const deployment_file = client.DeploymentFile()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DeploymentLog

Create an instance: `const deployment_log = client.DeploymentLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `app_environment_id` | `string | null` |  |
| `app_release_id` | `string | null` |  |
| `app_service_id` | `string | null` |  |
| `details` | `any` |  |
| `environment_name` | `string` |  |
| `release_version` | `string | null` |  |
| `service_name` | `string` |  |
| `status` | `string` |  |
| `task` | `string | null` |  |
| `unreachable_reason` | `string | null` |  |

#### Example: List

```ts
const deployment_logs = await client.DeploymentLog().list({ organization_id: "example" })
```


### DeploymentMetric

Create an instance: `const deployment_metric = client.DeploymentMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `boolean` |  |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `placement_id` | `string` |  |
| `redeploy` | `boolean` |  |
| `region_count` | `number` |  |
| `replicas_per_region` | `number` |  |
| `rollout_strategy` | `string` |  |
| `service_id` | `string` |  |
| `service_name` | `string` |  |
| `source_ref` | `string | null` |  |

#### Example: List

```ts
const deployment_metrics = await client.DeploymentMetric().list({ organization_id: "example" })
```


### DeploymentPreview

Create an instance: `const deployment_preview = client.DeploymentPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` |  |
| `app_environment_id` | `string` |  |
| `app_name` | `string` |  |
| `app_preview_profile_id` | `string` |  |
| `app_slug` | `string` |  |
| `change_number` | `number | null` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string` |  |
| `expires_at` | `string` |  |
| `generation` | `number` |  |
| `health` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_operation_status` | `string | null` |  |
| `name` | `string` |  |
| `owner_name` | `string | null` |  |
| `profile_name` | `string` |  |
| `resource_overrides` | `Record<string, any>` | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` |  |
| `slug` | `string` |  |
| `snapshot_version` | `number` |  |
| `source_revision` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `urls` | `any[]` |  |
| `vcs_change_id` | `string | null` |  |

#### Example: List

```ts
const deployment_previews = await client.DeploymentPreview().list({ organization_id: "example" })
```


### DeploymentSetting

Create an instance: `const deployment_setting = client.DeploymentSetting()`

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
const deployment_settings = await client.DeploymentSetting().list({ organization_id: "example" })
```


### DesktopLocalAgentModel

Create an instance: `const desktop_local_agent_model = client.DesktopLocalAgentModel()`

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
const desktop_local_agent_models = await client.DesktopLocalAgentModel().list({ organization_id: "example" })
```


### DesktopLocalAgentResponse

Create an instance: `const desktop_local_agent_response = client.DesktopLocalAgentResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `any[]` |  |
| `max_output_tokens` | `number` |  |
| `model` | `string` |  |
| `store` | `boolean` |  |
| `stream` | `boolean` |  |

#### Example: Create

```ts
const desktop_local_agent_response = await client.DesktopLocalAgentResponse().create({
  organization_id: 'example_organization_id',
  input: [],
  model: 'example_model',
  store: true,
  stream: true,
})
```


### Device

Create an instance: `const device = client.Device()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `string` |  |
| `channel` | `string` |  |
| `coding_connection` | `Record<string, any> | null` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | `string | null` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | `string` | Display-only native presence. |
| `control_delivery_policy` | `Record<string, any>` |  |
| `control_spawn_policy` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `device` | `Record<string, any>` |  |
| `environment` | `string` |  |
| `execution_available` | `boolean` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `native_device_id` | `string` |  |
| `paired_at` | `string` |  |
| `pairing_generation` | `number` |  |
| `platform` | `string` |  |
| `project_visibility` | `Record<string, any>` | Folder discovery and new-thread selection. |
| `provider_status` | `any[]` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` | `string | null` |  |
| `scheduled_check_ins` | `boolean` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | `string` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

#### Example: Load

```ts
const device = await client.Device().load({ id: 'device_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const devices = await client.Device().list({ organization_id: "example" })
```


### DeviceBrowserOperation

Create an instance: `const device_browser_operation = client.DeviceBrowserOperation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `string` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `created_at` | `string` |  |
| `id` | `string` |  |

#### Example: List

```ts
const device_browser_operations = await client.DeviceBrowserOperation().list({ device_id: "example", organization_id: "example" })
```


### DeviceControlMessage

Create an instance: `const device_control_message = client.DeviceControlMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `agent_name` | `string` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `sender` | `string | null` |  |
| `text` | `string | null` |  |
| `text_omitted` | `boolean` |  |
| `thread` | `Record<string, any>` |  |

#### Example: List

```ts
const device_control_messages = await client.DeviceControlMessage().list({ device_id: "example", organization_id: "example" })
```


### DeviceControlOperation

Create an instance: `const device_control_operation = client.DeviceControlOperation()`

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
const device_control_operation = await client.DeviceControlOperation().load({ id: 'device_control_operation_id', device_id: 'device_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const device_control_operation = await client.DeviceControlOperation().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  action: 'example_action',
  arguments: {},
  key: 'example_key',
})
```


### DeviceEnterpriseRelay

Create an instance: `const device_enterprise_relay = client.DeviceEnterpriseRelay()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const device_enterprise_relays = await client.DeviceEnterpriseRelay().list()
```


### DeviceFolderListing

Create an instance: `const device_folder_listing = client.DeviceFolderListing()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `error` | `string` |  |
| `folders` | `any[]` |  |
| `id` | `string` |  |
| `key` | `string` | Stable idempotency key for this listing. |
| `parent` | `string | null` |  |
| `path` | `string` | The resolved folder. |
| `state` | `string` |  |
| `truncated` | `boolean` |  |

#### Example: Load

```ts
const device_folder_listing = await client.DeviceFolderListing().load({ id: 'device_folder_listing_id', device_id: 'device_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const device_folder_listing = await client.DeviceFolderListing().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  key: 'example_key',
  path: 'example_path',
})
```


### DeviceGrant

Create an instance: `const device_grant = client.DeviceGrant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_grants` | `any[]` |  |
| `agent_choices` | `any[]` | Eligible picker choices, with current owner grant targets, on the first page only. |
| `agent_id` | `string` |  |
| `all_agents_access` | `boolean` | Whether every agent the owner can use may use this computer for the owner's messages, including agents added later. |
| `capabilities` | `any[]` |  |
| `execution_available` | `boolean` |  |
| `grants` | `any[]` |  |
| `id` | `string` |  |
| `next_cursor` | `string | null` |  |
| `principal_id` | `string` |  |

#### Example: List

```ts
const device_grants = await client.DeviceGrant().list({ device_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const device_grant = await client.DeviceGrant().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  agent_id: 'example_agent_id',
  capabilities: [],
  principal_id: 'example_principal_id',
})
```


### DeviceInvocation

Create an instance: `const device_invocation = client.DeviceInvocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### DeviceLocalEvent

Create an instance: `const device_local_event = client.DeviceLocalEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `recorded` | `boolean` |  |

#### Example: Create

```ts
const device_local_event = await client.DeviceLocalEvent().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  event: 'example_event',
})
```


### DevicePairing

Create an instance: `const device_pairing = client.DevicePairing()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `string` |  |
| `channel` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `string` |  |
| `public_key` | `string` |  |

#### Example: Create

```ts
const device_pairing = await client.DevicePairing().create({
  organization_id: 'example_organization_id',
  architecture: 'example_architecture',
  channel: 'example_channel',
  name: 'example_name',
  platform: 'example_platform',
  public_key: 'example_public_key',
})
```


### DeviceProject

Create an instance: `const device_project = client.DeviceProject()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### DeviceScheduledCheckIn

Create an instance: `const device_scheduled_check_in = client.DeviceScheduledCheckIn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` |  |

#### Example: Create

```ts
const device_scheduled_check_in = await client.DeviceScheduledCheckIn().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  enabled: true,
})
```


### DockerBuilder

Create an instance: `const docker_builder = client.DockerBuilder()`

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
| `backend` | `string` |  |
| `created_at` | `string | null` |  |
| `gateway_url` | `string | null` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `number` |  |
| `id` | `string` |  |
| `last_activity_at` | `string | null` |  |
| `organization_id` | `string` |  |
| `ready_at` | `string | null` |  |
| `slept_at` | `string | null` |  |
| `slug` | `string` |  |
| `startup_attempt` | `number` |  |
| `startup_failure` | `string | null` | Safe failure reason for the most recent startup attempt |
| `startup_stage` | `string | null` |  |
| `status` | `string` |  |
| `updated_at` | `string | null` |  |

#### Example: Load

```ts
const docker_builder = await client.DockerBuilder().load({ id: 'docker_builder_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const docker_builders = await client.DockerBuilder().list({ organization_id: "example" })
```

#### Example: Create

```ts
const docker_builder = await client.DockerBuilder().create({
  organization_id: 'example_organization_id',
})
```


### DockerBuilderSession

Create an instance: `const docker_builder_session = client.DockerBuilderSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `docker_builder_id` | `string` |  |
| `expires_at` | `string` |  |
| `gateway_url` | `string | null` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `number` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revoked_at` | `string | null` |  |
| `user_id` | `string` |  |

#### Example: Load

```ts
const docker_builder_session = await client.DockerBuilderSession().load({ id: 'docker_builder_session_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const docker_builder_session = await client.DockerBuilderSession().create({
  docker_builder_id: 'example_docker_builder_id',
  organization_id: 'example_organization_id',
})
```


### DockerBuilderSetting

Create an instance: `const docker_builder_setting = client.DockerBuilderSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `docker_builder_settings` | `Record<string, any>` |  |
| `idle_timeout_seconds` | `number` |  |
| `max_concurrency` | `number` |  |
| `organization_id` | `string` |  |
| `region` | `string` |  |
| `runtime_timeout_seconds` | `number` |  |

#### Example: List

```ts
const docker_builder_settings = await client.DockerBuilderSetting().list({ organization_id: "example" })
```


### DomainDnsIntegration

Create an instance: `const domain_dns_integration = client.DomainDnsIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_label` | `string | null` |  |
| `api_token` | `string` |  |
| `created_at` | `string` |  |
| `failure_message` | `string | null` |  |
| `has_token` | `boolean` |  |
| `id` | `string` |  |
| `last_verified_at` | `string | null` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```ts
const domain_dns_integrations = await client.DomainDnsIntegration().list({ organization_id: "example" })
```

#### Example: Create

```ts
const domain_dns_integration = await client.DomainDnsIntegration().create({
  organization_id: 'example_organization_id',
  api_token: 'example_api_token',
})
```


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


### Edge

Create an instance: `const edge = client.Edge()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### EmailVerification

Create an instance: `const email_verification = client.EmailVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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


### ExecutionDesiredState

Create an instance: `const execution_desired_state = client.ExecutionDesiredState()`

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
| `desired_state` | `Record<string, any>` |  |
| `id` | `string` |  |
| `stop_observed` | `boolean` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

#### Example: Load

```ts
const execution_desired_state = await client.ExecutionDesiredState().load({ id: 'execution_desired_state_id' })
```

#### Example: List

```ts
const execution_desired_states = await client.ExecutionDesiredState().list()
```

#### Example: Create

```ts
const execution_desired_state = await client.ExecutionDesiredState().create({
})
```


### ExecutionReconcilerTick

Create an instance: `const execution_reconciler_tick = client.ExecutionReconcilerTick()`

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
const execution_reconciler_tick = await client.ExecutionReconcilerTick().load({ id: 'execution_reconciler_tick_id' })
```

#### Example: List

```ts
const execution_reconciler_ticks = await client.ExecutionReconcilerTick().list()
```

#### Example: Create

```ts
const execution_reconciler_tick = await client.ExecutionReconcilerTick().create({
})
```


### ExecutionRelease

Create an instance: `const execution_release = client.ExecutionRelease()`

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
const execution_release = await client.ExecutionRelease().load({ id: 'execution_release_id' })
```

#### Example: List

```ts
const execution_releases = await client.ExecutionRelease().list()
```

#### Example: Create

```ts
const execution_release = await client.ExecutionRelease().create({
})
```


### ExecutionRuntimeInstance

Create an instance: `const execution_runtime_instance = client.ExecutionRuntimeInstance()`

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
| `adapter_kind` | `string` |  |
| `app_environment_id` | `string` |  |
| `app_release_id` | `string | null` |  |
| `app_service_id` | `string` |  |
| `booted_at` | `string | null` |  |
| `booted_at_label` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `instance_key` | `string` |  |
| `last_reconciled_at` | `string | null` |  |
| `last_reconciled_at_label` | `string | null` |  |
| `last_seen_at` | `string | null` |  |
| `last_seen_at_label` | `string | null` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `network_peer_id` | `string | null` |  |
| `nomad_allocation_id` | `string | null` |  |
| `nomad_task_name` | `string | null` |  |
| `organization_id` | `string` |  |
| `private_ipv4` | `string | null` |  |
| `private_ipv6` | `string | null` |  |
| `provider_instance_id` | `string | null` |  |
| `public_endpoint` | `string | null` |  |
| `service_name` | `string` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `terminated_at` | `string | null` |  |
| `terminated_at_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const execution_runtime_instance = await client.ExecutionRuntimeInstance().load({ id: 'execution_runtime_instance_id' })
```

#### Example: List

```ts
const execution_runtime_instances = await client.ExecutionRuntimeInstance().list()
```

#### Example: Create

```ts
const execution_runtime_instance = await client.ExecutionRuntimeInstance().create({
})
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


### Gh

Create an instance: `const gh = client.Gh()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Record<string, any>` |  |
| `content` | `Record<string, any>` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `Record<string, any> | null` |  |
| `pull_request` | `any` |  |
| `stack` | `Record<string, any>` |  |
| `transcript_paths` | `any[]` |  |

#### Example: Load

```ts
const gh = await client.Gh().load({ id: 'gh_id', gh_id: 'gh_id', github_repo: 'github_repo', organization_id: 'organization_id' })
```


### GitImport

Create an instance: `const git_import = client.GitImport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destination_mode` | `string` |  |
| `error` | `string | null` |  |
| `git_default_branch` | `string` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` | `string` |  |
| `git_url` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `name` | `string` |  |
| `native_status` | `string` |  |
| `organization` | `string` |  |
| `repository_id` | `string | null` |  |
| `root_path` | `string` |  |
| `slug` | `string` |  |
| `source_branch` | `string` |  |
| `target_branch` | `string` |  |

#### Example: Load

```ts
const git_import = await client.GitImport().load({ id: 'git_import_id' })
```

#### Example: Create

```ts
const git_import = await client.GitImport().create({
  organization_id: 'example_organization_id',
  destination_mode: 'example_destination_mode',
  idempotency_key: 'example_idempotency_key',
  root_path: 'example_root_path',
  slug: 'example_slug',
  source_branch: 'example_source_branch',
})
```


### Github

Create an instance: `const github = client.Github()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GithubApp

Create an instance: `const github_app = client.GithubApp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### GithubAppImportableRepository

Create an instance: `const github_app_importable_repository = client.GithubAppImportableRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `next_page` | `number | null` | Next GitHub page for this installation |
| `repositories` | `any[]` |  |

#### Example: List

```ts
const github_app_importable_repositorys = await client.GithubAppImportableRepository().list()
```


### GithubAppInstallation

Create an instance: `const github_app_installation = client.GithubAppInstallation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string | null` |  |
| `account_id` | `string | null` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string | null` |  |
| `installed_at_label` | `string | null` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `any[]` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Record<string, any>` |  |
| `status` | `string` |  |
| `suspended_at` | `string | null` |  |
| `suspended_at_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const github_app_installations = await client.GithubAppInstallation().list({ organization_id: "example" })
```


### GithubAppInstallationAuthorization

Create an instance: `const github_app_installation_authorization = client.GithubAppInstallationAuthorization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `installation_url` | `string` |  |
| `organization_slug` | `string` | Vex organization slug whose installation will be linked. |
| `return_target` | `string` | Server-validated Vex application target used after verification. |

#### Example: Create

```ts
const github_app_installation_authorization = await client.GithubAppInstallationAuthorization().create({
  organization_slug: 'example_organization_slug',
  return_target: 'example_return_target',
})
```


### GithubAppUserAuthorization

Create an instance: `const github_app_user_authorization = client.GithubAppUserAuthorization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const github_app_user_authorization = await client.GithubAppUserAuthorization().create({
})
```


### GithubCiRepository

Create an instance: `const github_ci_repository = client.GithubCiRepository()`

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
| `adoption_mode` | `string` |  |
| `check_name_prefix` | `string` |  |
| `ci_runner_pool_id` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `default_branch` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `id` | `string` |  |
| `last_compatibility_status` | `string | null` |  |
| `last_error_message` | `string | null` |  |
| `last_head_sha` | `string | null` |  |
| `last_pull_request_number` | `number | null` |  |
| `last_ref` | `string | null` |  |
| `last_webhook_action` | `string | null` |  |
| `last_webhook_at` | `string | null` |  |
| `last_webhook_at_label` | `string | null` |  |
| `last_webhook_delivery_id` | `string | null` |  |
| `last_webhook_event` | `string | null` |  |
| `metadata` | `Record<string, any>` |  |
| `organization_id` | `string` |  |
| `permission_status` | `string` |  |
| `repository_full_name` | `string` |  |
| `repository_name` | `string` |  |
| `repository_owner` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `webhook_delivery_count` | `number` |  |

#### Example: Load

```ts
const github_ci_repository = await client.GithubCiRepository().load({ id: 'github_ci_repository_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const github_ci_repositorys = await client.GithubCiRepository().list({ organization_id: "example" })
```

#### Example: Create

```ts
const github_ci_repository = await client.GithubCiRepository().create({
  organization_id: 'example_organization_id',
  github_app_installation_id: 'example_github_app_installation_id',
  github_repository_id: 'example_github_repository_id',
  repository_name: 'example_repository_name',
  repository_owner: 'example_repository_owner',
})
```


### GithubCiRepositoryCompatibilityReport

Create an instance: `const github_ci_repository_compatibility_report = client.GithubCiRepositoryCompatibilityReport()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `string` |  |
| `analyzed_at_label` | `string | null` |  |
| `ci_pipeline_id` | `string | null` |  |
| `ci_pipeline_run_id` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `diagnostics` | `any[]` |  |
| `errors` | `any[]` |  |
| `event_action` | `string | null` |  |
| `event_name` | `string` |  |
| `execution_allowed` | `boolean` |  |
| `github_ci_repository_id` | `string` |  |
| `head_sha` | `string | null` |  |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` |  |
| `organization_id` | `string` |  |
| `parser_version` | `string` |  |
| `pull_request_number` | `number | null` |  |
| `ref_name` | `string | null` |  |
| `referenced_actions` | `any[]` |  |
| `required_secrets` | `any[]` |  |
| `runner_labels` | `any[]` |  |
| `source_blob_sha` | `string | null` |  |
| `source_sha` | `string` |  |
| `status` | `string` |  |
| `supported_features` | `Record<string, any>` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `warnings` | `any[]` |  |
| `workflow_name` | `string | null` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```ts
const github_ci_repository_compatibility_report = await client.GithubCiRepositoryCompatibilityReport().load({ id: 'github_ci_repository_compatibility_report_id', github_ci_repository_id: 'github_ci_repository_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const github_ci_repository_compatibility_reports = await client.GithubCiRepositoryCompatibilityReport().list({ github_ci_repository_id: "example", organization_id: "example" })
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


### GithubIntegration

Create an instance: `const github_integration = client.GithubIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string | null` |  |
| `account_login` | `string` |  |
| `connection_status` | `string` |  |
| `connection_status_label` | `string` |  |
| `github_installation` | `any` |  |
| `health` | `Record<string, any>` |  |
| `id` | `string` |  |
| `imported_repositories_count` | `number` |  |
| `imported_repositories_count_label` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `pagination` | `Record<string, any>` |  |
| `repositories` | `any[]` |  |

#### Example: Load

```ts
const github_integration = await client.GithubIntegration().load({ id: 'github_integration_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const github_integrations = await client.GithubIntegration().list({ organization_id: "example" })
```


### GithubOnboarding

Create an instance: `const github_onboarding = client.GithubOnboarding()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `any[]` |  |
| `active_batch_id` | `string | null` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` | `any[]` |  |
| `capabilities` | `Record<string, any>` |  |
| `installations` | `any[]` |  |

#### Example: Load

```ts
const github_onboarding = await client.GithubOnboarding().load({ organization_id: 'organization_id' })
```


### GithubOnboardingBranch

Create an instance: `const github_onboarding_branch = client.GithubOnboardingBranch()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `any[]` |  |

#### Example: List

```ts
const github_onboarding_branchs = await client.GithubOnboardingBranch().list({ organization_id: "example", github_app_installation_id: "example", name: "example", owner: "example" })
```


### GithubOnboardingImport

Create an instance: `const github_onboarding_import = client.GithubOnboardingImport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `complete` | `boolean` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `string` |  |
| `failed_item_count` | `number` |  |
| `github_app_installation_id` | `string` |  |
| `id` | `string` |  |
| `imported_item_count` | `number` |  |
| `item_count` | `number` |  |
| `items` | `any[]` |  |
| `repositories` | `any` |  |
| `status` | `string` |  |
| `terminal_item_count` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Create

```ts
const github_onboarding_import = await client.GithubOnboardingImport().create({
  organization_id: 'example_organization_id',
  github_app_installation_id: 'example_github_app_installation_id',
  repositories: 'example_repositories',
})
```


### GithubOnboardingImportBatch

Create an instance: `const github_onboarding_import_batch = client.GithubOnboardingImportBatch()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `complete` | `boolean` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `string` |  |
| `failed_item_count` | `number` |  |
| `github_app_installation_id` | `string` |  |
| `id` | `string` |  |
| `imported_item_count` | `number` |  |
| `item_count` | `number` |  |
| `items` | `any[]` |  |
| `status` | `string` |  |
| `terminal_item_count` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const github_onboarding_import_batch = await client.GithubOnboardingImportBatch().load({ id: 'github_onboarding_import_batch_id', organization_id: 'organization_id' })
```


### GithubOnboardingImportItem

Create an instance: `const github_onboarding_import_item = client.GithubOnboardingImportItem()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GithubPullRequest

Create an instance: `const github_pull_request = client.GithubPullRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Record<string, any>` |  |
| `content` | `Record<string, any>` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `Record<string, any> | null` |  |
| `pull_request` | `any` |  |
| `stack` | `Record<string, any>` |  |
| `transcript_paths` | `any[]` |  |

#### Example: Load

```ts
const github_pull_request = await client.GithubPullRequest().load({ id: 'github_pull_request_id', organization_id: 'organization_id', pull_request_id: 'pull_request_id' })
```


### GithubRunnerAdmission

Create an instance: `const github_runner_admission = client.GithubRunnerAdmission()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const github_runner_admission = await client.GithubRunnerAdmission().create({
})
```


### GithubRunnerCache

Create an instance: `const github_runner_cache = client.GithubRunnerCache()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `entry_id` | `string` |  |
| `key` | `string` |  |
| `matched_key` | `string` |  |
| `ok` | `boolean` |  |
| `operation` | `string` |  |
| `restore_keys` | `any[]` |  |
| `signed_download_url` | `string` |  |
| `size_bytes` | `string` |  |
| `upload_path` | `string` |  |
| `version` | `string` |  |

#### Example: Create

```ts
const github_runner_cache = await client.GithubRunnerCache().create({
  operation: 'example_operation',
})
```


### GithubRunnerEgress

Create an instance: `const github_runner_egress = client.GithubRunnerEgress()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_request` | `boolean` |  |
| `cidr` | `string | null` |  |
| `ipv4` | `string | null` |  |
| `requested_at_label` | `string | null` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const github_runner_egress = await client.GithubRunnerEgress().load({ organization_id: 'organization_id' })
```

#### Example: Create

```ts
const github_runner_egress = await client.GithubRunnerEgress().create({
  organization_id: 'example_organization_id',
})
```


### GithubRunnerHistory

Create an instance: `const github_runner_history = client.GithubRunnerHistory()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `any[]` |  |
| `counts` | `Record<string, any>` |  |
| `observed_at` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `repositories` | `any[]` |  |
| `runs` | `any[]` |  |
| `setup` | `any` | CI onboarding. |
| `success_rate` | `number | null` |  |
| `usage` | `Record<string, any>` |  |

#### Example: Load

```ts
const github_runner_history = await client.GithubRunnerHistory().load({ organization_id: 'organization_id' })
```


### GithubRunnerImage

Create an instance: `const github_runner_image = client.GithubRunnerImage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `image_reference` | `string` | Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+ |
| `last_error` | `string | null` |  |
| `modal_image_id` | `string | null` |  |
| `name` | `string` |  |
| `registry_secret_name` | `string | null` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const github_runner_image = await client.GithubRunnerImage().load({ id: 'github_runner_image_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const github_runner_images = await client.GithubRunnerImage().list({ organization_id: "example" })
```

#### Example: Create

```ts
const github_runner_image = await client.GithubRunnerImage().create({
  organization_id: 'example_organization_id',
  image_reference: 'example_image_reference',
  name: 'example_name',
})
```


### GithubRunnerPool

Create an instance: `const github_runner_pool = client.GithubRunnerPool()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_millicores` | `number` |  |
| `enabled` | `boolean` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `github_runner_image` | `any` |  |
| `id` | `string` |  |
| `image` | `string | null` | Organization image name or ID; null restores the standard image |
| `invocations` | `any[]` |  |
| `label` | `string` |  |
| `last_error` | `string | null` |  |
| `last_polled_at` | `string | null` |  |
| `max_concurrency` | `number` |  |
| `memory_mb` | `number` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `repository_full_name` | `string` |  |
| `runtime_kind` | `string` |  |
| `timeout_seconds` | `number` |  |

#### Example: List

```ts
const github_runner_pools = await client.GithubRunnerPool().list({ organization_id: "example" })
```

#### Example: Create

```ts
const github_runner_pool = await client.GithubRunnerPool().create({
  organization_id: 'example_organization_id',
  github_app_installation_id: 'example_github_app_installation_id',
  repository_full_name: 'example_repository_full_name',
})
```


### GithubRunnerSetup

Create an instance: `const github_runner_setup = client.GithubRunnerSetup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string | null` |  |
| `github_repository_connection_id` | `string` |  |
| `id` | `string` |  |
| `pull_request_url` | `string | null` |  |
| `repository_full_name` | `string` |  |
| `roder_thread_id` | `string | null` |  |
| `runner_labels` | `any[]` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `summary` | `string | null` |  |

#### Example: Load

```ts
const github_runner_setup = await client.GithubRunnerSetup().load({ id: 'github_runner_setup_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const github_runner_setup = await client.GithubRunnerSetup().create({
  organization_id: 'example_organization_id',
  github_repository_connection_id: 'example_github_repository_connection_id',
})
```


### Gitlab

Create an instance: `const gitlab = client.Gitlab()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `boolean` |  |
| `connections` | `any[]` |  |
| `integrations` | `any[]` |  |
| `inventory_error` | `string | null` |  |
| `next_page` | `number | null` |  |
| `organization` | `Record<string, any>` |  |
| `projects` | `any[]` |  |
| `redirect_uri` | `string | null` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` | `string | null` |  |

#### Example: Load

```ts
const gitlab = await client.Gitlab().load({ organization_id: 'organization_id' })
```


### GitlabConnection

Create an instance: `const gitlab_connection = client.GitlabConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GitlabImport

Create an instance: `const gitlab_import = client.GitlabImport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `integration_id` | `string` |  |
| `project_id` | `number` |  |
| `repo_slug` | `string` |  |
| `source_branch` | `string` |  |

#### Example: Create

```ts
const gitlab_import = await client.GitlabImport().create({
  organization_id: 'example_organization_id',
  integration_id: 'example_integration_id',
  project_id: 1,
})
```


### GitlabOauth

Create an instance: `const gitlab_oauth = client.GitlabOauth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GrantAllAgent

Create an instance: `const grant_all_agent = client.GrantAllAgent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `all_agents_access` | `boolean` |  |
| `enabled` | `boolean` |  |
| `execution_available` | `boolean` |  |

#### Example: Create

```ts
const grant_all_agent = await client.GrantAllAgent().create({
  device_id: 'example_device_id',
  organization_id: 'example_organization_id',
  enabled: true,
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


### IdentityOrganization

Create an instance: `const identity_organization = client.IdentityOrganization()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### ImageRepositoryTag

Create an instance: `const image_repository_tag = client.ImageRepositoryTag()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image_repository` | `Record<string, any>` |  |
| `name` | `string` |  |
| `registry_url` | `string` |  |
| `tags` | `any[]` |  |

#### Example: List

```ts
const image_repository_tags = await client.ImageRepositoryTag().list({ image_repository_id: "example" })
```


### ImportBranchPolicy

Create an instance: `const import_branch_policy = client.ImportBranchPolicy()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `boolean` |  |
| `can_manage_sandbox_region` | `boolean` |  |
| `dedicated_outbound_ip_addresses` | `any[]` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `sandbox_regions` | `any[]` |  |

#### Example: Load

```ts
const import_branch_policy = await client.ImportBranchPolicy().load({ organization_id: 'organization_id' })
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


### InvocationControl

Create an instance: `const invocation_control = client.InvocationControl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### JobLogChunk

Create an instance: `const job_log_chunk = client.JobLogChunk()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `number` |  |
| `ci_job_id` | `string | null` |  |
| `ci_pipeline_run_id` | `string | null` |  |
| `ci_step_id` | `string | null` |  |
| `content` | `string` |  |
| `content_format` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `sequence_number` | `number` |  |
| `stream` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```ts
const job_log_chunks = await client.JobLogChunk().list({ job_id: "example", pipeline_id: "example", run_id: "example" })
```

#### Example: Create

```ts
const job_log_chunk = await client.JobLogChunk().create({
  job_id: 'example_job_id',
  pipeline_id: 'example_pipeline_id',
  run_id: 'example_run_id',
})
```


### JobStep

Create an instance: `const job_step = client.JobStep()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const job_steps = await client.JobStep().list({ job_id: "example", pipeline_id: "example", run_id: "example" })
```

#### Example: Create

```ts
const job_step = await client.JobStep().create({
  job_id: 'example_job_id',
  pipeline_id: 'example_pipeline_id',
  run_id: 'example_run_id',
})
```


### JobWorkspace

Create an instance: `const job_workspace = client.JobWorkspace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const job_workspaces = await client.JobWorkspace().list({ job_id: "example", pipeline_id: "example", run_id: "example" })
```

#### Example: Create

```ts
const job_workspace = await client.JobWorkspace().create({
  job_id: 'example_job_id',
  pipeline_id: 'example_pipeline_id',
  run_id: 'example_run_id',
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


### Known

Create an instance: `const known = client.Known()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Label

Create an instance: `const label = client.Label()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes_count` | `number` |  |
| `id` | `string` |  |
| `name` | `string` | Display name |
| `slug` | `string` | Normalized identity used for filtering and lookup. |

#### Example: List

```ts
const labels = await client.Label().list({ organization_id: "example" })
```


### LeaseArtifact

Create an instance: `const lease_artifact = client.LeaseArtifact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const lease_artifact = await client.LeaseArtifact().create({
  lease_id: 'example_lease_id',
  node_id: 'example_node_id',
})
```


### LeaseCache

Create an instance: `const lease_cache = client.LeaseCache()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### LeaseLogChunk

Create an instance: `const lease_log_chunk = client.LeaseLogChunk()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const lease_log_chunk = await client.LeaseLogChunk().create({
  lease_id: 'example_lease_id',
  node_id: 'example_node_id',
})
```


### LeaseReconciliation

Create an instance: `const lease_reconciliation = client.LeaseReconciliation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseStep

Create an instance: `const lease_step = client.LeaseStep()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseVerifyDiagnostic

Create an instance: `const lease_verify_diagnostic = client.LeaseVerifyDiagnostic()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_events` | `Record<string, any>` |  |
| `live_browser` | `Record<string, any>` |  |
| `live_view` | `Record<string, any>` | The tester's read-only live stream for page viewers. |
| `steps` | `any[]` |  |

#### Example: Create

```ts
const lease_verify_diagnostic = await client.LeaseVerifyDiagnostic().create({
  lease_id: 'example_lease_id',
  swarm_id: 'example_swarm_id',
  task_id: 'example_task_id',
  browser_events: {},
  live_browser: {},
  live_view: {},
})
```


### LeaseVerifySecret

Create an instance: `const lease_verify_secret = client.LeaseVerifySecret()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const lease_verify_secret = await client.LeaseVerifySecret().create({
  lease_id: 'example_lease_id',
  swarm_id: 'example_swarm_id',
  task_id: 'example_task_id',
})
```


### LeaseWorkspace

Create an instance: `const lease_workspace = client.LeaseWorkspace()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LocalAgentDecision

Create an instance: `const local_agent_decision = client.LocalAgentDecision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request` | `Record<string, any>` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

#### Example: Create

```ts
const local_agent_decision = await client.LocalAgentDecision().create({
  organization_id: 'example_organization_id',
  request: {},
})
```


### LocalAgentResponse

Create an instance: `const local_agent_response = client.LocalAgentResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `any[]` |  |
| `model` | `string` |  |
| `service_tier` | `string | null` |  |
| `store` | `boolean` |  |
| `stream` | `boolean` |  |
| `tools` | `any[]` |  |

#### Example: Create

```ts
const local_agent_response = await client.LocalAgentResponse().create({
  organization_id: 'example_organization_id',
  input: [],
  model: 'example_model',
  store: true,
  stream: true,
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


### LogStreamChunk

Create an instance: `const log_stream_chunk = client.LogStreamChunk()`

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
const log_stream_chunk = await client.LogStreamChunk().load({ id: 'log_stream_chunk_id', log_stream_id: 'log_stream_id', space_id: 'space_id' })
```

#### Example: List

```ts
const log_stream_chunks = await client.LogStreamChunk().list({ log_stream_id: "example", space_id: "example" })
```

#### Example: Create

```ts
const log_stream_chunk = await client.LogStreamChunk().create({
  log_stream_id: 'example_log_stream_id',
  space_id: 'example_space_id',
})
```


### LogoImage

Create an instance: `const logo_image = client.LogoImage()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
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


### MarketingSetting

Create an instance: `const marketing_setting = client.MarketingSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `call_first` | `boolean` |  |

#### Example: List

```ts
const marketing_settings = await client.MarketingSetting().list()
```


### McpOauth

Create an instance: `const mcp_oauth = client.McpOauth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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


### MergeQueueEntry

Create an instance: `const merge_queue_entry = client.MergeQueueEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `Record<string, any>` | Queue performance for the reporting window. |
| `change_id` | `string | null` |  |
| `expected_target_commit_id` | `string | null` |  |
| `expected_target_version` | `number | null` |  |
| `expected_version` | `number` |  |
| `github_pr_number` | `number | null` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `kind` | `string` |  |
| `policy` | `Record<string, any>` |  |
| `priority` | `string` |  |
| `queue` | `Record<string, any>` |  |
| `target_branches` | `any[]` | Bookmark names for the target picker. |
| `when_ready` | `boolean | null` |  |

#### Example: Create

```ts
const merge_queue_entry = await client.MergeQueueEntry().create({
  merge_queue_id: 'example_merge_queue_id',
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  expected_version: 1,
  idempotency_key: 'example_idempotency_key',
  kind: 'example_kind',
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


### MergeResolution

Create an instance: `const merge_resolution = client.MergeResolution()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `base` | `string` | Common ancestor file contents |
| `content` | `string | null` |  |
| `context` | `Record<string, any>` | Optional surrounding files keyed by path |
| `duration_ms` | `number` |  |
| `fallback` | `boolean` |  |
| `model` | `string` |  |
| `ours` | `string` | Current / left file contents |
| `path` | `string` | Repository-relative path of the conflicted file |
| `resolved` | `boolean` |  |
| `theirs` | `string` | Incoming / right file contents |

#### Example: Create

```ts
const merge_resolution = await client.MergeResolution().create({
  base: 'example_base',
  ours: 'example_ours',
  theirs: 'example_theirs',
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


### MetronomeWebhook

Create an instance: `const metronome_webhook = client.MetronomeWebhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const metronome_webhook = await client.MetronomeWebhook().create({
})
```


### ModelSubscriptionAccount

Create an instance: `const model_subscription_account = client.ModelSubscriptionAccount()`

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
| `accounts` | `any[]` |  |
| `agents` | `any[]` |  |
| `can_disconnect` | `boolean` |  |
| `connection_agent` | `Record<string, any> | null` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `provider` | `string` |  |
| `saved` | `boolean` |  |
| `status` | `string` |  |
| `usable` | `boolean` |  |

#### Example: List

```ts
const model_subscription_accounts = await client.ModelSubscriptionAccount().list()
```

#### Example: Create

```ts
const model_subscription_account = await client.ModelSubscriptionAccount().create({
  label: 'example_label',
})
```


### ModelSubscriptionAccountConnection

Create an instance: `const model_subscription_account_connection = client.ModelSubscriptionAccountConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const model_subscription_account_connection = await client.ModelSubscriptionAccountConnection().load({ id: 'model_subscription_account_connection_id' })
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


### NetworkingSpace

Create an instance: `const networking_space = client.NetworkingSpace()`

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
const networking_space = await client.NetworkingSpace().load({ id: 'networking_space_id' })
```

#### Example: List

```ts
const networking_spaces = await client.NetworkingSpace().list()
```

#### Example: Create

```ts
const networking_space = await client.NetworkingSpace().create({
})
```


### Node

Create an instance: `const node = client.Node()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string | null` |  |
| `account_id` | `string | null` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string | null` |  |
| `installed_at_label` | `string | null` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `any[]` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Record<string, any>` |  |
| `status` | `string` |  |
| `suspended_at` | `string | null` |  |
| `suspended_at_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const nodes = await client.Node().list({ organization_id: "example" })
```


### NodeCertificate

Create an instance: `const node_certificate = client.NodeCertificate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### NodeLease

Create an instance: `const node_lease = client.NodeLease()`

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

#### Example: List

```ts
const node_leases = await client.NodeLease().list({ node_id: "example" })
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


### Now

Create an instance: `const now = client.Now()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `needs_attention` | `any[]` |  |
| `pagination` | `Record<string, any>` |  |
| `recently_landed` | `any[]` |  |
| `shipping_now` | `any[]` |  |
| `summary` | `Record<string, any>` |  |

#### Example: Load

```ts
const now = await client.Now().load({ organization_id: 'organization_id' })
```


### ObservabilityClickhouseCluster

Create an instance: `const observability_clickhouse_cluster = client.ObservabilityClickhouseCluster()`

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
const observability_clickhouse_cluster = await client.ObservabilityClickhouseCluster().load({ id: 'observability_clickhouse_cluster_id' })
```

#### Example: List

```ts
const observability_clickhouse_clusters = await client.ObservabilityClickhouseCluster().list()
```

#### Example: Create

```ts
const observability_clickhouse_cluster = await client.ObservabilityClickhouseCluster().create({
})
```


### ObservabilityQuickwitCluster

Create an instance: `const observability_quickwit_cluster = client.ObservabilityQuickwitCluster()`

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
const observability_quickwit_cluster = await client.ObservabilityQuickwitCluster().load({ id: 'observability_quickwit_cluster_id' })
```

#### Example: List

```ts
const observability_quickwit_clusters = await client.ObservabilityQuickwitCluster().list()
```

#### Example: Create

```ts
const observability_quickwit_cluster = await client.ObservabilityQuickwitCluster().create({
})
```


### ObservabilitySpace

Create an instance: `const observability_space = client.ObservabilitySpace()`

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
const observability_space = await client.ObservabilitySpace().load({ id: 'observability_space_id' })
```

#### Example: List

```ts
const observability_spaces = await client.ObservabilitySpace().list()
```

#### Example: Create

```ts
const observability_space = await client.ObservabilitySpace().create({
})
```


### Openapi

Create an instance: `const openapi = client.Openapi()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const openapi = await client.Openapi().load()
```


### OrgInvitation

Create an instance: `const org_invitation = client.OrgInvitation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `Record<string, any>` |  |
| `registration_options` | `any` |  |
| `requires_password_setup` | `boolean` |  |
| `start_guided_setup` | `boolean` |  |

#### Example: Load

```ts
const org_invitation = await client.OrgInvitation().load({ id: 'org_invitation_id' })
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


### OrganizationApp

Create an instance: `const organization_app = client.OrganizationApp()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const organization_apps = await client.OrganizationApp().list({ organization_id: "example", native_agent_id: "example" })
```


### OrganizationControl

Create an instance: `const organization_control = client.OrganizationControl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationDevice

Create an instance: `const organization_device = client.OrganizationDevice()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### OrganizationIdentityCertificate

Create an instance: `const organization_identity_certificate = client.OrganizationIdentityCertificate()`

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
const organization_identity_certificate = await client.OrganizationIdentityCertificate().load({ id: 'organization_identity_certificate_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const organization_identity_certificates = await client.OrganizationIdentityCertificate().list({ organization_id: "example" })
```

#### Example: Create

```ts
const organization_identity_certificate = await client.OrganizationIdentityCertificate().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationInteraction

Create an instance: `const organization_interaction = client.OrganizationInteraction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const organization_interaction = await client.OrganizationInteraction().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationInvitation

Create an instance: `const organization_invitation = client.OrganizationInvitation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `id` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```ts
const organization_invitation = await client.OrganizationInvitation().create({
  organization_id: 'example_organization_id',
  email: 'example_email',
  role: 'example_role',
})
```


### OrganizationMessageFile

Create an instance: `const organization_message_file = client.OrganizationMessageFile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const organization_message_file = await client.OrganizationMessageFile().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationOidcTrust

Create an instance: `const organization_oidc_trust = client.OrganizationOidcTrust()`

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
const organization_oidc_trust = await client.OrganizationOidcTrust().load({ id: 'organization_oidc_trust_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const organization_oidc_trusts = await client.OrganizationOidcTrust().list({ organization_id: "example" })
```

#### Example: Create

```ts
const organization_oidc_trust = await client.OrganizationOidcTrust().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationRunEvent

Create an instance: `const organization_run_event = client.OrganizationRunEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const organization_run_event = await client.OrganizationRunEvent().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationRunOutcome

Create an instance: `const organization_run_outcome = client.OrganizationRunOutcome()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const organization_run_outcome = await client.OrganizationRunOutcome().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationRunUsage

Create an instance: `const organization_run_usage = client.OrganizationRunUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const organization_run_usage = await client.OrganizationRunUsage().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationSandbox

Create an instance: `const organization_sandbox = client.OrganizationSandbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationSecret

Create an instance: `const organization_secret = client.OrganizationSecret()`

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
| `created_at_label` | `string | null` |  |
| `created_by` | `Record<string, any> | null` |  |
| `current_version` | `Record<string, any> | null` |  |
| `description` | `string | null` |  |
| `env_key` | `string` |  |
| `expose_to_build` | `boolean` |  |
| `expose_to_ci` | `boolean` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` |  |
| `last_accessed_at` | `string | null` |  |
| `last_accessed_at_label` | `string | null` |  |
| `last_accessed_by` | `Record<string, any> | null` |  |
| `latest_version_number` | `number | null` |  |
| `name` | `string` |  |
| `organization_id` | `string | null` |  |
| `owner_service_account_id` | `string | null` |  |
| `rotation_policy` | `string | null` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: Load

```ts
const organization_secret = await client.OrganizationSecret().load({ id: 'organization_secret_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const organization_secrets = await client.OrganizationSecret().list({ organization_id: "example" })
```

#### Example: Create

```ts
const organization_secret = await client.OrganizationSecret().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationServiceAccount

Create an instance: `const organization_service_account = client.OrganizationServiceAccount()`

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
const organization_service_account = await client.OrganizationServiceAccount().load({ id: 'organization_service_account_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const organization_service_accounts = await client.OrganizationServiceAccount().list({ organization_id: "example" })
```

#### Example: Create

```ts
const organization_service_account = await client.OrganizationServiceAccount().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationSetting

Create an instance: `const organization_setting = client.OrganizationSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `concurrent_run_limit_override` | `number | null` |  |
| `customize_onboarding_packages` | `boolean` |  |
| `daily_run_limit_override` | `number | null` |  |
| `deployment_usage_visibility` | `string` |  |
| `monthly_browser_minutes_limit_override` | `number | null` |  |
| `monthly_budget_dollars` | `string | number | null` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `boolean` |  |
| `onboarding_package_keys` | `any[]` |  |


### OrganizationSite

Create an instance: `const organization_site = client.OrganizationSite()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const organization_sites = await client.OrganizationSite().list({ organization_id: "example", native_agent_id: "example" })
```

#### Example: Create

```ts
const organization_site = await client.OrganizationSite().create({
  organization_id: 'example_organization_id',
})
```


### OrganizationSubscription

Create an instance: `const organization_subscription = client.OrganizationSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationTool

Create an instance: `const organization_tool = client.OrganizationTool()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Record<string, any>` |  |
| `native_agent_id` | `string` |  |
| `tool` | `string` |  |

#### Example: Create

```ts
const organization_tool = await client.OrganizationTool().create({
  organization_id: 'example_organization_id',
  arguments: {},
  native_agent_id: 'example_native_agent_id',
  tool: 'example_tool',
})
```


### OrganizationWorkloadIdentity

Create an instance: `const organization_workload_identity = client.OrganizationWorkloadIdentity()`

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
const organization_workload_identity = await client.OrganizationWorkloadIdentity().load({ id: 'organization_workload_identity_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const organization_workload_identitys = await client.OrganizationWorkloadIdentity().list({ organization_id: "example" })
```

#### Example: Create

```ts
const organization_workload_identity = await client.OrganizationWorkloadIdentity().create({
  organization_id: 'example_organization_id',
})
```


### OtelIngest

Create an instance: `const otel_ingest = client.OtelIngest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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


### PageArtefact

Create an instance: `const page_artefact = client.PageArtefact()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artefact` | `any` |  |
| `automation` | `Record<string, any> | null` |  |
| `automation_invocation_id` | `string | null` |  |
| `byte_size` | `number` |  |
| `checksum_sha256` | `string` |  |
| `comment_threads` | `any[]` |  |
| `content_type` | `string` |  |
| `created_at` | `string | null` |  |
| `created_by_user_id` | `string | null` |  |
| `description` | `string | null` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `draft` | `Record<string, any> | null` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` | `string` |  |
| `expires_at` | `string | null` |  |
| `filename` | `string` |  |
| `files` | `any[]` |  |
| `harness` | `string | null` |  |
| `harness_version` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `kinds` | `any[]` |  |
| `model` | `string | null` |  |
| `organization` | `Record<string, any>` |  |
| `organization_id` | `string` |  |
| `pagination` | `Record<string, any>` |  |
| `permissions` | `Record<string, any>` |  |
| `preview` | `Record<string, any>` |  |
| `published_at` | `string | null` |  |
| `published_at_label` | `string | null` |  |
| `publisher` | `Record<string, any> | null` |  |
| `repository` | `Record<string, any> | null` |  |
| `repository_id` | `string | null` |  |
| `selected_path` | `string` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `string | null` |  |
| `vcs_agent_session_id` | `string | null` |  |
| `version` | `number` |  |
| `versions` | `any[]` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```ts
const page_artefact = await client.PageArtefact().load({ id: 'page_artefact_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const page_artefacts = await client.PageArtefact().list({ organization_id: "example" })
```


### PageCiPipelineRun

Create an instance: `const page_ci_pipeline_run = client.PageCiPipelineRun()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string | null` |  |
| `id` | `string` |  |
| `jobs` | `any[]` |  |

#### Example: Load

```ts
const page_ci_pipeline_run = await client.PageCiPipelineRun().load({ id: 'page_ci_pipeline_run_id', pipeline_id: 'pipeline_id' })
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


### PageRepoVcCommit

Create an instance: `const page_repo_vc_commit = client.PageRepoVcCommit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `any` |  |
| `diff_path` | `string` | Fingerprinted path serving this commit range's file diff. |
| `id` | `string` |  |

#### Example: Load

```ts
const page_repo_vc_commit = await client.PageRepoVcCommit().load({ id: 'page_repo_vc_commit_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### PagesBilling

Create an instance: `const pages_billing = client.PagesBilling()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `any[]` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `Record<string, any>` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Record<string, any>` |  |
| `stripe` | `Record<string, any>` |  |
| `subscription` | `any` |  |
| `token_account` | `Record<string, any>` |  |

#### Example: Load

```ts
const pages_billing = await client.PagesBilling().load({ organization_id: 'organization_id' })
```


### PagesGithubOnboarding

Create an instance: `const pages_github_onboarding = client.PagesGithubOnboarding()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `onboarding` | `Record<string, any>` |  |
| `organization` | `Record<string, any>` |  |

#### Example: Load

```ts
const pages_github_onboarding = await client.PagesGithubOnboarding().load({ organization_id: 'organization_id' })
```


### PagesMember

Create an instance: `const pages_member = client.PagesMember()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
const pages_members = await client.PagesMember().list({ organization_id: "example" })
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


### PagesRegistry

Create an instance: `const pages_registry = client.PagesRegistry()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_repository_count` | `number` |  |
| `error` | `string | null` |  |
| `pagination` | `Record<string, any>` |  |
| `repositories` | `any[]` |  |
| `repository_count` | `number` |  |

#### Example: Load

```ts
const pages_registry = await client.PagesRegistry().load({ organization_id: 'organization_id' })
```


### PagesSession

Create an instance: `const pages_session = client.PagesSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `string | null` |  |
| `cursor` | `string` |  |
| `ended_at` | `string | null` |  |
| `external_session_id` | `string` |  |
| `facets` | `Record<string, any>` |  |
| `from` | `string` |  |
| `github_access_warnings` | `any[]` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `string | null` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `string | null` |  |
| `limit` | `number` |  |
| `markers` | `any[]` |  |
| `max_bytes` | `number` |  |
| `mode` | `string` |  |
| `offset` | `number` |  |
| `pagination` | `Record<string, any>` |  |
| `query` | `string` |  |
| `repo` | `string` |  |
| `repository` | `any` |  |
| `search` | `any` |  |
| `search_enabled` | `boolean` |  |
| `session` | `any` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` | `any[]` |  |
| `started_at` | `string | null` |  |
| `stats` | `Record<string, any>` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |
| `to` | `string` |  |
| `token_stats` | `any` |  |
| `transcript_index` | `any` |  |
| `transcript_stats` | `any` |  |
| `updated_at` | `string | null` |  |
| `user` | `any` |  |
| `user_id` | `string` |  |

#### Example: Load

```ts
const pages_session = await client.PagesSession().load({ id: 'pages_session_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const pages_sessions = await client.PagesSession().list({ organization_id: "example" })
```

#### Example: Create

```ts
const pages_session = await client.PagesSession().create({
  organization_id: 'example_organization_id',
})
```


### Pairing

Create an instance: `const pairing = client.Pairing()`

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
const pairing = await client.Pairing().load({ id: 'pairing_id' })
```

#### Example: List

```ts
const pairings = await client.Pairing().list()
```

#### Example: Create

```ts
const pairing = await client.Pairing().create({
})
```


### PairingEvent

Create an instance: `const pairing_event = client.PairingEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const pairing_events = await client.PairingEvent().list({ pairing_id: "example" })
```


### ParallelV1

Create an instance: `const parallel_v1 = client.ParallelV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PatchsetDiff

Create an instance: `const patchset_diff = client.PatchsetDiff()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `any[]` |  |
| `id` | `string` |  |
| `patchset` | `Record<string, any>` |  |

#### Example: Load

```ts
const patchset_diff = await client.PatchsetDiff().load({ id: 'patchset_diff_id', change_id: 'change_id', organization_id: 'organization_id', patchset_id: 'patchset_id', repo_id: 'repo_id' })
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


### ProactiveAgentWaitlistEntry

Create an instance: `const proactive_agent_waitlist_entry = client.ProactiveAgentWaitlistEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_task` | `string | null` | The first job they would hand an agent. |
| `invite_code` | `string | null` | The referral code of the invite link they arrived through. |
| `places_per_referral` | `number` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | `number` | 1-based place in the queue. |
| `position_after_next_referral` | `number` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | `string` | Shared in this entry's invite link. |
| `referral_count` | `number` | People who joined through this entry's link. |
| `total` | `number` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | `string | null` | Honeypot. |

#### Example: Load

```ts
const proactive_agent_waitlist_entry = await client.ProactiveAgentWaitlistEntry().load({ id: 'proactive_agent_waitlist_entry_id' })
```

#### Example: Create

```ts
const proactive_agent_waitlist_entry = await client.ProactiveAgentWaitlistEntry().create({
  email: 'example_email',
})
```


### Product

Create an instance: `const product = client.Product()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `any[]` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `logo_url` | `string | null` |  |
| `member_count` | `number` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `product` | `string` |  |
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

#### Example: Create

```ts
const product = await client.Product().create({
  organization_id: 'example_organization_id',
  product: 'example_product',
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


### PullRequestAction

Create an instance: `const pull_request_action = client.PullRequestAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_name` | `string` |  |
| `body` | `string` |  |
| `comment_id` | `string` |  |
| `comments` | `any[]` |  |
| `event` | `string` |  |
| `expected_head_sha` | `string` |  |
| `id` | `string | null` |  |
| `label` | `string` |  |
| `line` | `number` |  |
| `node_id` | `string | null` |  |
| `operation_key` | `string` |  |
| `path` | `string` |  |
| `run_id` | `string` |  |
| `side` | `string` |  |
| `start_line` | `number` |  |
| `start_side` | `string` |  |
| `thread_id` | `string` |  |

#### Example: Create

```ts
const pull_request_action = await client.PullRequestAction().create({
  number: 'example_number',
  organization_id: 'example_organization_id',
  pull_request_id: 'example_pull_request_id',
  action_name: 'example_action_name',
  operation_key: 'example_operation_key',
})
```


### PullRequestMagicMerge

Create an instance: `const pull_request_magic_merge = client.PullRequestMagicMerge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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


### PullRequestTranscript

Create an instance: `const pull_request_transcript = client.PullRequestTranscript()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `string | null` |  |
| `ended_at` | `string | null` |  |
| `external_session_id` | `string` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `string | null` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `string | null` |  |
| `repository` | `any` |  |
| `started_at` | `string | null` |  |
| `stats` | `Record<string, any>` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |
| `updated_at` | `string | null` |  |
| `user` | `any` |  |

#### Example: List

```ts
const pull_request_transcripts = await client.PullRequestTranscript().list({ organization_id: "example", pull_request_id: "example", repo_id: "example" })
```


### PullZone

Create an instance: `const pull_zone = client.PullZone()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |

#### Example: List

```ts
const pull_zones = await client.PullZone().list({ organization_id: "example" })
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


### RelayAgentConnection

Create an instance: `const relay_agent_connection = client.RelayAgentConnection()`

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
const relay_agent_connection = await client.RelayAgentConnection().load({ id: 'relay_agent_connection_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const relay_agent_connections = await client.RelayAgentConnection().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const relay_agent_connection = await client.RelayAgentConnection().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  agent_card_url: 'example_agent_card_url',
  auth_scheme: 'example_auth_scheme',
  name: 'example_name',
})
```


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


### RelaySignal

Create an instance: `const relay_signal = client.RelaySignal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const relay_signal = await client.RelaySignal().create({
})
```


### ReleaseRollout

Create an instance: `const release_rollout = client.ReleaseRollout()`

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
const release_rollout = await client.ReleaseRollout().load({ id: 'release_rollout_id', release_id: 'release_id' })
```

#### Example: List

```ts
const release_rollouts = await client.ReleaseRollout().list({ release_id: "example" })
```

#### Example: Create

```ts
const release_rollout = await client.ReleaseRollout().create({
  release_id: 'example_release_id',
})
```


### Repo

Create an instance: `const repo = client.Repo()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_retry_import` | `boolean` | True when a failed client import can be requeued for CLI resume. |
| `can_retry_sync` | `boolean` | True when the latest sync run failed and can be retried. |
| `disclaimer` | `string | null` |  |
| `federated_in_home` | `boolean` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` | `string | null` |  |
| `icon_name` | `string` |  |
| `id` | `string` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` | `string | null` |  |
| `is_home` | `boolean` |  |
| `name` | `string` |  |
| `remote_repository` | `string | null` |  |
| `root_path` | `string | null` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` | `string` |  |
| `sync_error_message` | `string | null` |  |
| `sync_provider` | `string` |  |
| `sync_status` | `string` |  |

#### Example: List

```ts
const repos = await client.Repo().list({ organization_id: "example" })
```


### RepoAccessToken

Create an instance: `const repo_access_token = client.RepoAccessToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `Record<string, any>` |  |
| `active` | `boolean` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `credential_purpose` | `string` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` | `string | null` |  |
| `expires_at_label` | `string | null` |  |
| `expires_in_days` | `number | null` |  |
| `id` | `string` |  |
| `last_used_at` | `string | null` |  |
| `last_used_at_label` | `string | null` |  |
| `name` | `string` |  |
| `permission_level` | `string` |  |
| `plain_text_token` | `string` |  |
| `revoked_at` | `string | null` |  |
| `revoked_at_label` | `string | null` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const repo_access_tokens = await client.RepoAccessToken().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const repo_access_token = await client.RepoAccessToken().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  name: 'example_name',
})
```


### RepoAction

Create an instance: `const repo_action = client.RepoAction()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pipeline` | `Record<string, any>` |  |
| `run` | `Record<string, any>` |  |

#### Example: List

```ts
const repo_actions = await client.RepoAction().list({ organization_id: "example", repo_id: "example" })
```


### RepoAgentCheckpoint

Create an instance: `const repo_agent_checkpoint = client.RepoAgentCheckpoint()`

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
const repo_agent_checkpoint = await client.RepoAgentCheckpoint().load({ id: 'repo_agent_checkpoint_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### RepoAgentSession

Create an instance: `const repo_agent_session = client.RepoAgentSession()`

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
| `adapter` | `string` |  |
| `agent_session` | `Record<string, any>` |  |
| `external_session_id` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |

#### Example: Load

```ts
const repo_agent_session = await client.RepoAgentSession().load({ id: 'repo_agent_session_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const repo_agent_sessions = await client.RepoAgentSession().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const repo_agent_session = await client.RepoAgentSession().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### RepoBookmarkProtection

Create an instance: `const repo_bookmark_protection = client.RepoBookmarkProtection()`

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
| `actor_policy` | `Record<string, any>` |  |
| `bypass_mode` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string | null` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `priority` | `number` |  |
| `repository_id` | `string` |  |
| `requirements` | `Record<string, any>` |  |
| `target_kind` | `string` |  |
| `target_pattern` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_by_user_id` | `string | null` |  |

#### Example: Load

```ts
const repo_bookmark_protection = await client.RepoBookmarkProtection().load({ id: 'repo_bookmark_protection_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const repo_bookmark_protections = await client.RepoBookmarkProtection().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const repo_bookmark_protection = await client.RepoBookmarkProtection().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### RepoBookmarkProtectionEvent

Create an instance: `const repo_bookmark_protection_event = client.RepoBookmarkProtectionEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_label` | `string | null` |  |
| `actor_user_id` | `string | null` |  |
| `bookmark_name` | `string` |  |
| `bookmark_protection_rule_id` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `decision` | `string` |  |
| `id` | `string` |  |
| `intent` | `string | null` |  |
| `metadata` | `Record<string, any>` |  |
| `new_target` | `string | null` |  |
| `old_target` | `string | null` |  |
| `organization_id` | `string` |  |
| `reason_codes` | `any[]` |  |
| `repository_id` | `string` |  |
| `source_request_id` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const repo_bookmark_protection_events = await client.RepoBookmarkProtectionEvent().list({ organization_id: "example", repo_id: "example" })
```


### RepoCloudWorkspaceBackup

Create an instance: `const repo_cloud_workspace_backup = client.RepoCloudWorkspaceBackup()`

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
const repo_cloud_workspace_backup = await client.RepoCloudWorkspaceBackup().load({ id: 'repo_cloud_workspace_backup_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const repo_cloud_workspace_backups = await client.RepoCloudWorkspaceBackup().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const repo_cloud_workspace_backup = await client.RepoCloudWorkspaceBackup().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### RepoCodeRule

Create an instance: `const repo_code_rule = client.RepoCodeRule()`

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
| `active_revision_number` | `number | null` |  |
| `capabilities` | `Record<string, any>` |  |
| `code_rule` | `any` |  |
| `created_at` | `string` |  |
| `definition` | `Record<string, any>` |  |
| `draft_pending` | `boolean` | The latest revision is not the active one |
| `enabled` | `boolean` |  |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `latest_revision_number` | `number` |  |
| `name` | `string` | Name of the latest revision |
| `repository` | `Record<string, any>` |  |
| `scope` | `any[]` |  |
| `slug` | `string` |  |
| `state_version` | `number` | Send back as expected_version on every mutation |
| `updated_at` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```ts
const repo_code_rule = await client.RepoCodeRule().load({ id: 'repo_code_rule_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const repo_code_rules = await client.RepoCodeRule().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const repo_code_rule = await client.RepoCodeRule().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  definition: {},
})
```


### RepoSetting

Create an instance: `const repo_setting = client.RepoSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `description` | `string | null` |  |
| `expires_at` | `string | null` |  |
| `expires_at_label` | `string | null` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `string | null` |  |
| `last_used_at_label` | `string | null` |  |
| `merge_authority` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `permission_level` | `string` |  |
| `revoked_at` | `string | null` |  |
| `revoked_at_label` | `string | null` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const repo_settings = await client.RepoSetting().list({ organization_id: "example", repo_id: "example" })
```


### RepoStat

Create an instance: `const repo_stat = client.RepoStat()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repository_stats` | `Record<string, any>` |  |

#### Example: List

```ts
const repo_stats = await client.RepoStat().list({ organization_id: "example", repo_id: "example" })
```


### RepoVc

Create an instance: `const repo_vc = client.RepoVc()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |


### RepoVcCommit

Create an instance: `const repo_vc_commit = client.RepoVcCommit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `target_commit_id` | `string` |  |

#### Example: List

```ts
const repo_vc_commits = await client.RepoVcCommit().list({ organization_id: "example", repo_id: "example", ref: "example" })
```


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


### RepositoryAccess

Create an instance: `const repository_access = client.RepositoryAccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### RepositoryAccessResolve

Create an instance: `const repository_access_resolve = client.RepositoryAccessResolve()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string` |  |
| `git_auth_username` | `string` |  |
| `git_https_clone_url` | `string | null` |  |
| `git_https_supported` | `boolean` |  |
| `github_access_warnings` | `any[]` |  |
| `id` | `string` |  |
| `membership_role` | `string` |  |
| `organization_id` | `string` |  |
| `organization_name` | `string` |  |
| `organization_slug` | `string` |  |
| `repository_id` | `string` |  |
| `repository_name` | `string` |  |
| `repository_slug` | `string` |  |

#### Example: Load

```ts
const repository_access_resolve = await client.RepositoryAccessResolve().load({ id: 'repository_access_resolve_id', resolve_id: 'resolve_id' })
```


### RepositoryEvent

Create an instance: `const repository_event = client.RepositoryEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RepositoryImport

Create an instance: `const repository_import = client.RepositoryImport()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_connections` | `boolean` |  |
| `github_imports` | `any[]` |  |
| `github_installations` | `any[]` |  |
| `gitlab_configured` | `boolean` |  |
| `gitlab_imports` | `any[]` |  |
| `gitlab_integrations` | `any[]` |  |
| `gitlab_redirect_uri` | `string | null` |  |
| `gitlab_self_managed_available` | `boolean` |  |
| `inventory_errors` | `any[]` |  |
| `organization_id` | `string` |  |
| `repositories` | `any[]` |  |

#### Example: Load

```ts
const repository_import = await client.RepositoryImport().load({ organization_id: 'organization_id' })
```


### RepositoryImportSession

Create an instance: `const repository_import_session = client.RepositoryImportSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_required` | `string` |  |
| `authorization_endpoint` | `string` |  |
| `can_authorize_github` | `boolean` |  |
| `client_name` | `string | null` |  |
| `client_version` | `string | null` |  |
| `created_at` | `string` |  |
| `error_message` | `string | null` |  |
| `expires_at` | `string` |  |
| `git_imports` | `any[]` |  |
| `github_app_installation_id` | `string | null` |  |
| `github_connected` | `boolean` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const repository_import_session = await client.RepositoryImportSession().load({ id: 'repository_import_session_id' })
```

#### Example: Create

```ts
const repository_import_session = await client.RepositoryImportSession().create({
  organization_id: 'example_organization_id',
  idempotency_key: 'example_idempotency_key',
})
```


### RepositoryImportSessionRepository

Create an instance: `const repository_import_session_repository = client.RepositoryImportSessionRepository()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string | null` |  |
| `full_name` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `private` | `boolean` |  |
| `reason` | `string | null` |  |
| `selectable` | `boolean` |  |
| `status` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```ts
const repository_import_session_repositorys = await client.RepositoryImportSessionRepository().list({ repository_import_session_id: "example" })
```


### RepositoryImportSessionSelection

Create an instance: `const repository_import_session_selection = client.RepositoryImportSessionSelection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repositories` | `any` |  |

#### Example: Create

```ts
const repository_import_session_selection = await client.RepositoryImportSessionSelection().create({
  repository_import_session_id: 'example_repository_import_session_id',
  repositories: 'example_repositories',
})
```


### RepositorySandboxEnvironment

Create an instance: `const repository_sandbox_environment = client.RepositorySandboxEnvironment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const repository_sandbox_environment = await client.RepositorySandboxEnvironment().load({ id: 'repository_sandbox_environment_id', repository_id: 'repository_id' })
```


### RoderCodeRepair

Create an instance: `const roder_code_repair = client.RoderCodeRepair()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `cancel_requested` | `boolean` |  |
| `failure_code` | `string | null` |  |
| `id` | `string` |  |
| `launch_state` | `string` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string` |  |
| `roder_thread_id` | `string | null` |  |
| `roder_turn_id` | `string | null` |  |
| `scenario_run_id` | `string` |  |
| `task` | `Record<string, any> | null` |  |
| `trigger_kind` | `string` |  |

#### Example: Load

```ts
const roder_code_repair = await client.RoderCodeRepair().load({ id: 'roder_code_repair_id' })
```

#### Example: List

```ts
const roder_code_repairs = await client.RoderCodeRepair().list({ scenario_run_id: "example" })
```

#### Example: Create

```ts
const roder_code_repair = await client.RoderCodeRepair().create({
  base_sha: 'example_base_sha',
  organization_id: 'example_organization_id',
  repository_slug: 'example_repository_slug',
  scenario_run_id: 'example_scenario_run_id',
})
```


### RoderCodeRepairSetting

Create an instance: `const roder_code_repair_setting = client.RoderCodeRepairSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` |  |
| `daily_limit` | `number` |  |
| `enabled` | `boolean` |  |
| `enabled_at` | `string | null` |  |
| `operator_user_id` | `string | null` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string | null` | Connected Composal repository required when enabling |

#### Example: List

```ts
const roder_code_repair_settings = await client.RoderCodeRepairSetting().list({ organization_id: "example" })
```

#### Example: Create

```ts
const roder_code_repair_setting = await client.RoderCodeRepairSetting().create({
  enabled: true,
  organization_id: 'example_organization_id',
})
```


### RoderMachine

Create an instance: `const roder_machine = client.RoderMachine()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RoderRun

Create an instance: `const roder_run = client.RoderRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RoderWorkspaceCredential

Create an instance: `const roder_workspace_credential = client.RoderWorkspaceCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token` | `string` | Short-lived personal access token for the spawning user. |
| `author_email` | `string` |  |
| `author_name` | `string` |  |
| `clone_url` | `string` |  |
| `default_branch` | `string` |  |
| `expires_at` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string` |  |
| `repository_slug` | `string` |  |
| `repository_spec` | `string` | The explicitly selected physical repository address. |
| `required_lifetime_seconds` | `number` | Lifetime the pending clone or command must be able to complete within. |
| `token` | `string` | Short-lived read/write repository credential. |
| `username` | `string` |  |

#### Example: Create

```ts
const roder_workspace_credential = await client.RoderWorkspaceCredential().create({
  required_lifetime_seconds: 1,
})
```


### RunArtifact

Create an instance: `const run_artifact = client.RunArtifact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const run_artifacts = await client.RunArtifact().list({ pipeline_id: "example", run_id: "example" })
```

#### Example: Create

```ts
const run_artifact = await client.RunArtifact().create({
  pipeline_id: 'example_pipeline_id',
  run_id: 'example_run_id',
})
```


### RunJob

Create an instance: `const run_job = client.RunJob()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `allow_failure` | `boolean` |  |
| `cache_archive_observations` | `Record<string, any> | null` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` | `string` |  |
| `ci_runner_id` | `string | null` |  |
| `created_at` | `string` |  |
| `dependencies_csv` | `string | null` |  |
| `display_id` | `number` |  |
| `environment_csv` | `string | null` |  |
| `execution_order` | `number` |  |
| `execution_profile` | `string | null` |  |
| `exit_code` | `number | null` |  |
| `failed` | `boolean` |  |
| `finished_at` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `log_chunks` | `any[]` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `queued_at` | `string | null` |  |
| `reconciliation_id` | `string | null` |  |
| `retry_number` | `number` |  |
| `reuse` | `Record<string, any> | null` |  |
| `runner_label_selector` | `string | null` |  |
| `slug` | `string` |  |
| `started_at` | `string | null` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `steps` | `any[]` |  |
| `timeout_seconds` | `number | null` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const run_job = await client.RunJob().load({ id: 'run_job_id', pipeline_id: 'pipeline_id', run_id: 'run_id' })
```

#### Example: List

```ts
const run_jobs = await client.RunJob().list({ pipeline_id: "example", run_id: "example" })
```

#### Example: Create

```ts
const run_job = await client.RunJob().create({
  pipeline_id: 'example_pipeline_id',
  run_id: 'example_run_id',
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


### RunWorkspaceCredential

Create an instance: `const run_workspace_credential = client.RunWorkspaceCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const run_workspace_credential = await client.RunWorkspaceCredential().create({
})
```


### RunnerLease

Create an instance: `const runner_lease = client.RunnerLease()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const runner_leases = await client.RunnerLease().list({ runner_id: "example", runner_pool_id: "example" })
```

#### Example: Create

```ts
const runner_lease = await client.RunnerLease().create({
  runner_id: 'example_runner_id',
  runner_pool_id: 'example_runner_pool_id',
})
```


### RunnerPoolNodeEnrollmentToken

Create an instance: `const runner_pool_node_enrollment_token = client.RunnerPoolNodeEnrollmentToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities_csv` | `string | null` |  |
| `ci_runner_pool_id` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `creator_user_id` | `string | null` |  |
| `description` | `string | null` |  |
| `expires_at` | `string | null` |  |
| `expires_at_label` | `string | null` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_used_at` | `string | null` |  |
| `last_used_at_label` | `string | null` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `raw_token` | `string | null` |  |
| `revoked_at` | `string | null` |  |
| `status` | `string` |  |
| `token_hint` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `usage_count` | `number` |  |
| `usage_count_label` | `string` |  |

#### Example: List

```ts
const runner_pool_node_enrollment_tokens = await client.RunnerPoolNodeEnrollmentToken().list({ runner_pool_id: "example" })
```

#### Example: Create

```ts
const runner_pool_node_enrollment_token = await client.RunnerPoolNodeEnrollmentToken().create({
  runner_pool_id: 'example_runner_pool_id',
  name: 'example_name',
})
```


### RunnerPoolRunner

Create an instance: `const runner_pool_runner = client.RunnerPoolRunner()`

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
| `id` | `string` |  |

#### Example: Load

```ts
const runner_pool_runner = await client.RunnerPoolRunner().load({ id: 'runner_pool_runner_id', runner_pool_id: 'runner_pool_id' })
```

#### Example: List

```ts
const runner_pool_runners = await client.RunnerPoolRunner().list({ runner_pool_id: "example" })
```

#### Example: Create

```ts
const runner_pool_runner = await client.RunnerPoolRunner().create({
  runner_pool_id: 'example_runner_pool_id',
})
```


### RuntimeInstanceHealthSnapshot

Create an instance: `const runtime_instance_health_snapshot = client.RuntimeInstanceHealthSnapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const runtime_instance_health_snapshots = await client.RuntimeInstanceHealthSnapshot().list({ runtime_instance_id: "example" })
```

#### Example: Create

```ts
const runtime_instance_health_snapshot = await client.RuntimeInstanceHealthSnapshot().create({
  runtime_instance_id: 'example_runtime_instance_id',
})
```


### SandboxIntegration

Create an instance: `const sandbox_integration = client.SandboxIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `catalog` | `any[]` |  |
| `configuration` | `Record<string, any>` |  |
| `connected_profiles` | `Record<string, any>` | Connected profiles per provider across the organization. |
| `credentials` | `Record<string, any>` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `integrations` | `any[]` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `version` | `number` |  |

#### Example: List

```ts
const sandbox_integrations = await client.SandboxIntegration().list({ organization_id: "example" })
```

#### Example: Create

```ts
const sandbox_integration = await client.SandboxIntegration().create({
  organization_id: 'example_organization_id',
  configuration: {},
  credentials: {},
  name: 'example_name',
  provider: 'example_provider',
})
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


### SecretGrant

Create an instance: `const secret_grant = client.SecretGrant()`

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
const secret_grant = await client.SecretGrant().load({ id: 'secret_grant_id', organization_id: 'organization_id', secret_id: 'secret_id' })
```

#### Example: List

```ts
const secret_grants = await client.SecretGrant().list({ organization_id: "example", secret_id: "example" })
```

#### Example: Create

```ts
const secret_grant = await client.SecretGrant().create({
  organization_id: 'example_organization_id',
  secret_id: 'example_secret_id',
})
```


### SecretVersion

Create an instance: `const secret_version = client.SecretVersion()`

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
const secret_version = await client.SecretVersion().load({ id: 'secret_version_id', organization_id: 'organization_id', secret_id: 'secret_id' })
```

#### Example: List

```ts
const secret_versions = await client.SecretVersion().list({ organization_id: "example", secret_id: "example" })
```

#### Example: Create

```ts
const secret_version = await client.SecretVersion().create({
  organization_id: 'example_organization_id',
  secret_id: 'example_secret_id',
})
```


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


### Setting

Create an instance: `const setting = client.Setting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `boolean` |  |
| `can_manage_sandbox_region` | `boolean` |  |
| `dedicated_outbound_ip_addresses` | `any[]` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `sandbox_regions` | `any[]` |  |

#### Example: List

```ts
const settings = await client.Setting().list({ organization_id: "example" })
```


### SettingMutationLease

Create an instance: `const setting_mutation_lease = client.SettingMutationLease()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Signal

Create an instance: `const signal = client.Signal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acked_at` | `string | null` |  |
| `acked_by` | `Record<string, any> | null` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | `Record<string, any>` | Dispatched-run summary (docs §6c). |
| `app_service_id` | `string | null` |  |
| `attribution` | `Record<string, any>` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | `string` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | `string` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | `Record<string, any>` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | `string` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` | `string` |  |
| `payload` | `Record<string, any>` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | `Record<string, any>` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | `Record<string, any>` | Recovery pairing (docs §6b). |
| `severity` | `string` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | `Record<string, any>` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` | `string | null` |  |
| `subject_type` | `string | null` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | `string` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

#### Example: Load

```ts
const signal = await client.Signal().load({ id: 'signal_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const signals = await client.Signal().list({ organization_id: "example" })
```

#### Example: Create

```ts
const signal = await client.Signal().create({
})
```


### SignalInbound

Create an instance: `const signal_inbound = client.SignalInbound()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SignalIntegration

Create an instance: `const signal_integration = client.SignalIntegration()`

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
| `api_token` | `string` | Optional provider API token for target discovery and backfill. |
| `api_token_stored` | `boolean` |  |
| `config` | `Record<string, any>` |  |
| `created_at` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `string | null` |  |
| `last_verified_at` | `string | null` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `number` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `number` |  |
| `unmapped_delivery_count` | `number` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `string | null` |  |
| `webhook_secret` | `string` | The provider's signing secret. |
| `webhook_secret_stored` | `boolean` |  |

#### Example: Load

```ts
const signal_integration = await client.SignalIntegration().load({ id: 'signal_integration_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const signal_integrations = await client.SignalIntegration().list({ organization_id: "example" })
```

#### Example: Create

```ts
const signal_integration = await client.SignalIntegration().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  provider: 'example_provider',
})
```


### SignalIntegrationDelivery

Create an instance: `const signal_integration_delivery = client.SignalIntegrationDelivery()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `number` |  |
| `created_at` | `string | null` |  |
| `delivery_id` | `string` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` | `string | null` |  |
| `id` | `string` | Public id (`sdel_…`). |
| `last_error` | `string | null` |  |
| `ops_signal_id` | `string | null` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` | `string` |  |
| `processed_at` | `string | null` |  |
| `provider` | `string` |  |
| `received_at` | `string | null` |  |
| `signal_integration_id` | `string` |  |
| `state` | `string` |  |

#### Example: List

```ts
const signal_integration_deliverys = await client.SignalIntegrationDelivery().list({ organization_id: "example", signal_integration_id: "example" })
```


### SignalIntegrationTarget

Create an instance: `const signal_integration_target = client.SignalIntegrationTarget()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_service_id` | `string | null` |  |
| `created_at` | `string | null` |  |
| `display_name` | `string | null` |  |
| `enabled` | `boolean` |  |
| `external_id` | `string` |  |
| `external_kind` | `string` |  |
| `external_slug` | `string | null` |  |
| `hosted_app_id` | `string | null` |  |
| `id` | `string` | Public id (`stgt_…`). |
| `organization_id` | `string` |  |
| `signal_integration_id` | `string` |  |
| `signal_integration_targets` | `any[]` |  |
| `targets` | `any[]` |  |
| `updated_at` | `string | null` |  |

#### Example: List

```ts
const signal_integration_targets = await client.SignalIntegrationTarget().list({ organization_id: "example", signal_integration_id: "example" })
```


### SignalSubscription

Create an instance: `const signal_subscription = client.SignalSubscription()`

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
const signal_subscription = await client.SignalSubscription().load({ id: 'signal_subscription_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const signal_subscriptions = await client.SignalSubscription().list({ organization_id: "example" })
```

#### Example: Create

```ts
const signal_subscription = await client.SignalSubscription().create({
  organization_id: 'example_organization_id',
})
```


### Site

Create an instance: `const site = client.Site()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

#### Example: List

```ts
const sites = await client.Site().list({ organization_id: "example" })
```


### SiteAccessKey

Create an instance: `const site_access_key = client.SiteAccessKey()`

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
const site_access_keys = await client.SiteAccessKey().list({ organization_id: "example", site_id: "example" })
```

#### Example: Create

```ts
const site_access_key = await client.SiteAccessKey().create({
  organization_id: 'example_organization_id',
  site_id: 'example_site_id',
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


### SiteSecret

Create an instance: `const site_secret = client.SiteSecret()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `native_agent_id` | `string` |  |
| `value` | `string` |  |


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


### SourceConnection

Create an instance: `const source_connection = client.SourceConnection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SpaceAlertRule

Create an instance: `const space_alert_rule = client.SpaceAlertRule()`

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
const space_alert_rule = await client.SpaceAlertRule().load({ id: 'space_alert_rule_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_alert_rules = await client.SpaceAlertRule().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_alert_rule = await client.SpaceAlertRule().create({
  space_id: 'example_space_id',
})
```


### SpaceAuditEvent

Create an instance: `const space_audit_event = client.SpaceAuditEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const space_audit_events = await client.SpaceAuditEvent().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_audit_event = await client.SpaceAuditEvent().create({
  space_id: 'example_space_id',
})
```


### SpaceDnsRecord

Create an instance: `const space_dns_record = client.SpaceDnsRecord()`

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
const space_dns_record = await client.SpaceDnsRecord().load({ id: 'space_dns_record_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_dns_records = await client.SpaceDnsRecord().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_dns_record = await client.SpaceDnsRecord().create({
  space_id: 'example_space_id',
})
```


### SpaceEnrollmentToken

Create an instance: `const space_enrollment_token = client.SpaceEnrollmentToken()`

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
const space_enrollment_token = await client.SpaceEnrollmentToken().load({ id: 'space_enrollment_token_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_enrollment_tokens = await client.SpaceEnrollmentToken().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_enrollment_token = await client.SpaceEnrollmentToken().create({
  space_id: 'example_space_id',
})
```


### SpaceGateway

Create an instance: `const space_gateway = client.SpaceGateway()`

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
const space_gateway = await client.SpaceGateway().load({ id: 'space_gateway_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_gateways = await client.SpaceGateway().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_gateway = await client.SpaceGateway().create({
  space_id: 'example_space_id',
})
```


### SpaceGroup

Create an instance: `const space_group = client.SpaceGroup()`

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
| `id` | `string` |  |

#### Example: List

```ts
const space_groups = await client.SpaceGroup().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_group = await client.SpaceGroup().create({
  space_id: 'example_space_id',
})
```


### SpaceGroupMembership

Create an instance: `const space_group_membership = client.SpaceGroupMembership()`

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
| `id` | `string` |  |

#### Example: List

```ts
const space_group_memberships = await client.SpaceGroupMembership().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_group_membership = await client.SpaceGroupMembership().create({
  space_id: 'example_space_id',
})
```


### SpaceLogStream

Create an instance: `const space_log_stream = client.SpaceLogStream()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const space_log_streams = await client.SpaceLogStream().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_log_stream = await client.SpaceLogStream().create({
  space_id: 'example_space_id',
})
```


### SpaceMetricSery

Create an instance: `const space_metric_sery = client.SpaceMetricSery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const space_metric_serys = await client.SpaceMetricSery().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_metric_sery = await client.SpaceMetricSery().create({
  space_id: 'example_space_id',
})
```


### SpaceOtelCollector

Create an instance: `const space_otel_collector = client.SpaceOtelCollector()`

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
const space_otel_collector = await client.SpaceOtelCollector().load({ id: 'space_otel_collector_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_otel_collectors = await client.SpaceOtelCollector().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_otel_collector = await client.SpaceOtelCollector().create({
  space_id: 'example_space_id',
})
```


### SpacePeer

Create an instance: `const space_peer = client.SpacePeer()`

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
const space_peer = await client.SpacePeer().load({ id: 'space_peer_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_peers = await client.SpacePeer().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_peer = await client.SpacePeer().create({
  space_id: 'example_space_id',
})
```


### SpacePeerAttachment

Create an instance: `const space_peer_attachment = client.SpacePeerAttachment()`

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
| `id` | `string` |  |

#### Example: List

```ts
const space_peer_attachments = await client.SpacePeerAttachment().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_peer_attachment = await client.SpacePeerAttachment().create({
  space_id: 'example_space_id',
})
```


### SpacePolicy

Create an instance: `const space_policy = client.SpacePolicy()`

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
const space_policy = await client.SpacePolicy().load({ id: 'space_policy_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_policys = await client.SpacePolicy().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_policy = await client.SpacePolicy().create({
  space_id: 'example_space_id',
})
```


### SpaceSegment

Create an instance: `const space_segment = client.SpaceSegment()`

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
const space_segment = await client.SpaceSegment().load({ id: 'space_segment_id', space_id: 'space_id' })
```

#### Example: List

```ts
const space_segments = await client.SpaceSegment().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_segment = await client.SpaceSegment().create({
  space_id: 'example_space_id',
})
```


### SpaceTraceSpan

Create an instance: `const space_trace_span = client.SpaceTraceSpan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const space_trace_spans = await client.SpaceTraceSpan().list({ space_id: "example" })
```

#### Example: Create

```ts
const space_trace_span = await client.SpaceTraceSpan().create({
  space_id: 'example_space_id',
})
```


### Spark

Create an instance: `const spark = client.Spark()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `any[]` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` | `boolean` |  |
| `compute_credit_cents` | `number | null` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `credit_cents` | `number | null` | Inference credit the workspace started Sparks with. |
| `first_spark` | `Record<string, any> | null` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` | `boolean` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `jsonrpc` | `string` |  |
| `logo_url` | `string | null` |  |
| `member_count` | `number` |  |
| `method` | `string` |  |
| `name` | `string` |  |
| `params` | `Record<string, any>` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `repository_count` | `number` |  |
| `role` | `string | null` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `any[]` | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | `boolean` | Whether the workspace has started Sparks. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |
| `verify_pr_scenario_writing_enabled` | `boolean` |  |

#### Example: List

```ts
const sparks = await client.Spark().list({ organization_id: "example" })
```

#### Example: Create

```ts
const spark = await client.Spark().create({
  jsonrpc: 'example_jsonrpc',
  method: 'example_method',
})
```


### SparkAgentIntegration

Create an instance: `const spark_agent_integration = client.SparkAgentIntegration()`

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
const spark_agent_integrations = await client.SparkAgentIntegration().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const spark_agent_integration = await client.SparkAgentIntegration().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  connection_id: 'example_connection_id',
  enabled: true,
  generation: 1,
})
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


### SparkAgentSite

Create an instance: `const spark_agent_site = client.SparkAgentSite()`

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
const spark_agent_sites = await client.SparkAgentSite().list({ agent_id: "example", organization_id: "example" })
```


### SparkAgentSkill

Create an instance: `const spark_agent_skill = client.SparkAgentSkill()`

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
const spark_agent_skills = await client.SparkAgentSkill().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const spark_agent_skill = await client.SparkAgentSkill().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  enabled: true,
  name: 'example_name',
  version: 'example_version',
})
```


### SparkAgentThread

Create an instance: `const spark_agent_thread = client.SparkAgentThread()`

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
const spark_agent_threads = await client.SparkAgentThread().list({ agent_id: "example", organization_id: "example" })
```

#### Example: Create

```ts
const spark_agent_thread = await client.SparkAgentThread().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
})
```


### SparkCredit

Create an instance: `const spark_credit = client.SparkCredit()`

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
| `amount_cents` | `number` | Purchase amount in USD cents. |
| `autofill` | `any` |  |
| `autofill_payment_unconfirmed` | `boolean` |  |
| `available_usd` | `string` |  |
| `billing_unit` | `string` | Compute minute quote version returned by the billing summary. |
| `can_manage` | `boolean` |  |
| `compute_minutes` | `Record<string, any>` |  |
| `compute_usd` | `string` |  |
| `credits_per_usd` | `number` |  |
| `inference_usd` | `string` |  |
| `kind` | `string` |  |
| `payment_method` | `Record<string, any> | null` |  |
| `payments_enabled` | `boolean` |  |
| `plan` | `string` |  |
| `plans` | `any[]` |  |
| `quoted_credits_cents` | `number` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | `number` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` | `any[]` |  |
| `refill_options` | `any[]` |  |
| `refill_thresholds_cents` | `any[]` |  |
| `request_key` | `string` |  |
| `settings` | `any` |  |
| `starter_cents` | `number` |  |
| `top_up_max_cents` | `number` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | `number` | Minimum manual top-up and increment, in USD cents. |

#### Example: List

```ts
const spark_credits = await client.SparkCredit().list({ organization_id: "example" })
```

#### Example: Create

```ts
const spark_credit = await client.SparkCredit().create({
  organization_id: 'example_organization_id',
  kind: 'example_kind',
  request_key: 'example_request_key',
})
```


### SparkCreditAgentUsage

Create an instance: `const spark_credit_agent_usage = client.SparkCreditAgentUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `any[]` |  |
| `all` | `Record<string, any>` |  |
| `days` | `any[]` |  |
| `id` | `string` |  |
| `owners` | `any[]` |  |

#### Example: Load

```ts
const spark_credit_agent_usage = await client.SparkCreditAgentUsage().load({ id: 'spark_credit_agent_usage_id', organization_id: 'organization_id' })
```


### SparkCreditUsageTotal

Create an instance: `const spark_credit_usage_total = client.SparkCreditUsageTotal()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `compute_minutes_used` | `string` |  |
| `compute_usd` | `string` |  |
| `inference_usd` | `string` |  |

#### Example: List

```ts
const spark_credit_usage_totals = await client.SparkCreditUsageTotal().list({ organization_id: "example" })
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


### StatusChange

Create an instance: `const status_change = client.StatusChange()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `id` | `string` |  |
| `patchsets` | `any[]` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |

#### Example: Load

```ts
const status_change = await client.StatusChange().load({ id: 'status_change_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### StatusCommit

Create an instance: `const status_commit = client.StatusCommit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `any[]` |  |
| `commit_sha` | `string` |  |
| `counts` | `Record<string, any>` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const status_commit = await client.StatusCommit().load({ id: 'status_commit_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### StatusPatchset

Create an instance: `const status_patchset = client.StatusPatchset()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `any[]` |  |
| `checks_status` | `string | null` |  |
| `commit_sha` | `string | null` |  |
| `counts` | `Record<string, any>` |  |
| `id` | `string` |  |
| `patchset_id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const status_patchset = await client.StatusPatchset().load({ id: 'status_patchset_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```


### StripeWebhook

Create an instance: `const stripe_webhook = client.StripeWebhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const stripe_webhook = await client.StripeWebhook().create({
})
```


### SubmitTelemetry

Create an instance: `const submit_telemetry = client.SubmitTelemetry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const submit_telemetry = await client.SubmitTelemetry().create({
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


### SwarmEvent

Create an instance: `const swarm_event = client.SwarmEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_swarm_id` | `string` |  |
| `attempt_id` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `id` | `number` |  |
| `kind` | `string` |  |
| `payload` | `Record<string, any>` |  |
| `reason` | `string | null` |  |
| `scheduler_generation` | `number | null` |  |
| `task_id` | `string | null` |  |

#### Example: List

```ts
const swarm_events = await client.SwarmEvent().list({ swarm_id: "example" })
```


### SwarmLive

Create an instance: `const swarm_live = client.SwarmLive()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### SwarmNote

Create an instance: `const swarm_note = client.SwarmNote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `task_id` | `string | null` | A task public id; omitted |
| `text` | `string` |  |

#### Example: Create

```ts
const swarm_note = await client.SwarmNote().create({
  swarm_id: 'example_swarm_id',
  text: 'example_text',
})
```


### SwarmTask

Create an instance: `const swarm_task = client.SwarmTask()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptance_commands` | `any[]` |  |
| `agent_swarm_id` | `string` |  |
| `assigned_runner_id` | `string | null` |  |
| `blocked_reason` | `string | null` |  |
| `changes` | `any[]` |  |
| `commit_count` | `number` |  |
| `commit_sha_result` | `string | null` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `current_attempt_id` | `string | null` |  |
| `deadline_at` | `string | null` |  |
| `depends_on_task_ids` | `any[]` |  |
| `depth` | `number` |  |
| `diff_artifact_url` | `string | null` |  |
| `display_id` | `number` |  |
| `environment_profile` | `string | null` |  |
| `error_message` | `string | null` |  |
| `failure_code` | `string | null` |  |
| `finished_at` | `string | null` |  |
| `finished_at_label` | `string | null` |  |
| `harness` | `string` |  |
| `id` | `string` |  |
| `input_revision` | `string | null` |  |
| `iteration` | `number` |  |
| `landing_state` | `string` |  |
| `model` | `string | null` |  |
| `model_provider` | `string | null` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `owned_paths` | `any[]` |  |
| `parent_task_id` | `string | null` |  |
| `position` | `number` |  |
| `prompt` | `string` |  |
| `queued_at` | `string | null` |  |
| `queued_at_label` | `string | null` |  |
| `reasoning_effort` | `string | null` |  |
| `recent_activity` | `any[]` |  |
| `repo_url` | `string` |  |
| `result` | `Record<string, any>` |  |
| `retry_number` | `number` |  |
| `role` | `string` |  |
| `run_id` | `string | null` |  |
| `stack_after_task_id` | `string | null` |  |
| `started_at` | `string | null` |  |
| `started_at_label` | `string | null` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const swarm_tasks = await client.SwarmTask().list({ swarm_id: "example" })
```


### TaskLease

Create an instance: `const task_lease = client.TaskLease()`

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
const task_lease = await client.TaskLease().create({
  swarm_id: 'example_swarm_id',
  task_id: 'example_task_id',
})
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


### ThreadPreviewAccess

Create an instance: `const thread_preview_access = client.ThreadPreviewAccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ToolFeedback

Create an instance: `const tool_feedback = client.ToolFeedback()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `created_at` | `string` |  |
| `details` | `string` |  |
| `feedback` | `Record<string, any>` |  |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` | `string` |  |
| `source` | `string` |  |
| `summary` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```ts
const tool_feedback = await client.ToolFeedback().load({ id: 'tool_feedback_id', organization_id: 'organization_id' })
```

#### Example: Create

```ts
const tool_feedback = await client.ToolFeedback().create({
  organization_id: 'example_organization_id',
  feedback: {},
})
```


### Transcript

Create an instance: `const transcript = client.Transcript()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent` | `string` |  |
| `author` | `Record<string, any>` |  |
| `checkpoint_pagination` | `Record<string, any>` |  |
| `checkpoints` | `any[]` |  |
| `id` | `string` |  |
| `last_checkpoint_at` | `string | null` |  |
| `selected_checkpoint` | `any` |  |
| `source_url` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |

#### Example: List

```ts
const transcripts = await client.Transcript().list({ repo: "example" })
```


### V1Message

Create an instance: `const v1_message = client.V1Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const v1_message = await client.V1Message().create({
  organization_id: 'example_organization_id',
})
```


### VcBranch

Create an instance: `const vc_branch = client.VcBranch()`

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
| `name` | `string` |  |
| `target_commit_id` | `string` |  |

#### Example: List

```ts
const vc_branchs = await client.VcBranch().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const vc_branch = await client.VcBranch().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
})
```


### VcBrowser

Create an instance: `const vc_browser = client.VcBrowser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### VcChange

Create an instance: `const vc_change = client.VcChange()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `any[]` |  |
| `canonical_path` | `string` |  |
| `change` | `any` |  |
| `checks` | `any[]` |  |
| `checks_status` | `string` |  |
| `description` | `string | null` |  |
| `group` | `Record<string, any> | null` |  |
| `id` | `string` |  |
| `jj_change_id` | `string | null` |  |
| `labels` | `any[]` |  |
| `landing` | `Record<string, any>` | Server-computed submitted-together closure and landing preflight. |
| `number` | `number` |  |
| `patchset_number` | `number | null` |  |
| `previews` | `any[]` |  |
| `primary_status` | `string | null` |  |
| `public_id` | `string` |  |
| `related_changes` | `any[]` |  |
| `relation_chain` | `any[]` |  |
| `restack_state` | `string` |  |
| `review_summary` | `Record<string, any>` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `sync` | `Record<string, any>` |  |
| `target` | `Record<string, any>` |  |
| `target_advanced` | `boolean` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const vc_change = await client.VcChange().load({ id: 'vc_change_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const vc_changes = await client.VcChange().list({ organization_id: "example", repo_id: "example" })
```


### VcChangeGroup

Create an instance: `const vc_change_group = client.VcChangeGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes` | `any[]` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `status` | `string` |  |
| `title` | `string | null` |  |

#### Example: Load

```ts
const vc_change_group = await client.VcChangeGroup().load({ id: 'vc_change_group_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const vc_change_groups = await client.VcChangeGroup().list({ organization_id: "example", repo_id: "example" })
```

#### Example: Create

```ts
const vc_change_group = await client.VcChangeGroup().create({
  organization_id: 'example_organization_id',
  repo_id: 'example_repo_id',
  name: 'example_name',
})
```


### VcFile

Create an instance: `const vc_file = client.VcFile()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paths` | `any[]` |  |
| `truncated` | `boolean` |  |

#### Example: List

```ts
const vc_files = await client.VcFile().list({ organization_id: "example", repo_id: "example", ref: "example" })
```


### VcMergeQueue

Create an instance: `const vc_merge_queue = client.VcMergeQueue()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `Record<string, any>` | Queue performance for the reporting window. |
| `id` | `string` |  |
| `policy` | `Record<string, any>` |  |
| `queue` | `Record<string, any>` |  |
| `target_branches` | `any[]` | Bookmark names for the target picker. |

#### Example: Load

```ts
const vc_merge_queue = await client.VcMergeQueue().load({ id: 'vc_merge_queue_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const vc_merge_queues = await client.VcMergeQueue().list({ organization_id: "example", repo_id: "example" })
```


### VcStack

Create an instance: `const vc_stack = client.VcStack()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias_ref_name` | `string | null` |  |
| `changes` | `any[]` |  |
| `code` | `string` |  |
| `id` | `string` |  |
| `landing` | `Record<string, any>` | Compact landing state for the Stack CLI. |
| `member_count` | `number` |  |
| `name` | `string | null` |  |
| `ref_name` | `string` |  |
| `status` | `string` |  |
| `tip_change_number` | `number | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string` |  |

#### Example: Load

```ts
const vc_stack = await client.VcStack().load({ id: 'vc_stack_id', organization_id: 'organization_id', repo_id: 'repo_id' })
```

#### Example: List

```ts
const vc_stacks = await client.VcStack().list({ organization_id: "example", repo_id: "example" })
```


### VcsNode

Create an instance: `const vcs_node = client.VcsNode()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string | null` |  |
| `account_id` | `string | null` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string | null` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string | null` |  |
| `installed_at_label` | `string | null` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `any[]` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Record<string, any>` |  |
| `status` | `string` |  |
| `suspended_at` | `string | null` |  |
| `suspended_at_label` | `string | null` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string | null` |  |

#### Example: List

```ts
const vcs_nodes = await client.VcsNode().list({ organization_id: "example" })
```


### VcsSetting

Create an instance: `const vcs_setting = client.VcsSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `boolean` |  |
| `can_manage_sandbox_region` | `boolean` |  |
| `dedicated_outbound_ip_addresses` | `any[]` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `Record<string, any>` |  |
| `sandbox_regions` | `any[]` |  |

#### Example: List

```ts
const vcs_settings = await client.VcsSetting().list({ organization_id: "example" })
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


### VerifyEmailVerification

Create an instance: `const verify_email_verification = client.VerifyEmailVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const verify_email_verifications = await client.VerifyEmailVerification().list()
```


### VerifySignalIntegration

Create an instance: `const verify_signal_integration = client.VerifySignalIntegration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token_stored` | `boolean` |  |
| `config` | `Record<string, any>` |  |
| `created_at` | `string | null` |  |
| `failure_message` | `string | null` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `string | null` |  |
| `last_verified_at` | `string | null` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `number` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `number` |  |
| `unmapped_delivery_count` | `number` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `string | null` |  |
| `webhook_secret_stored` | `boolean` |  |

#### Example: Create

```ts
const verify_signal_integration = await client.VerifySignalIntegration().create({
  id: 'example_id',
  organization_id: 'example_organization_id',
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


### WaitlistApplication

Create an instance: `const waitlist_application = client.WaitlistApplication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const waitlist_application = await client.WaitlistApplication().create({
})
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


### WebhookGitlab

Create an instance: `const webhook_gitlab = client.WebhookGitlab()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### WorkspaceActivity

Create an instance: `const workspace_activity = client.WorkspaceActivity()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `live_activity` | `any[]` |  |
| `recent_items` | `any[]` |  |
| `unresolved_notification_count` | `number` |  |

#### Example: Load

```ts
const workspace_activity = await client.WorkspaceActivity().load({ organization_id: 'organization_id' })
```


### WorkspaceActivityNotification

Create an instance: `const workspace_activity_notification = client.WorkspaceActivityNotification()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceSpace

Create an instance: `const workspace_space = client.WorkspaceSpace()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `string | null` |  |
| `hidden` | `boolean` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `import_status` | `string | null` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `position` | `number | null` |  |
| `repository_id` | `string` |  |
| `repository_slug` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const workspace_space = await client.WorkspaceSpace().load({ id: 'workspace_space_id', organization_id: 'organization_id' })
```

#### Example: List

```ts
const workspace_spaces = await client.WorkspaceSpace().list({ organization_id: "example" })
```

#### Example: Create

```ts
const workspace_space = await client.WorkspaceSpace().create({
  organization_id: 'example_organization_id',
  icon_name: 'example_icon_name',
  name: 'example_name',
  slug: 'example_slug',
})
```


### WorkspaceSpacePreference

Create an instance: `const workspace_space_preference = client.WorkspaceSpacePreference()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `preferences` | `any[]` |  |
| `spaces` | `any[]` |  |

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

17 fields are carried as open values rather than typed structures.
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
| `control_computer_control_operation` | `result` | 10 | 2 levels |
| `device_control_operation` | `result` | 10 | 2 levels |
| `local_thread_operation` | `result` | 10 | 2 levels |
| `spark_agent_local_thread` | `result` | 10 | 2 levels |
| `workspace_activity` | `recent_items` | 7 | 1 level |
| `page_agent` | `inbox` | 6 | 14 levels |
| `agent` | `configuration` | 5 | 9 levels |
| `agent_manager` | `configuration` | 5 | 9 levels |
| `interaction_response` | `answer` | 5 | 3 levels |
| `page_agent` | `new_configuration` | 5 | 9 levels |
| `page_agent` | `selected_agent` | 5 | 15 levels |
| `change` | `result` | 4 | 9 levels |
| `workspace_activity` | `live_activity` | 4 | 1 level |

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
const agentoperation = client.AgentOperation()
await agentoperation.load({ agent_id: "example", id: "example_id", organization_id: "example" })

// agentoperation.data() now returns the agentoperation data from the last `load`
// agentoperation.match() returns { id: "example_id" }
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
