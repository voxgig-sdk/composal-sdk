# Composal SDK — Agent Guide

This is a **generated** multi-language SDK project. The client libraries in
each language directory are produced by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen)
from an API model; the generator, model, templates, and components all live in
`.sdk/`. Treat the language directories as build output — change the model,
a template, or a component and regenerate.

There are companion guides deeper in the tree: one per language
(`<lang>/AGENTS.md`) and one per feature
(`<lang>/src/feature/<name>/AGENTS.md`).

## Project map

**Targets** (9):

| Target | Directory | Build guide |
| --- | --- | --- |
| `go` | `go/` | [`go/AGENTS.md`](./go/AGENTS.md) |
| `go-cli` | `go-cli/` — A CLI surface, not an SDK client library. | [`go-cli/AGENTS.md`](./go-cli/AGENTS.md) |
| `go-mcp` | `go-mcp/` — An MCP server surface for AI agents, not an SDK client library. | [`go-mcp/AGENTS.md`](./go-mcp/AGENTS.md) |
| `lua` | `lua/` | [`lua/AGENTS.md`](./lua/AGENTS.md) |
| `php` | `php/` | [`php/AGENTS.md`](./php/AGENTS.md) |
| `postman` | `postman/` | [`postman/AGENTS.md`](./postman/AGENTS.md) |
| `py` | `py/` | [`py/AGENTS.md`](./py/AGENTS.md) |
| `rb` | `rb/` | [`rb/AGENTS.md`](./rb/AGENTS.md) |
| `ts` | `ts/` | [`ts/AGENTS.md`](./ts/AGENTS.md) |

**Features** (9): `debug`, `idempotency`, `metrics`, `paging`, `ratelimit`, `retry`, `secrets`, `test`, `timeout`.

Each feature is generated into every SDK target — as a directory
`<lang>/src/feature/<name>/` (ts/js) or a flat file in the `<lang>/feature/`
package (other languages). Each target's guide documents its features.

**Entities** (551): `A2aWellKnown`, `AdminOrg`, `Agent`, `AgentApp`, `AgentAppInstall`, `AgentAttachment`, `AgentAutomation`, `AgentAvatar`, `AgentCommand`, `AgentComputer`, `AgentConnection`, `AgentConnectionDelegation`, `AgentConnectionGrant`, `AgentConnectionResource`, `AgentConnectionSafetyControl`, `AgentConnectionTriggerSubscription`, `AgentContextCheckpoint`, `AgentControlFlow`, `AgentCoordination`, `AgentEmail`, `AgentEvent`, `AgentFile`, `AgentInput`, `AgentIntegration`, `AgentIntegrationAccount`, `AgentIntegrationCallback`, `AgentInteraction`, `AgentLibrary`, `AgentManager`, `AgentManagerChoice`, `AgentMarketplace`, `AgentMarketplaceShared`, `AgentMissionControl`, `AgentOperation`, `AgentProvisioning`, `AgentPullRequest`, `AgentQuestion`, `AgentRelayFileGrant`, `AgentRelayFileGrantAccount`, `AgentRepository`, `AgentResource`, `AgentRoder`, `AgentRoutine`, `AgentRun`, `AgentRuntime`, `AgentSession`, `AgentSessionCheckpoint`, `AgentSessionRoderHandoff`, `AgentSetting`, `AgentSharing`, `AgentSite`, `AgentSkill`, `AgentSlack`, `AgentSubagent`, `AgentSubscription`, `AgentSwarm`, `AgentTeammate`, `AgentTerminal`, `AgentThread`, `AgentTool`, `AgentUsage`, `AgentVerifyProject`, `AgentWait`, `AgentWebPreview`, `AgentWebhook`, `AgentWork`, `AgentWorkflow`, `AgentWorkflowProposal`, `AgentWorkflowRun`, `AgentWorkflowTrigger`, `AgentWorkspace`, `AgentWritePermission`, `Agreement`, `AgreementAccessRequest`, `AlertRuleEvent`, `AllocationLog`, `App`, `AppAccess`, `AppAccessJwk`, `AppCdn`, `AppConfigVariable`, `AppDataResource`, `AppDeploy`, `AppDeployment`, `AppDeploymentOperation`, `AppDeploymentRollback`, `AppEnvironment`, `AppLocation`, `AppMetric`, `AppPreview`, `AppPreviewProfile`, `AppRun`, `AppSecret`, `AppService`, `AppServiceBinding`, `AppServicePlacement`, `AppStorageResource`, `Artefact`, `ArtefactCommentThread`, `ArtefactRevision`, `ArtefactViewToken`, `Artifact`, `ArtifactCacheNamespace`, `ArtifactImageRepository`, `ArtifactPackageMirror`, `ArtifactRetentionPolicy`, `AttachmentPart`, `AuditEvent`, `Auth`, `AuthCli`, `AuthGithub`, `AuthGoogle`, `AuthOpenai`, `AuthPasswordReset`, `AuthRegistrationOption`, `AutomationEvent`, `AutomationRun`, `BackendRunnerPool`, `Bazel`, `BazelActionResult`, `BazelBackend`, `BazelBlob`, `BazelExecution`, `BazelFindMissingBlob`, `Billing`, `BillingAddon`, `BillingCheckoutSession`, `BillingInvoice`, `BillingPackage`, `BillingPortalSession`, `BillingPrepaidPeriod`, `BillingPrepaidPurchase`, `BillingTokenTopUp`, `BillingUsage`, `Binary`, `BinaryVersion`, `BookmarkProtectionRefreshGithubRequiredCheck`, `BrowserEgressCandidate`, `BrowserSession`, `BrowserSessionConnection`, `BrowserSessionControl`, `BrowserSessionEvent`, `BrowserSessionMedia`, `BrowserSessionRecording`, `BrowserSessionScreenshot`, `BrowserSessionTask`, `CacheNamespaceEntry`, `CatalogSelector`, `CdnDeployment`, `CdnHostname`, `CdnSpace`, `CdnSpaceObject`, `Change`, `ChangeAsset`, `ChangeComment`, `ChangeFileReviewCheckpoint`, `ChangeGitBranchSubmission`, `ChangeGitCommitIdentity`, `ChangeGitPublication`, `ChangeGroupMember`, `ChangeLabel`, `ChangeLandingHold`, `ChangeLandingRequest`, `ChangeRequestChange`, `ChangeReviewer`, `ChangeTranscript`, `ChangeTranscriptSummary`, `CheckpointPrepareChunk`, `CiNode`, `CiPipeline`, `CiPipelineRun`, `CiRunnerPool`, `CiStatus`, `CliEvent`, `CliRelease`, `CloudWorkspaceBackupObject`, `CodeRuleEvaluation`, `ComSiteAccess`, `ComSiteAccessSession`, `CommentThreadComment`, `CommitDiff`, `ConnectionRequest`, `ConnectionSource`, `ContactSubmission`, `ControlComputer`, `ControlComputerControlOperation`, `CoordinationWait`, `CredentialSignInCheck`, `DataResourceRotateCredential`, `DeepScan`, `DeepScanFinding`, `DeepScanFlow`, `DeepScanMappedFlow`, `DeepScanOption`, `DemoShare`, `DemoShareSegment`, `Deployment`, `DeploymentDashboardNomad`, `DeploymentDetail`, `DeploymentFile`, `DeploymentLog`, `DeploymentMetric`, `DeploymentPreview`, `DeploymentSetting`, `DesktopLocalAgentModel`, `DesktopLocalAgentResponse`, `Device`, `DeviceBrowserOperation`, `DeviceControlMessage`, `DeviceControlOperation`, `DeviceEnterpriseRelay`, `DeviceFolderListing`, `DeviceGrant`, `DeviceInvocation`, `DeviceLocalEvent`, `DevicePairing`, `DeviceProject`, `DeviceScheduledCheckIn`, `DockerBuilder`, `DockerBuilderSession`, `DockerBuilderSetting`, `DomainDnsIntegration`, `DomainPathRule`, `Dream`, `Edge`, `EmailVerification`, `Environment`, `EnvironmentDiscoveryRun`, `EnvironmentExploration`, `EnvironmentFirstRun`, `EnvironmentRevision`, `EnvironmentSecretBinding`, `EnvironmentTestAccount`, `Evidence`, `ExecutionDesiredState`, `ExecutionReconcilerTick`, `ExecutionRelease`, `ExecutionRuntimeInstance`, `Exploration`, `ExplorationMessage`, `ExplorationReport`, `ExplorationScenario`, `Finding`, `Gh`, `GitImport`, `Github`, `GithubApp`, `GithubAppImportableRepository`, `GithubAppInstallation`, `GithubAppInstallationAuthorization`, `GithubAppUserAuthorization`, `GithubCiRepository`, `GithubCiRepositoryCompatibilityReport`, `GithubConnection`, `GithubIntegration`, `GithubOnboarding`, `GithubOnboardingBranch`, `GithubOnboardingImport`, `GithubOnboardingImportBatch`, `GithubOnboardingImportItem`, `GithubPullRequest`, `GithubRunnerAdmission`, `GithubRunnerCache`, `GithubRunnerEgress`, `GithubRunnerHistory`, `GithubRunnerImage`, `GithubRunnerPool`, `GithubRunnerSetup`, `Gitlab`, `GitlabConnection`, `GitlabImport`, `GitlabOauth`, `GrantAllAgent`, `HostingAppDomain`, `IdentityOrganization`, `ImageRepository`, `ImageRepositoryTag`, `ImportBranchPolicy`, `Integration`, `InteractionResponse`, `Invitation`, `InvocationControl`, `JobLogChunk`, `JobStep`, `JobWorkspace`, `JourneyVariantReplay`, `Knowledge`, `Known`, `Label`, `LeaseArtifact`, `LeaseCache`, `LeaseLogChunk`, `LeaseReconciliation`, `LeaseStep`, `LeaseVerifyDiagnostic`, `LeaseVerifySecret`, `LeaseWorkspace`, `LocalAgentDecision`, `LocalAgentResponse`, `LocalThreadDelivery`, `LocalThreadOperation`, `Location`, `LogStreamChunk`, `LogoImage`, `MarketingSetting`, `McpOauth`, `Me`, `MeEmail`, `MeOnboarding`, `MediaFile`, `Member`, `Memory`, `MergeQueueEntry`, `MergeRequest`, `MergeResolution`, `MessagingConversationMessage`, `MessagingConversationUpload`, `MetricQuery`, `MetronomeWebhook`, `ModelSubscriptionAccount`, `ModelSubscriptionAccountConnection`, `NetworkConnection`, `NetworkingSpace`, `Node`, `NodeCertificate`, `NodeLease`, `NomadAllocation`, `NomadLog`, `Now`, `ObservabilityClickhouseCluster`, `ObservabilityQuickwitCluster`, `ObservabilitySpace`, `Openapi`, `OrgInvitation`, `Organization`, `OrganizationApp`, `OrganizationControl`, `OrganizationDevice`, `OrganizationIdentityCertificate`, `OrganizationInteraction`, `OrganizationInvitation`, `OrganizationMessageFile`, `OrganizationOidcTrust`, `OrganizationRunEvent`, `OrganizationRunOutcome`, `OrganizationRunUsage`, `OrganizationSandbox`, `OrganizationSecret`, `OrganizationServiceAccount`, `OrganizationSetting`, `OrganizationSite`, `OrganizationSubscription`, `OrganizationTool`, `OrganizationWorkloadIdentity`, `OtelIngest`, `Page`, `PageAgent`, `PageArtefact`, `PageCiPipelineRun`, `PageProjectRun`, `PageRepoVcCommit`, `PagesBilling`, `PagesGithubOnboarding`, `PagesMember`, `PagesProjectCredential`, `PagesProjectPersona`, `PagesProjectRun`, `PagesProjectScenario`, `PagesRegistry`, `PagesSession`, `Pairing`, `PairingEvent`, `ParallelV1`, `PatchsetDiff`, `PersonalAccessToken`, `PreviewOperation`, `PreviewProfileSecretBinding`, `PreviewSecret`, `PreviewSharingApproval`, `ProactiveAgentWaitlistEntry`, `Product`, `ProductMapIdentityDecision`, `ProductMapJourney`, `ProductMapJourneyReplay`, `ProductMapObservation`, `ProductMapQuestion`, `ProductMapState`, `Project`, `ProjectAndroidApk`, `ProjectCodeMap`, `ProjectEnvironment`, `ProjectFinding`, `ProjectFixture`, `ProjectIosApp`, `ProjectMessagingConversation`, `ProjectOverviewMetric`, `ProjectOverviewPullRequest`, `ProjectProductMap`, `ProjectRecording`, `ProjectRunPlan`, `ProjectRunSchedule`, `ProjectScenarioOption`, `ProjectScenarioRow`, `ProjectSetting`, `PullRequest`, `PullRequestAction`, `PullRequestMagicMerge`, `PullRequestSetting`, `PullRequestSettingAddRepository`, `PullRequestSettingDetectComment`, `PullRequestTranscript`, `PullZone`, `Recorder`, `Registry`, `RegistryV2`, `RelayAgentConnection`, `RelayAgentLocalThread`, `RelaySignal`, `ReleaseRollout`, `Repo`, `RepoAccessToken`, `RepoAction`, `RepoAgentCheckpoint`, `RepoAgentSession`, `RepoBookmarkProtection`, `RepoBookmarkProtectionEvent`, `RepoCloudWorkspaceBackup`, `RepoCodeRule`, `RepoSetting`, `RepoStat`, `RepoVc`, `RepoVcCommit`, `ReportReplay`, `ReportScenario`, `RepositoryAccess`, `RepositoryAccessResolve`, `RepositoryEvent`, `RepositoryImport`, `RepositoryImportSession`, `RepositoryImportSessionRepository`, `RepositoryImportSessionSelection`, `RepositorySandboxEnvironment`, `RoderCodeRepair`, `RoderCodeRepairSetting`, `RoderMachine`, `RoderRun`, `RoderWorkspaceCredential`, `RunArtifact`, `RunJob`, `RunScenarioRun`, `RunScheduleOption`, `RunSearch`, `RunUpdate`, `RunWorkspaceCredential`, `RunnerLease`, `RunnerPoolNodeEnrollmentToken`, `RunnerPoolRunner`, `RuntimeInstanceHealthSnapshot`, `SandboxIntegration`, `ScenarioRevision`, `ScenarioRunLesson`, `ScenarioRunScenarioEdit`, `SecretGrant`, `SecretVersion`, `ServiceEndpoint`, `Setting`, `SettingMutationLease`, `Signal`, `SignalInbound`, `SignalIntegration`, `SignalIntegrationDelivery`, `SignalIntegrationTarget`, `SignalSubscription`, `Site`, `SiteAccessKey`, `SitePreview`, `SiteSecret`, `SlackChannel`, `SourceConnection`, `SpaceAlertRule`, `SpaceAuditEvent`, `SpaceDnsRecord`, `SpaceEnrollmentToken`, `SpaceGateway`, `SpaceGroup`, `SpaceGroupMembership`, `SpaceLogStream`, `SpaceMetricSery`, `SpaceOtelCollector`, `SpacePeer`, `SpacePeerAttachment`, `SpacePolicy`, `SpaceSegment`, `SpaceTraceSpan`, `Spark`, `SparkAgentIntegration`, `SparkAgentLocalThread`, `SparkAgentSite`, `SparkAgentSkill`, `SparkAgentThread`, `SparkCredit`, `SparkCreditAgentUsage`, `SparkCreditUsageTotal`, `StaticSite`, `StaticSiteDeployment`, `StaticSiteDomain`, `StatusChange`, `StatusCommit`, `StatusPatchset`, `StripeWebhook`, `SubmitTelemetry`, `SubscriptionModel`, `SwarmEvent`, `SwarmLive`, `SwarmNote`, `SwarmTask`, `TaskLease`, `ThreadPreview`, `ThreadPreviewAccess`, `ToolFeedback`, `Transcript`, `V1Message`, `VcBranch`, `VcBrowser`, `VcChange`, `VcChangeGroup`, `VcFile`, `VcMergeQueue`, `VcStack`, `VcsNode`, `VcsSetting`, `VerificationProjectCredential`, `VerificationProjectPersona`, `VerificationProjectRun`, `VerificationProjectScenario`, `VerifyAppDomain`, `VerifyBrowserSession`, `VerifyEmailVerification`, `VerifySignalIntegration`, `VerifyStaticSiteDomain`, `VersionLog`, `WaitlistApplication`, `WebBotAuth`, `WebhookGitlab`, `WorkflowRunStep`, `WorkflowRunStopNotice`, `WorkflowTriggerSkipped`, `WorkspaceActivity`, `WorkspaceActivityNotification`, `WorkspaceSpace`, `WorkspaceSpacePreference`.

## Generating and updating the SDK

All generation is driven from the `.sdk/` directory. The generated language
directories (`ts/`, `go/`, …) are **build output** — never edit them by
hand; fix the model, a template, or a component and regenerate.

```bash
cd .sdk
npm run add-target <lang>     # scaffold a language target (ts js go py php rb lua ...)
npm run add-feature <name>    # scaffold a feature (e.g. log, test)
npm run build                 # compile .sdk/src/cmp -> .sdk/dist
npm run generate              # emit/refresh the SDK into ../<lang>
```

`generate` **merges** into existing files and does **not** re-apply
placeholder substitution to merged content. If you ever see a literal
`ProjectName` or `GOMODULE` in generated output, delete that one file and
regenerate it fresh:

```bash
rm <lang>/<the-file-with-the-placeholder>
npm run generate
```

Note: the `voxgig-sdkgen` CLI only *scaffolds* (`target add` /
`feature add`). Generation itself runs via `npm run generate` (backed by
`@voxgig/model`) — there is no `generate` CLI subcommand.

### Two silent failure modes

Generation has two ways of going wrong that **nothing reports**. Neither
breaks a build or a test, so the only symptom is a tree that disagrees with
the model — which is easy to commit past.

**`voxgig-model --no-config` writes a REDUCED model.** The
`.model-config` build is what registers the generator actions, and an SDK
project loads `apidef` and `sdkgen` through exactly that mechanism:

```
sys: model: action: { apidef: load: 'build/apidef.js', sdkgen: load: 'build/sdkgen.js' }
sys: model: order: action: 'apidef,sdkgen'
```

`--no-config` skips it, so those actions never run — and the model build
still *writes* the model file, now missing whatever they contribute (the
name case variants, and whole subtrees). A reduced model is a valid model,
so nothing downstream complains. To inspect the model layer **without side
effects**, use `npm run dry-generate` (`-y`, writes nothing). Never
`--no-config` in anything whose output might be committed.

**Regeneration never DELETES.** A file the generator has stopped emitting
stays in the tree, and `git status` is silent because it is committed and
unchanged. Narrowing a feature's plugin selection, or dropping a target, can
leave whole modules behind that nothing references and no test covers.

To find either, the target trees must be deleted and regenerated — a
regeneration in place cannot see stale output at all.
## Adding a feature

A **feature** is a pipeline extension: an object of hooks that fire at named
stages of every entity operation (each target's guide documents its
features). Built-in features are `log` and `test`.

```bash
cd .sdk
npm run add-feature <name>    # e.g. log  (comma-separated for several)
npm run build && npm run generate
```

To author a **new** feature, when editing a template cannot make the change:

1. Define its model at `.sdk/model/feature/<name>.aontu` — `name: key()`,
   `title`, `version`, `active`, `config.options.active`, a `hook`
   map (`<Stage>: active: true`), and per-language `deps`.
2. Provide the per-language runtime under that target's feature template dir
   (`.sdk/tm/<lang>/src/feature/<name>/` for ts/js, `.sdk/tm/<lang>/feature/`
   otherwise) — the `FEATURE_Name` / `FEATURE_VERSION` placeholders are
   substituted when `generate` copies it.
3. `npm run add-feature <name> && npm run build && npm run generate`. No
   package provides the name, so the add registers the feature in
   `feature-index.aontu` and copies nothing: the files in `.sdk` are its
   source.

A target of the project's own is written the same way:
`.sdk/model/target/<name>.aontu`, `.sdk/src/cmp/<name>/` and
`.sdk/tm/<name>/`, then `npm run add-target <name>`. Never put a package
folder such as `ext/` inside the project: sdkgen refuses it.
## Customising: model, templates, components

Each language target is generated from **two layers**:

| Layer | Path | Nature |
| --- | --- | --- |
| **Templates** | `.sdk/tm/<lang>/` | Plain target-language source, copied verbatim with placeholder substitution. Edit when the file is the **same for every API** (transport, base classes, runtime, utilities). |
| **Components** | `.sdk/src/cmp/<lang>/` | TypeScript that **generates** source by walking the model. Edit when the file's shape **depends on the API** (entity classes, the constructor, README, tests). |

> Decision rule: *same for every API → template; depends on the API →
> component.*

Placeholders substituted on copy: `ProjectName` (Pascal-case SDK name),
`GOMODULE` (Go module path), `FEATURE_Name` / `FEATURE_VERSION`, and the
`$$path$$` interpolation of a model value (such as the name) in `.aontu`.

Propagate a change: edit the template/component → `npm run build` (only
needed if you touched a component) → `npm run generate`. Target shape and
deps live in `.sdk/model/target/<lang>.aontu`; features in
`.sdk/model/feature/<name>.aontu`.
## The model language (aontu, `.aontu` files)

The model is one structured object assembled by **aontu** (a unification
engine) from three sources: the API model (entities/operations, from the
OpenAPI spec via `@voxgig/apidef`), the base schema, and the target/feature
definitions in `.sdk/model/`. An `.aontu` file is a relaxed JSON (jsonic
syntax) with unification semantics:

| Syntax | Meaning |
| --- | --- |
| `a: b: c: 1` | Nested-object shorthand for `a:{b:{c:1}}`. |
| `&: { ... }` | Schema applied to **every** child of a map (one rule, many entries). |
| `*default \| type` | A default value unified against a type (e.g. `*true \| boolean`). |
| `name: key()` | Bind a field to its map key (so `feature: log: {}` gets `name: 'log'`). |
| `$$path$$` | Interpolate a model value into a string — e.g. the SDK `name`. |
| `@"./file.aontu"` | Include another fragment (how the index files work). The `./` is required on a local path. |
| `x: .y` | Reference another path's value (e.g. `deps: ts: .js`). |

For example, the schema for every feature entry:

```aontu
main: kit: feature: &: {
  name: key()
  active: *false | boolean
  title: string
  version: *'0.0.1' | string
  hook: &: { active: *false | boolean, await: *false | boolean }
}
```

Caveat: literal disjunctions (`'prod' | 'peer' | 'dev'`) are fragile in
aontu, so the model uses `*'prod' | string` and enforces the enum in code —
do not "fix" these into literal disjunctions.
## Where things live

```
.sdk/
  model/          the model: target/, feature/, and index .aontu files
  src/cmp/<lang>/  components — TypeScript that generates API-specific source
  tm/<lang>/       templates — verbatim source copied with placeholders
  dist/            compiled components (npm run build)
<lang>/           generated SDK for each target (build output)
README.md         human-facing overview
Makefile          per-target deploy recipes
```

---

Generated by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen). Regenerate
with `cd .sdk && npm run generate`.
