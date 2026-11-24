# Composal Ruby SDK



The Ruby SDK for the Composal API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.A2aWellKnown` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  githubonboarding = client.GithubOnboarding.load({ "organization_id" => "example" })
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

Create a mock client for unit testing — no server required:

```ruby
client = ComposalSDK.test

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
githubonboarding = client.GithubOnboarding.load({ "organization_id" => "example" })
puts githubonboarding.data_get
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
| `A2aWellKnown` | `(data) -> A2aWellKnownEntity` | Create an A2aWellKnown entity instance. |
| `AdminOrg` | `(data) -> AdminOrgEntity` | Create an AdminOrg entity instance. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `AgentApp` | `(data) -> AgentAppEntity` | Create an AgentApp entity instance. |
| `AgentAppInstall` | `(data) -> AgentAppInstallEntity` | Create an AgentAppInstall entity instance. |
| `AgentAttachment` | `(data) -> AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `(data) -> AgentAutomationEntity` | Create an AgentAutomation entity instance. |
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
| `DeviceControlOperation` | `(data) -> DeviceControlOperationEntity` | Create a DeviceControlOperation entity instance. |
| `DeviceEnterpriseRelay` | `(data) -> DeviceEnterpriseRelayEntity` | Create a DeviceEnterpriseRelay entity instance. |
| `DeviceFolderListing` | `(data) -> DeviceFolderListingEntity` | Create a DeviceFolderListing entity instance. |
| `DeviceGrant` | `(data) -> DeviceGrantEntity` | Create a DeviceGrant entity instance. |
| `DeviceInvocation` | `(data) -> DeviceInvocationEntity` | Create a DeviceInvocation entity instance. |
| `DeviceLocalEvent` | `(data) -> DeviceLocalEventEntity` | Create a DeviceLocalEvent entity instance. |
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
| `Environment` | `(data) -> EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `(data) -> EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `(data) -> EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `(data) -> EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `(data) -> EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `(data) -> EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `(data) -> EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `(data) -> EvidenceEntity` | Create an Evidence entity instance. |
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
| `GithubIntegration` | `(data) -> GithubIntegrationEntity` | Create a GithubIntegration entity instance. |
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
| `MergeRequest` | `(data) -> MergeRequestEntity` | Create a MergeRequest entity instance. |
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
| `ProjectProductMap` | `(data) -> ProjectProductMapEntity` | Create a ProjectProductMap entity instance. |
| `ProjectRecording` | `(data) -> ProjectRecordingEntity` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan` | `(data) -> ProjectRunPlanEntity` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule` | `(data) -> ProjectRunScheduleEntity` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption` | `(data) -> ProjectScenarioOptionEntity` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow` | `(data) -> ProjectScenarioRowEntity` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting` | `(data) -> ProjectSettingEntity` | Create a ProjectSetting entity instance. |
| `PullRequest` | `(data) -> PullRequestEntity` | Create a PullRequest entity instance. |
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
| `app` |  |

Operations: List.

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

API path: `/api/v1/cdn_spaces/{id}/archive`

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

Operations: Create, List.

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
| `summaries` |  |

Operations: List.

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

Operations: Create, Load.

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

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations`

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
| `docker_builder_settings` |  |
| `idle_timeout_seconds` |  |
| `max_concurrency` |  |
| `organization_id` |  |
| `region` |  |
| `runtime_timeout_seconds` |  |

Operations: List, Patch, Update.

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

Operations: Create, Load, Patch, Remove, Update.

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

#### Evidence

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/evidence/{id}`

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

API path: `/api/v1/git_imports/{id}/complete`

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

Operations: List, Load.

API path: `/api/v1/organizations/{org_slug}/pages/github_integrations`

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
| `available_messaging_environments` |  |
| `messaging_conversations` |  |
| `messaging_enabled` |  |
| `permissions` |  |
| `project` |  |
| `tester_numbers` |  |

Operations: Load.

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

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup`

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
| `repository_stats` |  |

Operations: Create, List.

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

Create an instance: `a2a_well_known = client.A2aWellKnown`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AdminOrg

Create an instance: `admin_org = client.AdminOrg`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_email` | `Object` |  |
| `billing_reason` | `String` | Required when setting an agreed price |
| `customize_onboarding_packages` | `Boolean` |  |
| `deployment_usage_visibility` | `String` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `id` | `String` |  |
| `monthly_price_dollars` | `Object` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` | `Object` |  |
| `name` | `String` |  |
| `onboarding_custom_pricing` | `Boolean` |  |
| `onboarding_package_keys` | `Object` | Package keys offered when customizing onboarding. |
| `owner_email` | `String` |  |
| `package_id` | `Object` | Active customer package public ID. |
| `skip_payment` | `Boolean` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AdminOrg record (raises on error).
admin_org = client.AdminOrg.load({ "id" => "admin_org_id" })
```

#### Example: Create

```ruby
admin_org = client.AdminOrg.create({
  "name" => "example_name", # String
  "owner_email" => "example_owner_email", # String
  "slug" => "example_slug", # String
})
```


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


### AgentApp

Create an instance: `agent_app = client.AgentApp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `Hash` |  |
| `can_message` | `Boolean` | The viewer may send input to the author agent |
| `deployments_count` | `Integer` | Increases with every deploy of the site |
| `description` | `String` |  |
| `hidden_install_count` | `Integer` | Installs by agents the viewer cannot open |
| `id` | `String` |  |
| `install_count` | `Integer` |  |
| `installed_by` | `Array` |  |
| `installed_target_ids` | `Array` | Install targets of the viewer that have this app installed |
| `mcp_url` | `Object` |  |
| `owner` | `Hash` | The person who controls the author agent |
| `thread` | `Object` | The thread that published the app, when the viewer can open the author agent |
| `title` | `String` |  |
| `url` | `String` |  |
| `visibility` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentApp record (raises on error).
agent_app = client.AgentApp.load({ "id" => "agent_app_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentApp entities, one per record (raises on error).
agent_apps = client.AgentApp.list({ "organization_id" => "example" })
agent_apps.each { |item| puts item.data_get }
```


### AgentAppInstall

Create an instance: `agent_app_install = client.AgentAppInstall`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `installed` | `Boolean` |  |


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
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `Array` |  |
| `activity` | `Array` |  |
| `admin_disabled_at` | `Object` |  |
| `agent_tools` | `Boolean` |  |
| `authentication` | `String` |  |
| `authorized_at` | `Object` |  |
| `can_create_account` | `Boolean` | Whether another account can be created directly from this provider. |
| `capabilities` | `Hash` |  |
| `catalog_section` | `String` | Server-owned grouping in the agent integration catalog. |
| `category` | `String` | Short product label, such as CRM or Email. |
| `certification` | `String` |  |
| `checked_at` | `Object` |  |
| `connection` | `Hash` |  |
| `consent` | `Object` |  |
| `created_at` | `String` |  |
| `creation_key` | `String` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` | `Object` |  |
| `description` | `String` | One-line catalog description of the app. |
| `disabled_reason` | `Object` |  |
| `failure_code` | `Object` |  |
| `generation` | `Integer` |  |
| `grants` | `Array` |  |
| `grants_pagination` | `Hash` |  |
| `id` | `String` |  |
| `limits` | `Hash` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `owner_name` | `String` |  |
| `ownership_kind` | `String` |  |
| `pagination` | `Hash` |  |
| `policy_digest` | `String` |  |
| `provider` | `Hash` |  |
| `provider_disabled_reason` | `Object` |  |
| `provider_identity` | `Hash` |  |
| `revoked_at` | `Object` |  |
| `schema_version` | `Integer` |  |
| `status` | `String` |  |
| `toolkit` | `String` |  |
| `triggers` | `Array` |  |
| `updated_at` | `String` |  |
| `user_id` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentConnection record (raises on error).
agent_connection = client.AgentConnection.load({ "id" => "agent_connection_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentConnection entities, one per record (raises on error).
agent_connections = client.AgentConnection.list({ "organization_id" => "example" })
agent_connections.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_connection = client.AgentConnection.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "toolkit" => "example_toolkit", # String
})
```


### AgentConnectionDelegation

Create an instance: `agent_connection_delegation = client.AgentConnectionDelegation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authorized_by_id` | `String` |  |
| `automation_connection_grant_id` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `member_name` | `String` |  |
| `revoked_at` | `Object` |  |
| `roles` | `Array` |  |
| `usable` | `Boolean` |  |
| `user_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentConnectionDelegation entities, one per record (raises on error).
agent_connection_delegations = client.AgentConnectionDelegation.list({ "agent_connection_id" => "example", "organization_id" => "example" })
agent_connection_delegations.each { |item| puts item.data_get }
```


### AgentConnectionGrant

Create an instance: `agent_connection_grant = client.AgentConnectionGrant`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `Array` |  |
| `agent_connection_id` | `String` |  |
| `automation_id` | `String` |  |
| `connection_generation` | `Integer` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `organization_id` | `String` |  |
| `revision` | `Integer` |  |
| `revoked_at` | `Object` |  |
| `status` | `String` |  |
| `usable` | `Boolean` |  |
| `user_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentConnectionGrant entities, one per record (raises on error).
agent_connection_grants = client.AgentConnectionGrant.list({ "agent_connection_id" => "example", "organization_id" => "example" })
agent_connection_grants.each { |item| puts item.data_get }
```


### AgentConnectionResource

Create an instance: `agent_connection_resource = client.AgentConnectionResource`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `Object` |  |
| `next_cursor` | `Object` |  |
| `query` | `String` |  |
| `resources` | `Array` |  |

#### Example: Create

```ruby
agent_connection_resource = client.AgentConnectionResource.create({
  "agent_connection_id" => "example_agent_connection_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### AgentConnectionSafetyControl

Create an instance: `agent_connection_safety_control = client.AgentConnectionSafetyControl`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_disabled_at` | `Object` |  |
| `authorized_at` | `Object` |  |
| `checked_at` | `Object` |  |
| `created_at` | `String` |  |
| `custodian_id` | `Object` |  |
| `failure_code` | `Object` |  |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `owner_name` | `String` |  |
| `ownership_kind` | `String` |  |
| `provider_disabled_reason` | `Object` |  |
| `provider_identity` | `Hash` |  |
| `revoked_at` | `Object` |  |
| `status` | `String` |  |
| `toolkit` | `String` |  |
| `updated_at` | `String` |  |
| `user_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentConnectionSafetyControl entities, one per record (raises on error).
agent_connection_safety_controls = client.AgentConnectionSafetyControl.list({ "organization_id" => "example" })
agent_connection_safety_controls.each { |item| puts item.data_get }
```


### AgentConnectionTriggerSubscription

Create an instance: `agent_connection_trigger_subscription = client.AgentConnectionTriggerSubscription`

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
| `agent_connection_id` | `String` |  |
| `configuration` | `Hash` |  |
| `created_at` | `String` |  |
| `defaults` | `Hash` |  |
| `delivery` | `String` |  |
| `enabled` | `Boolean` |  |
| `failure_code` | `Object` |  |
| `failure_request_id` | `Object` |  |
| `id` | `String` |  |
| `latency` | `String` |  |
| `name` | `String` |  |
| `reconcile_at` | `String` |  |
| `reconciliation_uncertain` | `Boolean` |  |
| `remote_enabled` | `Object` |  |
| `replacement_id` | `Object` |  |
| `retired_at` | `Object` |  |
| `retirement_completed_at` | `Object` |  |
| `schema` | `Hash` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `toolkit` | `String` |  |
| `toolkit_version` | `String` |  |
| `trigger_slug` | `String` |  |
| `updated_at` | `String` |  |
| `version` | `String` |  |
| `waiting_for_retirement` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of AgentConnectionTriggerSubscription entities, one per record (raises on error).
agent_connection_trigger_subscriptions = client.AgentConnectionTriggerSubscription.list({ "agent_connection_id" => "example", "organization_id" => "example" })
agent_connection_trigger_subscriptions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_connection_trigger_subscription = client.AgentConnectionTriggerSubscription.create({
  "agent_connection_id" => "example_agent_connection_id", # String
  "organization_id" => "example_organization_id", # String
  "configuration" => {}, # Hash
  "trigger_slug" => "example_trigger_slug", # String
})
```


### AgentContextCheckpoint

Create an instance: `agent_context_checkpoint = client.AgentContextCheckpoint`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


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


### AgentEvent

Create an instance: `agent_event = client.AgentEvent`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentEvent record (raises on error).
agent_event = client.AgentEvent.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
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
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `Hash` | Accounts the viewer can see per toolkit, across all account pages. |
| `can_cancel_sign_in` | `Boolean` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `Boolean` |  |
| `can_disconnect` | `Boolean` |  |
| `can_enable` | `Boolean` |  |
| `can_manage` | `Boolean` |  |
| `can_manage_sharing` | `Boolean` |  |
| `can_reconnect` | `Boolean` |  |
| `can_sync` | `Boolean` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` | `Array` |  |
| `connected_by` | `Object` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `Boolean` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | `Hash` | Signed-in accounts per toolkit, across all account pages. |
| `connections` | `Array` |  |
| `creation_key` | `String` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | `Object` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `pagination` | `Hash` |  |
| `pending_counts` | `Hash` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` | `Object` |  |
| `provider_identity` | `Hash` |  |
| `provider_name` | `Object` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | `String` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `String` | Agent account audience, including legacy personal and paused access. |
| `status` | `String` |  |
| `team_sharing_enabled` | `Boolean` |  |
| `team_sharing_version` | `Integer` |  |
| `toolkit` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentIntegration record (raises on error).
agent_integration = client.AgentIntegration.load({ "id" => "agent_integration_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
agent_integration = client.AgentIntegration.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "toolkit" => "example_toolkit", # String
})
```


### AgentIntegrationAccount

Create an instance: `agent_integration_account = client.AgentIntegrationAccount`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel_sign_in` | `Boolean` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `Boolean` |  |
| `can_disconnect` | `Boolean` |  |
| `can_enable` | `Boolean` |  |
| `can_manage_sharing` | `Boolean` |  |
| `can_reconnect` | `Boolean` |  |
| `can_sync` | `Boolean` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `connected_by` | `Object` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `Boolean` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | `Object` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `provider_disabled_reason` | `Object` |  |
| `provider_identity` | `Hash` |  |
| `reference` | `String` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `String` | Agent account audience, including legacy personal and paused access. |
| `status` | `String` |  |
| `team_sharing_enabled` | `Boolean` |  |
| `team_sharing_version` | `Integer` |  |
| `toolkit` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentIntegrationAccount entities, one per record (raises on error).
agent_integration_accounts = client.AgentIntegrationAccount.list({ "organization_id" => "example" })
agent_integration_accounts.each { |item| puts item.data_get }
```


### AgentIntegrationCallback

Create an instance: `agent_integration_callback = client.AgentIntegrationCallback`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentIntegrationCallback record (raises on error).
agent_integration_callback = client.AgentIntegrationCallback.load({ "connection_id" => "connection_id", "state" => "state" })
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


### AgentRelayFileGrant

Create an instance: `agent_relay_file_grant = client.AgentRelayFileGrant`

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
| `access_mode` | `String` |  |
| `connection_generation` | `Integer` |  |
| `connection_id` | `String` |  |
| `connection_name` | `String` | Current display name of the selected account. |
| `created_at` | `String` |  |
| `expected_generation` | `Integer` |  |
| `id` | `String` |  |
| `key` | `String` |  |
| `provider` | `String` |  |
| `resource_id` | `String` |  |
| `resource_kind` | `String` |  |
| `revoked` | `Boolean` |  |
| `revoked_at` | `Object` |  |
| `snapshot_supported` | `Boolean` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentRelayFileGrant record (raises on error).
agent_relay_file_grant = client.AgentRelayFileGrant.load({ "id" => "agent_relay_file_grant_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentRelayFileGrant entities, one per record (raises on error).
agent_relay_file_grants = client.AgentRelayFileGrant.list({ "organization_id" => "example" })
agent_relay_file_grants.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_relay_file_grant = client.AgentRelayFileGrant.create({
  "organization_id" => "example_organization_id", # String
  "access_mode" => "example_access_mode", # String
  "connection_id" => "example_connection_id", # String
  "expected_generation" => 1, # Integer
  "key" => "example_key", # String
  "resource_id" => "example_resource_id", # String
  "resource_kind" => "example_resource_kind", # String
  "source_operation_id" => "example_source_operation_id", # String
})
```


### AgentRelayFileGrantAccount

Create an instance: `agent_relay_file_grant_account = client.AgentRelayFileGrantAccount`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_modes` | `Array` | Supported file access modes. |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `provider` | `String` |  |
| `resource_kind` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentRelayFileGrantAccount entities, one per record (raises on error).
agent_relay_file_grant_accounts = client.AgentRelayFileGrantAccount.list({ "organization_id" => "example", "source_operation_id" => "example" })
agent_relay_file_grant_accounts.each { |item| puts item.data_get }
```


### AgentRepository

Create an instance: `agent_repository = client.AgentRepository`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentRepository record (raises on error).
agent_repository = client.AgentRepository.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
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


### AgentRoder

Create an instance: `agent_roder = client.AgentRoder`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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


### AgentSession

Create an instance: `agent_session = client.AgentSession`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### AgentSessionCheckpoint

Create an instance: `agent_session_checkpoint = client.AgentSessionCheckpoint`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSessionCheckpoint record (raises on error).
agent_session_checkpoint = client.AgentSessionCheckpoint.load({ "id" => "agent_session_checkpoint_id", "agent_session_id" => "agent_session_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: Create

```ruby
agent_session_checkpoint = client.AgentSessionCheckpoint.create({
  "agent_session_id" => "example_agent_session_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### AgentSessionRoderHandoff

Create an instance: `agent_session_roder_handoff = client.AgentSessionRoderHandoff`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checkpoint_id` | `String` | Public id of the checkpoint to hand off. |
| `purpose` | `String` | Handoff intent; defaults to `continue`. |

#### Example: Create

```ruby
agent_session_roder_handoff = client.AgentSessionRoderHandoff.create({
  "agent_session_id" => "example_agent_session_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### AgentSetting

Create an instance: `agent_setting = client.AgentSetting`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `Boolean` |  |
| `expected_version` | `String` |  |
| `instructions` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSetting record (raises on error).
agent_setting = client.AgentSetting.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
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
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `Hash` |  |
| `can_message` | `Boolean` | The viewer may send input to the author agent |
| `deployments_count` | `Integer` | Increases with every deploy of the site |
| `description` | `Object` | The team app description, when the site is a team app |
| `icon_url` | `Object` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` | `String` |  |
| `name` | `String` | The site's DNS label |
| `owner` | `Hash` | The person who controls the author agent |
| `thread` | `Object` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | `String` | The team app title, or the site name read as words |
| `url` | `String` |  |
| `visibility` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSite record (raises on error).
agent_site = client.AgentSite.load({ "id" => "agent_site_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentSite entities, one per record (raises on error).
agent_sites = client.AgentSite.list({ "organization_id" => "example" })
agent_sites.each { |item| puts item.data_get }
```


### AgentSkill

Create an instance: `agent_skill = client.AgentSkill`

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
| `agents` | `Array` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` | `Hash` |  |
| `can_manage_library` | `Boolean` |  |
| `content` | `String` | The skill's SKILL.md |
| `files` | `Array` |  |
| `id` | `String` |  |
| `marketplace` | `String` |  |
| `pending` | `Boolean` | Some agent is still applying a change; check again shortly |
| `plugin` | `String` | The marketplace entry id |
| `revision` | `String` | The commit SHA returned by preview |
| `skill` | `Hash` |  |
| `skills` | `Array` |  |
| `source` | `String` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSkill record (raises on error).
agent_skill = client.AgentSkill.load({ "id" => "agent_skill_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
agent_skill = client.AgentSkill.create({
  "organization_id" => "example_organization_id", # String
  "audience" => {}, # Hash
  "revision" => "example_revision", # String
  "skills" => [], # Array
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSubscription record (raises on error).
agent_subscription = client.AgentSubscription.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
agent_subscription = client.AgentSubscription.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### AgentSwarm

Create an instance: `agent_swarm = client.AgentSwarm`

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
| `base_bookmark` | `Object` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` | `Object` |  |
| `base_revision` | `Object` | 64-hex commit id; skips the head lookup |
| `budget` | `Hash` |  |
| `canceled_at` | `Object` |  |
| `canceled_count` | `Integer` |  |
| `concurrency_key` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `creator_user_id` | `Object` |  |
| `deadline_at` | `Object` |  |
| `display_id` | `Integer` |  |
| `done_count` | `Integer` |  |
| `environment` | `Hash` |  |
| `failed_count` | `Integer` |  |
| `finished_at` | `Object` |  |
| `finished_at_label` | `Object` |  |
| `github` | `Hash` |  |
| `goal` | `Object` |  |
| `id` | `String` |  |
| `model` | `Object` |  |
| `model_provider` | `Object` |  |
| `number` | `Integer` |  |
| `organization_id` | `String` |  |
| `organization_slug` | `Object` |  |
| `outcome` | `Object` |  |
| `phase` | `Object` |  |
| `policy` | `Hash` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` | `Object` |  |
| `queued_at_label` | `Object` |  |
| `repository` | `String` | Repository slug inside the organization |
| `repository_id` | `Object` |  |
| `repository_slug` | `Object` |  |
| `reserved` | `Hash` |  |
| `scheduler_generation` | `Integer` |  |
| `skipped_count` | `Integer` |  |
| `slug` | `String` |  |
| `started_at` | `Object` |  |
| `started_at_label` | `Object` |  |
| `status` | `String` |  |
| `summary` | `Hash` |  |
| `target` | `Hash` | Where the swarm lands. |
| `task_count` | `Integer` |  |
| `task_template_json` | `Object` |  |
| `tasks` | `Array` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `usage` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentSwarm record (raises on error).
agent_swarm = client.AgentSwarm.load({ "id" => "agent_swarm_id" })
```

#### Example: List

```ruby
# list returns an Array of AgentSwarm entities, one per record (raises on error).
agent_swarms = client.AgentSwarm.list({ "org" => "example" })
agent_swarms.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
agent_swarm = client.AgentSwarm.create({
  "organization_slug" => "example_organization_slug", # Object
  "target" => {}, # Hash
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentThread record (raises on error).
agent_thread = client.AgentThread.load({ "id" => "agent_thread_id" })
```

#### Example: Create

```ruby
agent_thread = client.AgentThread.create({
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


### AgentUsage

Create an instance: `agent_usage = client.AgentUsage`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `days` | `Array` | One cell per (day, model), ascending by day then model. |
| `ended_at` | `String` |  |
| `pricing_version` | `String` | The price table in effect now; rows carry the version they were priced at. |
| `source` | `String` | Which store served the rows. |
| `started_at` | `String` |  |
| `user_days` | `Array` | One cell per (day, person), ascending by day. |
| `users` | `Array` | One row per (person, model), descending by tokens. |
| `window` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentUsage record (raises on error).
agent_usage = client.AgentUsage.load({ "organization_id" => "organization_id" })
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
| `id` | `String` |  |
| `name` | `String` |  |
| `project_choices` | `Array` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `Boolean` |  |
| `slug` | `String` |  |
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


### AgentWebPreview

Create an instance: `agent_web_preview = client.AgentWebPreview`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `Object` |  |
| `icon_url` | `Object` |  |
| `image_url` | `Object` |  |
| `title` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWebPreview record (raises on error).
agent_web_preview = client.AgentWebPreview.load({ "token" => "token" })
```


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
| `load(match)` | Load a single entity by match criteria. |
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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentWorkflow record (raises on error).
agent_workflow = client.AgentWorkflow.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
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


### Agreement

Create an instance: `agreement = client.Agreement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `Object` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` | `String` |  |
| `key` | `String` |  |
| `summary` | `String` |  |
| `title` | `String` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Agreement entities, one per record (raises on error).
agreements = client.Agreement.list({ "organization_id" => "example" })
agreements.each { |item| puts item.data_get }
```


### AgreementAccessRequest

Create an instance: `agreement_access_request = client.AgreementAccessRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
agreement_access_request = client.AgreementAccessRequest.create({
  "organization_id" => "example_organization_id", # String
})
```


### AlertRuleEvent

Create an instance: `alert_rule_event = client.AlertRuleEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AlertRuleEvent record (raises on error).
alert_rule_event = client.AlertRuleEvent.load({ "id" => "alert_rule_event_id", "alert_rule_id" => "alert_rule_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
alert_rule_event = client.AlertRuleEvent.create({
  "alert_rule_id" => "example_alert_rule_id", # String
  "space_id" => "example_space_id", # String
})
```


### AllocationLog

Create an instance: `allocation_log = client.AllocationLog`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AllocationLog record (raises on error).
allocation_log = client.AllocationLog.load({ "allocation_id" => "allocation_id", "app_id" => "app_id" })
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


### AppAccess

Create an instance: `app_access = client.AppAccess`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppAccessJwk

Create an instance: `app_access_jwk = client.AppAccessJwk`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AppAccessJwk record (raises on error).
app_access_jwk = client.AppAccessJwk.load()
```


### AppCdn

Create an instance: `app_cdn = client.AppCdn`

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


### Artefact

Create an instance: `artefact = client.Artefact`

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
| `automation_invocation_id` | `Object` |  |
| `byte_size` | `Integer` |  |
| `checksum_sha256` | `String` |  |
| `content_type` | `String` |  |
| `created_at` | `Object` |  |
| `created_by_user_id` | `Object` |  |
| `description` | `Object` |  |
| `document_key` | `String` | Stable document identity shared by all revisions. |
| `entrypoint` | `String` |  |
| `expires_at` | `Object` |  |
| `filename` | `String` |  |
| `files` | `Array` |  |
| `harness` | `Object` |  |
| `harness_version` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `model` | `Object` |  |
| `organization_id` | `String` |  |
| `published_at` | `Object` |  |
| `repository_id` | `Object` |  |
| `slug` | `String` |  |
| `source` | `String` |  |
| `status` | `String` |  |
| `title` | `String` |  |
| `vcs_agent_checkpoint_id` | `Object` |  |
| `vcs_agent_session_id` | `Object` |  |
| `version` | `Integer` |  |
| `view_url` | `String` |  |
| `web_url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Artefact record (raises on error).
artefact = client.Artefact.load({ "id" => "artefact_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Artefact entities, one per record (raises on error).
artefacts = client.Artefact.list({ "organization_id" => "example" })
artefacts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
artefact = client.Artefact.create({
  "organization_id" => "example_organization_id", # String
})
```


### ArtefactCommentThread

Create an instance: `artefact_comment_thread = client.ArtefactCommentThread`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anchor` | `String` | The `#anchor` written into the Markdown. |
| `body` | `String` |  |
| `comments` | `Array` |  |
| `id` | `String` | The anchor key. |
| `quote` | `String` |  |
| `resolved` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of ArtefactCommentThread entities, one per record (raises on error).
artefact_comment_threads = client.ArtefactCommentThread.list({ "artefact_id" => "example", "organization_id" => "example" })
artefact_comment_threads.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
artefact_comment_thread = client.ArtefactCommentThread.create({
  "artefact_id" => "example_artefact_id", # String
  "organization_id" => "example_organization_id", # String
  "anchor" => "example_anchor", # String
  "body" => "example_body", # String
})
```


### ArtefactRevision

Create an instance: `artefact_revision = client.ArtefactRevision`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_version` | `Integer` | The newest version the editor started from. |
| `content` | `String` | Markdown, including CriticMarkup suggestions and comment anchors. |

#### Example: Create

```ruby
artefact_revision = client.ArtefactRevision.create({
  "artefact_id" => "example_artefact_id", # String
  "organization_id" => "example_organization_id", # String
  "base_version" => 1, # Integer
  "content" => "example_content", # String
})
```


### ArtefactViewToken

Create an instance: `artefact_view_token = client.ArtefactViewToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_in` | `Integer` |  |
| `file` | `String` | Exact manifest path. |
| `organization_slug` | `String` | If provided, must match the organization addressed by the route. |
| `version` | `Integer` |  |
| `viewer_url` | `String` |  |

#### Example: Create

```ruby
artefact_view_token = client.ArtefactViewToken.create({
  "artefact_id" => "example_artefact_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### Artifact

Create an instance: `artifact = client.Artifact`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Artifact record (raises on error).
artifact = client.Artifact.load({ "id" => "artifact_id" })
```

#### Example: Create

```ruby
artifact = client.Artifact.create({
})
```


### ArtifactCacheNamespace

Create an instance: `artifact_cache_namespace = client.ArtifactCacheNamespace`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ArtifactCacheNamespace record (raises on error).
artifact_cache_namespace = client.ArtifactCacheNamespace.load({ "id" => "artifact_cache_namespace_id" })
```

#### Example: Create

```ruby
artifact_cache_namespace = client.ArtifactCacheNamespace.create({
})
```


### ArtifactImageRepository

Create an instance: `artifact_image_repository = client.ArtifactImageRepository`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ArtifactImageRepository record (raises on error).
artifact_image_repository = client.ArtifactImageRepository.load({ "id" => "artifact_image_repository_id" })
```

#### Example: Create

```ruby
artifact_image_repository = client.ArtifactImageRepository.create({
})
```


### ArtifactPackageMirror

Create an instance: `artifact_package_mirror = client.ArtifactPackageMirror`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ArtifactPackageMirror record (raises on error).
artifact_package_mirror = client.ArtifactPackageMirror.load({ "id" => "artifact_package_mirror_id" })
```

#### Example: Create

```ruby
artifact_package_mirror = client.ArtifactPackageMirror.create({
})
```


### ArtifactRetentionPolicy

Create an instance: `artifact_retention_policy = client.ArtifactRetentionPolicy`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ArtifactRetentionPolicy record (raises on error).
artifact_retention_policy = client.ArtifactRetentionPolicy.load({ "id" => "artifact_retention_policy_id" })
```

#### Example: Create

```ruby
artifact_retention_policy = client.ArtifactRetentionPolicy.create({
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


### AuditEvent

Create an instance: `audit_event = client.AuditEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `actor_kind` | `String` |  |
| `actor_user_id` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `id` | `String` |  |
| `observability_space_id` | `Object` |  |
| `organization_id` | `String` |  |
| `payload` | `Object` |  |
| `request_id` | `Object` |  |
| `severity` | `String` |  |
| `subject_id` | `String` |  |
| `subject_kind` | `String` |  |
| `subject_name` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of AuditEvent entities, one per record (raises on error).
audit_events = client.AuditEvent.list({ "organization_id" => "example" })
audit_events.each { |item| puts item.data_get }
```


### Auth

Create an instance: `auth = client.Auth`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |


### AuthCli

Create an instance: `auth_cli = client.AuthCli`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AuthGithub

Create an instance: `auth_github = client.AuthGithub`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthGoogle

Create an instance: `auth_google = client.AuthGoogle`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthOpenai

Create an instance: `auth_openai = client.AuthOpenai`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthPasswordReset

Create an instance: `auth_password_reset = client.AuthPasswordReset`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `message` | `String` |  |
| `password` | `String` |  |
| `token` | `String` |  |

#### Example: Create

```ruby
auth_password_reset = client.AuthPasswordReset.create({
  "email" => "example_email", # String
})
```


### AuthRegistrationOption

Create an instance: `auth_registration_option = client.AuthRegistrationOption`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_password_signup_enabled` | `Boolean` |  |
| `openai_sign_in_enabled` | `Boolean` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` | `Object` |  |
| `waitlist_enabled` | `Boolean` | New public signups require waitlist approval when enabled. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AuthRegistrationOption record (raises on error).
auth_registration_option = client.AuthRegistrationOption.load()
```


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


### BackendRunnerPool

Create an instance: `backend_runner_pool = client.BackendRunnerPool`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BackendRunnerPool record (raises on error).
backend_runner_pool = client.BackendRunnerPool.load({ "backend_id" => "backend_id" })
```

#### Example: Create

```ruby
backend_runner_pool = client.BackendRunnerPool.create({
  "backend_id" => "example_backend_id", # String
})
```


### Bazel

Create an instance: `bazel = client.Bazel`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### BazelActionResult

Create an instance: `bazel_action_result = client.BazelActionResult`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BazelActionResult record (raises on error).
bazel_action_result = client.BazelActionResult.load({ "id" => "bazel_action_result_id", "action_result_id" => "action_result_id" })
```


### BazelBackend

Create an instance: `bazel_backend = client.BazelBackend`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BazelBackend record (raises on error).
bazel_backend = client.BazelBackend.load({ "id" => "bazel_backend_id" })
```

#### Example: Create

```ruby
bazel_backend = client.BazelBackend.create({
})
```


### BazelBlob

Create an instance: `bazel_blob = client.BazelBlob`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BazelBlob record (raises on error).
bazel_blob = client.BazelBlob.load({ "id" => "bazel_blob_id", "blob_id" => "blob_id", "hash" => "hash" })
```


### BazelExecution

Create an instance: `bazel_execution = client.BazelExecution`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BazelExecution record (raises on error).
bazel_execution = client.BazelExecution.load({ "id" => "bazel_execution_id" })
```

#### Example: Create

```ruby
bazel_execution = client.BazelExecution.create({
})
```


### BazelFindMissingBlob

Create an instance: `bazel_find_missing_blob = client.BazelFindMissingBlob`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
bazel_find_missing_blob = client.BazelFindMissingBlob.create({
})
```


### Billing

Create an instance: `billing = client.Billing`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Billing record (raises on error).
billing = client.Billing.load({ "organization_id" => "organization_id" })
```


### BillingAddon

Create an instance: `billing_addon = client.BillingAddon`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `id` | `String` |  |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `quantity` | `Integer` |  |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |


### BillingBudget

Create an instance: `billing_budget = client.BillingBudget`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `Object` | Null clears the budget. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |


### BillingCheckoutSession

Create an instance: `billing_checkout_session = client.BillingCheckoutSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cancel_url` | `String` |  |
| `coupon_code` | `String` |  |
| `entry_point` | `String` | Where the owner chose to pay, for product analytics. |
| `package_key` | `String` |  |
| `package_revision` | `Integer` |  |
| `success_url` | `String` |  |

#### Example: Create

```ruby
billing_checkout_session = client.BillingCheckoutSession.create({
  "organization_id" => "example_organization_id", # String
})
```


### BillingContact

Create an instance: `billing_contact = client.BillingContact`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `billing_email` | `String` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |


### BillingExtraSpend

Create an instance: `billing_extra_spend = client.BillingExtraSpend`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `enabled` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `Object` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |


### BillingInvoice

Create an instance: `billing_invoice = client.BillingInvoice`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_due_cents` | `Integer` |  |
| `created_at` | `String` |  |
| `currency` | `String` |  |
| `hosted_invoice_url` | `Object` |  |
| `id` | `String` |  |
| `invoice_pdf` | `Object` |  |
| `metronome_invoice_id` | `Object` | Metronome's id for the invoice it pushed |
| `number` | `Object` |  |
| `period_ended_at` | `Object` |  |
| `period_started_at` | `Object` |  |
| `status` | `String` |  |
| `total_cents` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of BillingInvoice entities, one per record (raises on error).
billing_invoices = client.BillingInvoice.list({ "organization_id" => "example" })
billing_invoices.each { |item| puts item.data_get }
```


### BillingPackage

Create an instance: `billing_package = client.BillingPackage`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `base_price_cents` | `Integer` |  |
| `billing_interval` | `String` |  |
| `billing_policy` | `String` |  |
| `ci_included_spend_cents` | `Integer` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` | `String` |  |
| `key` | `String` |  |
| `max_seats` | `Object` |  |
| `name` | `String` |  |
| `pay_as_you_go_enabled` | `Boolean` |  |
| `rates` | `Array` |  |
| `revision` | `Integer` |  |
| `roder_daily_run_limit` | `Integer` |  |
| `roder_run_concurrency_limit` | `Integer` |  |
| `seat_price_cents` | `Integer` |  |
| `trial_days` | `Integer` |  |
| `visibility` | `String` |  |

#### Example: List

```ruby
# list returns an Array of BillingPackage entities, one per record (raises on error).
billing_packages = client.BillingPackage.list
billing_packages.each { |item| puts item.data_get }
```


### BillingPortalSession

Create an instance: `billing_portal_session = client.BillingPortalSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `return_url` | `String` |  |

#### Example: Create

```ruby
billing_portal_session = client.BillingPortalSession.create({
  "organization_id" => "example_organization_id", # String
})
```


### BillingPrepaidPeriod

Create an instance: `billing_prepaid_period = client.BillingPrepaidPeriod`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `Object` |  |
| `created_at` | `String` |  |
| `currency` | `String` |  |
| `id` | `String` |  |
| `last_error` | `Object` |  |
| `minutes` | `Integer` |  |
| `net_amount_cents` | `Integer` |  |
| `paid_at` | `Object` |  |
| `paid_total_cents` | `Object` |  |
| `payment_action_url` | `Object` |  |
| `period_ended_at` | `String` |  |
| `period_started_at` | `String` |  |
| `receipt_url` | `Object` |  |
| `refunded_net_cents` | `Integer` |  |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BillingPrepaidPeriod record (raises on error).
billing_prepaid_period = client.BillingPrepaidPeriod.load({ "id" => "billing_prepaid_period_id", "organization_id" => "organization_id" })
```


### BillingPrepaidPurchase

Create an instance: `billing_prepaid_purchase = client.BillingPrepaidPurchase`

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
| `created_at` | `String` |  |
| `currency` | `String` |  |
| `id` | `String` |  |
| `last_error` | `Object` |  |
| `minutes` | `Integer` |  |
| `net_amount_cents` | `Integer` |  |
| `paid_at` | `Object` |  |
| `paid_total_cents` | `Object` |  |
| `payment_action_url` | `Object` |  |
| `prepaid` | `Hash` |  |
| `purchase` | `Hash` |  |
| `receipt_url` | `Object` |  |
| `refunded_net_cents` | `Integer` |  |
| `request_key` | `String` |  |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BillingPrepaidPurchase record (raises on error).
billing_prepaid_purchase = client.BillingPrepaidPurchase.load({ "id" => "billing_prepaid_purchase_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of BillingPrepaidPurchase entities, one per record (raises on error).
billing_prepaid_purchases = client.BillingPrepaidPurchase.list({ "organization_id" => "example" })
billing_prepaid_purchases.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
billing_prepaid_purchase = client.BillingPrepaidPurchase.create({
  "organization_id" => "example_organization_id", # String
  "minutes" => 1, # Integer
  "request_key" => "example_request_key", # String
})
```


### BillingSubscription

Create an instance: `billing_subscription = client.BillingSubscription`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `cancel_at_period_end` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |


### BillingTokenTopUp

Create an instance: `billing_token_top_up = client.BillingTokenTopUp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_cents` | `Integer` |  |
| `request_key` | `String` |  |

#### Example: Create

```ruby
billing_token_top_up = client.BillingTokenTopUp.create({
  "organization_id" => "example_organization_id", # String
  "amount_cents" => 1, # Integer
  "request_key" => "example_request_key", # String
})
```


### BillingUsage

Create an instance: `billing_usage = client.BillingUsage`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


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


### BookmarkProtectionRefreshGithubRequiredCheck

Create an instance: `bookmark_protection_refresh_github_required_check = client.BookmarkProtectionRefreshGithubRequiredCheck`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exclusions` | `Array` |  |
| `fetched_at` | `Object` |  |
| `fetched_at_label` | `Object` |  |
| `github_branch` | `String` |  |
| `github_owner` | `Object` |  |
| `github_repository_name` | `Object` |  |
| `last_error` | `Object` |  |
| `proven` | `Boolean` |  |
| `requirements` | `Array` |  |
| `stale` | `Boolean` |  |

#### Example: Create

```ruby
bookmark_protection_refresh_github_required_check = client.BookmarkProtectionRefreshGithubRequiredCheck.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
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


### CacheNamespaceEntry

Create an instance: `cache_namespace_entry = client.CacheNamespaceEntry`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CacheNamespaceEntry record (raises on error).
cache_namespace_entry = client.CacheNamespaceEntry.load({ "id" => "cache_namespace_entry_id", "cache_namespace_id" => "cache_namespace_id" })
```

#### Example: Create

```ruby
cache_namespace_entry = client.CacheNamespaceEntry.create({
  "cache_namespace_id" => "example_cache_namespace_id", # String
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


### Change

Create an instance: `change = client.Change`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `Hash` | Counts for each state across the active non-state filters. |
| `filters` | `Hash` |  |
| `github_sync` | `Hash` |  |
| `result` | `Object` | What this page is a page of. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Change record (raises on error).
change = client.Change.load({ "organization_id" => "organization_id" })
```


### ChangeAsset

Create an instance: `change_asset = client.ChangeAsset`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `String` |  |
| `byte_size` | `Integer` |  |
| `checksum_md5` | `String` |  |
| `checksum_sha256` | `String` |  |
| `content_type` | `String` |  |
| `filename` | `String` |  |
| `id` | `String` |  |

#### Example: Create

```ruby
change_asset = client.ChangeAsset.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "alias" => "example_alias", # String
  "byte_size" => 1, # Integer
  "checksum_md5" => "example_checksum_md5", # String
  "checksum_sha256" => "example_checksum_sha256", # String
  "content_type" => "example_content_type", # String
  "filename" => "example_filename", # String
})
```


### ChangeComment

Create an instance: `change_comment = client.ChangeComment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String` |  |
| `capabilities` | `Hash` |  |
| `change_id` | `Object` |  |
| `created_at` | `Object` |  |
| `created_at_label` | `Object` |  |
| `id` | `String` |  |
| `kind` | `Object` |  |
| `line` | `Object` |  |
| `outdated` | `Boolean` |  |
| `parent_comment_id` | `Object` |  |
| `patchset_id` | `Object` |  |
| `patchset_number` | `Object` |  |
| `path` | `Object` |  |
| `replies` | `Array` |  |
| `resolved` | `Boolean` |  |
| `resolved_at` | `Object` |  |
| `resolved_at_label` | `Object` |  |
| `resolved_by` | `Hash` |  |
| `side` | `Object` |  |
| `updated_at` | `Object` |  |
| `updated_at_label` | `Object` |  |
| `user` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of ChangeComment entities, one per record (raises on error).
change_comments = client.ChangeComment.list({ "change_id" => "example", "organization_id" => "example", "repo_id" => "example" })
change_comments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
change_comment = client.ChangeComment.create({
  "change_id" => "example_change_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "body" => "example_body", # String
})
```


### ChangeFileReviewCheckpoint

Create an instance: `change_file_review_checkpoint = client.ChangeFileReviewCheckpoint`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `patchset_id` | `String` |  |
| `path` | `String` |  |
| `request_id` | `String` |  |
| `review_action` | `String` |  |

#### Example: Create

```ruby
change_file_review_checkpoint = client.ChangeFileReviewCheckpoint.create({
  "change_id" => "example_change_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "patchset_id" => "example_patchset_id", # String
  "path" => "example_path", # String
  "request_id" => "example_request_id", # String
  "review_action" => "example_review_action", # String
})
```


### ChangeGitBranchSubmission

Create an instance: `change_git_branch_submission = client.ChangeGitBranchSubmission`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
change_git_branch_submission = client.ChangeGitBranchSubmission.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### ChangeGitCommitIdentity

Create an instance: `change_git_commit_identity = client.ChangeGitCommitIdentity`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `String` |  |
| `change_number` | `Integer` |  |
| `git_commit_id` | `String` |  |
| `git_commit_ids` | `Array` |  |
| `id` | `String` |  |
| `identities` | `Array` |  |
| `missing_git_commit_ids` | `Array` |  |
| `patchset_number` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ChangeGitCommitIdentity record (raises on error).
change_git_commit_identity = client.ChangeGitCommitIdentity.load({ "id" => "change_git_commit_identity_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: Create

```ruby
change_git_commit_identity = client.ChangeGitCommitIdentity.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "git_commit_ids" => [], # Array
})
```


### ChangeGitPublication

Create an instance: `change_git_publication = client.ChangeGitPublication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expected_target_commit_id` | `String` |  |
| `id` | `String` |  |
| `operation_key` | `String` |  |
| `publication_id` | `String` |  |
| `request` | `Hash` |  |
| `request_digest` | `String` |  |
| `revisions` | `Array` |  |
| `status` | `String` |  |
| `transfer_refs` | `Array` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ChangeGitPublication record (raises on error).
change_git_publication = client.ChangeGitPublication.load({ "id" => "change_git_publication_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: Create

```ruby
change_git_publication = client.ChangeGitPublication.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "operation_key" => "example_operation_key", # String
  "request" => {}, # Hash
})
```


### ChangeGroupMember

Create an instance: `change_group_member = client.ChangeGroupMember`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `String` | Change number |
| `changes` | `Array` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `number` | `Integer` |  |
| `status` | `String` |  |
| `title` | `Object` |  |

#### Example: Create

```ruby
change_group_member = client.ChangeGroupMember.create({
  "change_group_id" => "example_change_group_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "change_id" => "example_change_id", # String
})
```


### ChangeLabel

Create an instance: `change_label = client.ChangeLabel`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | `Boolean` |  |
| `add` | `Array` |  |
| `approval` | `Hash` |  |
| `assets` | `Array` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | `Object` | Human user summary or organization automation identity. |
| `capabilities` | `Hash` |  |
| `change_key` | `String` |  |
| `checks` | `Array` |  |
| `checks_status` | `String` |  |
| `comments` | `Array` |  |
| `comments_count` | `Integer` |  |
| `comments_count_label` | `String` |  |
| `commit_message` | `Object` |  |
| `current_patchset` | `Hash` |  |
| `description` | `Object` |  |
| `draft` | `Boolean` |  |
| `folded_into_number` | `Object` |  |
| `github_projection_status` | `Object` |  |
| `github_pull_request` | `Hash` |  |
| `github_pull_requests` | `Array` |  |
| `group` | `Object` |  |
| `has_description` | `Boolean` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` | `String` |  |
| `jj_change_id` | `Object` |  |
| `labels` | `Array` |  |
| `landable` | `Boolean` |  |
| `landed_by` | `Hash` |  |
| `number` | `Integer` |  |
| `orphaned` | `Boolean` |  |
| `orphaned_at` | `String` |  |
| `orphaned_at_label` | `String` |  |
| `orphaned_reason` | `String` |  |
| `parent_change_id` | `Object` |  |
| `parent_change_number` | `Object` |  |
| `patchset_number` | `Object` |  |
| `patchsets` | `Array` |  |
| `primary_status` | `Object` |  |
| `public_id` | `String` |  |
| `relation_chain` | `Array` |  |
| `remove` | `Array` |  |
| `requested_changes` | `Boolean` |  |
| `restack_state` | `String` |  |
| `reviewer_candidates` | `Array` | Organization members available to the reviewer picker on this page. |
| `reviewers` | `Array` |  |
| `stable_change_id` | `String` |  |
| `stack` | `Object` |  |
| `status` | `String` |  |
| `target_branch` | `String` |  |
| `title` | `String` |  |
| `unresolved_comments_count_label` | `String` |  |
| `url` | `String` |  |
| `votes` | `Array` |  |


### ChangeLandingHold

Create an instance: `change_landing_hold = client.ChangeLandingHold`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ChangeLandingRequest

Create an instance: `change_landing_request = client.ChangeLandingRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_ids` | `Array` |  |
| `count` | `Integer` |  |
| `defer_until_ready` | `Boolean` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` | `String` |  |
| `expected_scope_version` | `String` |  |
| `head_change_id` | `String` |  |
| `id` | `Object` |  |
| `numbers` | `Array` |  |
| `override_acknowledged` | `Boolean` |  |
| `override_codes` | `Array` |  |
| `position` | `Integer` |  |
| `priority` | `String` |  |
| `scope_version` | `String` |  |
| `state` | `String` |  |
| `version` | `Integer` |  |

#### Example: Create

```ruby
change_landing_request = client.ChangeLandingRequest.create({
  "change_id" => "example_change_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### ChangeRequestChange

Create an instance: `change_request_change = client.ChangeRequestChange`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `Object` |  |

#### Example: Create

```ruby
change_request_change = client.ChangeRequestChange.create({
  "change_id" => "example_change_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### ChangeReviewer

Create an instance: `change_reviewer = client.ChangeReviewer`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `Array` |  |
| `email` | `String` |  |
| `name` | `Object` |  |
| `remove` | `Array` |  |
| `removed_reviewers` | `Array` |  |
| `requested_reviewers` | `Array` |  |
| `reviewers` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of ChangeReviewer entities, one per record (raises on error).
change_reviewers = client.ChangeReviewer.list({ "change_id" => "example", "organization_id" => "example", "repo_id" => "example" })
change_reviewers.each { |item| puts item.data_get }
```


### ChangeTranscript

Create an instance: `change_transcript = client.ChangeTranscript`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture_kind` | `String` |  |
| `captured_at` | `String` |  |
| `harness` | `Hash` |  |
| `id` | `String` |  |
| `original_resume` | `Object` |  |
| `patchset_commit_id` | `String` |  |
| `patchset_number` | `Integer` |  |
| `redaction_count` | `Integer` |  |
| `session_id` | `Object` |  |
| `session_title` | `Object` |  |
| `status` | `String` |  |
| `superseded` | `Boolean` |  |
| `user` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of ChangeTranscript entities, one per record (raises on error).
change_transcripts = client.ChangeTranscript.list({ "change_id" => "example", "organization_id" => "example", "repo_id" => "example" })
change_transcripts.each { |item| puts item.data_get }
```


### ChangeTranscriptSummary

Create an instance: `change_transcript_summary = client.ChangeTranscriptSummary`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `summaries` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of ChangeTranscriptSummary entities, one per record (raises on error).
change_transcript_summarys = client.ChangeTranscriptSummary.list({ "organization_id" => "example", "ids" => "example" })
change_transcript_summarys.each { |item| puts item.data_get }
```


### CheckpointPrepareChunk

Create an instance: `checkpoint_prepare_chunk = client.CheckpointPrepareChunk`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
checkpoint_prepare_chunk = client.CheckpointPrepareChunk.create({
  "agent_session_id" => "example_agent_session_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### CiNode

Create an instance: `ci_node = client.CiNode`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `Object` |  |
| `bazel_enabled` | `Boolean` |  |
| `bazel_properties_json` | `Object` |  |
| `ci_runner_pool_id` | `String` |  |
| `cordoned_at` | `Object` |  |
| `cordoned_at_label` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `health_state` | `String` |  |
| `heartbeat_age_seconds` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `labels_csv` | `Object` |  |
| `last_seen_at` | `Object` |  |
| `last_seen_at_label` | `Object` |  |
| `name` | `String` |  |
| `network_peer_id` | `Object` |  |
| `node_capabilities_csv` | `Object` |  |
| `node_certificate_expires_at` | `Object` |  |
| `node_certificate_expires_at_label` | `Object` |  |
| `node_certificate_fingerprint_sha256` | `Object` |  |
| `node_certificate_serial` | `Object` |  |
| `offline_at` | `Object` |  |
| `offline_at_label` | `Object` |  |
| `online_at` | `Object` |  |
| `online_at_label` | `Object` |  |
| `organization_id` | `String` |  |
| `os` | `Object` |  |
| `revoked_at` | `Object` |  |
| `revoked_at_label` | `Object` |  |
| `schedulable` | `Boolean` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `version` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CiNode record (raises on error).
ci_node = client.CiNode.load({ "id" => "ci_node_id" })
```


### CiPipeline

Create an instance: `ci_pipeline = client.CiPipeline`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ci_runner_pool_id` | `Object` |  |
| `concurrency_key` | `Object` |  |
| `created_at` | `String` |  |
| `default_branch` | `Object` |  |
| `description` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `repository_id` | `Object` |  |
| `required_capabilities_csv` | `Object` |  |
| `runner_pool` | `Object` |  |
| `runs` | `Array` |  |
| `slug` | `String` |  |
| `source_kind` | `String` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |
| `trigger_on_pull_request` | `Boolean` |  |
| `trigger_on_push` | `Boolean` |  |
| `trigger_on_schedule` | `Boolean` |  |
| `updated_at` | `String` |  |
| `workflow_path` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CiPipeline record (raises on error).
ci_pipeline = client.CiPipeline.load({ "id" => "ci_pipeline_id" })
```

#### Example: List

```ruby
# list returns an Array of CiPipeline entities, one per record (raises on error).
ci_pipelines = client.CiPipeline.list
ci_pipelines.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
ci_pipeline = client.CiPipeline.create({
})
```


### CiPipelineRun

Create an instance: `ci_pipeline_run = client.CiPipelineRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` |  |
| `canceled_at` | `Object` |  |
| `ci_pipeline_id` | `String` |  |
| `ci_runner_pool_id` | `Object` |  |
| `commit_sha` | `Object` |  |
| `concurrency_key` | `Object` |  |
| `created_at` | `String` |  |
| `creator_user_id` | `Object` |  |
| `display_id` | `Integer` |  |
| `failed` | `Boolean` |  |
| `finished_at` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `jobs` | `Array` |  |
| `message` | `Object` |  |
| `number` | `Integer` |  |
| `organization_id` | `String` |  |
| `parameters_json` | `Object` |  |
| `queued_at` | `Object` |  |
| `ref_name` | `Object` |  |
| `repository_id` | `Object` |  |
| `required_capabilities_csv` | `Object` |  |
| `retry_number` | `Integer` |  |
| `retryable` | `Boolean` |  |
| `slug` | `String` |  |
| `source_url` | `Object` |  |
| `started_at` | `Object` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |
| `trigger_kind` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CiPipelineRun record (raises on error).
ci_pipeline_run = client.CiPipelineRun.load({ "id" => "ci_pipeline_run_id", "pipeline_id" => "pipeline_id" })
```

#### Example: Create

```ruby
ci_pipeline_run = client.CiPipelineRun.create({
  "pipeline_id" => "example_pipeline_id", # String
})
```


### CiRunnerPool

Create an instance: `ci_runner_pool = client.CiRunnerPool`

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
| `bazel_enabled` | `Boolean` |  |
| `bazel_properties_json` | `Object` |  |
| `created_at` | `String` |  |
| `description` | `Object` |  |
| `elastic_config_json` | `Object` |  |
| `elastic_provider_kind` | `Object` |  |
| `id` | `String` |  |
| `isolation_mode` | `String` |  |
| `labels_csv` | `Object` |  |
| `max_concurrency` | `Integer` |  |
| `modal_capacity` | `Hash` |  |
| `modal_runner_invocations` | `Array` |  |
| `name` | `String` |  |
| `network_space_id` | `Object` |  |
| `node_capabilities_csv` | `Object` |  |
| `organization_id` | `String` |  |
| `runner_count_label` | `String` |  |
| `runner_kind` | `String` |  |
| `runners` | `Array` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CiRunnerPool record (raises on error).
ci_runner_pool = client.CiRunnerPool.load({ "id" => "ci_runner_pool_id" })
```

#### Example: List

```ruby
# list returns an Array of CiRunnerPool entities, one per record (raises on error).
ci_runner_pools = client.CiRunnerPool.list
ci_runner_pools.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
ci_runner_pool = client.CiRunnerPool.create({
})
```


### CiStatus

Create an instance: `ci_status = client.CiStatus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### CliEvent

Create an instance: `cli_event = client.CliEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `String` |  |
| `properties` | `Hash` |  |

#### Example: Create

```ruby
cli_event = client.CliEvent.create({
  "event" => "example_event", # String
  "properties" => {}, # Hash
})
```


### CliRelease

Create an instance: `cli_release = client.CliRelease`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CliRelease record (raises on error).
cli_release = client.CliRelease.load()
```

#### Example: Create

```ruby
cli_release = client.CliRelease.create({
})
```


### CloudWorkspaceBackupObject

Create an instance: `cloud_workspace_backup_object = client.CloudWorkspaceBackupObject`

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
# load returns the ENTITY — call data_get for the CloudWorkspaceBackupObject record (raises on error).
cloud_workspace_backup_object = client.CloudWorkspaceBackupObject.load({ "id" => "cloud_workspace_backup_object_id", "cloud_workspace_backup_id" => "cloud_workspace_backup_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### CodeRuleEvaluation

Create an instance: `code_rule_evaluation = client.CodeRuleEvaluation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advisory` | `Boolean` |  |
| `coverage` | `Hash` |  |
| `diff` | `String` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` | `Integer` |  |
| `evaluator_version` | `String` |  |
| `input_digest` | `Object` |  |
| `limits` | `Hash` |  |
| `model` | `String` |  |
| `requests` | `Hash` |  |
| `schema_version` | `Integer` |  |
| `snapshot_digest` | `Object` |  |
| `unchecked` | `Array` |  |
| `verdicts` | `Array` |  |

#### Example: Create

```ruby
code_rule_evaluation = client.CodeRuleEvaluation.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "diff" => "example_diff", # String
})
```


### ComSiteAccess

Create an instance: `com_site_access = client.ComSiteAccess`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ComSiteAccessSession

Create an instance: `com_site_access_session = client.ComSiteAccessSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookie_name` | `String` |  |
| `host` | `String` | Site hostname, for example docs.acme.composal.page |
| `max_age` | `Integer` |  |
| `session_token` | `String` |  |

#### Example: Create

```ruby
com_site_access_session = client.ComSiteAccessSession.create({
  "host" => "example_host", # String
})
```


### CommentThreadComment

Create an instance: `comment_thread_comment = client.CommentThreadComment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String` |  |

#### Example: Create

```ruby
comment_thread_comment = client.CommentThreadComment.create({
  "artefact_id" => "example_artefact_id", # String
  "comment_thread_id" => "example_comment_thread_id", # String
  "organization_id" => "example_organization_id", # String
  "body" => "example_body", # String
})
```


### CommitDiff

Create an instance: `commit_diff = client.CommitDiff`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `Array` |  |
| `id` | `String` |  |
| `parent_id` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CommitDiff record (raises on error).
commit_diff = client.CommitDiff.load({ "id" => "commit_diff_id", "commit_id" => "commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
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


### ContactSubmission

Create an instance: `contact_submission = client.ContactSubmission`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `Object` |  |
| `email` | `String` | Stored downcased and stripped. |
| `message` | `String` |  |
| `name` | `String` |  |
| `website` | `Object` | Honeypot. |

#### Example: Create

```ruby
contact_submission = client.ContactSubmission.create({
  "email" => "example_email", # String
  "message" => "example_message", # String
  "name" => "example_name", # String
})
```


### ControlComputer

Create an instance: `control_computer = client.ControlComputer`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `Hash` | A point-in-time control transport observation. |
| `consent` | `Hash` |  |
| `device` | `Hash` |  |
| `id` | `String` |  |
| `provider_status` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of ControlComputer entities, one per record (raises on error).
control_computers = client.ControlComputer.list({ "organization_id" => "example", "persistent_agent_id" => "example" })
control_computers.each { |item| puts item.data_get }
```


### ControlComputerControlOperation

Create an instance: `control_computer_control_operation = client.ControlComputerControlOperation`

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
# load returns the ENTITY — call data_get for the ControlComputerControlOperation record (raises on error).
control_computer_control_operation = client.ControlComputerControlOperation.load({ "id" => "control_computer_control_operation_id", "control_computer_id" => "control_computer_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
control_computer_control_operation = client.ControlComputerControlOperation.create({
  "control_computer_id" => "example_control_computer_id", # String
  "organization_id" => "example_organization_id", # String
  "action" => "example_action", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
})
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
| `actual` | `String` |  |
| `agent_id` | `String` |  |
| `agent_title` | `String` |  |
| `area` | `Object` | On a locked finding, the first segment of the page it was seen on, such as Billing. |
| `checks` | `Array` | Checks in the same tester report that this finding cites. |
| `confidence` | `String` |  |
| `confirmed` | `Boolean` | On a locked finding, whether the automatic review confirmed it. |
| `evidence_step_ids` | `Array` |  |
| `evidence_timestamp_ms` | `Object` |  |
| `expected` | `String` |  |
| `fix_prompt` | `String` | A coding-agent prompt for this finding alone |
| `has_recording` | `Boolean` | On a locked finding, whether the tester recorded evidence for it. |
| `id` | `String` |  |
| `locked` | `Boolean` | True for a locked finding of the workspace's included scan before it pays. |
| `reproduction_steps` | `Array` |  |
| `severity` | `String` |  |
| `title` | `String` |  |
| `tracked` | `Object` | The finding record to resolve or ignore; null until the tester finishes. |
| `url` | `String` |  |

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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `Object` |  |
| `environment_id` | `String` |  |
| `flow_map` | `Object` |  |
| `revision_id` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeepScanMappedFlow record (raises on error).
deep_scan_mapped_flow = client.DeepScanMappedFlow.load({ "organization_id" => "organization_id", "environment_id" => "environment_id" })
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


### Deployment

Create an instance: `deployment = client.Deployment`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `Hash` |  |
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
| `history_kind` | `String` |  |
| `history_reason` | `Object` |  |
| `id` | `String` |  |
| `is_live` | `Boolean` |  |
| `is_rollback` | `Boolean` |  |
| `live_region_count` | `Integer` |  |
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
| `status` | `String` |  |
| `total_replicas` | `Integer` |  |
| `trigger_kind` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Deployment record (raises on error).
deployment = client.Deployment.load({ "id" => "deployment_id", "organization_id" => "organization_id" })
```


### DeploymentDashboardNomad

Create an instance: `deployment_dashboard_nomad = client.DeploymentDashboardNomad`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentDetail

Create an instance: `deployment_detail = client.DeploymentDetail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `Array` |  |
| `app` | `Object` |  |
| `app_id` | `Object` |  |
| `audit_events` | `Array` |  |
| `capacity` | `Hash` |  |
| `data_resources` | `Array` |  |
| `deploy_targets` | `Array` |  |
| `deployments` | `Array` |  |
| `desired_states` | `Array` |  |
| `environments` | `Array` |  |
| `filters` | `Hash` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | `Hash` | The rolled-up state of the selected scope. |
| `nomad` | `Hash` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` | `Array` |  |
| `placements` | `Array` |  |
| `reconciler_ticks` | `Array` |  |
| `releases` | `Array` |  |
| `runtime_instances` | `Array` |  |
| `service_bindings` | `Array` |  |
| `service_views` | `Array` |  |
| `storage_resources` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeploymentDetail record (raises on error).
deployment_detail = client.DeploymentDetail.load({ "organization_id" => "organization_id" })
```


### DeploymentFile

Create an instance: `deployment_file = client.DeploymentFile`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DeploymentLog

Create an instance: `deployment_log = client.DeploymentLog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `String` |  |
| `app_environment_id` | `Object` |  |
| `app_release_id` | `Object` |  |
| `app_service_id` | `Object` |  |
| `details` | `Object` |  |
| `environment_name` | `String` |  |
| `release_version` | `Object` |  |
| `service_name` | `String` |  |
| `status` | `String` |  |
| `task` | `Object` |  |
| `unreachable_reason` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of DeploymentLog entities, one per record (raises on error).
deployment_logs = client.DeploymentLog.list({ "organization_id" => "example" })
deployment_logs.each { |item| puts item.data_get }
```


### DeploymentMetric

Create an instance: `deployment_metric = client.DeploymentMetric`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `Boolean` |  |
| `environment_id` | `String` |  |
| `environment_name` | `String` |  |
| `placement_id` | `String` |  |
| `redeploy` | `Boolean` |  |
| `region_count` | `Integer` |  |
| `replicas_per_region` | `Integer` |  |
| `rollout_strategy` | `String` |  |
| `service_id` | `String` |  |
| `service_name` | `String` |  |
| `source_ref` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of DeploymentMetric entities, one per record (raises on error).
deployment_metrics = client.DeploymentMetric.list({ "organization_id" => "example" })
deployment_metrics.each { |item| puts item.data_get }
```


### DeploymentPreview

Create an instance: `deployment_preview = client.DeploymentPreview`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `String` |  |
| `app_environment_id` | `String` |  |
| `app_name` | `String` |  |
| `app_preview_profile_id` | `String` |  |
| `app_slug` | `String` |  |
| `change_number` | `Object` |  |
| `created_at` | `String` |  |
| `created_by_user_id` | `String` |  |
| `expires_at` | `String` |  |
| `generation` | `Integer` |  |
| `health` | `String` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `latest_operation_status` | `Object` |  |
| `name` | `String` |  |
| `owner_name` | `Object` |  |
| `profile_name` | `String` |  |
| `resource_overrides` | `Hash` | Service public IDs mapped to resource overrides. |
| `retained` | `Boolean` |  |
| `slug` | `String` |  |
| `snapshot_version` | `Integer` |  |
| `source_revision` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `urls` | `Array` |  |
| `vcs_change_id` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of DeploymentPreview entities, one per record (raises on error).
deployment_previews = client.DeploymentPreview.list({ "organization_id" => "example" })
deployment_previews.each { |item| puts item.data_get }
```


### DeploymentSetting

Create an instance: `deployment_setting = client.DeploymentSetting`

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
# list returns an Array of DeploymentSetting entities, one per record (raises on error).
deployment_settings = client.DeploymentSetting.list({ "organization_id" => "example" })
deployment_settings.each { |item| puts item.data_get }
```


### DesktopLocalAgentModel

Create an instance: `desktop_local_agent_model = client.DesktopLocalAgentModel`

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
# list returns an Array of DesktopLocalAgentModel entities, one per record (raises on error).
desktop_local_agent_models = client.DesktopLocalAgentModel.list({ "organization_id" => "example" })
desktop_local_agent_models.each { |item| puts item.data_get }
```


### DesktopLocalAgentResponse

Create an instance: `desktop_local_agent_response = client.DesktopLocalAgentResponse`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `Array` |  |
| `max_output_tokens` | `Integer` |  |
| `model` | `String` |  |
| `store` | `Boolean` |  |
| `stream` | `Boolean` |  |

#### Example: Create

```ruby
desktop_local_agent_response = client.DesktopLocalAgentResponse.create({
  "organization_id" => "example_organization_id", # String
  "input" => [], # Array
  "model" => "example_model", # String
  "store" => true, # Boolean
  "stream" => true, # Boolean
})
```


### Device

Create an instance: `device = client.Device`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `String` |  |
| `channel` | `String` |  |
| `coding_connection` | `Object` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | `Object` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | `String` | Display-only native presence. |
| `control_delivery_policy` | `Hash` |  |
| `control_spawn_policy` | `Hash` |  |
| `created_at` | `String` |  |
| `device` | `Hash` |  |
| `environment` | `String` |  |
| `execution_available` | `Boolean` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `native_device_id` | `String` |  |
| `paired_at` | `String` |  |
| `pairing_generation` | `Integer` |  |
| `platform` | `String` |  |
| `project_visibility` | `Hash` | Folder discovery and new-thread selection. |
| `provider_status` | `Array` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` | `Object` |  |
| `scheduled_check_ins` | `Boolean` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | `String` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Device record (raises on error).
device = client.Device.load({ "id" => "device_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Device entities, one per record (raises on error).
devices = client.Device.list({ "organization_id" => "example" })
devices.each { |item| puts item.data_get }
```


### DeviceBrowserOperation

Create an instance: `device_browser_operation = client.DeviceBrowserOperation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `String` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `created_at` | `String` |  |
| `id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DeviceBrowserOperation entities, one per record (raises on error).
device_browser_operations = client.DeviceBrowserOperation.list({ "device_id" => "example", "organization_id" => "example" })
device_browser_operations.each { |item| puts item.data_get }
```


### DeviceControlMessage

Create an instance: `device_control_message = client.DeviceControlMessage`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `String` |  |
| `agent_name` | `String` |  |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `sender` | `Object` |  |
| `text` | `Object` |  |
| `text_omitted` | `Boolean` |  |
| `thread` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of DeviceControlMessage entities, one per record (raises on error).
device_control_messages = client.DeviceControlMessage.list({ "device_id" => "example", "organization_id" => "example" })
device_control_messages.each { |item| puts item.data_get }
```


### DeviceControlOperation

Create an instance: `device_control_operation = client.DeviceControlOperation`

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
# load returns the ENTITY — call data_get for the DeviceControlOperation record (raises on error).
device_control_operation = client.DeviceControlOperation.load({ "id" => "device_control_operation_id", "device_id" => "device_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
device_control_operation = client.DeviceControlOperation.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "action" => "example_action", # String
  "arguments" => {}, # Hash
  "key" => "example_key", # String
})
```


### DeviceEnterpriseRelay

Create an instance: `device_enterprise_relay = client.DeviceEnterpriseRelay`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeviceEnterpriseRelay record (raises on error).
device_enterprise_relay = client.DeviceEnterpriseRelay.load()
```


### DeviceFolderListing

Create an instance: `device_folder_listing = client.DeviceFolderListing`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` |  |
| `error` | `String` |  |
| `folders` | `Array` |  |
| `id` | `String` |  |
| `key` | `String` | Stable idempotency key for this listing. |
| `parent` | `Object` |  |
| `path` | `String` | The resolved folder. |
| `state` | `String` |  |
| `truncated` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeviceFolderListing record (raises on error).
device_folder_listing = client.DeviceFolderListing.load({ "id" => "device_folder_listing_id", "device_id" => "device_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
device_folder_listing = client.DeviceFolderListing.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "key" => "example_key", # String
  "path" => "example_path", # String
})
```


### DeviceGrant

Create an instance: `device_grant = client.DeviceGrant`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `String` |  |
| `agent_name` | `Object` |  |
| `can_edit` | `Boolean` |  |
| `can_revoke` | `Boolean` |  |
| `capabilities` | `Array` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `principal_id` | `String` |  |
| `principal_name` | `Object` |  |
| `revision` | `Integer` |  |
| `revoked_at` | `Object` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DeviceGrant entities, one per record (raises on error).
device_grants = client.DeviceGrant.list({ "device_id" => "example", "organization_id" => "example" })
device_grants.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
device_grant = client.DeviceGrant.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "agent_id" => "example_agent_id", # String
  "capabilities" => [], # Array
  "principal_id" => "example_principal_id", # String
})
```


### DeviceInvocation

Create an instance: `device_invocation = client.DeviceInvocation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### DeviceLocalEvent

Create an instance: `device_local_event = client.DeviceLocalEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `String` |  |
| `recorded` | `Boolean` |  |

#### Example: Create

```ruby
device_local_event = client.DeviceLocalEvent.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "event" => "example_event", # String
})
```


### DevicePairing

Create an instance: `device_pairing = client.DevicePairing`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `String` |  |
| `channel` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `platform` | `String` |  |
| `public_key` | `String` |  |

#### Example: Create

```ruby
device_pairing = client.DevicePairing.create({
  "organization_id" => "example_organization_id", # String
  "architecture" => "example_architecture", # String
  "channel" => "example_channel", # String
  "name" => "example_name", # String
  "platform" => "example_platform", # String
  "public_key" => "example_public_key", # String
})
```


### DeviceProject

Create an instance: `device_project = client.DeviceProject`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### DeviceScheduledCheckIn

Create an instance: `device_scheduled_check_in = client.DeviceScheduledCheckIn`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `Boolean` |  |

#### Example: Create

```ruby
device_scheduled_check_in = client.DeviceScheduledCheckIn.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "enabled" => true, # Boolean
})
```


### DockerBuilder

Create an instance: `docker_builder = client.DockerBuilder`

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
| `backend` | `String` |  |
| `created_at` | `Object` |  |
| `gateway_url` | `Object` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `last_activity_at` | `Object` |  |
| `organization_id` | `String` |  |
| `ready_at` | `Object` |  |
| `slept_at` | `Object` |  |
| `slug` | `String` |  |
| `startup_attempt` | `Integer` |  |
| `startup_failure` | `Object` | Safe failure reason for the most recent startup attempt |
| `startup_stage` | `Object` |  |
| `status` | `String` |  |
| `updated_at` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DockerBuilder record (raises on error).
docker_builder = client.DockerBuilder.load({ "id" => "docker_builder_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of DockerBuilder entities, one per record (raises on error).
docker_builders = client.DockerBuilder.list({ "organization_id" => "example" })
docker_builders.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
docker_builder = client.DockerBuilder.create({
  "organization_id" => "example_organization_id", # String
})
```


### DockerBuilderSession

Create an instance: `docker_builder_session = client.DockerBuilderSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `docker_builder_id` | `String` |  |
| `expires_at` | `String` |  |
| `gateway_url` | `Object` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `Integer` |  |
| `id` | `String` |  |
| `organization_id` | `String` |  |
| `revoked_at` | `Object` |  |
| `user_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DockerBuilderSession record (raises on error).
docker_builder_session = client.DockerBuilderSession.load({ "id" => "docker_builder_session_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
docker_builder_session = client.DockerBuilderSession.create({
  "docker_builder_id" => "example_docker_builder_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### DockerBuilderSetting

Create an instance: `docker_builder_setting = client.DockerBuilderSetting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `docker_builder_settings` | `Hash` |  |
| `idle_timeout_seconds` | `Integer` |  |
| `max_concurrency` | `Integer` |  |
| `organization_id` | `String` |  |
| `region` | `String` |  |
| `runtime_timeout_seconds` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of DockerBuilderSetting entities, one per record (raises on error).
docker_builder_settings = client.DockerBuilderSetting.list({ "organization_id" => "example" })
docker_builder_settings.each { |item| puts item.data_get }
```


### DomainDnsIntegration

Create an instance: `domain_dns_integration = client.DomainDnsIntegration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_label` | `Object` |  |
| `api_token` | `String` |  |
| `created_at` | `String` |  |
| `failure_message` | `Object` |  |
| `has_token` | `Boolean` |  |
| `id` | `String` |  |
| `last_verified_at` | `Object` |  |
| `organization_id` | `String` |  |
| `provider` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DomainDnsIntegration entities, one per record (raises on error).
domain_dns_integrations = client.DomainDnsIntegration.list({ "organization_id" => "example" })
domain_dns_integrations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_dns_integration = client.DomainDnsIntegration.create({
  "organization_id" => "example_organization_id", # String
  "api_token" => "example_api_token", # String
})
```


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


### Edge

Create an instance: `edge = client.Edge`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### EmailVerification

Create an instance: `email_verification = client.EmailVerification`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Environment

Create an instance: `environment = client.Environment`

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
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `secret_id` | `String` |  |
| `secret_version_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EnvironmentSecretBinding record (raises on error).
environment_secret_binding = client.EnvironmentSecretBinding.load({ "app_id" => "app_id", "environment_id" => "environment_id" })
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


### ExecutionDesiredState

Create an instance: `execution_desired_state = client.ExecutionDesiredState`

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
| `desired_state` | `Hash` |  |
| `id` | `String` |  |
| `stop_observed` | `Boolean` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ExecutionDesiredState record (raises on error).
execution_desired_state = client.ExecutionDesiredState.load({ "id" => "execution_desired_state_id" })
```

#### Example: Create

```ruby
execution_desired_state = client.ExecutionDesiredState.create({
})
```


### ExecutionReconcilerTick

Create an instance: `execution_reconciler_tick = client.ExecutionReconcilerTick`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ExecutionReconcilerTick record (raises on error).
execution_reconciler_tick = client.ExecutionReconcilerTick.load({ "id" => "execution_reconciler_tick_id" })
```

#### Example: Create

```ruby
execution_reconciler_tick = client.ExecutionReconcilerTick.create({
})
```


### ExecutionRelease

Create an instance: `execution_release = client.ExecutionRelease`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ExecutionRelease record (raises on error).
execution_release = client.ExecutionRelease.load({ "id" => "execution_release_id" })
```

#### Example: Create

```ruby
execution_release = client.ExecutionRelease.create({
})
```


### ExecutionRuntimeInstance

Create an instance: `execution_runtime_instance = client.ExecutionRuntimeInstance`

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
| `adapter_kind` | `String` |  |
| `app_environment_id` | `String` |  |
| `app_release_id` | `Object` |  |
| `app_service_id` | `String` |  |
| `booted_at` | `Object` |  |
| `booted_at_label` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `hosted_app_id` | `String` |  |
| `id` | `String` |  |
| `instance_key` | `String` |  |
| `last_reconciled_at` | `Object` |  |
| `last_reconciled_at_label` | `Object` |  |
| `last_seen_at` | `Object` |  |
| `last_seen_at_label` | `Object` |  |
| `location` | `Object` |  |
| `location_id` | `String` |  |
| `network_peer_id` | `Object` |  |
| `nomad_allocation_id` | `Object` |  |
| `nomad_task_name` | `Object` |  |
| `organization_id` | `String` |  |
| `private_ipv4` | `Object` |  |
| `private_ipv6` | `Object` |  |
| `provider_instance_id` | `Object` |  |
| `public_endpoint` | `Object` |  |
| `service_name` | `String` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` | `String` |  |
| `status` | `String` |  |
| `terminated_at` | `Object` |  |
| `terminated_at_label` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ExecutionRuntimeInstance record (raises on error).
execution_runtime_instance = client.ExecutionRuntimeInstance.load({ "id" => "execution_runtime_instance_id" })
```

#### Example: List

```ruby
# list returns an Array of ExecutionRuntimeInstance entities, one per record (raises on error).
execution_runtime_instances = client.ExecutionRuntimeInstance.list
execution_runtime_instances.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
execution_runtime_instance = client.ExecutionRuntimeInstance.create({
})
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
| `agent_filters` | `Hash` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `Array` |  |
| `can_continue` | `Boolean` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `Array` |  |
| `check_count` | `Integer` |  |
| `concurrency` | `Integer` |  |
| `covered_areas` | `Array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `String` |  |
| `credential_name` | `Object` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | `String` | When the team's time limit ends. |
| `demo_project` | `Object` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` | `Object` |  |
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
| `persona_id` | `Object` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `Hash` |  |
| `project_id` | `Object` | Set when the exploration targets a project environment. |
| `related_explorations` | `Array` |  |
| `report` | `Hash` |  |
| `reproduction_of` | `Object` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `Array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `Boolean` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `Array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | `Integer` | Scenarios saved from this discovery. |
| `scenario_generation` | `Hash` |  |
| `scenarios_pending` | `Boolean` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | `Boolean` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `String` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `Object` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` | `String` |  |
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


### Gh

Create an instance: `gh = client.Gh`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Hash` |  |
| `content` | `Hash` |  |
| `fetched_at` | `String` |  |
| `id` | `String` |  |
| `magic_merge` | `Object` |  |
| `pull_request` | `Object` |  |
| `stack` | `Hash` |  |
| `transcript_paths` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Gh record (raises on error).
gh = client.Gh.load({ "id" => "gh_id", "gh_id" => "gh_id", "github_repo" => "github_repo", "organization_id" => "organization_id" })
```


### GitImport

Create an instance: `git_import = client.GitImport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destination_mode` | `String` |  |
| `error` | `Object` |  |
| `git_default_branch` | `String` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` | `String` |  |
| `git_url` | `String` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `name` | `String` |  |
| `native_status` | `String` |  |
| `organization` | `String` |  |
| `repository_id` | `Object` |  |
| `root_path` | `String` |  |
| `slug` | `String` |  |
| `source_branch` | `String` |  |
| `target_branch` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GitImport record (raises on error).
git_import = client.GitImport.load({ "id" => "git_import_id" })
```

#### Example: Create

```ruby
git_import = client.GitImport.create({
  "organization_id" => "example_organization_id", # String
  "destination_mode" => "example_destination_mode", # String
  "idempotency_key" => "example_idempotency_key", # String
  "root_path" => "example_root_path", # String
  "slug" => "example_slug", # String
  "source_branch" => "example_source_branch", # String
})
```


### Github

Create an instance: `github = client.Github`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GithubApp

Create an instance: `github_app = client.GithubApp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### GithubAppImportableRepository

Create an instance: `github_app_importable_repository = client.GithubAppImportableRepository`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `String` |  |
| `github_app_installation_id` | `String` |  |
| `next_page` | `Object` | Next GitHub page for this installation |
| `repositories` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of GithubAppImportableRepository entities, one per record (raises on error).
github_app_importable_repositorys = client.GithubAppImportableRepository.list
github_app_importable_repositorys.each { |item| puts item.data_get }
```


### GithubAppInstallation

Create an instance: `github_app_installation = client.GithubAppInstallation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `Object` |  |
| `account_id` | `Object` |  |
| `account_login` | `String` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `id` | `String` |  |
| `installation_id` | `String` |  |
| `installed_at` | `Object` |  |
| `installed_at_label` | `Object` |  |
| `manage_access_url` | `String` |  |
| `organization_id` | `String` |  |
| `permission_entries` | `Array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Hash` |  |
| `status` | `String` |  |
| `suspended_at` | `Object` |  |
| `suspended_at_label` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of GithubAppInstallation entities, one per record (raises on error).
github_app_installations = client.GithubAppInstallation.list({ "organization_id" => "example" })
github_app_installations.each { |item| puts item.data_get }
```


### GithubAppInstallationAuthorization

Create an instance: `github_app_installation_authorization = client.GithubAppInstallationAuthorization`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `installation_url` | `String` |  |
| `organization_slug` | `String` | Vex organization slug whose installation will be linked. |
| `return_target` | `String` | Server-validated Vex application target used after verification. |

#### Example: Create

```ruby
github_app_installation_authorization = client.GithubAppInstallationAuthorization.create({
  "organization_slug" => "example_organization_slug", # String
  "return_target" => "example_return_target", # String
})
```


### GithubAppUserAuthorization

Create an instance: `github_app_user_authorization = client.GithubAppUserAuthorization`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
github_app_user_authorization = client.GithubAppUserAuthorization.create({
})
```


### GithubCiRepository

Create an instance: `github_ci_repository = client.GithubCiRepository`

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
| `adoption_mode` | `String` |  |
| `check_name_prefix` | `String` |  |
| `ci_runner_pool_id` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `default_branch` | `String` |  |
| `github_app_installation_id` | `String` |  |
| `github_repository_id` | `String` |  |
| `id` | `String` |  |
| `last_compatibility_status` | `Object` |  |
| `last_error_message` | `Object` |  |
| `last_head_sha` | `Object` |  |
| `last_pull_request_number` | `Object` |  |
| `last_ref` | `Object` |  |
| `last_webhook_action` | `Object` |  |
| `last_webhook_at` | `Object` |  |
| `last_webhook_at_label` | `Object` |  |
| `last_webhook_delivery_id` | `Object` |  |
| `last_webhook_event` | `Object` |  |
| `metadata` | `Hash` |  |
| `organization_id` | `String` |  |
| `permission_status` | `String` |  |
| `repository_full_name` | `String` |  |
| `repository_name` | `String` |  |
| `repository_owner` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `webhook_delivery_count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubCiRepository record (raises on error).
github_ci_repository = client.GithubCiRepository.load({ "id" => "github_ci_repository_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of GithubCiRepository entities, one per record (raises on error).
github_ci_repositorys = client.GithubCiRepository.list({ "organization_id" => "example" })
github_ci_repositorys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
github_ci_repository = client.GithubCiRepository.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "github_repository_id" => "example_github_repository_id", # String
  "repository_name" => "example_repository_name", # String
  "repository_owner" => "example_repository_owner", # String
})
```


### GithubCiRepositoryCompatibilityReport

Create an instance: `github_ci_repository_compatibility_report = client.GithubCiRepositoryCompatibilityReport`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `String` |  |
| `analyzed_at_label` | `Object` |  |
| `ci_pipeline_id` | `Object` |  |
| `ci_pipeline_run_id` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `diagnostics` | `Array` |  |
| `errors` | `Array` |  |
| `event_action` | `Object` |  |
| `event_name` | `String` |  |
| `execution_allowed` | `Boolean` |  |
| `github_ci_repository_id` | `String` |  |
| `head_sha` | `Object` |  |
| `id` | `String` |  |
| `metadata` | `Hash` |  |
| `organization_id` | `String` |  |
| `parser_version` | `String` |  |
| `pull_request_number` | `Object` |  |
| `ref_name` | `Object` |  |
| `referenced_actions` | `Array` |  |
| `required_secrets` | `Array` |  |
| `runner_labels` | `Array` |  |
| `source_blob_sha` | `Object` |  |
| `source_sha` | `String` |  |
| `status` | `String` |  |
| `supported_features` | `Hash` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `warnings` | `Array` |  |
| `workflow_name` | `Object` |  |
| `workflow_path` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubCiRepositoryCompatibilityReport record (raises on error).
github_ci_repository_compatibility_report = client.GithubCiRepositoryCompatibilityReport.load({ "id" => "github_ci_repository_compatibility_report_id", "github_ci_repository_id" => "github_ci_repository_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of GithubCiRepositoryCompatibilityReport entities, one per record (raises on error).
github_ci_repository_compatibility_reports = client.GithubCiRepositoryCompatibilityReport.list({ "github_ci_repository_id" => "example", "organization_id" => "example" })
github_ci_repository_compatibility_reports.each { |item| puts item.data_get }
```


### GithubConnection

Create an instance: `github_connection = client.GithubConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `Array` |  |
| `github_app_installation_id` | `String` |  |
| `installations` | `Array` |  |
| `project_id` | `String` | Project slug or public ID the repositories are added to. |
| `replace` | `Boolean` | Make these the project's only repositories. |
| `repositories` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubConnection record (raises on error).
github_connection = client.GithubConnection.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
github_connection = client.GithubConnection.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "repositories" => [], # Array
})
```


### GithubIntegration

Create an instance: `github_integration = client.GithubIntegration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `Object` |  |
| `account_login` | `String` |  |
| `connection_status` | `String` |  |
| `connection_status_label` | `String` |  |
| `github_installation` | `Object` |  |
| `health` | `Hash` |  |
| `id` | `String` |  |
| `imported_repositories_count` | `Integer` |  |
| `imported_repositories_count_label` | `String` |  |
| `organization` | `Hash` |  |
| `pagination` | `Hash` |  |
| `repositories` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubIntegration record (raises on error).
github_integration = client.GithubIntegration.load({ "id" => "github_integration_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of GithubIntegration entities, one per record (raises on error).
github_integrations = client.GithubIntegration.list({ "organization_id" => "example" })
github_integrations.each { |item| puts item.data_get }
```


### GithubOnboarding

Create an instance: `github_onboarding = client.GithubOnboarding`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `Array` |  |
| `active_batch_id` | `Object` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` | `Array` |  |
| `capabilities` | `Hash` |  |
| `installations` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubOnboarding record (raises on error).
github_onboarding = client.GithubOnboarding.load({ "organization_id" => "organization_id" })
```


### GithubOnboardingBranch

Create an instance: `github_onboarding_branch = client.GithubOnboardingBranch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of GithubOnboardingBranch entities, one per record (raises on error).
github_onboarding_branchs = client.GithubOnboardingBranch.list({ "organization_id" => "example", "github_app_installation_id" => "example", "name" => "example", "owner" => "example" })
github_onboarding_branchs.each { |item| puts item.data_get }
```


### GithubOnboardingImport

Create an instance: `github_onboarding_import = client.GithubOnboardingImport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `String` |  |
| `complete` | `Boolean` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `String` |  |
| `failed_item_count` | `Integer` |  |
| `github_app_installation_id` | `String` |  |
| `id` | `String` |  |
| `imported_item_count` | `Integer` |  |
| `item_count` | `Integer` |  |
| `items` | `Array` |  |
| `repositories` | `Object` |  |
| `status` | `String` |  |
| `terminal_item_count` | `Integer` |  |
| `updated_at` | `String` |  |

#### Example: Create

```ruby
github_onboarding_import = client.GithubOnboardingImport.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "repositories" => "example_repositories", # Object
})
```


### GithubOnboardingImportBatch

Create an instance: `github_onboarding_import_batch = client.GithubOnboardingImportBatch`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `String` |  |
| `complete` | `Boolean` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `String` |  |
| `failed_item_count` | `Integer` |  |
| `github_app_installation_id` | `String` |  |
| `id` | `String` |  |
| `imported_item_count` | `Integer` |  |
| `item_count` | `Integer` |  |
| `items` | `Array` |  |
| `status` | `String` |  |
| `terminal_item_count` | `Integer` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubOnboardingImportBatch record (raises on error).
github_onboarding_import_batch = client.GithubOnboardingImportBatch.load({ "id" => "github_onboarding_import_batch_id", "organization_id" => "organization_id" })
```


### GithubOnboardingImportItem

Create an instance: `github_onboarding_import_item = client.GithubOnboardingImportItem`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### GithubPullRequest

Create an instance: `github_pull_request = client.GithubPullRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Hash` |  |
| `content` | `Hash` |  |
| `fetched_at` | `String` |  |
| `id` | `String` |  |
| `magic_merge` | `Object` |  |
| `pull_request` | `Object` |  |
| `stack` | `Hash` |  |
| `transcript_paths` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubPullRequest record (raises on error).
github_pull_request = client.GithubPullRequest.load({ "id" => "github_pull_request_id", "organization_id" => "organization_id", "pull_request_id" => "pull_request_id" })
```


### GithubRunnerAdmission

Create an instance: `github_runner_admission = client.GithubRunnerAdmission`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
github_runner_admission = client.GithubRunnerAdmission.create({
})
```


### GithubRunnerCache

Create an instance: `github_runner_cache = client.GithubRunnerCache`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `entry_id` | `String` |  |
| `key` | `String` |  |
| `matched_key` | `String` |  |
| `ok` | `Boolean` |  |
| `operation` | `String` |  |
| `restore_keys` | `Array` |  |
| `signed_download_url` | `String` |  |
| `size_bytes` | `String` |  |
| `upload_path` | `String` |  |
| `version` | `String` |  |

#### Example: Create

```ruby
github_runner_cache = client.GithubRunnerCache.create({
  "operation" => "example_operation", # String
})
```


### GithubRunnerEgress

Create an instance: `github_runner_egress = client.GithubRunnerEgress`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_request` | `Boolean` |  |
| `cidr` | `Object` |  |
| `ipv4` | `Object` |  |
| `requested_at_label` | `Object` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubRunnerEgress record (raises on error).
github_runner_egress = client.GithubRunnerEgress.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
github_runner_egress = client.GithubRunnerEgress.create({
  "organization_id" => "example_organization_id", # String
})
```


### GithubRunnerHistory

Create an instance: `github_runner_history = client.GithubRunnerHistory`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `Array` |  |
| `counts` | `Hash` |  |
| `observed_at` | `String` |  |
| `pagination` | `Hash` |  |
| `repositories` | `Array` |  |
| `runs` | `Array` |  |
| `setup` | `Object` | CI onboarding. |
| `success_rate` | `Object` |  |
| `usage` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubRunnerHistory record (raises on error).
github_runner_history = client.GithubRunnerHistory.load({ "organization_id" => "organization_id" })
```


### GithubRunnerImage

Create an instance: `github_runner_image = client.GithubRunnerImage`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `image_reference` | `String` | Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+ |
| `last_error` | `Object` |  |
| `modal_image_id` | `Object` |  |
| `name` | `String` |  |
| `registry_secret_name` | `Object` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubRunnerImage record (raises on error).
github_runner_image = client.GithubRunnerImage.load({ "id" => "github_runner_image_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of GithubRunnerImage entities, one per record (raises on error).
github_runner_images = client.GithubRunnerImage.list({ "organization_id" => "example" })
github_runner_images.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
github_runner_image = client.GithubRunnerImage.create({
  "organization_id" => "example_organization_id", # String
  "image_reference" => "example_image_reference", # String
  "name" => "example_name", # String
})
```


### GithubRunnerPool

Create an instance: `github_runner_pool = client.GithubRunnerPool`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_millicores` | `Integer` |  |
| `enabled` | `Boolean` |  |
| `github_app_installation_id` | `String` |  |
| `github_repository_id` | `String` |  |
| `github_runner_image` | `Object` |  |
| `id` | `String` |  |
| `image` | `Object` | Organization image name or ID; null restores the standard image |
| `invocations` | `Array` |  |
| `label` | `String` |  |
| `last_error` | `Object` |  |
| `last_polled_at` | `Object` |  |
| `max_concurrency` | `Integer` |  |
| `memory_mb` | `Integer` |  |
| `organization_id` | `String` |  |
| `provider` | `String` |  |
| `repository_full_name` | `String` |  |
| `runtime_kind` | `String` |  |
| `timeout_seconds` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of GithubRunnerPool entities, one per record (raises on error).
github_runner_pools = client.GithubRunnerPool.list({ "organization_id" => "example" })
github_runner_pools.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
github_runner_pool = client.GithubRunnerPool.create({
  "organization_id" => "example_organization_id", # String
  "github_app_installation_id" => "example_github_app_installation_id", # String
  "repository_full_name" => "example_repository_full_name", # String
})
```


### GithubRunnerSetup

Create an instance: `github_runner_setup = client.GithubRunnerSetup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `Object` |  |
| `github_repository_connection_id` | `String` |  |
| `id` | `String` |  |
| `pull_request_url` | `Object` |  |
| `repository_full_name` | `String` |  |
| `roder_thread_id` | `Object` |  |
| `runner_labels` | `Array` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `summary` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GithubRunnerSetup record (raises on error).
github_runner_setup = client.GithubRunnerSetup.load({ "id" => "github_runner_setup_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
github_runner_setup = client.GithubRunnerSetup.create({
  "organization_id" => "example_organization_id", # String
  "github_repository_connection_id" => "example_github_repository_connection_id", # String
})
```


### Gitlab

Create an instance: `gitlab = client.Gitlab`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `Boolean` |  |
| `connections` | `Array` |  |
| `integrations` | `Array` |  |
| `inventory_error` | `Object` |  |
| `next_page` | `Object` |  |
| `organization` | `Hash` |  |
| `projects` | `Array` |  |
| `redirect_uri` | `Object` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Gitlab record (raises on error).
gitlab = client.Gitlab.load({ "organization_id" => "organization_id" })
```


### GitlabConnection

Create an instance: `gitlab_connection = client.GitlabConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### GitlabImport

Create an instance: `gitlab_import = client.GitlabImport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `integration_id` | `String` |  |
| `project_id` | `Integer` |  |
| `repo_slug` | `String` |  |
| `source_branch` | `String` |  |

#### Example: Create

```ruby
gitlab_import = client.GitlabImport.create({
  "organization_id" => "example_organization_id", # String
  "integration_id" => "example_integration_id", # String
  "project_id" => 1, # Integer
})
```


### GitlabOauth

Create an instance: `gitlab_oauth = client.GitlabOauth`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GrantAllAgent

Create an instance: `grant_all_agent = client.GrantAllAgent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `all_agents_access` | `Boolean` |  |
| `enabled` | `Boolean` |  |
| `execution_available` | `Boolean` |  |

#### Example: Create

```ruby
grant_all_agent = client.GrantAllAgent.create({
  "device_id" => "example_device_id", # String
  "organization_id" => "example_organization_id", # String
  "enabled" => true, # Boolean
})
```


### HostingAppDomain

Create an instance: `hosting_app_domain = client.HostingAppDomain`

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

#### Example: Create

```ruby
hosting_app_domain = client.HostingAppDomain.create({
  "app_id" => "example_app_id", # String
  "app_service_id" => "example_app_service_id", # Object
  "hostname" => "example_hostname", # String
  "kind" => "example_kind", # String
})
```


### IdentityOrganization

Create an instance: `identity_organization = client.IdentityOrganization`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


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


### ImageRepositoryTag

Create an instance: `image_repository_tag = client.ImageRepositoryTag`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image_repository` | `Hash` |  |
| `name` | `String` |  |
| `registry_url` | `String` |  |
| `tags` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of ImageRepositoryTag entities, one per record (raises on error).
image_repository_tags = client.ImageRepositoryTag.list({ "image_repository_id" => "example" })
image_repository_tags.each { |item| puts item.data_get }
```


### ImportBranchPolicy

Create an instance: `import_branch_policy = client.ImportBranchPolicy`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `Boolean` |  |
| `can_manage_sandbox_region` | `Boolean` |  |
| `dedicated_outbound_ip_addresses` | `Array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `String` |  |
| `organization` | `Hash` |  |
| `sandbox_regions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ImportBranchPolicy record (raises on error).
import_branch_policy = client.ImportBranchPolicy.load({ "organization_id" => "organization_id" })
```


### Integration

Create an instance: `integration = client.Integration`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `Hash` |  |
| `gitlab` | `Hash` |  |
| `permissions` | `Hash` |  |
| `slack` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Integration record (raises on error).
integration = client.Integration.load({ "organization_id" => "organization_id" })
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


### InvocationControl

Create an instance: `invocation_control = client.InvocationControl`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### JobLogChunk

Create an instance: `job_log_chunk = client.JobLogChunk`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `Integer` |  |
| `ci_job_id` | `Object` |  |
| `ci_pipeline_run_id` | `Object` |  |
| `ci_step_id` | `Object` |  |
| `content` | `String` |  |
| `content_format` | `String` |  |
| `created_at` | `String` |  |
| `id` | `String` |  |
| `organization_id` | `String` |  |
| `sequence_number` | `Integer` |  |
| `stream` | `String` |  |
| `updated_at` | `String` |  |

#### Example: List

```ruby
# list returns an Array of JobLogChunk entities, one per record (raises on error).
job_log_chunks = client.JobLogChunk.list({ "job_id" => "example", "pipeline_id" => "example", "run_id" => "example" })
job_log_chunks.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
job_log_chunk = client.JobLogChunk.create({
  "job_id" => "example_job_id", # String
  "pipeline_id" => "example_pipeline_id", # String
  "run_id" => "example_run_id", # String
})
```


### JobStep

Create an instance: `job_step = client.JobStep`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the JobStep record (raises on error).
job_step = client.JobStep.load({ "job_id" => "job_id", "pipeline_id" => "pipeline_id", "run_id" => "run_id" })
```

#### Example: Create

```ruby
job_step = client.JobStep.create({
  "job_id" => "example_job_id", # String
  "pipeline_id" => "example_pipeline_id", # String
  "run_id" => "example_run_id", # String
})
```


### JobWorkspace

Create an instance: `job_workspace = client.JobWorkspace`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the JobWorkspace record (raises on error).
job_workspace = client.JobWorkspace.load({ "job_id" => "job_id", "pipeline_id" => "pipeline_id", "run_id" => "run_id" })
```

#### Example: Create

```ruby
job_workspace = client.JobWorkspace.create({
  "job_id" => "example_job_id", # String
  "pipeline_id" => "example_pipeline_id", # String
  "run_id" => "example_run_id", # String
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


### Known

Create an instance: `known = client.Known`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Label

Create an instance: `label = client.Label`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes_count` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` | Display name |
| `slug` | `String` | Normalized identity used for filtering and lookup. |

#### Example: List

```ruby
# list returns an Array of Label entities, one per record (raises on error).
labels = client.Label.list({ "organization_id" => "example" })
labels.each { |item| puts item.data_get }
```


### LeaseArtifact

Create an instance: `lease_artifact = client.LeaseArtifact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
lease_artifact = client.LeaseArtifact.create({
  "lease_id" => "example_lease_id", # String
  "node_id" => "example_node_id", # String
})
```


### LeaseCache

Create an instance: `lease_cache = client.LeaseCache`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### LeaseLogChunk

Create an instance: `lease_log_chunk = client.LeaseLogChunk`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
lease_log_chunk = client.LeaseLogChunk.create({
  "lease_id" => "example_lease_id", # String
  "node_id" => "example_node_id", # String
})
```


### LeaseReconciliation

Create an instance: `lease_reconciliation = client.LeaseReconciliation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### LeaseStep

Create an instance: `lease_step = client.LeaseStep`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### LeaseVerifyDiagnostic

Create an instance: `lease_verify_diagnostic = client.LeaseVerifyDiagnostic`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_events` | `Hash` |  |
| `live_browser` | `Hash` |  |
| `live_view` | `Hash` | The tester's read-only live stream for page viewers. |
| `steps` | `Array` |  |

#### Example: Create

```ruby
lease_verify_diagnostic = client.LeaseVerifyDiagnostic.create({
  "lease_id" => "example_lease_id", # String
  "swarm_id" => "example_swarm_id", # String
  "task_id" => "example_task_id", # String
  "browser_events" => {}, # Hash
  "live_browser" => {}, # Hash
  "live_view" => {}, # Hash
})
```


### LeaseVerifySecret

Create an instance: `lease_verify_secret = client.LeaseVerifySecret`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
lease_verify_secret = client.LeaseVerifySecret.create({
  "lease_id" => "example_lease_id", # String
  "swarm_id" => "example_swarm_id", # String
  "task_id" => "example_task_id", # String
})
```


### LeaseWorkspace

Create an instance: `lease_workspace = client.LeaseWorkspace`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### LocalAgentDecision

Create an instance: `local_agent_decision = client.LocalAgentDecision`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request` | `Hash` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

#### Example: Create

```ruby
local_agent_decision = client.LocalAgentDecision.create({
  "organization_id" => "example_organization_id", # String
  "request" => {}, # Hash
})
```


### LocalAgentResponse

Create an instance: `local_agent_response = client.LocalAgentResponse`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `Array` |  |
| `model` | `String` |  |
| `service_tier` | `Object` |  |
| `store` | `Boolean` |  |
| `stream` | `Boolean` |  |
| `tools` | `Array` |  |

#### Example: Create

```ruby
local_agent_response = client.LocalAgentResponse.create({
  "organization_id" => "example_organization_id", # String
  "input" => [], # Array
  "model" => "example_model", # String
  "store" => true, # Boolean
  "stream" => true, # Boolean
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


### LogStreamChunk

Create an instance: `log_stream_chunk = client.LogStreamChunk`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LogStreamChunk record (raises on error).
log_stream_chunk = client.LogStreamChunk.load({ "id" => "log_stream_chunk_id", "log_stream_id" => "log_stream_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
log_stream_chunk = client.LogStreamChunk.create({
  "log_stream_id" => "example_log_stream_id", # String
  "space_id" => "example_space_id", # String
})
```


### LogoImage

Create an instance: `logo_image = client.LogoImage`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
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


### MarketingSetting

Create an instance: `marketing_setting = client.MarketingSetting`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `call_first` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MarketingSetting record (raises on error).
marketing_setting = client.MarketingSetting.load()
```


### McpOauth

Create an instance: `mcp_oauth = client.McpOauth`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


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


### MergeQueueEntry

Create an instance: `merge_queue_entry = client.MergeQueueEntry`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `Hash` | Queue performance for the reporting window. |
| `change_id` | `Object` |  |
| `expected_target_commit_id` | `Object` |  |
| `expected_target_version` | `Object` |  |
| `expected_version` | `Integer` |  |
| `github_pr_number` | `Object` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `kind` | `String` |  |
| `policy` | `Hash` |  |
| `priority` | `String` |  |
| `queue` | `Hash` |  |
| `target_branches` | `Array` | Bookmark names for the target picker. |
| `when_ready` | `Object` |  |

#### Example: Create

```ruby
merge_queue_entry = client.MergeQueueEntry.create({
  "merge_queue_id" => "example_merge_queue_id", # String
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "expected_version" => 1, # Integer
  "idempotency_key" => "example_idempotency_key", # String
  "kind" => "example_kind", # String
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


### MergeResolution

Create an instance: `merge_resolution = client.MergeResolution`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `base` | `String` | Common ancestor file contents |
| `content` | `Object` |  |
| `context` | `Hash` | Optional surrounding files keyed by path |
| `duration_ms` | `Integer` |  |
| `fallback` | `Boolean` |  |
| `model` | `String` |  |
| `ours` | `String` | Current / left file contents |
| `path` | `String` | Repository-relative path of the conflicted file |
| `resolved` | `Boolean` |  |
| `theirs` | `String` | Incoming / right file contents |

#### Example: Create

```ruby
merge_resolution = client.MergeResolution.create({
  "base" => "example_base", # String
  "ours" => "example_ours", # String
  "theirs" => "example_theirs", # String
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MetricQuery record (raises on error).
metric_query = client.MetricQuery.load()
```


### MetronomeWebhook

Create an instance: `metronome_webhook = client.MetronomeWebhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
metronome_webhook = client.MetronomeWebhook.create({
})
```


### ModelSubscriptionAccount

Create an instance: `model_subscription_account = client.ModelSubscriptionAccount`

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
| `accounts` | `Array` |  |
| `agents` | `Array` |  |
| `can_disconnect` | `Boolean` |  |
| `connection_agent` | `Object` |  |
| `email` | `String` |  |
| `id` | `String` |  |
| `label` | `String` |  |
| `provider` | `String` |  |
| `saved` | `Boolean` |  |
| `status` | `String` |  |
| `usable` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of ModelSubscriptionAccount entities, one per record (raises on error).
model_subscription_accounts = client.ModelSubscriptionAccount.list
model_subscription_accounts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
model_subscription_account = client.ModelSubscriptionAccount.create({
  "label" => "example_label", # String
})
```


### ModelSubscriptionAccountConnection

Create an instance: `model_subscription_account_connection = client.ModelSubscriptionAccountConnection`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ModelSubscriptionAccountConnection record (raises on error).
model_subscription_account_connection = client.ModelSubscriptionAccountConnection.load({ "id" => "model_subscription_account_connection_id" })
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


### NetworkingSpace

Create an instance: `networking_space = client.NetworkingSpace`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NetworkingSpace record (raises on error).
networking_space = client.NetworkingSpace.load({ "id" => "networking_space_id" })
```

#### Example: Create

```ruby
networking_space = client.NetworkingSpace.create({
})
```


### Node

Create an instance: `node = client.Node`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `Object` |  |
| `account_id` | `Object` |  |
| `account_login` | `String` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `id` | `String` |  |
| `installation_id` | `String` |  |
| `installed_at` | `Object` |  |
| `installed_at_label` | `Object` |  |
| `manage_access_url` | `String` |  |
| `organization_id` | `String` |  |
| `permission_entries` | `Array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Hash` |  |
| `status` | `String` |  |
| `suspended_at` | `Object` |  |
| `suspended_at_label` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of Node entities, one per record (raises on error).
nodes = client.Node.list({ "organization_id" => "example" })
nodes.each { |item| puts item.data_get }
```


### NodeCertificate

Create an instance: `node_certificate = client.NodeCertificate`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### NodeLease

Create an instance: `node_lease = client.NodeLease`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NodeLease record (raises on error).
node_lease = client.NodeLease.load({ "node_id" => "node_id" })
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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NomadLog record (raises on error).
nomad_log = client.NomadLog.load({ "app_id" => "app_id" })
```


### Now

Create an instance: `now = client.Now`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `needs_attention` | `Array` |  |
| `pagination` | `Hash` |  |
| `recently_landed` | `Array` |  |
| `shipping_now` | `Array` |  |
| `summary` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Now record (raises on error).
now = client.Now.load({ "organization_id" => "organization_id" })
```


### ObservabilityClickhouseCluster

Create an instance: `observability_clickhouse_cluster = client.ObservabilityClickhouseCluster`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ObservabilityClickhouseCluster record (raises on error).
observability_clickhouse_cluster = client.ObservabilityClickhouseCluster.load({ "id" => "observability_clickhouse_cluster_id" })
```

#### Example: Create

```ruby
observability_clickhouse_cluster = client.ObservabilityClickhouseCluster.create({
})
```


### ObservabilityQuickwitCluster

Create an instance: `observability_quickwit_cluster = client.ObservabilityQuickwitCluster`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ObservabilityQuickwitCluster record (raises on error).
observability_quickwit_cluster = client.ObservabilityQuickwitCluster.load({ "id" => "observability_quickwit_cluster_id" })
```

#### Example: Create

```ruby
observability_quickwit_cluster = client.ObservabilityQuickwitCluster.create({
})
```


### ObservabilitySpace

Create an instance: `observability_space = client.ObservabilitySpace`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ObservabilitySpace record (raises on error).
observability_space = client.ObservabilitySpace.load({ "id" => "observability_space_id" })
```

#### Example: Create

```ruby
observability_space = client.ObservabilitySpace.create({
})
```


### Openapi

Create an instance: `openapi = client.Openapi`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Openapi record (raises on error).
openapi = client.Openapi.load()
```


### OrgInvitation

Create an instance: `org_invitation = client.OrgInvitation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `invitation` | `Hash` |  |
| `registration_options` | `Object` |  |
| `requires_password_setup` | `Boolean` |  |
| `start_guided_setup` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrgInvitation record (raises on error).
org_invitation = client.OrgInvitation.load({ "id" => "org_invitation_id" })
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


### OrganizationApp

Create an instance: `organization_app = client.OrganizationApp`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationApp record (raises on error).
organization_app = client.OrganizationApp.load({ "organization_id" => "organization_id", "native_agent_id" => "native_agent_id" })
```


### OrganizationControl

Create an instance: `organization_control = client.OrganizationControl`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationDevice

Create an instance: `organization_device = client.OrganizationDevice`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### OrganizationIdentityCertificate

Create an instance: `organization_identity_certificate = client.OrganizationIdentityCertificate`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationIdentityCertificate record (raises on error).
organization_identity_certificate = client.OrganizationIdentityCertificate.load({ "id" => "organization_identity_certificate_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
organization_identity_certificate = client.OrganizationIdentityCertificate.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationInteraction

Create an instance: `organization_interaction = client.OrganizationInteraction`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
organization_interaction = client.OrganizationInteraction.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationInvitation

Create an instance: `organization_invitation = client.OrganizationInvitation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `id` | `String` |  |
| `role` | `String` |  |

#### Example: Create

```ruby
organization_invitation = client.OrganizationInvitation.create({
  "organization_id" => "example_organization_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
```


### OrganizationMessageFile

Create an instance: `organization_message_file = client.OrganizationMessageFile`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
organization_message_file = client.OrganizationMessageFile.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationOidcTrust

Create an instance: `organization_oidc_trust = client.OrganizationOidcTrust`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationOidcTrust record (raises on error).
organization_oidc_trust = client.OrganizationOidcTrust.load({ "id" => "organization_oidc_trust_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
organization_oidc_trust = client.OrganizationOidcTrust.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationRunEvent

Create an instance: `organization_run_event = client.OrganizationRunEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
organization_run_event = client.OrganizationRunEvent.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationRunOutcome

Create an instance: `organization_run_outcome = client.OrganizationRunOutcome`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
organization_run_outcome = client.OrganizationRunOutcome.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationRunUsage

Create an instance: `organization_run_usage = client.OrganizationRunUsage`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
organization_run_usage = client.OrganizationRunUsage.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationSandbox

Create an instance: `organization_sandbox = client.OrganizationSandbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationSecret

Create an instance: `organization_secret = client.OrganizationSecret`

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
| `created_at_label` | `Object` |  |
| `created_by` | `Object` |  |
| `current_version` | `Object` |  |
| `description` | `Object` |  |
| `env_key` | `String` |  |
| `expose_to_build` | `Boolean` |  |
| `expose_to_ci` | `Boolean` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` |  |
| `last_accessed_at` | `Object` |  |
| `last_accessed_at_label` | `Object` |  |
| `last_accessed_by` | `Object` |  |
| `latest_version_number` | `Object` |  |
| `name` | `String` |  |
| `organization_id` | `Object` |  |
| `owner_service_account_id` | `Object` |  |
| `rotation_policy` | `Object` |  |
| `scope_kind` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationSecret record (raises on error).
organization_secret = client.OrganizationSecret.load({ "id" => "organization_secret_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of OrganizationSecret entities, one per record (raises on error).
organization_secrets = client.OrganizationSecret.list({ "organization_id" => "example" })
organization_secrets.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
organization_secret = client.OrganizationSecret.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationServiceAccount

Create an instance: `organization_service_account = client.OrganizationServiceAccount`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationServiceAccount record (raises on error).
organization_service_account = client.OrganizationServiceAccount.load({ "id" => "organization_service_account_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
organization_service_account = client.OrganizationServiceAccount.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationSetting

Create an instance: `organization_setting = client.OrganizationSetting`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `concurrent_run_limit_override` | `Object` |  |
| `customize_onboarding_packages` | `Boolean` |  |
| `daily_run_limit_override` | `Object` |  |
| `deployment_usage_visibility` | `String` |  |
| `monthly_browser_minutes_limit_override` | `Object` |  |
| `monthly_budget_dollars` | `Object` |  |
| `name` | `String` |  |
| `onboarding_custom_pricing` | `Boolean` |  |
| `onboarding_package_keys` | `Array` |  |


### OrganizationSite

Create an instance: `organization_site = client.OrganizationSite`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationSite record (raises on error).
organization_site = client.OrganizationSite.load({ "organization_id" => "organization_id", "native_agent_id" => "native_agent_id" })
```

#### Example: Create

```ruby
organization_site = client.OrganizationSite.create({
  "organization_id" => "example_organization_id", # String
})
```


### OrganizationSubscription

Create an instance: `organization_subscription = client.OrganizationSubscription`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationTool

Create an instance: `organization_tool = client.OrganizationTool`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Hash` |  |
| `native_agent_id` | `String` |  |
| `tool` | `String` |  |

#### Example: Create

```ruby
organization_tool = client.OrganizationTool.create({
  "organization_id" => "example_organization_id", # String
  "arguments" => {}, # Hash
  "native_agent_id" => "example_native_agent_id", # String
  "tool" => "example_tool", # String
})
```


### OrganizationWorkloadIdentity

Create an instance: `organization_workload_identity = client.OrganizationWorkloadIdentity`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationWorkloadIdentity record (raises on error).
organization_workload_identity = client.OrganizationWorkloadIdentity.load({ "id" => "organization_workload_identity_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
organization_workload_identity = client.OrganizationWorkloadIdentity.create({
  "organization_id" => "example_organization_id", # String
})
```


### OtelIngest

Create an instance: `otel_ingest = client.OtelIngest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PageAgent record (raises on error).
page_agent = client.PageAgent.load({ "organization_id" => "organization_id" })
```


### PageArtefact

Create an instance: `page_artefact = client.PageArtefact`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artefact` | `Object` |  |
| `automation` | `Object` |  |
| `automation_invocation_id` | `Object` |  |
| `byte_size` | `Integer` |  |
| `checksum_sha256` | `String` |  |
| `comment_threads` | `Array` |  |
| `content_type` | `String` |  |
| `created_at` | `Object` |  |
| `created_by_user_id` | `Object` |  |
| `description` | `Object` |  |
| `document_key` | `String` | Stable document identity shared by all revisions. |
| `draft` | `Object` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` | `String` |  |
| `expires_at` | `Object` |  |
| `filename` | `String` |  |
| `files` | `Array` |  |
| `harness` | `Object` |  |
| `harness_version` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `kinds` | `Array` |  |
| `model` | `Object` |  |
| `organization` | `Hash` |  |
| `organization_id` | `String` |  |
| `pagination` | `Hash` |  |
| `permissions` | `Hash` |  |
| `preview` | `Hash` |  |
| `published_at` | `Object` |  |
| `published_at_label` | `Object` |  |
| `publisher` | `Object` |  |
| `repository` | `Object` |  |
| `repository_id` | `Object` |  |
| `selected_path` | `String` |  |
| `slug` | `String` |  |
| `source` | `String` |  |
| `status` | `String` |  |
| `title` | `String` |  |
| `vcs_agent_checkpoint_id` | `Object` |  |
| `vcs_agent_session_id` | `Object` |  |
| `version` | `Integer` |  |
| `versions` | `Array` |  |
| `view_url` | `String` |  |
| `web_url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PageArtefact record (raises on error).
page_artefact = client.PageArtefact.load({ "id" => "page_artefact_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of PageArtefact entities, one per record (raises on error).
page_artefacts = client.PageArtefact.list({ "organization_id" => "example" })
page_artefacts.each { |item| puts item.data_get }
```


### PageCiPipelineRun

Create an instance: `page_ci_pipeline_run = client.PageCiPipelineRun`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `Object` |  |
| `id` | `String` |  |
| `jobs` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PageCiPipelineRun record (raises on error).
page_ci_pipeline_run = client.PageCiPipelineRun.load({ "id" => "page_ci_pipeline_run_id", "pipeline_id" => "pipeline_id" })
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


### PageRepoVcCommit

Create an instance: `page_repo_vc_commit = client.PageRepoVcCommit`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `Object` |  |
| `diff_path` | `String` | Fingerprinted path serving this commit range's file diff. |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PageRepoVcCommit record (raises on error).
page_repo_vc_commit = client.PageRepoVcCommit.load({ "id" => "page_repo_vc_commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### PagesBilling

Create an instance: `pages_billing = client.PagesBilling`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `Array` |  |
| `breakdown` | `Object` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `Object` |  |
| `can_manage_contact` | `Boolean` |  |
| `can_manage_extra_spend` | `Boolean` |  |
| `can_manage_local_subscription` | `Boolean` |  |
| `can_manage_payment_method` | `Boolean` |  |
| `can_set_up_billing` | `Boolean` |  |
| `customer` | `Object` |  |
| `deployment_usage_visible` | `Boolean` |  |
| `entitlements` | `Hash` |  |
| `extra_spend_enabled` | `Boolean` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `Boolean` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `String` |  |
| `package` | `Object` |  |
| `prepaid` | `Object` |  |
| `preview` | `Object` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `Hash` |  |
| `stripe` | `Hash` |  |
| `subscription` | `Object` |  |
| `token_account` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PagesBilling record (raises on error).
pages_billing = client.PagesBilling.load({ "organization_id" => "organization_id" })
```


### PagesGithubOnboarding

Create an instance: `pages_github_onboarding = client.PagesGithubOnboarding`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `onboarding` | `Hash` |  |
| `organization` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PagesGithubOnboarding record (raises on error).
pages_github_onboarding = client.PagesGithubOnboarding.load({ "organization_id" => "organization_id" })
```


### PagesMember

Create an instance: `pages_member = client.PagesMember`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
# list returns an Array of PagesMember entities, one per record (raises on error).
pages_members = client.PagesMember.list({ "organization_id" => "example" })
pages_members.each { |item| puts item.data_get }
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
| `access_mode` | `String` |  |
| `active_run_count` | `Integer` |  |
| `archived_at` | `Object` |  |
| `attention` | `Array` | What needs an operator's eye, problems before notices |
| `capabilities` | `Object` |  |
| `created_at` | `String` |  |
| `credential` | `Object` |  |
| `credential_id` | `Object` | The credential this persona signs in with. |
| `goals` | `Object` |  |
| `health` | `Hash` |  |
| `id` | `String` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `project_id` | `String` |  |
| `role` | `String` |  |
| `scenario_count` | `Integer` |  |
| `updated_at` | `String` |  |

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
| `archived_at` | `Object` |  |
| `browser_seconds` | `Object` |  |
| `can_archive` | `Boolean` |  |
| `can_restore` | `Boolean` |  |
| `cleanup_state` | `String` |  |
| `commit_sha` | `Object` |  |
| `created_at` | `String` |  |
| `duration_seconds` | `Object` |  |
| `environment_name` | `Object` |  |
| `finished_at` | `Object` |  |
| `id` | `String` |  |
| `outcome` | `Object` |  |
| `pull_request` | `Object` |  |
| `pull_request_label` | `Object` |  |
| `scenario_count` | `Integer` |  |
| `source_run` | `Object` |  |
| `started_at` | `Object` |  |
| `state` | `String` |  |
| `title` | `String` |  |
| `trigger_kind` | `String` |  |
| `triggered_by` | `Object` |  |
| `web_path` | `String` |  |

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


### PagesRegistry

Create an instance: `pages_registry = client.PagesRegistry`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_repository_count` | `Integer` |  |
| `error` | `Object` |  |
| `pagination` | `Hash` |  |
| `repositories` | `Array` |  |
| `repository_count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PagesRegistry record (raises on error).
pages_registry = client.PagesRegistry.load({ "organization_id" => "organization_id" })
```


### PagesSession

Create an instance: `pages_session = client.PagesSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `String` |  |
| `created_at` | `Object` |  |
| `cursor` | `String` |  |
| `ended_at` | `Object` |  |
| `external_session_id` | `String` |  |
| `facets` | `Hash` |  |
| `from` | `String` |  |
| `github_access_warnings` | `Array` |  |
| `harness` | `String` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `String` |  |
| `last_activity_at` | `Object` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `Object` |  |
| `limit` | `Integer` |  |
| `markers` | `Array` |  |
| `max_bytes` | `Integer` |  |
| `mode` | `String` |  |
| `offset` | `Integer` |  |
| `pagination` | `Hash` |  |
| `query` | `String` |  |
| `repo` | `String` |  |
| `repository` | `Object` |  |
| `search` | `Object` |  |
| `search_enabled` | `Boolean` |  |
| `session` | `Object` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` | `Array` |  |
| `started_at` | `Object` |  |
| `stats` | `Hash` |  |
| `status` | `String` |  |
| `title` | `Object` |  |
| `to` | `String` |  |
| `token_stats` | `Object` |  |
| `transcript_index` | `Object` |  |
| `transcript_stats` | `Object` |  |
| `updated_at` | `Object` |  |
| `user` | `Object` |  |
| `user_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PagesSession record (raises on error).
pages_session = client.PagesSession.load({ "id" => "pages_session_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of PagesSession entities, one per record (raises on error).
pages_sessions = client.PagesSession.list({ "organization_id" => "example" })
pages_sessions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
pages_session = client.PagesSession.create({
  "organization_id" => "example_organization_id", # String
})
```


### Pairing

Create an instance: `pairing = client.Pairing`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Pairing record (raises on error).
pairing = client.Pairing.load({ "id" => "pairing_id" })
```

#### Example: Create

```ruby
pairing = client.Pairing.create({
})
```


### PairingEvent

Create an instance: `pairing_event = client.PairingEvent`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PairingEvent record (raises on error).
pairing_event = client.PairingEvent.load({ "pairing_id" => "pairing_id" })
```


### ParallelV1

Create an instance: `parallel_v1 = client.ParallelV1`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PatchsetDiff

Create an instance: `patchset_diff = client.PatchsetDiff`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `Array` |  |
| `id` | `String` |  |
| `patchset` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PatchsetDiff record (raises on error).
patchset_diff = client.PatchsetDiff.load({ "id" => "patchset_diff_id", "change_id" => "change_id", "organization_id" => "organization_id", "patchset_id" => "patchset_id", "repo_id" => "repo_id" })
```


### PersonalAccessToken

Create an instance: `personal_access_token = client.PersonalAccessToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PersonalAccessToken record (raises on error).
personal_access_token = client.PersonalAccessToken.load({ "id" => "personal_access_token_id" })
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
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PreviewOperation record (raises on error).
preview_operation = client.PreviewOperation.load({ "app_id" => "app_id", "preview_id" => "preview_id" })
```


### PreviewProfileSecretBinding

Create an instance: `preview_profile_secret_binding = client.PreviewProfileSecretBinding`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `String` |  |
| `id` | `String` |  |
| `mode` | `String` |  |
| `secret_id` | `String` |  |
| `secret_version_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PreviewProfileSecretBinding record (raises on error).
preview_profile_secret_binding = client.PreviewProfileSecretBinding.load({ "app_id" => "app_id", "preview_profile_id" => "preview_profile_id" })
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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PreviewSharingApproval record (raises on error).
preview_sharing_approval = client.PreviewSharingApproval.load({ "app_id" => "app_id", "preview_id" => "preview_id" })
```

#### Example: Create

```ruby
preview_sharing_approval = client.PreviewSharingApproval.create({
  "app_id" => "example_app_id", # String
  "preview_id" => "example_preview_id", # String
  "snapshot_version" => 1, # Integer
})
```


### ProactiveAgentWaitlistEntry

Create an instance: `proactive_agent_waitlist_entry = client.ProactiveAgentWaitlistEntry`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `first_task` | `Object` | The first job they would hand an agent. |
| `invite_code` | `Object` | The referral code of the invite link they arrived through. |
| `places_per_referral` | `Integer` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | `Integer` | 1-based place in the queue. |
| `position_after_next_referral` | `Integer` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | `String` | Shared in this entry's invite link. |
| `referral_count` | `Integer` | People who joined through this entry's link. |
| `total` | `Integer` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | `Object` | Honeypot. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProactiveAgentWaitlistEntry record (raises on error).
proactive_agent_waitlist_entry = client.ProactiveAgentWaitlistEntry.load({ "id" => "proactive_agent_waitlist_entry_id" })
```

#### Example: Create

```ruby
proactive_agent_waitlist_entry = client.ProactiveAgentWaitlistEntry.create({
  "email" => "example_email", # String
})
```


### Product

Create an instance: `product = client.Product`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `Array` | Products this organization has activated (PRD 144). |
| `agents_only` | `Boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `Boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `github_prs_authored_by_change_author` | `Boolean` |  |
| `id` | `String` |  |
| `logo_url` | `Object` |  |
| `member_count` | `Integer` |  |
| `name` | `String` |  |
| `pending_invitation_count` | `Integer` |  |
| `personal` | `Boolean` |  |
| `product` | `String` |  |
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

#### Example: Create

```ruby
product = client.Product.create({
  "organization_id" => "example_organization_id", # String
  "product" => "example_product", # String
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
| `environment_ids` | `Array` |  |
| `id` | `String` |  |
| `lock_version` | `Integer` |  |
| `name` | `String` |  |
| `persona_ids` | `Array` |  |
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
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectScenarioOption record (raises on error).
project_scenario_option = client.ProjectScenarioOption.load({ "organization_id" => "organization_id", "project_id" => "project_id" })
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `Array` |  |
| `messaging_conversations` | `Array` |  |
| `messaging_enabled` | `Boolean` |  |
| `permissions` | `Hash` |  |
| `project` | `Hash` |  |
| `tester_numbers` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProjectSetting record (raises on error).
project_setting = client.ProjectSetting.load({ "organization_id" => "organization_id", "project_id" => "project_id" })
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


### PullRequestAction

Create an instance: `pull_request_action = client.PullRequestAction`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_name` | `String` |  |
| `body` | `String` |  |
| `comment_id` | `String` |  |
| `comments` | `Array` |  |
| `event` | `String` |  |
| `expected_head_sha` | `String` |  |
| `id` | `Object` |  |
| `label` | `String` |  |
| `line` | `Integer` |  |
| `node_id` | `Object` |  |
| `operation_key` | `String` |  |
| `path` | `String` |  |
| `run_id` | `String` |  |
| `side` | `String` |  |
| `start_line` | `Integer` |  |
| `start_side` | `String` |  |
| `thread_id` | `String` |  |

#### Example: Create

```ruby
pull_request_action = client.PullRequestAction.create({
  "number" => "example_number", # String
  "organization_id" => "example_organization_id", # String
  "pull_request_id" => "example_pull_request_id", # String
  "action_name" => "example_action_name", # String
  "operation_key" => "example_operation_key", # String
})
```


### PullRequestMagicMerge

Create an instance: `pull_request_magic_merge = client.PullRequestMagicMerge`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PullRequestSetting

Create an instance: `pull_request_setting = client.PullRequestSetting`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PullRequestSetting record (raises on error).
pull_request_setting = client.PullRequestSetting.load({ "organization_id" => "organization_id" })
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


### PullRequestTranscript

Create an instance: `pull_request_transcript = client.PullRequestTranscript`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `String` |  |
| `created_at` | `Object` |  |
| `ended_at` | `Object` |  |
| `external_session_id` | `String` |  |
| `harness` | `String` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `String` |  |
| `last_activity_at` | `Object` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `Object` |  |
| `repository` | `Object` |  |
| `started_at` | `Object` |  |
| `stats` | `Hash` |  |
| `status` | `String` |  |
| `title` | `Object` |  |
| `updated_at` | `Object` |  |
| `user` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of PullRequestTranscript entities, one per record (raises on error).
pull_request_transcripts = client.PullRequestTranscript.list({ "organization_id" => "example", "pull_request_id" => "example", "repo_id" => "example" })
pull_request_transcripts.each { |item| puts item.data_get }
```


### PullZone

Create an instance: `pull_zone = client.PullZone`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `name` | `String` |  |
| `slug` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PullZone entities, one per record (raises on error).
pull_zones = client.PullZone.list({ "organization_id" => "example" })
pull_zones.each { |item| puts item.data_get }
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


### RelayAgentConnection

Create an instance: `relay_agent_connection = client.RelayAgentConnection`

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
# load returns the ENTITY — call data_get for the RelayAgentConnection record (raises on error).
relay_agent_connection = client.RelayAgentConnection.load({ "id" => "relay_agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of RelayAgentConnection entities, one per record (raises on error).
relay_agent_connections = client.RelayAgentConnection.list({ "agent_id" => "example", "organization_id" => "example" })
relay_agent_connections.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
relay_agent_connection = client.RelayAgentConnection.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "agent_card_url" => "example_agent_card_url", # String
  "auth_scheme" => "example_auth_scheme", # String
  "name" => "example_name", # String
})
```


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


### RelaySignal

Create an instance: `relay_signal = client.RelaySignal`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
relay_signal = client.RelaySignal.create({
})
```


### ReleaseRollout

Create an instance: `release_rollout = client.ReleaseRollout`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ReleaseRollout record (raises on error).
release_rollout = client.ReleaseRollout.load({ "id" => "release_rollout_id", "release_id" => "release_id" })
```

#### Example: Create

```ruby
release_rollout = client.ReleaseRollout.create({
  "release_id" => "example_release_id", # String
})
```


### Repo

Create an instance: `repo = client.Repo`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_retry_import` | `Boolean` | True when a failed client import can be requeued for CLI resume. |
| `can_retry_sync` | `Boolean` | True when the latest sync run failed and can be retried. |
| `disclaimer` | `Object` |  |
| `federated_in_home` | `Boolean` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` | `Object` |  |
| `icon_name` | `String` |  |
| `id` | `String` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` | `Object` |  |
| `is_home` | `Boolean` |  |
| `name` | `String` |  |
| `remote_repository` | `Object` |  |
| `root_path` | `Object` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` | `String` |  |
| `sync_error_message` | `Object` |  |
| `sync_provider` | `String` |  |
| `sync_status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Repo entities, one per record (raises on error).
repos = client.Repo.list({ "organization_id" => "example" })
repos.each { |item| puts item.data_get }
```


### RepoAccessToken

Create an instance: `repo_access_token = client.RepoAccessToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `Hash` |  |
| `active` | `Boolean` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `credential_purpose` | `String` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` | `Object` |  |
| `expires_at_label` | `Object` |  |
| `expires_in_days` | `Object` |  |
| `id` | `String` |  |
| `last_used_at` | `Object` |  |
| `last_used_at_label` | `Object` |  |
| `name` | `String` |  |
| `permission_level` | `String` |  |
| `plain_text_token` | `String` |  |
| `revoked_at` | `Object` |  |
| `revoked_at_label` | `Object` |  |
| `token_preview` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of RepoAccessToken entities, one per record (raises on error).
repo_access_tokens = client.RepoAccessToken.list({ "organization_id" => "example", "repo_id" => "example" })
repo_access_tokens.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
repo_access_token = client.RepoAccessToken.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "name" => "example_name", # String
})
```


### RepoAction

Create an instance: `repo_action = client.RepoAction`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pipeline` | `Hash` |  |
| `run` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of RepoAction entities, one per record (raises on error).
repo_actions = client.RepoAction.list({ "organization_id" => "example", "repo_id" => "example" })
repo_actions.each { |item| puts item.data_get }
```


### RepoAgentCheckpoint

Create an instance: `repo_agent_checkpoint = client.RepoAgentCheckpoint`

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
# load returns the ENTITY — call data_get for the RepoAgentCheckpoint record (raises on error).
repo_agent_checkpoint = client.RepoAgentCheckpoint.load({ "id" => "repo_agent_checkpoint_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### RepoAgentSession

Create an instance: `repo_agent_session = client.RepoAgentSession`

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
| `adapter` | `String` |  |
| `agent_session` | `Hash` |  |
| `external_session_id` | `String` |  |
| `id` | `String` |  |
| `status` | `String` |  |
| `title` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepoAgentSession record (raises on error).
repo_agent_session = client.RepoAgentSession.load({ "id" => "repo_agent_session_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: Create

```ruby
repo_agent_session = client.RepoAgentSession.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### RepoBookmarkProtection

Create an instance: `repo_bookmark_protection = client.RepoBookmarkProtection`

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
| `actor_policy` | `Hash` |  |
| `bypass_mode` | `String` |  |
| `created_at` | `String` |  |
| `created_by_user_id` | `Object` |  |
| `enabled` | `Boolean` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `priority` | `Integer` |  |
| `repository_id` | `String` |  |
| `requirements` | `Hash` |  |
| `target_kind` | `String` |  |
| `target_pattern` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_by_user_id` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepoBookmarkProtection record (raises on error).
repo_bookmark_protection = client.RepoBookmarkProtection.load({ "id" => "repo_bookmark_protection_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of RepoBookmarkProtection entities, one per record (raises on error).
repo_bookmark_protections = client.RepoBookmarkProtection.list({ "organization_id" => "example", "repo_id" => "example" })
repo_bookmark_protections.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
repo_bookmark_protection = client.RepoBookmarkProtection.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### RepoBookmarkProtectionEvent

Create an instance: `repo_bookmark_protection_event = client.RepoBookmarkProtectionEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `actor_kind` | `String` |  |
| `actor_label` | `Object` |  |
| `actor_user_id` | `Object` |  |
| `bookmark_name` | `String` |  |
| `bookmark_protection_rule_id` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `decision` | `String` |  |
| `id` | `String` |  |
| `intent` | `Object` |  |
| `metadata` | `Hash` |  |
| `new_target` | `Object` |  |
| `old_target` | `Object` |  |
| `organization_id` | `String` |  |
| `reason_codes` | `Array` |  |
| `repository_id` | `String` |  |
| `source_request_id` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of RepoBookmarkProtectionEvent entities, one per record (raises on error).
repo_bookmark_protection_events = client.RepoBookmarkProtectionEvent.list({ "organization_id" => "example", "repo_id" => "example" })
repo_bookmark_protection_events.each { |item| puts item.data_get }
```


### RepoCloudWorkspaceBackup

Create an instance: `repo_cloud_workspace_backup = client.RepoCloudWorkspaceBackup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepoCloudWorkspaceBackup record (raises on error).
repo_cloud_workspace_backup = client.RepoCloudWorkspaceBackup.load({ "id" => "repo_cloud_workspace_backup_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: Create

```ruby
repo_cloud_workspace_backup = client.RepoCloudWorkspaceBackup.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### RepoCodeRule

Create an instance: `repo_code_rule = client.RepoCodeRule`

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
| `active_revision_number` | `Object` |  |
| `capabilities` | `Hash` |  |
| `code_rule` | `Object` |  |
| `created_at` | `String` |  |
| `definition` | `Hash` |  |
| `draft_pending` | `Boolean` | The latest revision is not the active one |
| `enabled` | `Boolean` |  |
| `expected_version` | `Integer` |  |
| `id` | `String` |  |
| `latest_revision_number` | `Integer` |  |
| `name` | `String` | Name of the latest revision |
| `repository` | `Hash` |  |
| `scope` | `Array` |  |
| `slug` | `String` |  |
| `state_version` | `Integer` | Send back as expected_version on every mutation |
| `updated_at` | `String` |  |
| `web_url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepoCodeRule record (raises on error).
repo_code_rule = client.RepoCodeRule.load({ "id" => "repo_code_rule_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of RepoCodeRule entities, one per record (raises on error).
repo_code_rules = client.RepoCodeRule.list({ "organization_id" => "example", "repo_id" => "example" })
repo_code_rules.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
repo_code_rule = client.RepoCodeRule.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "definition" => {}, # Hash
})
```


### RepoSetting

Create an instance: `repo_setting = client.RepoSetting`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `description` | `Object` |  |
| `expires_at` | `Object` |  |
| `expires_at_label` | `Object` |  |
| `icon_name` | `String` |  |
| `id` | `String` |  |
| `last_used_at` | `Object` |  |
| `last_used_at_label` | `Object` |  |
| `merge_authority` | `String` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `permission_level` | `String` |  |
| `revoked_at` | `Object` |  |
| `revoked_at_label` | `Object` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `token_preview` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of RepoSetting entities, one per record (raises on error).
repo_settings = client.RepoSetting.list({ "organization_id" => "example", "repo_id" => "example" })
repo_settings.each { |item| puts item.data_get }
```


### RepoStat

Create an instance: `repo_stat = client.RepoStat`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repository_stats` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of RepoStat entities, one per record (raises on error).
repo_stats = client.RepoStat.list({ "organization_id" => "example", "repo_id" => "example" })
repo_stats.each { |item| puts item.data_get }
```


### RepoVc

Create an instance: `repo_vc = client.RepoVc`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |


### RepoVcCommit

Create an instance: `repo_vc_commit = client.RepoVcCommit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` |  |
| `target_commit_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of RepoVcCommit entities, one per record (raises on error).
repo_vc_commits = client.RepoVcCommit.list({ "organization_id" => "example", "repo_id" => "example", "ref" => "example" })
repo_vc_commits.each { |item| puts item.data_get }
```


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


### RepositoryAccess

Create an instance: `repository_access = client.RepositoryAccess`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### RepositoryAccessResolve

Create an instance: `repository_access_resolve = client.RepositoryAccessResolve`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `String` |  |
| `git_auth_username` | `String` |  |
| `git_https_clone_url` | `Object` |  |
| `git_https_supported` | `Boolean` |  |
| `github_access_warnings` | `Array` |  |
| `id` | `String` |  |
| `membership_role` | `String` |  |
| `organization_id` | `String` |  |
| `organization_name` | `String` |  |
| `organization_slug` | `String` |  |
| `repository_id` | `String` |  |
| `repository_name` | `String` |  |
| `repository_slug` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepositoryAccessResolve record (raises on error).
repository_access_resolve = client.RepositoryAccessResolve.load({ "id" => "repository_access_resolve_id", "resolve_id" => "resolve_id" })
```


### RepositoryEvent

Create an instance: `repository_event = client.RepositoryEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RepositoryImport

Create an instance: `repository_import = client.RepositoryImport`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_connections` | `Boolean` |  |
| `github_imports` | `Array` |  |
| `github_installations` | `Array` |  |
| `gitlab_configured` | `Boolean` |  |
| `gitlab_imports` | `Array` |  |
| `gitlab_integrations` | `Array` |  |
| `gitlab_redirect_uri` | `Object` |  |
| `gitlab_self_managed_available` | `Boolean` |  |
| `inventory_errors` | `Array` |  |
| `organization_id` | `String` |  |
| `repositories` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepositoryImport record (raises on error).
repository_import = client.RepositoryImport.load({ "organization_id" => "organization_id" })
```


### RepositoryImportSession

Create an instance: `repository_import_session = client.RepositoryImportSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_required` | `String` |  |
| `authorization_endpoint` | `String` |  |
| `can_authorize_github` | `Boolean` |  |
| `client_name` | `Object` |  |
| `client_version` | `Object` |  |
| `created_at` | `String` |  |
| `error_message` | `Object` |  |
| `expires_at` | `String` |  |
| `git_imports` | `Array` |  |
| `github_app_installation_id` | `Object` |  |
| `github_connected` | `Boolean` |  |
| `id` | `String` |  |
| `idempotency_key` | `String` |  |
| `organization_id` | `String` |  |
| `organization_slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepositoryImportSession record (raises on error).
repository_import_session = client.RepositoryImportSession.load({ "id" => "repository_import_session_id" })
```

#### Example: Create

```ruby
repository_import_session = client.RepositoryImportSession.create({
  "organization_id" => "example_organization_id", # String
  "idempotency_key" => "example_idempotency_key", # String
})
```


### RepositoryImportSessionRepository

Create an instance: `repository_import_session_repository = client.RepositoryImportSessionRepository`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `Object` |  |
| `full_name` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `private` | `Boolean` |  |
| `reason` | `Object` |  |
| `selectable` | `Boolean` |  |
| `status` | `String` |  |
| `visibility` | `String` |  |

#### Example: List

```ruby
# list returns an Array of RepositoryImportSessionRepository entities, one per record (raises on error).
repository_import_session_repositorys = client.RepositoryImportSessionRepository.list({ "repository_import_session_id" => "example" })
repository_import_session_repositorys.each { |item| puts item.data_get }
```


### RepositoryImportSessionSelection

Create an instance: `repository_import_session_selection = client.RepositoryImportSessionSelection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repositories` | `Object` |  |

#### Example: Create

```ruby
repository_import_session_selection = client.RepositoryImportSessionSelection.create({
  "repository_import_session_id" => "example_repository_import_session_id", # String
  "repositories" => "example_repositories", # Object
})
```


### RepositorySandboxEnvironment

Create an instance: `repository_sandbox_environment = client.RepositorySandboxEnvironment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RepositorySandboxEnvironment record (raises on error).
repository_sandbox_environment = client.RepositorySandboxEnvironment.load({ "id" => "repository_sandbox_environment_id", "repository_id" => "repository_id" })
```


### RoderCodeRepair

Create an instance: `roder_code_repair = client.RoderCodeRepair`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `String` |  |
| `cancel_requested` | `Boolean` |  |
| `failure_code` | `Object` |  |
| `id` | `String` |  |
| `launch_state` | `String` |  |
| `organization_id` | `String` |  |
| `repository_slug` | `String` |  |
| `roder_thread_id` | `Object` |  |
| `roder_turn_id` | `Object` |  |
| `scenario_run_id` | `String` |  |
| `task` | `Object` |  |
| `trigger_kind` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RoderCodeRepair record (raises on error).
roder_code_repair = client.RoderCodeRepair.load({ "id" => "roder_code_repair_id" })
```

#### Example: Create

```ruby
roder_code_repair = client.RoderCodeRepair.create({
  "base_sha" => "example_base_sha", # String
  "organization_id" => "example_organization_id", # String
  "repository_slug" => "example_repository_slug", # String
  "scenario_run_id" => "example_scenario_run_id", # String
})
```


### RoderCodeRepairSetting

Create an instance: `roder_code_repair_setting = client.RoderCodeRepairSetting`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `Boolean` |  |
| `daily_limit` | `Integer` |  |
| `enabled` | `Boolean` |  |
| `enabled_at` | `Object` |  |
| `operator_user_id` | `Object` |  |
| `organization_id` | `String` |  |
| `repository_slug` | `Object` | Connected Composal repository required when enabling |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RoderCodeRepairSetting record (raises on error).
roder_code_repair_setting = client.RoderCodeRepairSetting.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
roder_code_repair_setting = client.RoderCodeRepairSetting.create({
  "enabled" => true, # Boolean
  "organization_id" => "example_organization_id", # String
})
```


### RoderMachine

Create an instance: `roder_machine = client.RoderMachine`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### RoderRun

Create an instance: `roder_run = client.RoderRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RoderWorkspaceCredential

Create an instance: `roder_workspace_credential = client.RoderWorkspaceCredential`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token` | `String` | Short-lived personal access token for the spawning user. |
| `author_email` | `String` |  |
| `author_name` | `String` |  |
| `clone_url` | `String` |  |
| `default_branch` | `String` |  |
| `expires_at` | `String` |  |
| `organization_id` | `String` |  |
| `repository_id` | `String` |  |
| `repository_slug` | `String` |  |
| `repository_spec` | `String` | The explicitly selected physical repository address. |
| `required_lifetime_seconds` | `Integer` | Lifetime the pending clone or command must be able to complete within. |
| `token` | `String` | Short-lived read/write repository credential. |
| `username` | `String` |  |

#### Example: Create

```ruby
roder_workspace_credential = client.RoderWorkspaceCredential.create({
  "required_lifetime_seconds" => 1, # Integer
})
```


### RunArtifact

Create an instance: `run_artifact = client.RunArtifact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RunArtifact record (raises on error).
run_artifact = client.RunArtifact.load({ "pipeline_id" => "pipeline_id", "run_id" => "run_id" })
```

#### Example: Create

```ruby
run_artifact = client.RunArtifact.create({
  "pipeline_id" => "example_pipeline_id", # String
  "run_id" => "example_run_id", # String
})
```


### RunJob

Create an instance: `run_job = client.RunJob`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` |  |
| `allow_failure` | `Boolean` |  |
| `cache_archive_observations` | `Object` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` | `String` |  |
| `ci_runner_id` | `Object` |  |
| `created_at` | `String` |  |
| `dependencies_csv` | `Object` |  |
| `display_id` | `Integer` |  |
| `environment_csv` | `Object` |  |
| `execution_order` | `Integer` |  |
| `execution_profile` | `Object` |  |
| `exit_code` | `Object` |  |
| `failed` | `Boolean` |  |
| `finished_at` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `log_chunks` | `Array` |  |
| `name` | `String` |  |
| `number` | `Integer` |  |
| `organization_id` | `String` |  |
| `queued_at` | `Object` |  |
| `reconciliation_id` | `Object` |  |
| `retry_number` | `Integer` |  |
| `reuse` | `Object` |  |
| `runner_label_selector` | `Object` |  |
| `slug` | `String` |  |
| `started_at` | `Object` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |
| `steps` | `Array` |  |
| `timeout_seconds` | `Object` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RunJob record (raises on error).
run_job = client.RunJob.load({ "id" => "run_job_id", "pipeline_id" => "pipeline_id", "run_id" => "run_id" })
```

#### Example: Create

```ruby
run_job = client.RunJob.create({
  "pipeline_id" => "example_pipeline_id", # String
  "run_id" => "example_run_id", # String
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


### RunWorkspaceCredential

Create an instance: `run_workspace_credential = client.RunWorkspaceCredential`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
run_workspace_credential = client.RunWorkspaceCredential.create({
})
```


### RunnerLease

Create an instance: `runner_lease = client.RunnerLease`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RunnerLease record (raises on error).
runner_lease = client.RunnerLease.load({ "runner_id" => "runner_id", "runner_pool_id" => "runner_pool_id" })
```

#### Example: Create

```ruby
runner_lease = client.RunnerLease.create({
  "runner_id" => "example_runner_id", # String
  "runner_pool_id" => "example_runner_pool_id", # String
})
```


### RunnerPoolNodeEnrollmentToken

Create an instance: `runner_pool_node_enrollment_token = client.RunnerPoolNodeEnrollmentToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities_csv` | `Object` |  |
| `ci_runner_pool_id` | `String` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `creator_user_id` | `Object` |  |
| `description` | `Object` |  |
| `expires_at` | `Object` |  |
| `expires_at_label` | `Object` |  |
| `id` | `String` |  |
| `kind` | `String` |  |
| `last_used_at` | `Object` |  |
| `last_used_at_label` | `Object` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `raw_token` | `Object` |  |
| `revoked_at` | `Object` |  |
| `status` | `String` |  |
| `token_hint` | `String` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `usage_count` | `Integer` |  |
| `usage_count_label` | `String` |  |

#### Example: List

```ruby
# list returns an Array of RunnerPoolNodeEnrollmentToken entities, one per record (raises on error).
runner_pool_node_enrollment_tokens = client.RunnerPoolNodeEnrollmentToken.list({ "runner_pool_id" => "example" })
runner_pool_node_enrollment_tokens.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
runner_pool_node_enrollment_token = client.RunnerPoolNodeEnrollmentToken.create({
  "runner_pool_id" => "example_runner_pool_id", # String
  "name" => "example_name", # String
})
```


### RunnerPoolRunner

Create an instance: `runner_pool_runner = client.RunnerPoolRunner`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RunnerPoolRunner record (raises on error).
runner_pool_runner = client.RunnerPoolRunner.load({ "id" => "runner_pool_runner_id", "runner_pool_id" => "runner_pool_id" })
```

#### Example: Create

```ruby
runner_pool_runner = client.RunnerPoolRunner.create({
  "runner_pool_id" => "example_runner_pool_id", # String
})
```


### RuntimeInstanceHealthSnapshot

Create an instance: `runtime_instance_health_snapshot = client.RuntimeInstanceHealthSnapshot`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RuntimeInstanceHealthSnapshot record (raises on error).
runtime_instance_health_snapshot = client.RuntimeInstanceHealthSnapshot.load({ "runtime_instance_id" => "runtime_instance_id" })
```

#### Example: Create

```ruby
runtime_instance_health_snapshot = client.RuntimeInstanceHealthSnapshot.create({
  "runtime_instance_id" => "example_runtime_instance_id", # String
})
```


### SandboxIntegration

Create an instance: `sandbox_integration = client.SandboxIntegration`

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
| `can_manage` | `Boolean` |  |
| `catalog` | `Array` |  |
| `configuration` | `Hash` |  |
| `connected_profiles` | `Hash` | Connected profiles per provider across the organization. |
| `credentials` | `Hash` |  |
| `enabled` | `Boolean` |  |
| `id` | `String` |  |
| `integrations` | `Array` |  |
| `name` | `String` |  |
| `provider` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SandboxIntegration record (raises on error).
sandbox_integration = client.SandboxIntegration.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
sandbox_integration = client.SandboxIntegration.create({
  "organization_id" => "example_organization_id", # String
  "configuration" => {}, # Hash
  "credentials" => {}, # Hash
  "name" => "example_name", # String
  "provider" => "example_provider", # String
})
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


### SecretGrant

Create an instance: `secret_grant = client.SecretGrant`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SecretGrant record (raises on error).
secret_grant = client.SecretGrant.load({ "id" => "secret_grant_id", "organization_id" => "organization_id", "secret_id" => "secret_id" })
```

#### Example: Create

```ruby
secret_grant = client.SecretGrant.create({
  "organization_id" => "example_organization_id", # String
  "secret_id" => "example_secret_id", # String
})
```


### SecretVersion

Create an instance: `secret_version = client.SecretVersion`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SecretVersion record (raises on error).
secret_version = client.SecretVersion.load({ "id" => "secret_version_id", "organization_id" => "organization_id", "secret_id" => "secret_id" })
```

#### Example: Create

```ruby
secret_version = client.SecretVersion.create({
  "organization_id" => "example_organization_id", # String
  "secret_id" => "example_secret_id", # String
})
```


### ServiceEndpoint

Create an instance: `service_endpoint = client.ServiceEndpoint`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ServiceEndpoint record (raises on error).
service_endpoint = client.ServiceEndpoint.load({ "id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id" })
```

#### Example: Create

```ruby
service_endpoint = client.ServiceEndpoint.create({
  "app_id" => "example_app_id", # String
  "service_id" => "example_service_id", # String
})
```


### Setting

Create an instance: `setting = client.Setting`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `Boolean` |  |
| `can_manage_sandbox_region` | `Boolean` |  |
| `dedicated_outbound_ip_addresses` | `Array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `String` |  |
| `organization` | `Hash` |  |
| `sandbox_regions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Setting record (raises on error).
setting = client.Setting.load({ "organization_id" => "organization_id" })
```


### SettingMutationLease

Create an instance: `setting_mutation_lease = client.SettingMutationLease`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Signal

Create an instance: `signal = client.Signal`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acked_at` | `Object` |  |
| `acked_by` | `Object` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | `Hash` | Dispatched-run summary (docs §6c). |
| `app_service_id` | `Object` |  |
| `attribution` | `Hash` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | `String` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | `String` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | `Hash` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | `String` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` | `String` |  |
| `payload` | `Hash` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | `Hash` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | `Hash` | Recovery pairing (docs §6b). |
| `severity` | `String` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | `Hash` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` | `Object` |  |
| `subject_type` | `Object` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | `String` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Signal record (raises on error).
signal = client.Signal.load({ "id" => "signal_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Signal entities, one per record (raises on error).
signals = client.Signal.list({ "organization_id" => "example" })
signals.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
signal = client.Signal.create({
})
```


### SignalInbound

Create an instance: `signal_inbound = client.SignalInbound`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### SignalIntegration

Create an instance: `signal_integration = client.SignalIntegration`

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
| `api_token` | `String` | Optional provider API token for target discovery and backfill. |
| `api_token_stored` | `Boolean` |  |
| `config` | `Hash` |  |
| `created_at` | `Object` |  |
| `failure_message` | `Object` |  |
| `id` | `String` | Public id (`sint_…`). |
| `inbound_path` | `String` |  |
| `inbound_url` | `String` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `Object` |  |
| `last_verified_at` | `Object` |  |
| `mode` | `String` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `provider` | `String` |  |
| `rejected_signature_count` | `Integer` | Deliveries rejected for a bad or missing signature. |
| `status` | `String` |  |
| `target_count` | `Integer` |  |
| `unmapped_delivery_count` | `Integer` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `Object` |  |
| `webhook_secret` | `String` | The provider's signing secret. |
| `webhook_secret_stored` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SignalIntegration record (raises on error).
signal_integration = client.SignalIntegration.load({ "id" => "signal_integration_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of SignalIntegration entities, one per record (raises on error).
signal_integrations = client.SignalIntegration.list({ "organization_id" => "example" })
signal_integrations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
signal_integration = client.SignalIntegration.create({
  "organization_id" => "example_organization_id", # String
  "name" => "example_name", # String
  "provider" => "example_provider", # String
})
```


### SignalIntegrationDelivery

Create an instance: `signal_integration_delivery = client.SignalIntegrationDelivery`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `Integer` |  |
| `created_at` | `Object` |  |
| `delivery_id` | `String` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` | `Object` |  |
| `id` | `String` | Public id (`sdel_…`). |
| `last_error` | `Object` |  |
| `ops_signal_id` | `Object` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` | `String` |  |
| `processed_at` | `Object` |  |
| `provider` | `String` |  |
| `received_at` | `Object` |  |
| `signal_integration_id` | `String` |  |
| `state` | `String` |  |

#### Example: List

```ruby
# list returns an Array of SignalIntegrationDelivery entities, one per record (raises on error).
signal_integration_deliverys = client.SignalIntegrationDelivery.list({ "organization_id" => "example", "signal_integration_id" => "example" })
signal_integration_deliverys.each { |item| puts item.data_get }
```


### SignalIntegrationTarget

Create an instance: `signal_integration_target = client.SignalIntegrationTarget`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_service_id` | `Object` |  |
| `created_at` | `Object` |  |
| `display_name` | `Object` |  |
| `enabled` | `Boolean` |  |
| `external_id` | `String` |  |
| `external_kind` | `String` |  |
| `external_slug` | `Object` |  |
| `hosted_app_id` | `Object` |  |
| `id` | `String` | Public id (`stgt_…`). |
| `organization_id` | `String` |  |
| `signal_integration_id` | `String` |  |
| `signal_integration_targets` | `Array` |  |
| `targets` | `Array` |  |
| `updated_at` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of SignalIntegrationTarget entities, one per record (raises on error).
signal_integration_targets = client.SignalIntegrationTarget.list({ "organization_id" => "example", "signal_integration_id" => "example" })
signal_integration_targets.each { |item| puts item.data_get }
```


### SignalSubscription

Create an instance: `signal_subscription = client.SignalSubscription`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SignalSubscription record (raises on error).
signal_subscription = client.SignalSubscription.load({ "id" => "signal_subscription_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
signal_subscription = client.SignalSubscription.create({
  "organization_id" => "example_organization_id", # String
})
```


### Site

Create an instance: `site = client.Site`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

#### Example: List

```ruby
# list returns an Array of Site entities, one per record (raises on error).
sites = client.Site.list({ "organization_id" => "example" })
sites.each { |item| puts item.data_get }
```


### SiteAccessKey

Create an instance: `site_access_key = client.SiteAccessKey`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SiteAccessKey record (raises on error).
site_access_key = client.SiteAccessKey.load({ "organization_id" => "organization_id", "site_id" => "site_id" })
```

#### Example: Create

```ruby
site_access_key = client.SiteAccessKey.create({
  "organization_id" => "example_organization_id", # String
  "site_id" => "example_site_id", # String
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


### SiteSecret

Create an instance: `site_secret = client.SiteSecret`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `native_agent_id` | `String` |  |
| `value` | `String` |  |


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


### SourceConnection

Create an instance: `source_connection = client.SourceConnection`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### SpaceAlertRule

Create an instance: `space_alert_rule = client.SpaceAlertRule`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceAlertRule record (raises on error).
space_alert_rule = client.SpaceAlertRule.load({ "id" => "space_alert_rule_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_alert_rule = client.SpaceAlertRule.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceAuditEvent

Create an instance: `space_audit_event = client.SpaceAuditEvent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceAuditEvent record (raises on error).
space_audit_event = client.SpaceAuditEvent.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_audit_event = client.SpaceAuditEvent.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceDnsRecord

Create an instance: `space_dns_record = client.SpaceDnsRecord`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceDnsRecord record (raises on error).
space_dns_record = client.SpaceDnsRecord.load({ "id" => "space_dns_record_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_dns_record = client.SpaceDnsRecord.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceEnrollmentToken

Create an instance: `space_enrollment_token = client.SpaceEnrollmentToken`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceEnrollmentToken record (raises on error).
space_enrollment_token = client.SpaceEnrollmentToken.load({ "id" => "space_enrollment_token_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_enrollment_token = client.SpaceEnrollmentToken.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceGateway

Create an instance: `space_gateway = client.SpaceGateway`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceGateway record (raises on error).
space_gateway = client.SpaceGateway.load({ "id" => "space_gateway_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_gateway = client.SpaceGateway.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceGroup

Create an instance: `space_group = client.SpaceGroup`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceGroup record (raises on error).
space_group = client.SpaceGroup.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_group = client.SpaceGroup.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceGroupMembership

Create an instance: `space_group_membership = client.SpaceGroupMembership`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceGroupMembership record (raises on error).
space_group_membership = client.SpaceGroupMembership.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_group_membership = client.SpaceGroupMembership.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceLogStream

Create an instance: `space_log_stream = client.SpaceLogStream`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceLogStream record (raises on error).
space_log_stream = client.SpaceLogStream.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_log_stream = client.SpaceLogStream.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceMetricSery

Create an instance: `space_metric_sery = client.SpaceMetricSery`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceMetricSery record (raises on error).
space_metric_sery = client.SpaceMetricSery.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_metric_sery = client.SpaceMetricSery.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceOtelCollector

Create an instance: `space_otel_collector = client.SpaceOtelCollector`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceOtelCollector record (raises on error).
space_otel_collector = client.SpaceOtelCollector.load({ "id" => "space_otel_collector_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_otel_collector = client.SpaceOtelCollector.create({
  "space_id" => "example_space_id", # String
})
```


### SpacePeer

Create an instance: `space_peer = client.SpacePeer`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpacePeer record (raises on error).
space_peer = client.SpacePeer.load({ "id" => "space_peer_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_peer = client.SpacePeer.create({
  "space_id" => "example_space_id", # String
})
```


### SpacePeerAttachment

Create an instance: `space_peer_attachment = client.SpacePeerAttachment`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpacePeerAttachment record (raises on error).
space_peer_attachment = client.SpacePeerAttachment.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_peer_attachment = client.SpacePeerAttachment.create({
  "space_id" => "example_space_id", # String
})
```


### SpacePolicy

Create an instance: `space_policy = client.SpacePolicy`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpacePolicy record (raises on error).
space_policy = client.SpacePolicy.load({ "id" => "space_policy_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_policy = client.SpacePolicy.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceSegment

Create an instance: `space_segment = client.SpaceSegment`

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
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceSegment record (raises on error).
space_segment = client.SpaceSegment.load({ "id" => "space_segment_id", "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_segment = client.SpaceSegment.create({
  "space_id" => "example_space_id", # String
})
```


### SpaceTraceSpan

Create an instance: `space_trace_span = client.SpaceTraceSpan`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceTraceSpan record (raises on error).
space_trace_span = client.SpaceTraceSpan.load({ "space_id" => "space_id" })
```

#### Example: Create

```ruby
space_trace_span = client.SpaceTraceSpan.create({
  "space_id" => "example_space_id", # String
})
```


### Spark

Create an instance: `spark = client.Spark`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `Array` | Products this organization has activated (PRD 144). |
| `agents_only` | `Boolean` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `Boolean` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` | `Boolean` |  |
| `compute_credit_cents` | `Object` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `credit_cents` | `Object` | Inference credit the workspace started Sparks with. |
| `first_spark` | `Object` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` | `Boolean` |  |
| `github_prs_authored_by_change_author` | `Boolean` |  |
| `id` | `String` |  |
| `jsonrpc` | `String` |  |
| `logo_url` | `Object` |  |
| `member_count` | `Integer` |  |
| `method` | `String` |  |
| `name` | `String` |  |
| `params` | `Hash` |  |
| `pending_invitation_count` | `Integer` |  |
| `personal` | `Boolean` |  |
| `repository_count` | `Integer` |  |
| `role` | `Object` |  |
| `sandbox_region` | `String` |  |
| `shared_agent_personal_accounts_enabled` | `Boolean` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `String` |  |
| `source_control_providers` | `Array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `Boolean` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | `Boolean` | Whether the workspace has started Sparks. |
| `timezone` | `String` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |
| `verify_pr_scenario_writing_enabled` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Spark record (raises on error).
spark = client.Spark.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
spark = client.Spark.create({
  "jsonrpc" => "example_jsonrpc", # String
  "method" => "example_method", # String
})
```


### SparkAgentIntegration

Create an instance: `spark_agent_integration = client.SparkAgentIntegration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

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

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SparkAgentIntegration record (raises on error).
spark_agent_integration = client.SparkAgentIntegration.load({ "agent_id" => "agent_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
spark_agent_integration = client.SparkAgentIntegration.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "connection_id" => "example_connection_id", # String
  "enabled" => true, # Boolean
  "generation" => 1, # Integer
})
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


### SparkAgentSite

Create an instance: `spark_agent_site = client.SparkAgentSite`

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
# list returns an Array of SparkAgentSite entities, one per record (raises on error).
spark_agent_sites = client.SparkAgentSite.list({ "agent_id" => "example", "organization_id" => "example" })
spark_agent_sites.each { |item| puts item.data_get }
```


### SparkAgentSkill

Create an instance: `spark_agent_skill = client.SparkAgentSkill`

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
# list returns an Array of SparkAgentSkill entities, one per record (raises on error).
spark_agent_skills = client.SparkAgentSkill.list({ "agent_id" => "example", "organization_id" => "example" })
spark_agent_skills.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
spark_agent_skill = client.SparkAgentSkill.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
  "enabled" => true, # Boolean
  "name" => "example_name", # String
  "version" => "example_version", # String
})
```


### SparkAgentThread

Create an instance: `spark_agent_thread = client.SparkAgentThread`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archive_deletes_sandbox` | `Boolean` |  |
| `archived` | `Boolean` |  |
| `attention` | `Object` | Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish. |
| `can_archive` | `Boolean` |  |
| `can_compact` | `Boolean` |  |
| `can_snooze` | `Boolean` |  |
| `coordination_status` | `Object` | Durable work not represented by a native run: a queued input or an outstanding thread report. |
| `execution` | `Object` | device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness. |
| `first_input` | `Object` |  |
| `first_input_key` | `String` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `String` | Membership the first message was sent as, for input_delivery. |
| `group` | `String` | Rails-owned list group, in precedence order: attention, active run, coordination custody, then done. |
| `has_active_run` | `Boolean` |  |
| `id` | `String` |  |
| `inherit_context` | `Boolean` | Include the source conversation through its last completed reply. |
| `is_main` | `Boolean` |  |
| `kind` | `String` |  |
| `message` | `String` | The thread's first message. |
| `older` | `Boolean` | Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older. |
| `parent_conversation_id` | `String` | Optional source conversation belonging to this agent. |
| `parent_conversation_title` | `String` | Source conversation title, resolved independently of this page. |
| `requester_membership_id` | `String` |  |
| `snoozed_until` | `Object` | When a snoozed thread returns to its usual group; null when it is not snoozed. |
| `thread` | `Hash` |  |
| `title` | `String` |  |
| `updated_at` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of SparkAgentThread entities, one per record (raises on error).
spark_agent_threads = client.SparkAgentThread.list({ "agent_id" => "example", "organization_id" => "example" })
spark_agent_threads.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
spark_agent_thread = client.SparkAgentThread.create({
  "agent_id" => "example_agent_id", # String
  "organization_id" => "example_organization_id", # String
})
```


### SparkCredit

Create an instance: `spark_credit = client.SparkCredit`

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
| `amount_cents` | `Integer` | Purchase amount in USD cents. |
| `autofill` | `Object` |  |
| `autofill_payment_unconfirmed` | `Boolean` |  |
| `available_usd` | `String` |  |
| `billing_unit` | `String` | Compute minute quote version returned by the billing summary. |
| `can_manage` | `Boolean` |  |
| `compute_minutes` | `Hash` |  |
| `compute_usd` | `String` |  |
| `credits_per_usd` | `Integer` |  |
| `inference_usd` | `String` |  |
| `kind` | `String` |  |
| `payment_method` | `Object` |  |
| `payments_enabled` | `Boolean` |  |
| `plan` | `Object` |  |
| `plans` | `Array` |  |
| `quoted_credits_cents` | `Integer` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | `Integer` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` | `Array` |  |
| `refill_options` | `Array` |  |
| `refill_thresholds_cents` | `Array` |  |
| `request_key` | `String` |  |
| `settings` | `Object` |  |
| `starter_cents` | `Integer` |  |
| `top_up_max_cents` | `Integer` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | `Integer` | Minimum manual top-up and increment, in USD cents. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SparkCredit record (raises on error).
spark_credit = client.SparkCredit.load({ "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
spark_credit = client.SparkCredit.create({
  "organization_id" => "example_organization_id", # String
  "kind" => "example_kind", # String
  "request_key" => "example_request_key", # String
})
```


### SparkCreditAgentUsage

Create an instance: `spark_credit_agent_usage = client.SparkCreditAgentUsage`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `Array` |  |
| `all` | `Hash` |  |
| `days` | `Array` |  |
| `id` | `String` |  |
| `owners` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SparkCreditAgentUsage record (raises on error).
spark_credit_agent_usage = client.SparkCreditAgentUsage.load({ "id" => "spark_credit_agent_usage_id", "organization_id" => "organization_id" })
```


### SparkCreditUsageTotal

Create an instance: `spark_credit_usage_total = client.SparkCreditUsageTotal`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `compute_minutes_used` | `String` |  |
| `compute_usd` | `String` |  |
| `inference_usd` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SparkCreditUsageTotal record (raises on error).
spark_credit_usage_total = client.SparkCreditUsageTotal.load({ "organization_id" => "organization_id" })
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


### StatusChange

Create an instance: `status_change = client.StatusChange`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `String` |  |
| `id` | `String` |  |
| `patchsets` | `Array` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StatusChange record (raises on error).
status_change = client.StatusChange.load({ "id" => "status_change_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### StatusCommit

Create an instance: `status_commit = client.StatusCommit`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `Array` |  |
| `commit_sha` | `String` |  |
| `counts` | `Hash` |  |
| `id` | `String` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StatusCommit record (raises on error).
status_commit = client.StatusCommit.load({ "id" => "status_commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### StatusPatchset

Create an instance: `status_patchset = client.StatusPatchset`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `Array` |  |
| `checks_status` | `Object` |  |
| `commit_sha` | `Object` |  |
| `counts` | `Hash` |  |
| `id` | `String` |  |
| `patchset_id` | `String` |  |
| `status` | `String` |  |
| `status_label` | `String` |  |
| `status_state` | `String` |  |
| `status_tone` | `String` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StatusPatchset record (raises on error).
status_patchset = client.StatusPatchset.load({ "id" => "status_patchset_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```


### StripeWebhook

Create an instance: `stripe_webhook = client.StripeWebhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
stripe_webhook = client.StripeWebhook.create({
})
```


### SubmitTelemetry

Create an instance: `submit_telemetry = client.SubmitTelemetry`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
submit_telemetry = client.SubmitTelemetry.create({
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


### SwarmEvent

Create an instance: `swarm_event = client.SwarmEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_swarm_id` | `String` |  |
| `attempt_id` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `id` | `Integer` |  |
| `kind` | `String` |  |
| `payload` | `Hash` |  |
| `reason` | `Object` |  |
| `scheduler_generation` | `Object` |  |
| `task_id` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of SwarmEvent entities, one per record (raises on error).
swarm_events = client.SwarmEvent.list({ "swarm_id" => "example" })
swarm_events.each { |item| puts item.data_get }
```


### SwarmLive

Create an instance: `swarm_live = client.SwarmLive`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### SwarmNote

Create an instance: `swarm_note = client.SwarmNote`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `task_id` | `Object` | A task public id; omitted |
| `text` | `String` |  |

#### Example: Create

```ruby
swarm_note = client.SwarmNote.create({
  "swarm_id" => "example_swarm_id", # String
  "text" => "example_text", # String
})
```


### SwarmTask

Create an instance: `swarm_task = client.SwarmTask`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptance_commands` | `Array` |  |
| `agent_swarm_id` | `String` |  |
| `assigned_runner_id` | `Object` |  |
| `blocked_reason` | `Object` |  |
| `changes` | `Array` |  |
| `commit_count` | `Integer` |  |
| `commit_sha_result` | `Object` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `current_attempt_id` | `Object` |  |
| `deadline_at` | `Object` |  |
| `depends_on_task_ids` | `Array` |  |
| `depth` | `Integer` |  |
| `diff_artifact_url` | `Object` |  |
| `display_id` | `Integer` |  |
| `environment_profile` | `Object` |  |
| `error_message` | `Object` |  |
| `failure_code` | `Object` |  |
| `finished_at` | `Object` |  |
| `finished_at_label` | `Object` |  |
| `harness` | `String` |  |
| `id` | `String` |  |
| `input_revision` | `Object` |  |
| `iteration` | `Integer` |  |
| `landing_state` | `String` |  |
| `model` | `Object` |  |
| `model_provider` | `Object` |  |
| `number` | `Integer` |  |
| `organization_id` | `String` |  |
| `owned_paths` | `Array` |  |
| `parent_task_id` | `Object` |  |
| `position` | `Integer` |  |
| `prompt` | `String` |  |
| `queued_at` | `Object` |  |
| `queued_at_label` | `Object` |  |
| `reasoning_effort` | `Object` |  |
| `recent_activity` | `Array` |  |
| `repo_url` | `String` |  |
| `result` | `Hash` |  |
| `retry_number` | `Integer` |  |
| `role` | `String` |  |
| `run_id` | `Object` |  |
| `stack_after_task_id` | `Object` |  |
| `started_at` | `Object` |  |
| `started_at_label` | `Object` |  |
| `status` | `String` |  |
| `title` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of SwarmTask entities, one per record (raises on error).
swarm_tasks = client.SwarmTask.list({ "swarm_id" => "example" })
swarm_tasks.each { |item| puts item.data_get }
```


### TaskLease

Create an instance: `task_lease = client.TaskLease`

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
task_lease = client.TaskLease.create({
  "swarm_id" => "example_swarm_id", # String
  "task_id" => "example_task_id", # String
})
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


### ThreadPreviewAccess

Create an instance: `thread_preview_access = client.ThreadPreviewAccess`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ToolFeedback

Create an instance: `tool_feedback = client.ToolFeedback`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` |  |
| `created_at` | `String` |  |
| `details` | `String` |  |
| `feedback` | `Hash` |  |
| `id` | `String` |  |
| `metadata` | `Hash` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` | `String` |  |
| `source` | `String` |  |
| `summary` | `String` |  |
| `user_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ToolFeedback record (raises on error).
tool_feedback = client.ToolFeedback.load({ "id" => "tool_feedback_id", "organization_id" => "organization_id" })
```

#### Example: Create

```ruby
tool_feedback = client.ToolFeedback.create({
  "organization_id" => "example_organization_id", # String
  "feedback" => {}, # Hash
})
```


### Transcript

Create an instance: `transcript = client.Transcript`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent` | `String` |  |
| `author` | `Hash` |  |
| `checkpoint_pagination` | `Hash` |  |
| `checkpoints` | `Array` |  |
| `id` | `String` |  |
| `last_checkpoint_at` | `Object` |  |
| `selected_checkpoint` | `Object` |  |
| `source_url` | `String` |  |
| `started_at` | `String` |  |
| `status` | `String` |  |
| `title` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of Transcript entities, one per record (raises on error).
transcripts = client.Transcript.list({ "repo" => "example" })
transcripts.each { |item| puts item.data_get }
```


### V1Message

Create an instance: `v1_message = client.V1Message`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
v1_message = client.V1Message.create({
  "organization_id" => "example_organization_id", # String
})
```


### VcBranch

Create an instance: `vc_branch = client.VcBranch`

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
| `name` | `String` |  |
| `target_commit_id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of VcBranch entities, one per record (raises on error).
vc_branchs = client.VcBranch.list({ "organization_id" => "example", "repo_id" => "example" })
vc_branchs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
vc_branch = client.VcBranch.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
})
```


### VcBrowser

Create an instance: `vc_browser = client.VcBrowser`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### VcChange

Create an instance: `vc_change = client.VcChange`

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
| `activity` | `Array` |  |
| `canonical_path` | `String` |  |
| `change` | `Object` |  |
| `checks` | `Array` |  |
| `checks_status` | `String` |  |
| `description` | `Object` |  |
| `group` | `Object` |  |
| `id` | `String` |  |
| `jj_change_id` | `Object` |  |
| `labels` | `Array` |  |
| `landing` | `Hash` | Server-computed submitted-together closure and landing preflight. |
| `number` | `Integer` |  |
| `patchset_number` | `Object` |  |
| `previews` | `Array` |  |
| `primary_status` | `Object` |  |
| `public_id` | `String` |  |
| `related_changes` | `Array` |  |
| `relation_chain` | `Array` |  |
| `restack_state` | `String` |  |
| `review_summary` | `Hash` |  |
| `stack` | `Object` |  |
| `status` | `String` |  |
| `sync` | `Hash` |  |
| `target` | `Hash` |  |
| `target_advanced` | `Boolean` |  |
| `target_branch` | `String` |  |
| `title` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VcChange record (raises on error).
vc_change = client.VcChange.load({ "id" => "vc_change_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of VcChange entities, one per record (raises on error).
vc_changes = client.VcChange.list({ "organization_id" => "example", "repo_id" => "example" })
vc_changes.each { |item| puts item.data_get }
```


### VcChangeGroup

Create an instance: `vc_change_group = client.VcChangeGroup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes` | `Array` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `number` | `Integer` |  |
| `status` | `String` |  |
| `title` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VcChangeGroup record (raises on error).
vc_change_group = client.VcChangeGroup.load({ "id" => "vc_change_group_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of VcChangeGroup entities, one per record (raises on error).
vc_change_groups = client.VcChangeGroup.list({ "organization_id" => "example", "repo_id" => "example" })
vc_change_groups.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
vc_change_group = client.VcChangeGroup.create({
  "organization_id" => "example_organization_id", # String
  "repo_id" => "example_repo_id", # String
  "name" => "example_name", # String
})
```


### VcFile

Create an instance: `vc_file = client.VcFile`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paths` | `Array` |  |
| `truncated` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of VcFile entities, one per record (raises on error).
vc_files = client.VcFile.list({ "organization_id" => "example", "repo_id" => "example", "ref" => "example" })
vc_files.each { |item| puts item.data_get }
```


### VcMergeQueue

Create an instance: `vc_merge_queue = client.VcMergeQueue`

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
| `analytics` | `Hash` | Queue performance for the reporting window. |
| `id` | `String` |  |
| `policy` | `Hash` |  |
| `queue` | `Hash` |  |
| `target_branches` | `Array` | Bookmark names for the target picker. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VcMergeQueue record (raises on error).
vc_merge_queue = client.VcMergeQueue.load({ "id" => "vc_merge_queue_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of VcMergeQueue entities, one per record (raises on error).
vc_merge_queues = client.VcMergeQueue.list({ "organization_id" => "example", "repo_id" => "example" })
vc_merge_queues.each { |item| puts item.data_get }
```


### VcStack

Create an instance: `vc_stack = client.VcStack`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias_ref_name` | `Object` |  |
| `changes` | `Array` |  |
| `code` | `String` |  |
| `id` | `String` |  |
| `landing` | `Hash` | Compact landing state for the Stack CLI. |
| `member_count` | `Integer` |  |
| `name` | `Object` |  |
| `ref_name` | `String` |  |
| `status` | `String` |  |
| `tip_change_number` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VcStack record (raises on error).
vc_stack = client.VcStack.load({ "id" => "vc_stack_id", "organization_id" => "organization_id", "repo_id" => "repo_id" })
```

#### Example: List

```ruby
# list returns an Array of VcStack entities, one per record (raises on error).
vc_stacks = client.VcStack.list({ "organization_id" => "example", "repo_id" => "example" })
vc_stacks.each { |item| puts item.data_get }
```


### VcsNode

Create an instance: `vcs_node = client.VcsNode`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `Object` |  |
| `account_id` | `Object` |  |
| `account_login` | `String` |  |
| `created_at` | `String` |  |
| `created_at_label` | `Object` |  |
| `id` | `String` |  |
| `installation_id` | `String` |  |
| `installed_at` | `Object` |  |
| `installed_at_label` | `Object` |  |
| `manage_access_url` | `String` |  |
| `organization_id` | `String` |  |
| `permission_entries` | `Array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `Hash` |  |
| `status` | `String` |  |
| `suspended_at` | `Object` |  |
| `suspended_at_label` | `Object` |  |
| `updated_at` | `String` |  |
| `updated_at_label` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of VcsNode entities, one per record (raises on error).
vcs_nodes = client.VcsNode.list({ "organization_id" => "example" })
vcs_nodes.each { |item| puts item.data_get }
```


### VcsSetting

Create an instance: `vcs_setting = client.VcsSetting`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `Boolean` |  |
| `can_manage_sandbox_region` | `Boolean` |  |
| `dedicated_outbound_ip_addresses` | `Array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `String` |  |
| `organization` | `Hash` |  |
| `sandbox_regions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VcsSetting record (raises on error).
vcs_setting = client.VcsSetting.load({ "organization_id" => "organization_id" })
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


### VerifyEmailVerification

Create an instance: `verify_email_verification = client.VerifyEmailVerification`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VerifyEmailVerification record (raises on error).
verify_email_verification = client.VerifyEmailVerification.load()
```


### VerifySignalIntegration

Create an instance: `verify_signal_integration = client.VerifySignalIntegration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token_stored` | `Boolean` |  |
| `config` | `Hash` |  |
| `created_at` | `Object` |  |
| `failure_message` | `Object` |  |
| `id` | `String` | Public id (`sint_…`). |
| `inbound_path` | `String` |  |
| `inbound_url` | `String` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `Object` |  |
| `last_verified_at` | `Object` |  |
| `mode` | `String` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `provider` | `String` |  |
| `rejected_signature_count` | `Integer` | Deliveries rejected for a bad or missing signature. |
| `status` | `String` |  |
| `target_count` | `Integer` |  |
| `unmapped_delivery_count` | `Integer` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `Object` |  |
| `webhook_secret_stored` | `Boolean` |  |

#### Example: Create

```ruby
verify_signal_integration = client.VerifySignalIntegration.create({
  "id" => "example_id", # String
  "organization_id" => "example_organization_id", # String
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


### WaitlistApplication

Create an instance: `waitlist_application = client.WaitlistApplication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
waitlist_application = client.WaitlistApplication.create({
})
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


### WebhookGitlab

Create an instance: `webhook_gitlab = client.WebhookGitlab`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


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


### WorkspaceActivity

Create an instance: `workspace_activity = client.WorkspaceActivity`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `live_activity` | `Array` |  |
| `recent_items` | `Array` |  |
| `unresolved_notification_count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WorkspaceActivity record (raises on error).
workspace_activity = client.WorkspaceActivity.load({ "organization_id" => "organization_id" })
```


### WorkspaceActivityNotification

Create an instance: `workspace_activity_notification = client.WorkspaceActivityNotification`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |


### WorkspaceSpace

Create an instance: `workspace_space = client.WorkspaceSpace`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `default_branch` | `String` |  |
| `description` | `Object` |  |
| `hidden` | `Boolean` |  |
| `icon_name` | `String` |  |
| `id` | `String` |  |
| `import_status` | `Object` |  |
| `name` | `String` |  |
| `organization_id` | `String` |  |
| `position` | `Object` |  |
| `repository_id` | `String` |  |
| `repository_slug` | `String` |  |
| `slug` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WorkspaceSpace record (raises on error).
workspace_space = client.WorkspaceSpace.load({ "id" => "workspace_space_id", "organization_id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of WorkspaceSpace entities, one per record (raises on error).
workspace_spaces = client.WorkspaceSpace.list({ "organization_id" => "example" })
workspace_spaces.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
workspace_space = client.WorkspaceSpace.create({
  "organization_id" => "example_organization_id", # String
  "icon_name" => "example_icon_name", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### WorkspaceSpacePreference

Create an instance: `workspace_space_preference = client.WorkspaceSpacePreference`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `preferences` | `Array` |  |
| `spaces` | `Array` |  |

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
githubonboarding = client.GithubOnboarding
githubonboarding.load({ "organization_id" => "example" })

# githubonboarding.data_get now returns the githubonboarding data from the last load
# githubonboarding.match_get returns the last match criteria
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
