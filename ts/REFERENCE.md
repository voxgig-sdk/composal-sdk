# Composal TypeScript SDK Reference

Complete API reference for the Composal TypeScript SDK.


## ComposalSDK

### Constructor

```ts
new ComposalSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ComposalSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ComposalSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ComposalSDK` instance in test mode.


### Instance Methods

#### `Agent(data?: object)`

Create a new `Agent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentEntity` instance.

#### `AgentAttachment(data?: object)`

Create a new `AgentAttachment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentAttachmentEntity` instance.

#### `AgentAutomation(data?: object)`

Create a new `AgentAutomation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentAutomationEntity` instance.

#### `AgentAvatar(data?: object)`

Create a new `AgentAvatar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentAvatarEntity` instance.

#### `AgentCommand(data?: object)`

Create a new `AgentCommand` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentCommandEntity` instance.

#### `AgentComputer(data?: object)`

Create a new `AgentComputer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentComputerEntity` instance.

#### `AgentConnection(data?: object)`

Create a new `AgentConnection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentConnectionEntity` instance.

#### `AgentControlFlow(data?: object)`

Create a new `AgentControlFlow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentControlFlowEntity` instance.

#### `AgentCoordination(data?: object)`

Create a new `AgentCoordination` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentCoordinationEntity` instance.

#### `AgentEmail(data?: object)`

Create a new `AgentEmail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentEmailEntity` instance.

#### `AgentFile(data?: object)`

Create a new `AgentFile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentFileEntity` instance.

#### `AgentInput(data?: object)`

Create a new `AgentInput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentInputEntity` instance.

#### `AgentIntegration(data?: object)`

Create a new `AgentIntegration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentIntegrationEntity` instance.

#### `AgentInteraction(data?: object)`

Create a new `AgentInteraction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentInteractionEntity` instance.

#### `AgentLibrary(data?: object)`

Create a new `AgentLibrary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentLibraryEntity` instance.

#### `AgentManager(data?: object)`

Create a new `AgentManager` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentManagerEntity` instance.

#### `AgentManagerChoice(data?: object)`

Create a new `AgentManagerChoice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentManagerChoiceEntity` instance.

#### `AgentMarketplace(data?: object)`

Create a new `AgentMarketplace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentMarketplaceEntity` instance.

#### `AgentMarketplaceShared(data?: object)`

Create a new `AgentMarketplaceShared` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentMarketplaceSharedEntity` instance.

#### `AgentMissionControl(data?: object)`

Create a new `AgentMissionControl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentMissionControlEntity` instance.

#### `AgentOperation(data?: object)`

Create a new `AgentOperation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentOperationEntity` instance.

#### `AgentProvisioning(data?: object)`

Create a new `AgentProvisioning` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentProvisioningEntity` instance.

#### `AgentPullRequest(data?: object)`

Create a new `AgentPullRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentPullRequestEntity` instance.

#### `AgentQuestion(data?: object)`

Create a new `AgentQuestion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentQuestionEntity` instance.

#### `AgentRepository(data?: object)`

Create a new `AgentRepository` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentRepositoryEntity` instance.

#### `AgentResource(data?: object)`

Create a new `AgentResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentResourceEntity` instance.

#### `AgentRoutine(data?: object)`

Create a new `AgentRoutine` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentRoutineEntity` instance.

#### `AgentRun(data?: object)`

Create a new `AgentRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentRunEntity` instance.

#### `AgentRuntime(data?: object)`

Create a new `AgentRuntime` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentRuntimeEntity` instance.

#### `AgentSetting(data?: object)`

Create a new `AgentSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSettingEntity` instance.

#### `AgentSharing(data?: object)`

Create a new `AgentSharing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSharingEntity` instance.

#### `AgentSite(data?: object)`

Create a new `AgentSite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSiteEntity` instance.

#### `AgentSkill(data?: object)`

Create a new `AgentSkill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSkillEntity` instance.

#### `AgentSlack(data?: object)`

Create a new `AgentSlack` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSlackEntity` instance.

#### `AgentSubagent(data?: object)`

Create a new `AgentSubagent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSubagentEntity` instance.

#### `AgentSubscription(data?: object)`

Create a new `AgentSubscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentSubscriptionEntity` instance.

#### `AgentTeammate(data?: object)`

Create a new `AgentTeammate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentTeammateEntity` instance.

#### `AgentTerminal(data?: object)`

Create a new `AgentTerminal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentTerminalEntity` instance.

#### `AgentThread(data?: object)`

Create a new `AgentThread` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentThreadEntity` instance.

#### `AgentTool(data?: object)`

Create a new `AgentTool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentToolEntity` instance.

#### `AgentVerifyProject(data?: object)`

Create a new `AgentVerifyProject` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentVerifyProjectEntity` instance.

#### `AgentWait(data?: object)`

Create a new `AgentWait` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWaitEntity` instance.

#### `AgentWebhook(data?: object)`

Create a new `AgentWebhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWebhookEntity` instance.

#### `AgentWork(data?: object)`

Create a new `AgentWork` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkEntity` instance.

#### `AgentWorkflow(data?: object)`

Create a new `AgentWorkflow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkflowEntity` instance.

#### `AgentWorkflowProposal(data?: object)`

Create a new `AgentWorkflowProposal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkflowProposalEntity` instance.

#### `AgentWorkflowRun(data?: object)`

Create a new `AgentWorkflowRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkflowRunEntity` instance.

#### `AgentWorkflowTrigger(data?: object)`

Create a new `AgentWorkflowTrigger` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkflowTriggerEntity` instance.

#### `AgentWorkspace(data?: object)`

Create a new `AgentWorkspace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWorkspaceEntity` instance.

#### `AgentWritePermission(data?: object)`

Create a new `AgentWritePermission` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentWritePermissionEntity` instance.

#### `AllocationLog(data?: object)`

Create a new `AllocationLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AllocationLogEntity` instance.

#### `App(data?: object)`

Create a new `App` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppEntity` instance.

#### `AppCdn(data?: object)`

Create a new `AppCdn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppCdnEntity` instance.

#### `AppConfigVariable(data?: object)`

Create a new `AppConfigVariable` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppConfigVariableEntity` instance.

#### `AppDataResource(data?: object)`

Create a new `AppDataResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppDataResourceEntity` instance.

#### `AppDeploy(data?: object)`

Create a new `AppDeploy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppDeployEntity` instance.

#### `AppDeployment(data?: object)`

Create a new `AppDeployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppDeploymentEntity` instance.

#### `AppDeploymentOperation(data?: object)`

Create a new `AppDeploymentOperation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppDeploymentOperationEntity` instance.

#### `AppDeploymentRollback(data?: object)`

Create a new `AppDeploymentRollback` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppDeploymentRollbackEntity` instance.

#### `AppEnvironment(data?: object)`

Create a new `AppEnvironment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppEnvironmentEntity` instance.

#### `AppLocation(data?: object)`

Create a new `AppLocation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppLocationEntity` instance.

#### `AppMetric(data?: object)`

Create a new `AppMetric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppMetricEntity` instance.

#### `AppPreview(data?: object)`

Create a new `AppPreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppPreviewEntity` instance.

#### `AppPreviewProfile(data?: object)`

Create a new `AppPreviewProfile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppPreviewProfileEntity` instance.

#### `AppRun(data?: object)`

Create a new `AppRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppRunEntity` instance.

#### `AppSecret(data?: object)`

Create a new `AppSecret` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppSecretEntity` instance.

#### `AppService(data?: object)`

Create a new `AppService` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppServiceEntity` instance.

#### `AppServiceBinding(data?: object)`

Create a new `AppServiceBinding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppServiceBindingEntity` instance.

#### `AppServicePlacement(data?: object)`

Create a new `AppServicePlacement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppServicePlacementEntity` instance.

#### `AppStorageResource(data?: object)`

Create a new `AppStorageResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppStorageResourceEntity` instance.

#### `AttachmentPart(data?: object)`

Create a new `AttachmentPart` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AttachmentPartEntity` instance.

#### `AutomationEvent(data?: object)`

Create a new `AutomationEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AutomationEventEntity` instance.

#### `AutomationRun(data?: object)`

Create a new `AutomationRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AutomationRunEntity` instance.

#### `Binary(data?: object)`

Create a new `Binary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BinaryEntity` instance.

#### `BinaryVersion(data?: object)`

Create a new `BinaryVersion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BinaryVersionEntity` instance.

#### `BrowserEgressCandidate(data?: object)`

Create a new `BrowserEgressCandidate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserEgressCandidateEntity` instance.

#### `BrowserSession(data?: object)`

Create a new `BrowserSession` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionEntity` instance.

#### `BrowserSessionConnection(data?: object)`

Create a new `BrowserSessionConnection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionConnectionEntity` instance.

#### `BrowserSessionControl(data?: object)`

Create a new `BrowserSessionControl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionControlEntity` instance.

#### `BrowserSessionEvent(data?: object)`

Create a new `BrowserSessionEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionEventEntity` instance.

#### `BrowserSessionMedia(data?: object)`

Create a new `BrowserSessionMedia` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionMediaEntity` instance.

#### `BrowserSessionRecording(data?: object)`

Create a new `BrowserSessionRecording` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionRecordingEntity` instance.

#### `BrowserSessionScreenshot(data?: object)`

Create a new `BrowserSessionScreenshot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionScreenshotEntity` instance.

#### `BrowserSessionTask(data?: object)`

Create a new `BrowserSessionTask` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BrowserSessionTaskEntity` instance.

#### `CatalogSelector(data?: object)`

Create a new `CatalogSelector` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CatalogSelectorEntity` instance.

#### `CdnDeployment(data?: object)`

Create a new `CdnDeployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CdnDeploymentEntity` instance.

#### `CdnHostname(data?: object)`

Create a new `CdnHostname` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CdnHostnameEntity` instance.

#### `CdnSpace(data?: object)`

Create a new `CdnSpace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CdnSpaceEntity` instance.

#### `CdnSpaceObject(data?: object)`

Create a new `CdnSpaceObject` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CdnSpaceObjectEntity` instance.

#### `ConnectionRequest(data?: object)`

Create a new `ConnectionRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionRequestEntity` instance.

#### `ConnectionSource(data?: object)`

Create a new `ConnectionSource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionSourceEntity` instance.

#### `CoordinationWait(data?: object)`

Create a new `CoordinationWait` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoordinationWaitEntity` instance.

#### `CredentialSignInCheck(data?: object)`

Create a new `CredentialSignInCheck` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CredentialSignInCheckEntity` instance.

#### `DataResourceRotateCredential(data?: object)`

Create a new `DataResourceRotateCredential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DataResourceRotateCredentialEntity` instance.

#### `DeepScan(data?: object)`

Create a new `DeepScan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeepScanEntity` instance.

#### `DeepScanFinding(data?: object)`

Create a new `DeepScanFinding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeepScanFindingEntity` instance.

#### `DeepScanFlow(data?: object)`

Create a new `DeepScanFlow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeepScanFlowEntity` instance.

#### `DeepScanMappedFlow(data?: object)`

Create a new `DeepScanMappedFlow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeepScanMappedFlowEntity` instance.

#### `DeepScanOption(data?: object)`

Create a new `DeepScanOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeepScanOptionEntity` instance.

#### `DemoShare(data?: object)`

Create a new `DemoShare` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DemoShareEntity` instance.

#### `DemoShareSegment(data?: object)`

Create a new `DemoShareSegment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DemoShareSegmentEntity` instance.

#### `DeploymentDashboardNomad(data?: object)`

Create a new `DeploymentDashboardNomad` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeploymentDashboardNomadEntity` instance.

#### `DeploymentFile(data?: object)`

Create a new `DeploymentFile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeploymentFileEntity` instance.

#### `DomainPathRule(data?: object)`

Create a new `DomainPathRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainPathRuleEntity` instance.

#### `Dream(data?: object)`

Create a new `Dream` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DreamEntity` instance.

#### `Environment(data?: object)`

Create a new `Environment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentEntity` instance.

#### `EnvironmentDiscoveryRun(data?: object)`

Create a new `EnvironmentDiscoveryRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentDiscoveryRunEntity` instance.

#### `EnvironmentExploration(data?: object)`

Create a new `EnvironmentExploration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentExplorationEntity` instance.

#### `EnvironmentFirstRun(data?: object)`

Create a new `EnvironmentFirstRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentFirstRunEntity` instance.

#### `EnvironmentRevision(data?: object)`

Create a new `EnvironmentRevision` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentRevisionEntity` instance.

#### `EnvironmentSecretBinding(data?: object)`

Create a new `EnvironmentSecretBinding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentSecretBindingEntity` instance.

#### `EnvironmentTestAccount(data?: object)`

Create a new `EnvironmentTestAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentTestAccountEntity` instance.

#### `Evidence(data?: object)`

Create a new `Evidence` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EvidenceEntity` instance.

#### `Exploration(data?: object)`

Create a new `Exploration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExplorationEntity` instance.

#### `ExplorationMessage(data?: object)`

Create a new `ExplorationMessage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExplorationMessageEntity` instance.

#### `ExplorationReport(data?: object)`

Create a new `ExplorationReport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExplorationReportEntity` instance.

#### `ExplorationScenario(data?: object)`

Create a new `ExplorationScenario` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExplorationScenarioEntity` instance.

#### `Finding(data?: object)`

Create a new `Finding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FindingEntity` instance.

#### `GithubConnection(data?: object)`

Create a new `GithubConnection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GithubConnectionEntity` instance.

#### `HostingAppDomain(data?: object)`

Create a new `HostingAppDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HostingAppDomainEntity` instance.

#### `ImageRepository(data?: object)`

Create a new `ImageRepository` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImageRepositoryEntity` instance.

#### `Integration(data?: object)`

Create a new `Integration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntegrationEntity` instance.

#### `InteractionResponse(data?: object)`

Create a new `InteractionResponse` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InteractionResponseEntity` instance.

#### `Invitation(data?: object)`

Create a new `Invitation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InvitationEntity` instance.

#### `JourneyVariantReplay(data?: object)`

Create a new `JourneyVariantReplay` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JourneyVariantReplayEntity` instance.

#### `Knowledge(data?: object)`

Create a new `Knowledge` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KnowledgeEntity` instance.

#### `LocalThreadDelivery(data?: object)`

Create a new `LocalThreadDelivery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocalThreadDeliveryEntity` instance.

#### `LocalThreadOperation(data?: object)`

Create a new `LocalThreadOperation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocalThreadOperationEntity` instance.

#### `Location(data?: object)`

Create a new `Location` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationEntity` instance.

#### `Me(data?: object)`

Create a new `Me` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeEntity` instance.

#### `MeEmail(data?: object)`

Create a new `MeEmail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeEmailEntity` instance.

#### `MeOnboarding(data?: object)`

Create a new `MeOnboarding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeOnboardingEntity` instance.

#### `MediaFile(data?: object)`

Create a new `MediaFile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MediaFileEntity` instance.

#### `Member(data?: object)`

Create a new `Member` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MemberEntity` instance.

#### `Memory(data?: object)`

Create a new `Memory` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MemoryEntity` instance.

#### `MergeRequest(data?: object)`

Create a new `MergeRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MergeRequestEntity` instance.

#### `MessagingConversationMessage(data?: object)`

Create a new `MessagingConversationMessage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessagingConversationMessageEntity` instance.

#### `MessagingConversationUpload(data?: object)`

Create a new `MessagingConversationUpload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessagingConversationUploadEntity` instance.

#### `MetricQuery(data?: object)`

Create a new `MetricQuery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetricQueryEntity` instance.

#### `NetworkConnection(data?: object)`

Create a new `NetworkConnection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NetworkConnectionEntity` instance.

#### `NomadAllocation(data?: object)`

Create a new `NomadAllocation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NomadAllocationEntity` instance.

#### `NomadLog(data?: object)`

Create a new `NomadLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NomadLogEntity` instance.

#### `Organization(data?: object)`

Create a new `Organization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEntity` instance.

#### `Page(data?: object)`

Create a new `Page` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PageEntity` instance.

#### `PageAgent(data?: object)`

Create a new `PageAgent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PageAgentEntity` instance.

#### `PageProjectRun(data?: object)`

Create a new `PageProjectRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PageProjectRunEntity` instance.

#### `PagesProjectCredential(data?: object)`

Create a new `PagesProjectCredential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PagesProjectCredentialEntity` instance.

#### `PagesProjectPersona(data?: object)`

Create a new `PagesProjectPersona` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PagesProjectPersonaEntity` instance.

#### `PagesProjectRun(data?: object)`

Create a new `PagesProjectRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PagesProjectRunEntity` instance.

#### `PagesProjectScenario(data?: object)`

Create a new `PagesProjectScenario` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PagesProjectScenarioEntity` instance.

#### `PersonalAccessToken(data?: object)`

Create a new `PersonalAccessToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PersonalAccessTokenEntity` instance.

#### `PreviewOperation(data?: object)`

Create a new `PreviewOperation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PreviewOperationEntity` instance.

#### `PreviewProfileSecretBinding(data?: object)`

Create a new `PreviewProfileSecretBinding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PreviewProfileSecretBindingEntity` instance.

#### `PreviewSecret(data?: object)`

Create a new `PreviewSecret` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PreviewSecretEntity` instance.

#### `PreviewSharingApproval(data?: object)`

Create a new `PreviewSharingApproval` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PreviewSharingApprovalEntity` instance.

#### `ProductMapIdentityDecision(data?: object)`

Create a new `ProductMapIdentityDecision` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapIdentityDecisionEntity` instance.

#### `ProductMapJourney(data?: object)`

Create a new `ProductMapJourney` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapJourneyEntity` instance.

#### `ProductMapJourneyReplay(data?: object)`

Create a new `ProductMapJourneyReplay` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapJourneyReplayEntity` instance.

#### `ProductMapObservation(data?: object)`

Create a new `ProductMapObservation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapObservationEntity` instance.

#### `ProductMapQuestion(data?: object)`

Create a new `ProductMapQuestion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapQuestionEntity` instance.

#### `ProductMapState(data?: object)`

Create a new `ProductMapState` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductMapStateEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `ProjectAndroidApk(data?: object)`

Create a new `ProjectAndroidApk` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectAndroidApkEntity` instance.

#### `ProjectCodeMap(data?: object)`

Create a new `ProjectCodeMap` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectCodeMapEntity` instance.

#### `ProjectEnvironment(data?: object)`

Create a new `ProjectEnvironment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEnvironmentEntity` instance.

#### `ProjectFinding(data?: object)`

Create a new `ProjectFinding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectFindingEntity` instance.

#### `ProjectFixture(data?: object)`

Create a new `ProjectFixture` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectFixtureEntity` instance.

#### `ProjectIosApp(data?: object)`

Create a new `ProjectIosApp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectIosAppEntity` instance.

#### `ProjectMessagingConversation(data?: object)`

Create a new `ProjectMessagingConversation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectMessagingConversationEntity` instance.

#### `ProjectOverviewMetric(data?: object)`

Create a new `ProjectOverviewMetric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectOverviewMetricEntity` instance.

#### `ProjectOverviewPullRequest(data?: object)`

Create a new `ProjectOverviewPullRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectOverviewPullRequestEntity` instance.

#### `ProjectProductMap(data?: object)`

Create a new `ProjectProductMap` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectProductMapEntity` instance.

#### `ProjectRecording(data?: object)`

Create a new `ProjectRecording` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectRecordingEntity` instance.

#### `ProjectRunPlan(data?: object)`

Create a new `ProjectRunPlan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectRunPlanEntity` instance.

#### `ProjectRunSchedule(data?: object)`

Create a new `ProjectRunSchedule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectRunScheduleEntity` instance.

#### `ProjectScenarioOption(data?: object)`

Create a new `ProjectScenarioOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectScenarioOptionEntity` instance.

#### `ProjectScenarioRow(data?: object)`

Create a new `ProjectScenarioRow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectScenarioRowEntity` instance.

#### `ProjectSetting(data?: object)`

Create a new `ProjectSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectSettingEntity` instance.

#### `PullRequest(data?: object)`

Create a new `PullRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PullRequestEntity` instance.

#### `PullRequestSetting(data?: object)`

Create a new `PullRequestSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PullRequestSettingEntity` instance.

#### `PullRequestSettingAddRepository(data?: object)`

Create a new `PullRequestSettingAddRepository` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PullRequestSettingAddRepositoryEntity` instance.

#### `PullRequestSettingDetectComment(data?: object)`

Create a new `PullRequestSettingDetectComment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PullRequestSettingDetectCommentEntity` instance.

#### `Recorder(data?: object)`

Create a new `Recorder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecorderEntity` instance.

#### `Registry(data?: object)`

Create a new `Registry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegistryEntity` instance.

#### `RegistryV2(data?: object)`

Create a new `RegistryV2` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegistryV2Entity` instance.

#### `RelayAgentLocalThread(data?: object)`

Create a new `RelayAgentLocalThread` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RelayAgentLocalThreadEntity` instance.

#### `ReportReplay(data?: object)`

Create a new `ReportReplay` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportReplayEntity` instance.

#### `ReportScenario(data?: object)`

Create a new `ReportScenario` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportScenarioEntity` instance.

#### `RunScenarioRun(data?: object)`

Create a new `RunScenarioRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RunScenarioRunEntity` instance.

#### `RunScheduleOption(data?: object)`

Create a new `RunScheduleOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RunScheduleOptionEntity` instance.

#### `RunSearch(data?: object)`

Create a new `RunSearch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RunSearchEntity` instance.

#### `RunUpdate(data?: object)`

Create a new `RunUpdate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RunUpdateEntity` instance.

#### `ScenarioRevision(data?: object)`

Create a new `ScenarioRevision` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScenarioRevisionEntity` instance.

#### `ScenarioRunLesson(data?: object)`

Create a new `ScenarioRunLesson` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScenarioRunLessonEntity` instance.

#### `ScenarioRunScenarioEdit(data?: object)`

Create a new `ScenarioRunScenarioEdit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScenarioRunScenarioEditEntity` instance.

#### `ServiceEndpoint(data?: object)`

Create a new `ServiceEndpoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ServiceEndpointEntity` instance.

#### `SitePreview(data?: object)`

Create a new `SitePreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SitePreviewEntity` instance.

#### `SlackChannel(data?: object)`

Create a new `SlackChannel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SlackChannelEntity` instance.

#### `SparkAgentLocalThread(data?: object)`

Create a new `SparkAgentLocalThread` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SparkAgentLocalThreadEntity` instance.

#### `StaticSite(data?: object)`

Create a new `StaticSite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StaticSiteEntity` instance.

#### `StaticSiteDeployment(data?: object)`

Create a new `StaticSiteDeployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StaticSiteDeploymentEntity` instance.

#### `StaticSiteDomain(data?: object)`

Create a new `StaticSiteDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StaticSiteDomainEntity` instance.

#### `SubscriptionModel(data?: object)`

Create a new `SubscriptionModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubscriptionModelEntity` instance.

#### `ThreadPreview(data?: object)`

Create a new `ThreadPreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThreadPreviewEntity` instance.

#### `VerificationProjectCredential(data?: object)`

Create a new `VerificationProjectCredential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerificationProjectCredentialEntity` instance.

#### `VerificationProjectPersona(data?: object)`

Create a new `VerificationProjectPersona` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerificationProjectPersonaEntity` instance.

#### `VerificationProjectRun(data?: object)`

Create a new `VerificationProjectRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerificationProjectRunEntity` instance.

#### `VerificationProjectScenario(data?: object)`

Create a new `VerificationProjectScenario` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerificationProjectScenarioEntity` instance.

#### `VerifyAppDomain(data?: object)`

Create a new `VerifyAppDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerifyAppDomainEntity` instance.

#### `VerifyBrowserSession(data?: object)`

Create a new `VerifyBrowserSession` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerifyBrowserSessionEntity` instance.

#### `VerifyStaticSiteDomain(data?: object)`

Create a new `VerifyStaticSiteDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerifyStaticSiteDomainEntity` instance.

#### `VersionLog(data?: object)`

Create a new `VersionLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VersionLogEntity` instance.

#### `WebBotAuth(data?: object)`

Create a new `WebBotAuth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebBotAuthEntity` instance.

#### `WorkflowRunStep(data?: object)`

Create a new `WorkflowRunStep` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowRunStepEntity` instance.

#### `WorkflowRunStopNotice(data?: object)`

Create a new `WorkflowRunStopNotice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowRunStopNoticeEntity` instance.

#### `WorkflowTriggerSkipped(data?: object)`

Create a new `WorkflowTriggerSkipped` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowTriggerSkippedEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ComposalSDK.test()`.

**Returns:** `ComposalSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AgentEntity

```ts
const agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `string | null` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string | null` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_sharing` | `boolean` | No |  |
| `can_name_managers` | `boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `number` | Yes |  |
| `configuration_version` | `string | null` | Yes | Opaque version token. |
| `control_connections_available` | `boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `string | null` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `any[]` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string | null` | Yes | Opaque version token. |
| `local_agent_control_available` | `boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `any[]` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `string | null` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `string | null` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `Record<string, any> | null` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` | Yes |  |
| `sharing_fixed` | `boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` | No |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `browser_opened` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened` | `client.Agent().create({ $action: 'browser_opened', ... })` |
| `call_session` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/call_session` | `client.Agent().create({ $action: 'call_session', ... })` |
| `lifecycle` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/lifecycle` | `client.Agent().create({ $action: 'lifecycle', ... })` |
| `marked_read` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/marked_read` | `client.Agent().create({ $action: 'marked_read', ... })` |
| `slack` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack` | `client.Agent().create({ $action: 'slack', ... })` |
| `transcription_session` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/transcription_session` | `client.Agent().create({ $action: 'transcription_session', ... })` |
| `warm` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/warm` | `client.Agent().create({ $action: 'warm', ... })` |
| `activity` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/activity` | `client.Agent().load({ $action: 'activity', ... })` |
| `avatar` | `/api/v1/organizations/{organization_id}/agents/{id}/avatar` | `client.Agent().load({ $action: 'avatar', ... })` |
| `compute` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/compute` | `client.Agent().load({ $action: 'compute', ... })` |
| `computer` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer` | `client.Agent().load({ $action: 'computer', ... })` |
| `conversation` | `/api/v1/organizations/{organization_id}/agents/{id}/spark` | `client.Agent().load({ $action: 'conversation', ... })` |
| `coordination` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination` | `client.Agent().load({ $action: 'coordination', ... })` |
| `debug` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/debug` | `client.Agent().load({ $action: 'debug', ... })` |
| `email` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/email` | `client.Agent().load({ $action: 'email', ... })` |
| `environment` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/environment` | `client.Agent().load({ $action: 'environment', ... })` |
| `github_access` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/github_access` | `client.Agent().load({ $action: 'github_access', ... })` |
| `input_delivery` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/input_delivery` | `client.Agent().load({ $action: 'input_delivery', ... })` |
| `inspection` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/inspection` | `client.Agent().load({ $action: 'inspection', ... })` |
| `library` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/library` | `client.Agent().load({ $action: 'library', ... })` |
| `lifecycle` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/lifecycle` | `client.Agent().load({ $action: 'lifecycle', ... })` |
| `message_image` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/message_image` | `client.Agent().load({ $action: 'message_image', ... })` |
| `mission_control_card` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/mission_control_card` | `client.Agent().load({ $action: 'mission_control_card', ... })` |
| `resource` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resource` | `client.Agent().load({ $action: 'resource', ... })` |
| `run_usage` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/run_usage` | `client.Agent().load({ $action: 'run_usage', ... })` |
| `runtime` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime` | `client.Agent().load({ $action: 'runtime', ... })` |
| `sandbox` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/sandbox` | `client.Agent().load({ $action: 'sandbox', ... })` |
| `thread_model` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/thread_model` | `client.Agent().load({ $action: 'thread_model', ... })` |
| `usage` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/usage` | `client.Agent().load({ $action: 'usage', ... })` |
| `environment` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/environment` | `client.Agent().update({ $action: 'environment', ... })` |
| `github_access` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/github_access` | `client.Agent().update({ $action: 'github_access', ... })` |
| `model` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/model` | `client.Agent().update({ $action: 'model', ... })` |
| `rename` | `/api/v1/organizations/{organization_id}/agents/{id}/rename` | `client.Agent().update({ $action: 'rename', ... })` |
| `roster_position` | `/api/v1/organizations/{organization_id}/agents/{id}/roster_position` | `client.Agent().update({ $action: 'roster_position', ... })` |
| `runtime` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime` | `client.Agent().update({ $action: 'runtime', ... })` |
| `sandbox` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/sandbox` | `client.Agent().update({ $action: 'sandbox', ... })` |
| `sharing` | `/api/v1/organizations/{organization_id}/agents/{id}/sharing` | `client.Agent().update({ $action: 'sharing', ... })` |
| `thread_model` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/thread_model` | `client.Agent().update({ $action: 'thread_model', ... })` |

An action returns that action's OWN response, which is not necessarily a
Agent record — check the API definition for its shape.

```ts
const result = await client.Agent().create({
  $action: 'browser_opened',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Agent().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Agent().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Agent().load({ id: 'agent_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Agent().remove({ id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentAttachmentEntity

```ts
const agent_attachment = client.AgentAttachment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `byte_size` | `number` | Yes |  |
| `content_type` | `string` | Yes |  |
| `file_name` | `string` | Yes |  |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `complete` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete` | `client.AgentAttachment().create({ $action: 'complete', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentAttachment record — check the API definition for its shape.

```ts
const result = await client.AgentAttachment().create({
  $action: 'complete',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentAttachment().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  byte_size: 1,
  content_type: 'example_content_type',
  file_name: 'example_file_name',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentAttachmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentAutomationEntity

```ts
const agent_automation = client.AgentAutomation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_events` | `boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` | Yes |  |
| `definition` | `Record<string, any>` | Yes |  |
| `event_subscriptions` | `any[]` | Yes |  |
| `event_triggers` | `any[]` | Yes |  |
| `expected_revision` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `number` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `any[]` | Yes |  |
| `version` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `schedule` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/schedule` | `client.AgentAutomation().update({ $action: 'schedule', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentAutomation record — check the API definition for its shape.

```ts
const result = await client.AgentAutomation().update({
  $action: 'schedule',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentAutomation().list({ agent_id: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentAutomation().load({ id: 'agent_automation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentAutomation().update({
  id: 'agent_automation_id',
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentAutomationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentAvatarEntity

```ts
const agent_avatar = client.AgentAvatar()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `generate` | `/api/v1/organizations/{organization_id}/agents/{id}/avatar/generate` | `client.AgentAvatar().create({ $action: 'generate', ... })` |
| `retry` | `/api/v1/organizations/{organization_id}/agents/{id}/avatar/retry` | `client.AgentAvatar().create({ $action: 'retry', ... })` |
| `configuration` | `/api/v1/organizations/{organization_id}/agents/{id}/avatar/configuration` | `client.AgentAvatar().load({ $action: 'configuration', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentAvatar record — check the API definition for its shape.

```ts
const result = await client.AgentAvatar().create({
  $action: 'generate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentAvatarEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentCommandEntity

```ts
const agent_command = client.AgentCommand()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `skill_model_visible` | `boolean` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentCommand().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentCommandEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentComputerEntity

```ts
const agent_computer = client.AgentComputer()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `connect` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer/connect` | `client.AgentComputer().create({ $action: 'connect', ... })` |
| `egress` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer/egress` | `client.AgentComputer().create({ $action: 'egress', ... })` |
| `start` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer/start` | `client.AgentComputer().create({ $action: 'start', ... })` |
| `frame` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/computer/frame` | `client.AgentComputer().load({ $action: 'frame', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentComputer record — check the API definition for its shape.

```ts
const result = await client.AgentComputer().create({
  $action: 'connect',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentComputerEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentConnectionEntity

```ts
const agent_connection = client.AgentConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_disconnect` | `boolean` | Yes |  |
| `can_setup` | `boolean` | Yes |  |
| `connection` | `Record<string, any>` | Yes |  |
| `credential` | `string | null` | No | Write-only outbound key. |
| `error_code` | `string | null` | Yes |  |
| `expected_generation` | `number` | Yes |  |
| `generation` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `string | null` | Yes |  |
| `requester_id` | `string` | Yes |  |
| `retired_at` | `string | null` | Yes |  |
| `revoked_at` | `string | null` | Yes |  |
| `scope_key` | `string` | Yes |  |
| `source_operation_id` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `setup` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup` | `client.AgentConnection().create({ $action: 'setup', ... })` |
| `change` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change` | `client.AgentConnection().load({ $action: 'change', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentConnection record — check the API definition for its shape.

```ts
const result = await client.AgentConnection().create({
  $action: 'setup',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentConnection().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  agent_card_url: 'example_agent_card_url',
  auth_scheme: 'example_auth_scheme',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentConnection().list({ agent_id: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentConnection().load({ id: 'agent_connection_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentConnection().remove({ id: 'agent_connection_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentConnection().update({
  id: 'agent_connection_id',
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentControlFlowEntity

```ts
const agent_control_flow = client.AgentControlFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_cancel` | `boolean` | Yes |  |
| `cancellation_requested` | `boolean` | Yes |  |
| `device_name` | `string` | Yes |  |
| `flow_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `providers` | `any[]` | Yes |  |
| `repair_of_flow_id` | `string` | No | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `title` | `string | null` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel` | `client.AgentControlFlow().create({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentControlFlow record — check the API definition for its shape.

```ts
const result = await client.AgentControlFlow().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentControlFlow().list({ agent_id: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentControlFlow().load({ id: 'agent_control_flow_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentControlFlowEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentCoordinationEntity

```ts
const agent_coordination = client.AgentCoordination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stop` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/stop` | `client.AgentCoordination().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentCoordination record — check the API definition for its shape.

```ts
const result = await client.AgentCoordination().create({
  $action: 'stop',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentCoordinationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentEmailEntity

```ts
const agent_email = client.AgentEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery` | `string | null` | Yes | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | Yes | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `preview` | `string` | No |  |
| `received_at` | `string` | Yes |  |
| `recipient_tag` | `string | null` | Yes | The +tag the sender used, if any |
| `spam` | `boolean` | Yes | SES judged it spam |
| `subject` | `string | null` | Yes |  |
| `text` | `string` | Yes | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentEmail().load({ id: 'agent_email_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentEmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentFileEntity

```ts
const agent_file = client.AgentFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_type` | `string` | Yes |  |
| `download_url` | `string` | Yes |  |
| `filename` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `size_bytes` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentFile().load({ id: 'agent_file_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentFileEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentInputEntity

```ts
const agent_input = client.AgentInput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_ids` | `any[]` | No | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `any[]` | No |  |
| `browser_context` | `Record<string, any>` | Yes | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `Record<string, any>` | Yes | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Yes | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` | No |  |
| `requester_membership_id` | `string` | No | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | No | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentInput().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  browser_context: {},
  client_time: {},
  conversation_id: 'example_conversation_id',
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentInputEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentIntegrationEntity

```ts
const agent_integration = client.AgentIntegration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_counts` | `Record<string, any>` | Yes | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Yes | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `any[]` | Yes | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_organization` | `boolean` | Yes |  |
| `catalog` | `any[]` | Yes |  |
| `connect_as` | `string | null` | Yes | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `Record<string, any>` | Yes | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `Record<string, any>` | Yes | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` | Yes |  |
| `connections` | `any[]` | Yes |  |
| `email` | `Record<string, any>` | Yes | A native agent's own email address. |
| `enabled` | `boolean` | Yes |  |
| `enabled_toolkits` | `any[]` | Yes | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `number` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `pending_counts` | `Record<string, any>` | Yes | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `boolean` | No | The personal account creation endpoint honors a creation key. |
| `private_agent` | `boolean` | Yes | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `boolean` | Yes | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `Record<string, any>` | Yes |  |
| `webhook_connections` | `any[]` | Yes |  |
| `webhooks_available` | `boolean` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentIntegration().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  connection_id: 'example_connection_id',
  enabled: true,
  generation: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentIntegration().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentIntegrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentInteractionEntity

```ts
const agent_interaction = client.AgentInteraction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `interactions` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel` | `client.AgentInteraction().create({ $action: 'cancel', ... })` |
| `connect` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/connect` | `client.AgentInteraction().create({ $action: 'connect', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentInteraction record — check the API definition for its shape.

```ts
const result = await client.AgentInteraction().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentInteraction().list({ agent_id: "example", organization_id: "example", conversation_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentInteraction().load({ id: 'agent_interaction_id', agent_id: 'agent_id', organization_id: 'organization_id', conversation_id: 'conversation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentInteractionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentLibraryEntity

```ts
const agent_library = client.AgentLibrary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `download` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/library/{artifact_id}/download` | `client.AgentLibrary().load({ $action: 'download', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentLibrary record — check the API definition for its shape.

```ts
const result = await client.AgentLibrary().load({
  $action: 'download',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentLibraryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentManagerEntity

```ts
const agent_manager = client.AgentManager()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `string | null` | Yes | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `string | null` | No | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `boolean` | No | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_sharing` | `boolean` | No |  |
| `can_name_managers` | `boolean` | No | Whether the viewer may name managers now. |
| `can_queue_input` | `boolean` | No | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `boolean` | Yes | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` | Yes |  |
| `configuration_revision` | `number` | Yes |  |
| `configuration_version` | `string | null` | Yes | Opaque version token. |
| `control_connections_available` | `boolean` | No | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` | Yes |  |
| `coordination_available` | `boolean` | No | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` | Yes |  |
| `direct_chat_available` | `boolean` | No | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `last_reply_at` | `string | null` | Yes | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `any[]` | Yes | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `string | null` | Yes | Opaque version token. |
| `local_agent_control_available` | `boolean` | No | Whether this organization exposes paired local coding-agent control. |
| `managers` | `any[]` | No | Teammates named as managers beside the owner. |
| `model_change_action` | `string | null` | No | Advisory composer action. |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `preview` | `any` | No |  |
| `preview_received_at` | `string | null` | No | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` | No |  |
| `reply_triage` | `Record<string, any> | null` | Yes | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `runtime_version` | `string` | No | Immutable execution runtime selected at creation. |
| `setup_pending` | `boolean` | Yes |  |
| `sharing_fixed` | `boolean` | No | Project agents have a fixed audience and cannot change visibility. |
| `sharing_version` | `number` | No |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `team_role` | `string` | No | What teammates may do once the agent is shared with the team. |
| `updated_at` | `string` | Yes |  |
| `url_slug` | `string` | No | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `user_id` | `string` | Yes |  |
| `visibility` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentManager().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  user_id: 'example_user_id',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentManager().remove({ id: 'agent_manager_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentManagerEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentManagerChoiceEntity

```ts
const agent_manager_choice = client.AgentManagerChoice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentManagerChoice().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentManagerChoiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentMarketplaceEntity

```ts
const agent_marketplace = client.AgentMarketplace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bundle` | `Record<string, any>` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `catalog_key` | `string | null` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `any[]` | Yes |  |
| `category` | `string` | Yes |  |
| `counts` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expected_version` | `number` | Yes |  |
| `explainer` | `string | null` | Yes | The listing's public write-up in Markdown. |
| `featured` | `boolean` | Yes |  |
| `from_composal` | `boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `number` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `any[]` | Yes |  |
| `integrations` | `any[]` | Yes |  |
| `listing` | `any` | Yes |  |
| `listings` | `any[]` | Yes |  |
| `memories` | `any[]` | Yes |  |
| `name` | `string` | Yes |  |
| `next_page` | `number | null` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `any[]` | Yes |  |
| `publisher_avatar_url` | `string | null` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `sections` | `any[]` | Yes |  |
| `share_token` | `string | null` | Yes | Present only for people who manage the listing. |
| `skills` | `any[]` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | No | The V2 agent this listing was published from. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |
| `viewer` | `Record<string, any>` | Yes | Who a public marketplace response was read for. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `install` | `/api/v1/organizations/{organization_id}/agent_marketplace/{id}/install` | `client.AgentMarketplace().create({ $action: 'install', ... })` |
| `draft` | `/api/v1/organizations/{organization_id}/agent_marketplace/draft` | `client.AgentMarketplace().load({ $action: 'draft', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentMarketplace record — check the API definition for its shape.

```ts
const result = await client.AgentMarketplace().create({
  $action: 'install',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentMarketplace().create({
  organization_id: 'example_organization_id',
  bundle: {},
  category: 'example_category',
  name: 'example_name',
  summary: 'example_summary',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentMarketplace().load({ id: 'agent_marketplace_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AgentMarketplace().patch({
  id: 'agent_marketplace_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentMarketplace().remove({ id: 'agent_marketplace_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentMarketplace().update({
  id: 'agent_marketplace_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentMarketplaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentMarketplaceSharedEntity

```ts
const agent_marketplace_shared = client.AgentMarketplaceShared()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `catalog_key` | `string | null` | Yes | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` | Yes |  |
| `counts` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `explainer` | `string | null` | Yes | The listing's public write-up in Markdown. |
| `featured` | `boolean` | Yes |  |
| `from_composal` | `boolean` | Yes | One of Composal's ready-made listings. |
| `id` | `string` | Yes |  |
| `installs_count` | `number` | Yes |  |
| `instructions` | `string` | Yes |  |
| `integration_toolkits` | `any[]` | Yes |  |
| `integrations` | `any[]` | Yes |  |
| `listing` | `any` | Yes |  |
| `memories` | `any[]` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_name` | `string` | Yes |  |
| `page_apps` | `any[]` | Yes |  |
| `publisher_avatar_url` | `string | null` | Yes | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | Yes | "Composal" on listings Composal publishes. |
| `share_token` | `string | null` | Yes | Present only for people who manage the listing. |
| `skills` | `any[]` | Yes |  |
| `slug` | `string` | Yes | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |
| `viewer` | `Record<string, any>` | Yes | Who a public marketplace response was read for. |
| `visibility` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `install` | `/api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install` | `client.AgentMarketplaceShared().create({ $action: 'install', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentMarketplaceShared record — check the API definition for its shape.

```ts
const result = await client.AgentMarketplaceShared().create({
  $action: 'install',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentMarketplaceShared().load({ id: 'agent_marketplace_shared_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentMarketplaceSharedEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentMissionControlEntity

```ts
const agent_mission_control = client.AgentMissionControl()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `feedback` | `/api/v1/organizations/{organization_id}/agents/mission_control/feedback` | `client.AgentMissionControl().create({ $action: 'feedback', ... })` |
| `relevance` | `/api/v1/organizations/{organization_id}/agents/mission_control/relevance` | `client.AgentMissionControl().create({ $action: 'relevance', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentMissionControl record — check the API definition for its shape.

```ts
const result = await client.AgentMissionControl().create({
  $action: 'feedback',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentMissionControlEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentOperationEntity

```ts
const agent_operation = client.AgentOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `Record<string, any>` | Yes | JSON object limited to 65536 encoded bytes. |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `operation` | `Record<string, any>` | Yes |  |
| `participant` | `string` | Yes |  |
| `requester_id` | `string` | Yes | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentOperation().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  arguments: {},
  key: 'example_key',
  name: 'example_name',
  requester_id: 'example_requester_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentOperation().load({ id: 'agent_operation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentOperationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentProvisioningEntity

```ts
const agent_provisioning = client.AgentProvisioning()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `retry` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/provisioning/retry` | `client.AgentProvisioning().create({ $action: 'retry', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentProvisioning record — check the API definition for its shape.

```ts
const result = await client.AgentProvisioning().create({
  $action: 'retry',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentProvisioningEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentPullRequestEntity

```ts
const agent_pull_request = client.AgentPullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `owners` | `any[]` | Yes |  |
| `repository` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentPullRequest().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentPullRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentQuestionEntity

```ts
const agent_question = client.AgentQuestion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `answer` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/questions/{question_id}/answer` | `client.AgentQuestion().create({ $action: 'answer', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentQuestion record — check the API definition for its shape.

```ts
const result = await client.AgentQuestion().create({
  $action: 'answer',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentQuestionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentRepositoryEntity

```ts
const agent_repository = client.AgentRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `environments` | `Record<string, any>` | Yes | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `number` | Yes |  |
| `id` | `string` | No |  |
| `repository_choices` | `any[]` | Yes |  |
| `repository_choices_error` | `string | null` | No | GitHub discovery warning. |
| `repository_choices_truncated` | `boolean` | Yes |  |
| `version` | `number` | Yes |  |
| `work_repositories` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `environment` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment` | `client.AgentRepository().update({ $action: 'environment', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentRepository record — check the API definition for its shape.

```ts
const result = await client.AgentRepository().update({
  $action: 'environment',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentRepository().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentRepository().update({
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentRepositoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentResourceEntity

```ts
const agent_resource = client.AgentResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `uri` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentResource().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentRoutineEntity

```ts
const agent_routine = client.AgentRoutine()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `consecutive_errors` | `number` | Yes |  |
| `credit_wait` | `Record<string, any>` | Yes | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `string | null` | Yes |  |
| `enabled` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_error` | `string | null` | Yes |  |
| `last_run_at` | `string | null` | Yes |  |
| `last_status` | `string | null` | Yes |  |
| `managed` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string | null` | Yes |  |
| `routine` | `Record<string, any>` | Yes |  |
| `schedule` | `Record<string, any>` | Yes |  |
| `schedule_label` | `string` | Yes |  |
| `utility_model` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentRoutine().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentRoutine().update({
  agent_id: 'agent_id',
  id: 'id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentRoutineEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentRunEntity

```ts
const agent_run = client.AgentRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string | null` | No |  |
| `id` | `string` | No |  |
| `run_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentRun().load({ id: 'agent_run_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentRuntimeEntity

```ts
const agent_runtime = client.AgentRuntime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_profiles` | `any[]` | No |  |
| `can_manage` | `boolean` | Yes |  |
| `can_reset` | `boolean` | No |  |
| `image` | `string` | Yes |  |
| `memory_mb` | `number | null` | Yes |  |
| `platform` | `string` | No |  |
| `profile` | `string` | Yes |  |
| `provider` | `string` | No |  |
| `state` | `string` | Yes |  |
| `version` | `string` | Yes |  |
| `volume` | `Record<string, any> | null` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reset` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset` | `client.AgentRuntime().create({ $action: 'reset', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentRuntime record — check the API definition for its shape.

```ts
const result = await client.AgentRuntime().create({
  $action: 'reset',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentRuntimeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSettingEntity

```ts
const agent_setting = client.AgentSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `expected_version` | `string` | Yes |  |
| `instructions` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentSetting().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentSetting().update({
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSharingEntity

```ts
const agent_sharing = client.AgentSharing()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `review` | `/api/v1/organizations/{organization_id}/agents/{id}/sharing/review` | `client.AgentSharing().load({ $action: 'review', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentSharing record — check the API definition for its shape.

```ts
const result = await client.AgentSharing().load({
  $action: 'review',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSharingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSiteEntity

```ts
const agent_site = client.AgentSite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed_at` | `string` | Yes |  |
| `deployments_count` | `number` | Yes |  |
| `hostname` | `string` | Yes |  |
| `https` | `string` | Yes | Whether the organization's certificate serves this site over HTTPS |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `visibility` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentSite().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSkillEntity

```ts
const agent_skill = client.AgentSkill()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `configuration_state` | `string` | No | The requested managed skill selection is awaiting runtime qualification. |
| `description` | `string` | Yes |  |
| `enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `skills` | `any[]` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentSkill().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  enabled: true,
  name: 'example_name',
  version: 'example_version',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentSkill().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSlackEntity

```ts
const agent_slack = client.AgentSlack()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `app` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/app` | `client.AgentSlack().create({ $action: 'app', ... })` |
| `as_you` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/as_you` | `client.AgentSlack().create({ $action: 'as_you', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentSlack record — check the API definition for its shape.

```ts
const result = await client.AgentSlack().create({
  $action: 'app',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSlackEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSubagentEntity

```ts
const agent_subagent = client.AgentSubagent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `attention` | `Record<string, any> | null` | Yes | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `model` | `string | null` | Yes |  |
| `parent_id` | `string` | Yes |  |
| `preview` | `string | null` | Yes |  |
| `started_at` | `string | null` | Yes |  |
| `state` | `string | null` | Yes | What the thread is to the viewer. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string | null` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentSubagent().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSubagentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentSubscriptionEntity

```ts
const agent_subscription = client.AgentSubscription()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentSubscription().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentSubscription().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentSubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentTeammateEntity

```ts
const agent_teammate = client.AgentTeammate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatar` | `string | null` | Yes | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `persona` | `any` | No |  |
| `slug` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentTeammate().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentTeammateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentTerminalEntity

```ts
const agent_terminal = client.AgentTerminal()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `connect` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/terminal/connect` | `client.AgentTerminal().create({ $action: 'connect', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentTerminal record — check the API definition for its shape.

```ts
const result = await client.AgentTerminal().create({
  $action: 'connect',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentTerminalEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentThreadEntity

```ts
const agent_thread = client.AgentThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_count` | `number | null` | No | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `boolean` | Yes |  |
| `execution` | `any` | No |  |
| `first_input` | `any` | No |  |
| `first_input_key` | `string` | No | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | No | Membership the first message was sent as, for input_delivery. |
| `id` | `string` | No |  |
| `inherit_context` | `boolean` | No | Include the source conversation through its last completed reply. |
| `local_activities` | `Record<string, any>` | Yes | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `number` | Yes | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `string | null` | Yes |  |
| `local_scope_key` | `string | null` | Yes |  |
| `local_status_pending` | `boolean` | Yes | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `any[]` | Yes |  |
| `main_thread_id` | `string` | Yes |  |
| `message` | `string` | No | The thread's first message. |
| `next_cursor` | `string | null` | Yes |  |
| `parent_conversation_id` | `string` | No | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` | No |  |
| `selected_thread` | `any` | Yes |  |
| `thread` | `Record<string, any>` | Yes |  |
| `threads` | `any[]` | Yes |  |
| `title` | `string` | No |  |
| `total_archived_count` | `number | null` | Yes | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive` | `client.AgentThread().create({ $action: 'archive', ... })` |
| `compact` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact` | `client.AgentThread().create({ $action: 'compact', ... })` |
| `snooze` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze` | `client.AgentThread().create({ $action: 'snooze', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentThread record — check the API definition for its shape.

```ts
const result = await client.AgentThread().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentThread().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentThread().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentThreadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentToolEntity

```ts
const agent_tool = client.AgentTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `inputSchema` | `Record<string, any>` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentTool().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentVerifyProjectEntity

```ts
const agent_verify_project = client.AgentVerifyProject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `boolean` | Yes | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `number` | Yes |  |
| `project_choices` | `any[]` | Yes | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `boolean` | Yes |  |
| `verify_projects` | `any[]` | Yes |  |
| `version` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentVerifyProject().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentVerifyProject().update({
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentVerifyProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWaitEntity

```ts
const agent_wait = client.AgentWait()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stop` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/waits/{wait_id}/stop` | `client.AgentWait().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentWait record — check the API definition for its shape.

```ts
const result = await client.AgentWait().create({
  $action: 'stop',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWaitEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWebhookEntity

```ts
const agent_webhook = client.AgentWebhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `connection` | `Record<string, any>` | Yes |  |
| `deliveries` | `any[]` | Yes |  |
| `event_types` | `any[]` | Yes |  |
| `expected_generation` | `number` | Yes |  |
| `id` | `string` | No |  |
| `max_events_per_day` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `purpose` | `string` | Yes |  |
| `signing_key` | `string | null` | Yes | Revealed only by the first successful creation or rotation response. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentWebhook().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  event_types: [],
  max_events_per_day: 1,
  name: 'example_name',
  purpose: 'example_purpose',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentWebhook().load({ id: 'agent_webhook_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentWebhook().update({
  id: 'agent_webhook_id',
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkEntity

```ts
const agent_work = client.AgentWork()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `handled` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/work/{work_id}/handled` | `client.AgentWork().create({ $action: 'handled', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentWork record — check the API definition for its shape.

```ts
const result = await client.AgentWork().create({
  $action: 'handled',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkflowEntity

```ts
const agent_workflow = client.AgentWorkflow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_manage` | `boolean` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `path` | `string` | Yes |  |
| `source` | `string` | Yes | At most 262144 UTF-8 bytes |
| `template` | `string` | Yes | A template id from the catalog's templates |
| `templates` | `any[]` | Yes |  |
| `truncated` | `boolean` | Yes |  |
| `workflows` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentWorkflow().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  path: 'example_path',
  template: 'example_template',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentWorkflow().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentWorkflow().update({
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkflowEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkflowProposalEntity

```ts
const agent_workflow_proposal = client.AgentWorkflowProposal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_steps` | `Record<string, any>` | Yes | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `string | null` | Yes | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `boolean` | Yes |  |
| `can_revise` | `boolean` | Yes | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `boolean` | Yes | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `boolean` | Yes | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` | Yes |  |
| `definition` | `Record<string, any> | null` | Yes |  |
| `digest` | `string` | Yes | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `string | null` | Yes | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` | Yes |  |
| `model_choices` | `any[]` | No | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` | Yes |  |
| `native_rows` | `any[]` | No |  |
| `path` | `string` | Yes |  |
| `pipeline_checkpoints` | `Record<string, any>` | Yes |  |
| `pipeline_commands` | `Record<string, any>` | Yes |  |
| `reasoning_choices` | `any[]` | No | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `number | null` | Yes | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `Record<string, any> | null` | Yes |  |
| `stale` | `boolean` | Yes | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `Record<string, any> | null` | Yes | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `string | null` | Yes | Why the save could not set the trigger; only in the reply to that save. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `revise` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise` | `client.AgentWorkflowProposal().create({ $action: 'revise', ... })` |
| `save` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/save` | `client.AgentWorkflowProposal().create({ $action: 'save', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentWorkflowProposal record — check the API definition for its shape.

```ts
const result = await client.AgentWorkflowProposal().create({
  $action: 'revise',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentWorkflowProposal().load({ id: 'agent_workflow_proposal_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkflowProposalEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkflowRunEntity

```ts
const agent_workflow_run = client.AgentWorkflowRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `Record<string, any> | null` | Yes | Saved native automation identity. |
| `budget_seconds` | `number | null` | Yes | The run stops once it has been running this long |
| `budget_usd` | `number | null` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Record<string, any> | null` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string | null` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Record<string, any>` | Yes |  |
| `error` | `string | null` | Yes |  |
| `finished_at` | `string | null` | Yes |  |
| `flow_steps` | `any[] | null` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes | Public run ID. |
| `needs_you` | `boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `string | null` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string | null` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `number` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string | null` | Yes |  |
| `running_seconds` | `number` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `number` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `Record<string, any> | null` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `steps` | `any[]` | Yes |  |
| `trigger_id` | `string | null` | Yes | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `string | null` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `string | null` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string | null` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `answer` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer` | `client.AgentWorkflowRun().create({ $action: 'answer', ... })` |
| `approve` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/approve` | `client.AgentWorkflowRun().create({ $action: 'approve', ... })` |
| `dismiss` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/dismiss` | `client.AgentWorkflowRun().create({ $action: 'dismiss', ... })` |
| `retry` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/retry` | `client.AgentWorkflowRun().create({ $action: 'retry', ... })` |
| `summary` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/summary` | `client.AgentWorkflowRun().load({ $action: 'summary', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentWorkflowRun record — check the API definition for its shape.

```ts
const result = await client.AgentWorkflowRun().create({
  $action: 'answer',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentWorkflowRun().list({ agent_id: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentWorkflowRun().load({ id: 'agent_workflow_run_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkflowRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkflowTriggerEntity

```ts
const agent_workflow_trigger = client.AgentWorkflowTrigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget` | `Record<string, any> | null` | Yes | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `boolean` | Yes |  |
| `can_pause` | `boolean` | Yes | It is running, so a manager can pause it |
| `can_resume` | `boolean` | Yes | A person paused it, so a manager can resume it |
| `can_review` | `boolean` | Yes | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `number | null` | Yes | How many events a day may start an event workflow's runs |
| `day_resets_at` | `string | null` | Yes | When the daily count starts again, at the organization's midnight |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `next_due_at` | `string | null` | Yes |  |
| `pause_cause` | `string | null` | Yes | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `boolean` | Yes | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `string | null` | Yes | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `number | null` | Yes |  |
| `schedule` | `Record<string, any> | null` | Yes | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `string | null` | Yes | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `number` | Yes | Events skipped today, over the daily limit or while paused |
| `stale_at` | `string | null` | Yes | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `string | null` | Yes |  |
| `starts` | `Record<string, any> | null` | Yes | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `string | null` | Yes | The event subscription that starts it |
| `time_zone` | `string` | Yes | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `number | null` | Yes | Events that started a run today, for an event workflow |
| `trigger` | `Record<string, any>` | Yes |  |
| `workflow_path` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `review` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review` | `client.AgentWorkflowTrigger().load({ $action: 'review', ... })` |
| `skipped` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped` | `client.AgentWorkflowTrigger().load({ $action: 'skipped', ... })` |
| `pause` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/pause` | `client.AgentWorkflowTrigger().update({ $action: 'pause', ... })` |
| `resume` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/resume` | `client.AgentWorkflowTrigger().update({ $action: 'resume', ... })` |
| `review` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review` | `client.AgentWorkflowTrigger().update({ $action: 'review', ... })` |

An action returns that action's OWN response, which is not necessarily a
AgentWorkflowTrigger record — check the API definition for its shape.

```ts
const result = await client.AgentWorkflowTrigger().load({
  $action: 'review',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentWorkflowTrigger().list({ agent_id: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentWorkflowTrigger().load({ id: 'agent_workflow_trigger_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentWorkflowTrigger().remove({ id: 'agent_workflow_trigger_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentWorkflowTrigger().update({
  id: 'agent_workflow_trigger_id',
  agent_id: 'agent_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkflowTriggerEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWorkspaceEntity

```ts
const agent_workspace = client.AgentWorkspace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_delete` | `boolean` | Yes |  |
| `can_keep` | `boolean` | Yes |  |
| `cleanup_after` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentWorkspace().list({ agent_id: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentWorkspace().update({
  agent_id: 'agent_id',
  id: 'id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWorkspaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentWritePermissionEntity

```ts
const agent_write_permission = client.AgentWritePermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `string` | Yes | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` | Yes |  |
| `granted_by` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `in_effect` | `boolean` | Yes | Whether the permission approves writes now. |
| `last_used_at` | `string | null` | Yes |  |
| `tool` | `string` | Yes | The tool the agent writes with, such as linear.update_issue. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentWritePermission().list({ agent_id: "example", organization_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentWritePermission().remove({ id: 'agent_write_permission_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentWritePermissionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AllocationLogEntity

```ts
const allocation_log = client.AllocationLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `string | null` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `number` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AllocationLog().list({ allocation_id: "example", app_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AllocationLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppEntity

```ts
const app = client.App()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `description` | `string | null` | Yes |  |
| `framework` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string | null` | Yes |  |
| `root_path` | `string` | Yes |  |
| `root_path_display` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `activate` | `/api/v1/hosting/apps/{id}/activate` | `client.App().create({ $action: 'activate', ... })` |
| `archive` | `/api/v1/hosting/apps/{id}/archive` | `client.App().create({ $action: 'archive', ... })` |
| `catalog` | `/api/v1/hosting/apps/{app_id}/catalog` | `client.App().load({ $action: 'catalog', ... })` |
| `deployment_dashboard` | `/api/v1/hosting/apps/{app_id}/deployment_dashboard` | `client.App().load({ $action: 'deployment_dashboard', ... })` |

An action returns that action's OWN response, which is not necessarily a
App record — check the API definition for its shape.

```ts
const result = await client.App().create({
  $action: 'activate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.App().create({
  name: 'example_name',
  organization_id: 'example_organization_id',
  repository_id: 'example_repository_id',
  root_path: 'example_root_path',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.App().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.App().load({ id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.App().patch({
  id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.App().remove({ id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.App().update({
  id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppCdnEntity

```ts
const app_cdn = client.AppCdn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `cache_path_prefix` | `string | null` | No |  |
| `cache_settings_json` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `distribution_kind` | `string` | Yes |  |
| `edge_hostname` | `string | null` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostnames` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `last_deployed_at` | `string | null` | Yes |  |
| `last_deployed_at_label` | `string | null` | Yes |  |
| `last_purged_at` | `string | null` | Yes |  |
| `last_purged_at_label` | `string | null` | Yes |  |
| `last_synced_at` | `string | null` | Yes |  |
| `last_synced_at_label` | `string | null` | Yes |  |
| `name` | `string` | Yes |  |
| `origin_url` | `string` | Yes |  |
| `provisioned` | `boolean` | Yes |  |
| `routing_settings_json` | `string | null` | Yes |  |
| `security_settings_json` | `string | null` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/archive` | `client.AppCdn().create({ $action: 'archive', ... })` |
| `pause` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/pause` | `client.AppCdn().create({ $action: 'pause', ... })` |
| `provision` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/provision` | `client.AppCdn().create({ $action: 'provision', ... })` |
| `purge` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/purge` | `client.AppCdn().create({ $action: 'purge', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/resume` | `client.AppCdn().create({ $action: 'resume', ... })` |
| `sync` | `/api/v1/hosting/apps/{app_id}/cdns/{id}/sync` | `client.AppCdn().create({ $action: 'sync', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppCdn record — check the API definition for its shape.

```ts
const result = await client.AppCdn().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppCdn().create({
  app_id: 'example_app_id',
  name: 'example_name',
  origin_url: 'example_origin_url',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppCdn().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppCdn().load({ id: 'app_cdn_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppCdn().patch({
  id: 'app_cdn_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppCdn().remove({ id: 'app_cdn_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppCdn().update({
  id: 'app_cdn_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppCdnEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppConfigVariableEntity

```ts
const app_config_variable = client.AppConfigVariable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `description` | `string | null` | Yes |  |
| `exposed_to_build` | `boolean` | Yes |  |
| `has_value` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `scope_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `value` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `disable` | `/api/v1/hosting/apps/{app_id}/config_variables/{id}/disable` | `client.AppConfigVariable().create({ $action: 'disable', ... })` |
| `rotate` | `/api/v1/hosting/apps/{app_id}/config_variables/{id}/rotate` | `client.AppConfigVariable().create({ $action: 'rotate', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppConfigVariable record — check the API definition for its shape.

```ts
const result = await client.AppConfigVariable().create({
  $action: 'disable',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppConfigVariable().create({
  app_id: 'example_app_id',
  exposed_to_build: true,
  key: 'example_key',
  scope_kind: 'example_scope_kind',
  value_kind: 'example_value_kind',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppConfigVariable().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppConfigVariable().load({ id: 'app_config_variable_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppConfigVariable().patch({
  id: 'app_config_variable_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppConfigVariable().remove({ id: 'app_config_variable_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppConfigVariable().update({
  id: 'app_config_variable_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppConfigVariableEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppDataResourceEntity

```ts
const app_data_resource = client.AppDataResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `high_availability` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string | null` | Yes |  |
| `provider_metadata` | `Record<string, any>` | Yes |  |
| `region` | `string | null` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `number | null` | Yes |  |
| `storage_label` | `string | null` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/data_resources/{id}/archive` | `client.AppDataResource().create({ $action: 'archive', ... })` |
| `refresh` | `/api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh` | `client.AppDataResource().create({ $action: 'refresh', ... })` |
| `restore` | `/api/v1/hosting/apps/{app_id}/data_resources/{id}/restore` | `client.AppDataResource().create({ $action: 'restore', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/data_resources/{id}/resume` | `client.AppDataResource().create({ $action: 'resume', ... })` |
| `suspend` | `/api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend` | `client.AppDataResource().create({ $action: 'suspend', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppDataResource record — check the API definition for its shape.

```ts
const result = await client.AppDataResource().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppDataResource().create({
  app_id: 'example_app_id',
  engine: 'example_engine',
  kind: 'example_kind',
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppDataResource().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppDataResource().load({ id: 'app_data_resource_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppDataResource().patch({
  id: 'app_data_resource_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppDataResource().remove({ id: 'app_data_resource_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppDataResource().update({
  id: 'app_data_resource_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppDataResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppDeployEntity

```ts
const app_deploy = client.AppDeploy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `channel` | `string` | No |  |
| `command` | `string` | No |  |
| `commit_sha` | `string` | No |  |
| `desired_instances` | `number` | No |  |
| `environment` | `string` | No | Environment slug or public ID, all, or existing. |
| `image` | `string` | Yes |  |
| `region` | `string` | No |  |
| `rollout_predecessor` | `string` | No | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `service` | `string` | No | Service slug or public ID; required unless app_service_id is supplied. |
| `source_ref` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppDeploy().create({
  app_id: 'example_app_id',
  image: 'example_image',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppDeployEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppDeploymentEntity

```ts
const app_deployment = client.AppDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `string | null` | Yes |  |
| `build_role` | `string | null` | Yes |  |
| `commit_sha` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `creator_user_id` | `string | null` | Yes |  |
| `deployed_url` | `string | null` | Yes |  |
| `display_id` | `number` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `finished_at` | `string | null` | Yes |  |
| `finished_at_label` | `string | null` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string | null` | Yes |  |
| `is_rollback` | `boolean` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `operation_key` | `string | null` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rollback_reason` | `string | null` | Yes |  |
| `rollback_source_deployment_id` | `string | null` | Yes |  |
| `rollback_source_release_id` | `string | null` | Yes |  |
| `rollback_target_release_id` | `string | null` | Yes |  |
| `source_ref` | `string | null` | Yes |  |
| `started_at` | `string | null` | Yes |  |
| `started_at_label` | `string | null` | Yes |  |
| `status` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/hosting/apps/{app_id}/deployments/{id}/cancel` | `client.AppDeployment().create({ $action: 'cancel', ... })` |
| `fail` | `/api/v1/hosting/apps/{app_id}/deployments/{id}/fail` | `client.AppDeployment().create({ $action: 'fail', ... })` |
| `succeed` | `/api/v1/hosting/apps/{app_id}/deployments/{id}/succeed` | `client.AppDeployment().create({ $action: 'succeed', ... })` |
| `live` | `/api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live` | `client.AppDeployment().load({ $action: 'live', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppDeployment record — check the API definition for its shape.

```ts
const result = await client.AppDeployment().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppDeployment().create({
  app_id: 'example_app_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppDeployment().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppDeployment().load({ id: 'app_deployment_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppDeployment().patch({
  id: 'app_deployment_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppDeployment().remove({ id: 'app_deployment_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppDeployment().update({
  id: 'app_deployment_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppDeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppDeploymentOperationEntity

```ts
const app_deployment_operation = client.AppDeploymentOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `Record<string, any>` | Yes |  |
| `app_environment_id` | `string` | No |  |
| `app_service_id` | `string` | No |  |
| `app_service_placement_id` | `string` | No |  |
| `artifact_locator` | `string | null` | Yes |  |
| `build_duration_seconds` | `number | null` | Yes |  |
| `build_source` | `Record<string, any> | null` | Yes |  |
| `build_status` | `string` | Yes |  |
| `children` | `any[]` | Yes |  |
| `ci_pipeline_id` | `string | null` | Yes |  |
| `ci_pipeline_run_id` | `string | null` | Yes |  |
| `commit_sha` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator` | `Record<string, any> | null` | Yes |  |
| `deployed_url` | `string | null` | Yes |  |
| `duration_seconds` | `number | null` | Yes |  |
| `environment` | `Record<string, any>` | Yes |  |
| `failure_message` | `string` | No |  |
| `finished_at` | `string` | No |  |
| `history_kind` | `string` | Yes |  |
| `history_reason` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `is_live` | `boolean` | Yes |  |
| `is_rollback` | `boolean` | Yes |  |
| `live_region_count` | `number` | Yes |  |
| `location_id` | `string` | No |  |
| `number` | `number` | Yes |  |
| `placement` | `Record<string, any> | null` | Yes |  |
| `region_count` | `number` | Yes |  |
| `replicas_per_region` | `number` | Yes |  |
| `rollback_reason` | `string | null` | Yes |  |
| `rollback_source_release_id` | `string | null` | Yes |  |
| `rollback_target_release_id` | `string | null` | Yes |  |
| `rollout_predecessor_id` | `string | null` | Yes |  |
| `rollout_status` | `string` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `service` | `Record<string, any>` | Yes |  |
| `source_ref` | `string | null` | Yes |  |
| `started_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `total_replicas` | `number` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel` | `client.AppDeploymentOperation().create({ $action: 'cancel', ... })` |
| `redeploy` | `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/redeploy` | `client.AppDeploymentOperation().create({ $action: 'redeploy', ... })` |
| `rollback` | `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/rollback` | `client.AppDeploymentOperation().create({ $action: 'rollback', ... })` |
| `live` | `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/live` | `client.AppDeploymentOperation().load({ $action: 'live', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppDeploymentOperation record — check the API definition for its shape.

```ts
const result = await client.AppDeploymentOperation().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppDeploymentOperation().create({
  app_id: 'example_app_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppDeploymentOperation().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppDeploymentOperation().load({ id: 'app_deployment_operation_id', app_id: 'app_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppDeploymentOperationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppDeploymentRollbackEntity

```ts
const app_deployment_rollback = client.AppDeploymentRollback()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | No |  |
| `app_id` | `string` | Yes |  |
| `app_service_id` | `string` | No |  |
| `blockers` | `any[]` | Yes |  |
| `candidate_releases` | `any[]` | Yes |  |
| `confirmation_text` | `string` | Yes |  |
| `current_deployment` | `any` | Yes |  |
| `current_release` | `any` | Yes |  |
| `deployment` | `any` | Yes |  |
| `desired_state` | `any` | Yes |  |
| `environment` | `any` | Yes |  |
| `execution_allowed` | `boolean` | Yes |  |
| `force` | `boolean` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `idempotent_reuse` | `boolean` | Yes |  |
| `location` | `any` | Yes |  |
| `operation` | `any` | Yes |  |
| `reason` | `string | null` | Yes |  |
| `rollback_release` | `any` | Yes |  |
| `rollout` | `any` | Yes |  |
| `service` | `any` | Yes |  |
| `target_artifact_locator` | `string | null` | Yes |  |
| `target_release` | `any` | Yes |  |
| `to` | `string` | No |  |
| `warnings` | `any[]` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `plan` | `/api/v1/hosting/apps/{app_id}/deployment_rollbacks/plan` | `client.AppDeploymentRollback().create({ $action: 'plan', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppDeploymentRollback record — check the API definition for its shape.

```ts
const result = await client.AppDeploymentRollback().create({
  $action: 'plan',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppDeploymentRollback().create({
  app_id: 'example_app_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppDeploymentRollbackEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppEnvironmentEntity

```ts
const app_environment = client.AppEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `boolean` | Yes |  |
| `base_domain` | `string | null` | Yes |  |
| `branch_pattern` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location` | `any` | Yes |  |
| `location_id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/environments/{id}/archive` | `client.AppEnvironment().create({ $action: 'archive', ... })` |
| `pause` | `/api/v1/hosting/apps/{app_id}/environments/{id}/pause` | `client.AppEnvironment().create({ $action: 'pause', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/environments/{id}/resume` | `client.AppEnvironment().create({ $action: 'resume', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppEnvironment record — check the API definition for its shape.

```ts
const result = await client.AppEnvironment().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppEnvironment().create({
  app_id: 'example_app_id',
  auto_deploy: true,
  kind: 'example_kind',
  location_id: 'example_location_id',
  name: 'example_name',
  slug: 'example_slug',
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppEnvironment().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppEnvironment().load({ id: 'app_environment_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppEnvironment().patch({
  id: 'app_environment_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppEnvironment().remove({ id: 'app_environment_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppEnvironment().update({
  id: 'app_environment_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppEnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppLocationEntity

```ts
const app_location = client.AppLocation()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppLocation().create({
  app_id: 'example_app_id',
  location_id: 'example_location_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppLocation().list({ app_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppLocation().remove({ id: 'app_location_id', app_id: 'app_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppLocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppMetricEntity

```ts
const app_metric = client.AppMetric()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `query_range` | `/api/v1/hosting/apps/{app_id}/metrics/query_range` | `client.AppMetric().load({ $action: 'query_range', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppMetric record — check the API definition for its shape.

```ts
const result = await client.AppMetric().load({
  $action: 'query_range',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppMetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppPreviewEntity

```ts
const app_preview = client.AppPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No |  |
| `app_preview_profile_id` | `string` | Yes |  |
| `change_number` | `string` | No | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `expected_generation` | `number` | No | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `expected_patchset` | `number` | No | Optional public Change patchset fence; stale selections return 409. |
| `expires_at` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `resource_overrides` | `Record<string, any>` | No | Service public IDs mapped to resource overrides. |
| `retained` | `boolean` | No |  |
| `shared_data_binding_ids` | `any[]` | No | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `any[]` | No | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` | Yes |  |
| `source_ref` | `string` | No |  |
| `storage_binding_resources` | `Record<string, any>` | No | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/previews/{id}/archive` | `client.AppPreview().create({ $action: 'archive', ... })` |
| `deploy` | `/api/v1/hosting/apps/{app_id}/previews/{id}/deploy` | `client.AppPreview().create({ $action: 'deploy', ... })` |
| `expire` | `/api/v1/hosting/apps/{app_id}/previews/{id}/expire` | `client.AppPreview().create({ $action: 'expire', ... })` |
| `pause` | `/api/v1/hosting/apps/{app_id}/previews/{id}/pause` | `client.AppPreview().create({ $action: 'pause', ... })` |
| `refresh_source` | `/api/v1/hosting/apps/{app_id}/previews/{id}/refresh_source` | `client.AppPreview().create({ $action: 'refresh_source', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/previews/{id}/resume` | `client.AppPreview().create({ $action: 'resume', ... })` |
| `review_source` | `/api/v1/hosting/apps/{app_id}/previews/{id}/review_source` | `client.AppPreview().create({ $action: 'review_source', ... })` |
| `update_revision` | `/api/v1/hosting/apps/{app_id}/previews/{id}/update_revision` | `client.AppPreview().create({ $action: 'update_revision', ... })` |
| `administration` | `/api/v1/hosting/apps/{app_id}/previews/{id}/administration` | `client.AppPreview().load({ $action: 'administration', ... })` |
| `administration_index` | `/api/v1/hosting/apps/{app_id}/previews/administration_index` | `client.AppPreview().load({ $action: 'administration_index', ... })` |
| `secret_comparison` | `/api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison` | `client.AppPreview().load({ $action: 'secret_comparison', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppPreview record — check the API definition for its shape.

```ts
const result = await client.AppPreview().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppPreview().create({
  app_id: 'example_app_id',
  app_preview_profile_id: 'example_app_preview_profile_id',
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppPreview().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppPreview().load({ id: 'app_preview_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppPreview().patch({
  id: 'app_preview_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppPreview().remove({ id: 'app_preview_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppPreview().update({
  id: 'app_preview_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppPreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppPreviewProfileEntity

```ts
const app_preview_profile = client.AppPreviewProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `boolean` | No |  |
| `configuration` | `Record<string, any>` | No |  |
| `created_at` | `string` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_environment_id` | `string` | Yes |  |
| `ttl_days` | `number` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppPreviewProfile().create({
  app_id: 'example_app_id',
  name: 'example_name',
  slug: 'example_slug',
  source_environment_id: 'example_source_environment_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppPreviewProfile().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppPreviewProfile().load({ id: 'app_preview_profile_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppPreviewProfile().patch({
  id: 'app_preview_profile_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppPreviewProfile().remove({ id: 'app_preview_profile_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppPreviewProfile().update({
  id: 'app_preview_profile_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppPreviewProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppRunEntity

```ts
const app_run = client.AppRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/hosting/app_runs/{id}/cancel` | `client.AppRun().create({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppRun record — check the API definition for its shape.

```ts
const result = await client.AppRun().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppRun().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppRun().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppRun().load({ id: 'app_run_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppSecretEntity

```ts
const app_secret = client.AppSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string | null` | No |  |
| `env_key` | `string | null` | No |  |
| `expose_to_build` | `boolean` | No |  |
| `has_value` | `boolean` | No |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_version_number` | `number | null` | No |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `rotation_policy` | `string | null` | No |  |
| `scope_kind` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `value` | `string` | No |  |
| `value_digest` | `string | null` | No |  |
| `value_kind` | `string | null` | No |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `bulk` | `/api/v1/hosting/apps/{app_id}/secrets/bulk` | `client.AppSecret().create({ $action: 'bulk', ... })` |
| `set_value` | `/api/v1/hosting/apps/{app_id}/secrets/{id}/set_value` | `client.AppSecret().create({ $action: 'set_value', ... })` |
| `dotenv` | `/api/v1/hosting/apps/{app_id}/secrets/dotenv` | `client.AppSecret().load({ $action: 'dotenv', ... })` |
| `value` | `/api/v1/hosting/apps/{app_id}/secrets/{id}/value` | `client.AppSecret().load({ $action: 'value', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppSecret record — check the API definition for its shape.

```ts
const result = await client.AppSecret().create({
  $action: 'bulk',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppSecret().create({
  app_id: 'example_app_id',
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppSecret().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppSecret().load({ id: 'app_secret_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppSecret().patch({
  id: 'app_secret_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppSecret().remove({ id: 'app_secret_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppSecret().update({
  id: 'app_secret_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppSecretEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppServiceEntity

```ts
const app_service = client.AppService()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_deploy` | `boolean` | Yes |  |
| `bindings` | `any[]` | Yes |  |
| `build_command` | `string | null` | Yes |  |
| `cpu_label` | `string | null` | Yes |  |
| `cpu_mhz` | `number | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `deploy_paths` | `any[]` | Yes | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `number` | Yes |  |
| `disk_label` | `string | null` | Yes |  |
| `disk_mb` | `number | null` | Yes |  |
| `effective_deploy_paths` | `any[]` | Yes | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `string | null` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `internal_port` | `number | null` | Yes |  |
| `kind` | `string` | Yes |  |
| `memory_label` | `string | null` | Yes |  |
| `memory_max_label` | `string | null` | Yes |  |
| `memory_max_mb` | `number | null` | Yes | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `number | null` | Yes |  |
| `name` | `string` | Yes |  |
| `nomad_constraints_json` | `string | null` | Yes |  |
| `nomad_kill_timeout_seconds` | `number | null` | Yes | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `string | null` | Yes |  |
| `nomad_region` | `string | null` | Yes |  |
| `nomad_shutdown_delay_seconds` | `number | null` | Yes | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `string | null` | Yes | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `string | null` | Yes |  |
| `prestart_command` | `string | null` | Yes |  |
| `publicly_accessible` | `boolean` | Yes |  |
| `release_command` | `string | null` | Yes |  |
| `repo_source_path` | `string` | Yes |  |
| `runtime` | `string` | Yes |  |
| `runtime_adapter_kind` | `string` | Yes |  |
| `runtime_adapter_settings_json` | `string | null` | Yes |  |
| `schedule` | `string | null` | Yes |  |
| `slug` | `string` | Yes |  |
| `source_path` | `string` | Yes |  |
| `start_command` | `string | null` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/services/{id}/archive` | `client.AppService().create({ $action: 'archive', ... })` |
| `pause` | `/api/v1/hosting/apps/{app_id}/services/{id}/pause` | `client.AppService().create({ $action: 'pause', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/services/{id}/resume` | `client.AppService().create({ $action: 'resume', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppService record — check the API definition for its shape.

```ts
const result = await client.AppService().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppService().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppService().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppService().load({ id: 'app_service_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppService().patch({
  id: 'app_service_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppService().remove({ id: 'app_service_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppService().update({
  id: 'app_service_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppServiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppServiceBindingEntity

```ts
const app_service_binding = client.AppServiceBinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `disable` | `/api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable` | `client.AppServiceBinding().create({ $action: 'disable', ... })` |
| `enable` | `/api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable` | `client.AppServiceBinding().create({ $action: 'enable', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppServiceBinding record — check the API definition for its shape.

```ts
const result = await client.AppServiceBinding().create({
  $action: 'disable',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppServiceBinding().create({
  app_id: 'example_app_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppServiceBinding().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppServiceBinding().load({ id: 'app_service_binding_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppServiceBinding().patch({
  id: 'app_service_binding_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppServiceBinding().remove({ id: 'app_service_binding_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppServiceBinding().update({
  id: 'app_service_binding_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppServiceBindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppServicePlacementEntity

```ts
const app_service_placement = client.AppServicePlacement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string` | Yes |  |
| `app_service_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment_channel` | `string | null` | Yes | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `region_count` | `number` | Yes |  |
| `replicas_per_region` | `number` | Yes |  |
| `rollout_strategy` | `string` | Yes |  |
| `targets` | `any[]` | Yes |  |
| `total_replicas` | `number` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `configure` | `/api/v1/hosting/apps/{app_id}/service_placements/configure` | `client.AppServicePlacement().update({ $action: 'configure', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppServicePlacement record — check the API definition for its shape.

```ts
const result = await client.AppServicePlacement().update({
  $action: 'configure',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppServicePlacement().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppServicePlacement().load({ id: 'app_service_placement_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppServicePlacementEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppStorageResourceEntity

```ts
const app_storage_resource = client.AppStorageResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `string | null` | Yes |  |
| `attachment` | `Record<string, any> | null` | Yes | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `number | null` | Yes | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `ephemeral` | `boolean` | Yes | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `string | null` | Yes | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `location_code` | `string | null` | Yes |  |
| `location_id` | `string | null` | Yes | Volume datacenter pin (volume kind only) |
| `mount_path` | `string | null` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes | Storage backend. |
| `provider_error` | `string | null` | Yes | Last provisioning/teardown error from the storage provider |
| `region` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive` | `client.AppStorageResource().create({ $action: 'archive', ... })` |
| `issue_access_key` | `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/issue_access_key` | `client.AppStorageResource().create({ $action: 'issue_access_key', ... })` |
| `resume` | `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/resume` | `client.AppStorageResource().create({ $action: 'resume', ... })` |
| `suspend` | `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/suspend` | `client.AppStorageResource().create({ $action: 'suspend', ... })` |

An action returns that action's OWN response, which is not necessarily a
AppStorageResource record — check the API definition for its shape.

```ts
const result = await client.AppStorageResource().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AppStorageResource().create({
  app_id: 'example_app_id',
  access_mode: 'example_access_mode',
  kind: 'example_kind',
  name: 'example_name',
  provider: 'example_provider',
  slug: 'example_slug',
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AppStorageResource().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AppStorageResource().load({ id: 'app_storage_resource_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.AppStorageResource().patch({
  id: 'app_storage_resource_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AppStorageResource().remove({ id: 'app_storage_resource_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AppStorageResource().update({
  id: 'app_storage_resource_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppStorageResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AttachmentPartEntity

```ts
const attachment_part = client.AttachmentPart()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AttachmentPart().update({
  agent_id: 'agent_id',
  attachment_id: 'attachment_id',
  id: 'id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AttachmentPartEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AutomationEventEntity

```ts
const automation_event = client.AutomationEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `can_manage` | `boolean` | Yes |  |
| `can_manage_events` | `boolean` | Yes | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `boolean` | Yes | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `boolean` | Yes |  |
| `event_subscriptions` | `any[]` | Yes |  |
| `event_triggers` | `any[]` | Yes |  |
| `expected_revision` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `revision` | `number` | Yes |  |
| `schedule` | `any` | Yes |  |
| `schedules` | `any[]` | Yes |  |
| `settings` | `Record<string, any>` | No |  |
| `subscription_key` | `string` | Yes |  |
| `version` | `Record<string, any>` | Yes |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AutomationEvent().update({
  agent_id: 'agent_id',
  automation_id: 'automation_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AutomationEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AutomationRunEntity

```ts
const automation_run = client.AutomationRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `automation` | `Record<string, any> | null` | Yes | Saved native automation identity. |
| `budget_seconds` | `number | null` | Yes | The run stops once it has been running this long |
| `budget_usd` | `number | null` | Yes | The run stops before a step once it has spent this much |
| `can_answer` | `boolean` | Yes | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `boolean` | Yes | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `boolean` | Yes | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `Record<string, any> | null` | Yes | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `string | null` | Yes | The thread the run works in, which the person opens to follow it |
| `decision_history` | `Record<string, any>` | Yes |  |
| `error` | `string | null` | Yes |  |
| `finished_at` | `string | null` | Yes |  |
| `flow_steps` | `any[] | null` | Yes | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Yes |  |
| `input` | `Record<string, any>` | Yes |  |
| `needs_you` | `boolean` | Yes | Whether a step stopped the run for the person, who can answer it |
| `note` | `string | null` | Yes | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `string | null` | Yes | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` | Yes |  |
| `resume_count` | `number` | Yes | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `string | null` | Yes |  |
| `running_seconds` | `number` | Yes | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` | Yes |  |
| `spent_tokens` | `number` | Yes | The tokens the run's agent steps have used so far |
| `spent_usd` | `number` | Yes | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `boolean` | Yes | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` | Yes |  |
| `started_by` | `Record<string, any> | null` | Yes | The event that started the run |
| `status` | `string` | Yes |  |
| `step_count` | `number` | Yes |  |
| `steps` | `any[]` | Yes |  |
| `trigger_id` | `string | null` | Yes | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` | Yes |  |
| `wake_at` | `string | null` | Yes | When a sleeping run's step looks again |
| `workflow_digest` | `string | null` | Yes | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `string | null` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AutomationRun().create({
  agent_id: 'example_agent_id',
  automation_id: 'example_automation_id',
  organization_id: 'example_organization_id',
  input: {},
  request_id: 'example_request_id',
  version_id: 'example_version_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AutomationRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BinaryEntity

```ts
const binary = client.Binary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts_versions` | `boolean` | Yes |  |
| `arch` | `any` | No |  |
| `archived_at` | `string | null` | Yes |  |
| `binary` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `executable` | `string` | Yes |  |
| `format` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `latest_version` | `any` | Yes |  |
| `launch_args` | `any[]` | No |  |
| `name` | `string` | Yes |  |
| `needs_refresh` | `boolean` | Yes |  |
| `operation` | `Record<string, any>` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `platform` | `any` | No |  |
| `project_id` | `string` | Yes |  |
| `sha256` | `string` | No |  |
| `slug` | `string` | Yes |  |
| `version` | `Record<string, any>` | Yes |  |
| `version_defaults` | `any` | No |  |
| `versions` | `any[]` | Yes |  |
| `window_title` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verify/binaries/{id}/archive` | `client.Binary().create({ $action: 'archive', ... })` |

An action returns that action's OWN response, which is not necessarily a
Binary record — check the API definition for its shape.

```ts
const result = await client.Binary().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Binary().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Binary().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Binary().load({ id: 'binary_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BinaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BinaryVersionEntity

```ts
const binary_version = client.BinaryVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arch` | `any` | No |  |
| `cancelable` | `boolean` | Yes |  |
| `configuration` | `Record<string, any>` | Yes |  |
| `configuration_digest` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deletable` | `boolean` | Yes |  |
| `download_secret` | `string` | No |  |
| `download_url` | `string` | Yes |  |
| `environment_uses` | `any[]` | Yes |  |
| `executable` | `string` | No |  |
| `format` | `any` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `launch_args` | `any[]` | No |  |
| `operation` | `Record<string, any>` | Yes |  |
| `package_sha256` | `string | null` | Yes |  |
| `package_size` | `number | null` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `platform` | `any` | No |  |
| `preparations` | `any[]` | Yes |  |
| `retryable` | `boolean` | Yes |  |
| `sha256` | `string` | No |  |
| `status` | `string` | Yes |  |
| `version` | `Record<string, any>` | Yes |  |
| `window_title` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel` | `client.BinaryVersion().create({ $action: 'cancel', ... })` |
| `retry` | `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/retry` | `client.BinaryVersion().create({ $action: 'retry', ... })` |

An action returns that action's OWN response, which is not necessarily a
BinaryVersion record — check the API definition for its shape.

```ts
const result = await client.BinaryVersion().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BinaryVersion().create({
  binary_id: 'example_binary_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  download_url: 'example_download_url',
  idempotency_key: 'example_idempotency_key',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BinaryVersion().list({ binary_id: "example", organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BinaryVersion().load({ id: 'binary_version_id', binary_id: 'binary_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.BinaryVersion().remove({ id: 'binary_version_id', binary_id: 'binary_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BinaryVersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserEgressCandidateEntity

```ts
const browser_egress_candidate = client.BrowserEgressCandidate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BrowserEgressCandidate().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserEgressCandidateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionEntity

```ts
const browser_session = client.BrowserSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_task_id` | `string | null` | No |  |
| `authentication_status` | `string` | Yes | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `string | null` | No | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `string | null` | No | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `string | null` | No |  |
| `closure_basis` | `string | null` | No | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `number` | Yes |  |
| `controller` | `string` | Yes |  |
| `credential_id` | `string | null` | No | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | No | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `string | null` | No |  |
| `expires_at` | `string` | Yes |  |
| `failure_code` | `string | null` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `initial_url` | `string` | Yes |  |
| `max_seconds` | `number` | No |  |
| `pending_control_id` | `string | null` | No |  |
| `project_id` | `string | null` | No | Optional project slug or public ID. |
| `reconciled_at` | `string | null` | No |  |
| `started_at` | `string | null` | No |  |
| `status` | `string` | Yes |  |
| `url` | `string` | No | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `Record<string, any> | null` | No |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `control` | `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control` | `client.BrowserSession().create({ $action: 'control', ... })` |
| `media` | `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media` | `client.BrowserSession().load({ $action: 'media', ... })` |

An action returns that action's OWN response, which is not necessarily a
BrowserSession record — check the API definition for its shape.

```ts
const result = await client.BrowserSession().create({
  $action: 'control',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BrowserSession().create({
  organization_id: 'example_organization_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BrowserSession().load({ id: 'browser_session_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.BrowserSession().remove({ id: 'browser_session_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionConnectionEntity

```ts
const browser_session_connection = client.BrowserSessionConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `generation` | `number` | Yes |  |
| `idempotency_key` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BrowserSessionConnection().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
  generation: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionControlEntity

```ts
const browser_session_control = client.BrowserSessionControl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `completed_at` | `string | null` | No |  |
| `completed_generation` | `number | null` | No |  |
| `connection` | `Record<string, any> | null` | No |  |
| `failure_code` | `string | null` | No |  |
| `id` | `string` | Yes |  |
| `requested_controller` | `string` | Yes |  |
| `requested_generation` | `number` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BrowserSessionControl().load({ id: 'browser_session_control_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionControlEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionEventEntity

```ts
const browser_session_event = client.BrowserSessionEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_task_id` | `string | null` | No |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `payload` | `Record<string, any>` | Yes |  |
| `source_sequence` | `number | null` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BrowserSessionEvent().list({ browser_session_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionMediaEntity

```ts
const browser_session_media = client.BrowserSessionMedia()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_session_id` | `string` | Yes |  |
| `capture_omissions` | `Record<string, any> | null` | No |  |
| `captured_at` | `string | null` | No |  |
| `ended_at` | `string | null` | No |  |
| `failure_code` | `string | null` | No |  |
| `files` | `any[]` | Yes |  |
| `frames` | `number | null` | No |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `partial` | `boolean` | Yes | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` | Yes |  |
| `source` | `Record<string, any> | null` | No | Screenshot provenance. |
| `status` | `string` | Yes |  |
| `stop_requested_at` | `string | null` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BrowserSessionMedia().load({ id: 'browser_session_media_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionMediaEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionRecordingEntity

```ts
const browser_session_recording = client.BrowserSessionRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | No |  |
| `wait` | `boolean` | No | Only screenshots support wait: true. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stop` | `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings/{id}/stop` | `client.BrowserSessionRecording().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
BrowserSessionRecording record — check the API definition for its shape.

```ts
const result = await client.BrowserSessionRecording().create({
  $action: 'stop',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BrowserSessionRecording().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionRecordingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionScreenshotEntity

```ts
const browser_session_screenshot = client.BrowserSessionScreenshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency_key` | `string` | No |  |
| `wait` | `boolean` | No | Only screenshots support wait: true. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BrowserSessionScreenshot().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionScreenshotEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BrowserSessionTaskEntity

```ts
const browser_session_task = client.BrowserSessionTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activity` | `Record<string, any> | null` | No |  |
| `browser_session_id` | `string` | Yes |  |
| `cancel_requested_at` | `string | null` | No |  |
| `completed_at` | `string | null` | No |  |
| `control_generation` | `number | null` | No |  |
| `deadline_at` | `string` | Yes |  |
| `effects_unknown` | `boolean` | Yes |  |
| `failure_code` | `string | null` | No |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `instruction` | `string` | Yes |  |
| `max_rounds` | `number` | Yes |  |
| `max_seconds` | `number` | No |  |
| `model_selection` | `Record<string, any>` | Yes |  |
| `outcome` | `string | null` | No |  |
| `result` | `Record<string, any>` | Yes |  |
| `started_at` | `string | null` | No |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}/cancel` | `client.BrowserSessionTask().create({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
BrowserSessionTask record — check the API definition for its shape.

```ts
const result = await client.BrowserSessionTask().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BrowserSessionTask().create({
  browser_session_id: 'example_browser_session_id',
  organization_id: 'example_organization_id',
  instruction: 'example_instruction',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BrowserSessionTask().load({ id: 'browser_session_task_id', browser_session_id: 'browser_session_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BrowserSessionTaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CatalogSelectorEntity

```ts
const catalog_selector = client.CatalogSelector()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CatalogSelector().list({ app_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CatalogSelectorEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CdnDeploymentEntity

```ts
const cdn_deployment = client.CdnDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CdnDeployment().create({
  app_id: 'example_app_id',
  cdn_id: 'example_cdn_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CdnDeployment().list({ app_id: "example", cdn_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CdnDeployment().load({ id: 'cdn_deployment_id', app_id: 'app_id', cdn_id: 'cdn_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CdnDeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CdnHostnameEntity

```ts
const cdn_hostname = client.CdnHostname()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cdn_distribution_id` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `force_ssl` | `boolean` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `provider_hostname_id` | `string | null` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CdnHostname().create({
  app_id: 'example_app_id',
  cdn_id: 'example_cdn_id',
  hostname: 'example_hostname',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CdnHostname().list({ app_id: "example", cdn_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CdnHostname().load({ id: 'cdn_hostname_id', app_id: 'app_id', cdn_id: 'cdn_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.CdnHostname().patch({
  id: 'cdn_hostname_id',
  app_id: 'app_id',
  cdn_id: 'cdn_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CdnHostname().remove({ id: 'cdn_hostname_id', app_id: 'app_id', cdn_id: 'cdn_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CdnHostname().update({
  id: 'cdn_hostname_id',
  app_id: 'app_id',
  cdn_id: 'cdn_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CdnHostnameEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CdnSpaceEntity

```ts
const cdn_space = client.CdnSpace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/cdn_spaces/{id}/archive` | `client.CdnSpace().create({ $action: 'archive', ... })` |
| `provision` | `/api/v1/cdn_spaces/{id}/provision` | `client.CdnSpace().create({ $action: 'provision', ... })` |

An action returns that action's OWN response, which is not necessarily a
CdnSpace record — check the API definition for its shape.

```ts
const result = await client.CdnSpace().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CdnSpace().create({
  organization_id: 'example_organization_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CdnSpace().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CdnSpace().load({ id: 'cdn_space_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.CdnSpace().patch({
  id: 'cdn_space_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CdnSpace().remove({ id: 'cdn_space_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CdnSpace().update({
  id: 'cdn_space_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CdnSpaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CdnSpaceObjectEntity

```ts
const cdn_space_object = client.CdnSpaceObject()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CdnSpaceObject().list({ cdn_space_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CdnSpaceObject().load({ id: 'cdn_space_object_id', cdn_space_id: 'cdn_space_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CdnSpaceObject().remove({ id: 'cdn_space_object_id', cdn_space_id: 'cdn_space_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CdnSpaceObject().update({
  cdn_space_id: 'cdn_space_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CdnSpaceObjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionRequestEntity

```ts
const connection_request = client.ConnectionRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_card_url` | `string` | Yes |  |
| `auth_scheme` | `string` | Yes |  |
| `can_configure` | `boolean` | Yes |  |
| `can_disconnect` | `boolean` | Yes |  |
| `can_setup` | `boolean` | Yes |  |
| `error_code` | `string | null` | Yes |  |
| `generation` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `remote_agent` | `string | null` | Yes |  |
| `retired_at` | `string | null` | Yes |  |
| `revoked_at` | `string | null` | Yes |  |
| `source_operation_id` | `string | null` | Yes |  |
| `state` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ConnectionRequest().load({ id: 'connection_request_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionSourceEntity

```ts
const connection_source = client.ConnectionSource()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ConnectionSource().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionSourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoordinationWaitEntity

```ts
const coordination_wait = client.CoordinationWait()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_stop` | `boolean` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `stop_state` | `string | null` | Yes |  |
| `wake_outcome` | `string | null` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CoordinationWait().list({ agent_id: "example", coordination_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoordinationWaitEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CredentialSignInCheckEntity

```ts
const credential_sign_in_check = client.CredentialSignInCheck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes | The project environment (app) to sign in to |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `try_again` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again` | `client.CredentialSignInCheck().create({ $action: 'try_again', ... })` |

An action returns that action's OWN response, which is not necessarily a
CredentialSignInCheck record — check the API definition for its shape.

```ts
const result = await client.CredentialSignInCheck().create({
  $action: 'try_again',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CredentialSignInCheck().create({
  credential_id: 'example_credential_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  environment_id: 'example_environment_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CredentialSignInCheckEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DataResourceRotateCredentialEntity

```ts
const data_resource_rotate_credential = client.DataResourceRotateCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `engine` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `high_availability` | `boolean` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `plan` | `string | null` | Yes |  |
| `provider_metadata` | `Record<string, any>` | Yes |  |
| `region` | `string | null` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `storage_gb` | `number | null` | Yes |  |
| `storage_label` | `string | null` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `string | null` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DataResourceRotateCredential().create({
  app_id: 'example_app_id',
  data_resource_id: 'example_data_resource_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DataResourceRotateCredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeepScanEntity

```ts
const deep_scan = client.DeepScan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | No |  |
| `active` | `any[]` | Yes |  |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `any[]` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `Record<string, any>` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Record<string, any>` | Yes |  |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reproduce` | `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce` | `client.DeepScan().create({ $action: 'reproduce', ... })` |
| `stop` | `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop` | `client.DeepScan().create({ $action: 'stop', ... })` |
| `agent` | `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent` | `client.DeepScan().load({ $action: 'agent', ... })` |
| `context` | `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context` | `client.DeepScan().load({ $action: 'context', ... })` |

An action returns that action's OWN response, which is not necessarily a
DeepScan record — check the API definition for its shape.

```ts
const result = await client.DeepScan().create({
  $action: 'reproduce',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DeepScan().create({
  organization_id: 'example_organization_id',
  environment_id: 'example_environment_id',
  goal: 'example_goal',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DeepScan().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DeepScan().load({ id: 'deep_scan_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeepScanEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeepScanFindingEntity

```ts
const deep_scan_finding = client.DeepScanFinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding_count` | `number` | Yes | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `any[]` | Yes | Original team order used by legacy hash links and rerun indices. |
| `findings` | `any[]` | Yes |  |
| `findings_fix_prompt` | `string | null` | Yes |  |
| `free_findings_pending` | `boolean` | Yes | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `priority` | `string | null` | Yes | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes |  |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `boolean` | Yes | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `unlock` | `Record<string, any>` | Yes | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DeepScanFinding().list({ deep_scan_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeepScanFindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeepScanFlowEntity

```ts
const deep_scan_flow = client.DeepScanFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | No |  |
| `concurrency` | `number` | No |  |
| `environment_id` | `string` | No |  |
| `exploration_id` | `string` | No |  |
| `flow_names` | `any[]` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `number` | No |  |
| `max_testers` | `number` | No |  |
| `note` | `string | null` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DeepScanFlow().create({
  organization_id: 'example_organization_id',
  flow_names: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeepScanFlowEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeepScanMappedFlowEntity

```ts
const deep_scan_mapped_flow = client.DeepScanMappedFlow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | Yes |  |
| `environment_id` | `string` | Yes |  |
| `flow_map` | `Record<string, any> | null` | Yes |  |
| `revision_id` | `string | null` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DeepScanMappedFlow().list({ organization_id: "example", environment_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeepScanMappedFlowEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeepScanOptionEntity

```ts
const deep_scan_option = client.DeepScanOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `any[]` | Yes |  |
| `deep_scan_defaults` | `any` | No | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `Record<string, any> | null` | Yes | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `personas` | `any[]` | No |  |
| `preview` | `boolean` | No | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `string | null` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DeepScanOption().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeepScanOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DemoShareEntity

```ts
const demo_share = client.DemoShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `Record<string, any>` | Yes |  |
| `summary` | `string` | Yes | What the recorded browser confirmed. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `thumbnail` | `/api/v1/verify/demo_shares/{token}/thumbnail` | `client.DemoShare().load({ $action: 'thumbnail', ... })` |

An action returns that action's OWN response, which is not necessarily a
DemoShare record — check the API definition for its shape.

```ts
const result = await client.DemoShare().load({
  $action: 'thumbnail',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DemoShare().load({ id: 'demo_share_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DemoShareEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DemoShareSegmentEntity

```ts
const demo_share_segment = client.DemoShareSegment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DemoShareSegment().load({ id: 'demo_share_segment_id', demo_share_id: 'demo_share_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DemoShareSegmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeploymentDashboardNomadEntity

```ts
const deployment_dashboard_nomad = client.DeploymentDashboardNomad()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `allocation` | `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocation` | `client.DeploymentDashboardNomad().load({ $action: 'allocation', ... })` |

An action returns that action's OWN response, which is not necessarily a
DeploymentDashboardNomad record — check the API definition for its shape.

```ts
const result = await client.DeploymentDashboardNomad().load({
  $action: 'allocation',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeploymentDashboardNomadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeploymentFileEntity

```ts
const deployment_file = client.DeploymentFile()
```

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DeploymentFile().update({
  deployment_id: 'deployment_id',
  static_site_id: 'static_site_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeploymentFileEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainPathRuleEntity

```ts
const domain_path_rule = client.DomainPathRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action_kind` | `string` | Yes |  |
| `app_service_endpoint_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `backend_ref` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_error` | `string | null` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainPathRule().create({
  app_id: 'example_app_id',
  domain_id: 'example_domain_id',
  app_service_id: 'example_app_service_id',
  path_prefix: 'example_path_prefix',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainPathRule().list({ app_id: "example", domain_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainPathRule().load({ id: 'domain_path_rule_id', app_id: 'app_id', domain_id: 'domain_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.DomainPathRule().patch({
  id: 'domain_path_rule_id',
  app_id: 'app_id',
  domain_id: 'domain_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainPathRule().remove({ id: 'domain_path_rule_id', app_id: 'app_id', domain_id: 'domain_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainPathRule().update({
  id: 'domain_path_rule_id',
  app_id: 'app_id',
  domain_id: 'domain_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainPathRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DreamEntity

```ts
const dream = client.Dream()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attention` | `boolean` | Yes | The dream skipped at least one run, which will not be retried |
| `changes` | `any[]` | Yes | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `string | null` | Yes |  |
| `counts` | `Record<string, any>` | Yes |  |
| `dream` | `any` | Yes |  |
| `error_code` | `string | null` | Yes | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Yes | Public id used in the dream's URL |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `phase` | `string` | Yes | Where the dream is. |
| `reason` | `string | null` | Yes | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `number` | Yes | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Yes | Local day whose finished runs it reviewed |
| `runs` | `any[]` | Yes | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Yes | Project or unassigned environment name |
| `skipped` | `number` | Yes | Runs skipped after repeated rejected review output |
| `tab` | `string` | Yes |  |
| `timezone` | `string` | Yes | Organization timezone the dream used |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `resume` | `/api/v1/organizations/{organization_id}/verify/dreams/{id}/resume` | `client.Dream().create({ $action: 'resume', ... })` |

An action returns that action's OWN response, which is not necessarily a
Dream record — check the API definition for its shape.

```ts
const result = await client.Dream().create({
  $action: 'resume',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Dream().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Dream().load({ id: 'dream_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DreamEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentEntity

```ts
const environment = client.Environment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_revision_id` | `string | null` | Yes |  |
| `agent_sign_up_available` | `boolean` | Yes | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | Yes | read_only only looks around; writes may create, change and delete data. |
| `billing` | `Record<string, any>` | Yes |  |
| `cleanup` | `any[]` | Yes |  |
| `connection` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_policy` | `Record<string, any>` | No |  |
| `default_policy_json` | `Record<string, any>` | Yes |  |
| `discovery_defaults` | `Record<string, any>` | Yes |  |
| `environment` | `Record<string, any>` | Yes |  |
| `exploration_accounts` | `any[]` | No |  |
| `explorations` | `any[]` | No |  |
| `first_run` | `any` | No |  |
| `hosted_app_id` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `string | null` | Yes | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `boolean` | Yes | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `number` | Yes |  |
| `managed_google_available` | `boolean` | Yes | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` | Yes |  |
| `messaging_tester_number` | `string | null` | No | One configured tester number. |
| `name` | `string` | Yes | Optional for a website target; defaults to its hostname. |
| `network_connections` | `any[]` | Yes |  |
| `onboarding_discovery` | `any` | No |  |
| `organization_id` | `string` | Yes |  |
| `pending_accounts` | `any[]` | No | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | Yes | Owning project. |
| `repository_id` | `string | null` | Yes |  |
| `revisions` | `any[]` | Yes |  |
| `setup_discovery_id` | `string | null` | No | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `boolean` | Yes | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `target_kind` | `string | null` | Yes |  |
| `target_url` | `string | null` | Yes |  |
| `test_accounts` | `Record<string, any>` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `string | null` | Yes |  |
| `version` | `number` | No | Required for target or tester changes; use lock_version from the environment. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `first_run` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run` | `client.Environment().remove({ $action: 'first_run', ... })` |
| `first_run` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run` | `client.Environment().update({ $action: 'first_run', ... })` |

An action returns that action's OWN response, which is not necessarily a
Environment record — check the API definition for its shape.

```ts
const result = await client.Environment().remove({
  $action: 'first_run',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Environment().create({
  organization_id: 'example_organization_id',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Environment().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Environment().load({ id: 'environment_id', organization_id: 'organization_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Environment().patch({
  id: 'environment_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Environment().remove({ id: 'environment_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Environment().update({
  id: 'environment_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentDiscoveryRunEntity

```ts
const environment_discovery_run = client.EnvironmentDiscoveryRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | Yes | Omit for anonymous exploration |
| `deadline_at` | `string` | Yes |  |
| `environment_revision_id` | `string` | Yes |  |
| `evidence` | `any[]` | No |  |
| `failure_code` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `queued_at` | `string` | Yes |  |
| `recording` | `Record<string, any>` | Yes |  |
| `result` | `Record<string, any> | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `stop` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop` | `client.EnvironmentDiscoveryRun().create({ $action: 'stop', ... })` |

An action returns that action's OWN response, which is not necessarily a
EnvironmentDiscoveryRun record — check the API definition for its shape.

```ts
const result = await client.EnvironmentDiscoveryRun().create({
  $action: 'stop',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EnvironmentDiscoveryRun().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EnvironmentDiscoveryRun().load({ id: 'environment_discovery_run_id', environment_id: 'environment_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentDiscoveryRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentExplorationEntity

```ts
const environment_exploration = client.EnvironmentExploration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | No |  |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `persona_id` | `string | null` | No |  |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EnvironmentExploration().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  goal: 'example_goal',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentExplorationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentFirstRunEntity

```ts
const environment_first_run = client.EnvironmentFirstRun()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `start` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run/start` | `client.EnvironmentFirstRun().create({ $action: 'start', ... })` |
| `test_user` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run/test_user` | `client.EnvironmentFirstRun().create({ $action: 'test_user', ... })` |

An action returns that action's OWN response, which is not necessarily a
EnvironmentFirstRun record — check the API definition for its shape.

```ts
const result = await client.EnvironmentFirstRun().create({
  $action: 'start',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentFirstRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentRevisionEntity

```ts
const environment_revision = client.EnvironmentRevision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_origins` | `any[]` | Yes | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `string | null` | Yes |  |
| `app_release_id` | `string | null` | Yes |  |
| `blueprint` | `Record<string, any>` | Yes |  |
| `blueprint_json` | `Record<string, any>` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `digest` | `string` | Yes |  |
| `dry_run` | `boolean` | No |  |
| `expires_at` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `ready_at` | `string | null` | Yes |  |
| `resolved_manifest_json` | `Record<string, any>` | Yes |  |
| `retention_policy_json` | `Record<string, any>` | Yes |  |
| `revision` | `number` | Yes |  |
| `revoked_at` | `string | null` | Yes |  |
| `runner_environment_revision_id` | `string | null` | Yes |  |
| `safety_policy_json` | `Record<string, any>` | Yes |  |
| `schema_version` | `number` | Yes |  |
| `source_metadata` | `Record<string, any>` | No |  |
| `source_metadata_json` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `validation_json` | `Record<string, any>` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `provision` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision` | `client.EnvironmentRevision().create({ $action: 'provision', ... })` |
| `revoke` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/revoke` | `client.EnvironmentRevision().create({ $action: 'revoke', ... })` |
| `validate` | `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/validate` | `client.EnvironmentRevision().create({ $action: 'validate', ... })` |

An action returns that action's OWN response, which is not necessarily a
EnvironmentRevision record — check the API definition for its shape.

```ts
const result = await client.EnvironmentRevision().create({
  $action: 'provision',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EnvironmentRevision().create({
  environment_id: 'example_environment_id',
  organization_id: 'example_organization_id',
  blueprint: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EnvironmentRevision().load({ id: 'environment_revision_id', environment_id: 'environment_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.EnvironmentRevision().update({
  id: 'environment_revision_id',
  environment_id: 'environment_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentRevisionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentSecretBindingEntity

```ts
const environment_secret_binding = client.EnvironmentSecretBinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `string` | Yes |  |
| `id` | `string` | No |  |
| `mode` | `string` | No |  |
| `secret_id` | `string` | No |  |
| `secret_version_id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `copy` | `/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/copy` | `client.EnvironmentSecretBinding().create({ $action: 'copy', ... })` |

An action returns that action's OWN response, which is not necessarily a
EnvironmentSecretBinding record — check the API definition for its shape.

```ts
const result = await client.EnvironmentSecretBinding().create({
  $action: 'copy',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EnvironmentSecretBinding().create({
  app_id: 'example_app_id',
  environment_id: 'example_environment_id',
  env_key: 'example_env_key',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EnvironmentSecretBinding().list({ app_id: "example", environment_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.EnvironmentSecretBinding().remove({ id: 'environment_secret_binding_id', app_id: 'app_id', environment_id: 'environment_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentSecretBindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentTestAccountEntity

```ts
const environment_test_account = client.EnvironmentTestAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configured` | `boolean` | Yes |  |
| `credentials` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `persona` | `string` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `tenant` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EnvironmentTestAccount().list({ environment_id: "example", organization_id: "example" })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.EnvironmentTestAccount().patch({
  environment_id: 'environment_id',
  id: 'id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.EnvironmentTestAccount().update({
  environment_id: 'environment_id',
  id: 'id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentTestAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EvidenceEntity

```ts
const evidence = client.Evidence()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verify/evidence/archive` | `client.Evidence().load({ $action: 'archive', ... })` |
| `download` | `/api/v1/organizations/{organization_id}/verify/evidence/{id}/download` | `client.Evidence().load({ $action: 'download', ... })` |

An action returns that action's OWN response, which is not necessarily a
Evidence record — check the API definition for its shape.

```ts
const result = await client.Evidence().load({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Evidence().load({ id: 'evidence_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EvidenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExplorationEntity

```ts
const exploration = client.Exploration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | No |  |
| `active` | `any[]` | Yes |  |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorations` | `any[]` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | No |  |
| `launch_options` | `Record<string, any>` | Yes | Present only when launch was requested by an admin |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `Record<string, any>` | Yes |  |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `persona_id` | `string | null` | No | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `create_project` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/create_project` | `client.Exploration().create({ $action: 'create_project', ... })` |
| `report` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report` | `client.Exploration().create({ $action: 'report', ... })` |
| `retry_startup` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/retry_startup` | `client.Exploration().create({ $action: 'retry_startup', ... })` |
| `stop` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/stop` | `client.Exploration().create({ $action: 'stop', ... })` |
| `progress` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/progress` | `client.Exploration().load({ $action: 'progress', ... })` |
| `report` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report` | `client.Exploration().load({ $action: 'report', ... })` |
| `sign_in_browser` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/sign_in_browser` | `client.Exploration().load({ $action: 'sign_in_browser', ... })` |

An action returns that action's OWN response, which is not necessarily a
Exploration record — check the API definition for its shape.

```ts
const result = await client.Exploration().create({
  $action: 'create_project',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Exploration().create({
  organization_id: 'example_organization_id',
  environment_id: 'example_environment_id',
  goal: 'example_goal',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Exploration().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Exploration().load({ id: 'exploration_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExplorationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExplorationMessageEntity

```ts
const exploration_message = client.ExplorationMessage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `text` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ExplorationMessage().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExplorationMessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExplorationReportEntity

```ts
const exploration_report = client.ExplorationReport()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `refresh` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/refresh` | `client.ExplorationReport().create({ $action: 'refresh', ... })` |
| `document` | `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/document` | `client.ExplorationReport().load({ $action: 'document', ... })` |

An action returns that action's OWN response, which is not necessarily a
ExplorationReport record — check the API definition for its shape.

```ts
const result = await client.ExplorationReport().create({
  $action: 'refresh',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExplorationReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExplorationScenarioEntity

```ts
const exploration_scenario = client.ExplorationScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_filters` | `Record<string, any>` | Yes | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `any[]` | Yes |  |
| `can_continue` | `boolean` | No | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `any[]` | No |  |
| `concurrency` | `number` | Yes |  |
| `covered_areas` | `any[]` | Yes | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` | Yes |  |
| `deadline_at` | `string` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `boolean` | Yes | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `explorer_activity` | `Record<string, any>` | Yes | What the team is doing now. |
| `finding_count` | `number` | Yes | Findings at every priority, locked ones included. |
| `findings` | `any[]` | Yes | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `string | null` | Yes | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `huntable_flows` | `any[]` | Yes | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `max_testers` | `number` | Yes |  |
| `mode` | `string` | No |  |
| `next_scan_improvements` | `any[]` | Yes | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | No | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `boolean` | Yes | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `boolean` | Yes | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `Record<string, any>` | Yes |  |
| `priority_counts` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | No | Set when the exploration targets a project environment. |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `reproduction_of` | `Record<string, any> | null` | Yes | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `any[]` | Yes | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `boolean` | Yes | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `any[]` | Yes | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `sign_in_needs_answer` | `boolean` | Yes | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | Yes | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `string | null` | No | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `boolean` | No | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` | Yes |  |
| `time_limit_reached` | `boolean` | Yes | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | No | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Yes | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | Yes | The run's page in the Composal web app |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ExplorationScenario().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExplorationScenarioEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FindingEntity

```ts
const finding = client.Finding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deferred_until` | `string | null` | No | Required future time when status is deferred |
| `finding` | `Record<string, any>` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `first_seen_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `boolean` | Yes | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `number` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `reason` | `string` | No | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `Record<string, any> | null` | Yes | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `string | null` | Yes |  |
| `safe_summary` | `string` | Yes |  |
| `scenario_occurrences` | `any[]` | No |  |
| `severity` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Finding().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Finding().load({ id: 'finding_id', organization_id: 'organization_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Finding().patch({
  id: 'finding_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Finding().update({
  id: 'finding_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GithubConnectionEntity

```ts
const github_connection = client.GithubConnection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `any[]` | Yes |  |
| `github_app_installation_id` | `string` | Yes |  |
| `installations` | `any[]` | Yes |  |
| `project_id` | `string` | No | Project slug or public ID the repositories are added to. |
| `replace` | `boolean` | No | Make these the project's only repositories. |
| `repositories` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.GithubConnection().create({
  organization_id: 'example_organization_id',
  github_app_installation_id: 'example_github_app_installation_id',
  repositories: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.GithubConnection().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GithubConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HostingAppDomainEntity

```ts
const hosting_app_domain = client.HostingAppDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `certificate` | `Record<string, any> | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `hosted_app_id` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string | null` | Yes |  |
| `path_rules` | `any[]` | Yes |  |
| `record_name` | `string | null` | Yes |  |
| `record_type` | `string | null` | Yes |  |
| `record_value` | `string | null` | Yes |  |
| `redirect_to` | `string | null` | Yes |  |
| `static_site_id` | `string | null` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_record` | `Record<string, any> | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `disable` | `/api/v1/hosting/apps/{app_id}/domains/{id}/disable` | `client.HostingAppDomain().create({ $action: 'disable', ... })` |
| `enable` | `/api/v1/hosting/apps/{app_id}/domains/{id}/enable` | `client.HostingAppDomain().create({ $action: 'enable', ... })` |

An action returns that action's OWN response, which is not necessarily a
HostingAppDomain record — check the API definition for its shape.

```ts
const result = await client.HostingAppDomain().create({
  $action: 'disable',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.HostingAppDomain().create({
  app_id: 'example_app_id',
  app_service_id: 'example_app_service_id',
  hostname: 'example_hostname',
  kind: 'example_kind',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HostingAppDomain().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.HostingAppDomain().load({ id: 'hosting_app_domain_id', app_id: 'app_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.HostingAppDomain().patch({
  id: 'hosting_app_domain_id',
  app_id: 'app_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.HostingAppDomain().remove({ id: 'hosting_app_domain_id', app_id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.HostingAppDomain().update({
  id: 'hosting_app_domain_id',
  app_id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HostingAppDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImageRepositoryEntity

```ts
const image_repository = client.ImageRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_configured` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `hosted_app_id` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provider_kind` | `string` | Yes |  |
| `registry_auth_token` | `string` | No |  |
| `repository_path` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ImageRepository().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ImageRepository().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImageRepositoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntegrationEntity

```ts
const integration = client.Integration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `github` | `Record<string, any>` | Yes |  |
| `gitlab` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `slack` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Integration().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InteractionResponseEntity

```ts
const interaction_response = client.InteractionResponse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answer` | `Record<string, any>` | Yes |  |
| `conversation_id` | `string` | Yes | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `number` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.InteractionResponse().create({
  agent_id: 'example_agent_id',
  interaction_id: 'example_interaction_id',
  organization_id: 'example_organization_id',
  answer: {},
  conversation_id: 'example_conversation_id',
  expected_revision: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InteractionResponseEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InvitationEntity

```ts
const invitation = client.Invitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `string | null` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `string | null` | Yes |  |
| `expires_at_label` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `string | null` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `organization` | `Record<string, any>` | Yes |  |
| `revoked_at` | `string | null` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Invitation().create({
  organization_id: 'example_organization_id',
  email: 'example_email',
  role: 'example_role',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Invitation().list({ organization_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Invitation().remove({ id: 'invitation_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InvitationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JourneyVariantReplayEntity

```ts
const journey_variant_replay = client.JourneyVariantReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `string | null` | Yes |  |
| `can_request_qualification` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `string | null` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `max_seconds` | `number` | No |  |
| `preparation_receipt` | `Record<string, any> | null` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `boolean` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `string | null` | Yes |  |
| `scenario_file` | `Record<string, any>` | Yes |  |
| `scenario_run_id` | `string | null` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.JourneyVariantReplay().create({
  journey_variant_id: 'example_journey_variant_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  idempotency_key: 'example_idempotency_key',
  review_reason: 'example_review_reason',
  scenario_file: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JourneyVariantReplayEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KnowledgeEntity

```ts
const knowledge = client.Knowledge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_digest` | `string` | Yes |  |
| `content_json` | `Record<string, any>` | Yes |  |
| `document` | `Record<string, any>` | Yes |  |
| `documents` | `any[]` | Yes |  |
| `dreaming` | `Record<string, any>` | Yes |  |
| `expected_digest` | `string` | Yes |  |
| `history` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `markdown` | `string` | Yes |  |
| `observed_at` | `string` | Yes |  |
| `organization` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `project_id` | `string` | Yes |  |
| `project_name` | `string` | Yes |  |
| `projects` | `any[]` | Yes |  |
| `selected_project_id` | `string | null` | Yes |  |
| `source` | `Record<string, any>` | Yes |  |
| `title` | `string` | Yes |  |
| `total` | `number` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Knowledge().create({
  organization_id: 'example_organization_id',
  markdown: 'example_markdown',
  project_id: 'example_project_id',
  title: 'example_title',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Knowledge().load({ id: 'knowledge_id', organization_id: 'organization_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Knowledge().patch({
  id: 'knowledge_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Knowledge().remove({ id: 'knowledge_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Knowledge().update({
  id: 'knowledge_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KnowledgeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocalThreadDeliveryEntity

```ts
const local_thread_delivery = client.LocalThreadDelivery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decision` | `string` | Yes |  |
| `decision_pending` | `boolean` | Yes |  |
| `delivery` | `Record<string, any>` | Yes |  |
| `expected_version` | `number` | Yes |  |
| `id` | `string` | No |  |
| `policy` | `Record<string, any>` | Yes |  |
| `recovery_message` | `string | null` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LocalThreadDelivery().load({ id: 'local_thread_delivery_id', agent_id: 'agent_id', local_thread_id: 'local_thread_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LocalThreadDelivery().update({
  id: 'local_thread_delivery_id',
  agent_id: 'agent_id',
  local_thread_id: 'local_thread_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocalThreadDeliveryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocalThreadOperationEntity

```ts
const local_thread_operation = client.LocalThreadOperation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `arguments` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `Record<string, any>` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `Record<string, any>` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `Record<string, any>` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LocalThreadOperation().create({
  agent_id: 'example_agent_id',
  local_thread_id: 'example_local_thread_id',
  organization_id: 'example_organization_id',
  action: 'example_action',
  arguments: {},
  key: 'example_key',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LocalThreadOperation().load({ id: 'local_thread_operation_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocalThreadOperationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationEntity

```ts
const location = client.Location()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Location().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeEntity

```ts
const me = client.Me()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_organization` | `any` | Yes |  |
| `analytics_distinct_id` | `string` | No |  |
| `analytics_internal` | `boolean` | Yes | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` | No |  |
| `api_token` | `string` | No |  |
| `app_promotion` | `Record<string, any>` | Yes |  |
| `commit_author_email` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `enabled_features` | `any[]` | Yes |  |
| `github_pr_user_authorization_connected` | `boolean` | Yes |  |
| `github_pr_user_authorization_login` | `string | null` | Yes |  |
| `github_prs_authored_by_change_author` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `impersonation` | `Record<string, any> | null` | Yes |  |
| `name` | `string | null` | Yes |  |
| `next_path` | `string` | No | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `Record<string, any>` | Yes | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `boolean` | No |  |
| `openai_sign_in_enabled` | `boolean` | No |  |
| `organizations` | `any[]` | Yes |  |
| `pending_organization_invitation_count` | `number` | Yes |  |
| `pending_organization_invitation_count_label` | `string` | Yes |  |
| `picture_url` | `string | null` | Yes |  |
| `superadmin` | `boolean` | No | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `string | null` | No | The IANA zone the person chose for their agents' replies; null follows their app. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `account_deletion` | `/api/v1/me/account_deletion` | `client.Me().create({ $action: 'account_deletion', ... })` |
| `app_promotion` | `/api/v1/me/app_promotion` | `client.Me().create({ $action: 'app_promotion', ... })` |
| `account_deletion` | `/api/v1/me/account_deletion` | `client.Me().load({ $action: 'account_deletion', ... })` |
| `landing` | `/api/v1/me/landing` | `client.Me().load({ $action: 'landing', ... })` |
| `workspace_suggestion` | `/api/v1/me/workspace_suggestion` | `client.Me().load({ $action: 'workspace_suggestion', ... })` |
| `profile_image` | `/api/v1/me/profile_image` | `client.Me().remove({ $action: 'profile_image', ... })` |
| `active_organization` | `/api/v1/me/active_organization` | `client.Me().update({ $action: 'active_organization', ... })` |
| `profile_image` | `/api/v1/me/profile_image` | `client.Me().update({ $action: 'profile_image', ... })` |

An action returns that action's OWN response, which is not necessarily a
Me record — check the API definition for its shape.

```ts
const result = await client.Me().create({
  $action: 'account_deletion',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Me().load({ id: 'me_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Me().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeEmailEntity

```ts
const me_email = client.MeEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account` | `boolean` | Yes |  |
| `can_delete` | `boolean` | Yes |  |
| `can_resend_verification` | `boolean` | Yes |  |
| `can_set_account` | `boolean` | Yes |  |
| `can_set_commit_author` | `boolean` | Yes |  |
| `commit_author` | `boolean` | Yes |  |
| `email` | `string` | Yes |  |
| `emails` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | No |  |
| `verification_status` | `string` | Yes |  |
| `verified` | `boolean` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `resend_verification` | `/api/v1/me/emails/{id}/resend_verification` | `client.MeEmail().create({ $action: 'resend_verification', ... })` |

An action returns that action's OWN response, which is not necessarily a
MeEmail record — check the API definition for its shape.

```ts
const result = await client.MeEmail().create({
  $action: 'resend_verification',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MeEmail().create({
  email: 'example_email',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MeEmail().list()
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.MeEmail().patch({
  id: 'me_email_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.MeEmail().remove({ id: 'me_email_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.MeEmail().update({
  id: 'me_email_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeEmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeOnboardingEntity

```ts
const me_onboarding = client.MeOnboarding()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `call` | `/api/v1/me/onboarding/call` | `client.MeOnboarding().create({ $action: 'call', ... })` |
| `claim` | `/api/v1/me/onboarding/claim` | `client.MeOnboarding().create({ $action: 'claim', ... })` |
| `dismiss` | `/api/v1/me/onboarding/dismiss` | `client.MeOnboarding().create({ $action: 'dismiss', ... })` |

An action returns that action's OWN response, which is not necessarily a
MeOnboarding record — check the API definition for its shape.

```ts
const result = await client.MeOnboarding().create({
  $action: 'call',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeOnboardingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MediaFileEntity

```ts
const media_file = client.MediaFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MediaFile().load({ id: 'media_file_id', browser_session_id: 'browser_session_id', media_id: 'media_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MediaFileEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MemberEntity

```ts
const member = client.Member()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepted_at` | `string | null` | Yes |  |
| `accepted_by_user` | `any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `email` | `string` | Yes |  |
| `email_delivery_status` | `string` | No |  |
| `expires_at` | `string | null` | Yes |  |
| `expires_at_label` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `invite_url` | `string | null` | Yes |  |
| `invited_by_user` | `any` | Yes |  |
| `is_self` | `boolean` | Yes |  |
| `organization` | `Record<string, any>` | Yes |  |
| `revoked_at` | `string | null` | Yes |  |
| `role` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |
| `user` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Member().list({ organization_id: "example" })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Member().patch({
  id: 'member_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Member().remove({ id: 'member_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Member().update({
  id: 'member_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MemberEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MemoryEntity

```ts
const memory = client.Memory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `environment_id` | `string` | No |  |
| `finding` | `string` | Yes |  |
| `history` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `indexed_at` | `string | null` | Yes |  |
| `memory` | `Record<string, any>` | Yes |  |
| `project_id` | `string` | No |  |
| `response` | `string` | No |  |
| `scope` | `Record<string, any>` | Yes |  |
| `source` | `Record<string, any>` | Yes |  |
| `tags` | `any[]` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Memory().create({
  organization_id: 'example_organization_id',
  finding: 'example_finding',
  title: 'example_title',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Memory().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Memory().load({ id: 'memory_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Memory().remove({ id: 'memory_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MemoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MergeRequestEntity

```ts
const merge_request = client.MergeRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `any[]` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` | Yes |  |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `string | null` | Yes |  |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `boolean` | Yes |  |
| `findings` | `any[]` | Yes |  |
| `github_repository` | `string | null` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` | Yes |  |
| `head_sha` | `string` | Yes | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | Yes |  |
| `idempotency_key` | `string` | Yes |  |
| `number` | `number` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `preview_cleanup_ready` | `boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string | null` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `string | null` | Yes | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `string | null` | Yes |  |
| `provider` | `string` | Yes |  |
| `pull_request` | `Record<string, any>` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `requested_run_id` | `string | null` | Yes |  |
| `runs` | `any[]` | Yes |  |
| `source_branch` | `string | null` | Yes |  |
| `source_repository` | `string | null` | Yes |  |
| `source_url` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `preview` | `/api/v1/organizations/{organization_id}/verify/merge_requests/preview` | `client.MergeRequest().create({ $action: 'preview', ... })` |
| `rerun` | `/api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun` | `client.MergeRequest().create({ $action: 'rerun', ... })` |

An action returns that action's OWN response, which is not necessarily a
MergeRequest record — check the API definition for its shape.

```ts
const result = await client.MergeRequest().create({
  $action: 'preview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MergeRequest().create({
  organization_id: 'example_organization_id',
  idempotency_key: 'example_idempotency_key',
  number: 1,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MergeRequest().load({ id: 'merge_request_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MergeRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessagingConversationMessageEntity

```ts
const messaging_conversation_message = client.MessagingConversationMessage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment_limit` | `number` | Yes |  |
| `attachment_max_bytes` | `number` | Yes |  |
| `client_operation_id` | `string` | Yes |  |
| `content` | `string` | Yes |  |
| `id` | `string` | No |  |
| `media` | `Record<string, any>` | Yes |  |
| `media_upload_ids` | `any[]` | No | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `any[]` | Yes |  |
| `reply_to` | `string` | No | Public ID of a visible message |
| `retry_attachment` | `boolean` | No | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `string | null` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `string | null` | No |  |
| `send_style` | `string | null` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reaction` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction` | `client.MessagingConversationMessage().create({ $action: 'reaction', ... })` |

An action returns that action's OWN response, which is not necessarily a
MessagingConversationMessage record — check the API definition for its shape.

```ts
const result = await client.MessagingConversationMessage().create({
  $action: 'reaction',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MessagingConversationMessage().create({
  messaging_conversation_id: 'example_messaging_conversation_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  client_operation_id: 'example_client_operation_id',
  content: 'example_content',
  media: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessagingConversationMessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessagingConversationUploadEntity

```ts
const messaging_conversation_upload = client.MessagingConversationUpload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `Record<string, any>` | Yes |  |
| `upload_id` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MessagingConversationUpload().create({
  messaging_conversation_id: 'example_messaging_conversation_id',
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessagingConversationUploadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetricQueryEntity

```ts
const metric_query = client.MetricQuery()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MetricQuery().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetricQueryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NetworkConnectionEntity

```ts
const network_connection = client.NetworkConnection()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.NetworkConnection().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.NetworkConnection().patch({
  id: 'id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.NetworkConnection().update({
  id: 'id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NetworkConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NomadAllocationEntity

```ts
const nomad_allocation = client.NomadAllocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `client_status` | `string | null` | Yes |  |
| `create_time` | `string | null` | Yes |  |
| `datacenter` | `string | null` | Yes |  |
| `desired_description` | `string | null` | Yes |  |
| `desired_status` | `string | null` | Yes |  |
| `fetched_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `job_id` | `string | null` | Yes |  |
| `modify_time` | `string | null` | Yes |  |
| `name` | `string | null` | Yes |  |
| `namespace` | `string` | Yes |  |
| `node_id` | `string | null` | Yes |  |
| `node_name` | `string | null` | Yes |  |
| `resources` | `Record<string, any>` | Yes |  |
| `task_group` | `string | null` | Yes |  |
| `task_states` | `any[]` | Yes |  |
| `verify_runner_images` | `any[]` | No | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.NomadAllocation().load({ id: 'nomad_allocation_id', app_id: 'app_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NomadAllocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NomadLogEntity

```ts
const nomad_log = client.NomadLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocation_id` | `string` | Yes |  |
| `environment` | `string` | No |  |
| `fetched_at` | `string` | Yes |  |
| `location` | `string | null` | No |  |
| `logs` | `string` | Yes |  |
| `namespace` | `string` | Yes |  |
| `offset` | `number` | Yes |  |
| `origin` | `string` | Yes |  |
| `service` | `string` | No |  |
| `task` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.NomadLog().list({ app_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NomadLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEntity

```ts
const organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_products` | `any[]` | Yes | Products this organization has activated (PRD 144). |
| `agents_only` | `boolean` | No | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `boolean` | Yes | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `github_prs_authored_by_change_author` | `boolean` | Yes |  |
| `google_workspace_domain` | `string | null` | No | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` | Yes |  |
| `logo_url` | `string | null` | Yes |  |
| `member_count` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `pending_invitation_count` | `number` | Yes |  |
| `personal` | `boolean` | Yes |  |
| `repository_count` | `number` | Yes |  |
| `role` | `string | null` | Yes |  |
| `sandbox_region` | `string` | Yes |  |
| `shared_agent_personal_accounts_enabled` | `boolean` | No | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` | Yes |  |
| `source_control_providers` | `any[]` | No | Connected source control providers for this organization. |
| `source_ui_enabled` | `boolean` | No | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Yes | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |
| `verify_pr_scenario_writing_enabled` | `boolean` | Yes |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Organization().create({
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Organization().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Organization().load({ id: 'organization_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Organization().patch({
  id: 'organization_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Organization().update({
  id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PageEntity

```ts
const page = client.Page()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_runs` | `any[]` | Yes |  |
| `checkout_required` | `boolean` | Yes |  |
| `cli_signed_in_at` | `string | null` | Yes | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `Record<string, any>` | Yes |  |
| `demo_project` | `Record<string, any> | null` | Yes | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `any[]` | Yes |  |
| `included_deep_scan` | `boolean` | Yes | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` | No |  |
| `organization` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `project` | `any` | Yes | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `any[]` | No |  |
| `pull_requests` | `any[]` | No |  |
| `repositories` | `any[]` | Yes |  |
| `runs` | `any[]` | Yes |  |
| `runs_pagination` | `Record<string, any>` | Yes |  |
| `suggested_app_url` | `string | null` | Yes | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `boolean` | Yes | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Page().load({ organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PageEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PageAgentEntity

```ts
const page_agent = client.PageAgent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `any[]` | Yes |  |
| `can_edit_integration_connections` | `boolean` | Yes |  |
| `creation_enabled` | `boolean` | Yes |  |
| `inbox` | `any` | No |  |
| `integration_choices` | `any[]` | Yes |  |
| `integration_choices_truncated` | `boolean` | Yes |  |
| `integration_selected` | `any[]` | Yes |  |
| `model_choices` | `any[]` | No |  |
| `new_configuration` | `any` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `pinned_agent` | `any` | Yes |  |
| `platform_event_types` | `any[]` | Yes |  |
| `repository_choices` | `any[]` | Yes | Empty compatibility field. |
| `repository_choices_truncated` | `boolean` | Yes |  |
| `runtime_versions` | `any[]` | No | Runtime choices authorized for this organization. |
| `selected_agent` | `any` | Yes |  |
| `selected_reference` | `string | null` | Yes |  |
| `viewer_id` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `activity` | `/api/v1/organizations/{organization_id}/agents/page/activity` | `client.PageAgent().create({ $action: 'activity', ... })` |
| `roster` | `/api/v1/organizations/{organization_id}/agents/page/roster` | `client.PageAgent().load({ $action: 'roster', ... })` |

An action returns that action's OWN response, which is not necessarily a
PageAgent record — check the API definition for its shape.

```ts
const result = await client.PageAgent().create({
  $action: 'activity',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PageAgent().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PageAgentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PageProjectRunEntity

```ts
const page_project_run = client.PageProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `any[]` | Yes |  |
| `fix_scenario_count` | `number` | Yes | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `any[]` | Yes | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `number` | Yes |  |
| `id` | `string` | No |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `preparation_reason` | `string | null` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `run` | `Record<string, any>` | Yes |  |
| `scenario_runs` | `any[]` | Yes |  |
| `selected_scenario_run` | `any` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PageProjectRun().load({ id: 'page_project_run_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PageProjectRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PagesProjectCredentialEntity

```ts
const pages_project_credential = client.PagesProjectCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `Record<string, any> | null` | No |  |
| `composal_address` | `string | null` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `boolean` | Yes |  |
| `credential_keys` | `Record<string, any>` | Yes |  |
| `description` | `string | null` | Yes |  |
| `email_link_auth_origins` | `any[]` | Yes |  |
| `has_inbox` | `boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `Record<string, any> | null` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string | null` | Yes |  |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes |  |
| `managed` | `boolean` | Yes |  |
| `mfa_enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `sign_in_verified` | `boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string | null` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `username` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PagesProjectCredential().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PagesProjectCredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PagesProjectPersonaEntity

```ts
const pages_project_persona = client.PagesProjectPersona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_count` | `number` | Yes |  |
| `credentials` | `any[]` | Yes |  |
| `needs_attention_count` | `number` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `persona_states` | `Record<string, any>` | Yes | Scenarios by the state of their latest execution. |
| `personas` | `any[]` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PagesProjectPersona().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PagesProjectPersonaEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PagesProjectRunEntity

```ts
const pages_project_run = client.PagesProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_query` | `string` | Yes |  |
| `environments` | `any[]` | Yes |  |
| `environments_has_more` | `boolean` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `runs` | `any[]` | Yes |  |
| `selected_environment` | `any` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PagesProjectRun().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PagesProjectRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PagesProjectScenarioEntity

```ts
const pages_project_scenario = client.PagesProjectScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_url` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string | null` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PagesProjectScenario().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PagesProjectScenarioEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PersonalAccessTokenEntity

```ts
const personal_access_token = client.PersonalAccessToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PersonalAccessToken().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PersonalAccessToken().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.PersonalAccessToken().remove({ id: 'personal_access_token_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PersonalAccessTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PreviewOperationEntity

```ts
const preview_operation = client.PreviewOperation()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PreviewOperation().list({ app_id: "example", preview_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PreviewOperationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PreviewProfileSecretBindingEntity

```ts
const preview_profile_secret_binding = client.PreviewProfileSecretBinding()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PreviewProfileSecretBinding().create({
  app_id: 'example_app_id',
  preview_profile_id: 'example_preview_profile_id',
  env_key: 'example_env_key',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PreviewProfileSecretBinding().list({ app_id: "example", preview_profile_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.PreviewProfileSecretBinding().remove({ id: 'preview_profile_secret_binding_id', app_id: 'app_id', preview_profile_id: 'preview_profile_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PreviewProfileSecretBindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PreviewSecretEntity

```ts
const preview_secret = client.PreviewSecret()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `env_key` | `string` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `rotate` | `/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate` | `client.PreviewSecret().create({ $action: 'rotate', ... })` |

An action returns that action's OWN response, which is not necessarily a
PreviewSecret record — check the API definition for its shape.

```ts
const result = await client.PreviewSecret().create({
  $action: 'rotate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PreviewSecret().create({
  app_id: 'example_app_id',
  preview_id: 'example_preview_id',
  env_key: 'example_env_key',
  name: 'example_name',
  slug: 'example_slug',
  value: 'example_value',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.PreviewSecret().remove({ id: 'preview_secret_id', app_id: 'app_id', preview_id: 'preview_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PreviewSecretEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PreviewSharingApprovalEntity

```ts
const preview_sharing_approval = client.PreviewSharingApproval()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_build_keys` | `any[]` | Yes |  |
| `approved_build_secrets` | `any[]` | Yes |  |
| `approved_default_configuration` | `any[]` | Yes |  |
| `approved_default_secrets` | `any[]` | Yes |  |
| `approved_source_keys` | `any[]` | Yes |  |
| `build_keys` | `any[]` | No |  |
| `build_secrets` | `any[]` | No |  |
| `default_configuration` | `any[]` | No |  |
| `default_secrets` | `any[]` | No |  |
| `services` | `any[]` | Yes |  |
| `snapshot_version` | `number` | Yes |  |
| `source_keys` | `any[]` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PreviewSharingApproval().create({
  app_id: 'example_app_id',
  preview_id: 'example_preview_id',
  snapshot_version: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PreviewSharingApproval().list({ app_id: "example", preview_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PreviewSharingApprovalEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapIdentityDecisionEntity

```ts
const product_map_identity_decision = client.ProductMapIdentityDecision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `observations` | `any[]` | Yes |  |
| `operation` | `string` | Yes |  |
| `reason` | `string` | Yes |  |
| `target` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProductMapIdentityDecision().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  observations: [],
  operation: 'example_operation',
  reason: 'example_reason',
  target: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapIdentityDecisionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapJourneyEntity

```ts
const product_map_journey = client.ProductMapJourney()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_variant_id` | `string | null` | No |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `journey` | `Record<string, any>` | Yes |  |
| `next_cursor` | `string | null` | Yes |  |
| `preview` | `any` | No |  |
| `scope` | `Record<string, any>` | Yes |  |
| `title` | `string` | Yes |  |
| `tree` | `Record<string, any>` | Yes |  |
| `tree_loaded` | `boolean` | No |  |
| `variant_count` | `number` | Yes |  |
| `variants` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProductMapJourney().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProductMapJourney().load({ id: 'product_map_journey_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapJourneyEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapJourneyReplayEntity

```ts
const product_map_journey_replay = client.ProductMapJourneyReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_id` | `string | null` | Yes |  |
| `can_request_qualification` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `failure_code` | `string | null` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `preparation_receipt` | `Record<string, any> | null` | Yes |  |
| `qualification` | `any` | Yes |  |
| `qualification_status` | `string` | Yes |  |
| `replay_required` | `boolean` | Yes |  |
| `review_reason` | `string` | Yes |  |
| `run_id` | `string | null` | Yes |  |
| `scenario_run_id` | `string | null` | Yes |  |
| `source_digest` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `variant_id` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `qualification` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification` | `client.ProductMapJourneyReplay().create({ $action: 'qualification', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProductMapJourneyReplay record — check the API definition for its shape.

```ts
const result = await client.ProductMapJourneyReplay().create({
  $action: 'qualification',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProductMapJourneyReplay().load({ id: 'product_map_journey_replay_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapJourneyReplayEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapObservationEntity

```ts
const product_map_observation = client.ProductMapObservation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capture` | `Record<string, any>` | Yes |  |
| `events` | `any[]` | Yes |  |
| `evidence_id` | `string` | Yes |  |
| `id` | `string` | No |  |
| `observation_id` | `string` | Yes |  |
| `scope` | `Record<string, any>` | Yes |  |
| `state` | `any` | Yes |  |
| `status` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `identity_history` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}/identity_history` | `client.ProductMapObservation().load({ $action: 'identity_history', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProductMapObservation record — check the API definition for its shape.

```ts
const result = await client.ProductMapObservation().load({
  $action: 'identity_history',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProductMapObservation().load({ id: 'product_map_observation_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapObservationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapQuestionEntity

```ts
const product_map_question = client.ProductMapQuestion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `area` | `string` | No |  |
| `before` | `string` | No |  |
| `claims` | `any[]` | Yes |  |
| `evidence_truncated` | `boolean` | Yes |  |
| `model` | `string` | Yes |  |
| `persona_id` | `string` | No |  |
| `query` | `string` | No |  |
| `question` | `string` | Yes |  |
| `reasoning_effort` | `string` | Yes |  |
| `revision_id` | `string` | No |  |
| `scope` | `Record<string, any>` | Yes |  |
| `since` | `string` | No |  |
| `state_id` | `string` | No |  |
| `status` | `string` | Yes |  |
| `unknowns` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProductMapQuestion().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  question: 'example_question',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapQuestionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductMapStateEntity

```ts
const product_map_state = client.ProductMapState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string | null` | Yes |  |
| `attempts` | `any[]` | Yes |  |
| `captured_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `incoming` | `any[]` | Yes |  |
| `labels` | `Record<string, any>` | Yes |  |
| `layout` | `Record<string, any>` | Yes |  |
| `observation_id` | `string` | Yes |  |
| `omitted_controls` | `number` | Yes |  |
| `outgoing` | `any[]` | Yes |  |
| `revision_id` | `string` | Yes |  |
| `scope` | `Record<string, any>` | Yes |  |
| `screenshot_url` | `string | null` | Yes |  |
| `state` | `Record<string, any>` | Yes |  |
| `truncated` | `boolean` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProductMapState().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProductMapState().load({ id: 'product_map_state_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductMapStateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `string | null` | Yes |  |
| `context` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credentials` | `any[]` | Yes |  |
| `demo` | `boolean` | Yes | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `any[]` | Yes |  |
| `environments` | `any[]` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `icon_url` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_provider` | `Record<string, any>` | Yes | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `network_connections` | `any[]` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `overview` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `personas` | `any[]` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `pull_request_options` | `Record<string, any>` | Yes |  |
| `pull_requests` | `any[]` | Yes |  |
| `purpose` | `string | null` | Yes |  |
| `runs` | `any[]` | Yes |  |
| `scenario_history` | `Record<string, any>` | Yes |  |
| `scenario_states` | `Record<string, any>` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `any[]` | Yes |  |
| `setup_required` | `boolean` | No |  |
| `slug` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences` | `Record<string, any>` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `number` | Yes |  |
| `website_url` | `string | null` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{id}/archive` | `client.Project().create({ $action: 'archive', ... })` |
| `discovery` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/discovery` | `client.Project().create({ $action: 'discovery', ... })` |
| `environment` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/environment` | `client.Project().load({ $action: 'environment', ... })` |
| `header` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/header` | `client.Project().load({ $action: 'header', ... })` |
| `overview` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview` | `client.Project().load({ $action: 'overview', ... })` |
| `overview_activity` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_activity` | `client.Project().load({ $action: 'overview_activity', ... })` |
| `overview_discovery` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_discovery` | `client.Project().load({ $action: 'overview_discovery', ... })` |
| `overview_history` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_history` | `client.Project().load({ $action: 'overview_history', ... })` |
| `persona` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/persona` | `client.Project().load({ $action: 'persona', ... })` |
| `pr_testing` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/pr_testing` | `client.Project().load({ $action: 'pr_testing', ... })` |
| `product_map` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map` | `client.Project().load({ $action: 'product_map', ... })` |
| `product_map_comparison` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison` | `client.Project().load({ $action: 'product_map_comparison', ... })` |
| `recorder` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/recorder` | `client.Project().load({ $action: 'recorder', ... })` |
| `scenario` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario` | `client.Project().load({ $action: 'scenario', ... })` |
| `scenario_editor` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_editor` | `client.Project().load({ $action: 'scenario_editor', ... })` |
| `icon_image` | `/api/v1/organizations/{organization_id}/verification/projects/{id}/icon_image` | `client.Project().update({ $action: 'icon_image', ... })` |

An action returns that action's OWN response, which is not necessarily a
Project record — check the API definition for its shape.

```ts
const result = await client.Project().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Project().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Project().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Project().load({ id: 'project_id', organization_id: 'organization_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.Project().patch({
  id: 'project_id',
  organization_id: 'organization_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Project().update({
  id: 'project_id',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectAndroidApkEntity

```ts
const project_android_apk = client.ProjectAndroidApk()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `Record<string, any>` | Yes |  |
| `artifact_paths` | `any[]` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `Record<string, any>` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `Record<string, any>` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectAndroidApk().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectAndroidApkEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectCodeMapEntity

```ts
const project_code_map = client.ProjectCodeMap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `can_scan` | `boolean` | Yes |  |
| `commit_sha` | `string` | Yes |  |
| `configured` | `boolean` | Yes |  |
| `error_code` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `repository_id` | `string` | Yes |  |
| `revision` | `Record<string, any>` | Yes |  |
| `slug` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `session` | `/api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps/session` | `client.ProjectCodeMap().create({ $action: 'session', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectCodeMap record — check the API definition for its shape.

```ts
const result = await client.ProjectCodeMap().create({
  $action: 'session',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectCodeMap().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  repository_id: 'example_repository_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectCodeMap().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectCodeMapEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEnvironmentEntity

```ts
const project_environment = client.ProjectEnvironment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowed_actions` | `string` | Yes |  |
| `allowed_origins` | `any[]` | Yes |  |
| `archived_at` | `string | null` | Yes |  |
| `base_url` | `string | null` | Yes |  |
| `base_url_changeable` | `boolean` | Yes | Whether an update may send a new base_url. |
| `binary` | `string` | No |  |
| `conversation_only_messaging` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `desktop` | `Record<string, any> | null` | Yes |  |
| `execution_mode` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `imessage_number` | `string | null` | Yes | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `messaging_conversation` | `any` | Yes |  |
| `messaging_problem` | `string | null` | Yes |  |
| `messaging_source` | `any` | Yes |  |
| `messaging_tester_number` | `string | null` | Yes | One configured tester number. |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `Record<string, any> | null` | Yes |  |
| `source_branch` | `string | null` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verify_network_connection_id` | `string | null` | Yes |  |
| `version` | `number` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive` | `client.ProjectEnvironment().create({ $action: 'archive', ... })` |
| `directory` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/directory` | `client.ProjectEnvironment().load({ $action: 'directory', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectEnvironment record — check the API definition for its shape.

```ts
const result = await client.ProjectEnvironment().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectEnvironment().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectEnvironment().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectEnvironment().load({ id: 'project_environment_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ProjectEnvironment().patch({
  id: 'project_environment_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ProjectEnvironment().update({
  id: 'project_environment_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectFindingEntity

```ts
const project_finding = client.ProjectFinding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deferred_until` | `string | null` | No |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `last_seen_at` | `string` | Yes |  |
| `locked` | `boolean` | Yes | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` | Yes |  |
| `source` | `string` | Yes | The workflow that produced the finding |
| `source_title` | `string` | Yes | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `verification` | `any` | Yes | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Yes | Where the finding is reviewed within its source |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectFinding().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectFindingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectFixtureEntity

```ts
const project_fixture = client.ProjectFixture()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignments` | `any[]` | Yes | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `number` | Yes |  |
| `content_type` | `string` | Yes |  |
| `credential_ids` | `any[]` | Yes |  |
| `credentials` | `any[]` | Yes |  |
| `environment_ids` | `any[]` | Yes |  |
| `environments` | `any[]` | Yes |  |
| `fixtures` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `persona_ids` | `any[]` | Yes |  |
| `personas` | `any[]` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `sha256` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectFixture().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectFixture().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectFixture().load({ id: 'project_fixture_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ProjectFixture().patch({
  id: 'project_fixture_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectFixture().remove({ id: 'project_fixture_id', organization_id: 'organization_id', project_id: 'project_id', version: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ProjectFixture().update({
  id: 'project_fixture_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectFixtureEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectIosAppEntity

```ts
const project_ios_app = client.ProjectIosApp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `android` | `Record<string, any>` | Yes |  |
| `artifact_paths` | `any[]` | No |  |
| `description` | `string` | Yes |  |
| `image` | `string` | Yes |  |
| `ios` | `Record<string, any>` | Yes |  |
| `launch_command` | `string` | No |  |
| `managed_binary` | `Record<string, any>` | Yes |  |
| `platform` | `string` | No |  |
| `provider` | `string` | No |  |
| `setup_command` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectIosApp().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectIosAppEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectMessagingConversationEntity

```ts
const project_messaging_conversation = client.ProjectMessagingConversation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assistant_number` | `string` | Yes |  |
| `attachment_limit` | `number` | Yes |  |
| `attachment_max_bytes` | `number` | Yes |  |
| `environment_name` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `leased` | `boolean` | Yes |  |
| `messages` | `any[]` | Yes |  |
| `reconciled_at` | `string | null` | Yes |  |
| `retirable` | `boolean` | Yes |  |
| `seeded` | `boolean` | Yes |  |
| `send_blocked_reason` | `string | null` | Yes |  |
| `send_disposition` | `string` | No |  |
| `send_error` | `string | null` | No |  |
| `tester_number` | `string` | Yes |  |
| `unknown_send` | `boolean` | Yes |  |
| `verify_environment_id` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `mark_read` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read` | `client.ProjectMessagingConversation().create({ $action: 'mark_read', ... })` |
| `retire` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/retire` | `client.ProjectMessagingConversation().create({ $action: 'retire', ... })` |
| `typing` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/typing` | `client.ProjectMessagingConversation().create({ $action: 'typing', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectMessagingConversation record — check the API definition for its shape.

```ts
const result = await client.ProjectMessagingConversation().create({
  $action: 'mark_read',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectMessagingConversation().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  assistant_number: 'example_assistant_number',
  tester_number: 'example_tester_number',
  verify_environment_id: 'example_verify_environment_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectMessagingConversation().load({ id: 'project_messaging_conversation_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ProjectMessagingConversation().patch({
  id: 'project_messaging_conversation_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ProjectMessagingConversation().update({
  id: 'project_messaging_conversation_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectMessagingConversationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectOverviewMetricEntity

```ts
const project_overview_metric = client.ProjectOverviewMetric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `counts` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectOverviewMetric().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectOverviewMetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectOverviewPullRequestEntity

```ts
const project_overview_pull_request = client.ProjectOverviewPullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `boolean` | Yes |  |
| `comment_url` | `string | null` | Yes |  |
| `draft` | `boolean` | Yes |  |
| `github_repository` | `string | null` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `string | null` | Yes |  |
| `latest_current` | `boolean` | Yes |  |
| `latest_head_sha` | `string | null` | Yes |  |
| `latest_reason` | `string | null` | Yes |  |
| `latest_run_id` | `string | null` | Yes |  |
| `latest_state` | `string | null` | Yes |  |
| `number` | `number` | Yes |  |
| `project_id` | `string | null` | Yes |  |
| `project_slug` | `string | null` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `string | null` | Yes |  |
| `source_repository` | `string | null` | Yes |  |
| `source_url` | `string | null` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectOverviewPullRequest().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectOverviewPullRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectProductMapEntity

```ts
const project_product_map = client.ProjectProductMap()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `overview` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview` | `client.ProjectProductMap().create({ $action: 'overview', ... })` |
| `brief` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/brief` | `client.ProjectProductMap().load({ $action: 'brief', ... })` |
| `compare` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/compare` | `client.ProjectProductMap().load({ $action: 'compare', ... })` |
| `frontier` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/frontier` | `client.ProjectProductMap().load({ $action: 'frontier', ... })` |
| `overview` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview` | `client.ProjectProductMap().load({ $action: 'overview', ... })` |
| `path` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/path` | `client.ProjectProductMap().load({ $action: 'path', ... })` |
| `version` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/version` | `client.ProjectProductMap().load({ $action: 'version', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectProductMap record — check the API definition for its shape.

```ts
const result = await client.ProjectProductMap().create({
  $action: 'overview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectProductMapEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectRecordingEntity

```ts
const project_recording = client.ProjectRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `draft` | `any` | Yes | Present once drafted. |
| `environment_id` | `string` | Yes | The project environment the browser opens. |
| `error` | `string | null` | Yes |  |
| `event_count` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `persona_id` | `string` | Yes | The project persona the journey acts as. |
| `phase` | `string` | Yes | What the owner can do now. |
| `signed_in_during_recording` | `boolean` | Yes |  |
| `start_path` | `string` | No | A path on the environment to start at, such as /settings. |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `finish` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish` | `client.ProjectRecording().create({ $action: 'finish', ... })` |
| `redraft` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/redraft` | `client.ProjectRecording().create({ $action: 'redraft', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectRecording record — check the API definition for its shape.

```ts
const result = await client.ProjectRecording().create({
  $action: 'finish',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectRecording().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  environment_id: 'example_environment_id',
  persona_id: 'example_persona_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectRecording().load({ id: 'project_recording_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectRecording().remove({ id: 'project_recording_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectRecordingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectRunPlanEntity

```ts
const project_run_plan = client.ProjectRunPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `string | null` | Yes |  |
| `base_url` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dependencies` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `Record<string, any> | null` | Yes |  |
| `kind` | `string | null` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `nodes` | `any[]` | Yes |  |
| `preview` | `any` | Yes |  |
| `project_id` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive` | `client.ProjectRunPlan().create({ $action: 'archive', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectRunPlan record — check the API definition for its shape.

```ts
const result = await client.ProjectRunPlan().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectRunPlan().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  dependencies: [],
  identity_probe: {},
  name: 'example_name',
  nodes: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectRunPlan().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectRunPlan().load({ id: 'project_run_plan_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ProjectRunPlan().patch({
  id: 'project_run_plan_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ProjectRunPlan().update({
  id: 'project_run_plan_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectRunPlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectRunScheduleEntity

```ts
const project_run_schedule = client.ProjectRunSchedule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credential_ids` | `Record<string, any>` | Yes |  |
| `cron_expression` | `string | null` | No |  |
| `environment_id` | `string` | Yes | Project environment slug or public ID. |
| `environment_name` | `string` | No |  |
| `history` | `any[]` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `any[]` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `next_run_at` | `string` | Yes |  |
| `notification_channel` | `string` | No | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `number` | Yes |  |
| `selection_mode` | `string` | Yes |  |
| `slack_subscription_id` | `string | null` | No |  |
| `source_scenario_id` | `string | null` | No |  |
| `state` | `string` | Yes |  |
| `time_of_day` | `string` | Yes |  |
| `time_zone` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `preview` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/preview` | `client.ProjectRunSchedule().create({ $action: 'preview', ... })` |
| `lookup` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/lookup` | `client.ProjectRunSchedule().load({ $action: 'lookup', ... })` |

An action returns that action's OWN response, which is not necessarily a
ProjectRunSchedule record — check the API definition for its shape.

```ts
const result = await client.ProjectRunSchedule().create({
  $action: 'preview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ProjectRunSchedule().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectRunSchedule().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectRunSchedule().load({ id: 'project_run_schedule_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ProjectRunSchedule().patch({
  id: 'project_run_schedule_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ProjectRunSchedule().update({
  id: 'project_run_schedule_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectRunScheduleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectScenarioOptionEntity

```ts
const project_scenario_option = client.ProjectScenarioOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environments` | `any[]` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `personas` | `any[]` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `scenario_states` | `Record<string, any>` | Yes | Scenarios by the state of their latest execution. |
| `scenarios` | `any[]` | Yes |  |
| `schedule_options` | `any` | No |  |
| `schedules` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectScenarioOption().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectScenarioOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectScenarioRowEntity

```ts
const project_scenario_row = client.ProjectScenarioRow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor_count` | `number` | Yes |  |
| `dependency_count` | `number` | Yes |  |
| `health` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes |  |
| `labels` | `any[]` | Yes |  |
| `name` | `string` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `selectable_for_run` | `boolean` | Yes |  |
| `step_count` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectScenarioRow().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectScenarioRowEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectSettingEntity

```ts
const project_setting = client.ProjectSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_messaging_environments` | `any[]` | Yes |  |
| `messaging_conversations` | `any[]` | Yes |  |
| `messaging_enabled` | `boolean` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `tester_numbers` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectSetting().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PullRequestEntity

```ts
const pull_request = client.PullRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_tests` | `any[]` | Yes | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | No | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `boolean` | No | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | No | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `any[]` | Yes |  |
| `head_sha` | `string` | No | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` | No |  |
| `idempotency_key` | `string` | Yes |  |
| `imessage_number` | `string` | No | International destination of this exact deployed commit. |
| `number` | `number` | No |  |
| `pagination` | `Record<string, any>` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `preview_cleanup_ready` | `boolean` | Yes | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `string | null` | No | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` | No |  |
| `project_id` | `string` | No | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `Record<string, any>` | Yes |  |
| `repository_id` | `string` | No |  |
| `runs` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `demo_share` | `/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | `client.PullRequest().create({ $action: 'demo_share', ... })` |
| `preview` | `/api/v1/organizations/{organization_id}/verify/pull_requests/preview` | `client.PullRequest().create({ $action: 'preview', ... })` |
| `rerun` | `/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun` | `client.PullRequest().create({ $action: 'rerun', ... })` |
| `lookup` | `/api/v1/organizations/{organization_id}/verify/pull_requests/lookup` | `client.PullRequest().load({ $action: 'lookup', ... })` |
| `demo_share` | `/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share` | `client.PullRequest().remove({ $action: 'demo_share', ... })` |

An action returns that action's OWN response, which is not necessarily a
PullRequest record — check the API definition for its shape.

```ts
const result = await client.PullRequest().create({
  $action: 'demo_share',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PullRequest().create({
  organization_id: 'example_organization_id',
  idempotency_key: 'example_idempotency_key',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PullRequest().load({ id: 'pull_request_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PullRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PullRequestSettingEntity

```ts
const pull_request_setting = client.PullRequestSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_preview_profile_id` | `string | null` | No |  |
| `app_service_id` | `string | null` | No |  |
| `bots` | `any[]` | Yes | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `boolean` | Yes | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `Record<string, any> | null` | Yes | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `number` | No | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` | Yes |  |
| `demo_videos` | `boolean` | Yes | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `boolean` | No | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `string | null` | Yes | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` | No |  |
| `enabled` | `boolean` | Yes | Test PRs automatically. |
| `environment` | `string` | Yes | The environment whose test accounts sign in to the previews. |
| `environments` | `any[]` | Yes |  |
| `github_check_enabled` | `boolean` | No | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `any[]` | Yes | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` | Yes |  |
| `imessage_comment_prefix` | `string | null` | Yes |  |
| `imessage_number` | `string | null` | Yes | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` | Yes |  |
| `limits` | `Record<string, any>` | Yes |  |
| `link_pattern` | `string | null` | Yes | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `string | null` | Yes | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `number` | No |  |
| `messaging_enabled` | `boolean` | Yes |  |
| `messaging_tester_number` | `string | null` | Yes | One configured tester number. |
| `non_product_paths` | `any[]` | No |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `pr_check` | `boolean` | Yes | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` | No |  |
| `preview_comment_authors` | `any[]` | No |  |
| `preview_comment_pattern` | `string` | No |  |
| `preview_comment_wildcard` | `string | null` | Yes | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `string | null` | Yes | composal: the preview profile that builds each PR. |
| `preview_profiles` | `any[]` | Yes |  |
| `previews` | `string` | Yes | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Yes | Composal project owning this PR Testing configuration. |
| `project_repositories` | `any[]` | Yes |  |
| `provider` | `string` | Yes |  |
| `repositories` | `any[]` | Yes |  |
| `repository` | `string` | Yes | Repository ID; see repositories for its name. |
| `repository_id` | `string` | Yes |  |
| `repository_kind` | `string` | Yes | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` | Yes |  |
| `service` | `string | null` | Yes | composal: the public service the browsers open. |
| `settings` | `any[]` | Yes |  |
| `setup` | `any` | Yes | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `Record<string, any>` | Yes | The answers a new setup starts from |
| `source_repository` | `string` | Yes |  |
| `target_mode` | `string` | Yes |  |
| `tester_numbers` | `any[]` | Yes |  |
| `trigger_label` | `string` | Yes | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `boolean` | No |  |
| `trigger_on_label` | `boolean` | No |  |
| `trigger_on_push` | `boolean` | No |  |
| `trigger_on_ready` | `boolean` | No |  |
| `triggers` | `Record<string, any>` | Yes | When runs start. |
| `verify_environment_id` | `string` | Yes |  |
| `write_scenarios` | `boolean` | Yes | Draft and validate focused scenarios for each change on its preview. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `detect_preview` | `/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview` | `client.PullRequestSetting().create({ $action: 'detect_preview', ... })` |

An action returns that action's OWN response, which is not necessarily a
PullRequestSetting record — check the API definition for its shape.

```ts
const result = await client.PullRequestSetting().create({
  $action: 'detect_preview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PullRequestSetting().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PullRequestSetting().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PullRequestSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PullRequestSettingAddRepositoryEntity

```ts
const pull_request_setting_add_repository = client.PullRequestSettingAddRepository()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `project_id` | `string` | Yes |  |
| `replace` | `boolean` | No | Make these the project's only repositories. |
| `repositories` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PullRequestSettingAddRepository().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  repositories: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PullRequestSettingAddRepositoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PullRequestSettingDetectCommentEntity

```ts
const pull_request_setting_detect_comment = client.PullRequestSettingDetectComment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bots` | `any[]` | No | The bots answer |
| `deployment` | `string` | No | The deployment answer |
| `example_url` | `string` | No |  |
| `imessage_comment_prefix` | `string` | No |  |
| `imessage_number` | `string | null` | No | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` | Yes |  |
| `link_pattern` | `string` | No | The link_pattern answer |
| `project_id` | `string` | Yes | Project slug or ID. |
| `provider` | `string` | No | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | No | Repository slug, ID or owner/name. |
| `request_number` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PullRequestSettingDetectComment().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PullRequestSettingDetectCommentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecorderEntity

```ts
const recorder = client.Recorder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Recorder().load({ organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecorderEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegistryEntity

```ts
const registry = client.Registry()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `namespace` | `/api/v1/registry/namespace` | `client.Registry().load({ $action: 'namespace', ... })` |

An action returns that action's OWN response, which is not necessarily a
Registry record — check the API definition for its shape.

```ts
const result = await client.Registry().load({
  $action: 'namespace',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegistryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegistryV2Entity

```ts
const registry_v2 = client.RegistryV2()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `authorize` | `/api/v1/registry/v2/authorize` | `client.RegistryV2().create({ $action: 'authorize', ... })` |

An action returns that action's OWN response, which is not necessarily a
RegistryV2 record — check the API definition for its shape.

```ts
const result = await client.RegistryV2().create({
  $action: 'authorize',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegistryV2Entity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RelayAgentLocalThreadEntity

```ts
const relay_agent_local_thread = client.RelayAgentLocalThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.RelayAgentLocalThread().remove({ id: 'relay_agent_local_thread_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RelayAgentLocalThreadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportReplayEntity

```ts
const report_replay = client.ReportReplay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes |  |
| `generated_at` | `string` | Yes |  |
| `id` | `string` | No |  |
| `recording` | `Record<string, any>` | Yes |  |
| `replay_steps` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ReportReplay().load({ id: 'report_replay_id', exploration_id: 'exploration_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportReplayEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportScenarioEntity

```ts
const report_scenario = client.ReportScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `environment_name` | `string` | Yes |  |
| `goal` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mode` | `string` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `project_id` | `string | null` | Yes |  |
| `related_explorations` | `any[]` | Yes |  |
| `report` | `Record<string, any>` | Yes |  |
| `saves_scenarios` | `boolean` | Yes |  |
| `scenario_generation` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ReportScenario().create({
  exploration_id: 'example_exploration_id',
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportScenarioEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RunScenarioRunEntity

```ts
const run_scenario_run = client.RunScenarioRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `live_frame` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame` | `client.RunScenarioRun().load({ $action: 'live_frame', ... })` |
| `scenario_edit` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | `client.RunScenarioRun().load({ $action: 'scenario_edit', ... })` |
| `scenario_edit` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit` | `client.RunScenarioRun().update({ $action: 'scenario_edit', ... })` |

An action returns that action's OWN response, which is not necessarily a
RunScenarioRun record — check the API definition for its shape.

```ts
const result = await client.RunScenarioRun().load({
  $action: 'live_frame',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RunScenarioRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RunScheduleOptionEntity

```ts
const run_schedule_option = client.RunScheduleOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.RunScheduleOption().list({ organization_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RunScheduleOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RunSearchEntity

```ts
const run_search = client.RunSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `runs` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.RunSearch().load({ organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RunSearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RunUpdateEntity

```ts
const run_update = client.RunUpdate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_sha` | `string` | Yes |  |
| `can_verify` | `boolean` | Yes |  |
| `comment_url` | `string | null` | Yes |  |
| `draft` | `boolean` | Yes |  |
| `github_repository` | `string | null` | Yes | GitHub owner/repository associated with this pull request. |
| `github_url` | `string | null` | Yes |  |
| `head_sha` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `latest_created_at` | `string | null` | Yes |  |
| `latest_current` | `boolean` | Yes |  |
| `latest_head_sha` | `string | null` | Yes |  |
| `latest_reason` | `string | null` | Yes |  |
| `latest_run_id` | `string | null` | Yes |  |
| `latest_state` | `string | null` | Yes |  |
| `number` | `number` | Yes |  |
| `project_id` | `string | null` | Yes |  |
| `project_slug` | `string | null` | Yes |  |
| `provider` | `string` | Yes |  |
| `repository_id` | `string` | Yes |  |
| `request_label` | `string` | Yes |  |
| `source_branch` | `string | null` | Yes |  |
| `source_repository` | `string | null` | Yes |  |
| `source_url` | `string | null` | Yes |  |
| `state` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `web_path` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.RunUpdate().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RunUpdateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScenarioRevisionEntity

```ts
const scenario_revision = client.ScenarioRevision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `batch` | `string` | Yes | Shared by every revision one request or job saved. |
| `created_at` | `string` | Yes |  |
| `definition` | `Record<string, any>` | Yes | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` | Yes |  |
| `source` | `string` | Yes | The client the save came through. |
| `user` | `any` | Yes | Null when a system job saved the Scenario. |
| `version` | `number` | Yes | The Scenario's lock_version after this save. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ScenarioRevision().list({ organization_id: "example", project_id: "example", scenario_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScenarioRevisionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScenarioRunLessonEntity

```ts
const scenario_run_lesson = client.ScenarioRunLesson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finding` | `string` | Yes |  |
| `title` | `string` | No | Defaults to the Scenario's name. |
| `workaround` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ScenarioRunLesson().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  run_id: 'example_run_id',
  scenario_run_id: 'example_scenario_run_id',
  finding: 'example_finding',
  workaround: 'example_workaround',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScenarioRunLessonEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScenarioRunScenarioEditEntity

```ts
const scenario_run_scenario_edit = client.ScenarioRunScenarioEdit()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `run` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run` | `client.ScenarioRunScenarioEdit().create({ $action: 'run', ... })` |
| `suggest` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest` | `client.ScenarioRunScenarioEdit().create({ $action: 'suggest', ... })` |
| `validate` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate` | `client.ScenarioRunScenarioEdit().create({ $action: 'validate', ... })` |

An action returns that action's OWN response, which is not necessarily a
ScenarioRunScenarioEdit record — check the API definition for its shape.

```ts
const result = await client.ScenarioRunScenarioEdit().create({
  $action: 'run',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScenarioRunScenarioEditEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ServiceEndpointEntity

```ts
const service_endpoint = client.ServiceEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ServiceEndpoint().create({
  app_id: 'example_app_id',
  service_id: 'example_service_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ServiceEndpoint().list({ app_id: "example", service_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ServiceEndpoint().load({ id: 'service_endpoint_id', app_id: 'app_id', service_id: 'service_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.ServiceEndpoint().patch({
  id: 'service_endpoint_id',
  app_id: 'app_id',
  service_id: 'service_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ServiceEndpoint().remove({ id: 'service_endpoint_id', app_id: 'app_id', service_id: 'service_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ServiceEndpoint().update({
  id: 'service_endpoint_id',
  app_id: 'app_id',
  service_id: 'service_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ServiceEndpointEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SitePreviewEntity

```ts
const site_preview = client.SitePreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon_data_url` | `string | null` | Yes | The site's icon as a data: URL, up to 256 KB |
| `title` | `string | null` | Yes |  |
| `url` | `string` | Yes | The address as it will be saved |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SitePreview().load({ organization_id: 'organization_id', url: 'url' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SitePreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SlackChannelEntity

```ts
const slack_channel = client.SlackChannel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `is_member` | `boolean` | Yes |  |
| `is_private` | `boolean` | Yes |  |
| `is_slack_connect` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `published` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SlackChannel().list({ agent_id: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SlackChannelEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SparkAgentLocalThreadEntity

```ts
const spark_agent_local_thread = client.SparkAgentLocalThread()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `archived` | `boolean` | Yes | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `can_archive` | `boolean` | Yes | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `can_disconnect_relay` | `boolean` | No |  |
| `can_end` | `boolean` | Yes |  |
| `can_interrupt` | `boolean` | Yes |  |
| `can_send` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `delivery` | `Record<string, any>` | Yes | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` | Yes |  |
| `device_name` | `string` | Yes |  |
| `diagnostic_code` | `string` | No | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `full_title` | `string` | Yes | The native name or first prompt in full, for a tooltip. |
| `id` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `last_activity_at` | `string | null` | Yes |  |
| `native_thread_id` | `string` | Yes |  |
| `parent_conversation_id` | `string | null` | Yes |  |
| `provider` | `string` | Yes |  |
| `references` | `Record<string, any>` | Yes |  |
| `relay_disconnected_at` | `string | null` | No |  |
| `relay_participant` | `Record<string, any>` | Yes |  |
| `result` | `any` | Yes |  |
| `result_expired` | `boolean` | Yes | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `Record<string, any> | boolean` | No |  |
| `section` | `string` | Yes | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` | Yes |  |
| `status` | `string | null` | Yes | What the native thread is doing. |
| `task_configured` | `boolean` | Yes |  |
| `thread_id` | `string` | Yes |  |
| `title` | `string` | Yes | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `delivery_policy` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | `client.SparkAgentLocalThread().load({ $action: 'delivery_policy', ... })` |
| `task` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task` | `client.SparkAgentLocalThread().load({ $action: 'task', ... })` |
| `delivery_policy` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy` | `client.SparkAgentLocalThread().update({ $action: 'delivery_policy', ... })` |

An action returns that action's OWN response, which is not necessarily a
SparkAgentLocalThread record — check the API definition for its shape.

```ts
const result = await client.SparkAgentLocalThread().load({
  $action: 'delivery_policy',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.SparkAgentLocalThread().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  device_id: 'example_device_id',
  key: 'example_key',
  provider: 'example_provider',
  thread_id: 'example_thread_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SparkAgentLocalThread().load({ id: 'spark_agent_local_thread_id', agent_id: 'agent_id', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SparkAgentLocalThreadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StaticSiteEntity

```ts
const static_site = client.StaticSite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment_id` | `string | null` | Yes |  |
| `cdn_hostname` | `string` | Yes |  |
| `cdn_url` | `string` | Yes |  |
| `cname_target` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `default_url` | `string` | Yes |  |
| `description` | `string | null` | Yes |  |
| `error_document` | `string | null` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `hosted_app_id` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `index_document` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `organization_id` | `string` | Yes |  |
| `provisioned` | `boolean` | Yes |  |
| `provisioned_at` | `string | null` | Yes |  |
| `region` | `string | null` | Yes |  |
| `replication_regions` | `any[]` | Yes |  |
| `repository_id` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `provision` | `/api/v1/static_sites/{id}/provision` | `client.StaticSite().create({ $action: 'provision', ... })` |

An action returns that action's OWN response, which is not necessarily a
StaticSite record — check the API definition for its shape.

```ts
const result = await client.StaticSite().create({
  $action: 'provision',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.StaticSite().create({
  organization_id: 'example_organization_id',
  name: 'example_name',
  slug: 'example_slug',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.StaticSite().list({ organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.StaticSite().load({ id: 'static_site_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.StaticSite().patch({
  id: 'static_site_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.StaticSite().remove({ id: 'static_site_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.StaticSite().update({
  id: 'static_site_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StaticSiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StaticSiteDeploymentEntity

```ts
const static_site_deployment = client.StaticSiteDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activated_at` | `string | null` | Yes |  |
| `activated_at_label` | `string | null` | Yes |  |
| `commit_sha` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `created_at_label` | `string | null` | Yes |  |
| `creator_user_id` | `string | null` | Yes |  |
| `deploy_slug` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `file_count` | `number` | Yes |  |
| `file_count_label` | `string` | Yes |  |
| `finished_at` | `string | null` | Yes |  |
| `finished_at_label` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `is_active` | `boolean` | Yes |  |
| `source_ref` | `string | null` | Yes |  |
| `started_at` | `string | null` | Yes |  |
| `started_at_label` | `string | null` | Yes |  |
| `static_site_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `total_bytes` | `number` | Yes |  |
| `total_bytes_label` | `string` | Yes |  |
| `trigger_kind` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `updated_at_label` | `string | null` | Yes |  |
| `uploaded_at` | `string | null` | Yes |  |
| `uploaded_at_label` | `string | null` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `activate` | `/api/v1/static_sites/{static_site_id}/deployments/{id}/activate` | `client.StaticSiteDeployment().create({ $action: 'activate', ... })` |
| `cancel` | `/api/v1/static_sites/{static_site_id}/deployments/{id}/cancel` | `client.StaticSiteDeployment().create({ $action: 'cancel', ... })` |
| `finalize` | `/api/v1/static_sites/{static_site_id}/deployments/{id}/finalize` | `client.StaticSiteDeployment().create({ $action: 'finalize', ... })` |

An action returns that action's OWN response, which is not necessarily a
StaticSiteDeployment record — check the API definition for its shape.

```ts
const result = await client.StaticSiteDeployment().create({
  $action: 'activate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.StaticSiteDeployment().create({
  static_site_id: 'example_static_site_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.StaticSiteDeployment().list({ static_site_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.StaticSiteDeployment().load({ id: 'static_site_deployment_id', static_site_id: 'static_site_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StaticSiteDeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StaticSiteDomainEntity

```ts
const static_site_domain = client.StaticSiteDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `hosted_app_id` | `string | null` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string | null` | Yes |  |
| `record_name` | `string | null` | Yes |  |
| `record_type` | `string | null` | Yes |  |
| `record_value` | `string | null` | Yes |  |
| `redirect_to` | `string | null` | Yes |  |
| `static_site_id` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `provision` | `/api/v1/static_sites/{static_site_id}/domains/{id}/provision` | `client.StaticSiteDomain().create({ $action: 'provision', ... })` |

An action returns that action's OWN response, which is not necessarily a
StaticSiteDomain record — check the API definition for its shape.

```ts
const result = await client.StaticSiteDomain().create({
  $action: 'provision',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.StaticSiteDomain().create({
  static_site_id: 'example_static_site_id',
  hostname: 'example_hostname',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.StaticSiteDomain().list({ static_site_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.StaticSiteDomain().load({ id: 'static_site_domain_id', static_site_id: 'static_site_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.StaticSiteDomain().patch({
  id: 'static_site_domain_id',
  static_site_id: 'static_site_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.StaticSiteDomain().remove({ id: 'static_site_domain_id', static_site_id: 'static_site_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.StaticSiteDomain().update({
  id: 'static_site_domain_id',
  static_site_id: 'static_site_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StaticSiteDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubscriptionModelEntity

```ts
const subscription_model = client.SubscriptionModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `default_reasoning` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `reasoning` | `any[]` | No | Effort levels this plan model accepts. |
| `speeds` | `any[]` | No | Speed modes advertised by this connected account and model. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SubscriptionModel().list({ agent_id: "example", organization_id: "example", profile_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubscriptionModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThreadPreviewEntity

```ts
const thread_preview = client.ThreadPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string | null` | Yes |  |
| `port` | `number` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ThreadPreview().create({
  agent_id: 'example_agent_id',
  organization_id: 'example_organization_id',
  thread_id: 'example_thread_id',
  port: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThreadPreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerificationProjectCredentialEntity

```ts
const verification_project_credential = client.VerificationProjectCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_authentication` | `Record<string, any> | null` | No |  |
| `browser_session` | `string` | No | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `string | null` | Yes | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `boolean` | No | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | No | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `boolean` | No | Select the Composal-managed Google test account when available. |
| `configured` | `boolean` | Yes |  |
| `cookies` | `string` | No | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `Record<string, any>` | Yes |  |
| `description` | `string | null` | Yes | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `any[]` | Yes | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `boolean` | Yes | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` | Yes |  |
| `identity_provider` | `Record<string, any> | null` | Yes | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `string | null` | Yes | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` | Yes |  |
| `login_url` | `string` | Yes | Optional sign-in path or URL. |
| `managed` | `boolean` | Yes |  |
| `mfa_enabled` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |
| `oidc` | `Record<string, any>` | No | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | No | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | No | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` | Yes |  |
| `provider_guidance` | `string` | Yes |  |
| `remove_browser_authentication` | `boolean` | No |  |
| `remove_totp` | `boolean` | No |  |
| `sign_in_verified` | `boolean` | Yes | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `string | null` | Yes |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `disable` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable` | `client.VerificationProjectCredential().create({ $action: 'disable', ... })` |
| `inbox` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/inbox` | `client.VerificationProjectCredential().load({ $action: 'inbox', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerificationProjectCredential record — check the API definition for its shape.

```ts
const result = await client.VerificationProjectCredential().create({
  $action: 'disable',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerificationProjectCredential().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  login_method: 'example_login_method',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VerificationProjectCredential().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VerificationProjectCredential().load({ id: 'verification_project_credential_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.VerificationProjectCredential().patch({
  id: 'verification_project_credential_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.VerificationProjectCredential().remove({ id: 'verification_project_credential_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.VerificationProjectCredential().update({
  id: 'verification_project_credential_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerificationProjectCredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerificationProjectPersonaEntity

```ts
const verification_project_persona = client.VerificationProjectPersona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_mode` | `string` | Yes |  |
| `archived_at` | `string | null` | Yes |  |
| `capabilities` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `credential_id` | `string | null` | Yes | The credential this persona signs in with. |
| `goals` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `project_id` | `string` | Yes |  |
| `role` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive` | `client.VerificationProjectPersona().create({ $action: 'archive', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerificationProjectPersona record — check the API definition for its shape.

```ts
const result = await client.VerificationProjectPersona().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerificationProjectPersona().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
  role: 'example_role',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VerificationProjectPersona().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VerificationProjectPersona().load({ id: 'verification_project_persona_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.VerificationProjectPersona().patch({
  id: 'verification_project_persona_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.VerificationProjectPersona().remove({ id: 'verification_project_persona_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.VerificationProjectPersona().update({
  id: 'verification_project_persona_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerificationProjectPersonaEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerificationProjectRunEntity

```ts
const verification_project_run = client.VerificationProjectRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approved_at` | `string | null` | Yes |  |
| `approved_digest` | `string | null` | Yes |  |
| `archived_at` | `string | null` | Yes |  |
| `available_tests` | `any[]` | Yes |  |
| `can_archive` | `boolean` | Yes |  |
| `can_restore` | `boolean` | Yes |  |
| `can_start_another_run` | `boolean` | Yes |  |
| `cleanup_state` | `string` | Yes |  |
| `concurrency` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `creator_name` | `string | null` | Yes |  |
| `definition_mode` | `string` | Yes |  |
| `environment_id` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `lock_version` | `number` | Yes |  |
| `max_seconds` | `number` | Yes |  |
| `outcome` | `string | null` | Yes |  |
| `permissions` | `Record<string, any>` | Yes |  |
| `plan_digest` | `string | null` | Yes |  |
| `preparation_error_code` | `string | null` | Yes |  |
| `progress` | `Record<string, any>` | Yes |  |
| `project` | `Record<string, any>` | Yes |  |
| `project_id` | `string` | Yes |  |
| `pull_request` | `any` | Yes |  |
| `queued_at` | `string | null` | Yes |  |
| `run` | `Record<string, any>` | Yes |  |
| `run_plan_id` | `string | null` | No |  |
| `scenario_runs` | `any[]` | Yes |  |
| `source_run_id` | `string | null` | Yes |  |
| `source_versions` | `any[] | null` | Yes |  |
| `start_when_prepared` | `boolean` | Yes | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` | Yes |  |
| `target_snapshot` | `Record<string, any>` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verifier_preferences_snapshot` | `Record<string, any>` | Yes | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Yes | Path of the run's page in the web app, where it can be watched live. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/archive` | `client.VerificationProjectRun().create({ $action: 'archive', ... })` |
| `cancel` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/cancel` | `client.VerificationProjectRun().create({ $action: 'cancel', ... })` |
| `launch` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/launch` | `client.VerificationProjectRun().create({ $action: 'launch', ... })` |
| `prepare` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/prepare` | `client.VerificationProjectRun().create({ $action: 'prepare', ... })` |
| `rerun` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/rerun` | `client.VerificationProjectRun().create({ $action: 'rerun', ... })` |
| `restore` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/restore` | `client.VerificationProjectRun().create({ $action: 'restore', ... })` |
| `card` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/card` | `client.VerificationProjectRun().load({ $action: 'card', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerificationProjectRun record — check the API definition for its shape.

```ts
const result = await client.VerificationProjectRun().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VerificationProjectRun().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VerificationProjectRun().load({ id: 'verification_project_run_id', organization_id: 'organization_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerificationProjectRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerificationProjectScenarioEntity

```ts
const verification_project_scenario = client.VerificationProjectScenario()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actors` | `Record<string, any>` | No |  |
| `allowed_actions` | `string` | Yes |  |
| `archived_at` | `string | null` | Yes |  |
| `cleanup` | `any[]` | No | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` | Yes |  |
| `dependencies` | `any[]` | Yes |  |
| `fixtures` | `any[]` | No | Files upload steps choose, ordered by name. |
| `health` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes |  |
| `identity_probe` | `any` | No |  |
| `if` | `string | null` | No | A documented subset of Actions expressions. |
| `labels` | `any[]` | Yes | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | Yes | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `on` | `any` | No | Explicit Actions-style automatic execution rules. |
| `outcomes` | `any[]` | Yes |  |
| `persona_id` | `string` | Yes |  |
| `primary_actor` | `string | null` | No |  |
| `project_id` | `string` | Yes |  |
| `selectable_for_run` | `boolean` | Yes |  |
| `starting_conditions` | `string | null` | Yes |  |
| `steps` | `any[]` | Yes |  |
| `triggers` | `any[]` | Yes | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` | Yes |  |
| `version` | `number` | Yes |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `archive` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/archive` | `client.VerificationProjectScenario().create({ $action: 'archive', ... })` |
| `duplicate` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/duplicate` | `client.VerificationProjectScenario().create({ $action: 'duplicate', ... })` |
| `from_exploration` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/from_exploration` | `client.VerificationProjectScenario().create({ $action: 'from_exploration', ... })` |
| `import` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/import` | `client.VerificationProjectScenario().create({ $action: 'import', ... })` |
| `export` | `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/export` | `client.VerificationProjectScenario().load({ $action: 'export', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerificationProjectScenario record — check the API definition for its shape.

```ts
const result = await client.VerificationProjectScenario().create({
  $action: 'archive',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerificationProjectScenario().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VerificationProjectScenario().list({ organization_id: "example", project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VerificationProjectScenario().load({ id: 'verification_project_scenario_id', organization_id: 'organization_id', project_id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.VerificationProjectScenario().patch({
  id: 'verification_project_scenario_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.VerificationProjectScenario().update({
  id: 'verification_project_scenario_id',
  organization_id: 'organization_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerificationProjectScenarioEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerifyAppDomainEntity

```ts
const verify_app_domain = client.VerifyAppDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerifyAppDomain().create({
  app_id: 'example_app_id',
  id: 'example_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerifyAppDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerifyBrowserSessionEntity

```ts
const verify_browser_session = client.VerifyBrowserSession()
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
| `viewer_url` | `string | null` | Yes | Owner-only bearer link. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `save` | `/api/v1/organizations/{organization_id}/verify/browser_sessions/{id}/save` | `client.VerifyBrowserSession().create({ $action: 'save', ... })` |

An action returns that action's OWN response, which is not necessarily a
VerifyBrowserSession record — check the API definition for its shape.

```ts
const result = await client.VerifyBrowserSession().create({
  $action: 'save',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerifyBrowserSession().create({
  organization_id: 'example_organization_id',
  project_id: 'example_project_id',
  url: 'example_url',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VerifyBrowserSession().load({ id: 'verify_browser_session_id', organization_id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.VerifyBrowserSession().remove({ id: 'verify_browser_session_id', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerifyBrowserSessionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerifyStaticSiteDomainEntity

```ts
const verify_static_site_domain = client.VerifyStaticSiteDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_environment_id` | `string | null` | Yes |  |
| `app_service_id` | `string | null` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dns_mode` | `string` | Yes |  |
| `dns_status` | `string` | Yes |  |
| `failure_message` | `string | null` | Yes |  |
| `hosted_app_id` | `string | null` | Yes |  |
| `hostname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes |  |
| `last_checked_at` | `string | null` | Yes |  |
| `record_name` | `string | null` | Yes |  |
| `record_type` | `string | null` | Yes |  |
| `record_value` | `string | null` | Yes |  |
| `redirect_to` | `string | null` | Yes |  |
| `static_site_id` | `string | null` | Yes |  |
| `target_kind` | `string` | Yes |  |
| `tls_status` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `verification_status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.VerifyStaticSiteDomain().create({
  id: 'example_id',
  static_site_id: 'example_static_site_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerifyStaticSiteDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VersionLogEntity

```ts
const version_log = client.VersionLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_image` | `string` | Yes |  |
| `failure_phase` | `string | null` | Yes |  |
| `id` | `string` | Yes |  |
| `image_digest` | `string | null` | Yes |  |
| `image_reference` | `string | null` | Yes |  |
| `installer_version` | `string` | Yes |  |
| `ready_at` | `string | null` | Yes |  |
| `receipt` | `Record<string, any> | null` | Yes |  |
| `safe_error` | `string | null` | Yes |  |
| `started_at` | `string | null` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VersionLog().list({ binary_id: "example", organization_id: "example", version_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VersionLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebBotAuthEntity

```ts
const web_bot_auth = client.WebBotAuth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `expires_at` | `string` | Yes |  |
| `origin` | `string` | Yes |  |
| `signatures` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.WebBotAuth().create({
  origin: 'example_origin',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebBotAuthEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowRunStepEntity

```ts
const workflow_run_step = client.WorkflowRunStep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `output` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/steps/{step_id}/output` | `client.WorkflowRunStep().load({ $action: 'output', ... })` |

An action returns that action's OWN response, which is not necessarily a
WorkflowRunStep record — check the API definition for its shape.

```ts
const result = await client.WorkflowRunStep().load({
  $action: 'output',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowRunStepEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowRunStopNoticeEntity

```ts
const workflow_run_stop_notice = client.WorkflowRunStopNotice()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `dismissal` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/stop_notice/dismissal` | `client.WorkflowRunStopNotice().create({ $action: 'dismissal', ... })` |

An action returns that action's OWN response, which is not necessarily a
WorkflowRunStopNotice record — check the API definition for its shape.

```ts
const result = await client.WorkflowRunStopNotice().create({
  $action: 'dismissal',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowRunStopNoticeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowTriggerSkippedEntity

```ts
const workflow_trigger_skipped = client.WorkflowTriggerSkipped()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `run` | `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run` | `client.WorkflowTriggerSkipped().create({ $action: 'run', ... })` |

An action returns that action's OWN response, which is not necessarily a
WorkflowTriggerSkipped record — check the API definition for its shape.

```ts
const result = await client.WorkflowTriggerSkipped().create({
  $action: 'run',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowTriggerSkippedEntity` instance with the same client and
options.

#### `client()`

Return the parent `ComposalSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new ComposalSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    secrets: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
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

