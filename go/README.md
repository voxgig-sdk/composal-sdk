# Composal Golang SDK



The Golang SDK for the Composal API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.A2aWellKnown(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Patch`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/composal-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/composal-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/composal-sdk/go=../composal-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "os"
    sdk "github.com/voxgig-sdk/composal-sdk/go"
)

func main() {
    client := sdk.NewComposalSDK(map[string]any{
        "apikey": os.Getenv("COMPOSAL_APIKEY"),
    })

    _ = client
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
githubonboarding, err := client.GithubOnboarding(nil).Load(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = githubonboarding
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

githubOnboarding, err := client.GithubOnboarding(nil).Load(
    map[string]any{"organization_id": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(githubOnboarding.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewComposalSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewComposalSDK

```go
func NewComposalSDK(options map[string]any) *ComposalSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ComposalSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ComposalSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `A2aWellKnown` | `(data map[string]any) ComposalEntityBase` | Create an A2aWellKnown entity instance. |
| `AdminOrg` | `(data map[string]any) ComposalEntityBase` | Create an AdminOrg entity instance. |
| `Agent` | `(data map[string]any) ComposalEntityBase` | Create an Agent entity instance. |
| `AgentApp` | `(data map[string]any) ComposalEntityBase` | Create an AgentApp entity instance. |
| `AgentAppInstall` | `(data map[string]any) ComposalEntityBase` | Create an AgentAppInstall entity instance. |
| `AgentAttachment` | `(data map[string]any) ComposalEntityBase` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `(data map[string]any) ComposalEntityBase` | Create an AgentAutomation entity instance. |
| `AgentAvatar` | `(data map[string]any) ComposalEntityBase` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `(data map[string]any) ComposalEntityBase` | Create an AgentCommand entity instance. |
| `AgentComputer` | `(data map[string]any) ComposalEntityBase` | Create an AgentComputer entity instance. |
| `AgentConnection` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnection entity instance. |
| `AgentConnectionDelegation` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnectionDelegation entity instance. |
| `AgentConnectionGrant` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnectionGrant entity instance. |
| `AgentConnectionResource` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnectionResource entity instance. |
| `AgentConnectionSafetyControl` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnectionSafetyControl entity instance. |
| `AgentConnectionTriggerSubscription` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnectionTriggerSubscription entity instance. |
| `AgentContextCheckpoint` | `(data map[string]any) ComposalEntityBase` | Create an AgentContextCheckpoint entity instance. |
| `AgentControlFlow` | `(data map[string]any) ComposalEntityBase` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `(data map[string]any) ComposalEntityBase` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `(data map[string]any) ComposalEntityBase` | Create an AgentEmail entity instance. |
| `AgentEvent` | `(data map[string]any) ComposalEntityBase` | Create an AgentEvent entity instance. |
| `AgentFile` | `(data map[string]any) ComposalEntityBase` | Create an AgentFile entity instance. |
| `AgentInput` | `(data map[string]any) ComposalEntityBase` | Create an AgentInput entity instance. |
| `AgentIntegration` | `(data map[string]any) ComposalEntityBase` | Create an AgentIntegration entity instance. |
| `AgentIntegrationAccount` | `(data map[string]any) ComposalEntityBase` | Create an AgentIntegrationAccount entity instance. |
| `AgentIntegrationCallback` | `(data map[string]any) ComposalEntityBase` | Create an AgentIntegrationCallback entity instance. |
| `AgentInteraction` | `(data map[string]any) ComposalEntityBase` | Create an AgentInteraction entity instance. |
| `AgentLibrary` | `(data map[string]any) ComposalEntityBase` | Create an AgentLibrary entity instance. |
| `AgentManager` | `(data map[string]any) ComposalEntityBase` | Create an AgentManager entity instance. |
| `AgentManagerChoice` | `(data map[string]any) ComposalEntityBase` | Create an AgentManagerChoice entity instance. |
| `AgentMarketplace` | `(data map[string]any) ComposalEntityBase` | Create an AgentMarketplace entity instance. |
| `AgentMarketplaceShared` | `(data map[string]any) ComposalEntityBase` | Create an AgentMarketplaceShared entity instance. |
| `AgentMissionControl` | `(data map[string]any) ComposalEntityBase` | Create an AgentMissionControl entity instance. |
| `AgentOperation` | `(data map[string]any) ComposalEntityBase` | Create an AgentOperation entity instance. |
| `AgentProvisioning` | `(data map[string]any) ComposalEntityBase` | Create an AgentProvisioning entity instance. |
| `AgentPullRequest` | `(data map[string]any) ComposalEntityBase` | Create an AgentPullRequest entity instance. |
| `AgentQuestion` | `(data map[string]any) ComposalEntityBase` | Create an AgentQuestion entity instance. |
| `AgentRelayFileGrant` | `(data map[string]any) ComposalEntityBase` | Create an AgentRelayFileGrant entity instance. |
| `AgentRelayFileGrantAccount` | `(data map[string]any) ComposalEntityBase` | Create an AgentRelayFileGrantAccount entity instance. |
| `AgentRepository` | `(data map[string]any) ComposalEntityBase` | Create an AgentRepository entity instance. |
| `AgentResource` | `(data map[string]any) ComposalEntityBase` | Create an AgentResource entity instance. |
| `AgentRoder` | `(data map[string]any) ComposalEntityBase` | Create an AgentRoder entity instance. |
| `AgentRoutine` | `(data map[string]any) ComposalEntityBase` | Create an AgentRoutine entity instance. |
| `AgentRun` | `(data map[string]any) ComposalEntityBase` | Create an AgentRun entity instance. |
| `AgentRuntime` | `(data map[string]any) ComposalEntityBase` | Create an AgentRuntime entity instance. |
| `AgentSession` | `(data map[string]any) ComposalEntityBase` | Create an AgentSession entity instance. |
| `AgentSessionCheckpoint` | `(data map[string]any) ComposalEntityBase` | Create an AgentSessionCheckpoint entity instance. |
| `AgentSessionRoderHandoff` | `(data map[string]any) ComposalEntityBase` | Create an AgentSessionRoderHandoff entity instance. |
| `AgentSetting` | `(data map[string]any) ComposalEntityBase` | Create an AgentSetting entity instance. |
| `AgentSharing` | `(data map[string]any) ComposalEntityBase` | Create an AgentSharing entity instance. |
| `AgentSite` | `(data map[string]any) ComposalEntityBase` | Create an AgentSite entity instance. |
| `AgentSkill` | `(data map[string]any) ComposalEntityBase` | Create an AgentSkill entity instance. |
| `AgentSlack` | `(data map[string]any) ComposalEntityBase` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `(data map[string]any) ComposalEntityBase` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `(data map[string]any) ComposalEntityBase` | Create an AgentSubscription entity instance. |
| `AgentSwarm` | `(data map[string]any) ComposalEntityBase` | Create an AgentSwarm entity instance. |
| `AgentTeammate` | `(data map[string]any) ComposalEntityBase` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `(data map[string]any) ComposalEntityBase` | Create an AgentTerminal entity instance. |
| `AgentThread` | `(data map[string]any) ComposalEntityBase` | Create an AgentThread entity instance. |
| `AgentTool` | `(data map[string]any) ComposalEntityBase` | Create an AgentTool entity instance. |
| `AgentUsage` | `(data map[string]any) ComposalEntityBase` | Create an AgentUsage entity instance. |
| `AgentVerifyProject` | `(data map[string]any) ComposalEntityBase` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `(data map[string]any) ComposalEntityBase` | Create an AgentWait entity instance. |
| `AgentWebPreview` | `(data map[string]any) ComposalEntityBase` | Create an AgentWebPreview entity instance. |
| `AgentWebhook` | `(data map[string]any) ComposalEntityBase` | Create an AgentWebhook entity instance. |
| `AgentWork` | `(data map[string]any) ComposalEntityBase` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `(data map[string]any) ComposalEntityBase` | Create an AgentWritePermission entity instance. |
| `Agreement` | `(data map[string]any) ComposalEntityBase` | Create an Agreement entity instance. |
| `AgreementAccessRequest` | `(data map[string]any) ComposalEntityBase` | Create an AgreementAccessRequest entity instance. |
| `AlertRuleEvent` | `(data map[string]any) ComposalEntityBase` | Create an AlertRuleEvent entity instance. |
| `AllocationLog` | `(data map[string]any) ComposalEntityBase` | Create an AllocationLog entity instance. |
| `App` | `(data map[string]any) ComposalEntityBase` | Create an App entity instance. |
| `AppAccess` | `(data map[string]any) ComposalEntityBase` | Create an AppAccess entity instance. |
| `AppAccessJwk` | `(data map[string]any) ComposalEntityBase` | Create an AppAccessJwk entity instance. |
| `AppCdn` | `(data map[string]any) ComposalEntityBase` | Create an AppCdn entity instance. |
| `AppConfigVariable` | `(data map[string]any) ComposalEntityBase` | Create an AppConfigVariable entity instance. |
| `AppDataResource` | `(data map[string]any) ComposalEntityBase` | Create an AppDataResource entity instance. |
| `AppDeploy` | `(data map[string]any) ComposalEntityBase` | Create an AppDeploy entity instance. |
| `AppDeployment` | `(data map[string]any) ComposalEntityBase` | Create an AppDeployment entity instance. |
| `AppDeploymentOperation` | `(data map[string]any) ComposalEntityBase` | Create an AppDeploymentOperation entity instance. |
| `AppDeploymentRollback` | `(data map[string]any) ComposalEntityBase` | Create an AppDeploymentRollback entity instance. |
| `AppEnvironment` | `(data map[string]any) ComposalEntityBase` | Create an AppEnvironment entity instance. |
| `AppLocation` | `(data map[string]any) ComposalEntityBase` | Create an AppLocation entity instance. |
| `AppMetric` | `(data map[string]any) ComposalEntityBase` | Create an AppMetric entity instance. |
| `AppPreview` | `(data map[string]any) ComposalEntityBase` | Create an AppPreview entity instance. |
| `AppPreviewProfile` | `(data map[string]any) ComposalEntityBase` | Create an AppPreviewProfile entity instance. |
| `AppRun` | `(data map[string]any) ComposalEntityBase` | Create an AppRun entity instance. |
| `AppSecret` | `(data map[string]any) ComposalEntityBase` | Create an AppSecret entity instance. |
| `AppService` | `(data map[string]any) ComposalEntityBase` | Create an AppService entity instance. |
| `AppServiceBinding` | `(data map[string]any) ComposalEntityBase` | Create an AppServiceBinding entity instance. |
| `AppServicePlacement` | `(data map[string]any) ComposalEntityBase` | Create an AppServicePlacement entity instance. |
| `AppStorageResource` | `(data map[string]any) ComposalEntityBase` | Create an AppStorageResource entity instance. |
| `Artefact` | `(data map[string]any) ComposalEntityBase` | Create an Artefact entity instance. |
| `ArtefactCommentThread` | `(data map[string]any) ComposalEntityBase` | Create an ArtefactCommentThread entity instance. |
| `ArtefactRevision` | `(data map[string]any) ComposalEntityBase` | Create an ArtefactRevision entity instance. |
| `ArtefactViewToken` | `(data map[string]any) ComposalEntityBase` | Create an ArtefactViewToken entity instance. |
| `Artifact` | `(data map[string]any) ComposalEntityBase` | Create an Artifact entity instance. |
| `ArtifactCacheNamespace` | `(data map[string]any) ComposalEntityBase` | Create an ArtifactCacheNamespace entity instance. |
| `ArtifactImageRepository` | `(data map[string]any) ComposalEntityBase` | Create an ArtifactImageRepository entity instance. |
| `ArtifactPackageMirror` | `(data map[string]any) ComposalEntityBase` | Create an ArtifactPackageMirror entity instance. |
| `ArtifactRetentionPolicy` | `(data map[string]any) ComposalEntityBase` | Create an ArtifactRetentionPolicy entity instance. |
| `AttachmentPart` | `(data map[string]any) ComposalEntityBase` | Create an AttachmentPart entity instance. |
| `AuditEvent` | `(data map[string]any) ComposalEntityBase` | Create an AuditEvent entity instance. |
| `Auth` | `(data map[string]any) ComposalEntityBase` | Create an Auth entity instance. |
| `AuthCli` | `(data map[string]any) ComposalEntityBase` | Create an AuthCli entity instance. |
| `AuthGithub` | `(data map[string]any) ComposalEntityBase` | Create an AuthGithub entity instance. |
| `AuthGoogle` | `(data map[string]any) ComposalEntityBase` | Create an AuthGoogle entity instance. |
| `AuthOpenai` | `(data map[string]any) ComposalEntityBase` | Create an AuthOpenai entity instance. |
| `AuthPasswordReset` | `(data map[string]any) ComposalEntityBase` | Create an AuthPasswordReset entity instance. |
| `AuthRegistrationOption` | `(data map[string]any) ComposalEntityBase` | Create an AuthRegistrationOption entity instance. |
| `AutomationEvent` | `(data map[string]any) ComposalEntityBase` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `(data map[string]any) ComposalEntityBase` | Create an AutomationRun entity instance. |
| `BackendRunnerPool` | `(data map[string]any) ComposalEntityBase` | Create a BackendRunnerPool entity instance. |
| `Bazel` | `(data map[string]any) ComposalEntityBase` | Create a Bazel entity instance. |
| `BazelActionResult` | `(data map[string]any) ComposalEntityBase` | Create a BazelActionResult entity instance. |
| `BazelBackend` | `(data map[string]any) ComposalEntityBase` | Create a BazelBackend entity instance. |
| `BazelBlob` | `(data map[string]any) ComposalEntityBase` | Create a BazelBlob entity instance. |
| `BazelExecution` | `(data map[string]any) ComposalEntityBase` | Create a BazelExecution entity instance. |
| `BazelFindMissingBlob` | `(data map[string]any) ComposalEntityBase` | Create a BazelFindMissingBlob entity instance. |
| `Billing` | `(data map[string]any) ComposalEntityBase` | Create a Billing entity instance. |
| `BillingAddon` | `(data map[string]any) ComposalEntityBase` | Create a BillingAddon entity instance. |
| `BillingBudget` | `(data map[string]any) ComposalEntityBase` | Create a BillingBudget entity instance. |
| `BillingCheckoutSession` | `(data map[string]any) ComposalEntityBase` | Create a BillingCheckoutSession entity instance. |
| `BillingContact` | `(data map[string]any) ComposalEntityBase` | Create a BillingContact entity instance. |
| `BillingExtraSpend` | `(data map[string]any) ComposalEntityBase` | Create a BillingExtraSpend entity instance. |
| `BillingInvoice` | `(data map[string]any) ComposalEntityBase` | Create a BillingInvoice entity instance. |
| `BillingPackage` | `(data map[string]any) ComposalEntityBase` | Create a BillingPackage entity instance. |
| `BillingPortalSession` | `(data map[string]any) ComposalEntityBase` | Create a BillingPortalSession entity instance. |
| `BillingPrepaidPeriod` | `(data map[string]any) ComposalEntityBase` | Create a BillingPrepaidPeriod entity instance. |
| `BillingPrepaidPurchase` | `(data map[string]any) ComposalEntityBase` | Create a BillingPrepaidPurchase entity instance. |
| `BillingSubscription` | `(data map[string]any) ComposalEntityBase` | Create a BillingSubscription entity instance. |
| `BillingTokenTopUp` | `(data map[string]any) ComposalEntityBase` | Create a BillingTokenTopUp entity instance. |
| `BillingUsage` | `(data map[string]any) ComposalEntityBase` | Create a BillingUsage entity instance. |
| `Binary` | `(data map[string]any) ComposalEntityBase` | Create a Binary entity instance. |
| `BinaryVersion` | `(data map[string]any) ComposalEntityBase` | Create a BinaryVersion entity instance. |
| `BookmarkProtectionRefreshGithubRequiredCheck` | `(data map[string]any) ComposalEntityBase` | Create a BookmarkProtectionRefreshGithubRequiredCheck entity instance. |
| `BrowserEgressCandidate` | `(data map[string]any) ComposalEntityBase` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionTask entity instance. |
| `CacheNamespaceEntry` | `(data map[string]any) ComposalEntityBase` | Create a CacheNamespaceEntry entity instance. |
| `CatalogSelector` | `(data map[string]any) ComposalEntityBase` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `(data map[string]any) ComposalEntityBase` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `(data map[string]any) ComposalEntityBase` | Create a CdnHostname entity instance. |
| `CdnSpace` | `(data map[string]any) ComposalEntityBase` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `(data map[string]any) ComposalEntityBase` | Create a CdnSpaceObject entity instance. |
| `Change` | `(data map[string]any) ComposalEntityBase` | Create a Change entity instance. |
| `ChangeAsset` | `(data map[string]any) ComposalEntityBase` | Create a ChangeAsset entity instance. |
| `ChangeComment` | `(data map[string]any) ComposalEntityBase` | Create a ChangeComment entity instance. |
| `ChangeFileReviewCheckpoint` | `(data map[string]any) ComposalEntityBase` | Create a ChangeFileReviewCheckpoint entity instance. |
| `ChangeGitBranchSubmission` | `(data map[string]any) ComposalEntityBase` | Create a ChangeGitBranchSubmission entity instance. |
| `ChangeGitCommitIdentity` | `(data map[string]any) ComposalEntityBase` | Create a ChangeGitCommitIdentity entity instance. |
| `ChangeGitPublication` | `(data map[string]any) ComposalEntityBase` | Create a ChangeGitPublication entity instance. |
| `ChangeGroupMember` | `(data map[string]any) ComposalEntityBase` | Create a ChangeGroupMember entity instance. |
| `ChangeLabel` | `(data map[string]any) ComposalEntityBase` | Create a ChangeLabel entity instance. |
| `ChangeLandingHold` | `(data map[string]any) ComposalEntityBase` | Create a ChangeLandingHold entity instance. |
| `ChangeLandingRequest` | `(data map[string]any) ComposalEntityBase` | Create a ChangeLandingRequest entity instance. |
| `ChangeRequestChange` | `(data map[string]any) ComposalEntityBase` | Create a ChangeRequestChange entity instance. |
| `ChangeReviewer` | `(data map[string]any) ComposalEntityBase` | Create a ChangeReviewer entity instance. |
| `ChangeTranscript` | `(data map[string]any) ComposalEntityBase` | Create a ChangeTranscript entity instance. |
| `ChangeTranscriptSummary` | `(data map[string]any) ComposalEntityBase` | Create a ChangeTranscriptSummary entity instance. |
| `CheckpointPrepareChunk` | `(data map[string]any) ComposalEntityBase` | Create a CheckpointPrepareChunk entity instance. |
| `CiNode` | `(data map[string]any) ComposalEntityBase` | Create a CiNode entity instance. |
| `CiPipeline` | `(data map[string]any) ComposalEntityBase` | Create a CiPipeline entity instance. |
| `CiPipelineRun` | `(data map[string]any) ComposalEntityBase` | Create a CiPipelineRun entity instance. |
| `CiRunnerPool` | `(data map[string]any) ComposalEntityBase` | Create a CiRunnerPool entity instance. |
| `CiStatus` | `(data map[string]any) ComposalEntityBase` | Create a CiStatus entity instance. |
| `CliEvent` | `(data map[string]any) ComposalEntityBase` | Create a CliEvent entity instance. |
| `CliRelease` | `(data map[string]any) ComposalEntityBase` | Create a CliRelease entity instance. |
| `CloudWorkspaceBackupObject` | `(data map[string]any) ComposalEntityBase` | Create a CloudWorkspaceBackupObject entity instance. |
| `CodeRuleEvaluation` | `(data map[string]any) ComposalEntityBase` | Create a CodeRuleEvaluation entity instance. |
| `ComSiteAccess` | `(data map[string]any) ComposalEntityBase` | Create a ComSiteAccess entity instance. |
| `ComSiteAccessSession` | `(data map[string]any) ComposalEntityBase` | Create a ComSiteAccessSession entity instance. |
| `CommentThreadComment` | `(data map[string]any) ComposalEntityBase` | Create a CommentThreadComment entity instance. |
| `CommitDiff` | `(data map[string]any) ComposalEntityBase` | Create a CommitDiff entity instance. |
| `ConnectionRequest` | `(data map[string]any) ComposalEntityBase` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `(data map[string]any) ComposalEntityBase` | Create a ConnectionSource entity instance. |
| `ContactSubmission` | `(data map[string]any) ComposalEntityBase` | Create a ContactSubmission entity instance. |
| `ControlComputer` | `(data map[string]any) ComposalEntityBase` | Create a ControlComputer entity instance. |
| `ControlComputerControlOperation` | `(data map[string]any) ComposalEntityBase` | Create a ControlComputerControlOperation entity instance. |
| `CoordinationWait` | `(data map[string]any) ComposalEntityBase` | Create a CoordinationWait entity instance. |
| `CredentialSignInCheck` | `(data map[string]any) ComposalEntityBase` | Create a CredentialSignInCheck entity instance. |
| `DataResourceRotateCredential` | `(data map[string]any) ComposalEntityBase` | Create a DataResourceRotateCredential entity instance. |
| `DeepScan` | `(data map[string]any) ComposalEntityBase` | Create a DeepScan entity instance. |
| `DeepScanFinding` | `(data map[string]any) ComposalEntityBase` | Create a DeepScanFinding entity instance. |
| `DeepScanFlow` | `(data map[string]any) ComposalEntityBase` | Create a DeepScanFlow entity instance. |
| `DeepScanMappedFlow` | `(data map[string]any) ComposalEntityBase` | Create a DeepScanMappedFlow entity instance. |
| `DeepScanOption` | `(data map[string]any) ComposalEntityBase` | Create a DeepScanOption entity instance. |
| `DemoShare` | `(data map[string]any) ComposalEntityBase` | Create a DemoShare entity instance. |
| `DemoShareSegment` | `(data map[string]any) ComposalEntityBase` | Create a DemoShareSegment entity instance. |
| `Deployment` | `(data map[string]any) ComposalEntityBase` | Create a Deployment entity instance. |
| `DeploymentDashboardNomad` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentDetail` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentDetail entity instance. |
| `DeploymentFile` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentFile entity instance. |
| `DeploymentLog` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentLog entity instance. |
| `DeploymentMetric` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentMetric entity instance. |
| `DeploymentPreview` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentPreview entity instance. |
| `DeploymentSetting` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentSetting entity instance. |
| `DesktopLocalAgentModel` | `(data map[string]any) ComposalEntityBase` | Create a DesktopLocalAgentModel entity instance. |
| `DesktopLocalAgentResponse` | `(data map[string]any) ComposalEntityBase` | Create a DesktopLocalAgentResponse entity instance. |
| `Device` | `(data map[string]any) ComposalEntityBase` | Create a Device entity instance. |
| `DeviceBrowserOperation` | `(data map[string]any) ComposalEntityBase` | Create a DeviceBrowserOperation entity instance. |
| `DeviceControlMessage` | `(data map[string]any) ComposalEntityBase` | Create a DeviceControlMessage entity instance. |
| `DeviceControlOperation` | `(data map[string]any) ComposalEntityBase` | Create a DeviceControlOperation entity instance. |
| `DeviceEnterpriseRelay` | `(data map[string]any) ComposalEntityBase` | Create a DeviceEnterpriseRelay entity instance. |
| `DeviceFolderListing` | `(data map[string]any) ComposalEntityBase` | Create a DeviceFolderListing entity instance. |
| `DeviceGrant` | `(data map[string]any) ComposalEntityBase` | Create a DeviceGrant entity instance. |
| `DeviceInvocation` | `(data map[string]any) ComposalEntityBase` | Create a DeviceInvocation entity instance. |
| `DeviceLocalEvent` | `(data map[string]any) ComposalEntityBase` | Create a DeviceLocalEvent entity instance. |
| `DevicePairing` | `(data map[string]any) ComposalEntityBase` | Create a DevicePairing entity instance. |
| `DeviceProject` | `(data map[string]any) ComposalEntityBase` | Create a DeviceProject entity instance. |
| `DeviceScheduledCheckIn` | `(data map[string]any) ComposalEntityBase` | Create a DeviceScheduledCheckIn entity instance. |
| `DockerBuilder` | `(data map[string]any) ComposalEntityBase` | Create a DockerBuilder entity instance. |
| `DockerBuilderSession` | `(data map[string]any) ComposalEntityBase` | Create a DockerBuilderSession entity instance. |
| `DockerBuilderSetting` | `(data map[string]any) ComposalEntityBase` | Create a DockerBuilderSetting entity instance. |
| `DomainDnsIntegration` | `(data map[string]any) ComposalEntityBase` | Create a DomainDnsIntegration entity instance. |
| `DomainPathRule` | `(data map[string]any) ComposalEntityBase` | Create a DomainPathRule entity instance. |
| `Dream` | `(data map[string]any) ComposalEntityBase` | Create a Dream entity instance. |
| `Edge` | `(data map[string]any) ComposalEntityBase` | Create an Edge entity instance. |
| `EmailVerification` | `(data map[string]any) ComposalEntityBase` | Create an EmailVerification entity instance. |
| `Environment` | `(data map[string]any) ComposalEntityBase` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `(data map[string]any) ComposalEntityBase` | Create an Evidence entity instance. |
| `ExecutionDesiredState` | `(data map[string]any) ComposalEntityBase` | Create an ExecutionDesiredState entity instance. |
| `ExecutionReconcilerTick` | `(data map[string]any) ComposalEntityBase` | Create an ExecutionReconcilerTick entity instance. |
| `ExecutionRelease` | `(data map[string]any) ComposalEntityBase` | Create an ExecutionRelease entity instance. |
| `ExecutionRuntimeInstance` | `(data map[string]any) ComposalEntityBase` | Create an ExecutionRuntimeInstance entity instance. |
| `Exploration` | `(data map[string]any) ComposalEntityBase` | Create an Exploration entity instance. |
| `ExplorationMessage` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationScenario entity instance. |
| `Finding` | `(data map[string]any) ComposalEntityBase` | Create a Finding entity instance. |
| `Gh` | `(data map[string]any) ComposalEntityBase` | Create a Gh entity instance. |
| `GitImport` | `(data map[string]any) ComposalEntityBase` | Create a GitImport entity instance. |
| `Github` | `(data map[string]any) ComposalEntityBase` | Create a Github entity instance. |
| `GithubApp` | `(data map[string]any) ComposalEntityBase` | Create a GithubApp entity instance. |
| `GithubAppImportableRepository` | `(data map[string]any) ComposalEntityBase` | Create a GithubAppImportableRepository entity instance. |
| `GithubAppInstallation` | `(data map[string]any) ComposalEntityBase` | Create a GithubAppInstallation entity instance. |
| `GithubAppInstallationAuthorization` | `(data map[string]any) ComposalEntityBase` | Create a GithubAppInstallationAuthorization entity instance. |
| `GithubAppUserAuthorization` | `(data map[string]any) ComposalEntityBase` | Create a GithubAppUserAuthorization entity instance. |
| `GithubCiRepository` | `(data map[string]any) ComposalEntityBase` | Create a GithubCiRepository entity instance. |
| `GithubCiRepositoryCompatibilityReport` | `(data map[string]any) ComposalEntityBase` | Create a GithubCiRepositoryCompatibilityReport entity instance. |
| `GithubConnection` | `(data map[string]any) ComposalEntityBase` | Create a GithubConnection entity instance. |
| `GithubIntegration` | `(data map[string]any) ComposalEntityBase` | Create a GithubIntegration entity instance. |
| `GithubOnboarding` | `(data map[string]any) ComposalEntityBase` | Create a GithubOnboarding entity instance. |
| `GithubOnboardingBranch` | `(data map[string]any) ComposalEntityBase` | Create a GithubOnboardingBranch entity instance. |
| `GithubOnboardingImport` | `(data map[string]any) ComposalEntityBase` | Create a GithubOnboardingImport entity instance. |
| `GithubOnboardingImportBatch` | `(data map[string]any) ComposalEntityBase` | Create a GithubOnboardingImportBatch entity instance. |
| `GithubOnboardingImportItem` | `(data map[string]any) ComposalEntityBase` | Create a GithubOnboardingImportItem entity instance. |
| `GithubPullRequest` | `(data map[string]any) ComposalEntityBase` | Create a GithubPullRequest entity instance. |
| `GithubRunnerAdmission` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerAdmission entity instance. |
| `GithubRunnerCache` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerCache entity instance. |
| `GithubRunnerEgress` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerEgress entity instance. |
| `GithubRunnerHistory` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerHistory entity instance. |
| `GithubRunnerImage` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerImage entity instance. |
| `GithubRunnerPool` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerPool entity instance. |
| `GithubRunnerSetup` | `(data map[string]any) ComposalEntityBase` | Create a GithubRunnerSetup entity instance. |
| `Gitlab` | `(data map[string]any) ComposalEntityBase` | Create a Gitlab entity instance. |
| `GitlabConnection` | `(data map[string]any) ComposalEntityBase` | Create a GitlabConnection entity instance. |
| `GitlabImport` | `(data map[string]any) ComposalEntityBase` | Create a GitlabImport entity instance. |
| `GitlabOauth` | `(data map[string]any) ComposalEntityBase` | Create a GitlabOauth entity instance. |
| `GrantAllAgent` | `(data map[string]any) ComposalEntityBase` | Create a GrantAllAgent entity instance. |
| `HostingAppDomain` | `(data map[string]any) ComposalEntityBase` | Create a HostingAppDomain entity instance. |
| `IdentityOrganization` | `(data map[string]any) ComposalEntityBase` | Create an IdentityOrganization entity instance. |
| `ImageRepository` | `(data map[string]any) ComposalEntityBase` | Create an ImageRepository entity instance. |
| `ImageRepositoryTag` | `(data map[string]any) ComposalEntityBase` | Create an ImageRepositoryTag entity instance. |
| `ImportBranchPolicy` | `(data map[string]any) ComposalEntityBase` | Create an ImportBranchPolicy entity instance. |
| `Integration` | `(data map[string]any) ComposalEntityBase` | Create an Integration entity instance. |
| `InteractionResponse` | `(data map[string]any) ComposalEntityBase` | Create an InteractionResponse entity instance. |
| `Invitation` | `(data map[string]any) ComposalEntityBase` | Create an Invitation entity instance. |
| `InvocationControl` | `(data map[string]any) ComposalEntityBase` | Create an InvocationControl entity instance. |
| `JobLogChunk` | `(data map[string]any) ComposalEntityBase` | Create a JobLogChunk entity instance. |
| `JobStep` | `(data map[string]any) ComposalEntityBase` | Create a JobStep entity instance. |
| `JobWorkspace` | `(data map[string]any) ComposalEntityBase` | Create a JobWorkspace entity instance. |
| `JourneyVariantReplay` | `(data map[string]any) ComposalEntityBase` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `(data map[string]any) ComposalEntityBase` | Create a Knowledge entity instance. |
| `Known` | `(data map[string]any) ComposalEntityBase` | Create a Known entity instance. |
| `Label` | `(data map[string]any) ComposalEntityBase` | Create a Label entity instance. |
| `LeaseArtifact` | `(data map[string]any) ComposalEntityBase` | Create a LeaseArtifact entity instance. |
| `LeaseCache` | `(data map[string]any) ComposalEntityBase` | Create a LeaseCache entity instance. |
| `LeaseLogChunk` | `(data map[string]any) ComposalEntityBase` | Create a LeaseLogChunk entity instance. |
| `LeaseReconciliation` | `(data map[string]any) ComposalEntityBase` | Create a LeaseReconciliation entity instance. |
| `LeaseStep` | `(data map[string]any) ComposalEntityBase` | Create a LeaseStep entity instance. |
| `LeaseVerifyDiagnostic` | `(data map[string]any) ComposalEntityBase` | Create a LeaseVerifyDiagnostic entity instance. |
| `LeaseVerifySecret` | `(data map[string]any) ComposalEntityBase` | Create a LeaseVerifySecret entity instance. |
| `LeaseWorkspace` | `(data map[string]any) ComposalEntityBase` | Create a LeaseWorkspace entity instance. |
| `LocalAgentDecision` | `(data map[string]any) ComposalEntityBase` | Create a LocalAgentDecision entity instance. |
| `LocalAgentResponse` | `(data map[string]any) ComposalEntityBase` | Create a LocalAgentResponse entity instance. |
| `LocalThreadDelivery` | `(data map[string]any) ComposalEntityBase` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `(data map[string]any) ComposalEntityBase` | Create a LocalThreadOperation entity instance. |
| `Location` | `(data map[string]any) ComposalEntityBase` | Create a Location entity instance. |
| `LogStreamChunk` | `(data map[string]any) ComposalEntityBase` | Create a LogStreamChunk entity instance. |
| `LogoImage` | `(data map[string]any) ComposalEntityBase` | Create a LogoImage entity instance. |
| `MarketingSetting` | `(data map[string]any) ComposalEntityBase` | Create a MarketingSetting entity instance. |
| `McpOauth` | `(data map[string]any) ComposalEntityBase` | Create a McpOauth entity instance. |
| `Me` | `(data map[string]any) ComposalEntityBase` | Create a Me entity instance. |
| `MeEmail` | `(data map[string]any) ComposalEntityBase` | Create a MeEmail entity instance. |
| `MeOnboarding` | `(data map[string]any) ComposalEntityBase` | Create a MeOnboarding entity instance. |
| `MediaFile` | `(data map[string]any) ComposalEntityBase` | Create a MediaFile entity instance. |
| `Member` | `(data map[string]any) ComposalEntityBase` | Create a Member entity instance. |
| `Memory` | `(data map[string]any) ComposalEntityBase` | Create a Memory entity instance. |
| `MergeQueueEntry` | `(data map[string]any) ComposalEntityBase` | Create a MergeQueueEntry entity instance. |
| `MergeRequest` | `(data map[string]any) ComposalEntityBase` | Create a MergeRequest entity instance. |
| `MergeResolution` | `(data map[string]any) ComposalEntityBase` | Create a MergeResolution entity instance. |
| `MessagingConversationMessage` | `(data map[string]any) ComposalEntityBase` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `(data map[string]any) ComposalEntityBase` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `(data map[string]any) ComposalEntityBase` | Create a MetricQuery entity instance. |
| `MetronomeWebhook` | `(data map[string]any) ComposalEntityBase` | Create a MetronomeWebhook entity instance. |
| `ModelSubscriptionAccount` | `(data map[string]any) ComposalEntityBase` | Create a ModelSubscriptionAccount entity instance. |
| `ModelSubscriptionAccountConnection` | `(data map[string]any) ComposalEntityBase` | Create a ModelSubscriptionAccountConnection entity instance. |
| `NetworkConnection` | `(data map[string]any) ComposalEntityBase` | Create a NetworkConnection entity instance. |
| `NetworkingSpace` | `(data map[string]any) ComposalEntityBase` | Create a NetworkingSpace entity instance. |
| `Node` | `(data map[string]any) ComposalEntityBase` | Create a Node entity instance. |
| `NodeCertificate` | `(data map[string]any) ComposalEntityBase` | Create a NodeCertificate entity instance. |
| `NodeLease` | `(data map[string]any) ComposalEntityBase` | Create a NodeLease entity instance. |
| `NomadAllocation` | `(data map[string]any) ComposalEntityBase` | Create a NomadAllocation entity instance. |
| `NomadLog` | `(data map[string]any) ComposalEntityBase` | Create a NomadLog entity instance. |
| `Now` | `(data map[string]any) ComposalEntityBase` | Create a Now entity instance. |
| `ObservabilityClickhouseCluster` | `(data map[string]any) ComposalEntityBase` | Create an ObservabilityClickhouseCluster entity instance. |
| `ObservabilityQuickwitCluster` | `(data map[string]any) ComposalEntityBase` | Create an ObservabilityQuickwitCluster entity instance. |
| `ObservabilitySpace` | `(data map[string]any) ComposalEntityBase` | Create an ObservabilitySpace entity instance. |
| `Openapi` | `(data map[string]any) ComposalEntityBase` | Create an Openapi entity instance. |
| `OrgInvitation` | `(data map[string]any) ComposalEntityBase` | Create an OrgInvitation entity instance. |
| `Organization` | `(data map[string]any) ComposalEntityBase` | Create an Organization entity instance. |
| `OrganizationApp` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationApp entity instance. |
| `OrganizationControl` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationControl entity instance. |
| `OrganizationDevice` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationDevice entity instance. |
| `OrganizationIdentityCertificate` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationIdentityCertificate entity instance. |
| `OrganizationInteraction` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationInteraction entity instance. |
| `OrganizationInvitation` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationInvitation entity instance. |
| `OrganizationMessageFile` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationMessageFile entity instance. |
| `OrganizationOidcTrust` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationOidcTrust entity instance. |
| `OrganizationRunEvent` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationRunEvent entity instance. |
| `OrganizationRunOutcome` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationRunOutcome entity instance. |
| `OrganizationRunUsage` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationRunUsage entity instance. |
| `OrganizationSandbox` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationSandbox entity instance. |
| `OrganizationSecret` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationSecret entity instance. |
| `OrganizationServiceAccount` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationServiceAccount entity instance. |
| `OrganizationSetting` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationSetting entity instance. |
| `OrganizationSite` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationSite entity instance. |
| `OrganizationSubscription` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationSubscription entity instance. |
| `OrganizationTool` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationTool entity instance. |
| `OrganizationWorkloadIdentity` | `(data map[string]any) ComposalEntityBase` | Create an OrganizationWorkloadIdentity entity instance. |
| `OtelIngest` | `(data map[string]any) ComposalEntityBase` | Create an OtelIngest entity instance. |
| `Page` | `(data map[string]any) ComposalEntityBase` | Create a Page entity instance. |
| `PageAgent` | `(data map[string]any) ComposalEntityBase` | Create a PageAgent entity instance. |
| `PageArtefact` | `(data map[string]any) ComposalEntityBase` | Create a PageArtefact entity instance. |
| `PageCiPipelineRun` | `(data map[string]any) ComposalEntityBase` | Create a PageCiPipelineRun entity instance. |
| `PageProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a PageProjectRun entity instance. |
| `PageRepoVcCommit` | `(data map[string]any) ComposalEntityBase` | Create a PageRepoVcCommit entity instance. |
| `PagesBilling` | `(data map[string]any) ComposalEntityBase` | Create a PagesBilling entity instance. |
| `PagesGithubOnboarding` | `(data map[string]any) ComposalEntityBase` | Create a PagesGithubOnboarding entity instance. |
| `PagesMember` | `(data map[string]any) ComposalEntityBase` | Create a PagesMember entity instance. |
| `PagesProjectCredential` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectScenario entity instance. |
| `PagesRegistry` | `(data map[string]any) ComposalEntityBase` | Create a PagesRegistry entity instance. |
| `PagesSession` | `(data map[string]any) ComposalEntityBase` | Create a PagesSession entity instance. |
| `Pairing` | `(data map[string]any) ComposalEntityBase` | Create a Pairing entity instance. |
| `PairingEvent` | `(data map[string]any) ComposalEntityBase` | Create a PairingEvent entity instance. |
| `ParallelV1` | `(data map[string]any) ComposalEntityBase` | Create a ParallelV1 entity instance. |
| `PatchsetDiff` | `(data map[string]any) ComposalEntityBase` | Create a PatchsetDiff entity instance. |
| `PersonalAccessToken` | `(data map[string]any) ComposalEntityBase` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `(data map[string]any) ComposalEntityBase` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `(data map[string]any) ComposalEntityBase` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `(data map[string]any) ComposalEntityBase` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `(data map[string]any) ComposalEntityBase` | Create a PreviewSharingApproval entity instance. |
| `ProactiveAgentWaitlistEntry` | `(data map[string]any) ComposalEntityBase` | Create a ProactiveAgentWaitlistEntry entity instance. |
| `Product` | `(data map[string]any) ComposalEntityBase` | Create a Product entity instance. |
| `ProductMapIdentityDecision` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapIdentityDecision entity instance. |
| `ProductMapJourney` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapJourney entity instance. |
| `ProductMapJourneyReplay` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapJourneyReplay entity instance. |
| `ProductMapObservation` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapObservation entity instance. |
| `ProductMapQuestion` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapQuestion entity instance. |
| `ProductMapState` | `(data map[string]any) ComposalEntityBase` | Create a ProductMapState entity instance. |
| `Project` | `(data map[string]any) ComposalEntityBase` | Create a Project entity instance. |
| `ProjectAndroidApk` | `(data map[string]any) ComposalEntityBase` | Create a ProjectAndroidApk entity instance. |
| `ProjectCodeMap` | `(data map[string]any) ComposalEntityBase` | Create a ProjectCodeMap entity instance. |
| `ProjectEnvironment` | `(data map[string]any) ComposalEntityBase` | Create a ProjectEnvironment entity instance. |
| `ProjectFinding` | `(data map[string]any) ComposalEntityBase` | Create a ProjectFinding entity instance. |
| `ProjectFixture` | `(data map[string]any) ComposalEntityBase` | Create a ProjectFixture entity instance. |
| `ProjectIosApp` | `(data map[string]any) ComposalEntityBase` | Create a ProjectIosApp entity instance. |
| `ProjectMessagingConversation` | `(data map[string]any) ComposalEntityBase` | Create a ProjectMessagingConversation entity instance. |
| `ProjectOverviewMetric` | `(data map[string]any) ComposalEntityBase` | Create a ProjectOverviewMetric entity instance. |
| `ProjectOverviewPullRequest` | `(data map[string]any) ComposalEntityBase` | Create a ProjectOverviewPullRequest entity instance. |
| `ProjectProductMap` | `(data map[string]any) ComposalEntityBase` | Create a ProjectProductMap entity instance. |
| `ProjectRecording` | `(data map[string]any) ComposalEntityBase` | Create a ProjectRecording entity instance. |
| `ProjectRunPlan` | `(data map[string]any) ComposalEntityBase` | Create a ProjectRunPlan entity instance. |
| `ProjectRunSchedule` | `(data map[string]any) ComposalEntityBase` | Create a ProjectRunSchedule entity instance. |
| `ProjectScenarioOption` | `(data map[string]any) ComposalEntityBase` | Create a ProjectScenarioOption entity instance. |
| `ProjectScenarioRow` | `(data map[string]any) ComposalEntityBase` | Create a ProjectScenarioRow entity instance. |
| `ProjectSetting` | `(data map[string]any) ComposalEntityBase` | Create a ProjectSetting entity instance. |
| `PullRequest` | `(data map[string]any) ComposalEntityBase` | Create a PullRequest entity instance. |
| `PullRequestAction` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestAction entity instance. |
| `PullRequestMagicMerge` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestMagicMerge entity instance. |
| `PullRequestSetting` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSettingDetectComment entity instance. |
| `PullRequestTranscript` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestTranscript entity instance. |
| `PullZone` | `(data map[string]any) ComposalEntityBase` | Create a PullZone entity instance. |
| `Recorder` | `(data map[string]any) ComposalEntityBase` | Create a Recorder entity instance. |
| `Registry` | `(data map[string]any) ComposalEntityBase` | Create a Registry entity instance. |
| `RegistryV2` | `(data map[string]any) ComposalEntityBase` | Create a RegistryV2 entity instance. |
| `RelayAgentConnection` | `(data map[string]any) ComposalEntityBase` | Create a RelayAgentConnection entity instance. |
| `RelayAgentLocalThread` | `(data map[string]any) ComposalEntityBase` | Create a RelayAgentLocalThread entity instance. |
| `RelaySignal` | `(data map[string]any) ComposalEntityBase` | Create a RelaySignal entity instance. |
| `ReleaseRollout` | `(data map[string]any) ComposalEntityBase` | Create a ReleaseRollout entity instance. |
| `Repo` | `(data map[string]any) ComposalEntityBase` | Create a Repo entity instance. |
| `RepoAccessToken` | `(data map[string]any) ComposalEntityBase` | Create a RepoAccessToken entity instance. |
| `RepoAction` | `(data map[string]any) ComposalEntityBase` | Create a RepoAction entity instance. |
| `RepoAgentCheckpoint` | `(data map[string]any) ComposalEntityBase` | Create a RepoAgentCheckpoint entity instance. |
| `RepoAgentSession` | `(data map[string]any) ComposalEntityBase` | Create a RepoAgentSession entity instance. |
| `RepoBookmarkProtection` | `(data map[string]any) ComposalEntityBase` | Create a RepoBookmarkProtection entity instance. |
| `RepoBookmarkProtectionEvent` | `(data map[string]any) ComposalEntityBase` | Create a RepoBookmarkProtectionEvent entity instance. |
| `RepoCloudWorkspaceBackup` | `(data map[string]any) ComposalEntityBase` | Create a RepoCloudWorkspaceBackup entity instance. |
| `RepoCodeRule` | `(data map[string]any) ComposalEntityBase` | Create a RepoCodeRule entity instance. |
| `RepoSetting` | `(data map[string]any) ComposalEntityBase` | Create a RepoSetting entity instance. |
| `RepoStat` | `(data map[string]any) ComposalEntityBase` | Create a RepoStat entity instance. |
| `RepoVc` | `(data map[string]any) ComposalEntityBase` | Create a RepoVc entity instance. |
| `RepoVcCommit` | `(data map[string]any) ComposalEntityBase` | Create a RepoVcCommit entity instance. |
| `ReportReplay` | `(data map[string]any) ComposalEntityBase` | Create a ReportReplay entity instance. |
| `ReportScenario` | `(data map[string]any) ComposalEntityBase` | Create a ReportScenario entity instance. |
| `RepositoryAccess` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryAccess entity instance. |
| `RepositoryAccessResolve` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryAccessResolve entity instance. |
| `RepositoryEvent` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryEvent entity instance. |
| `RepositoryImport` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryImport entity instance. |
| `RepositoryImportSession` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryImportSession entity instance. |
| `RepositoryImportSessionRepository` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryImportSessionRepository entity instance. |
| `RepositoryImportSessionSelection` | `(data map[string]any) ComposalEntityBase` | Create a RepositoryImportSessionSelection entity instance. |
| `RepositorySandboxEnvironment` | `(data map[string]any) ComposalEntityBase` | Create a RepositorySandboxEnvironment entity instance. |
| `RoderCodeRepair` | `(data map[string]any) ComposalEntityBase` | Create a RoderCodeRepair entity instance. |
| `RoderCodeRepairSetting` | `(data map[string]any) ComposalEntityBase` | Create a RoderCodeRepairSetting entity instance. |
| `RoderMachine` | `(data map[string]any) ComposalEntityBase` | Create a RoderMachine entity instance. |
| `RoderRun` | `(data map[string]any) ComposalEntityBase` | Create a RoderRun entity instance. |
| `RoderWorkspaceCredential` | `(data map[string]any) ComposalEntityBase` | Create a RoderWorkspaceCredential entity instance. |
| `RunArtifact` | `(data map[string]any) ComposalEntityBase` | Create a RunArtifact entity instance. |
| `RunJob` | `(data map[string]any) ComposalEntityBase` | Create a RunJob entity instance. |
| `RunScenarioRun` | `(data map[string]any) ComposalEntityBase` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `(data map[string]any) ComposalEntityBase` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `(data map[string]any) ComposalEntityBase` | Create a RunSearch entity instance. |
| `RunUpdate` | `(data map[string]any) ComposalEntityBase` | Create a RunUpdate entity instance. |
| `RunWorkspaceCredential` | `(data map[string]any) ComposalEntityBase` | Create a RunWorkspaceCredential entity instance. |
| `RunnerLease` | `(data map[string]any) ComposalEntityBase` | Create a RunnerLease entity instance. |
| `RunnerPoolNodeEnrollmentToken` | `(data map[string]any) ComposalEntityBase` | Create a RunnerPoolNodeEnrollmentToken entity instance. |
| `RunnerPoolRunner` | `(data map[string]any) ComposalEntityBase` | Create a RunnerPoolRunner entity instance. |
| `RuntimeInstanceHealthSnapshot` | `(data map[string]any) ComposalEntityBase` | Create a RuntimeInstanceHealthSnapshot entity instance. |
| `SandboxIntegration` | `(data map[string]any) ComposalEntityBase` | Create a SandboxIntegration entity instance. |
| `ScenarioRevision` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRunScenarioEdit entity instance. |
| `SecretGrant` | `(data map[string]any) ComposalEntityBase` | Create a SecretGrant entity instance. |
| `SecretVersion` | `(data map[string]any) ComposalEntityBase` | Create a SecretVersion entity instance. |
| `ServiceEndpoint` | `(data map[string]any) ComposalEntityBase` | Create a ServiceEndpoint entity instance. |
| `Setting` | `(data map[string]any) ComposalEntityBase` | Create a Setting entity instance. |
| `SettingMutationLease` | `(data map[string]any) ComposalEntityBase` | Create a SettingMutationLease entity instance. |
| `Signal` | `(data map[string]any) ComposalEntityBase` | Create a Signal entity instance. |
| `SignalInbound` | `(data map[string]any) ComposalEntityBase` | Create a SignalInbound entity instance. |
| `SignalIntegration` | `(data map[string]any) ComposalEntityBase` | Create a SignalIntegration entity instance. |
| `SignalIntegrationDelivery` | `(data map[string]any) ComposalEntityBase` | Create a SignalIntegrationDelivery entity instance. |
| `SignalIntegrationTarget` | `(data map[string]any) ComposalEntityBase` | Create a SignalIntegrationTarget entity instance. |
| `SignalSubscription` | `(data map[string]any) ComposalEntityBase` | Create a SignalSubscription entity instance. |
| `Site` | `(data map[string]any) ComposalEntityBase` | Create a Site entity instance. |
| `SiteAccessKey` | `(data map[string]any) ComposalEntityBase` | Create a SiteAccessKey entity instance. |
| `SitePreview` | `(data map[string]any) ComposalEntityBase` | Create a SitePreview entity instance. |
| `SiteSecret` | `(data map[string]any) ComposalEntityBase` | Create a SiteSecret entity instance. |
| `SlackChannel` | `(data map[string]any) ComposalEntityBase` | Create a SlackChannel entity instance. |
| `SourceConnection` | `(data map[string]any) ComposalEntityBase` | Create a SourceConnection entity instance. |
| `SpaceAlertRule` | `(data map[string]any) ComposalEntityBase` | Create a SpaceAlertRule entity instance. |
| `SpaceAuditEvent` | `(data map[string]any) ComposalEntityBase` | Create a SpaceAuditEvent entity instance. |
| `SpaceDnsRecord` | `(data map[string]any) ComposalEntityBase` | Create a SpaceDnsRecord entity instance. |
| `SpaceEnrollmentToken` | `(data map[string]any) ComposalEntityBase` | Create a SpaceEnrollmentToken entity instance. |
| `SpaceGateway` | `(data map[string]any) ComposalEntityBase` | Create a SpaceGateway entity instance. |
| `SpaceGroup` | `(data map[string]any) ComposalEntityBase` | Create a SpaceGroup entity instance. |
| `SpaceGroupMembership` | `(data map[string]any) ComposalEntityBase` | Create a SpaceGroupMembership entity instance. |
| `SpaceLogStream` | `(data map[string]any) ComposalEntityBase` | Create a SpaceLogStream entity instance. |
| `SpaceMetricSery` | `(data map[string]any) ComposalEntityBase` | Create a SpaceMetricSery entity instance. |
| `SpaceOtelCollector` | `(data map[string]any) ComposalEntityBase` | Create a SpaceOtelCollector entity instance. |
| `SpacePeer` | `(data map[string]any) ComposalEntityBase` | Create a SpacePeer entity instance. |
| `SpacePeerAttachment` | `(data map[string]any) ComposalEntityBase` | Create a SpacePeerAttachment entity instance. |
| `SpacePolicy` | `(data map[string]any) ComposalEntityBase` | Create a SpacePolicy entity instance. |
| `SpaceSegment` | `(data map[string]any) ComposalEntityBase` | Create a SpaceSegment entity instance. |
| `SpaceTraceSpan` | `(data map[string]any) ComposalEntityBase` | Create a SpaceTraceSpan entity instance. |
| `Spark` | `(data map[string]any) ComposalEntityBase` | Create a Spark entity instance. |
| `SparkAgentIntegration` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentIntegration entity instance. |
| `SparkAgentLocalThread` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentLocalThread entity instance. |
| `SparkAgentSite` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentSite entity instance. |
| `SparkAgentSkill` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentSkill entity instance. |
| `SparkAgentThread` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentThread entity instance. |
| `SparkCredit` | `(data map[string]any) ComposalEntityBase` | Create a SparkCredit entity instance. |
| `SparkCreditAgentUsage` | `(data map[string]any) ComposalEntityBase` | Create a SparkCreditAgentUsage entity instance. |
| `SparkCreditUsageTotal` | `(data map[string]any) ComposalEntityBase` | Create a SparkCreditUsageTotal entity instance. |
| `StaticSite` | `(data map[string]any) ComposalEntityBase` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `(data map[string]any) ComposalEntityBase` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `(data map[string]any) ComposalEntityBase` | Create a StaticSiteDomain entity instance. |
| `StatusChange` | `(data map[string]any) ComposalEntityBase` | Create a StatusChange entity instance. |
| `StatusCommit` | `(data map[string]any) ComposalEntityBase` | Create a StatusCommit entity instance. |
| `StatusPatchset` | `(data map[string]any) ComposalEntityBase` | Create a StatusPatchset entity instance. |
| `StripeWebhook` | `(data map[string]any) ComposalEntityBase` | Create a StripeWebhook entity instance. |
| `SubmitTelemetry` | `(data map[string]any) ComposalEntityBase` | Create a SubmitTelemetry entity instance. |
| `SubscriptionModel` | `(data map[string]any) ComposalEntityBase` | Create a SubscriptionModel entity instance. |
| `SwarmEvent` | `(data map[string]any) ComposalEntityBase` | Create a SwarmEvent entity instance. |
| `SwarmLive` | `(data map[string]any) ComposalEntityBase` | Create a SwarmLive entity instance. |
| `SwarmNote` | `(data map[string]any) ComposalEntityBase` | Create a SwarmNote entity instance. |
| `SwarmTask` | `(data map[string]any) ComposalEntityBase` | Create a SwarmTask entity instance. |
| `TaskLease` | `(data map[string]any) ComposalEntityBase` | Create a TaskLease entity instance. |
| `ThreadPreview` | `(data map[string]any) ComposalEntityBase` | Create a ThreadPreview entity instance. |
| `ThreadPreviewAccess` | `(data map[string]any) ComposalEntityBase` | Create a ThreadPreviewAccess entity instance. |
| `ToolFeedback` | `(data map[string]any) ComposalEntityBase` | Create a ToolFeedback entity instance. |
| `Transcript` | `(data map[string]any) ComposalEntityBase` | Create a Transcript entity instance. |
| `V1Message` | `(data map[string]any) ComposalEntityBase` | Create a V1Message entity instance. |
| `VcBranch` | `(data map[string]any) ComposalEntityBase` | Create a VcBranch entity instance. |
| `VcBrowser` | `(data map[string]any) ComposalEntityBase` | Create a VcBrowser entity instance. |
| `VcChange` | `(data map[string]any) ComposalEntityBase` | Create a VcChange entity instance. |
| `VcChangeGroup` | `(data map[string]any) ComposalEntityBase` | Create a VcChangeGroup entity instance. |
| `VcFile` | `(data map[string]any) ComposalEntityBase` | Create a VcFile entity instance. |
| `VcMergeQueue` | `(data map[string]any) ComposalEntityBase` | Create a VcMergeQueue entity instance. |
| `VcStack` | `(data map[string]any) ComposalEntityBase` | Create a VcStack entity instance. |
| `VcsNode` | `(data map[string]any) ComposalEntityBase` | Create a VcsNode entity instance. |
| `VcsSetting` | `(data map[string]any) ComposalEntityBase` | Create a VcsSetting entity instance. |
| `VerificationProjectCredential` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `(data map[string]any) ComposalEntityBase` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `(data map[string]any) ComposalEntityBase` | Create a VerifyBrowserSession entity instance. |
| `VerifyEmailVerification` | `(data map[string]any) ComposalEntityBase` | Create a VerifyEmailVerification entity instance. |
| `VerifySignalIntegration` | `(data map[string]any) ComposalEntityBase` | Create a VerifySignalIntegration entity instance. |
| `VerifyStaticSiteDomain` | `(data map[string]any) ComposalEntityBase` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `(data map[string]any) ComposalEntityBase` | Create a VersionLog entity instance. |
| `WaitlistApplication` | `(data map[string]any) ComposalEntityBase` | Create a WaitlistApplication entity instance. |
| `WebBotAuth` | `(data map[string]any) ComposalEntityBase` | Create a WebBotAuth entity instance. |
| `WebhookGitlab` | `(data map[string]any) ComposalEntityBase` | Create a WebhookGitlab entity instance. |
| `WorkflowRunStep` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowTriggerSkipped entity instance. |
| `WorkspaceActivity` | `(data map[string]any) ComposalEntityBase` | Create a WorkspaceActivity entity instance. |
| `WorkspaceActivityNotification` | `(data map[string]any) ComposalEntityBase` | Create a WorkspaceActivityNotification entity instance. |
| `WorkspaceSpace` | `(data map[string]any) ComposalEntityBase` | Create a WorkspaceSpace entity instance. |
| `WorkspaceSpacePreference` | `(data map[string]any) ComposalEntityBase` | Create a WorkspaceSpacePreference entity instance. |

### Entity interface (ComposalEntityBase)

All entities implement the `ComposalEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Patch` | `(reqdata, ctrl map[string]any) (any, error)` | Change part of an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Patch` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    adminOrg, err := client.AdminOrg(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // adminOrg is the entity; adminOrg.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### A2aWellKnown

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/control/a2a/{connection_id}/.well-known/agent-card.json`

#### AdminOrg

| Field | Description |
| --- | --- |
| `"billing_email"` |  |
| `"billing_reason"` | Required when setting an agreed price |
| `"customize_onboarding_packages"` |  |
| `"deployment_usage_visibility"` |  |
| `"deployment_usage_visible"` |  |
| `"id"` |  |
| `"monthly_price_dollars"` | Ongoing USD workspace price, for example '50.00' |
| `"monthly_price_override_cents"` |  |
| `"name"` |  |
| `"onboarding_custom_pricing"` |  |
| `"onboarding_package_keys"` | Package keys offered when customizing onboarding. |
| `"owner_email"` |  |
| `"package_id"` | Active customer package public ID. |
| `"skip_payment"` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `"slug"` |  |

Operations: Create, Load, Update.

API path: `/api/v1/admin/organizations/{org_slug}/checkout_session`

#### Agent

| Field | Description |
| --- | --- |
| `"attention"` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `"avatar"` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `"can_delete"` | Whether this viewer may delete this v2 agent. |
| `"can_edit_configuration"` |  |
| `"can_manage"` |  |
| `"can_manage_sharing"` |  |
| `"can_name_managers"` | Whether the viewer may name managers now. |
| `"can_queue_input"` | Current V2 authority to admit a durable input independently of native readiness. |
| `"can_reconcile_save"` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `"configuration"` |  |
| `"configuration_revision"` |  |
| `"configuration_version"` | Opaque version token. |
| `"control_connections_available"` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `"controlling_user_id"` |  |
| `"coordination_available"` | Durable task controls remain available even when native conversation history is unavailable. |
| `"created_at"` |  |
| `"direct_chat_available"` | Advisory availability of direct V1 chat. |
| `"has_unread_updates"` |  |
| `"id"` |  |
| `"last_reply_at"` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `"lifecycle_actions"` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `"lifecycle_version"` | Opaque version token. |
| `"local_agent_control_available"` | Whether this organization exposes paired local coding-agent control. |
| `"managers"` | Teammates named as managers beside the owner. |
| `"model_change_action"` | Advisory composer action. |
| `"name"` |  |
| `"organization_id"` |  |
| `"persona"` |  |
| `"preview"` |  |
| `"preview_received_at"` | When a newer canonical conversation preview was first projected. |
| `"provisioning"` |  |
| `"reply_triage"` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `"runtime_version"` | Immutable execution runtime selected at creation. |
| `"setup_pending"` |  |
| `"sharing_fixed"` | Project agents have a fixed audience and cannot change visibility. |
| `"sharing_version"` |  |
| `"slug"` | Optional explicit API alias. |
| `"status"` |  |
| `"team_role"` | What teammates may do once the agent is shared with the team. |
| `"updated_at"` |  |
| `"url_slug"` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `"visibility"` | Defaults to organization. |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened`

#### AgentApp

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"can_message"` | The viewer may send input to the author agent |
| `"deployments_count"` | Increases with every deploy of the site |
| `"description"` |  |
| `"hidden_install_count"` | Installs by agents the viewer cannot open |
| `"id"` |  |
| `"install_count"` |  |
| `"installed_by"` |  |
| `"installed_target_ids"` | Install targets of the viewer that have this app installed |
| `"mcp_url"` |  |
| `"owner"` | The person who controls the author agent |
| `"thread"` | The thread that published the app, when the viewer can open the author agent |
| `"title"` |  |
| `"url"` |  |
| `"visibility"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/opened`

#### AgentAppInstall

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"installed"` |  |

Operations: Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_apps/{id}/installs/{agent_id}`

#### AgentAttachment

| Field | Description |
| --- | --- |
| `"byte_size"` |  |
| `"content_type"` |  |
| `"file_name"` |  |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete`

#### AgentAutomation

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"can_manage_events"` | Whether new event triggers can be attached or existing settings saved. |
| `"can_run"` | Whether the viewer can request a manual Temporal run |
| `"can_schedule"` |  |
| `"definition"` |  |
| `"event_subscriptions"` |  |
| `"event_triggers"` |  |
| `"expected_revision"` |  |
| `"id"` |  |
| `"key"` |  |
| `"name"` |  |
| `"revision"` |  |
| `"schedule"` |  |
| `"schedules"` |  |
| `"version"` |  |

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
| `"description"` |  |
| `"display_name"` |  |
| `"name"` |  |
| `"skill_model_visible"` |  |
| `"source"` |  |

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
| `"actions"` |  |
| `"activity"` |  |
| `"admin_disabled_at"` |  |
| `"agent_tools"` |  |
| `"authentication"` |  |
| `"authorized_at"` |  |
| `"can_create_account"` | Whether another account can be created directly from this provider. |
| `"capabilities"` |  |
| `"catalog_section"` | Server-owned grouping in the agent integration catalog. |
| `"category"` | Short product label, such as CRM or Email. |
| `"certification"` |  |
| `"checked_at"` |  |
| `"connection"` |  |
| `"consent"` |  |
| `"created_at"` |  |
| `"creation_key"` | Reuse the same key to recover the account after an interrupted response. |
| `"custodian_id"` |  |
| `"description"` | One-line catalog description of the app. |
| `"disabled_reason"` |  |
| `"failure_code"` |  |
| `"generation"` |  |
| `"grants"` |  |
| `"grants_pagination"` |  |
| `"id"` |  |
| `"limits"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"owner_name"` |  |
| `"ownership_kind"` |  |
| `"pagination"` |  |
| `"policy_digest"` |  |
| `"provider"` |  |
| `"provider_disabled_reason"` |  |
| `"provider_identity"` |  |
| `"revoked_at"` |  |
| `"schema_version"` |  |
| `"status"` |  |
| `"toolkit"` |  |
| `"triggers"` |  |
| `"updated_at"` |  |
| `"user_id"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody`

#### AgentConnectionDelegation

| Field | Description |
| --- | --- |
| `"authorized_by_id"` |  |
| `"automation_connection_grant_id"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"member_name"` |  |
| `"revoked_at"` |  |
| `"roles"` |  |
| `"usable"` |  |
| `"user_id"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/delegations`

#### AgentConnectionGrant

| Field | Description |
| --- | --- |
| `"actions"` |  |
| `"agent_connection_id"` |  |
| `"automation_id"` |  |
| `"connection_generation"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"organization_id"` |  |
| `"revision"` |  |
| `"revoked_at"` |  |
| `"status"` |  |
| `"usable"` |  |
| `"user_id"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/grants`

#### AgentConnectionResource

| Field | Description |
| --- | --- |
| `"cursor"` |  |
| `"next_cursor"` |  |
| `"query"` |  |
| `"resources"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{id}/resources`

#### AgentConnectionSafetyControl

| Field | Description |
| --- | --- |
| `"admin_disabled_at"` |  |
| `"authorized_at"` |  |
| `"checked_at"` |  |
| `"created_at"` |  |
| `"custodian_id"` |  |
| `"failure_code"` |  |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"owner_name"` |  |
| `"ownership_kind"` |  |
| `"provider_disabled_reason"` |  |
| `"provider_identity"` |  |
| `"revoked_at"` |  |
| `"status"` |  |
| `"toolkit"` |  |
| `"updated_at"` |  |
| `"user_id"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_connections/safety_controls`

#### AgentConnectionTriggerSubscription

| Field | Description |
| --- | --- |
| `"agent_connection_id"` |  |
| `"configuration"` |  |
| `"created_at"` |  |
| `"defaults"` |  |
| `"delivery"` |  |
| `"enabled"` |  |
| `"failure_code"` |  |
| `"failure_request_id"` |  |
| `"id"` |  |
| `"latency"` |  |
| `"name"` |  |
| `"reconcile_at"` |  |
| `"reconciliation_uncertain"` |  |
| `"remote_enabled"` |  |
| `"replacement_id"` |  |
| `"retired_at"` |  |
| `"retirement_completed_at"` |  |
| `"schema"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"toolkit"` |  |
| `"toolkit_version"` |  |
| `"trigger_slug"` |  |
| `"updated_at"` |  |
| `"version"` |  |
| `"waiting_for_retirement"` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover`

#### AgentContextCheckpoint

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/agent_context/checkpoints/{checkpoint_id}/transcript`

#### AgentControlFlow

| Field | Description |
| --- | --- |
| `"can_cancel"` |  |
| `"cancellation_requested"` |  |
| `"device_name"` |  |
| `"flow_id"` |  |
| `"id"` |  |
| `"providers"` |  |
| `"repair_of_flow_id"` | Original retained workflow for an explicitly repaired failed task. |
| `"status_label"` |  |
| `"step_count"` |  |
| `"title"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/control_flows/{flow_id}/cancel`

#### AgentCoordination

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/stop`

#### AgentEmail

| Field | Description |
| --- | --- |
| `"delivery"` | What SES reported for mail the agent sent; null for received mail |
| `"direction"` | inbound: mail the agent received; outbound: mail it sent |
| `"from"` |  |
| `"id"` |  |
| `"preview"` |  |
| `"received_at"` |  |
| `"recipient_tag"` | The +tag the sender used, if any |
| `"spam"` | SES judged it spam |
| `"subject"` |  |
| `"text"` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `"to"` |  |

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
| `"content_type"` |  |
| `"download_url"` |  |
| `"filename"` |  |
| `"id"` |  |
| `"size_bytes"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/files/{file_id}`

#### AgentInput

| Field | Description |
| --- | --- |
| `"attachment_ids"` | Completed uploads from the attachments endpoint, in order. |
| `"attachments"` |  |
| `"browser_context"` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `"client_time"` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `"conversation_id"` | Main or a conversation identity returned by the agent thread list. |
| `"model_policy"` |  |
| `"requester_membership_id"` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `"speed"` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `"text"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/inputs`

#### AgentIntegration

| Field | Description |
| --- | --- |
| `"account_counts"` | Accounts the viewer can see per toolkit, across all account pages. |
| `"can_cancel_sign_in"` | The viewer can cancel the unfinished authorization attempt. |
| `"can_delete"` |  |
| `"can_disconnect"` |  |
| `"can_enable"` |  |
| `"can_manage"` |  |
| `"can_manage_sharing"` |  |
| `"can_reconnect"` |  |
| `"can_sync"` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `"catalog"` |  |
| `"connected_by"` | Name of the person whose sign-in this account is. |
| `"connected_by_you"` | True when the viewer is the person whose sign-in this account is. |
| `"connected_counts"` | Signed-in accounts per toolkit, across all account pages. |
| `"connections"` |  |
| `"creation_key"` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `"creation_key_digest"` | SHA-256 of the unfinished setup key for its original creator. |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"pagination"` |  |
| `"pending_counts"` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `"provider_disabled_reason"` |  |
| `"provider_identity"` |  |
| `"provider_name"` | The app's display name; null for a custom MCP server, which uses the account name. |
| `"reference"` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `"sharing_status"` | Agent account audience, including legacy personal and paused access. |
| `"status"` |  |
| `"team_sharing_enabled"` |  |
| `"team_sharing_version"` |  |
| `"toolkit"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/agent_integrations/{id}/authorize`

#### AgentIntegrationAccount

| Field | Description |
| --- | --- |
| `"can_cancel_sign_in"` | The viewer can cancel the unfinished authorization attempt. |
| `"can_delete"` |  |
| `"can_disconnect"` |  |
| `"can_enable"` |  |
| `"can_manage_sharing"` |  |
| `"can_reconnect"` |  |
| `"can_sync"` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `"connected_by"` | Name of the person whose sign-in this account is. |
| `"connected_by_you"` | True when the viewer is the person whose sign-in this account is. |
| `"creation_key_digest"` | SHA-256 of the unfinished setup key for its original creator. |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"provider_disabled_reason"` |  |
| `"provider_identity"` |  |
| `"reference"` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `"sharing_status"` | Agent account audience, including legacy personal and paused access. |
| `"status"` |  |
| `"team_sharing_enabled"` |  |
| `"team_sharing_version"` |  |
| `"toolkit"` |  |

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
| `"id"` |  |
| `"interactions"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel`

#### AgentLibrary

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/library/{artifact_id}/download`

#### AgentManager

| Field | Description |
| --- | --- |
| `"attention"` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `"avatar"` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `"can_delete"` | Whether this viewer may delete this v2 agent. |
| `"can_edit_configuration"` |  |
| `"can_manage"` |  |
| `"can_manage_sharing"` |  |
| `"can_name_managers"` | Whether the viewer may name managers now. |
| `"can_queue_input"` | Current V2 authority to admit a durable input independently of native readiness. |
| `"can_reconcile_save"` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `"configuration"` |  |
| `"configuration_revision"` |  |
| `"configuration_version"` | Opaque version token. |
| `"control_connections_available"` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `"controlling_user_id"` |  |
| `"coordination_available"` | Durable task controls remain available even when native conversation history is unavailable. |
| `"created_at"` |  |
| `"direct_chat_available"` | Advisory availability of direct V1 chat. |
| `"has_unread_updates"` |  |
| `"id"` |  |
| `"last_reply_at"` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `"lifecycle_actions"` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `"lifecycle_version"` | Opaque version token. |
| `"local_agent_control_available"` | Whether this organization exposes paired local coding-agent control. |
| `"managers"` | Teammates named as managers beside the owner. |
| `"model_change_action"` | Advisory composer action. |
| `"name"` |  |
| `"organization_id"` |  |
| `"persona"` |  |
| `"preview"` |  |
| `"preview_received_at"` | When a newer canonical conversation preview was first projected. |
| `"provisioning"` |  |
| `"reply_triage"` | A model's verdict on the agent's latest reply, judged once when it arrived. |
| `"runtime_version"` | Immutable execution runtime selected at creation. |
| `"setup_pending"` |  |
| `"sharing_fixed"` | Project agents have a fixed audience and cannot change visibility. |
| `"sharing_version"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"team_role"` | What teammates may do once the agent is shared with the team. |
| `"updated_at"` |  |
| `"url_slug"` | Stable organization-scoped browser name for /ORG/agent/NAME. |
| `"user_id"` |  |
| `"visibility"` |  |

Operations: Create, Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/managers`

#### AgentManagerChoice

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/manager_choices`

#### AgentMarketplace

| Field | Description |
| --- | --- |
| `"bundle"` |  |
| `"can_manage"` |  |
| `"catalog_key"` | Stable key of a Composal listing, which names its character; null for other listings. |
| `"categories"` |  |
| `"category"` |  |
| `"counts"` |  |
| `"created_at"` |  |
| `"expected_version"` |  |
| `"explainer"` | The listing's public write-up in Markdown. |
| `"featured"` |  |
| `"from_composal"` | One of Composal's ready-made listings. |
| `"id"` |  |
| `"installs_count"` |  |
| `"instructions"` |  |
| `"integration_toolkits"` |  |
| `"integrations"` |  |
| `"listing"` |  |
| `"listings"` |  |
| `"memories"` |  |
| `"name"` |  |
| `"next_page"` |  |
| `"organization_name"` |  |
| `"page_apps"` |  |
| `"publisher_avatar_url"` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `"publisher_name"` | "Composal" on listings Composal publishes. |
| `"sections"` |  |
| `"share_token"` | Present only for people who manage the listing. |
| `"skills"` |  |
| `"slug"` | Readable, permanent address segment: /marketplace/<slug>. |
| `"source_agent_id"` | The V2 agent this listing was published from. |
| `"summary"` |  |
| `"updated_at"` |  |
| `"version"` |  |
| `"viewer"` | Who a public marketplace response was read for. |
| `"visibility"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agent_marketplace/{id}/install`

#### AgentMarketplaceShared

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"catalog_key"` | Stable key of a Composal listing, which names its character; null for other listings. |
| `"category"` |  |
| `"counts"` |  |
| `"created_at"` |  |
| `"explainer"` | The listing's public write-up in Markdown. |
| `"featured"` |  |
| `"from_composal"` | One of Composal's ready-made listings. |
| `"id"` |  |
| `"installs_count"` |  |
| `"instructions"` |  |
| `"integration_toolkits"` |  |
| `"integrations"` |  |
| `"listing"` |  |
| `"memories"` |  |
| `"name"` |  |
| `"organization_name"` |  |
| `"page_apps"` |  |
| `"publisher_avatar_url"` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `"publisher_name"` | "Composal" on listings Composal publishes. |
| `"share_token"` | Present only for people who manage the listing. |
| `"skills"` |  |
| `"slug"` | Readable, permanent address segment: /marketplace/<slug>. |
| `"summary"` |  |
| `"updated_at"` |  |
| `"version"` |  |
| `"viewer"` | Who a public marketplace response was read for. |
| `"visibility"` |  |

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
| `"arguments"` | JSON object limited to 65536 encoded bytes. |
| `"id"` |  |
| `"key"` |  |
| `"name"` |  |
| `"operation"` |  |
| `"participant"` |  |
| `"requester_id"` | Signed-in user public ID returned by discovery. |
| `"scope_key"` |  |

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
| `"id"` |  |
| `"number"` |  |
| `"owners"` |  |
| `"repository"` |  |
| `"status"` |  |
| `"title"` |  |
| `"url"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/pull_requests`

#### AgentQuestion

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/questions/{question_id}/answer`

#### AgentRelayFileGrant

| Field | Description |
| --- | --- |
| `"access_mode"` |  |
| `"connection_generation"` |  |
| `"connection_id"` |  |
| `"connection_name"` | Current display name of the selected account. |
| `"created_at"` |  |
| `"expected_generation"` |  |
| `"id"` |  |
| `"key"` |  |
| `"provider"` |  |
| `"resource_id"` |  |
| `"resource_kind"` |  |
| `"revoked"` |  |
| `"revoked_at"` |  |
| `"snapshot_supported"` | Whether this selected permission supports snapshot controls. |
| `"source_operation_id"` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/agent_relay_file_grants`

#### AgentRelayFileGrantAccount

| Field | Description |
| --- | --- |
| `"access_modes"` | Supported file access modes. |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"resource_kind"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agent_relay_file_grants/accounts`

#### AgentRepository

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"environments"` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `"expected_version"` |  |
| `"id"` |  |
| `"repository_choices"` |  |
| `"repository_choices_error"` | GitHub discovery warning. |
| `"repository_choices_truncated"` |  |
| `"version"` |  |
| `"work_repositories"` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories`

#### AgentResource

| Field | Description |
| --- | --- |
| `"name"` |  |
| `"uri"` |  |

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
| `"can_manage"` |  |
| `"consecutive_errors"` |  |
| `"credit_wait"` | The wallet funding an enabled routine that is waiting for inference credit. |
| `"description"` |  |
| `"enabled"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"last_error"` |  |
| `"last_run_at"` |  |
| `"last_status"` |  |
| `"managed"` |  |
| `"name"` |  |
| `"next_run_at"` |  |
| `"routine"` |  |
| `"schedule"` |  |
| `"schedule_label"` |  |
| `"utility_model"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/routines`

#### AgentRun

| Field | Description |
| --- | --- |
| `"error"` |  |
| `"id"` |  |
| `"run_id"` |  |
| `"status"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/runs/{run_id}`

#### AgentRuntime

| Field | Description |
| --- | --- |
| `"available_profiles"` |  |
| `"can_manage"` |  |
| `"can_reset"` |  |
| `"image"` |  |
| `"memory_mb"` |  |
| `"platform"` |  |
| `"profile"` |  |
| `"provider"` |  |
| `"state"` |  |
| `"version"` |  |
| `"volume"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/runtime/reset`

#### AgentSession

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/agent_sessions/{session_id}/transcript`

#### AgentSessionCheckpoint

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize`

#### AgentSessionRoderHandoff

| Field | Description |
| --- | --- |
| `"checkpoint_id"` | Public id of the checkpoint to hand off. |
| `"purpose"` | Handoff intent; defaults to `continue`. |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs`

#### AgentSetting

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"expected_version"` |  |
| `"instructions"` |  |
| `"version"` |  |

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
| `"author"` |  |
| `"can_message"` | The viewer may send input to the author agent |
| `"deployments_count"` | Increases with every deploy of the site |
| `"description"` | The team app description, when the site is a team app |
| `"icon_url"` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `"id"` |  |
| `"name"` | The site's DNS label |
| `"owner"` | The person who controls the author agent |
| `"thread"` | The thread that published the site as a team app, when the viewer can open the author agent |
| `"title"` | The team app title, or the site name read as words |
| `"url"` |  |
| `"visibility"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agent_sites/{id}/opened`

#### AgentSkill

| Field | Description |
| --- | --- |
| `"agents"` | Active V2 agents the viewer can see whose owner is still a member |
| `"audience"` |  |
| `"can_manage_library"` |  |
| `"content"` | The skill's SKILL.md |
| `"files"` |  |
| `"id"` |  |
| `"marketplace"` |  |
| `"pending"` | Some agent is still applying a change; check again shortly |
| `"plugin"` | The marketplace entry id |
| `"revision"` | The commit SHA returned by preview |
| `"skill"` |  |
| `"skills"` |  |
| `"source"` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

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
| `"active"` |  |
| `"attention"` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `"ended_at"` |  |
| `"id"` |  |
| `"model"` |  |
| `"parent_id"` |  |
| `"preview"` |  |
| `"started_at"` |  |
| `"state"` | What the thread is to the viewer. |
| `"status"` |  |
| `"title"` |  |
| `"updated_at"` |  |

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
| `"base_bookmark"` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `"base_ref"` |  |
| `"base_revision"` | 64-hex commit id; skips the head lookup |
| `"budget"` |  |
| `"canceled_at"` |  |
| `"canceled_count"` |  |
| `"concurrency_key"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"creator_user_id"` |  |
| `"deadline_at"` |  |
| `"display_id"` |  |
| `"done_count"` |  |
| `"environment"` |  |
| `"failed_count"` |  |
| `"finished_at"` |  |
| `"finished_at_label"` |  |
| `"github"` |  |
| `"goal"` |  |
| `"id"` |  |
| `"model"` |  |
| `"model_provider"` |  |
| `"number"` |  |
| `"organization_id"` |  |
| `"organization_slug"` |  |
| `"outcome"` |  |
| `"phase"` |  |
| `"policy"` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `"queued_at"` |  |
| `"queued_at_label"` |  |
| `"repository"` | Repository slug inside the organization |
| `"repository_id"` |  |
| `"repository_slug"` |  |
| `"reserved"` |  |
| `"scheduler_generation"` |  |
| `"skipped_count"` |  |
| `"slug"` |  |
| `"started_at"` |  |
| `"started_at_label"` |  |
| `"status"` |  |
| `"summary"` |  |
| `"target"` | Where the swarm lands. |
| `"task_count"` |  |
| `"task_template_json"` |  |
| `"tasks"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"usage"` |  |

Operations: Create, List, Load, Update.

API path: `/api/v1/agent/swarms/{id}/cancel`

#### AgentTeammate

| Field | Description |
| --- | --- |
| `"avatar"` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `"id"` |  |
| `"name"` |  |
| `"persona"` |  |
| `"slug"` |  |

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
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/agent/threads/{id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"inputSchema"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools`

#### AgentUsage

| Field | Description |
| --- | --- |
| `"days"` | One cell per (day, model), ascending by day then model. |
| `"ended_at"` |  |
| `"pricing_version"` | The price table in effect now; rows carry the version they were priced at. |
| `"source"` | Which store served the rows. |
| `"started_at"` |  |
| `"user_days"` | One cell per (day, person), ascending by day. |
| `"users"` | One row per (person, model), descending by tokens. |
| `"window"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/agent_usage`

#### AgentVerifyProject

| Field | Description |
| --- | --- |
| `"available"` | Whether Verify is on for the organization; hide Verify access when false. |
| `"can_manage"` | Whether the viewer can manage the agent and is a Verify admin. |
| `"expected_version"` |  |
| `"id"` |  |
| `"name"` |  |
| `"project_choices"` | Every granted project, then other Verify projects up to the choice limit. |
| `"project_choices_truncated"` |  |
| `"slug"` |  |
| `"verify_projects"` |  |
| `"version"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/verify_projects`

#### AgentWait

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/waits/{wait_id}/stop`

#### AgentWebPreview

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"icon_url"` |  |
| `"image_url"` |  |
| `"title"` |  |

Operations: Load.

API path: `/api/v1/agent_web_previews`

#### AgentWebhook

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"connection"` |  |
| `"deliveries"` |  |
| `"event_types"` |  |
| `"expected_generation"` |  |
| `"id"` |  |
| `"max_events_per_day"` |  |
| `"name"` |  |
| `"purpose"` |  |
| `"signing_key"` | Revealed only by the first successful creation or rotation response. |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks`

#### AgentWork

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/work/{work_id}/handled`

#### AgentWorkflow

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"expected_digest"` |  |
| `"path"` |  |
| `"source"` | At most 262144 UTF-8 bytes |
| `"template"` | A template id from the catalog's templates |
| `"templates"` |  |
| `"truncated"` |  |
| `"workflows"` |  |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflows`

#### AgentWorkflowProposal

| Field | Description |
| --- | --- |
| `"agent_steps"` | The model and reasoning the workflow's agent steps share. |
| `"base_digest"` | The saved workflow this proposal changes; null for a new workflow. |
| `"can_manage"` |  |
| `"can_revise"` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `"can_save"` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `"can_set_trigger"` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `"created_at"` |  |
| `"definition"` |  |
| `"digest"` | Names the reviewed version, its source and trigger; send it to save this version. |
| `"error"` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `"id"` |  |
| `"model_choices"` | Models the viewer may choose for the agent steps before saving. |
| `"name"` |  |
| `"native_rows"` |  |
| `"path"` |  |
| `"pipeline_checkpoints"` |  |
| `"pipeline_commands"` |  |
| `"reasoning_choices"` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `"runs_on_earlier_version"` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `"saved"` |  |
| `"stale"` | The workflow changed since the proposal, so it cannot be saved. |
| `"starts"` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `"trigger_error"` | Why the save could not set the trigger; only in the reply to that save. |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise`

#### AgentWorkflowRun

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"automation"` | Saved native automation identity. |
| `"budget_seconds"` | The run stops once it has been running this long |
| `"budget_usd"` | The run stops before a step once it has spent this much |
| `"can_answer"` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `"can_approve"` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `"can_dismiss"` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `"checkpoint"` | The question a run waiting at a checkpoint is asking |
| `"conversation_id"` | The thread the run works in, which the person opens to follow it |
| `"decision_history"` |  |
| `"error"` |  |
| `"finished_at"` |  |
| `"flow_steps"` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `"id"` | Public run ID. |
| `"needs_you"` | Whether a step stopped the run for the person, who can answer it |
| `"note"` | One sentence a workflow step left for the person, which the run's card leads with |
| `"nothing_to_do_reason"` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `"resume_count"` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `"retry_step_id"` |  |
| `"running_seconds"` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `"source"` |  |
| `"spent_tokens"` | The tokens the run's agent steps have used so far |
| `"spent_usd"` | What the run's agent steps have cost so far, as the agent reported it |
| `"stalled"` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `"started_at"` |  |
| `"started_by"` | The event that started the run |
| `"status"` |  |
| `"step_count"` |  |
| `"steps"` |  |
| `"trigger_id"` | The run settings that started it, for a run an event or schedule started |
| `"wake_at"` | When a sleeping run's step looks again |
| `"workflow_digest"` | SHA-256 of the immutable definition this run uses |
| `"workflow_path"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer`

#### AgentWorkflowTrigger

| Field | Description |
| --- | --- |
| `"budget"` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `"can_manage"` |  |
| `"can_pause"` | It is running, so a manager can pause it |
| `"can_resume"` | A person paused it, so a manager can resume it |
| `"can_review"` | The file changed and nobody checked it, so a manager can review it and resume |
| `"daily_limit"` | How many events a day may start an event workflow's runs |
| `"day_resets_at"` | When the daily count starts again, at the organization's midnight |
| `"id"` |  |
| `"kind"` |  |
| `"next_due_at"` |  |
| `"pause_cause"` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `"paused"` | The workflow starts nothing until a person resumes or checks it |
| `"read_at"` | The settings_changed_at you read; a change made since is refused |
| `"run_budget_usd"` |  |
| `"schedule"` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `"settings_changed_at"` | When a person or the agent last changed the run settings; sent back with a change |
| `"skipped_today"` | Events skipped today, over the daily limit or while paused |
| `"stale_at"` | When the workflow was paused; it starts nothing until resumed |
| `"stale_reason"` |  |
| `"starts"` | What events start an event workflow, as a proposal's start shows them |
| `"subscription_id"` | The event subscription that starts it |
| `"time_zone"` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `"today_count"` | Events that started a run today, for an event workflow |
| `"trigger"` |  |
| `"workflow_path"` |  |

Operations: List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers`

#### AgentWorkspace

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"can_delete"` |  |
| `"can_keep"` |  |
| `"cleanup_after"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"name"` |  |
| `"reason"` |  |
| `"state"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workspaces`

#### AgentWritePermission

| Field | Description |
| --- | --- |
| `"account"` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `"granted_at"` |  |
| `"granted_by"` |  |
| `"id"` |  |
| `"in_effect"` | Whether the permission approves writes now. |
| `"last_used_at"` |  |
| `"tool"` | The tool the agent writes with, such as linear.update_issue. |

Operations: List, Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/write_permissions`

#### Agreement

| Field | Description |
| --- | --- |
| `"body"` | Markdown text, or null until staff grant the organization access. |
| `"effective_on_label"` |  |
| `"key"` |  |
| `"summary"` |  |
| `"title"` |  |
| `"version"` |  |

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
| `"id"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge`

#### AllocationLog

| Field | Description |
| --- | --- |
| `"allocation_id"` |  |
| `"environment"` |  |
| `"fetched_at"` |  |
| `"location"` |  |
| `"logs"` |  |
| `"namespace"` |  |
| `"offset"` |  |
| `"origin"` |  |
| `"service"` |  |
| `"task"` |  |
| `"type"` |  |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs`

#### App

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"description"` |  |
| `"framework"` |  |
| `"id"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"repository_id"` |  |
| `"repository_kind"` |  |
| `"root_path"` |  |
| `"root_path_display"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

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
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"cache_path_prefix"` |  |
| `"cache_settings_json"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"distribution_kind"` |  |
| `"edge_hostname"` |  |
| `"failure_message"` |  |
| `"hosted_app_id"` |  |
| `"hostnames"` |  |
| `"id"` |  |
| `"last_deployed_at"` |  |
| `"last_deployed_at_label"` |  |
| `"last_purged_at"` |  |
| `"last_purged_at_label"` |  |
| `"last_synced_at"` |  |
| `"last_synced_at_label"` |  |
| `"name"` |  |
| `"origin_url"` |  |
| `"provisioned"` |  |
| `"routing_settings_json"` |  |
| `"security_settings_json"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{id}/archive`

#### AppConfigVariable

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"description"` |  |
| `"exposed_to_build"` |  |
| `"has_value"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"key"` |  |
| `"scope_kind"` |  |
| `"updated_at"` |  |
| `"value"` |  |
| `"value_kind"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/config_variables/{id}/disable`

#### AppDataResource

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"created_at"` |  |
| `"engine"` |  |
| `"failure_message"` |  |
| `"high_availability"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"name"` |  |
| `"plan"` |  |
| `"provider_metadata"` |  |
| `"region"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"storage_gb"` |  |
| `"storage_label"` |  |
| `"updated_at"` |  |
| `"version"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/data_resources/{id}/archive`

#### AppDeploy

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"channel"` |  |
| `"command"` |  |
| `"commit_sha"` |  |
| `"desired_instances"` |  |
| `"environment"` | Environment slug or public ID, all, or existing. |
| `"image"` |  |
| `"region"` |  |
| `"rollout_predecessor"` | Public deployment operation ID from the same app that must succeed before this rollout starts. |
| `"service"` | Service slug or public ID; required unless app_service_id is supplied. |
| `"source_ref"` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/deploys`

#### AppDeployment

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"app_service_placement_id"` |  |
| `"artifact_locator"` |  |
| `"build_role"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"creator_user_id"` |  |
| `"deployed_url"` |  |
| `"display_id"` |  |
| `"failure_message"` |  |
| `"finished_at"` |  |
| `"finished_at_label"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"is_rollback"` |  |
| `"location"` |  |
| `"location_id"` |  |
| `"number"` |  |
| `"operation_key"` |  |
| `"organization_id"` |  |
| `"rollback_reason"` |  |
| `"rollback_source_deployment_id"` |  |
| `"rollback_source_release_id"` |  |
| `"rollback_target_release_id"` |  |
| `"source_ref"` |  |
| `"started_at"` |  |
| `"started_at_label"` |  |
| `"status"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/deployments/{id}/cancel`

#### AppDeploymentOperation

| Field | Description |
| --- | --- |
| `"app"` |  |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"app_service_placement_id"` |  |
| `"artifact_locator"` |  |
| `"build_duration_seconds"` |  |
| `"build_source"` |  |
| `"build_status"` |  |
| `"children"` |  |
| `"ci_pipeline_id"` |  |
| `"ci_pipeline_run_id"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"creator"` |  |
| `"deployed_url"` |  |
| `"duration_seconds"` |  |
| `"environment"` |  |
| `"failure_message"` |  |
| `"finished_at"` |  |
| `"history_kind"` |  |
| `"history_reason"` |  |
| `"id"` |  |
| `"is_live"` |  |
| `"is_rollback"` |  |
| `"live_region_count"` |  |
| `"location_id"` |  |
| `"number"` |  |
| `"placement"` |  |
| `"region_count"` |  |
| `"replicas_per_region"` |  |
| `"rollback_reason"` |  |
| `"rollback_source_release_id"` |  |
| `"rollback_target_release_id"` |  |
| `"rollout_predecessor_id"` |  |
| `"rollout_status"` |  |
| `"rollout_strategy"` |  |
| `"service"` |  |
| `"source_ref"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"total_replicas"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel`

#### AppDeploymentRollback

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_id"` |  |
| `"app_service_id"` |  |
| `"blockers"` |  |
| `"candidate_releases"` |  |
| `"confirmation_text"` |  |
| `"current_deployment"` |  |
| `"current_release"` |  |
| `"deployment"` |  |
| `"desired_state"` |  |
| `"environment"` |  |
| `"execution_allowed"` |  |
| `"force"` |  |
| `"idempotency_key"` |  |
| `"idempotent_reuse"` |  |
| `"location"` |  |
| `"operation"` |  |
| `"reason"` |  |
| `"rollback_release"` |  |
| `"rollout"` |  |
| `"service"` |  |
| `"target_artifact_locator"` |  |
| `"target_release"` |  |
| `"to"` |  |
| `"warnings"` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/deployment_rollbacks`

#### AppEnvironment

| Field | Description |
| --- | --- |
| `"auto_deploy"` |  |
| `"base_domain"` |  |
| `"branch_pattern"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"location"` |  |
| `"location_id"` |  |
| `"name"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/environments/{id}/archive`

#### AppLocation

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"location_id"` |  |
| `"name"` |  |
| `"nomad_datacenter"` |  |
| `"updated_at"` |  |

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
| `"access"` |  |
| `"app_preview_profile_id"` |  |
| `"change_number"` | Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. |
| `"expected_generation"` | Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409. |
| `"expected_patchset"` | Optional public Change patchset fence; stale selections return 409. |
| `"expires_at"` |  |
| `"id"` |  |
| `"name"` |  |
| `"resource_overrides"` | Service public IDs mapped to resource overrides. |
| `"retained"` |  |
| `"shared_data_binding_ids"` | Replace explicitly shared captured native data connections. |
| `"shared_service_binding_ids"` | Replace the explicitly shared captured service dependencies. |
| `"slug"` |  |
| `"source_ref"` |  |
| `"storage_binding_resources"` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/archive`

#### AppPreviewProfile

| Field | Description |
| --- | --- |
| `"automatic"` |  |
| `"configuration"` |  |
| `"created_at"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"name"` |  |
| `"slug"` |  |
| `"source_environment_id"` |  |
| `"ttl_days"` |  |
| `"updated_at"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles`

#### AppRun

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"image"` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

Operations: Create, Load.

API path: `/api/v1/hosting/app_runs/{id}/cancel`

#### AppSecret

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"description"` |  |
| `"env_key"` |  |
| `"expose_to_build"` |  |
| `"has_value"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"latest_version_number"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"rotation_policy"` |  |
| `"scope_kind"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"value"` |  |
| `"value_digest"` |  |
| `"value_kind"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/secrets/{id}/set_value`

#### AppService

| Field | Description |
| --- | --- |
| `"auto_deploy"` |  |
| `"bindings"` |  |
| `"build_command"` |  |
| `"cpu_label"` |  |
| `"cpu_mhz"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"deploy_paths"` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `"desired_instances"` |  |
| `"disk_label"` |  |
| `"disk_mb"` |  |
| `"effective_deploy_paths"` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `"healthcheck_path"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"internal_port"` |  |
| `"kind"` |  |
| `"memory_label"` |  |
| `"memory_max_label"` |  |
| `"memory_max_mb"` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `"memory_mb"` |  |
| `"name"` |  |
| `"nomad_constraints_json"` |  |
| `"nomad_kill_timeout_seconds"` | Seconds the task gets after SIGTERM before SIGKILL. |
| `"nomad_namespace"` |  |
| `"nomad_region"` |  |
| `"nomad_shutdown_delay_seconds"` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `"nomad_ulimits_json"` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `"nomad_update_strategy_json"` |  |
| `"prestart_command"` |  |
| `"publicly_accessible"` |  |
| `"release_command"` |  |
| `"repo_source_path"` |  |
| `"runtime"` |  |
| `"runtime_adapter_kind"` |  |
| `"runtime_adapter_settings_json"` |  |
| `"schedule"` |  |
| `"slug"` |  |
| `"source_path"` |  |
| `"start_command"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{id}/archive`

#### AppServiceBinding

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable`

#### AppServicePlacement

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"deployment_channel"` | Preview-only override; null inherits the captured source channel. |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"mode"` |  |
| `"organization_id"` |  |
| `"region_count"` |  |
| `"replicas_per_region"` |  |
| `"rollout_strategy"` |  |
| `"targets"` |  |
| `"total_replicas"` |  |
| `"updated_at"` |  |

Operations: List, Load, Update.

API path: `/api/v1/hosting/apps/{app_id}/service_placements`

#### AppStorageResource

| Field | Description |
| --- | --- |
| `"access_mode"` | Object-store semantics only; ignored for volume resources |
| `"app_environment_id"` |  |
| `"attachment"` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `"capacity_gb"` | Enforced for nomad_csi (minimum 10 GB). |
| `"capacity_label"` |  |
| `"created_at"` |  |
| `"ephemeral"` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `"external_volume_id"` | Nomad/CSI volume id assigned at provisioning |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"location_code"` |  |
| `"location_id"` | Volume datacenter pin (volume kind only) |
| `"mount_path"` |  |
| `"name"` |  |
| `"provider"` | Storage backend. |
| `"provider_error"` | Last provisioning/teardown error from the storage provider |
| `"region"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive`

#### Artefact

| Field | Description |
| --- | --- |
| `"automation_invocation_id"` |  |
| `"byte_size"` |  |
| `"checksum_sha256"` |  |
| `"content_type"` |  |
| `"created_at"` |  |
| `"created_by_user_id"` |  |
| `"description"` |  |
| `"document_key"` | Stable document identity shared by all revisions. |
| `"entrypoint"` |  |
| `"expires_at"` |  |
| `"filename"` |  |
| `"files"` |  |
| `"harness"` |  |
| `"harness_version"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"model"` |  |
| `"organization_id"` |  |
| `"published_at"` |  |
| `"repository_id"` |  |
| `"slug"` |  |
| `"source"` |  |
| `"status"` |  |
| `"title"` |  |
| `"vcs_agent_checkpoint_id"` |  |
| `"vcs_agent_session_id"` |  |
| `"version"` |  |
| `"view_url"` |  |
| `"web_url"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/artefacts`

#### ArtefactCommentThread

| Field | Description |
| --- | --- |
| `"anchor"` | The `#anchor` written into the Markdown. |
| `"body"` |  |
| `"comments"` |  |
| `"id"` | The anchor key. |
| `"quote"` |  |
| `"resolved"` |  |

Operations: Create, List, Update.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads`

#### ArtefactRevision

| Field | Description |
| --- | --- |
| `"base_version"` | The newest version the editor started from. |
| `"content"` | Markdown, including CriticMarkup suggestions and comment anchors. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions`

#### ArtefactViewToken

| Field | Description |
| --- | --- |
| `"expires_in"` |  |
| `"file"` | Exact manifest path. |
| `"organization_slug"` | If provided, must match the organization addressed by the route. |
| `"version"` |  |
| `"viewer_url"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens`

#### Artifact

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/artifacts/{id}/expire`

#### ArtifactCacheNamespace

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/cache_namespaces/{id}/archive`

#### ArtifactImageRepository

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/image_repositories/{id}/archive`

#### ArtifactPackageMirror

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/package_mirrors/{id}/pause`

#### ArtifactRetentionPolicy

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/retention_policies`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}`

#### AuditEvent

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"actor_kind"` |  |
| `"actor_user_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"observability_space_id"` |  |
| `"organization_id"` |  |
| `"payload"` |  |
| `"request_id"` |  |
| `"severity"` |  |
| `"subject_id"` |  |
| `"subject_kind"` |  |
| `"subject_name"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

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
| `"email"` |  |
| `"message"` |  |
| `"password"` |  |
| `"token"` |  |

Operations: Create, Update.

API path: `/api/v1/auth/password_resets`

#### AuthRegistrationOption

| Field | Description |
| --- | --- |
| `"email_password_signup_enabled"` |  |
| `"openai_sign_in_enabled"` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `"turnstile_site_key"` |  |
| `"waitlist_enabled"` | New public signups require waitlist approval when enabled. |

Operations: Load.

API path: `/api/v1/auth/registration_options`

#### AutomationEvent

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"can_manage"` |  |
| `"can_manage_events"` | Whether new event triggers can be attached or existing settings saved. |
| `"can_run"` | Whether the viewer can request a manual Temporal run |
| `"can_schedule"` |  |
| `"event_subscriptions"` |  |
| `"event_triggers"` |  |
| `"expected_revision"` |  |
| `"id"` |  |
| `"key"` |  |
| `"name"` |  |
| `"revision"` |  |
| `"schedule"` |  |
| `"schedules"` |  |
| `"settings"` |  |
| `"subscription_key"` |  |
| `"version"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events`

#### AutomationRun

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"automation"` | Saved native automation identity. |
| `"budget_seconds"` | The run stops once it has been running this long |
| `"budget_usd"` | The run stops before a step once it has spent this much |
| `"can_answer"` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `"can_approve"` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `"can_dismiss"` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `"checkpoint"` | The question a run waiting at a checkpoint is asking |
| `"conversation_id"` | The thread the run works in, which the person opens to follow it |
| `"decision_history"` |  |
| `"error"` |  |
| `"finished_at"` |  |
| `"flow_steps"` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `"id"` |  |
| `"input"` |  |
| `"needs_you"` | Whether a step stopped the run for the person, who can answer it |
| `"note"` | One sentence a workflow step left for the person, which the run's card leads with |
| `"nothing_to_do_reason"` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `"request_id"` |  |
| `"resume_count"` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `"retry_step_id"` |  |
| `"running_seconds"` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `"source"` |  |
| `"spent_tokens"` | The tokens the run's agent steps have used so far |
| `"spent_usd"` | What the run's agent steps have cost so far, as the agent reported it |
| `"stalled"` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `"started_at"` |  |
| `"started_by"` | The event that started the run |
| `"status"` |  |
| `"step_count"` |  |
| `"steps"` |  |
| `"trigger_id"` | The run settings that started it, for a run an event or schedule started |
| `"version_id"` |  |
| `"wake_at"` | When a sleeping run's step looks again |
| `"workflow_digest"` | SHA-256 of the immutable definition this run uses |
| `"workflow_path"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs`

#### BackendRunnerPool

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Load, Update.

API path: `/api/v1/bazel/action_results/{hash}/{size_bytes}`

#### BazelBackend

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/bazel/backends/{id}/issue_token`

#### BazelBlob

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load, Update.

API path: `/api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}`

#### BazelExecution

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/billing`

#### BillingAddon

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"id"` |  |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"quantity"` |  |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/billing/addons/{addon_key}`

#### BillingBudget

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"monthly_cap_cents"` | Null clears the budget. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Patch, Update.

API path: `/api/v1/organizations/{organization_id}/billing/budget`

#### BillingCheckoutSession

| Field | Description |
| --- | --- |
| `"cancel_url"` |  |
| `"coupon_code"` |  |
| `"entry_point"` | Where the owner chose to pay, for product analytics. |
| `"package_key"` |  |
| `"package_revision"` |  |
| `"success_url"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/billing/checkout_sessions`

#### BillingContact

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"billing_email"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Patch, Update.

API path: `/api/v1/organizations/{organization_id}/billing/contact`

#### BillingExtraSpend

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"enabled"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"monthly_cap_cents"` | Monthly limit across all metered overages, excluding plan fees. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Patch, Update.

API path: `/api/v1/organizations/{organization_id}/billing/extra_spend`

#### BillingInvoice

| Field | Description |
| --- | --- |
| `"amount_due_cents"` |  |
| `"created_at"` |  |
| `"currency"` |  |
| `"hosted_invoice_url"` |  |
| `"id"` |  |
| `"invoice_pdf"` |  |
| `"metronome_invoice_id"` | Metronome's id for the invoice it pushed |
| `"number"` |  |
| `"period_ended_at"` |  |
| `"period_started_at"` |  |
| `"status"` |  |
| `"total_cents"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/billing/invoices`

#### BillingPackage

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"base_price_cents"` |  |
| `"billing_interval"` |  |
| `"billing_policy"` |  |
| `"ci_included_spend_cents"` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `"currency"` |  |
| `"key"` |  |
| `"max_seats"` |  |
| `"name"` |  |
| `"pay_as_you_go_enabled"` |  |
| `"rates"` |  |
| `"revision"` |  |
| `"roder_daily_run_limit"` |  |
| `"roder_run_concurrency_limit"` |  |
| `"seat_price_cents"` |  |
| `"trial_days"` |  |
| `"visibility"` |  |

Operations: List.

API path: `/api/v1/billing/packages`

#### BillingPortalSession

| Field | Description |
| --- | --- |
| `"return_url"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/billing/portal_sessions`

#### BillingPrepaidPeriod

| Field | Description |
| --- | --- |
| `"activated_at"` |  |
| `"created_at"` |  |
| `"currency"` |  |
| `"id"` |  |
| `"last_error"` |  |
| `"minutes"` |  |
| `"net_amount_cents"` |  |
| `"paid_at"` |  |
| `"paid_total_cents"` |  |
| `"payment_action_url"` |  |
| `"period_ended_at"` |  |
| `"period_started_at"` |  |
| `"receipt_url"` |  |
| `"refunded_net_cents"` |  |
| `"state"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}`

#### BillingPrepaidPurchase

| Field | Description |
| --- | --- |
| `"activated_at"` |  |
| `"created_at"` |  |
| `"currency"` |  |
| `"id"` |  |
| `"last_error"` |  |
| `"minutes"` |  |
| `"net_amount_cents"` |  |
| `"paid_at"` |  |
| `"paid_total_cents"` |  |
| `"payment_action_url"` |  |
| `"prepaid"` |  |
| `"purchase"` |  |
| `"receipt_url"` |  |
| `"refunded_net_cents"` |  |
| `"request_key"` |  |
| `"state"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/billing/prepaid_purchases`

#### BillingSubscription

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"cancel_at_period_end"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Patch, Update.

API path: `/api/v1/organizations/{organization_id}/billing/subscription`

#### BillingTokenTopUp

| Field | Description |
| --- | --- |
| `"amount_cents"` |  |
| `"request_key"` |  |

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
| `"accepts_versions"` |  |
| `"arch"` |  |
| `"archived_at"` |  |
| `"binary"` |  |
| `"created_at"` |  |
| `"download_secret"` |  |
| `"download_url"` |  |
| `"executable"` |  |
| `"format"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"latest_version"` |  |
| `"launch_args"` |  |
| `"name"` |  |
| `"needs_refresh"` |  |
| `"operation"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"platform"` |  |
| `"project_id"` |  |
| `"sha256"` |  |
| `"slug"` |  |
| `"version"` |  |
| `"version_defaults"` |  |
| `"versions"` |  |
| `"window_title"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{id}/archive`

#### BinaryVersion

| Field | Description |
| --- | --- |
| `"arch"` |  |
| `"cancelable"` |  |
| `"configuration"` |  |
| `"configuration_digest"` |  |
| `"created_at"` |  |
| `"deletable"` |  |
| `"download_secret"` |  |
| `"download_url"` |  |
| `"environment_uses"` |  |
| `"executable"` |  |
| `"format"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"launch_args"` |  |
| `"operation"` |  |
| `"package_sha256"` |  |
| `"package_size"` |  |
| `"permissions"` |  |
| `"platform"` |  |
| `"preparations"` |  |
| `"retryable"` |  |
| `"sha256"` |  |
| `"status"` |  |
| `"version"` |  |
| `"window_title"` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel`

#### BookmarkProtectionRefreshGithubRequiredCheck

| Field | Description |
| --- | --- |
| `"exclusions"` |  |
| `"fetched_at"` |  |
| `"fetched_at_label"` |  |
| `"github_branch"` |  |
| `"github_owner"` |  |
| `"github_repository_name"` |  |
| `"last_error"` |  |
| `"proven"` |  |
| `"requirements"` |  |
| `"stale"` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/refresh_github_required_checks`

#### BrowserEgressCandidate

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/browser_egress/candidates`

#### BrowserSession

| Field | Description |
| --- | --- |
| `"active_task_id"` |  |
| `"authentication_status"` | Session readiness alone does not confirm application sign-in. |
| `"authentication_task_id"` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `"cdp_url"` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `"closed_at"` |  |
| `"closure_basis"` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `"control_generation"` |  |
| `"controller"` |  |
| `"credential_id"` | Optional configured credential public ID within the selected project. |
| `"environment_id"` | Optional ready website environment slug or public ID within the selected project. |
| `"environment_revision_id"` |  |
| `"expires_at"` |  |
| `"failure_code"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"initial_url"` |  |
| `"max_seconds"` |  |
| `"pending_control_id"` |  |
| `"project_id"` | Optional project slug or public ID. |
| `"reconciled_at"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"url"` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `"viewer"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control`

#### BrowserSessionConnection

| Field | Description |
| --- | --- |
| `"generation"` |  |
| `"idempotency_key"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections`

#### BrowserSessionControl

| Field | Description |
| --- | --- |
| `"browser_session_id"` |  |
| `"completed_at"` |  |
| `"completed_generation"` |  |
| `"connection"` |  |
| `"failure_code"` |  |
| `"id"` |  |
| `"requested_controller"` |  |
| `"requested_generation"` |  |
| `"status"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}`

#### BrowserSessionEvent

| Field | Description |
| --- | --- |
| `"browser_task_id"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"payload"` |  |
| `"source_sequence"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events`

#### BrowserSessionMedia

| Field | Description |
| --- | --- |
| `"browser_session_id"` |  |
| `"capture_omissions"` |  |
| `"captured_at"` |  |
| `"ended_at"` |  |
| `"failure_code"` |  |
| `"files"` |  |
| `"frames"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"partial"` | Retained footage has a capture failure or reported omissions. |
| `"retention_expires_at"` |  |
| `"source"` | Screenshot provenance. |
| `"status"` |  |
| `"stop_requested_at"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}`

#### BrowserSessionRecording

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"wait"` | Only screenshots support wait: true. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/recordings/{id}/stop`

#### BrowserSessionScreenshot

| Field | Description |
| --- | --- |
| `"idempotency_key"` |  |
| `"wait"` | Only screenshots support wait: true. |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/screenshots`

#### BrowserSessionTask

| Field | Description |
| --- | --- |
| `"activity"` |  |
| `"browser_session_id"` |  |
| `"cancel_requested_at"` |  |
| `"completed_at"` |  |
| `"control_generation"` |  |
| `"deadline_at"` |  |
| `"effects_unknown"` |  |
| `"failure_code"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"instruction"` |  |
| `"max_rounds"` |  |
| `"max_seconds"` |  |
| `"model_selection"` |  |
| `"outcome"` |  |
| `"result"` |  |
| `"started_at"` |  |
| `"status"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/tasks/{id}/cancel`

#### CacheNamespaceEntry

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict`

#### CatalogSelector

| Field | Description |
| --- | --- |
| `"environments"` |  |
| `"id"` |  |
| `"locations"` |  |
| `"services"` |  |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/catalog/selectors`

#### CdnDeployment

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments`

#### CdnHostname

| Field | Description |
| --- | --- |
| `"app_cdn_distribution_id"` |  |
| `"created_at"` |  |
| `"dns_status"` |  |
| `"force_ssl"` |  |
| `"hostname"` |  |
| `"id"` |  |
| `"provider_hostname_id"` |  |
| `"tls_status"` |  |
| `"updated_at"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames`

#### CdnSpace

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/cdn_spaces/{id}/archive`

#### CdnSpaceObject

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load, Remove, Update.

API path: `/api/v1/cdn_spaces/{cdn_space_id}/objects/{path}`

#### Change

| Field | Description |
| --- | --- |
| `"counts"` | Counts for each state across the active non-state filters. |
| `"filters"` |  |
| `"github_sync"` |  |
| `"result"` | What this page is a page of. |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/changes`

#### ChangeAsset

| Field | Description |
| --- | --- |
| `"alias"` |  |
| `"byte_size"` |  |
| `"checksum_md5"` |  |
| `"checksum_sha256"` |  |
| `"content_type"` |  |
| `"filename"` |  |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize`

#### ChangeComment

| Field | Description |
| --- | --- |
| `"body"` |  |
| `"capabilities"` |  |
| `"change_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"line"` |  |
| `"outdated"` |  |
| `"parent_comment_id"` |  |
| `"patchset_id"` |  |
| `"patchset_number"` |  |
| `"path"` |  |
| `"replies"` |  |
| `"resolved"` |  |
| `"resolved_at"` |  |
| `"resolved_at_label"` |  |
| `"resolved_by"` |  |
| `"side"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"user"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve`

#### ChangeFileReviewCheckpoint

| Field | Description |
| --- | --- |
| `"patchset_id"` |  |
| `"path"` |  |
| `"request_id"` |  |
| `"review_action"` |  |

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
| `"change_id"` |  |
| `"change_number"` |  |
| `"git_commit_id"` |  |
| `"git_commit_ids"` |  |
| `"id"` |  |
| `"identities"` |  |
| `"missing_git_commit_ids"` |  |
| `"patchset_number"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities`

#### ChangeGitPublication

| Field | Description |
| --- | --- |
| `"expected_target_commit_id"` |  |
| `"id"` |  |
| `"operation_key"` |  |
| `"publication_id"` |  |
| `"request"` |  |
| `"request_digest"` |  |
| `"revisions"` |  |
| `"status"` |  |
| `"transfer_refs"` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications`

#### ChangeGroupMember

| Field | Description |
| --- | --- |
| `"change_id"` | Change number |
| `"changes"` |  |
| `"id"` |  |
| `"name"` |  |
| `"number"` |  |
| `"status"` |  |
| `"title"` |  |

Operations: Create, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members`

#### ChangeLabel

| Field | Description |
| --- | --- |
| `"accepted"` |  |
| `"add"` |  |
| `"approval"` |  |
| `"assets"` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `"author"` | Human user summary or organization automation identity. |
| `"capabilities"` |  |
| `"change_key"` |  |
| `"checks"` |  |
| `"checks_status"` |  |
| `"comments"` |  |
| `"comments_count"` |  |
| `"comments_count_label"` |  |
| `"commit_message"` |  |
| `"current_patchset"` |  |
| `"description"` |  |
| `"draft"` |  |
| `"folded_into_number"` |  |
| `"github_projection_status"` |  |
| `"github_pull_request"` |  |
| `"github_pull_requests"` |  |
| `"group"` |  |
| `"has_description"` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `"id"` |  |
| `"jj_change_id"` |  |
| `"labels"` |  |
| `"landable"` |  |
| `"landed_by"` |  |
| `"number"` |  |
| `"orphaned"` |  |
| `"orphaned_at"` |  |
| `"orphaned_at_label"` |  |
| `"orphaned_reason"` |  |
| `"parent_change_id"` |  |
| `"parent_change_number"` |  |
| `"patchset_number"` |  |
| `"patchsets"` |  |
| `"primary_status"` |  |
| `"public_id"` |  |
| `"relation_chain"` |  |
| `"remove"` |  |
| `"requested_changes"` |  |
| `"restack_state"` |  |
| `"reviewer_candidates"` | Organization members available to the reviewer picker on this page. |
| `"reviewers"` |  |
| `"stable_change_id"` |  |
| `"stack"` |  |
| `"status"` |  |
| `"target_branch"` |  |
| `"title"` |  |
| `"unresolved_comments_count_label"` |  |
| `"url"` |  |
| `"votes"` |  |

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
| `"change_ids"` |  |
| `"count"` |  |
| `"defer_until_ready"` | Admit the request while approvals or checks are pending |
| `"expected_requirement_version"` |  |
| `"expected_scope_version"` |  |
| `"head_change_id"` |  |
| `"id"` |  |
| `"numbers"` |  |
| `"override_acknowledged"` |  |
| `"override_codes"` |  |
| `"position"` |  |
| `"priority"` |  |
| `"scope_version"` |  |
| `"state"` |  |
| `"version"` |  |

Operations: Create, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests`

#### ChangeRequestChange

| Field | Description |
| --- | --- |
| `"message"` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/request_changes`

#### ChangeReviewer

| Field | Description |
| --- | --- |
| `"add"` |  |
| `"email"` |  |
| `"name"` |  |
| `"remove"` |  |
| `"removed_reviewers"` |  |
| `"requested_reviewers"` |  |
| `"reviewers"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/reviewers`

#### ChangeTranscript

| Field | Description |
| --- | --- |
| `"capture_kind"` |  |
| `"captured_at"` |  |
| `"harness"` |  |
| `"id"` |  |
| `"original_resume"` |  |
| `"patchset_commit_id"` |  |
| `"patchset_number"` |  |
| `"redaction_count"` |  |
| `"session_id"` |  |
| `"session_title"` |  |
| `"status"` |  |
| `"superseded"` |  |
| `"user"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts`

#### ChangeTranscriptSummary

| Field | Description |
| --- | --- |
| `"estimated_cost"` |  |
| `"session_count"` |  |
| `"sessions"` |  |
| `"tokens_partial"` |  |
| `"total_tokens"` |  |

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
| `"architecture"` |  |
| `"bazel_enabled"` |  |
| `"bazel_properties_json"` |  |
| `"ci_runner_pool_id"` |  |
| `"cordoned_at"` |  |
| `"cordoned_at_label"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"health_state"` |  |
| `"heartbeat_age_seconds"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"labels_csv"` |  |
| `"last_seen_at"` |  |
| `"last_seen_at_label"` |  |
| `"name"` |  |
| `"network_peer_id"` |  |
| `"node_capabilities_csv"` |  |
| `"node_certificate_expires_at"` |  |
| `"node_certificate_expires_at_label"` |  |
| `"node_certificate_fingerprint_sha256"` |  |
| `"node_certificate_serial"` |  |
| `"offline_at"` |  |
| `"offline_at_label"` |  |
| `"online_at"` |  |
| `"online_at_label"` |  |
| `"organization_id"` |  |
| `"os"` |  |
| `"revoked_at"` |  |
| `"revoked_at_label"` |  |
| `"schedulable"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"version"` |  |

Operations: Create, Load.

API path: `/api/v1/ci/nodes/{id}/cordon`

#### CiPipeline

| Field | Description |
| --- | --- |
| `"ci_runner_pool_id"` |  |
| `"concurrency_key"` |  |
| `"created_at"` |  |
| `"default_branch"` |  |
| `"description"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"repository_id"` |  |
| `"required_capabilities_csv"` |  |
| `"runner_pool"` |  |
| `"runs"` |  |
| `"slug"` |  |
| `"source_kind"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |
| `"trigger_on_pull_request"` |  |
| `"trigger_on_push"` |  |
| `"trigger_on_schedule"` |  |
| `"updated_at"` |  |
| `"workflow_path"` |  |

Operations: Create, List, Load.

API path: `/api/v1/ci/pipelines`

#### CiPipelineRun

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"canceled_at"` |  |
| `"ci_pipeline_id"` |  |
| `"ci_runner_pool_id"` |  |
| `"commit_sha"` |  |
| `"concurrency_key"` |  |
| `"created_at"` |  |
| `"creator_user_id"` |  |
| `"display_id"` |  |
| `"failed"` |  |
| `"finished_at"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"jobs"` |  |
| `"message"` |  |
| `"number"` |  |
| `"organization_id"` |  |
| `"parameters_json"` |  |
| `"queued_at"` |  |
| `"ref_name"` |  |
| `"repository_id"` |  |
| `"required_capabilities_csv"` |  |
| `"retry_number"` |  |
| `"retryable"` |  |
| `"slug"` |  |
| `"source_url"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |

Operations: Create, Load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry`

#### CiRunnerPool

| Field | Description |
| --- | --- |
| `"bazel_enabled"` |  |
| `"bazel_properties_json"` |  |
| `"created_at"` |  |
| `"description"` |  |
| `"elastic_config_json"` |  |
| `"elastic_provider_kind"` |  |
| `"id"` |  |
| `"isolation_mode"` |  |
| `"labels_csv"` |  |
| `"max_concurrency"` |  |
| `"modal_capacity"` |  |
| `"modal_runner_invocations"` |  |
| `"name"` |  |
| `"network_space_id"` |  |
| `"node_capabilities_csv"` |  |
| `"organization_id"` |  |
| `"runner_count_label"` |  |
| `"runner_kind"` |  |
| `"runners"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |

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
| `"event"` |  |
| `"properties"` |  |

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
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/objects/{object_key}`

#### CodeRuleEvaluation

| Field | Description |
| --- | --- |
| `"advisory"` |  |
| `"coverage"` |  |
| `"diff"` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `"duration_ms"` |  |
| `"evaluator_version"` |  |
| `"input_digest"` |  |
| `"limits"` |  |
| `"model"` |  |
| `"requests"` |  |
| `"schema_version"` |  |
| `"snapshot_digest"` |  |
| `"unchecked"` |  |
| `"verdicts"` |  |

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
| `"cookie_name"` |  |
| `"host"` | Site hostname, for example docs.acme.composal.page |
| `"max_age"` |  |
| `"session_token"` |  |

Operations: Create.

API path: `/api/v1/com_site_access/sessions`

#### CommentThreadComment

| Field | Description |
| --- | --- |
| `"body"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments`

#### CommitDiff

| Field | Description |
| --- | --- |
| `"files"` |  |
| `"id"` |  |
| `"parent_id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/diff/{fingerprint}`

#### ConnectionRequest

| Field | Description |
| --- | --- |
| `"agent_card_url"` |  |
| `"auth_scheme"` |  |
| `"can_configure"` |  |
| `"can_disconnect"` |  |
| `"can_setup"` |  |
| `"error_code"` |  |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"remote_agent"` |  |
| `"retired_at"` |  |
| `"revoked_at"` |  |
| `"source_operation_id"` |  |
| `"state"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}`

#### ConnectionSource

| Field | Description |
| --- | --- |
| `"device_id"` |  |
| `"device_name"` |  |
| `"provider"` |  |
| `"source_operation_id"` |  |
| `"title"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/sources`

#### ContactSubmission

| Field | Description |
| --- | --- |
| `"company"` |  |
| `"email"` | Stored downcased and stripped. |
| `"message"` |  |
| `"name"` |  |
| `"website"` | Honeypot. |

Operations: Create.

API path: `/api/v1/contact_submissions`

#### ControlComputer

| Field | Description |
| --- | --- |
| `"connection"` | A point-in-time control transport observation. |
| `"consent"` |  |
| `"device"` |  |
| `"id"` |  |
| `"provider_status"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/control_computers`

#### ControlComputerControlOperation

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"arguments"` |  |
| `"created_at"` |  |
| `"delivery"` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `"device_id"` |  |
| `"diagnostic_code"` | Approved product error code retained after copied diagnostics expire. |
| `"end"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"key"` |  |
| `"provider"` |  |
| `"references"` |  |
| `"result"` |  |
| `"result_expired"` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `"state"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations`

#### CoordinationWait

| Field | Description |
| --- | --- |
| `"can_stop"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"status"` |  |
| `"stop_state"` |  |
| `"wake_outcome"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/coordination/{task_id}/waits`

#### CredentialSignInCheck

| Field | Description |
| --- | --- |
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"deadline_at"` |  |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` | The project environment (app) to sign in to |
| `"environment_name"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_generation"` |  |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks`

#### DataResourceRotateCredential

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"created_at"` |  |
| `"engine"` |  |
| `"failure_message"` |  |
| `"high_availability"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"name"` |  |
| `"plan"` |  |
| `"provider_metadata"` |  |
| `"region"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"storage_gb"` |  |
| `"storage_label"` |  |
| `"updated_at"` |  |
| `"version"` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials`

#### DeepScan

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"active"` |  |
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"deadline_at"` |  |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"explorations"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"launch_options"` | Present only when launch was requested by an admin |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"pagination"` |  |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_generation"` |  |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce`

#### DeepScanFinding

| Field | Description |
| --- | --- |
| `"actual"` |  |
| `"agent_id"` |  |
| `"agent_title"` |  |
| `"area"` | On a locked finding, the first segment of the page it was seen on, such as Billing. |
| `"checks"` | Checks in the same tester report that this finding cites. |
| `"confidence"` |  |
| `"confirmed"` | On a locked finding, whether the automatic review confirmed it. |
| `"evidence_step_ids"` |  |
| `"evidence_timestamp_ms"` |  |
| `"expected"` |  |
| `"fix_prompt"` | A coding-agent prompt for this finding alone |
| `"has_recording"` | On a locked finding, whether the tester recorded evidence for it. |
| `"id"` |  |
| `"locked"` | True for a locked finding of the workspace's included scan before it pays. |
| `"reproduction_steps"` |  |
| `"severity"` |  |
| `"title"` |  |
| `"tracked"` | The finding record to resolve or ignore; null until the tester finishes. |
| `"url"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings`

#### DeepScanFlow

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"concurrency"` |  |
| `"environment_id"` |  |
| `"exploration_id"` |  |
| `"flow_names"` |  |
| `"idempotency_key"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"note"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/flows`

#### DeepScanMappedFlow

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"environment_id"` |  |
| `"flow_map"` |  |
| `"revision_id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/mapped_flows`

#### DeepScanOption

| Field | Description |
| --- | --- |
| `"accounts"` |  |
| `"deep_scan_defaults"` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `"flow_map"` | Flows from the newest discovery; null until discovery has recorded some. |
| `"id"` |  |
| `"name"` |  |
| `"personas"` |  |
| `"preview"` | A short-lived pull request or branch deployment, listed after configured environments. |
| `"target_url"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/options`

#### DemoShare

| Field | Description |
| --- | --- |
| `"head_sha"` |  |
| `"id"` |  |
| `"recording"` |  |
| `"summary"` | What the recorded browser confirmed. |

Operations: Load.

API path: `/api/v1/verify/demo_shares/{token}`

#### DemoShareSegment

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/verify/demo_shares/{token}/segments/{segment_id}`

#### Deployment

| Field | Description |
| --- | --- |
| `"app"` |  |
| `"artifact_locator"` |  |
| `"build_duration_seconds"` |  |
| `"build_source"` |  |
| `"build_status"` |  |
| `"children"` |  |
| `"ci_pipeline_id"` |  |
| `"ci_pipeline_run_id"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"creator"` |  |
| `"deployed_url"` |  |
| `"duration_seconds"` |  |
| `"environment"` |  |
| `"history_kind"` |  |
| `"history_reason"` |  |
| `"id"` |  |
| `"is_live"` |  |
| `"is_rollback"` |  |
| `"live_region_count"` |  |
| `"number"` |  |
| `"placement"` |  |
| `"region_count"` |  |
| `"replicas_per_region"` |  |
| `"rollback_reason"` |  |
| `"rollback_source_release_id"` |  |
| `"rollback_target_release_id"` |  |
| `"rollout_predecessor_id"` |  |
| `"rollout_status"` |  |
| `"rollout_strategy"` |  |
| `"service"` |  |
| `"source_ref"` |  |
| `"status"` |  |
| `"total_replicas"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |

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
| `"activity"` |  |
| `"app"` |  |
| `"app_id"` |  |
| `"audit_events"` |  |
| `"capacity"` |  |
| `"data_resources"` |  |
| `"deploy_targets"` |  |
| `"deployments"` |  |
| `"desired_states"` |  |
| `"environments"` |  |
| `"filters"` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `"health"` | The rolled-up state of the selected scope. |
| `"nomad"` | The Nomad footprint of the selected scope, deduplicated. |
| `"operations"` |  |
| `"placements"` |  |
| `"reconciler_ticks"` |  |
| `"releases"` |  |
| `"runtime_instances"` |  |
| `"service_bindings"` |  |
| `"service_views"` |  |
| `"storage_resources"` |  |

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
| `"allocation_id"` |  |
| `"app_environment_id"` |  |
| `"app_release_id"` |  |
| `"app_service_id"` |  |
| `"details"` |  |
| `"environment_name"` |  |
| `"release_version"` |  |
| `"service_name"` |  |
| `"status"` |  |
| `"task"` |  |
| `"unreachable_reason"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/logs`

#### DeploymentMetric

| Field | Description |
| --- | --- |
| `"auto_deploy"` |  |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"placement_id"` |  |
| `"redeploy"` |  |
| `"region_count"` |  |
| `"replicas_per_region"` |  |
| `"rollout_strategy"` |  |
| `"service_id"` |  |
| `"service_name"` |  |
| `"source_ref"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/metrics`

#### DeploymentPreview

| Field | Description |
| --- | --- |
| `"access"` |  |
| `"app_environment_id"` |  |
| `"app_name"` |  |
| `"app_preview_profile_id"` |  |
| `"app_slug"` |  |
| `"change_number"` |  |
| `"created_at"` |  |
| `"created_by_user_id"` |  |
| `"expires_at"` |  |
| `"generation"` |  |
| `"health"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"latest_operation_status"` |  |
| `"name"` |  |
| `"owner_name"` |  |
| `"profile_name"` |  |
| `"resource_overrides"` | Service public IDs mapped to resource overrides. |
| `"retained"` |  |
| `"slug"` |  |
| `"snapshot_version"` |  |
| `"source_revision"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"urls"` |  |
| `"vcs_change_id"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/previews`

#### DeploymentSetting

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"name"` |  |
| `"nomad_datacenter"` |  |
| `"updated_at"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/deployments/settings`

#### DesktopLocalAgentModel

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/desktop_local_agent/models`

#### DesktopLocalAgentResponse

| Field | Description |
| --- | --- |
| `"input"` |  |
| `"max_output_tokens"` |  |
| `"model"` |  |
| `"store"` |  |
| `"stream"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/desktop_local_agent/responses`

#### Device

| Field | Description |
| --- | --- |
| `"architecture"` |  |
| `"channel"` |  |
| `"coding_connection"` | Independent organization coding-control service state for the current device owner. |
| `"connection_checked_at"` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `"connection_status"` | Display-only native presence. |
| `"control_delivery_policy"` |  |
| `"control_spawn_policy"` |  |
| `"created_at"` |  |
| `"device"` |  |
| `"environment"` |  |
| `"execution_available"` |  |
| `"id"` |  |
| `"name"` |  |
| `"native_device_id"` |  |
| `"paired_at"` |  |
| `"pairing_generation"` |  |
| `"platform"` |  |
| `"project_visibility"` | Folder discovery and new-thread selection. |
| `"provider_status"` | Recent native provider observations; absent on older API replicas. |
| `"revoked_at"` |  |
| `"scheduled_check_ins"` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `"user_browser_access"` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection`

#### DeviceBrowserOperation

| Field | Description |
| --- | --- |
| `"command"` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `"created_at"` |  |
| `"id"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations/{id}/claim`

#### DeviceControlMessage

| Field | Description |
| --- | --- |
| `"agent_id"` |  |
| `"agent_name"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"sender"` |  |
| `"text"` |  |
| `"text_omitted"` |  |
| `"thread"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages`

#### DeviceControlOperation

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"arguments"` |  |
| `"created_at"` |  |
| `"delivery"` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `"device_id"` |  |
| `"diagnostic_code"` | Approved product error code retained after copied diagnostics expire. |
| `"end"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"key"` |  |
| `"provider"` |  |
| `"references"` |  |
| `"result"` |  |
| `"result_expired"` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `"state"` |  |

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
| `"code"` |  |
| `"error"` |  |
| `"folders"` |  |
| `"id"` |  |
| `"key"` | Stable idempotency key for this listing. |
| `"parent"` |  |
| `"path"` | The resolved folder. |
| `"state"` |  |
| `"truncated"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings`

#### DeviceGrant

| Field | Description |
| --- | --- |
| `"agent_id"` |  |
| `"agent_name"` |  |
| `"can_edit"` |  |
| `"can_revoke"` |  |
| `"capabilities"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"principal_id"` |  |
| `"principal_name"` |  |
| `"revision"` |  |
| `"revoked_at"` |  |
| `"updated_at"` |  |

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
| `"event"` |  |
| `"recorded"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/local_events`

#### DevicePairing

| Field | Description |
| --- | --- |
| `"architecture"` |  |
| `"channel"` |  |
| `"id"` |  |
| `"name"` |  |
| `"platform"` |  |
| `"public_key"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete`

#### DeviceProject

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/projects/{id}`

#### DeviceScheduledCheckIn

| Field | Description |
| --- | --- |
| `"enabled"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/scheduled_check_ins`

#### DockerBuilder

| Field | Description |
| --- | --- |
| `"backend"` |  |
| `"created_at"` |  |
| `"gateway_url"` | Organization-addressed public WSS gateway; null until configured |
| `"generation"` |  |
| `"id"` |  |
| `"last_activity_at"` |  |
| `"organization_id"` |  |
| `"ready_at"` |  |
| `"slept_at"` |  |
| `"slug"` |  |
| `"startup_attempt"` |  |
| `"startup_failure"` | Safe failure reason for the most recent startup attempt |
| `"startup_stage"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/docker_builders/{id}/recover`

#### DockerBuilderSession

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"docker_builder_id"` |  |
| `"expires_at"` |  |
| `"gateway_url"` | Organization-addressed public WSS gateway; null until configured |
| `"generation"` |  |
| `"id"` |  |
| `"organization_id"` |  |
| `"revoked_at"` |  |
| `"user_id"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions`

#### DockerBuilderSetting

| Field | Description |
| --- | --- |
| `"idle_timeout_seconds"` |  |
| `"max_concurrency"` |  |
| `"organization_id"` |  |
| `"region"` |  |
| `"runtime_timeout_seconds"` |  |

Operations: Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/docker_builder_settings`

#### DomainDnsIntegration

| Field | Description |
| --- | --- |
| `"account_label"` |  |
| `"api_token"` |  |
| `"created_at"` |  |
| `"failure_message"` |  |
| `"has_token"` |  |
| `"id"` |  |
| `"last_verified_at"` |  |
| `"organization_id"` |  |
| `"provider"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/domain_dns_integrations`

#### DomainPathRule

| Field | Description |
| --- | --- |
| `"action_kind"` |  |
| `"app_service_endpoint_id"` |  |
| `"app_service_id"` |  |
| `"backend_ref"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"last_error"` |  |
| `"path_prefix"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules`

#### Dream

| Field | Description |
| --- | --- |
| `"attention"` | The dream skipped at least one run, which will not be retried |
| `"changes"` | One page of changes when tab is changes; empty otherwise |
| `"completed_at"` |  |
| `"counts"` |  |
| `"dream"` |  |
| `"error_code"` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `"id"` | Public id used in the dream's URL |
| `"pagination"` |  |
| `"permissions"` |  |
| `"phase"` | Where the dream is. |
| `"reason"` | Plain-language explanation of the phase: the cause and what happens next. |
| `"reviewed"` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `"reviewed_date"` | Local day whose finished runs it reviewed |
| `"runs"` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `"scope_name"` | Project or unassigned environment name |
| `"skipped"` | Runs skipped after repeated rejected review output |
| `"tab"` |  |
| `"timezone"` | Organization timezone the dream used |

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
| `"active_revision_id"` |  |
| `"agent_sign_up_available"` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `"allowed_actions"` | read_only only looks around; writes may create, change and delete data. |
| `"billing"` |  |
| `"cleanup"` |  |
| `"connection"` |  |
| `"created_at"` |  |
| `"default_policy"` |  |
| `"default_policy_json"` |  |
| `"discovery_defaults"` |  |
| `"environment"` |  |
| `"exploration_accounts"` |  |
| `"explorations"` |  |
| `"first_run"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"imessage_number"` | International destination number; blank or null clears it on an added environment. |
| `"included_deep_scan"` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `"lock_version"` |  |
| `"managed_google_available"` | Whether the managed Google account can be offered for this app. |
| `"managed_google_email"` |  |
| `"messaging_tester_number"` | One configured tester number. |
| `"name"` | Optional for a website target; defaults to its hostname. |
| `"network_connections"` |  |
| `"onboarding_discovery"` |  |
| `"organization_id"` |  |
| `"pending_accounts"` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `"permissions"` |  |
| `"project_id"` | Owning project. |
| `"repository_id"` |  |
| `"revisions"` |  |
| `"setup_discovery_id"` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `"sign_in_check_available"` | Whether a test account's live sign-in check can run on this app. |
| `"slug"` |  |
| `"status"` |  |
| `"target_kind"` |  |
| `"target_url"` |  |
| `"test_accounts"` |  |
| `"updated_at"` |  |
| `"verify_network_connection_id"` |  |
| `"version"` | Required for target or tester changes; use lock_version from the environment. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments`

#### EnvironmentDiscoveryRun

| Field | Description |
| --- | --- |
| `"account_id"` | Omit for anonymous exploration |
| `"deadline_at"` |  |
| `"environment_revision_id"` |  |
| `"evidence"` |  |
| `"failure_code"` |  |
| `"id"` |  |
| `"queued_at"` |  |
| `"recording"` |  |
| `"result"` |  |
| `"status"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop`

#### EnvironmentExploration

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"deadline_at"` |  |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"persona_id"` |  |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_generation"` |  |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

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
| `"allowed_origins"` | Origins browser testers may visit, subdomains included. |
| `"app_environment_id"` |  |
| `"app_release_id"` |  |
| `"blueprint"` |  |
| `"blueprint_json"` |  |
| `"cleanup_state"` |  |
| `"created_at"` |  |
| `"digest"` |  |
| `"dry_run"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"organization_id"` |  |
| `"ready_at"` |  |
| `"resolved_manifest_json"` |  |
| `"retention_policy_json"` |  |
| `"revision"` |  |
| `"revoked_at"` |  |
| `"runner_environment_revision_id"` |  |
| `"safety_policy_json"` |  |
| `"schema_version"` |  |
| `"source_metadata"` |  |
| `"source_metadata_json"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"validation_json"` |  |
| `"verify_environment_id"` |  |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision`

#### EnvironmentSecretBinding

| Field | Description |
| --- | --- |
| `"env_key"` |  |
| `"id"` |  |
| `"mode"` |  |
| `"secret_id"` |  |
| `"secret_version_id"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings`

#### EnvironmentTestAccount

| Field | Description |
| --- | --- |
| `"configured"` |  |
| `"credentials"` |  |
| `"id"` |  |
| `"persona"` |  |
| `"revision_id"` |  |
| `"role"` |  |
| `"tenant"` |  |

Operations: List, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts`

#### Evidence

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/evidence/{id}`

#### ExecutionDesiredState

| Field | Description |
| --- | --- |
| `"desired_state"` |  |
| `"id"` |  |
| `"stop_observed"` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/execution/desired_states/{id}/reconcile`

#### ExecutionReconcilerTick

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/execution/reconciler_ticks`

#### ExecutionRelease

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/execution/releases/{id}/activate`

#### ExecutionRuntimeInstance

| Field | Description |
| --- | --- |
| `"adapter_kind"` |  |
| `"app_environment_id"` |  |
| `"app_release_id"` |  |
| `"app_service_id"` |  |
| `"booted_at"` |  |
| `"booted_at_label"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"instance_key"` |  |
| `"last_reconciled_at"` |  |
| `"last_reconciled_at_label"` |  |
| `"last_seen_at"` |  |
| `"last_seen_at_label"` |  |
| `"location"` |  |
| `"location_id"` |  |
| `"network_peer_id"` |  |
| `"nomad_allocation_id"` |  |
| `"nomad_task_name"` |  |
| `"organization_id"` |  |
| `"private_ipv4"` |  |
| `"private_ipv6"` |  |
| `"provider_instance_id"` |  |
| `"public_endpoint"` |  |
| `"service_name"` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `"slug"` |  |
| `"status"` |  |
| `"terminated_at"` |  |
| `"terminated_at_label"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/execution/runtime_instances/{id}/refresh`

#### Exploration

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"check_count"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"credential_name"` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `"deadline_at"` | When the team's time limit ends. |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"duration_ms"` |  |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"persona_id"` | Project persona whose role and observed access this discovery maps. |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_count"` | Scenarios saved from this discovery. |
| `"scenario_generation"` |  |
| `"scenarios_pending"` | Scenarios are still being prepared, so scenario_count may still grow. |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"started_at"` |  |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/retry_startup`

#### ExplorationMessage

| Field | Description |
| --- | --- |
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"deadline_at"` |  |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_generation"` |  |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"text"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

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
| `"agent_filters"` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `"agents"` |  |
| `"can_continue"` | Whether a finished run can be resumed through the orchestrator. |
| `"chat_messages"` |  |
| `"concurrency"` |  |
| `"covered_areas"` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `"created_at"` |  |
| `"deadline_at"` |  |
| `"demo_project"` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `"ended_early"` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `"environment_id"` |  |
| `"environment_name"` |  |
| `"explorer_activity"` | What the team is doing now. |
| `"finding_count"` | Findings at every priority, locked ones included. |
| `"findings"` | Every tester's findings, most severe first, with the checks each one cites. |
| `"findings_fix_prompt"` | One coding-agent prompt covering every finding, most severe first. |
| `"finished_at"` |  |
| `"goal"` |  |
| `"huntable_flows"` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `"id"` |  |
| `"max_seconds"` |  |
| `"max_testers"` |  |
| `"mode"` |  |
| `"next_scan_improvements"` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `"observed_at"` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `"onboarding"` | Whether this is the workspace's free first discovery, started by setup. |
| `"paywalled"` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `"permissions"` |  |
| `"priority_counts"` |  |
| `"project_id"` | Set when the exploration targets a project environment. |
| `"related_explorations"` |  |
| `"report"` |  |
| `"reproduction_of"` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"saves_scenarios"` | Whether this exploration has started saving scenarios. |
| `"scannable_flows"` | Flows a finished exploration recorded that deep scans can start from. |
| `"scenario_generation"` |  |
| `"sign_in_needs_answer"` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `"sign_in_outcome"` | A sign-in check's outcome; null for other runs. |
| `"sign_in_question"` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `"startup_retryable"` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `"status"` |  |
| `"time_limit_reached"` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `"title"` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `"unlock"` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `"web_url"` | The run's page in the Composal web app |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios`

#### Finding

| Field | Description |
| --- | --- |
| `"confidence"` |  |
| `"created_at"` |  |
| `"deferred_until"` | Required future time when status is deferred |
| `"finding"` |  |
| `"fingerprint"` |  |
| `"first_seen_at"` |  |
| `"id"` |  |
| `"last_seen_at"` |  |
| `"locked"` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `"occurrence_count"` |  |
| `"organization_id"` |  |
| `"permissions"` |  |
| `"reason"` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `"reported_occurrence"` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `"repository_id"` |  |
| `"safe_summary"` |  |
| `"scenario_occurrences"` |  |
| `"severity"` |  |
| `"status"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"verification"` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

Operations: List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/findings`

#### Gh

| Field | Description |
| --- | --- |
| `"capabilities"` |  |
| `"content"` |  |
| `"fetched_at"` |  |
| `"id"` |  |
| `"magic_merge"` |  |
| `"pull_request"` |  |
| `"stack"` |  |
| `"transcript_paths"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}`

#### GitImport

| Field | Description |
| --- | --- |
| `"destination_mode"` |  |
| `"error"` |  |
| `"git_default_branch"` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `"git_status"` |  |
| `"git_url"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"name"` |  |
| `"native_status"` |  |
| `"organization"` |  |
| `"repository_id"` |  |
| `"root_path"` |  |
| `"slug"` |  |
| `"source_branch"` |  |
| `"target_branch"` |  |

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
| `"account_login"` |  |
| `"github_app_installation_id"` |  |
| `"next_page"` | Next GitHub page for this installation |
| `"repositories"` |  |

Operations: List.

API path: `/api/v1/github_app/importable_repositories`

#### GithubAppInstallation

| Field | Description |
| --- | --- |
| `"account_avatar_url"` |  |
| `"account_id"` |  |
| `"account_login"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"installation_id"` |  |
| `"installed_at"` |  |
| `"installed_at_label"` |  |
| `"manage_access_url"` |  |
| `"organization_id"` |  |
| `"permission_entries"` | GitHub's permission hash as a display-ready list, sorted by name. |
| `"permissions"` |  |
| `"status"` |  |
| `"suspended_at"` |  |
| `"suspended_at_label"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection`

#### GithubAppInstallationAuthorization

| Field | Description |
| --- | --- |
| `"installation_url"` |  |
| `"organization_slug"` | Vex organization slug whose installation will be linked. |
| `"return_target"` | Server-validated Vex application target used after verification. |

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
| `"adoption_mode"` |  |
| `"check_name_prefix"` |  |
| `"ci_runner_pool_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"default_branch"` |  |
| `"github_app_installation_id"` |  |
| `"github_repository_id"` |  |
| `"id"` |  |
| `"last_compatibility_status"` |  |
| `"last_error_message"` |  |
| `"last_head_sha"` |  |
| `"last_pull_request_number"` |  |
| `"last_ref"` |  |
| `"last_webhook_action"` |  |
| `"last_webhook_at"` |  |
| `"last_webhook_at_label"` |  |
| `"last_webhook_delivery_id"` |  |
| `"last_webhook_event"` |  |
| `"metadata"` |  |
| `"organization_id"` |  |
| `"permission_status"` |  |
| `"repository_full_name"` |  |
| `"repository_name"` |  |
| `"repository_owner"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"webhook_delivery_count"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/github_ci_repositories`

#### GithubCiRepositoryCompatibilityReport

| Field | Description |
| --- | --- |
| `"analyzed_at"` |  |
| `"analyzed_at_label"` |  |
| `"ci_pipeline_id"` |  |
| `"ci_pipeline_run_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"diagnostics"` |  |
| `"errors"` |  |
| `"event_action"` |  |
| `"event_name"` |  |
| `"execution_allowed"` |  |
| `"github_ci_repository_id"` |  |
| `"head_sha"` |  |
| `"id"` |  |
| `"metadata"` |  |
| `"organization_id"` |  |
| `"parser_version"` |  |
| `"pull_request_number"` |  |
| `"ref_name"` |  |
| `"referenced_actions"` |  |
| `"required_secrets"` |  |
| `"runner_labels"` |  |
| `"source_blob_sha"` |  |
| `"source_sha"` |  |
| `"status"` |  |
| `"supported_features"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"warnings"` |  |
| `"workflow_name"` |  |
| `"workflow_path"` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports`

#### GithubConnection

| Field | Description |
| --- | --- |
| `"accounts"` |  |
| `"github_app_installation_id"` |  |
| `"installations"` |  |
| `"project_id"` | Project slug or public ID the repositories are added to. |
| `"replace"` | Make these the project's only repositories. |
| `"repositories"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/github_connections`

#### GithubIntegration

| Field | Description |
| --- | --- |
| `"account_avatar_url"` |  |
| `"account_login"` |  |
| `"connection_status"` |  |
| `"connection_status_label"` |  |
| `"github_installation"` |  |
| `"health"` |  |
| `"id"` |  |
| `"imported_repositories_count"` |  |
| `"imported_repositories_count_label"` |  |
| `"organization"` |  |
| `"pagination"` |  |
| `"repositories"` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{org_slug}/pages/github_integrations`

#### GithubOnboarding

| Field | Description |
| --- | --- |
| `"accounts"` |  |
| `"active_batch_id"` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `"batches"` |  |
| `"capabilities"` |  |
| `"installations"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding`

#### GithubOnboardingBranch

| Field | Description |
| --- | --- |
| `"branches"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/branches`

#### GithubOnboardingImport

| Field | Description |
| --- | --- |
| `"account_login"` |  |
| `"complete"` | Whether every item has settled and the wizard should treat the import as finished. |
| `"created_at"` |  |
| `"failed_item_count"` |  |
| `"github_app_installation_id"` |  |
| `"id"` |  |
| `"imported_item_count"` |  |
| `"item_count"` |  |
| `"items"` |  |
| `"repositories"` |  |
| `"status"` |  |
| `"terminal_item_count"` |  |
| `"updated_at"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/imports`

#### GithubOnboardingImportBatch

| Field | Description |
| --- | --- |
| `"account_login"` |  |
| `"complete"` | Whether every item has settled and the wizard should treat the import as finished. |
| `"created_at"` |  |
| `"failed_item_count"` |  |
| `"github_app_installation_id"` |  |
| `"id"` |  |
| `"imported_item_count"` |  |
| `"item_count"` |  |
| `"items"` |  |
| `"status"` |  |
| `"terminal_item_count"` |  |
| `"updated_at"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}`

#### GithubOnboardingImportItem

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/github_onboarding/import_items/{github_import_batch_item_id}/retry`

#### GithubPullRequest

| Field | Description |
| --- | --- |
| `"capabilities"` |  |
| `"content"` |  |
| `"fetched_at"` |  |
| `"id"` |  |
| `"magic_merge"` |  |
| `"pull_request"` |  |
| `"stack"` |  |
| `"transcript_paths"` |  |

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
| `"entry_id"` |  |
| `"key"` |  |
| `"matched_key"` |  |
| `"ok"` |  |
| `"operation"` |  |
| `"restore_keys"` |  |
| `"signed_download_url"` |  |
| `"size_bytes"` |  |
| `"upload_path"` |  |
| `"version"` |  |

Operations: Create.

API path: `/api/v1/github_runner_cache`

#### GithubRunnerEgress

| Field | Description |
| --- | --- |
| `"can_request"` |  |
| `"cidr"` |  |
| `"ipv4"` |  |
| `"requested_at_label"` |  |
| `"status"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/github_runner_egress`

#### GithubRunnerHistory

| Field | Description |
| --- | --- |
| `"activity"` |  |
| `"counts"` |  |
| `"observed_at"` |  |
| `"pagination"` |  |
| `"repositories"` |  |
| `"runs"` |  |
| `"setup"` | CI onboarding. |
| `"success_rate"` |  |
| `"usage"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/github_runner_history`

#### GithubRunnerImage

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"id"` |  |
| `"image_reference"` | Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+ |
| `"last_error"` |  |
| `"modal_image_id"` |  |
| `"name"` |  |
| `"registry_secret_name"` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/github_runner_images/{id}/prepare`

#### GithubRunnerPool

| Field | Description |
| --- | --- |
| `"cpu_millicores"` |  |
| `"enabled"` |  |
| `"github_app_installation_id"` |  |
| `"github_repository_id"` |  |
| `"github_runner_image"` |  |
| `"id"` |  |
| `"image"` | Organization image name or ID; null restores the standard image |
| `"invocations"` |  |
| `"label"` |  |
| `"last_error"` |  |
| `"last_polled_at"` |  |
| `"max_concurrency"` |  |
| `"memory_mb"` |  |
| `"organization_id"` |  |
| `"provider"` |  |
| `"repository_full_name"` |  |
| `"runtime_kind"` |  |
| `"timeout_seconds"` |  |

Operations: Create, List, Update.

API path: `/api/v1/organizations/{organization_id}/github_runner_pools`

#### GithubRunnerSetup

| Field | Description |
| --- | --- |
| `"error"` |  |
| `"github_repository_connection_id"` |  |
| `"id"` |  |
| `"pull_request_url"` |  |
| `"repository_full_name"` |  |
| `"roder_thread_id"` |  |
| `"runner_labels"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"summary"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/github_runner_setup`

#### Gitlab

| Field | Description |
| --- | --- |
| `"configured"` |  |
| `"connections"` |  |
| `"integrations"` |  |
| `"inventory_error"` |  |
| `"next_page"` |  |
| `"organization"` |  |
| `"projects"` |  |
| `"redirect_uri"` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `"selected_integration_id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/gitlab/authorize`

#### GitlabConnection

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{org_slug}/gitlab/connections/{connection_id}/control`

#### GitlabImport

| Field | Description |
| --- | --- |
| `"integration_id"` |  |
| `"project_id"` |  |
| `"repo_slug"` |  |
| `"source_branch"` |  |

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
| `"all_agents_access"` |  |
| `"enabled"` |  |
| `"execution_available"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/all_agents`

#### HostingAppDomain

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"certificate"` |  |
| `"created_at"` |  |
| `"dns_mode"` |  |
| `"dns_status"` |  |
| `"failure_message"` |  |
| `"hosted_app_id"` |  |
| `"hostname"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"last_checked_at"` |  |
| `"path_rules"` |  |
| `"record_name"` |  |
| `"record_type"` |  |
| `"record_value"` |  |
| `"redirect_to"` |  |
| `"static_site_id"` |  |
| `"target_kind"` |  |
| `"tls_status"` |  |
| `"updated_at"` |  |
| `"verification_record"` |  |
| `"verification_status"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/disable`

#### IdentityOrganization

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/identity/organizations/{organization_id}/catalog`

#### ImageRepository

| Field | Description |
| --- | --- |
| `"auth_configured"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"provider_kind"` |  |
| `"registry_auth_token"` |  |
| `"repository_path"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"visibility"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{org_slug}/image_repositories`

#### ImageRepositoryTag

| Field | Description |
| --- | --- |
| `"image_repository"` |  |
| `"name"` |  |
| `"registry_url"` |  |
| `"tags"` |  |

Operations: List.

API path: `/api/v1/artifacts/image_repositories/{id}/tags`

#### ImportBranchPolicy

| Field | Description |
| --- | --- |
| `"can_manage_pr_scenario_writing"` |  |
| `"can_manage_sandbox_region"` |  |
| `"dedicated_outbound_ip_addresses"` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `"default_trunk_bookmark"` |  |
| `"organization"` |  |
| `"sandbox_regions"` |  |

Operations: Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/import_branch_policy`

#### Integration

| Field | Description |
| --- | --- |
| `"github"` |  |
| `"gitlab"` |  |
| `"permissions"` |  |
| `"slack"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/integrations`

#### InteractionResponse

| Field | Description |
| --- | --- |
| `"answer"` |  |
| `"conversation_id"` | Explicit conversation identity, including an agent-scoped native session alias. |
| `"expected_revision"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses`

#### Invitation

| Field | Description |
| --- | --- |
| `"accepted_at"` |  |
| `"accepted_by_user"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"email"` |  |
| `"email_delivery_status"` |  |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"id"` |  |
| `"invite_url"` |  |
| `"invited_by_user"` |  |
| `"organization"` |  |
| `"revoked_at"` |  |
| `"role"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

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
| `"byte_size"` |  |
| `"ci_job_id"` |  |
| `"ci_pipeline_run_id"` |  |
| `"ci_step_id"` |  |
| `"content"` |  |
| `"content_format"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"organization_id"` |  |
| `"sequence_number"` |  |
| `"stream"` |  |
| `"updated_at"` |  |

Operations: Create, List.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks`

#### JobStep

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps`

#### JobWorkspace

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces`

#### JourneyVariantReplay

| Field | Description |
| --- | --- |
| `"actor_id"` |  |
| `"can_request_qualification"` |  |
| `"created_at"` |  |
| `"failure_code"` |  |
| `"failure_message"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"max_seconds"` |  |
| `"preparation_receipt"` |  |
| `"qualification"` |  |
| `"qualification_status"` |  |
| `"replay_required"` |  |
| `"review_reason"` |  |
| `"run_id"` |  |
| `"scenario_file"` |  |
| `"scenario_run_id"` |  |
| `"source_digest"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"variant_id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays`

#### Knowledge

| Field | Description |
| --- | --- |
| `"content_digest"` |  |
| `"content_json"` |  |
| `"document"` |  |
| `"documents"` |  |
| `"dreaming"` |  |
| `"expected_digest"` |  |
| `"history"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"markdown"` |  |
| `"observed_at"` |  |
| `"organization"` |  |
| `"permissions"` |  |
| `"project_id"` |  |
| `"project_name"` |  |
| `"projects"` |  |
| `"selected_project_id"` |  |
| `"source"` |  |
| `"title"` |  |
| `"total"` |  |

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
| `"changes_count"` |  |
| `"id"` |  |
| `"name"` | Display name |
| `"slug"` | Normalized identity used for filtering and lookup. |

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
| `"id"` |  |

Operations: Create.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/reconciliations/{reconciliation_id}/output`

#### LeaseStep

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id}`

#### LeaseVerifyDiagnostic

| Field | Description |
| --- | --- |
| `"browser_events"` |  |
| `"live_browser"` |  |
| `"live_view"` | The tester's read-only live stream for page viewers. |
| `"steps"` |  |

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
| `"id"` |  |

Operations: Update.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id}`

#### LocalAgentDecision

| Field | Description |
| --- | --- |
| `"request"` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/local_agent/decisions`

#### LocalAgentResponse

| Field | Description |
| --- | --- |
| `"input"` |  |
| `"model"` |  |
| `"service_tier"` |  |
| `"store"` |  |
| `"stream"` |  |
| `"tools"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/local_agent/responses`

#### LocalThreadDelivery

| Field | Description |
| --- | --- |
| `"decision"` |  |
| `"decision_pending"` |  |
| `"delivery"` |  |
| `"expected_version"` |  |
| `"id"` |  |
| `"policy"` |  |
| `"recovery_message"` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}`

#### LocalThreadOperation

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"arguments"` |  |
| `"created_at"` |  |
| `"delivery"` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `"device_id"` |  |
| `"diagnostic_code"` | Approved product error code retained after copied diagnostics expire. |
| `"end"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"key"` |  |
| `"provider"` |  |
| `"references"` |  |
| `"result"` |  |
| `"result_expired"` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `"state"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations`

#### Location

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"created_at"` |  |
| `"id"` |  |
| `"name"` |  |
| `"nomad_datacenter"` |  |
| `"updated_at"` |  |

Operations: List.

API path: `/api/v1/hosting/locations`

#### LogStreamChunk

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks`

#### LogoImage

| Field | Description |
| --- | --- |
| `"activated_products"` | Products this organization has activated (PRD 144). |
| `"agents_only"` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `"can_activate_products"` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"github_prs_authored_by_change_author"` |  |
| `"id"` |  |
| `"logo_url"` |  |
| `"member_count"` |  |
| `"name"` |  |
| `"pending_invitation_count"` |  |
| `"personal"` |  |
| `"repository_count"` |  |
| `"role"` |  |
| `"sandbox_region"` |  |
| `"shared_agent_personal_accounts_enabled"` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `"slug"` |  |
| `"source_control_providers"` | Connected source control providers for this organization. |
| `"source_ui_enabled"` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `"timezone"` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"verify_pr_scenario_writing_enabled"` |  |

Operations: Remove, Update.

API path: `/api/v1/organizations/{organization_id}/logo_image`

#### MarketingSetting

| Field | Description |
| --- | --- |
| `"call_first"` |  |

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
| `"active_organization"` |  |
| `"analytics_distinct_id"` |  |
| `"analytics_internal"` | Staff, team or test account; its product analytics are marked internal. |
| `"api_base_url"` |  |
| `"api_token"` |  |
| `"app_promotion"` |  |
| `"commit_author_email"` |  |
| `"email"` |  |
| `"enabled_features"` |  |
| `"github_pr_user_authorization_connected"` |  |
| `"github_pr_user_authorization_login"` |  |
| `"github_prs_authored_by_change_author"` |  |
| `"id"` |  |
| `"impersonation"` |  |
| `"name"` |  |
| `"next_path"` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `"onboarding"` | V2 agent onboarding progress. |
| `"openai_sign_in_connected"` |  |
| `"openai_sign_in_enabled"` |  |
| `"organizations"` |  |
| `"pending_organization_invitation_count"` |  |
| `"pending_organization_invitation_count_label"` |  |
| `"picture_url"` |  |
| `"superadmin"` | Present and true only for Composal staff superadmins, not while impersonating. |
| `"time_zone"` | The IANA zone the person chose for their agents' replies; null follows their app. |

Operations: Create, Load, Remove, Update.

API path: `/api/v1/me/account_deletion`

#### MeEmail

| Field | Description |
| --- | --- |
| `"account"` |  |
| `"can_delete"` |  |
| `"can_resend_verification"` |  |
| `"can_set_account"` |  |
| `"can_set_commit_author"` |  |
| `"commit_author"` |  |
| `"email"` |  |
| `"emails"` |  |
| `"id"` |  |
| `"message"` |  |
| `"verification_status"` |  |
| `"verified"` |  |

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
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}/files/{file_id}`

#### Member

| Field | Description |
| --- | --- |
| `"accepted_at"` |  |
| `"accepted_by_user"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"email"` |  |
| `"email_delivery_status"` |  |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"id"` |  |
| `"invite_url"` |  |
| `"invited_by_user"` |  |
| `"is_self"` |  |
| `"organization"` |  |
| `"revoked_at"` |  |
| `"role"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"user"` |  |

Operations: List, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/members`

#### Memory

| Field | Description |
| --- | --- |
| `"confidence"` |  |
| `"created_at"` |  |
| `"environment_id"` |  |
| `"finding"` |  |
| `"history"` |  |
| `"id"` |  |
| `"indexed_at"` |  |
| `"memory"` |  |
| `"project_id"` |  |
| `"response"` |  |
| `"scope"` |  |
| `"source"` |  |
| `"tags"` |  |
| `"title"` |  |
| `"workaround"` |  |

Operations: Create, List, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/memories`

#### MergeQueueEntry

| Field | Description |
| --- | --- |
| `"analytics"` | Queue performance for the reporting window. |
| `"change_id"` |  |
| `"expected_target_commit_id"` |  |
| `"expected_target_version"` |  |
| `"expected_version"` |  |
| `"github_pr_number"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"kind"` |  |
| `"policy"` |  |
| `"priority"` |  |
| `"queue"` |  |
| `"target_branches"` | Bookmark names for the target picker. |
| `"when_ready"` |  |

Operations: Create, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge`

#### MergeRequest

| Field | Description |
| --- | --- |
| `"available_tests"` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `"base_sha"` |  |
| `"branch"` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `"comment_url"` |  |
| `"current_run"` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `"draft"` |  |
| `"findings"` |  |
| `"github_repository"` | GitHub owner/repository associated with this pull request. |
| `"github_url"` |  |
| `"head_sha"` | If supplied, refuse to create a run unless this is the current PR head. |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"number"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"preview_cleanup_ready"` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `"preview_url"` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `"project"` |  |
| `"project_id"` | Composal project slug or public ID for PR preview environments. |
| `"project_slug"` |  |
| `"provider"` |  |
| `"pull_request"` |  |
| `"repository_id"` |  |
| `"request_label"` |  |
| `"requested_run_id"` |  |
| `"runs"` |  |
| `"source_branch"` |  |
| `"source_repository"` |  |
| `"source_url"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"web_path"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun`

#### MergeResolution

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"base"` | Common ancestor file contents |
| `"content"` |  |
| `"context"` | Optional surrounding files keyed by path |
| `"duration_ms"` |  |
| `"fallback"` |  |
| `"model"` |  |
| `"ours"` | Current / left file contents |
| `"path"` | Repository-relative path of the conflicted file |
| `"resolved"` |  |
| `"theirs"` | Incoming / right file contents |

Operations: Create.

API path: `/api/v1/merge_resolutions`

#### MessagingConversationMessage

| Field | Description |
| --- | --- |
| `"attachment_limit"` |  |
| `"attachment_max_bytes"` |  |
| `"client_operation_id"` |  |
| `"content"` |  |
| `"id"` |  |
| `"media"` |  |
| `"media_upload_ids"` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `"messages"` |  |
| `"reply_to"` | Public ID of a visible message |
| `"retry_attachment"` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `"send_blocked_reason"` |  |
| `"send_disposition"` |  |
| `"send_error"` |  |
| `"send_style"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction`

#### MessagingConversationUpload

| Field | Description |
| --- | --- |
| `"attachment"` |  |
| `"upload_id"` |  |

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
| `"accounts"` |  |
| `"agents"` |  |
| `"can_disconnect"` |  |
| `"connection_agent"` |  |
| `"email"` |  |
| `"id"` |  |
| `"label"` |  |
| `"provider"` |  |
| `"saved"` |  |
| `"status"` |  |
| `"usable"` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/api/v1/model_subscription_accounts`

#### ModelSubscriptionAccountConnection

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load, Update.

API path: `/api/v1/model_subscription_accounts/connection/{agent_id}`

#### NetworkConnection

| Field | Description |
| --- | --- |
| `"aws_client_vpn_profile"` |  |
| `"created_at"` |  |
| `"device_tag"` |  |
| `"id"` |  |
| `"name"` |  |
| `"oauth_client_id"` |  |
| `"oauth_client_secret"` |  |
| `"provider"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verify/network_connections`

#### NetworkingSpace

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{id}/activate`

#### Node

| Field | Description |
| --- | --- |
| `"account_avatar_url"` |  |
| `"account_id"` |  |
| `"account_login"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"installation_id"` |  |
| `"installed_at"` |  |
| `"installed_at_label"` |  |
| `"manage_access_url"` |  |
| `"organization_id"` |  |
| `"permission_entries"` | GitHub's permission hash as a display-ready list, sorted by name. |
| `"permissions"` |  |
| `"status"` |  |
| `"suspended_at"` |  |
| `"suspended_at_label"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

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
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/ci/nodes/{id}/leases/{lease_id}/claim`

#### NomadAllocation

| Field | Description |
| --- | --- |
| `"allocation_id"` |  |
| `"client_status"` |  |
| `"create_time"` |  |
| `"datacenter"` |  |
| `"desired_description"` |  |
| `"desired_status"` |  |
| `"fetched_at"` |  |
| `"id"` |  |
| `"job_id"` |  |
| `"modify_time"` |  |
| `"name"` |  |
| `"namespace"` |  |
| `"node_id"` |  |
| `"node_name"` |  |
| `"resources"` |  |
| `"task_group"` |  |
| `"task_states"` |  |
| `"verify_runner_images"` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}`

#### NomadLog

| Field | Description |
| --- | --- |
| `"allocation_id"` |  |
| `"environment"` |  |
| `"fetched_at"` |  |
| `"location"` |  |
| `"logs"` |  |
| `"namespace"` |  |
| `"offset"` |  |
| `"origin"` |  |
| `"service"` |  |
| `"task"` |  |
| `"type"` |  |

Operations: Load.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs`

#### Now

| Field | Description |
| --- | --- |
| `"needs_attention"` |  |
| `"pagination"` |  |
| `"recently_landed"` |  |
| `"shipping_now"` |  |
| `"summary"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/now`

#### ObservabilityClickhouseCluster

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/clickhouse_clusters/{id}/activate`

#### ObservabilityQuickwitCluster

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/quickwit_clusters/{id}/activate`

#### ObservabilitySpace

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |
| `"invitation"` |  |
| `"registration_options"` |  |
| `"requires_password_setup"` |  |
| `"start_guided_setup"` |  |

Operations: Create, Load.

API path: `/api/v1/org_invitations/{token}/accept`

#### Organization

| Field | Description |
| --- | --- |
| `"activated_products"` | Products this organization has activated (PRD 144). |
| `"agents_only"` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `"can_activate_products"` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"github_prs_authored_by_change_author"` |  |
| `"google_workspace_domain"` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `"id"` |  |
| `"logo_url"` |  |
| `"member_count"` |  |
| `"name"` |  |
| `"pending_invitation_count"` |  |
| `"personal"` |  |
| `"repository_count"` |  |
| `"role"` |  |
| `"sandbox_region"` |  |
| `"shared_agent_personal_accounts_enabled"` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `"slug"` |  |
| `"source_control_providers"` | Connected source control providers for this organization. |
| `"source_ui_enabled"` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `"timezone"` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"verify_pr_scenario_writing_enabled"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations`

#### OrganizationApp

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Create.

API path: `/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/control`

#### OrganizationIdentityCertificate

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"email"` |  |
| `"id"` |  |
| `"role"` |  |

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
| `"id"` |  |

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
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"created_by"` |  |
| `"current_version"` |  |
| `"description"` |  |
| `"env_key"` |  |
| `"expose_to_build"` |  |
| `"expose_to_ci"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"last_accessed_at"` |  |
| `"last_accessed_at_label"` |  |
| `"last_accessed_by"` |  |
| `"latest_version_number"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"owner_service_account_id"` |  |
| `"rotation_policy"` |  |
| `"scope_kind"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{id}/disable`

#### OrganizationServiceAccount

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate`

#### OrganizationSetting

| Field | Description |
| --- | --- |
| `"concurrent_run_limit_override"` |  |
| `"customize_onboarding_packages"` |  |
| `"daily_run_limit_override"` |  |
| `"deployment_usage_visibility"` |  |
| `"monthly_browser_minutes_limit_override"` |  |
| `"monthly_budget_dollars"` |  |
| `"name"` |  |
| `"onboarding_custom_pricing"` |  |
| `"onboarding_package_keys"` |  |

Operations: Update.

API path: `/api/v1/admin/organizations/{org_slug}/settings`

#### OrganizationSite

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"arguments"` |  |
| `"native_agent_id"` |  |
| `"tool"` |  |

Operations: Create.

API path: `/api/v1/spark/organizations/{organization_id}/tools`

#### OrganizationWorkloadIdentity

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"active_runs"` |  |
| `"checkout_required"` |  |
| `"cli_signed_in_at"` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `"counts"` |  |
| `"demo_project"` | The workspace's copy of the demo project, which setup offers as example data. |
| `"environments"` |  |
| `"included_deep_scan"` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `"onboarding_discovery"` |  |
| `"organization"` |  |
| `"permissions"` |  |
| `"project"` | The project the page is limited to, or null for the whole organization. |
| `"pull_request_launch_options"` |  |
| `"pull_requests"` |  |
| `"repositories"` |  |
| `"runs"` |  |
| `"runs_pagination"` |  |
| `"suggested_app_url"` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `"url_first_start"` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/page`

#### PageAgent

| Field | Description |
| --- | --- |
| `"agents"` |  |
| `"can_edit_integration_connections"` |  |
| `"creation_enabled"` |  |
| `"inbox"` |  |
| `"integration_choices"` |  |
| `"integration_choices_truncated"` |  |
| `"integration_selected"` |  |
| `"model_choices"` |  |
| `"new_configuration"` |  |
| `"organization_id"` |  |
| `"pagination"` |  |
| `"pinned_agent"` |  |
| `"platform_event_types"` |  |
| `"repository_choices"` | Empty compatibility field. |
| `"repository_choices_truncated"` |  |
| `"runtime_versions"` | Runtime choices authorized for this organization. |
| `"selected_agent"` |  |
| `"selected_reference"` |  |
| `"viewer_id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/page/activity`

#### PageArtefact

| Field | Description |
| --- | --- |
| `"artefact"` |  |
| `"automation"` |  |
| `"automation_invocation_id"` |  |
| `"byte_size"` |  |
| `"checksum_sha256"` |  |
| `"comment_threads"` |  |
| `"content_type"` |  |
| `"created_at"` |  |
| `"created_by_user_id"` |  |
| `"description"` |  |
| `"document_key"` | Stable document identity shared by all revisions. |
| `"draft"` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `"entrypoint"` |  |
| `"expires_at"` |  |
| `"filename"` |  |
| `"files"` |  |
| `"harness"` |  |
| `"harness_version"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"kinds"` |  |
| `"model"` |  |
| `"organization"` |  |
| `"organization_id"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"preview"` |  |
| `"published_at"` |  |
| `"published_at_label"` |  |
| `"publisher"` |  |
| `"repository"` |  |
| `"repository_id"` |  |
| `"selected_path"` |  |
| `"slug"` |  |
| `"source"` |  |
| `"status"` |  |
| `"title"` |  |
| `"vcs_agent_checkpoint_id"` |  |
| `"vcs_agent_session_id"` |  |
| `"version"` |  |
| `"versions"` |  |
| `"view_url"` |  |
| `"web_url"` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/artefacts/page`

#### PageCiPipelineRun

| Field | Description |
| --- | --- |
| `"error"` |  |
| `"id"` |  |
| `"jobs"` |  |

Operations: Load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page`

#### PageProjectRun

| Field | Description |
| --- | --- |
| `"available_tests"` |  |
| `"fix_scenario_count"` | How many scenarios the agent handoff covers, including those on other pages. |
| `"fix_scenarios"` | The fixable scenarios an agent handoff covers. |
| `"fixable_count"` |  |
| `"id"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"preparation_reason"` |  |
| `"project"` |  |
| `"run"` |  |
| `"scenario_runs"` |  |
| `"selected_scenario_run"` |  |
| `"web_path"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/page`

#### PageRepoVcCommit

| Field | Description |
| --- | --- |
| `"commit"` |  |
| `"diff_path"` | Fingerprinted path serving this commit range's file diff. |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits/{id}/page`

#### PagesBilling

| Field | Description |
| --- | --- |
| `"addons"` |  |
| `"breakdown"` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `"budget"` |  |
| `"can_manage_contact"` |  |
| `"can_manage_extra_spend"` |  |
| `"can_manage_local_subscription"` |  |
| `"can_manage_payment_method"` |  |
| `"can_set_up_billing"` |  |
| `"customer"` |  |
| `"deployment_usage_visible"` |  |
| `"entitlements"` |  |
| `"extra_spend_enabled"` | Organization consent to paid overages across all metered usage. |
| `"feature_enabled"` | Whether the `billing` feature is on for this organization. |
| `"organization_id"` |  |
| `"package"` |  |
| `"prepaid"` |  |
| `"preview"` | Metronome draft invoice and credits, or null. |
| `"storage_usage"` |  |
| `"stripe"` |  |
| `"subscription"` |  |
| `"token_account"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/billing`

#### PagesGithubOnboarding

| Field | Description |
| --- | --- |
| `"onboarding"` |  |
| `"organization"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/github_onboarding`

#### PagesMember

| Field | Description |
| --- | --- |
| `"accepted_at"` |  |
| `"accepted_by_user"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"email"` |  |
| `"email_delivery_status"` |  |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"id"` |  |
| `"invite_url"` |  |
| `"invited_by_user"` |  |
| `"organization"` |  |
| `"revoked_at"` |  |
| `"role"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/members`

#### PagesProjectCredential

| Field | Description |
| --- | --- |
| `"browser_authentication"` |  |
| `"composal_address"` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `"configured"` |  |
| `"credential_keys"` |  |
| `"description"` |  |
| `"email_link_auth_origins"` |  |
| `"has_inbox"` | Whether Composal provisioned this address and can show the mail it receives |
| `"id"` |  |
| `"identity_provider"` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `"instructions"` |  |
| `"login_method"` |  |
| `"login_url"` |  |
| `"managed"` |  |
| `"mfa_enabled"` |  |
| `"name"` |  |
| `"project_id"` |  |
| `"provider_guidance"` |  |
| `"sign_in_verified"` | A sign-in check confirmed this account signs in with its current settings |
| `"sign_in_verified_at"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"username"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/credentials`

#### PagesProjectPersona

| Field | Description |
| --- | --- |
| `"access_mode"` |  |
| `"active_run_count"` |  |
| `"archived_at"` |  |
| `"attention"` | What needs an operator's eye, problems before notices |
| `"capabilities"` |  |
| `"created_at"` |  |
| `"credential"` |  |
| `"credential_id"` | The credential this persona signs in with. |
| `"goals"` |  |
| `"health"` |  |
| `"id"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"project_id"` |  |
| `"role"` |  |
| `"scenario_count"` |  |
| `"updated_at"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas`

#### PagesProjectRun

| Field | Description |
| --- | --- |
| `"archived_at"` |  |
| `"browser_seconds"` |  |
| `"can_archive"` |  |
| `"can_restore"` |  |
| `"cleanup_state"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"duration_seconds"` |  |
| `"environment_name"` |  |
| `"finished_at"` |  |
| `"id"` |  |
| `"outcome"` |  |
| `"pull_request"` |  |
| `"pull_request_label"` |  |
| `"scenario_count"` |  |
| `"source_run"` |  |
| `"started_at"` |  |
| `"state"` |  |
| `"title"` |  |
| `"trigger_kind"` |  |
| `"triggered_by"` |  |
| `"web_path"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs`

#### PagesProjectScenario

| Field | Description |
| --- | --- |
| `"base_url"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenarios`

#### PagesRegistry

| Field | Description |
| --- | --- |
| `"active_repository_count"` |  |
| `"error"` |  |
| `"pagination"` |  |
| `"repositories"` |  |
| `"repository_count"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/registry`

#### PagesSession

| Field | Description |
| --- | --- |
| `"adapter"` |  |
| `"created_at"` |  |
| `"cursor"` |  |
| `"ended_at"` |  |
| `"external_session_id"` |  |
| `"facets"` |  |
| `"from"` |  |
| `"github_access_warnings"` |  |
| `"harness"` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `"id"` |  |
| `"last_activity_at"` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `"last_checkpoint_at"` |  |
| `"limit"` |  |
| `"markers"` |  |
| `"max_bytes"` |  |
| `"mode"` |  |
| `"offset"` |  |
| `"pagination"` |  |
| `"query"` |  |
| `"repo"` |  |
| `"repository"` |  |
| `"search"` |  |
| `"search_enabled"` |  |
| `"session"` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `"sessions"` |  |
| `"started_at"` |  |
| `"stats"` |  |
| `"status"` |  |
| `"title"` |  |
| `"to"` |  |
| `"token_stats"` |  |
| `"transcript_index"` |  |
| `"transcript_stats"` |  |
| `"updated_at"` |  |
| `"user"` |  |
| `"user_id"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{org_slug}/pages/sessions`

#### Pairing

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"files"` |  |
| `"id"` |  |
| `"patchset"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}`

#### PersonalAccessToken

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"env_key"` |  |
| `"id"` |  |
| `"mode"` |  |
| `"secret_id"` |  |
| `"secret_version_id"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings`

#### PreviewSecret

| Field | Description |
| --- | --- |
| `"env_key"` |  |
| `"id"` |  |
| `"name"` |  |
| `"slug"` |  |
| `"value"` |  |

Operations: Create, Remove.

API path: `/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate`

#### PreviewSharingApproval

| Field | Description |
| --- | --- |
| `"approved_build_keys"` |  |
| `"approved_build_secrets"` |  |
| `"approved_default_configuration"` |  |
| `"approved_default_secrets"` |  |
| `"approved_source_keys"` |  |
| `"build_keys"` |  |
| `"build_secrets"` |  |
| `"default_configuration"` |  |
| `"default_secrets"` |  |
| `"services"` |  |
| `"snapshot_version"` |  |
| `"source_keys"` |  |

Operations: Create, Load.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals`

#### ProactiveAgentWaitlistEntry

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"first_task"` | The first job they would hand an agent. |
| `"invite_code"` | The referral code of the invite link they arrived through. |
| `"places_per_referral"` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `"position"` | 1-based place in the queue. |
| `"position_after_next_referral"` | The place one more referral would give this entry, as Rails would assign it. |
| `"referral_code"` | Shared in this entry's invite link. |
| `"referral_count"` | People who joined through this entry's link. |
| `"total"` | Display total including a random increment per signup; not the actual number of entries. |
| `"website"` | Honeypot. |

Operations: Create, Load.

API path: `/api/v1/proactive_agent_waitlist_entries`

#### Product

| Field | Description |
| --- | --- |
| `"activated_products"` | Products this organization has activated (PRD 144). |
| `"agents_only"` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `"can_activate_products"` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"github_prs_authored_by_change_author"` |  |
| `"id"` |  |
| `"logo_url"` |  |
| `"member_count"` |  |
| `"name"` |  |
| `"pending_invitation_count"` |  |
| `"personal"` |  |
| `"product"` |  |
| `"repository_count"` |  |
| `"role"` |  |
| `"sandbox_region"` |  |
| `"shared_agent_personal_accounts_enabled"` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `"slug"` |  |
| `"source_control_providers"` | Connected source control providers for this organization. |
| `"source_ui_enabled"` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `"timezone"` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"verify_pr_scenario_writing_enabled"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/products`

#### ProductMapIdentityDecision

| Field | Description |
| --- | --- |
| `"observations"` |  |
| `"operation"` |  |
| `"reason"` |  |
| `"target"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions`

#### ProductMapJourney

| Field | Description |
| --- | --- |
| `"default_variant_id"` |  |
| `"goal"` |  |
| `"id"` |  |
| `"journey"` |  |
| `"next_cursor"` |  |
| `"preview"` |  |
| `"scope"` |  |
| `"title"` |  |
| `"tree"` |  |
| `"tree_loaded"` |  |
| `"variant_count"` |  |
| `"variants"` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys`

#### ProductMapJourneyReplay

| Field | Description |
| --- | --- |
| `"actor_id"` |  |
| `"can_request_qualification"` |  |
| `"created_at"` |  |
| `"failure_code"` |  |
| `"failure_message"` |  |
| `"id"` |  |
| `"preparation_receipt"` |  |
| `"qualification"` |  |
| `"qualification_status"` |  |
| `"replay_required"` |  |
| `"review_reason"` |  |
| `"run_id"` |  |
| `"scenario_run_id"` |  |
| `"source_digest"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"variant_id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification`

#### ProductMapObservation

| Field | Description |
| --- | --- |
| `"capture"` |  |
| `"events"` |  |
| `"evidence_id"` |  |
| `"id"` |  |
| `"observation_id"` |  |
| `"scope"` |  |
| `"state"` |  |
| `"status"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}`

#### ProductMapQuestion

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"area"` |  |
| `"before"` |  |
| `"claims"` |  |
| `"evidence_truncated"` |  |
| `"model"` |  |
| `"persona_id"` |  |
| `"query"` |  |
| `"question"` |  |
| `"reasoning_effort"` |  |
| `"revision_id"` |  |
| `"scope"` |  |
| `"since"` |  |
| `"state_id"` |  |
| `"status"` |  |
| `"unknowns"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions`

#### ProductMapState

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"attempts"` |  |
| `"captured_at"` |  |
| `"id"` |  |
| `"incoming"` |  |
| `"labels"` |  |
| `"layout"` |  |
| `"observation_id"` |  |
| `"omitted_controls"` |  |
| `"outgoing"` |  |
| `"revision_id"` |  |
| `"scope"` |  |
| `"screenshot_url"` |  |
| `"state"` |  |
| `"truncated"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/states`

#### Project

| Field | Description |
| --- | --- |
| `"archived_at"` |  |
| `"context"` |  |
| `"created_at"` |  |
| `"credentials"` |  |
| `"demo"` | Whether this is a signup demo project copied from the shared template. |
| `"documentation_urls"` |  |
| `"environments"` |  |
| `"execution_mode"` |  |
| `"icon_url"` |  |
| `"id"` |  |
| `"identity_provider"` | Where the organization's apps trust Composal sign-in, for new personas |
| `"lock_version"` |  |
| `"name"` |  |
| `"network_connections"` |  |
| `"organization_id"` |  |
| `"overview"` |  |
| `"permissions"` |  |
| `"personas"` |  |
| `"project"` |  |
| `"pull_request_options"` |  |
| `"pull_requests"` |  |
| `"purpose"` |  |
| `"runs"` |  |
| `"scenario_history"` |  |
| `"scenario_states"` | Scenarios by the state of their latest execution. |
| `"scenarios"` |  |
| `"setup_required"` |  |
| `"slug"` |  |
| `"updated_at"` |  |
| `"verifier_preferences"` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `"version"` |  |
| `"website_url"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/discovery`

#### ProjectAndroidApk

| Field | Description |
| --- | --- |
| `"android"` |  |
| `"artifact_paths"` |  |
| `"description"` |  |
| `"image"` |  |
| `"ios"` |  |
| `"launch_command"` |  |
| `"managed_binary"` |  |
| `"platform"` |  |
| `"provider"` |  |
| `"setup_command"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/android_apks`

#### ProjectCodeMap

| Field | Description |
| --- | --- |
| `"can_scan"` |  |
| `"commit_sha"` |  |
| `"configured"` |  |
| `"error_code"` |  |
| `"id"` |  |
| `"name"` |  |
| `"ref"` |  |
| `"repository_id"` |  |
| `"revision"` |  |
| `"slug"` |  |
| `"status"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps`

#### ProjectEnvironment

| Field | Description |
| --- | --- |
| `"allowed_actions"` |  |
| `"allowed_origins"` |  |
| `"archived_at"` |  |
| `"base_url"` |  |
| `"base_url_changeable"` | Whether an update may send a new base_url. |
| `"binary"` |  |
| `"conversation_only_messaging"` |  |
| `"created_at"` |  |
| `"desktop"` |  |
| `"execution_mode"` |  |
| `"id"` |  |
| `"imessage_number"` | International destination number; blank or null clears it on an added environment. |
| `"kind"` |  |
| `"lock_version"` |  |
| `"messaging_conversation"` |  |
| `"messaging_problem"` |  |
| `"messaging_source"` |  |
| `"messaging_tester_number"` | One configured tester number. |
| `"name"` |  |
| `"project_id"` |  |
| `"pull_request"` |  |
| `"source_branch"` |  |
| `"updated_at"` |  |
| `"verify_network_connection_id"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive`

#### ProjectFinding

| Field | Description |
| --- | --- |
| `"deferred_until"` |  |
| `"environment_name"` |  |
| `"id"` |  |
| `"last_seen_at"` |  |
| `"locked"` | True for a locked finding of the workspace's included scan before it pays. |
| `"severity"` |  |
| `"source"` | The workflow that produced the finding |
| `"source_title"` | The scenario, Discovery or Deep Scan that produced the finding |
| `"status"` |  |
| `"title"` |  |
| `"verification"` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `"web_path"` | Where the finding is reviewed within its source |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings`

#### ProjectFixture

| Field | Description |
| --- | --- |
| `"assignments"` | Every assignment with its target's name, including targets archived or disabled since. |
| `"byte_size"` |  |
| `"content_type"` |  |
| `"credential_ids"` |  |
| `"environment_ids"` |  |
| `"id"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"persona_ids"` |  |
| `"sha256"` |  |
| `"url"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures`

#### ProjectIosApp

| Field | Description |
| --- | --- |
| `"android"` |  |
| `"artifact_paths"` |  |
| `"description"` |  |
| `"image"` |  |
| `"ios"` |  |
| `"launch_command"` |  |
| `"managed_binary"` |  |
| `"platform"` |  |
| `"provider"` |  |
| `"setup_command"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps`

#### ProjectMessagingConversation

| Field | Description |
| --- | --- |
| `"assistant_number"` |  |
| `"attachment_limit"` |  |
| `"attachment_max_bytes"` |  |
| `"environment_name"` |  |
| `"id"` |  |
| `"leased"` |  |
| `"messages"` |  |
| `"reconciled_at"` |  |
| `"retirable"` |  |
| `"seeded"` |  |
| `"send_blocked_reason"` |  |
| `"send_disposition"` |  |
| `"send_error"` |  |
| `"tester_number"` |  |
| `"unknown_send"` |  |
| `"verify_environment_id"` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read`

#### ProjectOverviewMetric

| Field | Description |
| --- | --- |
| `"active_runs"` |  |
| `"open_findings"` |  |
| `"ready_environments"` |  |
| `"scenarios"` | Scenarios by the state of their latest execution. |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_metrics`

#### ProjectOverviewPullRequest

| Field | Description |
| --- | --- |
| `"base_sha"` |  |
| `"can_verify"` |  |
| `"comment_url"` |  |
| `"draft"` |  |
| `"github_repository"` | GitHub owner/repository associated with this pull request. |
| `"github_url"` |  |
| `"head_sha"` |  |
| `"id"` |  |
| `"latest_created_at"` |  |
| `"latest_current"` |  |
| `"latest_head_sha"` |  |
| `"latest_reason"` |  |
| `"latest_run_id"` |  |
| `"latest_state"` |  |
| `"number"` |  |
| `"project_id"` |  |
| `"project_slug"` |  |
| `"provider"` |  |
| `"repository_id"` |  |
| `"request_label"` |  |
| `"source_branch"` |  |
| `"source_repository"` |  |
| `"source_url"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"web_path"` |  |

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
| `"browser"` |  |
| `"created_at"` |  |
| `"draft"` | Present once drafted. |
| `"environment_id"` | The project environment the browser opens. |
| `"error"` |  |
| `"event_count"` |  |
| `"id"` |  |
| `"persona_id"` | The project persona the journey acts as. |
| `"phase"` | What the owner can do now. |
| `"signed_in_during_recording"` |  |
| `"start_path"` | A path on the environment to start at, such as /settings. |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish`

#### ProjectRunPlan

| Field | Description |
| --- | --- |
| `"archived_at"` |  |
| `"base_url"` |  |
| `"created_at"` |  |
| `"dependencies"` |  |
| `"id"` |  |
| `"identity_probe"` |  |
| `"kind"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"nodes"` |  |
| `"preview"` |  |
| `"project_id"` |  |
| `"updated_at"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive`

#### ProjectRunSchedule

| Field | Description |
| --- | --- |
| `"credential_ids"` |  |
| `"cron_expression"` |  |
| `"environment_id"` | Project environment slug or public ID. |
| `"environment_name"` |  |
| `"history"` |  |
| `"id"` |  |
| `"labels"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"next_run_at"` |  |
| `"notification_channel"` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `"scenario_count"` |  |
| `"selection_mode"` |  |
| `"slack_subscription_id"` |  |
| `"source_scenario_id"` |  |
| `"state"` |  |
| `"time_of_day"` |  |
| `"time_zone"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules`

#### ProjectScenarioOption

| Field | Description |
| --- | --- |
| `"environments"` |  |
| `"permissions"` |  |
| `"personas"` |  |
| `"project"` |  |
| `"scenario_states"` | Scenarios by the state of their latest execution. |
| `"scenarios"` |  |
| `"schedule_options"` |  |
| `"schedules"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_options`

#### ProjectScenarioRow

| Field | Description |
| --- | --- |
| `"actor_count"` |  |
| `"dependency_count"` |  |
| `"health"` |  |
| `"id"` |  |
| `"labels"` |  |
| `"name"` |  |
| `"persona_id"` |  |
| `"selectable_for_run"` |  |
| `"step_count"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows`

#### ProjectSetting

| Field | Description |
| --- | --- |
| `"available_messaging_environments"` |  |
| `"messaging_conversations"` |  |
| `"messaging_enabled"` |  |
| `"permissions"` |  |
| `"project"` |  |
| `"tester_numbers"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/settings`

#### PullRequest

| Field | Description |
| --- | --- |
| `"available_tests"` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `"branch"` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `"cleanup_only"` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `"current_run"` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `"findings"` |  |
| `"head_sha"` | If supplied, refuse to create a run unless this is the current PR head. |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"imessage_number"` | International destination of this exact deployed commit. |
| `"number"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"preview_cleanup_ready"` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `"preview_url"` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `"project"` |  |
| `"project_id"` | Composal project slug or public ID for PR preview environments. |
| `"pull_request"` |  |
| `"repository_id"` |  |
| `"runs"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share`

#### PullRequestAction

| Field | Description |
| --- | --- |
| `"action_name"` |  |
| `"body"` |  |
| `"comment_id"` |  |
| `"comments"` |  |
| `"event"` |  |
| `"expected_head_sha"` |  |
| `"id"` |  |
| `"label"` |  |
| `"line"` |  |
| `"node_id"` |  |
| `"operation_key"` |  |
| `"path"` |  |
| `"run_id"` |  |
| `"side"` |  |
| `"start_line"` |  |
| `"start_side"` |  |
| `"thread_id"` |  |

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
| `"app_preview_profile_id"` |  |
| `"app_service_id"` |  |
| `"bots"` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `"browser_options_available"` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `"ci_preview"` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `"concurrency"` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `"configured_repository"` |  |
| `"demo_videos"` | Record a short walkthrough of the change and add it to the PR comment. |
| `"demo_videos_enabled"` | Record a short walkthrough of the change and add it to the PR comment. |
| `"deployment"` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `"deployment_environment"` |  |
| `"enabled"` | Test PRs automatically. |
| `"environment"` | The environment whose test accounts sign in to the previews. |
| `"environments"` |  |
| `"github_check_enabled"` | Report the Composal Verify check on GitHub pull requests. |
| `"hosting_presets"` | Hosting services that build PR previews and the setup answers each needs |
| `"id"` |  |
| `"imessage_comment_prefix"` |  |
| `"imessage_number"` | International destination number; blank or null clears it on an added environment. |
| `"imessage_number_source"` |  |
| `"limits"` |  |
| `"link_pattern"` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `"links"` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `"max_seconds"` |  |
| `"messaging_enabled"` |  |
| `"messaging_tester_number"` | One configured tester number. |
| `"non_product_paths"` |  |
| `"permissions"` |  |
| `"pr_check"` | Report a Composal Verify check on GitHub PRs. |
| `"preview_access"` |  |
| `"preview_comment_authors"` |  |
| `"preview_comment_pattern"` |  |
| `"preview_comment_wildcard"` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `"preview_profile"` | composal: the preview profile that builds each PR. |
| `"preview_profiles"` |  |
| `"previews"` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `"project_id"` | Composal project owning this PR Testing configuration. |
| `"project_repositories"` |  |
| `"provider"` |  |
| `"repositories"` |  |
| `"repository"` | Repository ID; see repositories for its name. |
| `"repository_id"` |  |
| `"repository_kind"` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `"selected_repository"` |  |
| `"service"` | composal: the public service the browsers open. |
| `"settings"` |  |
| `"setup"` | The project's saved setup as answers, when it has one. |
| `"setup_defaults"` | The answers a new setup starts from |
| `"source_repository"` |  |
| `"target_mode"` |  |
| `"tester_numbers"` |  |
| `"trigger_label"` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `"trigger_on_comment"` |  |
| `"trigger_on_label"` |  |
| `"trigger_on_push"` |  |
| `"trigger_on_ready"` |  |
| `"triggers"` | When runs start. |
| `"verify_environment_id"` |  |
| `"write_scenarios"` | Draft and validate focused scenarios for each change on its preview. |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings`

#### PullRequestSettingAddRepository

| Field | Description |
| --- | --- |
| `"project_id"` |  |
| `"replace"` | Make these the project's only repositories. |
| `"repositories"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories`

#### PullRequestSettingDetectComment

| Field | Description |
| --- | --- |
| `"bots"` | The bots answer |
| `"deployment"` | The deployment answer |
| `"example_url"` |  |
| `"imessage_comment_prefix"` |  |
| `"imessage_number"` | International destination number; blank or null clears it on an added environment. |
| `"kind"` |  |
| `"link_pattern"` | The link_pattern answer |
| `"project_id"` | Project slug or ID. |
| `"provider"` | Who builds the previews, such as Vercel or GitLab |
| `"repository_id"` | Repository slug, ID or owner/name. |
| `"request_number"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments`

#### PullRequestTranscript

| Field | Description |
| --- | --- |
| `"adapter"` |  |
| `"created_at"` |  |
| `"ended_at"` |  |
| `"external_session_id"` |  |
| `"harness"` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `"id"` |  |
| `"last_activity_at"` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `"last_checkpoint_at"` |  |
| `"repository"` |  |
| `"started_at"` |  |
| `"stats"` |  |
| `"status"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"user"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts`

#### PullZone

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"slug"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/pull_zones`

#### Recorder

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"slug"` |  |

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
| `"agent_card_url"` |  |
| `"auth_scheme"` |  |
| `"can_configure"` |  |
| `"can_disconnect"` |  |
| `"can_setup"` |  |
| `"connection"` |  |
| `"credential"` | Write-only outbound key. |
| `"error_code"` |  |
| `"expected_generation"` |  |
| `"generation"` |  |
| `"id"` |  |
| `"name"` |  |
| `"remote_agent"` |  |
| `"requester_id"` |  |
| `"retired_at"` |  |
| `"revoked_at"` |  |
| `"scope_key"` |  |
| `"source_operation_id"` |  |
| `"state"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup`

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/execution/releases/{release_id}/rollouts/{id}/complete`

#### Repo

| Field | Description |
| --- | --- |
| `"can_retry_import"` | True when a failed client import can be requeued for CLI resume. |
| `"can_retry_sync"` | True when the latest sync run failed and can be retried. |
| `"disclaimer"` |  |
| `"federated_in_home"` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `"github_repository"` |  |
| `"icon_name"` |  |
| `"id"` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `"import_item_id"` |  |
| `"is_home"` |  |
| `"name"` |  |
| `"remote_repository"` |  |
| `"root_path"` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `"slug"` |  |
| `"sync_error_message"` |  |
| `"sync_provider"` |  |
| `"sync_status"` |  |

Operations: List, Load, Remove.

API path: `/api/v1/organizations/{org_slug}/repos`

#### RepoAccessToken

| Field | Description |
| --- | --- |
| `"access_token"` |  |
| `"active"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"credential_purpose"` | Issues a revocable read-write system credential valid for one hour. |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"expires_in_days"` |  |
| `"id"` |  |
| `"last_used_at"` |  |
| `"last_used_at_label"` |  |
| `"name"` |  |
| `"permission_level"` |  |
| `"plain_text_token"` |  |
| `"revoked_at"` |  |
| `"revoked_at_label"` |  |
| `"token_preview"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: Create, List, Remove.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens`

#### RepoAction

| Field | Description |
| --- | --- |
| `"pipeline"` |  |
| `"run"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/actions`

#### RepoAgentCheckpoint

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_checkpoints/{id}`

#### RepoAgentSession

| Field | Description |
| --- | --- |
| `"adapter"` |  |
| `"agent_session"` |  |
| `"external_session_id"` |  |
| `"id"` |  |
| `"status"` |  |
| `"title"` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete`

#### RepoBookmarkProtection

| Field | Description |
| --- | --- |
| `"actor_policy"` |  |
| `"bypass_mode"` |  |
| `"created_at"` |  |
| `"created_by_user_id"` |  |
| `"enabled"` |  |
| `"id"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"priority"` |  |
| `"repository_id"` |  |
| `"requirements"` |  |
| `"target_kind"` |  |
| `"target_pattern"` |  |
| `"updated_at"` |  |
| `"updated_by_user_id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections`

#### RepoBookmarkProtectionEvent

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"actor_kind"` |  |
| `"actor_label"` |  |
| `"actor_user_id"` |  |
| `"bookmark_name"` |  |
| `"bookmark_protection_rule_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"decision"` |  |
| `"id"` |  |
| `"intent"` |  |
| `"metadata"` |  |
| `"new_target"` |  |
| `"old_target"` |  |
| `"organization_id"` |  |
| `"reason_codes"` |  |
| `"repository_id"` |  |
| `"source_request_id"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events`

#### RepoCloudWorkspaceBackup

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/cloud_workspace_backups/{backup_key}/restore_request`

#### RepoCodeRule

| Field | Description |
| --- | --- |
| `"active_revision_number"` |  |
| `"capabilities"` |  |
| `"code_rule"` |  |
| `"created_at"` |  |
| `"definition"` |  |
| `"draft_pending"` | The latest revision is not the active one |
| `"enabled"` |  |
| `"expected_version"` |  |
| `"id"` |  |
| `"latest_revision_number"` |  |
| `"name"` | Name of the latest revision |
| `"repository"` |  |
| `"scope"` |  |
| `"slug"` |  |
| `"state_version"` | Send back as expected_version on every mutation |
| `"updated_at"` |  |
| `"web_url"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules`

#### RepoSetting

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"description"` |  |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"icon_name"` |  |
| `"id"` |  |
| `"last_used_at"` |  |
| `"last_used_at_label"` |  |
| `"merge_authority"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"permission_level"` |  |
| `"revoked_at"` |  |
| `"revoked_at_label"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"token_preview"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings`

#### RepoStat

| Field | Description |
| --- | --- |
| `"backend"` |  |
| `"can_refresh"` |  |
| `"freshness"` |  |
| `"note"` |  |
| `"physical"` |  |
| `"series"` |  |

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
| `"name"` |  |
| `"target_commit_id"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits`

#### ReportReplay

| Field | Description |
| --- | --- |
| `"agent_id"` |  |
| `"generated_at"` |  |
| `"id"` |  |
| `"recording"` |  |
| `"replay_steps"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}`

#### ReportScenario

| Field | Description |
| --- | --- |
| `"environment_name"` |  |
| `"goal"` |  |
| `"id"` |  |
| `"mode"` |  |
| `"permissions"` |  |
| `"project_id"` |  |
| `"related_explorations"` |  |
| `"report"` |  |
| `"saves_scenarios"` |  |
| `"scenario_generation"` |  |
| `"status"` |  |

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
| `"default_branch"` |  |
| `"git_auth_username"` |  |
| `"git_https_clone_url"` |  |
| `"git_https_supported"` |  |
| `"github_access_warnings"` |  |
| `"id"` |  |
| `"membership_role"` |  |
| `"organization_id"` |  |
| `"organization_name"` |  |
| `"organization_slug"` |  |
| `"repository_id"` |  |
| `"repository_name"` |  |
| `"repository_slug"` |  |

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
| `"can_manage_connections"` |  |
| `"github_imports"` |  |
| `"github_installations"` |  |
| `"gitlab_configured"` |  |
| `"gitlab_imports"` |  |
| `"gitlab_integrations"` |  |
| `"gitlab_redirect_uri"` |  |
| `"gitlab_self_managed_available"` |  |
| `"inventory_errors"` |  |
| `"organization_id"` |  |
| `"repositories"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/repository_import`

#### RepositoryImportSession

| Field | Description |
| --- | --- |
| `"action_required"` |  |
| `"authorization_endpoint"` |  |
| `"can_authorize_github"` |  |
| `"client_name"` |  |
| `"client_version"` |  |
| `"created_at"` |  |
| `"error_message"` |  |
| `"expires_at"` |  |
| `"git_imports"` |  |
| `"github_app_installation_id"` |  |
| `"github_connected"` |  |
| `"id"` |  |
| `"idempotency_key"` |  |
| `"organization_id"` |  |
| `"organization_slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, Load.

API path: `/api/v1/repository_import_sessions/{id}/authorization`

#### RepositoryImportSessionRepository

| Field | Description |
| --- | --- |
| `"default_branch"` |  |
| `"full_name"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"private"` |  |
| `"reason"` |  |
| `"selectable"` |  |
| `"status"` |  |
| `"visibility"` |  |

Operations: List.

API path: `/api/v1/repository_import_sessions/{id}/repositories`

#### RepositoryImportSessionSelection

| Field | Description |
| --- | --- |
| `"repositories"` |  |

Operations: Create.

API path: `/api/v1/repository_import_sessions/{id}/selections`

#### RepositorySandboxEnvironment

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/repositories/{repository}/sandbox_environments/validate`

#### RoderCodeRepair

| Field | Description |
| --- | --- |
| `"base_sha"` |  |
| `"cancel_requested"` |  |
| `"failure_code"` |  |
| `"id"` |  |
| `"launch_state"` |  |
| `"organization_id"` |  |
| `"repository_slug"` |  |
| `"roder_thread_id"` |  |
| `"roder_turn_id"` |  |
| `"scenario_run_id"` |  |
| `"task"` |  |
| `"trigger_kind"` |  |

Operations: Create, Load.

API path: `/api/v1/agent/roder/code_repairs/{id}/cancel`

#### RoderCodeRepairSetting

| Field | Description |
| --- | --- |
| `"available"` |  |
| `"daily_limit"` |  |
| `"enabled"` |  |
| `"enabled_at"` |  |
| `"operator_user_id"` |  |
| `"organization_id"` |  |
| `"repository_slug"` | Connected Composal repository required when enabling |

Operations: Create, Load.

API path: `/api/v1/agent/roder/code_repair_settings`

#### RoderMachine

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"api_token"` | Short-lived personal access token for the spawning user. |
| `"author_email"` |  |
| `"author_name"` |  |
| `"clone_url"` |  |
| `"default_branch"` |  |
| `"expires_at"` |  |
| `"organization_id"` |  |
| `"repository_id"` |  |
| `"repository_slug"` |  |
| `"repository_spec"` | The explicitly selected physical repository address. |
| `"required_lifetime_seconds"` | Lifetime the pending clone or command must be able to complete within. |
| `"token"` | Short-lived read/write repository credential. |
| `"username"` |  |

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
| `"active"` |  |
| `"allow_failure"` |  |
| `"cache_archive_observations"` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `"ci_pipeline_run_id"` |  |
| `"ci_runner_id"` |  |
| `"created_at"` |  |
| `"dependencies_csv"` |  |
| `"display_id"` |  |
| `"environment_csv"` |  |
| `"execution_order"` |  |
| `"execution_profile"` |  |
| `"exit_code"` |  |
| `"failed"` |  |
| `"finished_at"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"log_chunks"` |  |
| `"name"` |  |
| `"number"` |  |
| `"organization_id"` |  |
| `"queued_at"` |  |
| `"reconciliation_id"` |  |
| `"retry_number"` |  |
| `"reuse"` |  |
| `"runner_label_selector"` |  |
| `"slug"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |
| `"steps"` |  |
| `"timeout_seconds"` |  |
| `"updated_at"` |  |

Operations: Create, Load.

API path: `/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs`

#### RunScenarioRun

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/live_frame`

#### RunScheduleOption

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/options`

#### RunSearch

| Field | Description |
| --- | --- |
| `"runs"` |  |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/run_search`

#### RunUpdate

| Field | Description |
| --- | --- |
| `"base_sha"` |  |
| `"can_verify"` |  |
| `"comment_url"` |  |
| `"draft"` |  |
| `"github_repository"` | GitHub owner/repository associated with this pull request. |
| `"github_url"` |  |
| `"head_sha"` |  |
| `"id"` |  |
| `"latest_created_at"` |  |
| `"latest_current"` |  |
| `"latest_head_sha"` |  |
| `"latest_reason"` |  |
| `"latest_run_id"` |  |
| `"latest_state"` |  |
| `"number"` |  |
| `"project_id"` |  |
| `"project_slug"` |  |
| `"provider"` |  |
| `"repository_id"` |  |
| `"request_label"` |  |
| `"source_branch"` |  |
| `"source_repository"` |  |
| `"source_url"` |  |
| `"state"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"web_path"` |  |

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
| `"id"` |  |

Operations: Create, Load.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim`

#### RunnerPoolNodeEnrollmentToken

| Field | Description |
| --- | --- |
| `"capabilities_csv"` |  |
| `"ci_runner_pool_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"creator_user_id"` |  |
| `"description"` |  |
| `"expires_at"` |  |
| `"expires_at_label"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"last_used_at"` |  |
| `"last_used_at_label"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"raw_token"` |  |
| `"revoked_at"` |  |
| `"status"` |  |
| `"token_hint"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"usage_count"` |  |
| `"usage_count_label"` |  |

Operations: Create, List.

API path: `/api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens/{id}/revoke`

#### RunnerPoolRunner

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"can_manage"` |  |
| `"catalog"` |  |
| `"configuration"` |  |
| `"connected_profiles"` | Connected profiles per provider across the organization. |
| `"credentials"` |  |
| `"enabled"` |  |
| `"id"` |  |
| `"integrations"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"version"` |  |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/sandbox_integrations`

#### ScenarioRevision

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"batch"` | Shared by every revision one request or job saved. |
| `"created_at"` |  |
| `"definition"` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `"id"` |  |
| `"source"` | The client the save came through. |
| `"user"` | Null when a system job saved the Scenario. |
| `"version"` | The Scenario's lock_version after this save. |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/revisions`

#### ScenarioRunLesson

| Field | Description |
| --- | --- |
| `"finding"` |  |
| `"title"` | Defaults to the Scenario's name. |
| `"workaround"` |  |

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
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore`

#### SecretVersion

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact`

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints`

#### Setting

| Field | Description |
| --- | --- |
| `"can_manage_pr_scenario_writing"` |  |
| `"can_manage_sandbox_region"` |  |
| `"dedicated_outbound_ip_addresses"` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `"default_trunk_bookmark"` |  |
| `"organization"` |  |
| `"sandbox_regions"` |  |

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
| `"acked_at"` |  |
| `"acked_by"` | Who acked the signal, read from `acked_by_user_id`. |
| `"agent_runs"` | Dispatched-run summary (docs §6c). |
| `"app_service_id"` |  |
| `"attribution"` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `"created_at"` | ISO8601 row insert time — retention math and debugging only. |
| `"dedupe_key"` |  |
| `"hosted_app_id"` |  |
| `"id"` | The signal's own `sig_…` public id — also the paging cursor value. |
| `"kind"` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `"links"` | Canonical, relative API paths built from real routes (docs §6a). |
| `"occurred_at"` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `"organization_id"` |  |
| `"payload"` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `"recovery"` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `"resolution"` | Recovery pairing (docs §6b). |
| `"severity"` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `"source"` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `"subject_id"` |  |
| `"subject_type"` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `"summary"` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/signals/{id}/ack`

#### SignalInbound

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/signals/inbound/{provider}/{inbound_token}`

#### SignalIntegration

| Field | Description |
| --- | --- |
| `"api_token"` | Optional provider API token for target discovery and backfill. |
| `"api_token_stored"` |  |
| `"config"` |  |
| `"created_at"` |  |
| `"failure_message"` |  |
| `"id"` | Public id (`sint_…`). |
| `"inbound_path"` |  |
| `"inbound_url"` | The absolute URL to paste into the provider's webhook configuration. |
| `"last_received_at"` |  |
| `"last_verified_at"` |  |
| `"mode"` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `"name"` |  |
| `"organization_id"` |  |
| `"provider"` |  |
| `"rejected_signature_count"` | Deliveries rejected for a bad or missing signature. |
| `"status"` |  |
| `"target_count"` |  |
| `"unmapped_delivery_count"` | Deliveries accepted whose provider resource matched no enabled target. |
| `"updated_at"` |  |
| `"webhook_secret"` | The provider's signing secret. |
| `"webhook_secret_stored"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token`

#### SignalIntegrationDelivery

| Field | Description |
| --- | --- |
| `"attempt_count"` |  |
| `"created_at"` |  |
| `"delivery_id"` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `"event_kind"` |  |
| `"id"` | Public id (`sdel_…`). |
| `"last_error"` |  |
| `"ops_signal_id"` | Public id (`sig_…`) of the signal this delivery emitted. |
| `"organization_id"` |  |
| `"processed_at"` |  |
| `"provider"` |  |
| `"received_at"` |  |
| `"signal_integration_id"` |  |
| `"state"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries`

#### SignalIntegrationTarget

| Field | Description |
| --- | --- |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"display_name"` |  |
| `"enabled"` |  |
| `"external_id"` |  |
| `"external_kind"` |  |
| `"external_slug"` |  |
| `"hosted_app_id"` |  |
| `"id"` | Public id (`stgt_…`). |
| `"organization_id"` |  |
| `"signal_integration_id"` |  |
| `"signal_integration_targets"` |  |
| `"targets"` |  |
| `"updated_at"` |  |

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets`

#### SignalSubscription

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/signal_subscriptions`

#### Site

| Field | Description |
| --- | --- |
| `"activated_at"` |  |
| `"activated_at_label"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"creator_user_id"` |  |
| `"deploy_slug"` |  |
| `"failure_message"` |  |
| `"file_count"` |  |
| `"file_count_label"` |  |
| `"finished_at"` |  |
| `"finished_at_label"` |  |
| `"id"` |  |
| `"is_active"` |  |
| `"source_ref"` |  |
| `"started_at"` |  |
| `"started_at_label"` |  |
| `"static_site_id"` |  |
| `"status"` |  |
| `"total_bytes"` |  |
| `"total_bytes_label"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"uploaded_at"` |  |
| `"uploaded_at_label"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/sites`

#### SiteAccessKey

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Remove.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys`

#### SitePreview

| Field | Description |
| --- | --- |
| `"icon_data_url"` | The site's icon as a data: URL, up to 256 KB |
| `"title"` |  |
| `"url"` | The address as it will be saved |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/site_preview`

#### SiteSecret

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"native_agent_id"` |  |
| `"value"` |  |

Operations: Remove, Update.

API path: `/api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}`

#### SlackChannel

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"is_member"` |  |
| `"is_private"` |  |
| `"is_slack_connect"` |  |
| `"name"` |  |
| `"published"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/slack/channels`

#### SourceConnection

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/source_connections/{id}/refresh`

#### SpaceAlertRule

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/dns_records`

#### SpaceEnrollmentToken

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke`

#### SpaceGateway

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat`

#### SpaceGroup

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/groups`

#### SpaceGroupMembership

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate`

#### SpacePeer

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peers/{id}/approve`

#### SpacePeerAttachment

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/peer_attachments`

#### SpacePolicy

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load, Patch, Remove, Update.

API path: `/api/v1/networking/spaces/{space_id}/policies/{id}/activate`

#### SpaceSegment

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"activated_products"` | Products this organization has activated (PRD 144). |
| `"agents_only"` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `"can_activate_products"` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `"can_manage"` |  |
| `"compute_credit_cents"` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"credit_cents"` | Inference credit the workspace started Sparks with. |
| `"first_spark"` | Null until the first Spark exists or when the viewer cannot read it. |
| `"github_connected"` |  |
| `"github_prs_authored_by_change_author"` |  |
| `"id"` |  |
| `"jsonrpc"` |  |
| `"logo_url"` |  |
| `"member_count"` |  |
| `"method"` |  |
| `"name"` |  |
| `"params"` |  |
| `"pending_invitation_count"` |  |
| `"personal"` |  |
| `"repository_count"` |  |
| `"role"` |  |
| `"sandbox_region"` |  |
| `"shared_agent_personal_accounts_enabled"` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `"slug"` |  |
| `"source_control_providers"` | Connected source control providers for this organization. |
| `"source_ui_enabled"` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `"started"` | Whether the workspace has started Sparks. |
| `"timezone"` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"verify_pr_scenario_writing_enabled"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/sparks`

#### SparkAgentIntegration

| Field | Description |
| --- | --- |
| `"account_counts"` | Accounts the viewer can see per toolkit, across all account pages. |
| `"accounts_path"` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `"added_toolkits"` | Apps with a connected or connecting account the viewer can see. |
| `"can_manage"` |  |
| `"can_manage_organization"` |  |
| `"catalog"` |  |
| `"connect_as"` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `"connect_as_by_toolkit"` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `"connected_counts"` | Signed-in accounts per toolkit, across all account pages. |
| `"connection_id"` |  |
| `"connections"` |  |
| `"email"` | A native agent's own email address. |
| `"enabled"` |  |
| `"enabled_toolkits"` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `"generation"` |  |
| `"pagination"` |  |
| `"pending_counts"` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `"personal_creation_key_supported"` | The personal account creation endpoint honors a creation key. |
| `"private_agent"` | Only the agent's owner can chat with it. |
| `"shared_agent_personal_accounts_enabled"` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `"slack"` |  |
| `"webhook_connections"` |  |
| `"webhooks_available"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations`

#### SparkAgentLocalThread

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"archived"` | Archived on its computer: hidden from the active list and shown with the archived threads. |
| `"can_archive"` | This requester can archive or restore it, and the computer's Desktop supports archiving. |
| `"can_disconnect_relay"` |  |
| `"can_end"` |  |
| `"can_interrupt"` |  |
| `"can_send"` |  |
| `"created_at"` |  |
| `"delivery"` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `"device_id"` |  |
| `"device_name"` |  |
| `"diagnostic_code"` | Approved product error code retained after copied diagnostics expire. |
| `"end"` |  |
| `"expires_at"` |  |
| `"full_title"` | The native name or first prompt in full, for a tooltip. |
| `"id"` |  |
| `"key"` |  |
| `"last_activity_at"` |  |
| `"native_thread_id"` |  |
| `"parent_conversation_id"` |  |
| `"provider"` |  |
| `"references"` |  |
| `"relay_disconnected_at"` |  |
| `"relay_participant"` |  |
| `"result"` |  |
| `"result_expired"` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `"result_schema"` |  |
| `"section"` | Server-assigned section in the ordered computer thread directory. |
| `"state"` |  |
| `"status"` | What the native thread is doing. |
| `"task_configured"` |  |
| `"thread_id"` |  |
| `"title"` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

Operations: Create, Load, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads`

#### SparkAgentSite

| Field | Description |
| --- | --- |
| `"deployed_at"` |  |
| `"deployments_count"` |  |
| `"hostname"` |  |
| `"https"` | Whether the organization's certificate serves this site over HTTPS |
| `"id"` |  |
| `"name"` |  |
| `"url"` |  |
| `"visibility"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/sites`

#### SparkAgentSkill

| Field | Description |
| --- | --- |
| `"available"` |  |
| `"can_configure"` |  |
| `"can_manage"` |  |
| `"configuration_state"` | The requested managed skill selection is awaiting runtime qualification. |
| `"description"` |  |
| `"enabled"` |  |
| `"name"` |  |
| `"skills"` |  |
| `"version"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/skills`

#### SparkAgentThread

| Field | Description |
| --- | --- |
| `"archive_deletes_sandbox"` |  |
| `"archived"` |  |
| `"attention"` | Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish. |
| `"can_archive"` |  |
| `"can_compact"` |  |
| `"can_snooze"` |  |
| `"coordination_status"` | Durable work not represented by a native run: a queued input or an outstanding thread report. |
| `"execution"` | device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness. |
| `"first_input"` |  |
| `"first_input_key"` | Idempotency-Key that finds the first message through input_delivery. |
| `"first_input_requester_membership_id"` | Membership the first message was sent as, for input_delivery. |
| `"group"` | Rails-owned list group, in precedence order: attention, active run, coordination custody, then done. |
| `"has_active_run"` |  |
| `"id"` |  |
| `"inherit_context"` | Include the source conversation through its last completed reply. |
| `"is_main"` |  |
| `"kind"` |  |
| `"message"` | The thread's first message. |
| `"older"` | Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older. |
| `"parent_conversation_id"` | Optional source conversation belonging to this agent. |
| `"parent_conversation_title"` | Source conversation title, resolved independently of this page. |
| `"requester_membership_id"` |  |
| `"snoozed_until"` | When a snoozed thread returns to its usual group; null when it is not snoozed. |
| `"thread"` |  |
| `"title"` |  |
| `"updated_at"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive`

#### SparkCredit

| Field | Description |
| --- | --- |
| `"amount_cents"` | Purchase amount in USD cents. |
| `"autofill"` |  |
| `"autofill_payment_unconfirmed"` |  |
| `"available_usd"` |  |
| `"billing_unit"` | Compute minute quote version returned by the billing summary. |
| `"can_manage"` |  |
| `"compute_minutes"` |  |
| `"compute_usd"` |  |
| `"credits_per_usd"` |  |
| `"inference_usd"` |  |
| `"kind"` |  |
| `"payment_method"` |  |
| `"payments_enabled"` |  |
| `"plan"` |  |
| `"plans"` |  |
| `"quoted_credits_cents"` | Grant shown for a top-up or subscription, in usage cents. |
| `"quoted_price_cents"` | Monthly cash price shown for a subscription, in USD cents. |
| `"refill_limits_cents"` |  |
| `"refill_options"` |  |
| `"refill_thresholds_cents"` |  |
| `"request_key"` |  |
| `"settings"` |  |
| `"starter_cents"` |  |
| `"top_up_max_cents"` | Maximum manual top-up, in USD cents. |
| `"top_up_step_cents"` | Minimum manual top-up and increment, in USD cents. |

Operations: Create, Load, Patch, Update.

API path: `/api/v1/organizations/{org_slug}/spark_credits`

#### SparkCreditAgentUsage

| Field | Description |
| --- | --- |
| `"agents"` |  |
| `"all"` |  |
| `"days"` |  |
| `"id"` |  |
| `"owners"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/spark_credits/agent_usage/{agent_id}`

#### SparkCreditUsageTotal

| Field | Description |
| --- | --- |
| `"compute_minutes_used"` |  |
| `"compute_usd"` |  |
| `"inference_usd"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/spark_credits/usage_totals`

#### StaticSite

| Field | Description |
| --- | --- |
| `"active_deployment_id"` |  |
| `"cdn_hostname"` |  |
| `"cdn_url"` |  |
| `"cname_target"` |  |
| `"created_at"` |  |
| `"default_url"` |  |
| `"description"` |  |
| `"error_document"` |  |
| `"failure_message"` |  |
| `"hosted_app_id"` |  |
| `"id"` |  |
| `"index_document"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"provisioned"` |  |
| `"provisioned_at"` |  |
| `"region"` |  |
| `"replication_regions"` |  |
| `"repository_id"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/static_sites/{id}/provision`

#### StaticSiteDeployment

| Field | Description |
| --- | --- |
| `"activated_at"` |  |
| `"activated_at_label"` |  |
| `"commit_sha"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"creator_user_id"` |  |
| `"deploy_slug"` |  |
| `"failure_message"` |  |
| `"file_count"` |  |
| `"file_count_label"` |  |
| `"finished_at"` |  |
| `"finished_at_label"` |  |
| `"id"` |  |
| `"is_active"` |  |
| `"source_ref"` |  |
| `"started_at"` |  |
| `"started_at_label"` |  |
| `"static_site_id"` |  |
| `"status"` |  |
| `"total_bytes"` |  |
| `"total_bytes_label"` |  |
| `"trigger_kind"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |
| `"uploaded_at"` |  |
| `"uploaded_at_label"` |  |

Operations: Create, List, Load.

API path: `/api/v1/static_sites/{static_site_id}/deployments/{id}/activate`

#### StaticSiteDomain

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"dns_mode"` |  |
| `"dns_status"` |  |
| `"failure_message"` |  |
| `"hosted_app_id"` |  |
| `"hostname"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"last_checked_at"` |  |
| `"record_name"` |  |
| `"record_type"` |  |
| `"record_value"` |  |
| `"redirect_to"` |  |
| `"static_site_id"` |  |
| `"target_kind"` |  |
| `"tls_status"` |  |
| `"updated_at"` |  |
| `"verification_status"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/static_sites/{static_site_id}/domains/{id}/provision`

#### StatusChange

| Field | Description |
| --- | --- |
| `"change_id"` |  |
| `"id"` |  |
| `"patchsets"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/changes/{id}`

#### StatusCommit

| Field | Description |
| --- | --- |
| `"checks"` |  |
| `"commit_sha"` |  |
| `"counts"` |  |
| `"id"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |
| `"total"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/ci/status/commits/{commit_sha}`

#### StatusPatchset

| Field | Description |
| --- | --- |
| `"checks"` |  |
| `"checks_status"` |  |
| `"commit_sha"` |  |
| `"counts"` |  |
| `"id"` |  |
| `"patchset_id"` |  |
| `"status"` |  |
| `"status_label"` |  |
| `"status_state"` |  |
| `"status_tone"` |  |
| `"total"` |  |

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
| `"default_reasoning"` |  |
| `"id"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"reasoning"` | Effort levels this plan model accepts. |
| `"speeds"` | Speed modes advertised by this connected account and model. |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions/models`

#### SwarmEvent

| Field | Description |
| --- | --- |
| `"agent_swarm_id"` |  |
| `"attempt_id"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"payload"` |  |
| `"reason"` |  |
| `"scheduler_generation"` |  |
| `"task_id"` |  |

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
| `"task_id"` | A task public id; omitted |
| `"text"` |  |

Operations: Create.

API path: `/api/v1/agent/swarms/{swarm_id}/notes`

#### SwarmTask

| Field | Description |
| --- | --- |
| `"acceptance_commands"` |  |
| `"agent_swarm_id"` |  |
| `"assigned_runner_id"` |  |
| `"blocked_reason"` |  |
| `"changes"` |  |
| `"commit_count"` |  |
| `"commit_sha_result"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"current_attempt_id"` |  |
| `"deadline_at"` |  |
| `"depends_on_task_ids"` |  |
| `"depth"` |  |
| `"diff_artifact_url"` |  |
| `"display_id"` |  |
| `"environment_profile"` |  |
| `"error_message"` |  |
| `"failure_code"` |  |
| `"finished_at"` |  |
| `"finished_at_label"` |  |
| `"harness"` |  |
| `"id"` |  |
| `"input_revision"` |  |
| `"iteration"` |  |
| `"landing_state"` |  |
| `"model"` |  |
| `"model_provider"` |  |
| `"number"` |  |
| `"organization_id"` |  |
| `"owned_paths"` |  |
| `"parent_task_id"` |  |
| `"position"` |  |
| `"prompt"` |  |
| `"queued_at"` |  |
| `"queued_at_label"` |  |
| `"reasoning_effort"` |  |
| `"recent_activity"` |  |
| `"repo_url"` |  |
| `"result"` |  |
| `"retry_number"` |  |
| `"role"` |  |
| `"run_id"` |  |
| `"stack_after_task_id"` |  |
| `"started_at"` |  |
| `"started_at_label"` |  |
| `"status"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List, Load.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks`

#### TaskLease

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_jev`

#### ThreadPreview

| Field | Description |
| --- | --- |
| `"expires_at"` |  |
| `"port"` |  |
| `"url"` |  |

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
| `"category"` |  |
| `"created_at"` |  |
| `"details"` |  |
| `"feedback"` |  |
| `"id"` |  |
| `"metadata"` | Caller-supplied session context; no secrets or transcripts |
| `"organization_id"` |  |
| `"source"` |  |
| `"summary"` |  |
| `"user_id"` |  |

Operations: Create, Load.

API path: `/api/v1/organizations/{organization_id}/tool_feedbacks`

#### Transcript

| Field | Description |
| --- | --- |
| `"agent"` |  |
| `"author"` |  |
| `"checkpoint_pagination"` |  |
| `"checkpoints"` |  |
| `"id"` |  |
| `"last_checkpoint_at"` |  |
| `"selected_checkpoint"` |  |
| `"source_url"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"title"` |  |

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
| `"id"` |  |
| `"name"` |  |
| `"target_commit_id"` |  |

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
| `"activity"` |  |
| `"canonical_path"` |  |
| `"change"` |  |
| `"checks"` |  |
| `"checks_status"` |  |
| `"description"` |  |
| `"group"` |  |
| `"id"` |  |
| `"jj_change_id"` |  |
| `"labels"` |  |
| `"landing"` | Server-computed submitted-together closure and landing preflight. |
| `"number"` |  |
| `"patchset_number"` |  |
| `"previews"` |  |
| `"primary_status"` |  |
| `"public_id"` |  |
| `"related_changes"` |  |
| `"relation_chain"` |  |
| `"restack_state"` |  |
| `"review_summary"` |  |
| `"stack"` |  |
| `"status"` |  |
| `"sync"` |  |
| `"target"` |  |
| `"target_advanced"` |  |
| `"target_branch"` |  |
| `"title"` |  |
| `"url"` |  |

Operations: Create, List, Load, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/abandon`

#### VcChangeGroup

| Field | Description |
| --- | --- |
| `"changes"` |  |
| `"id"` |  |
| `"name"` |  |
| `"number"` |  |
| `"status"` |  |
| `"title"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups`

#### VcFile

| Field | Description |
| --- | --- |
| `"paths"` |  |
| `"truncated"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/files`

#### VcMergeQueue

| Field | Description |
| --- | --- |
| `"analytics"` | Queue performance for the reporting window. |
| `"id"` |  |
| `"policy"` |  |
| `"queue"` |  |
| `"target_branches"` | Bookmark names for the target picker. |

Operations: Create, List, Load, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause`

#### VcStack

| Field | Description |
| --- | --- |
| `"alias_ref_name"` |  |
| `"changes"` |  |
| `"code"` |  |
| `"id"` |  |
| `"landing"` | Compact landing state for the Stack CLI. |
| `"member_count"` |  |
| `"name"` |  |
| `"ref_name"` |  |
| `"status"` |  |
| `"tip_change_number"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List, Load, Update.

API path: `/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks`

#### VcsNode

| Field | Description |
| --- | --- |
| `"account_avatar_url"` |  |
| `"account_id"` |  |
| `"account_login"` |  |
| `"created_at"` |  |
| `"created_at_label"` |  |
| `"id"` |  |
| `"installation_id"` |  |
| `"installed_at"` |  |
| `"installed_at_label"` |  |
| `"manage_access_url"` |  |
| `"organization_id"` |  |
| `"permission_entries"` | GitHub's permission hash as a display-ready list, sorted by name. |
| `"permissions"` |  |
| `"status"` |  |
| `"suspended_at"` |  |
| `"suspended_at_label"` |  |
| `"updated_at"` |  |
| `"updated_at_label"` |  |

Operations: List.

API path: `/api/v1/organizations/{org_slug}/pages/vcs_nodes`

#### VcsSetting

| Field | Description |
| --- | --- |
| `"can_manage_pr_scenario_writing"` |  |
| `"can_manage_sandbox_region"` |  |
| `"dedicated_outbound_ip_addresses"` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `"default_trunk_bookmark"` |  |
| `"organization"` |  |
| `"sandbox_regions"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/vcs_settings`

#### VerificationProjectCredential

| Field | Description |
| --- | --- |
| `"browser_authentication"` |  |
| `"browser_session"` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `"composal_address"` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `"composal_inbox"` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `"composal_inbox_user"` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `"composal_managed_google"` | Select the Composal-managed Google test account when available. |
| `"configured"` |  |
| `"cookies"` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `"credential_keys"` |  |
| `"description"` | When to choose this account: role, plan, tenant and intended journeys |
| `"email_link_auth_origins"` | Explicit auth-service origins for protected email-link login and signup links. |
| `"has_inbox"` | Whether Composal provisioned this address and can show the mail it receives |
| `"id"` |  |
| `"identity_provider"` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `"instructions"` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `"login_method"` |  |
| `"login_url"` | Optional sign-in path or URL. |
| `"managed"` |  |
| `"mfa_enabled"` |  |
| `"name"` |  |
| `"oidc"` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `"passkey"` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `"password"` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `"project_id"` |  |
| `"provider_guidance"` |  |
| `"remove_browser_authentication"` |  |
| `"remove_totp"` |  |
| `"sign_in_verified"` | A sign-in check confirmed this account signs in with its current settings |
| `"sign_in_verified_at"` |  |
| `"status"` |  |
| `"totp_secret"` | Base32 setup key or otpauth URI, not a current one-time code |
| `"updated_at"` |  |
| `"username"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable`

#### VerificationProjectPersona

| Field | Description |
| --- | --- |
| `"access_mode"` |  |
| `"archived_at"` |  |
| `"capabilities"` |  |
| `"created_at"` |  |
| `"credential_id"` | The credential this persona signs in with. |
| `"goals"` |  |
| `"id"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"project_id"` |  |
| `"role"` |  |
| `"updated_at"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive`

#### VerificationProjectRun

| Field | Description |
| --- | --- |
| `"approved_at"` |  |
| `"approved_digest"` |  |
| `"archived_at"` |  |
| `"available_tests"` |  |
| `"can_archive"` |  |
| `"can_restore"` |  |
| `"can_start_another_run"` |  |
| `"cleanup_state"` |  |
| `"concurrency"` |  |
| `"created_at"` |  |
| `"creator_name"` |  |
| `"definition_mode"` |  |
| `"environment_id"` |  |
| `"id"` |  |
| `"lock_version"` |  |
| `"max_seconds"` |  |
| `"outcome"` |  |
| `"permissions"` |  |
| `"plan_digest"` |  |
| `"preparation_error_code"` |  |
| `"progress"` |  |
| `"project"` |  |
| `"project_id"` |  |
| `"pull_request"` |  |
| `"queued_at"` |  |
| `"run"` |  |
| `"run_plan_id"` |  |
| `"scenario_runs"` |  |
| `"source_run_id"` |  |
| `"source_versions"` |  |
| `"start_when_prepared"` | The run starts as soon as its browser plans are ready, without a review step. |
| `"state"` |  |
| `"target_snapshot"` |  |
| `"title"` |  |
| `"updated_at"` |  |
| `"verifier_preferences_snapshot"` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `"web_path"` | Path of the run's page in the web app, where it can be watched live. |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/archive`

#### VerificationProjectScenario

| Field | Description |
| --- | --- |
| `"actors"` |  |
| `"allowed_actions"` |  |
| `"archived_at"` |  |
| `"cleanup"` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `"created_at"` |  |
| `"dependencies"` |  |
| `"fixtures"` | Files upload steps choose, ordered by name. |
| `"health"` |  |
| `"id"` |  |
| `"identity_probe"` |  |
| `"if"` | A documented subset of Actions expressions. |
| `"labels"` | Short tags that group Scenarios, such as checkout or smoke |
| `"last_revision"` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `"lock_version"` |  |
| `"name"` |  |
| `"on"` | Explicit Actions-style automatic execution rules. |
| `"outcomes"` |  |
| `"persona_id"` |  |
| `"primary_actor"` |  |
| `"project_id"` |  |
| `"selectable_for_run"` |  |
| `"starting_conditions"` |  |
| `"steps"` |  |
| `"triggers"` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `"updated_at"` |  |
| `"version"` |  |

Operations: Create, List, Load, Patch, Update.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/scenarios/{id}/archive`

#### VerifyAppDomain

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/verify`

#### VerifyBrowserSession

| Field | Description |
| --- | --- |
| `"account_id"` | The project's active credential to refresh; omit to create a credential. |
| `"expires_at"` |  |
| `"id"` |  |
| `"name"` | Required when opening a browser for a new credential. |
| `"origin"` |  |
| `"project_id"` | The project (slug or ID) whose credential receives the session. |
| `"status"` |  |
| `"url"` |  |
| `"viewer_url"` | Owner-only bearer link. |

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
| `"api_token_stored"` |  |
| `"config"` |  |
| `"created_at"` |  |
| `"failure_message"` |  |
| `"id"` | Public id (`sint_…`). |
| `"inbound_path"` |  |
| `"inbound_url"` | The absolute URL to paste into the provider's webhook configuration. |
| `"last_received_at"` |  |
| `"last_verified_at"` |  |
| `"mode"` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `"name"` |  |
| `"organization_id"` |  |
| `"provider"` |  |
| `"rejected_signature_count"` | Deliveries rejected for a bad or missing signature. |
| `"status"` |  |
| `"target_count"` |  |
| `"unmapped_delivery_count"` | Deliveries accepted whose provider resource matched no enabled target. |
| `"updated_at"` |  |
| `"webhook_secret_stored"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/signal_integrations/{id}/verify`

#### VerifyStaticSiteDomain

| Field | Description |
| --- | --- |
| `"app_environment_id"` |  |
| `"app_service_id"` |  |
| `"created_at"` |  |
| `"dns_mode"` |  |
| `"dns_status"` |  |
| `"failure_message"` |  |
| `"hosted_app_id"` |  |
| `"hostname"` |  |
| `"id"` |  |
| `"kind"` |  |
| `"last_checked_at"` |  |
| `"record_name"` |  |
| `"record_type"` |  |
| `"record_value"` |  |
| `"redirect_to"` |  |
| `"static_site_id"` |  |
| `"target_kind"` |  |
| `"tls_status"` |  |
| `"updated_at"` |  |
| `"verification_status"` |  |

Operations: Create.

API path: `/api/v1/static_sites/{static_site_id}/domains/{id}/verify`

#### VersionLog

| Field | Description |
| --- | --- |
| `"base_image"` |  |
| `"failure_phase"` |  |
| `"id"` |  |
| `"image_digest"` |  |
| `"image_reference"` |  |
| `"installer_version"` |  |
| `"ready_at"` |  |
| `"receipt"` |  |
| `"safe_error"` |  |
| `"started_at"` |  |
| `"status"` |  |

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
| `"expires_at"` |  |
| `"origin"` |  |
| `"signatures"` |  |

Operations: Create.

API path: `/api/v1/verify/web_bot_auth`

#### WebhookGitlab

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/webhooks/gitlab/{connection_key}`

#### WorkflowRunStep

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped/{delivery_id}/run`

#### WorkspaceActivity

| Field | Description |
| --- | --- |
| `"live_activity"` |  |
| `"recent_items"` |  |
| `"unresolved_notification_count"` |  |

Operations: Load.

API path: `/api/v1/organizations/{org_slug}/pages/workspace_activity`

#### WorkspaceActivityNotification

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/organizations/{org_slug}/workspace_activity/notifications/{id}/dismissal`

#### WorkspaceSpace

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"default_branch"` |  |
| `"description"` |  |
| `"hidden"` |  |
| `"icon_name"` |  |
| `"id"` |  |
| `"import_status"` |  |
| `"name"` |  |
| `"organization_id"` |  |
| `"position"` |  |
| `"repository_id"` |  |
| `"repository_slug"` |  |
| `"slug"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces`

#### WorkspaceSpacePreference

| Field | Description |
| --- | --- |
| `"preferences"` |  |
| `"spaces"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/workspace_spaces/preferences`



## Entities


### A2aWellKnown

Create an instance: `a2aWellKnown := client.A2aWellKnown(nil)`


### AdminOrg

Create an instance: `adminOrg := client.AdminOrg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `billing_email` | `any` |  |
| `billing_reason` | `string` | Required when setting an agreed price |
| `customize_onboarding_packages` | `bool` |  |
| `deployment_usage_visibility` | `string` |  |
| `deployment_usage_visible` | `bool` |  |
| `id` | `string` |  |
| `monthly_price_dollars` | `any` | Ongoing USD workspace price, for example '50.00' |
| `monthly_price_override_cents` | `any` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `bool` |  |
| `onboarding_package_keys` | `any` | Package keys offered when customizing onboarding. |
| `owner_email` | `string` |  |
| `package_id` | `any` | Active customer package public ID. |
| `skip_payment` | `bool` | Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. |
| `slug` | `string` |  |

#### Example: Load

```go
adminOrg, err := client.AdminOrg(nil).Load(map[string]any{"id": "admin_org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(adminOrg.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AdminOrg(nil).Create(map[string]any{
    "name": "example_name",
    "owner_email": "example_owner_email",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Agent

Create an instance: `agent := client.Agent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `any` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `any` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `any` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `string` |  |
| `last_reply_at` | `any` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `[]any` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `any` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `[]any` | Teammates named as managers beside the owner. |
| `model_change_action` | `any` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `any` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `any` | A model's verdict on the agent's latest reply, judged once when it arrived. |
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

```go
agent, err := client.Agent(nil).Load(map[string]any{"id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agent.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agents, err := client.Agent(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Agent(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentApp

Create an instance: `agentApp := client.AgentApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `map[string]any` |  |
| `can_message` | `bool` | The viewer may send input to the author agent |
| `deployments_count` | `int` | Increases with every deploy of the site |
| `description` | `string` |  |
| `hidden_install_count` | `int` | Installs by agents the viewer cannot open |
| `id` | `string` |  |
| `install_count` | `int` |  |
| `installed_by` | `[]any` |  |
| `installed_target_ids` | `[]any` | Install targets of the viewer that have this app installed |
| `mcp_url` | `any` |  |
| `owner` | `map[string]any` | The person who controls the author agent |
| `thread` | `any` | The thread that published the app, when the viewer can open the author agent |
| `title` | `string` |  |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```go
agentApp, err := client.AgentApp(nil).Load(map[string]any{"id": "agent_app_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentApp.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentApps, err := client.AgentApp(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentApps.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentAppInstall

Create an instance: `agentAppInstall := client.AgentAppInstall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `installed` | `bool` |  |


### AgentAttachment

Create an instance: `agentAttachment := client.AgentAttachment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `int` |  |
| `content_type` | `string` |  |
| `file_name` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```go
result, err := client.AgentAttachment(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "byte_size": 1,
    "content_type": "example_content_type",
    "file_name": "example_file_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentAutomation

Create an instance: `agentAutomation := client.AgentAutomation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `definition` | `map[string]any` |  |
| `event_subscriptions` | `[]any` |  |
| `event_triggers` | `[]any` |  |
| `expected_revision` | `int` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `int` |  |
| `schedule` | `any` |  |
| `schedules` | `[]any` |  |
| `version` | `map[string]any` |  |

#### Example: Load

```go
agentAutomation, err := client.AgentAutomation(nil).Load(map[string]any{"id": "agent_automation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentAutomation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentAutomations, err := client.AgentAutomation(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentAutomations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentAvatar

Create an instance: `agentAvatar := client.AgentAvatar(nil)`


### AgentCommand

Create an instance: `agentCommand := client.AgentCommand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `display_name` | `string` |  |
| `name` | `string` |  |
| `skill_model_visible` | `bool` |  |
| `source` | `string` |  |

#### Example: List

```go
agentCommands, err := client.AgentCommand(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentCommands.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentComputer

Create an instance: `agentComputer := client.AgentComputer(nil)`


### AgentConnection

Create an instance: `agentConnection := client.AgentConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `[]any` |  |
| `activity` | `[]any` |  |
| `admin_disabled_at` | `any` |  |
| `agent_tools` | `bool` |  |
| `authentication` | `string` |  |
| `authorized_at` | `any` |  |
| `can_create_account` | `bool` | Whether another account can be created directly from this provider. |
| `capabilities` | `map[string]any` |  |
| `catalog_section` | `string` | Server-owned grouping in the agent integration catalog. |
| `category` | `string` | Short product label, such as CRM or Email. |
| `certification` | `string` |  |
| `checked_at` | `any` |  |
| `connection` | `map[string]any` |  |
| `consent` | `any` |  |
| `created_at` | `string` |  |
| `creation_key` | `string` | Reuse the same key to recover the account after an interrupted response. |
| `custodian_id` | `any` |  |
| `description` | `string` | One-line catalog description of the app. |
| `disabled_reason` | `any` |  |
| `failure_code` | `any` |  |
| `generation` | `int` |  |
| `grants` | `[]any` |  |
| `grants_pagination` | `map[string]any` |  |
| `id` | `string` |  |
| `limits` | `map[string]any` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `pagination` | `map[string]any` |  |
| `policy_digest` | `string` |  |
| `provider` | `map[string]any` |  |
| `provider_disabled_reason` | `any` |  |
| `provider_identity` | `map[string]any` |  |
| `revoked_at` | `any` |  |
| `schema_version` | `int` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `triggers` | `[]any` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
agentConnection, err := client.AgentConnection(nil).Load(map[string]any{"id": "agent_connection_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentConnection.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentConnections, err := client.AgentConnection(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentConnections.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentConnection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "toolkit": "example_toolkit",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentConnectionDelegation

Create an instance: `agentConnectionDelegation := client.AgentConnectionDelegation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authorized_by_id` | `string` |  |
| `automation_connection_grant_id` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `member_name` | `string` |  |
| `revoked_at` | `any` |  |
| `roles` | `[]any` |  |
| `usable` | `bool` |  |
| `user_id` | `string` |  |

#### Example: List

```go
agentConnectionDelegations, err := client.AgentConnectionDelegation(nil).List(map[string]any{"agent_connection_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentConnectionDelegations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentConnectionGrant

Create an instance: `agentConnectionGrant := client.AgentConnectionGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `[]any` |  |
| `agent_connection_id` | `string` |  |
| `automation_id` | `string` |  |
| `connection_generation` | `int` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revision` | `int` |  |
| `revoked_at` | `any` |  |
| `status` | `string` |  |
| `usable` | `bool` |  |
| `user_id` | `string` |  |

#### Example: List

```go
agentConnectionGrants, err := client.AgentConnectionGrant(nil).List(map[string]any{"agent_connection_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentConnectionGrants.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentConnectionResource

Create an instance: `agentConnectionResource := client.AgentConnectionResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cursor` | `any` |  |
| `next_cursor` | `any` |  |
| `query` | `string` |  |
| `resources` | `[]any` |  |

#### Example: Create

```go
result, err := client.AgentConnectionResource(nil).Create(map[string]any{
    "agent_connection_id": "example_agent_connection_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentConnectionSafetyControl

Create an instance: `agentConnectionSafetyControl := client.AgentConnectionSafetyControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_disabled_at` | `any` |  |
| `authorized_at` | `any` |  |
| `checked_at` | `any` |  |
| `created_at` | `string` |  |
| `custodian_id` | `any` |  |
| `failure_code` | `any` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `owner_name` | `string` |  |
| `ownership_kind` | `string` |  |
| `provider_disabled_reason` | `any` |  |
| `provider_identity` | `map[string]any` |  |
| `revoked_at` | `any` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `updated_at` | `string` |  |
| `user_id` | `string` |  |

#### Example: List

```go
agentConnectionSafetyControls, err := client.AgentConnectionSafetyControl(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentConnectionSafetyControls.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentConnectionTriggerSubscription

Create an instance: `agentConnectionTriggerSubscription := client.AgentConnectionTriggerSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_connection_id` | `string` |  |
| `configuration` | `map[string]any` |  |
| `created_at` | `string` |  |
| `defaults` | `map[string]any` |  |
| `delivery` | `string` |  |
| `enabled` | `bool` |  |
| `failure_code` | `any` |  |
| `failure_request_id` | `any` |  |
| `id` | `string` |  |
| `latency` | `string` |  |
| `name` | `string` |  |
| `reconcile_at` | `string` |  |
| `reconciliation_uncertain` | `bool` |  |
| `remote_enabled` | `any` |  |
| `replacement_id` | `any` |  |
| `retired_at` | `any` |  |
| `retirement_completed_at` | `any` |  |
| `schema` | `map[string]any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `toolkit` | `string` |  |
| `toolkit_version` | `string` |  |
| `trigger_slug` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `string` |  |
| `waiting_for_retirement` | `bool` |  |

#### Example: List

```go
agentConnectionTriggerSubscriptions, err := client.AgentConnectionTriggerSubscription(nil).List(map[string]any{"agent_connection_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentConnectionTriggerSubscriptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentConnectionTriggerSubscription(nil).Create(map[string]any{
    "agent_connection_id": "example_agent_connection_id",
    "organization_id": "example_organization_id",
    "configuration": map[string]any{},
    "trigger_slug": "example_trigger_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentContextCheckpoint

Create an instance: `agentContextCheckpoint := client.AgentContextCheckpoint(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentControlFlow

Create an instance: `agentControlFlow := client.AgentControlFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_cancel` | `bool` |  |
| `cancellation_requested` | `bool` |  |
| `device_name` | `string` |  |
| `flow_id` | `string` |  |
| `id` | `string` |  |
| `providers` | `[]any` |  |
| `repair_of_flow_id` | `string` | Original retained workflow for an explicitly repaired failed task. |
| `status_label` | `string` |  |
| `step_count` | `int` |  |
| `title` | `any` |  |

#### Example: Load

```go
agentControlFlow, err := client.AgentControlFlow(nil).Load(map[string]any{"id": "agent_control_flow_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentControlFlow.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentControlFlows, err := client.AgentControlFlow(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentControlFlows.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentCoordination

Create an instance: `agentCoordination := client.AgentCoordination(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentEmail

Create an instance: `agentEmail := client.AgentEmail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | `any` | What SES reported for mail the agent sent; null for received mail |
| `direction` | `string` | inbound: mail the agent received; outbound: mail it sent |
| `from` | `string` |  |
| `id` | `string` |  |
| `preview` | `string` |  |
| `received_at` | `string` |  |
| `recipient_tag` | `any` | The +tag the sender used, if any |
| `spam` | `bool` | SES judged it spam |
| `subject` | `any` |  |
| `text` | `string` | From, To, Subject and Date headers, a blank line, then the body as plain text |
| `to` | `[]any` |  |

#### Example: Load

```go
agentEmail, err := client.AgentEmail(nil).Load(map[string]any{"id": "agent_email_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentEmail.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentEvent

Create an instance: `agentEvent := client.AgentEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
agentEvent, err := client.AgentEvent(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentEvent.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentFile

Create an instance: `agentFile := client.AgentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_type` | `string` |  |
| `download_url` | `string` |  |
| `filename` | `string` |  |
| `id` | `string` |  |
| `size_bytes` | `int` |  |

#### Example: Load

```go
agentFile, err := client.AgentFile(nil).Load(map[string]any{"id": "agent_file_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentFile.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentInput

Create an instance: `agentInput := client.AgentInput(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_ids` | `[]any` | Completed uploads from the attachments endpoint, in order. |
| `attachments` | `[]any` |  |
| `browser_context` | `map[string]any` | Advisory snapshot of the browser pane beside this conversation when the message was sent. |
| `client_time` | `map[string]any` | The sending app's IANA time zone and clock, so the agent answers in the person's local time. |
| `conversation_id` | `string` | Main or a conversation identity returned by the agent thread list. |
| `model_policy` | `any` |  |
| `requester_membership_id` | `string` | Snapshot the membership supplied by conversation history for a NEW V1 input. |
| `speed` | `string` | Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. |
| `text` | `string` |  |

#### Example: Create

```go
result, err := client.AgentInput(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "browser_context": map[string]any{},
    "client_time": map[string]any{},
    "conversation_id": "example_conversation_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentIntegration

Create an instance: `agentIntegration := client.AgentIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `map[string]any` | Accounts the viewer can see per toolkit, across all account pages. |
| `can_cancel_sign_in` | `bool` | The viewer can cancel the unfinished authorization attempt. |
| `can_delete` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_enable` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_reconnect` | `bool` |  |
| `can_sync` | `bool` | The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished. |
| `catalog` | `[]any` |  |
| `connected_by` | `any` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `bool` | True when the viewer is the person whose sign-in this account is. |
| `connected_counts` | `map[string]any` | Signed-in accounts per toolkit, across all account pages. |
| `connections` | `[]any` |  |
| `creation_key` | `string` | Stable identity for retrying this creation; retain it after an uncertain response. |
| `creation_key_digest` | `any` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `pagination` | `map[string]any` |  |
| `pending_counts` | `map[string]any` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `provider_disabled_reason` | `any` |  |
| `provider_identity` | `map[string]any` |  |
| `provider_name` | `any` | The app's display name; null for a custom MCP server, which uses the account name. |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `bool` |  |
| `team_sharing_version` | `int` |  |
| `toolkit` | `string` |  |

#### Example: Load

```go
agentIntegration, err := client.AgentIntegration(nil).Load(map[string]any{"id": "agent_integration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentIntegration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentIntegration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "toolkit": "example_toolkit",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentIntegrationAccount

Create an instance: `agentIntegrationAccount := client.AgentIntegrationAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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
| `connected_by` | `any` | Name of the person whose sign-in this account is. |
| `connected_by_you` | `bool` | True when the viewer is the person whose sign-in this account is. |
| `creation_key_digest` | `any` | SHA-256 of the unfinished setup key for its original creator. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider_disabled_reason` | `any` |  |
| `provider_identity` | `map[string]any` |  |
| `reference` | `string` | Pins this account's current authorization, as agent_connection_ID:GENERATION. |
| `sharing_status` | `string` | Agent account audience, including legacy personal and paused access. |
| `status` | `string` |  |
| `team_sharing_enabled` | `bool` |  |
| `team_sharing_version` | `int` |  |
| `toolkit` | `string` |  |

#### Example: List

```go
agentIntegrationAccounts, err := client.AgentIntegrationAccount(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentIntegrationAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentIntegrationCallback

Create an instance: `agentIntegrationCallback := client.AgentIntegrationCallback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
agentIntegrationCallback, err := client.AgentIntegrationCallback(nil).Load(map[string]any{"connection_id": "connection_id", "state": "state"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentIntegrationCallback.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentInteraction

Create an instance: `agentInteraction := client.AgentInteraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `interactions` | `[]any` |  |

#### Example: Load

```go
agentInteraction, err := client.AgentInteraction(nil).Load(map[string]any{"id": "agent_interaction_id", "agent_id": "agent_id", "organization_id": "organization_id", "conversation_id": "conversation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentInteraction.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentInteractions, err := client.AgentInteraction(nil).List(map[string]any{"agent_id": "example", "organization_id": "example", "conversation_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentInteractions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentLibrary

Create an instance: `agentLibrary := client.AgentLibrary(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentManager

Create an instance: `agentManager := client.AgentManager(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `any` | Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you). |
| `avatar` | `any` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `can_delete` | `bool` | Whether this viewer may delete this v2 agent. |
| `can_edit_configuration` | `bool` |  |
| `can_manage` | `bool` |  |
| `can_manage_sharing` | `bool` |  |
| `can_name_managers` | `bool` | Whether the viewer may name managers now. |
| `can_queue_input` | `bool` | Current V2 authority to admit a durable input independently of native readiness. |
| `can_reconcile_save` | `bool` | May reconcile an identical previously accepted save; this does not authorize new configuration edits. |
| `configuration` | `any` |  |
| `configuration_revision` | `int` |  |
| `configuration_version` | `any` | Opaque version token. |
| `control_connections_available` | `bool` | Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused. |
| `controlling_user_id` | `string` |  |
| `coordination_available` | `bool` | Durable task controls remain available even when native conversation history is unavailable. |
| `created_at` | `string` |  |
| `direct_chat_available` | `bool` | Advisory availability of direct V1 chat. |
| `has_unread_updates` | `bool` |  |
| `id` | `string` |  |
| `last_reply_at` | `any` | When the agent's latest projected reply arrived, for grouping recent replies. |
| `lifecycle_actions` | `[]any` | Currently authorized lifecycle actions for the saved revision and observed state. |
| `lifecycle_version` | `any` | Opaque version token. |
| `local_agent_control_available` | `bool` | Whether this organization exposes paired local coding-agent control. |
| `managers` | `[]any` | Teammates named as managers beside the owner. |
| `model_change_action` | `any` | Advisory composer action. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `persona` | `any` |  |
| `preview` | `any` |  |
| `preview_received_at` | `any` | When a newer canonical conversation preview was first projected. |
| `provisioning` | `any` |  |
| `reply_triage` | `any` | A model's verdict on the agent's latest reply, judged once when it arrived. |
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

```go
result, err := client.AgentManager(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "user_id": "example_user_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentManagerChoice

Create an instance: `agentManagerChoice := client.AgentManagerChoice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
agentManagerChoices, err := client.AgentManagerChoice(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentManagerChoices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentMarketplace

Create an instance: `agentMarketplace := client.AgentMarketplace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bundle` | `map[string]any` |  |
| `can_manage` | `bool` |  |
| `catalog_key` | `any` | Stable key of a Composal listing, which names its character; null for other listings. |
| `categories` | `[]any` |  |
| `category` | `string` |  |
| `counts` | `map[string]any` |  |
| `created_at` | `string` |  |
| `expected_version` | `int` |  |
| `explainer` | `any` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `int` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `[]any` |  |
| `integrations` | `[]any` |  |
| `listing` | `any` |  |
| `listings` | `[]any` |  |
| `memories` | `[]any` |  |
| `name` | `string` |  |
| `next_page` | `any` |  |
| `organization_name` | `string` |  |
| `page_apps` | `[]any` |  |
| `publisher_avatar_url` | `any` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `sections` | `[]any` |  |
| `share_token` | `any` | Present only for people who manage the listing. |
| `skills` | `[]any` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `source_agent_id` | `string` | The V2 agent this listing was published from. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |
| `viewer` | `map[string]any` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```go
agentMarketplace, err := client.AgentMarketplace(nil).Load(map[string]any{"id": "agent_marketplace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentMarketplace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentMarketplace(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "bundle": map[string]any{},
    "category": "example_category",
    "name": "example_name",
    "summary": "example_summary",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentMarketplaceShared

Create an instance: `agentMarketplaceShared := client.AgentMarketplaceShared(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `catalog_key` | `any` | Stable key of a Composal listing, which names its character; null for other listings. |
| `category` | `string` |  |
| `counts` | `map[string]any` |  |
| `created_at` | `string` |  |
| `explainer` | `any` | The listing's public write-up in Markdown. |
| `featured` | `bool` |  |
| `from_composal` | `bool` | One of Composal's ready-made listings. |
| `id` | `string` |  |
| `installs_count` | `int` |  |
| `instructions` | `string` |  |
| `integration_toolkits` | `[]any` |  |
| `integrations` | `[]any` |  |
| `listing` | `any` |  |
| `memories` | `[]any` |  |
| `name` | `string` |  |
| `organization_name` | `string` |  |
| `page_apps` | `[]any` |  |
| `publisher_avatar_url` | `any` | The publisher's own profile picture; null for Composal's listings and publishers without one. |
| `publisher_name` | `string` | "Composal" on listings Composal publishes. |
| `share_token` | `any` | Present only for people who manage the listing. |
| `skills` | `[]any` |  |
| `slug` | `string` | Readable, permanent address segment: /marketplace/<slug>. |
| `summary` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |
| `viewer` | `map[string]any` | Who a public marketplace response was read for. |
| `visibility` | `string` |  |

#### Example: Load

```go
agentMarketplaceShared, err := client.AgentMarketplaceShared(nil).Load(map[string]any{"id": "agent_marketplace_shared_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentMarketplaceShared.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentMissionControl

Create an instance: `agentMissionControl := client.AgentMissionControl(nil)`


### AgentOperation

Create an instance: `agentOperation := client.AgentOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `map[string]any` | JSON object limited to 65536 encoded bytes. |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `operation` | `map[string]any` |  |
| `participant` | `string` |  |
| `requester_id` | `string` | Signed-in user public ID returned by discovery. |
| `scope_key` | `string` |  |

#### Example: Load

```go
agentOperation, err := client.AgentOperation(nil).Load(map[string]any{"id": "agent_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentOperation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentOperation(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "arguments": map[string]any{},
    "key": "example_key",
    "name": "example_name",
    "requester_id": "example_requester_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentProvisioning

Create an instance: `agentProvisioning := client.AgentProvisioning(nil)`


### AgentPullRequest

Create an instance: `agentPullRequest := client.AgentPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `number` | `int` |  |
| `owners` | `[]any` |  |
| `repository` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
agentPullRequests, err := client.AgentPullRequest(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentPullRequests.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentQuestion

Create an instance: `agentQuestion := client.AgentQuestion(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentRelayFileGrant

Create an instance: `agentRelayFileGrant := client.AgentRelayFileGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `revoked_at` | `any` |  |
| `snapshot_supported` | `bool` | Whether this selected permission supports snapshot controls. |
| `source_operation_id` | `string` |  |

#### Example: Load

```go
agentRelayFileGrant, err := client.AgentRelayFileGrant(nil).Load(map[string]any{"id": "agent_relay_file_grant_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentRelayFileGrant.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentRelayFileGrants, err := client.AgentRelayFileGrant(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentRelayFileGrants.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentRelayFileGrant(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "access_mode": "example_access_mode",
    "connection_id": "example_connection_id",
    "expected_generation": 1,
    "key": "example_key",
    "resource_id": "example_resource_id",
    "resource_kind": "example_resource_kind",
    "source_operation_id": "example_source_operation_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentRelayFileGrantAccount

Create an instance: `agentRelayFileGrantAccount := client.AgentRelayFileGrantAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_modes` | `[]any` | Supported file access modes. |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `resource_kind` | `string` |  |

#### Example: List

```go
agentRelayFileGrantAccounts, err := client.AgentRelayFileGrantAccount(nil).List(map[string]any{"organization_id": "example", "source_operation_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentRelayFileGrantAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentRepository

Create an instance: `agentRepository := client.AgentRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `environments` | `map[string]any` | Sandbox environment per granted repository ID, shared by every bot granted that repository. |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `repository_choices` | `[]any` |  |
| `repository_choices_error` | `any` | GitHub discovery warning. |
| `repository_choices_truncated` | `bool` |  |
| `version` | `int` |  |
| `work_repositories` | `[]any` |  |

#### Example: Load

```go
agentRepository, err := client.AgentRepository(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentRepository.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentResource

Create an instance: `agentResource := client.AgentResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `uri` | `string` |  |

#### Example: List

```go
agentResources, err := client.AgentResource(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentResources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentRoder

Create an instance: `agentRoder := client.AgentRoder(nil)`


### AgentRoutine

Create an instance: `agentRoutine := client.AgentRoutine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `consecutive_errors` | `int` |  |
| `credit_wait` | `map[string]any` | The wallet funding an enabled routine that is waiting for inference credit. |
| `description` | `any` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_error` | `any` |  |
| `last_run_at` | `any` |  |
| `last_status` | `any` |  |
| `managed` | `bool` |  |
| `name` | `string` |  |
| `next_run_at` | `any` |  |
| `routine` | `map[string]any` |  |
| `schedule` | `map[string]any` |  |
| `schedule_label` | `string` |  |
| `utility_model` | `map[string]any` |  |

#### Example: List

```go
agentRoutines, err := client.AgentRoutine(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentRoutines.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentRun

Create an instance: `agentRun := client.AgentRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `any` |  |
| `id` | `string` |  |
| `run_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```go
agentRun, err := client.AgentRun(nil).Load(map[string]any{"id": "agent_run_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentRun.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentRuntime

Create an instance: `agentRuntime := client.AgentRuntime(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_profiles` | `[]any` |  |
| `can_manage` | `bool` |  |
| `can_reset` | `bool` |  |
| `image` | `string` |  |
| `memory_mb` | `any` |  |
| `platform` | `string` |  |
| `profile` | `string` |  |
| `provider` | `string` |  |
| `state` | `string` |  |
| `version` | `string` |  |
| `volume` | `any` |  |


### AgentSession

Create an instance: `agentSession := client.AgentSession(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentSessionCheckpoint

Create an instance: `agentSessionCheckpoint := client.AgentSessionCheckpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
agentSessionCheckpoint, err := client.AgentSessionCheckpoint(nil).Load(map[string]any{"id": "agent_session_checkpoint_id", "agent_session_id": "agent_session_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSessionCheckpoint.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentSessionCheckpoint(nil).Create(map[string]any{
    "agent_session_id": "example_agent_session_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentSessionRoderHandoff

Create an instance: `agentSessionRoderHandoff := client.AgentSessionRoderHandoff(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checkpoint_id` | `string` | Public id of the checkpoint to hand off. |
| `purpose` | `string` | Handoff intent; defaults to `continue`. |

#### Example: Create

```go
result, err := client.AgentSessionRoderHandoff(nil).Create(map[string]any{
    "agent_session_id": "example_agent_session_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentSetting

Create an instance: `agentSetting := client.AgentSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_version` | `string` |  |
| `instructions` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
agentSetting, err := client.AgentSetting(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSetting.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentSharing

Create an instance: `agentSharing := client.AgentSharing(nil)`


### AgentSite

Create an instance: `agentSite := client.AgentSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `map[string]any` |  |
| `can_message` | `bool` | The viewer may send input to the author agent |
| `deployments_count` | `int` | Increases with every deploy of the site |
| `description` | `any` | The team app description, when the site is a team app |
| `icon_url` | `any` | Path of the site's generated icon, versioned by the picture; null until one is generated |
| `id` | `string` |  |
| `name` | `string` | The site's DNS label |
| `owner` | `map[string]any` | The person who controls the author agent |
| `thread` | `any` | The thread that published the site as a team app, when the viewer can open the author agent |
| `title` | `string` | The team app title, or the site name read as words |
| `url` | `string` |  |
| `visibility` | `string` |  |

#### Example: Load

```go
agentSite, err := client.AgentSite(nil).Load(map[string]any{"id": "agent_site_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSite.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentSites, err := client.AgentSite(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSites.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentSkill

Create an instance: `agentSkill := client.AgentSkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `[]any` | Active V2 agents the viewer can see whose owner is still a member |
| `audience` | `map[string]any` |  |
| `can_manage_library` | `bool` |  |
| `content` | `string` | The skill's SKILL.md |
| `files` | `[]any` |  |
| `id` | `string` |  |
| `marketplace` | `string` |  |
| `pending` | `bool` | Some agent is still applying a change; check again shortly |
| `plugin` | `string` | The marketplace entry id |
| `revision` | `string` | The commit SHA returned by preview |
| `skill` | `map[string]any` |  |
| `skills` | `[]any` |  |
| `source` | `string` | owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...] |

#### Example: Load

```go
agentSkill, err := client.AgentSkill(nil).Load(map[string]any{"id": "agent_skill_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSkill.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentSkill(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "audience": map[string]any{},
    "revision": "example_revision",
    "skills": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentSlack

Create an instance: `agentSlack := client.AgentSlack(nil)`


### AgentSubagent

Create an instance: `agentSubagent := client.AgentSubagent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `attention` | `any` | Why the person should open this thread, as the Threads panel shows it: a pending question, the agent asking for attention, or a run that did not finish. |
| `ended_at` | `any` |  |
| `id` | `string` |  |
| `model` | `any` |  |
| `parent_id` | `string` |  |
| `preview` | `any` |  |
| `started_at` | `any` |  |
| `state` | `any` | What the thread is to the viewer. |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `any` |  |

#### Example: List

```go
agentSubagents, err := client.AgentSubagent(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSubagents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentSubscription

Create an instance: `agentSubscription := client.AgentSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
agentSubscription, err := client.AgentSubscription(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSubscription.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentSubscription(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentSwarm

Create an instance: `agentSwarm := client.AgentSwarm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_bookmark` | `any` | An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`. |
| `base_ref` | `any` |  |
| `base_revision` | `any` | 64-hex commit id; skips the head lookup |
| `budget` | `map[string]any` |  |
| `canceled_at` | `any` |  |
| `canceled_count` | `int` |  |
| `concurrency_key` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `creator_user_id` | `any` |  |
| `deadline_at` | `any` |  |
| `display_id` | `int` |  |
| `done_count` | `int` |  |
| `environment` | `map[string]any` |  |
| `failed_count` | `int` |  |
| `finished_at` | `any` |  |
| `finished_at_label` | `any` |  |
| `github` | `map[string]any` |  |
| `goal` | `any` |  |
| `id` | `string` |  |
| `model` | `any` |  |
| `model_provider` | `any` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `any` |  |
| `outcome` | `any` |  |
| `phase` | `any` |  |
| `policy` | `map[string]any` | Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS. |
| `queued_at` | `any` |  |
| `queued_at_label` | `any` |  |
| `repository` | `string` | Repository slug inside the organization |
| `repository_id` | `any` |  |
| `repository_slug` | `any` |  |
| `reserved` | `map[string]any` |  |
| `scheduler_generation` | `int` |  |
| `skipped_count` | `int` |  |
| `slug` | `string` |  |
| `started_at` | `any` |  |
| `started_at_label` | `any` |  |
| `status` | `string` |  |
| `summary` | `map[string]any` |  |
| `target` | `map[string]any` | Where the swarm lands. |
| `task_count` | `int` |  |
| `task_template_json` | `any` |  |
| `tasks` | `[]any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `usage` | `map[string]any` |  |

#### Example: Load

```go
agentSwarm, err := client.AgentSwarm(nil).Load(map[string]any{"id": "agent_swarm_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentSwarm.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentSwarms, err := client.AgentSwarm(nil).List(map[string]any{"org": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSwarms.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentSwarm(nil).Create(map[string]any{
    "organization_slug": "example_organization_slug",
    "target": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentTeammate

Create an instance: `agentTeammate := client.AgentTeammate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatar` | `any` | Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters. |
| `id` | `string` |  |
| `name` | `string` |  |
| `persona` | `any` |  |
| `slug` | `string` |  |

#### Example: List

```go
agentTeammates, err := client.AgentTeammate(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentTeammates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentTerminal

Create an instance: `agentTerminal := client.AgentTerminal(nil)`


### AgentThread

Create an instance: `agentThread := client.AgentThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
agentThread, err := client.AgentThread(nil).Load(map[string]any{"id": "agent_thread_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentThread.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentThread(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentTool

Create an instance: `agentTool := client.AgentTool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `inputSchema` | `map[string]any` |  |
| `name` | `string` |  |

#### Example: List

```go
agentTools, err := client.AgentTool(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentTools.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentUsage

Create an instance: `agentUsage := client.AgentUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `days` | `[]any` | One cell per (day, model), ascending by day then model. |
| `ended_at` | `string` |  |
| `pricing_version` | `string` | The price table in effect now; rows carry the version they were priced at. |
| `source` | `string` | Which store served the rows. |
| `started_at` | `string` |  |
| `user_days` | `[]any` | One cell per (day, person), ascending by day. |
| `users` | `[]any` | One row per (person, model), descending by tokens. |
| `window` | `string` |  |

#### Example: Load

```go
agentUsage, err := client.AgentUsage(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentUsage.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentVerifyProject

Create an instance: `agentVerifyProject := client.AgentVerifyProject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` | Whether Verify is on for the organization; hide Verify access when false. |
| `can_manage` | `bool` | Whether the viewer can manage the agent and is a Verify admin. |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `project_choices` | `[]any` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` |  |
| `slug` | `string` |  |
| `verify_projects` | `[]any` |  |
| `version` | `int` |  |

#### Example: List

```go
agentVerifyProjects, err := client.AgentVerifyProject(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentVerifyProjects.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentWait

Create an instance: `agentWait := client.AgentWait(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWebPreview

Create an instance: `agentWebPreview := client.AgentWebPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `any` |  |
| `icon_url` | `any` |  |
| `image_url` | `any` |  |
| `title` | `any` |  |

#### Example: Load

```go
agentWebPreview, err := client.AgentWebPreview(nil).Load(map[string]any{"token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWebPreview.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentWebhook

Create an instance: `agentWebhook := client.AgentWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `connection` | `map[string]any` |  |
| `deliveries` | `[]any` |  |
| `event_types` | `[]any` |  |
| `expected_generation` | `int` |  |
| `id` | `string` |  |
| `max_events_per_day` | `int` |  |
| `name` | `string` |  |
| `purpose` | `string` |  |
| `signing_key` | `any` | Revealed only by the first successful creation or rotation response. |

#### Example: Load

```go
agentWebhook, err := client.AgentWebhook(nil).Load(map[string]any{"id": "agent_webhook_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWebhook.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentWebhook(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "event_types": []any{},
    "max_events_per_day": 1,
    "name": "example_name",
    "purpose": "example_purpose",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentWork

Create an instance: `agentWork := client.AgentWork(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AgentWorkflow

Create an instance: `agentWorkflow := client.AgentWorkflow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_digest` | `string` |  |
| `path` | `string` |  |
| `source` | `string` | At most 262144 UTF-8 bytes |
| `template` | `string` | A template id from the catalog's templates |
| `templates` | `[]any` |  |
| `truncated` | `bool` |  |
| `workflows` | `[]any` |  |

#### Example: Load

```go
agentWorkflow, err := client.AgentWorkflow(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWorkflow.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AgentWorkflow(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "path": "example_path",
    "template": "example_template",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AgentWorkflowProposal

Create an instance: `agentWorkflowProposal := client.AgentWorkflowProposal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_steps` | `map[string]any` | The model and reasoning the workflow's agent steps share. |
| `base_digest` | `any` | The saved workflow this proposal changes; null for a new workflow. |
| `can_manage` | `bool` |  |
| `can_revise` | `bool` | The viewer can choose the model and reasoning of the agent steps now, before saving. |
| `can_save` | `bool` | The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks. |
| `can_set_trigger` | `bool` | Saved as proposed with nothing starting it, so saving again sets its trigger. |
| `created_at` | `string` |  |
| `definition` | `any` |  |
| `digest` | `string` | Names the reviewed version, its source and trigger; send it to save this version. |
| `error` | `any` | Why the proposal no longer passes its checks, such as a model this agent no longer has. |
| `id` | `string` |  |
| `model_choices` | `[]any` | Models the viewer may choose for the agent steps before saving. |
| `name` | `string` |  |
| `native_rows` | `[]any` |  |
| `path` | `string` |  |
| `pipeline_checkpoints` | `map[string]any` |  |
| `pipeline_commands` | `map[string]any` |  |
| `reasoning_choices` | `[]any` | Reasoning levels the viewer may choose for the agent steps; none uses the agent's default. |
| `runs_on_earlier_version` | `any` | Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save. |
| `saved` | `any` |  |
| `stale` | `bool` | The workflow changed since the proposal, so it cannot be saved. |
| `starts` | `any` | What starts the workflow without a chat turn; saving the proposal sets this trigger. |
| `trigger_error` | `any` | Why the save could not set the trigger; only in the reply to that save. |

#### Example: Load

```go
agentWorkflowProposal, err := client.AgentWorkflowProposal(nil).Load(map[string]any{"id": "agent_workflow_proposal_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWorkflowProposal.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentWorkflowRun

Create an instance: `agentWorkflowRun := client.AgentWorkflowRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `any` | Saved native automation identity. |
| `budget_seconds` | `any` | The run stops once it has been running this long |
| `budget_usd` | `any` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `any` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `any` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `map[string]any` |  |
| `error` | `any` |  |
| `finished_at` | `any` |  |
| `flow_steps` | `any` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` | Public run ID. |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `any` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `any` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `any` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float64` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `any` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `int` |  |
| `steps` | `[]any` |  |
| `trigger_id` | `any` | The run settings that started it, for a run an event or schedule started |
| `wake_at` | `any` | When a sleeping run's step looks again |
| `workflow_digest` | `any` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `any` |  |

#### Example: Load

```go
agentWorkflowRun, err := client.AgentWorkflowRun(nil).Load(map[string]any{"id": "agent_workflow_run_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWorkflowRun.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentWorkflowRuns, err := client.AgentWorkflowRun(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentWorkflowRuns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentWorkflowTrigger

Create an instance: `agentWorkflowTrigger := client.AgentWorkflowTrigger(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budget` | `any` | Each run's limits, and what the trigger may spend per period with its runs' spend in the current one |
| `can_manage` | `bool` |  |
| `can_pause` | `bool` | It is running, so a manager can pause it |
| `can_resume` | `bool` | A person paused it, so a manager can resume it |
| `can_review` | `bool` | The file changed and nobody checked it, so a manager can review it and resume |
| `daily_limit` | `any` | How many events a day may start an event workflow's runs |
| `day_resets_at` | `any` | When the daily count starts again, at the organization's midnight |
| `id` | `string` |  |
| `kind` | `string` |  |
| `next_due_at` | `any` |  |
| `pause_cause` | `any` | A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing |
| `paused` | `bool` | The workflow starts nothing until a person resumes or checks it |
| `read_at` | `any` | The settings_changed_at you read; a change made since is refused |
| `run_budget_usd` | `any` |  |
| `schedule` | `any` | A cron expression with its time zone, or an interval in seconds from an anchor time |
| `settings_changed_at` | `any` | When a person or the agent last changed the run settings; sent back with a change |
| `skipped_today` | `int` | Events skipped today, over the daily limit or while paused |
| `stale_at` | `any` | When the workflow was paused; it starts nothing until resumed |
| `stale_reason` | `any` |  |
| `starts` | `any` | What events start an event workflow, as a proposal's start shows them |
| `subscription_id` | `any` | The event subscription that starts it |
| `time_zone` | `string` | The organization's IANA time zone, which the daily limit and budget periods count in |
| `today_count` | `any` | Events that started a run today, for an event workflow |
| `trigger` | `map[string]any` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```go
agentWorkflowTrigger, err := client.AgentWorkflowTrigger(nil).Load(map[string]any{"id": "agent_workflow_trigger_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentWorkflowTrigger.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentWorkflowTriggers, err := client.AgentWorkflowTrigger(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentWorkflowTriggers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentWorkspace

Create an instance: `agentWorkspace := client.AgentWorkspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_delete` | `bool` |  |
| `can_keep` | `bool` |  |
| `cleanup_after` | `any` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `reason` | `string` |  |
| `state` | `string` |  |

#### Example: List

```go
agentWorkspaces, err := client.AgentWorkspace(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentWorkspaces.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentWritePermission

Create an instance: `agentWritePermission := client.AgentWritePermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `string` | Whose account the writes run as, as the preview named it, such as Maya Chen through Linear. |
| `granted_at` | `string` |  |
| `granted_by` | `any` |  |
| `id` | `string` |  |
| `in_effect` | `bool` | Whether the permission approves writes now. |
| `last_used_at` | `any` |  |
| `tool` | `string` | The tool the agent writes with, such as linear.update_issue. |

#### Example: List

```go
agentWritePermissions, err := client.AgentWritePermission(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentWritePermissions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Agreement

Create an instance: `agreement := client.Agreement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `any` | Markdown text, or null until staff grant the organization access. |
| `effective_on_label` | `string` |  |
| `key` | `string` |  |
| `summary` | `string` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: List

```go
agreements, err := client.Agreement(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agreements.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgreementAccessRequest

Create an instance: `agreementAccessRequest := client.AgreementAccessRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.AgreementAccessRequest(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AlertRuleEvent

Create an instance: `alertRuleEvent := client.AlertRuleEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
alertRuleEvent, err := client.AlertRuleEvent(nil).Load(map[string]any{"id": "alert_rule_event_id", "alert_rule_id": "alert_rule_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(alertRuleEvent.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AlertRuleEvent(nil).Create(map[string]any{
    "alert_rule_id": "example_alert_rule_id",
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AllocationLog

Create an instance: `allocationLog := client.AllocationLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `environment` | `string` |  |
| `fetched_at` | `string` |  |
| `location` | `any` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `int` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
allocationLog, err := client.AllocationLog(nil).Load(map[string]any{"allocation_id": "allocation_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(allocationLog.(sdk.Entity).Data()) // the loaded entity's record
```


### App

Create an instance: `app := client.App(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `description` | `any` |  |
| `framework` | `any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `string` |  |
| `repository_kind` | `any` |  |
| `root_path` | `string` |  |
| `root_path_display` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
app, err := client.App(nil).Load(map[string]any{"id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(app.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
apps, err := client.App(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range apps.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.App(nil).Create(map[string]any{
    "name": "example_name",
    "organization_id": "example_organization_id",
    "repository_id": "example_repository_id",
    "root_path": "example_root_path",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppAccess

Create an instance: `appAccess := client.AppAccess(nil)`


### AppAccessJwk

Create an instance: `appAccessJwk := client.AppAccessJwk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
appAccessJwk, err := client.AppAccessJwk(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(appAccessJwk.(sdk.Entity).Data()) // the loaded entity's record
```


### AppCdn

Create an instance: `appCdn := client.AppCdn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `cache_path_prefix` | `any` |  |
| `cache_settings_json` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `distribution_kind` | `string` |  |
| `edge_hostname` | `any` |  |
| `failure_message` | `any` |  |
| `hosted_app_id` | `string` |  |
| `hostnames` | `[]any` |  |
| `id` | `string` |  |
| `last_deployed_at` | `any` |  |
| `last_deployed_at_label` | `any` |  |
| `last_purged_at` | `any` |  |
| `last_purged_at_label` | `any` |  |
| `last_synced_at` | `any` |  |
| `last_synced_at_label` | `any` |  |
| `name` | `string` |  |
| `origin_url` | `string` |  |
| `provisioned` | `bool` |  |
| `routing_settings_json` | `any` |  |
| `security_settings_json` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
appCdn, err := client.AppCdn(nil).Load(map[string]any{"id": "app_cdn_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appCdn.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppCdn(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "origin_url": "example_origin_url",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppConfigVariable

Create an instance: `appConfigVariable := client.AppConfigVariable(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `created_at` | `string` |  |
| `description` | `any` |  |
| `exposed_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `scope_kind` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `any` |  |
| `value_kind` | `string` |  |

#### Example: Load

```go
appConfigVariable, err := client.AppConfigVariable(nil).Load(map[string]any{"id": "app_config_variable_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appConfigVariable.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppConfigVariable(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "exposed_to_build": true,
    "key": "example_key",
    "scope_kind": "example_scope_kind",
    "value_kind": "example_value_kind",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppDataResource

Create an instance: `appDataResource := client.AppDataResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `any` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `any` |  |
| `provider_metadata` | `map[string]any` |  |
| `region` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `any` |  |
| `storage_label` | `any` |  |
| `updated_at` | `string` |  |
| `version` | `any` |  |

#### Example: Load

```go
appDataResource, err := client.AppDataResource(nil).Load(map[string]any{"id": "app_data_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appDataResource.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppDataResource(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "engine": "example_engine",
    "kind": "example_kind",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppDeploy

Create an instance: `appDeploy := client.AppDeploy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.AppDeploy(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "image": "example_image",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppDeployment

Create an instance: `appDeployment := client.AppDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `any` |  |
| `build_role` | `any` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `creator_user_id` | `any` |  |
| `deployed_url` | `any` |  |
| `display_id` | `int` |  |
| `failure_message` | `any` |  |
| `finished_at` | `any` |  |
| `finished_at_label` | `any` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `any` |  |
| `is_rollback` | `bool` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `number` | `int` |  |
| `operation_key` | `any` |  |
| `organization_id` | `string` |  |
| `rollback_reason` | `any` |  |
| `rollback_source_deployment_id` | `any` |  |
| `rollback_source_release_id` | `any` |  |
| `rollback_target_release_id` | `any` |  |
| `source_ref` | `any` |  |
| `started_at` | `any` |  |
| `started_at_label` | `any` |  |
| `status` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
appDeployment, err := client.AppDeployment(nil).Load(map[string]any{"id": "app_deployment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appDeployment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppDeployment(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppDeploymentOperation

Create an instance: `appDeploymentOperation := client.AppDeploymentOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `map[string]any` |  |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `app_service_placement_id` | `string` |  |
| `artifact_locator` | `any` |  |
| `build_duration_seconds` | `any` |  |
| `build_source` | `any` |  |
| `build_status` | `string` |  |
| `children` | `[]any` |  |
| `ci_pipeline_id` | `any` |  |
| `ci_pipeline_run_id` | `any` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `creator` | `any` |  |
| `deployed_url` | `any` |  |
| `duration_seconds` | `any` |  |
| `environment` | `map[string]any` |  |
| `failure_message` | `string` |  |
| `finished_at` | `string` |  |
| `history_kind` | `string` |  |
| `history_reason` | `any` |  |
| `id` | `string` |  |
| `is_live` | `bool` |  |
| `is_rollback` | `bool` |  |
| `live_region_count` | `int` |  |
| `location_id` | `string` |  |
| `number` | `int` |  |
| `placement` | `any` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollback_reason` | `any` |  |
| `rollback_source_release_id` | `any` |  |
| `rollback_target_release_id` | `any` |  |
| `rollout_predecessor_id` | `any` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `map[string]any` |  |
| `source_ref` | `any` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `total_replicas` | `int` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
appDeploymentOperation, err := client.AppDeploymentOperation(nil).Load(map[string]any{"id": "app_deployment_operation_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appDeploymentOperation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
appDeploymentOperations, err := client.AppDeploymentOperation(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appDeploymentOperations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AppDeploymentOperation(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppDeploymentRollback

Create an instance: `appDeploymentRollback := client.AppDeploymentRollback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_id` | `string` |  |
| `app_service_id` | `string` |  |
| `blockers` | `[]any` |  |
| `candidate_releases` | `[]any` |  |
| `confirmation_text` | `string` |  |
| `current_deployment` | `any` |  |
| `current_release` | `any` |  |
| `deployment` | `any` |  |
| `desired_state` | `any` |  |
| `environment` | `any` |  |
| `execution_allowed` | `bool` |  |
| `force` | `bool` |  |
| `idempotency_key` | `string` |  |
| `idempotent_reuse` | `bool` |  |
| `location` | `any` |  |
| `operation` | `any` |  |
| `reason` | `any` |  |
| `rollback_release` | `any` |  |
| `rollout` | `any` |  |
| `service` | `any` |  |
| `target_artifact_locator` | `any` |  |
| `target_release` | `any` |  |
| `to` | `string` |  |
| `warnings` | `[]any` |  |

#### Example: Create

```go
result, err := client.AppDeploymentRollback(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppEnvironment

Create an instance: `appEnvironment := client.AppEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `bool` |  |
| `base_domain` | `any` |  |
| `branch_pattern` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
appEnvironment, err := client.AppEnvironment(nil).Load(map[string]any{"id": "app_environment_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appEnvironment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppEnvironment(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "auto_deploy": true,
    "kind": "example_kind",
    "location_id": "example_location_id",
    "name": "example_name",
    "slug": "example_slug",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppLocation

Create an instance: `appLocation := client.AppLocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
appLocations, err := client.AppLocation(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appLocations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AppLocation(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "location_id": "example_location_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppMetric

Create an instance: `appMetric := client.AppMetric(nil)`


### AppPreview

Create an instance: `appPreview := client.AppPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `resource_overrides` | `map[string]any` | Service public IDs mapped to resource overrides. |
| `retained` | `bool` |  |
| `shared_data_binding_ids` | `[]any` | Replace explicitly shared captured native data connections. |
| `shared_service_binding_ids` | `[]any` | Replace the explicitly shared captured service dependencies. |
| `slug` | `string` |  |
| `source_ref` | `string` |  |
| `storage_binding_resources` | `map[string]any` | Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. |

#### Example: Load

```go
appPreview, err := client.AppPreview(nil).Load(map[string]any{"id": "app_preview_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appPreview.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppPreview(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "app_preview_profile_id": "example_app_preview_profile_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppPreviewProfile

Create an instance: `appPreviewProfile := client.AppPreviewProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `bool` |  |
| `configuration` | `map[string]any` |  |
| `created_at` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `source_environment_id` | `string` |  |
| `ttl_days` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
appPreviewProfile, err := client.AppPreviewProfile(nil).Load(map[string]any{"id": "app_preview_profile_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appPreviewProfile.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppPreviewProfile(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "slug": "example_slug",
    "source_environment_id": "example_source_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppRun

Create an instance: `appRun := client.AppRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `image` | `string` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

#### Example: Load

```go
appRun, err := client.AppRun(nil).Load(map[string]any{"id": "app_run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appRun.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppRun(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppSecret

Create an instance: `appSecret := client.AppSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `description` | `any` |  |
| `env_key` | `any` |  |
| `expose_to_build` | `bool` |  |
| `has_value` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_version_number` | `any` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `rotation_policy` | `any` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `value` | `string` |  |
| `value_digest` | `any` |  |
| `value_kind` | `any` |  |

#### Example: Load

```go
appSecret, err := client.AppSecret(nil).Load(map[string]any{"id": "app_secret_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appSecret.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
appSecrets, err := client.AppSecret(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appSecrets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AppSecret(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppService

Create an instance: `appService := client.AppService(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_deploy` | `bool` |  |
| `bindings` | `[]any` |  |
| `build_command` | `any` |  |
| `cpu_label` | `any` |  |
| `cpu_mhz` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `deploy_paths` | `[]any` | Explicit repo-root-relative path prefixes/globs a push must touch to auto-deploy. |
| `desired_instances` | `int` |  |
| `disk_label` | `any` |  |
| `disk_mb` | `any` |  |
| `effective_deploy_paths` | `[]any` | Tracked paths actually applied by the auto-deploy trigger (explicit deploy_paths, else [root_path]). |
| `healthcheck_path` | `any` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `internal_port` | `any` |  |
| `kind` | `string` |  |
| `memory_label` | `any` |  |
| `memory_max_label` | `any` |  |
| `memory_max_mb` | `any` | Hard memory limit in MB the task may burst to (Nomad MemoryMaxMB). |
| `memory_mb` | `any` |  |
| `name` | `string` |  |
| `nomad_constraints_json` | `any` |  |
| `nomad_kill_timeout_seconds` | `any` | Seconds the task gets after SIGTERM before SIGKILL. |
| `nomad_namespace` | `any` |  |
| `nomad_region` | `any` |  |
| `nomad_shutdown_delay_seconds` | `any` | Seconds Nomad waits between deregistering the group's services and sending SIGTERM, so the edge stops routing new requests to the allocation before it is signalled. |
| `nomad_ulimits_json` | `any` | Docker task ulimits as a JSON object of rlimit name to "soft:hard" (e.g. |
| `nomad_update_strategy_json` | `any` |  |
| `prestart_command` | `any` |  |
| `publicly_accessible` | `bool` |  |
| `release_command` | `any` |  |
| `repo_source_path` | `string` |  |
| `runtime` | `string` |  |
| `runtime_adapter_kind` | `string` |  |
| `runtime_adapter_settings_json` | `any` |  |
| `schedule` | `any` |  |
| `slug` | `string` |  |
| `source_path` | `string` |  |
| `start_command` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
appService, err := client.AppService(nil).Load(map[string]any{"id": "app_service_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appService.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppService(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "auto_deploy": true,
    "desired_instances": 1,
    "kind": "example_kind",
    "name": "example_name",
    "publicly_accessible": true,
    "runtime": "example_runtime",
    "runtime_adapter_kind": "example_runtime_adapter_kind",
    "slug": "example_slug",
    "source_path": "example_source_path",
    "start_command": "example_start_command",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppServiceBinding

Create an instance: `appServiceBinding := client.AppServiceBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
appServiceBinding, err := client.AppServiceBinding(nil).Load(map[string]any{"id": "app_service_binding_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appServiceBinding.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppServiceBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AppServicePlacement

Create an instance: `appServicePlacement := client.AppServicePlacement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `string` |  |
| `app_service_id` | `string` |  |
| `created_at` | `string` |  |
| `deployment_channel` | `any` | Preview-only override; null inherits the captured source channel. |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `organization_id` | `string` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollout_strategy` | `string` |  |
| `targets` | `[]any` |  |
| `total_replicas` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
appServicePlacement, err := client.AppServicePlacement(nil).Load(map[string]any{"id": "app_service_placement_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appServicePlacement.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
appServicePlacements, err := client.AppServicePlacement(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appServicePlacements.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AppStorageResource

Create an instance: `appStorageResource := client.AppStorageResource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `string` | Object-store semantics only; ignored for volume resources |
| `app_environment_id` | `any` |  |
| `attachment` | `any` | Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme. |
| `capacity_gb` | `any` | Enforced for nomad_csi (minimum 10 GB). |
| `capacity_label` | `any` |  |
| `created_at` | `string` |  |
| `ephemeral` | `bool` | True when the contents may be deleted at any time and do not survive the loss of the underlying node. |
| `external_volume_id` | `any` | Nomad/CSI volume id assigned at provisioning |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `location_code` | `any` |  |
| `location_id` | `any` | Volume datacenter pin (volume kind only) |
| `mount_path` | `any` |  |
| `name` | `string` |  |
| `provider` | `string` | Storage backend. |
| `provider_error` | `any` | Last provisioning/teardown error from the storage provider |
| `region` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
appStorageResource, err := client.AppStorageResource(nil).Load(map[string]any{"id": "app_storage_resource_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(appStorageResource.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.AppStorageResource(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "access_mode": "example_access_mode",
    "kind": "example_kind",
    "name": "example_name",
    "provider": "example_provider",
    "slug": "example_slug",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Artefact

Create an instance: `artefact := client.Artefact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automation_invocation_id` | `any` |  |
| `byte_size` | `int` |  |
| `checksum_sha256` | `string` |  |
| `content_type` | `string` |  |
| `created_at` | `any` |  |
| `created_by_user_id` | `any` |  |
| `description` | `any` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `entrypoint` | `string` |  |
| `expires_at` | `any` |  |
| `filename` | `string` |  |
| `files` | `[]any` |  |
| `harness` | `any` |  |
| `harness_version` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `model` | `any` |  |
| `organization_id` | `string` |  |
| `published_at` | `any` |  |
| `repository_id` | `any` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `any` |  |
| `vcs_agent_session_id` | `any` |  |
| `version` | `int` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```go
artefact, err := client.Artefact(nil).Load(map[string]any{"id": "artefact_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artefact.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
artefacts, err := client.Artefact(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range artefacts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Artefact(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtefactCommentThread

Create an instance: `artefactCommentThread := client.ArtefactCommentThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anchor` | `string` | The `#anchor` written into the Markdown. |
| `body` | `string` |  |
| `comments` | `[]any` |  |
| `id` | `string` | The anchor key. |
| `quote` | `string` |  |
| `resolved` | `bool` |  |

#### Example: List

```go
artefactCommentThreads, err := client.ArtefactCommentThread(nil).List(map[string]any{"artefact_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range artefactCommentThreads.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ArtefactCommentThread(nil).Create(map[string]any{
    "artefact_id": "example_artefact_id",
    "organization_id": "example_organization_id",
    "anchor": "example_anchor",
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtefactRevision

Create an instance: `artefactRevision := client.ArtefactRevision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_version` | `int` | The newest version the editor started from. |
| `content` | `string` | Markdown, including CriticMarkup suggestions and comment anchors. |

#### Example: Create

```go
result, err := client.ArtefactRevision(nil).Create(map[string]any{
    "artefact_id": "example_artefact_id",
    "organization_id": "example_organization_id",
    "base_version": 1,
    "content": "example_content",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtefactViewToken

Create an instance: `artefactViewToken := client.ArtefactViewToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_in` | `int` |  |
| `file` | `string` | Exact manifest path. |
| `organization_slug` | `string` | If provided, must match the organization addressed by the route. |
| `version` | `int` |  |
| `viewer_url` | `string` |  |

#### Example: Create

```go
result, err := client.ArtefactViewToken(nil).Create(map[string]any{
    "artefact_id": "example_artefact_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Artifact

Create an instance: `artifact := client.Artifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
artifact, err := client.Artifact(nil).Load(map[string]any{"id": "artifact_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifact.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Artifact(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtifactCacheNamespace

Create an instance: `artifactCacheNamespace := client.ArtifactCacheNamespace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
artifactCacheNamespace, err := client.ArtifactCacheNamespace(nil).Load(map[string]any{"id": "artifact_cache_namespace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactCacheNamespace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ArtifactCacheNamespace(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtifactImageRepository

Create an instance: `artifactImageRepository := client.ArtifactImageRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
artifactImageRepository, err := client.ArtifactImageRepository(nil).Load(map[string]any{"id": "artifact_image_repository_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactImageRepository.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ArtifactImageRepository(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtifactPackageMirror

Create an instance: `artifactPackageMirror := client.ArtifactPackageMirror(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
artifactPackageMirror, err := client.ArtifactPackageMirror(nil).Load(map[string]any{"id": "artifact_package_mirror_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactPackageMirror.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ArtifactPackageMirror(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ArtifactRetentionPolicy

Create an instance: `artifactRetentionPolicy := client.ArtifactRetentionPolicy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
artifactRetentionPolicy, err := client.ArtifactRetentionPolicy(nil).Load(map[string]any{"id": "artifact_retention_policy_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactRetentionPolicy.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ArtifactRetentionPolicy(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AttachmentPart

Create an instance: `attachmentPart := client.AttachmentPart(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### AuditEvent

Create an instance: `auditEvent := client.AuditEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_user_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `id` | `string` |  |
| `observability_space_id` | `any` |  |
| `organization_id` | `string` |  |
| `payload` | `any` |  |
| `request_id` | `any` |  |
| `severity` | `string` |  |
| `subject_id` | `string` |  |
| `subject_kind` | `string` |  |
| `subject_name` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
auditEvents, err := client.AuditEvent(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range auditEvents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Auth

Create an instance: `auth := client.Auth(nil)`


### AuthCli

Create an instance: `authCli := client.AuthCli(nil)`


### AuthGithub

Create an instance: `authGithub := client.AuthGithub(nil)`


### AuthGoogle

Create an instance: `authGoogle := client.AuthGoogle(nil)`


### AuthOpenai

Create an instance: `authOpenai := client.AuthOpenai(nil)`


### AuthPasswordReset

Create an instance: `authPasswordReset := client.AuthPasswordReset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `token` | `string` |  |

#### Example: Create

```go
result, err := client.AuthPasswordReset(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AuthRegistrationOption

Create an instance: `authRegistrationOption := client.AuthRegistrationOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_password_signup_enabled` | `bool` |  |
| `openai_sign_in_enabled` | `bool` | Whether ChatGPT identity sign-in is configured and enabled for rollout. |
| `turnstile_site_key` | `any` |  |
| `waitlist_enabled` | `bool` | New public signups require waitlist approval when enabled. |

#### Example: Load

```go
authRegistrationOption, err := client.AuthRegistrationOption(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(authRegistrationOption.(sdk.Entity).Data()) // the loaded entity's record
```


### AutomationEvent

Create an instance: `automationEvent := client.AutomationEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `can_manage` | `bool` |  |
| `can_manage_events` | `bool` | Whether new event triggers can be attached or existing settings saved. |
| `can_run` | `bool` | Whether the viewer can request a manual Temporal run |
| `can_schedule` | `bool` |  |
| `event_subscriptions` | `[]any` |  |
| `event_triggers` | `[]any` |  |
| `expected_revision` | `any` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `revision` | `int` |  |
| `schedule` | `any` |  |
| `schedules` | `[]any` |  |
| `settings` | `map[string]any` |  |
| `subscription_key` | `string` |  |
| `version` | `map[string]any` |  |


### AutomationRun

Create an instance: `automationRun := client.AutomationRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `automation` | `any` | Saved native automation identity. |
| `budget_seconds` | `any` | The run stops once it has been running this long |
| `budget_usd` | `any` | The run stops before a step once it has spent this much |
| `can_answer` | `bool` | Whether this viewer can answer the step that stopped the run; the answer runs that step again |
| `can_approve` | `bool` | Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one |
| `can_dismiss` | `bool` | Whether this viewer can dismiss the run waiting for them, which ends it unanswered |
| `checkpoint` | `any` | The question a run waiting at a checkpoint is asking |
| `conversation_id` | `any` | The thread the run works in, which the person opens to follow it |
| `decision_history` | `map[string]any` |  |
| `error` | `any` |  |
| `finished_at` | `any` |  |
| `flow_steps` | `any` | How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file |
| `id` | `string` |  |
| `input` | `map[string]any` |  |
| `needs_you` | `bool` | Whether a step stopped the run for the person, who can answer it |
| `note` | `any` | One sentence a workflow step left for the person, which the run's card leads with |
| `nothing_to_do_reason` | `any` | Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise. |
| `request_id` | `string` |  |
| `resume_count` | `int` | How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint |
| `retry_step_id` | `any` |  |
| `running_seconds` | `int` | How long the run has been running, not counting time waiting at a checkpoint or for a retry |
| `source` | `string` |  |
| `spent_tokens` | `int` | The tokens the run's agent steps have used so far |
| `spent_usd` | `float64` | What the run's agent steps have cost so far, as the agent reported it |
| `stalled` | `bool` | Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back |
| `started_at` | `string` |  |
| `started_by` | `any` | The event that started the run |
| `status` | `string` |  |
| `step_count` | `int` |  |
| `steps` | `[]any` |  |
| `trigger_id` | `any` | The run settings that started it, for a run an event or schedule started |
| `version_id` | `string` |  |
| `wake_at` | `any` | When a sleeping run's step looks again |
| `workflow_digest` | `any` | SHA-256 of the immutable definition this run uses |
| `workflow_path` | `any` |  |

#### Example: Create

```go
result, err := client.AutomationRun(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "automation_id": "example_automation_id",
    "organization_id": "example_organization_id",
    "input": map[string]any{},
    "request_id": "example_request_id",
    "version_id": "example_version_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BackendRunnerPool

Create an instance: `backendRunnerPool := client.BackendRunnerPool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
backendRunnerPool, err := client.BackendRunnerPool(nil).Load(map[string]any{"backend_id": "backend_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(backendRunnerPool.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BackendRunnerPool(nil).Create(map[string]any{
    "backend_id": "example_backend_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Bazel

Create an instance: `bazel := client.Bazel(nil)`


### BazelActionResult

Create an instance: `bazelActionResult := client.BazelActionResult(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
bazelActionResult, err := client.BazelActionResult(nil).Load(map[string]any{"id": "bazel_action_result_id", "action_result_id": "action_result_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bazelActionResult.(sdk.Entity).Data()) // the loaded entity's record
```


### BazelBackend

Create an instance: `bazelBackend := client.BazelBackend(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
bazelBackend, err := client.BazelBackend(nil).Load(map[string]any{"id": "bazel_backend_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bazelBackend.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BazelBackend(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BazelBlob

Create an instance: `bazelBlob := client.BazelBlob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
bazelBlob, err := client.BazelBlob(nil).Load(map[string]any{"id": "bazel_blob_id", "blob_id": "blob_id", "hash": "hash"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bazelBlob.(sdk.Entity).Data()) // the loaded entity's record
```


### BazelExecution

Create an instance: `bazelExecution := client.BazelExecution(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
bazelExecution, err := client.BazelExecution(nil).Load(map[string]any{"id": "bazel_execution_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bazelExecution.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BazelExecution(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BazelFindMissingBlob

Create an instance: `bazelFindMissingBlob := client.BazelFindMissingBlob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.BazelFindMissingBlob(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Billing

Create an instance: `billing := client.Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |

#### Example: Load

```go
billing, err := client.Billing(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billing.(sdk.Entity).Data()) // the loaded entity's record
```


### BillingAddon

Create an instance: `billingAddon := client.BillingAddon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `quantity` | `int` |  |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |


### BillingBudget

Create an instance: `billingBudget := client.BillingBudget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `any` | Null clears the budget. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |


### BillingCheckoutSession

Create an instance: `billingCheckoutSession := client.BillingCheckoutSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.BillingCheckoutSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BillingContact

Create an instance: `billingContact := client.BillingContact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `billing_email` | `string` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |


### BillingExtraSpend

Create an instance: `billingExtraSpend := client.BillingExtraSpend(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `enabled` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `monthly_cap_cents` | `any` | Monthly limit across all metered overages, excluding plan fees. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |


### BillingInvoice

Create an instance: `billingInvoice := client.BillingInvoice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_due_cents` | `int` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `hosted_invoice_url` | `any` |  |
| `id` | `string` |  |
| `invoice_pdf` | `any` |  |
| `metronome_invoice_id` | `any` | Metronome's id for the invoice it pushed |
| `number` | `any` |  |
| `period_ended_at` | `any` |  |
| `period_started_at` | `any` |  |
| `status` | `string` |  |
| `total_cents` | `int` |  |

#### Example: List

```go
billingInvoices, err := client.BillingInvoice(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range billingInvoices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### BillingPackage

Create an instance: `billingPackage := client.BillingPackage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `base_price_cents` | `int` |  |
| `billing_interval` | `string` |  |
| `billing_policy` | `string` |  |
| `ci_included_spend_cents` | `int` | Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive. |
| `currency` | `string` |  |
| `key` | `string` |  |
| `max_seats` | `any` |  |
| `name` | `string` |  |
| `pay_as_you_go_enabled` | `bool` |  |
| `rates` | `[]any` |  |
| `revision` | `int` |  |
| `roder_daily_run_limit` | `int` |  |
| `roder_run_concurrency_limit` | `int` |  |
| `seat_price_cents` | `int` |  |
| `trial_days` | `int` |  |
| `visibility` | `string` |  |

#### Example: List

```go
billingPackages, err := client.BillingPackage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range billingPackages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### BillingPortalSession

Create an instance: `billingPortalSession := client.BillingPortalSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `return_url` | `string` |  |

#### Example: Create

```go
result, err := client.BillingPortalSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BillingPrepaidPeriod

Create an instance: `billingPrepaidPeriod := client.BillingPrepaidPeriod(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `any` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `any` |  |
| `minutes` | `int` |  |
| `net_amount_cents` | `int` |  |
| `paid_at` | `any` |  |
| `paid_total_cents` | `any` |  |
| `payment_action_url` | `any` |  |
| `period_ended_at` | `string` |  |
| `period_started_at` | `string` |  |
| `receipt_url` | `any` |  |
| `refunded_net_cents` | `int` |  |
| `state` | `string` |  |

#### Example: Load

```go
billingPrepaidPeriod, err := client.BillingPrepaidPeriod(nil).Load(map[string]any{"id": "billing_prepaid_period_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingPrepaidPeriod.(sdk.Entity).Data()) // the loaded entity's record
```


### BillingPrepaidPurchase

Create an instance: `billingPrepaidPurchase := client.BillingPrepaidPurchase(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `any` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `id` | `string` |  |
| `last_error` | `any` |  |
| `minutes` | `int` |  |
| `net_amount_cents` | `int` |  |
| `paid_at` | `any` |  |
| `paid_total_cents` | `any` |  |
| `payment_action_url` | `any` |  |
| `prepaid` | `map[string]any` |  |
| `purchase` | `map[string]any` |  |
| `receipt_url` | `any` |  |
| `refunded_net_cents` | `int` |  |
| `request_key` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```go
billingPrepaidPurchase, err := client.BillingPrepaidPurchase(nil).Load(map[string]any{"id": "billing_prepaid_purchase_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingPrepaidPurchase.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
billingPrepaidPurchases, err := client.BillingPrepaidPurchase(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range billingPrepaidPurchases.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.BillingPrepaidPurchase(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "minutes": 1,
    "request_key": "example_request_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BillingSubscription

Create an instance: `billingSubscription := client.BillingSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `cancel_at_period_end` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |


### BillingTokenTopUp

Create an instance: `billingTokenTopUp := client.BillingTokenTopUp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_cents` | `int` |  |
| `request_key` | `string` |  |

#### Example: Create

```go
result, err := client.BillingTokenTopUp(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "amount_cents": 1,
    "request_key": "example_request_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BillingUsage

Create an instance: `billingUsage := client.BillingUsage(nil)`


### Binary

Create an instance: `binary := client.Binary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts_versions` | `bool` |  |
| `arch` | `any` |  |
| `archived_at` | `any` |  |
| `binary` | `map[string]any` |  |
| `created_at` | `string` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `latest_version` | `any` |  |
| `launch_args` | `[]any` |  |
| `name` | `string` |  |
| `needs_refresh` | `bool` |  |
| `operation` | `map[string]any` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `platform` | `any` |  |
| `project_id` | `string` |  |
| `sha256` | `string` |  |
| `slug` | `string` |  |
| `version` | `map[string]any` |  |
| `version_defaults` | `any` |  |
| `versions` | `[]any` |  |
| `window_title` | `string` |  |

#### Example: Load

```go
binary, err := client.Binary(nil).Load(map[string]any{"id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(binary.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
binarys, err := client.Binary(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range binarys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Binary(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "download_url": "example_download_url",
    "executable": "example_executable",
    "format": "example_format",
    "idempotency_key": "example_idempotency_key",
    "name": "example_name",
    "slug": "example_slug",
    "window_title": "example_window_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BinaryVersion

Create an instance: `binaryVersion := client.BinaryVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arch` | `any` |  |
| `cancelable` | `bool` |  |
| `configuration` | `map[string]any` |  |
| `configuration_digest` | `string` |  |
| `created_at` | `string` |  |
| `deletable` | `bool` |  |
| `download_secret` | `string` |  |
| `download_url` | `string` |  |
| `environment_uses` | `[]any` |  |
| `executable` | `string` |  |
| `format` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_args` | `[]any` |  |
| `operation` | `map[string]any` |  |
| `package_sha256` | `any` |  |
| `package_size` | `any` |  |
| `permissions` | `map[string]any` |  |
| `platform` | `any` |  |
| `preparations` | `[]any` |  |
| `retryable` | `bool` |  |
| `sha256` | `string` |  |
| `status` | `string` |  |
| `version` | `map[string]any` |  |
| `window_title` | `string` |  |

#### Example: Load

```go
binaryVersion, err := client.BinaryVersion(nil).Load(map[string]any{"id": "binary_version_id", "binary_id": "binary_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(binaryVersion.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
binaryVersions, err := client.BinaryVersion(nil).List(map[string]any{"binary_id": "example", "organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range binaryVersions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.BinaryVersion(nil).Create(map[string]any{
    "binary_id": "example_binary_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "download_url": "example_download_url",
    "idempotency_key": "example_idempotency_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BookmarkProtectionRefreshGithubRequiredCheck

Create an instance: `bookmarkProtectionRefreshGithubRequiredCheck := client.BookmarkProtectionRefreshGithubRequiredCheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exclusions` | `[]any` |  |
| `fetched_at` | `any` |  |
| `fetched_at_label` | `any` |  |
| `github_branch` | `string` |  |
| `github_owner` | `any` |  |
| `github_repository_name` | `any` |  |
| `last_error` | `any` |  |
| `proven` | `bool` |  |
| `requirements` | `[]any` |  |
| `stale` | `bool` |  |

#### Example: Create

```go
result, err := client.BookmarkProtectionRefreshGithubRequiredCheck(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BrowserEgressCandidate

Create an instance: `browserEgressCandidate := client.BrowserEgressCandidate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```go
browserEgressCandidates, err := client.BrowserEgressCandidate(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range browserEgressCandidates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### BrowserSession

Create an instance: `browserSession := client.BrowserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_task_id` | `any` |  |
| `authentication_status` | `string` | Session readiness alone does not confirm application sign-in. |
| `authentication_task_id` | `any` | Automatic sign-in task; read its status and result separately from browser readiness. |
| `cdp_url` | `any` | Admin-only full browser CDP bearer capability for the current external control generation. |
| `closed_at` | `any` |  |
| `closure_basis` | `any` | Provider deletion is a conservative closure bound when the worker cannot report its stop time. |
| `control_generation` | `int` |  |
| `controller` | `string` |  |
| `credential_id` | `any` | Optional configured credential public ID within the selected project. |
| `environment_id` | `string` | Optional ready website environment slug or public ID within the selected project. |
| `environment_revision_id` | `any` |  |
| `expires_at` | `string` |  |
| `failure_code` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `initial_url` | `string` |  |
| `max_seconds` | `int` |  |
| `pending_control_id` | `any` |  |
| `project_id` | `any` | Optional project slug or public ID. |
| `reconciled_at` | `any` |  |
| `started_at` | `any` |  |
| `status` | `string` |  |
| `url` | `string` | Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page. |
| `viewer` | `any` |  |

#### Example: Load

```go
browserSession, err := client.BrowserSession(nil).Load(map[string]any{"id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(browserSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BrowserSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BrowserSessionConnection

Create an instance: `browserSessionConnection := client.BrowserSessionConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `generation` | `int` |  |
| `idempotency_key` | `string` |  |

#### Example: Create

```go
result, err := client.BrowserSessionConnection(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
    "generation": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BrowserSessionControl

Create an instance: `browserSessionControl := client.BrowserSessionControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `completed_at` | `any` |  |
| `completed_generation` | `any` |  |
| `connection` | `any` |  |
| `failure_code` | `any` |  |
| `id` | `string` |  |
| `requested_controller` | `string` |  |
| `requested_generation` | `int` |  |
| `status` | `string` |  |

#### Example: Load

```go
browserSessionControl, err := client.BrowserSessionControl(nil).Load(map[string]any{"id": "browser_session_control_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(browserSessionControl.(sdk.Entity).Data()) // the loaded entity's record
```


### BrowserSessionEvent

Create an instance: `browserSessionEvent := client.BrowserSessionEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_task_id` | `any` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `payload` | `map[string]any` |  |
| `source_sequence` | `any` |  |

#### Example: List

```go
browserSessionEvents, err := client.BrowserSessionEvent(nil).List(map[string]any{"browser_session_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range browserSessionEvents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### BrowserSessionMedia

Create an instance: `browserSessionMedia := client.BrowserSessionMedia(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_session_id` | `string` |  |
| `capture_omissions` | `any` |  |
| `captured_at` | `any` |  |
| `ended_at` | `any` |  |
| `failure_code` | `any` |  |
| `files` | `[]any` |  |
| `frames` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `partial` | `bool` | Retained footage has a capture failure or reported omissions. |
| `retention_expires_at` | `string` |  |
| `source` | `any` | Screenshot provenance. |
| `status` | `string` |  |
| `stop_requested_at` | `any` |  |

#### Example: Load

```go
browserSessionMedia, err := client.BrowserSessionMedia(nil).Load(map[string]any{"id": "browser_session_media_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(browserSessionMedia.(sdk.Entity).Data()) // the loaded entity's record
```


### BrowserSessionRecording

Create an instance: `browserSessionRecording := client.BrowserSessionRecording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```go
result, err := client.BrowserSessionRecording(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BrowserSessionScreenshot

Create an instance: `browserSessionScreenshot := client.BrowserSessionScreenshot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idempotency_key` | `string` |  |
| `wait` | `bool` | Only screenshots support wait: true. |

#### Example: Create

```go
result, err := client.BrowserSessionScreenshot(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BrowserSessionTask

Create an instance: `browserSessionTask := client.BrowserSessionTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `any` |  |
| `browser_session_id` | `string` |  |
| `cancel_requested_at` | `any` |  |
| `completed_at` | `any` |  |
| `control_generation` | `any` |  |
| `deadline_at` | `string` |  |
| `effects_unknown` | `bool` |  |
| `failure_code` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `instruction` | `string` |  |
| `max_rounds` | `int` |  |
| `max_seconds` | `int` |  |
| `model_selection` | `map[string]any` |  |
| `outcome` | `any` |  |
| `result` | `map[string]any` |  |
| `started_at` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```go
browserSessionTask, err := client.BrowserSessionTask(nil).Load(map[string]any{"id": "browser_session_task_id", "browser_session_id": "browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(browserSessionTask.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.BrowserSessionTask(nil).Create(map[string]any{
    "browser_session_id": "example_browser_session_id",
    "organization_id": "example_organization_id",
    "instruction": "example_instruction",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CacheNamespaceEntry

Create an instance: `cacheNamespaceEntry := client.CacheNamespaceEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cacheNamespaceEntry, err := client.CacheNamespaceEntry(nil).Load(map[string]any{"id": "cache_namespace_entry_id", "cache_namespace_id": "cache_namespace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cacheNamespaceEntry.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CacheNamespaceEntry(nil).Create(map[string]any{
    "cache_namespace_id": "example_cache_namespace_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CatalogSelector

Create an instance: `catalogSelector := client.CatalogSelector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `[]any` |  |
| `id` | `string` |  |
| `locations` | `[]any` |  |
| `services` | `[]any` |  |

#### Example: Load

```go
catalogSelector, err := client.CatalogSelector(nil).Load(map[string]any{"app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(catalogSelector.(sdk.Entity).Data()) // the loaded entity's record
```


### CdnDeployment

Create an instance: `cdnDeployment := client.CdnDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cdnDeployment, err := client.CdnDeployment(nil).Load(map[string]any{"id": "cdn_deployment_id", "app_id": "app_id", "cdn_id": "cdn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cdnDeployment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CdnDeployment(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "cdn_id": "example_cdn_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CdnHostname

Create an instance: `cdnHostname := client.CdnHostname(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_cdn_distribution_id` | `string` |  |
| `created_at` | `string` |  |
| `dns_status` | `string` |  |
| `force_ssl` | `bool` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `provider_hostname_id` | `any` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
cdnHostname, err := client.CdnHostname(nil).Load(map[string]any{"id": "cdn_hostname_id", "app_id": "app_id", "cdn_id": "cdn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cdnHostname.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CdnHostname(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "cdn_id": "example_cdn_id",
    "hostname": "example_hostname",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CdnSpace

Create an instance: `cdnSpace := client.CdnSpace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cdnSpace, err := client.CdnSpace(nil).Load(map[string]any{"id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cdnSpace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CdnSpace(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CdnSpaceObject

Create an instance: `cdnSpaceObject := client.CdnSpaceObject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cdnSpaceObject, err := client.CdnSpaceObject(nil).Load(map[string]any{"id": "cdn_space_object_id", "cdn_space_id": "cdn_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cdnSpaceObject.(sdk.Entity).Data()) // the loaded entity's record
```


### Change

Create an instance: `change := client.Change(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `map[string]any` | Counts for each state across the active non-state filters. |
| `filters` | `map[string]any` |  |
| `github_sync` | `map[string]any` |  |
| `result` | `any` | What this page is a page of. |

#### Example: Load

```go
change, err := client.Change(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(change.(sdk.Entity).Data()) // the loaded entity's record
```


### ChangeAsset

Create an instance: `changeAsset := client.ChangeAsset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.ChangeAsset(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "alias": "example_alias",
    "byte_size": 1,
    "checksum_md5": "example_checksum_md5",
    "checksum_sha256": "example_checksum_sha256",
    "content_type": "example_content_type",
    "filename": "example_filename",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeComment

Create an instance: `changeComment := client.ChangeComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `capabilities` | `map[string]any` |  |
| `change_id` | `any` |  |
| `created_at` | `any` |  |
| `created_at_label` | `any` |  |
| `id` | `string` |  |
| `kind` | `any` |  |
| `line` | `any` |  |
| `outdated` | `bool` |  |
| `parent_comment_id` | `any` |  |
| `patchset_id` | `any` |  |
| `patchset_number` | `any` |  |
| `path` | `any` |  |
| `replies` | `[]any` |  |
| `resolved` | `bool` |  |
| `resolved_at` | `any` |  |
| `resolved_at_label` | `any` |  |
| `resolved_by` | `map[string]any` |  |
| `side` | `any` |  |
| `updated_at` | `any` |  |
| `updated_at_label` | `any` |  |
| `user` | `map[string]any` |  |

#### Example: List

```go
changeComments, err := client.ChangeComment(nil).List(map[string]any{"change_id": "example", "organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range changeComments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ChangeComment(nil).Create(map[string]any{
    "change_id": "example_change_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeFileReviewCheckpoint

Create an instance: `changeFileReviewCheckpoint := client.ChangeFileReviewCheckpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `patchset_id` | `string` |  |
| `path` | `string` |  |
| `request_id` | `string` |  |
| `review_action` | `string` |  |

#### Example: Create

```go
result, err := client.ChangeFileReviewCheckpoint(nil).Create(map[string]any{
    "change_id": "example_change_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "patchset_id": "example_patchset_id",
    "path": "example_path",
    "request_id": "example_request_id",
    "review_action": "example_review_action",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeGitBranchSubmission

Create an instance: `changeGitBranchSubmission := client.ChangeGitBranchSubmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.ChangeGitBranchSubmission(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeGitCommitIdentity

Create an instance: `changeGitCommitIdentity := client.ChangeGitCommitIdentity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `change_number` | `int` |  |
| `git_commit_id` | `string` |  |
| `git_commit_ids` | `[]any` |  |
| `id` | `string` |  |
| `identities` | `[]any` |  |
| `missing_git_commit_ids` | `[]any` |  |
| `patchset_number` | `int` |  |

#### Example: Load

```go
changeGitCommitIdentity, err := client.ChangeGitCommitIdentity(nil).Load(map[string]any{"id": "change_git_commit_identity_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(changeGitCommitIdentity.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ChangeGitCommitIdentity(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "git_commit_ids": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeGitPublication

Create an instance: `changeGitPublication := client.ChangeGitPublication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expected_target_commit_id` | `string` |  |
| `id` | `string` |  |
| `operation_key` | `string` |  |
| `publication_id` | `string` |  |
| `request` | `map[string]any` |  |
| `request_digest` | `string` |  |
| `revisions` | `[]any` |  |
| `status` | `string` |  |
| `transfer_refs` | `[]any` | Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness. |

#### Example: Load

```go
changeGitPublication, err := client.ChangeGitPublication(nil).Load(map[string]any{"id": "change_git_publication_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(changeGitPublication.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ChangeGitPublication(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "operation_key": "example_operation_key",
    "request": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeGroupMember

Create an instance: `changeGroupMember := client.ChangeGroupMember(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` | Change number |
| `changes` | `[]any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `status` | `string` |  |
| `title` | `any` |  |

#### Example: Create

```go
result, err := client.ChangeGroupMember(nil).Create(map[string]any{
    "change_group_id": "example_change_group_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "change_id": "example_change_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeLabel

Create an instance: `changeLabel := client.ChangeLabel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted` | `bool` |  |
| `add` | `[]any` |  |
| `approval` | `map[string]any` |  |
| `assets` | `[]any` | Proof assets referenced from the description as `vex-asset:<id>`. |
| `author` | `any` | Human user summary or organization automation identity. |
| `capabilities` | `map[string]any` |  |
| `change_key` | `string` |  |
| `checks` | `[]any` |  |
| `checks_status` | `string` |  |
| `comments` | `[]any` |  |
| `comments_count` | `int` |  |
| `comments_count_label` | `string` |  |
| `commit_message` | `any` |  |
| `current_patchset` | `map[string]any` |  |
| `description` | `any` |  |
| `draft` | `bool` |  |
| `folded_into_number` | `any` |  |
| `github_projection_status` | `any` |  |
| `github_pull_request` | `map[string]any` |  |
| `github_pull_requests` | `[]any` |  |
| `group` | `any` |  |
| `has_description` | `bool` | True when the change has Vex-owned review description content, distinct from the JJ commit message. |
| `id` | `string` |  |
| `jj_change_id` | `any` |  |
| `labels` | `[]any` |  |
| `landable` | `bool` |  |
| `landed_by` | `map[string]any` |  |
| `number` | `int` |  |
| `orphaned` | `bool` |  |
| `orphaned_at` | `string` |  |
| `orphaned_at_label` | `string` |  |
| `orphaned_reason` | `string` |  |
| `parent_change_id` | `any` |  |
| `parent_change_number` | `any` |  |
| `patchset_number` | `any` |  |
| `patchsets` | `[]any` |  |
| `primary_status` | `any` |  |
| `public_id` | `string` |  |
| `relation_chain` | `[]any` |  |
| `remove` | `[]any` |  |
| `requested_changes` | `bool` |  |
| `restack_state` | `string` |  |
| `reviewer_candidates` | `[]any` | Organization members available to the reviewer picker on this page. |
| `reviewers` | `[]any` |  |
| `stable_change_id` | `string` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `unresolved_comments_count_label` | `string` |  |
| `url` | `string` |  |
| `votes` | `[]any` |  |


### ChangeLandingHold

Create an instance: `changeLandingHold := client.ChangeLandingHold(nil)`


### ChangeLandingRequest

Create an instance: `changeLandingRequest := client.ChangeLandingRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_ids` | `[]any` |  |
| `count` | `int` |  |
| `defer_until_ready` | `bool` | Admit the request while approvals or checks are pending |
| `expected_requirement_version` | `string` |  |
| `expected_scope_version` | `string` |  |
| `head_change_id` | `string` |  |
| `id` | `any` |  |
| `numbers` | `[]any` |  |
| `override_acknowledged` | `bool` |  |
| `override_codes` | `[]any` |  |
| `position` | `int` |  |
| `priority` | `string` |  |
| `scope_version` | `string` |  |
| `state` | `string` |  |
| `version` | `int` |  |

#### Example: Create

```go
result, err := client.ChangeLandingRequest(nil).Create(map[string]any{
    "change_id": "example_change_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeRequestChange

Create an instance: `changeRequestChange := client.ChangeRequestChange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `any` |  |

#### Example: Create

```go
result, err := client.ChangeRequestChange(nil).Create(map[string]any{
    "change_id": "example_change_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ChangeReviewer

Create an instance: `changeReviewer := client.ChangeReviewer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `[]any` |  |
| `email` | `string` |  |
| `name` | `any` |  |
| `remove` | `[]any` |  |
| `removed_reviewers` | `[]any` |  |
| `requested_reviewers` | `[]any` |  |
| `reviewers` | `[]any` |  |

#### Example: List

```go
changeReviewers, err := client.ChangeReviewer(nil).List(map[string]any{"change_id": "example", "organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range changeReviewers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ChangeTranscript

Create an instance: `changeTranscript := client.ChangeTranscript(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture_kind` | `string` |  |
| `captured_at` | `string` |  |
| `harness` | `map[string]any` |  |
| `id` | `string` |  |
| `original_resume` | `any` |  |
| `patchset_commit_id` | `string` |  |
| `patchset_number` | `int` |  |
| `redaction_count` | `int` |  |
| `session_id` | `any` |  |
| `session_title` | `any` |  |
| `status` | `string` |  |
| `superseded` | `bool` |  |
| `user` | `map[string]any` |  |

#### Example: List

```go
changeTranscripts, err := client.ChangeTranscript(nil).List(map[string]any{"change_id": "example", "organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range changeTranscripts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ChangeTranscriptSummary

Create an instance: `changeTranscriptSummary := client.ChangeTranscriptSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimated_cost` | `any` |  |
| `session_count` | `int` |  |
| `sessions` | `[]any` |  |
| `tokens_partial` | `bool` |  |
| `total_tokens` | `any` |  |

#### Example: Load

```go
changeTranscriptSummary, err := client.ChangeTranscriptSummary(nil).Load(map[string]any{"organization_id": "organization_id", "ids": "ids"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(changeTranscriptSummary.(sdk.Entity).Data()) // the loaded entity's record
```


### CheckpointPrepareChunk

Create an instance: `checkpointPrepareChunk := client.CheckpointPrepareChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.CheckpointPrepareChunk(nil).Create(map[string]any{
    "agent_session_id": "example_agent_session_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CiNode

Create an instance: `ciNode := client.CiNode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `any` |  |
| `bazel_enabled` | `bool` |  |
| `bazel_properties_json` | `any` |  |
| `ci_runner_pool_id` | `string` |  |
| `cordoned_at` | `any` |  |
| `cordoned_at_label` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `health_state` | `string` |  |
| `heartbeat_age_seconds` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `labels_csv` | `any` |  |
| `last_seen_at` | `any` |  |
| `last_seen_at_label` | `any` |  |
| `name` | `string` |  |
| `network_peer_id` | `any` |  |
| `node_capabilities_csv` | `any` |  |
| `node_certificate_expires_at` | `any` |  |
| `node_certificate_expires_at_label` | `any` |  |
| `node_certificate_fingerprint_sha256` | `any` |  |
| `node_certificate_serial` | `any` |  |
| `offline_at` | `any` |  |
| `offline_at_label` | `any` |  |
| `online_at` | `any` |  |
| `online_at_label` | `any` |  |
| `organization_id` | `string` |  |
| `os` | `any` |  |
| `revoked_at` | `any` |  |
| `revoked_at_label` | `any` |  |
| `schedulable` | `bool` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `version` | `any` |  |

#### Example: Load

```go
ciNode, err := client.CiNode(nil).Load(map[string]any{"id": "ci_node_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ciNode.(sdk.Entity).Data()) // the loaded entity's record
```


### CiPipeline

Create an instance: `ciPipeline := client.CiPipeline(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ci_runner_pool_id` | `any` |  |
| `concurrency_key` | `any` |  |
| `created_at` | `string` |  |
| `default_branch` | `any` |  |
| `description` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `repository_id` | `any` |  |
| `required_capabilities_csv` | `any` |  |
| `runner_pool` | `any` |  |
| `runs` | `[]any` |  |
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
| `workflow_path` | `any` |  |

#### Example: Load

```go
ciPipeline, err := client.CiPipeline(nil).Load(map[string]any{"id": "ci_pipeline_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ciPipeline.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
ciPipelines, err := client.CiPipeline(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range ciPipelines.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.CiPipeline(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CiPipelineRun

Create an instance: `ciPipelineRun := client.CiPipelineRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `canceled_at` | `any` |  |
| `ci_pipeline_id` | `string` |  |
| `ci_runner_pool_id` | `any` |  |
| `commit_sha` | `any` |  |
| `concurrency_key` | `any` |  |
| `created_at` | `string` |  |
| `creator_user_id` | `any` |  |
| `display_id` | `int` |  |
| `failed` | `bool` |  |
| `finished_at` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `jobs` | `[]any` |  |
| `message` | `any` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `parameters_json` | `any` |  |
| `queued_at` | `any` |  |
| `ref_name` | `any` |  |
| `repository_id` | `any` |  |
| `required_capabilities_csv` | `any` |  |
| `retry_number` | `int` |  |
| `retryable` | `bool` |  |
| `slug` | `string` |  |
| `source_url` | `any` |  |
| `started_at` | `any` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
ciPipelineRun, err := client.CiPipelineRun(nil).Load(map[string]any{"id": "ci_pipeline_run_id", "pipeline_id": "pipeline_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ciPipelineRun.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CiPipelineRun(nil).Create(map[string]any{
    "pipeline_id": "example_pipeline_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CiRunnerPool

Create an instance: `ciRunnerPool := client.CiRunnerPool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bazel_enabled` | `bool` |  |
| `bazel_properties_json` | `any` |  |
| `created_at` | `string` |  |
| `description` | `any` |  |
| `elastic_config_json` | `any` |  |
| `elastic_provider_kind` | `any` |  |
| `id` | `string` |  |
| `isolation_mode` | `string` |  |
| `labels_csv` | `any` |  |
| `max_concurrency` | `int` |  |
| `modal_capacity` | `map[string]any` |  |
| `modal_runner_invocations` | `[]any` |  |
| `name` | `string` |  |
| `network_space_id` | `any` |  |
| `node_capabilities_csv` | `any` |  |
| `organization_id` | `string` |  |
| `runner_count_label` | `string` |  |
| `runner_kind` | `string` |  |
| `runners` | `[]any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
ciRunnerPool, err := client.CiRunnerPool(nil).Load(map[string]any{"id": "ci_runner_pool_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ciRunnerPool.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
ciRunnerPools, err := client.CiRunnerPool(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range ciRunnerPools.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.CiRunnerPool(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CiStatus

Create an instance: `ciStatus := client.CiStatus(nil)`


### CliEvent

Create an instance: `cliEvent := client.CliEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `properties` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.CliEvent(nil).Create(map[string]any{
    "event": "example_event",
    "properties": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CliRelease

Create an instance: `cliRelease := client.CliRelease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
cliRelease, err := client.CliRelease(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cliRelease.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CliRelease(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CloudWorkspaceBackupObject

Create an instance: `cloudWorkspaceBackupObject := client.CloudWorkspaceBackupObject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cloudWorkspaceBackupObject, err := client.CloudWorkspaceBackupObject(nil).Load(map[string]any{"id": "cloud_workspace_backup_object_id", "cloud_workspace_backup_id": "cloud_workspace_backup_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cloudWorkspaceBackupObject.(sdk.Entity).Data()) // the loaded entity's record
```


### CodeRuleEvaluation

Create an instance: `codeRuleEvaluation := client.CodeRuleEvaluation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advisory` | `bool` |  |
| `coverage` | `map[string]any` |  |
| `diff` | `string` | UTF-8 complete unified patch using a/ old and b/ new prefixes; at most 1 MiB |
| `duration_ms` | `int` |  |
| `evaluator_version` | `string` |  |
| `input_digest` | `any` |  |
| `limits` | `map[string]any` |  |
| `model` | `string` |  |
| `requests` | `map[string]any` |  |
| `schema_version` | `int` |  |
| `snapshot_digest` | `any` |  |
| `unchecked` | `[]any` |  |
| `verdicts` | `[]any` |  |

#### Example: Create

```go
result, err := client.CodeRuleEvaluation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "diff": "example_diff",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ComSiteAccess

Create an instance: `comSiteAccess := client.ComSiteAccess(nil)`


### ComSiteAccessSession

Create an instance: `comSiteAccessSession := client.ComSiteAccessSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookie_name` | `string` |  |
| `host` | `string` | Site hostname, for example docs.acme.composal.page |
| `max_age` | `int` |  |
| `session_token` | `string` |  |

#### Example: Create

```go
result, err := client.ComSiteAccessSession(nil).Create(map[string]any{
    "host": "example_host",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CommentThreadComment

Create an instance: `commentThreadComment := client.CommentThreadComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |

#### Example: Create

```go
result, err := client.CommentThreadComment(nil).Create(map[string]any{
    "artefact_id": "example_artefact_id",
    "comment_thread_id": "example_comment_thread_id",
    "organization_id": "example_organization_id",
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CommitDiff

Create an instance: `commitDiff := client.CommitDiff(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `[]any` |  |
| `id` | `string` |  |
| `parent_id` | `any` |  |

#### Example: Load

```go
commitDiff, err := client.CommitDiff(nil).Load(map[string]any{"id": "commit_diff_id", "commit_id": "commit_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(commitDiff.(sdk.Entity).Data()) // the loaded entity's record
```


### ConnectionRequest

Create an instance: `connectionRequest := client.ConnectionRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `string` |  |
| `auth_scheme` | `string` |  |
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `error_code` | `any` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `any` |  |
| `retired_at` | `any` |  |
| `revoked_at` | `any` |  |
| `source_operation_id` | `any` |  |
| `state` | `string` |  |

#### Example: Load

```go
connectionRequest, err := client.ConnectionRequest(nil).Load(map[string]any{"id": "connection_request_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(connectionRequest.(sdk.Entity).Data()) // the loaded entity's record
```


### ConnectionSource

Create an instance: `connectionSource := client.ConnectionSource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `provider` | `string` |  |
| `source_operation_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
connectionSources, err := client.ConnectionSource(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range connectionSources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ContactSubmission

Create an instance: `contactSubmission := client.ContactSubmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `company` | `any` |  |
| `email` | `string` | Stored downcased and stripped. |
| `message` | `string` |  |
| `name` | `string` |  |
| `website` | `any` | Honeypot. |

#### Example: Create

```go
result, err := client.ContactSubmission(nil).Create(map[string]any{
    "email": "example_email",
    "message": "example_message",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ControlComputer

Create an instance: `controlComputer := client.ControlComputer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `map[string]any` | A point-in-time control transport observation. |
| `consent` | `map[string]any` |  |
| `device` | `map[string]any` |  |
| `id` | `string` |  |
| `provider_status` | `[]any` |  |

#### Example: List

```go
controlComputers, err := client.ControlComputer(nil).List(map[string]any{"organization_id": "example", "persistent_agent_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range controlComputers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ControlComputerControlOperation

Create an instance: `controlComputerControlOperation := client.ControlComputerControlOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `map[string]any` |  |
| `created_at` | `string` |  |
| `delivery` | `map[string]any` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `map[string]any` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `map[string]any` |  |
| `result` | `any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```go
controlComputerControlOperation, err := client.ControlComputerControlOperation(nil).Load(map[string]any{"id": "control_computer_control_operation_id", "control_computer_id": "control_computer_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(controlComputerControlOperation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ControlComputerControlOperation(nil).Create(map[string]any{
    "control_computer_id": "example_control_computer_id",
    "organization_id": "example_organization_id",
    "action": "example_action",
    "arguments": map[string]any{},
    "key": "example_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CoordinationWait

Create an instance: `coordinationWait := client.CoordinationWait(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_stop` | `bool` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `stop_state` | `any` |  |
| `wake_outcome` | `any` |  |

#### Example: List

```go
coordinationWaits, err := client.CoordinationWait(nil).List(map[string]any{"agent_id": "example", "coordination_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range coordinationWaits.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### CredentialSignInCheck

Create an instance: `credentialSignInCheck := client.CredentialSignInCheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` | The project environment (app) to sign in to |
| `environment_name` | `string` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```go
result, err := client.CredentialSignInCheck(nil).Create(map[string]any{
    "credential_id": "example_credential_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "environment_id": "example_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DataResourceRotateCredential

Create an instance: `dataResourceRotateCredential := client.DataResourceRotateCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `created_at` | `string` |  |
| `engine` | `string` |  |
| `failure_message` | `any` |  |
| `high_availability` | `bool` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `name` | `string` |  |
| `plan` | `any` |  |
| `provider_metadata` | `map[string]any` |  |
| `region` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `storage_gb` | `any` |  |
| `storage_label` | `any` |  |
| `updated_at` | `string` |  |
| `version` | `any` |  |

#### Example: Create

```go
result, err := client.DataResourceRotateCredential(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "data_resource_id": "example_data_resource_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeepScan

Create an instance: `deepScan := client.DeepScan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `active` | `[]any` |  |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorations` | `[]any` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `launch_options` | `map[string]any` | Present only when launch was requested by an admin |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `pagination` | `map[string]any` |  |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```go
deepScan, err := client.DeepScan(nil).Load(map[string]any{"id": "deep_scan_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deepScan.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.DeepScan(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "environment_id": "example_environment_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeepScanFinding

Create an instance: `deepScanFinding := client.DeepScanFinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actual` | `string` |  |
| `agent_id` | `string` |  |
| `agent_title` | `string` |  |
| `area` | `any` | On a locked finding, the first segment of the page it was seen on, such as Billing. |
| `checks` | `[]any` | Checks in the same tester report that this finding cites. |
| `confidence` | `string` |  |
| `confirmed` | `bool` | On a locked finding, whether the automatic review confirmed it. |
| `evidence_step_ids` | `[]any` |  |
| `evidence_timestamp_ms` | `any` |  |
| `expected` | `string` |  |
| `fix_prompt` | `string` | A coding-agent prompt for this finding alone |
| `has_recording` | `bool` | On a locked finding, whether the tester recorded evidence for it. |
| `id` | `string` |  |
| `locked` | `bool` | True for a locked finding of the workspace's included scan before it pays. |
| `reproduction_steps` | `[]any` |  |
| `severity` | `string` |  |
| `title` | `string` |  |
| `tracked` | `any` | The finding record to resolve or ignore; null until the tester finishes. |
| `url` | `string` |  |

#### Example: List

```go
deepScanFindings, err := client.DeepScanFinding(nil).List(map[string]any{"deep_scan_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deepScanFindings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeepScanFlow

Create an instance: `deepScanFlow := client.DeepScanFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `concurrency` | `int` |  |
| `environment_id` | `string` |  |
| `exploration_id` | `string` |  |
| `flow_names` | `[]any` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `note` | `any` |  |

#### Example: Create

```go
result, err := client.DeepScanFlow(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "flow_names": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeepScanMappedFlow

Create an instance: `deepScanMappedFlow := client.DeepScanMappedFlow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `environment_id` | `string` |  |
| `flow_map` | `any` |  |
| `revision_id` | `any` |  |

#### Example: Load

```go
deepScanMappedFlow, err := client.DeepScanMappedFlow(nil).Load(map[string]any{"organization_id": "organization_id", "environment_id": "environment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deepScanMappedFlow.(sdk.Entity).Data()) // the loaded entity's record
```


### DeepScanOption

Create an instance: `deepScanOption := client.DeepScanOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `[]any` |  |
| `deep_scan_defaults` | `any` | The team a signed-out Deep Scan of this environment gets without budgets. |
| `flow_map` | `any` | Flows from the newest discovery; null until discovery has recorded some. |
| `id` | `string` |  |
| `name` | `string` |  |
| `personas` | `[]any` |  |
| `preview` | `bool` | A short-lived pull request or branch deployment, listed after configured environments. |
| `target_url` | `any` |  |

#### Example: List

```go
deepScanOptions, err := client.DeepScanOption(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deepScanOptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DemoShare

Create an instance: `demoShare := client.DemoShare(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `recording` | `map[string]any` |  |
| `summary` | `string` | What the recorded browser confirmed. |

#### Example: Load

```go
demoShare, err := client.DemoShare(nil).Load(map[string]any{"id": "demo_share_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(demoShare.(sdk.Entity).Data()) // the loaded entity's record
```


### DemoShareSegment

Create an instance: `demoShareSegment := client.DemoShareSegment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
demoShareSegment, err := client.DemoShareSegment(nil).Load(map[string]any{"id": "demo_share_segment_id", "demo_share_id": "demo_share_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(demoShareSegment.(sdk.Entity).Data()) // the loaded entity's record
```


### Deployment

Create an instance: `deployment := client.Deployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `map[string]any` |  |
| `artifact_locator` | `any` |  |
| `build_duration_seconds` | `any` |  |
| `build_source` | `any` |  |
| `build_status` | `string` |  |
| `children` | `[]any` |  |
| `ci_pipeline_id` | `any` |  |
| `ci_pipeline_run_id` | `any` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `creator` | `any` |  |
| `deployed_url` | `any` |  |
| `duration_seconds` | `any` |  |
| `environment` | `map[string]any` |  |
| `history_kind` | `string` |  |
| `history_reason` | `any` |  |
| `id` | `string` |  |
| `is_live` | `bool` |  |
| `is_rollback` | `bool` |  |
| `live_region_count` | `int` |  |
| `number` | `int` |  |
| `placement` | `any` |  |
| `region_count` | `int` |  |
| `replicas_per_region` | `int` |  |
| `rollback_reason` | `any` |  |
| `rollback_source_release_id` | `any` |  |
| `rollback_target_release_id` | `any` |  |
| `rollout_predecessor_id` | `any` |  |
| `rollout_status` | `string` |  |
| `rollout_strategy` | `string` |  |
| `service` | `map[string]any` |  |
| `source_ref` | `any` |  |
| `status` | `string` |  |
| `total_replicas` | `int` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
deployment, err := client.Deployment(nil).Load(map[string]any{"id": "deployment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deployment.(sdk.Entity).Data()) // the loaded entity's record
```


### DeploymentDashboardNomad

Create an instance: `deploymentDashboardNomad := client.DeploymentDashboardNomad(nil)`


### DeploymentDetail

Create an instance: `deploymentDetail := client.DeploymentDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `[]any` |  |
| `app` | `any` |  |
| `app_id` | `any` |  |
| `audit_events` | `[]any` |  |
| `capacity` | `map[string]any` |  |
| `data_resources` | `[]any` |  |
| `deploy_targets` | `[]any` |  |
| `deployments` | `[]any` |  |
| `desired_states` | `[]any` |  |
| `environments` | `[]any` |  |
| `filters` | `map[string]any` | The option lists the deployments page's app, service and stage pickers narrow by. |
| `health` | `map[string]any` | The rolled-up state of the selected scope. |
| `nomad` | `map[string]any` | The Nomad footprint of the selected scope, deduplicated. |
| `operations` | `[]any` |  |
| `placements` | `[]any` |  |
| `reconciler_ticks` | `[]any` |  |
| `releases` | `[]any` |  |
| `runtime_instances` | `[]any` |  |
| `service_bindings` | `[]any` |  |
| `service_views` | `[]any` |  |
| `storage_resources` | `[]any` |  |

#### Example: Load

```go
deploymentDetail, err := client.DeploymentDetail(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deploymentDetail.(sdk.Entity).Data()) // the loaded entity's record
```


### DeploymentFile

Create an instance: `deploymentFile := client.DeploymentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |


### DeploymentLog

Create an instance: `deploymentLog := client.DeploymentLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `app_environment_id` | `any` |  |
| `app_release_id` | `any` |  |
| `app_service_id` | `any` |  |
| `details` | `any` |  |
| `environment_name` | `string` |  |
| `release_version` | `any` |  |
| `service_name` | `string` |  |
| `status` | `string` |  |
| `task` | `any` |  |
| `unreachable_reason` | `any` |  |

#### Example: List

```go
deploymentLogs, err := client.DeploymentLog(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deploymentLogs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeploymentMetric

Create an instance: `deploymentMetric := client.DeploymentMetric(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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
| `source_ref` | `any` |  |

#### Example: List

```go
deploymentMetrics, err := client.DeploymentMetric(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deploymentMetrics.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeploymentPreview

Create an instance: `deploymentPreview := client.DeploymentPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` |  |
| `app_environment_id` | `string` |  |
| `app_name` | `string` |  |
| `app_preview_profile_id` | `string` |  |
| `app_slug` | `string` |  |
| `change_number` | `any` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `string` |  |
| `expires_at` | `string` |  |
| `generation` | `int` |  |
| `health` | `string` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `latest_operation_status` | `any` |  |
| `name` | `string` |  |
| `owner_name` | `any` |  |
| `profile_name` | `string` |  |
| `resource_overrides` | `map[string]any` | Service public IDs mapped to resource overrides. |
| `retained` | `bool` |  |
| `slug` | `string` |  |
| `snapshot_version` | `int` |  |
| `source_revision` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `urls` | `[]any` |  |
| `vcs_change_id` | `any` |  |

#### Example: List

```go
deploymentPreviews, err := client.DeploymentPreview(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deploymentPreviews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeploymentSetting

Create an instance: `deploymentSetting := client.DeploymentSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
deploymentSettings, err := client.DeploymentSetting(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deploymentSettings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DesktopLocalAgentModel

Create an instance: `desktopLocalAgentModel := client.DesktopLocalAgentModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
desktopLocalAgentModels, err := client.DesktopLocalAgentModel(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range desktopLocalAgentModels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DesktopLocalAgentResponse

Create an instance: `desktopLocalAgentResponse := client.DesktopLocalAgentResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `[]any` |  |
| `max_output_tokens` | `int` |  |
| `model` | `string` |  |
| `store` | `bool` |  |
| `stream` | `bool` |  |

#### Example: Create

```go
result, err := client.DesktopLocalAgentResponse(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "input": []any{},
    "model": "example_model",
    "store": true,
    "stream": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Device

Create an instance: `device := client.Device(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `architecture` | `string` |  |
| `channel` | `string` |  |
| `coding_connection` | `any` | Independent organization coding-control service state for the current device owner. |
| `connection_checked_at` | `any` | When this native presence observation was obtained; null when unobserved or unavailable. |
| `connection_status` | `string` | Display-only native presence. |
| `control_delivery_policy` | `map[string]any` |  |
| `control_spawn_policy` | `map[string]any` |  |
| `created_at` | `string` |  |
| `device` | `map[string]any` |  |
| `environment` | `string` |  |
| `execution_available` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `native_device_id` | `string` |  |
| `paired_at` | `string` |  |
| `pairing_generation` | `int` |  |
| `platform` | `string` |  |
| `project_visibility` | `map[string]any` | Folder discovery and new-thread selection. |
| `provider_status` | `[]any` | Recent native provider observations; absent on older API replicas. |
| `revoked_at` | `any` |  |
| `scheduled_check_ins` | `bool` | Whether the owner's private agents may check this computer's connection during scheduled runs. |
| `user_browser_access` | `string` | Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab. |

#### Example: Load

```go
device, err := client.Device(nil).Load(map[string]any{"id": "device_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(device.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
devices, err := client.Device(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range devices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeviceBrowserOperation

Create an instance: `deviceBrowserOperation := client.DeviceBrowserOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `string` | The in-app browser takes open through open_external; the person's own browser (arguments.browser user) takes open, tabs, share_tab, navigate, back, reload, screenshot, read, click, type, press, scroll and close. |
| `created_at` | `string` |  |
| `id` | `string` |  |

#### Example: List

```go
deviceBrowserOperations, err := client.DeviceBrowserOperation(nil).List(map[string]any{"device_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deviceBrowserOperations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeviceControlMessage

Create an instance: `deviceControlMessage := client.DeviceControlMessage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `agent_name` | `string` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `sender` | `any` |  |
| `text` | `any` |  |
| `text_omitted` | `bool` |  |
| `thread` | `map[string]any` |  |

#### Example: List

```go
deviceControlMessages, err := client.DeviceControlMessage(nil).List(map[string]any{"device_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deviceControlMessages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeviceControlOperation

Create an instance: `deviceControlOperation := client.DeviceControlOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `map[string]any` |  |
| `created_at` | `string` |  |
| `delivery` | `map[string]any` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `map[string]any` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `map[string]any` |  |
| `result` | `any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```go
deviceControlOperation, err := client.DeviceControlOperation(nil).Load(map[string]any{"id": "device_control_operation_id", "device_id": "device_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deviceControlOperation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.DeviceControlOperation(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "action": "example_action",
    "arguments": map[string]any{},
    "key": "example_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeviceEnterpriseRelay

Create an instance: `deviceEnterpriseRelay := client.DeviceEnterpriseRelay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
deviceEnterpriseRelay, err := client.DeviceEnterpriseRelay(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(deviceEnterpriseRelay.(sdk.Entity).Data()) // the loaded entity's record
```


### DeviceFolderListing

Create an instance: `deviceFolderListing := client.DeviceFolderListing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `error` | `string` |  |
| `folders` | `[]any` |  |
| `id` | `string` |  |
| `key` | `string` | Stable idempotency key for this listing. |
| `parent` | `any` |  |
| `path` | `string` | The resolved folder. |
| `state` | `string` |  |
| `truncated` | `bool` |  |

#### Example: Load

```go
deviceFolderListing, err := client.DeviceFolderListing(nil).Load(map[string]any{"id": "device_folder_listing_id", "device_id": "device_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deviceFolderListing.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.DeviceFolderListing(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "key": "example_key",
    "path": "example_path",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeviceGrant

Create an instance: `deviceGrant := client.DeviceGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `agent_name` | `any` |  |
| `can_edit` | `bool` |  |
| `can_revoke` | `bool` |  |
| `capabilities` | `[]any` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `principal_id` | `string` |  |
| `principal_name` | `any` |  |
| `revision` | `int` |  |
| `revoked_at` | `any` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
deviceGrants, err := client.DeviceGrant(nil).List(map[string]any{"device_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deviceGrants.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DeviceGrant(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "agent_id": "example_agent_id",
    "capabilities": []any{},
    "principal_id": "example_principal_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeviceInvocation

Create an instance: `deviceInvocation := client.DeviceInvocation(nil)`


### DeviceLocalEvent

Create an instance: `deviceLocalEvent := client.DeviceLocalEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | `string` |  |
| `recorded` | `bool` |  |

#### Example: Create

```go
result, err := client.DeviceLocalEvent(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "event": "example_event",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DevicePairing

Create an instance: `devicePairing := client.DevicePairing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.DevicePairing(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "architecture": "example_architecture",
    "channel": "example_channel",
    "name": "example_name",
    "platform": "example_platform",
    "public_key": "example_public_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DeviceProject

Create an instance: `deviceProject := client.DeviceProject(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### DeviceScheduledCheckIn

Create an instance: `deviceScheduledCheckIn := client.DeviceScheduledCheckIn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `bool` |  |

#### Example: Create

```go
result, err := client.DeviceScheduledCheckIn(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "enabled": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DockerBuilder

Create an instance: `dockerBuilder := client.DockerBuilder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backend` | `string` |  |
| `created_at` | `any` |  |
| `gateway_url` | `any` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `int` |  |
| `id` | `string` |  |
| `last_activity_at` | `any` |  |
| `organization_id` | `string` |  |
| `ready_at` | `any` |  |
| `slept_at` | `any` |  |
| `slug` | `string` |  |
| `startup_attempt` | `int` |  |
| `startup_failure` | `any` | Safe failure reason for the most recent startup attempt |
| `startup_stage` | `any` |  |
| `status` | `string` |  |
| `updated_at` | `any` |  |

#### Example: Load

```go
dockerBuilder, err := client.DockerBuilder(nil).Load(map[string]any{"id": "docker_builder_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dockerBuilder.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
dockerBuilders, err := client.DockerBuilder(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range dockerBuilders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DockerBuilder(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DockerBuilderSession

Create an instance: `dockerBuilderSession := client.DockerBuilderSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `docker_builder_id` | `string` |  |
| `expires_at` | `string` |  |
| `gateway_url` | `any` | Organization-addressed public WSS gateway; null until configured |
| `generation` | `int` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `revoked_at` | `any` |  |
| `user_id` | `string` |  |

#### Example: Load

```go
dockerBuilderSession, err := client.DockerBuilderSession(nil).Load(map[string]any{"id": "docker_builder_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dockerBuilderSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.DockerBuilderSession(nil).Create(map[string]any{
    "docker_builder_id": "example_docker_builder_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DockerBuilderSetting

Create an instance: `dockerBuilderSetting := client.DockerBuilderSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idle_timeout_seconds` | `int` |  |
| `max_concurrency` | `int` |  |
| `organization_id` | `string` |  |
| `region` | `string` |  |
| `runtime_timeout_seconds` | `int` |  |

#### Example: Load

```go
dockerBuilderSetting, err := client.DockerBuilderSetting(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dockerBuilderSetting.(sdk.Entity).Data()) // the loaded entity's record
```


### DomainDnsIntegration

Create an instance: `domainDnsIntegration := client.DomainDnsIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_label` | `any` |  |
| `api_token` | `string` |  |
| `created_at` | `string` |  |
| `failure_message` | `any` |  |
| `has_token` | `bool` |  |
| `id` | `string` |  |
| `last_verified_at` | `any` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
domainDnsIntegrations, err := client.DomainDnsIntegration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainDnsIntegrations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DomainDnsIntegration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "api_token": "example_api_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainPathRule

Create an instance: `domainPathRule := client.DomainPathRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_kind` | `string` |  |
| `app_service_endpoint_id` | `any` |  |
| `app_service_id` | `any` |  |
| `backend_ref` | `any` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `last_error` | `any` |  |
| `path_prefix` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
domainPathRule, err := client.DomainPathRule(nil).Load(map[string]any{"id": "domain_path_rule_id", "app_id": "app_id", "domain_id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainPathRule.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
domainPathRules, err := client.DomainPathRule(nil).List(map[string]any{"app_id": "example", "domain_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainPathRules.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DomainPathRule(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "domain_id": "example_domain_id",
    "app_service_id": "example_app_service_id",
    "path_prefix": "example_path_prefix",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Dream

Create an instance: `dream := client.Dream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attention` | `bool` | The dream skipped at least one run, which will not be retried |
| `changes` | `[]any` | One page of changes when tab is changes; empty otherwise |
| `completed_at` | `any` |  |
| `counts` | `map[string]any` |  |
| `dream` | `any` |  |
| `error_code` | `any` | Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead |
| `id` | `string` | Public id used in the dream's URL |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `phase` | `string` | Where the dream is. |
| `reason` | `any` | Plain-language explanation of the phase: the cause and what happens next. |
| `reviewed` | `int` | Finished runs and blocked executions reviewed, not counting skipped ones |
| `reviewed_date` | `string` | Local day whose finished runs it reviewed |
| `runs` | `[]any` | One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise |
| `scope_name` | `string` | Project or unassigned environment name |
| `skipped` | `int` | Runs skipped after repeated rejected review output |
| `tab` | `string` |  |
| `timezone` | `string` | Organization timezone the dream used |

#### Example: Load

```go
dream, err := client.Dream(nil).Load(map[string]any{"id": "dream_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dream.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
dreams, err := client.Dream(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range dreams.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Edge

Create an instance: `edge := client.Edge(nil)`


### EmailVerification

Create an instance: `emailVerification := client.EmailVerification(nil)`


### Environment

Create an instance: `environment := client.Environment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_revision_id` | `any` |  |
| `agent_sign_up_available` | `bool` | Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`). |
| `allowed_actions` | `string` | read_only only looks around; writes may create, change and delete data. |
| `billing` | `map[string]any` |  |
| `cleanup` | `[]any` |  |
| `connection` | `string` |  |
| `created_at` | `string` |  |
| `default_policy` | `map[string]any` |  |
| `default_policy_json` | `map[string]any` |  |
| `discovery_defaults` | `map[string]any` |  |
| `environment` | `map[string]any` |  |
| `exploration_accounts` | `[]any` |  |
| `explorations` | `[]any` |  |
| `first_run` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `imessage_number` | `any` | International destination number; blank or null clears it on an added environment. |
| `included_deep_scan` | `bool` | Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else. |
| `lock_version` | `int` |  |
| `managed_google_available` | `bool` | Whether the managed Google account can be offered for this app. |
| `managed_google_email` | `string` |  |
| `messaging_tester_number` | `any` | One configured tester number. |
| `name` | `string` | Optional for a website target; defaults to its hostname. |
| `network_connections` | `[]any` |  |
| `onboarding_discovery` | `any` |  |
| `organization_id` | `string` |  |
| `pending_accounts` | `[]any` | Credentials on a Composal address still waiting for the password the customer chose at signup. |
| `permissions` | `map[string]any` |  |
| `project_id` | `any` | Owning project. |
| `repository_id` | `any` |  |
| `revisions` | `[]any` |  |
| `setup_discovery_id` | `any` | Existing discovery to resume after setup or Checkout, selected within this environment. |
| `sign_in_check_available` | `bool` | Whether a test account's live sign-in check can run on this app. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `target_kind` | `any` |  |
| `target_url` | `any` |  |
| `test_accounts` | `map[string]any` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `any` |  |
| `version` | `int` | Required for target or tester changes; use lock_version from the environment. |

#### Example: Load

```go
environment, err := client.Environment(nil).Load(map[string]any{"id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(environment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Environment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EnvironmentDiscoveryRun

Create an instance: `environmentDiscoveryRun := client.EnvironmentDiscoveryRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` | Omit for anonymous exploration |
| `deadline_at` | `string` |  |
| `environment_revision_id` | `string` |  |
| `evidence` | `[]any` |  |
| `failure_code` | `any` |  |
| `id` | `string` |  |
| `queued_at` | `string` |  |
| `recording` | `map[string]any` |  |
| `result` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```go
environmentDiscoveryRun, err := client.EnvironmentDiscoveryRun(nil).Load(map[string]any{"id": "environment_discovery_run_id", "environment_id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(environmentDiscoveryRun.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.EnvironmentDiscoveryRun(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EnvironmentExploration

Create an instance: `environmentExploration := client.EnvironmentExploration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `persona_id` | `any` |  |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```go
result, err := client.EnvironmentExploration(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EnvironmentFirstRun

Create an instance: `environmentFirstRun := client.EnvironmentFirstRun(nil)`


### EnvironmentRevision

Create an instance: `environmentRevision := client.EnvironmentRevision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_origins` | `[]any` | Origins browser testers may visit, subdomains included. |
| `app_environment_id` | `any` |  |
| `app_release_id` | `any` |  |
| `blueprint` | `map[string]any` |  |
| `blueprint_json` | `map[string]any` |  |
| `cleanup_state` | `string` |  |
| `created_at` | `string` |  |
| `digest` | `string` |  |
| `dry_run` | `bool` |  |
| `expires_at` | `any` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `ready_at` | `any` |  |
| `resolved_manifest_json` | `map[string]any` |  |
| `retention_policy_json` | `map[string]any` |  |
| `revision` | `int` |  |
| `revoked_at` | `any` |  |
| `runner_environment_revision_id` | `any` |  |
| `safety_policy_json` | `map[string]any` |  |
| `schema_version` | `int` |  |
| `source_metadata` | `map[string]any` |  |
| `source_metadata_json` | `map[string]any` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `validation_json` | `map[string]any` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```go
environmentRevision, err := client.EnvironmentRevision(nil).Load(map[string]any{"id": "environment_revision_id", "environment_id": "environment_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(environmentRevision.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.EnvironmentRevision(nil).Create(map[string]any{
    "environment_id": "example_environment_id",
    "organization_id": "example_organization_id",
    "blueprint": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EnvironmentSecretBinding

Create an instance: `environmentSecretBinding := client.EnvironmentSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: Load

```go
environmentSecretBinding, err := client.EnvironmentSecretBinding(nil).Load(map[string]any{"app_id": "app_id", "environment_id": "environment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(environmentSecretBinding.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.EnvironmentSecretBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "environment_id": "example_environment_id",
    "env_key": "example_env_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EnvironmentTestAccount

Create an instance: `environmentTestAccount := client.EnvironmentTestAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `bool` |  |
| `credentials` | `[]any` |  |
| `id` | `string` |  |
| `persona` | `string` |  |
| `revision_id` | `string` |  |
| `role` | `string` |  |
| `tenant` | `string` |  |

#### Example: List

```go
environmentTestAccounts, err := client.EnvironmentTestAccount(nil).List(map[string]any{"environment_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range environmentTestAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Evidence

Create an instance: `evidence := client.Evidence(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
evidence, err := client.Evidence(nil).Load(map[string]any{"id": "evidence_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(evidence.(sdk.Entity).Data()) // the loaded entity's record
```


### ExecutionDesiredState

Create an instance: `executionDesiredState := client.ExecutionDesiredState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `desired_state` | `map[string]any` |  |
| `id` | `string` |  |
| `stop_observed` | `bool` | True only for archived zero-capacity states with all known jobs stopped and allocations terminated. |

#### Example: Load

```go
executionDesiredState, err := client.ExecutionDesiredState(nil).Load(map[string]any{"id": "execution_desired_state_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(executionDesiredState.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ExecutionDesiredState(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ExecutionReconcilerTick

Create an instance: `executionReconcilerTick := client.ExecutionReconcilerTick(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
executionReconcilerTick, err := client.ExecutionReconcilerTick(nil).Load(map[string]any{"id": "execution_reconciler_tick_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(executionReconcilerTick.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ExecutionReconcilerTick(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ExecutionRelease

Create an instance: `executionRelease := client.ExecutionRelease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
executionRelease, err := client.ExecutionRelease(nil).Load(map[string]any{"id": "execution_release_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(executionRelease.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ExecutionRelease(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ExecutionRuntimeInstance

Create an instance: `executionRuntimeInstance := client.ExecutionRuntimeInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter_kind` | `string` |  |
| `app_environment_id` | `string` |  |
| `app_release_id` | `any` |  |
| `app_service_id` | `string` |  |
| `booted_at` | `any` |  |
| `booted_at_label` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `hosted_app_id` | `string` |  |
| `id` | `string` |  |
| `instance_key` | `string` |  |
| `last_reconciled_at` | `any` |  |
| `last_reconciled_at_label` | `any` |  |
| `last_seen_at` | `any` |  |
| `last_seen_at_label` | `any` |  |
| `location` | `any` |  |
| `location_id` | `string` |  |
| `network_peer_id` | `any` |  |
| `nomad_allocation_id` | `any` |  |
| `nomad_task_name` | `any` |  |
| `organization_id` | `string` |  |
| `private_ipv4` | `any` |  |
| `private_ipv6` | `any` |  |
| `provider_instance_id` | `any` |  |
| `public_endpoint` | `any` |  |
| `service_name` | `string` | Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`. |
| `slug` | `string` |  |
| `status` | `string` |  |
| `terminated_at` | `any` |  |
| `terminated_at_label` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
executionRuntimeInstance, err := client.ExecutionRuntimeInstance(nil).Load(map[string]any{"id": "execution_runtime_instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(executionRuntimeInstance.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
executionRuntimeInstances, err := client.ExecutionRuntimeInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range executionRuntimeInstances.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ExecutionRuntimeInstance(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Exploration

Create an instance: `exploration := client.Exploration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `check_count` | `int` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `credential_name` | `any` | The credential the team signed in with, by its saved name if it was deleted; null for public access. |
| `deadline_at` | `string` | When the team's time limit ends. |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `duration_ms` | `any` |  |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `persona_id` | `any` | Project persona whose role and observed access this discovery maps. |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_count` | `int` | Scenarios saved from this discovery. |
| `scenario_generation` | `map[string]any` |  |
| `scenarios_pending` | `bool` | Scenarios are still being prepared, so scenario_count may still grow. |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `started_at` | `string` |  |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Load

```go
exploration, err := client.Exploration(nil).Load(map[string]any{"id": "exploration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(exploration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
explorations, err := client.Exploration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range explorations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Exploration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "environment_id": "example_environment_id",
    "goal": "example_goal",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ExplorationMessage

Create an instance: `explorationMessage := client.ExplorationMessage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `text` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```go
result, err := client.ExplorationMessage(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ExplorationReport

Create an instance: `explorationReport := client.ExplorationReport(nil)`


### ExplorationScenario

Create an instance: `explorationScenario := client.ExplorationScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_filters` | `map[string]any` | Status counts and matching agent IDs for every filter in this live snapshot. |
| `agents` | `[]any` |  |
| `can_continue` | `bool` | Whether a finished run can be resumed through the orchestrator. |
| `chat_messages` | `[]any` |  |
| `concurrency` | `int` |  |
| `covered_areas` | `[]any` | Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out. |
| `created_at` | `string` |  |
| `deadline_at` | `string` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one. |
| `ended_early` | `bool` | Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed. |
| `environment_id` | `string` |  |
| `environment_name` | `string` |  |
| `explorer_activity` | `map[string]any` | What the team is doing now. |
| `finding_count` | `int` | Findings at every priority, locked ones included. |
| `findings` | `[]any` | Every tester's findings, most severe first, with the checks each one cites. |
| `findings_fix_prompt` | `any` | One coding-agent prompt covering every finding, most severe first. |
| `finished_at` | `any` |  |
| `goal` | `string` |  |
| `huntable_flows` | `[]any` | Deprecated alias of scannable_flows, kept for released CLIs. |
| `id` | `string` |  |
| `max_seconds` | `int` |  |
| `max_testers` | `int` |  |
| `mode` | `string` |  |
| `next_scan_improvements` | `[]any` | The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan. |
| `observed_at` | `string` | Time this run snapshot was read; distinct from browser activity timestamps. |
| `onboarding` | `bool` | Whether this is the workspace's free first discovery, started by setup. |
| `paywalled` | `bool` | Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid. |
| `permissions` | `map[string]any` |  |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` | Set when the exploration targets a project environment. |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `reproduction_of` | `any` | The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser. |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `saves_scenarios` | `bool` | Whether this exploration has started saving scenarios. |
| `scannable_flows` | `[]any` | Flows a finished exploration recorded that deep scans can start from. |
| `scenario_generation` | `map[string]any` |  |
| `sign_in_needs_answer` | `bool` | Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again. |
| `sign_in_outcome` | `string` | A sign-in check's outcome; null for other runs. |
| `sign_in_question` | `any` | What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs. |
| `startup_retryable` | `bool` | Failed browser startup can be retried without extending the original deadline or tester budget. |
| `status` | `string` |  |
| `time_limit_reached` | `bool` | Whether a partial run ended because it used its whole time budget, rather than stopping early. |
| `title` | `string` | The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`. |
| `unlock` | `any` | Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page. |
| `web_url` | `string` | The run's page in the Composal web app |

#### Example: Create

```go
result, err := client.ExplorationScenario(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Finding

Create an instance: `finding := client.Finding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `created_at` | `string` |  |
| `deferred_until` | `any` | Required future time when status is deferred |
| `finding` | `map[string]any` |  |
| `fingerprint` | `string` |  |
| `first_seen_at` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `bool` | True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid. |
| `occurrence_count` | `int` |  |
| `organization_id` | `string` |  |
| `permissions` | `map[string]any` |  |
| `reason` | `string` | Why the finding was resolved or ignored, such as "Expected for trial accounts". |
| `reported_occurrence` | `any` | The Discovery or Deep Scan report behind the finding; null for scenario run findings |
| `repository_id` | `any` |  |
| `safe_summary` | `string` |  |
| `scenario_occurrences` | `[]any` |  |
| `severity` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verification` | `any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |

#### Example: Load

```go
finding, err := client.Finding(nil).Load(map[string]any{"id": "finding_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(finding.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
findings, err := client.Finding(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range findings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Gh

Create an instance: `gh := client.Gh(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `map[string]any` |  |
| `content` | `map[string]any` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `any` |  |
| `pull_request` | `any` |  |
| `stack` | `map[string]any` |  |
| `transcript_paths` | `[]any` |  |

#### Example: Load

```go
gh, err := client.Gh(nil).Load(map[string]any{"id": "gh_id", "gh_id": "gh_id", "github_repo": "github_repo", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gh.(sdk.Entity).Data()) // the loaded entity's record
```


### GitImport

Create an instance: `gitImport := client.GitImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destination_mode` | `string` |  |
| `error` | `any` |  |
| `git_default_branch` | `string` | Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion |
| `git_status` | `string` |  |
| `git_url` | `string` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `name` | `string` |  |
| `native_status` | `string` |  |
| `organization` | `string` |  |
| `repository_id` | `any` |  |
| `root_path` | `string` |  |
| `slug` | `string` |  |
| `source_branch` | `string` |  |
| `target_branch` | `string` |  |

#### Example: Load

```go
gitImport, err := client.GitImport(nil).Load(map[string]any{"id": "git_import_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gitImport.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.GitImport(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "destination_mode": "example_destination_mode",
    "idempotency_key": "example_idempotency_key",
    "root_path": "example_root_path",
    "slug": "example_slug",
    "source_branch": "example_source_branch",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Github

Create an instance: `github := client.Github(nil)`


### GithubApp

Create an instance: `githubApp := client.GithubApp(nil)`


### GithubAppImportableRepository

Create an instance: `githubAppImportableRepository := client.GithubAppImportableRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_login` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `next_page` | `any` | Next GitHub page for this installation |
| `repositories` | `[]any` |  |

#### Example: List

```go
githubAppImportableRepositorys, err := client.GithubAppImportableRepository(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubAppImportableRepositorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GithubAppInstallation

Create an instance: `githubAppInstallation := client.GithubAppInstallation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `any` |  |
| `account_id` | `any` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `any` |  |
| `installed_at_label` | `any` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `[]any` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `map[string]any` |  |
| `status` | `string` |  |
| `suspended_at` | `any` |  |
| `suspended_at_label` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
githubAppInstallations, err := client.GithubAppInstallation(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubAppInstallations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GithubAppInstallationAuthorization

Create an instance: `githubAppInstallationAuthorization := client.GithubAppInstallationAuthorization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `installation_url` | `string` |  |
| `organization_slug` | `string` | Vex organization slug whose installation will be linked. |
| `return_target` | `string` | Server-validated Vex application target used after verification. |

#### Example: Create

```go
result, err := client.GithubAppInstallationAuthorization(nil).Create(map[string]any{
    "organization_slug": "example_organization_slug",
    "return_target": "example_return_target",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubAppUserAuthorization

Create an instance: `githubAppUserAuthorization := client.GithubAppUserAuthorization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.GithubAppUserAuthorization(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubCiRepository

Create an instance: `githubCiRepository := client.GithubCiRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adoption_mode` | `string` |  |
| `check_name_prefix` | `string` |  |
| `ci_runner_pool_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `default_branch` | `string` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `id` | `string` |  |
| `last_compatibility_status` | `any` |  |
| `last_error_message` | `any` |  |
| `last_head_sha` | `any` |  |
| `last_pull_request_number` | `any` |  |
| `last_ref` | `any` |  |
| `last_webhook_action` | `any` |  |
| `last_webhook_at` | `any` |  |
| `last_webhook_at_label` | `any` |  |
| `last_webhook_delivery_id` | `any` |  |
| `last_webhook_event` | `any` |  |
| `metadata` | `map[string]any` |  |
| `organization_id` | `string` |  |
| `permission_status` | `string` |  |
| `repository_full_name` | `string` |  |
| `repository_name` | `string` |  |
| `repository_owner` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `webhook_delivery_count` | `int` |  |

#### Example: Load

```go
githubCiRepository, err := client.GithubCiRepository(nil).Load(map[string]any{"id": "github_ci_repository_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubCiRepository.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
githubCiRepositorys, err := client.GithubCiRepository(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubCiRepositorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.GithubCiRepository(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_app_installation_id": "example_github_app_installation_id",
    "github_repository_id": "example_github_repository_id",
    "repository_name": "example_repository_name",
    "repository_owner": "example_repository_owner",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubCiRepositoryCompatibilityReport

Create an instance: `githubCiRepositoryCompatibilityReport := client.GithubCiRepositoryCompatibilityReport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `string` |  |
| `analyzed_at_label` | `any` |  |
| `ci_pipeline_id` | `any` |  |
| `ci_pipeline_run_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `diagnostics` | `[]any` |  |
| `errors` | `[]any` |  |
| `event_action` | `any` |  |
| `event_name` | `string` |  |
| `execution_allowed` | `bool` |  |
| `github_ci_repository_id` | `string` |  |
| `head_sha` | `any` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` |  |
| `organization_id` | `string` |  |
| `parser_version` | `string` |  |
| `pull_request_number` | `any` |  |
| `ref_name` | `any` |  |
| `referenced_actions` | `[]any` |  |
| `required_secrets` | `[]any` |  |
| `runner_labels` | `[]any` |  |
| `source_blob_sha` | `any` |  |
| `source_sha` | `string` |  |
| `status` | `string` |  |
| `supported_features` | `map[string]any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `warnings` | `[]any` |  |
| `workflow_name` | `any` |  |
| `workflow_path` | `string` |  |

#### Example: Load

```go
githubCiRepositoryCompatibilityReport, err := client.GithubCiRepositoryCompatibilityReport(nil).Load(map[string]any{"id": "github_ci_repository_compatibility_report_id", "github_ci_repository_id": "github_ci_repository_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubCiRepositoryCompatibilityReport.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
githubCiRepositoryCompatibilityReports, err := client.GithubCiRepositoryCompatibilityReport(nil).List(map[string]any{"github_ci_repository_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubCiRepositoryCompatibilityReports.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GithubConnection

Create an instance: `githubConnection := client.GithubConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `[]any` |  |
| `github_app_installation_id` | `string` |  |
| `installations` | `[]any` |  |
| `project_id` | `string` | Project slug or public ID the repositories are added to. |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `[]any` |  |

#### Example: Load

```go
githubConnection, err := client.GithubConnection(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubConnection.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.GithubConnection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_app_installation_id": "example_github_app_installation_id",
    "repositories": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubIntegration

Create an instance: `githubIntegration := client.GithubIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `any` |  |
| `account_login` | `string` |  |
| `connection_status` | `string` |  |
| `connection_status_label` | `string` |  |
| `github_installation` | `any` |  |
| `health` | `map[string]any` |  |
| `id` | `string` |  |
| `imported_repositories_count` | `int` |  |
| `imported_repositories_count_label` | `string` |  |
| `organization` | `map[string]any` |  |
| `pagination` | `map[string]any` |  |
| `repositories` | `[]any` |  |

#### Example: Load

```go
githubIntegration, err := client.GithubIntegration(nil).Load(map[string]any{"id": "github_integration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubIntegration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
githubIntegrations, err := client.GithubIntegration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubIntegrations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GithubOnboarding

Create an instance: `githubOnboarding := client.GithubOnboarding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `[]any` |  |
| `active_batch_id` | `any` | The batch the wizard's import step should resume — the most recent batch still working, else the most recent overall. |
| `batches` | `[]any` |  |
| `capabilities` | `map[string]any` |  |
| `installations` | `[]any` |  |

#### Example: Load

```go
githubOnboarding, err := client.GithubOnboarding(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubOnboarding.(sdk.Entity).Data()) // the loaded entity's record
```


### GithubOnboardingBranch

Create an instance: `githubOnboardingBranch := client.GithubOnboardingBranch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `branches` | `[]any` |  |

#### Example: List

```go
githubOnboardingBranchs, err := client.GithubOnboardingBranch(nil).List(map[string]any{"organization_id": "example", "github_app_installation_id": "example", "name": "example", "owner": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubOnboardingBranchs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### GithubOnboardingImport

Create an instance: `githubOnboardingImport := client.GithubOnboardingImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `items` | `[]any` |  |
| `repositories` | `any` |  |
| `status` | `string` |  |
| `terminal_item_count` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Create

```go
result, err := client.GithubOnboardingImport(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_app_installation_id": "example_github_app_installation_id",
    "repositories": "example_repositories",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubOnboardingImportBatch

Create an instance: `githubOnboardingImportBatch := client.GithubOnboardingImportBatch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `items` | `[]any` |  |
| `status` | `string` |  |
| `terminal_item_count` | `int` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
githubOnboardingImportBatch, err := client.GithubOnboardingImportBatch(nil).Load(map[string]any{"id": "github_onboarding_import_batch_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubOnboardingImportBatch.(sdk.Entity).Data()) // the loaded entity's record
```


### GithubOnboardingImportItem

Create an instance: `githubOnboardingImportItem := client.GithubOnboardingImportItem(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GithubPullRequest

Create an instance: `githubPullRequest := client.GithubPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `map[string]any` |  |
| `content` | `map[string]any` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `magic_merge` | `any` |  |
| `pull_request` | `any` |  |
| `stack` | `map[string]any` |  |
| `transcript_paths` | `[]any` |  |

#### Example: Load

```go
githubPullRequest, err := client.GithubPullRequest(nil).Load(map[string]any{"id": "github_pull_request_id", "organization_id": "organization_id", "pull_request_id": "pull_request_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubPullRequest.(sdk.Entity).Data()) // the loaded entity's record
```


### GithubRunnerAdmission

Create an instance: `githubRunnerAdmission := client.GithubRunnerAdmission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.GithubRunnerAdmission(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubRunnerCache

Create an instance: `githubRunnerCache := client.GithubRunnerCache(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `entry_id` | `string` |  |
| `key` | `string` |  |
| `matched_key` | `string` |  |
| `ok` | `bool` |  |
| `operation` | `string` |  |
| `restore_keys` | `[]any` |  |
| `signed_download_url` | `string` |  |
| `size_bytes` | `string` |  |
| `upload_path` | `string` |  |
| `version` | `string` |  |

#### Example: Create

```go
result, err := client.GithubRunnerCache(nil).Create(map[string]any{
    "operation": "example_operation",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubRunnerEgress

Create an instance: `githubRunnerEgress := client.GithubRunnerEgress(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_request` | `bool` |  |
| `cidr` | `any` |  |
| `ipv4` | `any` |  |
| `requested_at_label` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```go
githubRunnerEgress, err := client.GithubRunnerEgress(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubRunnerEgress.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.GithubRunnerEgress(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubRunnerHistory

Create an instance: `githubRunnerHistory := client.GithubRunnerHistory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `[]any` |  |
| `counts` | `map[string]any` |  |
| `observed_at` | `string` |  |
| `pagination` | `map[string]any` |  |
| `repositories` | `[]any` |  |
| `runs` | `[]any` |  |
| `setup` | `any` | CI onboarding. |
| `success_rate` | `any` |  |
| `usage` | `map[string]any` |  |

#### Example: Load

```go
githubRunnerHistory, err := client.GithubRunnerHistory(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubRunnerHistory.(sdk.Entity).Data()) // the loaded entity's record
```


### GithubRunnerImage

Create an instance: `githubRunnerImage := client.GithubRunnerImage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `image_reference` | `string` | Immutable linux/amd64 Ubuntu 24.04 image, registry/repository@sha256:digest, with Node 22+ |
| `last_error` | `any` |  |
| `modal_image_id` | `any` |  |
| `name` | `string` |  |
| `registry_secret_name` | `any` | Name of an organization CI secret containing REGISTRY_USERNAME and REGISTRY_PASSWORD JSON fields |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
githubRunnerImage, err := client.GithubRunnerImage(nil).Load(map[string]any{"id": "github_runner_image_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubRunnerImage.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
githubRunnerImages, err := client.GithubRunnerImage(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubRunnerImages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.GithubRunnerImage(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "image_reference": "example_image_reference",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubRunnerPool

Create an instance: `githubRunnerPool := client.GithubRunnerPool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpu_millicores` | `int` |  |
| `enabled` | `bool` |  |
| `github_app_installation_id` | `string` |  |
| `github_repository_id` | `string` |  |
| `github_runner_image` | `any` |  |
| `id` | `string` |  |
| `image` | `any` | Organization image name or ID; null restores the standard image |
| `invocations` | `[]any` |  |
| `label` | `string` |  |
| `last_error` | `any` |  |
| `last_polled_at` | `any` |  |
| `max_concurrency` | `int` |  |
| `memory_mb` | `int` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `repository_full_name` | `string` |  |
| `runtime_kind` | `string` |  |
| `timeout_seconds` | `int` |  |

#### Example: List

```go
githubRunnerPools, err := client.GithubRunnerPool(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubRunnerPools.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.GithubRunnerPool(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_app_installation_id": "example_github_app_installation_id",
    "repository_full_name": "example_repository_full_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GithubRunnerSetup

Create an instance: `githubRunnerSetup := client.GithubRunnerSetup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `any` |  |
| `github_repository_connection_id` | `string` |  |
| `id` | `string` |  |
| `pull_request_url` | `any` |  |
| `repository_full_name` | `string` |  |
| `roder_thread_id` | `any` |  |
| `runner_labels` | `[]any` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `summary` | `any` |  |

#### Example: Load

```go
githubRunnerSetup, err := client.GithubRunnerSetup(nil).Load(map[string]any{"id": "github_runner_setup_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(githubRunnerSetup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.GithubRunnerSetup(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "github_repository_connection_id": "example_github_repository_connection_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Gitlab

Create an instance: `gitlab := client.Gitlab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configured` | `bool` |  |
| `connections` | `[]any` |  |
| `integrations` | `[]any` |  |
| `inventory_error` | `any` |  |
| `next_page` | `any` |  |
| `organization` | `map[string]any` |  |
| `projects` | `[]any` |  |
| `redirect_uri` | `any` | The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured. |
| `selected_integration_id` | `any` |  |

#### Example: Load

```go
gitlab, err := client.Gitlab(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gitlab.(sdk.Entity).Data()) // the loaded entity's record
```


### GitlabConnection

Create an instance: `gitlabConnection := client.GitlabConnection(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### GitlabImport

Create an instance: `gitlabImport := client.GitlabImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `integration_id` | `string` |  |
| `project_id` | `int` |  |
| `repo_slug` | `string` |  |
| `source_branch` | `string` |  |

#### Example: Create

```go
result, err := client.GitlabImport(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "integration_id": "example_integration_id",
    "project_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GitlabOauth

Create an instance: `gitlabOauth := client.GitlabOauth(nil)`


### GrantAllAgent

Create an instance: `grantAllAgent := client.GrantAllAgent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `all_agents_access` | `bool` |  |
| `enabled` | `bool` |  |
| `execution_available` | `bool` |  |

#### Example: Create

```go
result, err := client.GrantAllAgent(nil).Create(map[string]any{
    "device_id": "example_device_id",
    "organization_id": "example_organization_id",
    "enabled": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### HostingAppDomain

Create an instance: `hostingAppDomain := client.HostingAppDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `certificate` | `any` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `any` |  |
| `hosted_app_id` | `string` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `any` |  |
| `path_rules` | `[]any` |  |
| `record_name` | `any` |  |
| `record_type` | `any` |  |
| `record_value` | `any` |  |
| `redirect_to` | `any` |  |
| `static_site_id` | `any` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_record` | `any` |  |
| `verification_status` | `string` |  |

#### Example: Load

```go
hostingAppDomain, err := client.HostingAppDomain(nil).Load(map[string]any{"id": "hosting_app_domain_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(hostingAppDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.HostingAppDomain(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "app_service_id": "example_app_service_id",
    "hostname": "example_hostname",
    "kind": "example_kind",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### IdentityOrganization

Create an instance: `identityOrganization := client.IdentityOrganization(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### ImageRepository

Create an instance: `imageRepository := client.ImageRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_configured` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider_kind` | `string` |  |
| `registry_auth_token` | `string` |  |
| `repository_path` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `visibility` | `string` |  |

#### Example: List

```go
imageRepositorys, err := client.ImageRepository(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range imageRepositorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ImageRepository(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ImageRepositoryTag

Create an instance: `imageRepositoryTag := client.ImageRepositoryTag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `image_repository` | `map[string]any` |  |
| `name` | `string` |  |
| `registry_url` | `string` |  |
| `tags` | `[]any` |  |

#### Example: List

```go
imageRepositoryTags, err := client.ImageRepositoryTag(nil).List(map[string]any{"image_repository_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range imageRepositoryTags.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ImportBranchPolicy

Create an instance: `importBranchPolicy := client.ImportBranchPolicy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `[]any` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `map[string]any` |  |
| `sandbox_regions` | `[]any` |  |

#### Example: Load

```go
importBranchPolicy, err := client.ImportBranchPolicy(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(importBranchPolicy.(sdk.Entity).Data()) // the loaded entity's record
```


### Integration

Create an instance: `integration := client.Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `map[string]any` |  |
| `gitlab` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `slack` | `map[string]any` |  |

#### Example: Load

```go
integration, err := client.Integration(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(integration.(sdk.Entity).Data()) // the loaded entity's record
```


### InteractionResponse

Create an instance: `interactionResponse := client.InteractionResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answer` | `map[string]any` |  |
| `conversation_id` | `string` | Explicit conversation identity, including an agent-scoped native session alias. |
| `expected_revision` | `int` |  |

#### Example: Create

```go
result, err := client.InteractionResponse(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "interaction_id": "example_interaction_id",
    "organization_id": "example_organization_id",
    "answer": map[string]any{},
    "conversation_id": "example_conversation_id",
    "expected_revision": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Invitation

Create an instance: `invitation := client.Invitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `any` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `id` | `string` |  |
| `invite_url` | `any` |  |
| `invited_by_user` | `any` |  |
| `organization` | `map[string]any` |  |
| `revoked_at` | `any` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
invitations, err := client.Invitation(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range invitations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Invitation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### InvocationControl

Create an instance: `invocationControl := client.InvocationControl(nil)`


### JobLogChunk

Create an instance: `jobLogChunk := client.JobLogChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `byte_size` | `int` |  |
| `ci_job_id` | `any` |  |
| `ci_pipeline_run_id` | `any` |  |
| `ci_step_id` | `any` |  |
| `content` | `string` |  |
| `content_format` | `string` |  |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `organization_id` | `string` |  |
| `sequence_number` | `int` |  |
| `stream` | `string` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
jobLogChunks, err := client.JobLogChunk(nil).List(map[string]any{"job_id": "example", "pipeline_id": "example", "run_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range jobLogChunks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.JobLogChunk(nil).Create(map[string]any{
    "job_id": "example_job_id",
    "pipeline_id": "example_pipeline_id",
    "run_id": "example_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### JobStep

Create an instance: `jobStep := client.JobStep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
jobStep, err := client.JobStep(nil).Load(map[string]any{"job_id": "job_id", "pipeline_id": "pipeline_id", "run_id": "run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(jobStep.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.JobStep(nil).Create(map[string]any{
    "job_id": "example_job_id",
    "pipeline_id": "example_pipeline_id",
    "run_id": "example_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### JobWorkspace

Create an instance: `jobWorkspace := client.JobWorkspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
jobWorkspace, err := client.JobWorkspace(nil).Load(map[string]any{"job_id": "job_id", "pipeline_id": "pipeline_id", "run_id": "run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(jobWorkspace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.JobWorkspace(nil).Create(map[string]any{
    "job_id": "example_job_id",
    "pipeline_id": "example_pipeline_id",
    "run_id": "example_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### JourneyVariantReplay

Create an instance: `journeyVariantReplay := client.JourneyVariantReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `any` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `string` |  |
| `failure_code` | `any` |  |
| `failure_message` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `max_seconds` | `int` |  |
| `preparation_receipt` | `any` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `string` |  |
| `run_id` | `any` |  |
| `scenario_file` | `map[string]any` |  |
| `scenario_run_id` | `any` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Create

```go
result, err := client.JourneyVariantReplay(nil).Create(map[string]any{
    "journey_variant_id": "example_journey_variant_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "idempotency_key": "example_idempotency_key",
    "review_reason": "example_review_reason",
    "scenario_file": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Knowledge

Create an instance: `knowledge := client.Knowledge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_digest` | `string` |  |
| `content_json` | `map[string]any` |  |
| `document` | `map[string]any` |  |
| `documents` | `[]any` |  |
| `dreaming` | `map[string]any` |  |
| `expected_digest` | `string` |  |
| `history` | `[]any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `markdown` | `string` |  |
| `observed_at` | `string` |  |
| `organization` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `project_id` | `string` |  |
| `project_name` | `string` |  |
| `projects` | `[]any` |  |
| `selected_project_id` | `any` |  |
| `source` | `map[string]any` |  |
| `title` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```go
knowledge, err := client.Knowledge(nil).Load(map[string]any{"id": "knowledge_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(knowledge.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Knowledge(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "markdown": "example_markdown",
    "project_id": "example_project_id",
    "title": "example_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Known

Create an instance: `known := client.Known(nil)`


### Label

Create an instance: `label := client.Label(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes_count` | `int` |  |
| `id` | `string` |  |
| `name` | `string` | Display name |
| `slug` | `string` | Normalized identity used for filtering and lookup. |

#### Example: List

```go
labels, err := client.Label(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range labels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LeaseArtifact

Create an instance: `leaseArtifact := client.LeaseArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.LeaseArtifact(nil).Create(map[string]any{
    "lease_id": "example_lease_id",
    "node_id": "example_node_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LeaseCache

Create an instance: `leaseCache := client.LeaseCache(nil)`


### LeaseLogChunk

Create an instance: `leaseLogChunk := client.LeaseLogChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.LeaseLogChunk(nil).Create(map[string]any{
    "lease_id": "example_lease_id",
    "node_id": "example_node_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LeaseReconciliation

Create an instance: `leaseReconciliation := client.LeaseReconciliation(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseStep

Create an instance: `leaseStep := client.LeaseStep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LeaseVerifyDiagnostic

Create an instance: `leaseVerifyDiagnostic := client.LeaseVerifyDiagnostic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_events` | `map[string]any` |  |
| `live_browser` | `map[string]any` |  |
| `live_view` | `map[string]any` | The tester's read-only live stream for page viewers. |
| `steps` | `[]any` |  |

#### Example: Create

```go
result, err := client.LeaseVerifyDiagnostic(nil).Create(map[string]any{
    "lease_id": "example_lease_id",
    "swarm_id": "example_swarm_id",
    "task_id": "example_task_id",
    "browser_events": map[string]any{},
    "live_browser": map[string]any{},
    "live_view": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LeaseVerifySecret

Create an instance: `leaseVerifySecret := client.LeaseVerifySecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.LeaseVerifySecret(nil).Create(map[string]any{
    "lease_id": "example_lease_id",
    "swarm_id": "example_swarm_id",
    "task_id": "example_task_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LeaseWorkspace

Create an instance: `leaseWorkspace := client.LeaseWorkspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### LocalAgentDecision

Create an instance: `localAgentDecision := client.LocalAgentDecision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request` | `map[string]any` | A native OpenAI Decisions request for gpt-6-luna, at most 1600 KiB, with inline images only |

#### Example: Create

```go
result, err := client.LocalAgentDecision(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "request": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LocalAgentResponse

Create an instance: `localAgentResponse := client.LocalAgentResponse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `input` | `[]any` |  |
| `model` | `string` |  |
| `service_tier` | `any` |  |
| `store` | `bool` |  |
| `stream` | `bool` |  |
| `tools` | `[]any` |  |

#### Example: Create

```go
result, err := client.LocalAgentResponse(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "input": []any{},
    "model": "example_model",
    "store": true,
    "stream": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LocalThreadDelivery

Create an instance: `localThreadDelivery := client.LocalThreadDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `string` |  |
| `decision_pending` | `bool` |  |
| `delivery` | `map[string]any` |  |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `policy` | `map[string]any` |  |
| `recovery_message` | `any` |  |

#### Example: Load

```go
localThreadDelivery, err := client.LocalThreadDelivery(nil).Load(map[string]any{"id": "local_thread_delivery_id", "agent_id": "agent_id", "local_thread_id": "local_thread_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(localThreadDelivery.(sdk.Entity).Data()) // the loaded entity's record
```


### LocalThreadOperation

Create an instance: `localThreadOperation := client.LocalThreadOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `arguments` | `map[string]any` |  |
| `created_at` | `string` |  |
| `delivery` | `map[string]any` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `map[string]any` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `provider` | `string` |  |
| `references` | `map[string]any` |  |
| `result` | `any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `state` | `string` |  |

#### Example: Load

```go
localThreadOperation, err := client.LocalThreadOperation(nil).Load(map[string]any{"id": "local_thread_operation_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(localThreadOperation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.LocalThreadOperation(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "local_thread_id": "example_local_thread_id",
    "organization_id": "example_organization_id",
    "action": "example_action",
    "arguments": map[string]any{},
    "key": "example_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Location

Create an instance: `location := client.Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range locations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LogStreamChunk

Create an instance: `logStreamChunk := client.LogStreamChunk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
logStreamChunk, err := client.LogStreamChunk(nil).Load(map[string]any{"id": "log_stream_chunk_id", "log_stream_id": "log_stream_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(logStreamChunk.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.LogStreamChunk(nil).Create(map[string]any{
    "log_stream_id": "example_log_stream_id",
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LogoImage

Create an instance: `logoImage := client.LogoImage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `[]any` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `logo_url` | `any` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `any` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `[]any` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |


### MarketingSetting

Create an instance: `marketingSetting := client.MarketingSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `call_first` | `bool` |  |

#### Example: Load

```go
marketingSetting, err := client.MarketingSetting(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marketingSetting.(sdk.Entity).Data()) // the loaded entity's record
```


### McpOauth

Create an instance: `mcpOauth := client.McpOauth(nil)`


### Me

Create an instance: `me := client.Me(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_organization` | `any` |  |
| `analytics_distinct_id` | `string` |  |
| `analytics_internal` | `bool` | Staff, team or test account; its product analytics are marked internal. |
| `api_base_url` | `string` |  |
| `api_token` | `string` |  |
| `app_promotion` | `map[string]any` |  |
| `commit_author_email` | `string` |  |
| `email` | `string` |  |
| `enabled_features` | `[]any` |  |
| `github_pr_user_authorization_connected` | `bool` |  |
| `github_pr_user_authorization_login` | `any` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `impersonation` | `any` |  |
| `name` | `any` |  |
| `next_path` | `string` | Present on a sign-in that created the person's first workspace; its setup page, where they go next. |
| `onboarding` | `map[string]any` | V2 agent onboarding progress. |
| `openai_sign_in_connected` | `bool` |  |
| `openai_sign_in_enabled` | `bool` |  |
| `organizations` | `[]any` |  |
| `pending_organization_invitation_count` | `int` |  |
| `pending_organization_invitation_count_label` | `string` |  |
| `picture_url` | `any` |  |
| `superadmin` | `bool` | Present and true only for Composal staff superadmins, not while impersonating. |
| `time_zone` | `any` | The IANA zone the person chose for their agents' replies; null follows their app. |

#### Example: Load

```go
me, err := client.Me(nil).Load(map[string]any{"id": "me_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(me.(sdk.Entity).Data()) // the loaded entity's record
```


### MeEmail

Create an instance: `meEmail := client.MeEmail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `emails` | `[]any` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `verification_status` | `string` |  |
| `verified` | `bool` |  |

#### Example: List

```go
meEmails, err := client.MeEmail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range meEmails.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.MeEmail(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MeOnboarding

Create an instance: `meOnboarding := client.MeOnboarding(nil)`


### MediaFile

Create an instance: `mediaFile := client.MediaFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
mediaFile, err := client.MediaFile(nil).Load(map[string]any{"id": "media_file_id", "browser_session_id": "browser_session_id", "media_id": "media_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mediaFile.(sdk.Entity).Data()) // the loaded entity's record
```


### Member

Create an instance: `member := client.Member(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `any` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `id` | `string` |  |
| `invite_url` | `any` |  |
| `invited_by_user` | `any` |  |
| `is_self` | `bool` |  |
| `organization` | `map[string]any` |  |
| `revoked_at` | `any` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `user` | `map[string]any` |  |

#### Example: List

```go
members, err := client.Member(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range members.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Memory

Create an instance: `memory := client.Memory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `created_at` | `string` |  |
| `environment_id` | `string` |  |
| `finding` | `string` |  |
| `history` | `[]any` |  |
| `id` | `string` |  |
| `indexed_at` | `any` |  |
| `memory` | `map[string]any` |  |
| `project_id` | `string` |  |
| `response` | `string` |  |
| `scope` | `map[string]any` |  |
| `source` | `map[string]any` |  |
| `tags` | `[]any` |  |
| `title` | `string` |  |
| `workaround` | `string` |  |

#### Example: Load

```go
memory, err := client.Memory(nil).Load(map[string]any{"id": "memory_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(memory.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
memorys, err := client.Memory(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range memorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Memory(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "finding": "example_finding",
    "title": "example_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MergeQueueEntry

Create an instance: `mergeQueueEntry := client.MergeQueueEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `map[string]any` | Queue performance for the reporting window. |
| `change_id` | `any` |  |
| `expected_target_commit_id` | `any` |  |
| `expected_target_version` | `any` |  |
| `expected_version` | `int` |  |
| `github_pr_number` | `any` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `kind` | `string` |  |
| `policy` | `map[string]any` |  |
| `priority` | `string` |  |
| `queue` | `map[string]any` |  |
| `target_branches` | `[]any` | Bookmark names for the target picker. |
| `when_ready` | `any` |  |

#### Example: Create

```go
result, err := client.MergeQueueEntry(nil).Create(map[string]any{
    "merge_queue_id": "example_merge_queue_id",
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "expected_version": 1,
    "idempotency_key": "example_idempotency_key",
    "kind": "example_kind",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MergeRequest

Create an instance: `mergeRequest := client.MergeRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `[]any` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `base_sha` | `string` |  |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `comment_url` | `any` |  |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `draft` | `bool` |  |
| `findings` | `[]any` |  |
| `github_repository` | `any` | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `number` | `int` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `any` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `any` | Composal project slug or public ID for PR preview environments. |
| `project_slug` | `any` |  |
| `provider` | `string` |  |
| `pull_request` | `map[string]any` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `requested_run_id` | `any` |  |
| `runs` | `[]any` |  |
| `source_branch` | `any` |  |
| `source_repository` | `any` |  |
| `source_url` | `any` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: Load

```go
mergeRequest, err := client.MergeRequest(nil).Load(map[string]any{"id": "merge_request_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mergeRequest.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.MergeRequest(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "idempotency_key": "example_idempotency_key",
    "number": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MergeResolution

Create an instance: `mergeResolution := client.MergeResolution(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `base` | `string` | Common ancestor file contents |
| `content` | `any` |  |
| `context` | `map[string]any` | Optional surrounding files keyed by path |
| `duration_ms` | `int` |  |
| `fallback` | `bool` |  |
| `model` | `string` |  |
| `ours` | `string` | Current / left file contents |
| `path` | `string` | Repository-relative path of the conflicted file |
| `resolved` | `bool` |  |
| `theirs` | `string` | Incoming / right file contents |

#### Example: Create

```go
result, err := client.MergeResolution(nil).Create(map[string]any{
    "base": "example_base",
    "ours": "example_ours",
    "theirs": "example_theirs",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MessagingConversationMessage

Create an instance: `messagingConversationMessage := client.MessagingConversationMessage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `client_operation_id` | `string` |  |
| `content` | `string` |  |
| `id` | `string` |  |
| `media` | `map[string]any` |  |
| `media_upload_ids` | `[]any` | Ordered staged upload IDs; six on Photon, one on Sendblue. |
| `messages` | `[]any` |  |
| `reply_to` | `string` | Public ID of a visible message |
| `retry_attachment` | `bool` | Retry an already recorded attachment when its file bytes are no longer on this page. |
| `send_blocked_reason` | `any` |  |
| `send_disposition` | `string` |  |
| `send_error` | `any` |  |
| `send_style` | `any` |  |

#### Example: Create

```go
result, err := client.MessagingConversationMessage(nil).Create(map[string]any{
    "messaging_conversation_id": "example_messaging_conversation_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "client_operation_id": "example_client_operation_id",
    "content": "example_content",
    "media": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MessagingConversationUpload

Create an instance: `messagingConversationUpload := client.MessagingConversationUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachment` | `map[string]any` |  |
| `upload_id` | `string` |  |

#### Example: Create

```go
result, err := client.MessagingConversationUpload(nil).Create(map[string]any{
    "messaging_conversation_id": "example_messaging_conversation_id",
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MetricQuery

Create an instance: `metricQuery := client.MetricQuery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
metricQuery, err := client.MetricQuery(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(metricQuery.(sdk.Entity).Data()) // the loaded entity's record
```


### MetronomeWebhook

Create an instance: `metronomeWebhook := client.MetronomeWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.MetronomeWebhook(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ModelSubscriptionAccount

Create an instance: `modelSubscriptionAccount := client.ModelSubscriptionAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `[]any` |  |
| `agents` | `[]any` |  |
| `can_disconnect` | `bool` |  |
| `connection_agent` | `any` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `provider` | `string` |  |
| `saved` | `bool` |  |
| `status` | `string` |  |
| `usable` | `bool` |  |

#### Example: List

```go
modelSubscriptionAccounts, err := client.ModelSubscriptionAccount(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range modelSubscriptionAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ModelSubscriptionAccount(nil).Create(map[string]any{
    "label": "example_label",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ModelSubscriptionAccountConnection

Create an instance: `modelSubscriptionAccountConnection := client.ModelSubscriptionAccountConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
modelSubscriptionAccountConnection, err := client.ModelSubscriptionAccountConnection(nil).Load(map[string]any{"id": "model_subscription_account_connection_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(modelSubscriptionAccountConnection.(sdk.Entity).Data()) // the loaded entity's record
```


### NetworkConnection

Create an instance: `networkConnection := client.NetworkConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

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

```go
result, err := client.NetworkConnection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### NetworkingSpace

Create an instance: `networkingSpace := client.NetworkingSpace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
networkingSpace, err := client.NetworkingSpace(nil).Load(map[string]any{"id": "networking_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(networkingSpace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.NetworkingSpace(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Node

Create an instance: `node := client.Node(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `any` |  |
| `account_id` | `any` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `any` |  |
| `installed_at_label` | `any` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `[]any` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `map[string]any` |  |
| `status` | `string` |  |
| `suspended_at` | `any` |  |
| `suspended_at_label` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
nodes, err := client.Node(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range nodes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### NodeCertificate

Create an instance: `nodeCertificate := client.NodeCertificate(nil)`


### NodeLease

Create an instance: `nodeLease := client.NodeLease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
nodeLease, err := client.NodeLease(nil).Load(map[string]any{"node_id": "node_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(nodeLease.(sdk.Entity).Data()) // the loaded entity's record
```


### NomadAllocation

Create an instance: `nomadAllocation := client.NomadAllocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `client_status` | `any` |  |
| `create_time` | `any` |  |
| `datacenter` | `any` |  |
| `desired_description` | `any` |  |
| `desired_status` | `any` |  |
| `fetched_at` | `string` |  |
| `id` | `string` |  |
| `job_id` | `any` |  |
| `modify_time` | `any` |  |
| `name` | `any` |  |
| `namespace` | `string` |  |
| `node_id` | `any` |  |
| `node_name` | `any` |  |
| `resources` | `map[string]any` |  |
| `task_group` | `any` |  |
| `task_states` | `[]any` |  |
| `verify_runner_images` | `[]any` | Public Verify image pins from tasks in this allocation's attached job group, not current app settings. |

#### Example: Load

```go
nomadAllocation, err := client.NomadAllocation(nil).Load(map[string]any{"id": "nomad_allocation_id", "app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(nomadAllocation.(sdk.Entity).Data()) // the loaded entity's record
```


### NomadLog

Create an instance: `nomadLog := client.NomadLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocation_id` | `string` |  |
| `environment` | `string` |  |
| `fetched_at` | `string` |  |
| `location` | `any` |  |
| `logs` | `string` |  |
| `namespace` | `string` |  |
| `offset` | `int` |  |
| `origin` | `string` |  |
| `service` | `string` |  |
| `task` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
nomadLog, err := client.NomadLog(nil).Load(map[string]any{"app_id": "app_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(nomadLog.(sdk.Entity).Data()) // the loaded entity's record
```


### Now

Create an instance: `now := client.Now(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `needs_attention` | `[]any` |  |
| `pagination` | `map[string]any` |  |
| `recently_landed` | `[]any` |  |
| `shipping_now` | `[]any` |  |
| `summary` | `map[string]any` |  |

#### Example: Load

```go
now, err := client.Now(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(now.(sdk.Entity).Data()) // the loaded entity's record
```


### ObservabilityClickhouseCluster

Create an instance: `observabilityClickhouseCluster := client.ObservabilityClickhouseCluster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
observabilityClickhouseCluster, err := client.ObservabilityClickhouseCluster(nil).Load(map[string]any{"id": "observability_clickhouse_cluster_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(observabilityClickhouseCluster.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ObservabilityClickhouseCluster(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ObservabilityQuickwitCluster

Create an instance: `observabilityQuickwitCluster := client.ObservabilityQuickwitCluster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
observabilityQuickwitCluster, err := client.ObservabilityQuickwitCluster(nil).Load(map[string]any{"id": "observability_quickwit_cluster_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(observabilityQuickwitCluster.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ObservabilityQuickwitCluster(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ObservabilitySpace

Create an instance: `observabilitySpace := client.ObservabilitySpace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
observabilitySpace, err := client.ObservabilitySpace(nil).Load(map[string]any{"id": "observability_space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(observabilitySpace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ObservabilitySpace(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Openapi

Create an instance: `openapi := client.Openapi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
openapi, err := client.Openapi(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(openapi.(sdk.Entity).Data()) // the loaded entity's record
```


### OrgInvitation

Create an instance: `orgInvitation := client.OrgInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `map[string]any` |  |
| `registration_options` | `any` |  |
| `requires_password_setup` | `bool` |  |
| `start_guided_setup` | `bool` |  |

#### Example: Load

```go
orgInvitation, err := client.OrgInvitation(nil).Load(map[string]any{"id": "org_invitation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(orgInvitation.(sdk.Entity).Data()) // the loaded entity's record
```


### Organization

Create an instance: `organization := client.Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `[]any` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `google_workspace_domain` | `any` | Owners can approve their verified Google Workspace domain, or send null to disable automatic joining. |
| `id` | `string` |  |
| `logo_url` | `any` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `any` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `[]any` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Load

```go
organization, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organization.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
organizations, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range organizations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Organization(nil).Create(map[string]any{
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationApp

Create an instance: `organizationApp := client.OrganizationApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationApp, err := client.OrganizationApp(nil).Load(map[string]any{"organization_id": "organization_id", "native_agent_id": "native_agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationApp.(sdk.Entity).Data()) // the loaded entity's record
```


### OrganizationControl

Create an instance: `organizationControl := client.OrganizationControl(nil)`


### OrganizationDevice

Create an instance: `organizationDevice := client.OrganizationDevice(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### OrganizationIdentityCertificate

Create an instance: `organizationIdentityCertificate := client.OrganizationIdentityCertificate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationIdentityCertificate, err := client.OrganizationIdentityCertificate(nil).Load(map[string]any{"id": "organization_identity_certificate_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationIdentityCertificate.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.OrganizationIdentityCertificate(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationInteraction

Create an instance: `organizationInteraction := client.OrganizationInteraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.OrganizationInteraction(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationInvitation

Create an instance: `organizationInvitation := client.OrganizationInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `id` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```go
result, err := client.OrganizationInvitation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationMessageFile

Create an instance: `organizationMessageFile := client.OrganizationMessageFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.OrganizationMessageFile(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationOidcTrust

Create an instance: `organizationOidcTrust := client.OrganizationOidcTrust(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationOidcTrust, err := client.OrganizationOidcTrust(nil).Load(map[string]any{"id": "organization_oidc_trust_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationOidcTrust.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.OrganizationOidcTrust(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationRunEvent

Create an instance: `organizationRunEvent := client.OrganizationRunEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.OrganizationRunEvent(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationRunOutcome

Create an instance: `organizationRunOutcome := client.OrganizationRunOutcome(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.OrganizationRunOutcome(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationRunUsage

Create an instance: `organizationRunUsage := client.OrganizationRunUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.OrganizationRunUsage(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationSandbox

Create an instance: `organizationSandbox := client.OrganizationSandbox(nil)`


### OrganizationSecret

Create an instance: `organizationSecret := client.OrganizationSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `created_by` | `any` |  |
| `current_version` | `any` |  |
| `description` | `any` |  |
| `env_key` | `string` |  |
| `expose_to_build` | `bool` |  |
| `expose_to_ci` | `bool` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `last_accessed_at` | `any` |  |
| `last_accessed_at_label` | `any` |  |
| `last_accessed_by` | `any` |  |
| `latest_version_number` | `any` |  |
| `name` | `string` |  |
| `organization_id` | `any` |  |
| `owner_service_account_id` | `any` |  |
| `rotation_policy` | `any` |  |
| `scope_kind` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: Load

```go
organizationSecret, err := client.OrganizationSecret(nil).Load(map[string]any{"id": "organization_secret_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationSecret.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
organizationSecrets, err := client.OrganizationSecret(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range organizationSecrets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.OrganizationSecret(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationServiceAccount

Create an instance: `organizationServiceAccount := client.OrganizationServiceAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationServiceAccount, err := client.OrganizationServiceAccount(nil).Load(map[string]any{"id": "organization_service_account_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationServiceAccount.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.OrganizationServiceAccount(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationSetting

Create an instance: `organizationSetting := client.OrganizationSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `concurrent_run_limit_override` | `any` |  |
| `customize_onboarding_packages` | `bool` |  |
| `daily_run_limit_override` | `any` |  |
| `deployment_usage_visibility` | `string` |  |
| `monthly_browser_minutes_limit_override` | `any` |  |
| `monthly_budget_dollars` | `any` |  |
| `name` | `string` |  |
| `onboarding_custom_pricing` | `bool` |  |
| `onboarding_package_keys` | `[]any` |  |


### OrganizationSite

Create an instance: `organizationSite := client.OrganizationSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationSite, err := client.OrganizationSite(nil).Load(map[string]any{"organization_id": "organization_id", "native_agent_id": "native_agent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationSite.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.OrganizationSite(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationSubscription

Create an instance: `organizationSubscription := client.OrganizationSubscription(nil)`


### OrganizationTool

Create an instance: `organizationTool := client.OrganizationTool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `map[string]any` |  |
| `native_agent_id` | `string` |  |
| `tool` | `string` |  |

#### Example: Create

```go
result, err := client.OrganizationTool(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "arguments": map[string]any{},
    "native_agent_id": "example_native_agent_id",
    "tool": "example_tool",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationWorkloadIdentity

Create an instance: `organizationWorkloadIdentity := client.OrganizationWorkloadIdentity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
organizationWorkloadIdentity, err := client.OrganizationWorkloadIdentity(nil).Load(map[string]any{"id": "organization_workload_identity_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationWorkloadIdentity.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.OrganizationWorkloadIdentity(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OtelIngest

Create an instance: `otelIngest := client.OtelIngest(nil)`


### Page

Create an instance: `page := client.Page(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `[]any` |  |
| `checkout_required` | `bool` |  |
| `cli_signed_in_at` | `any` | When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected. |
| `counts` | `map[string]any` |  |
| `demo_project` | `any` | The workspace's copy of the demo project, which setup offers as example data. |
| `environments` | `[]any` |  |
| `included_deep_scan` | `bool` | Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app. |
| `onboarding_discovery` | `any` |  |
| `organization` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `project` | `any` | The project the page is limited to, or null for the whole organization. |
| `pull_request_launch_options` | `[]any` |  |
| `pull_requests` | `[]any` |  |
| `repositories` | `[]any` |  |
| `runs` | `[]any` |  |
| `runs_pagination` | `map[string]any` |  |
| `suggested_app_url` | `any` | The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain. |
| `url_first_start` | `bool` | Whether setup opens on the URL-first screen, which saves the app and asks for test access next. |

#### Example: Load

```go
page, err := client.Page(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(page.(sdk.Entity).Data()) // the loaded entity's record
```


### PageAgent

Create an instance: `pageAgent := client.PageAgent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `[]any` |  |
| `can_edit_integration_connections` | `bool` |  |
| `creation_enabled` | `bool` |  |
| `inbox` | `any` |  |
| `integration_choices` | `[]any` |  |
| `integration_choices_truncated` | `bool` |  |
| `integration_selected` | `[]any` |  |
| `model_choices` | `[]any` |  |
| `new_configuration` | `any` |  |
| `organization_id` | `string` |  |
| `pagination` | `map[string]any` |  |
| `pinned_agent` | `any` |  |
| `platform_event_types` | `[]any` |  |
| `repository_choices` | `[]any` | Empty compatibility field. |
| `repository_choices_truncated` | `bool` |  |
| `runtime_versions` | `[]any` | Runtime choices authorized for this organization. |
| `selected_agent` | `any` |  |
| `selected_reference` | `any` |  |
| `viewer_id` | `string` |  |

#### Example: Load

```go
pageAgent, err := client.PageAgent(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pageAgent.(sdk.Entity).Data()) // the loaded entity's record
```


### PageArtefact

Create an instance: `pageArtefact := client.PageArtefact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artefact` | `any` |  |
| `automation` | `any` |  |
| `automation_invocation_id` | `any` |  |
| `byte_size` | `int` |  |
| `checksum_sha256` | `string` |  |
| `comment_threads` | `[]any` |  |
| `content_type` | `string` |  |
| `created_at` | `any` |  |
| `created_by_user_id` | `any` |  |
| `description` | `any` |  |
| `document_key` | `string` | Stable document identity shared by all revisions. |
| `draft` | `any` | The autosaved working copy of the newest Markdown version; null for older versions and other files. |
| `entrypoint` | `string` |  |
| `expires_at` | `any` |  |
| `filename` | `string` |  |
| `files` | `[]any` |  |
| `harness` | `any` |  |
| `harness_version` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `kinds` | `[]any` |  |
| `model` | `any` |  |
| `organization` | `map[string]any` |  |
| `organization_id` | `string` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `preview` | `map[string]any` |  |
| `published_at` | `any` |  |
| `published_at_label` | `any` |  |
| `publisher` | `any` |  |
| `repository` | `any` |  |
| `repository_id` | `any` |  |
| `selected_path` | `string` |  |
| `slug` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `title` | `string` |  |
| `vcs_agent_checkpoint_id` | `any` |  |
| `vcs_agent_session_id` | `any` |  |
| `version` | `int` |  |
| `versions` | `[]any` |  |
| `view_url` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```go
pageArtefact, err := client.PageArtefact(nil).Load(map[string]any{"id": "page_artefact_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pageArtefact.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
pageArtefacts, err := client.PageArtefact(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pageArtefacts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PageCiPipelineRun

Create an instance: `pageCiPipelineRun := client.PageCiPipelineRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `any` |  |
| `id` | `string` |  |
| `jobs` | `[]any` |  |

#### Example: Load

```go
pageCiPipelineRun, err := client.PageCiPipelineRun(nil).Load(map[string]any{"id": "page_ci_pipeline_run_id", "pipeline_id": "pipeline_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pageCiPipelineRun.(sdk.Entity).Data()) // the loaded entity's record
```


### PageProjectRun

Create an instance: `pageProjectRun := client.PageProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `[]any` |  |
| `fix_scenario_count` | `int` | How many scenarios the agent handoff covers, including those on other pages. |
| `fix_scenarios` | `[]any` | The fixable scenarios an agent handoff covers. |
| `fixable_count` | `int` |  |
| `id` | `string` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `preparation_reason` | `any` |  |
| `project` | `map[string]any` |  |
| `run` | `map[string]any` |  |
| `scenario_runs` | `[]any` |  |
| `selected_scenario_run` | `any` |  |
| `web_path` | `string` |  |

#### Example: Load

```go
pageProjectRun, err := client.PageProjectRun(nil).Load(map[string]any{"id": "page_project_run_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pageProjectRun.(sdk.Entity).Data()) // the loaded entity's record
```


### PageRepoVcCommit

Create an instance: `pageRepoVcCommit := client.PageRepoVcCommit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commit` | `any` |  |
| `diff_path` | `string` | Fingerprinted path serving this commit range's file diff. |
| `id` | `string` |  |

#### Example: Load

```go
pageRepoVcCommit, err := client.PageRepoVcCommit(nil).Load(map[string]any{"id": "page_repo_vc_commit_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pageRepoVcCommit.(sdk.Entity).Data()) // the loaded entity's record
```


### PagesBilling

Create an instance: `pagesBilling := client.PagesBilling(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addons` | `[]any` |  |
| `breakdown` | `any` | The 24-hour live series with its provenance; null only when the rollup fallback itself failed. |
| `budget` | `any` |  |
| `can_manage_contact` | `bool` |  |
| `can_manage_extra_spend` | `bool` |  |
| `can_manage_local_subscription` | `bool` |  |
| `can_manage_payment_method` | `bool` |  |
| `can_set_up_billing` | `bool` |  |
| `customer` | `any` |  |
| `deployment_usage_visible` | `bool` |  |
| `entitlements` | `map[string]any` |  |
| `extra_spend_enabled` | `bool` | Organization consent to paid overages across all metered usage. |
| `feature_enabled` | `bool` | Whether the `billing` feature is on for this organization. |
| `organization_id` | `string` |  |
| `package` | `any` |  |
| `prepaid` | `any` |  |
| `preview` | `any` | Metronome draft invoice and credits, or null. |
| `storage_usage` | `map[string]any` |  |
| `stripe` | `map[string]any` |  |
| `subscription` | `any` |  |
| `token_account` | `map[string]any` |  |

#### Example: Load

```go
pagesBilling, err := client.PagesBilling(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pagesBilling.(sdk.Entity).Data()) // the loaded entity's record
```


### PagesGithubOnboarding

Create an instance: `pagesGithubOnboarding := client.PagesGithubOnboarding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `onboarding` | `map[string]any` |  |
| `organization` | `map[string]any` |  |

#### Example: Load

```go
pagesGithubOnboarding, err := client.PagesGithubOnboarding(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pagesGithubOnboarding.(sdk.Entity).Data()) // the loaded entity's record
```


### PagesMember

Create an instance: `pagesMember := client.PagesMember(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepted_at` | `any` |  |
| `accepted_by_user` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `email` | `string` |  |
| `email_delivery_status` | `string` |  |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `id` | `string` |  |
| `invite_url` | `any` |  |
| `invited_by_user` | `any` |  |
| `organization` | `map[string]any` |  |
| `revoked_at` | `any` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
pagesMembers, err := client.PagesMember(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesMembers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PagesProjectCredential

Create an instance: `pagesProjectCredential := client.PagesProjectCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `any` |  |
| `composal_address` | `any` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `configured` | `bool` |  |
| `credential_keys` | `map[string]any` |  |
| `description` | `any` |  |
| `email_link_auth_origins` | `[]any` |  |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `any` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `any` |  |
| `login_method` | `string` |  |
| `login_url` | `string` |  |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `any` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: List

```go
pagesProjectCredentials, err := client.PagesProjectCredential(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesProjectCredentials.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PagesProjectPersona

Create an instance: `pagesProjectPersona := client.PagesProjectPersona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `string` |  |
| `active_run_count` | `int` |  |
| `archived_at` | `any` |  |
| `attention` | `[]any` | What needs an operator's eye, problems before notices |
| `capabilities` | `any` |  |
| `created_at` | `string` |  |
| `credential` | `any` |  |
| `credential_id` | `any` | The credential this persona signs in with. |
| `goals` | `any` |  |
| `health` | `map[string]any` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `scenario_count` | `int` |  |
| `updated_at` | `string` |  |

#### Example: List

```go
pagesProjectPersonas, err := client.PagesProjectPersona(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesProjectPersonas.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PagesProjectRun

Create an instance: `pagesProjectRun := client.PagesProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `any` |  |
| `browser_seconds` | `any` |  |
| `can_archive` | `bool` |  |
| `can_restore` | `bool` |  |
| `cleanup_state` | `string` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `duration_seconds` | `any` |  |
| `environment_name` | `any` |  |
| `finished_at` | `any` |  |
| `id` | `string` |  |
| `outcome` | `any` |  |
| `pull_request` | `any` |  |
| `pull_request_label` | `any` |  |
| `scenario_count` | `int` |  |
| `source_run` | `any` |  |
| `started_at` | `any` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `trigger_kind` | `string` |  |
| `triggered_by` | `any` |  |
| `web_path` | `string` |  |

#### Example: List

```go
pagesProjectRuns, err := client.PagesProjectRun(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesProjectRuns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PagesProjectScenario

Create an instance: `pagesProjectScenario := client.PagesProjectScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `any` |  |
| `id` | `string` |  |
| `kind` | `any` |  |
| `name` | `string` |  |

#### Example: List

```go
pagesProjectScenarios, err := client.PagesProjectScenario(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesProjectScenarios.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PagesRegistry

Create an instance: `pagesRegistry := client.PagesRegistry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_repository_count` | `int` |  |
| `error` | `any` |  |
| `pagination` | `map[string]any` |  |
| `repositories` | `[]any` |  |
| `repository_count` | `int` |  |

#### Example: Load

```go
pagesRegistry, err := client.PagesRegistry(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pagesRegistry.(sdk.Entity).Data()) // the loaded entity's record
```


### PagesSession

Create an instance: `pagesSession := client.PagesSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `any` |  |
| `cursor` | `string` |  |
| `ended_at` | `any` |  |
| `external_session_id` | `string` |  |
| `facets` | `map[string]any` |  |
| `from` | `string` |  |
| `github_access_warnings` | `[]any` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `any` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `any` |  |
| `limit` | `int` |  |
| `markers` | `[]any` |  |
| `max_bytes` | `int` |  |
| `mode` | `string` |  |
| `offset` | `int` |  |
| `pagination` | `map[string]any` |  |
| `query` | `string` |  |
| `repo` | `string` |  |
| `repository` | `any` |  |
| `search` | `any` |  |
| `search_enabled` | `bool` |  |
| `session` | `any` | Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder. |
| `sessions` | `[]any` |  |
| `started_at` | `any` |  |
| `stats` | `map[string]any` |  |
| `status` | `string` |  |
| `title` | `any` |  |
| `to` | `string` |  |
| `token_stats` | `any` |  |
| `transcript_index` | `any` |  |
| `transcript_stats` | `any` |  |
| `updated_at` | `any` |  |
| `user` | `any` |  |
| `user_id` | `string` |  |

#### Example: Load

```go
pagesSession, err := client.PagesSession(nil).Load(map[string]any{"id": "pages_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pagesSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
pagesSessions, err := client.PagesSession(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pagesSessions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.PagesSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Pairing

Create an instance: `pairing := client.Pairing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
pairing, err := client.Pairing(nil).Load(map[string]any{"id": "pairing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pairing.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Pairing(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PairingEvent

Create an instance: `pairingEvent := client.PairingEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
pairingEvent, err := client.PairingEvent(nil).Load(map[string]any{"pairing_id": "pairing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pairingEvent.(sdk.Entity).Data()) // the loaded entity's record
```


### ParallelV1

Create an instance: `parallelV1 := client.ParallelV1(nil)`


### PatchsetDiff

Create an instance: `patchsetDiff := client.PatchsetDiff(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `[]any` |  |
| `id` | `string` |  |
| `patchset` | `map[string]any` |  |

#### Example: Load

```go
patchsetDiff, err := client.PatchsetDiff(nil).Load(map[string]any{"id": "patchset_diff_id", "change_id": "change_id", "organization_id": "organization_id", "patchset_id": "patchset_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(patchsetDiff.(sdk.Entity).Data()) // the loaded entity's record
```


### PersonalAccessToken

Create an instance: `personalAccessToken := client.PersonalAccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
personalAccessToken, err := client.PersonalAccessToken(nil).Load(map[string]any{"id": "personal_access_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(personalAccessToken.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PersonalAccessToken(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PreviewOperation

Create an instance: `previewOperation := client.PreviewOperation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
previewOperation, err := client.PreviewOperation(nil).Load(map[string]any{"app_id": "app_id", "preview_id": "preview_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(previewOperation.(sdk.Entity).Data()) // the loaded entity's record
```


### PreviewProfileSecretBinding

Create an instance: `previewProfileSecretBinding := client.PreviewProfileSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `secret_id` | `string` |  |
| `secret_version_id` | `string` |  |

#### Example: Load

```go
previewProfileSecretBinding, err := client.PreviewProfileSecretBinding(nil).Load(map[string]any{"app_id": "app_id", "preview_profile_id": "preview_profile_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(previewProfileSecretBinding.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PreviewProfileSecretBinding(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_profile_id": "example_preview_profile_id",
    "env_key": "example_env_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PreviewSecret

Create an instance: `previewSecret := client.PreviewSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `env_key` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |
| `value` | `string` |  |

#### Example: Create

```go
result, err := client.PreviewSecret(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_id": "example_preview_id",
    "env_key": "example_env_key",
    "name": "example_name",
    "slug": "example_slug",
    "value": "example_value",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PreviewSharingApproval

Create an instance: `previewSharingApproval := client.PreviewSharingApproval(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_build_keys` | `[]any` |  |
| `approved_build_secrets` | `[]any` |  |
| `approved_default_configuration` | `[]any` |  |
| `approved_default_secrets` | `[]any` |  |
| `approved_source_keys` | `[]any` |  |
| `build_keys` | `[]any` |  |
| `build_secrets` | `[]any` |  |
| `default_configuration` | `[]any` |  |
| `default_secrets` | `[]any` |  |
| `services` | `[]any` |  |
| `snapshot_version` | `int` |  |
| `source_keys` | `[]any` |  |

#### Example: Load

```go
previewSharingApproval, err := client.PreviewSharingApproval(nil).Load(map[string]any{"app_id": "app_id", "preview_id": "preview_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(previewSharingApproval.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PreviewSharingApproval(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "preview_id": "example_preview_id",
    "snapshot_version": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProactiveAgentWaitlistEntry

Create an instance: `proactiveAgentWaitlistEntry := client.ProactiveAgentWaitlistEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_task` | `any` | The first job they would hand an agent. |
| `invite_code` | `any` | The referral code of the invite link they arrived through. |
| `places_per_referral` | `int` | Most places one referral moves the entry up; fewer when boosted entries are ahead. |
| `position` | `int` | 1-based place in the queue. |
| `position_after_next_referral` | `int` | The place one more referral would give this entry, as Rails would assign it. |
| `referral_code` | `string` | Shared in this entry's invite link. |
| `referral_count` | `int` | People who joined through this entry's link. |
| `total` | `int` | Display total including a random increment per signup; not the actual number of entries. |
| `website` | `any` | Honeypot. |

#### Example: Load

```go
proactiveAgentWaitlistEntry, err := client.ProactiveAgentWaitlistEntry(nil).Load(map[string]any{"id": "proactive_agent_waitlist_entry_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(proactiveAgentWaitlistEntry.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ProactiveAgentWaitlistEntry(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Product

Create an instance: `product := client.Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `[]any` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `logo_url` | `any` |  |
| `member_count` | `int` |  |
| `name` | `string` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `product` | `string` |  |
| `repository_count` | `int` |  |
| `role` | `any` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `[]any` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Create

```go
result, err := client.Product(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "product": "example_product",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProductMapIdentityDecision

Create an instance: `productMapIdentityDecision := client.ProductMapIdentityDecision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `observations` | `[]any` |  |
| `operation` | `string` |  |
| `reason` | `string` |  |
| `target` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.ProductMapIdentityDecision(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "observations": []any{},
    "operation": "example_operation",
    "reason": "example_reason",
    "target": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProductMapJourney

Create an instance: `productMapJourney := client.ProductMapJourney(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_variant_id` | `any` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `journey` | `map[string]any` |  |
| `next_cursor` | `any` |  |
| `preview` | `any` |  |
| `scope` | `map[string]any` |  |
| `title` | `string` |  |
| `tree` | `map[string]any` |  |
| `tree_loaded` | `bool` |  |
| `variant_count` | `int` |  |
| `variants` | `[]any` |  |

#### Example: Load

```go
productMapJourney, err := client.ProductMapJourney(nil).Load(map[string]any{"id": "product_map_journey_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(productMapJourney.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
productMapJourneys, err := client.ProductMapJourney(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range productMapJourneys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ProductMapJourneyReplay

Create an instance: `productMapJourneyReplay := client.ProductMapJourneyReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_id` | `any` |  |
| `can_request_qualification` | `bool` |  |
| `created_at` | `string` |  |
| `failure_code` | `any` |  |
| `failure_message` | `any` |  |
| `id` | `string` |  |
| `preparation_receipt` | `any` |  |
| `qualification` | `any` |  |
| `qualification_status` | `string` |  |
| `replay_required` | `bool` |  |
| `review_reason` | `string` |  |
| `run_id` | `any` |  |
| `scenario_run_id` | `any` |  |
| `source_digest` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `variant_id` | `string` |  |

#### Example: Load

```go
productMapJourneyReplay, err := client.ProductMapJourneyReplay(nil).Load(map[string]any{"id": "product_map_journey_replay_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(productMapJourneyReplay.(sdk.Entity).Data()) // the loaded entity's record
```


### ProductMapObservation

Create an instance: `productMapObservation := client.ProductMapObservation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capture` | `map[string]any` |  |
| `events` | `[]any` |  |
| `evidence_id` | `string` |  |
| `id` | `string` |  |
| `observation_id` | `string` |  |
| `scope` | `map[string]any` |  |
| `state` | `any` |  |
| `status` | `string` |  |

#### Example: Load

```go
productMapObservation, err := client.ProductMapObservation(nil).Load(map[string]any{"id": "product_map_observation_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(productMapObservation.(sdk.Entity).Data()) // the loaded entity's record
```


### ProductMapQuestion

Create an instance: `productMapQuestion := client.ProductMapQuestion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `area` | `string` |  |
| `before` | `string` |  |
| `claims` | `[]any` |  |
| `evidence_truncated` | `bool` |  |
| `model` | `string` |  |
| `persona_id` | `string` |  |
| `query` | `string` |  |
| `question` | `string` |  |
| `reasoning_effort` | `string` |  |
| `revision_id` | `string` |  |
| `scope` | `map[string]any` |  |
| `since` | `string` |  |
| `state_id` | `string` |  |
| `status` | `string` |  |
| `unknowns` | `[]any` |  |

#### Example: Create

```go
result, err := client.ProductMapQuestion(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "question": "example_question",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProductMapState

Create an instance: `productMapState := client.ProductMapState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `attempts` | `[]any` |  |
| `captured_at` | `string` |  |
| `id` | `string` |  |
| `incoming` | `[]any` |  |
| `labels` | `map[string]any` |  |
| `layout` | `map[string]any` |  |
| `observation_id` | `string` |  |
| `omitted_controls` | `int` |  |
| `outgoing` | `[]any` |  |
| `revision_id` | `string` |  |
| `scope` | `map[string]any` |  |
| `screenshot_url` | `any` |  |
| `state` | `map[string]any` |  |
| `truncated` | `bool` |  |
| `url` | `string` |  |

#### Example: Load

```go
productMapState, err := client.ProductMapState(nil).Load(map[string]any{"id": "product_map_state_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(productMapState.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
productMapStates, err := client.ProductMapState(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range productMapStates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Project

Create an instance: `project := client.Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `any` |  |
| `context` | `any` |  |
| `created_at` | `string` |  |
| `credentials` | `[]any` |  |
| `demo` | `bool` | Whether this is a signup demo project copied from the shared template. |
| `documentation_urls` | `[]any` |  |
| `environments` | `[]any` |  |
| `execution_mode` | `string` |  |
| `icon_url` | `any` |  |
| `id` | `string` |  |
| `identity_provider` | `map[string]any` | Where the organization's apps trust Composal sign-in, for new personas |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `network_connections` | `[]any` |  |
| `organization_id` | `string` |  |
| `overview` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `personas` | `[]any` |  |
| `project` | `map[string]any` |  |
| `pull_request_options` | `map[string]any` |  |
| `pull_requests` | `[]any` |  |
| `purpose` | `any` |  |
| `runs` | `[]any` |  |
| `scenario_history` | `map[string]any` |  |
| `scenario_states` | `map[string]any` | Scenarios by the state of their latest execution. |
| `scenarios` | `[]any` |  |
| `setup_required` | `bool` |  |
| `slug` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences` | `map[string]any` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `version` | `int` |  |
| `website_url` | `any` |  |

#### Example: Load

```go
project, err := client.Project(nil).Load(map[string]any{"id": "project_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(project.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projects, err := client.Project(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projects.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Project(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectAndroidApk

Create an instance: `projectAndroidApk := client.ProjectAndroidApk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `map[string]any` |  |
| `artifact_paths` | `[]any` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `map[string]any` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `map[string]any` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```go
result, err := client.ProjectAndroidApk(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectCodeMap

Create an instance: `projectCodeMap := client.ProjectCodeMap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_scan` | `bool` |  |
| `commit_sha` | `string` |  |
| `configured` | `bool` |  |
| `error_code` | `any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `ref` | `string` |  |
| `repository_id` | `string` |  |
| `revision` | `map[string]any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |

#### Example: List

```go
projectCodeMaps, err := client.ProjectCodeMap(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectCodeMaps.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ProjectCodeMap(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "repository_id": "example_repository_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectEnvironment

Create an instance: `projectEnvironment := client.ProjectEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowed_actions` | `string` |  |
| `allowed_origins` | `[]any` |  |
| `archived_at` | `any` |  |
| `base_url` | `any` |  |
| `base_url_changeable` | `bool` | Whether an update may send a new base_url. |
| `binary` | `string` |  |
| `conversation_only_messaging` | `bool` |  |
| `created_at` | `string` |  |
| `desktop` | `any` |  |
| `execution_mode` | `string` |  |
| `id` | `string` |  |
| `imessage_number` | `any` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `lock_version` | `int` |  |
| `messaging_conversation` | `any` |  |
| `messaging_problem` | `any` |  |
| `messaging_source` | `any` |  |
| `messaging_tester_number` | `any` | One configured tester number. |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `pull_request` | `any` |  |
| `source_branch` | `any` |  |
| `updated_at` | `string` |  |
| `verify_network_connection_id` | `any` |  |
| `version` | `int` |  |

#### Example: Load

```go
projectEnvironment, err := client.ProjectEnvironment(nil).Load(map[string]any{"id": "project_environment_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectEnvironment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projectEnvironments, err := client.ProjectEnvironment(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectEnvironments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ProjectEnvironment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectFinding

Create an instance: `projectFinding := client.ProjectFinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deferred_until` | `any` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `last_seen_at` | `string` |  |
| `locked` | `bool` | True for a locked finding of the workspace's included scan before it pays. |
| `severity` | `string` |  |
| `source` | `string` | The workflow that produced the finding |
| `source_title` | `string` | The scenario, Discovery or Deep Scan that produced the finding |
| `status` | `string` |  |
| `title` | `string` |  |
| `verification` | `any` | Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it. |
| `web_path` | `string` | Where the finding is reviewed within its source |

#### Example: List

```go
projectFindings, err := client.ProjectFinding(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectFindings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ProjectFixture

Create an instance: `projectFixture := client.ProjectFixture(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignments` | `[]any` | Every assignment with its target's name, including targets archived or disabled since. |
| `byte_size` | `int` |  |
| `content_type` | `string` |  |
| `credential_ids` | `[]any` |  |
| `environment_ids` | `[]any` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `persona_ids` | `[]any` |  |
| `sha256` | `string` |  |
| `url` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
projectFixture, err := client.ProjectFixture(nil).Load(map[string]any{"id": "project_fixture_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectFixture.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projectFixtures, err := client.ProjectFixture(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectFixtures.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ProjectFixture(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectIosApp

Create an instance: `projectIosApp := client.ProjectIosApp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `android` | `map[string]any` |  |
| `artifact_paths` | `[]any` |  |
| `description` | `string` |  |
| `image` | `string` |  |
| `ios` | `map[string]any` |  |
| `launch_command` | `string` |  |
| `managed_binary` | `map[string]any` |  |
| `platform` | `string` |  |
| `provider` | `string` |  |
| `setup_command` | `string` |  |

#### Example: Create

```go
result, err := client.ProjectIosApp(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectMessagingConversation

Create an instance: `projectMessagingConversation := client.ProjectMessagingConversation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assistant_number` | `string` |  |
| `attachment_limit` | `int` |  |
| `attachment_max_bytes` | `int` |  |
| `environment_name` | `string` |  |
| `id` | `string` |  |
| `leased` | `bool` |  |
| `messages` | `[]any` |  |
| `reconciled_at` | `any` |  |
| `retirable` | `bool` |  |
| `seeded` | `bool` |  |
| `send_blocked_reason` | `any` |  |
| `send_disposition` | `string` |  |
| `send_error` | `any` |  |
| `tester_number` | `string` |  |
| `unknown_send` | `bool` |  |
| `verify_environment_id` | `string` |  |

#### Example: Load

```go
projectMessagingConversation, err := client.ProjectMessagingConversation(nil).Load(map[string]any{"id": "project_messaging_conversation_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectMessagingConversation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ProjectMessagingConversation(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "assistant_number": "example_assistant_number",
    "tester_number": "example_tester_number",
    "verify_environment_id": "example_verify_environment_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectOverviewMetric

Create an instance: `projectOverviewMetric := client.ProjectOverviewMetric(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_runs` | `int` |  |
| `open_findings` | `int` |  |
| `ready_environments` | `int` |  |
| `scenarios` | `map[string]any` | Scenarios by the state of their latest execution. |

#### Example: Load

```go
projectOverviewMetric, err := client.ProjectOverviewMetric(nil).Load(map[string]any{"organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectOverviewMetric.(sdk.Entity).Data()) // the loaded entity's record
```


### ProjectOverviewPullRequest

Create an instance: `projectOverviewPullRequest := client.ProjectOverviewPullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `any` |  |
| `draft` | `bool` |  |
| `github_repository` | `any` | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `any` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `any` |  |
| `latest_reason` | `any` |  |
| `latest_run_id` | `any` |  |
| `latest_state` | `any` |  |
| `number` | `int` |  |
| `project_id` | `any` |  |
| `project_slug` | `any` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `any` |  |
| `source_repository` | `any` |  |
| `source_url` | `any` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```go
projectOverviewPullRequests, err := client.ProjectOverviewPullRequest(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectOverviewPullRequests.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ProjectProductMap

Create an instance: `projectProductMap := client.ProjectProductMap(nil)`


### ProjectRecording

Create an instance: `projectRecording := client.ProjectRecording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser` | `map[string]any` |  |
| `created_at` | `string` |  |
| `draft` | `any` | Present once drafted. |
| `environment_id` | `string` | The project environment the browser opens. |
| `error` | `any` |  |
| `event_count` | `int` |  |
| `id` | `string` |  |
| `persona_id` | `string` | The project persona the journey acts as. |
| `phase` | `string` | What the owner can do now. |
| `signed_in_during_recording` | `bool` |  |
| `start_path` | `string` | A path on the environment to start at, such as /settings. |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
projectRecording, err := client.ProjectRecording(nil).Load(map[string]any{"id": "project_recording_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectRecording.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ProjectRecording(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "environment_id": "example_environment_id",
    "persona_id": "example_persona_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectRunPlan

Create an instance: `projectRunPlan := client.ProjectRunPlan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `any` |  |
| `base_url` | `any` |  |
| `created_at` | `string` |  |
| `dependencies` | `[]any` |  |
| `id` | `string` |  |
| `identity_probe` | `any` |  |
| `kind` | `any` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `nodes` | `[]any` |  |
| `preview` | `any` |  |
| `project_id` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
projectRunPlan, err := client.ProjectRunPlan(nil).Load(map[string]any{"id": "project_run_plan_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectRunPlan.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projectRunPlans, err := client.ProjectRunPlan(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectRunPlans.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ProjectRunPlan(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "dependencies": []any{},
    "identity_probe": map[string]any{},
    "name": "example_name",
    "nodes": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectRunSchedule

Create an instance: `projectRunSchedule := client.ProjectRunSchedule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credential_ids` | `map[string]any` |  |
| `cron_expression` | `any` |  |
| `environment_id` | `string` | Project environment slug or public ID. |
| `environment_name` | `string` |  |
| `history` | `[]any` |  |
| `id` | `string` |  |
| `labels` | `[]any` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `next_run_at` | `string` |  |
| `notification_channel` | `string` | Email the schedule owner by default; legacy requests with a Slack subscription keep Slack. |
| `scenario_count` | `int` |  |
| `selection_mode` | `string` |  |
| `slack_subscription_id` | `any` |  |
| `source_scenario_id` | `any` |  |
| `state` | `string` |  |
| `time_of_day` | `string` |  |
| `time_zone` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
projectRunSchedule, err := client.ProjectRunSchedule(nil).Load(map[string]any{"id": "project_run_schedule_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectRunSchedule.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
projectRunSchedules, err := client.ProjectRunSchedule(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectRunSchedules.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.ProjectRunSchedule(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "credential_ids": map[string]any{},
    "environment_id": "example_environment_id",
    "labels": []any{},
    "name": "example_name",
    "selection_mode": "example_selection_mode",
    "state": "example_state",
    "time_of_day": "example_time_of_day",
    "time_zone": "example_time_zone",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ProjectScenarioOption

Create an instance: `projectScenarioOption := client.ProjectScenarioOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environments` | `[]any` |  |
| `permissions` | `map[string]any` |  |
| `personas` | `[]any` |  |
| `project` | `map[string]any` |  |
| `scenario_states` | `map[string]any` | Scenarios by the state of their latest execution. |
| `scenarios` | `[]any` |  |
| `schedule_options` | `any` |  |
| `schedules` | `[]any` |  |

#### Example: Load

```go
projectScenarioOption, err := client.ProjectScenarioOption(nil).Load(map[string]any{"organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectScenarioOption.(sdk.Entity).Data()) // the loaded entity's record
```


### ProjectScenarioRow

Create an instance: `projectScenarioRow := client.ProjectScenarioRow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_count` | `int` |  |
| `dependency_count` | `int` |  |
| `health` | `map[string]any` |  |
| `id` | `string` |  |
| `labels` | `[]any` |  |
| `name` | `string` |  |
| `persona_id` | `string` |  |
| `selectable_for_run` | `bool` |  |
| `step_count` | `int` |  |

#### Example: List

```go
projectScenarioRows, err := client.ProjectScenarioRow(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectScenarioRows.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ProjectSetting

Create an instance: `projectSetting := client.ProjectSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `[]any` |  |
| `messaging_conversations` | `[]any` |  |
| `messaging_enabled` | `bool` |  |
| `permissions` | `map[string]any` |  |
| `project` | `map[string]any` |  |
| `tester_numbers` | `[]any` |  |

#### Example: Load

```go
projectSetting, err := client.ProjectSetting(nil).Load(map[string]any{"organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(projectSetting.(sdk.Entity).Data()) // the loaded entity's record
```


### PullRequest

Create an instance: `pullRequest := client.PullRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_tests` | `[]any` | All active saved scenarios in the configured project, including scenarios outside the automatic selection. |
| `branch` | `string` | Exact deployed source branch; refused if it differs from the canonical request branch. |
| `cleanup_only` | `bool` | Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing. |
| `current_run` | `any` | Latest verification request if it matches the current head and base, independent of history pagination. |
| `findings` | `[]any` |  |
| `head_sha` | `string` | If supplied, refuse to create a run unless this is the current PR head. |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `imessage_number` | `string` | International destination of this exact deployed commit. |
| `number` | `int` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `preview_cleanup_ready` | `bool` | The source is closed or merged and unfinished Scenario execution and Discovery have stopped. |
| `preview_url` | `any` | Most recently supplied preview URL for the current head commit, retained across verification attempts. |
| `project` | `any` |  |
| `project_id` | `string` | Composal project slug or public ID for PR preview environments. |
| `pull_request` | `map[string]any` |  |
| `repository_id` | `string` |  |
| `runs` | `[]any` |  |

#### Example: Load

```go
pullRequest, err := client.PullRequest(nil).Load(map[string]any{"id": "pull_request_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pullRequest.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PullRequest(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "idempotency_key": "example_idempotency_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PullRequestAction

Create an instance: `pullRequestAction := client.PullRequestAction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_name` | `string` |  |
| `body` | `string` |  |
| `comment_id` | `string` |  |
| `comments` | `[]any` |  |
| `event` | `string` |  |
| `expected_head_sha` | `string` |  |
| `id` | `any` |  |
| `label` | `string` |  |
| `line` | `int` |  |
| `node_id` | `any` |  |
| `operation_key` | `string` |  |
| `path` | `string` |  |
| `run_id` | `string` |  |
| `side` | `string` |  |
| `start_line` | `int` |  |
| `start_side` | `string` |  |
| `thread_id` | `string` |  |

#### Example: Create

```go
result, err := client.PullRequestAction(nil).Create(map[string]any{
    "number": "example_number",
    "organization_id": "example_organization_id",
    "pull_request_id": "example_pull_request_id",
    "action_name": "example_action_name",
    "operation_key": "example_operation_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PullRequestMagicMerge

Create an instance: `pullRequestMagicMerge := client.PullRequestMagicMerge(nil)`


### PullRequestSetting

Create an instance: `pullRequestSetting := client.PullRequestSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_preview_profile_id` | `any` |  |
| `app_service_id` | `any` |  |
| `bots` | `[]any` | hosting: bot accounts that comment the preview link, such as netlify[bot]. |
| `browser_options_available` | `bool` | Whether browser demo and scenario-writing options apply to this saved repository setup. |
| `ci_preview` | `any` | The latest preview the project's CI handed over, while the saved setting uses CI |
| `concurrency` | `int` | Up to 50 parallel browsers per run, lowered only by an explicit administrator override. |
| `configured_repository` | `any` |  |
| `demo_videos` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `demo_videos_enabled` | `bool` | Record a short walkthrough of the change and add it to the PR comment. |
| `deployment` | `any` | hosting: the deployment environment name the host reports on each PR, such as Preview. |
| `deployment_environment` | `string` |  |
| `enabled` | `bool` | Test PRs automatically. |
| `environment` | `string` | The environment whose test accounts sign in to the previews. |
| `environments` | `[]any` |  |
| `github_check_enabled` | `bool` | Report the Composal Verify check on GitHub pull requests. |
| `hosting_presets` | `[]any` | Hosting services that build PR previews and the setup answers each needs |
| `id` | `string` |  |
| `imessage_comment_prefix` | `any` |  |
| `imessage_number` | `any` | International destination number; blank or null clears it on an added environment. |
| `imessage_number_source` | `string` |  |
| `limits` | `map[string]any` |  |
| `link_pattern` | `any` | hosting: a regular expression for the preview link, as preview detection returns it. |
| `links` | `any` | hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app. |
| `max_seconds` | `int` |  |
| `messaging_enabled` | `bool` |  |
| `messaging_tester_number` | `any` | One configured tester number. |
| `non_product_paths` | `[]any` |  |
| `permissions` | `map[string]any` |  |
| `pr_check` | `bool` | Report a Composal Verify check on GitHub PRs. |
| `preview_access` | `string` |  |
| `preview_comment_authors` | `[]any` |  |
| `preview_comment_pattern` | `string` |  |
| `preview_comment_wildcard` | `any` | A preview address with * for the part that changes, such as https://*.vercel.app. |
| `preview_profile` | `any` | composal: the preview profile that builds each PR. |
| `preview_profiles` | `[]any` |  |
| `previews` | `string` | Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting. |
| `project_id` | `string` | Composal project owning this PR Testing configuration. |
| `project_repositories` | `[]any` |  |
| `provider` | `string` |  |
| `repositories` | `[]any` |  |
| `repository` | `string` | Repository ID; see repositories for its name. |
| `repository_id` | `string` |  |
| `repository_kind` | `string` | Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment. |
| `selected_repository` | `any` |  |
| `service` | `any` | composal: the public service the browsers open. |
| `settings` | `[]any` |  |
| `setup` | `any` | The project's saved setup as answers, when it has one. |
| `setup_defaults` | `map[string]any` | The answers a new setup starts from |
| `source_repository` | `string` |  |
| `target_mode` | `string` |  |
| `tester_numbers` | `[]any` |  |
| `trigger_label` | `string` | Label whose addition triggers verification when trigger_on_label is enabled. |
| `trigger_on_comment` | `bool` |  |
| `trigger_on_label` | `bool` |  |
| `trigger_on_push` | `bool` |  |
| `trigger_on_ready` | `bool` |  |
| `triggers` | `map[string]any` | When runs start. |
| `verify_environment_id` | `string` |  |
| `write_scenarios` | `bool` | Draft and validate focused scenarios for each change on its preview. |

#### Example: Load

```go
pullRequestSetting, err := client.PullRequestSetting(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pullRequestSetting.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PullRequestSetting(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "bots": []any{},
    "demo_videos": true,
    "deployment": "example_deployment",
    "enabled": true,
    "environment": "example_environment",
    "imessage_comment_prefix": "example_imessage_comment_prefix",
    "imessage_number": "example_imessage_number",
    "imessage_number_source": "example_imessage_number_source",
    "limits": map[string]any{},
    "link_pattern": "example_link_pattern",
    "links": "example_links",
    "messaging_tester_number": "example_messaging_tester_number",
    "pr_check": true,
    "preview_comment_wildcard": "example_preview_comment_wildcard",
    "preview_profile": "example_preview_profile",
    "previews": "example_previews",
    "project_id": "example_project_id",
    "provider": "example_provider",
    "repository": "example_repository",
    "repository_id": "example_repository_id",
    "repository_kind": "example_repository_kind",
    "service": "example_service",
    "target_mode": "example_target_mode",
    "trigger_label": "example_trigger_label",
    "triggers": map[string]any{},
    "verify_environment_id": "example_verify_environment_id",
    "write_scenarios": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PullRequestSettingAddRepository

Create an instance: `pullRequestSettingAddRepository := client.PullRequestSettingAddRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `project_id` | `string` |  |
| `replace` | `bool` | Make these the project's only repositories. |
| `repositories` | `[]any` |  |

#### Example: Create

```go
result, err := client.PullRequestSettingAddRepository(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "repositories": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PullRequestSettingDetectComment

Create an instance: `pullRequestSettingDetectComment := client.PullRequestSettingDetectComment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bots` | `[]any` | The bots answer |
| `deployment` | `string` | The deployment answer |
| `example_url` | `string` |  |
| `imessage_comment_prefix` | `string` |  |
| `imessage_number` | `any` | International destination number; blank or null clears it on an added environment. |
| `kind` | `string` |  |
| `link_pattern` | `string` | The link_pattern answer |
| `project_id` | `string` | Project slug or ID. |
| `provider` | `string` | Who builds the previews, such as Vercel or GitLab |
| `repository_id` | `string` | Repository slug, ID or owner/name. |
| `request_number` | `int` |  |

#### Example: Create

```go
result, err := client.PullRequestSettingDetectComment(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PullRequestTranscript

Create an instance: `pullRequestTranscript := client.PullRequestTranscript(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `created_at` | `any` |  |
| `ended_at` | `any` |  |
| `external_session_id` | `string` |  |
| `harness` | `string` | Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness. |
| `id` | `string` |  |
| `last_activity_at` | `any` | When the session last did anything: the newest checkpoint capture, else the session end, else its start. |
| `last_checkpoint_at` | `any` |  |
| `repository` | `any` |  |
| `started_at` | `any` |  |
| `stats` | `map[string]any` |  |
| `status` | `string` |  |
| `title` | `any` |  |
| `updated_at` | `any` |  |
| `user` | `any` |  |

#### Example: List

```go
pullRequestTranscripts, err := client.PullRequestTranscript(nil).List(map[string]any{"organization_id": "example", "pull_request_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pullRequestTranscripts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PullZone

Create an instance: `pullZone := client.PullZone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |

#### Example: List

```go
pullZones, err := client.PullZone(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pullZones.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Recorder

Create an instance: `recorder := client.Recorder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `slug` | `string` |  |

#### Example: Load

```go
recorder, err := client.Recorder(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recorder.(sdk.Entity).Data()) // the loaded entity's record
```


### Registry

Create an instance: `registry := client.Registry(nil)`


### RegistryV2

Create an instance: `registryV2 := client.RegistryV2(nil)`


### RelayAgentConnection

Create an instance: `relayAgentConnection := client.RelayAgentConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_card_url` | `string` |  |
| `auth_scheme` | `string` |  |
| `can_configure` | `bool` |  |
| `can_disconnect` | `bool` |  |
| `can_setup` | `bool` |  |
| `connection` | `map[string]any` |  |
| `credential` | `any` | Write-only outbound key. |
| `error_code` | `any` |  |
| `expected_generation` | `int` |  |
| `generation` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `remote_agent` | `any` |  |
| `requester_id` | `string` |  |
| `retired_at` | `any` |  |
| `revoked_at` | `any` |  |
| `scope_key` | `string` |  |
| `source_operation_id` | `any` |  |
| `state` | `string` |  |

#### Example: Load

```go
relayAgentConnection, err := client.RelayAgentConnection(nil).Load(map[string]any{"id": "relay_agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(relayAgentConnection.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
relayAgentConnections, err := client.RelayAgentConnection(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range relayAgentConnections.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.RelayAgentConnection(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "agent_card_url": "example_agent_card_url",
    "auth_scheme": "example_auth_scheme",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RelayAgentLocalThread

Create an instance: `relayAgentLocalThread := client.RelayAgentLocalThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RelaySignal

Create an instance: `relaySignal := client.RelaySignal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.RelaySignal(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ReleaseRollout

Create an instance: `releaseRollout := client.ReleaseRollout(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
releaseRollout, err := client.ReleaseRollout(nil).Load(map[string]any{"id": "release_rollout_id", "release_id": "release_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(releaseRollout.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ReleaseRollout(nil).Create(map[string]any{
    "release_id": "example_release_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Repo

Create an instance: `repo := client.Repo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_retry_import` | `bool` | True when a failed client import can be requeued for CLI resume. |
| `can_retry_sync` | `bool` | True when the latest sync run failed and can be retried. |
| `disclaimer` | `any` |  |
| `federated_in_home` | `bool` | True when this Space is a folder virtual repository inside the organization Home monorepo. |
| `github_repository` | `any` |  |
| `icon_name` | `string` |  |
| `id` | `string` | Virtual repository public ID for non-Home rows; Home uses the physical repository public ID. |
| `import_item_id` | `any` |  |
| `is_home` | `bool` |  |
| `name` | `string` |  |
| `remote_repository` | `any` |  |
| `root_path` | `any` | Home-relative folder path when federated_in_home is true; null otherwise. |
| `slug` | `string` |  |
| `sync_error_message` | `any` |  |
| `sync_provider` | `string` |  |
| `sync_status` | `string` |  |

#### Example: List

```go
repos, err := client.Repo(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repos.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RepoAccessToken

Create an instance: `repoAccessToken := client.RepoAccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `map[string]any` |  |
| `active` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `credential_purpose` | `string` | Issues a revocable read-write system credential valid for one hour. |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `expires_in_days` | `any` |  |
| `id` | `string` |  |
| `last_used_at` | `any` |  |
| `last_used_at_label` | `any` |  |
| `name` | `string` |  |
| `permission_level` | `string` |  |
| `plain_text_token` | `string` |  |
| `revoked_at` | `any` |  |
| `revoked_at_label` | `any` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
repoAccessTokens, err := client.RepoAccessToken(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoAccessTokens.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.RepoAccessToken(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepoAction

Create an instance: `repoAction := client.RepoAction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pipeline` | `map[string]any` |  |
| `run` | `map[string]any` |  |

#### Example: List

```go
repoActions, err := client.RepoAction(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoActions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RepoAgentCheckpoint

Create an instance: `repoAgentCheckpoint := client.RepoAgentCheckpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
repoAgentCheckpoint, err := client.RepoAgentCheckpoint(nil).Load(map[string]any{"id": "repo_agent_checkpoint_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoAgentCheckpoint.(sdk.Entity).Data()) // the loaded entity's record
```


### RepoAgentSession

Create an instance: `repoAgentSession := client.RepoAgentSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adapter` | `string` |  |
| `agent_session` | `map[string]any` |  |
| `external_session_id` | `string` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `title` | `any` |  |

#### Example: Load

```go
repoAgentSession, err := client.RepoAgentSession(nil).Load(map[string]any{"id": "repo_agent_session_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoAgentSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RepoAgentSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepoBookmarkProtection

Create an instance: `repoBookmarkProtection := client.RepoBookmarkProtection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actor_policy` | `map[string]any` |  |
| `bypass_mode` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_id` | `any` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `priority` | `int` |  |
| `repository_id` | `string` |  |
| `requirements` | `map[string]any` |  |
| `target_kind` | `string` |  |
| `target_pattern` | `any` |  |
| `updated_at` | `string` |  |
| `updated_by_user_id` | `any` |  |

#### Example: Load

```go
repoBookmarkProtection, err := client.RepoBookmarkProtection(nil).Load(map[string]any{"id": "repo_bookmark_protection_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoBookmarkProtection.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
repoBookmarkProtections, err := client.RepoBookmarkProtection(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoBookmarkProtections.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.RepoBookmarkProtection(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepoBookmarkProtectionEvent

Create an instance: `repoBookmarkProtectionEvent := client.RepoBookmarkProtectionEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `actor_kind` | `string` |  |
| `actor_label` | `any` |  |
| `actor_user_id` | `any` |  |
| `bookmark_name` | `string` |  |
| `bookmark_protection_rule_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `decision` | `string` |  |
| `id` | `string` |  |
| `intent` | `any` |  |
| `metadata` | `map[string]any` |  |
| `new_target` | `any` |  |
| `old_target` | `any` |  |
| `organization_id` | `string` |  |
| `reason_codes` | `[]any` |  |
| `repository_id` | `string` |  |
| `source_request_id` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
repoBookmarkProtectionEvents, err := client.RepoBookmarkProtectionEvent(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoBookmarkProtectionEvents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RepoCloudWorkspaceBackup

Create an instance: `repoCloudWorkspaceBackup := client.RepoCloudWorkspaceBackup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
repoCloudWorkspaceBackup, err := client.RepoCloudWorkspaceBackup(nil).Load(map[string]any{"id": "repo_cloud_workspace_backup_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoCloudWorkspaceBackup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RepoCloudWorkspaceBackup(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepoCodeRule

Create an instance: `repoCodeRule := client.RepoCodeRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_revision_number` | `any` |  |
| `capabilities` | `map[string]any` |  |
| `code_rule` | `any` |  |
| `created_at` | `string` |  |
| `definition` | `map[string]any` |  |
| `draft_pending` | `bool` | The latest revision is not the active one |
| `enabled` | `bool` |  |
| `expected_version` | `int` |  |
| `id` | `string` |  |
| `latest_revision_number` | `int` |  |
| `name` | `string` | Name of the latest revision |
| `repository` | `map[string]any` |  |
| `scope` | `[]any` |  |
| `slug` | `string` |  |
| `state_version` | `int` | Send back as expected_version on every mutation |
| `updated_at` | `string` |  |
| `web_url` | `string` |  |

#### Example: Load

```go
repoCodeRule, err := client.RepoCodeRule(nil).Load(map[string]any{"id": "repo_code_rule_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoCodeRule.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
repoCodeRules, err := client.RepoCodeRule(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoCodeRules.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.RepoCodeRule(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "definition": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepoSetting

Create an instance: `repoSetting := client.RepoSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `description` | `any` |  |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `last_used_at` | `any` |  |
| `last_used_at_label` | `any` |  |
| `merge_authority` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `permission_level` | `string` |  |
| `revoked_at` | `any` |  |
| `revoked_at_label` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `token_preview` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
repoSettings, err := client.RepoSetting(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoSettings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RepoStat

Create an instance: `repoStat := client.RepoStat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backend` | `string` |  |
| `can_refresh` | `bool` |  |
| `freshness` | `map[string]any` |  |
| `note` | `string` |  |
| `physical` | `map[string]any` |  |
| `series` | `[]any` |  |

#### Example: Load

```go
repoStat, err := client.RepoStat(nil).Load(map[string]any{"organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repoStat.(sdk.Entity).Data()) // the loaded entity's record
```


### RepoVc

Create an instance: `repoVc := client.RepoVc(nil)`


### RepoVcCommit

Create an instance: `repoVcCommit := client.RepoVcCommit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `target_commit_id` | `string` |  |

#### Example: List

```go
repoVcCommits, err := client.RepoVcCommit(nil).List(map[string]any{"organization_id": "example", "repo_id": "example", "ref": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repoVcCommits.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ReportReplay

Create an instance: `reportReplay := client.ReportReplay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` |  |
| `generated_at` | `string` |  |
| `id` | `string` |  |
| `recording` | `map[string]any` |  |
| `replay_steps` | `[]any` |  |

#### Example: Load

```go
reportReplay, err := client.ReportReplay(nil).Load(map[string]any{"id": "report_replay_id", "exploration_id": "exploration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(reportReplay.(sdk.Entity).Data()) // the loaded entity's record
```


### ReportScenario

Create an instance: `reportScenario := client.ReportScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `environment_name` | `string` |  |
| `goal` | `string` |  |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `map[string]any` |  |
| `project_id` | `any` |  |
| `related_explorations` | `[]any` |  |
| `report` | `map[string]any` |  |
| `saves_scenarios` | `bool` |  |
| `scenario_generation` | `map[string]any` |  |
| `status` | `string` |  |

#### Example: Create

```go
result, err := client.ReportScenario(nil).Create(map[string]any{
    "exploration_id": "example_exploration_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepositoryAccess

Create an instance: `repositoryAccess := client.RepositoryAccess(nil)`


### RepositoryAccessResolve

Create an instance: `repositoryAccessResolve := client.RepositoryAccessResolve(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `string` |  |
| `git_auth_username` | `string` |  |
| `git_https_clone_url` | `any` |  |
| `git_https_supported` | `bool` |  |
| `github_access_warnings` | `[]any` |  |
| `id` | `string` |  |
| `membership_role` | `string` |  |
| `organization_id` | `string` |  |
| `organization_name` | `string` |  |
| `organization_slug` | `string` |  |
| `repository_id` | `string` |  |
| `repository_name` | `string` |  |
| `repository_slug` | `string` |  |

#### Example: Load

```go
repositoryAccessResolve, err := client.RepositoryAccessResolve(nil).Load(map[string]any{"id": "repository_access_resolve_id", "resolve_id": "resolve_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repositoryAccessResolve.(sdk.Entity).Data()) // the loaded entity's record
```


### RepositoryEvent

Create an instance: `repositoryEvent := client.RepositoryEvent(nil)`


### RepositoryImport

Create an instance: `repositoryImport := client.RepositoryImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_connections` | `bool` |  |
| `github_imports` | `[]any` |  |
| `github_installations` | `[]any` |  |
| `gitlab_configured` | `bool` |  |
| `gitlab_imports` | `[]any` |  |
| `gitlab_integrations` | `[]any` |  |
| `gitlab_redirect_uri` | `any` |  |
| `gitlab_self_managed_available` | `bool` |  |
| `inventory_errors` | `[]any` |  |
| `organization_id` | `string` |  |
| `repositories` | `[]any` |  |

#### Example: Load

```go
repositoryImport, err := client.RepositoryImport(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repositoryImport.(sdk.Entity).Data()) // the loaded entity's record
```


### RepositoryImportSession

Create an instance: `repositoryImportSession := client.RepositoryImportSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action_required` | `string` |  |
| `authorization_endpoint` | `string` |  |
| `can_authorize_github` | `bool` |  |
| `client_name` | `any` |  |
| `client_version` | `any` |  |
| `created_at` | `string` |  |
| `error_message` | `any` |  |
| `expires_at` | `string` |  |
| `git_imports` | `[]any` |  |
| `github_app_installation_id` | `any` |  |
| `github_connected` | `bool` |  |
| `id` | `string` |  |
| `idempotency_key` | `string` |  |
| `organization_id` | `string` |  |
| `organization_slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
repositoryImportSession, err := client.RepositoryImportSession(nil).Load(map[string]any{"id": "repository_import_session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repositoryImportSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RepositoryImportSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "idempotency_key": "example_idempotency_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepositoryImportSessionRepository

Create an instance: `repositoryImportSessionRepository := client.RepositoryImportSessionRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_branch` | `any` |  |
| `full_name` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `private` | `bool` |  |
| `reason` | `any` |  |
| `selectable` | `bool` |  |
| `status` | `string` |  |
| `visibility` | `string` |  |

#### Example: List

```go
repositoryImportSessionRepositorys, err := client.RepositoryImportSessionRepository(nil).List(map[string]any{"repository_import_session_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range repositoryImportSessionRepositorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RepositoryImportSessionSelection

Create an instance: `repositoryImportSessionSelection := client.RepositoryImportSessionSelection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `repositories` | `any` |  |

#### Example: Create

```go
result, err := client.RepositoryImportSessionSelection(nil).Create(map[string]any{
    "repository_import_session_id": "example_repository_import_session_id",
    "repositories": "example_repositories",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RepositorySandboxEnvironment

Create an instance: `repositorySandboxEnvironment := client.RepositorySandboxEnvironment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
repositorySandboxEnvironment, err := client.RepositorySandboxEnvironment(nil).Load(map[string]any{"id": "repository_sandbox_environment_id", "repository_id": "repository_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(repositorySandboxEnvironment.(sdk.Entity).Data()) // the loaded entity's record
```


### RoderCodeRepair

Create an instance: `roderCodeRepair := client.RoderCodeRepair(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `cancel_requested` | `bool` |  |
| `failure_code` | `any` |  |
| `id` | `string` |  |
| `launch_state` | `string` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `string` |  |
| `roder_thread_id` | `any` |  |
| `roder_turn_id` | `any` |  |
| `scenario_run_id` | `string` |  |
| `task` | `any` |  |
| `trigger_kind` | `string` |  |

#### Example: Load

```go
roderCodeRepair, err := client.RoderCodeRepair(nil).Load(map[string]any{"id": "roder_code_repair_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(roderCodeRepair.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RoderCodeRepair(nil).Create(map[string]any{
    "base_sha": "example_base_sha",
    "organization_id": "example_organization_id",
    "repository_slug": "example_repository_slug",
    "scenario_run_id": "example_scenario_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RoderCodeRepairSetting

Create an instance: `roderCodeRepairSetting := client.RoderCodeRepairSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `daily_limit` | `int` |  |
| `enabled` | `bool` |  |
| `enabled_at` | `any` |  |
| `operator_user_id` | `any` |  |
| `organization_id` | `string` |  |
| `repository_slug` | `any` | Connected Composal repository required when enabling |

#### Example: Load

```go
roderCodeRepairSetting, err := client.RoderCodeRepairSetting(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(roderCodeRepairSetting.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RoderCodeRepairSetting(nil).Create(map[string]any{
    "enabled": true,
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RoderMachine

Create an instance: `roderMachine := client.RoderMachine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RoderRun

Create an instance: `roderRun := client.RoderRun(nil)`


### RoderWorkspaceCredential

Create an instance: `roderWorkspaceCredential := client.RoderWorkspaceCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.RoderWorkspaceCredential(nil).Create(map[string]any{
    "required_lifetime_seconds": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunArtifact

Create an instance: `runArtifact := client.RunArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
runArtifact, err := client.RunArtifact(nil).Load(map[string]any{"pipeline_id": "pipeline_id", "run_id": "run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runArtifact.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RunArtifact(nil).Create(map[string]any{
    "pipeline_id": "example_pipeline_id",
    "run_id": "example_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunJob

Create an instance: `runJob := client.RunJob(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `allow_failure` | `bool` |  |
| `cache_archive_observations` | `any` | Bounded server response history; it does not confirm runner extraction or test-result reuse. |
| `ci_pipeline_run_id` | `string` |  |
| `ci_runner_id` | `any` |  |
| `created_at` | `string` |  |
| `dependencies_csv` | `any` |  |
| `display_id` | `int` |  |
| `environment_csv` | `any` |  |
| `execution_order` | `int` |  |
| `execution_profile` | `any` |  |
| `exit_code` | `any` |  |
| `failed` | `bool` |  |
| `finished_at` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `log_chunks` | `[]any` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `queued_at` | `any` |  |
| `reconciliation_id` | `any` |  |
| `retry_number` | `int` |  |
| `reuse` | `any` |  |
| `runner_label_selector` | `any` |  |
| `slug` | `string` |  |
| `started_at` | `any` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `steps` | `[]any` |  |
| `timeout_seconds` | `any` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
runJob, err := client.RunJob(nil).Load(map[string]any{"id": "run_job_id", "pipeline_id": "pipeline_id", "run_id": "run_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runJob.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RunJob(nil).Create(map[string]any{
    "pipeline_id": "example_pipeline_id",
    "run_id": "example_run_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunScenarioRun

Create an instance: `runScenarioRun := client.RunScenarioRun(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### RunScheduleOption

Create an instance: `runScheduleOption := client.RunScheduleOption(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
runScheduleOptions, err := client.RunScheduleOption(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range runScheduleOptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RunSearch

Create an instance: `runSearch := client.RunSearch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `runs` | `[]any` |  |

#### Example: Load

```go
runSearch, err := client.RunSearch(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runSearch.(sdk.Entity).Data()) // the loaded entity's record
```


### RunUpdate

Create an instance: `runUpdate := client.RunUpdate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_sha` | `string` |  |
| `can_verify` | `bool` |  |
| `comment_url` | `any` |  |
| `draft` | `bool` |  |
| `github_repository` | `any` | GitHub owner/repository associated with this pull request. |
| `github_url` | `any` |  |
| `head_sha` | `string` |  |
| `id` | `string` |  |
| `latest_created_at` | `any` |  |
| `latest_current` | `bool` |  |
| `latest_head_sha` | `any` |  |
| `latest_reason` | `any` |  |
| `latest_run_id` | `any` |  |
| `latest_state` | `any` |  |
| `number` | `int` |  |
| `project_id` | `any` |  |
| `project_slug` | `any` |  |
| `provider` | `string` |  |
| `repository_id` | `string` |  |
| `request_label` | `string` |  |
| `source_branch` | `any` |  |
| `source_repository` | `any` |  |
| `source_url` | `any` |  |
| `state` | `string` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `web_path` | `string` |  |

#### Example: List

```go
runUpdates, err := client.RunUpdate(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range runUpdates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RunWorkspaceCredential

Create an instance: `runWorkspaceCredential := client.RunWorkspaceCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.RunWorkspaceCredential(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunnerLease

Create an instance: `runnerLease := client.RunnerLease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
runnerLease, err := client.RunnerLease(nil).Load(map[string]any{"runner_id": "runner_id", "runner_pool_id": "runner_pool_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runnerLease.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RunnerLease(nil).Create(map[string]any{
    "runner_id": "example_runner_id",
    "runner_pool_id": "example_runner_pool_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunnerPoolNodeEnrollmentToken

Create an instance: `runnerPoolNodeEnrollmentToken := client.RunnerPoolNodeEnrollmentToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities_csv` | `any` |  |
| `ci_runner_pool_id` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `creator_user_id` | `any` |  |
| `description` | `any` |  |
| `expires_at` | `any` |  |
| `expires_at_label` | `any` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_used_at` | `any` |  |
| `last_used_at_label` | `any` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `raw_token` | `any` |  |
| `revoked_at` | `any` |  |
| `status` | `string` |  |
| `token_hint` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `usage_count` | `int` |  |
| `usage_count_label` | `string` |  |

#### Example: List

```go
runnerPoolNodeEnrollmentTokens, err := client.RunnerPoolNodeEnrollmentToken(nil).List(map[string]any{"runner_pool_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range runnerPoolNodeEnrollmentTokens.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.RunnerPoolNodeEnrollmentToken(nil).Create(map[string]any{
    "runner_pool_id": "example_runner_pool_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RunnerPoolRunner

Create an instance: `runnerPoolRunner := client.RunnerPoolRunner(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
runnerPoolRunner, err := client.RunnerPoolRunner(nil).Load(map[string]any{"id": "runner_pool_runner_id", "runner_pool_id": "runner_pool_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runnerPoolRunner.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RunnerPoolRunner(nil).Create(map[string]any{
    "runner_pool_id": "example_runner_pool_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### RuntimeInstanceHealthSnapshot

Create an instance: `runtimeInstanceHealthSnapshot := client.RuntimeInstanceHealthSnapshot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
runtimeInstanceHealthSnapshot, err := client.RuntimeInstanceHealthSnapshot(nil).Load(map[string]any{"runtime_instance_id": "runtime_instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(runtimeInstanceHealthSnapshot.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.RuntimeInstanceHealthSnapshot(nil).Create(map[string]any{
    "runtime_instance_id": "example_runtime_instance_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SandboxIntegration

Create an instance: `sandboxIntegration := client.SandboxIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `catalog` | `[]any` |  |
| `configuration` | `map[string]any` |  |
| `connected_profiles` | `map[string]any` | Connected profiles per provider across the organization. |
| `credentials` | `map[string]any` |  |
| `enabled` | `bool` |  |
| `id` | `string` |  |
| `integrations` | `[]any` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
sandboxIntegration, err := client.SandboxIntegration(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sandboxIntegration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SandboxIntegration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "configuration": map[string]any{},
    "credentials": map[string]any{},
    "name": "example_name",
    "provider": "example_provider",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ScenarioRevision

Create an instance: `scenarioRevision := client.ScenarioRevision(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `batch` | `string` | Shared by every revision one request or job saved. |
| `created_at` | `string` |  |
| `definition` | `map[string]any` | One narrative v1 or named-actor v2 Scenario file; its $schema identifies the full contract. |
| `id` | `string` |  |
| `source` | `string` | The client the save came through. |
| `user` | `any` | Null when a system job saved the Scenario. |
| `version` | `int` | The Scenario's lock_version after this save. |

#### Example: List

```go
scenarioRevisions, err := client.ScenarioRevision(nil).List(map[string]any{"organization_id": "example", "project_id": "example", "scenario_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range scenarioRevisions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ScenarioRunLesson

Create an instance: `scenarioRunLesson := client.ScenarioRunLesson(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finding` | `string` |  |
| `title` | `string` | Defaults to the Scenario's name. |
| `workaround` | `string` |  |

#### Example: Create

```go
result, err := client.ScenarioRunLesson(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "run_id": "example_run_id",
    "scenario_run_id": "example_scenario_run_id",
    "finding": "example_finding",
    "workaround": "example_workaround",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ScenarioRunScenarioEdit

Create an instance: `scenarioRunScenarioEdit := client.ScenarioRunScenarioEdit(nil)`


### SecretGrant

Create an instance: `secretGrant := client.SecretGrant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
secretGrant, err := client.SecretGrant(nil).Load(map[string]any{"id": "secret_grant_id", "organization_id": "organization_id", "secret_id": "secret_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(secretGrant.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SecretGrant(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "secret_id": "example_secret_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SecretVersion

Create an instance: `secretVersion := client.SecretVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
secretVersion, err := client.SecretVersion(nil).Load(map[string]any{"id": "secret_version_id", "organization_id": "organization_id", "secret_id": "secret_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(secretVersion.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SecretVersion(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "secret_id": "example_secret_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ServiceEndpoint

Create an instance: `serviceEndpoint := client.ServiceEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
serviceEndpoint, err := client.ServiceEndpoint(nil).Load(map[string]any{"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(serviceEndpoint.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ServiceEndpoint(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "service_id": "example_service_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Setting

Create an instance: `setting := client.Setting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `[]any` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `map[string]any` |  |
| `sandbox_regions` | `[]any` |  |

#### Example: Load

```go
setting, err := client.Setting(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(setting.(sdk.Entity).Data()) // the loaded entity's record
```


### SettingMutationLease

Create an instance: `settingMutationLease := client.SettingMutationLease(nil)`


### Signal

Create an instance: `signal := client.Signal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acked_at` | `any` |  |
| `acked_by` | `any` | Who acked the signal, read from `acked_by_user_id`. |
| `agent_runs` | `map[string]any` | Dispatched-run summary (docs §6c). |
| `app_service_id` | `any` |  |
| `attribution` | `map[string]any` | The producer-stamped attribution (docs §3) lifted out of `payload` into a typed sibling (docs §6d), so consumers get the ids and names they need — e.g. |
| `created_at` | `string` | ISO8601 row insert time — retention math and debugging only. |
| `dedupe_key` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` | The signal's own `sig_…` public id — also the paging cursor value. |
| `kind` | `string` | A frozen taxonomy kind (§1) or an `app.custom.*` kind. |
| `links` | `map[string]any` | Canonical, relative API paths built from real routes (docs §6a). |
| `occurred_at` | `string` | ISO8601 domain event time — what the UI displays and `since` filters on. |
| `organization_id` | `string` |  |
| `payload` | `map[string]any` | Per-kind shape (docs §4), with the producer's `region`/`app`/ `service` attribution keys baked in when known. |
| `recovery` | `map[string]any` | Recovered/resolved state folded from the `resolution` pairing (docs §6b/§6d). |
| `resolution` | `map[string]any` | Recovery pairing (docs §6b). |
| `severity` | `string` | Severity levels (docs §2, reusing `AlertRule::SEVERITIES`). |
| `source` | `map[string]any` | Provenance envelope (docs §6e), a sibling of the frozen `payload`. |
| `subject_id` | `any` |  |
| `subject_type` | `any` | Polymorphic pointer: `AppDeployment`, `RuntimeInstance`, `AlertEvent`, `HostedApp`, or `SignalSubscription`. |
| `summary` | `string` | One-line, kind-composed human sentence for the feed row (docs §6d, e.g. |

#### Example: Load

```go
signal, err := client.Signal(nil).Load(map[string]any{"id": "signal_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(signal.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
signals, err := client.Signal(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range signals.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Signal(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SignalInbound

Create an instance: `signalInbound := client.SignalInbound(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SignalIntegration

Create an instance: `signalIntegration := client.SignalIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token` | `string` | Optional provider API token for target discovery and backfill. |
| `api_token_stored` | `bool` |  |
| `config` | `map[string]any` |  |
| `created_at` | `any` |  |
| `failure_message` | `any` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `any` |  |
| `last_verified_at` | `any` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `int` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `int` |  |
| `unmapped_delivery_count` | `int` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `any` |  |
| `webhook_secret` | `string` | The provider's signing secret. |
| `webhook_secret_stored` | `bool` |  |

#### Example: Load

```go
signalIntegration, err := client.SignalIntegration(nil).Load(map[string]any{"id": "signal_integration_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(signalIntegration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
signalIntegrations, err := client.SignalIntegration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range signalIntegrations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.SignalIntegration(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "provider": "example_provider",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SignalIntegrationDelivery

Create an instance: `signalIntegrationDelivery := client.SignalIntegrationDelivery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt_count` | `int` |  |
| `created_at` | `any` |  |
| `delivery_id` | `string` | The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none. |
| `event_kind` | `any` |  |
| `id` | `string` | Public id (`sdel_…`). |
| `last_error` | `any` |  |
| `ops_signal_id` | `any` | Public id (`sig_…`) of the signal this delivery emitted. |
| `organization_id` | `string` |  |
| `processed_at` | `any` |  |
| `provider` | `string` |  |
| `received_at` | `any` |  |
| `signal_integration_id` | `string` |  |
| `state` | `string` |  |

#### Example: List

```go
signalIntegrationDeliverys, err := client.SignalIntegrationDelivery(nil).List(map[string]any{"organization_id": "example", "signal_integration_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range signalIntegrationDeliverys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SignalIntegrationTarget

Create an instance: `signalIntegrationTarget := client.SignalIntegrationTarget(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_service_id` | `any` |  |
| `created_at` | `any` |  |
| `display_name` | `any` |  |
| `enabled` | `bool` |  |
| `external_id` | `string` |  |
| `external_kind` | `string` |  |
| `external_slug` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` | Public id (`stgt_…`). |
| `organization_id` | `string` |  |
| `signal_integration_id` | `string` |  |
| `signal_integration_targets` | `[]any` |  |
| `targets` | `[]any` |  |
| `updated_at` | `any` |  |

#### Example: List

```go
signalIntegrationTargets, err := client.SignalIntegrationTarget(nil).List(map[string]any{"organization_id": "example", "signal_integration_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range signalIntegrationTargets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SignalSubscription

Create an instance: `signalSubscription := client.SignalSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
signalSubscription, err := client.SignalSubscription(nil).Load(map[string]any{"id": "signal_subscription_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(signalSubscription.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SignalSubscription(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Site

Create an instance: `site := client.Site(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `any` |  |
| `activated_at_label` | `any` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `creator_user_id` | `any` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `any` |  |
| `file_count` | `int` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `any` |  |
| `finished_at_label` | `any` |  |
| `id` | `string` |  |
| `is_active` | `bool` |  |
| `source_ref` | `any` |  |
| `started_at` | `any` |  |
| `started_at_label` | `any` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `int` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `uploaded_at` | `any` |  |
| `uploaded_at_label` | `any` |  |

#### Example: List

```go
sites, err := client.Site(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sites.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SiteAccessKey

Create an instance: `siteAccessKey := client.SiteAccessKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
siteAccessKey, err := client.SiteAccessKey(nil).Load(map[string]any{"organization_id": "organization_id", "site_id": "site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(siteAccessKey.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SiteAccessKey(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "site_id": "example_site_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SitePreview

Create an instance: `sitePreview := client.SitePreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon_data_url` | `any` | The site's icon as a data: URL, up to 256 KB |
| `title` | `any` |  |
| `url` | `string` | The address as it will be saved |

#### Example: Load

```go
sitePreview, err := client.SitePreview(nil).Load(map[string]any{"organization_id": "organization_id", "url": "url"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sitePreview.(sdk.Entity).Data()) // the loaded entity's record
```


### SiteSecret

Create an instance: `siteSecret := client.SiteSecret(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `native_agent_id` | `string` |  |
| `value` | `string` |  |


### SlackChannel

Create an instance: `slackChannel := client.SlackChannel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
slackChannels, err := client.SlackChannel(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range slackChannels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SourceConnection

Create an instance: `sourceConnection := client.SourceConnection(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### SpaceAlertRule

Create an instance: `spaceAlertRule := client.SpaceAlertRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceAlertRule, err := client.SpaceAlertRule(nil).Load(map[string]any{"id": "space_alert_rule_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceAlertRule.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceAlertRule(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceAuditEvent

Create an instance: `spaceAuditEvent := client.SpaceAuditEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
spaceAuditEvent, err := client.SpaceAuditEvent(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceAuditEvent.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceAuditEvent(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceDnsRecord

Create an instance: `spaceDnsRecord := client.SpaceDnsRecord(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceDnsRecord, err := client.SpaceDnsRecord(nil).Load(map[string]any{"id": "space_dns_record_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceDnsRecord.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceDnsRecord(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceEnrollmentToken

Create an instance: `spaceEnrollmentToken := client.SpaceEnrollmentToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceEnrollmentToken, err := client.SpaceEnrollmentToken(nil).Load(map[string]any{"id": "space_enrollment_token_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceEnrollmentToken.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceEnrollmentToken(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceGateway

Create an instance: `spaceGateway := client.SpaceGateway(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceGateway, err := client.SpaceGateway(nil).Load(map[string]any{"id": "space_gateway_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceGateway.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceGateway(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceGroup

Create an instance: `spaceGroup := client.SpaceGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceGroup, err := client.SpaceGroup(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceGroup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceGroup(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceGroupMembership

Create an instance: `spaceGroupMembership := client.SpaceGroupMembership(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceGroupMembership, err := client.SpaceGroupMembership(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceGroupMembership.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceGroupMembership(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceLogStream

Create an instance: `spaceLogStream := client.SpaceLogStream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
spaceLogStream, err := client.SpaceLogStream(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceLogStream.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceLogStream(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceMetricSery

Create an instance: `spaceMetricSery := client.SpaceMetricSery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
spaceMetricSery, err := client.SpaceMetricSery(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceMetricSery.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceMetricSery(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceOtelCollector

Create an instance: `spaceOtelCollector := client.SpaceOtelCollector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceOtelCollector, err := client.SpaceOtelCollector(nil).Load(map[string]any{"id": "space_otel_collector_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceOtelCollector.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceOtelCollector(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpacePeer

Create an instance: `spacePeer := client.SpacePeer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spacePeer, err := client.SpacePeer(nil).Load(map[string]any{"id": "space_peer_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spacePeer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpacePeer(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpacePeerAttachment

Create an instance: `spacePeerAttachment := client.SpacePeerAttachment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spacePeerAttachment, err := client.SpacePeerAttachment(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spacePeerAttachment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpacePeerAttachment(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpacePolicy

Create an instance: `spacePolicy := client.SpacePolicy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spacePolicy, err := client.SpacePolicy(nil).Load(map[string]any{"id": "space_policy_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spacePolicy.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpacePolicy(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceSegment

Create an instance: `spaceSegment := client.SpaceSegment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
spaceSegment, err := client.SpaceSegment(nil).Load(map[string]any{"id": "space_segment_id", "space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceSegment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceSegment(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpaceTraceSpan

Create an instance: `spaceTraceSpan := client.SpaceTraceSpan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
spaceTraceSpan, err := client.SpaceTraceSpan(nil).Load(map[string]any{"space_id": "space_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceTraceSpan.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SpaceTraceSpan(nil).Create(map[string]any{
    "space_id": "example_space_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Spark

Create an instance: `spark := client.Spark(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_products` | `[]any` | Products this organization has activated (PRD 144). |
| `agents_only` | `bool` | Whether this organization uses the agents-only interface; older responses may omit this value. |
| `can_activate_products` | `bool` | Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces. |
| `can_manage` | `bool` |  |
| `compute_credit_cents` | `any` | Included compute the workspace started Sparks with, when it is on compute billing. |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `credit_cents` | `any` | Inference credit the workspace started Sparks with. |
| `first_spark` | `any` | Null until the first Spark exists or when the viewer cannot read it. |
| `github_connected` | `bool` |  |
| `github_prs_authored_by_change_author` | `bool` |  |
| `id` | `string` |  |
| `jsonrpc` | `string` |  |
| `logo_url` | `any` |  |
| `member_count` | `int` |  |
| `method` | `string` |  |
| `name` | `string` |  |
| `params` | `map[string]any` |  |
| `pending_invitation_count` | `int` |  |
| `personal` | `bool` |  |
| `repository_count` | `int` |  |
| `role` | `any` |  |
| `sandbox_region` | `string` |  |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether a shared agent may use one person's account for everyone who chats with it. |
| `slug` | `string` |  |
| `source_control_providers` | `[]any` | Connected source control providers for this organization. |
| `source_ui_enabled` | `bool` | Organization-scoped Source workspace rollout; missing values mean disabled. |
| `started` | `bool` | Whether the workspace has started Sparks. |
| `timezone` | `string` | Default IANA timezone for organization-local schedules such as nightly dreaming. |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `verify_pr_scenario_writing_enabled` | `bool` |  |

#### Example: Load

```go
spark, err := client.Spark(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spark.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Spark(nil).Create(map[string]any{
    "jsonrpc": "example_jsonrpc",
    "method": "example_method",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkAgentIntegration

Create an instance: `sparkAgentIntegration := client.SparkAgentIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_counts` | `map[string]any` | Accounts the viewer can see per toolkit, across all account pages. |
| `accounts_path` | `string` | Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists. |
| `added_toolkits` | `[]any` | Apps with a connected or connecting account the viewer can see. |
| `can_manage` | `bool` |  |
| `can_manage_organization` | `bool` |  |
| `catalog` | `[]any` |  |
| `connect_as` | `any` | The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization). |
| `connect_as_by_toolkit` | `map[string]any` | Apps whose Connect differs from connect_as because their sign-in only makes team accounts. |
| `connected_counts` | `map[string]any` | Signed-in accounts per toolkit, across all account pages. |
| `connection_id` | `string` |  |
| `connections` | `[]any` |  |
| `email` | `map[string]any` | A native agent's own email address. |
| `enabled` | `bool` |  |
| `enabled_toolkits` | `[]any` | Apps with a signed-in account this agent uses now, across all account pages, sorted. |
| `generation` | `int` |  |
| `pagination` | `map[string]any` |  |
| `pending_counts` | `map[string]any` | Accounts per toolkit whose sign-in was started but not finished, across all account pages. |
| `personal_creation_key_supported` | `bool` | The personal account creation endpoint honors a creation key. |
| `private_agent` | `bool` | Only the agent's owner can chat with it. |
| `shared_agent_personal_accounts_enabled` | `bool` | Whether the organization lets a shared agent use one person's account for everyone who chats with it. |
| `slack` | `map[string]any` |  |
| `webhook_connections` | `[]any` |  |
| `webhooks_available` | `bool` |  |

#### Example: Load

```go
sparkAgentIntegration, err := client.SparkAgentIntegration(nil).Load(map[string]any{"agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sparkAgentIntegration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SparkAgentIntegration(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "connection_id": "example_connection_id",
    "enabled": true,
    "generation": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkAgentLocalThread

Create an instance: `sparkAgentLocalThread := client.SparkAgentLocalThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `delivery` | `map[string]any` | Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did. |
| `device_id` | `string` |  |
| `device_name` | `string` |  |
| `diagnostic_code` | `string` | Approved product error code retained after copied diagnostics expire. |
| `end` | `any` |  |
| `expires_at` | `string` |  |
| `full_title` | `string` | The native name or first prompt in full, for a tooltip. |
| `id` | `string` |  |
| `key` | `string` |  |
| `last_activity_at` | `any` |  |
| `native_thread_id` | `string` |  |
| `parent_conversation_id` | `any` |  |
| `provider` | `string` |  |
| `references` | `map[string]any` |  |
| `relay_disconnected_at` | `any` |  |
| `relay_participant` | `map[string]any` |  |
| `result` | `any` |  |
| `result_expired` | `bool` | Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences. |
| `result_schema` | `any` |  |
| `section` | `string` | Server-assigned section in the ordered computer thread directory. |
| `state` | `string` |  |
| `status` | `any` | What the native thread is doing. |
| `task_configured` | `bool` |  |
| `thread_id` | `string` |  |
| `title` | `string` | Short title: the native name, or the first prompt's first line without the agent's task preamble. |

#### Example: Load

```go
sparkAgentLocalThread, err := client.SparkAgentLocalThread(nil).Load(map[string]any{"id": "spark_agent_local_thread_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sparkAgentLocalThread.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SparkAgentLocalThread(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "device_id": "example_device_id",
    "key": "example_key",
    "provider": "example_provider",
    "thread_id": "example_thread_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkAgentSite

Create an instance: `sparkAgentSite := client.SparkAgentSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
sparkAgentSites, err := client.SparkAgentSite(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sparkAgentSites.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SparkAgentSkill

Create an instance: `sparkAgentSkill := client.SparkAgentSkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `skills` | `[]any` |  |
| `version` | `string` |  |

#### Example: List

```go
sparkAgentSkills, err := client.SparkAgentSkill(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sparkAgentSkills.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.SparkAgentSkill(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "enabled": true,
    "name": "example_name",
    "version": "example_version",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkAgentThread

Create an instance: `sparkAgentThread := client.SparkAgentThread(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archive_deletes_sandbox` | `bool` |  |
| `archived` | `bool` |  |
| `attention` | `any` | Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish. |
| `can_archive` | `bool` |  |
| `can_compact` | `bool` |  |
| `can_snooze` | `bool` |  |
| `coordination_status` | `any` | Durable work not represented by a native run: a queued input or an outstanding thread report. |
| `execution` | `any` | device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness. |
| `first_input` | `any` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `group` | `string` | Rails-owned list group, in precedence order: attention, active run, coordination custody, then done. |
| `has_active_run` | `bool` |  |
| `id` | `string` |  |
| `inherit_context` | `bool` | Include the source conversation through its last completed reply. |
| `is_main` | `bool` |  |
| `kind` | `string` |  |
| `message` | `string` | The thread's first message. |
| `older` | `bool` | Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older. |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `parent_conversation_title` | `string` | Source conversation title, resolved independently of this page. |
| `requester_membership_id` | `string` |  |
| `snoozed_until` | `any` | When a snoozed thread returns to its usual group; null when it is not snoozed. |
| `thread` | `map[string]any` |  |
| `title` | `string` |  |
| `updated_at` | `any` |  |

#### Example: List

```go
sparkAgentThreads, err := client.SparkAgentThread(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sparkAgentThreads.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.SparkAgentThread(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkCredit

Create an instance: `sparkCredit := client.SparkCredit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_cents` | `int` | Purchase amount in USD cents. |
| `autofill` | `any` |  |
| `autofill_payment_unconfirmed` | `bool` |  |
| `available_usd` | `string` |  |
| `billing_unit` | `string` | Compute minute quote version returned by the billing summary. |
| `can_manage` | `bool` |  |
| `compute_minutes` | `map[string]any` |  |
| `compute_usd` | `string` |  |
| `credits_per_usd` | `int` |  |
| `inference_usd` | `string` |  |
| `kind` | `string` |  |
| `payment_method` | `any` |  |
| `payments_enabled` | `bool` |  |
| `plan` | `any` |  |
| `plans` | `[]any` |  |
| `quoted_credits_cents` | `int` | Grant shown for a top-up or subscription, in usage cents. |
| `quoted_price_cents` | `int` | Monthly cash price shown for a subscription, in USD cents. |
| `refill_limits_cents` | `[]any` |  |
| `refill_options` | `[]any` |  |
| `refill_thresholds_cents` | `[]any` |  |
| `request_key` | `string` |  |
| `settings` | `any` |  |
| `starter_cents` | `int` |  |
| `top_up_max_cents` | `int` | Maximum manual top-up, in USD cents. |
| `top_up_step_cents` | `int` | Minimum manual top-up and increment, in USD cents. |

#### Example: Load

```go
sparkCredit, err := client.SparkCredit(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sparkCredit.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.SparkCredit(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "kind": "example_kind",
    "request_key": "example_request_key",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SparkCreditAgentUsage

Create an instance: `sparkCreditAgentUsage := client.SparkCreditAgentUsage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `[]any` |  |
| `all` | `map[string]any` |  |
| `days` | `[]any` |  |
| `id` | `string` |  |
| `owners` | `[]any` |  |

#### Example: Load

```go
sparkCreditAgentUsage, err := client.SparkCreditAgentUsage(nil).Load(map[string]any{"id": "spark_credit_agent_usage_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sparkCreditAgentUsage.(sdk.Entity).Data()) // the loaded entity's record
```


### SparkCreditUsageTotal

Create an instance: `sparkCreditUsageTotal := client.SparkCreditUsageTotal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `compute_minutes_used` | `string` |  |
| `compute_usd` | `string` |  |
| `inference_usd` | `string` |  |

#### Example: Load

```go
sparkCreditUsageTotal, err := client.SparkCreditUsageTotal(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sparkCreditUsageTotal.(sdk.Entity).Data()) // the loaded entity's record
```


### StaticSite

Create an instance: `staticSite := client.StaticSite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployment_id` | `any` |  |
| `cdn_hostname` | `string` |  |
| `cdn_url` | `string` |  |
| `cname_target` | `string` |  |
| `created_at` | `string` |  |
| `default_url` | `string` |  |
| `description` | `any` |  |
| `error_document` | `any` |  |
| `failure_message` | `any` |  |
| `hosted_app_id` | `any` |  |
| `id` | `string` |  |
| `index_document` | `string` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provisioned` | `bool` |  |
| `provisioned_at` | `any` |  |
| `region` | `any` |  |
| `replication_regions` | `[]any` |  |
| `repository_id` | `any` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
staticSite, err := client.StaticSite(nil).Load(map[string]any{"id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(staticSite.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
staticSites, err := client.StaticSite(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range staticSites.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.StaticSite(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### StaticSiteDeployment

Create an instance: `staticSiteDeployment := client.StaticSiteDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activated_at` | `any` |  |
| `activated_at_label` | `any` |  |
| `commit_sha` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `creator_user_id` | `any` |  |
| `deploy_slug` | `string` |  |
| `failure_message` | `any` |  |
| `file_count` | `int` |  |
| `file_count_label` | `string` |  |
| `finished_at` | `any` |  |
| `finished_at_label` | `any` |  |
| `id` | `string` |  |
| `is_active` | `bool` |  |
| `source_ref` | `any` |  |
| `started_at` | `any` |  |
| `started_at_label` | `any` |  |
| `static_site_id` | `string` |  |
| `status` | `string` |  |
| `total_bytes` | `int` |  |
| `total_bytes_label` | `string` |  |
| `trigger_kind` | `string` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |
| `uploaded_at` | `any` |  |
| `uploaded_at_label` | `any` |  |

#### Example: Load

```go
staticSiteDeployment, err := client.StaticSiteDeployment(nil).Load(map[string]any{"id": "static_site_deployment_id", "static_site_id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(staticSiteDeployment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
staticSiteDeployments, err := client.StaticSiteDeployment(nil).List(map[string]any{"static_site_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range staticSiteDeployments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.StaticSiteDeployment(nil).Create(map[string]any{
    "static_site_id": "example_static_site_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### StaticSiteDomain

Create an instance: `staticSiteDomain := client.StaticSiteDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `any` |  |
| `hosted_app_id` | `any` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `any` |  |
| `record_name` | `any` |  |
| `record_type` | `any` |  |
| `record_value` | `any` |  |
| `redirect_to` | `any` |  |
| `static_site_id` | `any` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Load

```go
staticSiteDomain, err := client.StaticSiteDomain(nil).Load(map[string]any{"id": "static_site_domain_id", "static_site_id": "static_site_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(staticSiteDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
staticSiteDomains, err := client.StaticSiteDomain(nil).List(map[string]any{"static_site_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range staticSiteDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.StaticSiteDomain(nil).Create(map[string]any{
    "static_site_id": "example_static_site_id",
    "hostname": "example_hostname",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### StatusChange

Create an instance: `statusChange := client.StatusChange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change_id` | `string` |  |
| `id` | `string` |  |
| `patchsets` | `[]any` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |

#### Example: Load

```go
statusChange, err := client.StatusChange(nil).Load(map[string]any{"id": "status_change_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(statusChange.(sdk.Entity).Data()) // the loaded entity's record
```


### StatusCommit

Create an instance: `statusCommit := client.StatusCommit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `[]any` |  |
| `commit_sha` | `string` |  |
| `counts` | `map[string]any` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```go
statusCommit, err := client.StatusCommit(nil).Load(map[string]any{"id": "status_commit_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(statusCommit.(sdk.Entity).Data()) // the loaded entity's record
```


### StatusPatchset

Create an instance: `statusPatchset := client.StatusPatchset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `checks` | `[]any` |  |
| `checks_status` | `any` |  |
| `commit_sha` | `any` |  |
| `counts` | `map[string]any` |  |
| `id` | `string` |  |
| `patchset_id` | `string` |  |
| `status` | `string` |  |
| `status_label` | `string` |  |
| `status_state` | `string` |  |
| `status_tone` | `string` |  |
| `total` | `int` |  |

#### Example: Load

```go
statusPatchset, err := client.StatusPatchset(nil).Load(map[string]any{"id": "status_patchset_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(statusPatchset.(sdk.Entity).Data()) // the loaded entity's record
```


### StripeWebhook

Create an instance: `stripeWebhook := client.StripeWebhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.StripeWebhook(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SubmitTelemetry

Create an instance: `submitTelemetry := client.SubmitTelemetry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.SubmitTelemetry(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SubscriptionModel

Create an instance: `subscriptionModel := client.SubscriptionModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `default_reasoning` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `reasoning` | `[]any` | Effort levels this plan model accepts. |
| `speeds` | `[]any` | Speed modes advertised by this connected account and model. |

#### Example: List

```go
subscriptionModels, err := client.SubscriptionModel(nil).List(map[string]any{"agent_id": "example", "organization_id": "example", "profile_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range subscriptionModels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SwarmEvent

Create an instance: `swarmEvent := client.SwarmEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_swarm_id` | `string` |  |
| `attempt_id` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `id` | `int` |  |
| `kind` | `string` |  |
| `payload` | `map[string]any` |  |
| `reason` | `any` |  |
| `scheduler_generation` | `any` |  |
| `task_id` | `any` |  |

#### Example: List

```go
swarmEvents, err := client.SwarmEvent(nil).List(map[string]any{"swarm_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range swarmEvents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SwarmLive

Create an instance: `swarmLive := client.SwarmLive(nil)`


### SwarmNote

Create an instance: `swarmNote := client.SwarmNote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `task_id` | `any` | A task public id; omitted |
| `text` | `string` |  |

#### Example: Create

```go
result, err := client.SwarmNote(nil).Create(map[string]any{
    "swarm_id": "example_swarm_id",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SwarmTask

Create an instance: `swarmTask := client.SwarmTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptance_commands` | `[]any` |  |
| `agent_swarm_id` | `string` |  |
| `assigned_runner_id` | `any` |  |
| `blocked_reason` | `any` |  |
| `changes` | `[]any` |  |
| `commit_count` | `int` |  |
| `commit_sha_result` | `any` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `current_attempt_id` | `any` |  |
| `deadline_at` | `any` |  |
| `depends_on_task_ids` | `[]any` |  |
| `depth` | `int` |  |
| `diff_artifact_url` | `any` |  |
| `display_id` | `int` |  |
| `environment_profile` | `any` |  |
| `error_message` | `any` |  |
| `failure_code` | `any` |  |
| `finished_at` | `any` |  |
| `finished_at_label` | `any` |  |
| `harness` | `string` |  |
| `id` | `string` |  |
| `input_revision` | `any` |  |
| `iteration` | `int` |  |
| `landing_state` | `string` |  |
| `model` | `any` |  |
| `model_provider` | `any` |  |
| `number` | `int` |  |
| `organization_id` | `string` |  |
| `owned_paths` | `[]any` |  |
| `parent_task_id` | `any` |  |
| `position` | `int` |  |
| `prompt` | `string` |  |
| `queued_at` | `any` |  |
| `queued_at_label` | `any` |  |
| `reasoning_effort` | `any` |  |
| `recent_activity` | `[]any` |  |
| `repo_url` | `string` |  |
| `result` | `map[string]any` |  |
| `retry_number` | `int` |  |
| `role` | `string` |  |
| `run_id` | `any` |  |
| `stack_after_task_id` | `any` |  |
| `started_at` | `any` |  |
| `started_at_label` | `any` |  |
| `status` | `string` |  |
| `title` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
swarmTasks, err := client.SwarmTask(nil).List(map[string]any{"swarm_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range swarmTasks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### TaskLease

Create an instance: `taskLease := client.TaskLease(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```go
result, err := client.TaskLease(nil).Create(map[string]any{
    "swarm_id": "example_swarm_id",
    "task_id": "example_task_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ThreadPreview

Create an instance: `threadPreview := client.ThreadPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `any` |  |
| `port` | `int` |  |
| `url` | `string` |  |

#### Example: Create

```go
result, err := client.ThreadPreview(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
    "thread_id": "example_thread_id",
    "port": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ThreadPreviewAccess

Create an instance: `threadPreviewAccess := client.ThreadPreviewAccess(nil)`


### ToolFeedback

Create an instance: `toolFeedback := client.ToolFeedback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `created_at` | `string` |  |
| `details` | `string` |  |
| `feedback` | `map[string]any` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` | Caller-supplied session context; no secrets or transcripts |
| `organization_id` | `string` |  |
| `source` | `string` |  |
| `summary` | `string` |  |
| `user_id` | `string` |  |

#### Example: Load

```go
toolFeedback, err := client.ToolFeedback(nil).Load(map[string]any{"id": "tool_feedback_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(toolFeedback.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ToolFeedback(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "feedback": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Transcript

Create an instance: `transcript := client.Transcript(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent` | `string` |  |
| `author` | `map[string]any` |  |
| `checkpoint_pagination` | `map[string]any` |  |
| `checkpoints` | `[]any` |  |
| `id` | `string` |  |
| `last_checkpoint_at` | `any` |  |
| `selected_checkpoint` | `any` |  |
| `source_url` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `title` | `any` |  |

#### Example: List

```go
transcripts, err := client.Transcript(nil).List(map[string]any{"repo": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range transcripts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### V1Message

Create an instance: `v1Message := client.V1Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.V1Message(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VcBranch

Create an instance: `vcBranch := client.VcBranch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `target_commit_id` | `string` |  |

#### Example: List

```go
vcBranchs, err := client.VcBranch(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcBranchs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.VcBranch(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VcBrowser

Create an instance: `vcBrowser := client.VcBrowser(nil)`


### VcChange

Create an instance: `vcChange := client.VcChange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `[]any` |  |
| `canonical_path` | `string` |  |
| `change` | `any` |  |
| `checks` | `[]any` |  |
| `checks_status` | `string` |  |
| `description` | `any` |  |
| `group` | `any` |  |
| `id` | `string` |  |
| `jj_change_id` | `any` |  |
| `labels` | `[]any` |  |
| `landing` | `map[string]any` | Server-computed submitted-together closure and landing preflight. |
| `number` | `int` |  |
| `patchset_number` | `any` |  |
| `previews` | `[]any` |  |
| `primary_status` | `any` |  |
| `public_id` | `string` |  |
| `related_changes` | `[]any` |  |
| `relation_chain` | `[]any` |  |
| `restack_state` | `string` |  |
| `review_summary` | `map[string]any` |  |
| `stack` | `any` |  |
| `status` | `string` |  |
| `sync` | `map[string]any` |  |
| `target` | `map[string]any` |  |
| `target_advanced` | `bool` |  |
| `target_branch` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
vcChange, err := client.VcChange(nil).Load(map[string]any{"id": "vc_change_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vcChange.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vcChanges, err := client.VcChange(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcChanges.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VcChangeGroup

Create an instance: `vcChangeGroup := client.VcChangeGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `changes` | `[]any` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `number` | `int` |  |
| `status` | `string` |  |
| `title` | `any` |  |

#### Example: Load

```go
vcChangeGroup, err := client.VcChangeGroup(nil).Load(map[string]any{"id": "vc_change_group_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vcChangeGroup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vcChangeGroups, err := client.VcChangeGroup(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcChangeGroups.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.VcChangeGroup(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "repo_id": "example_repo_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VcFile

Create an instance: `vcFile := client.VcFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paths` | `[]any` |  |
| `truncated` | `bool` |  |

#### Example: List

```go
vcFiles, err := client.VcFile(nil).List(map[string]any{"organization_id": "example", "repo_id": "example", "ref": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcFiles.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VcMergeQueue

Create an instance: `vcMergeQueue := client.VcMergeQueue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analytics` | `map[string]any` | Queue performance for the reporting window. |
| `id` | `string` |  |
| `policy` | `map[string]any` |  |
| `queue` | `map[string]any` |  |
| `target_branches` | `[]any` | Bookmark names for the target picker. |

#### Example: Load

```go
vcMergeQueue, err := client.VcMergeQueue(nil).Load(map[string]any{"id": "vc_merge_queue_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vcMergeQueue.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vcMergeQueues, err := client.VcMergeQueue(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcMergeQueues.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VcStack

Create an instance: `vcStack := client.VcStack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alias_ref_name` | `any` |  |
| `changes` | `[]any` |  |
| `code` | `string` |  |
| `id` | `string` |  |
| `landing` | `map[string]any` | Compact landing state for the Stack CLI. |
| `member_count` | `int` |  |
| `name` | `any` |  |
| `ref_name` | `string` |  |
| `status` | `string` |  |
| `tip_change_number` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `string` |  |

#### Example: Load

```go
vcStack, err := client.VcStack(nil).Load(map[string]any{"id": "vc_stack_id", "organization_id": "organization_id", "repo_id": "repo_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vcStack.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vcStacks, err := client.VcStack(nil).List(map[string]any{"organization_id": "example", "repo_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcStacks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VcsNode

Create an instance: `vcsNode := client.VcsNode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_avatar_url` | `any` |  |
| `account_id` | `any` |  |
| `account_login` | `string` |  |
| `created_at` | `string` |  |
| `created_at_label` | `any` |  |
| `id` | `string` |  |
| `installation_id` | `string` |  |
| `installed_at` | `any` |  |
| `installed_at_label` | `any` |  |
| `manage_access_url` | `string` |  |
| `organization_id` | `string` |  |
| `permission_entries` | `[]any` | GitHub's permission hash as a display-ready list, sorted by name. |
| `permissions` | `map[string]any` |  |
| `status` | `string` |  |
| `suspended_at` | `any` |  |
| `suspended_at_label` | `any` |  |
| `updated_at` | `string` |  |
| `updated_at_label` | `any` |  |

#### Example: List

```go
vcsNodes, err := client.VcsNode(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vcsNodes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VcsSetting

Create an instance: `vcsSetting := client.VcsSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage_pr_scenario_writing` | `bool` |  |
| `can_manage_sandbox_region` | `bool` |  |
| `dedicated_outbound_ip_addresses` | `[]any` | Public outbound IPs for the enabled operator-managed assignment; empty when no assignment is enabled. |
| `default_trunk_bookmark` | `string` |  |
| `organization` | `map[string]any` |  |
| `sandbox_regions` | `[]any` |  |

#### Example: Load

```go
vcsSetting, err := client.VcsSetting(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vcsSetting.(sdk.Entity).Data()) // the loaded entity's record
```


### VerificationProjectCredential

Create an instance: `verificationProjectCredential := client.VerificationProjectCredential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `browser_authentication` | `any` |  |
| `browser_session` | `string` | JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. |
| `composal_address` | `any` | The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it. |
| `composal_inbox` | `bool` | email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,… |
| `composal_inbox_user` | `string` | The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. |
| `composal_managed_google` | `bool` | Select the Composal-managed Google test account when available. |
| `configured` | `bool` |  |
| `cookies` | `string` | Pasted cookies as name=value (Cookie header supported) or name:"value", separated by newlines or semicolons. |
| `credential_keys` | `map[string]any` |  |
| `description` | `any` | When to choose this account: role, plan, tenant and intended journeys |
| `email_link_auth_origins` | `[]any` | Explicit auth-service origins for protected email-link login and signup links. |
| `has_inbox` | `bool` | Whether Composal provisioned this address and can show the mail it receives |
| `id` | `string` |  |
| `identity_provider` | `any` | For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match |
| `instructions` | `any` | Non-secret login instructions and the expected signed-in state; required for custom login |
| `login_method` | `string` |  |
| `login_url` | `string` | Optional sign-in path or URL. |
| `managed` | `bool` |  |
| `mfa_enabled` | `bool` |  |
| `name` | `string` |  |
| `oidc` | `map[string]any` | Composal sign-in settings for oidc_identity, which only project credentials accept. |
| `passkey` | `string` | JSON enrollment artifact for a cloud-managed software passkey; never returned. |
| `password` | `string` | Required for email_password and other password methods, except an email_password account that uses a Composal address |
| `project_id` | `string` |  |
| `provider_guidance` | `string` |  |
| `remove_browser_authentication` | `bool` |  |
| `remove_totp` | `bool` |  |
| `sign_in_verified` | `bool` | A sign-in check confirmed this account signs in with its current settings |
| `sign_in_verified_at` | `any` |  |
| `status` | `string` |  |
| `totp_secret` | `string` | Base32 setup key or otpauth URI, not a current one-time code |
| `updated_at` | `string` |  |
| `username` | `string` |  |

#### Example: Load

```go
verificationProjectCredential, err := client.VerificationProjectCredential(nil).Load(map[string]any{"id": "verification_project_credential_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(verificationProjectCredential.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
verificationProjectCredentials, err := client.VerificationProjectCredential(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range verificationProjectCredentials.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.VerificationProjectCredential(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "login_method": "example_login_method",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerificationProjectPersona

Create an instance: `verificationProjectPersona := client.VerificationProjectPersona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_mode` | `string` |  |
| `archived_at` | `any` |  |
| `capabilities` | `any` |  |
| `created_at` | `string` |  |
| `credential_id` | `any` | The credential this persona signs in with. |
| `goals` | `any` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `role` | `string` |  |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
verificationProjectPersona, err := client.VerificationProjectPersona(nil).Load(map[string]any{"id": "verification_project_persona_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(verificationProjectPersona.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
verificationProjectPersonas, err := client.VerificationProjectPersona(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range verificationProjectPersonas.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.VerificationProjectPersona(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerificationProjectRun

Create an instance: `verificationProjectRun := client.VerificationProjectRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approved_at` | `any` |  |
| `approved_digest` | `any` |  |
| `archived_at` | `any` |  |
| `available_tests` | `[]any` |  |
| `can_archive` | `bool` |  |
| `can_restore` | `bool` |  |
| `can_start_another_run` | `bool` |  |
| `cleanup_state` | `string` |  |
| `concurrency` | `int` |  |
| `created_at` | `string` |  |
| `creator_name` | `any` |  |
| `definition_mode` | `string` |  |
| `environment_id` | `any` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `max_seconds` | `int` |  |
| `outcome` | `any` |  |
| `permissions` | `map[string]any` |  |
| `plan_digest` | `any` |  |
| `preparation_error_code` | `any` |  |
| `progress` | `map[string]any` |  |
| `project` | `map[string]any` |  |
| `project_id` | `string` |  |
| `pull_request` | `any` |  |
| `queued_at` | `any` |  |
| `run` | `map[string]any` |  |
| `run_plan_id` | `any` |  |
| `scenario_runs` | `[]any` |  |
| `source_run_id` | `any` |  |
| `source_versions` | `any` |  |
| `start_when_prepared` | `bool` | The run starts as soon as its browser plans are ready, without a review step. |
| `state` | `string` |  |
| `target_snapshot` | `map[string]any` |  |
| `title` | `string` |  |
| `updated_at` | `string` |  |
| `verifier_preferences_snapshot` | `map[string]any` | Project guidance for human-readable verifier reports; core execution and evidence rules take precedence. |
| `web_path` | `string` | Path of the run's page in the web app, where it can be watched live. |

#### Example: Load

```go
verificationProjectRun, err := client.VerificationProjectRun(nil).Load(map[string]any{"id": "verification_project_run_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(verificationProjectRun.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
verificationProjectRuns, err := client.VerificationProjectRun(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range verificationProjectRuns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VerificationProjectScenario

Create an instance: `verificationProjectScenario := client.VerificationProjectScenario(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actors` | `map[string]any` |  |
| `allowed_actions` | `string` |  |
| `archived_at` | `any` |  |
| `cleanup` | `[]any` | Optional application cleanup instructions, attempted after checks pass or fail. |
| `created_at` | `string` |  |
| `dependencies` | `[]any` |  |
| `fixtures` | `[]any` | Files upload steps choose, ordered by name. |
| `health` | `map[string]any` |  |
| `id` | `string` |  |
| `identity_probe` | `any` |  |
| `if` | `any` | A documented subset of Actions expressions. |
| `labels` | `[]any` | Short tags that group Scenarios, such as checkout or smoke |
| `last_revision` | `any` | The latest recorded save; null when the Scenario was last saved before revisions were recorded. |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `on` | `any` | Explicit Actions-style automatic execution rules. |
| `outcomes` | `[]any` |  |
| `persona_id` | `string` |  |
| `primary_actor` | `any` |  |
| `project_id` | `string` |  |
| `selectable_for_run` | `bool` |  |
| `starting_conditions` | `any` |  |
| `steps` | `[]any` |  |
| `triggers` | `[]any` | Positive repository path patterns that force fresh PR verification, alongside automatic selection. |
| `updated_at` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
verificationProjectScenario, err := client.VerificationProjectScenario(nil).Load(map[string]any{"id": "verification_project_scenario_id", "organization_id": "organization_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(verificationProjectScenario.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
verificationProjectScenarios, err := client.VerificationProjectScenario(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range verificationProjectScenarios.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.VerificationProjectScenario(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerifyAppDomain

Create an instance: `verifyAppDomain := client.VerifyAppDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```go
result, err := client.VerifyAppDomain(nil).Create(map[string]any{
    "app_id": "example_app_id",
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerifyBrowserSession

Create an instance: `verifyBrowserSession := client.VerifyBrowserSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `viewer_url` | `any` | Owner-only bearer link. |

#### Example: Load

```go
verifyBrowserSession, err := client.VerifyBrowserSession(nil).Load(map[string]any{"id": "verify_browser_session_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(verifyBrowserSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.VerifyBrowserSession(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "project_id": "example_project_id",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerifyEmailVerification

Create an instance: `verifyEmailVerification := client.VerifyEmailVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
verifyEmailVerification, err := client.VerifyEmailVerification(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(verifyEmailVerification.(sdk.Entity).Data()) // the loaded entity's record
```


### VerifySignalIntegration

Create an instance: `verifySignalIntegration := client.VerifySignalIntegration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token_stored` | `bool` |  |
| `config` | `map[string]any` |  |
| `created_at` | `any` |  |
| `failure_message` | `any` |  |
| `id` | `string` | Public id (`sint_…`). |
| `inbound_path` | `string` |  |
| `inbound_url` | `string` | The absolute URL to paste into the provider's webhook configuration. |
| `last_received_at` | `any` |  |
| `last_verified_at` | `any` |  |
| `mode` | `string` | `connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential. |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `provider` | `string` |  |
| `rejected_signature_count` | `int` | Deliveries rejected for a bad or missing signature. |
| `status` | `string` |  |
| `target_count` | `int` |  |
| `unmapped_delivery_count` | `int` | Deliveries accepted whose provider resource matched no enabled target. |
| `updated_at` | `any` |  |
| `webhook_secret_stored` | `bool` |  |

#### Example: Create

```go
result, err := client.VerifySignalIntegration(nil).Create(map[string]any{
    "id": "example_id",
    "organization_id": "example_organization_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VerifyStaticSiteDomain

Create an instance: `verifyStaticSiteDomain := client.VerifyStaticSiteDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_environment_id` | `any` |  |
| `app_service_id` | `any` |  |
| `created_at` | `string` |  |
| `dns_mode` | `string` |  |
| `dns_status` | `string` |  |
| `failure_message` | `any` |  |
| `hosted_app_id` | `any` |  |
| `hostname` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` |  |
| `last_checked_at` | `any` |  |
| `record_name` | `any` |  |
| `record_type` | `any` |  |
| `record_value` | `any` |  |
| `redirect_to` | `any` |  |
| `static_site_id` | `any` |  |
| `target_kind` | `string` |  |
| `tls_status` | `string` |  |
| `updated_at` | `string` |  |
| `verification_status` | `string` |  |

#### Example: Create

```go
result, err := client.VerifyStaticSiteDomain(nil).Create(map[string]any{
    "id": "example_id",
    "static_site_id": "example_static_site_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### VersionLog

Create an instance: `versionLog := client.VersionLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_image` | `string` |  |
| `failure_phase` | `any` |  |
| `id` | `string` |  |
| `image_digest` | `any` |  |
| `image_reference` | `any` |  |
| `installer_version` | `string` |  |
| `ready_at` | `any` |  |
| `receipt` | `any` |  |
| `safe_error` | `any` |  |
| `started_at` | `any` |  |
| `status` | `string` |  |

#### Example: List

```go
versionLogs, err := client.VersionLog(nil).List(map[string]any{"binary_id": "example", "organization_id": "example", "version_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range versionLogs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### WaitlistApplication

Create an instance: `waitlistApplication := client.WaitlistApplication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.WaitlistApplication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WebBotAuth

Create an instance: `webBotAuth := client.WebBotAuth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `expires_at` | `string` |  |
| `origin` | `string` |  |
| `signatures` | `[]any` |  |

#### Example: Create

```go
result, err := client.WebBotAuth(nil).Create(map[string]any{
    "origin": "example_origin",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WebhookGitlab

Create an instance: `webhookGitlab := client.WebhookGitlab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStep

Create an instance: `workflowRunStep := client.WorkflowRunStep(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowRunStopNotice

Create an instance: `workflowRunStopNotice := client.WorkflowRunStopNotice(nil)`


### WorkflowTriggerSkipped

Create an instance: `workflowTriggerSkipped := client.WorkflowTriggerSkipped(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceActivity

Create an instance: `workspaceActivity := client.WorkspaceActivity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `live_activity` | `[]any` |  |
| `recent_items` | `[]any` |  |
| `unresolved_notification_count` | `int` |  |

#### Example: Load

```go
workspaceActivity, err := client.WorkspaceActivity(nil).Load(map[string]any{"organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspaceActivity.(sdk.Entity).Data()) // the loaded entity's record
```


### WorkspaceActivityNotification

Create an instance: `workspaceActivityNotification := client.WorkspaceActivityNotification(nil)`

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkspaceSpace

Create an instance: `workspaceSpace := client.WorkspaceSpace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_branch` | `string` |  |
| `description` | `any` |  |
| `hidden` | `bool` |  |
| `icon_name` | `string` |  |
| `id` | `string` |  |
| `import_status` | `any` |  |
| `name` | `string` |  |
| `organization_id` | `string` |  |
| `position` | `any` |  |
| `repository_id` | `string` |  |
| `repository_slug` | `string` |  |
| `slug` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
workspaceSpace, err := client.WorkspaceSpace(nil).Load(map[string]any{"id": "workspace_space_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspaceSpace.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
workspaceSpaces, err := client.WorkspaceSpace(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range workspaceSpaces.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.WorkspaceSpace(nil).Create(map[string]any{
    "organization_id": "example_organization_id",
    "icon_name": "example_icon_name",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### WorkspaceSpacePreference

Create an instance: `workspaceSpacePreference := client.WorkspaceSpacePreference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `preferences` | `[]any` |  |
| `spaces` | `[]any` |  |

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/composal-sdk/go/
├── composal.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/composal-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
githubonboarding := client.GithubOnboarding(nil)
githubonboarding.Load(map[string]any{"organization_id": "example"}, nil)

// githubonboarding.Data() now returns the githubonboarding data from the last load
// githubonboarding.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
