# Composal PHP SDK Reference

Complete API reference for the Composal PHP SDK.


## ComposalSDK

### Constructor

```php
require_once __DIR__ . '/composal_sdk.php';

$client = new ComposalSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ComposalSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ComposalSDK::test();
```


### Instance Methods

#### `Agent($data = null)`

Create a new `AgentEntity` instance. Pass `null` for no initial data.

#### `AgentAttachment($data = null)`

Create a new `AgentAttachmentEntity` instance. Pass `null` for no initial data.

#### `AgentAutomation($data = null)`

Create a new `AgentAutomationEntity` instance. Pass `null` for no initial data.

#### `AgentAvatar($data = null)`

Create a new `AgentAvatarEntity` instance. Pass `null` for no initial data.

#### `AgentCommand($data = null)`

Create a new `AgentCommandEntity` instance. Pass `null` for no initial data.

#### `AgentComputer($data = null)`

Create a new `AgentComputerEntity` instance. Pass `null` for no initial data.

#### `AgentConnection($data = null)`

Create a new `AgentConnectionEntity` instance. Pass `null` for no initial data.

#### `AgentControlFlow($data = null)`

Create a new `AgentControlFlowEntity` instance. Pass `null` for no initial data.

#### `AgentCoordination($data = null)`

Create a new `AgentCoordinationEntity` instance. Pass `null` for no initial data.

#### `AgentEmail($data = null)`

Create a new `AgentEmailEntity` instance. Pass `null` for no initial data.

#### `AgentFile($data = null)`

Create a new `AgentFileEntity` instance. Pass `null` for no initial data.

#### `AgentInput($data = null)`

Create a new `AgentInputEntity` instance. Pass `null` for no initial data.

#### `AgentIntegration($data = null)`

Create a new `AgentIntegrationEntity` instance. Pass `null` for no initial data.

#### `AgentInteraction($data = null)`

Create a new `AgentInteractionEntity` instance. Pass `null` for no initial data.

#### `AgentLibrary($data = null)`

Create a new `AgentLibraryEntity` instance. Pass `null` for no initial data.

#### `AgentManager($data = null)`

Create a new `AgentManagerEntity` instance. Pass `null` for no initial data.

#### `AgentManagerChoice($data = null)`

Create a new `AgentManagerChoiceEntity` instance. Pass `null` for no initial data.

#### `AgentMarketplace($data = null)`

Create a new `AgentMarketplaceEntity` instance. Pass `null` for no initial data.

#### `AgentMarketplaceShared($data = null)`

Create a new `AgentMarketplaceSharedEntity` instance. Pass `null` for no initial data.

#### `AgentMissionControl($data = null)`

Create a new `AgentMissionControlEntity` instance. Pass `null` for no initial data.

#### `AgentOperation($data = null)`

Create a new `AgentOperationEntity` instance. Pass `null` for no initial data.

#### `AgentProvisioning($data = null)`

Create a new `AgentProvisioningEntity` instance. Pass `null` for no initial data.

#### `AgentPullRequest($data = null)`

Create a new `AgentPullRequestEntity` instance. Pass `null` for no initial data.

#### `AgentQuestion($data = null)`

Create a new `AgentQuestionEntity` instance. Pass `null` for no initial data.

#### `AgentRepository($data = null)`

Create a new `AgentRepositoryEntity` instance. Pass `null` for no initial data.

#### `AgentResource($data = null)`

Create a new `AgentResourceEntity` instance. Pass `null` for no initial data.

#### `AgentRoutine($data = null)`

Create a new `AgentRoutineEntity` instance. Pass `null` for no initial data.

#### `AgentRun($data = null)`

Create a new `AgentRunEntity` instance. Pass `null` for no initial data.

#### `AgentRuntime($data = null)`

Create a new `AgentRuntimeEntity` instance. Pass `null` for no initial data.

#### `AgentSetting($data = null)`

Create a new `AgentSettingEntity` instance. Pass `null` for no initial data.

#### `AgentSharing($data = null)`

Create a new `AgentSharingEntity` instance. Pass `null` for no initial data.

#### `AgentSite($data = null)`

Create a new `AgentSiteEntity` instance. Pass `null` for no initial data.

#### `AgentSkill($data = null)`

Create a new `AgentSkillEntity` instance. Pass `null` for no initial data.

#### `AgentSlack($data = null)`

Create a new `AgentSlackEntity` instance. Pass `null` for no initial data.

#### `AgentSubagent($data = null)`

Create a new `AgentSubagentEntity` instance. Pass `null` for no initial data.

#### `AgentSubscription($data = null)`

Create a new `AgentSubscriptionEntity` instance. Pass `null` for no initial data.

#### `AgentTeammate($data = null)`

Create a new `AgentTeammateEntity` instance. Pass `null` for no initial data.

#### `AgentTerminal($data = null)`

Create a new `AgentTerminalEntity` instance. Pass `null` for no initial data.

#### `AgentThread($data = null)`

Create a new `AgentThreadEntity` instance. Pass `null` for no initial data.

#### `AgentTool($data = null)`

Create a new `AgentToolEntity` instance. Pass `null` for no initial data.

#### `AgentVerifyProject($data = null)`

Create a new `AgentVerifyProjectEntity` instance. Pass `null` for no initial data.

#### `AgentWait($data = null)`

Create a new `AgentWaitEntity` instance. Pass `null` for no initial data.

#### `AgentWebhook($data = null)`

Create a new `AgentWebhookEntity` instance. Pass `null` for no initial data.

#### `AgentWork($data = null)`

Create a new `AgentWorkEntity` instance. Pass `null` for no initial data.

#### `AgentWorkflow($data = null)`

Create a new `AgentWorkflowEntity` instance. Pass `null` for no initial data.

#### `AgentWorkflowProposal($data = null)`

Create a new `AgentWorkflowProposalEntity` instance. Pass `null` for no initial data.

#### `AgentWorkflowRun($data = null)`

Create a new `AgentWorkflowRunEntity` instance. Pass `null` for no initial data.

#### `AgentWorkflowTrigger($data = null)`

Create a new `AgentWorkflowTriggerEntity` instance. Pass `null` for no initial data.

#### `AgentWorkspace($data = null)`

Create a new `AgentWorkspaceEntity` instance. Pass `null` for no initial data.

#### `AgentWritePermission($data = null)`

Create a new `AgentWritePermissionEntity` instance. Pass `null` for no initial data.

#### `AllocationLog($data = null)`

Create a new `AllocationLogEntity` instance. Pass `null` for no initial data.

#### `App($data = null)`

Create a new `AppEntity` instance. Pass `null` for no initial data.

#### `AppCdn($data = null)`

Create a new `AppCdnEntity` instance. Pass `null` for no initial data.

#### `AppConfigVariable($data = null)`

Create a new `AppConfigVariableEntity` instance. Pass `null` for no initial data.

#### `AppDataResource($data = null)`

Create a new `AppDataResourceEntity` instance. Pass `null` for no initial data.

#### `AppDeploy($data = null)`

Create a new `AppDeployEntity` instance. Pass `null` for no initial data.

#### `AppDeployment($data = null)`

Create a new `AppDeploymentEntity` instance. Pass `null` for no initial data.

#### `AppDeploymentOperation($data = null)`

Create a new `AppDeploymentOperationEntity` instance. Pass `null` for no initial data.

#### `AppDeploymentRollback($data = null)`

Create a new `AppDeploymentRollbackEntity` instance. Pass `null` for no initial data.

#### `AppEnvironment($data = null)`

Create a new `AppEnvironmentEntity` instance. Pass `null` for no initial data.

#### `AppLocation($data = null)`

Create a new `AppLocationEntity` instance. Pass `null` for no initial data.

#### `AppMetric($data = null)`

Create a new `AppMetricEntity` instance. Pass `null` for no initial data.

#### `AppPreview($data = null)`

Create a new `AppPreviewEntity` instance. Pass `null` for no initial data.

#### `AppPreviewProfile($data = null)`

Create a new `AppPreviewProfileEntity` instance. Pass `null` for no initial data.

#### `AppRun($data = null)`

Create a new `AppRunEntity` instance. Pass `null` for no initial data.

#### `AppSecret($data = null)`

Create a new `AppSecretEntity` instance. Pass `null` for no initial data.

#### `AppService($data = null)`

Create a new `AppServiceEntity` instance. Pass `null` for no initial data.

#### `AppServiceBinding($data = null)`

Create a new `AppServiceBindingEntity` instance. Pass `null` for no initial data.

#### `AppServicePlacement($data = null)`

Create a new `AppServicePlacementEntity` instance. Pass `null` for no initial data.

#### `AppStorageResource($data = null)`

Create a new `AppStorageResourceEntity` instance. Pass `null` for no initial data.

#### `AttachmentPart($data = null)`

Create a new `AttachmentPartEntity` instance. Pass `null` for no initial data.

#### `AutomationEvent($data = null)`

Create a new `AutomationEventEntity` instance. Pass `null` for no initial data.

#### `AutomationRun($data = null)`

Create a new `AutomationRunEntity` instance. Pass `null` for no initial data.

#### `Binary($data = null)`

Create a new `BinaryEntity` instance. Pass `null` for no initial data.

#### `BinaryVersion($data = null)`

Create a new `BinaryVersionEntity` instance. Pass `null` for no initial data.

#### `BrowserEgressCandidate($data = null)`

Create a new `BrowserEgressCandidateEntity` instance. Pass `null` for no initial data.

#### `BrowserSession($data = null)`

Create a new `BrowserSessionEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionConnection($data = null)`

Create a new `BrowserSessionConnectionEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionControl($data = null)`

Create a new `BrowserSessionControlEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionEvent($data = null)`

Create a new `BrowserSessionEventEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionMedia($data = null)`

Create a new `BrowserSessionMediaEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionRecording($data = null)`

Create a new `BrowserSessionRecordingEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionScreenshot($data = null)`

Create a new `BrowserSessionScreenshotEntity` instance. Pass `null` for no initial data.

#### `BrowserSessionTask($data = null)`

Create a new `BrowserSessionTaskEntity` instance. Pass `null` for no initial data.

#### `CatalogSelector($data = null)`

Create a new `CatalogSelectorEntity` instance. Pass `null` for no initial data.

#### `CdnDeployment($data = null)`

Create a new `CdnDeploymentEntity` instance. Pass `null` for no initial data.

#### `CdnHostname($data = null)`

Create a new `CdnHostnameEntity` instance. Pass `null` for no initial data.

#### `CdnSpace($data = null)`

Create a new `CdnSpaceEntity` instance. Pass `null` for no initial data.

#### `CdnSpaceObject($data = null)`

Create a new `CdnSpaceObjectEntity` instance. Pass `null` for no initial data.

#### `ConnectionRequest($data = null)`

Create a new `ConnectionRequestEntity` instance. Pass `null` for no initial data.

#### `ConnectionSource($data = null)`

Create a new `ConnectionSourceEntity` instance. Pass `null` for no initial data.

#### `CoordinationWait($data = null)`

Create a new `CoordinationWaitEntity` instance. Pass `null` for no initial data.

#### `CredentialSignInCheck($data = null)`

Create a new `CredentialSignInCheckEntity` instance. Pass `null` for no initial data.

#### `DataResourceRotateCredential($data = null)`

Create a new `DataResourceRotateCredentialEntity` instance. Pass `null` for no initial data.

#### `DeepScan($data = null)`

Create a new `DeepScanEntity` instance. Pass `null` for no initial data.

#### `DeepScanFinding($data = null)`

Create a new `DeepScanFindingEntity` instance. Pass `null` for no initial data.

#### `DeepScanFlow($data = null)`

Create a new `DeepScanFlowEntity` instance. Pass `null` for no initial data.

#### `DeepScanMappedFlow($data = null)`

Create a new `DeepScanMappedFlowEntity` instance. Pass `null` for no initial data.

#### `DeepScanOption($data = null)`

Create a new `DeepScanOptionEntity` instance. Pass `null` for no initial data.

#### `DemoShare($data = null)`

Create a new `DemoShareEntity` instance. Pass `null` for no initial data.

#### `DemoShareSegment($data = null)`

Create a new `DemoShareSegmentEntity` instance. Pass `null` for no initial data.

#### `DeploymentDashboardNomad($data = null)`

Create a new `DeploymentDashboardNomadEntity` instance. Pass `null` for no initial data.

#### `DeploymentFile($data = null)`

Create a new `DeploymentFileEntity` instance. Pass `null` for no initial data.

#### `DomainPathRule($data = null)`

Create a new `DomainPathRuleEntity` instance. Pass `null` for no initial data.

#### `Dream($data = null)`

Create a new `DreamEntity` instance. Pass `null` for no initial data.

#### `Environment($data = null)`

Create a new `EnvironmentEntity` instance. Pass `null` for no initial data.

#### `EnvironmentDiscoveryRun($data = null)`

Create a new `EnvironmentDiscoveryRunEntity` instance. Pass `null` for no initial data.

#### `EnvironmentExploration($data = null)`

Create a new `EnvironmentExplorationEntity` instance. Pass `null` for no initial data.

#### `EnvironmentFirstRun($data = null)`

Create a new `EnvironmentFirstRunEntity` instance. Pass `null` for no initial data.

#### `EnvironmentRevision($data = null)`

Create a new `EnvironmentRevisionEntity` instance. Pass `null` for no initial data.

#### `EnvironmentSecretBinding($data = null)`

Create a new `EnvironmentSecretBindingEntity` instance. Pass `null` for no initial data.

#### `EnvironmentTestAccount($data = null)`

Create a new `EnvironmentTestAccountEntity` instance. Pass `null` for no initial data.

#### `Evidence($data = null)`

Create a new `EvidenceEntity` instance. Pass `null` for no initial data.

#### `Exploration($data = null)`

Create a new `ExplorationEntity` instance. Pass `null` for no initial data.

#### `ExplorationMessage($data = null)`

Create a new `ExplorationMessageEntity` instance. Pass `null` for no initial data.

#### `ExplorationReport($data = null)`

Create a new `ExplorationReportEntity` instance. Pass `null` for no initial data.

#### `ExplorationScenario($data = null)`

Create a new `ExplorationScenarioEntity` instance. Pass `null` for no initial data.

#### `Finding($data = null)`

Create a new `FindingEntity` instance. Pass `null` for no initial data.

#### `GithubConnection($data = null)`

Create a new `GithubConnectionEntity` instance. Pass `null` for no initial data.

#### `HostingAppDomain($data = null)`

Create a new `HostingAppDomainEntity` instance. Pass `null` for no initial data.

#### `ImageRepository($data = null)`

Create a new `ImageRepositoryEntity` instance. Pass `null` for no initial data.

#### `Integration($data = null)`

Create a new `IntegrationEntity` instance. Pass `null` for no initial data.

#### `InteractionResponse($data = null)`

Create a new `InteractionResponseEntity` instance. Pass `null` for no initial data.

#### `Invitation($data = null)`

Create a new `InvitationEntity` instance. Pass `null` for no initial data.

#### `JourneyVariantReplay($data = null)`

Create a new `JourneyVariantReplayEntity` instance. Pass `null` for no initial data.

#### `Knowledge($data = null)`

Create a new `KnowledgeEntity` instance. Pass `null` for no initial data.

#### `LocalThreadDelivery($data = null)`

Create a new `LocalThreadDeliveryEntity` instance. Pass `null` for no initial data.

#### `LocalThreadOperation($data = null)`

Create a new `LocalThreadOperationEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `Me($data = null)`

Create a new `MeEntity` instance. Pass `null` for no initial data.

#### `MeEmail($data = null)`

Create a new `MeEmailEntity` instance. Pass `null` for no initial data.

#### `MeOnboarding($data = null)`

Create a new `MeOnboardingEntity` instance. Pass `null` for no initial data.

#### `MediaFile($data = null)`

Create a new `MediaFileEntity` instance. Pass `null` for no initial data.

#### `Member($data = null)`

Create a new `MemberEntity` instance. Pass `null` for no initial data.

#### `Memory($data = null)`

Create a new `MemoryEntity` instance. Pass `null` for no initial data.

#### `MergeRequest($data = null)`

Create a new `MergeRequestEntity` instance. Pass `null` for no initial data.

#### `MessagingConversationMessage($data = null)`

Create a new `MessagingConversationMessageEntity` instance. Pass `null` for no initial data.

#### `MessagingConversationUpload($data = null)`

Create a new `MessagingConversationUploadEntity` instance. Pass `null` for no initial data.

#### `MetricQuery($data = null)`

Create a new `MetricQueryEntity` instance. Pass `null` for no initial data.

#### `NetworkConnection($data = null)`

Create a new `NetworkConnectionEntity` instance. Pass `null` for no initial data.

#### `NomadAllocation($data = null)`

Create a new `NomadAllocationEntity` instance. Pass `null` for no initial data.

#### `NomadLog($data = null)`

Create a new `NomadLogEntity` instance. Pass `null` for no initial data.

#### `Organization($data = null)`

Create a new `OrganizationEntity` instance. Pass `null` for no initial data.

#### `Page($data = null)`

Create a new `PageEntity` instance. Pass `null` for no initial data.

#### `PageAgent($data = null)`

Create a new `PageAgentEntity` instance. Pass `null` for no initial data.

#### `PageProjectRun($data = null)`

Create a new `PageProjectRunEntity` instance. Pass `null` for no initial data.

#### `PagesProjectCredential($data = null)`

Create a new `PagesProjectCredentialEntity` instance. Pass `null` for no initial data.

#### `PagesProjectPersona($data = null)`

Create a new `PagesProjectPersonaEntity` instance. Pass `null` for no initial data.

#### `PagesProjectRun($data = null)`

Create a new `PagesProjectRunEntity` instance. Pass `null` for no initial data.

#### `PagesProjectScenario($data = null)`

Create a new `PagesProjectScenarioEntity` instance. Pass `null` for no initial data.

#### `PersonalAccessToken($data = null)`

Create a new `PersonalAccessTokenEntity` instance. Pass `null` for no initial data.

#### `PreviewOperation($data = null)`

Create a new `PreviewOperationEntity` instance. Pass `null` for no initial data.

#### `PreviewProfileSecretBinding($data = null)`

Create a new `PreviewProfileSecretBindingEntity` instance. Pass `null` for no initial data.

#### `PreviewSecret($data = null)`

Create a new `PreviewSecretEntity` instance. Pass `null` for no initial data.

#### `PreviewSharingApproval($data = null)`

Create a new `PreviewSharingApprovalEntity` instance. Pass `null` for no initial data.

#### `ProductMapIdentityDecision($data = null)`

Create a new `ProductMapIdentityDecisionEntity` instance. Pass `null` for no initial data.

#### `ProductMapJourney($data = null)`

Create a new `ProductMapJourneyEntity` instance. Pass `null` for no initial data.

#### `ProductMapJourneyReplay($data = null)`

Create a new `ProductMapJourneyReplayEntity` instance. Pass `null` for no initial data.

#### `ProductMapObservation($data = null)`

Create a new `ProductMapObservationEntity` instance. Pass `null` for no initial data.

#### `ProductMapQuestion($data = null)`

Create a new `ProductMapQuestionEntity` instance. Pass `null` for no initial data.

#### `ProductMapState($data = null)`

Create a new `ProductMapStateEntity` instance. Pass `null` for no initial data.

#### `Project($data = null)`

Create a new `ProjectEntity` instance. Pass `null` for no initial data.

#### `ProjectAndroidApk($data = null)`

Create a new `ProjectAndroidApkEntity` instance. Pass `null` for no initial data.

#### `ProjectCodeMap($data = null)`

Create a new `ProjectCodeMapEntity` instance. Pass `null` for no initial data.

#### `ProjectEnvironment($data = null)`

Create a new `ProjectEnvironmentEntity` instance. Pass `null` for no initial data.

#### `ProjectFinding($data = null)`

Create a new `ProjectFindingEntity` instance. Pass `null` for no initial data.

#### `ProjectFixture($data = null)`

Create a new `ProjectFixtureEntity` instance. Pass `null` for no initial data.

#### `ProjectIosApp($data = null)`

Create a new `ProjectIosAppEntity` instance. Pass `null` for no initial data.

#### `ProjectMessagingConversation($data = null)`

Create a new `ProjectMessagingConversationEntity` instance. Pass `null` for no initial data.

#### `ProjectOverviewMetric($data = null)`

Create a new `ProjectOverviewMetricEntity` instance. Pass `null` for no initial data.

#### `ProjectOverviewPullRequest($data = null)`

Create a new `ProjectOverviewPullRequestEntity` instance. Pass `null` for no initial data.

#### `ProjectProductMap($data = null)`

Create a new `ProjectProductMapEntity` instance. Pass `null` for no initial data.

#### `ProjectRecording($data = null)`

Create a new `ProjectRecordingEntity` instance. Pass `null` for no initial data.

#### `ProjectRunPlan($data = null)`

Create a new `ProjectRunPlanEntity` instance. Pass `null` for no initial data.

#### `ProjectRunSchedule($data = null)`

Create a new `ProjectRunScheduleEntity` instance. Pass `null` for no initial data.

#### `ProjectScenarioOption($data = null)`

Create a new `ProjectScenarioOptionEntity` instance. Pass `null` for no initial data.

#### `ProjectScenarioRow($data = null)`

Create a new `ProjectScenarioRowEntity` instance. Pass `null` for no initial data.

#### `ProjectSetting($data = null)`

Create a new `ProjectSettingEntity` instance. Pass `null` for no initial data.

#### `PullRequest($data = null)`

Create a new `PullRequestEntity` instance. Pass `null` for no initial data.

#### `PullRequestSetting($data = null)`

Create a new `PullRequestSettingEntity` instance. Pass `null` for no initial data.

#### `PullRequestSettingAddRepository($data = null)`

Create a new `PullRequestSettingAddRepositoryEntity` instance. Pass `null` for no initial data.

#### `PullRequestSettingDetectComment($data = null)`

Create a new `PullRequestSettingDetectCommentEntity` instance. Pass `null` for no initial data.

#### `Recorder($data = null)`

Create a new `RecorderEntity` instance. Pass `null` for no initial data.

#### `Registry($data = null)`

Create a new `RegistryEntity` instance. Pass `null` for no initial data.

#### `RegistryV2($data = null)`

Create a new `RegistryV2Entity` instance. Pass `null` for no initial data.

#### `RelayAgentLocalThread($data = null)`

Create a new `RelayAgentLocalThreadEntity` instance. Pass `null` for no initial data.

#### `ReportReplay($data = null)`

Create a new `ReportReplayEntity` instance. Pass `null` for no initial data.

#### `ReportScenario($data = null)`

Create a new `ReportScenarioEntity` instance. Pass `null` for no initial data.

#### `RunScenarioRun($data = null)`

Create a new `RunScenarioRunEntity` instance. Pass `null` for no initial data.

#### `RunScheduleOption($data = null)`

Create a new `RunScheduleOptionEntity` instance. Pass `null` for no initial data.

#### `RunSearch($data = null)`

Create a new `RunSearchEntity` instance. Pass `null` for no initial data.

#### `RunUpdate($data = null)`

Create a new `RunUpdateEntity` instance. Pass `null` for no initial data.

#### `ScenarioRevision($data = null)`

Create a new `ScenarioRevisionEntity` instance. Pass `null` for no initial data.

#### `ScenarioRunLesson($data = null)`

Create a new `ScenarioRunLessonEntity` instance. Pass `null` for no initial data.

#### `ScenarioRunScenarioEdit($data = null)`

Create a new `ScenarioRunScenarioEditEntity` instance. Pass `null` for no initial data.

#### `ServiceEndpoint($data = null)`

Create a new `ServiceEndpointEntity` instance. Pass `null` for no initial data.

#### `SitePreview($data = null)`

Create a new `SitePreviewEntity` instance. Pass `null` for no initial data.

#### `SlackChannel($data = null)`

Create a new `SlackChannelEntity` instance. Pass `null` for no initial data.

#### `SparkAgentLocalThread($data = null)`

Create a new `SparkAgentLocalThreadEntity` instance. Pass `null` for no initial data.

#### `StaticSite($data = null)`

Create a new `StaticSiteEntity` instance. Pass `null` for no initial data.

#### `StaticSiteDeployment($data = null)`

Create a new `StaticSiteDeploymentEntity` instance. Pass `null` for no initial data.

#### `StaticSiteDomain($data = null)`

Create a new `StaticSiteDomainEntity` instance. Pass `null` for no initial data.

#### `SubscriptionModel($data = null)`

Create a new `SubscriptionModelEntity` instance. Pass `null` for no initial data.

#### `ThreadPreview($data = null)`

Create a new `ThreadPreviewEntity` instance. Pass `null` for no initial data.

#### `VerificationProjectCredential($data = null)`

Create a new `VerificationProjectCredentialEntity` instance. Pass `null` for no initial data.

#### `VerificationProjectPersona($data = null)`

Create a new `VerificationProjectPersonaEntity` instance. Pass `null` for no initial data.

#### `VerificationProjectRun($data = null)`

Create a new `VerificationProjectRunEntity` instance. Pass `null` for no initial data.

#### `VerificationProjectScenario($data = null)`

Create a new `VerificationProjectScenarioEntity` instance. Pass `null` for no initial data.

#### `VerifyAppDomain($data = null)`

Create a new `VerifyAppDomainEntity` instance. Pass `null` for no initial data.

#### `VerifyBrowserSession($data = null)`

Create a new `VerifyBrowserSessionEntity` instance. Pass `null` for no initial data.

#### `VerifyStaticSiteDomain($data = null)`

Create a new `VerifyStaticSiteDomainEntity` instance. Pass `null` for no initial data.

#### `VersionLog($data = null)`

Create a new `VersionLogEntity` instance. Pass `null` for no initial data.

#### `WebBotAuth($data = null)`

Create a new `WebBotAuthEntity` instance. Pass `null` for no initial data.

#### `WorkflowRunStep($data = null)`

Create a new `WorkflowRunStepEntity` instance. Pass `null` for no initial data.

#### `WorkflowRunStopNotice($data = null)`

Create a new `WorkflowRunStopNoticeEntity` instance. Pass `null` for no initial data.

#### `WorkflowTriggerSkipped($data = null)`

Create a new `WorkflowTriggerSkippedEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ComposalUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AgentEntity

```php
$agent = $client->Agent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `mixed` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `mixed` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `mixed` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `mixed` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `mixed` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `array` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `mixed` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `array` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `mixed` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `mixed` | No |  |
| `preview` | `mixed` | No |  |
| `preview_received_at` | `mixed` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `mixed` | No |  |
| `reply_triage` | `mixed` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Agent()->create([
  "organization_id" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Agent()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Agent()->load(["id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Agent()->remove(["id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentEntity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentAttachmentEntity

```php
$agent_attachment = $client->AgentAttachment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `int` | Yes |  |
| `content_type` | `string` | Yes |  |
| `file_name` | `string` | Yes |  |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentAttachment()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "byte_size" => null, // int
  "content_type" => null, // string
  "file_name" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentAttachmentEntity`

Create a new `AgentAttachmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentAutomationEntity

```php
$agent_automation = $client->AgentAutomation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `definition` | `array` | Yes |  |
| `event_subscriptions` | `array` | Yes |  |
| `event_triggers` | `array` | Yes |  |
| `expected_revision` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `mixed` | Yes |  |
| `schedules` | `array` | Yes |  |
| `version` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentAutomation()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentAutomation()->load(["id" => "agent_automation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentAutomation()->update([
  "id" => "agent_automation_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentAutomationEntity`

Create a new `AgentAutomationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentAvatarEntity

```php
$agent_avatar = $client->AgentAvatar();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentAvatarEntity`

Create a new `AgentAvatarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentCommandEntity

```php
$agent_command = $client->AgentCommand();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `skill_model_visible` | `bool` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentCommand()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentCommandEntity`

Create a new `AgentCommandEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentComputerEntity

```php
$agent_computer = $client->AgentComputer();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentComputerEntity`

Create a new `AgentComputerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentConnectionEntity

```php
$agent_connection = $client->AgentConnection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `connection` | `array` | Yes |  |
| `credential` | `mixed` | No | Write-only outbound key. |
| `error_code` | `mixed` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `mixed` | Yes |  |
| `requester_id` | `string` | Yes |  |
| `retired_at` | `mixed` | Yes |  |
| `revoked_at` | `mixed` | Yes |  |
| `scope_key` | `string` | Yes |  |
| `source_operation_id` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentConnection()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "agent_card_url" => null, // string
  "auth_scheme" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentConnection()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentConnection()->load(["id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AgentConnection()->remove(["id" => "agent_connection_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentConnection()->update([
  "id" => "agent_connection_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentConnectionEntity`

Create a new `AgentConnectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentControlFlowEntity

```php
$agent_control_flow = $client->AgentControlFlow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `bool` | Yes |  |
| `cancellation_requested` | `bool` | Yes |  |
| `device_name` | `string` | Yes |  |
| `flow_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `providers` | `array` | Yes |  |
| `repair_of_flow_id` | `string` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `title` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentControlFlow()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentControlFlow()->load(["id" => "agent_control_flow_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentControlFlowEntity`

Create a new `AgentControlFlowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentCoordinationEntity

```php
$agent_coordination = $client->AgentCoordination();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentCoordinationEntity`

Create a new `AgentCoordinationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentEmailEntity

```php
$agent_email = $client->AgentEmail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `mixed` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `preview` | `string` | No |  |
| `received_at` | `string` | Yes |  |
| `recipient_tag` | `mixed` | Yes | The +tag the sender used, if any |
| `spam` | `bool` | Yes | SES judged it spam |
| `subject` | `mixed` | Yes |  |
| `text` | `string` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentEmail()->load(["id" => "agent_email_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentEmailEntity`

Create a new `AgentEmailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentFileEntity

```php
$agent_file = $client->AgentFile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `string` | Yes |  |
| `download_url` | `string` | Yes |  |
| `filename` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `size_bytes` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentFile()->load(["id" => "agent_file_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentFileEntity`

Create a new `AgentFileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentInputEntity

```php
$agent_input = $client->AgentInput();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `array` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `array` | No |  |
| `browser_context` | `array` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `array` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `mixed` | No |  |
| `requester_membership_id` | `string` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentInput()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "browser_context" => null, // array
  "client_time" => null, // array
  "conversation_id" => null, // string
  "text" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentInputEntity`

Create a new `AgentInputEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentIntegrationEntity

```php
$agent_integration = $client->AgentIntegration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `array` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `array` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` | Yes |  |
| `can_manage_organization` | `bool` | Yes |  |
| `catalog` | `array` | Yes |  |
| `connect_as` | `mixed` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `array` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `array` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` | Yes |  |
| `connections` | `array` | Yes |  |
| `email` | `array` | Yes | A native agent's own email address. |
| `enabled` | `bool` | Yes |  |
| `enabled_toolkits` | `array` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` | Yes |  |
| `pagination` | `array` | Yes |  |
| `pending_counts` | `array` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `array` | Yes |  |
| `webhook_connections` | `array` | Yes |  |
| `webhooks_available` | `bool` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentIntegration()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "connection_id" => null, // string
  "enabled" => null, // bool
  "generation" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentIntegration()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentIntegrationEntity`

Create a new `AgentIntegrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentInteractionEntity

```php
$agent_interaction = $client->AgentInteraction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `interactions` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentInteraction()->list(["agent_id" => "example", "organization_id" => "example", "conversation_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentInteraction()->load(["id" => "agent_interaction_id", "agent_id" => "agent_id", "organization_id" => "organization_id", "conversation_id" => "conversation_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentInteractionEntity`

Create a new `AgentInteractionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentLibraryEntity

```php
$agent_library = $client->AgentLibrary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentLibraryEntity`

Create a new `AgentLibraryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentManagerEntity

```php
$agent_manager = $client->AgentManager();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `mixed` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `mixed` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_sharing` | `bool` | No |  |
| `can_name_managers` | `bool` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `mixed` | Yes |  |
| `configuration_revision` | `int` | Yes |  |
| `configuration_version` | `mixed` | Yes | Opaque version token. |
| `control_connections_available` | `bool` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `bool` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `bool` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `mixed` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `array` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `mixed` | Yes | Opaque version token. |
| `local_agent_control_available` | `bool` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `array` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `mixed` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `mixed` | No |  |
| `preview` | `mixed` | No |  |
| `preview_received_at` | `mixed` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `mixed` | No |  |
| `reply_triage` | `mixed` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `bool` | Yes |  |
| `sharing_fixed` | `bool` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `int` | No |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` | Yes |  |
| `visibility` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentManager()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "user_id" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AgentManager()->remove(["id" => "agent_manager_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentManagerEntity`

Create a new `AgentManagerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentManagerChoiceEntity

```php
$agent_manager_choice = $client->AgentManagerChoice();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentManagerChoice()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentManagerChoiceEntity`

Create a new `AgentManagerChoiceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentMarketplaceEntity

```php
$agent_marketplace = $client->AgentMarketplace();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `array` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `mixed` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `array` | Yes |  |
| `category` | `string` | Yes |  |
| `counts` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `explainer` | `mixed` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `array` | Yes |  |
| `integrations` | `array` | Yes |  |
| `listing` | `mixed` | Yes |  |
| `listings` | `array` | Yes |  |
| `memories` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `next_page` | `mixed` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `array` | Yes |  |
| `publisher_avatar_url` | `mixed` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `array` | Yes |  |
| `share_token` | `mixed` | Yes | Present only for people who manage the listing. |
| `skills` | `array` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | No | The V2 agent this listing was published from. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `array` | Yes | Who a public marketplace response was read for. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentMarketplace()->create([
  "organization_id" => null, // string
  "bundle" => null, // array
  "category" => null, // string
  "name" => null, // string
  "summary" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentMarketplace()->load(["id" => "agent_marketplace_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AgentMarketplace()->patch([
  "id" => "agent_marketplace_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AgentMarketplace()->remove(["id" => "agent_marketplace_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentMarketplace()->update([
  "id" => "agent_marketplace_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentMarketplaceEntity`

Create a new `AgentMarketplaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentMarketplaceSharedEntity

```php
$agent_marketplace_shared = $client->AgentMarketplaceShared();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `catalog_key` | `mixed` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` | Yes |  |
| `counts` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `explainer` | `mixed` | Yes | The listing's public write-up in Markdown. |
| `featured` | `bool` | Yes |  |
| `from_composal` | `bool` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `int` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `array` | Yes |  |
| `integrations` | `array` | Yes |  |
| `listing` | `mixed` | Yes |  |
| `memories` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `array` | Yes |  |
| `publisher_avatar_url` | `mixed` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `mixed` | Yes | Present only for people who manage the listing. |
| `skills` | `array` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |
| `viewer` | `array` | Yes | Who a public marketplace response was read for. |
| `visibility` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentMarketplaceShared()->load(["id" => "agent_marketplace_shared_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentMarketplaceSharedEntity`

Create a new `AgentMarketplaceSharedEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentMissionControlEntity

```php
$agent_mission_control = $client->AgentMissionControl();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentMissionControlEntity`

Create a new `AgentMissionControlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentOperationEntity

```php
$agent_operation = $client->AgentOperation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `array` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `operation` | `array` | Yes |  |
| `participant` | `string` | Yes |  |
| `requester_id` | `string` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentOperation()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "arguments" => null, // array
  "key" => null, // string
  "name" => null, // string
  "requester_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentOperation()->load(["id" => "agent_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentOperationEntity`

Create a new `AgentOperationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentProvisioningEntity

```php
$agent_provisioning = $client->AgentProvisioning();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentProvisioningEntity`

Create a new `AgentProvisioningEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentPullRequestEntity

```php
$agent_pull_request = $client->AgentPullRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `owners` | `array` | Yes |  |
| `repository` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentPullRequest()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentPullRequestEntity`

Create a new `AgentPullRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentQuestionEntity

```php
$agent_question = $client->AgentQuestion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentQuestionEntity`

Create a new `AgentQuestionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentRepositoryEntity

```php
$agent_repository = $client->AgentRepository();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `environments` | `array` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` | Yes |  |
| `id` | `string` | No |  |
| `repository_choices` | `array` | Yes |  |
| `repository_choices_error` | `mixed` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `version` | `int` | Yes |  |
| `work_repositories` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentRepository()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentRepository()->update([
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentRepositoryEntity`

Create a new `AgentRepositoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentResourceEntity

```php
$agent_resource = $client->AgentResource();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `uri` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentResource()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentResourceEntity`

Create a new `AgentResourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentRoutineEntity

```php
$agent_routine = $client->AgentRoutine();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `consecutive_errors` | `int` | Yes |  |
| `credit_wait` | `array` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `mixed` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_error` | `mixed` | Yes |  |
| `last_run_at` | `mixed` | Yes |  |
| `last_status` | `mixed` | Yes |  |
| `managed` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `mixed` | Yes |  |
| `routine` | `array` | Yes |  |
| `schedule` | `array` | Yes |  |
| `schedule_label` | `string` | Yes |  |
| `utility_model` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentRoutine()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentRoutine()->update([
  "agent_id" => "agent_id",
  "id" => "id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentRoutineEntity`

Create a new `AgentRoutineEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentRunEntity

```php
$agent_run = $client->AgentRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `mixed` | No |  |
| `id` | `string` | No |  |
| `run_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentRun()->load(["id" => "agent_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentRunEntity`

Create a new `AgentRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentRuntimeEntity

```php
$agent_runtime = $client->AgentRuntime();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `array` | No |  |
| `can_manage` | `bool` | Yes |  |
| `can_reset` | `bool` | No |  |
| `image` | `string` | Yes |  |
| `memory_mb` | `mixed` | Yes |  |
| `platform` | `string` | No |  |
| `profile` | `string` | Yes |  |
| `provider` | `string` | No |  |
| `state` | `string` | Yes |  |
| `version` | `string` | Yes |  |
| `volume` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentRuntimeEntity`

Create a new `AgentRuntimeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSettingEntity

```php
$agent_setting = $client->AgentSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_version` | `string` | Yes |  |
| `instructions` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentSetting()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentSetting()->update([
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSettingEntity`

Create a new `AgentSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSharingEntity

```php
$agent_sharing = $client->AgentSharing();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSharingEntity`

Create a new `AgentSharingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSiteEntity

```php
$agent_site = $client->AgentSite();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `string` | Yes |  |
| `deployments_count` | `int` | Yes |  |
| `hostname` | `string` | Yes |  |
| `https` | `string` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `visibility` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentSite()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSiteEntity`

Create a new `AgentSiteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSkillEntity

```php
$agent_skill = $client->AgentSkill();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `configuration_state` | `string` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `skills` | `array` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentSkill()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "enabled" => null, // bool
  "name" => null, // string
  "version" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentSkill()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSkillEntity`

Create a new `AgentSkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSlackEntity

```php
$agent_slack = $client->AgentSlack();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSlackEntity`

Create a new `AgentSlackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSubagentEntity

```php
$agent_subagent = $client->AgentSubagent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes |  |
| `attention` | `mixed` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `model` | `mixed` | Yes |  |
| `parent_id` | `string` | Yes |  |
| `preview` | `mixed` | Yes |  |
| `started_at` | `mixed` | Yes |  |
| `state` | `mixed` | Yes | What the thread is to the viewer. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentSubagent()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSubagentEntity`

Create a new `AgentSubagentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentSubscriptionEntity

```php
$agent_subscription = $client->AgentSubscription();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentSubscription()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentSubscription()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentSubscriptionEntity`

Create a new `AgentSubscriptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentTeammateEntity

```php
$agent_teammate = $client->AgentTeammate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `mixed` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `persona` | `mixed` | No |  |
| `slug` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentTeammate()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentTeammateEntity`

Create a new `AgentTeammateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentTerminalEntity

```php
$agent_terminal = $client->AgentTerminal();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentTerminalEntity`

Create a new `AgentTerminalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentThreadEntity

```php
$agent_thread = $client->AgentThread();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `mixed` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` | Yes |  |
| `execution` | `mixed` | No |  |
| `first_input` | `mixed` | No |  |
| `first_input_key` | `string` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `string` | No |  |
| `inherit_context` | `bool` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `array` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `mixed` | Yes |  |
| `local_scope_key` | `mixed` | Yes |  |
| `local_status_pending` | `bool` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `array` | Yes |  |
| `main_thread_id` | `string` | Yes |  |
| `message` | `string` | No | The thread's first message. |
| `next_cursor` | `mixed` | Yes |  |
| `parent_conversation_id` | `string` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` | No |  |
| `selected_thread` | `mixed` | Yes |  |
| `thread` | `array` | Yes |  |
| `threads` | `array` | Yes |  |
| `title` | `string` | No |  |
| `total_archived_count` | `mixed` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentThread()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentThread()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentThreadEntity`

Create a new `AgentThreadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentToolEntity

```php
$agent_tool = $client->AgentTool();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `inputSchema` | `array` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentTool()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentToolEntity`

Create a new `AgentToolEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentVerifyProjectEntity

```php
$agent_verify_project = $client->AgentVerifyProject();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` | Yes |  |
| `project_choices` | `array` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` | Yes |  |
| `verify_projects` | `array` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentVerifyProject()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentVerifyProject()->update([
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentVerifyProjectEntity`

Create a new `AgentVerifyProjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWaitEntity

```php
$agent_wait = $client->AgentWait();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWaitEntity`

Create a new `AgentWaitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWebhookEntity

```php
$agent_webhook = $client->AgentWebhook();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `connection` | `array` | Yes |  |
| `deliveries` | `array` | Yes |  |
| `event_types` | `array` | Yes |  |
| `expected_generation` | `int` | Yes |  |
| `id` | `string` | No |  |
| `max_events_per_day` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `purpose` | `string` | Yes |  |
| `signing_key` | `mixed` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentWebhook()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "event_types" => null, // array
  "max_events_per_day" => null, // int
  "name" => null, // string
  "purpose" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentWebhook()->load(["id" => "agent_webhook_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentWebhook()->update([
  "id" => "agent_webhook_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWebhookEntity`

Create a new `AgentWebhookEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkEntity

```php
$agent_work = $client->AgentWork();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkEntity`

Create a new `AgentWorkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkflowEntity

```php
$agent_workflow = $client->AgentWorkflow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `bool` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `path` | `string` | Yes |  |
| `source` | `string` | Yes | At most 262144 UTF-8 bytes |
| `template` | `string` | Yes | A template id from the catalog's templates |
| `templates` | `array` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `workflows` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AgentWorkflow()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "path" => null, // string
  "template" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentWorkflow()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentWorkflow()->update([
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkflowEntity`

Create a new `AgentWorkflowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkflowProposalEntity

```php
$agent_workflow_proposal = $client->AgentWorkflowProposal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `array` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `mixed` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` | Yes |  |
| `can_revise` | `bool` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` | Yes |  |
| `definition` | `mixed` | Yes |  |
| `digest` | `string` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `mixed` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` | Yes |  |
| `model_choices` | `array` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` | Yes |  |
| `native_rows` | `array` | No |  |
| `path` | `string` | Yes |  |
| `pipeline_checkpoints` | `array` | Yes |  |
| `pipeline_commands` | `array` | Yes |  |
| `reasoning_choices` | `array` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `mixed` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `mixed` | Yes |  |
| `stale` | `bool` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `mixed` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `mixed` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentWorkflowProposal()->load(["id" => "agent_workflow_proposal_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkflowProposalEntity`

Create a new `AgentWorkflowProposalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkflowRunEntity

```php
$agent_workflow_run = $client->AgentWorkflowRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `mixed` | Yes | Saved native automation identity. |
| `budget_seconds` | `mixed` | Yes | The run stops once it has been running this long |
| `budget_usd` | `mixed` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `mixed` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `mixed` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `array` | Yes |  |
| `error` | `mixed` | Yes |  |
| `finished_at` | `mixed` | Yes |  |
| `flow_steps` | `mixed` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes | Public run ID. |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `mixed` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `mixed` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `mixed` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `mixed` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `array` | Yes |  |
| `trigger_id` | `mixed` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `mixed` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `mixed` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentWorkflowRun()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentWorkflowRun()->load(["id" => "agent_workflow_run_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkflowRunEntity`

Create a new `AgentWorkflowRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkflowTriggerEntity

```php
$agent_workflow_trigger = $client->AgentWorkflowTrigger();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `mixed` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` | Yes |  |
| `can_pause` | `bool` | Yes | It is running, so a manager can pause it |
| `can_resume` | `bool` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `bool` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `mixed` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `mixed` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `next_due_at` | `mixed` | Yes |  |
| `pause_cause` | `mixed` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `mixed` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `mixed` | Yes |  |
| `schedule` | `mixed` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `mixed` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `mixed` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `mixed` | Yes |  |
| `starts` | `mixed` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `mixed` | Yes | The event subscription that starts it |
| `time_zone` | `string` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `mixed` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `array` | Yes |  |
| `workflow_path` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentWorkflowTrigger()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentWorkflowTrigger()->load(["id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AgentWorkflowTrigger()->remove(["id" => "agent_workflow_trigger_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentWorkflowTrigger()->update([
  "id" => "agent_workflow_trigger_id",
  "agent_id" => "agent_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkflowTriggerEntity`

Create a new `AgentWorkflowTriggerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWorkspaceEntity

```php
$agent_workspace = $client->AgentWorkspace();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_delete` | `bool` | Yes |  |
| `can_keep` | `bool` | Yes |  |
| `cleanup_after` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentWorkspace()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AgentWorkspace()->update([
  "agent_id" => "agent_id",
  "id" => "id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWorkspaceEntity`

Create a new `AgentWorkspaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentWritePermissionEntity

```php
$agent_write_permission = $client->AgentWritePermission();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `string` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` | Yes |  |
| `granted_by` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `in_effect` | `bool` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `mixed` | Yes |  |
| `tool` | `string` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AgentWritePermission()->list(["agent_id" => "example", "organization_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AgentWritePermission()->remove(["id" => "agent_write_permission_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentWritePermissionEntity`

Create a new `AgentWritePermissionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AllocationLogEntity

```php
$allocation_log = $client->AllocationLog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `mixed` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AllocationLog()->list(["allocation_id" => "example", "app_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AllocationLogEntity`

Create a new `AllocationLogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppEntity

```php
$app = $client->App();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `description` | `mixed` | Yes |  |
| `framework` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `mixed` | Yes |  |
| `root_path` | `string` | Yes |  |
| `root_path_display` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->App()->create([
  "name" => null, // string
  "organization_id" => null, // string
  "repository_id" => null, // string
  "root_path" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->App()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->App()->load(["id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->App()->patch([
  "id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->App()->remove(["id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->App()->update([
  "id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppEntity`

Create a new `AppEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppCdnEntity

```php
$app_cdn = $client->AppCdn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `cache_path_prefix` | `mixed` | No |  |
| `cache_settings_json` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `distribution_kind` | `string` | Yes |  |
| `edge_hostname` | `mixed` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostnames` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `last_deployed_at` | `mixed` | Yes |  |
| `last_deployed_at_label` | `mixed` | Yes |  |
| `last_purged_at` | `mixed` | Yes |  |
| `last_purged_at_label` | `mixed` | Yes |  |
| `last_synced_at` | `mixed` | Yes |  |
| `last_synced_at_label` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `origin_url` | `string` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `routing_settings_json` | `mixed` | Yes |  |
| `security_settings_json` | `mixed` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppCdn()->create([
  "app_id" => null, // string
  "name" => null, // string
  "origin_url" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppCdn()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppCdn()->load(["id" => "app_cdn_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppCdn()->patch([
  "id" => "app_cdn_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppCdn()->remove(["id" => "app_cdn_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppCdn()->update([
  "id" => "app_cdn_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppCdnEntity`

Create a new `AppCdnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppConfigVariableEntity

```php
$app_config_variable = $client->AppConfigVariable();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `mixed` | Yes |  |
| `exposed_to_build` | `bool` | Yes |  |
| `has_value` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `scope_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `value` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppConfigVariable()->create([
  "app_id" => null, // string
  "exposed_to_build" => null, // bool
  "key" => null, // string
  "scope_kind" => null, // string
  "value_kind" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppConfigVariable()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppConfigVariable()->load(["id" => "app_config_variable_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppConfigVariable()->patch([
  "id" => "app_config_variable_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppConfigVariable()->remove(["id" => "app_config_variable_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppConfigVariable()->update([
  "id" => "app_config_variable_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppConfigVariableEntity`

Create a new `AppConfigVariableEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppDataResourceEntity

```php
$app_data_resource = $client->AppDataResource();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `mixed` | Yes |  |
| `provider_metadata` | `array` | Yes |  |
| `region` | `mixed` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `mixed` | Yes |  |
| `storage_label` | `mixed` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppDataResource()->create([
  "app_id" => null, // string
  "engine" => null, // string
  "kind" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppDataResource()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppDataResource()->load(["id" => "app_data_resource_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppDataResource()->patch([
  "id" => "app_data_resource_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppDataResource()->remove(["id" => "app_data_resource_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppDataResource()->update([
  "id" => "app_data_resource_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppDataResourceEntity`

Create a new `AppDataResourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppDeployEntity

```php
$app_deploy = $client->AppDeploy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `channel` | `string` | No |  |
| `command` | `string` | No |  |
| `commit_sha` | `string` | No |  |
| `desired_instances` | `int` | No |  |
| `environment` | `string` | No | Environment slug or public ID, all, or existing. |
| `image` | `string` | Yes |  |
| `region` | `string` | No |  |
| `rollout_predecessor` | `string` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppDeploy()->create([
  "app_id" => null, // string
  "image" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppDeployEntity`

Create a new `AppDeployEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppDeploymentEntity

```php
$app_deployment = $client->AppDeployment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `mixed` | Yes |  |
| `build_role` | `mixed` | Yes |  |
| `commit_sha` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `creator_user_id` | `mixed` | Yes |  |
| `deployed_url` | `mixed` | Yes |  |
| `display_id` | `int` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `finished_at` | `mixed` | Yes |  |
| `finished_at_label` | `mixed` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `mixed` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `location` | `mixed` | Yes |  |
| `location_id` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `operation_key` | `mixed` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rollback_reason` | `mixed` | Yes |  |
| `rollback_source_deployment_id` | `mixed` | Yes |  |
| `rollback_source_release_id` | `mixed` | Yes |  |
| `rollback_target_release_id` | `mixed` | Yes |  |
| `source_ref` | `mixed` | Yes |  |
| `started_at` | `mixed` | Yes |  |
| `started_at_label` | `mixed` | Yes |  |
| `status` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppDeployment()->create([
  "app_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppDeployment()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppDeployment()->load(["id" => "app_deployment_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppDeployment()->patch([
  "id" => "app_deployment_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppDeployment()->remove(["id" => "app_deployment_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppDeployment()->update([
  "id" => "app_deployment_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppDeploymentEntity`

Create a new `AppDeploymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppDeploymentOperationEntity

```php
$app_deployment_operation = $client->AppDeploymentOperation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `array` | Yes |  |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `mixed` | Yes |  |
| `build_duration_seconds` | `mixed` | Yes |  |
| `build_source` | `mixed` | Yes |  |
| `build_status` | `string` | Yes |  |
| `children` | `array` | Yes |  |
| `ci_pipeline_id` | `mixed` | Yes |  |
| `ci_pipeline_run_id` | `mixed` | Yes |  |
| `commit_sha` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator` | `mixed` | Yes |  |
| `deployed_url` | `mixed` | Yes |  |
| `duration_seconds` | `mixed` | Yes |  |
| `environment` | `array` | Yes |  |
| `failure_message` | `string` | No |  |
| `finished_at` | `string` | No |  |
| `history_kind` | `string` | Yes |  |
| `history_reason` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `is_live` | `bool` | Yes |  |
| `is_rollback` | `bool` | Yes |  |
| `live_region_count` | `int` | Yes |  |
| `location_id` | `string` | No |  |
| `number` | `int` | Yes |  |
| `placement` | `mixed` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollback_reason` | `mixed` | Yes |  |
| `rollback_source_release_id` | `mixed` | Yes |  |
| `rollback_target_release_id` | `mixed` | Yes |  |
| `rollout_predecessor_id` | `mixed` | Yes |  |
| `rollout_status` | `string` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `service` | `array` | Yes |  |
| `source_ref` | `mixed` | Yes |  |
| `started_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `total_replicas` | `int` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppDeploymentOperation()->create([
  "app_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppDeploymentOperation()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppDeploymentOperation()->load(["id" => "app_deployment_operation_id", "app_id" => "app_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppDeploymentOperationEntity`

Create a new `AppDeploymentOperationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppDeploymentRollbackEntity

```php
$app_deployment_rollback = $client->AppDeploymentRollback();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_id` | `string` | Yes |  |
| `app_service_id` | `string` | No |  |
| `blockers` | `array` | Yes |  |
| `candidate_releases` | `array` | Yes |  |
| `confirmation_text` | `string` | Yes |  |
| `current_deployment` | `mixed` | Yes |  |
| `current_release` | `mixed` | Yes |  |
| `deployment` | `mixed` | Yes |  |
| `desired_state` | `mixed` | Yes |  |
| `environment` | `mixed` | Yes |  |
| `execution_allowed` | `bool` | Yes |  |
| `force` | `bool` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `idempotent_reuse` | `bool` | Yes |  |
| `location` | `mixed` | Yes |  |
| `operation` | `mixed` | Yes |  |
| `reason` | `mixed` | Yes |  |
| `rollback_release` | `mixed` | Yes |  |
| `rollout` | `mixed` | Yes |  |
| `service` | `mixed` | Yes |  |
| `target_artifact_locator` | `mixed` | Yes |  |
| `target_release` | `mixed` | Yes |  |
| `to` | `string` | No |  |
| `warnings` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppDeploymentRollback()->create([
  "app_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppDeploymentRollbackEntity`

Create a new `AppDeploymentRollbackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppEnvironmentEntity

```php
$app_environment = $client->AppEnvironment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `base_domain` | `mixed` | Yes |  |
| `branch_pattern` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location` | `mixed` | Yes |  |
| `location_id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppEnvironment()->create([
  "app_id" => null, // string
  "auto_deploy" => null, // bool
  "kind" => null, // string
  "location_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
  "status" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppEnvironment()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppEnvironment()->load(["id" => "app_environment_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppEnvironment()->patch([
  "id" => "app_environment_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppEnvironment()->remove(["id" => "app_environment_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppEnvironment()->update([
  "id" => "app_environment_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppEnvironmentEntity`

Create a new `AppEnvironmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppLocationEntity

```php
$app_location = $client->AppLocation();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppLocation()->create([
  "app_id" => null, // string
  "location_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppLocation()->list(["app_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppLocation()->remove(["id" => "app_location_id", "app_id" => "app_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppLocationEntity`

Create a new `AppLocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppMetricEntity

```php
$app_metric = $client->AppMetric();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppMetricEntity`

Create a new `AppMetricEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppPreviewEntity

```php
$app_preview = $client->AppPreview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No |  |
| `app_preview_profile_id` | `string` | Yes |  |
| `change_number` | `string` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `int` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `int` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `resource_overrides` | `array` | No | Service public IDs mapped to resource overrides. |
| `retained` | `bool` | No |  |
| `shared_data_binding_ids` | `array` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `array` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` | Yes |  |
| `source_ref` | `string` | No |  |
| `storage_binding_resources` | `array` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppPreview()->create([
  "app_id" => null, // string
  "app_preview_profile_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppPreview()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppPreview()->load(["id" => "app_preview_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppPreview()->patch([
  "id" => "app_preview_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppPreview()->remove(["id" => "app_preview_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppPreview()->update([
  "id" => "app_preview_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppPreviewEntity`

Create a new `AppPreviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppPreviewProfileEntity

```php
$app_preview_profile = $client->AppPreviewProfile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `bool` | No |  |
| `configuration` | `array` | No |  |
| `created_at` | `string` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_environment_id` | `string` | Yes |  |
| `ttl_days` | `int` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppPreviewProfile()->create([
  "app_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
  "source_environment_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppPreviewProfile()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppPreviewProfile()->load(["id" => "app_preview_profile_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppPreviewProfile()->patch([
  "id" => "app_preview_profile_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppPreviewProfile()->remove(["id" => "app_preview_profile_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppPreviewProfile()->update([
  "id" => "app_preview_profile_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppPreviewProfileEntity`

Create a new `AppPreviewProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppRunEntity

```php
$app_run = $client->AppRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppRun()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppRun()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppRun()->load(["id" => "app_run_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppRunEntity`

Create a new `AppRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppSecretEntity

```php
$app_secret = $client->AppSecret();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `mixed` | No |  |
| `env_key` | `mixed` | No |  |
| `expose_to_build` | `bool` | No |  |
| `has_value` | `bool` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_version_number` | `mixed` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rotation_policy` | `mixed` | No |  |
| `scope_kind` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `value` | `string` | No |  |
| `value_digest` | `mixed` | No |  |
| `value_kind` | `mixed` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppSecret()->create([
  "app_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppSecret()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppSecret()->load(["id" => "app_secret_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppSecret()->patch([
  "id" => "app_secret_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppSecret()->remove(["id" => "app_secret_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppSecret()->update([
  "id" => "app_secret_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppSecretEntity`

Create a new `AppSecretEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppServiceEntity

```php
$app_service = $client->AppService();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `bool` | Yes |  |
| `bindings` | `array` | Yes |  |
| `build_command` | `mixed` | Yes |  |
| `cpu_label` | `mixed` | Yes |  |
| `cpu_mhz` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `deploy_paths` | `array` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` | Yes |  |
| `disk_label` | `mixed` | Yes |  |
| `disk_mb` | `mixed` | Yes |  |
| `effective_deploy_paths` | `array` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `mixed` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `internal_port` | `mixed` | Yes |  |
| `kind` | `string` | Yes |  |
| `memory_label` | `mixed` | Yes |  |
| `memory_max_label` | `mixed` | Yes |  |
| `memory_max_mb` | `mixed` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_constraints_json` | `mixed` | Yes |  |
| `nomad_kill_timeout_seconds` | `mixed` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `mixed` | Yes |  |
| `nomad_region` | `mixed` | Yes |  |
| `nomad_shutdown_delay_seconds` | `mixed` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `mixed` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `mixed` | Yes |  |
| `prestart_command` | `mixed` | Yes |  |
| `publicly_accessible` | `bool` | Yes |  |
| `release_command` | `mixed` | Yes |  |
| `repo_source_path` | `string` | Yes |  |
| `runtime` | `string` | Yes |  |
| `runtime_adapter_kind` | `string` | Yes |  |
| `runtime_adapter_settings_json` | `mixed` | Yes |  |
| `schedule` | `mixed` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_path` | `string` | Yes |  |
| `start_command` | `mixed` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppService()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppService()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppService()->load(["id" => "app_service_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppService()->patch([
  "id" => "app_service_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppService()->remove(["id" => "app_service_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppService()->update([
  "id" => "app_service_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppServiceEntity`

Create a new `AppServiceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppServiceBindingEntity

```php
$app_service_binding = $client->AppServiceBinding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppServiceBinding()->create([
  "app_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppServiceBinding()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppServiceBinding()->load(["id" => "app_service_binding_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppServiceBinding()->patch([
  "id" => "app_service_binding_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppServiceBinding()->remove(["id" => "app_service_binding_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppServiceBinding()->update([
  "id" => "app_service_binding_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppServiceBindingEntity`

Create a new `AppServiceBindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppServicePlacementEntity

```php
$app_service_placement = $client->AppServicePlacement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment_channel` | `mixed` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `region_count` | `int` | Yes |  |
| `replicas_per_region` | `int` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `targets` | `array` | Yes |  |
| `total_replicas` | `int` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppServicePlacement()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppServicePlacement()->load(["id" => "app_service_placement_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppServicePlacementEntity`

Create a new `AppServicePlacementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AppStorageResourceEntity

```php
$app_storage_resource = $client->AppStorageResource();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `mixed` | Yes |  |
| `attachment` | `mixed` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `mixed` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `ephemeral` | `bool` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `mixed` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location_code` | `mixed` | Yes |  |
| `location_id` | `mixed` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes | Storage backend. |
| `provider_error` | `mixed` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AppStorageResource()->create([
  "app_id" => null, // string
  "access_mode" => null, // string
  "kind" => null, // string
  "name" => null, // string
  "provider" => null, // string
  "slug" => null, // string
  "status" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AppStorageResource()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AppStorageResource()->load(["id" => "app_storage_resource_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->AppStorageResource()->patch([
  "id" => "app_storage_resource_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AppStorageResource()->remove(["id" => "app_storage_resource_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AppStorageResource()->update([
  "id" => "app_storage_resource_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AppStorageResourceEntity`

Create a new `AppStorageResourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AttachmentPartEntity

```php
$attachment_part = $client->AttachmentPart();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AttachmentPart()->update([
  "agent_id" => "agent_id",
  "attachment_id" => "attachment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AttachmentPartEntity`

Create a new `AttachmentPartEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AutomationEventEntity

```php
$automation_event = $client->AutomationEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_manage` | `bool` | Yes |  |
| `can_manage_events` | `bool` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` | Yes |  |
| `event_subscriptions` | `array` | Yes |  |
| `event_triggers` | `array` | Yes |  |
| `expected_revision` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `int` | Yes |  |
| `schedule` | `mixed` | Yes |  |
| `schedules` | `array` | Yes |  |
| `settings` | `array` | No |  |
| `subscription_key` | `string` | Yes |  |
| `version` | `array` | Yes |  |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AutomationEvent()->update([
  "agent_id" => "agent_id",
  "automation_id" => "automation_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AutomationEventEntity`

Create a new `AutomationEventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AutomationRunEntity

```php
$automation_run = $client->AutomationRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `mixed` | Yes | Saved native automation identity. |
| `budget_seconds` | `mixed` | Yes | The run stops once it has been running this long |
| `budget_usd` | `mixed` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `mixed` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `mixed` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `array` | Yes |  |
| `error` | `mixed` | Yes |  |
| `finished_at` | `mixed` | Yes |  |
| `flow_steps` | `mixed` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes |  |
| `input` | `array` | Yes |  |
| `needs_you` | `bool` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `mixed` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `mixed` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` | Yes |  |
| `resume_count` | `int` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `mixed` | Yes |  |
| `running_seconds` | `int` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `int` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `float` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `mixed` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `int` | Yes |  |
| `steps` | `array` | Yes |  |
| `trigger_id` | `mixed` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` | Yes |  |
| `wake_at` | `mixed` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `mixed` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AutomationRun()->create([
  "agent_id" => null, // string
  "automation_id" => null, // string
  "organization_id" => null, // string
  "input" => null, // array
  "request_id" => null, // string
  "version_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AutomationRunEntity`

Create a new `AutomationRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BinaryEntity

```php
$binary = $client->Binary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `bool` | Yes |  |
| `arch` | `mixed` | No |  |
| `archived_at` | `mixed` | Yes |  |
| `binary` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `executable` | `string` | Yes |  |
| `format` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `latest_version` | `mixed` | Yes |  |
| `launch_args` | `array` | No |  |
| `name` | `string` | Yes |  |
| `needs_refresh` | `bool` | Yes |  |
| `operation` | `array` | Yes |  |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `platform` | `mixed` | No |  |
| `project_id` | `string` | Yes |  |
| `sha256` | `string` | No |  |
| `slug` | `string` | Yes |  |
| `version` | `array` | Yes |  |
| `version_defaults` | `mixed` | No |  |
| `versions` | `array` | Yes |  |
| `window_title` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Binary()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Binary()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Binary()->load(["id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BinaryEntity`

Create a new `BinaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BinaryVersionEntity

```php
$binary_version = $client->BinaryVersion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `mixed` | No |  |
| `cancelable` | `bool` | Yes |  |
| `configuration` | `array` | Yes |  |
| `configuration_digest` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deletable` | `bool` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `environment_uses` | `array` | Yes |  |
| `executable` | `string` | No |  |
| `format` | `mixed` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `launch_args` | `array` | No |  |
| `operation` | `array` | Yes |  |
| `package_sha256` | `mixed` | Yes |  |
| `package_size` | `mixed` | Yes |  |
| `permissions` | `array` | Yes |  |
| `platform` | `mixed` | No |  |
| `preparations` | `array` | Yes |  |
| `retryable` | `bool` | Yes |  |
| `sha256` | `string` | No |  |
| `status` | `string` | Yes |  |
| `version` | `array` | Yes |  |
| `window_title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BinaryVersion()->create([
  "binary_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
  "download_url" => null, // string
  "idempotency_key" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->BinaryVersion()->list(["binary_id" => "example", "organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BinaryVersion()->load(["id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->BinaryVersion()->remove(["id" => "binary_version_id", "binary_id" => "binary_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BinaryVersionEntity`

Create a new `BinaryVersionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserEgressCandidateEntity

```php
$browser_egress_candidate = $client->BrowserEgressCandidate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->BrowserEgressCandidate()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserEgressCandidateEntity`

Create a new `BrowserEgressCandidateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionEntity

```php
$browser_session = $client->BrowserSession();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `mixed` | No |  |
| `authentication_status` | `string` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `mixed` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `mixed` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `mixed` | No |  |
| `closure_basis` | `mixed` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` | Yes |  |
| `controller` | `string` | Yes |  |
| `credential_id` | `mixed` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `mixed` | No |  |
| `expires_at` | `string` | Yes |  |
| `failure_code` | `mixed` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `initial_url` | `string` | Yes |  |
| `max_seconds` | `int` | No |  |
| `pending_control_id` | `mixed` | No |  |
| `project_id` | `mixed` | No | Optional project slug or public ID. |
| `reconciled_at` | `mixed` | No |  |
| `started_at` | `mixed` | No |  |
| `status` | `string` | Yes |  |
| `url` | `string` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `mixed` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BrowserSession()->create([
  "organization_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BrowserSession()->load(["id" => "browser_session_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->BrowserSession()->remove(["id" => "browser_session_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionEntity`

Create a new `BrowserSessionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionConnectionEntity

```php
$browser_session_connection = $client->BrowserSessionConnection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `int` | Yes |  |
| `idempotency_key` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BrowserSessionConnection()->create([
  "browser_session_id" => null, // string
  "organization_id" => null, // string
  "generation" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionConnectionEntity`

Create a new `BrowserSessionConnectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionControlEntity

```php
$browser_session_control = $client->BrowserSessionControl();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `completed_at` | `mixed` | No |  |
| `completed_generation` | `mixed` | No |  |
| `connection` | `mixed` | No |  |
| `failure_code` | `mixed` | No |  |
| `id` | `string` | Yes |  |
| `requested_controller` | `string` | Yes |  |
| `requested_generation` | `int` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BrowserSessionControl()->load(["id" => "browser_session_control_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionControlEntity`

Create a new `BrowserSessionControlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionEventEntity

```php
$browser_session_event = $client->BrowserSessionEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `mixed` | No |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `payload` | `array` | Yes |  |
| `source_sequence` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->BrowserSessionEvent()->list(["browser_session_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionEventEntity`

Create a new `BrowserSessionEventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionMediaEntity

```php
$browser_session_media = $client->BrowserSessionMedia();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `capture_omissions` | `mixed` | No |  |
| `captured_at` | `mixed` | No |  |
| `ended_at` | `mixed` | No |  |
| `failure_code` | `mixed` | No |  |
| `files` | `array` | Yes |  |
| `frames` | `mixed` | No |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `partial` | `bool` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` | Yes |  |
| `source` | `mixed` | No | Screenshot provenance. |
| `status` | `string` | Yes |  |
| `stop_requested_at` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BrowserSessionMedia()->load(["id" => "browser_session_media_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionMediaEntity`

Create a new `BrowserSessionMediaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionRecordingEntity

```php
$browser_session_recording = $client->BrowserSessionRecording();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BrowserSessionRecording()->create([
  "browser_session_id" => null, // string
  "organization_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionRecordingEntity`

Create a new `BrowserSessionRecordingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionScreenshotEntity

```php
$browser_session_screenshot = $client->BrowserSessionScreenshot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `string` | No |  |
| `wait` | `bool` | No | Only screenshots support wait: true. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BrowserSessionScreenshot()->create([
  "browser_session_id" => null, // string
  "organization_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionScreenshotEntity`

Create a new `BrowserSessionScreenshotEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BrowserSessionTaskEntity

```php
$browser_session_task = $client->BrowserSessionTask();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `mixed` | No |  |
| `browser_session_id` | `string` | Yes |  |
| `cancel_requested_at` | `mixed` | No |  |
| `completed_at` | `mixed` | No |  |
| `control_generation` | `mixed` | No |  |
| `deadline_at` | `string` | Yes |  |
| `effects_unknown` | `bool` | Yes |  |
| `failure_code` | `mixed` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `instruction` | `string` | Yes |  |
| `max_rounds` | `int` | Yes |  |
| `max_seconds` | `int` | No |  |
| `model_selection` | `array` | Yes |  |
| `outcome` | `mixed` | No |  |
| `result` | `array` | Yes |  |
| `started_at` | `mixed` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BrowserSessionTask()->create([
  "browser_session_id" => null, // string
  "organization_id" => null, // string
  "instruction" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BrowserSessionTask()->load(["id" => "browser_session_task_id", "browser_session_id" => "browser_session_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BrowserSessionTaskEntity`

Create a new `BrowserSessionTaskEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CatalogSelectorEntity

```php
$catalog_selector = $client->CatalogSelector();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CatalogSelector()->list(["app_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CatalogSelectorEntity`

Create a new `CatalogSelectorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CdnDeploymentEntity

```php
$cdn_deployment = $client->CdnDeployment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CdnDeployment()->create([
  "app_id" => null, // string
  "cdn_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CdnDeployment()->list(["app_id" => "example", "cdn_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CdnDeployment()->load(["id" => "cdn_deployment_id", "app_id" => "app_id", "cdn_id" => "cdn_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CdnDeploymentEntity`

Create a new `CdnDeploymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CdnHostnameEntity

```php
$cdn_hostname = $client->CdnHostname();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `force_ssl` | `bool` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `provider_hostname_id` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CdnHostname()->create([
  "app_id" => null, // string
  "cdn_id" => null, // string
  "hostname" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CdnHostname()->list(["app_id" => "example", "cdn_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CdnHostname()->load(["id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->CdnHostname()->patch([
  "id" => "cdn_hostname_id",
  "app_id" => "app_id",
  "cdn_id" => "cdn_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->CdnHostname()->remove(["id" => "cdn_hostname_id", "app_id" => "app_id", "cdn_id" => "cdn_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CdnHostname()->update([
  "id" => "cdn_hostname_id",
  "app_id" => "app_id",
  "cdn_id" => "cdn_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CdnHostnameEntity`

Create a new `CdnHostnameEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CdnSpaceEntity

```php
$cdn_space = $client->CdnSpace();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CdnSpace()->create([
  "organization_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CdnSpace()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CdnSpace()->load(["id" => "cdn_space_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->CdnSpace()->patch([
  "id" => "cdn_space_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->CdnSpace()->remove(["id" => "cdn_space_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CdnSpace()->update([
  "id" => "cdn_space_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CdnSpaceEntity`

Create a new `CdnSpaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CdnSpaceObjectEntity

```php
$cdn_space_object = $client->CdnSpaceObject();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CdnSpaceObject()->list(["cdn_space_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CdnSpaceObject()->load(["id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->CdnSpaceObject()->remove(["id" => "cdn_space_object_id", "cdn_space_id" => "cdn_space_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CdnSpaceObject()->update([
  "cdn_space_id" => "cdn_space_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CdnSpaceObjectEntity`

Create a new `CdnSpaceObjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConnectionRequestEntity

```php
$connection_request = $client->ConnectionRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `bool` | Yes |  |
| `can_disconnect` | `bool` | Yes |  |
| `can_setup` | `bool` | Yes |  |
| `error_code` | `mixed` | Yes |  |
| `generation` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `mixed` | Yes |  |
| `retired_at` | `mixed` | Yes |  |
| `revoked_at` | `mixed` | Yes |  |
| `source_operation_id` | `mixed` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ConnectionRequest()->load(["id" => "connection_request_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConnectionRequestEntity`

Create a new `ConnectionRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConnectionSourceEntity

```php
$connection_source = $client->ConnectionSource();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ConnectionSource()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConnectionSourceEntity`

Create a new `ConnectionSourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoordinationWaitEntity

```php
$coordination_wait = $client->CoordinationWait();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `bool` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `stop_state` | `mixed` | Yes |  |
| `wake_outcome` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CoordinationWait()->list(["agent_id" => "example", "coordination_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoordinationWaitEntity`

Create a new `CoordinationWaitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CredentialSignInCheckEntity

```php
$credential_sign_in_check = $client->CredentialSignInCheck();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes | The project environment (app) to sign in to |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CredentialSignInCheck()->create([
  "credential_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
  "environment_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CredentialSignInCheckEntity`

Create a new `CredentialSignInCheckEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DataResourceRotateCredentialEntity

```php
$data_resource_rotate_credential = $client->DataResourceRotateCredential();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `high_availability` | `bool` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `mixed` | Yes |  |
| `provider_metadata` | `array` | Yes |  |
| `region` | `mixed` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `mixed` | Yes |  |
| `storage_label` | `mixed` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DataResourceRotateCredential()->create([
  "app_id" => null, // string
  "data_resource_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DataResourceRotateCredentialEntity`

Create a new `DataResourceRotateCredentialEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeepScanEntity

```php
$deep_scan = $client->DeepScan();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | No |  |
| `active` | `array` | Yes |  |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `array` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `array` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `array` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DeepScan()->create([
  "organization_id" => null, // string
  "environment_id" => null, // string
  "goal" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DeepScan()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DeepScan()->load(["id" => "deep_scan_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeepScanEntity`

Create a new `DeepScanEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeepScanFindingEntity

```php
$deep_scan_finding = $client->DeepScanFinding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `int` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `array` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `array` | Yes |  |
| `findings_fix_prompt` | `mixed` | Yes |  |
| `free_findings_pending` | `bool` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `array` | Yes |  |
| `priority` | `mixed` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | Yes |  |
| `reproduction_of` | `mixed` | Yes |  |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `unlock` | `array` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DeepScanFinding()->list(["deep_scan_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeepScanFindingEntity`

Create a new `DeepScanFindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeepScanFlowEntity

```php
$deep_scan_flow = $client->DeepScanFlow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | No |  |
| `concurrency` | `int` | No |  |
| `environment_id` | `string` | No |  |
| `exploration_id` | `string` | No |  |
| `flow_names` | `array` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `int` | No |  |
| `max_testers` | `int` | No |  |
| `note` | `mixed` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DeepScanFlow()->create([
  "organization_id" => null, // string
  "flow_names" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeepScanFlowEntity`

Create a new `DeepScanFlowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeepScanMappedFlowEntity

```php
$deep_scan_mapped_flow = $client->DeepScanMappedFlow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | Yes |  |
| `environment_id` | `string` | Yes |  |
| `flow_map` | `mixed` | Yes |  |
| `revision_id` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DeepScanMappedFlow()->list(["organization_id" => "example", "environment_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeepScanMappedFlowEntity`

Create a new `DeepScanMappedFlowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeepScanOptionEntity

```php
$deep_scan_option = $client->DeepScanOption();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `array` | Yes |  |
| `deep_scan_defaults` | `mixed` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `mixed` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `personas` | `array` | No |  |
| `preview` | `bool` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DeepScanOption()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeepScanOptionEntity`

Create a new `DeepScanOptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DemoShareEntity

```php
$demo_share = $client->DemoShare();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `array` | Yes |  |
| `summary` | `string` | Yes | What the recorded browser confirmed. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DemoShare()->load(["id" => "demo_share_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DemoShareEntity`

Create a new `DemoShareEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DemoShareSegmentEntity

```php
$demo_share_segment = $client->DemoShareSegment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DemoShareSegment()->load(["id" => "demo_share_segment_id", "demo_share_id" => "demo_share_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DemoShareSegmentEntity`

Create a new `DemoShareSegmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeploymentDashboardNomadEntity

```php
$deployment_dashboard_nomad = $client->DeploymentDashboardNomad();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeploymentDashboardNomadEntity`

Create a new `DeploymentDashboardNomadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeploymentFileEntity

```php
$deployment_file = $client->DeploymentFile();
```

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DeploymentFile()->update([
  "deployment_id" => "deployment_id",
  "static_site_id" => "static_site_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeploymentFileEntity`

Create a new `DeploymentFileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainPathRuleEntity

```php
$domain_path_rule = $client->DomainPathRule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `string` | Yes |  |
| `app_service_endpoint_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `backend_ref` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_error` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainPathRule()->create([
  "app_id" => null, // string
  "domain_id" => null, // string
  "app_service_id" => null, // mixed
  "path_prefix" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainPathRule()->list(["app_id" => "example", "domain_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainPathRule()->load(["id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->DomainPathRule()->patch([
  "id" => "domain_path_rule_id",
  "app_id" => "app_id",
  "domain_id" => "domain_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainPathRule()->remove(["id" => "domain_path_rule_id", "app_id" => "app_id", "domain_id" => "domain_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainPathRule()->update([
  "id" => "domain_path_rule_id",
  "app_id" => "app_id",
  "domain_id" => "domain_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainPathRuleEntity`

Create a new `DomainPathRuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DreamEntity

```php
$dream = $client->Dream();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `bool` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `array` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `mixed` | Yes |  |
| `counts` | `array` | Yes |  |
| `dream` | `mixed` | Yes |  |
| `error_code` | `mixed` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Yes | Public id used in the dream's URL |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `phase` | `string` | Yes | Where the dream is. |
| `reason` | `mixed` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Yes | Local day whose finished runs it reviewed |
| `runs` | `array` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Yes | Project or unassigned environment name |
| `skipped` | `int` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `string` | Yes |  |
| `timezone` | `string` | Yes | Organization timezone the dream used |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Dream()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Dream()->load(["id" => "dream_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DreamEntity`

Create a new `DreamEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentEntity

```php
$environment = $client->Environment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `mixed` | Yes |  |
| `agent_sign_up_available` | `bool` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `array` | Yes |  |
| `cleanup` | `array` | Yes |  |
| `connection` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_policy` | `array` | No |  |
| `default_policy_json` | `array` | Yes |  |
| `discovery_defaults` | `array` | Yes |  |
| `environment` | `array` | Yes |  |
| `exploration_accounts` | `array` | No |  |
| `explorations` | `array` | No |  |
| `first_run` | `mixed` | No |  |
| `hosted_app_id` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `mixed` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` | Yes |  |
| `managed_google_available` | `bool` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` | Yes |  |
| `messaging_tester_number` | `mixed` | No | One configured tester number. |
| `name` | `string` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `array` | Yes |  |
| `onboarding_discovery` | `mixed` | No |  |
| `organization_id` | `string` | Yes |  |
| `pending_accounts` | `array` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `array` | Yes |  |
| `project_id` | `mixed` | Yes | Owning project. |
| `repository_id` | `mixed` | Yes |  |
| `revisions` | `array` | Yes |  |
| `setup_discovery_id` | `mixed` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `target_kind` | `mixed` | Yes |  |
| `target_url` | `mixed` | Yes |  |
| `test_accounts` | `array` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `mixed` | Yes |  |
| `version` | `int` | No | Required for target or tester changes; use lock_version from the environment. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Environment()->create([
  "organization_id" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Environment()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Environment()->load(["id" => "environment_id", "organization_id" => "organization_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Environment()->patch([
  "id" => "environment_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Environment()->remove(["id" => "environment_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Environment()->update([
  "id" => "environment_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentEntity`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentDiscoveryRunEntity

```php
$environment_discovery_run = $client->EnvironmentDiscoveryRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | Yes | Omit for anonymous exploration |
| `deadline_at` | `string` | Yes |  |
| `environment_revision_id` | `string` | Yes |  |
| `evidence` | `array` | No |  |
| `failure_code` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `queued_at` | `string` | Yes |  |
| `recording` | `array` | Yes |  |
| `result` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EnvironmentDiscoveryRun()->create([
  "environment_id" => null, // string
  "organization_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EnvironmentDiscoveryRun()->load(["id" => "environment_discovery_run_id", "environment_id" => "environment_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentDiscoveryRunEntity`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentExplorationEntity

```php
$environment_exploration = $client->EnvironmentExploration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | No |  |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `persona_id` | `mixed` | No |  |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EnvironmentExploration()->create([
  "environment_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
  "goal" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentExplorationEntity`

Create a new `EnvironmentExplorationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentFirstRunEntity

```php
$environment_first_run = $client->EnvironmentFirstRun();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentFirstRunEntity`

Create a new `EnvironmentFirstRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentRevisionEntity

```php
$environment_revision = $client->EnvironmentRevision();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `array` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `mixed` | Yes |  |
| `app_release_id` | `mixed` | Yes |  |
| `blueprint` | `array` | Yes |  |
| `blueprint_json` | `array` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `digest` | `string` | Yes |  |
| `dry_run` | `bool` | No |  |
| `expires_at` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `ready_at` | `mixed` | Yes |  |
| `resolved_manifest_json` | `array` | Yes |  |
| `retention_policy_json` | `array` | Yes |  |
| `revision` | `int` | Yes |  |
| `revoked_at` | `mixed` | Yes |  |
| `runner_environment_revision_id` | `mixed` | Yes |  |
| `safety_policy_json` | `array` | Yes |  |
| `schema_version` | `int` | Yes |  |
| `source_metadata` | `array` | No |  |
| `source_metadata_json` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `validation_json` | `array` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EnvironmentRevision()->create([
  "environment_id" => null, // string
  "organization_id" => null, // string
  "blueprint" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EnvironmentRevision()->load(["id" => "environment_revision_id", "environment_id" => "environment_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->EnvironmentRevision()->update([
  "id" => "environment_revision_id",
  "environment_id" => "environment_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentRevisionEntity`

Create a new `EnvironmentRevisionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentSecretBindingEntity

```php
$environment_secret_binding = $client->EnvironmentSecretBinding();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EnvironmentSecretBinding()->create([
  "app_id" => null, // string
  "environment_id" => null, // string
  "env_key" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->EnvironmentSecretBinding()->list(["app_id" => "example", "environment_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->EnvironmentSecretBinding()->remove(["id" => "environment_secret_binding_id", "app_id" => "app_id", "environment_id" => "environment_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentSecretBindingEntity`

Create a new `EnvironmentSecretBindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnvironmentTestAccountEntity

```php
$environment_test_account = $client->EnvironmentTestAccount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `bool` | Yes |  |
| `credentials` | `array` | Yes |  |
| `id` | `string` | No |  |
| `persona` | `string` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `tenant` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->EnvironmentTestAccount()->list(["environment_id" => "example", "organization_id" => "example"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->EnvironmentTestAccount()->patch([
  "environment_id" => "environment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->EnvironmentTestAccount()->update([
  "environment_id" => "environment_id",
  "id" => "id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnvironmentTestAccountEntity`

Create a new `EnvironmentTestAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EvidenceEntity

```php
$evidence = $client->Evidence();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Evidence()->load(["id" => "evidence_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EvidenceEntity`

Create a new `EvidenceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExplorationEntity

```php
$exploration = $client->Exploration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | No |  |
| `active` | `array` | Yes |  |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `array` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `array` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `array` | Yes |  |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `persona_id` | `mixed` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Exploration()->create([
  "organization_id" => null, // string
  "environment_id" => null, // string
  "goal" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Exploration()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Exploration()->load(["id" => "exploration_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExplorationEntity`

Create a new `ExplorationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExplorationMessageEntity

```php
$exploration_message = $client->ExplorationMessage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ExplorationMessage()->create([
  "exploration_id" => null, // string
  "organization_id" => null, // string
  "text" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExplorationMessageEntity`

Create a new `ExplorationMessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExplorationReportEntity

```php
$exploration_report = $client->ExplorationReport();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExplorationReportEntity`

Create a new `ExplorationReportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExplorationScenarioEntity

```php
$exploration_scenario = $client->ExplorationScenario();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `array` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `array` | Yes |  |
| `can_continue` | `bool` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `array` | No |  |
| `concurrency` | `int` | Yes |  |
| `covered_areas` | `array` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `array` | Yes | What the team is doing now. |
| `finding_count` | `int` | Yes | Findings at every priority, locked ones included. |
| `findings` | `array` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `mixed` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `array` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `max_testers` | `int` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `array` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `array` | Yes |  |
| `priority_counts` | `array` | Yes |  |
| `project_id` | `mixed` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `reproduction_of` | `mixed` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `array` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `array` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `array` | Yes |  |
| `sign_in_needs_answer` | `bool` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `mixed` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `bool` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `mixed` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ExplorationScenario()->create([
  "exploration_id" => null, // string
  "organization_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExplorationScenarioEntity`

Create a new `ExplorationScenarioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FindingEntity

```php
$finding = $client->Finding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deferred_until` | `mixed` | No | Required future time when status is deferred |
| `finding` | `array` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `first_seen_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `bool` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `permissions` | `array` | Yes |  |
| `reason` | `string` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `mixed` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `mixed` | Yes |  |
| `safe_summary` | `string` | Yes |  |
| `scenario_occurrences` | `array` | No |  |
| `severity` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification` | `mixed` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Finding()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Finding()->load(["id" => "finding_id", "organization_id" => "organization_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Finding()->patch([
  "id" => "finding_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Finding()->update([
  "id" => "finding_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FindingEntity`

Create a new `FindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GithubConnectionEntity

```php
$github_connection = $client->GithubConnection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `array` | Yes |  |
| `github_app_installation_id` | `string` | Yes |  |
| `installations` | `array` | Yes |  |
| `project_id` | `string` | No | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->GithubConnection()->create([
  "organization_id" => null, // string
  "github_app_installation_id" => null, // string
  "repositories" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->GithubConnection()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GithubConnectionEntity`

Create a new `GithubConnectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HostingAppDomainEntity

```php
$hosting_app_domain = $client->HostingAppDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `certificate` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `mixed` | Yes |  |
| `path_rules` | `array` | Yes |  |
| `record_name` | `mixed` | Yes |  |
| `record_type` | `mixed` | Yes |  |
| `record_value` | `mixed` | Yes |  |
| `redirect_to` | `mixed` | Yes |  |
| `static_site_id` | `mixed` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_record` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->HostingAppDomain()->create([
  "app_id" => null, // string
  "app_service_id" => null, // mixed
  "hostname" => null, // string
  "kind" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->HostingAppDomain()->list(["app_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->HostingAppDomain()->load(["id" => "hosting_app_domain_id", "app_id" => "app_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->HostingAppDomain()->patch([
  "id" => "hosting_app_domain_id",
  "app_id" => "app_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->HostingAppDomain()->remove(["id" => "hosting_app_domain_id", "app_id" => "app_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->HostingAppDomain()->update([
  "id" => "hosting_app_domain_id",
  "app_id" => "app_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HostingAppDomainEntity`

Create a new `HostingAppDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImageRepositoryEntity

```php
$image_repository = $client->ImageRepository();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `hosted_app_id` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provider_kind` | `string` | Yes |  |
| `registry_auth_token` | `string` | No |  |
| `repository_path` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ImageRepository()->create([
  "organization_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ImageRepository()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImageRepositoryEntity`

Create a new `ImageRepositoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntegrationEntity

```php
$integration = $client->Integration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `array` | Yes |  |
| `gitlab` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `slack` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Integration()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntegrationEntity`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InteractionResponseEntity

```php
$interaction_response = $client->InteractionResponse();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `array` | Yes |  |
| `conversation_id` | `string` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->InteractionResponse()->create([
  "agent_id" => null, // string
  "interaction_id" => null, // string
  "organization_id" => null, // string
  "answer" => null, // array
  "conversation_id" => null, // string
  "expected_revision" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InteractionResponseEntity`

Create a new `InteractionResponseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InvitationEntity

```php
$invitation = $client->Invitation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `mixed` | Yes |  |
| `accepted_by_user` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `mixed` | Yes |  |
| `expires_at_label` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `mixed` | Yes |  |
| `invited_by_user` | `mixed` | Yes |  |
| `organization` | `array` | Yes |  |
| `revoked_at` | `mixed` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Invitation()->create([
  "organization_id" => null, // string
  "email" => null, // string
  "role" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Invitation()->list(["organization_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Invitation()->remove(["id" => "invitation_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InvitationEntity`

Create a new `InvitationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JourneyVariantReplayEntity

```php
$journey_variant_replay = $client->JourneyVariantReplay();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `mixed` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `mixed` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `max_seconds` | `int` | No |  |
| `preparation_receipt` | `mixed` | Yes |  |
| `qualification` | `mixed` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `mixed` | Yes |  |
| `scenario_file` | `array` | Yes |  |
| `scenario_run_id` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->JourneyVariantReplay()->create([
  "journey_variant_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
  "idempotency_key" => null, // string
  "review_reason" => null, // string
  "scenario_file" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JourneyVariantReplayEntity`

Create a new `JourneyVariantReplayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## KnowledgeEntity

```php
$knowledge = $client->Knowledge();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `string` | Yes |  |
| `content_json` | `array` | Yes |  |
| `document` | `array` | Yes |  |
| `documents` | `array` | Yes |  |
| `dreaming` | `array` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `history` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `markdown` | `string` | Yes |  |
| `observed_at` | `string` | Yes |  |
| `organization` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `project_id` | `string` | Yes |  |
| `project_name` | `string` | Yes |  |
| `projects` | `array` | Yes |  |
| `selected_project_id` | `mixed` | Yes |  |
| `source` | `array` | Yes |  |
| `title` | `string` | Yes |  |
| `total` | `int` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Knowledge()->create([
  "organization_id" => null, // string
  "markdown" => null, // string
  "project_id" => null, // string
  "title" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Knowledge()->load(["id" => "knowledge_id", "organization_id" => "organization_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Knowledge()->patch([
  "id" => "knowledge_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Knowledge()->remove(["id" => "knowledge_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Knowledge()->update([
  "id" => "knowledge_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KnowledgeEntity`

Create a new `KnowledgeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocalThreadDeliveryEntity

```php
$local_thread_delivery = $client->LocalThreadDelivery();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `string` | Yes |  |
| `decision_pending` | `bool` | Yes |  |
| `delivery` | `array` | Yes |  |
| `expected_version` | `int` | Yes |  |
| `id` | `string` | No |  |
| `policy` | `array` | Yes |  |
| `recovery_message` | `mixed` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LocalThreadDelivery()->load(["id" => "local_thread_delivery_id", "agent_id" => "agent_id", "local_thread_id" => "local_thread_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LocalThreadDelivery()->update([
  "id" => "local_thread_delivery_id",
  "agent_id" => "agent_id",
  "local_thread_id" => "local_thread_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocalThreadDeliveryEntity`

Create a new `LocalThreadDeliveryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocalThreadOperationEntity

```php
$local_thread_operation = $client->LocalThreadOperation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `arguments` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `array` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `array` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `array` | Yes |  |
| `result` | `mixed` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LocalThreadOperation()->create([
  "agent_id" => null, // string
  "local_thread_id" => null, // string
  "organization_id" => null, // string
  "action" => null, // string
  "arguments" => null, // array
  "key" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LocalThreadOperation()->load(["id" => "local_thread_operation_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocalThreadOperationEntity`

Create a new `LocalThreadOperationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Location()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeEntity

```php
$me = $client->Me();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `mixed` | Yes |  |
| `analytics_distinct_id` | `string` | No |  |
| `analytics_internal` | `bool` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` | No |  |
| `api_token` | `string` | No |  |
| `app_promotion` | `array` | Yes |  |
| `commit_author_email` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `enabled_features` | `array` | Yes |  |
| `github_pr_user_authorization_connected` | `bool` | Yes |  |
| `github_pr_user_authorization_login` | `mixed` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `impersonation` | `mixed` | Yes |  |
| `name` | `mixed` | Yes |  |
| `next_path` | `string` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `array` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` | No |  |
| `openai_sign_in_enabled` | `bool` | No |  |
| `organizations` | `array` | Yes |  |
| `pending_organization_invitation_count` | `int` | Yes |  |
| `pending_organization_invitation_count_label` | `string` | Yes |  |
| `picture_url` | `mixed` | Yes |  |
| `superadmin` | `bool` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `mixed` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Me()->load(["id" => "me_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Me()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeEntity`

Create a new `MeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeEmailEntity

```php
$me_email = $client->MeEmail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `bool` | Yes |  |
| `can_delete` | `bool` | Yes |  |
| `can_resend_verification` | `bool` | Yes |  |
| `can_set_account` | `bool` | Yes |  |
| `can_set_commit_author` | `bool` | Yes |  |
| `commit_author` | `bool` | Yes |  |
| `email` | `string` | Yes |  |
| `emails` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | No |  |
| `verification_status` | `string` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MeEmail()->create([
  "email" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MeEmail()->list();
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->MeEmail()->patch([
  "id" => "me_email_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->MeEmail()->remove(["id" => "me_email_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->MeEmail()->update([
  "id" => "me_email_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeEmailEntity`

Create a new `MeEmailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeOnboardingEntity

```php
$me_onboarding = $client->MeOnboarding();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeOnboardingEntity`

Create a new `MeOnboardingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MediaFileEntity

```php
$media_file = $client->MediaFile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->MediaFile()->load(["id" => "media_file_id", "browser_session_id" => "browser_session_id", "media_id" => "media_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MediaFileEntity`

Create a new `MediaFileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MemberEntity

```php
$member = $client->Member();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `mixed` | Yes |  |
| `accepted_by_user` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `mixed` | Yes |  |
| `expires_at_label` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `mixed` | Yes |  |
| `invited_by_user` | `mixed` | Yes |  |
| `is_self` | `bool` | Yes |  |
| `organization` | `array` | Yes |  |
| `revoked_at` | `mixed` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |
| `user` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Member()->list(["organization_id" => "example"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Member()->patch([
  "id" => "member_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Member()->remove(["id" => "member_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Member()->update([
  "id" => "member_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MemberEntity`

Create a new `MemberEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MemoryEntity

```php
$memory = $client->Memory();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `environment_id` | `string` | No |  |
| `finding` | `string` | Yes |  |
| `history` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `indexed_at` | `mixed` | Yes |  |
| `memory` | `array` | Yes |  |
| `project_id` | `string` | No |  |
| `response` | `string` | No |  |
| `scope` | `array` | Yes |  |
| `source` | `array` | Yes |  |
| `tags` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Memory()->create([
  "organization_id" => null, // string
  "finding" => null, // string
  "title" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Memory()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Memory()->load(["id" => "memory_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Memory()->remove(["id" => "memory_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MemoryEntity`

Create a new `MemoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MergeRequestEntity

```php
$merge_request = $client->MergeRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `array` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` | Yes |  |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `mixed` | Yes |  |
| `current_run` | `mixed` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` | Yes |  |
| `findings` | `array` | Yes |  |
| `github_repository` | `mixed` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` | Yes |  |
| `head_sha` | `string` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `number` | `int` | Yes |  |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `mixed` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `mixed` | No |  |
| `project_id` | `mixed` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `mixed` | Yes |  |
| `provider` | `string` | Yes |  |
| `pull_request` | `array` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `requested_run_id` | `mixed` | Yes |  |
| `runs` | `array` | Yes |  |
| `source_branch` | `mixed` | Yes |  |
| `source_repository` | `mixed` | Yes |  |
| `source_url` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MergeRequest()->create([
  "organization_id" => null, // string
  "idempotency_key" => null, // string
  "number" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->MergeRequest()->load(["id" => "merge_request_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MergeRequestEntity`

Create a new `MergeRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessagingConversationMessageEntity

```php
$messaging_conversation_message = $client->MessagingConversationMessage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `client_operation_id` | `string` | Yes |  |
| `content` | `string` | Yes |  |
| `id` | `string` | No |  |
| `media` | `array` | Yes |  |
| `media_upload_ids` | `array` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `array` | Yes |  |
| `reply_to` | `string` | No | Public ID of a visible message |
| `retry_attachment` | `bool` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `mixed` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `mixed` | No |  |
| `send_style` | `mixed` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MessagingConversationMessage()->create([
  "messaging_conversation_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
  "client_operation_id" => null, // string
  "content" => null, // string
  "media" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessagingConversationMessageEntity`

Create a new `MessagingConversationMessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessagingConversationUploadEntity

```php
$messaging_conversation_upload = $client->MessagingConversationUpload();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `array` | Yes |  |
| `upload_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MessagingConversationUpload()->create([
  "messaging_conversation_id" => null, // string
  "organization_id" => null, // string
  "project_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessagingConversationUploadEntity`

Create a new `MessagingConversationUploadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MetricQueryEntity

```php
$metric_query = $client->MetricQuery();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MetricQuery()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MetricQueryEntity`

Create a new `MetricQueryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NetworkConnectionEntity

```php
$network_connection = $client->NetworkConnection();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->NetworkConnection()->create([
  "organization_id" => null, // string
  "name" => null, // string
]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->NetworkConnection()->patch([
  "id" => "id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->NetworkConnection()->update([
  "id" => "id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NetworkConnectionEntity`

Create a new `NetworkConnectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NomadAllocationEntity

```php
$nomad_allocation = $client->NomadAllocation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `client_status` | `mixed` | Yes |  |
| `create_time` | `mixed` | Yes |  |
| `datacenter` | `mixed` | Yes |  |
| `desired_description` | `mixed` | Yes |  |
| `desired_status` | `mixed` | Yes |  |
| `fetched_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `job_id` | `mixed` | Yes |  |
| `modify_time` | `mixed` | Yes |  |
| `name` | `mixed` | Yes |  |
| `namespace` | `string` | Yes |  |
| `node_id` | `mixed` | Yes |  |
| `node_name` | `mixed` | Yes |  |
| `resources` | `array` | Yes |  |
| `task_group` | `mixed` | Yes |  |
| `task_states` | `array` | Yes |  |
| `verify_runner_images` | `array` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->NomadAllocation()->load(["id" => "nomad_allocation_id", "app_id" => "app_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NomadAllocationEntity`

Create a new `NomadAllocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NomadLogEntity

```php
$nomad_log = $client->NomadLog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `mixed` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `int` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->NomadLog()->list(["app_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NomadLogEntity`

Create a new `NomadLogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEntity

```php
$organization = $client->Organization();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `array` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `github_prs_authored_by_change_author` | `bool` | Yes |  |
| `google_workspace_domain` | `mixed` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` | Yes |  |
| `logo_url` | `mixed` | Yes |  |
| `member_count` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pending_invitation_count` | `int` | Yes |  |
| `personal` | `bool` | Yes |  |
| `repository_count` | `int` | Yes |  |
| `role` | `mixed` | Yes |  |
| `sandbox_region` | `string` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `bool` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` | Yes |  |
| `source_control_providers` | `array` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |
| `verify_pr_scenario_writing_enabled` | `bool` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Organization()->create([
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Organization()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Organization()->load(["id" => "organization_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Organization()->patch([
  "id" => "organization_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Organization()->update([
  "id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEntity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PageEntity

```php
$page = $client->Page();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `array` | Yes |  |
| `checkout_required` | `bool` | Yes |  |
| `cli_signed_in_at` | `mixed` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `array` | Yes |  |
| `demo_project` | `mixed` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `array` | Yes |  |
| `included_deep_scan` | `bool` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `mixed` | No |  |
| `organization` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `project` | `mixed` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `array` | No |  |
| `pull_requests` | `array` | No |  |
| `repositories` | `array` | Yes |  |
| `runs` | `array` | Yes |  |
| `runs_pagination` | `array` | Yes |  |
| `suggested_app_url` | `mixed` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Page()->load(["organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PageEntity`

Create a new `PageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PageAgentEntity

```php
$page_agent = $client->PageAgent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `array` | Yes |  |
| `can_edit_integration_connections` | `bool` | Yes |  |
| `creation_enabled` | `bool` | Yes |  |
| `inbox` | `mixed` | No |  |
| `integration_choices` | `array` | Yes |  |
| `integration_choices_truncated` | `bool` | Yes |  |
| `integration_selected` | `array` | Yes |  |
| `model_choices` | `array` | No |  |
| `new_configuration` | `mixed` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `pagination` | `array` | Yes |  |
| `pinned_agent` | `mixed` | Yes |  |
| `platform_event_types` | `array` | Yes |  |
| `repository_choices` | `array` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `bool` | Yes |  |
| `runtime_versions` | `array` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `mixed` | Yes |  |
| `selected_reference` | `mixed` | Yes |  |
| `viewer_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PageAgent()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PageAgentEntity`

Create a new `PageAgentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PageProjectRunEntity

```php
$page_project_run = $client->PageProjectRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `array` | Yes |  |
| `fix_scenario_count` | `int` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `array` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` | Yes |  |
| `id` | `string` | No |  |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `preparation_reason` | `mixed` | Yes |  |
| `project` | `array` | Yes |  |
| `run` | `array` | Yes |  |
| `scenario_runs` | `array` | Yes |  |
| `selected_scenario_run` | `mixed` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PageProjectRun()->load(["id" => "page_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PageProjectRunEntity`

Create a new `PageProjectRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PagesProjectCredentialEntity

```php
$pages_project_credential = $client->PagesProjectCredential();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `mixed` | No |  |
| `composal_address` | `mixed` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` | Yes |  |
| `credential_keys` | `array` | Yes |  |
| `description` | `mixed` | Yes |  |
| `email_link_auth_origins` | `array` | Yes |  |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `mixed` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `mixed` | Yes |  |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes |  |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `mixed` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `username` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PagesProjectCredential()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PagesProjectCredentialEntity`

Create a new `PagesProjectCredentialEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PagesProjectPersonaEntity

```php
$pages_project_persona = $client->PagesProjectPersona();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `int` | Yes |  |
| `credentials` | `array` | Yes |  |
| `needs_attention_count` | `int` | Yes |  |
| `permissions` | `array` | Yes |  |
| `persona_states` | `array` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `array` | Yes |  |
| `project` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PagesProjectPersona()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PagesProjectPersonaEntity`

Create a new `PagesProjectPersonaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PagesProjectRunEntity

```php
$pages_project_run = $client->PagesProjectRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `string` | Yes |  |
| `environments` | `array` | Yes |  |
| `environments_has_more` | `bool` | Yes |  |
| `pagination` | `array` | Yes |  |
| `runs` | `array` | Yes |  |
| `selected_environment` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PagesProjectRun()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PagesProjectRunEntity`

Create a new `PagesProjectRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PagesProjectScenarioEntity

```php
$pages_project_scenario = $client->PagesProjectScenario();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PagesProjectScenario()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PagesProjectScenarioEntity`

Create a new `PagesProjectScenarioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PersonalAccessTokenEntity

```php
$personal_access_token = $client->PersonalAccessToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PersonalAccessToken()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PersonalAccessToken()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->PersonalAccessToken()->remove(["id" => "personal_access_token_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PersonalAccessTokenEntity`

Create a new `PersonalAccessTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PreviewOperationEntity

```php
$preview_operation = $client->PreviewOperation();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PreviewOperation()->list(["app_id" => "example", "preview_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PreviewOperationEntity`

Create a new `PreviewOperationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PreviewProfileSecretBindingEntity

```php
$preview_profile_secret_binding = $client->PreviewProfileSecretBinding();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PreviewProfileSecretBinding()->create([
  "app_id" => null, // string
  "preview_profile_id" => null, // string
  "env_key" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PreviewProfileSecretBinding()->list(["app_id" => "example", "preview_profile_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->PreviewProfileSecretBinding()->remove(["id" => "preview_profile_secret_binding_id", "app_id" => "app_id", "preview_profile_id" => "preview_profile_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PreviewProfileSecretBindingEntity`

Create a new `PreviewProfileSecretBindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PreviewSecretEntity

```php
$preview_secret = $client->PreviewSecret();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PreviewSecret()->create([
  "app_id" => null, // string
  "preview_id" => null, // string
  "env_key" => null, // string
  "name" => null, // string
  "slug" => null, // string
  "value" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->PreviewSecret()->remove(["id" => "preview_secret_id", "app_id" => "app_id", "preview_id" => "preview_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PreviewSecretEntity`

Create a new `PreviewSecretEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PreviewSharingApprovalEntity

```php
$preview_sharing_approval = $client->PreviewSharingApproval();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `array` | Yes |  |
| `approved_build_secrets` | `array` | Yes |  |
| `approved_default_configuration` | `array` | Yes |  |
| `approved_default_secrets` | `array` | Yes |  |
| `approved_source_keys` | `array` | Yes |  |
| `build_keys` | `array` | No |  |
| `build_secrets` | `array` | No |  |
| `default_configuration` | `array` | No |  |
| `default_secrets` | `array` | No |  |
| `services` | `array` | Yes |  |
| `snapshot_version` | `int` | Yes |  |
| `source_keys` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PreviewSharingApproval()->create([
  "app_id" => null, // string
  "preview_id" => null, // string
  "snapshot_version" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PreviewSharingApproval()->list(["app_id" => "example", "preview_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PreviewSharingApprovalEntity`

Create a new `PreviewSharingApprovalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapIdentityDecisionEntity

```php
$product_map_identity_decision = $client->ProductMapIdentityDecision();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `array` | Yes |  |
| `operation` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `target` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProductMapIdentityDecision()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "observations" => null, // array
  "operation" => null, // string
  "reason" => null, // string
  "target" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapIdentityDecisionEntity`

Create a new `ProductMapIdentityDecisionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapJourneyEntity

```php
$product_map_journey = $client->ProductMapJourney();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `mixed` | No |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `journey` | `array` | Yes |  |
| `next_cursor` | `mixed` | Yes |  |
| `preview` | `mixed` | No |  |
| `scope` | `array` | Yes |  |
| `title` | `string` | Yes |  |
| `tree` | `array` | Yes |  |
| `tree_loaded` | `bool` | No |  |
| `variant_count` | `int` | Yes |  |
| `variants` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProductMapJourney()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProductMapJourney()->load(["id" => "product_map_journey_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapJourneyEntity`

Create a new `ProductMapJourneyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapJourneyReplayEntity

```php
$product_map_journey_replay = $client->ProductMapJourneyReplay();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `mixed` | Yes |  |
| `can_request_qualification` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `mixed` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `preparation_receipt` | `mixed` | Yes |  |
| `qualification` | `mixed` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `bool` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `mixed` | Yes |  |
| `scenario_run_id` | `mixed` | Yes |  |
| `source_digest` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variant_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProductMapJourneyReplay()->load(["id" => "product_map_journey_replay_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapJourneyReplayEntity`

Create a new `ProductMapJourneyReplayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapObservationEntity

```php
$product_map_observation = $client->ProductMapObservation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `array` | Yes |  |
| `events` | `array` | Yes |  |
| `evidence_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `observation_id` | `string` | Yes |  |
| `scope` | `array` | Yes |  |
| `state` | `mixed` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProductMapObservation()->load(["id" => "product_map_observation_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapObservationEntity`

Create a new `ProductMapObservationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapQuestionEntity

```php
$product_map_question = $client->ProductMapQuestion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `area` | `string` | No |  |
| `before` | `string` | No |  |
| `claims` | `array` | Yes |  |
| `evidence_truncated` | `bool` | Yes |  |
| `model` | `string` | Yes |  |
| `persona_id` | `string` | No |  |
| `query` | `string` | No |  |
| `question` | `string` | Yes |  |
| `reasoning_effort` | `string` | Yes |  |
| `revision_id` | `string` | No |  |
| `scope` | `array` | Yes |  |
| `since` | `string` | No |  |
| `state_id` | `string` | No |  |
| `status` | `string` | Yes |  |
| `unknowns` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProductMapQuestion()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "question" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapQuestionEntity`

Create a new `ProductMapQuestionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductMapStateEntity

```php
$product_map_state = $client->ProductMapState();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `mixed` | Yes |  |
| `attempts` | `array` | Yes |  |
| `captured_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `incoming` | `array` | Yes |  |
| `labels` | `array` | Yes |  |
| `layout` | `array` | Yes |  |
| `observation_id` | `string` | Yes |  |
| `omitted_controls` | `int` | Yes |  |
| `outgoing` | `array` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `scope` | `array` | Yes |  |
| `screenshot_url` | `mixed` | Yes |  |
| `state` | `array` | Yes |  |
| `truncated` | `bool` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProductMapState()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProductMapState()->load(["id" => "product_map_state_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductMapStateEntity`

Create a new `ProductMapStateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectEntity

```php
$project = $client->Project();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `mixed` | Yes |  |
| `context` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credentials` | `array` | Yes |  |
| `demo` | `bool` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `array` | Yes |  |
| `environments` | `array` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `icon_url` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_provider` | `array` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `network_connections` | `array` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `overview` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `personas` | `array` | Yes |  |
| `project` | `array` | Yes |  |
| `pull_request_options` | `array` | Yes |  |
| `pull_requests` | `array` | Yes |  |
| `purpose` | `mixed` | Yes |  |
| `runs` | `array` | Yes |  |
| `scenario_history` | `array` | Yes |  |
| `scenario_states` | `array` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `array` | Yes |  |
| `setup_required` | `bool` | No |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences` | `array` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` | Yes |  |
| `website_url` | `mixed` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Project()->create([
  "organization_id" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Project()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Project()->load(["id" => "project_id", "organization_id" => "organization_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->Project()->patch([
  "id" => "project_id",
  "organization_id" => "organization_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Project()->update([
  "id" => "project_id",
  "organization_id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectEntity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectAndroidApkEntity

```php
$project_android_apk = $client->ProjectAndroidApk();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `array` | Yes |  |
| `artifact_paths` | `array` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `array` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `array` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectAndroidApk()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectAndroidApkEntity`

Create a new `ProjectAndroidApkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectCodeMapEntity

```php
$project_code_map = $client->ProjectCodeMap();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `bool` | Yes |  |
| `commit_sha` | `string` | Yes |  |
| `configured` | `bool` | Yes |  |
| `error_code` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `repository_id` | `string` | Yes |  |
| `revision` | `array` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectCodeMap()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "repository_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectCodeMap()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectCodeMapEntity`

Create a new `ProjectCodeMapEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectEnvironmentEntity

```php
$project_environment = $client->ProjectEnvironment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `string` | Yes |  |
| `allowed_origins` | `array` | Yes |  |
| `archived_at` | `mixed` | Yes |  |
| `base_url` | `mixed` | Yes |  |
| `base_url_changeable` | `bool` | Yes | Whether an update may send a new base_url. |
| `binary` | `string` | No |  |
| `conversation_only_messaging` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `desktop` | `mixed` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `mixed` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `messaging_conversation` | `mixed` | Yes |  |
| `messaging_problem` | `mixed` | Yes |  |
| `messaging_source` | `mixed` | Yes |  |
| `messaging_tester_number` | `mixed` | Yes | One configured tester number. |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `mixed` | Yes |  |
| `source_branch` | `mixed` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `mixed` | Yes |  |
| `version` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectEnvironment()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectEnvironment()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectEnvironment()->load(["id" => "project_environment_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ProjectEnvironment()->patch([
  "id" => "project_environment_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ProjectEnvironment()->update([
  "id" => "project_environment_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectEnvironmentEntity`

Create a new `ProjectEnvironmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectFindingEntity

```php
$project_finding = $client->ProjectFinding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `mixed` | No |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `bool` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` | Yes |  |
| `source` | `string` | Yes | The workflow that produced the finding |
| `source_title` | `string` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `verification` | `mixed` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Yes | Where the finding is reviewed within its source |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectFinding()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectFindingEntity`

Create a new `ProjectFindingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectFixtureEntity

```php
$project_fixture = $client->ProjectFixture();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `array` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` | Yes |  |
| `content_type` | `string` | Yes |  |
| `credential_ids` | `array` | Yes |  |
| `credentials` | `array` | Yes |  |
| `environment_ids` | `array` | Yes |  |
| `environments` | `array` | Yes |  |
| `fixtures` | `array` | Yes |  |
| `id` | `string` | No |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `persona_ids` | `array` | Yes |  |
| `personas` | `array` | Yes |  |
| `project` | `array` | Yes |  |
| `sha256` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `version` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectFixture()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectFixture()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectFixture()->load(["id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ProjectFixture()->patch([
  "id" => "project_fixture_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ProjectFixture()->remove(["id" => "project_fixture_id", "organization_id" => "organization_id", "project_id" => "project_id", "version" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ProjectFixture()->update([
  "id" => "project_fixture_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectFixtureEntity`

Create a new `ProjectFixtureEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectIosAppEntity

```php
$project_ios_app = $client->ProjectIosApp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `array` | Yes |  |
| `artifact_paths` | `array` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `array` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `array` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectIosApp()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectIosAppEntity`

Create a new `ProjectIosAppEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectMessagingConversationEntity

```php
$project_messaging_conversation = $client->ProjectMessagingConversation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `string` | Yes |  |
| `attachment_limit` | `int` | Yes |  |
| `attachment_max_bytes` | `int` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `leased` | `bool` | Yes |  |
| `messages` | `array` | Yes |  |
| `reconciled_at` | `mixed` | Yes |  |
| `retirable` | `bool` | Yes |  |
| `seeded` | `bool` | Yes |  |
| `send_blocked_reason` | `mixed` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `mixed` | No |  |
| `tester_number` | `string` | Yes |  |
| `unknown_send` | `bool` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectMessagingConversation()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "assistant_number" => null, // string
  "tester_number" => null, // string
  "verify_environment_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectMessagingConversation()->load(["id" => "project_messaging_conversation_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ProjectMessagingConversation()->patch([
  "id" => "project_messaging_conversation_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ProjectMessagingConversation()->update([
  "id" => "project_messaging_conversation_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectMessagingConversationEntity`

Create a new `ProjectMessagingConversationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectOverviewMetricEntity

```php
$project_overview_metric = $client->ProjectOverviewMetric();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectOverviewMetric()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectOverviewMetricEntity`

Create a new `ProjectOverviewMetricEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectOverviewPullRequestEntity

```php
$project_overview_pull_request = $client->ProjectOverviewPullRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `mixed` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `mixed` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `mixed` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `mixed` | Yes |  |
| `latest_reason` | `mixed` | Yes |  |
| `latest_run_id` | `mixed` | Yes |  |
| `latest_state` | `mixed` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `mixed` | Yes |  |
| `project_slug` | `mixed` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `mixed` | Yes |  |
| `source_repository` | `mixed` | Yes |  |
| `source_url` | `mixed` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectOverviewPullRequest()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectOverviewPullRequestEntity`

Create a new `ProjectOverviewPullRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectProductMapEntity

```php
$project_product_map = $client->ProjectProductMap();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectProductMapEntity`

Create a new `ProjectProductMapEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectRecordingEntity

```php
$project_recording = $client->ProjectRecording();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `draft` | `mixed` | Yes | Present once drafted. |
| `environment_id` | `string` | Yes | The project environment the browser opens. |
| `error` | `mixed` | Yes |  |
| `event_count` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `persona_id` | `string` | Yes | The project persona the journey acts as. |
| `phase` | `string` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `bool` | Yes |  |
| `start_path` | `string` | No | A path on the environment to start at, such as /settings. |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectRecording()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "environment_id" => null, // string
  "persona_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectRecording()->load(["id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ProjectRecording()->remove(["id" => "project_recording_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectRecordingEntity`

Create a new `ProjectRecordingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectRunPlanEntity

```php
$project_run_plan = $client->ProjectRunPlan();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `mixed` | Yes |  |
| `base_url` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dependencies` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `mixed` | Yes |  |
| `kind` | `mixed` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `nodes` | `array` | Yes |  |
| `preview` | `mixed` | Yes |  |
| `project_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectRunPlan()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "dependencies" => null, // array
  "identity_probe" => null, // mixed
  "name" => null, // string
  "nodes" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectRunPlan()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectRunPlan()->load(["id" => "project_run_plan_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ProjectRunPlan()->patch([
  "id" => "project_run_plan_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ProjectRunPlan()->update([
  "id" => "project_run_plan_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectRunPlanEntity`

Create a new `ProjectRunPlanEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectRunScheduleEntity

```php
$project_run_schedule = $client->ProjectRunSchedule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `array` | Yes |  |
| `cron_expression` | `mixed` | No |  |
| `environment_id` | `string` | Yes | Project environment slug or public ID. |
| `environment_name` | `string` | No |  |
| `history` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `array` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string` | Yes |  |
| `notification_channel` | `string` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` | Yes |  |
| `selection_mode` | `string` | Yes |  |
| `slack_subscription_id` | `mixed` | No |  |
| `source_scenario_id` | `mixed` | No |  |
| `state` | `string` | Yes |  |
| `time_of_day` | `string` | Yes |  |
| `time_zone` | `string` | Yes |  |
| `version` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ProjectRunSchedule()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectRunSchedule()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProjectRunSchedule()->load(["id" => "project_run_schedule_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ProjectRunSchedule()->patch([
  "id" => "project_run_schedule_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ProjectRunSchedule()->update([
  "id" => "project_run_schedule_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectRunScheduleEntity`

Create a new `ProjectRunScheduleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectScenarioOptionEntity

```php
$project_scenario_option = $client->ProjectScenarioOption();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `personas` | `array` | Yes |  |
| `project` | `array` | Yes |  |
| `scenario_states` | `array` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `array` | Yes |  |
| `schedule_options` | `mixed` | No |  |
| `schedules` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectScenarioOption()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectScenarioOptionEntity`

Create a new `ProjectScenarioOptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectScenarioRowEntity

```php
$project_scenario_row = $client->ProjectScenarioRow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `int` | Yes |  |
| `dependency_count` | `int` | Yes |  |
| `health` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `step_count` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectScenarioRow()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectScenarioRowEntity`

Create a new `ProjectScenarioRowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectSettingEntity

```php
$project_setting = $client->ProjectSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `array` | Yes |  |
| `messaging_conversations` | `array` | Yes |  |
| `messaging_enabled` | `bool` | Yes |  |
| `permissions` | `array` | Yes |  |
| `project` | `array` | Yes |  |
| `tester_numbers` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ProjectSetting()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectSettingEntity`

Create a new `ProjectSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PullRequestEntity

```php
$pull_request = $client->PullRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `array` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `mixed` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `array` | Yes |  |
| `head_sha` | `string` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | Yes |  |
| `imessage_number` | `string` | No | International destination of this exact deployed commit. |
| `number` | `int` | No |  |
| `pagination` | `array` | Yes |  |
| `permissions` | `array` | Yes |  |
| `preview_cleanup_ready` | `bool` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `mixed` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `mixed` | No |  |
| `project_id` | `string` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `array` | Yes |  |
| `repository_id` | `string` | No |  |
| `runs` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PullRequest()->create([
  "organization_id" => null, // string
  "idempotency_key" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PullRequest()->load(["id" => "pull_request_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PullRequestEntity`

Create a new `PullRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PullRequestSettingEntity

```php
$pull_request_setting = $client->PullRequestSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `mixed` | No |  |
| `app_service_id` | `mixed` | No |  |
| `bots` | `array` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `mixed` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `mixed` | Yes |  |
| `demo_videos` | `bool` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `mixed` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` | No |  |
| `enabled` | `bool` | Yes | Test PRs automatically. |
| `environment` | `string` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `array` | Yes |  |
| `github_check_enabled` | `bool` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `array` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` | Yes |  |
| `imessage_comment_prefix` | `mixed` | Yes |  |
| `imessage_number` | `mixed` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` | Yes |  |
| `limits` | `array` | Yes |  |
| `link_pattern` | `mixed` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `mixed` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` | No |  |
| `messaging_enabled` | `bool` | Yes |  |
| `messaging_tester_number` | `mixed` | Yes | One configured tester number. |
| `non_product_paths` | `array` | No |  |
| `permissions` | `array` | Yes |  |
| `pr_check` | `bool` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` | No |  |
| `preview_comment_authors` | `array` | No |  |
| `preview_comment_pattern` | `string` | No |  |
| `preview_comment_wildcard` | `mixed` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `mixed` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `array` | Yes |  |
| `previews` | `string` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `array` | Yes |  |
| `provider` | `string` | Yes |  |
| `repositories` | `array` | Yes |  |
| `repository` | `string` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `mixed` | Yes |  |
| `service` | `mixed` | Yes | composal: the public service the browsers open. |
| `settings` | `array` | Yes |  |
| `setup` | `mixed` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `array` | Yes | The answers a new setup starts from |
| `source_repository` | `string` | Yes |  |
| `target_mode` | `string` | Yes |  |
| `tester_numbers` | `array` | Yes |  |
| `trigger_label` | `string` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` | No |  |
| `trigger_on_label` | `bool` | No |  |
| `trigger_on_push` | `bool` | No |  |
| `trigger_on_ready` | `bool` | No |  |
| `triggers` | `array` | Yes | When runs start. |
| `verify_environment_id` | `string` | Yes |  |
| `write_scenarios` | `bool` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PullRequestSetting()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PullRequestSetting()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PullRequestSettingEntity`

Create a new `PullRequestSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PullRequestSettingAddRepositoryEntity

```php
$pull_request_setting_add_repository = $client->PullRequestSettingAddRepository();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `string` | Yes |  |
| `replace` | `bool` | No | Make these the project's only repositories. |
| `repositories` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PullRequestSettingAddRepository()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "repositories" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PullRequestSettingAddRepositoryEntity`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PullRequestSettingDetectCommentEntity

```php
$pull_request_setting_detect_comment = $client->PullRequestSettingDetectComment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `array` | No | The bots answer |
| `deployment` | `string` | No | The deployment answer |
| `example_url` | `string` | No |  |
| `imessage_comment_prefix` | `string` | No |  |
| `imessage_number` | `mixed` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `link_pattern` | `string` | No | The link_pattern answer |
| `project_id` | `string` | Yes | Project slug or ID. |
| `provider` | `string` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | No | Repository slug, ID or owner/name. |
| `request_number` | `int` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PullRequestSettingDetectComment()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PullRequestSettingDetectCommentEntity`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecorderEntity

```php
$recorder = $client->Recorder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Recorder()->load(["organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecorderEntity`

Create a new `RecorderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegistryEntity

```php
$registry = $client->Registry();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegistryEntity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegistryV2Entity

```php
$registry_v2 = $client->RegistryV2();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegistryV2Entity`

Create a new `RegistryV2Entity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RelayAgentLocalThreadEntity

```php
$relay_agent_local_thread = $client->RelayAgentLocalThread();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->RelayAgentLocalThread()->remove(["id" => "relay_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RelayAgentLocalThreadEntity`

Create a new `RelayAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportReplayEntity

```php
$report_replay = $client->ReportReplay();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes |  |
| `generated_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `array` | Yes |  |
| `replay_steps` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ReportReplay()->load(["id" => "report_replay_id", "exploration_id" => "exploration_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportReplayEntity`

Create a new `ReportReplayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportScenarioEntity

```php
$report_scenario = $client->ReportScenario();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `string` | Yes |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `array` | Yes |  |
| `project_id` | `mixed` | Yes |  |
| `related_explorations` | `array` | Yes |  |
| `report` | `array` | Yes |  |
| `saves_scenarios` | `bool` | Yes |  |
| `scenario_generation` | `array` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ReportScenario()->create([
  "exploration_id" => null, // string
  "organization_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportScenarioEntity`

Create a new `ReportScenarioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RunScenarioRunEntity

```php
$run_scenario_run = $client->RunScenarioRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RunScenarioRunEntity`

Create a new `RunScenarioRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RunScheduleOptionEntity

```php
$run_schedule_option = $client->RunScheduleOption();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->RunScheduleOption()->list(["organization_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RunScheduleOptionEntity`

Create a new `RunScheduleOptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RunSearchEntity

```php
$run_search = $client->RunSearch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->RunSearch()->load(["organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RunSearchEntity`

Create a new `RunSearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RunUpdateEntity

```php
$run_update = $client->RunUpdate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `bool` | Yes |  |
| `comment_url` | `mixed` | Yes |  |
| `draft` | `bool` | Yes |  |
| `github_repository` | `mixed` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `mixed` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `mixed` | Yes |  |
| `latest_current` | `bool` | Yes |  |
| `latest_head_sha` | `mixed` | Yes |  |
| `latest_reason` | `mixed` | Yes |  |
| `latest_run_id` | `mixed` | Yes |  |
| `latest_state` | `mixed` | Yes |  |
| `number` | `int` | Yes |  |
| `project_id` | `mixed` | Yes |  |
| `project_slug` | `mixed` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `mixed` | Yes |  |
| `source_repository` | `mixed` | Yes |  |
| `source_url` | `mixed` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->RunUpdate()->list(["organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RunUpdateEntity`

Create a new `RunUpdateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScenarioRevisionEntity

```php
$scenario_revision = $client->ScenarioRevision();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `batch` | `string` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `string` | Yes |  |
| `definition` | `array` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` | Yes |  |
| `source` | `string` | Yes | The client the save came through. |
| `user` | `mixed` | Yes | Null when a system job saved the Scenario. |
| `version` | `int` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ScenarioRevision()->list(["organization_id" => "example", "project_id" => "example", "scenario_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScenarioRevisionEntity`

Create a new `ScenarioRevisionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScenarioRunLessonEntity

```php
$scenario_run_lesson = $client->ScenarioRunLesson();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `string` | Yes |  |
| `title` | `string` | No | Defaults to the Scenario's name. |
| `workaround` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ScenarioRunLesson()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "run_id" => null, // string
  "scenario_run_id" => null, // string
  "finding" => null, // string
  "workaround" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScenarioRunLessonEntity`

Create a new `ScenarioRunLessonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScenarioRunScenarioEditEntity

```php
$scenario_run_scenario_edit = $client->ScenarioRunScenarioEdit();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScenarioRunScenarioEditEntity`

Create a new `ScenarioRunScenarioEditEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ServiceEndpointEntity

```php
$service_endpoint = $client->ServiceEndpoint();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ServiceEndpoint()->create([
  "app_id" => null, // string
  "service_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ServiceEndpoint()->list(["app_id" => "example", "service_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ServiceEndpoint()->load(["id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->ServiceEndpoint()->patch([
  "id" => "service_endpoint_id",
  "app_id" => "app_id",
  "service_id" => "service_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ServiceEndpoint()->remove(["id" => "service_endpoint_id", "app_id" => "app_id", "service_id" => "service_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ServiceEndpoint()->update([
  "id" => "service_endpoint_id",
  "app_id" => "app_id",
  "service_id" => "service_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ServiceEndpointEntity`

Create a new `ServiceEndpointEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SitePreviewEntity

```php
$site_preview = $client->SitePreview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `mixed` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `mixed` | Yes |  |
| `url` | `string` | Yes | The address as it will be saved |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SitePreview()->load(["organization_id" => "organization_id", "url" => "url"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SitePreviewEntity`

Create a new `SitePreviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SlackChannelEntity

```php
$slack_channel = $client->SlackChannel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `is_member` | `bool` | Yes |  |
| `is_private` | `bool` | Yes |  |
| `is_slack_connect` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `published` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->SlackChannel()->list(["agent_id" => "example", "organization_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SlackChannelEntity`

Create a new `SlackChannelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SparkAgentLocalThreadEntity

```php
$spark_agent_local_thread = $client->SparkAgentLocalThread();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `archived` | `bool` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `bool` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `bool` | No |  |
| `can_end` | `bool` | Yes |  |
| `can_interrupt` | `bool` | Yes |  |
| `can_send` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `array` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `device_name` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `mixed` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `full_title` | `string` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `last_activity_at` | `mixed` | Yes |  |
| `native_thread_id` | `string` | Yes |  |
| `parent_conversation_id` | `mixed` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `array` | Yes |  |
| `relay_disconnected_at` | `mixed` | No |  |
| `relay_participant` | `array` | Yes |  |
| `result` | `mixed` | Yes |  |
| `result_expired` | `bool` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `mixed` | No |  |
| `section` | `string` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` | Yes |  |
| `status` | `mixed` | Yes | What the native thread is doing. |
| `task_configured` | `bool` | Yes |  |
| `thread_id` | `string` | Yes |  |
| `title` | `string` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->SparkAgentLocalThread()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "device_id" => null, // string
  "key" => null, // string
  "provider" => null, // string
  "thread_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SparkAgentLocalThread()->load(["id" => "spark_agent_local_thread_id", "agent_id" => "agent_id", "organization_id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SparkAgentLocalThreadEntity`

Create a new `SparkAgentLocalThreadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StaticSiteEntity

```php
$static_site = $client->StaticSite();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `mixed` | Yes |  |
| `cdn_hostname` | `string` | Yes |  |
| `cdn_url` | `string` | Yes |  |
| `cname_target` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_url` | `string` | Yes |  |
| `description` | `mixed` | Yes |  |
| `error_document` | `mixed` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `hosted_app_id` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `index_document` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provisioned` | `bool` | Yes |  |
| `provisioned_at` | `mixed` | Yes |  |
| `region` | `mixed` | Yes |  |
| `replication_regions` | `array` | Yes |  |
| `repository_id` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->StaticSite()->create([
  "organization_id" => null, // string
  "name" => null, // string
  "slug" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->StaticSite()->list(["organization_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->StaticSite()->load(["id" => "static_site_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->StaticSite()->patch([
  "id" => "static_site_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->StaticSite()->remove(["id" => "static_site_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->StaticSite()->update([
  "id" => "static_site_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StaticSiteEntity`

Create a new `StaticSiteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StaticSiteDeploymentEntity

```php
$static_site_deployment = $client->StaticSiteDeployment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `mixed` | Yes |  |
| `activated_at_label` | `mixed` | Yes |  |
| `commit_sha` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `mixed` | Yes |  |
| `creator_user_id` | `mixed` | Yes |  |
| `deploy_slug` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `file_count` | `int` | Yes |  |
| `file_count_label` | `string` | Yes |  |
| `finished_at` | `mixed` | Yes |  |
| `finished_at_label` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `is_active` | `bool` | Yes |  |
| `source_ref` | `mixed` | Yes |  |
| `started_at` | `mixed` | Yes |  |
| `started_at_label` | `mixed` | Yes |  |
| `static_site_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `total_bytes` | `int` | Yes |  |
| `total_bytes_label` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `mixed` | Yes |  |
| `uploaded_at` | `mixed` | Yes |  |
| `uploaded_at_label` | `mixed` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->StaticSiteDeployment()->create([
  "static_site_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->StaticSiteDeployment()->list(["static_site_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->StaticSiteDeployment()->load(["id" => "static_site_deployment_id", "static_site_id" => "static_site_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StaticSiteDeploymentEntity`

Create a new `StaticSiteDeploymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StaticSiteDomainEntity

```php
$static_site_domain = $client->StaticSiteDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `hosted_app_id` | `mixed` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `mixed` | Yes |  |
| `record_name` | `mixed` | Yes |  |
| `record_type` | `mixed` | Yes |  |
| `record_value` | `mixed` | Yes |  |
| `redirect_to` | `mixed` | Yes |  |
| `static_site_id` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->StaticSiteDomain()->create([
  "static_site_id" => null, // string
  "hostname" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->StaticSiteDomain()->list(["static_site_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->StaticSiteDomain()->load(["id" => "static_site_domain_id", "static_site_id" => "static_site_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->StaticSiteDomain()->patch([
  "id" => "static_site_domain_id",
  "static_site_id" => "static_site_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->StaticSiteDomain()->remove(["id" => "static_site_domain_id", "static_site_id" => "static_site_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->StaticSiteDomain()->update([
  "id" => "static_site_domain_id",
  "static_site_id" => "static_site_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StaticSiteDomainEntity`

Create a new `StaticSiteDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubscriptionModelEntity

```php
$subscription_model = $client->SubscriptionModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `reasoning` | `array` | No | Effort levels this plan model accepts. |
| `speeds` | `array` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->SubscriptionModel()->list(["agent_id" => "example", "organization_id" => "example", "profile_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubscriptionModelEntity`

Create a new `SubscriptionModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThreadPreviewEntity

```php
$thread_preview = $client->ThreadPreview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `mixed` | Yes |  |
| `port` | `int` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ThreadPreview()->create([
  "agent_id" => null, // string
  "organization_id" => null, // string
  "thread_id" => null, // string
  "port" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThreadPreviewEntity`

Create a new `ThreadPreviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerificationProjectCredentialEntity

```php
$verification_project_credential = $client->VerificationProjectCredential();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `mixed` | No |  |
| `browser_session` | `string` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `mixed` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | No | Select the Composal-managed Google test account when available. |
| `configured` | `bool` | Yes |  |
| `cookies` | `string` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `array` | Yes |  |
| `description` | `mixed` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `array` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `mixed` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `mixed` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes | Optional sign-in path or URL. |
| `managed` | `bool` | Yes |  |
| `mfa_enabled` | `bool` | Yes |  |
| `name` | `string` | Yes |  |
| `oidc` | `array` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `remove_browser_authentication` | `bool` | No |  |
| `remove_totp` | `bool` | No |  |
| `sign_in_verified` | `bool` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerificationProjectCredential()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "login_method" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VerificationProjectCredential()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VerificationProjectCredential()->load(["id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->VerificationProjectCredential()->patch([
  "id" => "verification_project_credential_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->VerificationProjectCredential()->remove(["id" => "verification_project_credential_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->VerificationProjectCredential()->update([
  "id" => "verification_project_credential_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerificationProjectCredentialEntity`

Create a new `VerificationProjectCredentialEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerificationProjectPersonaEntity

```php
$verification_project_persona = $client->VerificationProjectPersona();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes |  |
| `archived_at` | `mixed` | Yes |  |
| `capabilities` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credential_id` | `mixed` | Yes | The credential this persona signs in with. |
| `goals` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerificationProjectPersona()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "name" => null, // string
  "role" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VerificationProjectPersona()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VerificationProjectPersona()->load(["id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->VerificationProjectPersona()->patch([
  "id" => "verification_project_persona_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->VerificationProjectPersona()->remove(["id" => "verification_project_persona_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->VerificationProjectPersona()->update([
  "id" => "verification_project_persona_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerificationProjectPersonaEntity`

Create a new `VerificationProjectPersonaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerificationProjectRunEntity

```php
$verification_project_run = $client->VerificationProjectRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `mixed` | Yes |  |
| `approved_digest` | `mixed` | Yes |  |
| `archived_at` | `mixed` | Yes |  |
| `available_tests` | `array` | Yes |  |
| `can_archive` | `bool` | Yes |  |
| `can_restore` | `bool` | Yes |  |
| `can_start_another_run` | `bool` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `concurrency` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator_name` | `mixed` | Yes |  |
| `definition_mode` | `string` | Yes |  |
| `environment_id` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `int` | Yes |  |
| `max_seconds` | `int` | Yes |  |
| `outcome` | `mixed` | Yes |  |
| `permissions` | `array` | Yes |  |
| `plan_digest` | `mixed` | Yes |  |
| `preparation_error_code` | `mixed` | Yes |  |
| `progress` | `array` | Yes |  |
| `project` | `array` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `mixed` | Yes |  |
| `queued_at` | `mixed` | Yes |  |
| `run` | `array` | Yes |  |
| `run_plan_id` | `mixed` | No |  |
| `scenario_runs` | `array` | Yes |  |
| `source_run_id` | `mixed` | Yes |  |
| `source_versions` | `mixed` | Yes |  |
| `start_when_prepared` | `bool` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` | Yes |  |
| `target_snapshot` | `array` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences_snapshot` | `array` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VerificationProjectRun()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VerificationProjectRun()->load(["id" => "verification_project_run_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerificationProjectRunEntity`

Create a new `VerificationProjectRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerificationProjectScenarioEntity

```php
$verification_project_scenario = $client->VerificationProjectScenario();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `array` | No |  |
| `allowed_actions` | `string` | Yes |  |
| `archived_at` | `mixed` | Yes |  |
| `cleanup` | `array` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` | Yes |  |
| `dependencies` | `array` | Yes |  |
| `fixtures` | `array` | No | Files upload steps choose, ordered by name. |
| `health` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `mixed` | No |  |
| `if` | `mixed` | No | A documented subset of Actions expressions. |
| `labels` | `array` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `mixed` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `on` | `mixed` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `array` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `primary_actor` | `mixed` | No |  |
| `project_id` | `string` | Yes |  |
| `selectable_for_run` | `bool` | Yes |  |
| `starting_conditions` | `mixed` | Yes |  |
| `steps` | `array` | Yes |  |
| `triggers` | `array` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` | Yes |  |
| `version` | `int` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerificationProjectScenario()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VerificationProjectScenario()->list(["organization_id" => "example", "project_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VerificationProjectScenario()->load(["id" => "verification_project_scenario_id", "organization_id" => "organization_id", "project_id" => "project_id"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->VerificationProjectScenario()->patch([
  "id" => "verification_project_scenario_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->VerificationProjectScenario()->update([
  "id" => "verification_project_scenario_id",
  "organization_id" => "organization_id",
  "project_id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerificationProjectScenarioEntity`

Create a new `VerificationProjectScenarioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerifyAppDomainEntity

```php
$verify_app_domain = $client->VerifyAppDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerifyAppDomain()->create([
  "app_id" => null, // string
  "id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerifyAppDomainEntity`

Create a new `VerifyAppDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerifyBrowserSessionEntity

```php
$verify_browser_session = $client->VerifyBrowserSession();
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
| `viewer_url` | `mixed` | Yes | Owner-only bearer link. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerifyBrowserSession()->create([
  "organization_id" => null, // string
  "project_id" => null, // string
  "url" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VerifyBrowserSession()->load(["id" => "verify_browser_session_id", "organization_id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->VerifyBrowserSession()->remove(["id" => "verify_browser_session_id", "organization_id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerifyBrowserSessionEntity`

Create a new `VerifyBrowserSessionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerifyStaticSiteDomainEntity

```php
$verify_static_site_domain = $client->VerifyStaticSiteDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `mixed` | Yes |  |
| `app_service_id` | `mixed` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `mixed` | Yes |  |
| `hosted_app_id` | `mixed` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `mixed` | Yes |  |
| `record_name` | `mixed` | Yes |  |
| `record_type` | `mixed` | Yes |  |
| `record_value` | `mixed` | Yes |  |
| `redirect_to` | `mixed` | Yes |  |
| `static_site_id` | `mixed` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->VerifyStaticSiteDomain()->create([
  "id" => null, // string
  "static_site_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerifyStaticSiteDomainEntity`

Create a new `VerifyStaticSiteDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VersionLogEntity

```php
$version_log = $client->VersionLog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `string` | Yes |  |
| `failure_phase` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `image_digest` | `mixed` | Yes |  |
| `image_reference` | `mixed` | Yes |  |
| `installer_version` | `string` | Yes |  |
| `ready_at` | `mixed` | Yes |  |
| `receipt` | `mixed` | Yes |  |
| `safe_error` | `mixed` | Yes |  |
| `started_at` | `mixed` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VersionLog()->list(["binary_id" => "example", "organization_id" => "example", "version_id" => "example", "project_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VersionLogEntity`

Create a new `VersionLogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebBotAuthEntity

```php
$web_bot_auth = $client->WebBotAuth();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string` | Yes |  |
| `origin` | `string` | Yes |  |
| `signatures` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->WebBotAuth()->create([
  "origin" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebBotAuthEntity`

Create a new `WebBotAuthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkflowRunStepEntity

```php
$workflow_run_step = $client->WorkflowRunStep();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkflowRunStepEntity`

Create a new `WorkflowRunStepEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkflowRunStopNoticeEntity

```php
$workflow_run_stop_notice = $client->WorkflowRunStopNotice();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkflowRunStopNoticeEntity`

Create a new `WorkflowRunStopNoticeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkflowTriggerSkippedEntity

```php
$workflow_trigger_skipped = $client->WorkflowTriggerSkipped();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkflowTriggerSkippedEntity`

Create a new `WorkflowTriggerSkippedEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new ComposalSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "secrets" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

