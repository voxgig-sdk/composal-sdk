# Composal PHP SDK



The PHP SDK for the Composal API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->A2aWellKnown()` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/composal-sdk
composer config repositories.composal-sdk path ./composal-sdk/php
composer require voxgig-sdk/composal-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'composal_sdk.php';

$client = new ComposalSDK([
    "apikey" => getenv("COMPOSAL_APIKEY"),
]);
```

### 3. Load an agent

Agent is nested under organization, so provide the `organization_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Agent record (throws on error).
    $agent = $client->Agent()->load(["organization_id" => "example_organization_id", "id" => "example_id"]);
    print_r($agent->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $agentoperation = $client->AgentOperation()->load(["agent_id" => "example", "id" => "example_id", "organization_id" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ComposalSDK::test([
    "entity" => ["roder_code_repair" => ["test01" => ["id" => "test01", "scenario_run_id" => "example"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$rodercoderepair = $client->RoderCodeRepair()->list(["scenario_run_id" => "example"]);
print_r(array_map(fn($item) => $item->data_get(), $rodercoderepair));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ComposalSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
COMPOSAL_TEST_LIVE=TRUE
COMPOSAL_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ComposalSDK

```php
require_once 'composal_sdk.php';
$client = new ComposalSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ComposalSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ComposalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `A2aWellKnown` | `($data): A2aWellKnownEntity` | Create an A2aWellKnown entity instance. |
| `AdminOrg` | `($data): AdminOrgEntity` | Create an AdminOrg entity instance. |
| `Agent` | `($data): AgentEntity` | Create an Agent entity instance. |
| `AgentApp` | `($data): AgentAppEntity` | Create an AgentApp entity instance. |
| `AgentAppInstall` | `($data): AgentAppInstallEntity` | Create an AgentAppInstall entity instance. |
| `AgentAttachment` | `($data): AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `($data): AgentAutomationEntity` | Create an AgentAutomation entity instance. |
| `AgentAvatar` | `($data): AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `($data): AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer` | `($data): AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection` | `($data): AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentConnectionDelegation` | `($data): AgentConnectionDelegationEntity` | Create an AgentConnectionDelegation entity instance. |
| `AgentConnectionGrant` | `($data): AgentConnectionGrantEntity` | Create an AgentConnectionGrant entity instance. |
| `AgentConnectionResource` | `($data): AgentConnectionResourceEntity` | Create an AgentConnectionResource entity instance. |
| `AgentConnectionSafetyControl` | `($data): AgentConnectionSafetyControlEntity` | Create an AgentConnectionSafetyControl entity instance. |
| `AgentConnectionTriggerSubscription` | `($data): AgentConnectionTriggerSubscriptionEntity` | Create an AgentConnectionTriggerSubscription entity instance. |
| `AgentContextCheckpoint` | `($data): AgentContextCheckpointEntity` | Create an AgentContextCheckpoint entity instance. |
| `AgentControlFlow` | `($data): AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `($data): AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `($data): AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentEvent` | `($data): AgentEventEntity` | Create an AgentEvent entity instance. |
| `AgentFile` | `($data): AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput` | `($data): AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration` | `($data): AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
| `AgentIntegrationAccount` | `($data): AgentIntegrationAccountEntity` | Create an AgentIntegrationAccount entity instance. |
| `AgentIntegrationCallback` | `($data): AgentIntegrationCallbackEntity` | Create an AgentIntegrationCallback entity instance. |
| `AgentInteraction` | `($data): AgentInteractionEntity` | Create an AgentInteraction entity instance. |
| `AgentLibrary` | `($data): AgentLibraryEntity` | Create an AgentLibrary entity instance. |
| `AgentManager` | `($data): AgentManagerEntity` | Create an AgentManager entity instance. |
| `AgentManagerChoice` | `($data): AgentManagerChoiceEntity` | Create an AgentManagerChoice entity instance. |
| `AgentMarketplace` | `($data): AgentMarketplaceEntity` | Create an AgentMarketplace entity instance. |
| `AgentMarketplaceShared` | `($data): AgentMarketplaceSharedEntity` | Create an AgentMarketplaceShared entity instance. |
| `AgentMissionControl` | `($data): AgentMissionControlEntity` | Create an AgentMissionControl entity instance. |
| `AgentOperation` | `($data): AgentOperationEntity` | Create an AgentOperation entity instance. |
| `AgentProvisioning` | `($data): AgentProvisioningEntity` | Create an AgentProvisioning entity instance. |
| `AgentPullRequest` | `($data): AgentPullRequestEntity` | Create an AgentPullRequest entity instance. |
| `AgentQuestion` | `($data): AgentQuestionEntity` | Create an AgentQuestion entity instance. |
| `AgentRelayFileGrant` | `($data): AgentRelayFileGrantEntity` | Create an AgentRelayFileGrant entity instance. |
| `AgentRelayFileGrantAccount` | `($data): AgentRelayFileGrantAccountEntity` | Create an AgentRelayFileGrantAccount entity instance. |
| `AgentRepository` | `($data): AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource` | `($data): AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoder` | `($data): AgentRoderEntity` | Create an AgentRoder entity instance. |
| `AgentRoutine` | `($data): AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun` | `($data): AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime` | `($data): AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSession` | `($data): AgentSessionEntity` | Create an AgentSession entity instance. |
| `AgentSessionCheckpoint` | `($data): AgentSessionCheckpointEntity` | Create an AgentSessionCheckpoint entity instance. |
| `AgentSessionRoderHandoff` | `($data): AgentSessionRoderHandoffEntity` | Create an AgentSessionRoderHandoff entity instance. |
| `AgentSetting` | `($data): AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing` | `($data): AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite` | `($data): AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill` | `($data): AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack` | `($data): AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `($data): AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `($data): AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentSwarm` | `($data): AgentSwarmEntity` | Create an AgentSwarm entity instance. |
| `AgentTeammate` | `($data): AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `($data): AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread` | `($data): AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool` | `($data): AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentUsage` | `($data): AgentUsageEntity` | Create an AgentUsage entity instance. |
| `AgentVerifyProject` | `($data): AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `($data): AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebPreview` | `($data): AgentWebPreviewEntity` | Create an AgentWebPreview entity instance. |
| `AgentWebhook` | `($data): AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork` | `($data): AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `($data): AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `($data): AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `($data): AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `($data): AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `($data): AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `($data): AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `Agreement` | `($data): AgreementEntity` | Create an Agreement entity instance. |
| `AgreementAccessRequest` | `($data): AgreementAccessRequestEntity` | Create an AgreementAccessRequest entity instance. |
| `AlertRuleEvent` | `($data): AlertRuleEventEntity` | Create an AlertRuleEvent entity instance. |
| `AllocationLog` | `($data): AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App` | `($data): AppEntity` | Create an App entity instance. |
| `AppAccess` | `($data): AppAccessEntity` | Create an AppAccess entity instance. |
| `AppAccessJwk` | `($data): AppAccessJwkEntity` | Create an AppAccessJwk entity instance. |
| `AppCdn` | `($data): AppCdnEntity` | Create an AppCdn entity instance. |
| `AppConfigVariable` | `($data): AppConfigVariableEntity` | Create an AppConfigVariable entity instance. |
| `AppDataResource` | `($data): AppDataResourceEntity` | Create an AppDataResource entity instance. |
| `AppDeploy` | `($data): AppDeployEntity` | Create an AppDeploy entity instance. |
| `AppDeployment` | `($data): AppDeploymentEntity` | Create an AppDeployment entity instance. |
| `AppDeploymentOperation` | `($data): AppDeploymentOperationEntity` | Create an AppDeploymentOperation entity instance. |
| `AppDeploymentRollback` | `($data): AppDeploymentRollbackEntity` | Create an AppDeploymentRollback entity instance. |
| `AppEnvironment` | `($data): AppEnvironmentEntity` | Create an AppEnvironment entity instance. |
| `AppLocation` | `($data): AppLocationEntity` | Create an AppLocation entity instance. |
| `AppMetric` | `($data): AppMetricEntity` | Create an AppMetric entity instance. |
| `AppPreview` | `($data): AppPreviewEntity` | Create an AppPreview entity instance. |
| `AppPreviewProfile` | `($data): AppPreviewProfileEntity` | Create an AppPreviewProfile entity instance. |
| `AppRun` | `($data): AppRunEntity` | Create an AppRun entity instance. |
| `AppSecret` | `($data): AppSecretEntity` | Create an AppSecret entity instance. |
| `AppService` | `($data): AppServiceEntity` | Create an AppService entity instance. |
| `AppServiceBinding` | `($data): AppServiceBindingEntity` | Create an AppServiceBinding entity instance. |
| `AppServicePlacement` | `($data): AppServicePlacementEntity` | Create an AppServicePlacement entity instance. |
| `AppStorageResource` | `($data): AppStorageResourceEntity` | Create an AppStorageResource entity instance. |
| `Artefact` | `($data): ArtefactEntity` | Create an Artefact entity instance. |
| `ArtefactCommentThread` | `($data): ArtefactCommentThreadEntity` | Create an ArtefactCommentThread entity instance. |
| `ArtefactRevision` | `($data): ArtefactRevisionEntity` | Create an ArtefactRevision entity instance. |
| `ArtefactViewToken` | `($data): ArtefactViewTokenEntity` | Create an ArtefactViewToken entity instance. |
| `Artifact` | `($data): ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactCacheNamespace` | `($data): ArtifactCacheNamespaceEntity` | Create an ArtifactCacheNamespace entity instance. |
| `ArtifactImageRepository` | `($data): ArtifactImageRepositoryEntity` | Create an ArtifactImageRepository entity instance. |
| `ArtifactPackageMirror` | `($data): ArtifactPackageMirrorEntity` | Create an ArtifactPackageMirror entity instance. |
| `ArtifactRetentionPolicy` | `($data): ArtifactRetentionPolicyEntity` | Create an ArtifactRetentionPolicy entity instance. |
| `AttachmentPart` | `($data): AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AuditEvent` | `($data): AuditEventEntity` | Create an AuditEvent entity instance. |
| `Auth` | `($data): AuthEntity` | Create an Auth entity instance. |
| `AuthCli` | `($data): AuthCliEntity` | Create an AuthCli entity instance. |
| `AuthGithub` | `($data): AuthGithubEntity` | Create an AuthGithub entity instance. |
| `AuthGoogle` | `($data): AuthGoogleEntity` | Create an AuthGoogle entity instance. |
| `AuthOpenai` | `($data): AuthOpenaiEntity` | Create an AuthOpenai entity instance. |
| `AuthPasswordReset` | `($data): AuthPasswordResetEntity` | Create an AuthPasswordReset entity instance. |
| `AuthRegistrationOption` | `($data): AuthRegistrationOptionEntity` | Create an AuthRegistrationOption entity instance. |
| `AutomationEvent` | `($data): AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `($data): AutomationRunEntity` | Create an AutomationRun entity instance. |
| `BackendRunnerPool` | `($data): BackendRunnerPoolEntity` | Create a BackendRunnerPool entity instance. |
| `Bazel` | `($data): BazelEntity` | Create a Bazel entity instance. |
| `BazelActionResult` | `($data): BazelActionResultEntity` | Create a BazelActionResult entity instance. |
| `BazelBackend` | `($data): BazelBackendEntity` | Create a BazelBackend entity instance. |
| `BazelBlob` | `($data): BazelBlobEntity` | Create a BazelBlob entity instance. |
| `BazelExecution` | `($data): BazelExecutionEntity` | Create a BazelExecution entity instance. |
| `BazelFindMissingBlob` | `($data): BazelFindMissingBlobEntity` | Create a BazelFindMissingBlob entity instance. |
| `Billing` | `($data): BillingEntity` | Create a Billing entity instance. |
| `BillingAddon` | `($data): BillingAddonEntity` | Create a BillingAddon entity instance. |
| `BillingBudget` | `($data): BillingBudgetEntity` | Create a BillingBudget entity instance. |
| `BillingCheckoutSession` | `($data): BillingCheckoutSessionEntity` | Create a BillingCheckoutSession entity instance. |
| `BillingContact` | `($data): BillingContactEntity` | Create a BillingContact entity instance. |
| `BillingExtraSpend` | `($data): BillingExtraSpendEntity` | Create a BillingExtraSpend entity instance. |
| `BillingInvoice` | `($data): BillingInvoiceEntity` | Create a BillingInvoice entity instance. |
| `BillingPackage` | `($data): BillingPackageEntity` | Create a BillingPackage entity instance. |
| `BillingPortalSession` | `($data): BillingPortalSessionEntity` | Create a BillingPortalSession entity instance. |
| `BillingPrepaidPeriod` | `($data): BillingPrepaidPeriodEntity` | Create a BillingPrepaidPeriod entity instance. |
| `BillingPrepaidPurchase` | `($data): BillingPrepaidPurchaseEntity` | Create a BillingPrepaidPurchase entity instance. |
| `BillingSubscription` | `($data): BillingSubscriptionEntity` | Create a BillingSubscription entity instance. |
| `BillingTokenTopUp` | `($data): BillingTokenTopUpEntity` | Create a BillingTokenTopUp entity instance. |
| `BillingUsage` | `($data): BillingUsageEntity` | Create a BillingUsage entity instance. |
| `Binary` | `($data): BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion` | `($data): BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BookmarkProtectionRefreshGithubRequiredCheck` | `($data): BookmarkProtectionRefreshGithubRequiredCheckEntity` | Create a BookmarkProtectionRefreshGithubRequiredCheck entity instance. |
| `BrowserEgressCandidate` | `($data): BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `($data): BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `($data): BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `($data): BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `($data): BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `($data): BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `($data): BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `($data): BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `($data): BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CacheNamespaceEntry` | `($data): CacheNamespaceEntryEntity` | Create a CacheNamespaceEntry entity instance. |
| `CatalogSelector` | `($data): CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `($data): CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `($data): CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace` | `($data): CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `($data): CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `Change` | `($data): ChangeEntity` | Create a Change entity instance. |
| `ChangeAsset` | `($data): ChangeAssetEntity` | Create a ChangeAsset entity instance. |
| `ChangeComment` | `($data): ChangeCommentEntity` | Create a ChangeComment entity instance. |
| `ChangeFileReviewCheckpoint` | `($data): ChangeFileReviewCheckpointEntity` | Create a ChangeFileReviewCheckpoint entity instance. |
| `ChangeGitBranchSubmission` | `($data): ChangeGitBranchSubmissionEntity` | Create a ChangeGitBranchSubmission entity instance. |
| `ChangeGitCommitIdentity` | `($data): ChangeGitCommitIdentityEntity` | Create a ChangeGitCommitIdentity entity instance. |
| `ChangeGitPublication` | `($data): ChangeGitPublicationEntity` | Create a ChangeGitPublication entity instance. |
| `ChangeGroupMember` | `($data): ChangeGroupMemberEntity` | Create a ChangeGroupMember entity instance. |
| `ChangeLabel` | `($data): ChangeLabelEntity` | Create a ChangeLabel entity instance. |
| `ChangeLandingHold` | `($data): ChangeLandingHoldEntity` | Create a ChangeLandingHold entity instance. |
| `ChangeLandingRequest` | `($data): ChangeLandingRequestEntity` | Create a ChangeLandingRequest entity instance. |
| `ChangeRequestChange` | `($data): ChangeRequestChangeEntity` | Create a ChangeRequestChange entity instance. |
| `ChangeReviewer` | `($data): ChangeReviewerEntity` | Create a ChangeReviewer entity instance. |
| `ChangeTranscript` | `($data): ChangeTranscriptEntity` | Create a ChangeTranscript entity instance. |
| `ChangeTranscriptSummary` | `($data): ChangeTranscriptSummaryEntity` | Create a ChangeTranscriptSummary entity instance. |
| `CheckpointPrepareChunk` | `($data): CheckpointPrepareChunkEntity` | Create a CheckpointPrepareChunk entity instance. |
| `CiNode` | `($data): CiNodeEntity` | Create a CiNode entity instance. |
| `CiPipeline` | `($data): CiPipelineEntity` | Create a CiPipeline entity instance. |
| `CiPipelineRun` | `($data): CiPipelineRunEntity` | Create a CiPipelineRun entity instance. |
| `CiRunnerPool` | `($data): CiRunnerPoolEntity` | Create a CiRunnerPool entity instance. |
| `CiStatus` | `($data): CiStatusEntity` | Create a CiStatus entity instance. |
| `CliEvent` | `($data): CliEventEntity` | Create a CliEvent entity instance. |
| `CliRelease` | `($data): CliReleaseEntity` | Create a CliRelease entity instance. |
| `CloudWorkspaceBackupObject` | `($data): CloudWorkspaceBackupObjectEntity` | Create a CloudWorkspaceBackupObject entity instance. |
| `CodeRuleEvaluation` | `($data): CodeRuleEvaluationEntity` | Create a CodeRuleEvaluation entity instance. |
| `ComSiteAccess` | `($data): ComSiteAccessEntity` | Create a ComSiteAccess entity instance. |
| `ComSiteAccessSession` | `($data): ComSiteAccessSessionEntity` | Create a ComSiteAccessSession entity instance. |
| `CommentThreadComment` | `($data): CommentThreadCommentEntity` | Create a CommentThreadComment entity instance. |
| `CommitDiff` | `($data): CommitDiffEntity` | Create a CommitDiff entity instance. |
| `ConnectionRequest` | `($data): ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `($data): ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
| `ContactSubmission` | `($data): ContactSubmissionEntity` | Create a ContactSubmission entity instance. |
| `ControlComputer` | `($data): ControlComputerEntity` | Create a ControlComputer entity instance. |
| `ControlComputerControlOperation` | `($data): ControlComputerControlOperationEntity` | Create a ControlComputerControlOperation entity instance. |
| `CoordinationWait` | `($data): CoordinationWaitEntity` | Create a CoordinationWait entity instance. |
| `CredentialSignInCheck` | `($data): CredentialSignInCheckEntity` | Create a CredentialSignInCheck entity instance. |
| `DataResourceRotateCredential` | `($data): DataResourceRotateCredentialEntity` | Create a DataResourceRotateCredential entity instance. |
| `DeepScan` | `($data): DeepScanEntity` | Create a DeepScan entity instance. |
| `DeepScanFinding` | `($data): DeepScanFindingEntity` | Create a DeepScanFinding entity instance. |
| `DeepScanFlow` | `($data): DeepScanFlowEntity` | Create a DeepScanFlow entity instance. |
| `DeepScanMappedFlow` | `($data): DeepScanMappedFlowEntity` | Create a DeepScanMappedFlow entity instance. |
| `DeepScanOption` | `($data): DeepScanOptionEntity` | Create a DeepScanOption entity instance. |
| `DemoShare` | `($data): DemoShareEntity` | Create a DemoShare entity instance. |
| `DemoShareSegment` | `($data): DemoShareSegmentEntity` | Create a DemoShareSegment entity instance. |
| `Deployment` | `($data): DeploymentEntity` | Create a Deployment entity instance. |
| `DeploymentDashboardNomad` | `($data): DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentDetail` | `($data): DeploymentDetailEntity` | Create a DeploymentDetail entity instance. |
| `DeploymentFile` | `($data): DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DeploymentLog` | `($data): DeploymentLogEntity` | Create a DeploymentLog entity instance. |
| `DeploymentMetric` | `($data): DeploymentMetricEntity` | Create a DeploymentMetric entity instance. |
| `DeploymentPreview` | `($data): DeploymentPreviewEntity` | Create a DeploymentPreview entity instance. |
| `DeploymentSetting` | `($data): DeploymentSettingEntity` | Create a DeploymentSetting entity instance. |
| `DesktopLocalAgentModel` | `($data): DesktopLocalAgentModelEntity` | Create a DesktopLocalAgentModel entity instance. |
| `DesktopLocalAgentResponse` | `($data): DesktopLocalAgentResponseEntity` | Create a DesktopLocalAgentResponse entity instance. |
| `Device` | `($data): DeviceEntity` | Create a Device entity instance. |
| `DeviceBrowserOperation` | `($data): DeviceBrowserOperationEntity` | Create a DeviceBrowserOperation entity instance. |
| `DeviceControlMessage` | `($data): DeviceControlMessageEntity` | Create a DeviceControlMessage entity instance. |
| `DeviceControlOperation` | `($data): DeviceControlOperationEntity` | Create a DeviceControlOperation entity instance. |
| `DeviceEnterpriseRelay` | `($data): DeviceEnterpriseRelayEntity` | Create a DeviceEnterpriseRelay entity instance. |
| `DeviceFolderListing` | `($data): DeviceFolderListingEntity` | Create a DeviceFolderListing entity instance. |
| `DeviceGrant` | `($data): DeviceGrantEntity` | Create a DeviceGrant entity instance. |
| `DeviceInvocation` | `($data): DeviceInvocationEntity` | Create a DeviceInvocation entity instance. |
| `DeviceLocalEvent` | `($data): DeviceLocalEventEntity` | Create a DeviceLocalEvent entity instance. |
| `DevicePairing` | `($data): DevicePairingEntity` | Create a DevicePairing entity instance. |
| `DeviceProject` | `($data): DeviceProjectEntity` | Create a DeviceProject entity instance. |
| `DeviceScheduledCheckIn` | `($data): DeviceScheduledCheckInEntity` | Create a DeviceScheduledCheckIn entity instance. |
| `DockerBuilder` | `($data): DockerBuilderEntity` | Create a DockerBuilder entity instance. |
| `DockerBuilderSession` | `($data): DockerBuilderSessionEntity` | Create a DockerBuilderSession entity instance. |
| `DockerBuilderSetting` | `($data): DockerBuilderSettingEntity` | Create a DockerBuilderSetting entity instance. |
| `DomainDnsIntegration` | `($data): DomainDnsIntegrationEntity` | Create a DomainDnsIntegration entity instance. |
| `DomainPathRule` | `($data): DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream` | `($data): DreamEntity` | Create a Dream entity instance. |
| `Edge` | `($data): EdgeEntity` | Create an Edge entity instance. |
| `EmailVerification` | `($data): EmailVerificationEntity` | Create an EmailVerification entity instance. |
| `Environment` | `($data): EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `($data): EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `($data): EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `($data): EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `($data): EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `($data): EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `($data): EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `($data): EvidenceEntity` | Create an Evidence entity instance. |
| `ExecutionDesiredState` | `($data): ExecutionDesiredStateEntity` | Create an ExecutionDesiredState entity instance. |
| `ExecutionReconcilerTick` | `($data): ExecutionReconcilerTickEntity` | Create an ExecutionReconcilerTick entity instance. |
| `ExecutionRelease` | `($data): ExecutionReleaseEntity` | Create an ExecutionRelease entity instance. |
| `ExecutionRuntimeInstance` | `($data): ExecutionRuntimeInstanceEntity` | Create an ExecutionRuntimeInstance entity instance. |
| `Exploration` | `($data): ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage` | `($data): ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `($data): ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `($data): ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding` | `($data): FindingEntity` | Create a Finding entity instance. |
| `Gh` | `($data): GhEntity` | Create a Gh entity instance. |
| `GitImport` | `($data): GitImportEntity` | Create a GitImport entity instance. |
| `Github` | `($data): GithubEntity` | Create a Github entity instance. |
| `GithubApp` | `($data): GithubAppEntity` | Create a GithubApp entity instance. |
| `GithubAppImportableRepository` | `($data): GithubAppImportableRepositoryEntity` | Create a GithubAppImportableRepository entity instance. |
| `GithubAppInstallation` | `($data): GithubAppInstallationEntity` | Create a GithubAppInstallation entity instance. |
| `GithubAppInstallationAuthorization` | `($data): GithubAppInstallationAuthorizationEntity` | Create a GithubAppInstallationAuthorization entity instance. |
| `GithubAppUserAuthorization` | `($data): GithubAppUserAuthorizationEntity` | Create a GithubAppUserAuthorization entity instance. |
| `GithubCiRepository` | `($data): GithubCiRepositoryEntity` | Create a GithubCiRepository entity instance. |
| `GithubCiRepositoryCompatibilityReport` | `($data): GithubCiRepositoryCompatibilityReportEntity` | Create a GithubCiRepositoryCompatibilityReport entity instance. |
| `GithubConnection` | `($data): GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `GithubIntegration` | `($data): GithubIntegrationEntity` | Create a GithubIntegration entity instance. |
| `GithubOnboarding` | `($data): GithubOnboardingEntity` | Create a GithubOnboarding entity instance. |
| `GithubOnboardingBranch` | `($data): GithubOnboardingBranchEntity` | Create a GithubOnboardingBranch entity instance. |
| `GithubOnboardingImport` | `($data): GithubOnboardingImportEntity` | Create a GithubOnboardingImport entity instance. |
| `GithubOnboardingImportBatch` | `($data): GithubOnboardingImportBatchEntity` | Create a GithubOnboardingImportBatch entity instance. |
| `GithubOnboardingImportItem` | `($data): GithubOnboardingImportItemEntity` | Create a GithubOnboardingImportItem entity instance. |
| `GithubPullRequest` | `($data): GithubPullRequestEntity` | Create a GithubPullRequest entity instance. |
| `GithubRunnerAdmission` | `($data): GithubRunnerAdmissionEntity` | Create a GithubRunnerAdmission entity instance. |
| `GithubRunnerCache` | `($data): GithubRunnerCacheEntity` | Create a GithubRunnerCache entity instance. |
| `GithubRunnerEgress` | `($data): GithubRunnerEgressEntity` | Create a GithubRunnerEgress entity instance. |
| `GithubRunnerHistory` | `($data): GithubRunnerHistoryEntity` | Create a GithubRunnerHistory entity instance. |
| `GithubRunnerImage` | `($data): GithubRunnerImageEntity` | Create a GithubRunnerImage entity instance. |
| `GithubRunnerPool` | `($data): GithubRunnerPoolEntity` | Create a GithubRunnerPool entity instance. |
| `GithubRunnerSetup` | `($data): GithubRunnerSetupEntity` | Create a GithubRunnerSetup entity instance. |
| `Gitlab` | `($data): GitlabEntity` | Create a Gitlab entity instance. |
| `GitlabConnection` | `($data): GitlabConnectionEntity` | Create a GitlabConnection entity instance. |
| `GitlabImport` | `($data): GitlabImportEntity` | Create a GitlabImport entity instance. |
| `GitlabOauth` | `($data): GitlabOauthEntity` | Create a GitlabOauth entity instance. |
| `GrantAllAgent` | `($data): GrantAllAgentEntity` | Create a GrantAllAgent entity instance. |
| `HostingAppDomain` | `($data): HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `IdentityOrganization` | `($data): IdentityOrganizationEntity` | Create an IdentityOrganization entity instance. |
| `ImageRepository` | `($data): ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `ImageRepositoryTag` | `($data): ImageRepositoryTagEntity` | Create an ImageRepositoryTag entity instance. |
| `ImportBranchPolicy` | `($data): ImportBranchPolicyEntity` | Create an ImportBranchPolicy entity instance. |
| `Integration` | `($data): IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse` | `($data): InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation` | `($data): InvitationEntity` | Create an Invitation entity instance. |
| `InvocationControl` | `($data): InvocationControlEntity` | Create an InvocationControl entity instance. |
| `JobLogChunk` | `($data): JobLogChunkEntity` | Create a JobLogChunk entity instance. |
| `JobStep` | `($data): JobStepEntity` | Create a JobStep entity instance. |
| `JobWorkspace` | `($data): JobWorkspaceEntity` | Create a JobWorkspace entity instance. |
| `JourneyVariantReplay` | `($data): JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `($data): KnowledgeEntity` | Create a Knowledge entity instance. |
| `Known` | `($data): KnownEntity` | Create a Known entity instance. |
| `Label` | `($data): LabelEntity` | Create a Label entity instance. |
| `LeaseArtifact` | `($data): LeaseArtifactEntity` | Create a LeaseArtifact entity instance. |
| `LeaseCache` | `($data): LeaseCacheEntity` | Create a LeaseCache entity instance. |
| `LeaseLogChunk` | `($data): LeaseLogChunkEntity` | Create a LeaseLogChunk entity instance. |
| `LeaseReconciliation` | `($data): LeaseReconciliationEntity` | Create a LeaseReconciliation entity instance. |
| `LeaseStep` | `($data): LeaseStepEntity` | Create a LeaseStep entity instance. |
| `LeaseVerifyDiagnostic` | `($data): LeaseVerifyDiagnosticEntity` | Create a LeaseVerifyDiagnostic entity instance. |
| `LeaseVerifySecret` | `($data): LeaseVerifySecretEntity` | Create a LeaseVerifySecret entity instance. |
| `LeaseWorkspace` | `($data): LeaseWorkspaceEntity` | Create a LeaseWorkspace entity instance. |
| `LocalAgentDecision` | `($data): LocalAgentDecisionEntity` | Create a LocalAgentDecision entity instance. |
| `LocalAgentResponse` | `($data): LocalAgentResponseEntity` | Create a LocalAgentResponse entity instance. |
| `LocalThreadDelivery` | `($data): LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `($data): LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `LogStreamChunk` | `($data): LogStreamChunkEntity` | Create a LogStreamChunk entity instance. |
| `LogoImage` | `($data): LogoImageEntity` | Create a LogoImage entity instance. |
| `MarketingSetting` | `($data): MarketingSettingEntity` | Create a MarketingSetting entity instance. |
| `McpOauth` | `($data): McpOauthEntity` | Create a McpOauth entity instance. |
| `Me` | `($data): MeEntity` | Create a Me entity instance. |
| `MeEmail` | `($data): MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding` | `($data): MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile` | `($data): MediaFileEntity` | Create a MediaFile entity instance. |
| `Member` | `($data): MemberEntity` | Create a Member entity instance. |
| `Memory` | `($data): MemoryEntity` | Create a Memory entity instance. |
| `MergeQueueEntry` | `($data): MergeQueueEntryEntity` | Create a MergeQueueEntry entity instance. |
| `MergeRequest` | `($data): MergeRequestEntity` | Create a MergeRequest entity instance. |
| `MergeResolution` | `($data): MergeResolutionEntity` | Create a MergeResolution entity instance. |
| `MessagingConversationMessage` | `($data): MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `($data): MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `($data): MetricQueryEntity` | Create a MetricQuery entity instance. |
| `MetronomeWebhook` | `($data): MetronomeWebhookEntity` | Create a MetronomeWebhook entity instance. |
| `ModelSubscriptionAccount` | `($data): ModelSubscriptionAccountEntity` | Create a ModelSubscriptionAccount entity instance. |
| `ModelSubscriptionAccountConnection` | `($data): ModelSubscriptionAccountConnectionEntity` | Create a ModelSubscriptionAccountConnection entity instance. |
| `NetworkConnection` | `($data): NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NetworkingSpace` | `($data): NetworkingSpaceEntity` | Create a NetworkingSpace entity instance. |
| `Node` | `($data): NodeEntity` | Create a Node entity instance. |
| `NodeCertificate` | `($data): NodeCertificateEntity` | Create a NodeCertificate entity instance. |
| `NodeLease` | `($data): NodeLeaseEntity` | Create a NodeLease entity instance. |
| `NomadAllocation` | `($data): NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog` | `($data): NomadLogEntity` | Create a NomadLog entity instance. |
| `Now` | `($data): NowEntity` | Create a Now entity instance. |
| `ObservabilityClickhouseCluster` | `($data): ObservabilityClickhouseClusterEntity` | Create an ObservabilityClickhouseCluster entity instance. |
| `ObservabilityQuickwitCluster` | `($data): ObservabilityQuickwitClusterEntity` | Create an ObservabilityQuickwitCluster entity instance. |
| `ObservabilitySpace` | `($data): ObservabilitySpaceEntity` | Create an ObservabilitySpace entity instance. |
| `Openapi` | `($data): OpenapiEntity` | Create an Openapi entity instance. |
| `OrgInvitation` | `($data): OrgInvitationEntity` | Create an OrgInvitation entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationApp` | `($data): OrganizationAppEntity` | Create an OrganizationApp entity instance. |
| `OrganizationControl` | `($data): OrganizationControlEntity` | Create an OrganizationControl entity instance. |
| `OrganizationDevice` | `($data): OrganizationDeviceEntity` | Create an OrganizationDevice entity instance. |
| `OrganizationIdentityCertificate` | `($data): OrganizationIdentityCertificateEntity` | Create an OrganizationIdentityCertificate entity instance. |
| `OrganizationInteraction` | `($data): OrganizationInteractionEntity` | Create an OrganizationInteraction entity instance. |
| `OrganizationInvitation` | `($data): OrganizationInvitationEntity` | Create an OrganizationInvitation entity instance. |
| `OrganizationMessageFile` | `($data): OrganizationMessageFileEntity` | Create an OrganizationMessageFile entity instance. |
| `OrganizationOidcTrust` | `($data): OrganizationOidcTrustEntity` | Create an OrganizationOidcTrust entity instance. |
| `OrganizationRunEvent` | `($data): OrganizationRunEventEntity` | Create an OrganizationRunEvent entity instance. |
| `OrganizationRunOutcome` | `($data): OrganizationRunOutcomeEntity` | Create an OrganizationRunOutcome entity instance. |
| `OrganizationRunUsage` | `($data): OrganizationRunUsageEntity` | Create an OrganizationRunUsage entity instance. |
| `OrganizationSandbox` | `($data): OrganizationSandboxEntity` | Create an OrganizationSandbox entity instance. |
| `OrganizationSecret` | `($data): OrganizationSecretEntity` | Create an OrganizationSecret entity instance. |
| `OrganizationServiceAccount` | `($data): OrganizationServiceAccountEntity` | Create an OrganizationServiceAccount entity instance. |
| `OrganizationSetting` | `($data): OrganizationSettingEntity` | Create an OrganizationSetting entity instance. |
| `OrganizationSite` | `($data): OrganizationSiteEntity` | Create an OrganizationSite entity instance. |
| `OrganizationSubscription` | `($data): OrganizationSubscriptionEntity` | Create an OrganizationSubscription entity instance. |
| `OrganizationTool` | `($data): OrganizationToolEntity` | Create an OrganizationTool entity instance. |
| `OrganizationWorkloadIdentity` | `($data): OrganizationWorkloadIdentityEntity` | Create an OrganizationWorkloadIdentity entity instance. |
| `OtelIngest` | `($data): OtelIngestEntity` | Create an OtelIngest entity instance. |
| `Page` | `($data): PageEntity` | Create a Page entity instance. |
| `PageAgent` | `($data): PageAgentEntity` | Create a PageAgent entity instance. |
| `PageArtefact` | `($data): PageArtefactEntity` | Create a PageArtefact entity instance. |
| `PageCiPipelineRun` | `($data): PageCiPipelineRunEntity` | Create a PageCiPipelineRun entity instance. |
| `PageProjectRun` | `($data): PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PageRepoVcCommit` | `($data): PageRepoVcCommitEntity` | Create a PageRepoVcCommit entity instance. |
| `PagesBilling` | `($data): PagesBillingEntity` | Create a PagesBilling entity instance. |
| `PagesGithubOnboarding` | `($data): PagesGithubOnboardingEntity` | Create a PagesGithubOnboarding entity instance. |
| `PagesMember` | `($data): PagesMemberEntity` | Create a PagesMember entity instance. |
| `PagesProjectCredential` | `($data): PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `($data): PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `($data): PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `($data): PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PagesRegistry` | `($data): PagesRegistryEntity` | Create a PagesRegistry entity instance. |
| `PagesSession` | `($data): PagesSessionEntity` | Create a PagesSession entity instance. |
| `Pairing` | `($data): PairingEntity` | Create a Pairing entity instance. |
| `PairingEvent` | `($data): PairingEventEntity` | Create a PairingEvent entity instance. |
| `ParallelV1` | `($data): ParallelV1Entity` | Create a ParallelV1 entity instance. |
| `PatchsetDiff` | `($data): PatchsetDiffEntity` | Create a PatchsetDiff entity instance. |
| `PersonalAccessToken` | `($data): PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `($data): PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `($data): PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `($data): PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `($data): PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
| `ProactiveAgentWaitlistEntry` | `($data): ProactiveAgentWaitlistEntryEntity` | Create a ProactiveAgentWaitlistEntry entity instance. |
| `Product` | `($data): ProductEntity` | Create a Product entity instance. |
| `ProductMapIdentityDecision` | `($data): ProductMapIdentityDecisionEntity` | Create a ProductMapIdentityDecision entity instance. |
| `ProductMapJourney` | `($data): ProductMapJourneyEntity` | Create a ProductMapJourney entity instance. |
| `ProductMapJourneyReplay` | `($data): ProductMapJourneyReplayEntity` | Create a ProductMapJourneyReplay entity instance. |
| `ProductMapObservation` | `($data): ProductMapObservationEntity` | Create a ProductMapObservation entity instance. |
| `ProductMapQuestion` | `($data): ProductMapQuestionEntity` | Create a ProductMapQuestion entity instance. |
| `ProductMapState` | `($data): ProductMapStateEntity` | Create a ProductMapState entity instance. |
| `Project` | `($data): ProjectEntity` | Create a Project entity instance. |
| `ProjectAndroidApk` | `($data): ProjectAndroidApkEntity` | Create a ProjectAndroidApk entity instance. |
| `ProjectCodeMap` | `($data): ProjectCodeMapEntity` | Create a ProjectCodeMap entity instance. |
| `ProjectEnvironment` | `($data): ProjectEnvironmentEntity` | Create a ProjectEnvironment entity instance. |
| `ProjectFinding` | `($data): ProjectFindingEntity` | Create a ProjectFinding entity instance. |
| `ProjectFixture` | `($data): ProjectFixtureEntity` | Create a ProjectFixture entity instance. |
| `ProjectIosApp` | `($data): ProjectIosAppEntity` | Create a ProjectIosApp entity instance. |
| `ProjectMessagingConversation` | `($data): ProjectMessagingConversationEntity` | Create a ProjectMessagingConversation entity instance. |
| `ProjectOverviewMetric` | `($data): ProjectOverviewMetricEntity` | Create a ProjectOverviewMetric entity instance. |
| `ProjectOverviewPullRequest` | `($data): ProjectOverviewPullRequestEntity` | Create a ProjectOverviewPullRequest entity instance. |
| `ProjectProductMap` | `($data): ProjectProductMapEntity` | Create a ProjectProductMap entity instance. |
| `ProjectRecording` | `($data): ProjectRecordingEntity` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan` | `($data): ProjectRunPlanEntity` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule` | `($data): ProjectRunScheduleEntity` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption` | `($data): ProjectScenarioOptionEntity` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow` | `($data): ProjectScenarioRowEntity` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting` | `($data): ProjectSettingEntity` | Create a ProjectSetting entity instance. |
| `PullRequest` | `($data): PullRequestEntity` | Create a PullRequest entity instance. |
| `PullRequestAction` | `($data): PullRequestActionEntity` | Create a PullRequestAction entity instance. |
| `PullRequestMagicMerge` | `($data): PullRequestMagicMergeEntity` | Create a PullRequestMagicMerge entity instance. |
| `PullRequestSetting` | `($data): PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `($data): PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `($data): PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `PullRequestTranscript` | `($data): PullRequestTranscriptEntity` | Create a PullRequestTranscript entity instance. |
| `PullZone` | `($data): PullZoneEntity` | Create a PullZone entity instance. |
| `Recorder` | `($data): RecorderEntity` | Create a Recorder entity instance. |
| `Registry` | `($data): RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2` | `($data): RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentConnection` | `($data): RelayAgentConnectionEntity` | Create a RelayAgentConnection entity instance. |
| `RelayAgentLocalThread` | `($data): RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `RelaySignal` | `($data): RelaySignalEntity` | Create a RelaySignal entity instance. |
| `ReleaseRollout` | `($data): ReleaseRolloutEntity` | Create a ReleaseRollout entity instance. |
| `Repo` | `($data): RepoEntity` | Create a Repo entity instance. |
| `RepoAccessToken` | `($data): RepoAccessTokenEntity` | Create a RepoAccessToken entity instance. |
| `RepoAction` | `($data): RepoActionEntity` | Create a RepoAction entity instance. |
| `RepoAgentCheckpoint` | `($data): RepoAgentCheckpointEntity` | Create a RepoAgentCheckpoint entity instance. |
| `RepoAgentSession` | `($data): RepoAgentSessionEntity` | Create a RepoAgentSession entity instance. |
| `RepoBookmarkProtection` | `($data): RepoBookmarkProtectionEntity` | Create a RepoBookmarkProtection entity instance. |
| `RepoBookmarkProtectionEvent` | `($data): RepoBookmarkProtectionEventEntity` | Create a RepoBookmarkProtectionEvent entity instance. |
| `RepoCloudWorkspaceBackup` | `($data): RepoCloudWorkspaceBackupEntity` | Create a RepoCloudWorkspaceBackup entity instance. |
| `RepoCodeRule` | `($data): RepoCodeRuleEntity` | Create a RepoCodeRule entity instance. |
| `RepoSetting` | `($data): RepoSettingEntity` | Create a RepoSetting entity instance. |
| `RepoStat` | `($data): RepoStatEntity` | Create a RepoStat entity instance. |
| `RepoVc` | `($data): RepoVcEntity` | Create a RepoVc entity instance. |
| `RepoVcCommit` | `($data): RepoVcCommitEntity` | Create a RepoVcCommit entity instance. |
| `ReportReplay` | `($data): ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario` | `($data): ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RepositoryAccess` | `($data): RepositoryAccessEntity` | Create a RepositoryAccess entity instance. |
| `RepositoryAccessResolve` | `($data): RepositoryAccessResolveEntity` | Create a RepositoryAccessResolve entity instance. |
| `RepositoryEvent` | `($data): RepositoryEventEntity` | Create a RepositoryEvent entity instance. |
| `RepositoryImport` | `($data): RepositoryImportEntity` | Create a RepositoryImport entity instance. |
| `RepositoryImportSession` | `($data): RepositoryImportSessionEntity` | Create a RepositoryImportSession entity instance. |
| `RepositoryImportSessionRepository` | `($data): RepositoryImportSessionRepositoryEntity` | Create a RepositoryImportSessionRepository entity instance. |
| `RepositoryImportSessionSelection` | `($data): RepositoryImportSessionSelectionEntity` | Create a RepositoryImportSessionSelection entity instance. |
| `RepositorySandboxEnvironment` | `($data): RepositorySandboxEnvironmentEntity` | Create a RepositorySandboxEnvironment entity instance. |
| `RoderCodeRepair` | `($data): RoderCodeRepairEntity` | Create a RoderCodeRepair entity instance. |
| `RoderCodeRepairSetting` | `($data): RoderCodeRepairSettingEntity` | Create a RoderCodeRepairSetting entity instance. |
| `RoderMachine` | `($data): RoderMachineEntity` | Create a RoderMachine entity instance. |
| `RoderRun` | `($data): RoderRunEntity` | Create a RoderRun entity instance. |
| `RoderWorkspaceCredential` | `($data): RoderWorkspaceCredentialEntity` | Create a RoderWorkspaceCredential entity instance. |
| `RunArtifact` | `($data): RunArtifactEntity` | Create a RunArtifact entity instance. |
| `RunJob` | `($data): RunJobEntity` | Create a RunJob entity instance. |
| `RunScenarioRun` | `($data): RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `($data): RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `($data): RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate` | `($data): RunUpdateEntity` | Create a RunUpdate entity instance. |
| `RunWorkspaceCredential` | `($data): RunWorkspaceCredentialEntity` | Create a RunWorkspaceCredential entity instance. |
| `RunnerLease` | `($data): RunnerLeaseEntity` | Create a RunnerLease entity instance. |
| `RunnerPoolNodeEnrollmentToken` | `($data): RunnerPoolNodeEnrollmentTokenEntity` | Create a RunnerPoolNodeEnrollmentToken entity instance. |
| `RunnerPoolRunner` | `($data): RunnerPoolRunnerEntity` | Create a RunnerPoolRunner entity instance. |
| `RuntimeInstanceHealthSnapshot` | `($data): RuntimeInstanceHealthSnapshotEntity` | Create a RuntimeInstanceHealthSnapshot entity instance. |
| `SandboxIntegration` | `($data): SandboxIntegrationEntity` | Create a SandboxIntegration entity instance. |
| `ScenarioRevision` | `($data): ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `($data): ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `($data): ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `SecretGrant` | `($data): SecretGrantEntity` | Create a SecretGrant entity instance. |
| `SecretVersion` | `($data): SecretVersionEntity` | Create a SecretVersion entity instance. |
| `ServiceEndpoint` | `($data): ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `Setting` | `($data): SettingEntity` | Create a Setting entity instance. |
| `SettingMutationLease` | `($data): SettingMutationLeaseEntity` | Create a SettingMutationLease entity instance. |
| `Signal` | `($data): SignalEntity` | Create a Signal entity instance. |
| `SignalInbound` | `($data): SignalInboundEntity` | Create a SignalInbound entity instance. |
| `SignalIntegration` | `($data): SignalIntegrationEntity` | Create a SignalIntegration entity instance. |
| `SignalIntegrationDelivery` | `($data): SignalIntegrationDeliveryEntity` | Create a SignalIntegrationDelivery entity instance. |
| `SignalIntegrationTarget` | `($data): SignalIntegrationTargetEntity` | Create a SignalIntegrationTarget entity instance. |
| `SignalSubscription` | `($data): SignalSubscriptionEntity` | Create a SignalSubscription entity instance. |
| `Site` | `($data): SiteEntity` | Create a Site entity instance. |
| `SiteAccessKey` | `($data): SiteAccessKeyEntity` | Create a SiteAccessKey entity instance. |
| `SitePreview` | `($data): SitePreviewEntity` | Create a SitePreview entity instance. |
| `SiteSecret` | `($data): SiteSecretEntity` | Create a SiteSecret entity instance. |
| `SlackChannel` | `($data): SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SourceConnection` | `($data): SourceConnectionEntity` | Create a SourceConnection entity instance. |
| `SpaceAlertRule` | `($data): SpaceAlertRuleEntity` | Create a SpaceAlertRule entity instance. |
| `SpaceAuditEvent` | `($data): SpaceAuditEventEntity` | Create a SpaceAuditEvent entity instance. |
| `SpaceDnsRecord` | `($data): SpaceDnsRecordEntity` | Create a SpaceDnsRecord entity instance. |
| `SpaceEnrollmentToken` | `($data): SpaceEnrollmentTokenEntity` | Create a SpaceEnrollmentToken entity instance. |
| `SpaceGateway` | `($data): SpaceGatewayEntity` | Create a SpaceGateway entity instance. |
| `SpaceGroup` | `($data): SpaceGroupEntity` | Create a SpaceGroup entity instance. |
| `SpaceGroupMembership` | `($data): SpaceGroupMembershipEntity` | Create a SpaceGroupMembership entity instance. |
| `SpaceLogStream` | `($data): SpaceLogStreamEntity` | Create a SpaceLogStream entity instance. |
| `SpaceMetricSery` | `($data): SpaceMetricSeryEntity` | Create a SpaceMetricSery entity instance. |
| `SpaceOtelCollector` | `($data): SpaceOtelCollectorEntity` | Create a SpaceOtelCollector entity instance. |
| `SpacePeer` | `($data): SpacePeerEntity` | Create a SpacePeer entity instance. |
| `SpacePeerAttachment` | `($data): SpacePeerAttachmentEntity` | Create a SpacePeerAttachment entity instance. |
| `SpacePolicy` | `($data): SpacePolicyEntity` | Create a SpacePolicy entity instance. |
| `SpaceSegment` | `($data): SpaceSegmentEntity` | Create a SpaceSegment entity instance. |
| `SpaceTraceSpan` | `($data): SpaceTraceSpanEntity` | Create a SpaceTraceSpan entity instance. |
| `Spark` | `($data): SparkEntity` | Create a Spark entity instance. |
| `SparkAgentIntegration` | `($data): SparkAgentIntegrationEntity` | Create a SparkAgentIntegration entity instance. |
| `SparkAgentLocalThread` | `($data): SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `SparkAgentSite` | `($data): SparkAgentSiteEntity` | Create a SparkAgentSite entity instance. |
| `SparkAgentSkill` | `($data): SparkAgentSkillEntity` | Create a SparkAgentSkill entity instance. |
| `SparkAgentThread` | `($data): SparkAgentThreadEntity` | Create a SparkAgentThread entity instance. |
| `SparkCredit` | `($data): SparkCreditEntity` | Create a SparkCredit entity instance. |
| `SparkCreditAgentUsage` | `($data): SparkCreditAgentUsageEntity` | Create a SparkCreditAgentUsage entity instance. |
| `SparkCreditUsageTotal` | `($data): SparkCreditUsageTotalEntity` | Create a SparkCreditUsageTotal entity instance. |
| `StaticSite` | `($data): StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `($data): StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `($data): StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `StatusChange` | `($data): StatusChangeEntity` | Create a StatusChange entity instance. |
| `StatusCommit` | `($data): StatusCommitEntity` | Create a StatusCommit entity instance. |
| `StatusPatchset` | `($data): StatusPatchsetEntity` | Create a StatusPatchset entity instance. |
| `StripeWebhook` | `($data): StripeWebhookEntity` | Create a StripeWebhook entity instance. |
| `SubmitTelemetry` | `($data): SubmitTelemetryEntity` | Create a SubmitTelemetry entity instance. |
| `SubscriptionModel` | `($data): SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `SwarmEvent` | `($data): SwarmEventEntity` | Create a SwarmEvent entity instance. |
| `SwarmLive` | `($data): SwarmLiveEntity` | Create a SwarmLive entity instance. |
| `SwarmNote` | `($data): SwarmNoteEntity` | Create a SwarmNote entity instance. |
| `SwarmTask` | `($data): SwarmTaskEntity` | Create a SwarmTask entity instance. |
| `TaskLease` | `($data): TaskLeaseEntity` | Create a TaskLease entity instance. |
| `ThreadPreview` | `($data): ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `ThreadPreviewAccess` | `($data): ThreadPreviewAccessEntity` | Create a ThreadPreviewAccess entity instance. |
| `ToolFeedback` | `($data): ToolFeedbackEntity` | Create a ToolFeedback entity instance. |
| `Transcript` | `($data): TranscriptEntity` | Create a Transcript entity instance. |
| `V1Message` | `($data): V1MessageEntity` | Create a V1Message entity instance. |
| `VcBranch` | `($data): VcBranchEntity` | Create a VcBranch entity instance. |
| `VcBrowser` | `($data): VcBrowserEntity` | Create a VcBrowser entity instance. |
| `VcChange` | `($data): VcChangeEntity` | Create a VcChange entity instance. |
| `VcChangeGroup` | `($data): VcChangeGroupEntity` | Create a VcChangeGroup entity instance. |
| `VcFile` | `($data): VcFileEntity` | Create a VcFile entity instance. |
| `VcMergeQueue` | `($data): VcMergeQueueEntity` | Create a VcMergeQueue entity instance. |
| `VcStack` | `($data): VcStackEntity` | Create a VcStack entity instance. |
| `VcsNode` | `($data): VcsNodeEntity` | Create a VcsNode entity instance. |
| `VcsSetting` | `($data): VcsSettingEntity` | Create a VcsSetting entity instance. |
| `VerificationProjectCredential` | `($data): VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `($data): VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `($data): VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `($data): VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `($data): VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `($data): VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyEmailVerification` | `($data): VerifyEmailVerificationEntity` | Create a VerifyEmailVerification entity instance. |
| `VerifySignalIntegration` | `($data): VerifySignalIntegrationEntity` | Create a VerifySignalIntegration entity instance. |
| `VerifyStaticSiteDomain` | `($data): VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `($data): VersionLogEntity` | Create a VersionLog entity instance. |
| `WaitlistApplication` | `($data): WaitlistApplicationEntity` | Create a WaitlistApplication entity instance. |
| `WebBotAuth` | `($data): WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WebhookGitlab` | `($data): WebhookGitlabEntity` | Create a WebhookGitlab entity instance. |
| `WorkflowRunStep` | `($data): WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `($data): WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `($data): WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |
| `WorkspaceActivity` | `($data): WorkspaceActivityEntity` | Create a WorkspaceActivity entity instance. |
| `WorkspaceActivityNotification` | `($data): WorkspaceActivityNotificationEntity` | Create a WorkspaceActivityNotification entity instance. |
| `WorkspaceSpace` | `($data): WorkspaceSpaceEntity` | Create a WorkspaceSpace entity instance. |
| `WorkspaceSpacePreference` | `($data): WorkspaceSpacePreferenceEntity` | Create a WorkspaceSpacePreference entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `update` | `($reqdata, $ctrl): mixed` | Update an existing entity, and return it. |
| `patch` | `($reqdata, $ctrl): mixed` | Change part of an existing entity, and return it. |
| `remove` | `($reqmatch, $ctrl): mixed` | Remove an entity, and return it marked as deleted. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: Create, List, Load, Update.

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

Operations: List.

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

Operations: Create, List, Load, Remove.

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

Operations: List, Update.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List.

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

Operations: Create, List, Load.

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

#### AgentWebPreview

| Field | Description |
| --- | --- |
| `description` |  |
| `icon_url` |  |
| `image_url` |  |
| `title` |  |

Operations: List.

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

Operations: Create, List, Load, Remove.

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

#### AppAccess

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/app_access/callback`

#### AppAccessJwk

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/artifacts/{id}/expire`

#### ArtifactCacheNamespace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/cache_namespaces/{id}/archive`

#### ArtifactImageRepository

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/image_repositories/{id}/archive`

#### ArtifactPackageMirror

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/package_mirrors/{id}/pause`

#### ArtifactRetentionPolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List.

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

Operations: Create, List, Remove.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

#### Change

| Field | Description |
| --- | --- |
| `counts` | Counts for each state across the active non-state filters. |
| `filters` |  |
| `github_sync` |  |
| `result` | What this page is a page of. |

Operations: List.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load.

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

Operations: List.

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

Operations: List.

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

#### ExecutionDesiredState

| Field | Description |
| --- | --- |
| `desired_state` |  |
| `id` |  |
| `stop_observed` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/execution/desired_states/{id}/reconcile`

#### ExecutionReconcilerTick

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load.

API path: `/api/v1/execution/reconciler_ticks`

#### ExecutionRelease

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load.

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

Operations: Create, List.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Patch, Update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps`

#### JobWorkspace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Patch, Update.

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

Operations: Create, List, Load.

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

Operations: List.

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

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load.

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

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/observability/clickhouse_clusters/{id}/activate`

#### ObservabilityQuickwitCluster

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/observability/quickwit_clusters/{id}/activate`

#### ObservabilitySpace

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load.

API path: `/api/v1/relay/pairings`

#### PairingEvent

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Patch, Update.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load.

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

Operations: Create, List.

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

Operations: Create, List.

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

Operations: Create, List, Load.

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

Operations: Create, List.

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

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat`

#### RuntimeInstanceHealthSnapshot

| Field | Description |
| --- | --- |

Operations: Create, List.

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

Operations: Create, List, Patch, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore`

#### SecretVersion

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Remove.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{space_id}/alert_rules/{id}/activate`

#### SpaceAuditEvent

| Field | Description |
| --- | --- |

Operations: Create, List.

API path: `/api/v1/observability/spaces/{space_id}/audit_events`

#### SpaceDnsRecord

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/dns_records`

#### SpaceEnrollmentToken

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke`

#### SpaceGateway

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat`

#### SpaceGroup

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/groups`

#### SpaceGroupMembership

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/group_memberships`

#### SpaceLogStream

| Field | Description |
| --- | --- |

Operations: Create, List.

API path: `/api/v1/observability/spaces/{space_id}/log_streams`

#### SpaceMetricSery

| Field | Description |
| --- | --- |

Operations: Create, List.

API path: `/api/v1/observability/spaces/{space_id}/metric_series`

#### SpaceOtelCollector

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate`

#### SpacePeer

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peers/{id}/approve`

#### SpacePeerAttachment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peer_attachments`

#### SpacePolicy

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/policies/{id}/activate`

#### SpaceSegment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/segments`

#### SpaceTraceSpan

| Field | Description |
| --- | --- |

Operations: Create, List.

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

Operations: Create, List.

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

Operations: Create, List.

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

Operations: Create, List, Load, Patch, Update.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Create an instance: `$a2a_well_known = $client->A2aWellKnown();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AdminOrg

Create an instance: `$admin_org = $client->AdminOrg();`

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
| `billing_email` | `mixed` |  |
| `billing_reason` | `string` | Required when setting an agreed price |
| `customize_onboarding_packages` | `bool` |  |
| `deployment_usage_visibility` | `string` |  |
| `deployment_usage_visible` | `bool` |  |
| `id` | `string` |  |
| `monthly_price_dollars` | `mixed` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` | `mixed` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `bool` |  |
| `onboarding_package_keys` | `mixed` | Package keys offered when customizing onboarding. |
| `owner_email` | `string` |  |
| `package_id` | `mixed` | Active customer package public ID. |
| `skip_payment` | `bool` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AdminOrg record (throws on error).
$admin_org = $client->AdminOrg()->load(["id" => "admin_org_id"]);
```

#### Example: List

```php
// list() returns an array of AdminOrg entities, one per record (throws on error).
$admin_orgs = $client->AdminOrg()->list();
```

#### Example: Create

```php
$admin_org = $client->AdminOrg()->create([
    "name" => null, // string
    "owner_email" => null, // string
    "slug" => null, // string
]);
```


### Agent

Create an instance: `$agent = $client->Agent();`

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
| `attention` | `mixed` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `mixed` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `mixed` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `mixed` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `string` |  |
| `last_reply_at` | `mixed` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `array` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `mixed` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `array` | Teammates named as managers beside the owner. |
| `model_change_action` | `mixed` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `mixed` |  |
| `preview` | `mixed` |  |
| `preview_received_at` | `mixed` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `mixed` |  |
| `reply_triage` | `mixed` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` |  |
| `sharing_fixed` | `bool` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` |  |
| `slug` | `string` | Optional explicit API alias. |
| `status` | `string` |  |
| `team_role` | `string` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` |  |
| `url_slug` | `string` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `visibility` | `string` | Defaults to organization. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Agent record (throws on error).
$agent = $client->Agent()->load(["id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Agent entities, one per record (throws on error).
$agents = $client->Agent()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$agent = $client->Agent()->create([
    "organization_id" => null, // string
    "name" => null, // string
]);
```


### AgentApp

Create an instance: `$agent_app = $client->AgentApp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `array` |  |
| `can_message` | `bool` | The viewer may send input to the author agent |
| `deployments_count` | `int` | Increases with every deploy of the site |
| `description` | `string` |  |
| `hidden_install_count` | `int` | Installs by agents the viewer cannot open |
| `id` | `string` |  |
| `install_count` | `int` |  |
| `install_targets` | `array` | Active agents the viewer owns or manages, which they can install apps on |
| `installed_by` | `array` |  |
| `installed_target_ids` | `array` | Install targets of the viewer that have this app installed |
| `items` | `array` |  |
| `mcp_url` | `mixed` |  |
| `next_cursor` | `mixed` | Pass as cursor to load older apps |
| `owner` | `array` | The person who controls the author agent |
| `thread` | `mixed` | The thread that published the app, when the viewer can open the author agent |
| `title` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentApp record (throws on error).
$agent_app = $client->AgentApp()->load(["id" => "agent_app_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentApp entities, one per record (throws on error).
$agent_apps = $client->AgentApp()->list(["organization_id" => "example"]);
```


### AgentAppInstall

Create an instance: `$agent_app_install = $client->AgentAppInstall();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `installed` | `bool` |  |


### AgentAttachment

Create an instance: `$agent_attachment = $client->AgentAttachment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `int` |  |
| `content_type` | `string` |  |
| `file_name` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```php
$agent_attachment = $client->AgentAttachment()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "byte_size" => null, // int
    "content_type" => null, // string
    "file_name" => null, // string
]);
```


### AgentAutomation

Create an instance: `$agent_automation = $client->AgentAutomation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `definition` | `array` |  |
| `event_subscriptions` | `array` |  |
| `event_triggers` | `array` |  |
| `expected_revision` | `int` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `int` |  |
| `schedule` | `mixed` |  |
| `schedules` | `array` |  |
| `version` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentAutomation record (throws on error).
$agent_automation = $client->AgentAutomation()->load(["id" => "agent_automation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentAutomation entities, one per record (throws on error).
$agent_automations = $client->AgentAutomation()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentAvatar

Create an instance: `$agent_avatar = $client->AgentAvatar();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentCommand

Create an instance: `$agent_command = $client->AgentCommand();`

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
| `skill_model_visible` | `bool` |  |
| `source` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentCommand entities, one per record (throws on error).
$agent_commands = $client->AgentCommand()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentComputer

Create an instance: `$agent_computer = $client->AgentComputer();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentConnection

Create an instance: `$agent_connection = $client->AgentConnection();`

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
| `actions` | `array` |  |
| `activity` | `array` |  |
| `admin_disabled_at` | `mixed` |  |
| `agent_tools` | `bool` |  |
| `authentication` | `string` |  |
| `authorized_at` | `mixed` |  |
| `can_create_account` | `bool` | Whether another account can be created directly from this provider. |
| `capabilities` | `array` |  |
| `catalog_section` | `string` | Server-owned grouping in the agent integration catalog. |
| `category` | `string` | Short product label, such as CRM or Email. |
| `certification` | `string` |  |
| `checked_at` | `mixed` |  |
| `connection` | `array` |  |
| `consent` | `mixed` |  |
| `created_at` | `string` |  |
| `creation_key` | `string` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` | `mixed` |  |
| `description` | `string` | One-line catalog description of the app. |
| `disabled_reason` | `mixed` |  |
| `failure_code` | `mixed` |  |
| `generation` | `int` |  |
| `grants` | `array` |  |
| `grants_pagination` | `array` |  |
| `id` | `string` |  |
| `limits` | `array` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `pagination` | `array` |  |
| `policy_digest` | `string` |  |
| `provider` | `array` |  |
| `provider_disabled_reason` | `mixed` |  |
| `provider_identity` | `array` |  |
| `revoked_at` | `mixed` |  |
| `schema_version` | `int` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `triggers` | `array` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentConnection record (throws on error).
$agent_connection = $client->AgentConnection()->load(["id" => "agent_connection_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentConnection entities, one per record (throws on error).
$agent_connections = $client->AgentConnection()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$agent_connection = $client->AgentConnection()->create([
    "organization_id" => null, // string
    "name" => null, // string
    "toolkit" => null, // string
]);
```


### AgentConnectionDelegation

Create an instance: `$agent_connection_delegation = $client->AgentConnectionDelegation();`

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
| `revoked_at` | `mixed` |  |
| `roles` | `array` |  |
| `usable` | `bool` |  |
| `user_id` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentConnectionDelegation entities, one per record (throws on error).
$agent_connection_delegations = $client->AgentConnectionDelegation()->list(["agent_connection_id" => "example", "organization_id" => "example"]);
```


### AgentConnectionGrant

Create an instance: `$agent_connection_grant = $client->AgentConnectionGrant();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `array` |  |
| `agent_connection_id` | `string` |  |
| `automation_id` | `string` |  |
| `connection_generation` | `int` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revision` | `int` |  |
| `revoked_at` | `mixed` |  |
| `status` | `string` |  |
| `usable` | `bool` |  |
| `user_id` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentConnectionGrant entities, one per record (throws on error).
$agent_connection_grants = $client->AgentConnectionGrant()->list(["agent_connection_id" => "example", "organization_id" => "example"]);
```


### AgentConnectionResource

Create an instance: `$agent_connection_resource = $client->AgentConnectionResource();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `mixed` |  |
| `next_cursor` | `mixed` |  |
| `query` | `string` |  |
| `resources` | `array` |  |

#### Example: Create

```php
$agent_connection_resource = $client->AgentConnectionResource()->create([
    "agent_connection_id" => null, // string
    "organization_id" => null, // string
]);
```


### AgentConnectionSafetyControl

Create an instance: `$agent_connection_safety_control = $client->AgentConnectionSafetyControl();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_disabled_at` | `mixed` |  |
| `authorized_at` | `mixed` |  |
| `checked_at` | `mixed` |  |
| `created_at` | `string` |  |
| `custodian_id` | `mixed` |  |
| `failure_code` | `mixed` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `provider_disabled_reason` | `mixed` |  |
| `provider_identity` | `array` |  |
| `revoked_at` | `mixed` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentConnectionSafetyControl entities, one per record (throws on error).
$agent_connection_safety_controls = $client->AgentConnectionSafetyControl()->list(["organization_id" => "example"]);
```


### AgentConnectionTriggerSubscription

Create an instance: `$agent_connection_trigger_subscription = $client->AgentConnectionTriggerSubscription();`

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
| `configuration` | `array` |  |
| `created_at` | `string` |  |
| `defaults` | `array` |  |
| `delivery` | `string` |  |
| `enabled` | `bool` |  |
| `failure_code` | `mixed` |  |
| `failure_request_id` | `mixed` |  |
| `id` | `string` |  |
| `latency` | `string` |  |
| `name` | `string` |  |
| `reconcile_at` | `string` |  |
| `reconciliation_uncertain` | `bool` |  |
| `remote_enabled` | `mixed` |  |
| `replacement_id` | `mixed` |  |
| `retired_at` | `mixed` |  |
| `retirement_completed_at` | `mixed` |  |
| `schema` | `array` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `toolkit_version` | `string` |  |
| `trigger_slug` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `string` |  |
| `waiting_for_retirement` | `bool` |  |

#### Example: List

```php
// list() returns an array of AgentConnectionTriggerSubscription entities, one per record (throws on error).
$agent_connection_trigger_subscriptions = $client->AgentConnectionTriggerSubscription()->list(["agent_connection_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_connection_trigger_subscription = $client->AgentConnectionTriggerSubscription()->create([
    "agent_connection_id" => null, // string
    "organization_id" => null, // string
    "configuration" => null, // array
    "trigger_slug" => null, // string
]);
```


### AgentContextCheckpoint

Create an instance: `$agent_context_checkpoint = $client->AgentContextCheckpoint();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentControlFlow

Create an instance: `$agent_control_flow = $client->AgentControlFlow();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel` | `bool` |  |
| `cancellation_requested` | `bool` |  |
| `device_name` | `string` |  |
| `flow_id` | `string` |  |
| `id` | `string` |  |
| `providers` | `array` |  |
| `repair_of_flow_id` | `string` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` |  |
| `step_count` | `int` |  |
| `title` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentControlFlow record (throws on error).
$agent_control_flow = $client->AgentControlFlow()->load(["id" => "agent_control_flow_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentControlFlow entities, one per record (throws on error).
$agent_control_flows = $client->AgentControlFlow()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentCoordination

Create an instance: `$agent_coordination = $client->AgentCoordination();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentEmail

Create an instance: `$agent_email = $client->AgentEmail();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `mixed` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` |  |
| `id` | `string` |  |
| `preview` | `string` |  |
| `received_at` | `string` |  |
| `recipient_tag` | `mixed` | The +tag the sender used, if any |
| `spam` | `bool` | SES judged it spam |
| `subject` | `mixed` |  |
| `text` | `string` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentEmail record (throws on error).
$agent_email = $client->AgentEmail()->load(["id" => "agent_email_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```


### AgentEvent

Create an instance: `$agent_event = $client->AgentEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of AgentEvent entities, one per record (throws on error).
$agent_events = $client->AgentEvent()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentFile

Create an instance: `$agent_file = $client->AgentFile();`

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
| `size_bytes` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentFile record (throws on error).
$agent_file = $client->AgentFile()->load(["id" => "agent_file_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```


### AgentInput

Create an instance: `$agent_input = $client->AgentInput();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `array` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `array` |  |
| `browser_context` | `array` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `array` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `mixed` |  |
| `requester_membership_id` | `string` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` |  |

#### Example: Create

```php
$agent_input = $client->AgentInput()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "browser_context" => null, // array
    "client_time" => null, // array
    "conversation_id" => null, // string
    "text" => null, // string
]);
```


### AgentIntegration

Create an instance: `$agent_integration = $client->AgentIntegration();`

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
| `account_counts` | `array` | Accounts the viewer can see per toolkit, across all account pages. |
| `can_cancel_sign_in` | `bool` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_enable` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_reconnect` | `bool` |  |
| `can_sync` | `bool` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` | `array` |  |
| `connected_by` | `mixed` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `bool` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | `array` | Signed-in accounts per toolkit, across all account pages. |
| `connections` | `array` |  |
| `creation_key` | `string` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | `mixed` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `pagination` | `array` |  |
| `pending_counts` | `array` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` | `mixed` |  |
| `provider_identity` | `array` |  |
| `provider_name` | `mixed` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `bool` |  |
| `team_sharing_version` | `int` |  |
| `toolkit` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentIntegration record (throws on error).
$agent_integration = $client->AgentIntegration()->load(["id" => "agent_integration_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentIntegration entities, one per record (throws on error).
$agent_integrations = $client->AgentIntegration()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$agent_integration = $client->AgentIntegration()->create([
    "organization_id" => null, // string
    "name" => null, // string
    "toolkit" => null, // string
]);
```


### AgentIntegrationAccount

Create an instance: `$agent_integration_account = $client->AgentIntegrationAccount();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel_sign_in` | `bool` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_enable` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_reconnect` | `bool` |  |
| `can_sync` | `bool` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `connected_by` | `mixed` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `bool` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | `mixed` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider_disabled_reason` | `mixed` |  |
| `provider_identity` | `array` |  |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `bool` |  |
| `team_sharing_version` | `int` |  |
| `toolkit` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentIntegrationAccount entities, one per record (throws on error).
$agent_integration_accounts = $client->AgentIntegrationAccount()->list(["organization_id" => "example"]);
```


### AgentIntegrationCallback

Create an instance: `$agent_integration_callback = $client->AgentIntegrationCallback();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentIntegrationCallback record (throws on error).
$agent_integration_callback = $client->AgentIntegrationCallback()->load(["connection_id" => "connection_id", "state" => "state"]);
```


### AgentInteraction

Create an instance: `$agent_interaction = $client->AgentInteraction();`

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
| `interactions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentInteraction record (throws on error).
$agent_interaction = $client->AgentInteraction()->load(["id" => "agent_interaction_id", "agent_id" => "agent_id", "organization_id" => "organization_id", "conversation_id" => "conversation_id"]);
```

#### Example: List

```php
// list() returns an array of AgentInteraction entities, one per record (throws on error).
$agent_interactions = $client->AgentInteraction()->list(["agent_id" => "example", "organization_id" => "example", "conversation_id" => "example"]);
```


### AgentLibrary

Create an instance: `$agent_library = $client->AgentLibrary();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentManager

Create an instance: `$agent_manager = $client->AgentManager();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `mixed` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `mixed` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `mixed` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `mixed` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `string` |  |
| `last_reply_at` | `mixed` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `array` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `mixed` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `array` | Teammates named as managers beside the owner. |
| `model_change_action` | `mixed` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `mixed` |  |
| `preview` | `mixed` |  |
| `preview_received_at` | `mixed` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `mixed` |  |
| `reply_triage` | `mixed` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` |  |
| `sharing_fixed` | `bool` | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `team_role` | `string` | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` |  |
| `url_slug` | `string` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` |  |
| `visibility` | `string` |  |

#### Example: Create

```php
$agent_manager = $client->AgentManager()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "user_id" => null, // string
]);
```


### AgentManagerChoice

Create an instance: `$agent_manager_choice = $client->AgentManagerChoice();`

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

```php
// list() returns an array of AgentManagerChoice entities, one per record (throws on error).
$agent_manager_choices = $client->AgentManagerChoice()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentMarketplace

Create an instance: `$agent_marketplace = $client->AgentMarketplace();`

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
| `bundle` | `array` |  |
| `can_manage` | `bool` |  |
| `catalog_key` | `mixed` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `array` |  |
| `category` | `string` |  |
| `counts` | `array` |  |
| `created_at` | `string` |  |
| `expected_version` | `int` |  |
| `explainer` | `mixed` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `int` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `array` |  |
| `integrations` | `array` |  |
| `listing` | `mixed` |  |
| `listings` | `array` |  |
| `memories` | `array` |  |
| `name` | `string` |  |
| `next_page` | `mixed` |  |
| `organization_name` | `string` |  |
| `page_apps` | `array` |  |
| `publisher_avatar_url` | `mixed` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `sections` | `array` |  |
| `share_token` | `mixed` | Present only for people who manage the listing. |
| `skills` | `array` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | The V2 agent this listing was published from. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |
| `viewer` | `array` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentMarketplace record (throws on error).
$agent_marketplace = $client->AgentMarketplace()->load(["id" => "agent_marketplace_id"]);
```

#### Example: Create

```php
$agent_marketplace = $client->AgentMarketplace()->create([
    "organization_id" => null, // string
    "bundle" => null, // array
    "category" => null, // string
    "name" => null, // string
    "summary" => null, // string
]);
```


### AgentMarketplaceShared

Create an instance: `$agent_marketplace_shared = $client->AgentMarketplaceShared();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `catalog_key` | `mixed` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` |  |
| `counts` | `array` |  |
| `created_at` | `string` |  |
| `explainer` | `mixed` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `int` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `array` |  |
| `integrations` | `array` |  |
| `listing` | `mixed` |  |
| `memories` | `array` |  |
| `name` | `string` |  |
| `organization_name` | `string` |  |
| `page_apps` | `array` |  |
| `publisher_avatar_url` | `mixed` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `share_token` | `mixed` | Present only for people who manage the listing. |
| `skills` | `array` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |
| `viewer` | `array` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentMarketplaceShared record (throws on error).
$agent_marketplace_shared = $client->AgentMarketplaceShared()->load(["id" => "agent_marketplace_shared_id"]);
```


### AgentMissionControl

Create an instance: `$agent_mission_control = $client->AgentMissionControl();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentOperation

Create an instance: `$agent_operation = $client->AgentOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `array` | JSON object limited to 65536 encoded bytes. |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `operation` | `array` |  |
| `participant` | `string` |  |
| `requester_id` | `string` | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentOperation record (throws on error).
$agent_operation = $client->AgentOperation()->load(["id" => "agent_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$agent_operation = $client->AgentOperation()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "arguments" => null, // array
    "key" => null, // string
    "name" => null, // string
    "requester_id" => null, // string
]);
```


### AgentProvisioning

Create an instance: `$agent_provisioning = $client->AgentProvisioning();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentPullRequest

Create an instance: `$agent_pull_request = $client->AgentPullRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `number` | `int` |  |
| `owners` | `array` |  |
| `repository` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentPullRequest entities, one per record (throws on error).
$agent_pull_requests = $client->AgentPullRequest()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentQuestion

Create an instance: `$agent_question = $client->AgentQuestion();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentRelayFileGrant

Create an instance: `$agent_relay_file_grant = $client->AgentRelayFileGrant();`

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
| `connection_generation` | `int` |  |
| `connection_id` | `string` |  |
| `connection_name` | `string` | Current display name of the selected account. |
| `created_at` | `string` |  |
| `expected_generation` | `int` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `resource_id` | `string` |  |
| `resource_kind` | `string` |  |
| `revoked` | `bool` |  |
| `revoked_at` | `mixed` |  |
| `snapshot_supported` | `bool` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentRelayFileGrant record (throws on error).
$agent_relay_file_grant = $client->AgentRelayFileGrant()->load(["id" => "agent_relay_file_grant_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentRelayFileGrant entities, one per record (throws on error).
$agent_relay_file_grants = $client->AgentRelayFileGrant()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$agent_relay_file_grant = $client->AgentRelayFileGrant()->create([
    "organization_id" => null, // string
    "access_mode" => null, // string
    "connection_id" => null, // string
    "expected_generation" => null, // int
    "key" => null, // string
    "resource_id" => null, // string
    "resource_kind" => null, // string
    "source_operation_id" => null, // string
]);
```


### AgentRelayFileGrantAccount

Create an instance: `$agent_relay_file_grant_account = $client->AgentRelayFileGrantAccount();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_modes` | `array` | Supported file access modes. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `resource_kind` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentRelayFileGrantAccount entities, one per record (throws on error).
$agent_relay_file_grant_accounts = $client->AgentRelayFileGrantAccount()->list(["organization_id" => "example", "source_operation_id" => "example"]);
```


### AgentRepository

Create an instance: `$agent_repository = $client->AgentRepository();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `environments` | `array` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `repository_choices` | `array` |  |
| `repository_choices_error` | `mixed` | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` |  |
| `version` | `int` |  |
| `work_repositories` | `array` |  |

#### Example: List

```php
// list() returns an array of AgentRepository entities, one per record (throws on error).
$agent_repositorys = $client->AgentRepository()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentResource

Create an instance: `$agent_resource = $client->AgentResource();`

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

```php
// list() returns an array of AgentResource entities, one per record (throws on error).
$agent_resources = $client->AgentResource()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentRoder

Create an instance: `$agent_roder = $client->AgentRoder();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### AgentRoutine

Create an instance: `$agent_routine = $client->AgentRoutine();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `consecutive_errors` | `int` |  |
| `credit_wait` | `array` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `mixed` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_error` | `mixed` |  |
| `last_run_at` | `mixed` |  |
| `last_status` | `mixed` |  |
| `managed` | `bool` |  |
| `name` | `string` |  |
| `next_run_at` | `mixed` |  |
| `routine` | `array` |  |
| `schedule` | `array` |  |
| `schedule_label` | `string` |  |
| `utility_model` | `array` |  |

#### Example: List

```php
// list() returns an array of AgentRoutine entities, one per record (throws on error).
$agent_routines = $client->AgentRoutine()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentRun

Create an instance: `$agent_run = $client->AgentRun();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `mixed` |  |
| `id` | `string` |  |
| `run_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentRun record (throws on error).
$agent_run = $client->AgentRun()->load(["id" => "agent_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```


### AgentRuntime

Create an instance: `$agent_runtime = $client->AgentRuntime();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `array` |  |
| `can_manage` | `bool` |  |
| `can_reset` | `bool` |  |
| `image` | `string` |  |
| `memory_mb` | `mixed` |  |
| `platform` | `string` |  |
| `profile` | `string` |  |
| `provider` | `string` |  |
| `state` | `string` |  |
| `version` | `string` |  |
| `volume` | `mixed` |  |


### AgentSession

Create an instance: `$agent_session = $client->AgentSession();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentSessionCheckpoint

Create an instance: `$agent_session_checkpoint = $client->AgentSessionCheckpoint();`

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

```php
// load() returns the ENTITY — call data_get() for the AgentSessionCheckpoint record (throws on error).
$agent_session_checkpoint = $client->AgentSessionCheckpoint()->load(["id" => "agent_session_checkpoint_id", "agent_session_id" => "agent_session_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of AgentSessionCheckpoint entities, one per record (throws on error).
$agent_session_checkpoints = $client->AgentSessionCheckpoint()->list(["agent_session_id" => "example", "organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$agent_session_checkpoint = $client->AgentSessionCheckpoint()->create([
    "agent_session_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### AgentSessionRoderHandoff

Create an instance: `$agent_session_roder_handoff = $client->AgentSessionRoderHandoff();`

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

```php
$agent_session_roder_handoff = $client->AgentSessionRoderHandoff()->create([
    "agent_session_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### AgentSetting

Create an instance: `$agent_setting = $client->AgentSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_version` | `string` |  |
| `instructions` | `string` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentSetting entities, one per record (throws on error).
$agent_settings = $client->AgentSetting()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentSharing

Create an instance: `$agent_sharing = $client->AgentSharing();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AgentSite

Create an instance: `$agent_site = $client->AgentSite();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `array` |  |
| `can_message` | `bool` | The viewer may send input to the author agent |
| `deployments_count` | `int` | Increases with every deploy of the site |
| `description` | `mixed` | The team app description, when the site is a team app |
| `icon_url` | `mixed` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` | `string` |  |
| `name` | `string` | The site's DNS label |
| `owner` | `array` | The person who controls the author agent |
| `thread` | `mixed` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | `string` | The team app title, or the site name read as words |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentSite record (throws on error).
$agent_site = $client->AgentSite()->load(["id" => "agent_site_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentSite entities, one per record (throws on error).
$agent_sites = $client->AgentSite()->list(["organization_id" => "example"]);
```


### AgentSkill

Create an instance: `$agent_skill = $client->AgentSkill();`

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
| `agents` | `array` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` | `array` |  |
| `can_manage_library` | `bool` |  |
| `content` | `string` | The skill's SKILL.md |
| `files` | `array` |  |
| `id` | `string` |  |
| `marketplace` | `string` |  |
| `pending` | `bool` | Some agent is still applying a change; check again shortly |
| `plugin` | `string` | The marketplace entry id |
| `revision` | `string` | The commit SHA returned by preview |
| `skill` | `array` |  |
| `skills` | `array` |  |
| `source` | `string` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentSkill record (throws on error).
$agent_skill = $client->AgentSkill()->load(["id" => "agent_skill_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentSkill entities, one per record (throws on error).
$agent_skills = $client->AgentSkill()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$agent_skill = $client->AgentSkill()->create([
    "organization_id" => null, // string
    "audience" => null, // array
    "revision" => null, // string
    "skills" => null, // array
]);
```


### AgentSlack

Create an instance: `$agent_slack = $client->AgentSlack();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentSubagent

Create an instance: `$agent_subagent = $client->AgentSubagent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `attention` | `mixed` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `mixed` |  |
| `id` | `string` |  |
| `model` | `mixed` |  |
| `parent_id` | `string` |  |
| `preview` | `mixed` |  |
| `started_at` | `mixed` |  |
| `state` | `mixed` | What the thread is to the viewer. |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `mixed` |  |

#### Example: List

```php
// list() returns an array of AgentSubagent entities, one per record (throws on error).
$agent_subagents = $client->AgentSubagent()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentSubscription

Create an instance: `$agent_subscription = $client->AgentSubscription();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of AgentSubscription entities, one per record (throws on error).
$agent_subscriptions = $client->AgentSubscription()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_subscription = $client->AgentSubscription()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
]);
```


### AgentSwarm

Create an instance: `$agent_swarm = $client->AgentSwarm();`

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
| `base_bookmark` | `mixed` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` | `mixed` |  |
| `base_revision` | `mixed` | 64-hex commit id; skips the head lookup |
| `budget` | `array` |  |
| `canceled_at` | `mixed` |  |
| `canceled_count` | `int` |  |
| `concurrency_key` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `creator_user_id` | `mixed` |  |
| `deadline_at` | `mixed` |  |
| `display_id` | `int` |  |
| `done_count` | `int` |  |
| `environment` | `array` |  |
| `failed_count` | `int` |  |
| `finished_at` | `mixed` |  |
| `finished_at_label` | `mixed` |  |
| `github` | `array` |  |
| `goal` | `mixed` |  |
| `id` | `string` |  |
| `model` | `mixed` |  |
| `model_provider` | `mixed` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `mixed` |  |
| `outcome` | `mixed` |  |
| `phase` | `mixed` |  |
| `policy` | `array` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` | `mixed` |  |
| `queued_at_label` | `mixed` |  |
| `repository` | `string` | Repository slug inside the organization |
| `repository_id` | `mixed` |  |
| `repository_slug` | `mixed` |  |
| `reserved` | `array` |  |
| `scheduler_generation` | `int` |  |
| `skipped_count` | `int` |  |
| `slug` | `string` |  |
| `started_at` | `mixed` |  |
| `started_at_label` | `mixed` |  |
| `status` | `string` |  |
| `summary` | `array` |  |
| `target` | `array` | Where the swarm lands. |
| `task_count` | `int` |  |
| `task_template_json` | `mixed` |  |
| `tasks` | `array` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `usage` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentSwarm record (throws on error).
$agent_swarm = $client->AgentSwarm()->load(["id" => "agent_swarm_id"]);
```

#### Example: List

```php
// list() returns an array of AgentSwarm entities, one per record (throws on error).
$agent_swarms = $client->AgentSwarm()->list(["org" => "example"]);
```

#### Example: Create

```php
$agent_swarm = $client->AgentSwarm()->create([
    "organization_slug" => null, // mixed
    "target" => null, // array
]);
```


### AgentTeammate

Create an instance: `$agent_teammate = $client->AgentTeammate();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `mixed` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` |  |
| `name` | `string` |  |
| `persona` | `mixed` |  |
| `slug` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentTeammate entities, one per record (throws on error).
$agent_teammates = $client->AgentTeammate()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentTerminal

Create an instance: `$agent_terminal = $client->AgentTerminal();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AgentThread

Create an instance: `$agent_thread = $client->AgentThread();`

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

```php
// load() returns the ENTITY — call data_get() for the AgentThread record (throws on error).
$agent_thread = $client->AgentThread()->load(["id" => "agent_thread_id"]);
```

#### Example: List

```php
// list() returns an array of AgentThread entities, one per record (throws on error).
$agent_threads = $client->AgentThread()->list();
```

#### Example: Create

```php
$agent_thread = $client->AgentThread()->create([
]);
```


### AgentTool

Create an instance: `$agent_tool = $client->AgentTool();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `inputSchema` | `array` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentTool entities, one per record (throws on error).
$agent_tools = $client->AgentTool()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentUsage

Create an instance: `$agent_usage = $client->AgentUsage();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `days` | `array` | One cell per (day, model), ascending by day then model. |
| `ended_at` | `string` |  |
| `pricing_version` | `string` | The price table in effect now; rows carry the version they were priced at. |
| `source` | `string` | Which store served the rows. |
| `started_at` | `string` |  |
| `user_days` | `array` | One cell per (day, person), ascending by day. |
| `users` | `array` | One row per (person, model), descending by tokens. |
| `window` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentUsage record (throws on error).
$agent_usage = $client->AgentUsage()->load(["organization_id" => "organization_id"]);
```


### AgentVerifyProject

Create an instance: `$agent_verify_project = $client->AgentVerifyProject();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` |  |
| `project_choices` | `array` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` |  |
| `verify_projects` | `array` |  |
| `version` | `int` |  |

#### Example: List

```php
// list() returns an array of AgentVerifyProject entities, one per record (throws on error).
$agent_verify_projects = $client->AgentVerifyProject()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentWait

Create an instance: `$agent_wait = $client->AgentWait();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWebPreview

Create an instance: `$agent_web_preview = $client->AgentWebPreview();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `mixed` |  |
| `icon_url` | `mixed` |  |
| `image_url` | `mixed` |  |
| `title` | `mixed` |  |

#### Example: List

```php
// list() returns an array of AgentWebPreview entities, one per record (throws on error).
$agent_web_previews = $client->AgentWebPreview()->list(["token" => "example"]);
```


### AgentWebhook

Create an instance: `$agent_webhook = $client->AgentWebhook();`

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
| `connection` | `array` |  |
| `deliveries` | `array` |  |
| `event_types` | `array` |  |
| `expected_generation` | `int` |  |
| `id` | `string` |  |
| `max_events_per_day` | `int` |  |
| `name` | `string` |  |
| `purpose` | `string` |  |
| `signing_key` | `mixed` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentWebhook record (throws on error).
$agent_webhook = $client->AgentWebhook()->load(["id" => "agent_webhook_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$agent_webhook = $client->AgentWebhook()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "event_types" => null, // array
    "max_events_per_day" => null, // int
    "name" => null, // string
    "purpose" => null, // string
]);
```


### AgentWork

Create an instance: `$agent_work = $client->AgentWork();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWorkflow

Create an instance: `$agent_workflow = $client->AgentWorkflow();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_digest` | `string` |  |
| `path` | `string` |  |
| `source` | `string` | At most 262144 UTF-8 bytes |
| `template` | `string` | A template id from the catalog's templates |
| `templates` | `array` |  |
| `truncated` | `bool` |  |
| `workflows` | `array` |  |

#### Example: List

```php
// list() returns an array of AgentWorkflow entities, one per record (throws on error).
$agent_workflows = $client->AgentWorkflow()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_workflow = $client->AgentWorkflow()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "path" => null, // string
    "template" => null, // string
]);
```


### AgentWorkflowProposal

Create an instance: `$agent_workflow_proposal = $client->AgentWorkflowProposal();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `array` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `mixed` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` |  |
| `can_revise` | `bool` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` |  |
| `definition` | `mixed` |  |
| `digest` | `string` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `mixed` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` |  |
| `model_choices` | `array` | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` |  |
| `native_rows` | `array` |  |
| `path` | `string` |  |
| `pipeline_checkpoints` | `array` |  |
| `pipeline_commands` | `array` |  |
| `reasoning_choices` | `array` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `mixed` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `mixed` |  |
| `stale` | `bool` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `mixed` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `mixed` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentWorkflowProposal record (throws on error).
$agent_workflow_proposal = $client->AgentWorkflowProposal()->load(["id" => "agent_workflow_proposal_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```


### AgentWorkflowRun

Create an instance: `$agent_workflow_run = $client->AgentWorkflowRun();`

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
| `automation` | `mixed` | Saved native automation identity. |
| `budget_seconds` | `mixed` | The run stops once it has been running this long |
| `budget_usd` | `mixed` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `mixed` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `mixed` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `array` |  |
| `error` | `mixed` |  |
| `finished_at` | `mixed` |  |
| `flow_steps` | `mixed` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Public run ID. |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `mixed` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `mixed` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `mixed` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `mixed` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `int` |  |
| `steps` | `array` |  |
| `trigger_id` | `mixed` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `mixed` | When a sleeping run's step looks again |
| `workflow_digest` | `mixed` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentWorkflowRun record (throws on error).
$agent_workflow_run = $client->AgentWorkflowRun()->load(["id" => "agent_workflow_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentWorkflowRun entities, one per record (throws on error).
$agent_workflow_runs = $client->AgentWorkflowRun()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentWorkflowTrigger

Create an instance: `$agent_workflow_trigger = $client->AgentWorkflowTrigger();`

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
| `budget` | `mixed` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` |  |
| `can_pause` | `bool` | It is running, so a manager can pause it |
| `can_resume` | `bool` | A person paused it, so a manager can resume it |
| `can_review` | `bool` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `mixed` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `mixed` | When the daily count starts again, at the organization's midnight |
| `id` | `string` |  |
| `kind` | `string` |  |
| `next_due_at` | `mixed` |  |
| `pause_cause` | `mixed` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `mixed` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `mixed` |  |
| `schedule` | `mixed` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `mixed` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `mixed` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `mixed` |  |
| `starts` | `mixed` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `mixed` | The event subscription that starts it |
| `time_zone` | `string` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `mixed` | Events that started a run today, for an event workflow |
| `trigger` | `array` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AgentWorkflowTrigger record (throws on error).
$agent_workflow_trigger = $client->AgentWorkflowTrigger()->load(["id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentWorkflowTrigger entities, one per record (throws on error).
$agent_workflow_triggers = $client->AgentWorkflowTrigger()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentWorkspace

Create an instance: `$agent_workspace = $client->AgentWorkspace();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_delete` | `bool` |  |
| `can_keep` | `bool` |  |
| `cleanup_after` | `mixed` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `reason` | `string` |  |
| `state` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentWorkspace entities, one per record (throws on error).
$agent_workspaces = $client->AgentWorkspace()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentWritePermission

Create an instance: `$agent_write_permission = $client->AgentWritePermission();`

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
| `granted_by` | `mixed` |  |
| `id` | `string` |  |
| `in_effect` | `bool` | Whether the permission approves writes now. |
| `last_used_at` | `mixed` |  |
| `tool` | `string` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```php
// list() returns an array of AgentWritePermission entities, one per record (throws on error).
$agent_write_permissions = $client->AgentWritePermission()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### Agreement

Create an instance: `$agreement = $client->Agreement();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `mixed` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` | `string` |  |
| `key` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of Agreement entities, one per record (throws on error).
$agreements = $client->Agreement()->list(["organization_id" => "example"]);
```


### AgreementAccessRequest

Create an instance: `$agreement_access_request = $client->AgreementAccessRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$agreement_access_request = $client->AgreementAccessRequest()->create([
    "organization_id" => null, // string
]);
```


### AlertRuleEvent

Create an instance: `$alert_rule_event = $client->AlertRuleEvent();`

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

```php
// load() returns the ENTITY — call data_get() for the AlertRuleEvent record (throws on error).
$alert_rule_event = $client->AlertRuleEvent()->load(["id" => "alert_rule_event_id", "alert_rule_id" => "alert_rule_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of AlertRuleEvent entities, one per record (throws on error).
$alert_rule_events = $client->AlertRuleEvent()->list(["alert_rule_id" => "example", "space_id" => "example"]);
```

#### Example: Create

```php
$alert_rule_event = $client->AlertRuleEvent()->create([
    "alert_rule_id" => null, // string
    "space_id" => null, // string
]);
```


### AllocationLog

Create an instance: `$allocation_log = $client->AllocationLog();`

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
| `location` | `mixed` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `int` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of AllocationLog entities, one per record (throws on error).
$allocation_logs = $client->AllocationLog()->list(["allocation_id" => "example", "app_id" => "example"]);
```


### App

Create an instance: `$app = $client->App();`

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
| `created_at_label` | `mixed` |  |
| `description` | `mixed` |  |
| `framework` | `mixed` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string` |  |
| `repository_kind` | `mixed` |  |
| `root_path` | `string` |  |
| `root_path_display` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the App record (throws on error).
$app = $client->App()->load(["id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of App entities, one per record (throws on error).
$apps = $client->App()->list();
```

#### Example: Create

```php
$app = $client->App()->create([
    "name" => null, // string
    "organization_id" => null, // string
    "repository_id" => null, // string
    "root_path" => null, // string
    "slug" => null, // string
]);
```


### AppAccess

Create an instance: `$app_access = $client->AppAccess();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppAccessJwk

Create an instance: `$app_access_jwk = $client->AppAccessJwk();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of AppAccessJwk entities, one per record (throws on error).
$app_access_jwks = $client->AppAccessJwk()->list();
```


### AppCdn

Create an instance: `$app_cdn = $client->AppCdn();`

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
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `cache_path_prefix` | `mixed` |  |
| `cache_settings_json` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `distribution_kind` | `string` |  |
| `edge_hostname` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `hostnames` | `array` |  |
| `id` | `string` |  |
| `last_deployed_at` | `mixed` |  |
| `last_deployed_at_label` | `mixed` |  |
| `last_purged_at` | `mixed` |  |
| `last_purged_at_label` | `mixed` |  |
| `last_synced_at` | `mixed` |  |
| `last_synced_at_label` | `mixed` |  |
| `name` | `string` |  |
| `origin_url` | `string` |  |
| `provisioned` | `bool` |  |
| `routing_settings_json` | `mixed` |  |
| `security_settings_json` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppCdn record (throws on error).
$app_cdn = $client->AppCdn()->load(["id" => "app_cdn_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppCdn entities, one per record (throws on error).
$app_cdns = $client->AppCdn()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_cdn = $client->AppCdn()->create([
    "app_id" => null, // string
    "name" => null, // string
    "origin_url" => null, // string
    "slug" => null, // string
]);
```


### AppConfigVariable

Create an instance: `$app_config_variable = $client->AppConfigVariable();`

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
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `created_at` | `string` |  |
| `description` | `mixed` |  |
| `exposed_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `scope_kind` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `mixed` |  |
| `value_kind` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppConfigVariable record (throws on error).
$app_config_variable = $client->AppConfigVariable()->load(["id" => "app_config_variable_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppConfigVariable entities, one per record (throws on error).
$app_config_variables = $client->AppConfigVariable()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_config_variable = $client->AppConfigVariable()->create([
    "app_id" => null, // string
    "exposed_to_build" => null, // bool
    "key" => null, // string
    "scope_kind" => null, // string
    "value_kind" => null, // string
]);
```


### AppDataResource

Create an instance: `$app_data_resource = $client->AppDataResource();`

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
| `app_environment_id` | `mixed` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `mixed` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `mixed` |  |
| `provider_metadata` | `array` |  |
| `region` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `mixed` |  |
| `storage_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `version` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppDataResource record (throws on error).
$app_data_resource = $client->AppDataResource()->load(["id" => "app_data_resource_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppDataResource entities, one per record (throws on error).
$app_data_resources = $client->AppDataResource()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_data_resource = $client->AppDataResource()->create([
    "app_id" => null, // string
    "engine" => null, // string
    "kind" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### AppDeploy

Create an instance: `$app_deploy = $client->AppDeploy();`

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
| `desired_instances` | `int` |  |
| `environment` | `string` | Environment slug or public ID, all, or existing. |
| `image` | `string` |  |
| `region` | `string` |  |
| `rollout_predecessor` | `string` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` |  |

#### Example: Create

```php
$app_deploy = $client->AppDeploy()->create([
    "app_id" => null, // string
    "image" => null, // string
]);
```


### AppDeployment

Create an instance: `$app_deployment = $client->AppDeployment();`

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
| `artifact_locator` | `mixed` |  |
| `build_role` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `creator_user_id` | `mixed` |  |
| `deployed_url` | `mixed` |  |
| `display_id` | `int` |  |
| `failure_message` | `mixed` |  |
| `finished_at` | `mixed` |  |
| `finished_at_label` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `mixed` |  |
| `is_rollback` | `bool` |  |
| `location` | `mixed` |  |
| `location_id` | `string` |  |
| `number` | `int` |  |
| `operation_key` | `mixed` |  |
| `organization_id` | `string` |  |
| `rollback_reason` | `mixed` |  |
| `rollback_source_deployment_id` | `mixed` |  |
| `rollback_source_release_id` | `mixed` |  |
| `rollback_target_release_id` | `mixed` |  |
| `source_ref` | `mixed` |  |
| `started_at` | `mixed` |  |
| `started_at_label` | `mixed` |  |
| `status` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppDeployment record (throws on error).
$app_deployment = $client->AppDeployment()->load(["id" => "app_deployment_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppDeployment entities, one per record (throws on error).
$app_deployments = $client->AppDeployment()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_deployment = $client->AppDeployment()->create([
    "app_id" => null, // string
]);
```


### AppDeploymentOperation

Create an instance: `$app_deployment_operation = $client->AppDeploymentOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `array` |  |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `mixed` |  |
| `build_duration_seconds` | `mixed` |  |
| `build_source` | `mixed` |  |
| `build_status` | `string` |  |
| `children` | `array` |  |
| `ci_pipeline_id` | `mixed` |  |
| `ci_pipeline_run_id` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `created_at` | `string` |  |
| `creator` | `mixed` |  |
| `deployed_url` | `mixed` |  |
| `duration_seconds` | `mixed` |  |
| `environment` | `array` |  |
| `failure_message` | `string` |  |
| `finished_at` | `string` |  |
| `history_kind` | `string` |  |
| `history_reason` | `mixed` |  |
| `id` | `string` |  |
| `is_live` | `bool` |  |
| `is_rollback` | `bool` |  |
| `live_region_count` | `int` |  |
| `location_id` | `string` |  |
| `number` | `int` |  |
| `placement` | `mixed` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollback_reason` | `mixed` |  |
| `rollback_source_release_id` | `mixed` |  |
| `rollback_target_release_id` | `mixed` |  |
| `rollout_predecessor_id` | `mixed` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `array` |  |
| `source_ref` | `mixed` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `total_replicas` | `int` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppDeploymentOperation record (throws on error).
$app_deployment_operation = $client->AppDeploymentOperation()->load(["id" => "app_deployment_operation_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppDeploymentOperation entities, one per record (throws on error).
$app_deployment_operations = $client->AppDeploymentOperation()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_deployment_operation = $client->AppDeploymentOperation()->create([
    "app_id" => null, // string
]);
```


### AppDeploymentRollback

Create an instance: `$app_deployment_rollback = $client->AppDeploymentRollback();`

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
| `blockers` | `array` |  |
| `candidate_releases` | `array` |  |
| `confirmation_text` | `string` |  |
| `current_deployment` | `mixed` |  |
| `current_release` | `mixed` |  |
| `deployment` | `mixed` |  |
| `desired_state` | `mixed` |  |
| `environment` | `mixed` |  |
| `execution_allowed` | `bool` |  |
| `force` | `bool` |  |
| `idempotency_key` | `string` |  |
| `idempotent_reuse` | `bool` |  |
| `location` | `mixed` |  |
| `operation` | `mixed` |  |
| `reason` | `mixed` |  |
| `rollback_release` | `mixed` |  |
| `rollout` | `mixed` |  |
| `service` | `mixed` |  |
| `target_artifact_locator` | `mixed` |  |
| `target_release` | `mixed` |  |
| `to` | `string` |  |
| `warnings` | `array` |  |

#### Example: Create

```php
$app_deployment_rollback = $client->AppDeploymentRollback()->create([
    "app_id" => null, // string
]);
```


### AppEnvironment

Create an instance: `$app_environment = $client->AppEnvironment();`

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
| `auto_deploy` | `bool` |  |
| `base_domain` | `mixed` |  |
| `branch_pattern` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location` | `mixed` |  |
| `location_id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppEnvironment record (throws on error).
$app_environment = $client->AppEnvironment()->load(["id" => "app_environment_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppEnvironment entities, one per record (throws on error).
$app_environments = $client->AppEnvironment()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_environment = $client->AppEnvironment()->create([
    "app_id" => null, // string
    "auto_deploy" => null, // bool
    "kind" => null, // string
    "location_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
    "status" => null, // string
]);
```


### AppLocation

Create an instance: `$app_location = $client->AppLocation();`

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

```php
// list() returns an array of AppLocation entities, one per record (throws on error).
$app_locations = $client->AppLocation()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_location = $client->AppLocation()->create([
    "app_id" => null, // string
    "location_id" => null, // string
]);
```


### AppMetric

Create an instance: `$app_metric = $client->AppMetric();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AppPreview

Create an instance: `$app_preview = $client->AppPreview();`

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
| `expected_generation` | `int` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `int` | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `resource_overrides` | `array` | Service public IDs mapped to resource overrides. |
| `retained` | `bool` |  |
| `shared_data_binding_ids` | `array` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `array` | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` |  |
| `source_ref` | `string` |  |
| `storage_binding_resources` | `array` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppPreview record (throws on error).
$app_preview = $client->AppPreview()->load(["id" => "app_preview_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppPreview entities, one per record (throws on error).
$app_previews = $client->AppPreview()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_preview = $client->AppPreview()->create([
    "app_id" => null, // string
    "app_preview_profile_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### AppPreviewProfile

Create an instance: `$app_preview_profile = $client->AppPreviewProfile();`

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
| `automatic` | `bool` |  |
| `configuration` | `array` |  |
| `created_at` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `source_environment_id` | `string` |  |
| `ttl_days` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppPreviewProfile record (throws on error).
$app_preview_profile = $client->AppPreviewProfile()->load(["id" => "app_preview_profile_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppPreviewProfile entities, one per record (throws on error).
$app_preview_profiles = $client->AppPreviewProfile()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_preview_profile = $client->AppPreviewProfile()->create([
    "app_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
    "source_environment_id" => null, // string
]);
```


### AppRun

Create an instance: `$app_run = $client->AppRun();`

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

```php
// load() returns the ENTITY — call data_get() for the AppRun record (throws on error).
$app_run = $client->AppRun()->load(["id" => "app_run_id"]);
```

#### Example: List

```php
// list() returns an array of AppRun entities, one per record (throws on error).
$app_runs = $client->AppRun()->list();
```

#### Example: Create

```php
$app_run = $client->AppRun()->create([
]);
```


### AppSecret

Create an instance: `$app_secret = $client->AppSecret();`

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
| `description` | `mixed` |  |
| `env_key` | `mixed` |  |
| `expose_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_version_number` | `mixed` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `rotation_policy` | `mixed` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string` |  |
| `value_digest` | `mixed` |  |
| `value_kind` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppSecret record (throws on error).
$app_secret = $client->AppSecret()->load(["id" => "app_secret_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppSecret entities, one per record (throws on error).
$app_secrets = $client->AppSecret()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_secret = $client->AppSecret()->create([
    "app_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### AppService

Create an instance: `$app_service = $client->AppService();`

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
| `auto_deploy` | `bool` |  |
| `bindings` | `array` |  |
| `build_command` | `mixed` |  |
| `cpu_label` | `mixed` |  |
| `cpu_mhz` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `deploy_paths` | `array` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` |  |
| `disk_label` | `mixed` |  |
| `disk_mb` | `mixed` |  |
| `effective_deploy_paths` | `array` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `internal_port` | `mixed` |  |
| `kind` | `string` |  |
| `memory_label` | `mixed` |  |
| `memory_max_label` | `mixed` |  |
| `memory_max_mb` | `mixed` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `mixed` |  |
| `name` | `string` |  |
| `nomad_constraints_json` | `mixed` |  |
| `nomad_kill_timeout_seconds` | `mixed` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `mixed` |  |
| `nomad_region` | `mixed` |  |
| `nomad_shutdown_delay_seconds` | `mixed` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `mixed` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `mixed` |  |
| `prestart_command` | `mixed` |  |
| `publicly_accessible` | `bool` |  |
| `release_command` | `mixed` |  |
| `repo_source_path` | `string` |  |
| `runtime` | `string` |  |
| `runtime_adapter_kind` | `string` |  |
| `runtime_adapter_settings_json` | `mixed` |  |
| `schedule` | `mixed` |  |
| `slug` | `string` |  |
| `source_path` | `string` |  |
| `start_command` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppService record (throws on error).
$app_service = $client->AppService()->load(["id" => "app_service_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppService entities, one per record (throws on error).
$app_services = $client->AppService()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_service = $client->AppService()->create([
    "app_id" => null, // string
    "auto_deploy" => null, // bool
    "desired_instances" => null, // int
    "kind" => null, // string
    "name" => null, // string
    "publicly_accessible" => null, // bool
    "runtime" => null, // string
    "runtime_adapter_kind" => null, // string
    "slug" => null, // string
    "source_path" => null, // string
    "start_command" => null, // mixed
]);
```


### AppServiceBinding

Create an instance: `$app_service_binding = $client->AppServiceBinding();`

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

```php
// load() returns the ENTITY — call data_get() for the AppServiceBinding record (throws on error).
$app_service_binding = $client->AppServiceBinding()->load(["id" => "app_service_binding_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppServiceBinding entities, one per record (throws on error).
$app_service_bindings = $client->AppServiceBinding()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_service_binding = $client->AppServiceBinding()->create([
    "app_id" => null, // string
]);
```


### AppServicePlacement

Create an instance: `$app_service_placement = $client->AppServicePlacement();`

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
| `deployment_channel` | `mixed` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `organization_id` | `string` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollout_strategy` | `string` |  |
| `targets` | `array` |  |
| `total_replicas` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppServicePlacement record (throws on error).
$app_service_placement = $client->AppServicePlacement()->load(["id" => "app_service_placement_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppServicePlacement entities, one per record (throws on error).
$app_service_placements = $client->AppServicePlacement()->list(["app_id" => "example"]);
```


### AppStorageResource

Create an instance: `$app_storage_resource = $client->AppStorageResource();`

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
| `app_environment_id` | `mixed` |  |
| `attachment` | `mixed` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `mixed` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `mixed` |  |
| `created_at` | `string` |  |
| `ephemeral` | `bool` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `mixed` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location_code` | `mixed` |  |
| `location_id` | `mixed` | Volume datacenter pin (volume kind only) |
| `mount_path` | `mixed` |  |
| `name` | `string` |  |
| `provider` | `string` | Storage backend. |
| `provider_error` | `mixed` | Last provisioning/teardown error from the storage provider |
| `region` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AppStorageResource record (throws on error).
$app_storage_resource = $client->AppStorageResource()->load(["id" => "app_storage_resource_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of AppStorageResource entities, one per record (throws on error).
$app_storage_resources = $client->AppStorageResource()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$app_storage_resource = $client->AppStorageResource()->create([
    "app_id" => null, // string
    "access_mode" => null, // string
    "kind" => null, // string
    "name" => null, // string
    "provider" => null, // string
    "slug" => null, // string
    "status" => null, // string
]);
```


### Artefact

Create an instance: `$artefact = $client->Artefact();`

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
| `automation_invocation_id` | `mixed` |  |
| `byte_size` | `int` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `created_at` | `mixed` |  |
| `created_by_user_id` | `mixed` |  |
| `description` | `mixed` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `entrypoint` | `string` |  |
| `expires_at` | `mixed` |  |
| `filename` | `string` |  |
| `files` | `array` |  |
| `harness` | `mixed` |  |
| `harness_version` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `model` | `mixed` |  |
| `organization_id` | `string` |  |
| `published_at` | `mixed` |  |
| `repository_id` | `mixed` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `mixed` |  |
| `vcs_agent_session_id` | `mixed` |  |
| `version` | `int` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Artefact record (throws on error).
$artefact = $client->Artefact()->load(["id" => "artefact_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Artefact entities, one per record (throws on error).
$artefacts = $client->Artefact()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$artefact = $client->Artefact()->create([
    "organization_id" => null, // string
]);
```


### ArtefactCommentThread

Create an instance: `$artefact_comment_thread = $client->ArtefactCommentThread();`

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
| `comments` | `array` |  |
| `id` | `string` | The anchor key. |
| `quote` | `string` |  |
| `resolved` | `bool` |  |

#### Example: List

```php
// list() returns an array of ArtefactCommentThread entities, one per record (throws on error).
$artefact_comment_threads = $client->ArtefactCommentThread()->list(["artefact_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$artefact_comment_thread = $client->ArtefactCommentThread()->create([
    "artefact_id" => null, // string
    "organization_id" => null, // string
    "anchor" => null, // string
    "body" => null, // string
]);
```


### ArtefactRevision

Create an instance: `$artefact_revision = $client->ArtefactRevision();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_version` | `int` | The newest version the editor started from. |
| `content` | `string` | Markdown, including CriticMarkup suggestions and comment anchors. |

#### Example: Create

```php
$artefact_revision = $client->ArtefactRevision()->create([
    "artefact_id" => null, // string
    "organization_id" => null, // string
    "base_version" => null, // int
    "content" => null, // string
]);
```


### ArtefactViewToken

Create an instance: `$artefact_view_token = $client->ArtefactViewToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_in` | `int` |  |
| `file` | `string` | Exact manifest path. |
| `organization_slug` | `string` | If provided, must match the organization addressed by the route. |
| `version` | `int` |  |
| `viewer_url` | `string` |  |

#### Example: Create

```php
$artefact_view_token = $client->ArtefactViewToken()->create([
    "artefact_id" => null, // string
    "organization_id" => null, // string
]);
```


### Artifact

Create an instance: `$artifact = $client->Artifact();`

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

```php
// load() returns the ENTITY — call data_get() for the Artifact record (throws on error).
$artifact = $client->Artifact()->load(["id" => "artifact_id"]);
```

#### Example: List

```php
// list() returns an array of Artifact entities, one per record (throws on error).
$artifacts = $client->Artifact()->list();
```

#### Example: Create

```php
$artifact = $client->Artifact()->create([
]);
```


### ArtifactCacheNamespace

Create an instance: `$artifact_cache_namespace = $client->ArtifactCacheNamespace();`

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

```php
// load() returns the ENTITY — call data_get() for the ArtifactCacheNamespace record (throws on error).
$artifact_cache_namespace = $client->ArtifactCacheNamespace()->load(["id" => "artifact_cache_namespace_id"]);
```

#### Example: List

```php
// list() returns an array of ArtifactCacheNamespace entities, one per record (throws on error).
$artifact_cache_namespaces = $client->ArtifactCacheNamespace()->list();
```

#### Example: Create

```php
$artifact_cache_namespace = $client->ArtifactCacheNamespace()->create([
]);
```


### ArtifactImageRepository

Create an instance: `$artifact_image_repository = $client->ArtifactImageRepository();`

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

```php
// load() returns the ENTITY — call data_get() for the ArtifactImageRepository record (throws on error).
$artifact_image_repository = $client->ArtifactImageRepository()->load(["id" => "artifact_image_repository_id"]);
```

#### Example: List

```php
// list() returns an array of ArtifactImageRepository entities, one per record (throws on error).
$artifact_image_repositorys = $client->ArtifactImageRepository()->list();
```

#### Example: Create

```php
$artifact_image_repository = $client->ArtifactImageRepository()->create([
]);
```


### ArtifactPackageMirror

Create an instance: `$artifact_package_mirror = $client->ArtifactPackageMirror();`

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

```php
// load() returns the ENTITY — call data_get() for the ArtifactPackageMirror record (throws on error).
$artifact_package_mirror = $client->ArtifactPackageMirror()->load(["id" => "artifact_package_mirror_id"]);
```

#### Example: List

```php
// list() returns an array of ArtifactPackageMirror entities, one per record (throws on error).
$artifact_package_mirrors = $client->ArtifactPackageMirror()->list();
```

#### Example: Create

```php
$artifact_package_mirror = $client->ArtifactPackageMirror()->create([
]);
```


### ArtifactRetentionPolicy

Create an instance: `$artifact_retention_policy = $client->ArtifactRetentionPolicy();`

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

```php
// load() returns the ENTITY — call data_get() for the ArtifactRetentionPolicy record (throws on error).
$artifact_retention_policy = $client->ArtifactRetentionPolicy()->load(["id" => "artifact_retention_policy_id"]);
```

#### Example: List

```php
// list() returns an array of ArtifactRetentionPolicy entities, one per record (throws on error).
$artifact_retention_policys = $client->ArtifactRetentionPolicy()->list();
```

#### Example: Create

```php
$artifact_retention_policy = $client->ArtifactRetentionPolicy()->create([
]);
```


### AttachmentPart

Create an instance: `$attachment_part = $client->AttachmentPart();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AuditEvent

Create an instance: `$audit_event = $client->AuditEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_user_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `id` | `string` |  |
| `observability_space_id` | `mixed` |  |
| `organization_id` | `string` |  |
| `payload` | `mixed` |  |
| `request_id` | `mixed` |  |
| `severity` | `string` |  |
| `subject_id` | `string` |  |
| `subject_kind` | `string` |  |
| `subject_name` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of AuditEvent entities, one per record (throws on error).
$audit_events = $client->AuditEvent()->list(["organization_id" => "example"]);
```


### Auth

Create an instance: `$auth = $client->Auth();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |


### AuthCli

Create an instance: `$auth_cli = $client->AuthCli();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### AuthGithub

Create an instance: `$auth_github = $client->AuthGithub();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthGoogle

Create an instance: `$auth_google = $client->AuthGoogle();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthOpenai

Create an instance: `$auth_openai = $client->AuthOpenai();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### AuthPasswordReset

Create an instance: `$auth_password_reset = $client->AuthPasswordReset();`

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

```php
$auth_password_reset = $client->AuthPasswordReset()->create([
    "email" => null, // string
]);
```


### AuthRegistrationOption

Create an instance: `$auth_registration_option = $client->AuthRegistrationOption();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_password_signup_enabled` | `bool` |  |
| `openai_sign_in_enabled` | `bool` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` | `mixed` |  |
| `waitlist_enabled` | `bool` | New public signups require waitlist approval when enabled. |

#### Example: List

```php
// list() returns an array of AuthRegistrationOption entities, one per record (throws on error).
$auth_registration_options = $client->AuthRegistrationOption()->list();
```


### AutomationEvent

Create an instance: `$automation_event = $client->AutomationEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `event_subscriptions` | `array` |  |
| `event_triggers` | `array` |  |
| `expected_revision` | `mixed` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `int` |  |
| `schedule` | `mixed` |  |
| `schedules` | `array` |  |
| `settings` | `array` |  |
| `subscription_key` | `string` |  |
| `version` | `array` |  |


### AutomationRun

Create an instance: `$automation_run = $client->AutomationRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `mixed` | Saved native automation identity. |
| `budget_seconds` | `mixed` | The run stops once it has been running this long |
| `budget_usd` | `mixed` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `mixed` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `mixed` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `array` |  |
| `error` | `mixed` |  |
| `finished_at` | `mixed` |  |
| `flow_steps` | `mixed` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` |  |
| `input` | `array` |  |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `mixed` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `mixed` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` |  |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `mixed` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `mixed` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `int` |  |
| `steps` | `array` |  |
| `trigger_id` | `mixed` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` |  |
| `wake_at` | `mixed` | When a sleeping run's step looks again |
| `workflow_digest` | `mixed` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `mixed` |  |

#### Example: Create

```php
$automation_run = $client->AutomationRun()->create([
    "agent_id" => null, // string
    "automation_id" => null, // string
    "organization_id" => null, // string
    "input" => null, // array
    "request_id" => null, // string
    "version_id" => null, // string
]);
```


### BackendRunnerPool

Create an instance: `$backend_runner_pool = $client->BackendRunnerPool();`

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

```php
// list() returns an array of BackendRunnerPool entities, one per record (throws on error).
$backend_runner_pools = $client->BackendRunnerPool()->list(["backend_id" => "example"]);
```

#### Example: Create

```php
$backend_runner_pool = $client->BackendRunnerPool()->create([
    "backend_id" => null, // string
]);
```


### Bazel

Create an instance: `$bazel = $client->Bazel();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### BazelActionResult

Create an instance: `$bazel_action_result = $client->BazelActionResult();`

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

```php
// load() returns the ENTITY — call data_get() for the BazelActionResult record (throws on error).
$bazel_action_result = $client->BazelActionResult()->load(["id" => "bazel_action_result_id", "action_result_id" => "action_result_id"]);
```


### BazelBackend

Create an instance: `$bazel_backend = $client->BazelBackend();`

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

```php
// load() returns the ENTITY — call data_get() for the BazelBackend record (throws on error).
$bazel_backend = $client->BazelBackend()->load(["id" => "bazel_backend_id"]);
```

#### Example: List

```php
// list() returns an array of BazelBackend entities, one per record (throws on error).
$bazel_backends = $client->BazelBackend()->list();
```

#### Example: Create

```php
$bazel_backend = $client->BazelBackend()->create([
]);
```


### BazelBlob

Create an instance: `$bazel_blob = $client->BazelBlob();`

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

```php
// load() returns the ENTITY — call data_get() for the BazelBlob record (throws on error).
$bazel_blob = $client->BazelBlob()->load(["id" => "bazel_blob_id", "blob_id" => "blob_id", "hash" => "hash"]);
```


### BazelExecution

Create an instance: `$bazel_execution = $client->BazelExecution();`

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

```php
// load() returns the ENTITY — call data_get() for the BazelExecution record (throws on error).
$bazel_execution = $client->BazelExecution()->load(["id" => "bazel_execution_id"]);
```

#### Example: Create

```php
$bazel_execution = $client->BazelExecution()->create([
]);
```


### BazelFindMissingBlob

Create an instance: `$bazel_find_missing_blob = $client->BazelFindMissingBlob();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$bazel_find_missing_blob = $client->BazelFindMissingBlob()->create([
]);
```


### Billing

Create an instance: `$billing = $client->Billing();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Billing record (throws on error).
$billing = $client->Billing()->load(["organization_id" => "organization_id"]);
```


### BillingAddon

Create an instance: `$billing_addon = $client->BillingAddon();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `quantity` | `int` |  |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |


### BillingBudget

Create an instance: `$billing_budget = $client->BillingBudget();`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `mixed` | Null clears the budget. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |


### BillingCheckoutSession

Create an instance: `$billing_checkout_session = $client->BillingCheckoutSession();`

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
| `package_revision` | `int` |  |
| `success_url` | `string` |  |

#### Example: Create

```php
$billing_checkout_session = $client->BillingCheckoutSession()->create([
    "organization_id" => null, // string
]);
```


### BillingContact

Create an instance: `$billing_contact = $client->BillingContact();`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `billing_email` | `string` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |


### BillingExtraSpend

Create an instance: `$billing_extra_spend = $client->BillingExtraSpend();`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `enabled` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `mixed` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |


### BillingInvoice

Create an instance: `$billing_invoice = $client->BillingInvoice();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_due_cents` | `int` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `hosted_invoice_url` | `mixed` |  |
| `id` | `string` |  |
| `invoice_pdf` | `mixed` |  |
| `metronome_invoice_id` | `mixed` | Metronome's id for the invoice it pushed |
| `number` | `mixed` |  |
| `period_ended_at` | `mixed` |  |
| `period_started_at` | `mixed` |  |
| `status` | `string` |  |
| `total_cents` | `int` |  |

#### Example: List

```php
// list() returns an array of BillingInvoice entities, one per record (throws on error).
$billing_invoices = $client->BillingInvoice()->list(["organization_id" => "example"]);
```


### BillingPackage

Create an instance: `$billing_package = $client->BillingPackage();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `base_price_cents` | `int` |  |
| `billing_interval` | `string` |  |
| `billing_policy` | `string` |  |
| `ci_included_spend_cents` | `int` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` | `string` |  |
| `key` | `string` |  |
| `max_seats` | `mixed` |  |
| `name` | `string` |  |
| `pay_as_you_go_enabled` | `bool` |  |
| `rates` | `array` |  |
| `revision` | `int` |  |
| `roder_daily_run_limit` | `int` |  |
| `roder_run_concurrency_limit` | `int` |  |
| `seat_price_cents` | `int` |  |
| `trial_days` | `int` |  |
| `visibility` | `string` |  |

#### Example: List

```php
// list() returns an array of BillingPackage entities, one per record (throws on error).
$billing_packages = $client->BillingPackage()->list();
```


### BillingPortalSession

Create an instance: `$billing_portal_session = $client->BillingPortalSession();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `return_url` | `string` |  |

#### Example: Create

```php
$billing_portal_session = $client->BillingPortalSession()->create([
    "organization_id" => null, // string
]);
```


### BillingPrepaidPeriod

Create an instance: `$billing_prepaid_period = $client->BillingPrepaidPeriod();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `mixed` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `mixed` |  |
| `minutes` | `int` |  |
| `net_amount_cents` | `int` |  |
| `paid_at` | `mixed` |  |
| `paid_total_cents` | `mixed` |  |
| `payment_action_url` | `mixed` |  |
| `period_ended_at` | `string` |  |
| `period_started_at` | `string` |  |
| `receipt_url` | `mixed` |  |
| `refunded_net_cents` | `int` |  |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BillingPrepaidPeriod record (throws on error).
$billing_prepaid_period = $client->BillingPrepaidPeriod()->load(["id" => "billing_prepaid_period_id", "organization_id" => "organization_id"]);
```


### BillingPrepaidPurchase

Create an instance: `$billing_prepaid_purchase = $client->BillingPrepaidPurchase();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `mixed` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `mixed` |  |
| `minutes` | `int` |  |
| `net_amount_cents` | `int` |  |
| `paid_at` | `mixed` |  |
| `paid_total_cents` | `mixed` |  |
| `payment_action_url` | `mixed` |  |
| `prepaid` | `array` |  |
| `purchase` | `array` |  |
| `receipt_url` | `mixed` |  |
| `refunded_net_cents` | `int` |  |
| `request_key` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BillingPrepaidPurchase record (throws on error).
$billing_prepaid_purchase = $client->BillingPrepaidPurchase()->load(["id" => "billing_prepaid_purchase_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of BillingPrepaidPurchase entities, one per record (throws on error).
$billing_prepaid_purchases = $client->BillingPrepaidPurchase()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$billing_prepaid_purchase = $client->BillingPrepaidPurchase()->create([
    "organization_id" => null, // string
    "minutes" => null, // int
    "request_key" => null, // string
]);
```


### BillingSubscription

Create an instance: `$billing_subscription = $client->BillingSubscription();`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `cancel_at_period_end` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |


### BillingTokenTopUp

Create an instance: `$billing_token_top_up = $client->BillingTokenTopUp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_cents` | `int` |  |
| `request_key` | `string` |  |

#### Example: Create

```php
$billing_token_top_up = $client->BillingTokenTopUp()->create([
    "organization_id" => null, // string
    "amount_cents" => null, // int
    "request_key" => null, // string
]);
```


### BillingUsage

Create an instance: `$billing_usage = $client->BillingUsage();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Binary

Create an instance: `$binary = $client->Binary();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts_versions` | `bool` |  |
| `arch` | `mixed` |  |
| `archived_at` | `mixed` |  |
| `binary` | `array` |  |
| `created_at` | `string` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `executable` | `string` |  |
| `format` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `latest_version` | `mixed` |  |
| `launch_args` | `array` |  |
| `name` | `string` |  |
| `needs_refresh` | `bool` |  |
| `operation` | `array` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `platform` | `mixed` |  |
| `project_id` | `string` |  |
| `sha256` | `string` |  |
| `slug` | `string` |  |
| `version` | `array` |  |
| `version_defaults` | `mixed` |  |
| `versions` | `array` |  |
| `window_title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Binary record (throws on error).
$binary = $client->Binary()->load(["id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Binary entities, one per record (throws on error).
$binarys = $client->Binary()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$binary = $client->Binary()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "download_url" => null, // string
    "executable" => null, // string
    "format" => null, // mixed
    "idempotency_key" => null, // string
    "name" => null, // string
    "slug" => null, // string
    "window_title" => null, // string
]);
```


### BinaryVersion

Create an instance: `$binary_version = $client->BinaryVersion();`

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
| `arch` | `mixed` |  |
| `cancelable` | `bool` |  |
| `configuration` | `array` |  |
| `configuration_digest` | `string` |  |
| `created_at` | `string` |  |
| `deletable` | `bool` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `environment_uses` | `array` |  |
| `executable` | `string` |  |
| `format` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_args` | `array` |  |
| `operation` | `array` |  |
| `package_sha256` | `mixed` |  |
| `package_size` | `mixed` |  |
| `permissions` | `array` |  |
| `platform` | `mixed` |  |
| `preparations` | `array` |  |
| `retryable` | `bool` |  |
| `sha256` | `string` |  |
| `status` | `string` |  |
| `version` | `array` |  |
| `window_title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BinaryVersion record (throws on error).
$binary_version = $client->BinaryVersion()->load(["id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of BinaryVersion entities, one per record (throws on error).
$binary_versions = $client->BinaryVersion()->list(["binary_id" => "example", "organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$binary_version = $client->BinaryVersion()->create([
    "binary_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
    "download_url" => null, // string
    "idempotency_key" => null, // string
]);
```


### BookmarkProtectionRefreshGithubRequiredCheck

Create an instance: `$bookmark_protection_refresh_github_required_check = $client->BookmarkProtectionRefreshGithubRequiredCheck();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exclusions` | `array` |  |
| `fetched_at` | `mixed` |  |
| `fetched_at_label` | `mixed` |  |
| `github_branch` | `string` |  |
| `github_owner` | `mixed` |  |
| `github_repository_name` | `mixed` |  |
| `last_error` | `mixed` |  |
| `proven` | `bool` |  |
| `requirements` | `array` |  |
| `stale` | `bool` |  |

#### Example: Create

```php
$bookmark_protection_refresh_github_required_check = $client->BookmarkProtectionRefreshGithubRequiredCheck()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### BrowserEgressCandidate

Create an instance: `$browser_egress_candidate = $client->BrowserEgressCandidate();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```php
// list() returns an array of BrowserEgressCandidate entities, one per record (throws on error).
$browser_egress_candidates = $client->BrowserEgressCandidate()->list(["organization_id" => "example"]);
```


### BrowserSession

Create an instance: `$browser_session = $client->BrowserSession();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `mixed` |  |
| `authentication_status` | `string` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `mixed` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `mixed` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `mixed` |  |
| `closure_basis` | `mixed` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` |  |
| `controller` | `string` |  |
| `credential_id` | `mixed` | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `mixed` |  |
| `expires_at` | `string` |  |
| `failure_code` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `initial_url` | `string` |  |
| `max_seconds` | `int` |  |
| `pending_control_id` | `mixed` |  |
| `project_id` | `mixed` | Optional project slug or public ID. |
| `reconciled_at` | `mixed` |  |
| `started_at` | `mixed` |  |
| `status` | `string` |  |
| `url` | `string` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BrowserSession record (throws on error).
$browser_session = $client->BrowserSession()->load(["id" => "browser_session_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$browser_session = $client->BrowserSession()->create([
    "organization_id" => null, // string
]);
```


### BrowserSessionConnection

Create an instance: `$browser_session_connection = $client->BrowserSessionConnection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `generation` | `int` |  |
| `idempotency_key` | `string` |  |

#### Example: Create

```php
$browser_session_connection = $client->BrowserSessionConnection()->create([
    "browser_session_id" => null, // string
    "organization_id" => null, // string
    "generation" => null, // int
]);
```


### BrowserSessionControl

Create an instance: `$browser_session_control = $client->BrowserSessionControl();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `completed_at` | `mixed` |  |
| `completed_generation` | `mixed` |  |
| `connection` | `mixed` |  |
| `failure_code` | `mixed` |  |
| `id` | `string` |  |
| `requested_controller` | `string` |  |
| `requested_generation` | `int` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BrowserSessionControl record (throws on error).
$browser_session_control = $client->BrowserSessionControl()->load(["id" => "browser_session_control_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```


### BrowserSessionEvent

Create an instance: `$browser_session_event = $client->BrowserSessionEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `mixed` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `payload` | `array` |  |
| `source_sequence` | `mixed` |  |

#### Example: List

```php
// list() returns an array of BrowserSessionEvent entities, one per record (throws on error).
$browser_session_events = $client->BrowserSessionEvent()->list(["browser_session_id" => "example", "organization_id" => "example"]);
```


### BrowserSessionMedia

Create an instance: `$browser_session_media = $client->BrowserSessionMedia();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `capture_omissions` | `mixed` |  |
| `captured_at` | `mixed` |  |
| `ended_at` | `mixed` |  |
| `failure_code` | `mixed` |  |
| `files` | `array` |  |
| `frames` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `partial` | `bool` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` |  |
| `source` | `mixed` | Screenshot provenance. |
| `status` | `string` |  |
| `stop_requested_at` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BrowserSessionMedia record (throws on error).
$browser_session_media = $client->BrowserSessionMedia()->load(["id" => "browser_session_media_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```


### BrowserSessionRecording

Create an instance: `$browser_session_recording = $client->BrowserSessionRecording();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```php
$browser_session_recording = $client->BrowserSessionRecording()->create([
    "browser_session_id" => null, // string
    "organization_id" => null, // string
]);
```


### BrowserSessionScreenshot

Create an instance: `$browser_session_screenshot = $client->BrowserSessionScreenshot();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idempotency_key` | `string` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```php
$browser_session_screenshot = $client->BrowserSessionScreenshot()->create([
    "browser_session_id" => null, // string
    "organization_id" => null, // string
]);
```


### BrowserSessionTask

Create an instance: `$browser_session_task = $client->BrowserSessionTask();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `mixed` |  |
| `browser_session_id` | `string` |  |
| `cancel_requested_at` | `mixed` |  |
| `completed_at` | `mixed` |  |
| `control_generation` | `mixed` |  |
| `deadline_at` | `string` |  |
| `effects_unknown` | `bool` |  |
| `failure_code` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `instruction` | `string` |  |
| `max_rounds` | `int` |  |
| `max_seconds` | `int` |  |
| `model_selection` | `array` |  |
| `outcome` | `mixed` |  |
| `result` | `array` |  |
| `started_at` | `mixed` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BrowserSessionTask record (throws on error).
$browser_session_task = $client->BrowserSessionTask()->load(["id" => "browser_session_task_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$browser_session_task = $client->BrowserSessionTask()->create([
    "browser_session_id" => null, // string
    "organization_id" => null, // string
    "instruction" => null, // string
]);
```


### CacheNamespaceEntry

Create an instance: `$cache_namespace_entry = $client->CacheNamespaceEntry();`

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

```php
// load() returns the ENTITY — call data_get() for the CacheNamespaceEntry record (throws on error).
$cache_namespace_entry = $client->CacheNamespaceEntry()->load(["id" => "cache_namespace_entry_id", "cache_namespace_id" => "cache_namespace_id"]);
```

#### Example: List

```php
// list() returns an array of CacheNamespaceEntry entities, one per record (throws on error).
$cache_namespace_entrys = $client->CacheNamespaceEntry()->list(["cache_namespace_id" => "example"]);
```

#### Example: Create

```php
$cache_namespace_entry = $client->CacheNamespaceEntry()->create([
    "cache_namespace_id" => null, // string
]);
```


### CatalogSelector

Create an instance: `$catalog_selector = $client->CatalogSelector();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `array` |  |

#### Example: List

```php
// list() returns an array of CatalogSelector entities, one per record (throws on error).
$catalog_selectors = $client->CatalogSelector()->list(["app_id" => "example"]);
```


### CdnDeployment

Create an instance: `$cdn_deployment = $client->CdnDeployment();`

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

```php
// load() returns the ENTITY — call data_get() for the CdnDeployment record (throws on error).
$cdn_deployment = $client->CdnDeployment()->load(["id" => "cdn_deployment_id", "app_id" => "app_id", "cdn_id" => "cdn_id"]);
```

#### Example: List

```php
// list() returns an array of CdnDeployment entities, one per record (throws on error).
$cdn_deployments = $client->CdnDeployment()->list(["app_id" => "example", "cdn_id" => "example"]);
```

#### Example: Create

```php
$cdn_deployment = $client->CdnDeployment()->create([
    "app_id" => null, // string
    "cdn_id" => null, // string
]);
```


### CdnHostname

Create an instance: `$cdn_hostname = $client->CdnHostname();`

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
| `force_ssl` | `bool` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `provider_hostname_id` | `mixed` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CdnHostname record (throws on error).
$cdn_hostname = $client->CdnHostname()->load(["id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id"]);
```

#### Example: List

```php
// list() returns an array of CdnHostname entities, one per record (throws on error).
$cdn_hostnames = $client->CdnHostname()->list(["app_id" => "example", "cdn_id" => "example"]);
```

#### Example: Create

```php
$cdn_hostname = $client->CdnHostname()->create([
    "app_id" => null, // string
    "cdn_id" => null, // string
    "hostname" => null, // string
]);
```


### CdnSpace

Create an instance: `$cdn_space = $client->CdnSpace();`

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

```php
// load() returns the ENTITY — call data_get() for the CdnSpace record (throws on error).
$cdn_space = $client->CdnSpace()->load(["id" => "cdn_space_id"]);
```

#### Example: List

```php
// list() returns an array of CdnSpace entities, one per record (throws on error).
$cdn_spaces = $client->CdnSpace()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$cdn_space = $client->CdnSpace()->create([
    "organization_id" => null, // string
]);
```


### CdnSpaceObject

Create an instance: `$cdn_space_object = $client->CdnSpaceObject();`

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

```php
// load() returns the ENTITY — call data_get() for the CdnSpaceObject record (throws on error).
$cdn_space_object = $client->CdnSpaceObject()->load(["id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id"]);
```

#### Example: List

```php
// list() returns an array of CdnSpaceObject entities, one per record (throws on error).
$cdn_space_objects = $client->CdnSpaceObject()->list(["cdn_space_id" => "example"]);
```


### Change

Create an instance: `$change = $client->Change();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `array` | Counts for each state across the active non-state filters. |
| `filters` | `array` |  |
| `github_sync` | `array` |  |
| `result` | `mixed` | What this page is a page of. |

#### Example: List

```php
// list() returns an array of Change entities, one per record (throws on error).
$changes = $client->Change()->list(["organization_id" => "example"]);
```


### ChangeAsset

Create an instance: `$change_asset = $client->ChangeAsset();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias` | `string` |  |
| `byte_size` | `int` |  |
| `checksum_md5` | `string` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `filename` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```php
$change_asset = $client->ChangeAsset()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "alias" => null, // string
    "byte_size" => null, // int
    "checksum_md5" => null, // string
    "checksum_sha256" => null, // string
    "content_type" => null, // string
    "filename" => null, // string
]);
```


### ChangeComment

Create an instance: `$change_comment = $client->ChangeComment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `capabilities` | `array` |  |
| `change_id` | `mixed` |  |
| `created_at` | `mixed` |  |
| `created_at_label` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `mixed` |  |
| `line` | `mixed` |  |
| `outdated` | `bool` |  |
| `parent_comment_id` | `mixed` |  |
| `patchset_id` | `mixed` |  |
| `patchset_number` | `mixed` |  |
| `path` | `mixed` |  |
| `replies` | `array` |  |
| `resolved` | `bool` |  |
| `resolved_at` | `mixed` |  |
| `resolved_at_label` | `mixed` |  |
| `resolved_by` | `array` |  |
| `side` | `mixed` |  |
| `updated_at` | `mixed` |  |
| `updated_at_label` | `mixed` |  |
| `user` | `array` |  |

#### Example: List

```php
// list() returns an array of ChangeComment entities, one per record (throws on error).
$change_comments = $client->ChangeComment()->list(["change_id" => "example", "organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$change_comment = $client->ChangeComment()->create([
    "change_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
    "body" => null, // string
]);
```


### ChangeFileReviewCheckpoint

Create an instance: `$change_file_review_checkpoint = $client->ChangeFileReviewCheckpoint();`

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

```php
$change_file_review_checkpoint = $client->ChangeFileReviewCheckpoint()->create([
    "change_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
    "patchset_id" => null, // string
    "path" => null, // string
    "request_id" => null, // string
    "review_action" => null, // string
]);
```


### ChangeGitBranchSubmission

Create an instance: `$change_git_branch_submission = $client->ChangeGitBranchSubmission();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$change_git_branch_submission = $client->ChangeGitBranchSubmission()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### ChangeGitCommitIdentity

Create an instance: `$change_git_commit_identity = $client->ChangeGitCommitIdentity();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `change_number` | `int` |  |
| `git_commit_id` | `string` |  |
| `git_commit_ids` | `array` |  |
| `id` | `string` |  |
| `identities` | `array` |  |
| `missing_git_commit_ids` | `array` |  |
| `patchset_number` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ChangeGitCommitIdentity record (throws on error).
$change_git_commit_identity = $client->ChangeGitCommitIdentity()->load(["id" => "change_git_commit_identity_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: Create

```php
$change_git_commit_identity = $client->ChangeGitCommitIdentity()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "git_commit_ids" => null, // array
]);
```


### ChangeGitPublication

Create an instance: `$change_git_publication = $client->ChangeGitPublication();`

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
| `request` | `array` |  |
| `request_digest` | `string` |  |
| `revisions` | `array` |  |
| `status` | `string` |  |
| `transfer_refs` | `array` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ChangeGitPublication record (throws on error).
$change_git_publication = $client->ChangeGitPublication()->load(["id" => "change_git_publication_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: Create

```php
$change_git_publication = $client->ChangeGitPublication()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "operation_key" => null, // string
    "request" => null, // array
]);
```


### ChangeGroupMember

Create an instance: `$change_group_member = $client->ChangeGroupMember();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` | Change number |
| `changes` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |

#### Example: Create

```php
$change_group_member = $client->ChangeGroupMember()->create([
    "change_group_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
    "change_id" => null, // string
]);
```


### ChangeLabel

Create an instance: `$change_label = $client->ChangeLabel();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | `bool` |  |
| `add` | `array` |  |
| `approval` | `array` |  |
| `assets` | `array` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | `mixed` | Human user summary or organization automation identity. |
| `capabilities` | `array` |  |
| `change_key` | `string` |  |
| `checks` | `array` |  |
| `checks_status` | `string` |  |
| `comments` | `array` |  |
| `comments_count` | `int` |  |
| `comments_count_label` | `string` |  |
| `commit_message` | `mixed` |  |
| `current_patchset` | `array` |  |
| `description` | `mixed` |  |
| `draft` | `bool` |  |
| `folded_into_number` | `mixed` |  |
| `github_projection_status` | `mixed` |  |
| `github_pull_request` | `array` |  |
| `github_pull_requests` | `array` |  |
| `group` | `mixed` |  |
| `has_description` | `bool` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` | `string` |  |
| `jj_change_id` | `mixed` |  |
| `labels` | `array` |  |
| `landable` | `bool` |  |
| `landed_by` | `array` |  |
| `number` | `int` |  |
| `orphaned` | `bool` |  |
| `orphaned_at` | `string` |  |
| `orphaned_at_label` | `string` |  |
| `orphaned_reason` | `string` |  |
| `parent_change_id` | `mixed` |  |
| `parent_change_number` | `mixed` |  |
| `patchset_number` | `mixed` |  |
| `patchsets` | `array` |  |
| `primary_status` | `mixed` |  |
| `public_id` | `string` |  |
| `relation_chain` | `array` |  |
| `remove` | `array` |  |
| `requested_changes` | `bool` |  |
| `restack_state` | `string` |  |
| `reviewer_candidates` | `array` | Organization members available to the reviewer picker on this page. |
| `reviewers` | `array` |  |
| `stable_change_id` | `string` |  |
| `stack` | `mixed` |  |
| `status` | `string` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `unresolved_comments_count_label` | `string` |  |
| `url` | `string` |  |
| `votes` | `array` |  |


### ChangeLandingHold

Create an instance: `$change_landing_hold = $client->ChangeLandingHold();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### ChangeLandingRequest

Create an instance: `$change_landing_request = $client->ChangeLandingRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_ids` | `array` |  |
| `count` | `int` |  |
| `defer_until_ready` | `bool` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` | `string` |  |
| `expected_scope_version` | `string` |  |
| `head_change_id` | `string` |  |
| `id` | `mixed` |  |
| `numbers` | `array` |  |
| `override_acknowledged` | `bool` |  |
| `override_codes` | `array` |  |
| `position` | `int` |  |
| `priority` | `string` |  |
| `scope_version` | `string` |  |
| `state` | `string` |  |
| `version` | `int` |  |

#### Example: Create

```php
$change_landing_request = $client->ChangeLandingRequest()->create([
    "change_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### ChangeRequestChange

Create an instance: `$change_request_change = $client->ChangeRequestChange();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `mixed` |  |

#### Example: Create

```php
$change_request_change = $client->ChangeRequestChange()->create([
    "change_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### ChangeReviewer

Create an instance: `$change_reviewer = $client->ChangeReviewer();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `array` |  |
| `email` | `string` |  |
| `name` | `mixed` |  |
| `remove` | `array` |  |
| `removed_reviewers` | `array` |  |
| `requested_reviewers` | `array` |  |
| `reviewers` | `array` |  |

#### Example: List

```php
// list() returns an array of ChangeReviewer entities, one per record (throws on error).
$change_reviewers = $client->ChangeReviewer()->list(["change_id" => "example", "organization_id" => "example", "repo_id" => "example"]);
```


### ChangeTranscript

Create an instance: `$change_transcript = $client->ChangeTranscript();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture_kind` | `string` |  |
| `captured_at` | `string` |  |
| `harness` | `array` |  |
| `id` | `string` |  |
| `original_resume` | `mixed` |  |
| `patchset_commit_id` | `string` |  |
| `patchset_number` | `int` |  |
| `redaction_count` | `int` |  |
| `session_id` | `mixed` |  |
| `session_title` | `mixed` |  |
| `status` | `string` |  |
| `superseded` | `bool` |  |
| `user` | `array` |  |

#### Example: List

```php
// list() returns an array of ChangeTranscript entities, one per record (throws on error).
$change_transcripts = $client->ChangeTranscript()->list(["change_id" => "example", "organization_id" => "example", "repo_id" => "example"]);
```


### ChangeTranscriptSummary

Create an instance: `$change_transcript_summary = $client->ChangeTranscriptSummary();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `summaries` | `array` |  |

#### Example: List

```php
// list() returns an array of ChangeTranscriptSummary entities, one per record (throws on error).
$change_transcript_summarys = $client->ChangeTranscriptSummary()->list(["organization_id" => "example", "ids" => "example"]);
```


### CheckpointPrepareChunk

Create an instance: `$checkpoint_prepare_chunk = $client->CheckpointPrepareChunk();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$checkpoint_prepare_chunk = $client->CheckpointPrepareChunk()->create([
    "agent_session_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### CiNode

Create an instance: `$ci_node = $client->CiNode();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `mixed` |  |
| `bazel_enabled` | `bool` |  |
| `bazel_properties_json` | `mixed` |  |
| `ci_runner_pool_id` | `string` |  |
| `cordoned_at` | `mixed` |  |
| `cordoned_at_label` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `health_state` | `string` |  |
| `heartbeat_age_seconds` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `labels_csv` | `mixed` |  |
| `last_seen_at` | `mixed` |  |
| `last_seen_at_label` | `mixed` |  |
| `name` | `string` |  |
| `network_peer_id` | `mixed` |  |
| `node_capabilities_csv` | `mixed` |  |
| `node_certificate_expires_at` | `mixed` |  |
| `node_certificate_expires_at_label` | `mixed` |  |
| `node_certificate_fingerprint_sha256` | `mixed` |  |
| `node_certificate_serial` | `mixed` |  |
| `offline_at` | `mixed` |  |
| `offline_at_label` | `mixed` |  |
| `online_at` | `mixed` |  |
| `online_at_label` | `mixed` |  |
| `organization_id` | `string` |  |
| `os` | `mixed` |  |
| `revoked_at` | `mixed` |  |
| `revoked_at_label` | `mixed` |  |
| `schedulable` | `bool` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `version` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CiNode record (throws on error).
$ci_node = $client->CiNode()->load(["id" => "ci_node_id"]);
```


### CiPipeline

Create an instance: `$ci_pipeline = $client->CiPipeline();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ci_runner_pool_id` | `mixed` |  |
| `concurrency_key` | `mixed` |  |
| `created_at` | `string` |  |
| `default_branch` | `mixed` |  |
| `description` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `mixed` |  |
| `required_capabilities_csv` | `mixed` |  |
| `runner_pool` | `mixed` |  |
| `runs` | `array` |  |
| `slug` | `string` |  |
| `source_kind` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_on_pull_request` | `bool` |  |
| `trigger_on_push` | `bool` |  |
| `trigger_on_schedule` | `bool` |  |
| `updated_at` | `string` |  |
| `workflow_path` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CiPipeline record (throws on error).
$ci_pipeline = $client->CiPipeline()->load(["id" => "ci_pipeline_id"]);
```

#### Example: List

```php
// list() returns an array of CiPipeline entities, one per record (throws on error).
$ci_pipelines = $client->CiPipeline()->list();
```

#### Example: Create

```php
$ci_pipeline = $client->CiPipeline()->create([
]);
```


### CiPipelineRun

Create an instance: `$ci_pipeline_run = $client->CiPipelineRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `canceled_at` | `mixed` |  |
| `ci_pipeline_id` | `string` |  |
| `ci_runner_pool_id` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `concurrency_key` | `mixed` |  |
| `created_at` | `string` |  |
| `creator_user_id` | `mixed` |  |
| `display_id` | `int` |  |
| `failed` | `bool` |  |
| `finished_at` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `jobs` | `array` |  |
| `message` | `mixed` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `parameters_json` | `mixed` |  |
| `queued_at` | `mixed` |  |
| `ref_name` | `mixed` |  |
| `repository_id` | `mixed` |  |
| `required_capabilities_csv` | `mixed` |  |
| `retry_number` | `int` |  |
| `retryable` | `bool` |  |
| `slug` | `string` |  |
| `source_url` | `mixed` |  |
| `started_at` | `mixed` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CiPipelineRun record (throws on error).
$ci_pipeline_run = $client->CiPipelineRun()->load(["id" => "ci_pipeline_run_id", "pipeline_id" => "pipeline_id"]);
```

#### Example: List

```php
// list() returns an array of CiPipelineRun entities, one per record (throws on error).
$ci_pipeline_runs = $client->CiPipelineRun()->list(["pipeline_id" => "example"]);
```

#### Example: Create

```php
$ci_pipeline_run = $client->CiPipelineRun()->create([
    "pipeline_id" => null, // string
]);
```


### CiRunnerPool

Create an instance: `$ci_runner_pool = $client->CiRunnerPool();`

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
| `bazel_enabled` | `bool` |  |
| `bazel_properties_json` | `mixed` |  |
| `created_at` | `string` |  |
| `description` | `mixed` |  |
| `elastic_config_json` | `mixed` |  |
| `elastic_provider_kind` | `mixed` |  |
| `id` | `string` |  |
| `isolation_mode` | `string` |  |
| `labels_csv` | `mixed` |  |
| `max_concurrency` | `int` |  |
| `modal_capacity` | `array` |  |
| `modal_runner_invocations` | `array` |  |
| `name` | `string` |  |
| `network_space_id` | `mixed` |  |
| `node_capabilities_csv` | `mixed` |  |
| `organization_id` | `string` |  |
| `runner_count_label` | `string` |  |
| `runner_kind` | `string` |  |
| `runners` | `array` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CiRunnerPool record (throws on error).
$ci_runner_pool = $client->CiRunnerPool()->load(["id" => "ci_runner_pool_id"]);
```

#### Example: List

```php
// list() returns an array of CiRunnerPool entities, one per record (throws on error).
$ci_runner_pools = $client->CiRunnerPool()->list();
```

#### Example: Create

```php
$ci_runner_pool = $client->CiRunnerPool()->create([
]);
```


### CiStatus

Create an instance: `$ci_status = $client->CiStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### CliEvent

Create an instance: `$cli_event = $client->CliEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `properties` | `array` |  |

#### Example: Create

```php
$cli_event = $client->CliEvent()->create([
    "event" => null, // string
    "properties" => null, // array
]);
```


### CliRelease

Create an instance: `$cli_release = $client->CliRelease();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: List

```php
// list() returns an array of CliRelease entities, one per record (throws on error).
$cli_releases = $client->CliRelease()->list();
```

#### Example: Create

```php
$cli_release = $client->CliRelease()->create([
]);
```


### CloudWorkspaceBackupObject

Create an instance: `$cloud_workspace_backup_object = $client->CloudWorkspaceBackupObject();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CloudWorkspaceBackupObject record (throws on error).
$cloud_workspace_backup_object = $client->CloudWorkspaceBackupObject()->load(["id" => "cloud_workspace_backup_object_id", "cloud_workspace_backup_id" => "cloud_workspace_backup_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### CodeRuleEvaluation

Create an instance: `$code_rule_evaluation = $client->CodeRuleEvaluation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advisory` | `bool` |  |
| `coverage` | `array` |  |
| `diff` | `string` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` | `int` |  |
| `evaluator_version` | `string` |  |
| `input_digest` | `mixed` |  |
| `limits` | `array` |  |
| `model` | `string` |  |
| `requests` | `array` |  |
| `schema_version` | `int` |  |
| `snapshot_digest` | `mixed` |  |
| `unchecked` | `array` |  |
| `verdicts` | `array` |  |

#### Example: Create

```php
$code_rule_evaluation = $client->CodeRuleEvaluation()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "diff" => null, // string
]);
```


### ComSiteAccess

Create an instance: `$com_site_access = $client->ComSiteAccess();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ComSiteAccessSession

Create an instance: `$com_site_access_session = $client->ComSiteAccessSession();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookie_name` | `string` |  |
| `host` | `string` | Site hostname, for example docs.acme.composal.page |
| `max_age` | `int` |  |
| `session_token` | `string` |  |

#### Example: Create

```php
$com_site_access_session = $client->ComSiteAccessSession()->create([
    "host" => null, // string
]);
```


### CommentThreadComment

Create an instance: `$comment_thread_comment = $client->CommentThreadComment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |

#### Example: Create

```php
$comment_thread_comment = $client->CommentThreadComment()->create([
    "artefact_id" => null, // string
    "comment_thread_id" => null, // string
    "organization_id" => null, // string
    "body" => null, // string
]);
```


### CommitDiff

Create an instance: `$commit_diff = $client->CommitDiff();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `array` |  |
| `id` | `string` |  |
| `parent_id` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CommitDiff record (throws on error).
$commit_diff = $client->CommitDiff()->load(["id" => "commit_diff_id", "commit_id" => "commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### ConnectionRequest

Create an instance: `$connection_request = $client->ConnectionRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `string` |  |
| `auth_scheme` | `string` |  |
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `error_code` | `mixed` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `mixed` |  |
| `retired_at` | `mixed` |  |
| `revoked_at` | `mixed` |  |
| `source_operation_id` | `mixed` |  |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ConnectionRequest record (throws on error).
$connection_request = $client->ConnectionRequest()->load(["id" => "connection_request_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```


### ConnectionSource

Create an instance: `$connection_source = $client->ConnectionSource();`

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

```php
// list() returns an array of ConnectionSource entities, one per record (throws on error).
$connection_sources = $client->ConnectionSource()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### ContactSubmission

Create an instance: `$contact_submission = $client->ContactSubmission();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `mixed` |  |
| `email` | `string` | Stored downcased and stripped. |
| `message` | `string` |  |
| `name` | `string` |  |
| `website` | `mixed` | Honeypot. |

#### Example: Create

```php
$contact_submission = $client->ContactSubmission()->create([
    "email" => null, // string
    "message" => null, // string
    "name" => null, // string
]);
```


### ControlComputer

Create an instance: `$control_computer = $client->ControlComputer();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `array` | A point-in-time control transport observation. |
| `consent` | `array` |  |
| `device` | `array` |  |
| `id` | `string` |  |
| `provider_status` | `array` |  |

#### Example: List

```php
// list() returns an array of ControlComputer entities, one per record (throws on error).
$control_computers = $client->ControlComputer()->list(["organization_id" => "example", "persistent_agent_id" => "example"]);
```


### ControlComputerControlOperation

Create an instance: `$control_computer_control_operation = $client->ControlComputerControlOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `array` |  |
| `created_at` | `string` |  |
| `delivery` | `array` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `array` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `array` |  |
| `result` | `mixed` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ControlComputerControlOperation record (throws on error).
$control_computer_control_operation = $client->ControlComputerControlOperation()->load(["id" => "control_computer_control_operation_id", "control_computer_id" => "control_computer_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$control_computer_control_operation = $client->ControlComputerControlOperation()->create([
    "control_computer_id" => null, // string
    "organization_id" => null, // string
    "action" => null, // string
    "arguments" => null, // array
    "key" => null, // string
]);
```


### CoordinationWait

Create an instance: `$coordination_wait = $client->CoordinationWait();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_stop` | `bool` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `stop_state` | `mixed` |  |
| `wake_outcome` | `mixed` |  |

#### Example: List

```php
// list() returns an array of CoordinationWait entities, one per record (throws on error).
$coordination_waits = $client->CoordinationWait()->list(["agent_id" => "example", "coordination_id" => "example", "organization_id" => "example"]);
```


### CredentialSignInCheck

Create an instance: `$credential_sign_in_check = $client->CredentialSignInCheck();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | The project environment (app) to sign in to |
| `environment_name` | `string` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```php
$credential_sign_in_check = $client->CredentialSignInCheck()->create([
    "credential_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
    "environment_id" => null, // string
]);
```


### DataResourceRotateCredential

Create an instance: `$data_resource_rotate_credential = $client->DataResourceRotateCredential();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `mixed` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `mixed` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `mixed` |  |
| `provider_metadata` | `array` |  |
| `region` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `mixed` |  |
| `storage_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `version` | `mixed` |  |

#### Example: Create

```php
$data_resource_rotate_credential = $client->DataResourceRotateCredential()->create([
    "app_id" => null, // string
    "data_resource_id" => null, // string
]);
```


### DeepScan

Create an instance: `$deep_scan = $client->DeepScan();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `active` | `array` |  |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `array` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `array` | Present only when launch was requested by an admin |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `array` |  |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DeepScan record (throws on error).
$deep_scan = $client->DeepScan()->load(["id" => "deep_scan_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of DeepScan entities, one per record (throws on error).
$deep_scans = $client->DeepScan()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$deep_scan = $client->DeepScan()->create([
    "organization_id" => null, // string
    "environment_id" => null, // string
    "goal" => null, // string
]);
```


### DeepScanFinding

Create an instance: `$deep_scan_finding = $client->DeepScanFinding();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding_count` | `int` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `array` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `array` |  |
| `findings_fix_prompt` | `mixed` |  |
| `free_findings_pending` | `bool` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `array` |  |
| `priority` | `mixed` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` |  |
| `reproduction_of` | `mixed` |  |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` |  |
| `title` | `string` |  |
| `unlock` | `array` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` |  |

#### Example: List

```php
// list() returns an array of DeepScanFinding entities, one per record (throws on error).
$deep_scan_findings = $client->DeepScanFinding()->list(["deep_scan_id" => "example", "organization_id" => "example"]);
```


### DeepScanFlow

Create an instance: `$deep_scan_flow = $client->DeepScanFlow();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `concurrency` | `int` |  |
| `environment_id` | `string` |  |
| `exploration_id` | `string` |  |
| `flow_names` | `array` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `note` | `mixed` |  |

#### Example: Create

```php
$deep_scan_flow = $client->DeepScanFlow()->create([
    "organization_id" => null, // string
    "flow_names" => null, // array
]);
```


### DeepScanMappedFlow

Create an instance: `$deep_scan_mapped_flow = $client->DeepScanMappedFlow();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `environment_id` | `string` |  |
| `flow_map` | `mixed` |  |
| `revision_id` | `mixed` |  |

#### Example: List

```php
// list() returns an array of DeepScanMappedFlow entities, one per record (throws on error).
$deep_scan_mapped_flows = $client->DeepScanMappedFlow()->list(["organization_id" => "example", "environment_id" => "example"]);
```


### DeepScanOption

Create an instance: `$deep_scan_option = $client->DeepScanOption();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `array` |  |
| `deep_scan_defaults` | `mixed` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `mixed` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` |  |
| `name` | `string` |  |
| `personas` | `array` |  |
| `preview` | `bool` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `mixed` |  |

#### Example: List

```php
// list() returns an array of DeepScanOption entities, one per record (throws on error).
$deep_scan_options = $client->DeepScanOption()->list(["organization_id" => "example"]);
```


### DemoShare

Create an instance: `$demo_share = $client->DemoShare();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `recording` | `array` |  |
| `summary` | `string` | What the recorded browser confirmed. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DemoShare record (throws on error).
$demo_share = $client->DemoShare()->load(["id" => "demo_share_id"]);
```


### DemoShareSegment

Create an instance: `$demo_share_segment = $client->DemoShareSegment();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DemoShareSegment record (throws on error).
$demo_share_segment = $client->DemoShareSegment()->load(["id" => "demo_share_segment_id", "demo_share_id" => "demo_share_id"]);
```


### Deployment

Create an instance: `$deployment = $client->Deployment();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `array` |  |
| `artifact_locator` | `mixed` |  |
| `build_duration_seconds` | `mixed` |  |
| `build_source` | `mixed` |  |
| `build_status` | `string` |  |
| `children` | `array` |  |
| `ci_pipeline_id` | `mixed` |  |
| `ci_pipeline_run_id` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `created_at` | `string` |  |
| `creator` | `mixed` |  |
| `deployed_url` | `mixed` |  |
| `duration_seconds` | `mixed` |  |
| `environment` | `array` |  |
| `history_kind` | `string` |  |
| `history_reason` | `mixed` |  |
| `id` | `string` |  |
| `is_live` | `bool` |  |
| `is_rollback` | `bool` |  |
| `live_region_count` | `int` |  |
| `number` | `int` |  |
| `placement` | `mixed` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollback_reason` | `mixed` |  |
| `rollback_source_release_id` | `mixed` |  |
| `rollback_target_release_id` | `mixed` |  |
| `rollout_predecessor_id` | `mixed` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `array` |  |
| `source_ref` | `mixed` |  |
| `status` | `string` |  |
| `total_replicas` | `int` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Deployment record (throws on error).
$deployment = $client->Deployment()->load(["id" => "deployment_id", "organization_id" => "organization_id"]);
```


### DeploymentDashboardNomad

Create an instance: `$deployment_dashboard_nomad = $client->DeploymentDashboardNomad();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentDetail

Create an instance: `$deployment_detail = $client->DeploymentDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `array` |  |
| `app` | `mixed` |  |
| `app_id` | `mixed` |  |
| `audit_events` | `array` |  |
| `capacity` | `array` |  |
| `data_resources` | `array` |  |
| `deploy_targets` | `array` |  |
| `deployments` | `array` |  |
| `desired_states` | `array` |  |
| `environments` | `array` |  |
| `filters` | `array` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | `array` | The rolled-up state of the selected scope. |
| `nomad` | `array` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` | `array` |  |
| `placements` | `array` |  |
| `reconciler_ticks` | `array` |  |
| `releases` | `array` |  |
| `runtime_instances` | `array` |  |
| `service_bindings` | `array` |  |
| `service_views` | `array` |  |
| `storage_resources` | `array` |  |

#### Example: List

```php
// list() returns an array of DeploymentDetail entities, one per record (throws on error).
$deployment_details = $client->DeploymentDetail()->list(["organization_id" => "example"]);
```


### DeploymentFile

Create an instance: `$deployment_file = $client->DeploymentFile();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### DeploymentLog

Create an instance: `$deployment_log = $client->DeploymentLog();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `app_environment_id` | `mixed` |  |
| `app_release_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `details` | `mixed` |  |
| `environment_name` | `string` |  |
| `release_version` | `mixed` |  |
| `service_name` | `string` |  |
| `status` | `string` |  |
| `task` | `mixed` |  |
| `unreachable_reason` | `mixed` |  |

#### Example: List

```php
// list() returns an array of DeploymentLog entities, one per record (throws on error).
$deployment_logs = $client->DeploymentLog()->list(["organization_id" => "example"]);
```


### DeploymentMetric

Create an instance: `$deployment_metric = $client->DeploymentMetric();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `bool` |  |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `placement_id` | `string` |  |
| `redeploy` | `bool` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollout_strategy` | `string` |  |
| `service_id` | `string` |  |
| `service_name` | `string` |  |
| `source_ref` | `mixed` |  |

#### Example: List

```php
// list() returns an array of DeploymentMetric entities, one per record (throws on error).
$deployment_metrics = $client->DeploymentMetric()->list(["organization_id" => "example"]);
```


### DeploymentPreview

Create an instance: `$deployment_preview = $client->DeploymentPreview();`

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
| `change_number` | `mixed` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string` |  |
| `expires_at` | `string` |  |
| `generation` | `int` |  |
| `health` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_operation_status` | `mixed` |  |
| `name` | `string` |  |
| `owner_name` | `mixed` |  |
| `profile_name` | `string` |  |
| `resource_overrides` | `array` | Service public IDs mapped to resource overrides. |
| `retained` | `bool` |  |
| `slug` | `string` |  |
| `snapshot_version` | `int` |  |
| `source_revision` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `urls` | `array` |  |
| `vcs_change_id` | `mixed` |  |

#### Example: List

```php
// list() returns an array of DeploymentPreview entities, one per record (throws on error).
$deployment_previews = $client->DeploymentPreview()->list(["organization_id" => "example"]);
```


### DeploymentSetting

Create an instance: `$deployment_setting = $client->DeploymentSetting();`

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

```php
// list() returns an array of DeploymentSetting entities, one per record (throws on error).
$deployment_settings = $client->DeploymentSetting()->list(["organization_id" => "example"]);
```


### DesktopLocalAgentModel

Create an instance: `$desktop_local_agent_model = $client->DesktopLocalAgentModel();`

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

```php
// list() returns an array of DesktopLocalAgentModel entities, one per record (throws on error).
$desktop_local_agent_models = $client->DesktopLocalAgentModel()->list(["organization_id" => "example"]);
```


### DesktopLocalAgentResponse

Create an instance: `$desktop_local_agent_response = $client->DesktopLocalAgentResponse();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `array` |  |
| `max_output_tokens` | `int` |  |
| `model` | `string` |  |
| `store` | `bool` |  |
| `stream` | `bool` |  |

#### Example: Create

```php
$desktop_local_agent_response = $client->DesktopLocalAgentResponse()->create([
    "organization_id" => null, // string
    "input" => null, // array
    "model" => null, // string
    "store" => null, // bool
    "stream" => null, // bool
]);
```


### Device

Create an instance: `$device = $client->Device();`

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
| `coding_connection` | `mixed` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | `mixed` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | `string` | Display-only native presence. |
| `control_delivery_policy` | `array` |  |
| `control_spawn_policy` | `array` |  |
| `created_at` | `string` |  |
| `device` | `array` |  |
| `environment` | `string` |  |
| `execution_available` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `native_device_id` | `string` |  |
| `paired_at` | `string` |  |
| `pairing_generation` | `int` |  |
| `platform` | `string` |  |
| `project_visibility` | `array` | Folder discovery and new-thread selection. |
| `provider_status` | `array` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` | `mixed` |  |
| `scheduled_check_ins` | `bool` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | `string` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Device record (throws on error).
$device = $client->Device()->load(["id" => "device_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Device entities, one per record (throws on error).
$devices = $client->Device()->list(["organization_id" => "example"]);
```


### DeviceBrowserOperation

Create an instance: `$device_browser_operation = $client->DeviceBrowserOperation();`

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

```php
// list() returns an array of DeviceBrowserOperation entities, one per record (throws on error).
$device_browser_operations = $client->DeviceBrowserOperation()->list(["device_id" => "example", "organization_id" => "example"]);
```


### DeviceControlMessage

Create an instance: `$device_control_message = $client->DeviceControlMessage();`

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
| `sender` | `mixed` |  |
| `text` | `mixed` |  |
| `text_omitted` | `bool` |  |
| `thread` | `array` |  |

#### Example: List

```php
// list() returns an array of DeviceControlMessage entities, one per record (throws on error).
$device_control_messages = $client->DeviceControlMessage()->list(["device_id" => "example", "organization_id" => "example"]);
```


### DeviceControlOperation

Create an instance: `$device_control_operation = $client->DeviceControlOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `array` |  |
| `created_at` | `string` |  |
| `delivery` | `array` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `array` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `array` |  |
| `result` | `mixed` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DeviceControlOperation record (throws on error).
$device_control_operation = $client->DeviceControlOperation()->load(["id" => "device_control_operation_id", "device_id" => "device_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$device_control_operation = $client->DeviceControlOperation()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "action" => null, // string
    "arguments" => null, // array
    "key" => null, // string
]);
```


### DeviceEnterpriseRelay

Create an instance: `$device_enterprise_relay = $client->DeviceEnterpriseRelay();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of DeviceEnterpriseRelay entities, one per record (throws on error).
$device_enterprise_relays = $client->DeviceEnterpriseRelay()->list();
```


### DeviceFolderListing

Create an instance: `$device_folder_listing = $client->DeviceFolderListing();`

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
| `folders` | `array` |  |
| `id` | `string` |  |
| `key` | `string` | Stable idempotency key for this listing. |
| `parent` | `mixed` |  |
| `path` | `string` | The resolved folder. |
| `state` | `string` |  |
| `truncated` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DeviceFolderListing record (throws on error).
$device_folder_listing = $client->DeviceFolderListing()->load(["id" => "device_folder_listing_id", "device_id" => "device_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$device_folder_listing = $client->DeviceFolderListing()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "key" => null, // string
    "path" => null, // string
]);
```


### DeviceGrant

Create an instance: `$device_grant = $client->DeviceGrant();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_grants` | `array` |  |
| `agent_choices` | `array` | Eligible picker choices, with current owner grant targets, on the first page only. |
| `agent_id` | `string` |  |
| `all_agents_access` | `bool` | Whether every agent the owner can use may use this computer for the owner's messages, including agents added later. |
| `capabilities` | `array` |  |
| `execution_available` | `bool` |  |
| `grants` | `array` |  |
| `id` | `string` |  |
| `next_cursor` | `mixed` |  |
| `principal_id` | `string` |  |

#### Example: List

```php
// list() returns an array of DeviceGrant entities, one per record (throws on error).
$device_grants = $client->DeviceGrant()->list(["device_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$device_grant = $client->DeviceGrant()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "agent_id" => null, // string
    "capabilities" => null, // array
    "principal_id" => null, // string
]);
```


### DeviceInvocation

Create an instance: `$device_invocation = $client->DeviceInvocation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### DeviceLocalEvent

Create an instance: `$device_local_event = $client->DeviceLocalEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `recorded` | `bool` |  |

#### Example: Create

```php
$device_local_event = $client->DeviceLocalEvent()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "event" => null, // string
]);
```


### DevicePairing

Create an instance: `$device_pairing = $client->DevicePairing();`

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

```php
$device_pairing = $client->DevicePairing()->create([
    "organization_id" => null, // string
    "architecture" => null, // string
    "channel" => null, // string
    "name" => null, // string
    "platform" => null, // string
    "public_key" => null, // string
]);
```


### DeviceProject

Create an instance: `$device_project = $client->DeviceProject();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### DeviceScheduledCheckIn

Create an instance: `$device_scheduled_check_in = $client->DeviceScheduledCheckIn();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |

#### Example: Create

```php
$device_scheduled_check_in = $client->DeviceScheduledCheckIn()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "enabled" => null, // bool
]);
```


### DockerBuilder

Create an instance: `$docker_builder = $client->DockerBuilder();`

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
| `created_at` | `mixed` |  |
| `gateway_url` | `mixed` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `int` |  |
| `id` | `string` |  |
| `last_activity_at` | `mixed` |  |
| `organization_id` | `string` |  |
| `ready_at` | `mixed` |  |
| `slept_at` | `mixed` |  |
| `slug` | `string` |  |
| `startup_attempt` | `int` |  |
| `startup_failure` | `mixed` | Safe failure reason for the most recent startup attempt |
| `startup_stage` | `mixed` |  |
| `status` | `string` |  |
| `updated_at` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DockerBuilder record (throws on error).
$docker_builder = $client->DockerBuilder()->load(["id" => "docker_builder_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of DockerBuilder entities, one per record (throws on error).
$docker_builders = $client->DockerBuilder()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$docker_builder = $client->DockerBuilder()->create([
    "organization_id" => null, // string
]);
```


### DockerBuilderSession

Create an instance: `$docker_builder_session = $client->DockerBuilderSession();`

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
| `gateway_url` | `mixed` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `int` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revoked_at` | `mixed` |  |
| `user_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DockerBuilderSession record (throws on error).
$docker_builder_session = $client->DockerBuilderSession()->load(["id" => "docker_builder_session_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$docker_builder_session = $client->DockerBuilderSession()->create([
    "docker_builder_id" => null, // string
    "organization_id" => null, // string
]);
```


### DockerBuilderSetting

Create an instance: `$docker_builder_setting = $client->DockerBuilderSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `docker_builder_settings` | `array` |  |
| `idle_timeout_seconds` | `int` |  |
| `max_concurrency` | `int` |  |
| `organization_id` | `string` |  |
| `region` | `string` |  |
| `runtime_timeout_seconds` | `int` |  |

#### Example: List

```php
// list() returns an array of DockerBuilderSetting entities, one per record (throws on error).
$docker_builder_settings = $client->DockerBuilderSetting()->list(["organization_id" => "example"]);
```


### DomainDnsIntegration

Create an instance: `$domain_dns_integration = $client->DomainDnsIntegration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_label` | `mixed` |  |
| `api_token` | `string` |  |
| `created_at` | `string` |  |
| `failure_message` | `mixed` |  |
| `has_token` | `bool` |  |
| `id` | `string` |  |
| `last_verified_at` | `mixed` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```php
// list() returns an array of DomainDnsIntegration entities, one per record (throws on error).
$domain_dns_integrations = $client->DomainDnsIntegration()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$domain_dns_integration = $client->DomainDnsIntegration()->create([
    "organization_id" => null, // string
    "api_token" => null, // string
]);
```


### DomainPathRule

Create an instance: `$domain_path_rule = $client->DomainPathRule();`

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
| `app_service_endpoint_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `backend_ref` | `mixed` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_error` | `mixed` |  |
| `path_prefix` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainPathRule record (throws on error).
$domain_path_rule = $client->DomainPathRule()->load(["id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id"]);
```

#### Example: List

```php
// list() returns an array of DomainPathRule entities, one per record (throws on error).
$domain_path_rules = $client->DomainPathRule()->list(["app_id" => "example", "domain_id" => "example"]);
```

#### Example: Create

```php
$domain_path_rule = $client->DomainPathRule()->create([
    "app_id" => null, // string
    "domain_id" => null, // string
    "app_service_id" => null, // mixed
    "path_prefix" => null, // string
]);
```


### Dream

Create an instance: `$dream = $client->Dream();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `bool` | The dream skipped at least one run, which will not be retried |
| `changes` | `array` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `mixed` |  |
| `counts` | `array` |  |
| `dream` | `mixed` |  |
| `error_code` | `mixed` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Public id used in the dream's URL |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `phase` | `string` | Where the dream is. |
| `reason` | `mixed` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Local day whose finished runs it reviewed |
| `runs` | `array` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Project or unassigned environment name |
| `skipped` | `int` | Runs skipped after repeated rejected review output |
| `tab` | `string` |  |
| `timezone` | `string` | Organization timezone the dream used |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Dream record (throws on error).
$dream = $client->Dream()->load(["id" => "dream_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Dream entities, one per record (throws on error).
$dreams = $client->Dream()->list(["organization_id" => "example", "project_id" => "example"]);
```


### Edge

Create an instance: `$edge = $client->Edge();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### EmailVerification

Create an instance: `$email_verification = $client->EmailVerification();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Environment

Create an instance: `$environment = $client->Environment();`

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
| `active_revision_id` | `mixed` |  |
| `agent_sign_up_available` | `bool` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `array` |  |
| `cleanup` | `array` |  |
| `connection` | `string` |  |
| `created_at` | `string` |  |
| `default_policy` | `array` |  |
| `default_policy_json` | `array` |  |
| `discovery_defaults` | `array` |  |
| `environment` | `array` |  |
| `exploration_accounts` | `array` |  |
| `explorations` | `array` |  |
| `first_run` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `imessage_number` | `mixed` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` |  |
| `managed_google_available` | `bool` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` |  |
| `messaging_tester_number` | `mixed` | One configured tester number. |
| `name` | `string` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `array` |  |
| `onboarding_discovery` | `mixed` |  |
| `organization_id` | `string` |  |
| `pending_accounts` | `array` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `array` |  |
| `project_id` | `mixed` | Owning project. |
| `repository_id` | `mixed` |  |
| `revisions` | `array` |  |
| `setup_discovery_id` | `mixed` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `target_kind` | `mixed` |  |
| `target_url` | `mixed` |  |
| `test_accounts` | `array` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `mixed` |  |
| `version` | `int` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Environment record (throws on error).
$environment = $client->Environment()->load(["id" => "environment_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Environment entities, one per record (throws on error).
$environments = $client->Environment()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$environment = $client->Environment()->create([
    "organization_id" => null, // string
    "slug" => null, // string
]);
```


### EnvironmentDiscoveryRun

Create an instance: `$environment_discovery_run = $client->EnvironmentDiscoveryRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` | Omit for anonymous exploration |
| `deadline_at` | `string` |  |
| `environment_revision_id` | `string` |  |
| `evidence` | `array` |  |
| `failure_code` | `mixed` |  |
| `id` | `string` |  |
| `queued_at` | `string` |  |
| `recording` | `array` |  |
| `result` | `mixed` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EnvironmentDiscoveryRun record (throws on error).
$environment_discovery_run = $client->EnvironmentDiscoveryRun()->load(["id" => "environment_discovery_run_id", "environment_id" => "environment_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$environment_discovery_run = $client->EnvironmentDiscoveryRun()->create([
    "environment_id" => null, // string
    "organization_id" => null, // string
]);
```


### EnvironmentExploration

Create an instance: `$environment_exploration = $client->EnvironmentExploration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `persona_id` | `mixed` |  |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```php
$environment_exploration = $client->EnvironmentExploration()->create([
    "environment_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
    "goal" => null, // string
]);
```


### EnvironmentFirstRun

Create an instance: `$environment_first_run = $client->EnvironmentFirstRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### EnvironmentRevision

Create an instance: `$environment_revision = $client->EnvironmentRevision();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `array` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `mixed` |  |
| `app_release_id` | `mixed` |  |
| `blueprint` | `array` |  |
| `blueprint_json` | `array` |  |
| `cleanup_state` | `string` |  |
| `created_at` | `string` |  |
| `digest` | `string` |  |
| `dry_run` | `bool` |  |
| `expires_at` | `mixed` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `ready_at` | `mixed` |  |
| `resolved_manifest_json` | `array` |  |
| `retention_policy_json` | `array` |  |
| `revision` | `int` |  |
| `revoked_at` | `mixed` |  |
| `runner_environment_revision_id` | `mixed` |  |
| `safety_policy_json` | `array` |  |
| `schema_version` | `int` |  |
| `source_metadata` | `array` |  |
| `source_metadata_json` | `array` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `validation_json` | `array` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EnvironmentRevision record (throws on error).
$environment_revision = $client->EnvironmentRevision()->load(["id" => "environment_revision_id", "environment_id" => "environment_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$environment_revision = $client->EnvironmentRevision()->create([
    "environment_id" => null, // string
    "organization_id" => null, // string
    "blueprint" => null, // array
]);
```


### EnvironmentSecretBinding

Create an instance: `$environment_secret_binding = $client->EnvironmentSecretBinding();`

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

```php
// list() returns an array of EnvironmentSecretBinding entities, one per record (throws on error).
$environment_secret_bindings = $client->EnvironmentSecretBinding()->list(["app_id" => "example", "environment_id" => "example"]);
```

#### Example: Create

```php
$environment_secret_binding = $client->EnvironmentSecretBinding()->create([
    "app_id" => null, // string
    "environment_id" => null, // string
    "env_key" => null, // string
]);
```


### EnvironmentTestAccount

Create an instance: `$environment_test_account = $client->EnvironmentTestAccount();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `bool` |  |
| `credentials` | `array` |  |
| `id` | `string` |  |
| `persona` | `string` |  |
| `revision_id` | `string` |  |
| `role` | `string` |  |
| `tenant` | `string` |  |

#### Example: List

```php
// list() returns an array of EnvironmentTestAccount entities, one per record (throws on error).
$environment_test_accounts = $client->EnvironmentTestAccount()->list(["environment_id" => "example", "organization_id" => "example"]);
```


### Evidence

Create an instance: `$evidence = $client->Evidence();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Evidence record (throws on error).
$evidence = $client->Evidence()->load(["id" => "evidence_id", "organization_id" => "organization_id"]);
```


### ExecutionDesiredState

Create an instance: `$execution_desired_state = $client->ExecutionDesiredState();`

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
| `desired_state` | `array` |  |
| `id` | `string` |  |
| `stop_observed` | `bool` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ExecutionDesiredState record (throws on error).
$execution_desired_state = $client->ExecutionDesiredState()->load(["id" => "execution_desired_state_id"]);
```

#### Example: List

```php
// list() returns an array of ExecutionDesiredState entities, one per record (throws on error).
$execution_desired_states = $client->ExecutionDesiredState()->list();
```

#### Example: Create

```php
$execution_desired_state = $client->ExecutionDesiredState()->create([
]);
```


### ExecutionReconcilerTick

Create an instance: `$execution_reconciler_tick = $client->ExecutionReconcilerTick();`

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

```php
// load() returns the ENTITY — call data_get() for the ExecutionReconcilerTick record (throws on error).
$execution_reconciler_tick = $client->ExecutionReconcilerTick()->load(["id" => "execution_reconciler_tick_id"]);
```

#### Example: List

```php
// list() returns an array of ExecutionReconcilerTick entities, one per record (throws on error).
$execution_reconciler_ticks = $client->ExecutionReconcilerTick()->list();
```

#### Example: Create

```php
$execution_reconciler_tick = $client->ExecutionReconcilerTick()->create([
]);
```


### ExecutionRelease

Create an instance: `$execution_release = $client->ExecutionRelease();`

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

```php
// load() returns the ENTITY — call data_get() for the ExecutionRelease record (throws on error).
$execution_release = $client->ExecutionRelease()->load(["id" => "execution_release_id"]);
```

#### Example: List

```php
// list() returns an array of ExecutionRelease entities, one per record (throws on error).
$execution_releases = $client->ExecutionRelease()->list();
```

#### Example: Create

```php
$execution_release = $client->ExecutionRelease()->create([
]);
```


### ExecutionRuntimeInstance

Create an instance: `$execution_runtime_instance = $client->ExecutionRuntimeInstance();`

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
| `app_release_id` | `mixed` |  |
| `app_service_id` | `string` |  |
| `booted_at` | `mixed` |  |
| `booted_at_label` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `instance_key` | `string` |  |
| `last_reconciled_at` | `mixed` |  |
| `last_reconciled_at_label` | `mixed` |  |
| `last_seen_at` | `mixed` |  |
| `last_seen_at_label` | `mixed` |  |
| `location` | `mixed` |  |
| `location_id` | `string` |  |
| `network_peer_id` | `mixed` |  |
| `nomad_allocation_id` | `mixed` |  |
| `nomad_task_name` | `mixed` |  |
| `organization_id` | `string` |  |
| `private_ipv4` | `mixed` |  |
| `private_ipv6` | `mixed` |  |
| `provider_instance_id` | `mixed` |  |
| `public_endpoint` | `mixed` |  |
| `service_name` | `string` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `terminated_at` | `mixed` |  |
| `terminated_at_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ExecutionRuntimeInstance record (throws on error).
$execution_runtime_instance = $client->ExecutionRuntimeInstance()->load(["id" => "execution_runtime_instance_id"]);
```

#### Example: List

```php
// list() returns an array of ExecutionRuntimeInstance entities, one per record (throws on error).
$execution_runtime_instances = $client->ExecutionRuntimeInstance()->list();
```

#### Example: Create

```php
$execution_runtime_instance = $client->ExecutionRuntimeInstance()->create([
]);
```


### Exploration

Create an instance: `$exploration = $client->Exploration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `active` | `array` |  |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `array` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `array` | Present only when launch was requested by an admin |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `array` |  |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `persona_id` | `mixed` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Exploration record (throws on error).
$exploration = $client->Exploration()->load(["id" => "exploration_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Exploration entities, one per record (throws on error).
$explorations = $client->Exploration()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$exploration = $client->Exploration()->create([
    "organization_id" => null, // string
    "environment_id" => null, // string
    "goal" => null, // string
]);
```


### ExplorationMessage

Create an instance: `$exploration_message = $client->ExplorationMessage();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `text` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```php
$exploration_message = $client->ExplorationMessage()->create([
    "exploration_id" => null, // string
    "organization_id" => null, // string
    "text" => null, // string
]);
```


### ExplorationReport

Create an instance: `$exploration_report = $client->ExplorationReport();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ExplorationScenario

Create an instance: `$exploration_scenario = $client->ExplorationScenario();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `array` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `array` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `array` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `array` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` |  |
| `goal` | `string` |  |
| `huntable_flows` | `array` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `array` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` |  |
| `priority_counts` | `array` |  |
| `project_id` | `mixed` | Set when the exploration targets a project environment. |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `reproduction_of` | `mixed` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```php
$exploration_scenario = $client->ExplorationScenario()->create([
    "exploration_id" => null, // string
    "organization_id" => null, // string
]);
```


### Finding

Create an instance: `$finding = $client->Finding();`

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
| `deferred_until` | `mixed` | Required future time when status is deferred |
| `finding` | `array` |  |
| `fingerprint` | `string` |  |
| `first_seen_at` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `bool` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` |  |
| `organization_id` | `string` |  |
| `permissions` | `array` |  |
| `reason` | `string` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `mixed` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `mixed` |  |
| `safe_summary` | `string` |  |
| `scenario_occurrences` | `array` |  |
| `severity` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verification` | `mixed` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Finding record (throws on error).
$finding = $client->Finding()->load(["id" => "finding_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Finding entities, one per record (throws on error).
$findings = $client->Finding()->list(["organization_id" => "example"]);
```


### Gh

Create an instance: `$gh = $client->Gh();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `array` |  |
| `content` | `array` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `mixed` |  |
| `pull_request` | `mixed` |  |
| `stack` | `array` |  |
| `transcript_paths` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Gh record (throws on error).
$gh = $client->Gh()->load(["id" => "gh_id", "gh_id" => "gh_id", "github_repo" => "github_repo", "organization_id" => "organization_id"]);
```


### GitImport

Create an instance: `$git_import = $client->GitImport();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destination_mode` | `string` |  |
| `error` | `mixed` |  |
| `git_default_branch` | `string` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` | `string` |  |
| `git_url` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `name` | `string` |  |
| `native_status` | `string` |  |
| `organization` | `string` |  |
| `repository_id` | `mixed` |  |
| `root_path` | `string` |  |
| `slug` | `string` |  |
| `source_branch` | `string` |  |
| `target_branch` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GitImport record (throws on error).
$git_import = $client->GitImport()->load(["id" => "git_import_id"]);
```

#### Example: Create

```php
$git_import = $client->GitImport()->create([
    "organization_id" => null, // string
    "destination_mode" => null, // string
    "idempotency_key" => null, // string
    "root_path" => null, // string
    "slug" => null, // string
    "source_branch" => null, // string
]);
```


### Github

Create an instance: `$github = $client->Github();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GithubApp

Create an instance: `$github_app = $client->GithubApp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### GithubAppImportableRepository

Create an instance: `$github_app_importable_repository = $client->GithubAppImportableRepository();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `next_page` | `mixed` | Next GitHub page for this installation |
| `repositories` | `array` |  |

#### Example: List

```php
// list() returns an array of GithubAppImportableRepository entities, one per record (throws on error).
$github_app_importable_repositorys = $client->GithubAppImportableRepository()->list();
```


### GithubAppInstallation

Create an instance: `$github_app_installation = $client->GithubAppInstallation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `mixed` |  |
| `account_id` | `mixed` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `mixed` |  |
| `installed_at_label` | `mixed` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `array` |  |
| `status` | `string` |  |
| `suspended_at` | `mixed` |  |
| `suspended_at_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of GithubAppInstallation entities, one per record (throws on error).
$github_app_installations = $client->GithubAppInstallation()->list(["organization_id" => "example"]);
```


### GithubAppInstallationAuthorization

Create an instance: `$github_app_installation_authorization = $client->GithubAppInstallationAuthorization();`

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

```php
$github_app_installation_authorization = $client->GithubAppInstallationAuthorization()->create([
    "organization_slug" => null, // string
    "return_target" => null, // string
]);
```


### GithubAppUserAuthorization

Create an instance: `$github_app_user_authorization = $client->GithubAppUserAuthorization();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$github_app_user_authorization = $client->GithubAppUserAuthorization()->create([
]);
```


### GithubCiRepository

Create an instance: `$github_ci_repository = $client->GithubCiRepository();`

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
| `ci_runner_pool_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `default_branch` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `id` | `string` |  |
| `last_compatibility_status` | `mixed` |  |
| `last_error_message` | `mixed` |  |
| `last_head_sha` | `mixed` |  |
| `last_pull_request_number` | `mixed` |  |
| `last_ref` | `mixed` |  |
| `last_webhook_action` | `mixed` |  |
| `last_webhook_at` | `mixed` |  |
| `last_webhook_at_label` | `mixed` |  |
| `last_webhook_delivery_id` | `mixed` |  |
| `last_webhook_event` | `mixed` |  |
| `metadata` | `array` |  |
| `organization_id` | `string` |  |
| `permission_status` | `string` |  |
| `repository_full_name` | `string` |  |
| `repository_name` | `string` |  |
| `repository_owner` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `webhook_delivery_count` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubCiRepository record (throws on error).
$github_ci_repository = $client->GithubCiRepository()->load(["id" => "github_ci_repository_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of GithubCiRepository entities, one per record (throws on error).
$github_ci_repositorys = $client->GithubCiRepository()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$github_ci_repository = $client->GithubCiRepository()->create([
    "organization_id" => null, // string
    "github_app_installation_id" => null, // string
    "github_repository_id" => null, // string
    "repository_name" => null, // string
    "repository_owner" => null, // string
]);
```


### GithubCiRepositoryCompatibilityReport

Create an instance: `$github_ci_repository_compatibility_report = $client->GithubCiRepositoryCompatibilityReport();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `string` |  |
| `analyzed_at_label` | `mixed` |  |
| `ci_pipeline_id` | `mixed` |  |
| `ci_pipeline_run_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `diagnostics` | `array` |  |
| `errors` | `array` |  |
| `event_action` | `mixed` |  |
| `event_name` | `string` |  |
| `execution_allowed` | `bool` |  |
| `github_ci_repository_id` | `string` |  |
| `head_sha` | `mixed` |  |
| `id` | `string` |  |
| `metadata` | `array` |  |
| `organization_id` | `string` |  |
| `parser_version` | `string` |  |
| `pull_request_number` | `mixed` |  |
| `ref_name` | `mixed` |  |
| `referenced_actions` | `array` |  |
| `required_secrets` | `array` |  |
| `runner_labels` | `array` |  |
| `source_blob_sha` | `mixed` |  |
| `source_sha` | `string` |  |
| `status` | `string` |  |
| `supported_features` | `array` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `warnings` | `array` |  |
| `workflow_name` | `mixed` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubCiRepositoryCompatibilityReport record (throws on error).
$github_ci_repository_compatibility_report = $client->GithubCiRepositoryCompatibilityReport()->load(["id" => "github_ci_repository_compatibility_report_id", "github_ci_repository_id" => "github_ci_repository_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of GithubCiRepositoryCompatibilityReport entities, one per record (throws on error).
$github_ci_repository_compatibility_reports = $client->GithubCiRepositoryCompatibilityReport()->list(["github_ci_repository_id" => "example", "organization_id" => "example"]);
```


### GithubConnection

Create an instance: `$github_connection = $client->GithubConnection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `array` |  |
| `github_app_installation_id` | `string` |  |
| `installations` | `array` |  |
| `project_id` | `string` | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `array` |  |

#### Example: List

```php
// list() returns an array of GithubConnection entities, one per record (throws on error).
$github_connections = $client->GithubConnection()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$github_connection = $client->GithubConnection()->create([
    "organization_id" => null, // string
    "github_app_installation_id" => null, // string
    "repositories" => null, // array
]);
```


### GithubIntegration

Create an instance: `$github_integration = $client->GithubIntegration();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `mixed` |  |
| `account_login` | `string` |  |
| `connection_status` | `string` |  |
| `connection_status_label` | `string` |  |
| `github_installation` | `mixed` |  |
| `health` | `array` |  |
| `id` | `string` |  |
| `imported_repositories_count` | `int` |  |
| `imported_repositories_count_label` | `string` |  |
| `organization` | `array` |  |
| `pagination` | `array` |  |
| `repositories` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubIntegration record (throws on error).
$github_integration = $client->GithubIntegration()->load(["id" => "github_integration_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of GithubIntegration entities, one per record (throws on error).
$github_integrations = $client->GithubIntegration()->list(["organization_id" => "example"]);
```


### GithubOnboarding

Create an instance: `$github_onboarding = $client->GithubOnboarding();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `array` |  |
| `active_batch_id` | `mixed` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` | `array` |  |
| `capabilities` | `array` |  |
| `installations` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubOnboarding record (throws on error).
$github_onboarding = $client->GithubOnboarding()->load(["organization_id" => "organization_id"]);
```


### GithubOnboardingBranch

Create an instance: `$github_onboarding_branch = $client->GithubOnboardingBranch();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `array` |  |

#### Example: List

```php
// list() returns an array of GithubOnboardingBranch entities, one per record (throws on error).
$github_onboarding_branchs = $client->GithubOnboardingBranch()->list(["organization_id" => "example", "github_app_installation_id" => "example", "name" => "example", "owner" => "example"]);
```


### GithubOnboardingImport

Create an instance: `$github_onboarding_import = $client->GithubOnboardingImport();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `complete` | `bool` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `string` |  |
| `failed_item_count` | `int` |  |
| `github_app_installation_id` | `string` |  |
| `id` | `string` |  |
| `imported_item_count` | `int` |  |
| `item_count` | `int` |  |
| `items` | `array` |  |
| `repositories` | `mixed` |  |
| `status` | `string` |  |
| `terminal_item_count` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Create

```php
$github_onboarding_import = $client->GithubOnboardingImport()->create([
    "organization_id" => null, // string
    "github_app_installation_id" => null, // string
    "repositories" => null, // mixed
]);
```


### GithubOnboardingImportBatch

Create an instance: `$github_onboarding_import_batch = $client->GithubOnboardingImportBatch();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `complete` | `bool` | Whether every item has settled and the wizard should treat the import as finished. |
| `created_at` | `string` |  |
| `failed_item_count` | `int` |  |
| `github_app_installation_id` | `string` |  |
| `id` | `string` |  |
| `imported_item_count` | `int` |  |
| `item_count` | `int` |  |
| `items` | `array` |  |
| `status` | `string` |  |
| `terminal_item_count` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubOnboardingImportBatch record (throws on error).
$github_onboarding_import_batch = $client->GithubOnboardingImportBatch()->load(["id" => "github_onboarding_import_batch_id", "organization_id" => "organization_id"]);
```


### GithubOnboardingImportItem

Create an instance: `$github_onboarding_import_item = $client->GithubOnboardingImportItem();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GithubPullRequest

Create an instance: `$github_pull_request = $client->GithubPullRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `array` |  |
| `content` | `array` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `mixed` |  |
| `pull_request` | `mixed` |  |
| `stack` | `array` |  |
| `transcript_paths` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubPullRequest record (throws on error).
$github_pull_request = $client->GithubPullRequest()->load(["id" => "github_pull_request_id", "organization_id" => "organization_id", "pull_request_id" => "pull_request_id"]);
```


### GithubRunnerAdmission

Create an instance: `$github_runner_admission = $client->GithubRunnerAdmission();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$github_runner_admission = $client->GithubRunnerAdmission()->create([
]);
```


### GithubRunnerCache

Create an instance: `$github_runner_cache = $client->GithubRunnerCache();`

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
| `ok` | `bool` |  |
| `operation` | `string` |  |
| `restore_keys` | `array` |  |
| `signed_download_url` | `string` |  |
| `size_bytes` | `string` |  |
| `upload_path` | `string` |  |
| `version` | `string` |  |

#### Example: Create

```php
$github_runner_cache = $client->GithubRunnerCache()->create([
    "operation" => null, // string
]);
```


### GithubRunnerEgress

Create an instance: `$github_runner_egress = $client->GithubRunnerEgress();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_request` | `bool` |  |
| `cidr` | `mixed` |  |
| `ipv4` | `mixed` |  |
| `requested_at_label` | `mixed` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubRunnerEgress record (throws on error).
$github_runner_egress = $client->GithubRunnerEgress()->load(["organization_id" => "organization_id"]);
```

#### Example: Create

```php
$github_runner_egress = $client->GithubRunnerEgress()->create([
    "organization_id" => null, // string
]);
```


### GithubRunnerHistory

Create an instance: `$github_runner_history = $client->GithubRunnerHistory();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `array` |  |
| `counts` | `array` |  |
| `observed_at` | `string` |  |
| `pagination` | `array` |  |
| `repositories` | `array` |  |
| `runs` | `array` |  |
| `setup` | `mixed` | CI onboarding. |
| `success_rate` | `mixed` |  |
| `usage` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubRunnerHistory record (throws on error).
$github_runner_history = $client->GithubRunnerHistory()->load(["organization_id" => "organization_id"]);
```


### GithubRunnerImage

Create an instance: `$github_runner_image = $client->GithubRunnerImage();`

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
| `last_error` | `mixed` |  |
| `modal_image_id` | `mixed` |  |
| `name` | `string` |  |
| `registry_secret_name` | `mixed` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubRunnerImage record (throws on error).
$github_runner_image = $client->GithubRunnerImage()->load(["id" => "github_runner_image_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of GithubRunnerImage entities, one per record (throws on error).
$github_runner_images = $client->GithubRunnerImage()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$github_runner_image = $client->GithubRunnerImage()->create([
    "organization_id" => null, // string
    "image_reference" => null, // string
    "name" => null, // string
]);
```


### GithubRunnerPool

Create an instance: `$github_runner_pool = $client->GithubRunnerPool();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_millicores` | `int` |  |
| `enabled` | `bool` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `github_runner_image` | `mixed` |  |
| `id` | `string` |  |
| `image` | `mixed` | Organization image name or ID; null restores the standard image |
| `invocations` | `array` |  |
| `label` | `string` |  |
| `last_error` | `mixed` |  |
| `last_polled_at` | `mixed` |  |
| `max_concurrency` | `int` |  |
| `memory_mb` | `int` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `repository_full_name` | `string` |  |
| `runtime_kind` | `string` |  |
| `timeout_seconds` | `int` |  |

#### Example: List

```php
// list() returns an array of GithubRunnerPool entities, one per record (throws on error).
$github_runner_pools = $client->GithubRunnerPool()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$github_runner_pool = $client->GithubRunnerPool()->create([
    "organization_id" => null, // string
    "github_app_installation_id" => null, // string
    "repository_full_name" => null, // string
]);
```


### GithubRunnerSetup

Create an instance: `$github_runner_setup = $client->GithubRunnerSetup();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `mixed` |  |
| `github_repository_connection_id` | `string` |  |
| `id` | `string` |  |
| `pull_request_url` | `mixed` |  |
| `repository_full_name` | `string` |  |
| `roder_thread_id` | `mixed` |  |
| `runner_labels` | `array` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `summary` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GithubRunnerSetup record (throws on error).
$github_runner_setup = $client->GithubRunnerSetup()->load(["id" => "github_runner_setup_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$github_runner_setup = $client->GithubRunnerSetup()->create([
    "organization_id" => null, // string
    "github_repository_connection_id" => null, // string
]);
```


### Gitlab

Create an instance: `$gitlab = $client->Gitlab();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `bool` |  |
| `connections` | `array` |  |
| `integrations` | `array` |  |
| `inventory_error` | `mixed` |  |
| `next_page` | `mixed` |  |
| `organization` | `array` |  |
| `projects` | `array` |  |
| `redirect_uri` | `mixed` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Gitlab record (throws on error).
$gitlab = $client->Gitlab()->load(["organization_id" => "organization_id"]);
```


### GitlabConnection

Create an instance: `$gitlab_connection = $client->GitlabConnection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GitlabImport

Create an instance: `$gitlab_import = $client->GitlabImport();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `integration_id` | `string` |  |
| `project_id` | `int` |  |
| `repo_slug` | `string` |  |
| `source_branch` | `string` |  |

#### Example: Create

```php
$gitlab_import = $client->GitlabImport()->create([
    "organization_id" => null, // string
    "integration_id" => null, // string
    "project_id" => null, // int
]);
```


### GitlabOauth

Create an instance: `$gitlab_oauth = $client->GitlabOauth();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### GrantAllAgent

Create an instance: `$grant_all_agent = $client->GrantAllAgent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `all_agents_access` | `bool` |  |
| `enabled` | `bool` |  |
| `execution_available` | `bool` |  |

#### Example: Create

```php
$grant_all_agent = $client->GrantAllAgent()->create([
    "device_id" => null, // string
    "organization_id" => null, // string
    "enabled" => null, // bool
]);
```


### HostingAppDomain

Create an instance: `$hosting_app_domain = $client->HostingAppDomain();`

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
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `certificate` | `mixed` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `mixed` |  |
| `hosted_app_id` | `string` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `mixed` |  |
| `path_rules` | `array` |  |
| `record_name` | `mixed` |  |
| `record_type` | `mixed` |  |
| `record_value` | `mixed` |  |
| `redirect_to` | `mixed` |  |
| `static_site_id` | `mixed` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_record` | `mixed` |  |
| `verification_status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HostingAppDomain record (throws on error).
$hosting_app_domain = $client->HostingAppDomain()->load(["id" => "hosting_app_domain_id", "app_id" => "app_id"]);
```

#### Example: List

```php
// list() returns an array of HostingAppDomain entities, one per record (throws on error).
$hosting_app_domains = $client->HostingAppDomain()->list(["app_id" => "example"]);
```

#### Example: Create

```php
$hosting_app_domain = $client->HostingAppDomain()->create([
    "app_id" => null, // string
    "app_service_id" => null, // mixed
    "hostname" => null, // string
    "kind" => null, // string
]);
```


### IdentityOrganization

Create an instance: `$identity_organization = $client->IdentityOrganization();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### ImageRepository

Create an instance: `$image_repository = $client->ImageRepository();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_configured` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider_kind` | `string` |  |
| `registry_auth_token` | `string` |  |
| `repository_path` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `visibility` | `string` |  |

#### Example: List

```php
// list() returns an array of ImageRepository entities, one per record (throws on error).
$image_repositorys = $client->ImageRepository()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$image_repository = $client->ImageRepository()->create([
    "organization_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### ImageRepositoryTag

Create an instance: `$image_repository_tag = $client->ImageRepositoryTag();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image_repository` | `array` |  |
| `name` | `string` |  |
| `registry_url` | `string` |  |
| `tags` | `array` |  |

#### Example: List

```php
// list() returns an array of ImageRepositoryTag entities, one per record (throws on error).
$image_repository_tags = $client->ImageRepositoryTag()->list(["image_repository_id" => "example"]);
```


### ImportBranchPolicy

Create an instance: `$import_branch_policy = $client->ImportBranchPolicy();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `array` |  |
| `sandbox_regions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ImportBranchPolicy record (throws on error).
$import_branch_policy = $client->ImportBranchPolicy()->load(["organization_id" => "organization_id"]);
```


### Integration

Create an instance: `$integration = $client->Integration();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `array` |  |
| `gitlab` | `array` |  |
| `permissions` | `array` |  |
| `slack` | `array` |  |

#### Example: List

```php
// list() returns an array of Integration entities, one per record (throws on error).
$integrations = $client->Integration()->list(["organization_id" => "example"]);
```


### InteractionResponse

Create an instance: `$interaction_response = $client->InteractionResponse();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `array` |  |
| `conversation_id` | `string` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` |  |

#### Example: Create

```php
$interaction_response = $client->InteractionResponse()->create([
    "agent_id" => null, // string
    "interaction_id" => null, // string
    "organization_id" => null, // string
    "answer" => null, // array
    "conversation_id" => null, // string
    "expected_revision" => null, // int
]);
```


### Invitation

Create an instance: `$invitation = $client->Invitation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `mixed` |  |
| `accepted_by_user` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `id` | `string` |  |
| `invite_url` | `mixed` |  |
| `invited_by_user` | `mixed` |  |
| `organization` | `array` |  |
| `revoked_at` | `mixed` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of Invitation entities, one per record (throws on error).
$invitations = $client->Invitation()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$invitation = $client->Invitation()->create([
    "organization_id" => null, // string
    "email" => null, // string
    "role" => null, // string
]);
```


### InvocationControl

Create an instance: `$invocation_control = $client->InvocationControl();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### JobLogChunk

Create an instance: `$job_log_chunk = $client->JobLogChunk();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `int` |  |
| `ci_job_id` | `mixed` |  |
| `ci_pipeline_run_id` | `mixed` |  |
| `ci_step_id` | `mixed` |  |
| `content` | `string` |  |
| `content_format` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `sequence_number` | `int` |  |
| `stream` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```php
// list() returns an array of JobLogChunk entities, one per record (throws on error).
$job_log_chunks = $client->JobLogChunk()->list(["job_id" => "example", "pipeline_id" => "example", "run_id" => "example"]);
```

#### Example: Create

```php
$job_log_chunk = $client->JobLogChunk()->create([
    "job_id" => null, // string
    "pipeline_id" => null, // string
    "run_id" => null, // string
]);
```


### JobStep

Create an instance: `$job_step = $client->JobStep();`

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

```php
// list() returns an array of JobStep entities, one per record (throws on error).
$job_steps = $client->JobStep()->list(["job_id" => "example", "pipeline_id" => "example", "run_id" => "example"]);
```

#### Example: Create

```php
$job_step = $client->JobStep()->create([
    "job_id" => null, // string
    "pipeline_id" => null, // string
    "run_id" => null, // string
]);
```


### JobWorkspace

Create an instance: `$job_workspace = $client->JobWorkspace();`

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

```php
// list() returns an array of JobWorkspace entities, one per record (throws on error).
$job_workspaces = $client->JobWorkspace()->list(["job_id" => "example", "pipeline_id" => "example", "run_id" => "example"]);
```

#### Example: Create

```php
$job_workspace = $client->JobWorkspace()->create([
    "job_id" => null, // string
    "pipeline_id" => null, // string
    "run_id" => null, // string
]);
```


### JourneyVariantReplay

Create an instance: `$journey_variant_replay = $client->JourneyVariantReplay();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `mixed` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `string` |  |
| `failure_code` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `preparation_receipt` | `mixed` |  |
| `qualification` | `mixed` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `string` |  |
| `run_id` | `mixed` |  |
| `scenario_file` | `array` |  |
| `scenario_run_id` | `mixed` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Create

```php
$journey_variant_replay = $client->JourneyVariantReplay()->create([
    "journey_variant_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
    "idempotency_key" => null, // string
    "review_reason" => null, // string
    "scenario_file" => null, // array
]);
```


### Knowledge

Create an instance: `$knowledge = $client->Knowledge();`

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
| `content_json` | `array` |  |
| `document` | `array` |  |
| `documents` | `array` |  |
| `dreaming` | `array` |  |
| `expected_digest` | `string` |  |
| `history` | `array` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `markdown` | `string` |  |
| `observed_at` | `string` |  |
| `organization` | `array` |  |
| `permissions` | `array` |  |
| `project_id` | `string` |  |
| `project_name` | `string` |  |
| `projects` | `array` |  |
| `selected_project_id` | `mixed` |  |
| `source` | `array` |  |
| `title` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Knowledge record (throws on error).
$knowledge = $client->Knowledge()->load(["id" => "knowledge_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$knowledge = $client->Knowledge()->create([
    "organization_id" => null, // string
    "markdown" => null, // string
    "project_id" => null, // string
    "title" => null, // string
]);
```


### Known

Create an instance: `$known = $client->Known();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### Label

Create an instance: `$label = $client->Label();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes_count` | `int` |  |
| `id` | `string` |  |
| `name` | `string` | Display name |
| `slug` | `string` | Normalized identity used for filtering and lookup. |

#### Example: List

```php
// list() returns an array of Label entities, one per record (throws on error).
$labels = $client->Label()->list(["organization_id" => "example"]);
```


### LeaseArtifact

Create an instance: `$lease_artifact = $client->LeaseArtifact();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$lease_artifact = $client->LeaseArtifact()->create([
    "lease_id" => null, // string
    "node_id" => null, // string
]);
```


### LeaseCache

Create an instance: `$lease_cache = $client->LeaseCache();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### LeaseLogChunk

Create an instance: `$lease_log_chunk = $client->LeaseLogChunk();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$lease_log_chunk = $client->LeaseLogChunk()->create([
    "lease_id" => null, // string
    "node_id" => null, // string
]);
```


### LeaseReconciliation

Create an instance: `$lease_reconciliation = $client->LeaseReconciliation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseStep

Create an instance: `$lease_step = $client->LeaseStep();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseVerifyDiagnostic

Create an instance: `$lease_verify_diagnostic = $client->LeaseVerifyDiagnostic();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_events` | `array` |  |
| `live_browser` | `array` |  |
| `live_view` | `array` | The tester's read-only live stream for page viewers. |
| `steps` | `array` |  |

#### Example: Create

```php
$lease_verify_diagnostic = $client->LeaseVerifyDiagnostic()->create([
    "lease_id" => null, // string
    "swarm_id" => null, // string
    "task_id" => null, // string
    "browser_events" => null, // array
    "live_browser" => null, // array
    "live_view" => null, // array
]);
```


### LeaseVerifySecret

Create an instance: `$lease_verify_secret = $client->LeaseVerifySecret();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$lease_verify_secret = $client->LeaseVerifySecret()->create([
    "lease_id" => null, // string
    "swarm_id" => null, // string
    "task_id" => null, // string
]);
```


### LeaseWorkspace

Create an instance: `$lease_workspace = $client->LeaseWorkspace();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LocalAgentDecision

Create an instance: `$local_agent_decision = $client->LocalAgentDecision();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request` | `array` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

#### Example: Create

```php
$local_agent_decision = $client->LocalAgentDecision()->create([
    "organization_id" => null, // string
    "request" => null, // array
]);
```


### LocalAgentResponse

Create an instance: `$local_agent_response = $client->LocalAgentResponse();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `array` |  |
| `model` | `string` |  |
| `service_tier` | `mixed` |  |
| `store` | `bool` |  |
| `stream` | `bool` |  |
| `tools` | `array` |  |

#### Example: Create

```php
$local_agent_response = $client->LocalAgentResponse()->create([
    "organization_id" => null, // string
    "input" => null, // array
    "model" => null, // string
    "store" => null, // bool
    "stream" => null, // bool
]);
```


### LocalThreadDelivery

Create an instance: `$local_thread_delivery = $client->LocalThreadDelivery();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `string` |  |
| `decision_pending` | `bool` |  |
| `delivery` | `array` |  |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `policy` | `array` |  |
| `recovery_message` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LocalThreadDelivery record (throws on error).
$local_thread_delivery = $client->LocalThreadDelivery()->load(["id" => "local_thread_delivery_id", "agent_id" => "agent_id", "local_thread_id" => "local_thread_id", "organization_id" => "organization_id"]);
```


### LocalThreadOperation

Create an instance: `$local_thread_operation = $client->LocalThreadOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `array` |  |
| `created_at` | `string` |  |
| `delivery` | `array` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `array` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `array` |  |
| `result` | `mixed` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LocalThreadOperation record (throws on error).
$local_thread_operation = $client->LocalThreadOperation()->load(["id" => "local_thread_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$local_thread_operation = $client->LocalThreadOperation()->create([
    "agent_id" => null, // string
    "local_thread_id" => null, // string
    "organization_id" => null, // string
    "action" => null, // string
    "arguments" => null, // array
    "key" => null, // string
]);
```


### Location

Create an instance: `$location = $client->Location();`

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

```php
// list() returns an array of Location entities, one per record (throws on error).
$locations = $client->Location()->list();
```


### LogStreamChunk

Create an instance: `$log_stream_chunk = $client->LogStreamChunk();`

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

```php
// load() returns the ENTITY — call data_get() for the LogStreamChunk record (throws on error).
$log_stream_chunk = $client->LogStreamChunk()->load(["id" => "log_stream_chunk_id", "log_stream_id" => "log_stream_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of LogStreamChunk entities, one per record (throws on error).
$log_stream_chunks = $client->LogStreamChunk()->list(["log_stream_id" => "example", "space_id" => "example"]);
```

#### Example: Create

```php
$log_stream_chunk = $client->LogStreamChunk()->create([
    "log_stream_id" => null, // string
    "space_id" => null, // string
]);
```


### LogoImage

Create an instance: `$logo_image = $client->LogoImage();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `array` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `logo_url` | `mixed` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `mixed` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |


### MarketingSetting

Create an instance: `$marketing_setting = $client->MarketingSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `call_first` | `bool` |  |

#### Example: List

```php
// list() returns an array of MarketingSetting entities, one per record (throws on error).
$marketing_settings = $client->MarketingSetting()->list();
```


### McpOauth

Create an instance: `$mcp_oauth = $client->McpOauth();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### Me

Create an instance: `$me = $client->Me();`

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
| `active_organization` | `mixed` |  |
| `analytics_distinct_id` | `string` |  |
| `analytics_internal` | `bool` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` |  |
| `api_token` | `string` |  |
| `app_promotion` | `array` |  |
| `commit_author_email` | `string` |  |
| `email` | `string` |  |
| `enabled_features` | `array` |  |
| `github_pr_user_authorization_connected` | `bool` |  |
| `github_pr_user_authorization_login` | `mixed` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `impersonation` | `mixed` |  |
| `name` | `mixed` |  |
| `next_path` | `string` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `array` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` |  |
| `openai_sign_in_enabled` | `bool` |  |
| `organizations` | `array` |  |
| `pending_organization_invitation_count` | `int` |  |
| `pending_organization_invitation_count_label` | `string` |  |
| `picture_url` | `mixed` |  |
| `superadmin` | `bool` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `mixed` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Me record (throws on error).
$me = $client->Me()->load(["id" => "me_id"]);
```


### MeEmail

Create an instance: `$me_email = $client->MeEmail();`

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
| `account` | `bool` |  |
| `can_delete` | `bool` |  |
| `can_resend_verification` | `bool` |  |
| `can_set_account` | `bool` |  |
| `can_set_commit_author` | `bool` |  |
| `commit_author` | `bool` |  |
| `email` | `string` |  |
| `emails` | `array` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `verification_status` | `string` |  |
| `verified` | `bool` |  |

#### Example: List

```php
// list() returns an array of MeEmail entities, one per record (throws on error).
$me_emails = $client->MeEmail()->list();
```

#### Example: Create

```php
$me_email = $client->MeEmail()->create([
    "email" => null, // string
]);
```


### MeOnboarding

Create an instance: `$me_onboarding = $client->MeOnboarding();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### MediaFile

Create an instance: `$media_file = $client->MediaFile();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MediaFile record (throws on error).
$media_file = $client->MediaFile()->load(["id" => "media_file_id", "browser_session_id" => "browser_session_id", "media_id" => "media_id", "organization_id" => "organization_id"]);
```


### Member

Create an instance: `$member = $client->Member();`

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
| `accepted_at` | `mixed` |  |
| `accepted_by_user` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `id` | `string` |  |
| `invite_url` | `mixed` |  |
| `invited_by_user` | `mixed` |  |
| `is_self` | `bool` |  |
| `organization` | `array` |  |
| `revoked_at` | `mixed` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `user` | `array` |  |

#### Example: List

```php
// list() returns an array of Member entities, one per record (throws on error).
$members = $client->Member()->list(["organization_id" => "example"]);
```


### Memory

Create an instance: `$memory = $client->Memory();`

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
| `history` | `array` |  |
| `id` | `string` |  |
| `indexed_at` | `mixed` |  |
| `memory` | `array` |  |
| `project_id` | `string` |  |
| `response` | `string` |  |
| `scope` | `array` |  |
| `source` | `array` |  |
| `tags` | `array` |  |
| `title` | `string` |  |
| `workaround` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Memory record (throws on error).
$memory = $client->Memory()->load(["id" => "memory_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Memory entities, one per record (throws on error).
$memorys = $client->Memory()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$memory = $client->Memory()->create([
    "organization_id" => null, // string
    "finding" => null, // string
    "title" => null, // string
]);
```


### MergeQueueEntry

Create an instance: `$merge_queue_entry = $client->MergeQueueEntry();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `array` | Queue performance for the reporting window. |
| `change_id` | `mixed` |  |
| `expected_target_commit_id` | `mixed` |  |
| `expected_target_version` | `mixed` |  |
| `expected_version` | `int` |  |
| `github_pr_number` | `mixed` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `kind` | `string` |  |
| `policy` | `array` |  |
| `priority` | `string` |  |
| `queue` | `array` |  |
| `target_branches` | `array` | Bookmark names for the target picker. |
| `when_ready` | `mixed` |  |

#### Example: Create

```php
$merge_queue_entry = $client->MergeQueueEntry()->create([
    "merge_queue_id" => null, // string
    "organization_id" => null, // string
    "repo_id" => null, // string
    "expected_version" => null, // int
    "idempotency_key" => null, // string
    "kind" => null, // string
]);
```


### MergeRequest

Create an instance: `$merge_request = $client->MergeRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `array` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` |  |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `mixed` |  |
| `current_run` | `mixed` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` |  |
| `findings` | `array` |  |
| `github_repository` | `mixed` | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `number` | `int` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `mixed` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `mixed` |  |
| `project_id` | `mixed` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `mixed` |  |
| `provider` | `string` |  |
| `pull_request` | `array` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `requested_run_id` | `mixed` |  |
| `runs` | `array` |  |
| `source_branch` | `mixed` |  |
| `source_repository` | `mixed` |  |
| `source_url` | `mixed` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MergeRequest record (throws on error).
$merge_request = $client->MergeRequest()->load(["id" => "merge_request_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$merge_request = $client->MergeRequest()->create([
    "organization_id" => null, // string
    "idempotency_key" => null, // string
    "number" => null, // int
]);
```


### MergeResolution

Create an instance: `$merge_resolution = $client->MergeResolution();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `base` | `string` | Common ancestor file contents |
| `content` | `mixed` |  |
| `context` | `array` | Optional surrounding files keyed by path |
| `duration_ms` | `int` |  |
| `fallback` | `bool` |  |
| `model` | `string` |  |
| `ours` | `string` | Current / left file contents |
| `path` | `string` | Repository-relative path of the conflicted file |
| `resolved` | `bool` |  |
| `theirs` | `string` | Incoming / right file contents |

#### Example: Create

```php
$merge_resolution = $client->MergeResolution()->create([
    "base" => null, // string
    "ours" => null, // string
    "theirs" => null, // string
]);
```


### MessagingConversationMessage

Create an instance: `$messaging_conversation_message = $client->MessagingConversationMessage();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `client_operation_id` | `string` |  |
| `content` | `string` |  |
| `id` | `string` |  |
| `media` | `array` |  |
| `media_upload_ids` | `array` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `array` |  |
| `reply_to` | `string` | Public ID of a visible message |
| `retry_attachment` | `bool` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `mixed` |  |
| `send_disposition` | `string` |  |
| `send_error` | `mixed` |  |
| `send_style` | `mixed` |  |

#### Example: Create

```php
$messaging_conversation_message = $client->MessagingConversationMessage()->create([
    "messaging_conversation_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
    "client_operation_id" => null, // string
    "content" => null, // string
    "media" => null, // array
]);
```


### MessagingConversationUpload

Create an instance: `$messaging_conversation_upload = $client->MessagingConversationUpload();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `array` |  |
| `upload_id` | `string` |  |

#### Example: Create

```php
$messaging_conversation_upload = $client->MessagingConversationUpload()->create([
    "messaging_conversation_id" => null, // string
    "organization_id" => null, // string
    "project_id" => null, // string
]);
```


### MetricQuery

Create an instance: `$metric_query = $client->MetricQuery();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of MetricQuery entities, one per record (throws on error).
$metric_querys = $client->MetricQuery()->list();
```


### MetronomeWebhook

Create an instance: `$metronome_webhook = $client->MetronomeWebhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$metronome_webhook = $client->MetronomeWebhook()->create([
]);
```


### ModelSubscriptionAccount

Create an instance: `$model_subscription_account = $client->ModelSubscriptionAccount();`

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
| `accounts` | `array` |  |
| `agents` | `array` |  |
| `can_disconnect` | `bool` |  |
| `connection_agent` | `mixed` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `provider` | `string` |  |
| `saved` | `bool` |  |
| `status` | `string` |  |
| `usable` | `bool` |  |

#### Example: List

```php
// list() returns an array of ModelSubscriptionAccount entities, one per record (throws on error).
$model_subscription_accounts = $client->ModelSubscriptionAccount()->list();
```

#### Example: Create

```php
$model_subscription_account = $client->ModelSubscriptionAccount()->create([
    "label" => null, // string
]);
```


### ModelSubscriptionAccountConnection

Create an instance: `$model_subscription_account_connection = $client->ModelSubscriptionAccountConnection();`

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

```php
// load() returns the ENTITY — call data_get() for the ModelSubscriptionAccountConnection record (throws on error).
$model_subscription_account_connection = $client->ModelSubscriptionAccountConnection()->load(["id" => "model_subscription_account_connection_id"]);
```


### NetworkConnection

Create an instance: `$network_connection = $client->NetworkConnection();`

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

```php
$network_connection = $client->NetworkConnection()->create([
    "organization_id" => null, // string
    "name" => null, // string
]);
```


### NetworkingSpace

Create an instance: `$networking_space = $client->NetworkingSpace();`

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

```php
// load() returns the ENTITY — call data_get() for the NetworkingSpace record (throws on error).
$networking_space = $client->NetworkingSpace()->load(["id" => "networking_space_id"]);
```

#### Example: List

```php
// list() returns an array of NetworkingSpace entities, one per record (throws on error).
$networking_spaces = $client->NetworkingSpace()->list();
```

#### Example: Create

```php
$networking_space = $client->NetworkingSpace()->create([
]);
```


### Node

Create an instance: `$node = $client->Node();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `mixed` |  |
| `account_id` | `mixed` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `mixed` |  |
| `installed_at_label` | `mixed` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `array` |  |
| `status` | `string` |  |
| `suspended_at` | `mixed` |  |
| `suspended_at_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of Node entities, one per record (throws on error).
$nodes = $client->Node()->list(["organization_id" => "example"]);
```


### NodeCertificate

Create an instance: `$node_certificate = $client->NodeCertificate();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### NodeLease

Create an instance: `$node_lease = $client->NodeLease();`

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

```php
// list() returns an array of NodeLease entities, one per record (throws on error).
$node_leases = $client->NodeLease()->list(["node_id" => "example"]);
```


### NomadAllocation

Create an instance: `$nomad_allocation = $client->NomadAllocation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `client_status` | `mixed` |  |
| `create_time` | `mixed` |  |
| `datacenter` | `mixed` |  |
| `desired_description` | `mixed` |  |
| `desired_status` | `mixed` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `job_id` | `mixed` |  |
| `modify_time` | `mixed` |  |
| `name` | `mixed` |  |
| `namespace` | `string` |  |
| `node_id` | `mixed` |  |
| `node_name` | `mixed` |  |
| `resources` | `array` |  |
| `task_group` | `mixed` |  |
| `task_states` | `array` |  |
| `verify_runner_images` | `array` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the NomadAllocation record (throws on error).
$nomad_allocation = $client->NomadAllocation()->load(["id" => "nomad_allocation_id", "app_id" => "app_id"]);
```


### NomadLog

Create an instance: `$nomad_log = $client->NomadLog();`

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
| `location` | `mixed` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `int` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of NomadLog entities, one per record (throws on error).
$nomad_logs = $client->NomadLog()->list(["app_id" => "example"]);
```


### Now

Create an instance: `$now = $client->Now();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `needs_attention` | `array` |  |
| `pagination` | `array` |  |
| `recently_landed` | `array` |  |
| `shipping_now` | `array` |  |
| `summary` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Now record (throws on error).
$now = $client->Now()->load(["organization_id" => "organization_id"]);
```


### ObservabilityClickhouseCluster

Create an instance: `$observability_clickhouse_cluster = $client->ObservabilityClickhouseCluster();`

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

```php
// load() returns the ENTITY — call data_get() for the ObservabilityClickhouseCluster record (throws on error).
$observability_clickhouse_cluster = $client->ObservabilityClickhouseCluster()->load(["id" => "observability_clickhouse_cluster_id"]);
```

#### Example: List

```php
// list() returns an array of ObservabilityClickhouseCluster entities, one per record (throws on error).
$observability_clickhouse_clusters = $client->ObservabilityClickhouseCluster()->list();
```

#### Example: Create

```php
$observability_clickhouse_cluster = $client->ObservabilityClickhouseCluster()->create([
]);
```


### ObservabilityQuickwitCluster

Create an instance: `$observability_quickwit_cluster = $client->ObservabilityQuickwitCluster();`

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

```php
// load() returns the ENTITY — call data_get() for the ObservabilityQuickwitCluster record (throws on error).
$observability_quickwit_cluster = $client->ObservabilityQuickwitCluster()->load(["id" => "observability_quickwit_cluster_id"]);
```

#### Example: List

```php
// list() returns an array of ObservabilityQuickwitCluster entities, one per record (throws on error).
$observability_quickwit_clusters = $client->ObservabilityQuickwitCluster()->list();
```

#### Example: Create

```php
$observability_quickwit_cluster = $client->ObservabilityQuickwitCluster()->create([
]);
```


### ObservabilitySpace

Create an instance: `$observability_space = $client->ObservabilitySpace();`

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

```php
// load() returns the ENTITY — call data_get() for the ObservabilitySpace record (throws on error).
$observability_space = $client->ObservabilitySpace()->load(["id" => "observability_space_id"]);
```

#### Example: List

```php
// list() returns an array of ObservabilitySpace entities, one per record (throws on error).
$observability_spaces = $client->ObservabilitySpace()->list();
```

#### Example: Create

```php
$observability_space = $client->ObservabilitySpace()->create([
]);
```


### Openapi

Create an instance: `$openapi = $client->Openapi();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Openapi record (throws on error).
$openapi = $client->Openapi()->load();
```


### OrgInvitation

Create an instance: `$org_invitation = $client->OrgInvitation();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `array` |  |
| `registration_options` | `mixed` |  |
| `requires_password_setup` | `bool` |  |
| `start_guided_setup` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the OrgInvitation record (throws on error).
$org_invitation = $client->OrgInvitation()->load(["id" => "org_invitation_id"]);
```


### Organization

Create an instance: `$organization = $client->Organization();`

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
| `activated_products` | `array` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `google_workspace_domain` | `mixed` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` |  |
| `logo_url` | `mixed` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `mixed` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Organization record (throws on error).
$organization = $client->Organization()->load(["id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Organization entities, one per record (throws on error).
$organizations = $client->Organization()->list();
```

#### Example: Create

```php
$organization = $client->Organization()->create([
    "name" => null, // string
    "slug" => null, // string
]);
```


### OrganizationApp

Create an instance: `$organization_app = $client->OrganizationApp();`

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

```php
// list() returns an array of OrganizationApp entities, one per record (throws on error).
$organization_apps = $client->OrganizationApp()->list(["organization_id" => "example", "native_agent_id" => "example"]);
```


### OrganizationControl

Create an instance: `$organization_control = $client->OrganizationControl();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationDevice

Create an instance: `$organization_device = $client->OrganizationDevice();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### OrganizationIdentityCertificate

Create an instance: `$organization_identity_certificate = $client->OrganizationIdentityCertificate();`

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

```php
// load() returns the ENTITY — call data_get() for the OrganizationIdentityCertificate record (throws on error).
$organization_identity_certificate = $client->OrganizationIdentityCertificate()->load(["id" => "organization_identity_certificate_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationIdentityCertificate entities, one per record (throws on error).
$organization_identity_certificates = $client->OrganizationIdentityCertificate()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$organization_identity_certificate = $client->OrganizationIdentityCertificate()->create([
    "organization_id" => null, // string
]);
```


### OrganizationInteraction

Create an instance: `$organization_interaction = $client->OrganizationInteraction();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$organization_interaction = $client->OrganizationInteraction()->create([
    "organization_id" => null, // string
]);
```


### OrganizationInvitation

Create an instance: `$organization_invitation = $client->OrganizationInvitation();`

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

```php
$organization_invitation = $client->OrganizationInvitation()->create([
    "organization_id" => null, // string
    "email" => null, // string
    "role" => null, // string
]);
```


### OrganizationMessageFile

Create an instance: `$organization_message_file = $client->OrganizationMessageFile();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$organization_message_file = $client->OrganizationMessageFile()->create([
    "organization_id" => null, // string
]);
```


### OrganizationOidcTrust

Create an instance: `$organization_oidc_trust = $client->OrganizationOidcTrust();`

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

```php
// load() returns the ENTITY — call data_get() for the OrganizationOidcTrust record (throws on error).
$organization_oidc_trust = $client->OrganizationOidcTrust()->load(["id" => "organization_oidc_trust_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationOidcTrust entities, one per record (throws on error).
$organization_oidc_trusts = $client->OrganizationOidcTrust()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$organization_oidc_trust = $client->OrganizationOidcTrust()->create([
    "organization_id" => null, // string
]);
```


### OrganizationRunEvent

Create an instance: `$organization_run_event = $client->OrganizationRunEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$organization_run_event = $client->OrganizationRunEvent()->create([
    "organization_id" => null, // string
]);
```


### OrganizationRunOutcome

Create an instance: `$organization_run_outcome = $client->OrganizationRunOutcome();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$organization_run_outcome = $client->OrganizationRunOutcome()->create([
    "organization_id" => null, // string
]);
```


### OrganizationRunUsage

Create an instance: `$organization_run_usage = $client->OrganizationRunUsage();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$organization_run_usage = $client->OrganizationRunUsage()->create([
    "organization_id" => null, // string
]);
```


### OrganizationSandbox

Create an instance: `$organization_sandbox = $client->OrganizationSandbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationSecret

Create an instance: `$organization_secret = $client->OrganizationSecret();`

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
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `created_by` | `mixed` |  |
| `current_version` | `mixed` |  |
| `description` | `mixed` |  |
| `env_key` | `string` |  |
| `expose_to_build` | `bool` |  |
| `expose_to_ci` | `bool` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `last_accessed_at` | `mixed` |  |
| `last_accessed_at_label` | `mixed` |  |
| `last_accessed_by` | `mixed` |  |
| `latest_version_number` | `mixed` |  |
| `name` | `string` |  |
| `organization_id` | `mixed` |  |
| `owner_service_account_id` | `mixed` |  |
| `rotation_policy` | `mixed` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the OrganizationSecret record (throws on error).
$organization_secret = $client->OrganizationSecret()->load(["id" => "organization_secret_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationSecret entities, one per record (throws on error).
$organization_secrets = $client->OrganizationSecret()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$organization_secret = $client->OrganizationSecret()->create([
    "organization_id" => null, // string
]);
```


### OrganizationServiceAccount

Create an instance: `$organization_service_account = $client->OrganizationServiceAccount();`

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

```php
// load() returns the ENTITY — call data_get() for the OrganizationServiceAccount record (throws on error).
$organization_service_account = $client->OrganizationServiceAccount()->load(["id" => "organization_service_account_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationServiceAccount entities, one per record (throws on error).
$organization_service_accounts = $client->OrganizationServiceAccount()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$organization_service_account = $client->OrganizationServiceAccount()->create([
    "organization_id" => null, // string
]);
```


### OrganizationSetting

Create an instance: `$organization_setting = $client->OrganizationSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `concurrent_run_limit_override` | `mixed` |  |
| `customize_onboarding_packages` | `bool` |  |
| `daily_run_limit_override` | `mixed` |  |
| `deployment_usage_visibility` | `string` |  |
| `monthly_browser_minutes_limit_override` | `mixed` |  |
| `monthly_budget_dollars` | `mixed` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `bool` |  |
| `onboarding_package_keys` | `array` |  |


### OrganizationSite

Create an instance: `$organization_site = $client->OrganizationSite();`

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

```php
// list() returns an array of OrganizationSite entities, one per record (throws on error).
$organization_sites = $client->OrganizationSite()->list(["organization_id" => "example", "native_agent_id" => "example"]);
```

#### Example: Create

```php
$organization_site = $client->OrganizationSite()->create([
    "organization_id" => null, // string
]);
```


### OrganizationSubscription

Create an instance: `$organization_subscription = $client->OrganizationSubscription();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### OrganizationTool

Create an instance: `$organization_tool = $client->OrganizationTool();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `array` |  |
| `native_agent_id` | `string` |  |
| `tool` | `string` |  |

#### Example: Create

```php
$organization_tool = $client->OrganizationTool()->create([
    "organization_id" => null, // string
    "arguments" => null, // array
    "native_agent_id" => null, // string
    "tool" => null, // string
]);
```


### OrganizationWorkloadIdentity

Create an instance: `$organization_workload_identity = $client->OrganizationWorkloadIdentity();`

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

```php
// load() returns the ENTITY — call data_get() for the OrganizationWorkloadIdentity record (throws on error).
$organization_workload_identity = $client->OrganizationWorkloadIdentity()->load(["id" => "organization_workload_identity_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationWorkloadIdentity entities, one per record (throws on error).
$organization_workload_identitys = $client->OrganizationWorkloadIdentity()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$organization_workload_identity = $client->OrganizationWorkloadIdentity()->create([
    "organization_id" => null, // string
]);
```


### OtelIngest

Create an instance: `$otel_ingest = $client->OtelIngest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Page

Create an instance: `$page = $client->Page();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `array` |  |
| `checkout_required` | `bool` |  |
| `cli_signed_in_at` | `mixed` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `array` |  |
| `demo_project` | `mixed` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `array` |  |
| `included_deep_scan` | `bool` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `mixed` |  |
| `organization` | `array` |  |
| `permissions` | `array` |  |
| `project` | `mixed` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `array` |  |
| `pull_requests` | `array` |  |
| `repositories` | `array` |  |
| `runs` | `array` |  |
| `runs_pagination` | `array` |  |
| `suggested_app_url` | `mixed` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Page record (throws on error).
$page = $client->Page()->load(["organization_id" => "organization_id"]);
```


### PageAgent

Create an instance: `$page_agent = $client->PageAgent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `array` |  |
| `can_edit_integration_connections` | `bool` |  |
| `creation_enabled` | `bool` |  |
| `inbox` | `mixed` |  |
| `integration_choices` | `array` |  |
| `integration_choices_truncated` | `bool` |  |
| `integration_selected` | `array` |  |
| `model_choices` | `array` |  |
| `new_configuration` | `mixed` |  |
| `organization_id` | `string` |  |
| `pagination` | `array` |  |
| `pinned_agent` | `mixed` |  |
| `platform_event_types` | `array` |  |
| `repository_choices` | `array` | Empty compatibility field. |
| `repository_choices_truncated` | `bool` |  |
| `runtime_versions` | `array` | Runtime choices authorized for this organization. |
| `selected_agent` | `mixed` |  |
| `selected_reference` | `mixed` |  |
| `viewer_id` | `string` |  |

#### Example: List

```php
// list() returns an array of PageAgent entities, one per record (throws on error).
$page_agents = $client->PageAgent()->list(["organization_id" => "example"]);
```


### PageArtefact

Create an instance: `$page_artefact = $client->PageArtefact();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artefact` | `mixed` |  |
| `automation` | `mixed` |  |
| `automation_invocation_id` | `mixed` |  |
| `byte_size` | `int` |  |
| `checksum_sha256` | `string` |  |
| `comment_threads` | `array` |  |
| `content_type` | `string` |  |
| `created_at` | `mixed` |  |
| `created_by_user_id` | `mixed` |  |
| `description` | `mixed` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `draft` | `mixed` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` | `string` |  |
| `expires_at` | `mixed` |  |
| `filename` | `string` |  |
| `files` | `array` |  |
| `harness` | `mixed` |  |
| `harness_version` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `kinds` | `array` |  |
| `model` | `mixed` |  |
| `organization` | `array` |  |
| `organization_id` | `string` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `preview` | `array` |  |
| `published_at` | `mixed` |  |
| `published_at_label` | `mixed` |  |
| `publisher` | `mixed` |  |
| `repository` | `mixed` |  |
| `repository_id` | `mixed` |  |
| `selected_path` | `string` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `mixed` |  |
| `vcs_agent_session_id` | `mixed` |  |
| `version` | `int` |  |
| `versions` | `array` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PageArtefact record (throws on error).
$page_artefact = $client->PageArtefact()->load(["id" => "page_artefact_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of PageArtefact entities, one per record (throws on error).
$page_artefacts = $client->PageArtefact()->list(["organization_id" => "example"]);
```


### PageCiPipelineRun

Create an instance: `$page_ci_pipeline_run = $client->PageCiPipelineRun();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `mixed` |  |
| `id` | `string` |  |
| `jobs` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PageCiPipelineRun record (throws on error).
$page_ci_pipeline_run = $client->PageCiPipelineRun()->load(["id" => "page_ci_pipeline_run_id", "pipeline_id" => "pipeline_id"]);
```


### PageProjectRun

Create an instance: `$page_project_run = $client->PageProjectRun();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `array` |  |
| `fix_scenario_count` | `int` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `array` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` |  |
| `id` | `string` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `preparation_reason` | `mixed` |  |
| `project` | `array` |  |
| `run` | `array` |  |
| `scenario_runs` | `array` |  |
| `selected_scenario_run` | `mixed` |  |
| `web_path` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PageProjectRun record (throws on error).
$page_project_run = $client->PageProjectRun()->load(["id" => "page_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```


### PageRepoVcCommit

Create an instance: `$page_repo_vc_commit = $client->PageRepoVcCommit();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `mixed` |  |
| `diff_path` | `string` | Fingerprinted path serving this commit range's file diff. |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PageRepoVcCommit record (throws on error).
$page_repo_vc_commit = $client->PageRepoVcCommit()->load(["id" => "page_repo_vc_commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### PagesBilling

Create an instance: `$pages_billing = $client->PagesBilling();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `array` |  |
| `breakdown` | `mixed` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `mixed` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `mixed` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `array` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `mixed` |  |
| `prepaid` | `mixed` |  |
| `preview` | `mixed` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `array` |  |
| `stripe` | `array` |  |
| `subscription` | `mixed` |  |
| `token_account` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PagesBilling record (throws on error).
$pages_billing = $client->PagesBilling()->load(["organization_id" => "organization_id"]);
```


### PagesGithubOnboarding

Create an instance: `$pages_github_onboarding = $client->PagesGithubOnboarding();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `onboarding` | `array` |  |
| `organization` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PagesGithubOnboarding record (throws on error).
$pages_github_onboarding = $client->PagesGithubOnboarding()->load(["organization_id" => "organization_id"]);
```


### PagesMember

Create an instance: `$pages_member = $client->PagesMember();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `mixed` |  |
| `accepted_by_user` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `id` | `string` |  |
| `invite_url` | `mixed` |  |
| `invited_by_user` | `mixed` |  |
| `organization` | `array` |  |
| `revoked_at` | `mixed` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of PagesMember entities, one per record (throws on error).
$pages_members = $client->PagesMember()->list(["organization_id" => "example"]);
```


### PagesProjectCredential

Create an instance: `$pages_project_credential = $client->PagesProjectCredential();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `mixed` |  |
| `composal_address` | `mixed` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` |  |
| `credential_keys` | `array` |  |
| `description` | `mixed` |  |
| `email_link_auth_origins` | `array` |  |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `mixed` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `mixed` |  |
| `login_method` | `string` |  |
| `login_url` | `string` |  |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `mixed` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: List

```php
// list() returns an array of PagesProjectCredential entities, one per record (throws on error).
$pages_project_credentials = $client->PagesProjectCredential()->list(["organization_id" => "example", "project_id" => "example"]);
```


### PagesProjectPersona

Create an instance: `$pages_project_persona = $client->PagesProjectPersona();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_count` | `int` |  |
| `credentials` | `array` |  |
| `needs_attention_count` | `int` |  |
| `permissions` | `array` |  |
| `persona_states` | `array` | Scenarios by the state of their latest execution. |
| `personas` | `array` |  |
| `project` | `array` |  |

#### Example: List

```php
// list() returns an array of PagesProjectPersona entities, one per record (throws on error).
$pages_project_personas = $client->PagesProjectPersona()->list(["organization_id" => "example", "project_id" => "example"]);
```


### PagesProjectRun

Create an instance: `$pages_project_run = $client->PagesProjectRun();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_query` | `string` |  |
| `environments` | `array` |  |
| `environments_has_more` | `bool` |  |
| `pagination` | `array` |  |
| `runs` | `array` |  |
| `selected_environment` | `mixed` |  |

#### Example: List

```php
// list() returns an array of PagesProjectRun entities, one per record (throws on error).
$pages_project_runs = $client->PagesProjectRun()->list(["organization_id" => "example", "project_id" => "example"]);
```


### PagesProjectScenario

Create an instance: `$pages_project_scenario = $client->PagesProjectScenario();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `mixed` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of PagesProjectScenario entities, one per record (throws on error).
$pages_project_scenarios = $client->PagesProjectScenario()->list(["organization_id" => "example", "project_id" => "example"]);
```


### PagesRegistry

Create an instance: `$pages_registry = $client->PagesRegistry();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_repository_count` | `int` |  |
| `error` | `mixed` |  |
| `pagination` | `array` |  |
| `repositories` | `array` |  |
| `repository_count` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PagesRegistry record (throws on error).
$pages_registry = $client->PagesRegistry()->load(["organization_id" => "organization_id"]);
```


### PagesSession

Create an instance: `$pages_session = $client->PagesSession();`

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
| `created_at` | `mixed` |  |
| `cursor` | `string` |  |
| `ended_at` | `mixed` |  |
| `external_session_id` | `string` |  |
| `facets` | `array` |  |
| `from` | `string` |  |
| `github_access_warnings` | `array` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `mixed` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `mixed` |  |
| `limit` | `int` |  |
| `markers` | `array` |  |
| `max_bytes` | `int` |  |
| `mode` | `string` |  |
| `offset` | `int` |  |
| `pagination` | `array` |  |
| `query` | `string` |  |
| `repo` | `string` |  |
| `repository` | `mixed` |  |
| `search` | `mixed` |  |
| `search_enabled` | `bool` |  |
| `session` | `mixed` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` | `array` |  |
| `started_at` | `mixed` |  |
| `stats` | `array` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |
| `to` | `string` |  |
| `token_stats` | `mixed` |  |
| `transcript_index` | `mixed` |  |
| `transcript_stats` | `mixed` |  |
| `updated_at` | `mixed` |  |
| `user` | `mixed` |  |
| `user_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PagesSession record (throws on error).
$pages_session = $client->PagesSession()->load(["id" => "pages_session_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of PagesSession entities, one per record (throws on error).
$pages_sessions = $client->PagesSession()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$pages_session = $client->PagesSession()->create([
    "organization_id" => null, // string
]);
```


### Pairing

Create an instance: `$pairing = $client->Pairing();`

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

```php
// load() returns the ENTITY — call data_get() for the Pairing record (throws on error).
$pairing = $client->Pairing()->load(["id" => "pairing_id"]);
```

#### Example: List

```php
// list() returns an array of Pairing entities, one per record (throws on error).
$pairings = $client->Pairing()->list();
```

#### Example: Create

```php
$pairing = $client->Pairing()->create([
]);
```


### PairingEvent

Create an instance: `$pairing_event = $client->PairingEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of PairingEvent entities, one per record (throws on error).
$pairing_events = $client->PairingEvent()->list(["pairing_id" => "example"]);
```


### ParallelV1

Create an instance: `$parallel_v1 = $client->ParallelV1();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PatchsetDiff

Create an instance: `$patchset_diff = $client->PatchsetDiff();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `array` |  |
| `id` | `string` |  |
| `patchset` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PatchsetDiff record (throws on error).
$patchset_diff = $client->PatchsetDiff()->load(["id" => "patchset_diff_id", "change_id" => "change_id", "organization_id" => "organization_id", "patchset_id" => "patchset_id", "repo_id" => "repo_id"]);
```


### PersonalAccessToken

Create an instance: `$personal_access_token = $client->PersonalAccessToken();`

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

```php
// list() returns an array of PersonalAccessToken entities, one per record (throws on error).
$personal_access_tokens = $client->PersonalAccessToken()->list();
```

#### Example: Create

```php
$personal_access_token = $client->PersonalAccessToken()->create([
]);
```


### PreviewOperation

Create an instance: `$preview_operation = $client->PreviewOperation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of PreviewOperation entities, one per record (throws on error).
$preview_operations = $client->PreviewOperation()->list(["app_id" => "example", "preview_id" => "example"]);
```


### PreviewProfileSecretBinding

Create an instance: `$preview_profile_secret_binding = $client->PreviewProfileSecretBinding();`

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

```php
// list() returns an array of PreviewProfileSecretBinding entities, one per record (throws on error).
$preview_profile_secret_bindings = $client->PreviewProfileSecretBinding()->list(["app_id" => "example", "preview_profile_id" => "example"]);
```

#### Example: Create

```php
$preview_profile_secret_binding = $client->PreviewProfileSecretBinding()->create([
    "app_id" => null, // string
    "preview_profile_id" => null, // string
    "env_key" => null, // string
]);
```


### PreviewSecret

Create an instance: `$preview_secret = $client->PreviewSecret();`

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

```php
$preview_secret = $client->PreviewSecret()->create([
    "app_id" => null, // string
    "preview_id" => null, // string
    "env_key" => null, // string
    "name" => null, // string
    "slug" => null, // string
    "value" => null, // string
]);
```


### PreviewSharingApproval

Create an instance: `$preview_sharing_approval = $client->PreviewSharingApproval();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `array` |  |
| `approved_build_secrets` | `array` |  |
| `approved_default_configuration` | `array` |  |
| `approved_default_secrets` | `array` |  |
| `approved_source_keys` | `array` |  |
| `build_keys` | `array` |  |
| `build_secrets` | `array` |  |
| `default_configuration` | `array` |  |
| `default_secrets` | `array` |  |
| `services` | `array` |  |
| `snapshot_version` | `int` |  |
| `source_keys` | `array` |  |

#### Example: List

```php
// list() returns an array of PreviewSharingApproval entities, one per record (throws on error).
$preview_sharing_approvals = $client->PreviewSharingApproval()->list(["app_id" => "example", "preview_id" => "example"]);
```

#### Example: Create

```php
$preview_sharing_approval = $client->PreviewSharingApproval()->create([
    "app_id" => null, // string
    "preview_id" => null, // string
    "snapshot_version" => null, // int
]);
```


### ProactiveAgentWaitlistEntry

Create an instance: `$proactive_agent_waitlist_entry = $client->ProactiveAgentWaitlistEntry();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_task` | `mixed` | The first job they would hand an agent. |
| `invite_code` | `mixed` | The referral code of the invite link they arrived through. |
| `places_per_referral` | `int` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | `int` | 1-based place in the queue. |
| `position_after_next_referral` | `int` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | `string` | Shared in this entry's invite link. |
| `referral_count` | `int` | People who joined through this entry's link. |
| `total` | `int` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | `mixed` | Honeypot. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProactiveAgentWaitlistEntry record (throws on error).
$proactive_agent_waitlist_entry = $client->ProactiveAgentWaitlistEntry()->load(["id" => "proactive_agent_waitlist_entry_id"]);
```

#### Example: Create

```php
$proactive_agent_waitlist_entry = $client->ProactiveAgentWaitlistEntry()->create([
    "email" => null, // string
]);
```


### Product

Create an instance: `$product = $client->Product();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `array` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `logo_url` | `mixed` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `product` | `string` |  |
| `repository_count` | `int` |  |
| `role` | `mixed` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Create

```php
$product = $client->Product()->create([
    "organization_id" => null, // string
    "product" => null, // string
]);
```


### ProductMapIdentityDecision

Create an instance: `$product_map_identity_decision = $client->ProductMapIdentityDecision();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `array` |  |
| `operation` | `string` |  |
| `reason` | `string` |  |
| `target` | `array` |  |

#### Example: Create

```php
$product_map_identity_decision = $client->ProductMapIdentityDecision()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "observations" => null, // array
    "operation" => null, // string
    "reason" => null, // string
    "target" => null, // array
]);
```


### ProductMapJourney

Create an instance: `$product_map_journey = $client->ProductMapJourney();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `mixed` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `journey` | `array` |  |
| `next_cursor` | `mixed` |  |
| `preview` | `mixed` |  |
| `scope` | `array` |  |
| `title` | `string` |  |
| `tree` | `array` |  |
| `tree_loaded` | `bool` |  |
| `variant_count` | `int` |  |
| `variants` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProductMapJourney record (throws on error).
$product_map_journey = $client->ProductMapJourney()->load(["id" => "product_map_journey_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProductMapJourney entities, one per record (throws on error).
$product_map_journeys = $client->ProductMapJourney()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProductMapJourneyReplay

Create an instance: `$product_map_journey_replay = $client->ProductMapJourneyReplay();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `mixed` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `string` |  |
| `failure_code` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `id` | `string` |  |
| `preparation_receipt` | `mixed` |  |
| `qualification` | `mixed` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `string` |  |
| `run_id` | `mixed` |  |
| `scenario_run_id` | `mixed` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProductMapJourneyReplay record (throws on error).
$product_map_journey_replay = $client->ProductMapJourneyReplay()->load(["id" => "product_map_journey_replay_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```


### ProductMapObservation

Create an instance: `$product_map_observation = $client->ProductMapObservation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `array` |  |
| `events` | `array` |  |
| `evidence_id` | `string` |  |
| `id` | `string` |  |
| `observation_id` | `string` |  |
| `scope` | `array` |  |
| `state` | `mixed` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProductMapObservation record (throws on error).
$product_map_observation = $client->ProductMapObservation()->load(["id" => "product_map_observation_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```


### ProductMapQuestion

Create an instance: `$product_map_question = $client->ProductMapQuestion();`

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
| `claims` | `array` |  |
| `evidence_truncated` | `bool` |  |
| `model` | `string` |  |
| `persona_id` | `string` |  |
| `query` | `string` |  |
| `question` | `string` |  |
| `reasoning_effort` | `string` |  |
| `revision_id` | `string` |  |
| `scope` | `array` |  |
| `since` | `string` |  |
| `state_id` | `string` |  |
| `status` | `string` |  |
| `unknowns` | `array` |  |

#### Example: Create

```php
$product_map_question = $client->ProductMapQuestion()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "question" => null, // string
]);
```


### ProductMapState

Create an instance: `$product_map_state = $client->ProductMapState();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `mixed` |  |
| `attempts` | `array` |  |
| `captured_at` | `string` |  |
| `id` | `string` |  |
| `incoming` | `array` |  |
| `labels` | `array` |  |
| `layout` | `array` |  |
| `observation_id` | `string` |  |
| `omitted_controls` | `int` |  |
| `outgoing` | `array` |  |
| `revision_id` | `string` |  |
| `scope` | `array` |  |
| `screenshot_url` | `mixed` |  |
| `state` | `array` |  |
| `truncated` | `bool` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProductMapState record (throws on error).
$product_map_state = $client->ProductMapState()->load(["id" => "product_map_state_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProductMapState entities, one per record (throws on error).
$product_map_states = $client->ProductMapState()->list(["organization_id" => "example", "project_id" => "example"]);
```


### Project

Create an instance: `$project = $client->Project();`

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
| `archived_at` | `mixed` |  |
| `context` | `mixed` |  |
| `created_at` | `string` |  |
| `credentials` | `array` |  |
| `demo` | `bool` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `array` |  |
| `environments` | `array` |  |
| `execution_mode` | `string` |  |
| `icon_url` | `mixed` |  |
| `id` | `string` |  |
| `identity_provider` | `array` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `network_connections` | `array` |  |
| `organization_id` | `string` |  |
| `overview` | `array` |  |
| `permissions` | `array` |  |
| `personas` | `array` |  |
| `project` | `array` |  |
| `pull_request_options` | `array` |  |
| `pull_requests` | `array` |  |
| `purpose` | `mixed` |  |
| `runs` | `array` |  |
| `scenario_history` | `array` |  |
| `scenario_states` | `array` | Scenarios by the state of their latest execution. |
| `scenarios` | `array` |  |
| `setup_required` | `bool` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences` | `array` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` |  |
| `website_url` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Project record (throws on error).
$project = $client->Project()->load(["id" => "project_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Project entities, one per record (throws on error).
$projects = $client->Project()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$project = $client->Project()->create([
    "organization_id" => null, // string
    "name" => null, // string
]);
```


### ProjectAndroidApk

Create an instance: `$project_android_apk = $client->ProjectAndroidApk();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `array` |  |
| `artifact_paths` | `array` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `array` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `array` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```php
$project_android_apk = $client->ProjectAndroidApk()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
]);
```


### ProjectCodeMap

Create an instance: `$project_code_map = $client->ProjectCodeMap();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_scan` | `bool` |  |
| `commit_sha` | `string` |  |
| `configured` | `bool` |  |
| `error_code` | `mixed` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `ref` | `string` |  |
| `repository_id` | `string` |  |
| `revision` | `array` |  |
| `slug` | `string` |  |
| `status` | `string` |  |

#### Example: List

```php
// list() returns an array of ProjectCodeMap entities, one per record (throws on error).
$project_code_maps = $client->ProjectCodeMap()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$project_code_map = $client->ProjectCodeMap()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "repository_id" => null, // string
]);
```


### ProjectEnvironment

Create an instance: `$project_environment = $client->ProjectEnvironment();`

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
| `allowed_origins` | `array` |  |
| `archived_at` | `mixed` |  |
| `base_url` | `mixed` |  |
| `base_url_changeable` | `bool` | Whether an update may send a new base_url. |
| `binary` | `string` |  |
| `conversation_only_messaging` | `bool` |  |
| `created_at` | `string` |  |
| `desktop` | `mixed` |  |
| `execution_mode` | `string` |  |
| `id` | `string` |  |
| `imessage_number` | `mixed` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `lock_version` | `int` |  |
| `messaging_conversation` | `mixed` |  |
| `messaging_problem` | `mixed` |  |
| `messaging_source` | `mixed` |  |
| `messaging_tester_number` | `mixed` | One configured tester number. |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `pull_request` | `mixed` |  |
| `source_branch` | `mixed` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `mixed` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectEnvironment record (throws on error).
$project_environment = $client->ProjectEnvironment()->load(["id" => "project_environment_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProjectEnvironment entities, one per record (throws on error).
$project_environments = $client->ProjectEnvironment()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$project_environment = $client->ProjectEnvironment()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "name" => null, // string
]);
```


### ProjectFinding

Create an instance: `$project_finding = $client->ProjectFinding();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `mixed` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `bool` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` |  |
| `source` | `string` | The workflow that produced the finding |
| `source_title` | `string` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` |  |
| `title` | `string` |  |
| `verification` | `mixed` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Where the finding is reviewed within its source |

#### Example: List

```php
// list() returns an array of ProjectFinding entities, one per record (throws on error).
$project_findings = $client->ProjectFinding()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProjectFixture

Create an instance: `$project_fixture = $client->ProjectFixture();`

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
| `assignments` | `array` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` |  |
| `content_type` | `string` |  |
| `credential_ids` | `array` |  |
| `credentials` | `array` |  |
| `environment_ids` | `array` |  |
| `environments` | `array` |  |
| `fixtures` | `array` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `persona_ids` | `array` |  |
| `personas` | `array` |  |
| `project` | `array` |  |
| `sha256` | `string` |  |
| `url` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectFixture record (throws on error).
$project_fixture = $client->ProjectFixture()->load(["id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProjectFixture entities, one per record (throws on error).
$project_fixtures = $client->ProjectFixture()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$project_fixture = $client->ProjectFixture()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
]);
```


### ProjectIosApp

Create an instance: `$project_ios_app = $client->ProjectIosApp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `array` |  |
| `artifact_paths` | `array` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `array` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `array` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```php
$project_ios_app = $client->ProjectIosApp()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
]);
```


### ProjectMessagingConversation

Create an instance: `$project_messaging_conversation = $client->ProjectMessagingConversation();`

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
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `leased` | `bool` |  |
| `messages` | `array` |  |
| `reconciled_at` | `mixed` |  |
| `retirable` | `bool` |  |
| `seeded` | `bool` |  |
| `send_blocked_reason` | `mixed` |  |
| `send_disposition` | `string` |  |
| `send_error` | `mixed` |  |
| `tester_number` | `string` |  |
| `unknown_send` | `bool` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectMessagingConversation record (throws on error).
$project_messaging_conversation = $client->ProjectMessagingConversation()->load(["id" => "project_messaging_conversation_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: Create

```php
$project_messaging_conversation = $client->ProjectMessagingConversation()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "assistant_number" => null, // string
    "tester_number" => null, // string
    "verify_environment_id" => null, // string
]);
```


### ProjectOverviewMetric

Create an instance: `$project_overview_metric = $client->ProjectOverviewMetric();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `array` |  |

#### Example: List

```php
// list() returns an array of ProjectOverviewMetric entities, one per record (throws on error).
$project_overview_metrics = $client->ProjectOverviewMetric()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProjectOverviewPullRequest

Create an instance: `$project_overview_pull_request = $client->ProjectOverviewPullRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `mixed` |  |
| `draft` | `bool` |  |
| `github_repository` | `mixed` | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `mixed` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `mixed` |  |
| `latest_reason` | `mixed` |  |
| `latest_run_id` | `mixed` |  |
| `latest_state` | `mixed` |  |
| `number` | `int` |  |
| `project_id` | `mixed` |  |
| `project_slug` | `mixed` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `mixed` |  |
| `source_repository` | `mixed` |  |
| `source_url` | `mixed` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```php
// list() returns an array of ProjectOverviewPullRequest entities, one per record (throws on error).
$project_overview_pull_requests = $client->ProjectOverviewPullRequest()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProjectProductMap

Create an instance: `$project_product_map = $client->ProjectProductMap();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ProjectRecording

Create an instance: `$project_recording = $client->ProjectRecording();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `array` |  |
| `created_at` | `string` |  |
| `draft` | `mixed` | Present once drafted. |
| `environment_id` | `string` | The project environment the browser opens. |
| `error` | `mixed` |  |
| `event_count` | `int` |  |
| `id` | `string` |  |
| `persona_id` | `string` | The project persona the journey acts as. |
| `phase` | `string` | What the owner can do now. |
| `signed_in_during_recording` | `bool` |  |
| `start_path` | `string` | A path on the environment to start at, such as /settings. |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectRecording record (throws on error).
$project_recording = $client->ProjectRecording()->load(["id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: Create

```php
$project_recording = $client->ProjectRecording()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "environment_id" => null, // string
    "persona_id" => null, // string
]);
```


### ProjectRunPlan

Create an instance: `$project_run_plan = $client->ProjectRunPlan();`

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
| `archived_at` | `mixed` |  |
| `base_url` | `mixed` |  |
| `created_at` | `string` |  |
| `dependencies` | `array` |  |
| `id` | `string` |  |
| `identity_probe` | `mixed` |  |
| `kind` | `mixed` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `nodes` | `array` |  |
| `preview` | `mixed` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectRunPlan record (throws on error).
$project_run_plan = $client->ProjectRunPlan()->load(["id" => "project_run_plan_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProjectRunPlan entities, one per record (throws on error).
$project_run_plans = $client->ProjectRunPlan()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$project_run_plan = $client->ProjectRunPlan()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "dependencies" => null, // array
    "identity_probe" => null, // mixed
    "name" => null, // string
    "nodes" => null, // array
]);
```


### ProjectRunSchedule

Create an instance: `$project_run_schedule = $client->ProjectRunSchedule();`

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
| `credential_ids` | `array` |  |
| `cron_expression` | `mixed` |  |
| `environment_id` | `string` | Project environment slug or public ID. |
| `environment_name` | `string` |  |
| `history` | `array` |  |
| `id` | `string` |  |
| `labels` | `array` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `next_run_at` | `string` |  |
| `notification_channel` | `string` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` |  |
| `selection_mode` | `string` |  |
| `slack_subscription_id` | `mixed` |  |
| `source_scenario_id` | `mixed` |  |
| `state` | `string` |  |
| `time_of_day` | `string` |  |
| `time_zone` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProjectRunSchedule record (throws on error).
$project_run_schedule = $client->ProjectRunSchedule()->load(["id" => "project_run_schedule_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of ProjectRunSchedule entities, one per record (throws on error).
$project_run_schedules = $client->ProjectRunSchedule()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$project_run_schedule = $client->ProjectRunSchedule()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "credential_ids" => null, // array
    "environment_id" => null, // string
    "labels" => null, // array
    "name" => null, // string
    "selection_mode" => null, // string
    "state" => null, // string
    "time_of_day" => null, // string
    "time_zone" => null, // string
]);
```


### ProjectScenarioOption

Create an instance: `$project_scenario_option = $client->ProjectScenarioOption();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `array` |  |
| `permissions` | `array` |  |
| `personas` | `array` |  |
| `project` | `array` |  |
| `scenario_states` | `array` | Scenarios by the state of their latest execution. |
| `scenarios` | `array` |  |
| `schedule_options` | `mixed` |  |
| `schedules` | `array` |  |

#### Example: List

```php
// list() returns an array of ProjectScenarioOption entities, one per record (throws on error).
$project_scenario_options = $client->ProjectScenarioOption()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProjectScenarioRow

Create an instance: `$project_scenario_row = $client->ProjectScenarioRow();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `int` |  |
| `dependency_count` | `int` |  |
| `health` | `array` |  |
| `id` | `string` |  |
| `labels` | `array` |  |
| `name` | `string` |  |
| `persona_id` | `string` |  |
| `selectable_for_run` | `bool` |  |
| `step_count` | `int` |  |

#### Example: List

```php
// list() returns an array of ProjectScenarioRow entities, one per record (throws on error).
$project_scenario_rows = $client->ProjectScenarioRow()->list(["organization_id" => "example", "project_id" => "example"]);
```


### ProjectSetting

Create an instance: `$project_setting = $client->ProjectSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `array` |  |
| `messaging_conversations` | `array` |  |
| `messaging_enabled` | `bool` |  |
| `permissions` | `array` |  |
| `project` | `array` |  |
| `tester_numbers` | `array` |  |

#### Example: List

```php
// list() returns an array of ProjectSetting entities, one per record (throws on error).
$project_settings = $client->ProjectSetting()->list(["organization_id" => "example", "project_id" => "example"]);
```


### PullRequest

Create an instance: `$pull_request = $client->PullRequest();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `array` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `mixed` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `array` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `imessage_number` | `string` | International destination of this exact deployed commit. |
| `number` | `int` |  |
| `pagination` | `array` |  |
| `permissions` | `array` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `mixed` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `mixed` |  |
| `project_id` | `string` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `array` |  |
| `repository_id` | `string` |  |
| `runs` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PullRequest record (throws on error).
$pull_request = $client->PullRequest()->load(["id" => "pull_request_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$pull_request = $client->PullRequest()->create([
    "organization_id" => null, // string
    "idempotency_key" => null, // string
]);
```


### PullRequestAction

Create an instance: `$pull_request_action = $client->PullRequestAction();`

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
| `comments` | `array` |  |
| `event` | `string` |  |
| `expected_head_sha` | `string` |  |
| `id` | `mixed` |  |
| `label` | `string` |  |
| `line` | `int` |  |
| `node_id` | `mixed` |  |
| `operation_key` | `string` |  |
| `path` | `string` |  |
| `run_id` | `string` |  |
| `side` | `string` |  |
| `start_line` | `int` |  |
| `start_side` | `string` |  |
| `thread_id` | `string` |  |

#### Example: Create

```php
$pull_request_action = $client->PullRequestAction()->create([
    "number" => null, // string
    "organization_id" => null, // string
    "pull_request_id" => null, // string
    "action_name" => null, // string
    "operation_key" => null, // string
]);
```


### PullRequestMagicMerge

Create an instance: `$pull_request_magic_merge = $client->PullRequestMagicMerge();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### PullRequestSetting

Create an instance: `$pull_request_setting = $client->PullRequestSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `bots` | `array` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `mixed` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `mixed` |  |
| `demo_videos` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `mixed` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` |  |
| `enabled` | `bool` | Test PRs automatically. |
| `environment` | `string` | The environment whose test accounts sign in to the previews. |
| `environments` | `array` |  |
| `github_check_enabled` | `bool` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `array` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` |  |
| `imessage_comment_prefix` | `mixed` |  |
| `imessage_number` | `mixed` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` |  |
| `limits` | `array` |  |
| `link_pattern` | `mixed` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `mixed` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` |  |
| `messaging_enabled` | `bool` |  |
| `messaging_tester_number` | `mixed` | One configured tester number. |
| `non_product_paths` | `array` |  |
| `permissions` | `array` |  |
| `pr_check` | `bool` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` |  |
| `preview_comment_authors` | `array` |  |
| `preview_comment_pattern` | `string` |  |
| `preview_comment_wildcard` | `mixed` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `mixed` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `array` |  |
| `previews` | `string` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `array` |  |
| `provider` | `string` |  |
| `repositories` | `array` |  |
| `repository` | `string` | Repository ID; see repositories for its name. |
| `repository_id` | `string` |  |
| `repository_kind` | `string` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `mixed` |  |
| `service` | `mixed` | composal: the public service the browsers open. |
| `settings` | `array` |  |
| `setup` | `mixed` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `array` | The answers a new setup starts from |
| `source_repository` | `string` |  |
| `target_mode` | `string` |  |
| `tester_numbers` | `array` |  |
| `trigger_label` | `string` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` |  |
| `trigger_on_label` | `bool` |  |
| `trigger_on_push` | `bool` |  |
| `trigger_on_ready` | `bool` |  |
| `triggers` | `array` | When runs start. |
| `verify_environment_id` | `string` |  |
| `write_scenarios` | `bool` | Draft and validate focused scenarios for each change on its preview. |

#### Example: List

```php
// list() returns an array of PullRequestSetting entities, one per record (throws on error).
$pull_request_settings = $client->PullRequestSetting()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$pull_request_setting = $client->PullRequestSetting()->create([
    "organization_id" => null, // string
    "bots" => null, // array
    "demo_videos" => null, // bool
    "deployment" => null, // mixed
    "enabled" => null, // bool
    "environment" => null, // string
    "imessage_comment_prefix" => null, // mixed
    "imessage_number" => null, // mixed
    "imessage_number_source" => null, // string
    "limits" => null, // array
    "link_pattern" => null, // mixed
    "links" => null, // mixed
    "messaging_tester_number" => null, // mixed
    "pr_check" => null, // bool
    "preview_comment_wildcard" => null, // mixed
    "preview_profile" => null, // mixed
    "previews" => null, // string
    "project_id" => null, // string
    "provider" => null, // string
    "repository" => null, // string
    "repository_id" => null, // string
    "repository_kind" => null, // string
    "service" => null, // mixed
    "target_mode" => null, // string
    "trigger_label" => null, // string
    "triggers" => null, // array
    "verify_environment_id" => null, // string
    "write_scenarios" => null, // bool
]);
```


### PullRequestSettingAddRepository

Create an instance: `$pull_request_setting_add_repository = $client->PullRequestSettingAddRepository();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `string` |  |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `array` |  |

#### Example: Create

```php
$pull_request_setting_add_repository = $client->PullRequestSettingAddRepository()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "repositories" => null, // array
]);
```


### PullRequestSettingDetectComment

Create an instance: `$pull_request_setting_detect_comment = $client->PullRequestSettingDetectComment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `array` | The bots answer |
| `deployment` | `string` | The deployment answer |
| `example_url` | `string` |  |
| `imessage_comment_prefix` | `string` |  |
| `imessage_number` | `mixed` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `link_pattern` | `string` | The link_pattern answer |
| `project_id` | `string` | Project slug or ID. |
| `provider` | `string` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | Repository slug, ID or owner/name. |
| `request_number` | `int` |  |

#### Example: Create

```php
$pull_request_setting_detect_comment = $client->PullRequestSettingDetectComment()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
]);
```


### PullRequestTranscript

Create an instance: `$pull_request_transcript = $client->PullRequestTranscript();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `mixed` |  |
| `ended_at` | `mixed` |  |
| `external_session_id` | `string` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `mixed` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `mixed` |  |
| `repository` | `mixed` |  |
| `started_at` | `mixed` |  |
| `stats` | `array` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |
| `updated_at` | `mixed` |  |
| `user` | `mixed` |  |

#### Example: List

```php
// list() returns an array of PullRequestTranscript entities, one per record (throws on error).
$pull_request_transcripts = $client->PullRequestTranscript()->list(["organization_id" => "example", "pull_request_id" => "example", "repo_id" => "example"]);
```


### PullZone

Create an instance: `$pull_zone = $client->PullZone();`

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

```php
// list() returns an array of PullZone entities, one per record (throws on error).
$pull_zones = $client->PullZone()->list(["organization_id" => "example"]);
```


### Recorder

Create an instance: `$recorder = $client->Recorder();`

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

```php
// load() returns the ENTITY — call data_get() for the Recorder record (throws on error).
$recorder = $client->Recorder()->load(["organization_id" => "organization_id"]);
```


### Registry

Create an instance: `$registry = $client->Registry();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### RegistryV2

Create an instance: `$registry_v2 = $client->RegistryV2();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RelayAgentConnection

Create an instance: `$relay_agent_connection = $client->RelayAgentConnection();`

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
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `connection` | `array` |  |
| `credential` | `mixed` | Write-only outbound key. |
| `error_code` | `mixed` |  |
| `expected_generation` | `int` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `mixed` |  |
| `requester_id` | `string` |  |
| `retired_at` | `mixed` |  |
| `revoked_at` | `mixed` |  |
| `scope_key` | `string` |  |
| `source_operation_id` | `mixed` |  |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RelayAgentConnection record (throws on error).
$relay_agent_connection = $client->RelayAgentConnection()->load(["id" => "relay_agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of RelayAgentConnection entities, one per record (throws on error).
$relay_agent_connections = $client->RelayAgentConnection()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$relay_agent_connection = $client->RelayAgentConnection()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "agent_card_url" => null, // string
    "auth_scheme" => null, // string
    "name" => null, // string
]);
```


### RelayAgentLocalThread

Create an instance: `$relay_agent_local_thread = $client->RelayAgentLocalThread();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RelaySignal

Create an instance: `$relay_signal = $client->RelaySignal();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$relay_signal = $client->RelaySignal()->create([
]);
```


### ReleaseRollout

Create an instance: `$release_rollout = $client->ReleaseRollout();`

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

```php
// load() returns the ENTITY — call data_get() for the ReleaseRollout record (throws on error).
$release_rollout = $client->ReleaseRollout()->load(["id" => "release_rollout_id", "release_id" => "release_id"]);
```

#### Example: List

```php
// list() returns an array of ReleaseRollout entities, one per record (throws on error).
$release_rollouts = $client->ReleaseRollout()->list(["release_id" => "example"]);
```

#### Example: Create

```php
$release_rollout = $client->ReleaseRollout()->create([
    "release_id" => null, // string
]);
```


### Repo

Create an instance: `$repo = $client->Repo();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_retry_import` | `bool` | True when a failed client import can be requeued for CLI resume. |
| `can_retry_sync` | `bool` | True when the latest sync run failed and can be retried. |
| `disclaimer` | `mixed` |  |
| `federated_in_home` | `bool` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` | `mixed` |  |
| `icon_name` | `string` |  |
| `id` | `string` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` | `mixed` |  |
| `is_home` | `bool` |  |
| `name` | `string` |  |
| `remote_repository` | `mixed` |  |
| `root_path` | `mixed` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` | `string` |  |
| `sync_error_message` | `mixed` |  |
| `sync_provider` | `string` |  |
| `sync_status` | `string` |  |

#### Example: List

```php
// list() returns an array of Repo entities, one per record (throws on error).
$repos = $client->Repo()->list(["organization_id" => "example"]);
```


### RepoAccessToken

Create an instance: `$repo_access_token = $client->RepoAccessToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `array` |  |
| `active` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `credential_purpose` | `string` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `expires_in_days` | `mixed` |  |
| `id` | `string` |  |
| `last_used_at` | `mixed` |  |
| `last_used_at_label` | `mixed` |  |
| `name` | `string` |  |
| `permission_level` | `string` |  |
| `plain_text_token` | `string` |  |
| `revoked_at` | `mixed` |  |
| `revoked_at_label` | `mixed` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of RepoAccessToken entities, one per record (throws on error).
$repo_access_tokens = $client->RepoAccessToken()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$repo_access_token = $client->RepoAccessToken()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "name" => null, // string
]);
```


### RepoAction

Create an instance: `$repo_action = $client->RepoAction();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pipeline` | `array` |  |
| `run` | `array` |  |

#### Example: List

```php
// list() returns an array of RepoAction entities, one per record (throws on error).
$repo_actions = $client->RepoAction()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### RepoAgentCheckpoint

Create an instance: `$repo_agent_checkpoint = $client->RepoAgentCheckpoint();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepoAgentCheckpoint record (throws on error).
$repo_agent_checkpoint = $client->RepoAgentCheckpoint()->load(["id" => "repo_agent_checkpoint_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### RepoAgentSession

Create an instance: `$repo_agent_session = $client->RepoAgentSession();`

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
| `agent_session` | `array` |  |
| `external_session_id` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepoAgentSession record (throws on error).
$repo_agent_session = $client->RepoAgentSession()->load(["id" => "repo_agent_session_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of RepoAgentSession entities, one per record (throws on error).
$repo_agent_sessions = $client->RepoAgentSession()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$repo_agent_session = $client->RepoAgentSession()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### RepoBookmarkProtection

Create an instance: `$repo_bookmark_protection = $client->RepoBookmarkProtection();`

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
| `actor_policy` | `array` |  |
| `bypass_mode` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `mixed` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `priority` | `int` |  |
| `repository_id` | `string` |  |
| `requirements` | `array` |  |
| `target_kind` | `string` |  |
| `target_pattern` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_by_user_id` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepoBookmarkProtection record (throws on error).
$repo_bookmark_protection = $client->RepoBookmarkProtection()->load(["id" => "repo_bookmark_protection_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of RepoBookmarkProtection entities, one per record (throws on error).
$repo_bookmark_protections = $client->RepoBookmarkProtection()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$repo_bookmark_protection = $client->RepoBookmarkProtection()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### RepoBookmarkProtectionEvent

Create an instance: `$repo_bookmark_protection_event = $client->RepoBookmarkProtectionEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_label` | `mixed` |  |
| `actor_user_id` | `mixed` |  |
| `bookmark_name` | `string` |  |
| `bookmark_protection_rule_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `decision` | `string` |  |
| `id` | `string` |  |
| `intent` | `mixed` |  |
| `metadata` | `array` |  |
| `new_target` | `mixed` |  |
| `old_target` | `mixed` |  |
| `organization_id` | `string` |  |
| `reason_codes` | `array` |  |
| `repository_id` | `string` |  |
| `source_request_id` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of RepoBookmarkProtectionEvent entities, one per record (throws on error).
$repo_bookmark_protection_events = $client->RepoBookmarkProtectionEvent()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### RepoCloudWorkspaceBackup

Create an instance: `$repo_cloud_workspace_backup = $client->RepoCloudWorkspaceBackup();`

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

```php
// load() returns the ENTITY — call data_get() for the RepoCloudWorkspaceBackup record (throws on error).
$repo_cloud_workspace_backup = $client->RepoCloudWorkspaceBackup()->load(["id" => "repo_cloud_workspace_backup_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of RepoCloudWorkspaceBackup entities, one per record (throws on error).
$repo_cloud_workspace_backups = $client->RepoCloudWorkspaceBackup()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$repo_cloud_workspace_backup = $client->RepoCloudWorkspaceBackup()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### RepoCodeRule

Create an instance: `$repo_code_rule = $client->RepoCodeRule();`

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
| `active_revision_number` | `mixed` |  |
| `capabilities` | `array` |  |
| `code_rule` | `mixed` |  |
| `created_at` | `string` |  |
| `definition` | `array` |  |
| `draft_pending` | `bool` | The latest revision is not the active one |
| `enabled` | `bool` |  |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `latest_revision_number` | `int` |  |
| `name` | `string` | Name of the latest revision |
| `repository` | `array` |  |
| `scope` | `array` |  |
| `slug` | `string` |  |
| `state_version` | `int` | Send back as expected_version on every mutation |
| `updated_at` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepoCodeRule record (throws on error).
$repo_code_rule = $client->RepoCodeRule()->load(["id" => "repo_code_rule_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of RepoCodeRule entities, one per record (throws on error).
$repo_code_rules = $client->RepoCodeRule()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$repo_code_rule = $client->RepoCodeRule()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "definition" => null, // array
]);
```


### RepoSetting

Create an instance: `$repo_setting = $client->RepoSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `description` | `mixed` |  |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `mixed` |  |
| `last_used_at_label` | `mixed` |  |
| `merge_authority` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `permission_level` | `string` |  |
| `revoked_at` | `mixed` |  |
| `revoked_at_label` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of RepoSetting entities, one per record (throws on error).
$repo_settings = $client->RepoSetting()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### RepoStat

Create an instance: `$repo_stat = $client->RepoStat();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repository_stats` | `array` |  |

#### Example: List

```php
// list() returns an array of RepoStat entities, one per record (throws on error).
$repo_stats = $client->RepoStat()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### RepoVc

Create an instance: `$repo_vc = $client->RepoVc();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |


### RepoVcCommit

Create an instance: `$repo_vc_commit = $client->RepoVcCommit();`

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

```php
// list() returns an array of RepoVcCommit entities, one per record (throws on error).
$repo_vc_commits = $client->RepoVcCommit()->list(["organization_id" => "example", "repo_id" => "example", "ref" => "example"]);
```


### ReportReplay

Create an instance: `$report_replay = $client->ReportReplay();`

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
| `recording` | `array` |  |
| `replay_steps` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ReportReplay record (throws on error).
$report_replay = $client->ReportReplay()->load(["id" => "report_replay_id", "exploration_id" => "exploration_id", "organization_id" => "organization_id"]);
```


### ReportScenario

Create an instance: `$report_scenario = $client->ReportScenario();`

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
| `permissions` | `array` |  |
| `project_id` | `mixed` |  |
| `related_explorations` | `array` |  |
| `report` | `array` |  |
| `saves_scenarios` | `bool` |  |
| `scenario_generation` | `array` |  |
| `status` | `string` |  |

#### Example: Create

```php
$report_scenario = $client->ReportScenario()->create([
    "exploration_id" => null, // string
    "organization_id" => null, // string
]);
```


### RepositoryAccess

Create an instance: `$repository_access = $client->RepositoryAccess();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### RepositoryAccessResolve

Create an instance: `$repository_access_resolve = $client->RepositoryAccessResolve();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string` |  |
| `git_auth_username` | `string` |  |
| `git_https_clone_url` | `mixed` |  |
| `git_https_supported` | `bool` |  |
| `github_access_warnings` | `array` |  |
| `id` | `string` |  |
| `membership_role` | `string` |  |
| `organization_id` | `string` |  |
| `organization_name` | `string` |  |
| `organization_slug` | `string` |  |
| `repository_id` | `string` |  |
| `repository_name` | `string` |  |
| `repository_slug` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepositoryAccessResolve record (throws on error).
$repository_access_resolve = $client->RepositoryAccessResolve()->load(["id" => "repository_access_resolve_id", "resolve_id" => "resolve_id"]);
```


### RepositoryEvent

Create an instance: `$repository_event = $client->RepositoryEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RepositoryImport

Create an instance: `$repository_import = $client->RepositoryImport();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_connections` | `bool` |  |
| `github_imports` | `array` |  |
| `github_installations` | `array` |  |
| `gitlab_configured` | `bool` |  |
| `gitlab_imports` | `array` |  |
| `gitlab_integrations` | `array` |  |
| `gitlab_redirect_uri` | `mixed` |  |
| `gitlab_self_managed_available` | `bool` |  |
| `inventory_errors` | `array` |  |
| `organization_id` | `string` |  |
| `repositories` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepositoryImport record (throws on error).
$repository_import = $client->RepositoryImport()->load(["organization_id" => "organization_id"]);
```


### RepositoryImportSession

Create an instance: `$repository_import_session = $client->RepositoryImportSession();`

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
| `can_authorize_github` | `bool` |  |
| `client_name` | `mixed` |  |
| `client_version` | `mixed` |  |
| `created_at` | `string` |  |
| `error_message` | `mixed` |  |
| `expires_at` | `string` |  |
| `git_imports` | `array` |  |
| `github_app_installation_id` | `mixed` |  |
| `github_connected` | `bool` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RepositoryImportSession record (throws on error).
$repository_import_session = $client->RepositoryImportSession()->load(["id" => "repository_import_session_id"]);
```

#### Example: Create

```php
$repository_import_session = $client->RepositoryImportSession()->create([
    "organization_id" => null, // string
    "idempotency_key" => null, // string
]);
```


### RepositoryImportSessionRepository

Create an instance: `$repository_import_session_repository = $client->RepositoryImportSessionRepository();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `mixed` |  |
| `full_name` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `private` | `bool` |  |
| `reason` | `mixed` |  |
| `selectable` | `bool` |  |
| `status` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```php
// list() returns an array of RepositoryImportSessionRepository entities, one per record (throws on error).
$repository_import_session_repositorys = $client->RepositoryImportSessionRepository()->list(["repository_import_session_id" => "example"]);
```


### RepositoryImportSessionSelection

Create an instance: `$repository_import_session_selection = $client->RepositoryImportSessionSelection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repositories` | `mixed` |  |

#### Example: Create

```php
$repository_import_session_selection = $client->RepositoryImportSessionSelection()->create([
    "repository_import_session_id" => null, // string
    "repositories" => null, // mixed
]);
```


### RepositorySandboxEnvironment

Create an instance: `$repository_sandbox_environment = $client->RepositorySandboxEnvironment();`

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

```php
// load() returns the ENTITY — call data_get() for the RepositorySandboxEnvironment record (throws on error).
$repository_sandbox_environment = $client->RepositorySandboxEnvironment()->load(["id" => "repository_sandbox_environment_id", "repository_id" => "repository_id"]);
```


### RoderCodeRepair

Create an instance: `$roder_code_repair = $client->RoderCodeRepair();`

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
| `cancel_requested` | `bool` |  |
| `failure_code` | `mixed` |  |
| `id` | `string` |  |
| `launch_state` | `string` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string` |  |
| `roder_thread_id` | `mixed` |  |
| `roder_turn_id` | `mixed` |  |
| `scenario_run_id` | `string` |  |
| `task` | `mixed` |  |
| `trigger_kind` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RoderCodeRepair record (throws on error).
$roder_code_repair = $client->RoderCodeRepair()->load(["id" => "roder_code_repair_id"]);
```

#### Example: List

```php
// list() returns an array of RoderCodeRepair entities, one per record (throws on error).
$roder_code_repairs = $client->RoderCodeRepair()->list(["scenario_run_id" => "example"]);
```

#### Example: Create

```php
$roder_code_repair = $client->RoderCodeRepair()->create([
    "base_sha" => null, // string
    "organization_id" => null, // string
    "repository_slug" => null, // string
    "scenario_run_id" => null, // string
]);
```


### RoderCodeRepairSetting

Create an instance: `$roder_code_repair_setting = $client->RoderCodeRepairSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `daily_limit` | `int` |  |
| `enabled` | `bool` |  |
| `enabled_at` | `mixed` |  |
| `operator_user_id` | `mixed` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `mixed` | Connected Composal repository required when enabling |

#### Example: List

```php
// list() returns an array of RoderCodeRepairSetting entities, one per record (throws on error).
$roder_code_repair_settings = $client->RoderCodeRepairSetting()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$roder_code_repair_setting = $client->RoderCodeRepairSetting()->create([
    "enabled" => null, // bool
    "organization_id" => null, // string
]);
```


### RoderMachine

Create an instance: `$roder_machine = $client->RoderMachine();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RoderRun

Create an instance: `$roder_run = $client->RoderRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### RoderWorkspaceCredential

Create an instance: `$roder_workspace_credential = $client->RoderWorkspaceCredential();`

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
| `required_lifetime_seconds` | `int` | Lifetime the pending clone or command must be able to complete within. |
| `token` | `string` | Short-lived read/write repository credential. |
| `username` | `string` |  |

#### Example: Create

```php
$roder_workspace_credential = $client->RoderWorkspaceCredential()->create([
    "required_lifetime_seconds" => null, // int
]);
```


### RunArtifact

Create an instance: `$run_artifact = $client->RunArtifact();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of RunArtifact entities, one per record (throws on error).
$run_artifacts = $client->RunArtifact()->list(["pipeline_id" => "example", "run_id" => "example"]);
```

#### Example: Create

```php
$run_artifact = $client->RunArtifact()->create([
    "pipeline_id" => null, // string
    "run_id" => null, // string
]);
```


### RunJob

Create an instance: `$run_job = $client->RunJob();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `allow_failure` | `bool` |  |
| `cache_archive_observations` | `mixed` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` | `string` |  |
| `ci_runner_id` | `mixed` |  |
| `created_at` | `string` |  |
| `dependencies_csv` | `mixed` |  |
| `display_id` | `int` |  |
| `environment_csv` | `mixed` |  |
| `execution_order` | `int` |  |
| `execution_profile` | `mixed` |  |
| `exit_code` | `mixed` |  |
| `failed` | `bool` |  |
| `finished_at` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `log_chunks` | `array` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `queued_at` | `mixed` |  |
| `reconciliation_id` | `mixed` |  |
| `retry_number` | `int` |  |
| `reuse` | `mixed` |  |
| `runner_label_selector` | `mixed` |  |
| `slug` | `string` |  |
| `started_at` | `mixed` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `steps` | `array` |  |
| `timeout_seconds` | `mixed` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RunJob record (throws on error).
$run_job = $client->RunJob()->load(["id" => "run_job_id", "pipeline_id" => "pipeline_id", "run_id" => "run_id"]);
```

#### Example: List

```php
// list() returns an array of RunJob entities, one per record (throws on error).
$run_jobs = $client->RunJob()->list(["pipeline_id" => "example", "run_id" => "example"]);
```

#### Example: Create

```php
$run_job = $client->RunJob()->create([
    "pipeline_id" => null, // string
    "run_id" => null, // string
]);
```


### RunScenarioRun

Create an instance: `$run_scenario_run = $client->RunScenarioRun();`

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

Create an instance: `$run_schedule_option = $client->RunScheduleOption();`

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

```php
// list() returns an array of RunScheduleOption entities, one per record (throws on error).
$run_schedule_options = $client->RunScheduleOption()->list(["organization_id" => "example", "project_id" => "example"]);
```


### RunSearch

Create an instance: `$run_search = $client->RunSearch();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RunSearch record (throws on error).
$run_search = $client->RunSearch()->load(["organization_id" => "organization_id"]);
```


### RunUpdate

Create an instance: `$run_update = $client->RunUpdate();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `mixed` |  |
| `draft` | `bool` |  |
| `github_repository` | `mixed` | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `mixed` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `mixed` |  |
| `latest_reason` | `mixed` |  |
| `latest_run_id` | `mixed` |  |
| `latest_state` | `mixed` |  |
| `number` | `int` |  |
| `project_id` | `mixed` |  |
| `project_slug` | `mixed` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `mixed` |  |
| `source_repository` | `mixed` |  |
| `source_url` | `mixed` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```php
// list() returns an array of RunUpdate entities, one per record (throws on error).
$run_updates = $client->RunUpdate()->list(["organization_id" => "example"]);
```


### RunWorkspaceCredential

Create an instance: `$run_workspace_credential = $client->RunWorkspaceCredential();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$run_workspace_credential = $client->RunWorkspaceCredential()->create([
]);
```


### RunnerLease

Create an instance: `$runner_lease = $client->RunnerLease();`

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

```php
// list() returns an array of RunnerLease entities, one per record (throws on error).
$runner_leases = $client->RunnerLease()->list(["runner_id" => "example", "runner_pool_id" => "example"]);
```

#### Example: Create

```php
$runner_lease = $client->RunnerLease()->create([
    "runner_id" => null, // string
    "runner_pool_id" => null, // string
]);
```


### RunnerPoolNodeEnrollmentToken

Create an instance: `$runner_pool_node_enrollment_token = $client->RunnerPoolNodeEnrollmentToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities_csv` | `mixed` |  |
| `ci_runner_pool_id` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `creator_user_id` | `mixed` |  |
| `description` | `mixed` |  |
| `expires_at` | `mixed` |  |
| `expires_at_label` | `mixed` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_used_at` | `mixed` |  |
| `last_used_at_label` | `mixed` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `raw_token` | `mixed` |  |
| `revoked_at` | `mixed` |  |
| `status` | `string` |  |
| `token_hint` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `usage_count` | `int` |  |
| `usage_count_label` | `string` |  |

#### Example: List

```php
// list() returns an array of RunnerPoolNodeEnrollmentToken entities, one per record (throws on error).
$runner_pool_node_enrollment_tokens = $client->RunnerPoolNodeEnrollmentToken()->list(["runner_pool_id" => "example"]);
```

#### Example: Create

```php
$runner_pool_node_enrollment_token = $client->RunnerPoolNodeEnrollmentToken()->create([
    "runner_pool_id" => null, // string
    "name" => null, // string
]);
```


### RunnerPoolRunner

Create an instance: `$runner_pool_runner = $client->RunnerPoolRunner();`

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

```php
// load() returns the ENTITY — call data_get() for the RunnerPoolRunner record (throws on error).
$runner_pool_runner = $client->RunnerPoolRunner()->load(["id" => "runner_pool_runner_id", "runner_pool_id" => "runner_pool_id"]);
```

#### Example: List

```php
// list() returns an array of RunnerPoolRunner entities, one per record (throws on error).
$runner_pool_runners = $client->RunnerPoolRunner()->list(["runner_pool_id" => "example"]);
```

#### Example: Create

```php
$runner_pool_runner = $client->RunnerPoolRunner()->create([
    "runner_pool_id" => null, // string
]);
```


### RuntimeInstanceHealthSnapshot

Create an instance: `$runtime_instance_health_snapshot = $client->RuntimeInstanceHealthSnapshot();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of RuntimeInstanceHealthSnapshot entities, one per record (throws on error).
$runtime_instance_health_snapshots = $client->RuntimeInstanceHealthSnapshot()->list(["runtime_instance_id" => "example"]);
```

#### Example: Create

```php
$runtime_instance_health_snapshot = $client->RuntimeInstanceHealthSnapshot()->create([
    "runtime_instance_id" => null, // string
]);
```


### SandboxIntegration

Create an instance: `$sandbox_integration = $client->SandboxIntegration();`

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
| `can_manage` | `bool` |  |
| `catalog` | `array` |  |
| `configuration` | `array` |  |
| `connected_profiles` | `array` | Connected profiles per provider across the organization. |
| `credentials` | `array` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `integrations` | `array` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `version` | `int` |  |

#### Example: List

```php
// list() returns an array of SandboxIntegration entities, one per record (throws on error).
$sandbox_integrations = $client->SandboxIntegration()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$sandbox_integration = $client->SandboxIntegration()->create([
    "organization_id" => null, // string
    "configuration" => null, // array
    "credentials" => null, // array
    "name" => null, // string
    "provider" => null, // string
]);
```


### ScenarioRevision

Create an instance: `$scenario_revision = $client->ScenarioRevision();`

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
| `definition` | `array` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` |  |
| `source` | `string` | The client the save came through. |
| `user` | `mixed` | Null when a system job saved the Scenario. |
| `version` | `int` | The Scenario's lock_version after this save. |

#### Example: List

```php
// list() returns an array of ScenarioRevision entities, one per record (throws on error).
$scenario_revisions = $client->ScenarioRevision()->list(["organization_id" => "example", "project_id" => "example", "scenario_id" => "example"]);
```


### ScenarioRunLesson

Create an instance: `$scenario_run_lesson = $client->ScenarioRunLesson();`

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

```php
$scenario_run_lesson = $client->ScenarioRunLesson()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "run_id" => null, // string
    "scenario_run_id" => null, // string
    "finding" => null, // string
    "workaround" => null, // string
]);
```


### ScenarioRunScenarioEdit

Create an instance: `$scenario_run_scenario_edit = $client->ScenarioRunScenarioEdit();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### SecretGrant

Create an instance: `$secret_grant = $client->SecretGrant();`

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

```php
// load() returns the ENTITY — call data_get() for the SecretGrant record (throws on error).
$secret_grant = $client->SecretGrant()->load(["id" => "secret_grant_id", "organization_id" => "organization_id", "secret_id" => "secret_id"]);
```

#### Example: List

```php
// list() returns an array of SecretGrant entities, one per record (throws on error).
$secret_grants = $client->SecretGrant()->list(["organization_id" => "example", "secret_id" => "example"]);
```

#### Example: Create

```php
$secret_grant = $client->SecretGrant()->create([
    "organization_id" => null, // string
    "secret_id" => null, // string
]);
```


### SecretVersion

Create an instance: `$secret_version = $client->SecretVersion();`

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

```php
// load() returns the ENTITY — call data_get() for the SecretVersion record (throws on error).
$secret_version = $client->SecretVersion()->load(["id" => "secret_version_id", "organization_id" => "organization_id", "secret_id" => "secret_id"]);
```

#### Example: List

```php
// list() returns an array of SecretVersion entities, one per record (throws on error).
$secret_versions = $client->SecretVersion()->list(["organization_id" => "example", "secret_id" => "example"]);
```

#### Example: Create

```php
$secret_version = $client->SecretVersion()->create([
    "organization_id" => null, // string
    "secret_id" => null, // string
]);
```


### ServiceEndpoint

Create an instance: `$service_endpoint = $client->ServiceEndpoint();`

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

```php
// load() returns the ENTITY — call data_get() for the ServiceEndpoint record (throws on error).
$service_endpoint = $client->ServiceEndpoint()->load(["id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id"]);
```

#### Example: List

```php
// list() returns an array of ServiceEndpoint entities, one per record (throws on error).
$service_endpoints = $client->ServiceEndpoint()->list(["app_id" => "example", "service_id" => "example"]);
```

#### Example: Create

```php
$service_endpoint = $client->ServiceEndpoint()->create([
    "app_id" => null, // string
    "service_id" => null, // string
]);
```


### Setting

Create an instance: `$setting = $client->Setting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `array` |  |
| `sandbox_regions` | `array` |  |

#### Example: List

```php
// list() returns an array of Setting entities, one per record (throws on error).
$settings = $client->Setting()->list(["organization_id" => "example"]);
```


### SettingMutationLease

Create an instance: `$setting_mutation_lease = $client->SettingMutationLease();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### Signal

Create an instance: `$signal = $client->Signal();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acked_at` | `mixed` |  |
| `acked_by` | `mixed` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | `array` | Dispatched-run summary (docs §6c). |
| `app_service_id` | `mixed` |  |
| `attribution` | `array` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | `string` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | `string` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | `array` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | `string` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` | `string` |  |
| `payload` | `array` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | `array` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | `array` | Recovery pairing (docs §6b). |
| `severity` | `string` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | `array` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` | `mixed` |  |
| `subject_type` | `mixed` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | `string` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Signal record (throws on error).
$signal = $client->Signal()->load(["id" => "signal_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Signal entities, one per record (throws on error).
$signals = $client->Signal()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$signal = $client->Signal()->create([
]);
```


### SignalInbound

Create an instance: `$signal_inbound = $client->SignalInbound();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SignalIntegration

Create an instance: `$signal_integration = $client->SignalIntegration();`

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
| `api_token_stored` | `bool` |  |
| `config` | `array` |  |
| `created_at` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `mixed` |  |
| `last_verified_at` | `mixed` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `int` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `int` |  |
| `unmapped_delivery_count` | `int` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `mixed` |  |
| `webhook_secret` | `string` | The provider's signing secret. |
| `webhook_secret_stored` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SignalIntegration record (throws on error).
$signal_integration = $client->SignalIntegration()->load(["id" => "signal_integration_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of SignalIntegration entities, one per record (throws on error).
$signal_integrations = $client->SignalIntegration()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$signal_integration = $client->SignalIntegration()->create([
    "organization_id" => null, // string
    "name" => null, // string
    "provider" => null, // string
]);
```


### SignalIntegrationDelivery

Create an instance: `$signal_integration_delivery = $client->SignalIntegrationDelivery();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `int` |  |
| `created_at` | `mixed` |  |
| `delivery_id` | `string` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` | `mixed` |  |
| `id` | `string` | Public id (`sdel_…`). |
| `last_error` | `mixed` |  |
| `ops_signal_id` | `mixed` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` | `string` |  |
| `processed_at` | `mixed` |  |
| `provider` | `string` |  |
| `received_at` | `mixed` |  |
| `signal_integration_id` | `string` |  |
| `state` | `string` |  |

#### Example: List

```php
// list() returns an array of SignalIntegrationDelivery entities, one per record (throws on error).
$signal_integration_deliverys = $client->SignalIntegrationDelivery()->list(["organization_id" => "example", "signal_integration_id" => "example"]);
```


### SignalIntegrationTarget

Create an instance: `$signal_integration_target = $client->SignalIntegrationTarget();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_service_id` | `mixed` |  |
| `created_at` | `mixed` |  |
| `display_name` | `mixed` |  |
| `enabled` | `bool` |  |
| `external_id` | `string` |  |
| `external_kind` | `string` |  |
| `external_slug` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` | Public id (`stgt_…`). |
| `organization_id` | `string` |  |
| `signal_integration_id` | `string` |  |
| `signal_integration_targets` | `array` |  |
| `targets` | `array` |  |
| `updated_at` | `mixed` |  |

#### Example: List

```php
// list() returns an array of SignalIntegrationTarget entities, one per record (throws on error).
$signal_integration_targets = $client->SignalIntegrationTarget()->list(["organization_id" => "example", "signal_integration_id" => "example"]);
```


### SignalSubscription

Create an instance: `$signal_subscription = $client->SignalSubscription();`

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

```php
// load() returns the ENTITY — call data_get() for the SignalSubscription record (throws on error).
$signal_subscription = $client->SignalSubscription()->load(["id" => "signal_subscription_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of SignalSubscription entities, one per record (throws on error).
$signal_subscriptions = $client->SignalSubscription()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$signal_subscription = $client->SignalSubscription()->create([
    "organization_id" => null, // string
]);
```


### Site

Create an instance: `$site = $client->Site();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `mixed` |  |
| `activated_at_label` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `creator_user_id` | `mixed` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `mixed` |  |
| `file_count` | `int` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `mixed` |  |
| `finished_at_label` | `mixed` |  |
| `id` | `string` |  |
| `is_active` | `bool` |  |
| `source_ref` | `mixed` |  |
| `started_at` | `mixed` |  |
| `started_at_label` | `mixed` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `int` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `uploaded_at` | `mixed` |  |
| `uploaded_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of Site entities, one per record (throws on error).
$sites = $client->Site()->list(["organization_id" => "example"]);
```


### SiteAccessKey

Create an instance: `$site_access_key = $client->SiteAccessKey();`

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

```php
// list() returns an array of SiteAccessKey entities, one per record (throws on error).
$site_access_keys = $client->SiteAccessKey()->list(["organization_id" => "example", "site_id" => "example"]);
```

#### Example: Create

```php
$site_access_key = $client->SiteAccessKey()->create([
    "organization_id" => null, // string
    "site_id" => null, // string
]);
```


### SitePreview

Create an instance: `$site_preview = $client->SitePreview();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `mixed` | The site's icon as a data: URL, up to 256 KB |
| `title` | `mixed` |  |
| `url` | `string` | The address as it will be saved |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SitePreview record (throws on error).
$site_preview = $client->SitePreview()->load(["organization_id" => "organization_id", "url" => "url"]);
```


### SiteSecret

Create an instance: `$site_secret = $client->SiteSecret();`

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

Create an instance: `$slack_channel = $client->SlackChannel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `is_member` | `bool` |  |
| `is_private` | `bool` |  |
| `is_slack_connect` | `bool` |  |
| `name` | `string` |  |
| `published` | `bool` |  |

#### Example: List

```php
// list() returns an array of SlackChannel entities, one per record (throws on error).
$slack_channels = $client->SlackChannel()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### SourceConnection

Create an instance: `$source_connection = $client->SourceConnection();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SpaceAlertRule

Create an instance: `$space_alert_rule = $client->SpaceAlertRule();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceAlertRule record (throws on error).
$space_alert_rule = $client->SpaceAlertRule()->load(["id" => "space_alert_rule_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceAlertRule entities, one per record (throws on error).
$space_alert_rules = $client->SpaceAlertRule()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_alert_rule = $client->SpaceAlertRule()->create([
    "space_id" => null, // string
]);
```


### SpaceAuditEvent

Create an instance: `$space_audit_event = $client->SpaceAuditEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of SpaceAuditEvent entities, one per record (throws on error).
$space_audit_events = $client->SpaceAuditEvent()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_audit_event = $client->SpaceAuditEvent()->create([
    "space_id" => null, // string
]);
```


### SpaceDnsRecord

Create an instance: `$space_dns_record = $client->SpaceDnsRecord();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceDnsRecord record (throws on error).
$space_dns_record = $client->SpaceDnsRecord()->load(["id" => "space_dns_record_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceDnsRecord entities, one per record (throws on error).
$space_dns_records = $client->SpaceDnsRecord()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_dns_record = $client->SpaceDnsRecord()->create([
    "space_id" => null, // string
]);
```


### SpaceEnrollmentToken

Create an instance: `$space_enrollment_token = $client->SpaceEnrollmentToken();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceEnrollmentToken record (throws on error).
$space_enrollment_token = $client->SpaceEnrollmentToken()->load(["id" => "space_enrollment_token_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceEnrollmentToken entities, one per record (throws on error).
$space_enrollment_tokens = $client->SpaceEnrollmentToken()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_enrollment_token = $client->SpaceEnrollmentToken()->create([
    "space_id" => null, // string
]);
```


### SpaceGateway

Create an instance: `$space_gateway = $client->SpaceGateway();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceGateway record (throws on error).
$space_gateway = $client->SpaceGateway()->load(["id" => "space_gateway_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceGateway entities, one per record (throws on error).
$space_gateways = $client->SpaceGateway()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_gateway = $client->SpaceGateway()->create([
    "space_id" => null, // string
]);
```


### SpaceGroup

Create an instance: `$space_group = $client->SpaceGroup();`

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

```php
// list() returns an array of SpaceGroup entities, one per record (throws on error).
$space_groups = $client->SpaceGroup()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_group = $client->SpaceGroup()->create([
    "space_id" => null, // string
]);
```


### SpaceGroupMembership

Create an instance: `$space_group_membership = $client->SpaceGroupMembership();`

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

```php
// list() returns an array of SpaceGroupMembership entities, one per record (throws on error).
$space_group_memberships = $client->SpaceGroupMembership()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_group_membership = $client->SpaceGroupMembership()->create([
    "space_id" => null, // string
]);
```


### SpaceLogStream

Create an instance: `$space_log_stream = $client->SpaceLogStream();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of SpaceLogStream entities, one per record (throws on error).
$space_log_streams = $client->SpaceLogStream()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_log_stream = $client->SpaceLogStream()->create([
    "space_id" => null, // string
]);
```


### SpaceMetricSery

Create an instance: `$space_metric_sery = $client->SpaceMetricSery();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of SpaceMetricSery entities, one per record (throws on error).
$space_metric_serys = $client->SpaceMetricSery()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_metric_sery = $client->SpaceMetricSery()->create([
    "space_id" => null, // string
]);
```


### SpaceOtelCollector

Create an instance: `$space_otel_collector = $client->SpaceOtelCollector();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceOtelCollector record (throws on error).
$space_otel_collector = $client->SpaceOtelCollector()->load(["id" => "space_otel_collector_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceOtelCollector entities, one per record (throws on error).
$space_otel_collectors = $client->SpaceOtelCollector()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_otel_collector = $client->SpaceOtelCollector()->create([
    "space_id" => null, // string
]);
```


### SpacePeer

Create an instance: `$space_peer = $client->SpacePeer();`

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

```php
// load() returns the ENTITY — call data_get() for the SpacePeer record (throws on error).
$space_peer = $client->SpacePeer()->load(["id" => "space_peer_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpacePeer entities, one per record (throws on error).
$space_peers = $client->SpacePeer()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_peer = $client->SpacePeer()->create([
    "space_id" => null, // string
]);
```


### SpacePeerAttachment

Create an instance: `$space_peer_attachment = $client->SpacePeerAttachment();`

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

```php
// list() returns an array of SpacePeerAttachment entities, one per record (throws on error).
$space_peer_attachments = $client->SpacePeerAttachment()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_peer_attachment = $client->SpacePeerAttachment()->create([
    "space_id" => null, // string
]);
```


### SpacePolicy

Create an instance: `$space_policy = $client->SpacePolicy();`

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

```php
// load() returns the ENTITY — call data_get() for the SpacePolicy record (throws on error).
$space_policy = $client->SpacePolicy()->load(["id" => "space_policy_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpacePolicy entities, one per record (throws on error).
$space_policys = $client->SpacePolicy()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_policy = $client->SpacePolicy()->create([
    "space_id" => null, // string
]);
```


### SpaceSegment

Create an instance: `$space_segment = $client->SpaceSegment();`

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

```php
// load() returns the ENTITY — call data_get() for the SpaceSegment record (throws on error).
$space_segment = $client->SpaceSegment()->load(["id" => "space_segment_id", "space_id" => "space_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceSegment entities, one per record (throws on error).
$space_segments = $client->SpaceSegment()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_segment = $client->SpaceSegment()->create([
    "space_id" => null, // string
]);
```


### SpaceTraceSpan

Create an instance: `$space_trace_span = $client->SpaceTraceSpan();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of SpaceTraceSpan entities, one per record (throws on error).
$space_trace_spans = $client->SpaceTraceSpan()->list(["space_id" => "example"]);
```

#### Example: Create

```php
$space_trace_span = $client->SpaceTraceSpan()->create([
    "space_id" => null, // string
]);
```


### Spark

Create an instance: `$spark = $client->Spark();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `array` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` | `bool` |  |
| `compute_credit_cents` | `mixed` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `credit_cents` | `mixed` | Inference credit the workspace started Sparks with. |
| `first_spark` | `mixed` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` | `bool` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `jsonrpc` | `string` |  |
| `logo_url` | `mixed` |  |
| `member_count` | `int` |  |
| `method` | `string` |  |
| `name` | `string` |  |
| `params` | `array` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `mixed` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `array` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | `bool` | Whether the workspace has started Sparks. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: List

```php
// list() returns an array of Spark entities, one per record (throws on error).
$sparks = $client->Spark()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$spark = $client->Spark()->create([
    "jsonrpc" => null, // string
    "method" => null, // string
]);
```


### SparkAgentIntegration

Create an instance: `$spark_agent_integration = $client->SparkAgentIntegration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `array` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `array` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` |  |
| `can_manage_organization` | `bool` |  |
| `catalog` | `array` |  |
| `connect_as` | `mixed` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `array` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `array` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` |  |
| `connections` | `array` |  |
| `email` | `array` | A native agent's own email address. |
| `enabled` | `bool` |  |
| `enabled_toolkits` | `array` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` |  |
| `pagination` | `array` |  |
| `pending_counts` | `array` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `array` |  |
| `webhook_connections` | `array` |  |
| `webhooks_available` | `bool` |  |

#### Example: List

```php
// list() returns an array of SparkAgentIntegration entities, one per record (throws on error).
$spark_agent_integrations = $client->SparkAgentIntegration()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$spark_agent_integration = $client->SparkAgentIntegration()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "connection_id" => null, // string
    "enabled" => null, // bool
    "generation" => null, // int
]);
```


### SparkAgentLocalThread

Create an instance: `$spark_agent_local_thread = $client->SparkAgentLocalThread();`

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
| `archived` | `bool` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `bool` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `bool` |  |
| `can_end` | `bool` |  |
| `can_interrupt` | `bool` |  |
| `can_send` | `bool` |  |
| `created_at` | `string` |  |
| `delivery` | `array` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `mixed` |  |
| `expires_at` | `string` |  |
| `full_title` | `string` | The native name or first prompt in full, for a tooltip. |
| `id` | `string` |  |
| `key` | `string` |  |
| `last_activity_at` | `mixed` |  |
| `native_thread_id` | `string` |  |
| `parent_conversation_id` | `mixed` |  |
| `provider` | `string` |  |
| `references` | `array` |  |
| `relay_disconnected_at` | `mixed` |  |
| `relay_participant` | `array` |  |
| `result` | `mixed` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `mixed` |  |
| `section` | `string` | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` |  |
| `status` | `mixed` | What the native thread is doing. |
| `task_configured` | `bool` |  |
| `thread_id` | `string` |  |
| `title` | `string` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SparkAgentLocalThread record (throws on error).
$spark_agent_local_thread = $client->SparkAgentLocalThread()->load(["id" => "spark_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$spark_agent_local_thread = $client->SparkAgentLocalThread()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "device_id" => null, // string
    "key" => null, // string
    "provider" => null, // string
    "thread_id" => null, // string
]);
```


### SparkAgentSite

Create an instance: `$spark_agent_site = $client->SparkAgentSite();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed_at` | `string` |  |
| `deployments_count` | `int` |  |
| `hostname` | `string` |  |
| `https` | `string` | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```php
// list() returns an array of SparkAgentSite entities, one per record (throws on error).
$spark_agent_sites = $client->SparkAgentSite()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### SparkAgentSkill

Create an instance: `$spark_agent_skill = $client->SparkAgentSkill();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `can_configure` | `bool` |  |
| `can_manage` | `bool` |  |
| `configuration_state` | `string` | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` |  |
| `enabled` | `bool` |  |
| `name` | `string` |  |
| `skills` | `array` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of SparkAgentSkill entities, one per record (throws on error).
$spark_agent_skills = $client->SparkAgentSkill()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$spark_agent_skill = $client->SparkAgentSkill()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "enabled" => null, // bool
    "name" => null, // string
    "version" => null, // string
]);
```


### SparkAgentThread

Create an instance: `$spark_agent_thread = $client->SparkAgentThread();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `mixed` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` |  |
| `execution` | `mixed` |  |
| `first_input` | `mixed` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `id` | `string` |  |
| `inherit_context` | `bool` | Include the source conversation through its last completed reply. |
| `local_activities` | `array` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `mixed` |  |
| `local_scope_key` | `mixed` |  |
| `local_status_pending` | `bool` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `array` |  |
| `main_thread_id` | `string` |  |
| `message` | `string` | The thread's first message. |
| `next_cursor` | `mixed` |  |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` |  |
| `selected_thread` | `mixed` |  |
| `thread` | `array` |  |
| `threads` | `array` |  |
| `title` | `string` |  |
| `total_archived_count` | `mixed` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```php
// list() returns an array of SparkAgentThread entities, one per record (throws on error).
$spark_agent_threads = $client->SparkAgentThread()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$spark_agent_thread = $client->SparkAgentThread()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
]);
```


### SparkCredit

Create an instance: `$spark_credit = $client->SparkCredit();`

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
| `amount_cents` | `int` | Purchase amount in USD cents. |
| `autofill` | `mixed` |  |
| `autofill_payment_unconfirmed` | `bool` |  |
| `available_usd` | `string` |  |
| `billing_unit` | `string` | Compute minute quote version returned by the billing summary. |
| `can_manage` | `bool` |  |
| `compute_minutes` | `array` |  |
| `compute_usd` | `string` |  |
| `credits_per_usd` | `int` |  |
| `inference_usd` | `string` |  |
| `kind` | `string` |  |
| `payment_method` | `mixed` |  |
| `payments_enabled` | `bool` |  |
| `plan` | `string` |  |
| `plans` | `array` |  |
| `quoted_credits_cents` | `int` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | `int` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` | `array` |  |
| `refill_options` | `array` |  |
| `refill_thresholds_cents` | `array` |  |
| `request_key` | `string` |  |
| `settings` | `mixed` |  |
| `starter_cents` | `int` |  |
| `top_up_max_cents` | `int` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | `int` | Minimum manual top-up and increment, in USD cents. |

#### Example: List

```php
// list() returns an array of SparkCredit entities, one per record (throws on error).
$spark_credits = $client->SparkCredit()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$spark_credit = $client->SparkCredit()->create([
    "organization_id" => null, // string
    "kind" => null, // string
    "request_key" => null, // string
]);
```


### SparkCreditAgentUsage

Create an instance: `$spark_credit_agent_usage = $client->SparkCreditAgentUsage();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `array` |  |
| `all` | `array` |  |
| `days` | `array` |  |
| `id` | `string` |  |
| `owners` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SparkCreditAgentUsage record (throws on error).
$spark_credit_agent_usage = $client->SparkCreditAgentUsage()->load(["id" => "spark_credit_agent_usage_id", "organization_id" => "organization_id"]);
```


### SparkCreditUsageTotal

Create an instance: `$spark_credit_usage_total = $client->SparkCreditUsageTotal();`

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

```php
// list() returns an array of SparkCreditUsageTotal entities, one per record (throws on error).
$spark_credit_usage_totals = $client->SparkCreditUsageTotal()->list(["organization_id" => "example"]);
```


### StaticSite

Create an instance: `$static_site = $client->StaticSite();`

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
| `active_deployment_id` | `mixed` |  |
| `cdn_hostname` | `string` |  |
| `cdn_url` | `string` |  |
| `cname_target` | `string` |  |
| `created_at` | `string` |  |
| `default_url` | `string` |  |
| `description` | `mixed` |  |
| `error_document` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `id` | `string` |  |
| `index_document` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provisioned` | `bool` |  |
| `provisioned_at` | `mixed` |  |
| `region` | `mixed` |  |
| `replication_regions` | `array` |  |
| `repository_id` | `mixed` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StaticSite record (throws on error).
$static_site = $client->StaticSite()->load(["id" => "static_site_id"]);
```

#### Example: List

```php
// list() returns an array of StaticSite entities, one per record (throws on error).
$static_sites = $client->StaticSite()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$static_site = $client->StaticSite()->create([
    "organization_id" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### StaticSiteDeployment

Create an instance: `$static_site_deployment = $client->StaticSiteDeployment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `mixed` |  |
| `activated_at_label` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `creator_user_id` | `mixed` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `mixed` |  |
| `file_count` | `int` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `mixed` |  |
| `finished_at_label` | `mixed` |  |
| `id` | `string` |  |
| `is_active` | `bool` |  |
| `source_ref` | `mixed` |  |
| `started_at` | `mixed` |  |
| `started_at_label` | `mixed` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `int` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |
| `uploaded_at` | `mixed` |  |
| `uploaded_at_label` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StaticSiteDeployment record (throws on error).
$static_site_deployment = $client->StaticSiteDeployment()->load(["id" => "static_site_deployment_id", "static_site_id" => "static_site_id"]);
```

#### Example: List

```php
// list() returns an array of StaticSiteDeployment entities, one per record (throws on error).
$static_site_deployments = $client->StaticSiteDeployment()->list(["static_site_id" => "example"]);
```

#### Example: Create

```php
$static_site_deployment = $client->StaticSiteDeployment()->create([
    "static_site_id" => null, // string
]);
```


### StaticSiteDomain

Create an instance: `$static_site_domain = $client->StaticSiteDomain();`

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
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `mixed` |  |
| `record_name` | `mixed` |  |
| `record_type` | `mixed` |  |
| `record_value` | `mixed` |  |
| `redirect_to` | `mixed` |  |
| `static_site_id` | `mixed` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StaticSiteDomain record (throws on error).
$static_site_domain = $client->StaticSiteDomain()->load(["id" => "static_site_domain_id", "static_site_id" => "static_site_id"]);
```

#### Example: List

```php
// list() returns an array of StaticSiteDomain entities, one per record (throws on error).
$static_site_domains = $client->StaticSiteDomain()->list(["static_site_id" => "example"]);
```

#### Example: Create

```php
$static_site_domain = $client->StaticSiteDomain()->create([
    "static_site_id" => null, // string
    "hostname" => null, // string
]);
```


### StatusChange

Create an instance: `$status_change = $client->StatusChange();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `id` | `string` |  |
| `patchsets` | `array` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StatusChange record (throws on error).
$status_change = $client->StatusChange()->load(["id" => "status_change_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### StatusCommit

Create an instance: `$status_commit = $client->StatusCommit();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `array` |  |
| `commit_sha` | `string` |  |
| `counts` | `array` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StatusCommit record (throws on error).
$status_commit = $client->StatusCommit()->load(["id" => "status_commit_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### StatusPatchset

Create an instance: `$status_patchset = $client->StatusPatchset();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `array` |  |
| `checks_status` | `mixed` |  |
| `commit_sha` | `mixed` |  |
| `counts` | `array` |  |
| `id` | `string` |  |
| `patchset_id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StatusPatchset record (throws on error).
$status_patchset = $client->StatusPatchset()->load(["id" => "status_patchset_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```


### StripeWebhook

Create an instance: `$stripe_webhook = $client->StripeWebhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$stripe_webhook = $client->StripeWebhook()->create([
]);
```


### SubmitTelemetry

Create an instance: `$submit_telemetry = $client->SubmitTelemetry();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$submit_telemetry = $client->SubmitTelemetry()->create([
]);
```


### SubscriptionModel

Create an instance: `$subscription_model = $client->SubscriptionModel();`

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
| `reasoning` | `array` | Effort levels this plan model accepts. |
| `speeds` | `array` | Speed modes advertised by this connected account and model. |

#### Example: List

```php
// list() returns an array of SubscriptionModel entities, one per record (throws on error).
$subscription_models = $client->SubscriptionModel()->list(["agent_id" => "example", "organization_id" => "example", "profile_id" => "example"]);
```


### SwarmEvent

Create an instance: `$swarm_event = $client->SwarmEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_swarm_id` | `string` |  |
| `attempt_id` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `id` | `int` |  |
| `kind` | `string` |  |
| `payload` | `array` |  |
| `reason` | `mixed` |  |
| `scheduler_generation` | `mixed` |  |
| `task_id` | `mixed` |  |

#### Example: List

```php
// list() returns an array of SwarmEvent entities, one per record (throws on error).
$swarm_events = $client->SwarmEvent()->list(["swarm_id" => "example"]);
```


### SwarmLive

Create an instance: `$swarm_live = $client->SwarmLive();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### SwarmNote

Create an instance: `$swarm_note = $client->SwarmNote();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `task_id` | `mixed` | A task public id; omitted |
| `text` | `string` |  |

#### Example: Create

```php
$swarm_note = $client->SwarmNote()->create([
    "swarm_id" => null, // string
    "text" => null, // string
]);
```


### SwarmTask

Create an instance: `$swarm_task = $client->SwarmTask();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptance_commands` | `array` |  |
| `agent_swarm_id` | `string` |  |
| `assigned_runner_id` | `mixed` |  |
| `blocked_reason` | `mixed` |  |
| `changes` | `array` |  |
| `commit_count` | `int` |  |
| `commit_sha_result` | `mixed` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `current_attempt_id` | `mixed` |  |
| `deadline_at` | `mixed` |  |
| `depends_on_task_ids` | `array` |  |
| `depth` | `int` |  |
| `diff_artifact_url` | `mixed` |  |
| `display_id` | `int` |  |
| `environment_profile` | `mixed` |  |
| `error_message` | `mixed` |  |
| `failure_code` | `mixed` |  |
| `finished_at` | `mixed` |  |
| `finished_at_label` | `mixed` |  |
| `harness` | `string` |  |
| `id` | `string` |  |
| `input_revision` | `mixed` |  |
| `iteration` | `int` |  |
| `landing_state` | `string` |  |
| `model` | `mixed` |  |
| `model_provider` | `mixed` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `owned_paths` | `array` |  |
| `parent_task_id` | `mixed` |  |
| `position` | `int` |  |
| `prompt` | `string` |  |
| `queued_at` | `mixed` |  |
| `queued_at_label` | `mixed` |  |
| `reasoning_effort` | `mixed` |  |
| `recent_activity` | `array` |  |
| `repo_url` | `string` |  |
| `result` | `array` |  |
| `retry_number` | `int` |  |
| `role` | `string` |  |
| `run_id` | `mixed` |  |
| `stack_after_task_id` | `mixed` |  |
| `started_at` | `mixed` |  |
| `started_at_label` | `mixed` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of SwarmTask entities, one per record (throws on error).
$swarm_tasks = $client->SwarmTask()->list(["swarm_id" => "example"]);
```


### TaskLease

Create an instance: `$task_lease = $client->TaskLease();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```php
$task_lease = $client->TaskLease()->create([
    "swarm_id" => null, // string
    "task_id" => null, // string
]);
```


### ThreadPreview

Create an instance: `$thread_preview = $client->ThreadPreview();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `mixed` |  |
| `port` | `int` |  |
| `url` | `string` |  |

#### Example: Create

```php
$thread_preview = $client->ThreadPreview()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "thread_id" => null, // string
    "port" => null, // int
]);
```


### ThreadPreviewAccess

Create an instance: `$thread_preview_access = $client->ThreadPreviewAccess();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |


### ToolFeedback

Create an instance: `$tool_feedback = $client->ToolFeedback();`

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
| `feedback` | `array` |  |
| `id` | `string` |  |
| `metadata` | `array` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` | `string` |  |
| `source` | `string` |  |
| `summary` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ToolFeedback record (throws on error).
$tool_feedback = $client->ToolFeedback()->load(["id" => "tool_feedback_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$tool_feedback = $client->ToolFeedback()->create([
    "organization_id" => null, // string
    "feedback" => null, // array
]);
```


### Transcript

Create an instance: `$transcript = $client->Transcript();`

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
| `author` | `array` |  |
| `checkpoint_pagination` | `array` |  |
| `checkpoints` | `array` |  |
| `id` | `string` |  |
| `last_checkpoint_at` | `mixed` |  |
| `selected_checkpoint` | `mixed` |  |
| `source_url` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |

#### Example: List

```php
// list() returns an array of Transcript entities, one per record (throws on error).
$transcripts = $client->Transcript()->list(["repo" => "example"]);
```


### V1Message

Create an instance: `$v1_message = $client->V1Message();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$v1_message = $client->V1Message()->create([
    "organization_id" => null, // string
]);
```


### VcBranch

Create an instance: `$vc_branch = $client->VcBranch();`

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

```php
// list() returns an array of VcBranch entities, one per record (throws on error).
$vc_branchs = $client->VcBranch()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$vc_branch = $client->VcBranch()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
]);
```


### VcBrowser

Create an instance: `$vc_browser = $client->VcBrowser();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### VcChange

Create an instance: `$vc_change = $client->VcChange();`

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
| `activity` | `array` |  |
| `canonical_path` | `string` |  |
| `change` | `mixed` |  |
| `checks` | `array` |  |
| `checks_status` | `string` |  |
| `description` | `mixed` |  |
| `group` | `mixed` |  |
| `id` | `string` |  |
| `jj_change_id` | `mixed` |  |
| `labels` | `array` |  |
| `landing` | `array` | Server-computed submitted-together closure and landing preflight. |
| `number` | `int` |  |
| `patchset_number` | `mixed` |  |
| `previews` | `array` |  |
| `primary_status` | `mixed` |  |
| `public_id` | `string` |  |
| `related_changes` | `array` |  |
| `relation_chain` | `array` |  |
| `restack_state` | `string` |  |
| `review_summary` | `array` |  |
| `stack` | `mixed` |  |
| `status` | `string` |  |
| `sync` | `array` |  |
| `target` | `array` |  |
| `target_advanced` | `bool` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VcChange record (throws on error).
$vc_change = $client->VcChange()->load(["id" => "vc_change_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of VcChange entities, one per record (throws on error).
$vc_changes = $client->VcChange()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### VcChangeGroup

Create an instance: `$vc_change_group = $client->VcChangeGroup();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes` | `array` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `status` | `string` |  |
| `title` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VcChangeGroup record (throws on error).
$vc_change_group = $client->VcChangeGroup()->load(["id" => "vc_change_group_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of VcChangeGroup entities, one per record (throws on error).
$vc_change_groups = $client->VcChangeGroup()->list(["organization_id" => "example", "repo_id" => "example"]);
```

#### Example: Create

```php
$vc_change_group = $client->VcChangeGroup()->create([
    "organization_id" => null, // string
    "repo_id" => null, // string
    "name" => null, // string
]);
```


### VcFile

Create an instance: `$vc_file = $client->VcFile();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paths` | `array` |  |
| `truncated` | `bool` |  |

#### Example: List

```php
// list() returns an array of VcFile entities, one per record (throws on error).
$vc_files = $client->VcFile()->list(["organization_id" => "example", "repo_id" => "example", "ref" => "example"]);
```


### VcMergeQueue

Create an instance: `$vc_merge_queue = $client->VcMergeQueue();`

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
| `analytics` | `array` | Queue performance for the reporting window. |
| `id` | `string` |  |
| `policy` | `array` |  |
| `queue` | `array` |  |
| `target_branches` | `array` | Bookmark names for the target picker. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VcMergeQueue record (throws on error).
$vc_merge_queue = $client->VcMergeQueue()->load(["id" => "vc_merge_queue_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of VcMergeQueue entities, one per record (throws on error).
$vc_merge_queues = $client->VcMergeQueue()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### VcStack

Create an instance: `$vc_stack = $client->VcStack();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias_ref_name` | `mixed` |  |
| `changes` | `array` |  |
| `code` | `string` |  |
| `id` | `string` |  |
| `landing` | `array` | Compact landing state for the Stack CLI. |
| `member_count` | `int` |  |
| `name` | `mixed` |  |
| `ref_name` | `string` |  |
| `status` | `string` |  |
| `tip_change_number` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VcStack record (throws on error).
$vc_stack = $client->VcStack()->load(["id" => "vc_stack_id", "organization_id" => "organization_id", "repo_id" => "repo_id"]);
```

#### Example: List

```php
// list() returns an array of VcStack entities, one per record (throws on error).
$vc_stacks = $client->VcStack()->list(["organization_id" => "example", "repo_id" => "example"]);
```


### VcsNode

Create an instance: `$vcs_node = $client->VcsNode();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `mixed` |  |
| `account_id` | `mixed` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `mixed` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `mixed` |  |
| `installed_at_label` | `mixed` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `array` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `array` |  |
| `status` | `string` |  |
| `suspended_at` | `mixed` |  |
| `suspended_at_label` | `mixed` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `mixed` |  |

#### Example: List

```php
// list() returns an array of VcsNode entities, one per record (throws on error).
$vcs_nodes = $client->VcsNode()->list(["organization_id" => "example"]);
```


### VcsSetting

Create an instance: `$vcs_setting = $client->VcsSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `array` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `array` |  |
| `sandbox_regions` | `array` |  |

#### Example: List

```php
// list() returns an array of VcsSetting entities, one per record (throws on error).
$vcs_settings = $client->VcsSetting()->list(["organization_id" => "example"]);
```


### VerificationProjectCredential

Create an instance: `$verification_project_credential = $client->VerificationProjectCredential();`

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
| `browser_authentication` | `mixed` |  |
| `browser_session` | `string` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `mixed` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | Select the Composal-managed Google test account when available. |
| `configured` | `bool` |  |
| `cookies` | `string` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `array` |  |
| `description` | `mixed` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `array` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `mixed` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `mixed` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` |  |
| `login_url` | `string` | Optional sign-in path or URL. |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `string` |  |
| `oidc` | `array` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `remove_browser_authentication` | `bool` |  |
| `remove_totp` | `bool` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `mixed` |  |
| `status` | `string` |  |
| `totp_secret` | `string` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VerificationProjectCredential record (throws on error).
$verification_project_credential = $client->VerificationProjectCredential()->load(["id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of VerificationProjectCredential entities, one per record (throws on error).
$verification_project_credentials = $client->VerificationProjectCredential()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$verification_project_credential = $client->VerificationProjectCredential()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "login_method" => null, // string
    "name" => null, // string
]);
```


### VerificationProjectPersona

Create an instance: `$verification_project_persona = $client->VerificationProjectPersona();`

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
| `archived_at` | `mixed` |  |
| `capabilities` | `mixed` |  |
| `created_at` | `string` |  |
| `credential_id` | `mixed` | The credential this persona signs in with. |
| `goals` | `mixed` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VerificationProjectPersona record (throws on error).
$verification_project_persona = $client->VerificationProjectPersona()->load(["id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of VerificationProjectPersona entities, one per record (throws on error).
$verification_project_personas = $client->VerificationProjectPersona()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$verification_project_persona = $client->VerificationProjectPersona()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "name" => null, // string
    "role" => null, // string
]);
```


### VerificationProjectRun

Create an instance: `$verification_project_run = $client->VerificationProjectRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `mixed` |  |
| `approved_digest` | `mixed` |  |
| `archived_at` | `mixed` |  |
| `available_tests` | `array` |  |
| `can_archive` | `bool` |  |
| `can_restore` | `bool` |  |
| `can_start_another_run` | `bool` |  |
| `cleanup_state` | `string` |  |
| `concurrency` | `int` |  |
| `created_at` | `string` |  |
| `creator_name` | `mixed` |  |
| `definition_mode` | `string` |  |
| `environment_id` | `mixed` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `max_seconds` | `int` |  |
| `outcome` | `mixed` |  |
| `permissions` | `array` |  |
| `plan_digest` | `mixed` |  |
| `preparation_error_code` | `mixed` |  |
| `progress` | `array` |  |
| `project` | `array` |  |
| `project_id` | `string` |  |
| `pull_request` | `mixed` |  |
| `queued_at` | `mixed` |  |
| `run` | `array` |  |
| `run_plan_id` | `mixed` |  |
| `scenario_runs` | `array` |  |
| `source_run_id` | `mixed` |  |
| `source_versions` | `mixed` |  |
| `start_when_prepared` | `bool` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` |  |
| `target_snapshot` | `array` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences_snapshot` | `array` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VerificationProjectRun record (throws on error).
$verification_project_run = $client->VerificationProjectRun()->load(["id" => "verification_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of VerificationProjectRun entities, one per record (throws on error).
$verification_project_runs = $client->VerificationProjectRun()->list(["organization_id" => "example", "project_id" => "example"]);
```


### VerificationProjectScenario

Create an instance: `$verification_project_scenario = $client->VerificationProjectScenario();`

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
| `actors` | `array` |  |
| `allowed_actions` | `string` |  |
| `archived_at` | `mixed` |  |
| `cleanup` | `array` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` |  |
| `dependencies` | `array` |  |
| `fixtures` | `array` | Files upload steps choose, ordered by name. |
| `health` | `array` |  |
| `id` | `string` |  |
| `identity_probe` | `mixed` |  |
| `if` | `mixed` | A documented subset of Actions expressions. |
| `labels` | `array` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `mixed` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `on` | `mixed` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `array` |  |
| `persona_id` | `string` |  |
| `primary_actor` | `mixed` |  |
| `project_id` | `string` |  |
| `selectable_for_run` | `bool` |  |
| `starting_conditions` | `mixed` |  |
| `steps` | `array` |  |
| `triggers` | `array` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VerificationProjectScenario record (throws on error).
$verification_project_scenario = $client->VerificationProjectScenario()->load(["id" => "verification_project_scenario_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of VerificationProjectScenario entities, one per record (throws on error).
$verification_project_scenarios = $client->VerificationProjectScenario()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### Example: Create

```php
$verification_project_scenario = $client->VerificationProjectScenario()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "name" => null, // string
]);
```


### VerifyAppDomain

Create an instance: `$verify_app_domain = $client->VerifyAppDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```php
$verify_app_domain = $client->VerifyAppDomain()->create([
    "app_id" => null, // string
    "id" => null, // string
]);
```


### VerifyBrowserSession

Create an instance: `$verify_browser_session = $client->VerifyBrowserSession();`

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
| `viewer_url` | `mixed` | Owner-only bearer link. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VerifyBrowserSession record (throws on error).
$verify_browser_session = $client->VerifyBrowserSession()->load(["id" => "verify_browser_session_id", "organization_id" => "organization_id"]);
```

#### Example: Create

```php
$verify_browser_session = $client->VerifyBrowserSession()->create([
    "organization_id" => null, // string
    "project_id" => null, // string
    "url" => null, // string
]);
```


### VerifyEmailVerification

Create an instance: `$verify_email_verification = $client->VerifyEmailVerification();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of VerifyEmailVerification entities, one per record (throws on error).
$verify_email_verifications = $client->VerifyEmailVerification()->list();
```


### VerifySignalIntegration

Create an instance: `$verify_signal_integration = $client->VerifySignalIntegration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token_stored` | `bool` |  |
| `config` | `array` |  |
| `created_at` | `mixed` |  |
| `failure_message` | `mixed` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `mixed` |  |
| `last_verified_at` | `mixed` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `int` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `int` |  |
| `unmapped_delivery_count` | `int` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `mixed` |  |
| `webhook_secret_stored` | `bool` |  |

#### Example: Create

```php
$verify_signal_integration = $client->VerifySignalIntegration()->create([
    "id" => null, // string
    "organization_id" => null, // string
]);
```


### VerifyStaticSiteDomain

Create an instance: `$verify_static_site_domain = $client->VerifyStaticSiteDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `mixed` |  |
| `app_service_id` | `mixed` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `mixed` |  |
| `hosted_app_id` | `mixed` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `mixed` |  |
| `record_name` | `mixed` |  |
| `record_type` | `mixed` |  |
| `record_value` | `mixed` |  |
| `redirect_to` | `mixed` |  |
| `static_site_id` | `mixed` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Create

```php
$verify_static_site_domain = $client->VerifyStaticSiteDomain()->create([
    "id" => null, // string
    "static_site_id" => null, // string
]);
```


### VersionLog

Create an instance: `$version_log = $client->VersionLog();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `string` |  |
| `failure_phase` | `mixed` |  |
| `id` | `string` |  |
| `image_digest` | `mixed` |  |
| `image_reference` | `mixed` |  |
| `installer_version` | `string` |  |
| `ready_at` | `mixed` |  |
| `receipt` | `mixed` |  |
| `safe_error` | `mixed` |  |
| `started_at` | `mixed` |  |
| `status` | `string` |  |

#### Example: List

```php
// list() returns an array of VersionLog entities, one per record (throws on error).
$version_logs = $client->VersionLog()->list(["binary_id" => "example", "organization_id" => "example", "version_id" => "example", "project_id" => "example"]);
```


### WaitlistApplication

Create an instance: `$waitlist_application = $client->WaitlistApplication();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$waitlist_application = $client->WaitlistApplication()->create([
]);
```


### WebBotAuth

Create an instance: `$web_bot_auth = $client->WebBotAuth();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string` |  |
| `origin` | `string` |  |
| `signatures` | `array` |  |

#### Example: Create

```php
$web_bot_auth = $client->WebBotAuth()->create([
    "origin" => null, // string
]);
```


### WebhookGitlab

Create an instance: `$webhook_gitlab = $client->WebhookGitlab();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStep

Create an instance: `$workflow_run_step = $client->WorkflowRunStep();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStopNotice

Create an instance: `$workflow_run_stop_notice = $client->WorkflowRunStopNotice();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |


### WorkflowTriggerSkipped

Create an instance: `$workflow_trigger_skipped = $client->WorkflowTriggerSkipped();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceActivity

Create an instance: `$workspace_activity = $client->WorkspaceActivity();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `live_activity` | `array` |  |
| `recent_items` | `array` |  |
| `unresolved_notification_count` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WorkspaceActivity record (throws on error).
$workspace_activity = $client->WorkspaceActivity()->load(["organization_id" => "organization_id"]);
```


### WorkspaceActivityNotification

Create an instance: `$workspace_activity_notification = $client->WorkspaceActivityNotification();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceSpace

Create an instance: `$workspace_space = $client->WorkspaceSpace();`

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
| `description` | `mixed` |  |
| `hidden` | `bool` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `import_status` | `mixed` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `position` | `mixed` |  |
| `repository_id` | `string` |  |
| `repository_slug` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WorkspaceSpace record (throws on error).
$workspace_space = $client->WorkspaceSpace()->load(["id" => "workspace_space_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of WorkspaceSpace entities, one per record (throws on error).
$workspace_spaces = $client->WorkspaceSpace()->list(["organization_id" => "example"]);
```

#### Example: Create

```php
$workspace_space = $client->WorkspaceSpace()->create([
    "organization_id" => null, // string
    "icon_name" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### WorkspaceSpacePreference

Create an instance: `$workspace_space_preference = $client->WorkspaceSpacePreference();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `preferences` | `array` |  |
| `spaces` | `array` |  |

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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── composal_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`composal_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$agentoperation = $client->AgentOperation();
$agentoperation->load(["agent_id" => "example", "id" => "example_id", "organization_id" => "example"]);

// $agentoperation->data_get() now returns the agentoperation data from the last load
// $agentoperation->match_get() returns the last match criteria
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
