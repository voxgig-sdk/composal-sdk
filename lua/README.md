# Composal Lua SDK



The Lua SDK for the Composal API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:A2aWellKnown()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

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

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local agent, err = client:Agent():load({ organization_id = "example_organization_id", id = "example_id" })
if err then error(err) end
local rec = agent:data_get()
print(rec["id"])
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local githubonboarding, err = client:GithubOnboarding():load({ organization_id = "example" })
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

local result, err = client:GithubOnboarding():load({ organization_id = "example" })
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
| `A2aWellKnown` | `(data) -> A2aWellKnownEntity` | Create an A2aWellKnown entity instance. |
| `AdminOrg` | `(data) -> AdminOrgEntity` | Create an AdminOrg entity instance. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `AgentApp` | `(data) -> AgentAppEntity` | Create an AgentApp entity instance. |
| `AgentAppInstall` | `(data) -> AgentAppInstallEntity` | Create an AgentAppInstall entity instance. |
| `AgentAttachment` | `(data) -> AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAvatar` | `(data) -> AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `(data) -> AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer` | `(data) -> AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection` | `(data) -> AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentConnectionDelegation` | `(data) -> AgentConnectionDelegationEntity` | Create an AgentConnectionDelegation entity instance. |
| `AgentConnectionGrant` | `(data) -> AgentConnectionGrantEntity` | Create an AgentConnectionGrant entity instance. |
| `AgentConnectionResource` | `(data) -> AgentConnectionResourceEntity` | Create an AgentConnectionResource entity instance. |
| `AgentConnectionSafetyControl` | `(data) -> AgentConnectionSafetyControlEntity` | Create an AgentConnectionSafetyControl entity instance. |
| `AgentConnectionTriggerSubscription` | `(data) -> AgentConnectionTriggerSubscriptionEntity` | Create an AgentConnectionTriggerSubscription entity instance. |
| `AgentContextCheckpoint` | `(data) -> AgentContextCheckpointEntity` | Create an AgentContextCheckpoint entity instance. |
| `AgentControlFlow` | `(data) -> AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `(data) -> AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `(data) -> AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentEvent` | `(data) -> AgentEventEntity` | Create an AgentEvent entity instance. |
| `AgentFile` | `(data) -> AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput` | `(data) -> AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration` | `(data) -> AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
| `AgentIntegrationAccount` | `(data) -> AgentIntegrationAccountEntity` | Create an AgentIntegrationAccount entity instance. |
| `AgentIntegrationCallback` | `(data) -> AgentIntegrationCallbackEntity` | Create an AgentIntegrationCallback entity instance. |
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
| `AgentRelayFileGrant` | `(data) -> AgentRelayFileGrantEntity` | Create an AgentRelayFileGrant entity instance. |
| `AgentRelayFileGrantAccount` | `(data) -> AgentRelayFileGrantAccountEntity` | Create an AgentRelayFileGrantAccount entity instance. |
| `AgentRepository` | `(data) -> AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource` | `(data) -> AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoder` | `(data) -> AgentRoderEntity` | Create an AgentRoder entity instance. |
| `AgentRoutine` | `(data) -> AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun` | `(data) -> AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime` | `(data) -> AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSession` | `(data) -> AgentSessionEntity` | Create an AgentSession entity instance. |
| `AgentSessionCheckpoint` | `(data) -> AgentSessionCheckpointEntity` | Create an AgentSessionCheckpoint entity instance. |
| `AgentSessionRoderHandoff` | `(data) -> AgentSessionRoderHandoffEntity` | Create an AgentSessionRoderHandoff entity instance. |
| `AgentSetting` | `(data) -> AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing` | `(data) -> AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite` | `(data) -> AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill` | `(data) -> AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack` | `(data) -> AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `(data) -> AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `(data) -> AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentSwarm` | `(data) -> AgentSwarmEntity` | Create an AgentSwarm entity instance. |
| `AgentTeammate` | `(data) -> AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `(data) -> AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread` | `(data) -> AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool` | `(data) -> AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentUsage` | `(data) -> AgentUsageEntity` | Create an AgentUsage entity instance. |
| `AgentVerifyProject` | `(data) -> AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `(data) -> AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebPreview` | `(data) -> AgentWebPreviewEntity` | Create an AgentWebPreview entity instance. |
| `AgentWebhook` | `(data) -> AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork` | `(data) -> AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `(data) -> AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `(data) -> AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `(data) -> AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `(data) -> AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `(data) -> AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `(data) -> AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `Agreement` | `(data) -> AgreementEntity` | Create an Agreement entity instance. |
| `AgreementAccessRequest` | `(data) -> AgreementAccessRequestEntity` | Create an AgreementAccessRequest entity instance. |
| `AlertRuleEvent` | `(data) -> AlertRuleEventEntity` | Create an AlertRuleEvent entity instance. |
| `AllocationLog` | `(data) -> AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App` | `(data) -> AppEntity` | Create an App entity instance. |
| `AppAccess` | `(data) -> AppAccessEntity` | Create an AppAccess entity instance. |
| `AppAccessJwk` | `(data) -> AppAccessJwkEntity` | Create an AppAccessJwk entity instance. |
| `AppCdn` | `(data) -> AppCdnEntity` | Create an AppCdn entity instance. |
| `AppConfigVariable` | `(data) -> AppConfigVariableEntity` | Create an AppConfigVariable entity instance. |
| `AppDataResource` | `(data) -> AppDataResourceEntity` | Create an AppDataResource entity instance. |
| `AppDeploy` | `(data) -> AppDeployEntity` | Create an AppDeploy entity instance. |
| `AppDeployment` | `(data) -> AppDeploymentEntity` | Create an AppDeployment entity instance. |
| `AppDeploymentDashboard` | `(data) -> AppDeploymentDashboardEntity` | Create an AppDeploymentDashboard entity instance. |
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
| `Artefact` | `(data) -> ArtefactEntity` | Create an Artefact entity instance. |
| `ArtefactCommentThread` | `(data) -> ArtefactCommentThreadEntity` | Create an ArtefactCommentThread entity instance. |
| `ArtefactRevision` | `(data) -> ArtefactRevisionEntity` | Create an ArtefactRevision entity instance. |
| `ArtefactViewToken` | `(data) -> ArtefactViewTokenEntity` | Create an ArtefactViewToken entity instance. |
| `Artifact` | `(data) -> ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactCacheNamespace` | `(data) -> ArtifactCacheNamespaceEntity` | Create an ArtifactCacheNamespace entity instance. |
| `ArtifactImageRepository` | `(data) -> ArtifactImageRepositoryEntity` | Create an ArtifactImageRepository entity instance. |
| `ArtifactPackageMirror` | `(data) -> ArtifactPackageMirrorEntity` | Create an ArtifactPackageMirror entity instance. |
| `ArtifactRetentionPolicy` | `(data) -> ArtifactRetentionPolicyEntity` | Create an ArtifactRetentionPolicy entity instance. |
| `AttachmentPart` | `(data) -> AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AuditEvent` | `(data) -> AuditEventEntity` | Create an AuditEvent entity instance. |
| `Auth` | `(data) -> AuthEntity` | Create an Auth entity instance. |
| `AuthCli` | `(data) -> AuthCliEntity` | Create an AuthCli entity instance. |
| `AuthGithub` | `(data) -> AuthGithubEntity` | Create an AuthGithub entity instance. |
| `AuthGoogle` | `(data) -> AuthGoogleEntity` | Create an AuthGoogle entity instance. |
| `AuthOpenai` | `(data) -> AuthOpenaiEntity` | Create an AuthOpenai entity instance. |
| `AuthPasswordReset` | `(data) -> AuthPasswordResetEntity` | Create an AuthPasswordReset entity instance. |
| `AuthRegistrationOption` | `(data) -> AuthRegistrationOptionEntity` | Create an AuthRegistrationOption entity instance. |
| `AutomationEvent` | `(data) -> AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `(data) -> AutomationRunEntity` | Create an AutomationRun entity instance. |
| `BackendRunnerPool` | `(data) -> BackendRunnerPoolEntity` | Create a BackendRunnerPool entity instance. |
| `Bazel` | `(data) -> BazelEntity` | Create a Bazel entity instance. |
| `BazelActionResult` | `(data) -> BazelActionResultEntity` | Create a BazelActionResult entity instance. |
| `BazelBackend` | `(data) -> BazelBackendEntity` | Create a BazelBackend entity instance. |
| `BazelBlob` | `(data) -> BazelBlobEntity` | Create a BazelBlob entity instance. |
| `BazelExecution` | `(data) -> BazelExecutionEntity` | Create a BazelExecution entity instance. |
| `BazelFindMissingBlob` | `(data) -> BazelFindMissingBlobEntity` | Create a BazelFindMissingBlob entity instance. |
| `Billing` | `(data) -> BillingEntity` | Create a Billing entity instance. |
| `BillingAddon` | `(data) -> BillingAddonEntity` | Create a BillingAddon entity instance. |
| `BillingBudget` | `(data) -> BillingBudgetEntity` | Create a BillingBudget entity instance. |
| `BillingCheckoutSession` | `(data) -> BillingCheckoutSessionEntity` | Create a BillingCheckoutSession entity instance. |
| `BillingContact` | `(data) -> BillingContactEntity` | Create a BillingContact entity instance. |
| `BillingExtraSpend` | `(data) -> BillingExtraSpendEntity` | Create a BillingExtraSpend entity instance. |
| `BillingInvoice` | `(data) -> BillingInvoiceEntity` | Create a BillingInvoice entity instance. |
| `BillingPackage` | `(data) -> BillingPackageEntity` | Create a BillingPackage entity instance. |
| `BillingPortalSession` | `(data) -> BillingPortalSessionEntity` | Create a BillingPortalSession entity instance. |
| `BillingPrepaidPeriod` | `(data) -> BillingPrepaidPeriodEntity` | Create a BillingPrepaidPeriod entity instance. |
| `BillingPrepaidPurchase` | `(data) -> BillingPrepaidPurchaseEntity` | Create a BillingPrepaidPurchase entity instance. |
| `BillingSubscription` | `(data) -> BillingSubscriptionEntity` | Create a BillingSubscription entity instance. |
| `BillingTokenTopUp` | `(data) -> BillingTokenTopUpEntity` | Create a BillingTokenTopUp entity instance. |
| `BillingUsage` | `(data) -> BillingUsageEntity` | Create a BillingUsage entity instance. |
| `Binary` | `(data) -> BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion` | `(data) -> BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BookmarkProtectionRefreshGithubRequiredCheck` | `(data) -> BookmarkProtectionRefreshGithubRequiredCheckEntity` | Create a BookmarkProtectionRefreshGithubRequiredCheck entity instance. |
| `BrowserEgressCandidate` | `(data) -> BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `(data) -> BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `(data) -> BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `(data) -> BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `(data) -> BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `(data) -> BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `(data) -> BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `(data) -> BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `(data) -> BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CacheNamespaceEntry` | `(data) -> CacheNamespaceEntryEntity` | Create a CacheNamespaceEntry entity instance. |
| `CatalogSelector` | `(data) -> CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `(data) -> CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `(data) -> CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace` | `(data) -> CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `(data) -> CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `Change` | `(data) -> ChangeEntity` | Create a Change entity instance. |
| `ChangeAsset` | `(data) -> ChangeAssetEntity` | Create a ChangeAsset entity instance. |
| `ChangeComment` | `(data) -> ChangeCommentEntity` | Create a ChangeComment entity instance. |
| `ChangeFileReviewCheckpoint` | `(data) -> ChangeFileReviewCheckpointEntity` | Create a ChangeFileReviewCheckpoint entity instance. |
| `ChangeGitBranchSubmission` | `(data) -> ChangeGitBranchSubmissionEntity` | Create a ChangeGitBranchSubmission entity instance. |
| `ChangeGitCommitIdentity` | `(data) -> ChangeGitCommitIdentityEntity` | Create a ChangeGitCommitIdentity entity instance. |
| `ChangeGitPublication` | `(data) -> ChangeGitPublicationEntity` | Create a ChangeGitPublication entity instance. |
| `ChangeGroupMember` | `(data) -> ChangeGroupMemberEntity` | Create a ChangeGroupMember entity instance. |
| `ChangeLabel` | `(data) -> ChangeLabelEntity` | Create a ChangeLabel entity instance. |
| `ChangeLandingHold` | `(data) -> ChangeLandingHoldEntity` | Create a ChangeLandingHold entity instance. |
| `ChangeLandingRequest` | `(data) -> ChangeLandingRequestEntity` | Create a ChangeLandingRequest entity instance. |
| `ChangeRequestChange` | `(data) -> ChangeRequestChangeEntity` | Create a ChangeRequestChange entity instance. |
| `ChangeReviewer` | `(data) -> ChangeReviewerEntity` | Create a ChangeReviewer entity instance. |
| `ChangeTranscript` | `(data) -> ChangeTranscriptEntity` | Create a ChangeTranscript entity instance. |
| `ChangeTranscriptSummary` | `(data) -> ChangeTranscriptSummaryEntity` | Create a ChangeTranscriptSummary entity instance. |
| `CheckpointPrepareChunk` | `(data) -> CheckpointPrepareChunkEntity` | Create a CheckpointPrepareChunk entity instance. |
| `CiNode` | `(data) -> CiNodeEntity` | Create a CiNode entity instance. |
| `CiPipeline` | `(data) -> CiPipelineEntity` | Create a CiPipeline entity instance. |
| `CiPipelineRun` | `(data) -> CiPipelineRunEntity` | Create a CiPipelineRun entity instance. |
| `CiRunnerPool` | `(data) -> CiRunnerPoolEntity` | Create a CiRunnerPool entity instance. |
| `CiStatus` | `(data) -> CiStatusEntity` | Create a CiStatus entity instance. |
| `CliEvent` | `(data) -> CliEventEntity` | Create a CliEvent entity instance. |
| `CliRelease` | `(data) -> CliReleaseEntity` | Create a CliRelease entity instance. |
| `CloudWorkspaceBackupObject` | `(data) -> CloudWorkspaceBackupObjectEntity` | Create a CloudWorkspaceBackupObject entity instance. |
| `CodeRuleEvaluation` | `(data) -> CodeRuleEvaluationEntity` | Create a CodeRuleEvaluation entity instance. |
| `ComSiteAccess` | `(data) -> ComSiteAccessEntity` | Create a ComSiteAccess entity instance. |
| `ComSiteAccessSession` | `(data) -> ComSiteAccessSessionEntity` | Create a ComSiteAccessSession entity instance. |
| `CommentThreadComment` | `(data) -> CommentThreadCommentEntity` | Create a CommentThreadComment entity instance. |
| `CommitDiff` | `(data) -> CommitDiffEntity` | Create a CommitDiff entity instance. |
| `ConnectionRequest` | `(data) -> ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `(data) -> ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
| `ContactSubmission` | `(data) -> ContactSubmissionEntity` | Create a ContactSubmission entity instance. |
| `ControlComputer` | `(data) -> ControlComputerEntity` | Create a ControlComputer entity instance. |
| `ControlComputerControlOperation` | `(data) -> ControlComputerControlOperationEntity` | Create a ControlComputerControlOperation entity instance. |
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
| `Deployment` | `(data) -> DeploymentEntity` | Create a Deployment entity instance. |
| `DeploymentDashboardNomad` | `(data) -> DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentDetail` | `(data) -> DeploymentDetailEntity` | Create a DeploymentDetail entity instance. |
| `DeploymentFile` | `(data) -> DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DeploymentLog` | `(data) -> DeploymentLogEntity` | Create a DeploymentLog entity instance. |
| `DeploymentMetric` | `(data) -> DeploymentMetricEntity` | Create a DeploymentMetric entity instance. |
| `DeploymentPreview` | `(data) -> DeploymentPreviewEntity` | Create a DeploymentPreview entity instance. |
| `DeploymentSetting` | `(data) -> DeploymentSettingEntity` | Create a DeploymentSetting entity instance. |
| `DesktopLocalAgentModel` | `(data) -> DesktopLocalAgentModelEntity` | Create a DesktopLocalAgentModel entity instance. |
| `DesktopLocalAgentResponse` | `(data) -> DesktopLocalAgentResponseEntity` | Create a DesktopLocalAgentResponse entity instance. |
| `Device` | `(data) -> DeviceEntity` | Create a Device entity instance. |
| `DeviceBrowserOperation` | `(data) -> DeviceBrowserOperationEntity` | Create a DeviceBrowserOperation entity instance. |
| `DeviceControlMessage` | `(data) -> DeviceControlMessageEntity` | Create a DeviceControlMessage entity instance. |
| `DeviceEnterpriseRelay` | `(data) -> DeviceEnterpriseRelayEntity` | Create a DeviceEnterpriseRelay entity instance. |
| `DeviceFolderListing` | `(data) -> DeviceFolderListingEntity` | Create a DeviceFolderListing entity instance. |
| `DeviceGrant` | `(data) -> DeviceGrantEntity` | Create a DeviceGrant entity instance. |
| `DeviceInvocation` | `(data) -> DeviceInvocationEntity` | Create a DeviceInvocation entity instance. |
| `DeviceLocalEvent` | `(data) -> DeviceLocalEventEntity` | Create a DeviceLocalEvent entity instance. |
| `DeviceOperation` | `(data) -> DeviceOperationEntity` | Create a DeviceOperation entity instance. |
| `DevicePairing` | `(data) -> DevicePairingEntity` | Create a DevicePairing entity instance. |
| `DeviceProject` | `(data) -> DeviceProjectEntity` | Create a DeviceProject entity instance. |
| `DeviceScheduledCheckIn` | `(data) -> DeviceScheduledCheckInEntity` | Create a DeviceScheduledCheckIn entity instance. |
| `DockerBuilder` | `(data) -> DockerBuilderEntity` | Create a DockerBuilder entity instance. |
| `DockerBuilderSession` | `(data) -> DockerBuilderSessionEntity` | Create a DockerBuilderSession entity instance. |
| `DockerBuilderSetting` | `(data) -> DockerBuilderSettingEntity` | Create a DockerBuilderSetting entity instance. |
| `DomainDnsIntegration` | `(data) -> DomainDnsIntegrationEntity` | Create a DomainDnsIntegration entity instance. |
| `DomainPathRule` | `(data) -> DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream` | `(data) -> DreamEntity` | Create a Dream entity instance. |
| `Edge` | `(data) -> EdgeEntity` | Create an Edge entity instance. |
| `EmailVerification` | `(data) -> EmailVerificationEntity` | Create an EmailVerification entity instance. |
| `EnvironmentDiscoveryRun` | `(data) -> EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `(data) -> EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `(data) -> EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `(data) -> EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `(data) -> EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `(data) -> EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `ExecutionDesiredState` | `(data) -> ExecutionDesiredStateEntity` | Create an ExecutionDesiredState entity instance. |
| `ExecutionReconcilerTick` | `(data) -> ExecutionReconcilerTickEntity` | Create an ExecutionReconcilerTick entity instance. |
| `ExecutionRelease` | `(data) -> ExecutionReleaseEntity` | Create an ExecutionRelease entity instance. |
| `ExecutionRuntimeInstance` | `(data) -> ExecutionRuntimeInstanceEntity` | Create an ExecutionRuntimeInstance entity instance. |
| `Exploration` | `(data) -> ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage` | `(data) -> ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `(data) -> ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `(data) -> ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding` | `(data) -> FindingEntity` | Create a Finding entity instance. |
| `Gh` | `(data) -> GhEntity` | Create a Gh entity instance. |
| `GitImport` | `(data) -> GitImportEntity` | Create a GitImport entity instance. |
| `Github` | `(data) -> GithubEntity` | Create a Github entity instance. |
| `GithubApp` | `(data) -> GithubAppEntity` | Create a GithubApp entity instance. |
| `GithubAppImportableRepository` | `(data) -> GithubAppImportableRepositoryEntity` | Create a GithubAppImportableRepository entity instance. |
| `GithubAppInstallation` | `(data) -> GithubAppInstallationEntity` | Create a GithubAppInstallation entity instance. |
| `GithubAppInstallationAuthorization` | `(data) -> GithubAppInstallationAuthorizationEntity` | Create a GithubAppInstallationAuthorization entity instance. |
| `GithubAppUserAuthorization` | `(data) -> GithubAppUserAuthorizationEntity` | Create a GithubAppUserAuthorization entity instance. |
| `GithubCiRepository` | `(data) -> GithubCiRepositoryEntity` | Create a GithubCiRepository entity instance. |
| `GithubCiRepositoryCompatibilityReport` | `(data) -> GithubCiRepositoryCompatibilityReportEntity` | Create a GithubCiRepositoryCompatibilityReport entity instance. |
| `GithubConnection` | `(data) -> GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `GithubOnboarding` | `(data) -> GithubOnboardingEntity` | Create a GithubOnboarding entity instance. |
| `GithubOnboardingBranch` | `(data) -> GithubOnboardingBranchEntity` | Create a GithubOnboardingBranch entity instance. |
| `GithubOnboardingImport` | `(data) -> GithubOnboardingImportEntity` | Create a GithubOnboardingImport entity instance. |
| `GithubOnboardingImportBatch` | `(data) -> GithubOnboardingImportBatchEntity` | Create a GithubOnboardingImportBatch entity instance. |
| `GithubOnboardingImportItem` | `(data) -> GithubOnboardingImportItemEntity` | Create a GithubOnboardingImportItem entity instance. |
| `GithubPullRequest` | `(data) -> GithubPullRequestEntity` | Create a GithubPullRequest entity instance. |
| `GithubRunnerAdmission` | `(data) -> GithubRunnerAdmissionEntity` | Create a GithubRunnerAdmission entity instance. |
| `GithubRunnerCache` | `(data) -> GithubRunnerCacheEntity` | Create a GithubRunnerCache entity instance. |
| `GithubRunnerEgress` | `(data) -> GithubRunnerEgressEntity` | Create a GithubRunnerEgress entity instance. |
| `GithubRunnerHistory` | `(data) -> GithubRunnerHistoryEntity` | Create a GithubRunnerHistory entity instance. |
| `GithubRunnerImage` | `(data) -> GithubRunnerImageEntity` | Create a GithubRunnerImage entity instance. |
| `GithubRunnerPool` | `(data) -> GithubRunnerPoolEntity` | Create a GithubRunnerPool entity instance. |
| `GithubRunnerSetup` | `(data) -> GithubRunnerSetupEntity` | Create a GithubRunnerSetup entity instance. |
| `Gitlab` | `(data) -> GitlabEntity` | Create a Gitlab entity instance. |
| `GitlabConnection` | `(data) -> GitlabConnectionEntity` | Create a GitlabConnection entity instance. |
| `GitlabImport` | `(data) -> GitlabImportEntity` | Create a GitlabImport entity instance. |
| `GitlabOauth` | `(data) -> GitlabOauthEntity` | Create a GitlabOauth entity instance. |
| `GrantAllAgent` | `(data) -> GrantAllAgentEntity` | Create a GrantAllAgent entity instance. |
| `HostingAppDomain` | `(data) -> HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `IdentityOrganization` | `(data) -> IdentityOrganizationEntity` | Create an IdentityOrganization entity instance. |
| `ImageRepository` | `(data) -> ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `ImageRepositoryTag` | `(data) -> ImageRepositoryTagEntity` | Create an ImageRepositoryTag entity instance. |
| `ImportBranchPolicy` | `(data) -> ImportBranchPolicyEntity` | Create an ImportBranchPolicy entity instance. |
| `Integration` | `(data) -> IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse` | `(data) -> InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation` | `(data) -> InvitationEntity` | Create an Invitation entity instance. |
| `InvocationControl` | `(data) -> InvocationControlEntity` | Create an InvocationControl entity instance. |
| `JobLogChunk` | `(data) -> JobLogChunkEntity` | Create a JobLogChunk entity instance. |
| `JobStep` | `(data) -> JobStepEntity` | Create a JobStep entity instance. |
| `JobWorkspace` | `(data) -> JobWorkspaceEntity` | Create a JobWorkspace entity instance. |
| `JourneyVariantReplay` | `(data) -> JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `(data) -> KnowledgeEntity` | Create a Knowledge entity instance. |
| `Known` | `(data) -> KnownEntity` | Create a Known entity instance. |
| `Label` | `(data) -> LabelEntity` | Create a Label entity instance. |
| `LeaseArtifact` | `(data) -> LeaseArtifactEntity` | Create a LeaseArtifact entity instance. |
| `LeaseCache` | `(data) -> LeaseCacheEntity` | Create a LeaseCache entity instance. |
| `LeaseLogChunk` | `(data) -> LeaseLogChunkEntity` | Create a LeaseLogChunk entity instance. |
| `LeaseReconciliation` | `(data) -> LeaseReconciliationEntity` | Create a LeaseReconciliation entity instance. |
| `LeaseStep` | `(data) -> LeaseStepEntity` | Create a LeaseStep entity instance. |
| `LeaseVerifyDiagnostic` | `(data) -> LeaseVerifyDiagnosticEntity` | Create a LeaseVerifyDiagnostic entity instance. |
| `LeaseVerifySecret` | `(data) -> LeaseVerifySecretEntity` | Create a LeaseVerifySecret entity instance. |
| `LeaseWorkspace` | `(data) -> LeaseWorkspaceEntity` | Create a LeaseWorkspace entity instance. |
| `LocalAgentDecision` | `(data) -> LocalAgentDecisionEntity` | Create a LocalAgentDecision entity instance. |
| `LocalAgentResponse` | `(data) -> LocalAgentResponseEntity` | Create a LocalAgentResponse entity instance. |
| `LocalThreadDelivery` | `(data) -> LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `(data) -> LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `LogStreamChunk` | `(data) -> LogStreamChunkEntity` | Create a LogStreamChunk entity instance. |
| `LogoImage` | `(data) -> LogoImageEntity` | Create a LogoImage entity instance. |
| `MarketingSetting` | `(data) -> MarketingSettingEntity` | Create a MarketingSetting entity instance. |
| `McpOauth` | `(data) -> McpOauthEntity` | Create a McpOauth entity instance. |
| `Me` | `(data) -> MeEntity` | Create a Me entity instance. |
| `MeEmail` | `(data) -> MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding` | `(data) -> MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile` | `(data) -> MediaFileEntity` | Create a MediaFile entity instance. |
| `Member` | `(data) -> MemberEntity` | Create a Member entity instance. |
| `Memory` | `(data) -> MemoryEntity` | Create a Memory entity instance. |
| `MergeQueueEntry` | `(data) -> MergeQueueEntryEntity` | Create a MergeQueueEntry entity instance. |
| `MergeResolution` | `(data) -> MergeResolutionEntity` | Create a MergeResolution entity instance. |
| `MessagingConversationMessage` | `(data) -> MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `(data) -> MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `(data) -> MetricQueryEntity` | Create a MetricQuery entity instance. |
| `MetronomeWebhook` | `(data) -> MetronomeWebhookEntity` | Create a MetronomeWebhook entity instance. |
| `ModelSubscriptionAccount` | `(data) -> ModelSubscriptionAccountEntity` | Create a ModelSubscriptionAccount entity instance. |
| `ModelSubscriptionAccountConnection` | `(data) -> ModelSubscriptionAccountConnectionEntity` | Create a ModelSubscriptionAccountConnection entity instance. |
| `NetworkConnection` | `(data) -> NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NetworkingSpace` | `(data) -> NetworkingSpaceEntity` | Create a NetworkingSpace entity instance. |
| `Node` | `(data) -> NodeEntity` | Create a Node entity instance. |
| `NodeCertificate` | `(data) -> NodeCertificateEntity` | Create a NodeCertificate entity instance. |
| `NodeLease` | `(data) -> NodeLeaseEntity` | Create a NodeLease entity instance. |
| `NomadAllocation` | `(data) -> NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog` | `(data) -> NomadLogEntity` | Create a NomadLog entity instance. |
| `Now` | `(data) -> NowEntity` | Create a Now entity instance. |
| `ObservabilityClickhouseCluster` | `(data) -> ObservabilityClickhouseClusterEntity` | Create an ObservabilityClickhouseCluster entity instance. |
| `ObservabilityQuickwitCluster` | `(data) -> ObservabilityQuickwitClusterEntity` | Create an ObservabilityQuickwitCluster entity instance. |
| `ObservabilitySpace` | `(data) -> ObservabilitySpaceEntity` | Create an ObservabilitySpace entity instance. |
| `Openapi` | `(data) -> OpenapiEntity` | Create an Openapi entity instance. |
| `OrgInvitation` | `(data) -> OrgInvitationEntity` | Create an OrgInvitation entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationApp` | `(data) -> OrganizationAppEntity` | Create an OrganizationApp entity instance. |
| `OrganizationControl` | `(data) -> OrganizationControlEntity` | Create an OrganizationControl entity instance. |
| `OrganizationDevice` | `(data) -> OrganizationDeviceEntity` | Create an OrganizationDevice entity instance. |
| `OrganizationIdentityCertificate` | `(data) -> OrganizationIdentityCertificateEntity` | Create an OrganizationIdentityCertificate entity instance. |
| `OrganizationInteraction` | `(data) -> OrganizationInteractionEntity` | Create an OrganizationInteraction entity instance. |
| `OrganizationInvitation` | `(data) -> OrganizationInvitationEntity` | Create an OrganizationInvitation entity instance. |
| `OrganizationMessageFile` | `(data) -> OrganizationMessageFileEntity` | Create an OrganizationMessageFile entity instance. |
| `OrganizationOidcTrust` | `(data) -> OrganizationOidcTrustEntity` | Create an OrganizationOidcTrust entity instance. |
| `OrganizationRunEvent` | `(data) -> OrganizationRunEventEntity` | Create an OrganizationRunEvent entity instance. |
| `OrganizationRunOutcome` | `(data) -> OrganizationRunOutcomeEntity` | Create an OrganizationRunOutcome entity instance. |
| `OrganizationRunUsage` | `(data) -> OrganizationRunUsageEntity` | Create an OrganizationRunUsage entity instance. |
| `OrganizationSandbox` | `(data) -> OrganizationSandboxEntity` | Create an OrganizationSandbox entity instance. |
| `OrganizationSecret` | `(data) -> OrganizationSecretEntity` | Create an OrganizationSecret entity instance. |
| `OrganizationServiceAccount` | `(data) -> OrganizationServiceAccountEntity` | Create an OrganizationServiceAccount entity instance. |
| `OrganizationSetting` | `(data) -> OrganizationSettingEntity` | Create an OrganizationSetting entity instance. |
| `OrganizationSite` | `(data) -> OrganizationSiteEntity` | Create an OrganizationSite entity instance. |
| `OrganizationSubscription` | `(data) -> OrganizationSubscriptionEntity` | Create an OrganizationSubscription entity instance. |
| `OrganizationTool` | `(data) -> OrganizationToolEntity` | Create an OrganizationTool entity instance. |
| `OrganizationWorkloadIdentity` | `(data) -> OrganizationWorkloadIdentityEntity` | Create an OrganizationWorkloadIdentity entity instance. |
| `OtelIngest` | `(data) -> OtelIngestEntity` | Create an OtelIngest entity instance. |
| `Page` | `(data) -> PageEntity` | Create a Page entity instance. |
| `PageAgent` | `(data) -> PageAgentEntity` | Create a PageAgent entity instance. |
| `PageArtefact` | `(data) -> PageArtefactEntity` | Create a PageArtefact entity instance. |
| `PageCiPipelineRun` | `(data) -> PageCiPipelineRunEntity` | Create a PageCiPipelineRun entity instance. |
| `PageProjectRun` | `(data) -> PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PageRepoVcCommit` | `(data) -> PageRepoVcCommitEntity` | Create a PageRepoVcCommit entity instance. |
| `PagesBilling` | `(data) -> PagesBillingEntity` | Create a PagesBilling entity instance. |
| `PagesGithubIntegration` | `(data) -> PagesGithubIntegrationEntity` | Create a PagesGithubIntegration entity instance. |
| `PagesGithubOnboarding` | `(data) -> PagesGithubOnboardingEntity` | Create a PagesGithubOnboarding entity instance. |
| `PagesMember` | `(data) -> PagesMemberEntity` | Create a PagesMember entity instance. |
| `PagesProjectCredential` | `(data) -> PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `(data) -> PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `(data) -> PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `(data) -> PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PagesRegistry` | `(data) -> PagesRegistryEntity` | Create a PagesRegistry entity instance. |
| `PagesSession` | `(data) -> PagesSessionEntity` | Create a PagesSession entity instance. |
| `Pairing` | `(data) -> PairingEntity` | Create a Pairing entity instance. |
| `PairingEvent` | `(data) -> PairingEventEntity` | Create a PairingEvent entity instance. |
| `ParallelV1` | `(data) -> ParallelV1Entity` | Create a ParallelV1 entity instance. |
| `PatchsetDiff` | `(data) -> PatchsetDiffEntity` | Create a PatchsetDiff entity instance. |
| `PersonalAccessToken` | `(data) -> PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `(data) -> PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `(data) -> PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `(data) -> PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `(data) -> PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
| `ProactiveAgentWaitlistEntry` | `(data) -> ProactiveAgentWaitlistEntryEntity` | Create a ProactiveAgentWaitlistEntry entity instance. |
| `Product` | `(data) -> ProductEntity` | Create a Product entity instance. |
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
| `ProjectPrTesting` | `(data) -> ProjectPrTestingEntity` | Create a ProjectPrTesting entity instance. |
| `ProjectProductMap` | `(data) -> ProjectProductMapEntity` | Create a ProjectProductMap entity instance. |
| `ProjectProductMapComparison` | `(data) -> ProjectProductMapComparisonEntity` | Create a ProjectProductMapComparison entity instance. |
| `ProjectRecording` | `(data) -> ProjectRecordingEntity` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan` | `(data) -> ProjectRunPlanEntity` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule` | `(data) -> ProjectRunScheduleEntity` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption` | `(data) -> ProjectScenarioOptionEntity` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow` | `(data) -> ProjectScenarioRowEntity` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting` | `(data) -> ProjectSettingEntity` | Create a ProjectSetting entity instance. |
| `PullRequestAction` | `(data) -> PullRequestActionEntity` | Create a PullRequestAction entity instance. |
| `PullRequestMagicMerge` | `(data) -> PullRequestMagicMergeEntity` | Create a PullRequestMagicMerge entity instance. |
| `PullRequestSetting` | `(data) -> PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `(data) -> PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `(data) -> PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `PullRequestTranscript` | `(data) -> PullRequestTranscriptEntity` | Create a PullRequestTranscript entity instance. |
| `PullZone` | `(data) -> PullZoneEntity` | Create a PullZone entity instance. |
| `Recorder` | `(data) -> RecorderEntity` | Create a Recorder entity instance. |
| `Registry` | `(data) -> RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2` | `(data) -> RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentConnection` | `(data) -> RelayAgentConnectionEntity` | Create a RelayAgentConnection entity instance. |
| `RelayAgentLocalThread` | `(data) -> RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `RelaySignal` | `(data) -> RelaySignalEntity` | Create a RelaySignal entity instance. |
| `ReleaseRollout` | `(data) -> ReleaseRolloutEntity` | Create a ReleaseRollout entity instance. |
| `Repo` | `(data) -> RepoEntity` | Create a Repo entity instance. |
| `RepoAccessToken` | `(data) -> RepoAccessTokenEntity` | Create a RepoAccessToken entity instance. |
| `RepoAction` | `(data) -> RepoActionEntity` | Create a RepoAction entity instance. |
| `RepoAgentCheckpoint` | `(data) -> RepoAgentCheckpointEntity` | Create a RepoAgentCheckpoint entity instance. |
| `RepoAgentSession` | `(data) -> RepoAgentSessionEntity` | Create a RepoAgentSession entity instance. |
| `RepoBookmarkProtection` | `(data) -> RepoBookmarkProtectionEntity` | Create a RepoBookmarkProtection entity instance. |
| `RepoBookmarkProtectionEvent` | `(data) -> RepoBookmarkProtectionEventEntity` | Create a RepoBookmarkProtectionEvent entity instance. |
| `RepoCloudWorkspaceBackup` | `(data) -> RepoCloudWorkspaceBackupEntity` | Create a RepoCloudWorkspaceBackup entity instance. |
| `RepoCodeRule` | `(data) -> RepoCodeRuleEntity` | Create a RepoCodeRule entity instance. |
| `RepoSetting` | `(data) -> RepoSettingEntity` | Create a RepoSetting entity instance. |
| `RepoStat` | `(data) -> RepoStatEntity` | Create a RepoStat entity instance. |
| `RepoVc` | `(data) -> RepoVcEntity` | Create a RepoVc entity instance. |
| `RepoVcCommit` | `(data) -> RepoVcCommitEntity` | Create a RepoVcCommit entity instance. |
| `ReportReplay` | `(data) -> ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario` | `(data) -> ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RepositoryAccess` | `(data) -> RepositoryAccessEntity` | Create a RepositoryAccess entity instance. |
| `RepositoryAccessResolve` | `(data) -> RepositoryAccessResolveEntity` | Create a RepositoryAccessResolve entity instance. |
| `RepositoryEvent` | `(data) -> RepositoryEventEntity` | Create a RepositoryEvent entity instance. |
| `RepositoryImport` | `(data) -> RepositoryImportEntity` | Create a RepositoryImport entity instance. |
| `RepositoryImportSession` | `(data) -> RepositoryImportSessionEntity` | Create a RepositoryImportSession entity instance. |
| `RepositoryImportSessionRepository` | `(data) -> RepositoryImportSessionRepositoryEntity` | Create a RepositoryImportSessionRepository entity instance. |
| `RepositoryImportSessionSelection` | `(data) -> RepositoryImportSessionSelectionEntity` | Create a RepositoryImportSessionSelection entity instance. |
| `RepositorySandboxEnvironment` | `(data) -> RepositorySandboxEnvironmentEntity` | Create a RepositorySandboxEnvironment entity instance. |
| `RoderCodeRepair` | `(data) -> RoderCodeRepairEntity` | Create a RoderCodeRepair entity instance. |
| `RoderCodeRepairSetting` | `(data) -> RoderCodeRepairSettingEntity` | Create a RoderCodeRepairSetting entity instance. |
| `RoderMachine` | `(data) -> RoderMachineEntity` | Create a RoderMachine entity instance. |
| `RoderRun` | `(data) -> RoderRunEntity` | Create a RoderRun entity instance. |
| `RoderWorkspaceCredential` | `(data) -> RoderWorkspaceCredentialEntity` | Create a RoderWorkspaceCredential entity instance. |
| `RunArtifact` | `(data) -> RunArtifactEntity` | Create a RunArtifact entity instance. |
| `RunJob` | `(data) -> RunJobEntity` | Create a RunJob entity instance. |
| `RunScenarioRun` | `(data) -> RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `(data) -> RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `(data) -> RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate` | `(data) -> RunUpdateEntity` | Create a RunUpdate entity instance. |
| `RunWorkspaceCredential` | `(data) -> RunWorkspaceCredentialEntity` | Create a RunWorkspaceCredential entity instance. |
| `RunnerLease` | `(data) -> RunnerLeaseEntity` | Create a RunnerLease entity instance. |
| `RunnerPoolNodeEnrollmentToken` | `(data) -> RunnerPoolNodeEnrollmentTokenEntity` | Create a RunnerPoolNodeEnrollmentToken entity instance. |
| `RunnerPoolRunner` | `(data) -> RunnerPoolRunnerEntity` | Create a RunnerPoolRunner entity instance. |
| `RuntimeInstanceHealthSnapshot` | `(data) -> RuntimeInstanceHealthSnapshotEntity` | Create a RuntimeInstanceHealthSnapshot entity instance. |
| `SandboxIntegration` | `(data) -> SandboxIntegrationEntity` | Create a SandboxIntegration entity instance. |
| `ScenarioRevision` | `(data) -> ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `(data) -> ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `(data) -> ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `SecretGrant` | `(data) -> SecretGrantEntity` | Create a SecretGrant entity instance. |
| `SecretVersion` | `(data) -> SecretVersionEntity` | Create a SecretVersion entity instance. |
| `ServiceEndpoint` | `(data) -> ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `Setting` | `(data) -> SettingEntity` | Create a Setting entity instance. |
| `SettingMutationLease` | `(data) -> SettingMutationLeaseEntity` | Create a SettingMutationLease entity instance. |
| `Signal` | `(data) -> SignalEntity` | Create a Signal entity instance. |
| `SignalInbound` | `(data) -> SignalInboundEntity` | Create a SignalInbound entity instance. |
| `SignalIntegration` | `(data) -> SignalIntegrationEntity` | Create a SignalIntegration entity instance. |
| `SignalIntegrationDelivery` | `(data) -> SignalIntegrationDeliveryEntity` | Create a SignalIntegrationDelivery entity instance. |
| `SignalIntegrationTarget` | `(data) -> SignalIntegrationTargetEntity` | Create a SignalIntegrationTarget entity instance. |
| `SignalSubscription` | `(data) -> SignalSubscriptionEntity` | Create a SignalSubscription entity instance. |
| `Site` | `(data) -> SiteEntity` | Create a Site entity instance. |
| `SiteAccessKey` | `(data) -> SiteAccessKeyEntity` | Create a SiteAccessKey entity instance. |
| `SitePreview` | `(data) -> SitePreviewEntity` | Create a SitePreview entity instance. |
| `SiteSecret` | `(data) -> SiteSecretEntity` | Create a SiteSecret entity instance. |
| `SlackChannel` | `(data) -> SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SourceConnection` | `(data) -> SourceConnectionEntity` | Create a SourceConnection entity instance. |
| `SpaceAlertRule` | `(data) -> SpaceAlertRuleEntity` | Create a SpaceAlertRule entity instance. |
| `SpaceAuditEvent` | `(data) -> SpaceAuditEventEntity` | Create a SpaceAuditEvent entity instance. |
| `SpaceDnsRecord` | `(data) -> SpaceDnsRecordEntity` | Create a SpaceDnsRecord entity instance. |
| `SpaceEnrollmentToken` | `(data) -> SpaceEnrollmentTokenEntity` | Create a SpaceEnrollmentToken entity instance. |
| `SpaceGateway` | `(data) -> SpaceGatewayEntity` | Create a SpaceGateway entity instance. |
| `SpaceGroup` | `(data) -> SpaceGroupEntity` | Create a SpaceGroup entity instance. |
| `SpaceGroupMembership` | `(data) -> SpaceGroupMembershipEntity` | Create a SpaceGroupMembership entity instance. |
| `SpaceLogStream` | `(data) -> SpaceLogStreamEntity` | Create a SpaceLogStream entity instance. |
| `SpaceMetricSery` | `(data) -> SpaceMetricSeryEntity` | Create a SpaceMetricSery entity instance. |
| `SpaceOtelCollector` | `(data) -> SpaceOtelCollectorEntity` | Create a SpaceOtelCollector entity instance. |
| `SpacePeer` | `(data) -> SpacePeerEntity` | Create a SpacePeer entity instance. |
| `SpacePeerAttachment` | `(data) -> SpacePeerAttachmentEntity` | Create a SpacePeerAttachment entity instance. |
| `SpacePolicy` | `(data) -> SpacePolicyEntity` | Create a SpacePolicy entity instance. |
| `SpaceSegment` | `(data) -> SpaceSegmentEntity` | Create a SpaceSegment entity instance. |
| `SpaceTraceSpan` | `(data) -> SpaceTraceSpanEntity` | Create a SpaceTraceSpan entity instance. |
| `Spark` | `(data) -> SparkEntity` | Create a Spark entity instance. |
| `SparkAgentIntegration` | `(data) -> SparkAgentIntegrationEntity` | Create a SparkAgentIntegration entity instance. |
| `SparkAgentLocalThread` | `(data) -> SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `SparkAgentSite` | `(data) -> SparkAgentSiteEntity` | Create a SparkAgentSite entity instance. |
| `SparkAgentSkill` | `(data) -> SparkAgentSkillEntity` | Create a SparkAgentSkill entity instance. |
| `SparkAgentThread` | `(data) -> SparkAgentThreadEntity` | Create a SparkAgentThread entity instance. |
| `SparkAutomation` | `(data) -> SparkAutomationEntity` | Create a SparkAutomation entity instance. |
| `SparkCredit` | `(data) -> SparkCreditEntity` | Create a SparkCredit entity instance. |
| `SparkCreditAgentUsage` | `(data) -> SparkCreditAgentUsageEntity` | Create a SparkCreditAgentUsage entity instance. |
| `SparkCreditUsageTotal` | `(data) -> SparkCreditUsageTotalEntity` | Create a SparkCreditUsageTotal entity instance. |
| `StaticSite` | `(data) -> StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `(data) -> StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `(data) -> StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `StatusChange` | `(data) -> StatusChangeEntity` | Create a StatusChange entity instance. |
| `StatusCommit` | `(data) -> StatusCommitEntity` | Create a StatusCommit entity instance. |
| `StatusPatchset` | `(data) -> StatusPatchsetEntity` | Create a StatusPatchset entity instance. |
| `StripeWebhook` | `(data) -> StripeWebhookEntity` | Create a StripeWebhook entity instance. |
| `SubmitTelemetry` | `(data) -> SubmitTelemetryEntity` | Create a SubmitTelemetry entity instance. |
| `SubscriptionModel` | `(data) -> SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `SwarmEvent` | `(data) -> SwarmEventEntity` | Create a SwarmEvent entity instance. |
| `SwarmLive` | `(data) -> SwarmLiveEntity` | Create a SwarmLive entity instance. |
| `SwarmNote` | `(data) -> SwarmNoteEntity` | Create a SwarmNote entity instance. |
| `SwarmTask` | `(data) -> SwarmTaskEntity` | Create a SwarmTask entity instance. |
| `TaskLease` | `(data) -> TaskLeaseEntity` | Create a TaskLease entity instance. |
| `ThreadPreview` | `(data) -> ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `ThreadPreviewAccess` | `(data) -> ThreadPreviewAccessEntity` | Create a ThreadPreviewAccess entity instance. |
| `ToolFeedback` | `(data) -> ToolFeedbackEntity` | Create a ToolFeedback entity instance. |
| `Transcript` | `(data) -> TranscriptEntity` | Create a Transcript entity instance. |
| `V1Message` | `(data) -> V1MessageEntity` | Create a V1Message entity instance. |
| `VcBranch` | `(data) -> VcBranchEntity` | Create a VcBranch entity instance. |
| `VcBrowser` | `(data) -> VcBrowserEntity` | Create a VcBrowser entity instance. |
| `VcChange` | `(data) -> VcChangeEntity` | Create a VcChange entity instance. |
| `VcChangeGroup` | `(data) -> VcChangeGroupEntity` | Create a VcChangeGroup entity instance. |
| `VcFile` | `(data) -> VcFileEntity` | Create a VcFile entity instance. |
| `VcMergeQueue` | `(data) -> VcMergeQueueEntity` | Create a VcMergeQueue entity instance. |
| `VcStack` | `(data) -> VcStackEntity` | Create a VcStack entity instance. |
| `VcsNode` | `(data) -> VcsNodeEntity` | Create a VcsNode entity instance. |
| `VcsSetting` | `(data) -> VcsSettingEntity` | Create a VcsSetting entity instance. |
| `VerificationProjectCredential` | `(data) -> VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `(data) -> VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `(data) -> VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `(data) -> VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `(data) -> VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `(data) -> VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyEmailVerification` | `(data) -> VerifyEmailVerificationEntity` | Create a VerifyEmailVerification entity instance. |
| `VerifyEnvironment` | `(data) -> VerifyEnvironmentEntity` | Create a VerifyEnvironment entity instance. |
| `VerifyEvidence` | `(data) -> VerifyEvidenceEntity` | Create a VerifyEvidence entity instance. |
| `VerifyMergeRequest` | `(data) -> VerifyMergeRequestEntity` | Create a VerifyMergeRequest entity instance. |
| `VerifyPullRequest` | `(data) -> VerifyPullRequestEntity` | Create a VerifyPullRequest entity instance. |
| `VerifySignalIntegration` | `(data) -> VerifySignalIntegrationEntity` | Create a VerifySignalIntegration entity instance. |
| `VerifyStaticSiteDomain` | `(data) -> VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `(data) -> VersionLogEntity` | Create a VersionLog entity instance. |
| `WaitlistApplication` | `(data) -> WaitlistApplicationEntity` | Create a WaitlistApplication entity instance. |
| `WebBotAuth` | `(data) -> WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WebhookGitlab` | `(data) -> WebhookGitlabEntity` | Create a WebhookGitlab entity instance. |
| `WorkflowRunStep` | `(data) -> WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `(data) -> WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `(data) -> WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |
| `WorkspaceActivity` | `(data) -> WorkspaceActivityEntity` | Create a WorkspaceActivity entity instance. |
| `WorkspaceActivityNotification` | `(data) -> WorkspaceActivityNotificationEntity` | Create a WorkspaceActivityNotification entity instance. |
| `WorkspaceSpace` | `(data) -> WorkspaceSpaceEntity` | Create a WorkspaceSpace entity instance. |
| `WorkspaceSpacePreference` | `(data) -> WorkspaceSpacePreferenceEntity` | Create a WorkspaceSpacePreference entity instance. |

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

    local a2a_well_known, err = client:A2aWellKnown():load({ a2a_id = "example" })
    if err then error(err) end
    -- a2a_well_known is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### A2aWellKnown

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create, Load, Update.

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

Operations: Create, List, Load, Remove, Update.

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
| `installed_by` |  |
| `installed_target_ids` | Install targets of the viewer that have this app installed |
| `mcp_url` |  |
| `owner` | The person who controls the author agent |
| `thread` | The thread that published the app, when the viewer can open the author agent |
| `title` |  |
| `url` |  |
| `visibility` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/opened`

#### AgentAppInstall

| Field | Description |
| --- | --- |
| `id` |  |
| `installed` |  |

Operations: Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/installs/{agent_id}`

#### AgentAttachment

| Field | Description |
| --- | --- |
| `byte_size` |  |
| `content_type` |  |
| `file_name` |  |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete`

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/grants`

#### AgentConnectionResource

| Field | Description |
| --- | --- |
| `cursor` |  |
| `next_cursor` |  |
| `query` |  |
| `resources` |  |

Operations: Create.

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

Operations: List.

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

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover`

#### AgentContextCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

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

#### AgentEvent

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/events`

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

Operations: Create, Load, Remove.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_integrations/accounts`

#### AgentIntegrationCallback

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/agent_integration_callback`

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

Operations: Create, List, Load, Remove.

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

Operations: List.

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

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories`

#### AgentResource

| Field | Description |
| --- | --- |
| `name` |  |
| `uri` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resources`

#### AgentRoder

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

#### AgentSession

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/agent_sessions/{session_id}/transcript`

#### AgentSessionCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize`

#### AgentSessionRoderHandoff

| Field | Description |
| --- | --- |
| `checkpoint_id` | Public id of the checkpoint to hand off. |
| `purpose` | Handoff intent; defaults to `continue`. |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs`

#### AgentSetting

| Field | Description |
| --- | --- |
| `can_manage` |  |
| `expected_version` |  |
| `instructions` |  |
| `version` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/settings`

#### AgentSharing

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create, List, Load.

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

Operations: Create, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_skills`

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

Operations: Create, Load.

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

Operations: Create, List, Load, Update.

API path: `/api/v1/agent/swarms/{id}/cancel`

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
| `id` |  |

Operations: Create, Load.

API path: `/api/v1/agent/threads/{id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `description` |  |
| `inputSchema` |  |
| `name` |  |

Operations: List.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/agent_usage`

#### AgentVerifyProject

| Field | Description |
| --- | --- |
| `available` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` |  |
| `id` |  |
| `name` |  |
| `project_choices` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` |  |
| `slug` |  |
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

#### AgentWebPreview

| Field | Description |
| --- | --- |
| `description` |  |
| `icon_url` |  |
| `image_url` |  |
| `title` |  |

Operations: Load.

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

Operations: Create, Load, Update.

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

#### Agreement

| Field | Description |
| --- | --- |
| `body` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` |  |
| `key` |  |
| `summary` |  |
| `title` |  |
| `version` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/agreements`

#### AgreementAccessRequest

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agreement_access_request`

#### AlertRuleEvent

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Remove.

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

Operations: Load.

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

#### AppAccess

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/app_access/callback`

#### AppAccessJwk

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/deployments/{id}/cancel`

#### AppDeploymentDashboard

| Field | Description |
| --- | --- |
| `activity` |  |
| `app` |  |
| `audit_events` |  |
| `capacity` |  |
| `connections` |  |
| `data_resources` |  |
| `deployments` |  |
| `desired_states` |  |
| `environments` |  |
| `id` |  |
| `locations` |  |
| `managed_database_catalog` |  |
| `observability` |  |
| `operations` |  |
| `placements` |  |
| `reconciler_ticks` |  |
| `releases` |  |
| `rollback_deployments` |  |
| `rollouts` |  |
| `runtime_instances` |  |
| `service_bindings` |  |
| `service_views` |  |
| `services` |  |
| `storage_resources` |  |
| `summary` |  |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard`

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles`

#### AppRun

| Field | Description |
| --- | --- |
| `id` |  |
| `image` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

Operations: Create, Load.

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{id}/archive`

#### AppServiceBinding

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Update.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads`

#### ArtefactRevision

| Field | Description |
| --- | --- |
| `base_version` | The newest version the editor started from. |
| `content` | Markdown, including CriticMarkup suggestions and comment anchors. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions`

#### ArtefactViewToken

| Field | Description |
| --- | --- |
| `expires_in` |  |
| `file` | Exact manifest path. |
| `organization_slug` | If provided, must match the organization addressed by the route. |
| `version` |  |
| `viewer_url` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens`

#### Artifact

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/artifacts/{id}/expire`

#### ArtifactCacheNamespace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/cache_namespaces/{id}/archive`

#### ArtifactImageRepository

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/image_repositories/{id}/archive`

#### ArtifactPackageMirror

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/package_mirrors/{id}/pause`

#### ArtifactRetentionPolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/retention_policies`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/audit_events`

#### Auth

| Field | Description |
| --- | --- |

Operations: Create, Load, Remove.

API path: `/api/v1/auth/apple`

#### AuthCli

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/auth/cli/complete`

#### AuthGithub

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/auth/github/start`

#### AuthGoogle

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/auth/google/start`

#### AuthOpenai

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/auth/openai/callback`

#### AuthPasswordReset

| Field | Description |
| --- | --- |
| `email` |  |
| `message` |  |
| `password` |  |
| `token` |  |

Operations: Create, Update.

API path: `/api/v1/auth/password_resets`

#### AuthRegistrationOption

| Field | Description |
| --- | --- |
| `email_password_signup_enabled` |  |
| `openai_sign_in_enabled` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` |  |
| `waitlist_enabled` | New public signups require waitlist approval when enabled. |

Operations: Load.

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

#### BackendRunnerPool

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/bazel/backends/{backend_id}/runner_pools`

#### Bazel

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/bazel/authorize`

#### BazelActionResult

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Update.

API path: `/api/v1/bazel/action_results/{hash}/{size_bytes}`

#### BazelBackend

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/bazel/backends/{id}/issue_token`

#### BazelBlob

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Update.

API path: `/api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}`

#### BazelExecution

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

API path: `/api/v1/bazel/executions/{id}/complete`

#### BazelFindMissingBlob

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Load.

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

Operations: Update.

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

Operations: Patch, Update.

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

Operations: Create.

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

Operations: Patch, Update.

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

Operations: Patch, Update.

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

Operations: List.

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

Operations: List.

API path: `/api/v1/billing/packages`

#### BillingPortalSession

| Field | Description |
| --- | --- |
| `return_url` |  |

Operations: Create.

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

Operations: Load.

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

Operations: Create, List, Load.

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

Operations: Patch, Update.

API path: `/api/v1/organizations/{organization_id}/billing/subscription`

#### BillingTokenTopUp

| Field | Description |
| --- | --- |
| `amount_cents` |  |
| `request_key` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/billing/token_top_ups`

#### BillingUsage

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/refresh_github_required_checks`

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

#### CacheNamespaceEntry

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict`

#### CatalogSelector

| Field | Description |
| --- | --- |
| `environments` |  |
| `id` |  |
| `locations` |  |
| `services` |  |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/catalog/selectors`

#### CdnDeployment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames`

#### CdnSpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{org_slug}/cdn_spaces`

#### CdnSpaceObject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Remove, Update.

API path: `/api/v1/cdn_spaces/{cdn_space_id}/objects/{path}`

#### Change

| Field | Description |
| --- | --- |
| `counts` | Counts for each state across the active non-state filters. |
| `filters` |  |
| `github_sync` |  |
| `result` | What this page is a page of. |

Operations: Load.

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

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize`

#### ChangeComment

| Field | Description |
| --- | --- |
| `body` |  |
| `comment` |  |
| `comments` |  |
| `id` |  |
| `kind` |  |
| `line` |  |
| `parent_comment_id` |  |
| `patchset_id` |  |
| `path` |  |
| `side` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve`

#### ChangeFileReviewCheckpoint

| Field | Description |
| --- | --- |
| `patchset_id` |  |
| `path` |  |
| `request_id` |  |
| `review_action` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/file_review_checkpoints`

#### ChangeGitBranchSubmission

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create, Remove.

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

Operations: Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels`

#### ChangeLandingHold

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests`

#### ChangeRequestChange

| Field | Description |
| --- | --- |
| `message` |  |

Operations: Create.

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

Operations: List, Update.

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

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts`

#### ChangeTranscriptSummary

| Field | Description |
| --- | --- |
| `estimated_cost` |  |
| `session_count` |  |
| `sessions` |  |
| `tokens_partial` |  |
| `total_tokens` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/changes/transcript_summaries`

#### CheckpointPrepareChunk

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, Load.

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

Operations: Create, List, Load.

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

Operations: Create, Load.

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

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime`

#### CiStatus

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/ref`

#### CliEvent

| Field | Description |
| --- | --- |
| `event` |  |
| `properties` |  |

Operations: Create.

API path: `/api/v1/cli_events`

#### CliRelease

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/cli_releases`

#### CloudWorkspaceBackupObject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

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

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/evaluations`

#### ComSiteAccess

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/com_site_access/redeem`

#### ComSiteAccessSession

| Field | Description |
| --- | --- |
| `cookie_name` |  |
| `host` | Site hostname, for example docs.acme.composal.page |
| `max_age` |  |
| `session_token` |  |

Operations: Create.

API path: `/api/v1/com_site_access/sessions`

#### CommentThreadComment

| Field | Description |
| --- | --- |
| `body` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments`

#### CommitDiff

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |
| `parent_id` |  |

Operations: Load.

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

#### ContactSubmission

| Field | Description |
| --- | --- |
| `company` |  |
| `email` | Stored downcased and stripped. |
| `message` |  |
| `name` |  |
| `website` | Honeypot. |

Operations: Create.

API path: `/api/v1/contact_submissions`

#### ControlComputer

| Field | Description |
| --- | --- |
| `connection` | A point-in-time control transport observation. |
| `consent` |  |
| `device` |  |
| `id` |  |
| `provider_status` |  |

Operations: List, Update.

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

Operations: Create, Load.

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
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `check_count` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `credential_name` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | When the team's time limit ends. |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` |  |
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
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | Scenarios saved from this discovery. |
| `scenario_generation` |  |
| `scenarios_pending` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` |  |
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
| `actual` |  |
| `agent_id` |  |
| `agent_title` |  |
| `area` | On a locked finding, the first segment of the page it was seen on, such as Billing. |
| `checks` | Checks in the same tester report that this finding cites. |
| `confidence` |  |
| `confirmed` | On a locked finding, whether the automatic review confirmed it. |
| `evidence_step_ids` |  |
| `evidence_timestamp_ms` |  |
| `expected` |  |
| `fix_prompt` | A coding-agent prompt for this finding alone |
| `has_recording` | On a locked finding, whether the tester recorded evidence for it. |
| `id` |  |
| `locked` | True for a locked finding of the workspace's included scan before it pays. |
| `reproduction_steps` |  |
| `severity` |  |
| `title` |  |
| `tracked` | The finding record to resolve or ignore; null until the tester finishes. |
| `url` |  |

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

Operations: Load.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}`

#### DeploymentDashboardNomad

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/details`

#### DeploymentFile

| Field | Description |
| --- | --- |

Operations: Update.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/settings`

#### DesktopLocalAgentModel

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/desktop_local_agent/models`

#### DesktopLocalAgentResponse

| Field | Description |
| --- | --- |
| `input` |  |
| `max_output_tokens` |  |
| `model` |  |
| `store` |  |
| `stream` |  |

Operations: Create.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection`

#### DeviceBrowserOperation

| Field | Description |
| --- | --- |
| `command` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `created_at` |  |
| `id` |  |

Operations: Create, List.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages`

#### DeviceEnterpriseRelay

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings`

#### DeviceGrant

| Field | Description |
| --- | --- |
| `agent_id` |  |
| `agent_name` |  |
| `can_edit` |  |
| `can_revoke` |  |
| `capabilities` |  |
| `created_at` |  |
| `id` |  |
| `principal_id` |  |
| `principal_name` |  |
| `revision` |  |
| `revoked_at` |  |
| `updated_at` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise`

#### DeviceInvocation

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge`

#### DeviceLocalEvent

| Field | Description |
| --- | --- |
| `event` |  |
| `recorded` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/local_events`

#### DeviceOperation

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

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations`

#### DevicePairing

| Field | Description |
| --- | --- |
| `architecture` |  |
| `channel` |  |
| `id` |  |
| `name` |  |
| `platform` |  |
| `public_key` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete`

#### DeviceProject

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/projects/{id}`

#### DeviceScheduledCheckIn

| Field | Description |
| --- | --- |
| `enabled` |  |

Operations: Create.

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

Operations: Create, List, Load, Patch, Update.

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

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions`

#### DockerBuilderSetting

| Field | Description |
| --- | --- |
| `idle_timeout_seconds` |  |
| `max_concurrency` |  |
| `organization_id` |  |
| `region` |  |
| `runtime_timeout_seconds` |  |

Operations: Load, Patch, Update.

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

Operations: Create, List.

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

#### Edge

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/edge/tls-check`

#### EmailVerification

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/email_verifications/resend`

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

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs`

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

Operations: Create, Load, Remove.

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

#### ExecutionDesiredState

| Field | Description |
| --- | --- |
| `desired_state` |  |
| `id` |  |
| `stop_observed` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/execution/desired_states/{id}/reconcile`

#### ExecutionReconcilerTick

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

API path: `/api/v1/execution/reconciler_ticks`

#### ExecutionRelease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/execution/runtime_instances/{id}/refresh`

#### Exploration

| Field | Description |
| --- | --- |
| `account_id` |  |
| `agent_filters` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` |  |
| `can_continue` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` |  |
| `check_count` |  |
| `concurrency` |  |
| `covered_areas` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` |  |
| `credential_name` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | When the team's time limit ends. |
| `demo_project` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` |  |
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
| `persona_id` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` |  |
| `project_id` | Set when the exploration targets a project environment. |
| `related_explorations` |  |
| `report` |  |
| `reproduction_of` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | Scenarios saved from this discovery. |
| `scenario_generation` |  |
| `scenarios_pending` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` |  |
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

Operations: Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/git_imports`

#### Github

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/github/repository_lookup`

#### GithubApp

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/github_app/webhook`

#### GithubAppImportableRepository

| Field | Description |
| --- | --- |
| `account_login` |  |
| `github_app_installation_id` |  |
| `next_page` | Next GitHub page for this installation |
| `repositories` |  |

Operations: List.

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

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection`

#### GithubAppInstallationAuthorization

| Field | Description |
| --- | --- |
| `installation_url` |  |
| `organization_slug` | Vex organization slug whose installation will be linked. |
| `return_target` | Server-validated Vex application target used after verification. |

Operations: Create.

API path: `/api/v1/github_app/installation_authorizations`

#### GithubAppUserAuthorization

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List, Load, Patch, Update.

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

Operations: List, Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/github_connections`

#### GithubOnboarding

| Field | Description |
| --- | --- |
| `accounts` |  |
| `active_batch_id` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` |  |
| `capabilities` |  |
| `installations` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding`

#### GithubOnboardingBranch

| Field | Description |
| --- | --- |
| `branches` |  |

Operations: List.

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

Operations: Create.

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

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}`

#### GithubOnboardingImportItem

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/github/pull_requests/refresh`

#### GithubRunnerAdmission

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create.

API path: `/api/v1/github_runner_cache`

#### GithubRunnerEgress

| Field | Description |
| --- | --- |
| `can_request` |  |
| `cidr` |  |
| `ipv4` |  |
| `requested_at_label` |  |
| `status` |  |

Operations: Create, Load.

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

Operations: Load.

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

Operations: Create, List, Load.

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

Operations: Create, List, Update.

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

Operations: Create, Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/gitlab/authorize`

#### GitlabConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/gitlab/connections/{connection_id}/control`

#### GitlabImport

| Field | Description |
| --- | --- |
| `integration_id` |  |
| `project_id` |  |
| `repo_slug` |  |
| `source_branch` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/gitlab/imports`

#### GitlabOauth

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/gitlab/oauth/callback`

#### GrantAllAgent

| Field | Description |
| --- | --- |
| `all_agents_access` |  |
| `enabled` |  |
| `execution_available` |  |

Operations: Create.

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/disable`

#### IdentityOrganization

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

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

Operations: Create, List.

API path: `/api/v1/organizations/{org_slug}/image_repositories`

#### ImageRepositoryTag

| Field | Description |
| --- | --- |
| `image_repository` |  |
| `name` |  |
| `registry_url` |  |
| `tags` |  |

Operations: List.

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

Operations: Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/import_branch_policy`

#### Integration

| Field | Description |
| --- | --- |
| `github` |  |
| `gitlab` |  |
| `permissions` |  |
| `slack` |  |

Operations: Load.

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

#### InvocationControl

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks`

#### JobStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps`

#### JobWorkspace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Update.

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

#### Known

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/.well-known/agent-card.json`

#### Label

| Field | Description |
| --- | --- |
| `changes_count` |  |
| `id` |  |
| `name` | Display name |
| `slug` | Normalized identity used for filtering and lookup. |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/labels`

#### LeaseArtifact

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/artifacts`

#### LeaseCache

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore`

#### LeaseLogChunk

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/log_chunks`

#### LeaseReconciliation

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/reconciliations/{reconciliation_id}/output`

#### LeaseStep

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id}`

#### LeaseVerifyDiagnostic

| Field | Description |
| --- | --- |
| `browser_events` |  |
| `live_browser` |  |
| `live_view` | The tester's read-only live stream for page viewers. |
| `steps` |  |

Operations: Create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics`

#### LeaseVerifySecret

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets`

#### LeaseWorkspace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id}`

#### LocalAgentDecision

| Field | Description |
| --- | --- |
| `request` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

Operations: Create.

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

Operations: Create.

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

#### LogStreamChunk

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Remove, Update.

API path: `/api/v1/organizations/{organization_id}/logo_image`

#### MarketingSetting

| Field | Description |
| --- | --- |
| `call_first` |  |

Operations: Load.

API path: `/api/v1/marketing_settings`

#### McpOauth

| Field | Description |
| --- | --- |

Operations: Create, Load.

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
| `created_at` |  |
| `created_at_label` |  |
| `id` |  |
| `is_self` |  |
| `role` |  |
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

Operations: Create, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge`

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

Operations: Create.

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

Operations: Load.

API path: `/api/v1/hosting/metrics/queries`

#### MetronomeWebhook

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/model_subscription_accounts`

#### ModelSubscriptionAccountConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Update.

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

Operations: Create, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/network_connections`

#### NetworkingSpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/pages/nodes`

#### NodeCertificate

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/certificate/rotate`

#### NodeLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs`

#### Now

| Field | Description |
| --- | --- |
| `needs_attention` |  |
| `pagination` |  |
| `recently_landed` |  |
| `shipping_now` |  |
| `summary` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/now`

#### ObservabilityClickhouseCluster

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/clickhouse_clusters/{id}/activate`

#### ObservabilityQuickwitCluster

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/quickwit_clusters/{id}/activate`

#### ObservabilitySpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{id}/activate`

#### Openapi

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/openapi`

#### OrgInvitation

| Field | Description |
| --- | --- |
| `id` |  |
| `invitation` |  |
| `registration_options` |  |
| `requires_password_setup` |  |
| `start_guided_setup` |  |

Operations: Create, Load.

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

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations`

#### OrganizationApp

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Remove, Update.

API path: `/api/v1/spark/organizations/{organization_id}/apps`

#### OrganizationControl

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/control/admission`

#### OrganizationDevice

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/control`

#### OrganizationIdentityCertificate

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/identity_certificates/{id}/expire`

#### OrganizationInteraction

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/interactions`

#### OrganizationInvitation

| Field | Description |
| --- | --- |
| `email` |  |
| `id` |  |
| `role` |  |

Operations: Create, Remove.

API path: `/api/v1/admin/organizations/{org_slug}/invitations`

#### OrganizationMessageFile

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/message_files`

#### OrganizationOidcTrust

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate`

#### OrganizationRunEvent

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/run_events`

#### OrganizationRunOutcome

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/run_outcomes`

#### OrganizationRunUsage

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/run_usages`

#### OrganizationSandbox

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{id}/disable`

#### OrganizationServiceAccount

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Update.

API path: `/api/v1/admin/organizations/{org_slug}/settings`

#### OrganizationSite

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Remove, Update.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/token`

#### OrganizationSubscription

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/subscriptions/selection`

#### OrganizationTool

| Field | Description |
| --- | --- |
| `arguments` |  |
| `native_agent_id` |  |
| `tool` |  |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/tools`

#### OrganizationWorkloadIdentity

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate`

#### OtelIngest

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, Load.

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

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/artefacts/page`

#### PageCiPipelineRun

| Field | Description |
| --- | --- |
| `error` |  |
| `id` |  |
| `jobs` |  |

Operations: Load.

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

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/page`

#### PageRepoVcCommit

| Field | Description |
| --- | --- |
| `commit` |  |
| `diff_path` | Fingerprinted path serving this commit range's file diff. |
| `id` |  |

Operations: Load.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/billing`

#### PagesGithubIntegration

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

Operations: List, Load.

API path: `/api/v1/organizations/{org_slug}/pages/github_integrations`

#### PagesGithubOnboarding

| Field | Description |
| --- | --- |
| `onboarding` |  |
| `organization` |  |

Operations: Load.

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

Operations: List.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/credentials`

#### PagesProjectPersona

| Field | Description |
| --- | --- |
| `access_mode` |  |
| `active_run_count` |  |
| `archived_at` |  |
| `attention` | What needs an operator's eye, problems before notices |
| `capabilities` |  |
| `created_at` |  |
| `credential` |  |
| `credential_id` | The credential this persona signs in with. |
| `goals` |  |
| `health` |  |
| `id` |  |
| `lock_version` |  |
| `name` |  |
| `project_id` |  |
| `role` |  |
| `scenario_count` |  |
| `updated_at` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas`

#### PagesProjectRun

| Field | Description |
| --- | --- |
| `archived_at` |  |
| `browser_seconds` |  |
| `can_archive` |  |
| `can_restore` |  |
| `cleanup_state` |  |
| `commit_sha` |  |
| `created_at` |  |
| `duration_seconds` |  |
| `environment_name` |  |
| `finished_at` |  |
| `id` |  |
| `outcome` |  |
| `pull_request` |  |
| `pull_request_label` |  |
| `scenario_count` |  |
| `source_run` |  |
| `started_at` |  |
| `state` |  |
| `title` |  |
| `trigger_kind` |  |
| `triggered_by` |  |
| `web_path` |  |

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

#### PagesRegistry

| Field | Description |
| --- | --- |
| `active_repository_count` |  |
| `error` |  |
| `pagination` |  |
| `repositories` |  |
| `repository_count` |  |

Operations: Load.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{org_slug}/pages/sessions`

#### Pairing

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

API path: `/api/v1/relay/pairings`

#### PairingEvent

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/relay/pairings/{id}/events`

#### ParallelV1

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/local_agent/parallel/v1/extract`

#### PatchsetDiff

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |
| `patchset` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}`

#### PersonalAccessToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/personal_access_tokens`

#### PreviewOperation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/operations`

#### PreviewProfileSecretBinding

| Field | Description |
| --- | --- |
| `env_key` |  |
| `id` |  |
| `mode` |  |
| `secret_id` |  |
| `secret_version_id` |  |

Operations: Create, Load, Remove.

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

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/products`

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
| `environment_ids` |  |
| `id` |  |
| `lock_version` |  |
| `name` |  |
| `persona_ids` |  |
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
| `active_runs` |  |
| `open_findings` |  |
| `ready_environments` |  |
| `scenarios` | Scenarios by the state of their latest execution. |

Operations: Load.

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

#### ProjectPrTesting

| Field | Description |
| --- | --- |
| `id` |  |
| `project` |  |
| `pull_request_options` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/pr_testing`

#### ProjectProductMap

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview`

#### ProjectProductMapComparison

| Field | Description |
| --- | --- |
| `accounts` |  |
| `comparison` |  |
| `filters` |  |
| `id` |  |
| `project` |  |
| `requirements` |  |
| `revisions` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison`

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

Operations: Load.

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
| `id` |  |
| `name` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/settings`

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

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions`

#### PullRequestMagicMerge

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, Load.

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

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts`

#### PullZone

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `slug` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/pull_zones`

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

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections`

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay`

#### RelaySignal

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/relay/signals`

#### ReleaseRollout

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: List, Load, Remove.

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

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens`

#### RepoAction

| Field | Description |
| --- | --- |
| `pipeline` |  |
| `run` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/actions`

#### RepoAgentCheckpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

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

Operations: Create, Load, Patch, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events`

#### RepoCloudWorkspaceBackup

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings`

#### RepoStat

| Field | Description |
| --- | --- |
| `backend` |  |
| `can_refresh` |  |
| `freshness` |  |
| `note` |  |
| `physical` |  |
| `series` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/stats/refresh`

#### RepoVc

| Field | Description |
| --- | --- |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commit_file`

#### RepoVcCommit

| Field | Description |
| --- | --- |
| `name` |  |
| `target_commit_id` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits`

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

#### RepositoryAccess

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

Operations: Load.

API path: `/api/v1/repository_access/resolve/{org_slug}/{repo_slug}`

#### RepositoryEvent

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/repository_import_sessions`

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

Operations: List.

API path: `/api/v1/repository_import_sessions/{id}/repositories`

#### RepositoryImportSessionSelection

| Field | Description |
| --- | --- |
| `repositories` |  |

Operations: Create.

API path: `/api/v1/repository_import_sessions/{id}/selections`

#### RepositorySandboxEnvironment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create, Load.

API path: `/api/v1/agent/roder/code_repair_settings`

#### RoderMachine

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

API path: `/api/v1/agent/roder/machines/{public_id}`

#### RoderRun

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create.

API path: `/api/v1/agent/roder/workspace_credentials`

#### RunArtifact

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

Operations: Create, Load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs`

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

API path: `/api/v1/organizations/{organization_id}/verify/run_updates`

#### RunWorkspaceCredential

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/agent/roder/run/workspace_credentials`

#### RunnerLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

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

Operations: Create, List.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens/{id}/revoke`

#### RunnerPoolRunner

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat`

#### RuntimeInstanceHealthSnapshot

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

Operations: Create, Load, Patch, Update.

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

#### SecretGrant

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore`

#### SecretVersion

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/settings`

#### SettingMutationLease

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/signals/{id}/ack`

#### SignalInbound

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List.

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

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets`

#### SignalSubscription

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

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

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/sites`

#### SiteAccessKey

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys`

#### SitePreview

| Field | Description |
| --- | --- |
| `icon_data_url` | The site's icon as a data: URL, up to 256 KB |
| `title` |  |
| `url` | The address as it will be saved |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/site_preview`

#### SiteSecret

| Field | Description |
| --- | --- |
| `id` |  |
| `native_agent_id` |  |
| `value` |  |

Operations: Remove, Update.

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

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/channels`

#### SourceConnection

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/source_connections/{id}/refresh`

#### SpaceAlertRule

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{space_id}/alert_rules/{id}/activate`

#### SpaceAuditEvent

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/observability/spaces/{space_id}/audit_events`

#### SpaceDnsRecord

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/dns_records`

#### SpaceEnrollmentToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke`

#### SpaceGateway

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat`

#### SpaceGroup

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/groups`

#### SpaceGroupMembership

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/group_memberships`

#### SpaceLogStream

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/observability/spaces/{space_id}/log_streams`

#### SpaceMetricSery

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/api/v1/observability/spaces/{space_id}/metric_series`

#### SpaceOtelCollector

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate`

#### SpacePeer

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peers/{id}/approve`

#### SpacePeerAttachment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peer_attachments`

#### SpacePolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/policies/{id}/activate`

#### SpaceSegment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/segments`

#### SpaceTraceSpan

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create, Load, Update.

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

Operations: List.

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

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/skills`

#### SparkAgentThread

| Field | Description |
| --- | --- |
| `archive_deletes_sandbox` |  |
| `archived` |  |
| `attention` | Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish. |
| `can_archive` |  |
| `can_compact` |  |
| `can_snooze` |  |
| `coordination_status` | Durable work not represented by a native run: a queued input or an outstanding thread report. |
| `execution` | device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness. |
| `first_input` |  |
| `first_input_key` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | Membership the first message was sent as, for input_delivery. |
| `group` | Rails-owned list group, in precedence order: attention, active run, coordination custody, then done. |
| `has_active_run` |  |
| `id` |  |
| `inherit_context` | Include the source conversation through its last completed reply. |
| `is_main` |  |
| `kind` |  |
| `message` | The thread's first message. |
| `older` | Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older. |
| `parent_conversation_id` | Optional source conversation belonging to this agent. |
| `parent_conversation_title` | Source conversation title, resolved independently of this page. |
| `requester_membership_id` |  |
| `snoozed_until` | When a snoozed thread returns to its usual group; null when it is not snoozed. |
| `thread` |  |
| `title` |  |
| `updated_at` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads`

#### SparkAutomation

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

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{org_slug}/spark_credits`

#### SparkCreditAgentUsage

| Field | Description |
| --- | --- |
| `agents` |  |
| `all` |  |
| `days` |  |
| `id` |  |
| `owners` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/spark_credits/agent_usage/{agent_id}`

#### SparkCreditUsageTotal

| Field | Description |
| --- | --- |
| `compute_minutes_used` |  |
| `compute_usd` |  |
| `inference_usd` |  |

Operations: Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/static_sites`

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

Operations: Load.

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

Operations: Load.

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

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/patchsets/{id}`

#### StripeWebhook

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/stripe/webhooks`

#### SubmitTelemetry

| Field | Description |
| --- | --- |

Operations: Create.

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

Operations: List.

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

Operations: List.

API path: `/api/v1/agent/swarms/{swarm_id}/events`

#### SwarmLive

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/agent/swarms/{id}/live/replay`

#### SwarmNote

| Field | Description |
| --- | --- |
| `task_id` | A task public id; omitted |
| `text` |  |

Operations: Create.

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

Operations: List, Load.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks`

#### TaskLease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_jev`

#### ThreadPreview

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `port` |  |
| `url` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews`

#### ThreadPreviewAccess

| Field | Description |
| --- | --- |

Operations: Create, Load.

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

Operations: Create, Load.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{org_slug}/transcripts/search`

#### V1Message

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/inference/v1/messages`

#### VcBranch

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `target_commit_id` |  |

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches`

#### VcBrowser

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create, List, Load, Update.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups`

#### VcFile

| Field | Description |
| --- | --- |
| `paths` |  |
| `truncated` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/files`

#### VcMergeQueue

| Field | Description |
| --- | --- |
| `analytics` | Queue performance for the reporting window. |
| `id` |  |
| `policy` |  |
| `queue` |  |
| `target_branches` | Bookmark names for the target picker. |

Operations: Create, List, Load, Update.

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

Operations: List, Load, Update.

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

Operations: List.

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

Operations: Load.

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

#### VerifyEmailVerification

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/email_verifications/verify`

#### VerifyEnvironment

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

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments`

#### VerifyEvidence

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/evidence/{id}`

#### VerifyMergeRequest

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

#### VerifyPullRequest

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

Operations: Create.

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

#### WaitlistApplication

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/api/v1/waitlist_applications`

#### WebBotAuth

| Field | Description |
| --- | --- |
| `expires_at` |  |
| `origin` |  |
| `signatures` |  |

Operations: Create.

API path: `/api/v1/verify/web_bot_auth`

#### WebhookGitlab

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

API path: `/api/v1/webhooks/gitlab/{connection_key}`

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

#### WorkspaceActivity

| Field | Description |
| --- | --- |
| `live_activity` |  |
| `recent_items` |  |
| `unresolved_notification_count` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/workspace_activity`

#### WorkspaceActivityNotification

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Update.

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces`

#### WorkspaceSpacePreference

| Field | Description |
| --- | --- |
| `preferences` |  |
| `spaces` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces/preferences`



## Entities


### A2aWellKnown

Create an instance: `local a2a_well_known = client:A2aWellKnown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AdminOrg

Create an instance: `local admin_org = client:AdminOrg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_email` | `string|nil` |  |
| `billing_reason` | `string` | Required when setting an agreed price |
| `customize_onboarding_packages` | `boolean` |  |
| `deployment_usage_visibility` | `string` |  |
| `deployment_usage_visible` | `boolean` |  |
| `id` | `string` |  |
| `monthly_price_dollars` | `string|number` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` | `number|nil` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `boolean` |  |
| `onboarding_package_keys` | `table|nil` | Package keys offered when customizing onboarding. |
| `owner_email` | `string` |  |
| `package_id` | `string|nil` | Active customer package public ID. |
| `skip_payment` | `boolean` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` | `string` |  |

#### Example: Load

```lua
local admin_org, err = client:AdminOrg():load({ id = "admin_org_id" })
```

#### Example: Create

```lua
local admin_org, err = client:AdminOrg():create({
  name = "example_name", -- string
  owner_email = "example_owner_email", -- string
  slug = "example_slug", -- string
})
```


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


### AgentApp

Create an instance: `local agent_app = client:AgentApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `table` |  |
| `can_message` | `boolean` | The viewer may send input to the author agent |
| `deployments_count` | `number` | Increases with every deploy of the site |
| `description` | `string` |  |
| `hidden_install_count` | `number` | Installs by agents the viewer cannot open |
| `id` | `string` |  |
| `install_count` | `number` |  |
| `installed_by` | `table` |  |
| `installed_target_ids` | `table` | Install targets of the viewer that have this app installed |
| `mcp_url` | `string|nil` |  |
| `owner` | `table` | The person who controls the author agent |
| `thread` | `any` | The thread that published the app, when the viewer can open the author agent |
| `title` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```lua
local agent_app, err = client:AgentApp():load({ id = "agent_app_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_apps, err = client:AgentApp():list({ organization_id = "example" })
```


### AgentAppInstall

Create an instance: `local agent_app_install = client:AgentAppInstall(nil)`

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
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `table` |  |
| `activity` | `table` |  |
| `admin_disabled_at` | `string|nil` |  |
| `agent_tools` | `boolean` |  |
| `authentication` | `string` |  |
| `authorized_at` | `string|nil` |  |
| `can_create_account` | `boolean` | Whether another account can be created directly from this provider. |
| `capabilities` | `table` |  |
| `catalog_section` | `string` | Server-owned grouping in the agent integration catalog. |
| `category` | `string` | Short product label, such as CRM or Email. |
| `certification` | `string` |  |
| `checked_at` | `string|nil` |  |
| `connection` | `table` |  |
| `consent` | `table|nil` |  |
| `created_at` | `string` |  |
| `creation_key` | `string` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` | `string|nil` |  |
| `description` | `string` | One-line catalog description of the app. |
| `disabled_reason` | `string|nil` |  |
| `failure_code` | `string|nil` |  |
| `generation` | `number` |  |
| `grants` | `table` |  |
| `grants_pagination` | `table` |  |
| `id` | `string` |  |
| `limits` | `table` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `pagination` | `table` |  |
| `policy_digest` | `string` |  |
| `provider` | `table` |  |
| `provider_disabled_reason` | `string|nil` |  |
| `provider_identity` | `table` |  |
| `revoked_at` | `string|nil` |  |
| `schema_version` | `number` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `triggers` | `table` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local agent_connection, err = client:AgentConnection():load({ id = "agent_connection_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_connections, err = client:AgentConnection():list({ organization_id = "example" })
```

#### Example: Create

```lua
local agent_connection, err = client:AgentConnection():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
  toolkit = "example_toolkit", -- string
})
```


### AgentConnectionDelegation

Create an instance: `local agent_connection_delegation = client:AgentConnectionDelegation(nil)`

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
| `revoked_at` | `string|nil` |  |
| `roles` | `table` |  |
| `usable` | `boolean` |  |
| `user_id` | `string` |  |

#### Example: List

```lua
local agent_connection_delegations, err = client:AgentConnectionDelegation():list({ agent_connection_id = "example", organization_id = "example" })
```


### AgentConnectionGrant

Create an instance: `local agent_connection_grant = client:AgentConnectionGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `table` |  |
| `agent_connection_id` | `string` |  |
| `automation_id` | `string` |  |
| `connection_generation` | `number` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revision` | `number` |  |
| `revoked_at` | `string|nil` |  |
| `status` | `string` |  |
| `usable` | `boolean` |  |
| `user_id` | `string` |  |

#### Example: List

```lua
local agent_connection_grants, err = client:AgentConnectionGrant():list({ agent_connection_id = "example", organization_id = "example" })
```


### AgentConnectionResource

Create an instance: `local agent_connection_resource = client:AgentConnectionResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `string|nil` |  |
| `next_cursor` | `string|nil` |  |
| `query` | `string` |  |
| `resources` | `table` |  |

#### Example: Create

```lua
local agent_connection_resource, err = client:AgentConnectionResource():create({
  agent_connection_id = "example_agent_connection_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### AgentConnectionSafetyControl

Create an instance: `local agent_connection_safety_control = client:AgentConnectionSafetyControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_disabled_at` | `string|nil` |  |
| `authorized_at` | `string|nil` |  |
| `checked_at` | `string|nil` |  |
| `created_at` | `string` |  |
| `custodian_id` | `string|nil` |  |
| `failure_code` | `string|nil` |  |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `provider_disabled_reason` | `string|nil` |  |
| `provider_identity` | `table` |  |
| `revoked_at` | `string|nil` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |

#### Example: List

```lua
local agent_connection_safety_controls, err = client:AgentConnectionSafetyControl():list({ organization_id = "example" })
```


### AgentConnectionTriggerSubscription

Create an instance: `local agent_connection_trigger_subscription = client:AgentConnectionTriggerSubscription(nil)`

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
| `configuration` | `table` |  |
| `created_at` | `string` |  |
| `defaults` | `table` |  |
| `delivery` | `string` |  |
| `enabled` | `boolean` |  |
| `failure_code` | `string|nil` |  |
| `failure_request_id` | `string|nil` |  |
| `id` | `string` |  |
| `latency` | `string` |  |
| `name` | `string` |  |
| `reconcile_at` | `string` |  |
| `reconciliation_uncertain` | `boolean` |  |
| `remote_enabled` | `boolean|nil` |  |
| `replacement_id` | `string|nil` |  |
| `retired_at` | `string|nil` |  |
| `retirement_completed_at` | `string|nil` |  |
| `schema` | `table` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `toolkit_version` | `string` |  |
| `trigger_slug` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `string` |  |
| `waiting_for_retirement` | `boolean` |  |

#### Example: List

```lua
local agent_connection_trigger_subscriptions, err = client:AgentConnectionTriggerSubscription():list({ agent_connection_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local agent_connection_trigger_subscription, err = client:AgentConnectionTriggerSubscription():create({
  agent_connection_id = "example_agent_connection_id", -- string
  organization_id = "example_organization_id", -- string
  configuration = {}, -- table
  trigger_slug = "example_trigger_slug", -- string
})
```


### AgentContextCheckpoint

Create an instance: `local agent_context_checkpoint = client:AgentContextCheckpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### AgentEvent

Create an instance: `local agent_event = client:AgentEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local agent_event, err = client:AgentEvent():load({ agent_id = "agent_id", organization_id = "organization_id" })
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
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `table` | Accounts the viewer can see per toolkit, across all account pages. |
| `can_cancel_sign_in` | `boolean` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `boolean` |  |
| `can_disconnect` | `boolean` |  |
| `can_enable` | `boolean` |  |
| `can_manage` | `boolean` |  |
| `can_manage_sharing` | `boolean` |  |
| `can_reconnect` | `boolean` |  |
| `can_sync` | `boolean` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` | `table` |  |
| `connected_by` | `string|nil` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `boolean` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | `table` | Signed-in accounts per toolkit, across all account pages. |
| `connections` | `table` |  |
| `creation_key` | `string` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | `string|nil` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `pagination` | `table` |  |
| `pending_counts` | `table` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` | `string|nil` |  |
| `provider_identity` | `table` |  |
| `provider_name` | `string|nil` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `boolean` |  |
| `team_sharing_version` | `number` |  |
| `toolkit` | `string` |  |

#### Example: Load

```lua
local agent_integration, err = client:AgentIntegration():load({ id = "agent_integration_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local agent_integration, err = client:AgentIntegration():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
  toolkit = "example_toolkit", -- string
})
```


### AgentIntegrationAccount

Create an instance: `local agent_integration_account = client:AgentIntegrationAccount(nil)`

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
| `connected_by` | `string|nil` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `boolean` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | `string|nil` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider_disabled_reason` | `string|nil` |  |
| `provider_identity` | `table` |  |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `boolean` |  |
| `team_sharing_version` | `number` |  |
| `toolkit` | `string` |  |

#### Example: List

```lua
local agent_integration_accounts, err = client:AgentIntegrationAccount():list({ organization_id = "example" })
```


### AgentIntegrationCallback

Create an instance: `local agent_integration_callback = client:AgentIntegrationCallback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local agent_integration_callback, err = client:AgentIntegrationCallback():load({ connection_id = "connection_id", state = "state" })
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


### AgentRelayFileGrant

Create an instance: `local agent_relay_file_grant = client:AgentRelayFileGrant(nil)`

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
| `revoked_at` | `string|nil` |  |
| `snapshot_supported` | `boolean` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` | `string` |  |

#### Example: Load

```lua
local agent_relay_file_grant, err = client:AgentRelayFileGrant():load({ id = "agent_relay_file_grant_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_relay_file_grants, err = client:AgentRelayFileGrant():list({ organization_id = "example" })
```

#### Example: Create

```lua
local agent_relay_file_grant, err = client:AgentRelayFileGrant():create({
  organization_id = "example_organization_id", -- string
  access_mode = "example_access_mode", -- string
  connection_id = "example_connection_id", -- string
  expected_generation = 1, -- number
  key = "example_key", -- string
  resource_id = "example_resource_id", -- string
  resource_kind = "example_resource_kind", -- string
  source_operation_id = "example_source_operation_id", -- string
})
```


### AgentRelayFileGrantAccount

Create an instance: `local agent_relay_file_grant_account = client:AgentRelayFileGrantAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_modes` | `table` | Supported file access modes. |
| `generation` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `resource_kind` | `string` |  |

#### Example: List

```lua
local agent_relay_file_grant_accounts, err = client:AgentRelayFileGrantAccount():list({ organization_id = "example", source_operation_id = "example" })
```


### AgentRepository

Create an instance: `local agent_repository = client:AgentRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
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

#### Example: Load

```lua
local agent_repository, err = client:AgentRepository():load({ agent_id = "agent_id", organization_id = "organization_id" })
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


### AgentRoder

Create an instance: `local agent_roder = client:AgentRoder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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


### AgentSession

Create an instance: `local agent_session = client:AgentSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentSessionCheckpoint

Create an instance: `local agent_session_checkpoint = client:AgentSessionCheckpoint(nil)`

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

```lua
local agent_session_checkpoint, err = client:AgentSessionCheckpoint():load({ id = "agent_session_checkpoint_id", agent_session_id = "agent_session_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local agent_session_checkpoint, err = client:AgentSessionCheckpoint():create({
  agent_session_id = "example_agent_session_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### AgentSessionRoderHandoff

Create an instance: `local agent_session_roder_handoff = client:AgentSessionRoderHandoff(nil)`

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

```lua
local agent_session_roder_handoff, err = client:AgentSessionRoderHandoff():create({
  agent_session_id = "example_agent_session_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### AgentSetting

Create an instance: `local agent_setting = client:AgentSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `boolean` |  |
| `expected_version` | `string` |  |
| `instructions` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local agent_setting, err = client:AgentSetting():load({ agent_id = "agent_id", organization_id = "organization_id" })
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
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `table` |  |
| `can_message` | `boolean` | The viewer may send input to the author agent |
| `deployments_count` | `number` | Increases with every deploy of the site |
| `description` | `string|nil` | The team app description, when the site is a team app |
| `icon_url` | `string|nil` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` | `string` |  |
| `name` | `string` | The site's DNS label |
| `owner` | `table` | The person who controls the author agent |
| `thread` | `any` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | `string` | The team app title, or the site name read as words |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```lua
local agent_site, err = client:AgentSite():load({ id = "agent_site_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local agent_sites, err = client:AgentSite():list({ organization_id = "example" })
```


### AgentSkill

Create an instance: `local agent_skill = client:AgentSkill(nil)`

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
| `agents` | `table` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` | `table` |  |
| `can_manage_library` | `boolean` |  |
| `content` | `string` | The skill's SKILL.md |
| `files` | `table` |  |
| `id` | `string` |  |
| `marketplace` | `string` |  |
| `pending` | `boolean` | Some agent is still applying a change; check again shortly |
| `plugin` | `string` | The marketplace entry id |
| `revision` | `string` | The commit SHA returned by preview |
| `skill` | `table` |  |
| `skills` | `table` |  |
| `source` | `string` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

#### Example: Load

```lua
local agent_skill, err = client:AgentSkill():load({ id = "agent_skill_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local agent_skill, err = client:AgentSkill():create({
  organization_id = "example_organization_id", -- string
  audience = {}, -- table
  revision = "example_revision", -- string
  skills = {}, -- table
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local agent_subscription, err = client:AgentSubscription():load({ agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local agent_subscription, err = client:AgentSubscription():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### AgentSwarm

Create an instance: `local agent_swarm = client:AgentSwarm(nil)`

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
| `base_bookmark` | `string|nil` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` | `string|nil` |  |
| `base_revision` | `string|nil` | 64-hex commit id; skips the head lookup |
| `budget` | `table` |  |
| `canceled_at` | `string|nil` |  |
| `canceled_count` | `number` |  |
| `concurrency_key` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `creator_user_id` | `string|nil` |  |
| `deadline_at` | `string|nil` |  |
| `display_id` | `number` |  |
| `done_count` | `number` |  |
| `environment` | `table` |  |
| `failed_count` | `number` |  |
| `finished_at` | `string|nil` |  |
| `finished_at_label` | `string|nil` |  |
| `github` | `table` |  |
| `goal` | `string|nil` |  |
| `id` | `string` |  |
| `model` | `string|nil` |  |
| `model_provider` | `string|nil` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string|nil` |  |
| `outcome` | `string|nil` |  |
| `phase` | `string|nil` |  |
| `policy` | `table` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` | `string|nil` |  |
| `queued_at_label` | `string|nil` |  |
| `repository` | `string` | Repository slug inside the organization |
| `repository_id` | `string|nil` |  |
| `repository_slug` | `string|nil` |  |
| `reserved` | `table` |  |
| `scheduler_generation` | `number` |  |
| `skipped_count` | `number` |  |
| `slug` | `string` |  |
| `started_at` | `string|nil` |  |
| `started_at_label` | `string|nil` |  |
| `status` | `string` |  |
| `summary` | `table` |  |
| `target` | `table` | Where the swarm lands. |
| `task_count` | `number` |  |
| `task_template_json` | `string|nil` |  |
| `tasks` | `table` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `usage` | `table` |  |

#### Example: Load

```lua
local agent_swarm, err = client:AgentSwarm():load({ id = "agent_swarm_id" })
```

#### Example: List

```lua
local agent_swarms, err = client:AgentSwarm():list({ org = "example" })
```

#### Example: Create

```lua
local agent_swarm, err = client:AgentSwarm():create({
  organization_slug = "example_organization_slug", -- string|nil
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local agent_thread, err = client:AgentThread():load({ id = "agent_thread_id" })
```

#### Example: Create

```lua
local agent_thread, err = client:AgentThread():create({
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


### AgentUsage

Create an instance: `local agent_usage = client:AgentUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `days` | `table` | One cell per (day, model), ascending by day then model. |
| `ended_at` | `string` |  |
| `pricing_version` | `string` | The price table in effect now; rows carry the version they were priced at. |
| `source` | `string` | Which store served the rows. |
| `started_at` | `string` |  |
| `user_days` | `table` | One cell per (day, person), ascending by day. |
| `users` | `table` | One row per (person, model), descending by tokens. |
| `window` | `string` |  |

#### Example: Load

```lua
local agent_usage, err = client:AgentUsage():load({ organization_id = "organization_id" })
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
| `id` | `string` |  |
| `name` | `string` |  |
| `project_choices` | `table` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `boolean` |  |
| `slug` | `string` |  |
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


### AgentWebPreview

Create an instance: `local agent_web_preview = client:AgentWebPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string|nil` |  |
| `icon_url` | `string|nil` |  |
| `image_url` | `string|nil` |  |
| `title` | `string|nil` |  |

#### Example: Load

```lua
local agent_web_preview, err = client:AgentWebPreview():load({ token = "token" })
```


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
| `load(match)` | Load a single entity by match criteria. |
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

#### Example: Load

```lua
local agent_workflow, err = client:AgentWorkflow():load({ agent_id = "agent_id", organization_id = "organization_id" })
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


### Agreement

Create an instance: `local agreement = client:Agreement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string|nil` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` | `string` |  |
| `key` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: List

```lua
local agreements, err = client:Agreement():list({ organization_id = "example" })
```


### AgreementAccessRequest

Create an instance: `local agreement_access_request = client:AgreementAccessRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local agreement_access_request, err = client:AgreementAccessRequest():create({
  organization_id = "example_organization_id", -- string
})
```


### AlertRuleEvent

Create an instance: `local alert_rule_event = client:AlertRuleEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local alert_rule_event, err = client:AlertRuleEvent():load({ id = "alert_rule_event_id", alert_rule_id = "alert_rule_id", space_id = "space_id" })
```

#### Example: Create

```lua
local alert_rule_event, err = client:AlertRuleEvent():create({
  alert_rule_id = "example_alert_rule_id", -- string
  space_id = "example_space_id", -- string
})
```


### AllocationLog

Create an instance: `local allocation_log = client:AllocationLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local allocation_log, err = client:AllocationLog():load({ allocation_id = "allocation_id", app_id = "app_id" })
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


### AppAccess

Create an instance: `local app_access = client:AppAccess(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppAccessJwk

Create an instance: `local app_access_jwk = client:AppAccessJwk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local app_access_jwk, err = client:AppAccessJwk():load()
```


### AppCdn

Create an instance: `local app_cdn = client:AppCdn(nil)`

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

#### Example: Create

```lua
local app_deployment, err = client:AppDeployment():create({
  app_id = "example_app_id", -- string
})
```


### AppDeploymentDashboard

Create an instance: `local app_deployment_dashboard = client:AppDeploymentDashboard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `table` |  |
| `app` | `table` |  |
| `audit_events` | `table` |  |
| `capacity` | `table` |  |
| `connections` | `table` |  |
| `data_resources` | `table` |  |
| `deployments` | `table` |  |
| `desired_states` | `table` |  |
| `environments` | `table` |  |
| `id` | `string` |  |
| `locations` | `table` |  |
| `managed_database_catalog` | `table` |  |
| `observability` | `table` |  |
| `operations` | `table` |  |
| `placements` | `table` |  |
| `reconciler_ticks` | `table` |  |
| `releases` | `table` |  |
| `rollback_deployments` | `table` |  |
| `rollouts` | `table` |  |
| `runtime_instances` | `table` |  |
| `service_bindings` | `table` |  |
| `service_views` | `table` |  |
| `services` | `table` |  |
| `storage_resources` | `table` |  |
| `summary` | `table` |  |

#### Example: Load

```lua
local app_deployment_dashboard, err = client:AppDeploymentDashboard():load({ id = "app_deployment_dashboard_id" })
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


### Artefact

Create an instance: `local artefact = client:Artefact(nil)`

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
| `automation_invocation_id` | `string|nil` |  |
| `byte_size` | `number` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `created_at` | `string|nil` |  |
| `created_by_user_id` | `string|nil` |  |
| `description` | `string|nil` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `entrypoint` | `string` |  |
| `expires_at` | `string|nil` |  |
| `filename` | `string` |  |
| `files` | `table` |  |
| `harness` | `string|nil` |  |
| `harness_version` | `string|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `model` | `string|nil` |  |
| `organization_id` | `string` |  |
| `published_at` | `string|nil` |  |
| `repository_id` | `string|nil` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `string|nil` |  |
| `vcs_agent_session_id` | `string|nil` |  |
| `version` | `number` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```lua
local artefact, err = client:Artefact():load({ id = "artefact_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local artefacts, err = client:Artefact():list({ organization_id = "example" })
```

#### Example: Create

```lua
local artefact, err = client:Artefact():create({
  organization_id = "example_organization_id", -- string
})
```


### ArtefactCommentThread

Create an instance: `local artefact_comment_thread = client:ArtefactCommentThread(nil)`

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
| `comments` | `table` |  |
| `id` | `string` | The anchor key. |
| `quote` | `string` |  |
| `resolved` | `boolean` |  |

#### Example: List

```lua
local artefact_comment_threads, err = client:ArtefactCommentThread():list({ artefact_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local artefact_comment_thread, err = client:ArtefactCommentThread():create({
  artefact_id = "example_artefact_id", -- string
  organization_id = "example_organization_id", -- string
  anchor = "example_anchor", -- string
  body = "example_body", -- string
})
```


### ArtefactRevision

Create an instance: `local artefact_revision = client:ArtefactRevision(nil)`

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

```lua
local artefact_revision, err = client:ArtefactRevision():create({
  artefact_id = "example_artefact_id", -- string
  organization_id = "example_organization_id", -- string
  base_version = 1, -- number
  content = "example_content", -- string
})
```


### ArtefactViewToken

Create an instance: `local artefact_view_token = client:ArtefactViewToken(nil)`

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

```lua
local artefact_view_token, err = client:ArtefactViewToken():create({
  artefact_id = "example_artefact_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### Artifact

Create an instance: `local artifact = client:Artifact(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local artifact, err = client:Artifact():load({ id = "artifact_id" })
```

#### Example: Create

```lua
local artifact, err = client:Artifact():create({
})
```


### ArtifactCacheNamespace

Create an instance: `local artifact_cache_namespace = client:ArtifactCacheNamespace(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local artifact_cache_namespace, err = client:ArtifactCacheNamespace():load({ id = "artifact_cache_namespace_id" })
```

#### Example: Create

```lua
local artifact_cache_namespace, err = client:ArtifactCacheNamespace():create({
})
```


### ArtifactImageRepository

Create an instance: `local artifact_image_repository = client:ArtifactImageRepository(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local artifact_image_repository, err = client:ArtifactImageRepository():load({ id = "artifact_image_repository_id" })
```

#### Example: Create

```lua
local artifact_image_repository, err = client:ArtifactImageRepository():create({
})
```


### ArtifactPackageMirror

Create an instance: `local artifact_package_mirror = client:ArtifactPackageMirror(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local artifact_package_mirror, err = client:ArtifactPackageMirror():load({ id = "artifact_package_mirror_id" })
```

#### Example: Create

```lua
local artifact_package_mirror, err = client:ArtifactPackageMirror():create({
})
```


### ArtifactRetentionPolicy

Create an instance: `local artifact_retention_policy = client:ArtifactRetentionPolicy(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local artifact_retention_policy, err = client:ArtifactRetentionPolicy():load({ id = "artifact_retention_policy_id" })
```

#### Example: Create

```lua
local artifact_retention_policy, err = client:ArtifactRetentionPolicy():create({
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


### AuditEvent

Create an instance: `local audit_event = client:AuditEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_user_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `observability_space_id` | `string|nil` |  |
| `organization_id` | `string` |  |
| `payload` | `any` |  |
| `request_id` | `string|nil` |  |
| `severity` | `string` |  |
| `subject_id` | `string` |  |
| `subject_kind` | `string` |  |
| `subject_name` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local audit_events, err = client:AuditEvent():list({ organization_id = "example" })
```


### Auth

Create an instance: `local auth = client:Auth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |


### AuthCli

Create an instance: `local auth_cli = client:AuthCli(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AuthGithub

Create an instance: `local auth_github = client:AuthGithub(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthGoogle

Create an instance: `local auth_google = client:AuthGoogle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthOpenai

Create an instance: `local auth_openai = client:AuthOpenai(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthPasswordReset

Create an instance: `local auth_password_reset = client:AuthPasswordReset(nil)`

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

```lua
local auth_password_reset, err = client:AuthPasswordReset():create({
  email = "example_email", -- string
})
```


### AuthRegistrationOption

Create an instance: `local auth_registration_option = client:AuthRegistrationOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_password_signup_enabled` | `boolean` |  |
| `openai_sign_in_enabled` | `boolean` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` | `string|nil` |  |
| `waitlist_enabled` | `boolean` | New public signups require waitlist approval when enabled. |

#### Example: Load

```lua
local auth_registration_option, err = client:AuthRegistrationOption():load()
```


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


### BackendRunnerPool

Create an instance: `local backend_runner_pool = client:BackendRunnerPool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local backend_runner_pool, err = client:BackendRunnerPool():load({ backend_id = "backend_id" })
```

#### Example: Create

```lua
local backend_runner_pool, err = client:BackendRunnerPool():create({
  backend_id = "example_backend_id", -- string
})
```


### Bazel

Create an instance: `local bazel = client:Bazel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### BazelActionResult

Create an instance: `local bazel_action_result = client:BazelActionResult(nil)`

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

```lua
local bazel_action_result, err = client:BazelActionResult():load({ id = "bazel_action_result_id", action_result_id = "action_result_id" })
```


### BazelBackend

Create an instance: `local bazel_backend = client:BazelBackend(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local bazel_backend, err = client:BazelBackend():load({ id = "bazel_backend_id" })
```

#### Example: Create

```lua
local bazel_backend, err = client:BazelBackend():create({
})
```


### BazelBlob

Create an instance: `local bazel_blob = client:BazelBlob(nil)`

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

```lua
local bazel_blob, err = client:BazelBlob():load({ id = "bazel_blob_id", blob_id = "blob_id", hash = "hash" })
```


### BazelExecution

Create an instance: `local bazel_execution = client:BazelExecution(nil)`

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

```lua
local bazel_execution, err = client:BazelExecution():load({ id = "bazel_execution_id" })
```

#### Example: Create

```lua
local bazel_execution, err = client:BazelExecution():create({
})
```


### BazelFindMissingBlob

Create an instance: `local bazel_find_missing_blob = client:BazelFindMissingBlob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local bazel_find_missing_blob, err = client:BazelFindMissingBlob():create({
})
```


### Billing

Create an instance: `local billing = client:Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |

#### Example: Load

```lua
local billing, err = client:Billing():load({ organization_id = "organization_id" })
```


### BillingAddon

Create an instance: `local billing_addon = client:BillingAddon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `quantity` | `number` |  |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |


### BillingBudget

Create an instance: `local billing_budget = client:BillingBudget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `number|nil` | Null clears the budget. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |


### BillingCheckoutSession

Create an instance: `local billing_checkout_session = client:BillingCheckoutSession(nil)`

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

```lua
local billing_checkout_session, err = client:BillingCheckoutSession():create({
  organization_id = "example_organization_id", -- string
})
```


### BillingContact

Create an instance: `local billing_contact = client:BillingContact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
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
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |


### BillingExtraSpend

Create an instance: `local billing_extra_spend = client:BillingExtraSpend(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
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
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `number|nil` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |


### BillingInvoice

Create an instance: `local billing_invoice = client:BillingInvoice(nil)`

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
| `hosted_invoice_url` | `string|nil` |  |
| `id` | `string` |  |
| `invoice_pdf` | `string|nil` |  |
| `metronome_invoice_id` | `string|nil` | Metronome's id for the invoice it pushed |
| `number` | `string|nil` |  |
| `period_ended_at` | `string|nil` |  |
| `period_started_at` | `string|nil` |  |
| `status` | `string` |  |
| `total_cents` | `number` |  |

#### Example: List

```lua
local billing_invoices, err = client:BillingInvoice():list({ organization_id = "example" })
```


### BillingPackage

Create an instance: `local billing_package = client:BillingPackage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
| `base_price_cents` | `number` |  |
| `billing_interval` | `string` |  |
| `billing_policy` | `string` |  |
| `ci_included_spend_cents` | `number` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` | `string` |  |
| `key` | `string` |  |
| `max_seats` | `number|nil` |  |
| `name` | `string` |  |
| `pay_as_you_go_enabled` | `boolean` |  |
| `rates` | `table` |  |
| `revision` | `number` |  |
| `roder_daily_run_limit` | `number` |  |
| `roder_run_concurrency_limit` | `number` |  |
| `seat_price_cents` | `number` |  |
| `trial_days` | `number` |  |
| `visibility` | `string` |  |

#### Example: List

```lua
local billing_packages, err = client:BillingPackage():list()
```


### BillingPortalSession

Create an instance: `local billing_portal_session = client:BillingPortalSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `return_url` | `string` |  |

#### Example: Create

```lua
local billing_portal_session, err = client:BillingPortalSession():create({
  organization_id = "example_organization_id", -- string
})
```


### BillingPrepaidPeriod

Create an instance: `local billing_prepaid_period = client:BillingPrepaidPeriod(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `string|nil` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string|nil` |  |
| `minutes` | `number` |  |
| `net_amount_cents` | `number` |  |
| `paid_at` | `string|nil` |  |
| `paid_total_cents` | `number|nil` |  |
| `payment_action_url` | `string|nil` |  |
| `period_ended_at` | `string` |  |
| `period_started_at` | `string` |  |
| `receipt_url` | `string|nil` |  |
| `refunded_net_cents` | `number` |  |
| `state` | `string` |  |

#### Example: Load

```lua
local billing_prepaid_period, err = client:BillingPrepaidPeriod():load({ id = "billing_prepaid_period_id", organization_id = "organization_id" })
```


### BillingPrepaidPurchase

Create an instance: `local billing_prepaid_purchase = client:BillingPrepaidPurchase(nil)`

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
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `string|nil` |  |
| `minutes` | `number` |  |
| `net_amount_cents` | `number` |  |
| `paid_at` | `string|nil` |  |
| `paid_total_cents` | `number|nil` |  |
| `payment_action_url` | `string|nil` |  |
| `prepaid` | `table` |  |
| `purchase` | `table` |  |
| `receipt_url` | `string|nil` |  |
| `refunded_net_cents` | `number` |  |
| `request_key` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```lua
local billing_prepaid_purchase, err = client:BillingPrepaidPurchase():load({ id = "billing_prepaid_purchase_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local billing_prepaid_purchases, err = client:BillingPrepaidPurchase():list({ organization_id = "example" })
```

#### Example: Create

```lua
local billing_prepaid_purchase, err = client:BillingPrepaidPurchase():create({
  organization_id = "example_organization_id", -- string
  minutes = 1, -- number
  request_key = "example_request_key", -- string
})
```


### BillingSubscription

Create an instance: `local billing_subscription = client:BillingSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
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
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |


### BillingTokenTopUp

Create an instance: `local billing_token_top_up = client:BillingTokenTopUp(nil)`

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

```lua
local billing_token_top_up, err = client:BillingTokenTopUp():create({
  organization_id = "example_organization_id", -- string
  amount_cents = 1, -- number
  request_key = "example_request_key", -- string
})
```


### BillingUsage

Create an instance: `local billing_usage = client:BillingUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


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


### BookmarkProtectionRefreshGithubRequiredCheck

Create an instance: `local bookmark_protection_refresh_github_required_check = client:BookmarkProtectionRefreshGithubRequiredCheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exclusions` | `table` |  |
| `fetched_at` | `string|nil` |  |
| `fetched_at_label` | `string|nil` |  |
| `github_branch` | `string` |  |
| `github_owner` | `string|nil` |  |
| `github_repository_name` | `string|nil` |  |
| `last_error` | `string|nil` |  |
| `proven` | `boolean` |  |
| `requirements` | `table` |  |
| `stale` | `boolean` |  |

#### Example: Create

```lua
local bookmark_protection_refresh_github_required_check, err = client:BookmarkProtectionRefreshGithubRequiredCheck():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
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


### CacheNamespaceEntry

Create an instance: `local cache_namespace_entry = client:CacheNamespaceEntry(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local cache_namespace_entry, err = client:CacheNamespaceEntry():load({ id = "cache_namespace_entry_id", cache_namespace_id = "cache_namespace_id" })
```

#### Example: Create

```lua
local cache_namespace_entry, err = client:CacheNamespaceEntry():create({
  cache_namespace_id = "example_cache_namespace_id", -- string
})
```


### CatalogSelector

Create an instance: `local catalog_selector = client:CatalogSelector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `table` |  |
| `id` | `string` |  |
| `locations` | `table` |  |
| `services` | `table` |  |

#### Example: Load

```lua
local catalog_selector, err = client:CatalogSelector():load({ app_id = "app_id" })
```


### CdnDeployment

Create an instance: `local cdn_deployment = client:CdnDeployment(nil)`

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

```lua
local cdn_deployment, err = client:CdnDeployment():load({ id = "cdn_deployment_id", app_id = "app_id", cdn_id = "cdn_id" })
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


### Change

Create an instance: `local change = client:Change(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `table` | Counts for each state across the active non-state filters. |
| `filters` | `table` |  |
| `github_sync` | `table` |  |
| `result` | `any` | What this page is a page of. |

#### Example: Load

```lua
local change, err = client:Change():load({ organization_id = "organization_id" })
```


### ChangeAsset

Create an instance: `local change_asset = client:ChangeAsset(nil)`

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

```lua
local change_asset, err = client:ChangeAsset():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  alias = "example_alias", -- string
  byte_size = 1, -- number
  checksum_md5 = "example_checksum_md5", -- string
  checksum_sha256 = "example_checksum_sha256", -- string
  content_type = "example_content_type", -- string
  filename = "example_filename", -- string
})
```


### ChangeComment

Create an instance: `local change_comment = client:ChangeComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `comment` | `table` |  |
| `comments` | `table` |  |
| `id` | `string` |  |
| `kind` | `string|nil` |  |
| `line` | `number|nil` |  |
| `parent_comment_id` | `string|nil` |  |
| `patchset_id` | `string|nil` |  |
| `path` | `string|nil` |  |
| `side` | `string|nil` |  |

#### Example: Load

```lua
local change_comment, err = client:ChangeComment():load({ change_id = "change_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local change_comment, err = client:ChangeComment():create({
  change_id = "example_change_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  body = "example_body", -- string
})
```


### ChangeFileReviewCheckpoint

Create an instance: `local change_file_review_checkpoint = client:ChangeFileReviewCheckpoint(nil)`

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

```lua
local change_file_review_checkpoint, err = client:ChangeFileReviewCheckpoint():create({
  change_id = "example_change_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  patchset_id = "example_patchset_id", -- string
  path = "example_path", -- string
  request_id = "example_request_id", -- string
  review_action = "example_review_action", -- string
})
```


### ChangeGitBranchSubmission

Create an instance: `local change_git_branch_submission = client:ChangeGitBranchSubmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local change_git_branch_submission, err = client:ChangeGitBranchSubmission():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### ChangeGitCommitIdentity

Create an instance: `local change_git_commit_identity = client:ChangeGitCommitIdentity(nil)`

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
| `git_commit_ids` | `table` |  |
| `id` | `string` |  |
| `identities` | `table` |  |
| `missing_git_commit_ids` | `table` |  |
| `patchset_number` | `number` |  |

#### Example: Load

```lua
local change_git_commit_identity, err = client:ChangeGitCommitIdentity():load({ id = "change_git_commit_identity_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local change_git_commit_identity, err = client:ChangeGitCommitIdentity():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  git_commit_ids = {}, -- table
})
```


### ChangeGitPublication

Create an instance: `local change_git_publication = client:ChangeGitPublication(nil)`

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
| `request` | `table` |  |
| `request_digest` | `string` |  |
| `revisions` | `table` |  |
| `status` | `string` |  |
| `transfer_refs` | `table` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

#### Example: Load

```lua
local change_git_publication, err = client:ChangeGitPublication():load({ id = "change_git_publication_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local change_git_publication, err = client:ChangeGitPublication():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  operation_key = "example_operation_key", -- string
  request = {}, -- table
})
```


### ChangeGroupMember

Create an instance: `local change_group_member = client:ChangeGroupMember(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` | Change number |
| `changes` | `table` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |

#### Example: Create

```lua
local change_group_member, err = client:ChangeGroupMember():create({
  change_group_id = "example_change_group_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  change_id = "example_change_id", -- string
})
```


### ChangeLabel

Create an instance: `local change_label = client:ChangeLabel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | `boolean` |  |
| `add` | `table` |  |
| `approval` | `table` |  |
| `assets` | `table` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | `any` | Human user summary or organization automation identity. |
| `capabilities` | `table` |  |
| `change_key` | `string` |  |
| `checks` | `table` |  |
| `checks_status` | `string` |  |
| `comments` | `table` |  |
| `comments_count` | `number` |  |
| `comments_count_label` | `string` |  |
| `commit_message` | `string|nil` |  |
| `current_patchset` | `table` |  |
| `description` | `string|nil` |  |
| `draft` | `boolean` |  |
| `folded_into_number` | `number|nil` |  |
| `github_projection_status` | `string|nil` |  |
| `github_pull_request` | `table` |  |
| `github_pull_requests` | `table` |  |
| `group` | `table|nil` |  |
| `has_description` | `boolean` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` | `string` |  |
| `jj_change_id` | `string|nil` |  |
| `labels` | `table` |  |
| `landable` | `boolean` |  |
| `landed_by` | `table` |  |
| `number` | `number` |  |
| `orphaned` | `boolean` |  |
| `orphaned_at` | `string` |  |
| `orphaned_at_label` | `string` |  |
| `orphaned_reason` | `string` |  |
| `parent_change_id` | `string|nil` |  |
| `parent_change_number` | `number|nil` |  |
| `patchset_number` | `number|nil` |  |
| `patchsets` | `table` |  |
| `primary_status` | `string|nil` |  |
| `public_id` | `string` |  |
| `relation_chain` | `table` |  |
| `remove` | `table` |  |
| `requested_changes` | `boolean` |  |
| `restack_state` | `string` |  |
| `reviewer_candidates` | `table` | Organization members available to the reviewer picker on this page. |
| `reviewers` | `table` |  |
| `stable_change_id` | `string` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `unresolved_comments_count_label` | `string` |  |
| `url` | `string` |  |
| `votes` | `table` |  |


### ChangeLandingHold

Create an instance: `local change_landing_hold = client:ChangeLandingHold(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ChangeLandingRequest

Create an instance: `local change_landing_request = client:ChangeLandingRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_ids` | `table` |  |
| `count` | `number` |  |
| `defer_until_ready` | `boolean` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` | `string` |  |
| `expected_scope_version` | `string` |  |
| `head_change_id` | `string` |  |
| `id` | `string|nil` |  |
| `numbers` | `table` |  |
| `override_acknowledged` | `boolean` |  |
| `override_codes` | `table` |  |
| `position` | `number` |  |
| `priority` | `string` |  |
| `scope_version` | `string` |  |
| `state` | `string` |  |
| `version` | `number` |  |

#### Example: Create

```lua
local change_landing_request, err = client:ChangeLandingRequest():create({
  change_id = "example_change_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### ChangeRequestChange

Create an instance: `local change_request_change = client:ChangeRequestChange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string|nil` |  |

#### Example: Create

```lua
local change_request_change, err = client:ChangeRequestChange():create({
  change_id = "example_change_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### ChangeReviewer

Create an instance: `local change_reviewer = client:ChangeReviewer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `table` |  |
| `email` | `string` |  |
| `name` | `string|nil` |  |
| `remove` | `table` |  |
| `removed_reviewers` | `table` |  |
| `requested_reviewers` | `table` |  |
| `reviewers` | `table` |  |

#### Example: List

```lua
local change_reviewers, err = client:ChangeReviewer():list({ change_id = "example", organization_id = "example", repo_id = "example" })
```


### ChangeTranscript

Create an instance: `local change_transcript = client:ChangeTranscript(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture_kind` | `string` |  |
| `captured_at` | `string` |  |
| `harness` | `table` |  |
| `id` | `string` |  |
| `original_resume` | `any` |  |
| `patchset_commit_id` | `string` |  |
| `patchset_number` | `number` |  |
| `redaction_count` | `number` |  |
| `session_id` | `string|nil` |  |
| `session_title` | `string|nil` |  |
| `status` | `string` |  |
| `superseded` | `boolean` |  |
| `user` | `table` |  |

#### Example: List

```lua
local change_transcripts, err = client:ChangeTranscript():list({ change_id = "example", organization_id = "example", repo_id = "example" })
```


### ChangeTranscriptSummary

Create an instance: `local change_transcript_summary = client:ChangeTranscriptSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimated_cost` | `any` |  |
| `session_count` | `number` |  |
| `sessions` | `table` |  |
| `tokens_partial` | `boolean` |  |
| `total_tokens` | `number|nil` |  |

#### Example: Load

```lua
local change_transcript_summary, err = client:ChangeTranscriptSummary():load({ organization_id = "organization_id", ids = "ids" })
```


### CheckpointPrepareChunk

Create an instance: `local checkpoint_prepare_chunk = client:CheckpointPrepareChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local checkpoint_prepare_chunk, err = client:CheckpointPrepareChunk():create({
  agent_session_id = "example_agent_session_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### CiNode

Create an instance: `local ci_node = client:CiNode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `string|nil` |  |
| `bazel_enabled` | `boolean` |  |
| `bazel_properties_json` | `string|nil` |  |
| `ci_runner_pool_id` | `string` |  |
| `cordoned_at` | `string|nil` |  |
| `cordoned_at_label` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `health_state` | `string` |  |
| `heartbeat_age_seconds` | `number|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `labels_csv` | `string|nil` |  |
| `last_seen_at` | `string|nil` |  |
| `last_seen_at_label` | `string|nil` |  |
| `name` | `string` |  |
| `network_peer_id` | `string|nil` |  |
| `node_capabilities_csv` | `string|nil` |  |
| `node_certificate_expires_at` | `string|nil` |  |
| `node_certificate_expires_at_label` | `string|nil` |  |
| `node_certificate_fingerprint_sha256` | `string|nil` |  |
| `node_certificate_serial` | `string|nil` |  |
| `offline_at` | `string|nil` |  |
| `offline_at_label` | `string|nil` |  |
| `online_at` | `string|nil` |  |
| `online_at_label` | `string|nil` |  |
| `organization_id` | `string` |  |
| `os` | `string|nil` |  |
| `revoked_at` | `string|nil` |  |
| `revoked_at_label` | `string|nil` |  |
| `schedulable` | `boolean` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `version` | `string|nil` |  |

#### Example: Load

```lua
local ci_node, err = client:CiNode():load({ id = "ci_node_id" })
```


### CiPipeline

Create an instance: `local ci_pipeline = client:CiPipeline(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ci_runner_pool_id` | `string|nil` |  |
| `concurrency_key` | `string|nil` |  |
| `created_at` | `string` |  |
| `default_branch` | `string|nil` |  |
| `description` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string|nil` |  |
| `required_capabilities_csv` | `string|nil` |  |
| `runner_pool` | `table|nil` |  |
| `runs` | `table` |  |
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
| `workflow_path` | `string|nil` |  |

#### Example: Load

```lua
local ci_pipeline, err = client:CiPipeline():load({ id = "ci_pipeline_id" })
```

#### Example: List

```lua
local ci_pipelines, err = client:CiPipeline():list()
```

#### Example: Create

```lua
local ci_pipeline, err = client:CiPipeline():create({
})
```


### CiPipelineRun

Create an instance: `local ci_pipeline_run = client:CiPipelineRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `canceled_at` | `string|nil` |  |
| `ci_pipeline_id` | `string` |  |
| `ci_runner_pool_id` | `string|nil` |  |
| `commit_sha` | `string|nil` |  |
| `concurrency_key` | `string|nil` |  |
| `created_at` | `string` |  |
| `creator_user_id` | `string|nil` |  |
| `display_id` | `number` |  |
| `failed` | `boolean` |  |
| `finished_at` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `jobs` | `table` |  |
| `message` | `string|nil` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `parameters_json` | `string|nil` |  |
| `queued_at` | `string|nil` |  |
| `ref_name` | `string|nil` |  |
| `repository_id` | `string|nil` |  |
| `required_capabilities_csv` | `string|nil` |  |
| `retry_number` | `number` |  |
| `retryable` | `boolean` |  |
| `slug` | `string` |  |
| `source_url` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local ci_pipeline_run, err = client:CiPipelineRun():load({ id = "ci_pipeline_run_id", pipeline_id = "pipeline_id" })
```

#### Example: Create

```lua
local ci_pipeline_run, err = client:CiPipelineRun():create({
  pipeline_id = "example_pipeline_id", -- string
})
```


### CiRunnerPool

Create an instance: `local ci_runner_pool = client:CiRunnerPool(nil)`

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
| `bazel_properties_json` | `string|nil` |  |
| `created_at` | `string` |  |
| `description` | `string|nil` |  |
| `elastic_config_json` | `string|nil` |  |
| `elastic_provider_kind` | `string|nil` |  |
| `id` | `string` |  |
| `isolation_mode` | `string` |  |
| `labels_csv` | `string|nil` |  |
| `max_concurrency` | `number` |  |
| `modal_capacity` | `table` |  |
| `modal_runner_invocations` | `table` |  |
| `name` | `string` |  |
| `network_space_id` | `string|nil` |  |
| `node_capabilities_csv` | `string|nil` |  |
| `organization_id` | `string` |  |
| `runner_count_label` | `string` |  |
| `runner_kind` | `string` |  |
| `runners` | `table` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local ci_runner_pool, err = client:CiRunnerPool():load({ id = "ci_runner_pool_id" })
```

#### Example: List

```lua
local ci_runner_pools, err = client:CiRunnerPool():list()
```

#### Example: Create

```lua
local ci_runner_pool, err = client:CiRunnerPool():create({
})
```


### CiStatus

Create an instance: `local ci_status = client:CiStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### CliEvent

Create an instance: `local cli_event = client:CliEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `properties` | `table` |  |

#### Example: Create

```lua
local cli_event, err = client:CliEvent():create({
  event = "example_event", -- string
  properties = {}, -- table
})
```


### CliRelease

Create an instance: `local cli_release = client:CliRelease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local cli_release, err = client:CliRelease():load()
```

#### Example: Create

```lua
local cli_release, err = client:CliRelease():create({
})
```


### CloudWorkspaceBackupObject

Create an instance: `local cloud_workspace_backup_object = client:CloudWorkspaceBackupObject(nil)`

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
local cloud_workspace_backup_object, err = client:CloudWorkspaceBackupObject():load({ id = "cloud_workspace_backup_object_id", cloud_workspace_backup_id = "cloud_workspace_backup_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### CodeRuleEvaluation

Create an instance: `local code_rule_evaluation = client:CodeRuleEvaluation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advisory` | `boolean` |  |
| `coverage` | `table` |  |
| `diff` | `string` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` | `number` |  |
| `evaluator_version` | `string` |  |
| `input_digest` | `string|nil` |  |
| `limits` | `table` |  |
| `model` | `string` |  |
| `requests` | `table` |  |
| `schema_version` | `number` |  |
| `snapshot_digest` | `string|nil` |  |
| `unchecked` | `table` |  |
| `verdicts` | `table` |  |

#### Example: Create

```lua
local code_rule_evaluation, err = client:CodeRuleEvaluation():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  diff = "example_diff", -- string
})
```


### ComSiteAccess

Create an instance: `local com_site_access = client:ComSiteAccess(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ComSiteAccessSession

Create an instance: `local com_site_access_session = client:ComSiteAccessSession(nil)`

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

```lua
local com_site_access_session, err = client:ComSiteAccessSession():create({
  host = "example_host", -- string
})
```


### CommentThreadComment

Create an instance: `local comment_thread_comment = client:CommentThreadComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |

#### Example: Create

```lua
local comment_thread_comment, err = client:CommentThreadComment():create({
  artefact_id = "example_artefact_id", -- string
  comment_thread_id = "example_comment_thread_id", -- string
  organization_id = "example_organization_id", -- string
  body = "example_body", -- string
})
```


### CommitDiff

Create an instance: `local commit_diff = client:CommitDiff(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `table` |  |
| `id` | `string` |  |
| `parent_id` | `string|nil` |  |

#### Example: Load

```lua
local commit_diff, err = client:CommitDiff():load({ id = "commit_diff_id", commit_id = "commit_id", organization_id = "organization_id", repo_id = "repo_id" })
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


### ContactSubmission

Create an instance: `local contact_submission = client:ContactSubmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `string|nil` |  |
| `email` | `string` | Stored downcased and stripped. |
| `message` | `string` |  |
| `name` | `string` |  |
| `website` | `string|nil` | Honeypot. |

#### Example: Create

```lua
local contact_submission, err = client:ContactSubmission():create({
  email = "example_email", -- string
  message = "example_message", -- string
  name = "example_name", -- string
})
```


### ControlComputer

Create an instance: `local control_computer = client:ControlComputer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `table` | A point-in-time control transport observation. |
| `consent` | `table` |  |
| `device` | `table` |  |
| `id` | `string` |  |
| `provider_status` | `table` |  |

#### Example: List

```lua
local control_computers, err = client:ControlComputer():list({ organization_id = "example", persistent_agent_id = "example" })
```


### ControlComputerControlOperation

Create an instance: `local control_computer_control_operation = client:ControlComputerControlOperation(nil)`

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
local control_computer_control_operation, err = client:ControlComputerControlOperation():load({ id = "control_computer_control_operation_id", control_computer_id = "control_computer_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local control_computer_control_operation, err = client:ControlComputerControlOperation():create({
  control_computer_id = "example_control_computer_id", -- string
  organization_id = "example_organization_id", -- string
  action = "example_action", -- string
  arguments = {}, -- table
  key = "example_key", -- string
})
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
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `check_count` | `number` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `credential_name` | `string|nil` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | `string` | When the team's time limit ends. |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` | `number|nil` |  |
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
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | `number` | Scenarios saved from this discovery. |
| `scenario_generation` | `table` |  |
| `scenarios_pending` | `boolean` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` | `string` |  |
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
| `actual` | `string` |  |
| `agent_id` | `string` |  |
| `agent_title` | `string` |  |
| `area` | `string|nil` | On a locked finding, the first segment of the page it was seen on, such as Billing. |
| `checks` | `table` | Checks in the same tester report that this finding cites. |
| `confidence` | `string` |  |
| `confirmed` | `boolean` | On a locked finding, whether the automatic review confirmed it. |
| `evidence_step_ids` | `table` |  |
| `evidence_timestamp_ms` | `number|nil` |  |
| `expected` | `string` |  |
| `fix_prompt` | `string` | A coding-agent prompt for this finding alone |
| `has_recording` | `boolean` | On a locked finding, whether the tester recorded evidence for it. |
| `id` | `string` |  |
| `locked` | `boolean` | True for a locked finding of the workspace's included scan before it pays. |
| `reproduction_steps` | `table` |  |
| `severity` | `string` |  |
| `title` | `string` |  |
| `tracked` | `table|nil` | The finding record to resolve or ignore; null until the tester finishes. |
| `url` | `string` |  |

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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string|nil` |  |
| `environment_id` | `string` |  |
| `flow_map` | `table|nil` |  |
| `revision_id` | `string|nil` |  |

#### Example: Load

```lua
local deep_scan_mapped_flow, err = client:DeepScanMappedFlow():load({ organization_id = "organization_id", environment_id = "environment_id" })
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


### Deployment

Create an instance: `local deployment = client:Deployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `table` |  |
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
| `history_kind` | `string` |  |
| `history_reason` | `string|nil` |  |
| `id` | `string` |  |
| `is_live` | `boolean` |  |
| `is_rollback` | `boolean` |  |
| `live_region_count` | `number` |  |
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
| `status` | `string` |  |
| `total_replicas` | `number` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local deployment, err = client:Deployment():load({ id = "deployment_id", organization_id = "organization_id" })
```


### DeploymentDashboardNomad

Create an instance: `local deployment_dashboard_nomad = client:DeploymentDashboardNomad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentDetail

Create an instance: `local deployment_detail = client:DeploymentDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `table` |  |
| `app` | `any` |  |
| `app_id` | `string|nil` |  |
| `audit_events` | `table` |  |
| `capacity` | `table` |  |
| `data_resources` | `table` |  |
| `deploy_targets` | `table` |  |
| `deployments` | `table` |  |
| `desired_states` | `table` |  |
| `environments` | `table` |  |
| `filters` | `table` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | `table` | The rolled-up state of the selected scope. |
| `nomad` | `table` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` | `table` |  |
| `placements` | `table` |  |
| `reconciler_ticks` | `table` |  |
| `releases` | `table` |  |
| `runtime_instances` | `table` |  |
| `service_bindings` | `table` |  |
| `service_views` | `table` |  |
| `storage_resources` | `table` |  |

#### Example: Load

```lua
local deployment_detail, err = client:DeploymentDetail():load({ organization_id = "organization_id" })
```


### DeploymentFile

Create an instance: `local deployment_file = client:DeploymentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DeploymentLog

Create an instance: `local deployment_log = client:DeploymentLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `app_environment_id` | `string|nil` |  |
| `app_release_id` | `string|nil` |  |
| `app_service_id` | `string|nil` |  |
| `details` | `any` |  |
| `environment_name` | `string` |  |
| `release_version` | `string|nil` |  |
| `service_name` | `string` |  |
| `status` | `string` |  |
| `task` | `string|nil` |  |
| `unreachable_reason` | `string|nil` |  |

#### Example: List

```lua
local deployment_logs, err = client:DeploymentLog():list({ organization_id = "example" })
```


### DeploymentMetric

Create an instance: `local deployment_metric = client:DeploymentMetric(nil)`

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
| `source_ref` | `string|nil` |  |

#### Example: List

```lua
local deployment_metrics, err = client:DeploymentMetric():list({ organization_id = "example" })
```


### DeploymentPreview

Create an instance: `local deployment_preview = client:DeploymentPreview(nil)`

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
| `change_number` | `number|nil` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string` |  |
| `expires_at` | `string` |  |
| `generation` | `number` |  |
| `health` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_operation_status` | `string|nil` |  |
| `name` | `string` |  |
| `owner_name` | `string|nil` |  |
| `profile_name` | `string` |  |
| `resource_overrides` | `table` | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` |  |
| `slug` | `string` |  |
| `snapshot_version` | `number` |  |
| `source_revision` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `urls` | `table` |  |
| `vcs_change_id` | `string|nil` |  |

#### Example: List

```lua
local deployment_previews, err = client:DeploymentPreview():list({ organization_id = "example" })
```


### DeploymentSetting

Create an instance: `local deployment_setting = client:DeploymentSetting(nil)`

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
local deployment_settings, err = client:DeploymentSetting():list({ organization_id = "example" })
```


### DesktopLocalAgentModel

Create an instance: `local desktop_local_agent_model = client:DesktopLocalAgentModel(nil)`

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
local desktop_local_agent_models, err = client:DesktopLocalAgentModel():list({ organization_id = "example" })
```


### DesktopLocalAgentResponse

Create an instance: `local desktop_local_agent_response = client:DesktopLocalAgentResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `table` |  |
| `max_output_tokens` | `number` |  |
| `model` | `string` |  |
| `store` | `boolean` |  |
| `stream` | `boolean` |  |

#### Example: Create

```lua
local desktop_local_agent_response, err = client:DesktopLocalAgentResponse():create({
  organization_id = "example_organization_id", -- string
  input = {}, -- table
  model = "example_model", -- string
  store = true, -- boolean
  stream = true, -- boolean
})
```


### Device

Create an instance: `local device = client:Device(nil)`

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
| `coding_connection` | `table|nil` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | `string|nil` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | `string` | Display-only native presence. |
| `control_delivery_policy` | `table` |  |
| `control_spawn_policy` | `table` |  |
| `created_at` | `string` |  |
| `device` | `table` |  |
| `environment` | `string` |  |
| `execution_available` | `boolean` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `native_device_id` | `string` |  |
| `paired_at` | `string` |  |
| `pairing_generation` | `number` |  |
| `platform` | `string` |  |
| `project_visibility` | `table` | Folder discovery and new-thread selection. |
| `provider_status` | `table` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` | `string|nil` |  |
| `scheduled_check_ins` | `boolean` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | `string` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

#### Example: Load

```lua
local device, err = client:Device():load({ id = "device_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local devices, err = client:Device():list({ organization_id = "example" })
```


### DeviceBrowserOperation

Create an instance: `local device_browser_operation = client:DeviceBrowserOperation(nil)`

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

```lua
local device_browser_operations, err = client:DeviceBrowserOperation():list({ device_id = "example", organization_id = "example" })
```


### DeviceControlMessage

Create an instance: `local device_control_message = client:DeviceControlMessage(nil)`

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
| `sender` | `string|nil` |  |
| `text` | `string|nil` |  |
| `text_omitted` | `boolean` |  |
| `thread` | `table` |  |

#### Example: List

```lua
local device_control_messages, err = client:DeviceControlMessage():list({ device_id = "example", organization_id = "example" })
```


### DeviceEnterpriseRelay

Create an instance: `local device_enterprise_relay = client:DeviceEnterpriseRelay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local device_enterprise_relay, err = client:DeviceEnterpriseRelay():load()
```


### DeviceFolderListing

Create an instance: `local device_folder_listing = client:DeviceFolderListing(nil)`

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
| `folders` | `table` |  |
| `id` | `string` |  |
| `key` | `string` | Stable idempotency key for this listing. |
| `parent` | `string|nil` |  |
| `path` | `string` | The resolved folder. |
| `state` | `string` |  |
| `truncated` | `boolean` |  |

#### Example: Load

```lua
local device_folder_listing, err = client:DeviceFolderListing():load({ id = "device_folder_listing_id", device_id = "device_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local device_folder_listing, err = client:DeviceFolderListing():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  key = "example_key", -- string
  path = "example_path", -- string
})
```


### DeviceGrant

Create an instance: `local device_grant = client:DeviceGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `agent_name` | `string|nil` |  |
| `can_edit` | `boolean` |  |
| `can_revoke` | `boolean` |  |
| `capabilities` | `table` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `principal_id` | `string` |  |
| `principal_name` | `string|nil` |  |
| `revision` | `number` |  |
| `revoked_at` | `string|nil` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local device_grants, err = client:DeviceGrant():list({ device_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local device_grant, err = client:DeviceGrant():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  agent_id = "example_agent_id", -- string
  capabilities = {}, -- table
  principal_id = "example_principal_id", -- string
})
```


### DeviceInvocation

Create an instance: `local device_invocation = client:DeviceInvocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### DeviceLocalEvent

Create an instance: `local device_local_event = client:DeviceLocalEvent(nil)`

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

```lua
local device_local_event, err = client:DeviceLocalEvent():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  event = "example_event", -- string
})
```


### DeviceOperation

Create an instance: `local device_operation = client:DeviceOperation(nil)`

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
local device_operation, err = client:DeviceOperation():load({ id = "device_operation_id", device_id = "device_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local device_operation, err = client:DeviceOperation():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  action = "example_action", -- string
  arguments = {}, -- table
  key = "example_key", -- string
})
```


### DevicePairing

Create an instance: `local device_pairing = client:DevicePairing(nil)`

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

```lua
local device_pairing, err = client:DevicePairing():create({
  organization_id = "example_organization_id", -- string
  architecture = "example_architecture", -- string
  channel = "example_channel", -- string
  name = "example_name", -- string
  platform = "example_platform", -- string
  public_key = "example_public_key", -- string
})
```


### DeviceProject

Create an instance: `local device_project = client:DeviceProject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### DeviceScheduledCheckIn

Create an instance: `local device_scheduled_check_in = client:DeviceScheduledCheckIn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` |  |

#### Example: Create

```lua
local device_scheduled_check_in, err = client:DeviceScheduledCheckIn():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  enabled = true, -- boolean
})
```


### DockerBuilder

Create an instance: `local docker_builder = client:DockerBuilder(nil)`

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
| `created_at` | `string|nil` |  |
| `gateway_url` | `string|nil` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `number` |  |
| `id` | `string` |  |
| `last_activity_at` | `string|nil` |  |
| `organization_id` | `string` |  |
| `ready_at` | `string|nil` |  |
| `slept_at` | `string|nil` |  |
| `slug` | `string` |  |
| `startup_attempt` | `number` |  |
| `startup_failure` | `string|nil` | Safe failure reason for the most recent startup attempt |
| `startup_stage` | `string|nil` |  |
| `status` | `string` |  |
| `updated_at` | `string|nil` |  |

#### Example: Load

```lua
local docker_builder, err = client:DockerBuilder():load({ id = "docker_builder_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local docker_builders, err = client:DockerBuilder():list({ organization_id = "example" })
```

#### Example: Create

```lua
local docker_builder, err = client:DockerBuilder():create({
  organization_id = "example_organization_id", -- string
})
```


### DockerBuilderSession

Create an instance: `local docker_builder_session = client:DockerBuilderSession(nil)`

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
| `gateway_url` | `string|nil` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `number` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revoked_at` | `string|nil` |  |
| `user_id` | `string` |  |

#### Example: Load

```lua
local docker_builder_session, err = client:DockerBuilderSession():load({ id = "docker_builder_session_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local docker_builder_session, err = client:DockerBuilderSession():create({
  docker_builder_id = "example_docker_builder_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### DockerBuilderSetting

Create an instance: `local docker_builder_setting = client:DockerBuilderSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idle_timeout_seconds` | `number` |  |
| `max_concurrency` | `number` |  |
| `organization_id` | `string` |  |
| `region` | `string` |  |
| `runtime_timeout_seconds` | `number` |  |

#### Example: Load

```lua
local docker_builder_setting, err = client:DockerBuilderSetting():load({ organization_id = "organization_id" })
```


### DomainDnsIntegration

Create an instance: `local domain_dns_integration = client:DomainDnsIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_label` | `string|nil` |  |
| `api_token` | `string` |  |
| `created_at` | `string` |  |
| `failure_message` | `string|nil` |  |
| `has_token` | `boolean` |  |
| `id` | `string` |  |
| `last_verified_at` | `string|nil` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local domain_dns_integrations, err = client:DomainDnsIntegration():list({ organization_id = "example" })
```

#### Example: Create

```lua
local domain_dns_integration, err = client:DomainDnsIntegration():create({
  organization_id = "example_organization_id", -- string
  api_token = "example_api_token", -- string
})
```


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


### Edge

Create an instance: `local edge = client:Edge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### EmailVerification

Create an instance: `local email_verification = client:EmailVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: Load

```lua
local environment_secret_binding, err = client:EnvironmentSecretBinding():load({ app_id = "app_id", environment_id = "environment_id" })
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


### ExecutionDesiredState

Create an instance: `local execution_desired_state = client:ExecutionDesiredState(nil)`

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
| `desired_state` | `table` |  |
| `id` | `string` |  |
| `stop_observed` | `boolean` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

#### Example: Load

```lua
local execution_desired_state, err = client:ExecutionDesiredState():load({ id = "execution_desired_state_id" })
```

#### Example: Create

```lua
local execution_desired_state, err = client:ExecutionDesiredState():create({
})
```


### ExecutionReconcilerTick

Create an instance: `local execution_reconciler_tick = client:ExecutionReconcilerTick(nil)`

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

```lua
local execution_reconciler_tick, err = client:ExecutionReconcilerTick():load({ id = "execution_reconciler_tick_id" })
```

#### Example: Create

```lua
local execution_reconciler_tick, err = client:ExecutionReconcilerTick():create({
})
```


### ExecutionRelease

Create an instance: `local execution_release = client:ExecutionRelease(nil)`

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

```lua
local execution_release, err = client:ExecutionRelease():load({ id = "execution_release_id" })
```

#### Example: Create

```lua
local execution_release, err = client:ExecutionRelease():create({
})
```


### ExecutionRuntimeInstance

Create an instance: `local execution_runtime_instance = client:ExecutionRuntimeInstance(nil)`

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
| `app_release_id` | `string|nil` |  |
| `app_service_id` | `string` |  |
| `booted_at` | `string|nil` |  |
| `booted_at_label` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `instance_key` | `string` |  |
| `last_reconciled_at` | `string|nil` |  |
| `last_reconciled_at_label` | `string|nil` |  |
| `last_seen_at` | `string|nil` |  |
| `last_seen_at_label` | `string|nil` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `network_peer_id` | `string|nil` |  |
| `nomad_allocation_id` | `string|nil` |  |
| `nomad_task_name` | `string|nil` |  |
| `organization_id` | `string` |  |
| `private_ipv4` | `string|nil` |  |
| `private_ipv6` | `string|nil` |  |
| `provider_instance_id` | `string|nil` |  |
| `public_endpoint` | `string|nil` |  |
| `service_name` | `string` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `terminated_at` | `string|nil` |  |
| `terminated_at_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local execution_runtime_instance, err = client:ExecutionRuntimeInstance():load({ id = "execution_runtime_instance_id" })
```

#### Example: List

```lua
local execution_runtime_instances, err = client:ExecutionRuntimeInstance():list()
```

#### Example: Create

```lua
local execution_runtime_instance, err = client:ExecutionRuntimeInstance():create({
})
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
| `agent_filters` | `table` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `table` |  |
| `can_continue` | `boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `table` |  |
| `check_count` | `number` |  |
| `concurrency` | `number` |  |
| `covered_areas` | `table` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `credential_name` | `string|nil` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | `string` | When the team's time limit ends. |
| `demo_project` | `table|nil` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` | `number|nil` |  |
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
| `persona_id` | `string|nil` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `table` |  |
| `project_id` | `string|nil` | Set when the exploration targets a project environment. |
| `related_explorations` | `table` |  |
| `report` | `table` |  |
| `reproduction_of` | `table|nil` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `table` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `table` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | `number` | Scenarios saved from this discovery. |
| `scenario_generation` | `table` |  |
| `scenarios_pending` | `boolean` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | `boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string|nil` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` | `string` |  |
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


### Gh

Create an instance: `local gh = client:Gh(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `table` |  |
| `content` | `table` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `table|nil` |  |
| `pull_request` | `any` |  |
| `stack` | `table` |  |
| `transcript_paths` | `table` |  |

#### Example: Load

```lua
local gh, err = client:Gh():load({ id = "gh_id", gh_id = "gh_id", github_repo = "github_repo", organization_id = "organization_id" })
```


### GitImport

Create an instance: `local git_import = client:GitImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destination_mode` | `string` |  |
| `error` | `string|nil` |  |
| `git_default_branch` | `string` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` | `string` |  |
| `git_url` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `name` | `string` |  |
| `native_status` | `string` |  |
| `organization` | `string` |  |
| `repository_id` | `string|nil` |  |
| `root_path` | `string` |  |
| `slug` | `string` |  |
| `source_branch` | `string` |  |
| `target_branch` | `string` |  |

#### Example: Load

```lua
local git_import, err = client:GitImport():load({ id = "git_import_id" })
```

#### Example: Create

```lua
local git_import, err = client:GitImport():create({
  organization_id = "example_organization_id", -- string
  destination_mode = "example_destination_mode", -- string
  idempotency_key = "example_idempotency_key", -- string
  root_path = "example_root_path", -- string
  slug = "example_slug", -- string
  source_branch = "example_source_branch", -- string
})
```


### Github

Create an instance: `local github = client:Github(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GithubApp

Create an instance: `local github_app = client:GithubApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### GithubAppImportableRepository

Create an instance: `local github_app_importable_repository = client:GithubAppImportableRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `next_page` | `number|nil` | Next GitHub page for this installation |
| `repositories` | `table` |  |

#### Example: List

```lua
local github_app_importable_repositorys, err = client:GithubAppImportableRepository():list()
```


### GithubAppInstallation

Create an instance: `local github_app_installation = client:GithubAppInstallation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string|nil` |  |
| `account_id` | `string|nil` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string|nil` |  |
| `installed_at_label` | `string|nil` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `table` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `table` |  |
| `status` | `string` |  |
| `suspended_at` | `string|nil` |  |
| `suspended_at_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local github_app_installations, err = client:GithubAppInstallation():list({ organization_id = "example" })
```


### GithubAppInstallationAuthorization

Create an instance: `local github_app_installation_authorization = client:GithubAppInstallationAuthorization(nil)`

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

```lua
local github_app_installation_authorization, err = client:GithubAppInstallationAuthorization():create({
  organization_slug = "example_organization_slug", -- string
  return_target = "example_return_target", -- string
})
```


### GithubAppUserAuthorization

Create an instance: `local github_app_user_authorization = client:GithubAppUserAuthorization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local github_app_user_authorization, err = client:GithubAppUserAuthorization():create({
})
```


### GithubCiRepository

Create an instance: `local github_ci_repository = client:GithubCiRepository(nil)`

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
| `ci_runner_pool_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `default_branch` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `id` | `string` |  |
| `last_compatibility_status` | `string|nil` |  |
| `last_error_message` | `string|nil` |  |
| `last_head_sha` | `string|nil` |  |
| `last_pull_request_number` | `number|nil` |  |
| `last_ref` | `string|nil` |  |
| `last_webhook_action` | `string|nil` |  |
| `last_webhook_at` | `string|nil` |  |
| `last_webhook_at_label` | `string|nil` |  |
| `last_webhook_delivery_id` | `string|nil` |  |
| `last_webhook_event` | `string|nil` |  |
| `metadata` | `table` |  |
| `organization_id` | `string` |  |
| `permission_status` | `string` |  |
| `repository_full_name` | `string` |  |
| `repository_name` | `string` |  |
| `repository_owner` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `webhook_delivery_count` | `number` |  |

#### Example: Load

```lua
local github_ci_repository, err = client:GithubCiRepository():load({ id = "github_ci_repository_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local github_ci_repositorys, err = client:GithubCiRepository():list({ organization_id = "example" })
```

#### Example: Create

```lua
local github_ci_repository, err = client:GithubCiRepository():create({
  organization_id = "example_organization_id", -- string
  github_app_installation_id = "example_github_app_installation_id", -- string
  github_repository_id = "example_github_repository_id", -- string
  repository_name = "example_repository_name", -- string
  repository_owner = "example_repository_owner", -- string
})
```


### GithubCiRepositoryCompatibilityReport

Create an instance: `local github_ci_repository_compatibility_report = client:GithubCiRepositoryCompatibilityReport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `string` |  |
| `analyzed_at_label` | `string|nil` |  |
| `ci_pipeline_id` | `string|nil` |  |
| `ci_pipeline_run_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `diagnostics` | `table` |  |
| `errors` | `table` |  |
| `event_action` | `string|nil` |  |
| `event_name` | `string` |  |
| `execution_allowed` | `boolean` |  |
| `github_ci_repository_id` | `string` |  |
| `head_sha` | `string|nil` |  |
| `id` | `string` |  |
| `metadata` | `table` |  |
| `organization_id` | `string` |  |
| `parser_version` | `string` |  |
| `pull_request_number` | `number|nil` |  |
| `ref_name` | `string|nil` |  |
| `referenced_actions` | `table` |  |
| `required_secrets` | `table` |  |
| `runner_labels` | `table` |  |
| `source_blob_sha` | `string|nil` |  |
| `source_sha` | `string` |  |
| `status` | `string` |  |
| `supported_features` | `table` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `warnings` | `table` |  |
| `workflow_name` | `string|nil` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```lua
local github_ci_repository_compatibility_report, err = client:GithubCiRepositoryCompatibilityReport():load({ id = "github_ci_repository_compatibility_report_id", github_ci_repository_id = "github_ci_repository_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local github_ci_repository_compatibility_reports, err = client:GithubCiRepositoryCompatibilityReport():list({ github_ci_repository_id = "example", organization_id = "example" })
```


### GithubConnection

Create an instance: `local github_connection = client:GithubConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `table` |  |
| `github_app_installation_id` | `string` |  |
| `installations` | `table` |  |
| `project_id` | `string` | Project slug or public ID the repositories are added to. |
| `replace` | `boolean` | Make these the project's only repositories. |
| `repositories` | `table` |  |

#### Example: Load

```lua
local github_connection, err = client:GithubConnection():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local github_connection, err = client:GithubConnection():create({
  organization_id = "example_organization_id", -- string
  github_app_installation_id = "example_github_app_installation_id", -- string
  repositories = {}, -- table
})
```


### GithubOnboarding

Create an instance: `local github_onboarding = client:GithubOnboarding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `table` |  |
| `active_batch_id` | `string|nil` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` | `table` |  |
| `capabilities` | `table` |  |
| `installations` | `table` |  |

#### Example: Load

```lua
local github_onboarding, err = client:GithubOnboarding():load({ organization_id = "organization_id" })
```


### GithubOnboardingBranch

Create an instance: `local github_onboarding_branch = client:GithubOnboardingBranch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `table` |  |

#### Example: List

```lua
local github_onboarding_branchs, err = client:GithubOnboardingBranch():list({ organization_id = "example", github_app_installation_id = "example", name = "example", owner = "example" })
```


### GithubOnboardingImport

Create an instance: `local github_onboarding_import = client:GithubOnboardingImport(nil)`

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
| `items` | `table` |  |
| `repositories` | `any` |  |
| `status` | `string` |  |
| `terminal_item_count` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Create

```lua
local github_onboarding_import, err = client:GithubOnboardingImport():create({
  organization_id = "example_organization_id", -- string
  github_app_installation_id = "example_github_app_installation_id", -- string
  repositories = "example_repositories", -- any
})
```


### GithubOnboardingImportBatch

Create an instance: `local github_onboarding_import_batch = client:GithubOnboardingImportBatch(nil)`

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
| `items` | `table` |  |
| `status` | `string` |  |
| `terminal_item_count` | `number` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local github_onboarding_import_batch, err = client:GithubOnboardingImportBatch():load({ id = "github_onboarding_import_batch_id", organization_id = "organization_id" })
```


### GithubOnboardingImportItem

Create an instance: `local github_onboarding_import_item = client:GithubOnboardingImportItem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GithubPullRequest

Create an instance: `local github_pull_request = client:GithubPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `table` |  |
| `content` | `table` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `table|nil` |  |
| `pull_request` | `any` |  |
| `stack` | `table` |  |
| `transcript_paths` | `table` |  |

#### Example: Load

```lua
local github_pull_request, err = client:GithubPullRequest():load({ id = "github_pull_request_id", organization_id = "organization_id", pull_request_id = "pull_request_id" })
```


### GithubRunnerAdmission

Create an instance: `local github_runner_admission = client:GithubRunnerAdmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local github_runner_admission, err = client:GithubRunnerAdmission():create({
})
```


### GithubRunnerCache

Create an instance: `local github_runner_cache = client:GithubRunnerCache(nil)`

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
| `restore_keys` | `table` |  |
| `signed_download_url` | `string` |  |
| `size_bytes` | `string` |  |
| `upload_path` | `string` |  |
| `version` | `string` |  |

#### Example: Create

```lua
local github_runner_cache, err = client:GithubRunnerCache():create({
  operation = "example_operation", -- string
})
```


### GithubRunnerEgress

Create an instance: `local github_runner_egress = client:GithubRunnerEgress(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_request` | `boolean` |  |
| `cidr` | `string|nil` |  |
| `ipv4` | `string|nil` |  |
| `requested_at_label` | `string|nil` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local github_runner_egress, err = client:GithubRunnerEgress():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local github_runner_egress, err = client:GithubRunnerEgress():create({
  organization_id = "example_organization_id", -- string
})
```


### GithubRunnerHistory

Create an instance: `local github_runner_history = client:GithubRunnerHistory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `table` |  |
| `counts` | `table` |  |
| `observed_at` | `string` |  |
| `pagination` | `table` |  |
| `repositories` | `table` |  |
| `runs` | `table` |  |
| `setup` | `any` | CI onboarding. |
| `success_rate` | `number|nil` |  |
| `usage` | `table` |  |

#### Example: Load

```lua
local github_runner_history, err = client:GithubRunnerHistory():load({ organization_id = "organization_id" })
```


### GithubRunnerImage

Create an instance: `local github_runner_image = client:GithubRunnerImage(nil)`

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
| `last_error` | `string|nil` |  |
| `modal_image_id` | `string|nil` |  |
| `name` | `string` |  |
| `registry_secret_name` | `string|nil` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local github_runner_image, err = client:GithubRunnerImage():load({ id = "github_runner_image_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local github_runner_images, err = client:GithubRunnerImage():list({ organization_id = "example" })
```

#### Example: Create

```lua
local github_runner_image, err = client:GithubRunnerImage():create({
  organization_id = "example_organization_id", -- string
  image_reference = "example_image_reference", -- string
  name = "example_name", -- string
})
```


### GithubRunnerPool

Create an instance: `local github_runner_pool = client:GithubRunnerPool(nil)`

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
| `image` | `string|nil` | Organization image name or ID; null restores the standard image |
| `invocations` | `table` |  |
| `label` | `string` |  |
| `last_error` | `string|nil` |  |
| `last_polled_at` | `string|nil` |  |
| `max_concurrency` | `number` |  |
| `memory_mb` | `number` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `repository_full_name` | `string` |  |
| `runtime_kind` | `string` |  |
| `timeout_seconds` | `number` |  |

#### Example: List

```lua
local github_runner_pools, err = client:GithubRunnerPool():list({ organization_id = "example" })
```

#### Example: Create

```lua
local github_runner_pool, err = client:GithubRunnerPool():create({
  organization_id = "example_organization_id", -- string
  github_app_installation_id = "example_github_app_installation_id", -- string
  repository_full_name = "example_repository_full_name", -- string
})
```


### GithubRunnerSetup

Create an instance: `local github_runner_setup = client:GithubRunnerSetup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string|nil` |  |
| `github_repository_connection_id` | `string` |  |
| `id` | `string` |  |
| `pull_request_url` | `string|nil` |  |
| `repository_full_name` | `string` |  |
| `roder_thread_id` | `string|nil` |  |
| `runner_labels` | `table` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `summary` | `string|nil` |  |

#### Example: Load

```lua
local github_runner_setup, err = client:GithubRunnerSetup():load({ id = "github_runner_setup_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local github_runner_setup, err = client:GithubRunnerSetup():create({
  organization_id = "example_organization_id", -- string
  github_repository_connection_id = "example_github_repository_connection_id", -- string
})
```


### Gitlab

Create an instance: `local gitlab = client:Gitlab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `boolean` |  |
| `connections` | `table` |  |
| `integrations` | `table` |  |
| `inventory_error` | `string|nil` |  |
| `next_page` | `number|nil` |  |
| `organization` | `table` |  |
| `projects` | `table` |  |
| `redirect_uri` | `string|nil` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` | `string|nil` |  |

#### Example: Load

```lua
local gitlab, err = client:Gitlab():load({ organization_id = "organization_id" })
```


### GitlabConnection

Create an instance: `local gitlab_connection = client:GitlabConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GitlabImport

Create an instance: `local gitlab_import = client:GitlabImport(nil)`

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

```lua
local gitlab_import, err = client:GitlabImport():create({
  organization_id = "example_organization_id", -- string
  integration_id = "example_integration_id", -- string
  project_id = 1, -- number
})
```


### GitlabOauth

Create an instance: `local gitlab_oauth = client:GitlabOauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GrantAllAgent

Create an instance: `local grant_all_agent = client:GrantAllAgent(nil)`

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

```lua
local grant_all_agent, err = client:GrantAllAgent():create({
  device_id = "example_device_id", -- string
  organization_id = "example_organization_id", -- string
  enabled = true, -- boolean
})
```


### HostingAppDomain

Create an instance: `local hosting_app_domain = client:HostingAppDomain(nil)`

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

#### Example: Create

```lua
local hosting_app_domain, err = client:HostingAppDomain():create({
  app_id = "example_app_id", -- string
  app_service_id = "example_app_service_id", -- string|nil
  hostname = "example_hostname", -- string
  kind = "example_kind", -- string
})
```


### IdentityOrganization

Create an instance: `local identity_organization = client:IdentityOrganization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### ImageRepositoryTag

Create an instance: `local image_repository_tag = client:ImageRepositoryTag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image_repository` | `table` |  |
| `name` | `string` |  |
| `registry_url` | `string` |  |
| `tags` | `table` |  |

#### Example: List

```lua
local image_repository_tags, err = client:ImageRepositoryTag():list({ image_repository_id = "example" })
```


### ImportBranchPolicy

Create an instance: `local import_branch_policy = client:ImportBranchPolicy(nil)`

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
| `dedicated_outbound_ip_addresses` | `table` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `table` |  |
| `sandbox_regions` | `table` |  |

#### Example: Load

```lua
local import_branch_policy, err = client:ImportBranchPolicy():load({ organization_id = "organization_id" })
```


### Integration

Create an instance: `local integration = client:Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `table` |  |
| `gitlab` | `table` |  |
| `permissions` | `table` |  |
| `slack` | `table` |  |

#### Example: Load

```lua
local integration, err = client:Integration():load({ organization_id = "organization_id" })
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


### InvocationControl

Create an instance: `local invocation_control = client:InvocationControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### JobLogChunk

Create an instance: `local job_log_chunk = client:JobLogChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `number` |  |
| `ci_job_id` | `string|nil` |  |
| `ci_pipeline_run_id` | `string|nil` |  |
| `ci_step_id` | `string|nil` |  |
| `content` | `string` |  |
| `content_format` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `sequence_number` | `number` |  |
| `stream` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```lua
local job_log_chunks, err = client:JobLogChunk():list({ job_id = "example", pipeline_id = "example", run_id = "example" })
```

#### Example: Create

```lua
local job_log_chunk, err = client:JobLogChunk():create({
  job_id = "example_job_id", -- string
  pipeline_id = "example_pipeline_id", -- string
  run_id = "example_run_id", -- string
})
```


### JobStep

Create an instance: `local job_step = client:JobStep(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local job_step, err = client:JobStep():load({ job_id = "job_id", pipeline_id = "pipeline_id", run_id = "run_id" })
```

#### Example: Create

```lua
local job_step, err = client:JobStep():create({
  job_id = "example_job_id", -- string
  pipeline_id = "example_pipeline_id", -- string
  run_id = "example_run_id", -- string
})
```


### JobWorkspace

Create an instance: `local job_workspace = client:JobWorkspace(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local job_workspace, err = client:JobWorkspace():load({ job_id = "job_id", pipeline_id = "pipeline_id", run_id = "run_id" })
```

#### Example: Create

```lua
local job_workspace, err = client:JobWorkspace():create({
  job_id = "example_job_id", -- string
  pipeline_id = "example_pipeline_id", -- string
  run_id = "example_run_id", -- string
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


### Known

Create an instance: `local known = client:Known(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Label

Create an instance: `local label = client:Label(nil)`

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

```lua
local labels, err = client:Label():list({ organization_id = "example" })
```


### LeaseArtifact

Create an instance: `local lease_artifact = client:LeaseArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local lease_artifact, err = client:LeaseArtifact():create({
  lease_id = "example_lease_id", -- string
  node_id = "example_node_id", -- string
})
```


### LeaseCache

Create an instance: `local lease_cache = client:LeaseCache(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### LeaseLogChunk

Create an instance: `local lease_log_chunk = client:LeaseLogChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local lease_log_chunk, err = client:LeaseLogChunk():create({
  lease_id = "example_lease_id", -- string
  node_id = "example_node_id", -- string
})
```


### LeaseReconciliation

Create an instance: `local lease_reconciliation = client:LeaseReconciliation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseStep

Create an instance: `local lease_step = client:LeaseStep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseVerifyDiagnostic

Create an instance: `local lease_verify_diagnostic = client:LeaseVerifyDiagnostic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_events` | `table` |  |
| `live_browser` | `table` |  |
| `live_view` | `table` | The tester's read-only live stream for page viewers. |
| `steps` | `table` |  |

#### Example: Create

```lua
local lease_verify_diagnostic, err = client:LeaseVerifyDiagnostic():create({
  lease_id = "example_lease_id", -- string
  swarm_id = "example_swarm_id", -- string
  task_id = "example_task_id", -- string
  browser_events = {}, -- table
})
```


### LeaseVerifySecret

Create an instance: `local lease_verify_secret = client:LeaseVerifySecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local lease_verify_secret, err = client:LeaseVerifySecret():create({
  lease_id = "example_lease_id", -- string
  swarm_id = "example_swarm_id", -- string
  task_id = "example_task_id", -- string
})
```


### LeaseWorkspace

Create an instance: `local lease_workspace = client:LeaseWorkspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LocalAgentDecision

Create an instance: `local local_agent_decision = client:LocalAgentDecision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request` | `table` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

#### Example: Create

```lua
local local_agent_decision, err = client:LocalAgentDecision():create({
  organization_id = "example_organization_id", -- string
  request = {}, -- table
})
```


### LocalAgentResponse

Create an instance: `local local_agent_response = client:LocalAgentResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `table` |  |
| `model` | `string` |  |
| `service_tier` | `string|nil` |  |
| `store` | `boolean` |  |
| `stream` | `boolean` |  |
| `tools` | `table` |  |

#### Example: Create

```lua
local local_agent_response, err = client:LocalAgentResponse():create({
  organization_id = "example_organization_id", -- string
  input = {}, -- table
  model = "example_model", -- string
  store = true, -- boolean
  stream = true, -- boolean
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


### LogStreamChunk

Create an instance: `local log_stream_chunk = client:LogStreamChunk(nil)`

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

```lua
local log_stream_chunk, err = client:LogStreamChunk():load({ id = "log_stream_chunk_id", log_stream_id = "log_stream_id", space_id = "space_id" })
```

#### Example: Create

```lua
local log_stream_chunk, err = client:LogStreamChunk():create({
  log_stream_id = "example_log_stream_id", -- string
  space_id = "example_space_id", -- string
})
```


### LogoImage

Create an instance: `local logo_image = client:LogoImage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
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


### MarketingSetting

Create an instance: `local marketing_setting = client:MarketingSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `call_first` | `boolean` |  |

#### Example: Load

```lua
local marketing_setting, err = client:MarketingSetting():load()
```


### McpOauth

Create an instance: `local mcp_oauth = client:McpOauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `is_self` | `boolean` |  |
| `role` | `string` |  |
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


### MergeQueueEntry

Create an instance: `local merge_queue_entry = client:MergeQueueEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `table` | Queue performance for the reporting window. |
| `change_id` | `string|nil` |  |
| `expected_target_commit_id` | `string|nil` |  |
| `expected_target_version` | `number|nil` |  |
| `expected_version` | `number` |  |
| `github_pr_number` | `number|nil` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `kind` | `string` |  |
| `policy` | `table` |  |
| `priority` | `string` |  |
| `queue` | `table` |  |
| `target_branches` | `table` | Bookmark names for the target picker. |
| `when_ready` | `boolean|nil` |  |

#### Example: Create

```lua
local merge_queue_entry, err = client:MergeQueueEntry():create({
  merge_queue_id = "example_merge_queue_id", -- string
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  expected_version = 1, -- number
  idempotency_key = "example_idempotency_key", -- string
  kind = "example_kind", -- string
})
```


### MergeResolution

Create an instance: `local merge_resolution = client:MergeResolution(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `base` | `string` | Common ancestor file contents |
| `content` | `string|nil` |  |
| `context` | `table` | Optional surrounding files keyed by path |
| `duration_ms` | `number` |  |
| `fallback` | `boolean` |  |
| `model` | `string` |  |
| `ours` | `string` | Current / left file contents |
| `path` | `string` | Repository-relative path of the conflicted file |
| `resolved` | `boolean` |  |
| `theirs` | `string` | Incoming / right file contents |

#### Example: Create

```lua
local merge_resolution, err = client:MergeResolution():create({
  base = "example_base", -- string
  ours = "example_ours", -- string
  theirs = "example_theirs", -- string
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local metric_query, err = client:MetricQuery():load()
```


### MetronomeWebhook

Create an instance: `local metronome_webhook = client:MetronomeWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local metronome_webhook, err = client:MetronomeWebhook():create({
})
```


### ModelSubscriptionAccount

Create an instance: `local model_subscription_account = client:ModelSubscriptionAccount(nil)`

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
| `accounts` | `table` |  |
| `agents` | `table` |  |
| `can_disconnect` | `boolean` |  |
| `connection_agent` | `table|nil` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `provider` | `string` |  |
| `saved` | `boolean` |  |
| `status` | `string` |  |
| `usable` | `boolean` |  |

#### Example: List

```lua
local model_subscription_accounts, err = client:ModelSubscriptionAccount():list()
```

#### Example: Create

```lua
local model_subscription_account, err = client:ModelSubscriptionAccount():create({
  label = "example_label", -- string
})
```


### ModelSubscriptionAccountConnection

Create an instance: `local model_subscription_account_connection = client:ModelSubscriptionAccountConnection(nil)`

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

```lua
local model_subscription_account_connection, err = client:ModelSubscriptionAccountConnection():load({ id = "model_subscription_account_connection_id" })
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


### NetworkingSpace

Create an instance: `local networking_space = client:NetworkingSpace(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local networking_space, err = client:NetworkingSpace():load({ id = "networking_space_id" })
```

#### Example: Create

```lua
local networking_space, err = client:NetworkingSpace():create({
})
```


### Node

Create an instance: `local node = client:Node(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string|nil` |  |
| `account_id` | `string|nil` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string|nil` |  |
| `installed_at_label` | `string|nil` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `table` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `table` |  |
| `status` | `string` |  |
| `suspended_at` | `string|nil` |  |
| `suspended_at_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local nodes, err = client:Node():list({ organization_id = "example" })
```


### NodeCertificate

Create an instance: `local node_certificate = client:NodeCertificate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### NodeLease

Create an instance: `local node_lease = client:NodeLease(nil)`

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

```lua
local node_lease, err = client:NodeLease():load({ node_id = "node_id" })
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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local nomad_log, err = client:NomadLog():load({ app_id = "app_id" })
```


### Now

Create an instance: `local now = client:Now(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `needs_attention` | `table` |  |
| `pagination` | `table` |  |
| `recently_landed` | `table` |  |
| `shipping_now` | `table` |  |
| `summary` | `table` |  |

#### Example: Load

```lua
local now, err = client:Now():load({ organization_id = "organization_id" })
```


### ObservabilityClickhouseCluster

Create an instance: `local observability_clickhouse_cluster = client:ObservabilityClickhouseCluster(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local observability_clickhouse_cluster, err = client:ObservabilityClickhouseCluster():load({ id = "observability_clickhouse_cluster_id" })
```

#### Example: Create

```lua
local observability_clickhouse_cluster, err = client:ObservabilityClickhouseCluster():create({
})
```


### ObservabilityQuickwitCluster

Create an instance: `local observability_quickwit_cluster = client:ObservabilityQuickwitCluster(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local observability_quickwit_cluster, err = client:ObservabilityQuickwitCluster():load({ id = "observability_quickwit_cluster_id" })
```

#### Example: Create

```lua
local observability_quickwit_cluster, err = client:ObservabilityQuickwitCluster():create({
})
```


### ObservabilitySpace

Create an instance: `local observability_space = client:ObservabilitySpace(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local observability_space, err = client:ObservabilitySpace():load({ id = "observability_space_id" })
```

#### Example: Create

```lua
local observability_space, err = client:ObservabilitySpace():create({
})
```


### Openapi

Create an instance: `local openapi = client:Openapi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local openapi, err = client:Openapi():load()
```


### OrgInvitation

Create an instance: `local org_invitation = client:OrgInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `table` |  |
| `registration_options` | `any` |  |
| `requires_password_setup` | `boolean` |  |
| `start_guided_setup` | `boolean` |  |

#### Example: Load

```lua
local org_invitation, err = client:OrgInvitation():load({ id = "org_invitation_id" })
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


### OrganizationApp

Create an instance: `local organization_app = client:OrganizationApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local organization_app, err = client:OrganizationApp():load({ organization_id = "organization_id", native_agent_id = "native_agent_id" })
```


### OrganizationControl

Create an instance: `local organization_control = client:OrganizationControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationDevice

Create an instance: `local organization_device = client:OrganizationDevice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### OrganizationIdentityCertificate

Create an instance: `local organization_identity_certificate = client:OrganizationIdentityCertificate(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local organization_identity_certificate, err = client:OrganizationIdentityCertificate():load({ id = "organization_identity_certificate_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local organization_identity_certificate, err = client:OrganizationIdentityCertificate():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationInteraction

Create an instance: `local organization_interaction = client:OrganizationInteraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local organization_interaction, err = client:OrganizationInteraction():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationInvitation

Create an instance: `local organization_invitation = client:OrganizationInvitation(nil)`

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

```lua
local organization_invitation, err = client:OrganizationInvitation():create({
  organization_id = "example_organization_id", -- string
  email = "example_email", -- string
  role = "example_role", -- string
})
```


### OrganizationMessageFile

Create an instance: `local organization_message_file = client:OrganizationMessageFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local organization_message_file, err = client:OrganizationMessageFile():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationOidcTrust

Create an instance: `local organization_oidc_trust = client:OrganizationOidcTrust(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local organization_oidc_trust, err = client:OrganizationOidcTrust():load({ id = "organization_oidc_trust_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local organization_oidc_trust, err = client:OrganizationOidcTrust():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationRunEvent

Create an instance: `local organization_run_event = client:OrganizationRunEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local organization_run_event, err = client:OrganizationRunEvent():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationRunOutcome

Create an instance: `local organization_run_outcome = client:OrganizationRunOutcome(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local organization_run_outcome, err = client:OrganizationRunOutcome():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationRunUsage

Create an instance: `local organization_run_usage = client:OrganizationRunUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local organization_run_usage, err = client:OrganizationRunUsage():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationSandbox

Create an instance: `local organization_sandbox = client:OrganizationSandbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationSecret

Create an instance: `local organization_secret = client:OrganizationSecret(nil)`

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
| `created_at_label` | `string|nil` |  |
| `created_by` | `table|nil` |  |
| `current_version` | `table|nil` |  |
| `description` | `string|nil` |  |
| `env_key` | `string` |  |
| `expose_to_build` | `boolean` |  |
| `expose_to_ci` | `boolean` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` |  |
| `last_accessed_at` | `string|nil` |  |
| `last_accessed_at_label` | `string|nil` |  |
| `last_accessed_by` | `table|nil` |  |
| `latest_version_number` | `number|nil` |  |
| `name` | `string` |  |
| `organization_id` | `string|nil` |  |
| `owner_service_account_id` | `string|nil` |  |
| `rotation_policy` | `string|nil` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: Load

```lua
local organization_secret, err = client:OrganizationSecret():load({ id = "organization_secret_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local organization_secrets, err = client:OrganizationSecret():list({ organization_id = "example" })
```

#### Example: Create

```lua
local organization_secret, err = client:OrganizationSecret():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationServiceAccount

Create an instance: `local organization_service_account = client:OrganizationServiceAccount(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local organization_service_account, err = client:OrganizationServiceAccount():load({ id = "organization_service_account_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local organization_service_account, err = client:OrganizationServiceAccount():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationSetting

Create an instance: `local organization_setting = client:OrganizationSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `concurrent_run_limit_override` | `number|nil` |  |
| `customize_onboarding_packages` | `boolean` |  |
| `daily_run_limit_override` | `number|nil` |  |
| `deployment_usage_visibility` | `string` |  |
| `monthly_browser_minutes_limit_override` | `number|nil` |  |
| `monthly_budget_dollars` | `string|number|nil` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `boolean` |  |
| `onboarding_package_keys` | `table` |  |


### OrganizationSite

Create an instance: `local organization_site = client:OrganizationSite(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local organization_site, err = client:OrganizationSite():load({ organization_id = "organization_id", native_agent_id = "native_agent_id" })
```

#### Example: Create

```lua
local organization_site, err = client:OrganizationSite():create({
  organization_id = "example_organization_id", -- string
})
```


### OrganizationSubscription

Create an instance: `local organization_subscription = client:OrganizationSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationTool

Create an instance: `local organization_tool = client:OrganizationTool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `table` |  |
| `native_agent_id` | `string` |  |
| `tool` | `string` |  |

#### Example: Create

```lua
local organization_tool, err = client:OrganizationTool():create({
  organization_id = "example_organization_id", -- string
  arguments = {}, -- table
  native_agent_id = "example_native_agent_id", -- string
  tool = "example_tool", -- string
})
```


### OrganizationWorkloadIdentity

Create an instance: `local organization_workload_identity = client:OrganizationWorkloadIdentity(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local organization_workload_identity, err = client:OrganizationWorkloadIdentity():load({ id = "organization_workload_identity_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local organization_workload_identity, err = client:OrganizationWorkloadIdentity():create({
  organization_id = "example_organization_id", -- string
})
```


### OtelIngest

Create an instance: `local otel_ingest = client:OtelIngest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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

#### Example: Load

```lua
local page_agent, err = client:PageAgent():load({ organization_id = "organization_id" })
```


### PageArtefact

Create an instance: `local page_artefact = client:PageArtefact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artefact` | `any` |  |
| `automation` | `table|nil` |  |
| `automation_invocation_id` | `string|nil` |  |
| `byte_size` | `number` |  |
| `checksum_sha256` | `string` |  |
| `comment_threads` | `table` |  |
| `content_type` | `string` |  |
| `created_at` | `string|nil` |  |
| `created_by_user_id` | `string|nil` |  |
| `description` | `string|nil` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `draft` | `table|nil` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` | `string` |  |
| `expires_at` | `string|nil` |  |
| `filename` | `string` |  |
| `files` | `table` |  |
| `harness` | `string|nil` |  |
| `harness_version` | `string|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `kinds` | `table` |  |
| `model` | `string|nil` |  |
| `organization` | `table` |  |
| `organization_id` | `string` |  |
| `pagination` | `table` |  |
| `permissions` | `table` |  |
| `preview` | `table` |  |
| `published_at` | `string|nil` |  |
| `published_at_label` | `string|nil` |  |
| `publisher` | `table|nil` |  |
| `repository` | `table|nil` |  |
| `repository_id` | `string|nil` |  |
| `selected_path` | `string` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `string|nil` |  |
| `vcs_agent_session_id` | `string|nil` |  |
| `version` | `number` |  |
| `versions` | `table` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```lua
local page_artefact, err = client:PageArtefact():load({ id = "page_artefact_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local page_artefacts, err = client:PageArtefact():list({ organization_id = "example" })
```


### PageCiPipelineRun

Create an instance: `local page_ci_pipeline_run = client:PageCiPipelineRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string|nil` |  |
| `id` | `string` |  |
| `jobs` | `table` |  |

#### Example: Load

```lua
local page_ci_pipeline_run, err = client:PageCiPipelineRun():load({ id = "page_ci_pipeline_run_id", pipeline_id = "pipeline_id" })
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


### PageRepoVcCommit

Create an instance: `local page_repo_vc_commit = client:PageRepoVcCommit(nil)`

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

```lua
local page_repo_vc_commit, err = client:PageRepoVcCommit():load({ id = "page_repo_vc_commit_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### PagesBilling

Create an instance: `local pages_billing = client:PagesBilling(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `table` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `boolean` |  |
| `can_manage_extra_spend` | `boolean` |  |
| `can_manage_local_subscription` | `boolean` |  |
| `can_manage_payment_method` | `boolean` |  |
| `can_set_up_billing` | `boolean` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `boolean` |  |
| `entitlements` | `table` |  |
| `extra_spend_enabled` | `boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `table` |  |
| `stripe` | `table` |  |
| `subscription` | `any` |  |
| `token_account` | `table` |  |

#### Example: Load

```lua
local pages_billing, err = client:PagesBilling():load({ organization_id = "organization_id" })
```


### PagesGithubIntegration

Create an instance: `local pages_github_integration = client:PagesGithubIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string|nil` |  |
| `account_login` | `string` |  |
| `connection_status` | `string` |  |
| `connection_status_label` | `string` |  |
| `github_installation` | `any` |  |
| `health` | `table` |  |
| `id` | `string` |  |
| `imported_repositories_count` | `number` |  |
| `imported_repositories_count_label` | `string` |  |
| `organization` | `table` |  |
| `pagination` | `table` |  |
| `repositories` | `table` |  |

#### Example: Load

```lua
local pages_github_integration, err = client:PagesGithubIntegration():load({ id = "pages_github_integration_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local pages_github_integrations, err = client:PagesGithubIntegration():list({ organization_id = "example" })
```


### PagesGithubOnboarding

Create an instance: `local pages_github_onboarding = client:PagesGithubOnboarding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `onboarding` | `table` |  |
| `organization` | `table` |  |

#### Example: Load

```lua
local pages_github_onboarding, err = client:PagesGithubOnboarding():load({ organization_id = "organization_id" })
```


### PagesMember

Create an instance: `local pages_member = client:PagesMember(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
local pages_members, err = client:PagesMember():list({ organization_id = "example" })
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
| `access_mode` | `string` |  |
| `active_run_count` | `number` |  |
| `archived_at` | `string|nil` |  |
| `attention` | `table` | What needs an operator's eye, problems before notices |
| `capabilities` | `string|nil` |  |
| `created_at` | `string` |  |
| `credential` | `any` |  |
| `credential_id` | `string|nil` | The credential this persona signs in with. |
| `goals` | `string|nil` |  |
| `health` | `table` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `scenario_count` | `number` |  |
| `updated_at` | `string` |  |

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
| `archived_at` | `string|nil` |  |
| `browser_seconds` | `number|nil` |  |
| `can_archive` | `boolean` |  |
| `can_restore` | `boolean` |  |
| `cleanup_state` | `string` |  |
| `commit_sha` | `string|nil` |  |
| `created_at` | `string` |  |
| `duration_seconds` | `number|nil` |  |
| `environment_name` | `string|nil` |  |
| `finished_at` | `string|nil` |  |
| `id` | `string` |  |
| `outcome` | `string|nil` |  |
| `pull_request` | `any` |  |
| `pull_request_label` | `string|nil` |  |
| `scenario_count` | `number` |  |
| `source_run` | `table|nil` |  |
| `started_at` | `string|nil` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `trigger_kind` | `string` |  |
| `triggered_by` | `string|nil` |  |
| `web_path` | `string` |  |

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


### PagesRegistry

Create an instance: `local pages_registry = client:PagesRegistry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_repository_count` | `number` |  |
| `error` | `string|nil` |  |
| `pagination` | `table` |  |
| `repositories` | `table` |  |
| `repository_count` | `number` |  |

#### Example: Load

```lua
local pages_registry, err = client:PagesRegistry():load({ organization_id = "organization_id" })
```


### PagesSession

Create an instance: `local pages_session = client:PagesSession(nil)`

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
| `created_at` | `string|nil` |  |
| `cursor` | `string` |  |
| `ended_at` | `string|nil` |  |
| `external_session_id` | `string` |  |
| `facets` | `table` |  |
| `from` | `string` |  |
| `github_access_warnings` | `table` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `string|nil` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `string|nil` |  |
| `limit` | `number` |  |
| `markers` | `table` |  |
| `max_bytes` | `number` |  |
| `mode` | `string` |  |
| `offset` | `number` |  |
| `pagination` | `table` |  |
| `query` | `string` |  |
| `repo` | `string` |  |
| `repository` | `any` |  |
| `search` | `any` |  |
| `search_enabled` | `boolean` |  |
| `session` | `any` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` | `table` |  |
| `started_at` | `string|nil` |  |
| `stats` | `table` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |
| `to` | `string` |  |
| `token_stats` | `any` |  |
| `transcript_index` | `any` |  |
| `transcript_stats` | `any` |  |
| `updated_at` | `string|nil` |  |
| `user` | `any` |  |
| `user_id` | `string` |  |

#### Example: Load

```lua
local pages_session, err = client:PagesSession():load({ id = "pages_session_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local pages_sessions, err = client:PagesSession():list({ organization_id = "example" })
```

#### Example: Create

```lua
local pages_session, err = client:PagesSession():create({
  organization_id = "example_organization_id", -- string
})
```


### Pairing

Create an instance: `local pairing = client:Pairing(nil)`

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

```lua
local pairing, err = client:Pairing():load({ id = "pairing_id" })
```

#### Example: Create

```lua
local pairing, err = client:Pairing():create({
})
```


### PairingEvent

Create an instance: `local pairing_event = client:PairingEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local pairing_event, err = client:PairingEvent():load({ pairing_id = "pairing_id" })
```


### ParallelV1

Create an instance: `local parallel_v1 = client:ParallelV1(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PatchsetDiff

Create an instance: `local patchset_diff = client:PatchsetDiff(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `table` |  |
| `id` | `string` |  |
| `patchset` | `table` |  |

#### Example: Load

```lua
local patchset_diff, err = client:PatchsetDiff():load({ id = "patchset_diff_id", change_id = "change_id", organization_id = "organization_id", patchset_id = "patchset_id", repo_id = "repo_id" })
```


### PersonalAccessToken

Create an instance: `local personal_access_token = client:PersonalAccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local personal_access_token, err = client:PersonalAccessToken():load({ id = "personal_access_token_id" })
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local preview_operation, err = client:PreviewOperation():load({ app_id = "app_id", preview_id = "preview_id" })
```


### PreviewProfileSecretBinding

Create an instance: `local preview_profile_secret_binding = client:PreviewProfileSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: Load

```lua
local preview_profile_secret_binding, err = client:PreviewProfileSecretBinding():load({ app_id = "app_id", preview_profile_id = "preview_profile_id" })
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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local preview_sharing_approval, err = client:PreviewSharingApproval():load({ app_id = "app_id", preview_id = "preview_id" })
```

#### Example: Create

```lua
local preview_sharing_approval, err = client:PreviewSharingApproval():create({
  app_id = "example_app_id", -- string
  preview_id = "example_preview_id", -- string
  snapshot_version = 1, -- number
})
```


### ProactiveAgentWaitlistEntry

Create an instance: `local proactive_agent_waitlist_entry = client:ProactiveAgentWaitlistEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_task` | `string|nil` | The first job they would hand an agent. |
| `invite_code` | `string|nil` | The referral code of the invite link they arrived through. |
| `places_per_referral` | `number` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | `number` | 1-based place in the queue. |
| `position_after_next_referral` | `number` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | `string` | Shared in this entry's invite link. |
| `referral_count` | `number` | People who joined through this entry's link. |
| `total` | `number` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | `string|nil` | Honeypot. |

#### Example: Load

```lua
local proactive_agent_waitlist_entry, err = client:ProactiveAgentWaitlistEntry():load({ id = "proactive_agent_waitlist_entry_id" })
```

#### Example: Create

```lua
local proactive_agent_waitlist_entry, err = client:ProactiveAgentWaitlistEntry():create({
  email = "example_email", -- string
})
```


### Product

Create an instance: `local product = client:Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `table` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `logo_url` | `string|nil` |  |
| `member_count` | `number` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `product` | `string` |  |
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

#### Example: Create

```lua
local product, err = client:Product():create({
  organization_id = "example_organization_id", -- string
  product = "example_product", -- string
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
| `environment_ids` | `table` |  |
| `id` | `string` |  |
| `lock_version` | `number` |  |
| `name` | `string` |  |
| `persona_ids` | `table` |  |
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `number` |  |
| `open_findings` | `number` |  |
| `ready_environments` | `number` |  |
| `scenarios` | `table` | Scenarios by the state of their latest execution. |

#### Example: Load

```lua
local project_overview_metric, err = client:ProjectOverviewMetric():load({ organization_id = "organization_id", project_id = "project_id" })
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


### ProjectPrTesting

Create an instance: `local project_pr_testing = client:ProjectPrTesting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `project` | `table` |  |
| `pull_request_options` | `table` |  |

#### Example: Load

```lua
local project_pr_testing, err = client:ProjectPrTesting():load({ id = "project_pr_testing_id", organization_id = "organization_id" })
```


### ProjectProductMap

Create an instance: `local project_product_map = client:ProjectProductMap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectProductMapComparison

Create an instance: `local project_product_map_comparison = client:ProjectProductMapComparison(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `table` |  |
| `comparison` | `any` |  |
| `filters` | `any` |  |
| `id` | `string` |  |
| `project` | `table` |  |
| `requirements` | `table` |  |
| `revisions` | `table` |  |

#### Example: Load

```lua
local project_product_map_comparison, err = client:ProjectProductMapComparison():load({ id = "project_product_map_comparison_id", organization_id = "organization_id" })
```


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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local project_scenario_option, err = client:ProjectScenarioOption():load({ organization_id = "organization_id", project_id = "project_id" })
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
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```lua
local project_settings, err = client:ProjectSetting():list({ organization_id = "example", project_id = "example" })
```


### PullRequestAction

Create an instance: `local pull_request_action = client:PullRequestAction(nil)`

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
| `comments` | `table` |  |
| `event` | `string` |  |
| `expected_head_sha` | `string` |  |
| `id` | `string|nil` |  |
| `label` | `string` |  |
| `line` | `number` |  |
| `node_id` | `string|nil` |  |
| `operation_key` | `string` |  |
| `path` | `string` |  |
| `run_id` | `string` |  |
| `side` | `string` |  |
| `start_line` | `number` |  |
| `start_side` | `string` |  |
| `thread_id` | `string` |  |

#### Example: Create

```lua
local pull_request_action, err = client:PullRequestAction():create({
  number = "example_number", -- string
  organization_id = "example_organization_id", -- string
  pull_request_id = "example_pull_request_id", -- string
  action_name = "example_action_name", -- string
  operation_key = "example_operation_key", -- string
})
```


### PullRequestMagicMerge

Create an instance: `local pull_request_magic_merge = client:PullRequestMagicMerge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PullRequestSetting

Create an instance: `local pull_request_setting = client:PullRequestSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local pull_request_setting, err = client:PullRequestSetting():load({ organization_id = "organization_id" })
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


### PullRequestTranscript

Create an instance: `local pull_request_transcript = client:PullRequestTranscript(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `string|nil` |  |
| `ended_at` | `string|nil` |  |
| `external_session_id` | `string` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `string|nil` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `string|nil` |  |
| `repository` | `any` |  |
| `started_at` | `string|nil` |  |
| `stats` | `table` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |
| `updated_at` | `string|nil` |  |
| `user` | `any` |  |

#### Example: List

```lua
local pull_request_transcripts, err = client:PullRequestTranscript():list({ organization_id = "example", pull_request_id = "example", repo_id = "example" })
```


### PullZone

Create an instance: `local pull_zone = client:PullZone(nil)`

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

```lua
local pull_zones, err = client:PullZone():list({ organization_id = "example" })
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


### RelayAgentConnection

Create an instance: `local relay_agent_connection = client:RelayAgentConnection(nil)`

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
local relay_agent_connection, err = client:RelayAgentConnection():load({ id = "relay_agent_connection_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local relay_agent_connections, err = client:RelayAgentConnection():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local relay_agent_connection, err = client:RelayAgentConnection():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  agent_card_url = "example_agent_card_url", -- string
  auth_scheme = "example_auth_scheme", -- string
  name = "example_name", -- string
})
```


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


### RelaySignal

Create an instance: `local relay_signal = client:RelaySignal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local relay_signal, err = client:RelaySignal():create({
})
```


### ReleaseRollout

Create an instance: `local release_rollout = client:ReleaseRollout(nil)`

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

```lua
local release_rollout, err = client:ReleaseRollout():load({ id = "release_rollout_id", release_id = "release_id" })
```

#### Example: Create

```lua
local release_rollout, err = client:ReleaseRollout():create({
  release_id = "example_release_id", -- string
})
```


### Repo

Create an instance: `local repo = client:Repo(nil)`

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
| `disclaimer` | `string|nil` |  |
| `federated_in_home` | `boolean` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` | `string|nil` |  |
| `icon_name` | `string` |  |
| `id` | `string` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` | `string|nil` |  |
| `is_home` | `boolean` |  |
| `name` | `string` |  |
| `remote_repository` | `string|nil` |  |
| `root_path` | `string|nil` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` | `string` |  |
| `sync_error_message` | `string|nil` |  |
| `sync_provider` | `string` |  |
| `sync_status` | `string` |  |

#### Example: List

```lua
local repos, err = client:Repo():list({ organization_id = "example" })
```


### RepoAccessToken

Create an instance: `local repo_access_token = client:RepoAccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `table` |  |
| `active` | `boolean` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `credential_purpose` | `string` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` | `string|nil` |  |
| `expires_at_label` | `string|nil` |  |
| `expires_in_days` | `number|nil` |  |
| `id` | `string` |  |
| `last_used_at` | `string|nil` |  |
| `last_used_at_label` | `string|nil` |  |
| `name` | `string` |  |
| `permission_level` | `string` |  |
| `plain_text_token` | `string` |  |
| `revoked_at` | `string|nil` |  |
| `revoked_at_label` | `string|nil` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local repo_access_tokens, err = client:RepoAccessToken():list({ organization_id = "example", repo_id = "example" })
```

#### Example: Create

```lua
local repo_access_token, err = client:RepoAccessToken():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  name = "example_name", -- string
})
```


### RepoAction

Create an instance: `local repo_action = client:RepoAction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pipeline` | `table` |  |
| `run` | `table` |  |

#### Example: List

```lua
local repo_actions, err = client:RepoAction():list({ organization_id = "example", repo_id = "example" })
```


### RepoAgentCheckpoint

Create an instance: `local repo_agent_checkpoint = client:RepoAgentCheckpoint(nil)`

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
local repo_agent_checkpoint, err = client:RepoAgentCheckpoint():load({ id = "repo_agent_checkpoint_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### RepoAgentSession

Create an instance: `local repo_agent_session = client:RepoAgentSession(nil)`

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
| `adapter` | `string` |  |
| `agent_session` | `table` |  |
| `external_session_id` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |

#### Example: Load

```lua
local repo_agent_session, err = client:RepoAgentSession():load({ id = "repo_agent_session_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local repo_agent_session, err = client:RepoAgentSession():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### RepoBookmarkProtection

Create an instance: `local repo_bookmark_protection = client:RepoBookmarkProtection(nil)`

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
| `actor_policy` | `table` |  |
| `bypass_mode` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string|nil` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `priority` | `number` |  |
| `repository_id` | `string` |  |
| `requirements` | `table` |  |
| `target_kind` | `string` |  |
| `target_pattern` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_by_user_id` | `string|nil` |  |

#### Example: Load

```lua
local repo_bookmark_protection, err = client:RepoBookmarkProtection():load({ id = "repo_bookmark_protection_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local repo_bookmark_protections, err = client:RepoBookmarkProtection():list({ organization_id = "example", repo_id = "example" })
```

#### Example: Create

```lua
local repo_bookmark_protection, err = client:RepoBookmarkProtection():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### RepoBookmarkProtectionEvent

Create an instance: `local repo_bookmark_protection_event = client:RepoBookmarkProtectionEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_label` | `string|nil` |  |
| `actor_user_id` | `string|nil` |  |
| `bookmark_name` | `string` |  |
| `bookmark_protection_rule_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `decision` | `string` |  |
| `id` | `string` |  |
| `intent` | `string|nil` |  |
| `metadata` | `table` |  |
| `new_target` | `string|nil` |  |
| `old_target` | `string|nil` |  |
| `organization_id` | `string` |  |
| `reason_codes` | `table` |  |
| `repository_id` | `string` |  |
| `source_request_id` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local repo_bookmark_protection_events, err = client:RepoBookmarkProtectionEvent():list({ organization_id = "example", repo_id = "example" })
```


### RepoCloudWorkspaceBackup

Create an instance: `local repo_cloud_workspace_backup = client:RepoCloudWorkspaceBackup(nil)`

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

```lua
local repo_cloud_workspace_backup, err = client:RepoCloudWorkspaceBackup():load({ id = "repo_cloud_workspace_backup_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: Create

```lua
local repo_cloud_workspace_backup, err = client:RepoCloudWorkspaceBackup():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### RepoCodeRule

Create an instance: `local repo_code_rule = client:RepoCodeRule(nil)`

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
| `active_revision_number` | `number|nil` |  |
| `capabilities` | `table` |  |
| `code_rule` | `any` |  |
| `created_at` | `string` |  |
| `definition` | `table` |  |
| `draft_pending` | `boolean` | The latest revision is not the active one |
| `enabled` | `boolean` |  |
| `expected_version` | `number` |  |
| `id` | `string` |  |
| `latest_revision_number` | `number` |  |
| `name` | `string` | Name of the latest revision |
| `repository` | `table` |  |
| `scope` | `table` |  |
| `slug` | `string` |  |
| `state_version` | `number` | Send back as expected_version on every mutation |
| `updated_at` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```lua
local repo_code_rule, err = client:RepoCodeRule():load({ id = "repo_code_rule_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local repo_code_rules, err = client:RepoCodeRule():list({ organization_id = "example", repo_id = "example" })
```

#### Example: Create

```lua
local repo_code_rule, err = client:RepoCodeRule():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  definition = {}, -- table
})
```


### RepoSetting

Create an instance: `local repo_setting = client:RepoSetting(nil)`

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
| `created_at_label` | `string|nil` |  |
| `description` | `string|nil` |  |
| `expires_at` | `string|nil` |  |
| `expires_at_label` | `string|nil` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `string|nil` |  |
| `last_used_at_label` | `string|nil` |  |
| `merge_authority` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `permission_level` | `string` |  |
| `revoked_at` | `string|nil` |  |
| `revoked_at_label` | `string|nil` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local repo_settings, err = client:RepoSetting():list({ organization_id = "example", repo_id = "example" })
```


### RepoStat

Create an instance: `local repo_stat = client:RepoStat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backend` | `string` |  |
| `can_refresh` | `boolean` |  |
| `freshness` | `table` |  |
| `note` | `string` |  |
| `physical` | `table` |  |
| `series` | `table` |  |

#### Example: Load

```lua
local repo_stat, err = client:RepoStat():load({ organization_id = "organization_id", repo_id = "repo_id" })
```


### RepoVc

Create an instance: `local repo_vc = client:RepoVc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |


### RepoVcCommit

Create an instance: `local repo_vc_commit = client:RepoVcCommit(nil)`

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

```lua
local repo_vc_commits, err = client:RepoVcCommit():list({ organization_id = "example", repo_id = "example", ref = "example" })
```


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


### RepositoryAccess

Create an instance: `local repository_access = client:RepositoryAccess(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### RepositoryAccessResolve

Create an instance: `local repository_access_resolve = client:RepositoryAccessResolve(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string` |  |
| `git_auth_username` | `string` |  |
| `git_https_clone_url` | `string|nil` |  |
| `git_https_supported` | `boolean` |  |
| `github_access_warnings` | `table` |  |
| `id` | `string` |  |
| `membership_role` | `string` |  |
| `organization_id` | `string` |  |
| `organization_name` | `string` |  |
| `organization_slug` | `string` |  |
| `repository_id` | `string` |  |
| `repository_name` | `string` |  |
| `repository_slug` | `string` |  |

#### Example: Load

```lua
local repository_access_resolve, err = client:RepositoryAccessResolve():load({ id = "repository_access_resolve_id", resolve_id = "resolve_id" })
```


### RepositoryEvent

Create an instance: `local repository_event = client:RepositoryEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RepositoryImport

Create an instance: `local repository_import = client:RepositoryImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_connections` | `boolean` |  |
| `github_imports` | `table` |  |
| `github_installations` | `table` |  |
| `gitlab_configured` | `boolean` |  |
| `gitlab_imports` | `table` |  |
| `gitlab_integrations` | `table` |  |
| `gitlab_redirect_uri` | `string|nil` |  |
| `gitlab_self_managed_available` | `boolean` |  |
| `inventory_errors` | `table` |  |
| `organization_id` | `string` |  |
| `repositories` | `table` |  |

#### Example: Load

```lua
local repository_import, err = client:RepositoryImport():load({ organization_id = "organization_id" })
```


### RepositoryImportSession

Create an instance: `local repository_import_session = client:RepositoryImportSession(nil)`

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
| `client_name` | `string|nil` |  |
| `client_version` | `string|nil` |  |
| `created_at` | `string` |  |
| `error_message` | `string|nil` |  |
| `expires_at` | `string` |  |
| `git_imports` | `table` |  |
| `github_app_installation_id` | `string|nil` |  |
| `github_connected` | `boolean` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local repository_import_session, err = client:RepositoryImportSession():load({ id = "repository_import_session_id" })
```

#### Example: Create

```lua
local repository_import_session, err = client:RepositoryImportSession():create({
  organization_id = "example_organization_id", -- string
  idempotency_key = "example_idempotency_key", -- string
})
```


### RepositoryImportSessionRepository

Create an instance: `local repository_import_session_repository = client:RepositoryImportSessionRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string|nil` |  |
| `full_name` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `private` | `boolean` |  |
| `reason` | `string|nil` |  |
| `selectable` | `boolean` |  |
| `status` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```lua
local repository_import_session_repositorys, err = client:RepositoryImportSessionRepository():list({ repository_import_session_id = "example" })
```


### RepositoryImportSessionSelection

Create an instance: `local repository_import_session_selection = client:RepositoryImportSessionSelection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repositories` | `any` |  |

#### Example: Create

```lua
local repository_import_session_selection, err = client:RepositoryImportSessionSelection():create({
  repository_import_session_id = "example_repository_import_session_id", -- string
  repositories = "example_repositories", -- any
})
```


### RepositorySandboxEnvironment

Create an instance: `local repository_sandbox_environment = client:RepositorySandboxEnvironment(nil)`

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

```lua
local repository_sandbox_environment, err = client:RepositorySandboxEnvironment():load({ id = "repository_sandbox_environment_id", repository_id = "repository_id" })
```


### RoderCodeRepair

Create an instance: `local roder_code_repair = client:RoderCodeRepair(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `cancel_requested` | `boolean` |  |
| `failure_code` | `string|nil` |  |
| `id` | `string` |  |
| `launch_state` | `string` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string` |  |
| `roder_thread_id` | `string|nil` |  |
| `roder_turn_id` | `string|nil` |  |
| `scenario_run_id` | `string` |  |
| `task` | `table|nil` |  |
| `trigger_kind` | `string` |  |

#### Example: Load

```lua
local roder_code_repair, err = client:RoderCodeRepair():load({ id = "roder_code_repair_id" })
```

#### Example: Create

```lua
local roder_code_repair, err = client:RoderCodeRepair():create({
  base_sha = "example_base_sha", -- string
  organization_id = "example_organization_id", -- string
  repository_slug = "example_repository_slug", -- string
  scenario_run_id = "example_scenario_run_id", -- string
})
```


### RoderCodeRepairSetting

Create an instance: `local roder_code_repair_setting = client:RoderCodeRepairSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` |  |
| `daily_limit` | `number` |  |
| `enabled` | `boolean` |  |
| `enabled_at` | `string|nil` |  |
| `operator_user_id` | `string|nil` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string|nil` | Connected Composal repository required when enabling |

#### Example: Load

```lua
local roder_code_repair_setting, err = client:RoderCodeRepairSetting():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local roder_code_repair_setting, err = client:RoderCodeRepairSetting():create({
  enabled = true, -- boolean
  organization_id = "example_organization_id", -- string
})
```


### RoderMachine

Create an instance: `local roder_machine = client:RoderMachine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RoderRun

Create an instance: `local roder_run = client:RoderRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RoderWorkspaceCredential

Create an instance: `local roder_workspace_credential = client:RoderWorkspaceCredential(nil)`

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

```lua
local roder_workspace_credential, err = client:RoderWorkspaceCredential():create({
  required_lifetime_seconds = 1, -- number
})
```


### RunArtifact

Create an instance: `local run_artifact = client:RunArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local run_artifact, err = client:RunArtifact():load({ pipeline_id = "pipeline_id", run_id = "run_id" })
```

#### Example: Create

```lua
local run_artifact, err = client:RunArtifact():create({
  pipeline_id = "example_pipeline_id", -- string
  run_id = "example_run_id", -- string
})
```


### RunJob

Create an instance: `local run_job = client:RunJob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `allow_failure` | `boolean` |  |
| `cache_archive_observations` | `table|nil` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` | `string` |  |
| `ci_runner_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `dependencies_csv` | `string|nil` |  |
| `display_id` | `number` |  |
| `environment_csv` | `string|nil` |  |
| `execution_order` | `number` |  |
| `execution_profile` | `string|nil` |  |
| `exit_code` | `number|nil` |  |
| `failed` | `boolean` |  |
| `finished_at` | `string|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `log_chunks` | `table` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `queued_at` | `string|nil` |  |
| `reconciliation_id` | `string|nil` |  |
| `retry_number` | `number` |  |
| `reuse` | `table|nil` |  |
| `runner_label_selector` | `string|nil` |  |
| `slug` | `string` |  |
| `started_at` | `string|nil` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `steps` | `table` |  |
| `timeout_seconds` | `number|nil` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local run_job, err = client:RunJob():load({ id = "run_job_id", pipeline_id = "pipeline_id", run_id = "run_id" })
```

#### Example: Create

```lua
local run_job, err = client:RunJob():create({
  pipeline_id = "example_pipeline_id", -- string
  run_id = "example_run_id", -- string
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
local run_update, err = client:RunUpdate():load({ organization_id = "organization_id" })
```


### RunWorkspaceCredential

Create an instance: `local run_workspace_credential = client:RunWorkspaceCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local run_workspace_credential, err = client:RunWorkspaceCredential():create({
})
```


### RunnerLease

Create an instance: `local runner_lease = client:RunnerLease(nil)`

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

```lua
local runner_lease, err = client:RunnerLease():load({ runner_id = "runner_id", runner_pool_id = "runner_pool_id" })
```

#### Example: Create

```lua
local runner_lease, err = client:RunnerLease():create({
  runner_id = "example_runner_id", -- string
  runner_pool_id = "example_runner_pool_id", -- string
})
```


### RunnerPoolNodeEnrollmentToken

Create an instance: `local runner_pool_node_enrollment_token = client:RunnerPoolNodeEnrollmentToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities_csv` | `string|nil` |  |
| `ci_runner_pool_id` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `creator_user_id` | `string|nil` |  |
| `description` | `string|nil` |  |
| `expires_at` | `string|nil` |  |
| `expires_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_used_at` | `string|nil` |  |
| `last_used_at_label` | `string|nil` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `raw_token` | `string|nil` |  |
| `revoked_at` | `string|nil` |  |
| `status` | `string` |  |
| `token_hint` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `usage_count` | `number` |  |
| `usage_count_label` | `string` |  |

#### Example: List

```lua
local runner_pool_node_enrollment_tokens, err = client:RunnerPoolNodeEnrollmentToken():list({ runner_pool_id = "example" })
```

#### Example: Create

```lua
local runner_pool_node_enrollment_token, err = client:RunnerPoolNodeEnrollmentToken():create({
  runner_pool_id = "example_runner_pool_id", -- string
  name = "example_name", -- string
})
```


### RunnerPoolRunner

Create an instance: `local runner_pool_runner = client:RunnerPoolRunner(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local runner_pool_runner, err = client:RunnerPoolRunner():load({ id = "runner_pool_runner_id", runner_pool_id = "runner_pool_id" })
```

#### Example: Create

```lua
local runner_pool_runner, err = client:RunnerPoolRunner():create({
  runner_pool_id = "example_runner_pool_id", -- string
})
```


### RuntimeInstanceHealthSnapshot

Create an instance: `local runtime_instance_health_snapshot = client:RuntimeInstanceHealthSnapshot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local runtime_instance_health_snapshot, err = client:RuntimeInstanceHealthSnapshot():load({ runtime_instance_id = "runtime_instance_id" })
```

#### Example: Create

```lua
local runtime_instance_health_snapshot, err = client:RuntimeInstanceHealthSnapshot():create({
  runtime_instance_id = "example_runtime_instance_id", -- string
})
```


### SandboxIntegration

Create an instance: `local sandbox_integration = client:SandboxIntegration(nil)`

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
| `can_manage` | `boolean` |  |
| `catalog` | `table` |  |
| `configuration` | `table` |  |
| `connected_profiles` | `table` | Connected profiles per provider across the organization. |
| `credentials` | `table` |  |
| `enabled` | `boolean` |  |
| `id` | `string` |  |
| `integrations` | `table` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```lua
local sandbox_integration, err = client:SandboxIntegration():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local sandbox_integration, err = client:SandboxIntegration():create({
  organization_id = "example_organization_id", -- string
  configuration = {}, -- table
  credentials = {}, -- table
  name = "example_name", -- string
  provider = "example_provider", -- string
})
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


### SecretGrant

Create an instance: `local secret_grant = client:SecretGrant(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local secret_grant, err = client:SecretGrant():load({ id = "secret_grant_id", organization_id = "organization_id", secret_id = "secret_id" })
```

#### Example: Create

```lua
local secret_grant, err = client:SecretGrant():create({
  organization_id = "example_organization_id", -- string
  secret_id = "example_secret_id", -- string
})
```


### SecretVersion

Create an instance: `local secret_version = client:SecretVersion(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local secret_version, err = client:SecretVersion():load({ id = "secret_version_id", organization_id = "organization_id", secret_id = "secret_id" })
```

#### Example: Create

```lua
local secret_version, err = client:SecretVersion():create({
  organization_id = "example_organization_id", -- string
  secret_id = "example_secret_id", -- string
})
```


### ServiceEndpoint

Create an instance: `local service_endpoint = client:ServiceEndpoint(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local service_endpoint, err = client:ServiceEndpoint():load({ id = "service_endpoint_id", app_id = "app_id", service_id = "service_id" })
```

#### Example: Create

```lua
local service_endpoint, err = client:ServiceEndpoint():create({
  app_id = "example_app_id", -- string
  service_id = "example_service_id", -- string
})
```


### Setting

Create an instance: `local setting = client:Setting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `boolean` |  |
| `can_manage_sandbox_region` | `boolean` |  |
| `dedicated_outbound_ip_addresses` | `table` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `table` |  |
| `sandbox_regions` | `table` |  |

#### Example: Load

```lua
local setting, err = client:Setting():load({ organization_id = "organization_id" })
```


### SettingMutationLease

Create an instance: `local setting_mutation_lease = client:SettingMutationLease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Signal

Create an instance: `local signal = client:Signal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acked_at` | `string|nil` |  |
| `acked_by` | `table|nil` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | `table` | Dispatched-run summary (docs §6c). |
| `app_service_id` | `string|nil` |  |
| `attribution` | `table` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | `string` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | `string` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | `table` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | `string` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` | `string` |  |
| `payload` | `table` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | `table` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | `table` | Recovery pairing (docs §6b). |
| `severity` | `string` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | `table` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` | `string|nil` |  |
| `subject_type` | `string|nil` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | `string` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

#### Example: Load

```lua
local signal, err = client:Signal():load({ id = "signal_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local signals, err = client:Signal():list({ organization_id = "example" })
```

#### Example: Create

```lua
local signal, err = client:Signal():create({
})
```


### SignalInbound

Create an instance: `local signal_inbound = client:SignalInbound(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SignalIntegration

Create an instance: `local signal_integration = client:SignalIntegration(nil)`

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
| `config` | `table` |  |
| `created_at` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `string|nil` |  |
| `last_verified_at` | `string|nil` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `number` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `number` |  |
| `unmapped_delivery_count` | `number` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `string|nil` |  |
| `webhook_secret` | `string` | The provider's signing secret. |
| `webhook_secret_stored` | `boolean` |  |

#### Example: Load

```lua
local signal_integration, err = client:SignalIntegration():load({ id = "signal_integration_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local signal_integrations, err = client:SignalIntegration():list({ organization_id = "example" })
```

#### Example: Create

```lua
local signal_integration, err = client:SignalIntegration():create({
  organization_id = "example_organization_id", -- string
  name = "example_name", -- string
  provider = "example_provider", -- string
})
```


### SignalIntegrationDelivery

Create an instance: `local signal_integration_delivery = client:SignalIntegrationDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `number` |  |
| `created_at` | `string|nil` |  |
| `delivery_id` | `string` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` | `string|nil` |  |
| `id` | `string` | Public id (`sdel_…`). |
| `last_error` | `string|nil` |  |
| `ops_signal_id` | `string|nil` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` | `string` |  |
| `processed_at` | `string|nil` |  |
| `provider` | `string` |  |
| `received_at` | `string|nil` |  |
| `signal_integration_id` | `string` |  |
| `state` | `string` |  |

#### Example: List

```lua
local signal_integration_deliverys, err = client:SignalIntegrationDelivery():list({ organization_id = "example", signal_integration_id = "example" })
```


### SignalIntegrationTarget

Create an instance: `local signal_integration_target = client:SignalIntegrationTarget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_service_id` | `string|nil` |  |
| `created_at` | `string|nil` |  |
| `display_name` | `string|nil` |  |
| `enabled` | `boolean` |  |
| `external_id` | `string` |  |
| `external_kind` | `string` |  |
| `external_slug` | `string|nil` |  |
| `hosted_app_id` | `string|nil` |  |
| `id` | `string` | Public id (`stgt_…`). |
| `organization_id` | `string` |  |
| `signal_integration_id` | `string` |  |
| `signal_integration_targets` | `table` |  |
| `targets` | `table` |  |
| `updated_at` | `string|nil` |  |

#### Example: List

```lua
local signal_integration_targets, err = client:SignalIntegrationTarget():list({ organization_id = "example", signal_integration_id = "example" })
```


### SignalSubscription

Create an instance: `local signal_subscription = client:SignalSubscription(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local signal_subscription, err = client:SignalSubscription():load({ id = "signal_subscription_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local signal_subscription, err = client:SignalSubscription():create({
  organization_id = "example_organization_id", -- string
})
```


### Site

Create an instance: `local site = client:Site(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

#### Example: List

```lua
local sites, err = client:Site():list({ organization_id = "example" })
```


### SiteAccessKey

Create an instance: `local site_access_key = client:SiteAccessKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local site_access_key, err = client:SiteAccessKey():load({ organization_id = "organization_id", site_id = "site_id" })
```

#### Example: Create

```lua
local site_access_key, err = client:SiteAccessKey():create({
  organization_id = "example_organization_id", -- string
  site_id = "example_site_id", -- string
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


### SiteSecret

Create an instance: `local site_secret = client:SiteSecret(nil)`

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


### SourceConnection

Create an instance: `local source_connection = client:SourceConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SpaceAlertRule

Create an instance: `local space_alert_rule = client:SpaceAlertRule(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_alert_rule, err = client:SpaceAlertRule():load({ id = "space_alert_rule_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_alert_rule, err = client:SpaceAlertRule():create({
  space_id = "example_space_id", -- string
})
```


### SpaceAuditEvent

Create an instance: `local space_audit_event = client:SpaceAuditEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local space_audit_event, err = client:SpaceAuditEvent():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_audit_event, err = client:SpaceAuditEvent():create({
  space_id = "example_space_id", -- string
})
```


### SpaceDnsRecord

Create an instance: `local space_dns_record = client:SpaceDnsRecord(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_dns_record, err = client:SpaceDnsRecord():load({ id = "space_dns_record_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_dns_record, err = client:SpaceDnsRecord():create({
  space_id = "example_space_id", -- string
})
```


### SpaceEnrollmentToken

Create an instance: `local space_enrollment_token = client:SpaceEnrollmentToken(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_enrollment_token, err = client:SpaceEnrollmentToken():load({ id = "space_enrollment_token_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_enrollment_token, err = client:SpaceEnrollmentToken():create({
  space_id = "example_space_id", -- string
})
```


### SpaceGateway

Create an instance: `local space_gateway = client:SpaceGateway(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_gateway, err = client:SpaceGateway():load({ id = "space_gateway_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_gateway, err = client:SpaceGateway():create({
  space_id = "example_space_id", -- string
})
```


### SpaceGroup

Create an instance: `local space_group = client:SpaceGroup(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_group, err = client:SpaceGroup():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_group, err = client:SpaceGroup():create({
  space_id = "example_space_id", -- string
})
```


### SpaceGroupMembership

Create an instance: `local space_group_membership = client:SpaceGroupMembership(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_group_membership, err = client:SpaceGroupMembership():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_group_membership, err = client:SpaceGroupMembership():create({
  space_id = "example_space_id", -- string
})
```


### SpaceLogStream

Create an instance: `local space_log_stream = client:SpaceLogStream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local space_log_stream, err = client:SpaceLogStream():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_log_stream, err = client:SpaceLogStream():create({
  space_id = "example_space_id", -- string
})
```


### SpaceMetricSery

Create an instance: `local space_metric_sery = client:SpaceMetricSery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local space_metric_sery, err = client:SpaceMetricSery():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_metric_sery, err = client:SpaceMetricSery():create({
  space_id = "example_space_id", -- string
})
```


### SpaceOtelCollector

Create an instance: `local space_otel_collector = client:SpaceOtelCollector(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_otel_collector, err = client:SpaceOtelCollector():load({ id = "space_otel_collector_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_otel_collector, err = client:SpaceOtelCollector():create({
  space_id = "example_space_id", -- string
})
```


### SpacePeer

Create an instance: `local space_peer = client:SpacePeer(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_peer, err = client:SpacePeer():load({ id = "space_peer_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_peer, err = client:SpacePeer():create({
  space_id = "example_space_id", -- string
})
```


### SpacePeerAttachment

Create an instance: `local space_peer_attachment = client:SpacePeerAttachment(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_peer_attachment, err = client:SpacePeerAttachment():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_peer_attachment, err = client:SpacePeerAttachment():create({
  space_id = "example_space_id", -- string
})
```


### SpacePolicy

Create an instance: `local space_policy = client:SpacePolicy(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_policy, err = client:SpacePolicy():load({ id = "space_policy_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_policy, err = client:SpacePolicy():create({
  space_id = "example_space_id", -- string
})
```


### SpaceSegment

Create an instance: `local space_segment = client:SpaceSegment(nil)`

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
| `id` | `string` |  |

#### Example: Load

```lua
local space_segment, err = client:SpaceSegment():load({ id = "space_segment_id", space_id = "space_id" })
```

#### Example: Create

```lua
local space_segment, err = client:SpaceSegment():create({
  space_id = "example_space_id", -- string
})
```


### SpaceTraceSpan

Create an instance: `local space_trace_span = client:SpaceTraceSpan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local space_trace_span, err = client:SpaceTraceSpan():load({ space_id = "space_id" })
```

#### Example: Create

```lua
local space_trace_span, err = client:SpaceTraceSpan():create({
  space_id = "example_space_id", -- string
})
```


### Spark

Create an instance: `local spark = client:Spark(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `table` | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` | `boolean` |  |
| `compute_credit_cents` | `number|nil` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `credit_cents` | `number|nil` | Inference credit the workspace started Sparks with. |
| `first_spark` | `table|nil` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` | `boolean` |  |
| `github_prs_authored_by_change_author` | `boolean` |  |
| `id` | `string` |  |
| `jsonrpc` | `string` |  |
| `logo_url` | `string|nil` |  |
| `member_count` | `number` |  |
| `method` | `string` |  |
| `name` | `string` |  |
| `params` | `table` |  |
| `pending_invitation_count` | `number` |  |
| `personal` | `boolean` |  |
| `repository_count` | `number` |  |
| `role` | `string|nil` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `table` | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | `boolean` | Whether the workspace has started Sparks. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |
| `verify_pr_scenario_writing_enabled` | `boolean` |  |

#### Example: Load

```lua
local spark, err = client:Spark():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local spark, err = client:Spark():create({
  jsonrpc = "example_jsonrpc", -- string
  method = "example_method", -- string
})
```


### SparkAgentIntegration

Create an instance: `local spark_agent_integration = client:SparkAgentIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```lua
local spark_agent_integration, err = client:SparkAgentIntegration():load({ agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local spark_agent_integration, err = client:SparkAgentIntegration():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  connection_id = "example_connection_id", -- string
  enabled = true, -- boolean
  generation = 1, -- number
})
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


### SparkAgentSite

Create an instance: `local spark_agent_site = client:SparkAgentSite(nil)`

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
local spark_agent_sites, err = client:SparkAgentSite():list({ agent_id = "example", organization_id = "example" })
```


### SparkAgentSkill

Create an instance: `local spark_agent_skill = client:SparkAgentSkill(nil)`

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
local spark_agent_skills, err = client:SparkAgentSkill():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local spark_agent_skill, err = client:SparkAgentSkill():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
  enabled = true, -- boolean
  name = "example_name", -- string
  version = "example_version", -- string
})
```


### SparkAgentThread

Create an instance: `local spark_agent_thread = client:SparkAgentThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archive_deletes_sandbox` | `boolean` |  |
| `archived` | `boolean` |  |
| `attention` | `table|nil` | Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish. |
| `can_archive` | `boolean` |  |
| `can_compact` | `boolean` |  |
| `can_snooze` | `boolean` |  |
| `coordination_status` | `string|nil` | Durable work not represented by a native run: a queued input or an outstanding thread report. |
| `execution` | `any` | device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness. |
| `first_input` | `any` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `group` | `string` | Rails-owned list group, in precedence order: attention, active run, coordination custody, then done. |
| `has_active_run` | `boolean` |  |
| `id` | `string` |  |
| `inherit_context` | `boolean` | Include the source conversation through its last completed reply. |
| `is_main` | `boolean` |  |
| `kind` | `string` |  |
| `message` | `string` | The thread's first message. |
| `older` | `boolean` | Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older. |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `parent_conversation_title` | `string` | Source conversation title, resolved independently of this page. |
| `requester_membership_id` | `string` |  |
| `snoozed_until` | `string|nil` | When a snoozed thread returns to its usual group; null when it is not snoozed. |
| `thread` | `table` |  |
| `title` | `string` |  |
| `updated_at` | `string|nil` |  |

#### Example: List

```lua
local spark_agent_threads, err = client:SparkAgentThread():list({ agent_id = "example", organization_id = "example" })
```

#### Example: Create

```lua
local spark_agent_thread, err = client:SparkAgentThread():create({
  agent_id = "example_agent_id", -- string
  organization_id = "example_organization_id", -- string
})
```


### SparkAutomation

Create an instance: `local spark_automation = client:SparkAutomation(nil)`

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
local spark_automation, err = client:SparkAutomation():load({ id = "spark_automation_id", agent_id = "agent_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local spark_automations, err = client:SparkAutomation():list({ agent_id = "example", organization_id = "example" })
```


### SparkCredit

Create an instance: `local spark_credit = client:SparkCredit(nil)`

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
| `amount_cents` | `number` | Purchase amount in USD cents. |
| `autofill` | `any` |  |
| `autofill_payment_unconfirmed` | `boolean` |  |
| `available_usd` | `string` |  |
| `billing_unit` | `string` | Compute minute quote version returned by the billing summary. |
| `can_manage` | `boolean` |  |
| `compute_minutes` | `table` |  |
| `compute_usd` | `string` |  |
| `credits_per_usd` | `number` |  |
| `inference_usd` | `string` |  |
| `kind` | `string` |  |
| `payment_method` | `table|nil` |  |
| `payments_enabled` | `boolean` |  |
| `plan` | `string|nil` |  |
| `plans` | `table` |  |
| `quoted_credits_cents` | `number` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | `number` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` | `table` |  |
| `refill_options` | `table` |  |
| `refill_thresholds_cents` | `table` |  |
| `request_key` | `string` |  |
| `settings` | `any` |  |
| `starter_cents` | `number` |  |
| `top_up_max_cents` | `number` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | `number` | Minimum manual top-up and increment, in USD cents. |

#### Example: Load

```lua
local spark_credit, err = client:SparkCredit():load({ organization_id = "organization_id" })
```

#### Example: Create

```lua
local spark_credit, err = client:SparkCredit():create({
  organization_id = "example_organization_id", -- string
  kind = "example_kind", -- string
  request_key = "example_request_key", -- string
})
```


### SparkCreditAgentUsage

Create an instance: `local spark_credit_agent_usage = client:SparkCreditAgentUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `table` |  |
| `all` | `table` |  |
| `days` | `table` |  |
| `id` | `string` |  |
| `owners` | `table` |  |

#### Example: Load

```lua
local spark_credit_agent_usage, err = client:SparkCreditAgentUsage():load({ id = "spark_credit_agent_usage_id", organization_id = "organization_id" })
```


### SparkCreditUsageTotal

Create an instance: `local spark_credit_usage_total = client:SparkCreditUsageTotal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `compute_minutes_used` | `string` |  |
| `compute_usd` | `string` |  |
| `inference_usd` | `string` |  |

#### Example: Load

```lua
local spark_credit_usage_total, err = client:SparkCreditUsageTotal():load({ organization_id = "organization_id" })
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


### StatusChange

Create an instance: `local status_change = client:StatusChange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `id` | `string` |  |
| `patchsets` | `table` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |

#### Example: Load

```lua
local status_change, err = client:StatusChange():load({ id = "status_change_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### StatusCommit

Create an instance: `local status_commit = client:StatusCommit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `table` |  |
| `commit_sha` | `string` |  |
| `counts` | `table` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```lua
local status_commit, err = client:StatusCommit():load({ id = "status_commit_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### StatusPatchset

Create an instance: `local status_patchset = client:StatusPatchset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `table` |  |
| `checks_status` | `string|nil` |  |
| `commit_sha` | `string|nil` |  |
| `counts` | `table` |  |
| `id` | `string` |  |
| `patchset_id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `number` |  |

#### Example: Load

```lua
local status_patchset, err = client:StatusPatchset():load({ id = "status_patchset_id", organization_id = "organization_id", repo_id = "repo_id" })
```


### StripeWebhook

Create an instance: `local stripe_webhook = client:StripeWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local stripe_webhook, err = client:StripeWebhook():create({
})
```


### SubmitTelemetry

Create an instance: `local submit_telemetry = client:SubmitTelemetry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local submit_telemetry, err = client:SubmitTelemetry():create({
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


### SwarmEvent

Create an instance: `local swarm_event = client:SwarmEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_swarm_id` | `string` |  |
| `attempt_id` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `number` |  |
| `kind` | `string` |  |
| `payload` | `table` |  |
| `reason` | `string|nil` |  |
| `scheduler_generation` | `number|nil` |  |
| `task_id` | `string|nil` |  |

#### Example: List

```lua
local swarm_events, err = client:SwarmEvent():list({ swarm_id = "example" })
```


### SwarmLive

Create an instance: `local swarm_live = client:SwarmLive(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### SwarmNote

Create an instance: `local swarm_note = client:SwarmNote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `task_id` | `string|nil` | A task public id; omitted |
| `text` | `string` |  |

#### Example: Create

```lua
local swarm_note, err = client:SwarmNote():create({
  swarm_id = "example_swarm_id", -- string
  text = "example_text", -- string
})
```


### SwarmTask

Create an instance: `local swarm_task = client:SwarmTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptance_commands` | `table` |  |
| `agent_swarm_id` | `string` |  |
| `assigned_runner_id` | `string|nil` |  |
| `blocked_reason` | `string|nil` |  |
| `changes` | `table` |  |
| `commit_count` | `number` |  |
| `commit_sha_result` | `string|nil` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `current_attempt_id` | `string|nil` |  |
| `deadline_at` | `string|nil` |  |
| `depends_on_task_ids` | `table` |  |
| `depth` | `number` |  |
| `diff_artifact_url` | `string|nil` |  |
| `display_id` | `number` |  |
| `environment_profile` | `string|nil` |  |
| `error_message` | `string|nil` |  |
| `failure_code` | `string|nil` |  |
| `finished_at` | `string|nil` |  |
| `finished_at_label` | `string|nil` |  |
| `harness` | `string` |  |
| `id` | `string` |  |
| `input_revision` | `string|nil` |  |
| `iteration` | `number` |  |
| `landing_state` | `string` |  |
| `model` | `string|nil` |  |
| `model_provider` | `string|nil` |  |
| `number` | `number` |  |
| `organization_id` | `string` |  |
| `owned_paths` | `table` |  |
| `parent_task_id` | `string|nil` |  |
| `position` | `number` |  |
| `prompt` | `string` |  |
| `queued_at` | `string|nil` |  |
| `queued_at_label` | `string|nil` |  |
| `reasoning_effort` | `string|nil` |  |
| `recent_activity` | `table` |  |
| `repo_url` | `string` |  |
| `result` | `table` |  |
| `retry_number` | `number` |  |
| `role` | `string` |  |
| `run_id` | `string|nil` |  |
| `stack_after_task_id` | `string|nil` |  |
| `started_at` | `string|nil` |  |
| `started_at_label` | `string|nil` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local swarm_tasks, err = client:SwarmTask():list({ swarm_id = "example" })
```


### TaskLease

Create an instance: `local task_lease = client:TaskLease(nil)`

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
local task_lease, err = client:TaskLease():create({
  swarm_id = "example_swarm_id", -- string
  task_id = "example_task_id", -- string
})
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


### ThreadPreviewAccess

Create an instance: `local thread_preview_access = client:ThreadPreviewAccess(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ToolFeedback

Create an instance: `local tool_feedback = client:ToolFeedback(nil)`

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
| `feedback` | `table` |  |
| `id` | `string` |  |
| `metadata` | `table` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` | `string` |  |
| `source` | `string` |  |
| `summary` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```lua
local tool_feedback, err = client:ToolFeedback():load({ id = "tool_feedback_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local tool_feedback, err = client:ToolFeedback():create({
  organization_id = "example_organization_id", -- string
  feedback = {}, -- table
})
```


### Transcript

Create an instance: `local transcript = client:Transcript(nil)`

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
| `author` | `table` |  |
| `checkpoint_pagination` | `table` |  |
| `checkpoints` | `table` |  |
| `id` | `string` |  |
| `last_checkpoint_at` | `string|nil` |  |
| `selected_checkpoint` | `any` |  |
| `source_url` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |

#### Example: List

```lua
local transcripts, err = client:Transcript():list({ repo = "example" })
```


### V1Message

Create an instance: `local v1_message = client:V1Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local v1_message, err = client:V1Message():create({
  organization_id = "example_organization_id", -- string
})
```


### VcBranch

Create an instance: `local vc_branch = client:VcBranch(nil)`

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

```lua
local vc_branchs, err = client:VcBranch():list({ organization_id = "example", repo_id = "example" })
```

#### Example: Create

```lua
local vc_branch, err = client:VcBranch():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
})
```


### VcBrowser

Create an instance: `local vc_browser = client:VcBrowser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### VcChange

Create an instance: `local vc_change = client:VcChange(nil)`

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
| `activity` | `table` |  |
| `canonical_path` | `string` |  |
| `change` | `any` |  |
| `checks` | `table` |  |
| `checks_status` | `string` |  |
| `description` | `string|nil` |  |
| `group` | `table|nil` |  |
| `id` | `string` |  |
| `jj_change_id` | `string|nil` |  |
| `labels` | `table` |  |
| `landing` | `table` | Server-computed submitted-together closure and landing preflight. |
| `number` | `number` |  |
| `patchset_number` | `number|nil` |  |
| `previews` | `table` |  |
| `primary_status` | `string|nil` |  |
| `public_id` | `string` |  |
| `related_changes` | `table` |  |
| `relation_chain` | `table` |  |
| `restack_state` | `string` |  |
| `review_summary` | `table` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `sync` | `table` |  |
| `target` | `table` |  |
| `target_advanced` | `boolean` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local vc_change, err = client:VcChange():load({ id = "vc_change_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local vc_changes, err = client:VcChange():list({ organization_id = "example", repo_id = "example" })
```


### VcChangeGroup

Create an instance: `local vc_change_group = client:VcChangeGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes` | `table` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `number` |  |
| `status` | `string` |  |
| `title` | `string|nil` |  |

#### Example: Load

```lua
local vc_change_group, err = client:VcChangeGroup():load({ id = "vc_change_group_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local vc_change_groups, err = client:VcChangeGroup():list({ organization_id = "example", repo_id = "example" })
```

#### Example: Create

```lua
local vc_change_group, err = client:VcChangeGroup():create({
  organization_id = "example_organization_id", -- string
  repo_id = "example_repo_id", -- string
  name = "example_name", -- string
})
```


### VcFile

Create an instance: `local vc_file = client:VcFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paths` | `table` |  |
| `truncated` | `boolean` |  |

#### Example: List

```lua
local vc_files, err = client:VcFile():list({ organization_id = "example", repo_id = "example", ref = "example" })
```


### VcMergeQueue

Create an instance: `local vc_merge_queue = client:VcMergeQueue(nil)`

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
| `analytics` | `table` | Queue performance for the reporting window. |
| `id` | `string` |  |
| `policy` | `table` |  |
| `queue` | `table` |  |
| `target_branches` | `table` | Bookmark names for the target picker. |

#### Example: Load

```lua
local vc_merge_queue, err = client:VcMergeQueue():load({ id = "vc_merge_queue_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local vc_merge_queues, err = client:VcMergeQueue():list({ organization_id = "example", repo_id = "example" })
```


### VcStack

Create an instance: `local vc_stack = client:VcStack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias_ref_name` | `string|nil` |  |
| `changes` | `table` |  |
| `code` | `string` |  |
| `id` | `string` |  |
| `landing` | `table` | Compact landing state for the Stack CLI. |
| `member_count` | `number` |  |
| `name` | `string|nil` |  |
| `ref_name` | `string` |  |
| `status` | `string` |  |
| `tip_change_number` | `number|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string` |  |

#### Example: Load

```lua
local vc_stack, err = client:VcStack():load({ id = "vc_stack_id", organization_id = "organization_id", repo_id = "repo_id" })
```

#### Example: List

```lua
local vc_stacks, err = client:VcStack():list({ organization_id = "example", repo_id = "example" })
```


### VcsNode

Create an instance: `local vcs_node = client:VcsNode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `string|nil` |  |
| `account_id` | `string|nil` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `string|nil` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `string|nil` |  |
| `installed_at_label` | `string|nil` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `table` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `table` |  |
| `status` | `string` |  |
| `suspended_at` | `string|nil` |  |
| `suspended_at_label` | `string|nil` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string|nil` |  |

#### Example: List

```lua
local vcs_nodes, err = client:VcsNode():list({ organization_id = "example" })
```


### VcsSetting

Create an instance: `local vcs_setting = client:VcsSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `boolean` |  |
| `can_manage_sandbox_region` | `boolean` |  |
| `dedicated_outbound_ip_addresses` | `table` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `table` |  |
| `sandbox_regions` | `table` |  |

#### Example: Load

```lua
local vcs_setting, err = client:VcsSetting():load({ organization_id = "organization_id" })
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


### VerifyEmailVerification

Create an instance: `local verify_email_verification = client:VerifyEmailVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local verify_email_verification, err = client:VerifyEmailVerification():load()
```


### VerifyEnvironment

Create an instance: `local verify_environment = client:VerifyEnvironment(nil)`

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
local verify_environment, err = client:VerifyEnvironment():load({ id = "verify_environment_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local verify_environment, err = client:VerifyEnvironment():create({
  organization_id = "example_organization_id", -- string
  slug = "example_slug", -- string
})
```


### VerifyEvidence

Create an instance: `local verify_evidence = client:VerifyEvidence(nil)`

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
local verify_evidence, err = client:VerifyEvidence():load({ id = "verify_evidence_id", organization_id = "organization_id" })
```


### VerifyMergeRequest

Create an instance: `local verify_merge_request = client:VerifyMergeRequest(nil)`

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
local verify_merge_request, err = client:VerifyMergeRequest():load({ id = "verify_merge_request_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local verify_merge_request, err = client:VerifyMergeRequest():create({
  organization_id = "example_organization_id", -- string
  idempotency_key = "example_idempotency_key", -- string
  number = 1, -- number
})
```


### VerifyPullRequest

Create an instance: `local verify_pull_request = client:VerifyPullRequest(nil)`

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
local verify_pull_request, err = client:VerifyPullRequest():load({ id = "verify_pull_request_id", organization_id = "organization_id" })
```

#### Example: Create

```lua
local verify_pull_request, err = client:VerifyPullRequest():create({
  organization_id = "example_organization_id", -- string
  idempotency_key = "example_idempotency_key", -- string
})
```


### VerifySignalIntegration

Create an instance: `local verify_signal_integration = client:VerifySignalIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token_stored` | `boolean` |  |
| `config` | `table` |  |
| `created_at` | `string|nil` |  |
| `failure_message` | `string|nil` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `string|nil` |  |
| `last_verified_at` | `string|nil` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `number` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `number` |  |
| `unmapped_delivery_count` | `number` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `string|nil` |  |
| `webhook_secret_stored` | `boolean` |  |

#### Example: Create

```lua
local verify_signal_integration, err = client:VerifySignalIntegration():create({
  id = "example_id", -- string
  organization_id = "example_organization_id", -- string
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


### WaitlistApplication

Create an instance: `local waitlist_application = client:WaitlistApplication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local waitlist_application, err = client:WaitlistApplication():create({
})
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


### WebhookGitlab

Create an instance: `local webhook_gitlab = client:WebhookGitlab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


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


### WorkspaceActivity

Create an instance: `local workspace_activity = client:WorkspaceActivity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `live_activity` | `table` |  |
| `recent_items` | `table` |  |
| `unresolved_notification_count` | `number` |  |

#### Example: Load

```lua
local workspace_activity, err = client:WorkspaceActivity():load({ organization_id = "organization_id" })
```


### WorkspaceActivityNotification

Create an instance: `local workspace_activity_notification = client:WorkspaceActivityNotification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceSpace

Create an instance: `local workspace_space = client:WorkspaceSpace(nil)`

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
| `description` | `string|nil` |  |
| `hidden` | `boolean` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `import_status` | `string|nil` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `position` | `number|nil` |  |
| `repository_id` | `string` |  |
| `repository_slug` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local workspace_space, err = client:WorkspaceSpace():load({ id = "workspace_space_id", organization_id = "organization_id" })
```

#### Example: List

```lua
local workspace_spaces, err = client:WorkspaceSpace():list({ organization_id = "example" })
```

#### Example: Create

```lua
local workspace_space, err = client:WorkspaceSpace():create({
  organization_id = "example_organization_id", -- string
  icon_name = "example_icon_name", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### WorkspaceSpacePreference

Create an instance: `local workspace_space_preference = client:WorkspaceSpacePreference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `preferences` | `table` |  |
| `spaces` | `table` |  |

## Features

This SDK ships 9 optional features.
Each is **inactive until you switch it on**, so an SDK you have not
configured behaves exactly as if none of them existed, with no measurable overhead.

Activate a feature by name in the `feature` client option:

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
| `agent_interaction` | `interactions` | 12 | 17 levels |
| `automation_event` | `version` | 12 | 12 levels |
| `spark_automation` | `definition` | 12 | 10 levels |
| `spark_automation` | `version` | 12 | 12 levels |
| `control_computer_control_operation` | `result` | 10 | 2 levels |
| `device_operation` | `result` | 10 | 2 levels |
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

- **PrePoint**: Resolves which API endpoint to call based on the operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body — from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here to replace the transport.
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity state (match, data) is updated here.

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
local githubonboarding = client:GithubOnboarding()
githubonboarding:load({ organization_id = "example" })

-- githubonboarding:data_get() now returns the githubonboarding data from the last load
-- githubonboarding:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for the operations each
entity declares.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
