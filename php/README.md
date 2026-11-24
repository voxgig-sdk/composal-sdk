# Composal PHP SDK



The PHP SDK for the Composal API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Agent()` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List agent records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $agents = $client->Agent()->list(["organization_id" => "example"]);
    foreach ($agents as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["attention"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
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

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Agent record.
$created = $client->Agent()->create(["organization_id" => "example_organization_id", "name" => "example_name"]);

// Remove
$client->Agent()->remove(["id" => $created->data_get()["id"], "organization_id" => "example_organization_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $pageprojectrun = $client->PageProjectRun()->load(["id" => "example_id", "organization_id" => "example", "project_id" => "example"]);
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
    "entity" => ["page_project_run" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$pageprojectrun = $client->PageProjectRun()->load(["id" => "test01", "organization_id" => "example", "project_id" => "example"]);
print_r($pageprojectrun->data_get());
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
| `Agent` | `($data): AgentEntity` | Create an Agent entity instance. |
| `AgentAttachment` | `($data): AgentAttachmentEntity` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `($data): AgentAutomationEntity` | Create an AgentAutomation entity instance. |
| `AgentAvatar` | `($data): AgentAvatarEntity` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `($data): AgentCommandEntity` | Create an AgentCommand entity instance. |
| `AgentComputer` | `($data): AgentComputerEntity` | Create an AgentComputer entity instance. |
| `AgentConnection` | `($data): AgentConnectionEntity` | Create an AgentConnection entity instance. |
| `AgentControlFlow` | `($data): AgentControlFlowEntity` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `($data): AgentCoordinationEntity` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `($data): AgentEmailEntity` | Create an AgentEmail entity instance. |
| `AgentFile` | `($data): AgentFileEntity` | Create an AgentFile entity instance. |
| `AgentInput` | `($data): AgentInputEntity` | Create an AgentInput entity instance. |
| `AgentIntegration` | `($data): AgentIntegrationEntity` | Create an AgentIntegration entity instance. |
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
| `AgentRepository` | `($data): AgentRepositoryEntity` | Create an AgentRepository entity instance. |
| `AgentResource` | `($data): AgentResourceEntity` | Create an AgentResource entity instance. |
| `AgentRoutine` | `($data): AgentRoutineEntity` | Create an AgentRoutine entity instance. |
| `AgentRun` | `($data): AgentRunEntity` | Create an AgentRun entity instance. |
| `AgentRuntime` | `($data): AgentRuntimeEntity` | Create an AgentRuntime entity instance. |
| `AgentSetting` | `($data): AgentSettingEntity` | Create an AgentSetting entity instance. |
| `AgentSharing` | `($data): AgentSharingEntity` | Create an AgentSharing entity instance. |
| `AgentSite` | `($data): AgentSiteEntity` | Create an AgentSite entity instance. |
| `AgentSkill` | `($data): AgentSkillEntity` | Create an AgentSkill entity instance. |
| `AgentSlack` | `($data): AgentSlackEntity` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `($data): AgentSubagentEntity` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `($data): AgentSubscriptionEntity` | Create an AgentSubscription entity instance. |
| `AgentTeammate` | `($data): AgentTeammateEntity` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `($data): AgentTerminalEntity` | Create an AgentTerminal entity instance. |
| `AgentThread` | `($data): AgentThreadEntity` | Create an AgentThread entity instance. |
| `AgentTool` | `($data): AgentToolEntity` | Create an AgentTool entity instance. |
| `AgentVerifyProject` | `($data): AgentVerifyProjectEntity` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `($data): AgentWaitEntity` | Create an AgentWait entity instance. |
| `AgentWebhook` | `($data): AgentWebhookEntity` | Create an AgentWebhook entity instance. |
| `AgentWork` | `($data): AgentWorkEntity` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `($data): AgentWorkflowEntity` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `($data): AgentWorkflowProposalEntity` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `($data): AgentWorkflowRunEntity` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `($data): AgentWorkflowTriggerEntity` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `($data): AgentWorkspaceEntity` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `($data): AgentWritePermissionEntity` | Create an AgentWritePermission entity instance. |
| `AllocationLog` | `($data): AllocationLogEntity` | Create an AllocationLog entity instance. |
| `App` | `($data): AppEntity` | Create an App entity instance. |
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
| `AttachmentPart` | `($data): AttachmentPartEntity` | Create an AttachmentPart entity instance. |
| `AutomationEvent` | `($data): AutomationEventEntity` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `($data): AutomationRunEntity` | Create an AutomationRun entity instance. |
| `Binary` | `($data): BinaryEntity` | Create a Binary entity instance. |
| `BinaryVersion` | `($data): BinaryVersionEntity` | Create a BinaryVersion entity instance. |
| `BrowserEgressCandidate` | `($data): BrowserEgressCandidateEntity` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `($data): BrowserSessionEntity` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `($data): BrowserSessionConnectionEntity` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `($data): BrowserSessionControlEntity` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `($data): BrowserSessionEventEntity` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `($data): BrowserSessionMediaEntity` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `($data): BrowserSessionRecordingEntity` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `($data): BrowserSessionScreenshotEntity` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `($data): BrowserSessionTaskEntity` | Create a BrowserSessionTask entity instance. |
| `CatalogSelector` | `($data): CatalogSelectorEntity` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `($data): CdnDeploymentEntity` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `($data): CdnHostnameEntity` | Create a CdnHostname entity instance. |
| `CdnSpace` | `($data): CdnSpaceEntity` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `($data): CdnSpaceObjectEntity` | Create a CdnSpaceObject entity instance. |
| `ConnectionRequest` | `($data): ConnectionRequestEntity` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `($data): ConnectionSourceEntity` | Create a ConnectionSource entity instance. |
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
| `DeploymentDashboardNomad` | `($data): DeploymentDashboardNomadEntity` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentFile` | `($data): DeploymentFileEntity` | Create a DeploymentFile entity instance. |
| `DomainPathRule` | `($data): DomainPathRuleEntity` | Create a DomainPathRule entity instance. |
| `Dream` | `($data): DreamEntity` | Create a Dream entity instance. |
| `Environment` | `($data): EnvironmentEntity` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `($data): EnvironmentDiscoveryRunEntity` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `($data): EnvironmentExplorationEntity` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `($data): EnvironmentFirstRunEntity` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `($data): EnvironmentRevisionEntity` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `($data): EnvironmentSecretBindingEntity` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `($data): EnvironmentTestAccountEntity` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `($data): EvidenceEntity` | Create an Evidence entity instance. |
| `Exploration` | `($data): ExplorationEntity` | Create an Exploration entity instance. |
| `ExplorationMessage` | `($data): ExplorationMessageEntity` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `($data): ExplorationReportEntity` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `($data): ExplorationScenarioEntity` | Create an ExplorationScenario entity instance. |
| `Finding` | `($data): FindingEntity` | Create a Finding entity instance. |
| `GithubConnection` | `($data): GithubConnectionEntity` | Create a GithubConnection entity instance. |
| `HostingAppDomain` | `($data): HostingAppDomainEntity` | Create a HostingAppDomain entity instance. |
| `ImageRepository` | `($data): ImageRepositoryEntity` | Create an ImageRepository entity instance. |
| `Integration` | `($data): IntegrationEntity` | Create an Integration entity instance. |
| `InteractionResponse` | `($data): InteractionResponseEntity` | Create an InteractionResponse entity instance. |
| `Invitation` | `($data): InvitationEntity` | Create an Invitation entity instance. |
| `JourneyVariantReplay` | `($data): JourneyVariantReplayEntity` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `($data): KnowledgeEntity` | Create a Knowledge entity instance. |
| `LocalThreadDelivery` | `($data): LocalThreadDeliveryEntity` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `($data): LocalThreadOperationEntity` | Create a LocalThreadOperation entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `Me` | `($data): MeEntity` | Create a Me entity instance. |
| `MeEmail` | `($data): MeEmailEntity` | Create a MeEmail entity instance. |
| `MeOnboarding` | `($data): MeOnboardingEntity` | Create a MeOnboarding entity instance. |
| `MediaFile` | `($data): MediaFileEntity` | Create a MediaFile entity instance. |
| `Member` | `($data): MemberEntity` | Create a Member entity instance. |
| `Memory` | `($data): MemoryEntity` | Create a Memory entity instance. |
| `MergeRequest` | `($data): MergeRequestEntity` | Create a MergeRequest entity instance. |
| `MessagingConversationMessage` | `($data): MessagingConversationMessageEntity` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `($data): MessagingConversationUploadEntity` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `($data): MetricQueryEntity` | Create a MetricQuery entity instance. |
| `NetworkConnection` | `($data): NetworkConnectionEntity` | Create a NetworkConnection entity instance. |
| `NomadAllocation` | `($data): NomadAllocationEntity` | Create a NomadAllocation entity instance. |
| `NomadLog` | `($data): NomadLogEntity` | Create a NomadLog entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |
| `Page` | `($data): PageEntity` | Create a Page entity instance. |
| `PageAgent` | `($data): PageAgentEntity` | Create a PageAgent entity instance. |
| `PageProjectRun` | `($data): PageProjectRunEntity` | Create a PageProjectRun entity instance. |
| `PagesProjectCredential` | `($data): PagesProjectCredentialEntity` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `($data): PagesProjectPersonaEntity` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `($data): PagesProjectRunEntity` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `($data): PagesProjectScenarioEntity` | Create a PagesProjectScenario entity instance. |
| `PersonalAccessToken` | `($data): PersonalAccessTokenEntity` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `($data): PreviewOperationEntity` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `($data): PreviewProfileSecretBindingEntity` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `($data): PreviewSecretEntity` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `($data): PreviewSharingApprovalEntity` | Create a PreviewSharingApproval entity instance. |
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
| `PullRequestSetting` | `($data): PullRequestSettingEntity` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `($data): PullRequestSettingAddRepositoryEntity` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `($data): PullRequestSettingDetectCommentEntity` | Create a PullRequestSettingDetectComment entity instance. |
| `Recorder` | `($data): RecorderEntity` | Create a Recorder entity instance. |
| `Registry` | `($data): RegistryEntity` | Create a Registry entity instance. |
| `RegistryV2` | `($data): RegistryV2Entity` | Create a RegistryV2 entity instance. |
| `RelayAgentLocalThread` | `($data): RelayAgentLocalThreadEntity` | Create a RelayAgentLocalThread entity instance. |
| `ReportReplay` | `($data): ReportReplayEntity` | Create a ReportReplay entity instance. |
| `ReportScenario` | `($data): ReportScenarioEntity` | Create a ReportScenario entity instance. |
| `RunScenarioRun` | `($data): RunScenarioRunEntity` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `($data): RunScheduleOptionEntity` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `($data): RunSearchEntity` | Create a RunSearch entity instance. |
| `RunUpdate` | `($data): RunUpdateEntity` | Create a RunUpdate entity instance. |
| `ScenarioRevision` | `($data): ScenarioRevisionEntity` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `($data): ScenarioRunLessonEntity` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `($data): ScenarioRunScenarioEditEntity` | Create a ScenarioRunScenarioEdit entity instance. |
| `ServiceEndpoint` | `($data): ServiceEndpointEntity` | Create a ServiceEndpoint entity instance. |
| `SitePreview` | `($data): SitePreviewEntity` | Create a SitePreview entity instance. |
| `SlackChannel` | `($data): SlackChannelEntity` | Create a SlackChannel entity instance. |
| `SparkAgentLocalThread` | `($data): SparkAgentLocalThreadEntity` | Create a SparkAgentLocalThread entity instance. |
| `StaticSite` | `($data): StaticSiteEntity` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `($data): StaticSiteDeploymentEntity` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `($data): StaticSiteDomainEntity` | Create a StaticSiteDomain entity instance. |
| `SubscriptionModel` | `($data): SubscriptionModelEntity` | Create a SubscriptionModel entity instance. |
| `ThreadPreview` | `($data): ThreadPreviewEntity` | Create a ThreadPreview entity instance. |
| `VerificationProjectCredential` | `($data): VerificationProjectCredentialEntity` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `($data): VerificationProjectPersonaEntity` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `($data): VerificationProjectRunEntity` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `($data): VerificationProjectScenarioEntity` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `($data): VerifyAppDomainEntity` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `($data): VerifyBrowserSessionEntity` | Create a VerifyBrowserSession entity instance. |
| `VerifyStaticSiteDomain` | `($data): VerifyStaticSiteDomainEntity` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `($data): VersionLogEntity` | Create a VersionLog entity instance. |
| `WebBotAuth` | `($data): WebBotAuthEntity` | Create a WebBotAuth entity instance. |
| `WorkflowRunStep` | `($data): WorkflowRunStepEntity` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `($data): WorkflowRunStopNoticeEntity` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `($data): WorkflowTriggerSkippedEntity` | Create a WorkflowTriggerSkipped entity instance. |

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
// load() returns the ENTITY — call data_get() for the AgentConnection record (throws on error).
$agent_connection = $client->AgentConnection()->load(["id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of AgentConnection entities, one per record (throws on error).
$agent_connections = $client->AgentConnection()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_connection = $client->AgentConnection()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "agent_card_url" => null, // string
    "auth_scheme" => null, // string
    "name" => null, // string
]);
```


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
// list() returns an array of AgentIntegration entities, one per record (throws on error).
$agent_integrations = $client->AgentIntegration()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_integration = $client->AgentIntegration()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "connection_id" => null, // string
    "enabled" => null, // bool
    "generation" => null, // int
]);
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
// list() returns an array of AgentSite entities, one per record (throws on error).
$agent_sites = $client->AgentSite()->list(["agent_id" => "example", "organization_id" => "example"]);
```


### AgentSkill

Create an instance: `$agent_skill = $client->AgentSkill();`

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
// list() returns an array of AgentSkill entities, one per record (throws on error).
$agent_skills = $client->AgentSkill()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_skill = $client->AgentSkill()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
    "enabled" => null, // bool
    "name" => null, // string
    "version" => null, // string
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
// list() returns an array of AgentThread entities, one per record (throws on error).
$agent_threads = $client->AgentThread()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### Example: Create

```php
$agent_thread = $client->AgentThread()->create([
    "agent_id" => null, // string
    "organization_id" => null, // string
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


### DeploymentDashboardNomad

Create an instance: `$deployment_dashboard_nomad = $client->DeploymentDashboardNomad();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |


### DeploymentFile

Create an instance: `$deployment_file = $client->DeploymentFile();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


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
$pageprojectrun = $client->PageProjectRun();
$pageprojectrun->load(["id" => "example_id", "organization_id" => "example", "project_id" => "example"]);

// $pageprojectrun->data_get() now returns the pageprojectrun data from the last load
// $pageprojectrun->match_get() returns the last match criteria
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
