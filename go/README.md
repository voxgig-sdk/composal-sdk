# Composal Golang SDK



The Golang SDK for the Composal API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Agent(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Patch`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

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
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/composal-sdk/go"
)

func main() {
    client := sdk.NewComposalSDK(map[string]any{
        "apikey": os.Getenv("COMPOSAL_APIKEY"),
    })

    // List agent records — the value is a []any of entities, one per record.
    agents, err := client.Agent(nil).List(map[string]any{"organization_id": "example"}, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range agents.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }

    // Load a single agent — the value is the entity; Data() reads its record.
    agent, err := client.Agent(nil).Load(map[string]any{"id": "example_id", "organization_id": "example_organization_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(agent.(sdk.Entity).Data())

    // Create a agent.
    created, err := client.Agent(nil).Create(map[string]any{"organization_id": "example_organization_id", "name": "example_name"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())

    // Remove a agent.
    removed, err := client.Agent(nil).Remove(map[string]any{"id": "example_id", "organization_id": "example_organization_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
pageprojectrun, err := client.PageProjectRun(nil).Load(map[string]any{"id": "example_id", "organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = pageprojectrun
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

pageProjectRun, err := client.PageProjectRun(nil).Load(
    map[string]any{"id": "test01", "organization_id": "example", "project_id": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(pageProjectRun.(sdk.Entity).Data()) // the entity's mock record
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
| `Agent` | `(data map[string]any) ComposalEntityBase` | Create an Agent entity instance. |
| `AgentAttachment` | `(data map[string]any) ComposalEntityBase` | Create an AgentAttachment entity instance. |
| `AgentAutomation` | `(data map[string]any) ComposalEntityBase` | Create an AgentAutomation entity instance. |
| `AgentAvatar` | `(data map[string]any) ComposalEntityBase` | Create an AgentAvatar entity instance. |
| `AgentCommand` | `(data map[string]any) ComposalEntityBase` | Create an AgentCommand entity instance. |
| `AgentComputer` | `(data map[string]any) ComposalEntityBase` | Create an AgentComputer entity instance. |
| `AgentConnection` | `(data map[string]any) ComposalEntityBase` | Create an AgentConnection entity instance. |
| `AgentControlFlow` | `(data map[string]any) ComposalEntityBase` | Create an AgentControlFlow entity instance. |
| `AgentCoordination` | `(data map[string]any) ComposalEntityBase` | Create an AgentCoordination entity instance. |
| `AgentEmail` | `(data map[string]any) ComposalEntityBase` | Create an AgentEmail entity instance. |
| `AgentFile` | `(data map[string]any) ComposalEntityBase` | Create an AgentFile entity instance. |
| `AgentInput` | `(data map[string]any) ComposalEntityBase` | Create an AgentInput entity instance. |
| `AgentIntegration` | `(data map[string]any) ComposalEntityBase` | Create an AgentIntegration entity instance. |
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
| `AgentRepository` | `(data map[string]any) ComposalEntityBase` | Create an AgentRepository entity instance. |
| `AgentResource` | `(data map[string]any) ComposalEntityBase` | Create an AgentResource entity instance. |
| `AgentRoutine` | `(data map[string]any) ComposalEntityBase` | Create an AgentRoutine entity instance. |
| `AgentRun` | `(data map[string]any) ComposalEntityBase` | Create an AgentRun entity instance. |
| `AgentRuntime` | `(data map[string]any) ComposalEntityBase` | Create an AgentRuntime entity instance. |
| `AgentSetting` | `(data map[string]any) ComposalEntityBase` | Create an AgentSetting entity instance. |
| `AgentSharing` | `(data map[string]any) ComposalEntityBase` | Create an AgentSharing entity instance. |
| `AgentSite` | `(data map[string]any) ComposalEntityBase` | Create an AgentSite entity instance. |
| `AgentSkill` | `(data map[string]any) ComposalEntityBase` | Create an AgentSkill entity instance. |
| `AgentSlack` | `(data map[string]any) ComposalEntityBase` | Create an AgentSlack entity instance. |
| `AgentSubagent` | `(data map[string]any) ComposalEntityBase` | Create an AgentSubagent entity instance. |
| `AgentSubscription` | `(data map[string]any) ComposalEntityBase` | Create an AgentSubscription entity instance. |
| `AgentTeammate` | `(data map[string]any) ComposalEntityBase` | Create an AgentTeammate entity instance. |
| `AgentTerminal` | `(data map[string]any) ComposalEntityBase` | Create an AgentTerminal entity instance. |
| `AgentThread` | `(data map[string]any) ComposalEntityBase` | Create an AgentThread entity instance. |
| `AgentTool` | `(data map[string]any) ComposalEntityBase` | Create an AgentTool entity instance. |
| `AgentVerifyProject` | `(data map[string]any) ComposalEntityBase` | Create an AgentVerifyProject entity instance. |
| `AgentWait` | `(data map[string]any) ComposalEntityBase` | Create an AgentWait entity instance. |
| `AgentWebhook` | `(data map[string]any) ComposalEntityBase` | Create an AgentWebhook entity instance. |
| `AgentWork` | `(data map[string]any) ComposalEntityBase` | Create an AgentWork entity instance. |
| `AgentWorkflow` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflow entity instance. |
| `AgentWorkflowProposal` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowProposal entity instance. |
| `AgentWorkflowRun` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowRun entity instance. |
| `AgentWorkflowTrigger` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkflowTrigger entity instance. |
| `AgentWorkspace` | `(data map[string]any) ComposalEntityBase` | Create an AgentWorkspace entity instance. |
| `AgentWritePermission` | `(data map[string]any) ComposalEntityBase` | Create an AgentWritePermission entity instance. |
| `AllocationLog` | `(data map[string]any) ComposalEntityBase` | Create an AllocationLog entity instance. |
| `App` | `(data map[string]any) ComposalEntityBase` | Create an App entity instance. |
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
| `AttachmentPart` | `(data map[string]any) ComposalEntityBase` | Create an AttachmentPart entity instance. |
| `AutomationEvent` | `(data map[string]any) ComposalEntityBase` | Create an AutomationEvent entity instance. |
| `AutomationRun` | `(data map[string]any) ComposalEntityBase` | Create an AutomationRun entity instance. |
| `Binary` | `(data map[string]any) ComposalEntityBase` | Create a Binary entity instance. |
| `BinaryVersion` | `(data map[string]any) ComposalEntityBase` | Create a BinaryVersion entity instance. |
| `BrowserEgressCandidate` | `(data map[string]any) ComposalEntityBase` | Create a BrowserEgressCandidate entity instance. |
| `BrowserSession` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSession entity instance. |
| `BrowserSessionConnection` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionConnection entity instance. |
| `BrowserSessionControl` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionControl entity instance. |
| `BrowserSessionEvent` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionEvent entity instance. |
| `BrowserSessionMedia` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionMedia entity instance. |
| `BrowserSessionRecording` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionRecording entity instance. |
| `BrowserSessionScreenshot` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionScreenshot entity instance. |
| `BrowserSessionTask` | `(data map[string]any) ComposalEntityBase` | Create a BrowserSessionTask entity instance. |
| `CatalogSelector` | `(data map[string]any) ComposalEntityBase` | Create a CatalogSelector entity instance. |
| `CdnDeployment` | `(data map[string]any) ComposalEntityBase` | Create a CdnDeployment entity instance. |
| `CdnHostname` | `(data map[string]any) ComposalEntityBase` | Create a CdnHostname entity instance. |
| `CdnSpace` | `(data map[string]any) ComposalEntityBase` | Create a CdnSpace entity instance. |
| `CdnSpaceObject` | `(data map[string]any) ComposalEntityBase` | Create a CdnSpaceObject entity instance. |
| `ConnectionRequest` | `(data map[string]any) ComposalEntityBase` | Create a ConnectionRequest entity instance. |
| `ConnectionSource` | `(data map[string]any) ComposalEntityBase` | Create a ConnectionSource entity instance. |
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
| `DeploymentDashboardNomad` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentDashboardNomad entity instance. |
| `DeploymentFile` | `(data map[string]any) ComposalEntityBase` | Create a DeploymentFile entity instance. |
| `DomainPathRule` | `(data map[string]any) ComposalEntityBase` | Create a DomainPathRule entity instance. |
| `Dream` | `(data map[string]any) ComposalEntityBase` | Create a Dream entity instance. |
| `Environment` | `(data map[string]any) ComposalEntityBase` | Create an Environment entity instance. |
| `EnvironmentDiscoveryRun` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentDiscoveryRun entity instance. |
| `EnvironmentExploration` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentExploration entity instance. |
| `EnvironmentFirstRun` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentFirstRun entity instance. |
| `EnvironmentRevision` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentRevision entity instance. |
| `EnvironmentSecretBinding` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentSecretBinding entity instance. |
| `EnvironmentTestAccount` | `(data map[string]any) ComposalEntityBase` | Create an EnvironmentTestAccount entity instance. |
| `Evidence` | `(data map[string]any) ComposalEntityBase` | Create an Evidence entity instance. |
| `Exploration` | `(data map[string]any) ComposalEntityBase` | Create an Exploration entity instance. |
| `ExplorationMessage` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationMessage entity instance. |
| `ExplorationReport` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationReport entity instance. |
| `ExplorationScenario` | `(data map[string]any) ComposalEntityBase` | Create an ExplorationScenario entity instance. |
| `Finding` | `(data map[string]any) ComposalEntityBase` | Create a Finding entity instance. |
| `GithubConnection` | `(data map[string]any) ComposalEntityBase` | Create a GithubConnection entity instance. |
| `HostingAppDomain` | `(data map[string]any) ComposalEntityBase` | Create a HostingAppDomain entity instance. |
| `ImageRepository` | `(data map[string]any) ComposalEntityBase` | Create an ImageRepository entity instance. |
| `Integration` | `(data map[string]any) ComposalEntityBase` | Create an Integration entity instance. |
| `InteractionResponse` | `(data map[string]any) ComposalEntityBase` | Create an InteractionResponse entity instance. |
| `Invitation` | `(data map[string]any) ComposalEntityBase` | Create an Invitation entity instance. |
| `JourneyVariantReplay` | `(data map[string]any) ComposalEntityBase` | Create a JourneyVariantReplay entity instance. |
| `Knowledge` | `(data map[string]any) ComposalEntityBase` | Create a Knowledge entity instance. |
| `LocalThreadDelivery` | `(data map[string]any) ComposalEntityBase` | Create a LocalThreadDelivery entity instance. |
| `LocalThreadOperation` | `(data map[string]any) ComposalEntityBase` | Create a LocalThreadOperation entity instance. |
| `Location` | `(data map[string]any) ComposalEntityBase` | Create a Location entity instance. |
| `Me` | `(data map[string]any) ComposalEntityBase` | Create a Me entity instance. |
| `MeEmail` | `(data map[string]any) ComposalEntityBase` | Create a MeEmail entity instance. |
| `MeOnboarding` | `(data map[string]any) ComposalEntityBase` | Create a MeOnboarding entity instance. |
| `MediaFile` | `(data map[string]any) ComposalEntityBase` | Create a MediaFile entity instance. |
| `Member` | `(data map[string]any) ComposalEntityBase` | Create a Member entity instance. |
| `Memory` | `(data map[string]any) ComposalEntityBase` | Create a Memory entity instance. |
| `MergeRequest` | `(data map[string]any) ComposalEntityBase` | Create a MergeRequest entity instance. |
| `MessagingConversationMessage` | `(data map[string]any) ComposalEntityBase` | Create a MessagingConversationMessage entity instance. |
| `MessagingConversationUpload` | `(data map[string]any) ComposalEntityBase` | Create a MessagingConversationUpload entity instance. |
| `MetricQuery` | `(data map[string]any) ComposalEntityBase` | Create a MetricQuery entity instance. |
| `NetworkConnection` | `(data map[string]any) ComposalEntityBase` | Create a NetworkConnection entity instance. |
| `NomadAllocation` | `(data map[string]any) ComposalEntityBase` | Create a NomadAllocation entity instance. |
| `NomadLog` | `(data map[string]any) ComposalEntityBase` | Create a NomadLog entity instance. |
| `Organization` | `(data map[string]any) ComposalEntityBase` | Create an Organization entity instance. |
| `Page` | `(data map[string]any) ComposalEntityBase` | Create a Page entity instance. |
| `PageAgent` | `(data map[string]any) ComposalEntityBase` | Create a PageAgent entity instance. |
| `PageProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a PageProjectRun entity instance. |
| `PagesProjectCredential` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectCredential entity instance. |
| `PagesProjectPersona` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectPersona entity instance. |
| `PagesProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectRun entity instance. |
| `PagesProjectScenario` | `(data map[string]any) ComposalEntityBase` | Create a PagesProjectScenario entity instance. |
| `PersonalAccessToken` | `(data map[string]any) ComposalEntityBase` | Create a PersonalAccessToken entity instance. |
| `PreviewOperation` | `(data map[string]any) ComposalEntityBase` | Create a PreviewOperation entity instance. |
| `PreviewProfileSecretBinding` | `(data map[string]any) ComposalEntityBase` | Create a PreviewProfileSecretBinding entity instance. |
| `PreviewSecret` | `(data map[string]any) ComposalEntityBase` | Create a PreviewSecret entity instance. |
| `PreviewSharingApproval` | `(data map[string]any) ComposalEntityBase` | Create a PreviewSharingApproval entity instance. |
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
| `PullRequestSetting` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSetting entity instance. |
| `PullRequestSettingAddRepository` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSettingAddRepository entity instance. |
| `PullRequestSettingDetectComment` | `(data map[string]any) ComposalEntityBase` | Create a PullRequestSettingDetectComment entity instance. |
| `Recorder` | `(data map[string]any) ComposalEntityBase` | Create a Recorder entity instance. |
| `Registry` | `(data map[string]any) ComposalEntityBase` | Create a Registry entity instance. |
| `RegistryV2` | `(data map[string]any) ComposalEntityBase` | Create a RegistryV2 entity instance. |
| `RelayAgentLocalThread` | `(data map[string]any) ComposalEntityBase` | Create a RelayAgentLocalThread entity instance. |
| `ReportReplay` | `(data map[string]any) ComposalEntityBase` | Create a ReportReplay entity instance. |
| `ReportScenario` | `(data map[string]any) ComposalEntityBase` | Create a ReportScenario entity instance. |
| `RunScenarioRun` | `(data map[string]any) ComposalEntityBase` | Create a RunScenarioRun entity instance. |
| `RunScheduleOption` | `(data map[string]any) ComposalEntityBase` | Create a RunScheduleOption entity instance. |
| `RunSearch` | `(data map[string]any) ComposalEntityBase` | Create a RunSearch entity instance. |
| `RunUpdate` | `(data map[string]any) ComposalEntityBase` | Create a RunUpdate entity instance. |
| `ScenarioRevision` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRevision entity instance. |
| `ScenarioRunLesson` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRunLesson entity instance. |
| `ScenarioRunScenarioEdit` | `(data map[string]any) ComposalEntityBase` | Create a ScenarioRunScenarioEdit entity instance. |
| `ServiceEndpoint` | `(data map[string]any) ComposalEntityBase` | Create a ServiceEndpoint entity instance. |
| `SitePreview` | `(data map[string]any) ComposalEntityBase` | Create a SitePreview entity instance. |
| `SlackChannel` | `(data map[string]any) ComposalEntityBase` | Create a SlackChannel entity instance. |
| `SparkAgentLocalThread` | `(data map[string]any) ComposalEntityBase` | Create a SparkAgentLocalThread entity instance. |
| `StaticSite` | `(data map[string]any) ComposalEntityBase` | Create a StaticSite entity instance. |
| `StaticSiteDeployment` | `(data map[string]any) ComposalEntityBase` | Create a StaticSiteDeployment entity instance. |
| `StaticSiteDomain` | `(data map[string]any) ComposalEntityBase` | Create a StaticSiteDomain entity instance. |
| `SubscriptionModel` | `(data map[string]any) ComposalEntityBase` | Create a SubscriptionModel entity instance. |
| `ThreadPreview` | `(data map[string]any) ComposalEntityBase` | Create a ThreadPreview entity instance. |
| `VerificationProjectCredential` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectCredential entity instance. |
| `VerificationProjectPersona` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectPersona entity instance. |
| `VerificationProjectRun` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectRun entity instance. |
| `VerificationProjectScenario` | `(data map[string]any) ComposalEntityBase` | Create a VerificationProjectScenario entity instance. |
| `VerifyAppDomain` | `(data map[string]any) ComposalEntityBase` | Create a VerifyAppDomain entity instance. |
| `VerifyBrowserSession` | `(data map[string]any) ComposalEntityBase` | Create a VerifyBrowserSession entity instance. |
| `VerifyStaticSiteDomain` | `(data map[string]any) ComposalEntityBase` | Create a VerifyStaticSiteDomain entity instance. |
| `VersionLog` | `(data map[string]any) ComposalEntityBase` | Create a VersionLog entity instance. |
| `WebBotAuth` | `(data map[string]any) ComposalEntityBase` | Create a WebBotAuth entity instance. |
| `WorkflowRunStep` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowRunStep entity instance. |
| `WorkflowRunStopNotice` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowRunStopNotice entity instance. |
| `WorkflowTriggerSkipped` | `(data map[string]any) ComposalEntityBase` | Create a WorkflowTriggerSkipped entity instance. |

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

    agent, err := client.Agent(nil).List(map[string]any{"organization_id": "example"}, nil)
    if err != nil { /* handle */ }
    // agent is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

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

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations`

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

Operations: List, Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories`

#### AgentResource

| Field | Description |
| --- | --- |
| `"name"` |  |
| `"uri"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/resources`

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

#### AgentSetting

| Field | Description |
| --- | --- |
| `"can_manage"` |  |
| `"expected_version"` |  |
| `"instructions"` |  |
| `"version"` |  |

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

#### AgentSkill

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

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions`

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
| `"archived_count"` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `"can_create"` |  |
| `"execution"` |  |
| `"first_input"` |  |
| `"first_input_key"` | Idempotency-Key that finds the first message through input_delivery. |
| `"first_input_requester_membership_id"` | Membership the first message was sent as, for input_delivery. |
| `"id"` |  |
| `"inherit_context"` | Include the source conversation through its last completed reply. |
| `"local_activities"` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `"local_archived_count"` | Local Claude Code and Codex threads archived on their computers. |
| `"local_next_cursor"` |  |
| `"local_scope_key"` |  |
| `"local_status_pending"` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `"local_threads"` |  |
| `"main_thread_id"` |  |
| `"message"` | The thread's first message. |
| `"next_cursor"` |  |
| `"parent_conversation_id"` | Optional source conversation belonging to this agent. |
| `"requester_membership_id"` |  |
| `"selected_thread"` |  |
| `"thread"` |  |
| `"threads"` |  |
| `"title"` |  |
| `"total_archived_count"` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive`

#### AgentTool

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"inputSchema"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/tools`

#### AgentVerifyProject

| Field | Description |
| --- | --- |
| `"available"` | Whether Verify is on for the organization; hide Verify access when false. |
| `"can_manage"` | Whether the viewer can manage the agent and is a Verify admin. |
| `"expected_version"` |  |
| `"project_choices"` | Every granted project, then other Verify projects up to the choice limit. |
| `"project_choices_truncated"` |  |
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

Operations: Create, List, Update.

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

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/preview_profiles`

#### AppRun

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"image"` | Optional fully qualified digest-pinned image from the deployed service's registry and repository. |

Operations: Create, List, Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{id}/archive`

#### AppServiceBinding

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive`

#### AttachmentPart

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Update.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}`

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

#### CatalogSelector

| Field | Description |
| --- | --- |
| `"app"` |  |

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/catalog/selectors`

#### CdnDeployment

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, List, Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames`

#### CdnSpace

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/cdn_spaces/{id}/archive`

#### CdnSpaceObject

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: List, Load, Remove, Update.

API path: `/api/v1/cdn_spaces/{cdn_space_id}/objects`

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce`

#### DeepScanFinding

| Field | Description |
| --- | --- |
| `"finding_count"` | Findings at every priority; findings lists only the listed priority. |
| `"finding_ids"` | Original team order used by legacy hash links and rerun indices. |
| `"findings"` |  |
| `"findings_fix_prompt"` |  |
| `"free_findings_pending"` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `"id"` |  |
| `"mode"` |  |
| `"permissions"` |  |
| `"priority"` | The priority findings are narrowed to, or null when they are not narrowed. |
| `"priority_counts"` |  |
| `"project_id"` |  |
| `"reproduction_of"` |  |
| `"reproductions"` | Fresh-browser reruns of this scan's reported bugs. |
| `"reruns_available"` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `"status"` |  |
| `"title"` |  |
| `"unlock"` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `"web_url"` |  |

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

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Remove.

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

#### Exploration

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
| `"persona_id"` | Project persona whose role and observed access this discovery maps. |
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

#### GithubConnection

| Field | Description |
| --- | --- |
| `"accounts"` |  |
| `"github_app_installation_id"` |  |
| `"installations"` |  |
| `"project_id"` | Project slug or public ID the repositories are added to. |
| `"replace"` | Make these the project's only repositories. |
| `"repositories"` |  |

Operations: Create, List.

API path: `/api/v1/organizations/{organization_id}/verify/github_connections`

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/domains/{id}/disable`

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

#### Integration

| Field | Description |
| --- | --- |
| `"github"` |  |
| `"gitlab"` |  |
| `"permissions"` |  |
| `"slack"` |  |

Operations: List.

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

Operations: List.

API path: `/api/v1/hosting/metrics/queries`

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

Operations: List.

API path: `/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/logs`

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

Operations: Create, List, Load.

API path: `/api/v1/organizations/{organization_id}/agents/page/activity`

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
| `"active_count"` |  |
| `"credentials"` |  |
| `"needs_attention_count"` |  |
| `"permissions"` |  |
| `"persona_states"` | Scenarios by the state of their latest execution. |
| `"personas"` |  |
| `"project"` |  |

Operations: List.

API path: `/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas`

#### PagesProjectRun

| Field | Description |
| --- | --- |
| `"environment_query"` |  |
| `"environments"` |  |
| `"environments_has_more"` |  |
| `"pagination"` |  |
| `"runs"` |  |
| `"selected_environment"` |  |

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

#### PersonalAccessToken

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"env_key"` |  |
| `"id"` |  |
| `"mode"` |  |
| `"secret_id"` |  |
| `"secret_version_id"` |  |

Operations: Create, List, Remove.

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

Operations: Create, List.

API path: `/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals`

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
| `"credentials"` |  |
| `"environment_ids"` |  |
| `"environments"` |  |
| `"fixtures"` |  |
| `"id"` |  |
| `"lock_version"` |  |
| `"name"` |  |
| `"pagination"` |  |
| `"permissions"` |  |
| `"persona_ids"` |  |
| `"personas"` |  |
| `"project"` |  |
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
| `"counts"` |  |

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: Create, List.

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

#### RelayAgentLocalThread

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Remove.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/relay`

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

#### ServiceEndpoint

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints`

#### SitePreview

| Field | Description |
| --- | --- |
| `"icon_data_url"` | The site's icon as a data: URL, up to 256 KB |
| `"title"` |  |
| `"url"` | The address as it will be saved |

Operations: Load.

API path: `/api/v1/organizations/{organization_id}/verify/site_preview`

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

#### ThreadPreview

| Field | Description |
| --- | --- |
| `"expires_at"` |  |
| `"port"` |  |
| `"url"` |  |

Operations: Create.

API path: `/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/previews`

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

#### WebBotAuth

| Field | Description |
| --- | --- |
| `"expires_at"` |  |
| `"origin"` |  |
| `"signatures"` |  |

Operations: Create.

API path: `/api/v1/verify/web_bot_auth`

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



## Entities


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
agentConnection, err := client.AgentConnection(nil).Load(map[string]any{"id": "agent_connection_id", "agent_id": "agent_id", "organization_id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentConnection.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
agentConnections, err := client.AgentConnection(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
agentIntegrations, err := client.AgentIntegration(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentIntegrations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentIntegration(nil).Create(map[string]any{
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


### AgentRepository

Create an instance: `agentRepository := client.AgentRepository(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
agentRepositorys, err := client.AgentRepository(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentRepositorys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### AgentSetting

Create an instance: `agentSetting := client.AgentSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `can_manage` | `bool` |  |
| `expected_version` | `string` |  |
| `instructions` | `string` |  |
| `version` | `string` |  |

#### Example: List

```go
agentSettings, err := client.AgentSetting(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSettings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AgentSharing

Create an instance: `agentSharing := client.AgentSharing(nil)`


### AgentSite

Create an instance: `agentSite := client.AgentSite(nil)`

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
agentSites, err := client.AgentSite(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
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
agentSkills, err := client.AgentSkill(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSkills.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentSkill(nil).Create(map[string]any{
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
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: List

```go
agentSubscriptions, err := client.AgentSubscription(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentSubscriptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_count` | `any` | Exact total of archived conversations for this agent, including subagents but excluding workflow task, cron and system sessions. |
| `can_create` | `bool` |  |
| `execution` | `any` |  |
| `first_input` | `any` |  |
| `first_input_key` | `string` | Idempotency-Key that finds the first message through input_delivery. |
| `first_input_requester_membership_id` | `string` | Membership the first message was sent as, for input_delivery. |
| `id` | `string` |  |
| `inherit_context` | `bool` | Include the source conversation through its last completed reply. |
| `local_activities` | `map[string]any` | First page only: states of local threads listed on later pages, by local thread id, so a refresh keeps paged rows current. |
| `local_archived_count` | `int` | Local Claude Code and Codex threads archived on their computers. |
| `local_next_cursor` | `any` |  |
| `local_scope_key` | `any` |  |
| `local_status_pending` | `bool` | A computer is reporting newer local thread statuses; read the page again shortly. |
| `local_threads` | `[]any` |  |
| `main_thread_id` | `string` |  |
| `message` | `string` | The thread's first message. |
| `next_cursor` | `any` |  |
| `parent_conversation_id` | `string` | Optional source conversation belonging to this agent. |
| `requester_membership_id` | `string` |  |
| `selected_thread` | `any` |  |
| `thread` | `map[string]any` |  |
| `threads` | `[]any` |  |
| `title` | `string` |  |
| `total_archived_count` | `any` | archived_count plus local_archived_count, computed by Rails for the Archived heading. |

#### Example: List

```go
agentThreads, err := client.AgentThread(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentThreads.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AgentThread(nil).Create(map[string]any{
    "agent_id": "example_agent_id",
    "organization_id": "example_organization_id",
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
| `project_choices` | `[]any` | Every granted project, then other Verify projects up to the choice limit. |
| `project_choices_truncated` | `bool` |  |
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
agentWorkflows, err := client.AgentWorkflow(nil).List(map[string]any{"agent_id": "example", "organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range agentWorkflows.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### AllocationLog

Create an instance: `allocationLog := client.AllocationLog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

#### Example: List

```go
allocationLogs, err := client.AllocationLog(nil).List(map[string]any{"allocation_id": "example", "app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range allocationLogs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### AppCdn

Create an instance: `appCdn := client.AppCdn(nil)`

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

#### Example: List

```go
appCdns, err := client.AppCdn(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appCdns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

#### Example: List

```go
appConfigVariables, err := client.AppConfigVariable(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appConfigVariables.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

#### Example: List

```go
appDataResources, err := client.AppDataResource(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appDataResources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appDeployments, err := client.AppDeployment(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appDeployments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appEnvironments, err := client.AppEnvironment(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appEnvironments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appPreviews, err := client.AppPreview(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appPreviews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appPreviewProfiles, err := client.AppPreviewProfile(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appPreviewProfiles.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appRuns, err := client.AppRun(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appRuns.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appServices, err := client.AppService(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appServices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appServiceBindings, err := client.AppServiceBinding(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appServiceBindings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
appStorageResources, err := client.AppStorageResource(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range appStorageResources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### CatalogSelector

Create an instance: `catalogSelector := client.CatalogSelector(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `map[string]any` |  |

#### Example: List

```go
catalogSelectors, err := client.CatalogSelector(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range catalogSelectors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### CdnDeployment

Create an instance: `cdnDeployment := client.CdnDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
cdnDeployments, err := client.CdnDeployment(nil).List(map[string]any{"app_id": "example", "cdn_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cdnDeployments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
cdnHostnames, err := client.CdnHostname(nil).List(map[string]any{"app_id": "example", "cdn_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cdnHostnames.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
cdnSpaces, err := client.CdnSpace(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cdnSpaces.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
cdnSpaceObjects, err := client.CdnSpaceObject(nil).List(map[string]any{"cdn_space_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cdnSpaceObjects.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
deepScans, err := client.DeepScan(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deepScans.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `finding_count` | `int` | Findings at every priority; findings lists only the listed priority. |
| `finding_ids` | `[]any` | Original team order used by legacy hash links and rerun indices. |
| `findings` | `[]any` |  |
| `findings_fix_prompt` | `any` |  |
| `free_findings_pending` | `bool` | Whether a scan with locked findings has yet to choose which are free, so every row is locked for now. |
| `id` | `string` |  |
| `mode` | `string` |  |
| `permissions` | `map[string]any` |  |
| `priority` | `any` | The priority findings are narrowed to, or null when they are not narrowed. |
| `priority_counts` | `map[string]any` |  |
| `project_id` | `any` |  |
| `reproduction_of` | `any` |  |
| `reproductions` | `[]any` | Fresh-browser reruns of this scan's reported bugs. |
| `reruns_available` | `bool` | Whether findings can be rerun; a scan with locked findings waits for a paid plan. |
| `status` | `string` |  |
| `title` | `string` |  |
| `unlock` | `map[string]any` | Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one. |
| `web_url` | `string` |  |

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
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `any` |  |
| `environment_id` | `string` |  |
| `flow_map` | `any` |  |
| `revision_id` | `any` |  |

#### Example: List

```go
deepScanMappedFlows, err := client.DeepScanMappedFlow(nil).List(map[string]any{"organization_id": "example", "environment_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range deepScanMappedFlows.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### DeploymentDashboardNomad

Create an instance: `deploymentDashboardNomad := client.DeploymentDashboardNomad(nil)`


### DeploymentFile

Create an instance: `deploymentFile := client.DeploymentFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |


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


### Environment

Create an instance: `environment := client.Environment(nil)`

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

#### Example: List

```go
environments, err := client.Environment(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range environments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
environmentSecretBindings, err := client.EnvironmentSecretBinding(nil).List(map[string]any{"app_id": "example", "environment_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range environmentSecretBindings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `persona_id` | `any` | Project persona whose role and observed access this discovery maps. |
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


### GithubConnection

Create an instance: `githubConnection := client.GithubConnection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
githubConnections, err := client.GithubConnection(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range githubConnections.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### HostingAppDomain

Create an instance: `hostingAppDomain := client.HostingAppDomain(nil)`

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

#### Example: List

```go
hostingAppDomains, err := client.HostingAppDomain(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range hostingAppDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### Integration

Create an instance: `integration := client.Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `github` | `map[string]any` |  |
| `gitlab` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `slack` | `map[string]any` |  |

#### Example: List

```go
integrations, err := client.Integration(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range integrations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
metricQuerys, err := client.MetricQuery(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range metricQuerys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

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

#### Example: List

```go
nomadLogs, err := client.NomadLog(nil).List(map[string]any{"app_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range nomadLogs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

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

#### Example: List

```go
pageAgents, err := client.PageAgent(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pageAgents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `active_count` | `int` |  |
| `credentials` | `[]any` |  |
| `needs_attention_count` | `int` |  |
| `permissions` | `map[string]any` |  |
| `persona_states` | `map[string]any` | Scenarios by the state of their latest execution. |
| `personas` | `[]any` |  |
| `project` | `map[string]any` |  |

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
| `environment_query` | `string` |  |
| `environments` | `[]any` |  |
| `environments_has_more` | `bool` |  |
| `pagination` | `map[string]any` |  |
| `runs` | `[]any` |  |
| `selected_environment` | `any` |  |

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


### PersonalAccessToken

Create an instance: `personalAccessToken := client.PersonalAccessToken(nil)`

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

#### Example: List

```go
personalAccessTokens, err := client.PersonalAccessToken(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range personalAccessTokens.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
previewOperations, err := client.PreviewOperation(nil).List(map[string]any{"app_id": "example", "preview_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range previewOperations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PreviewProfileSecretBinding

Create an instance: `previewProfileSecretBinding := client.PreviewProfileSecretBinding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
previewProfileSecretBindings, err := client.PreviewProfileSecretBinding(nil).List(map[string]any{"app_id": "example", "preview_profile_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range previewProfileSecretBindings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
previewSharingApprovals, err := client.PreviewSharingApproval(nil).List(map[string]any{"app_id": "example", "preview_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range previewSharingApprovals.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `credentials` | `[]any` |  |
| `environment_ids` | `[]any` |  |
| `environments` | `[]any` |  |
| `fixtures` | `[]any` |  |
| `id` | `string` |  |
| `lock_version` | `int` |  |
| `name` | `string` |  |
| `pagination` | `map[string]any` |  |
| `permissions` | `map[string]any` |  |
| `persona_ids` | `[]any` |  |
| `personas` | `[]any` |  |
| `project` | `map[string]any` |  |
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
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `counts` | `map[string]any` |  |

#### Example: List

```go
projectOverviewMetrics, err := client.ProjectOverviewMetric(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectOverviewMetrics.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

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

#### Example: List

```go
projectScenarioOptions, err := client.ProjectScenarioOption(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectScenarioOptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_messaging_environments` | `[]any` |  |
| `messaging_conversations` | `[]any` |  |
| `messaging_enabled` | `bool` |  |
| `permissions` | `map[string]any` |  |
| `project` | `map[string]any` |  |
| `tester_numbers` | `[]any` |  |

#### Example: List

```go
projectSettings, err := client.ProjectSetting(nil).List(map[string]any{"organization_id": "example", "project_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range projectSettings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### PullRequestSetting

Create an instance: `pullRequestSetting := client.PullRequestSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
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

#### Example: List

```go
pullRequestSettings, err := client.PullRequestSetting(nil).List(map[string]any{"organization_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range pullRequestSettings.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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


### ServiceEndpoint

Create an instance: `serviceEndpoint := client.ServiceEndpoint(nil)`

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
| `id` | `string` |  |

#### Example: Load

```go
serviceEndpoint, err := client.ServiceEndpoint(nil).Load(map[string]any{"id": "service_endpoint_id", "app_id": "app_id", "service_id": "service_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(serviceEndpoint.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
serviceEndpoints, err := client.ServiceEndpoint(nil).List(map[string]any{"app_id": "example", "service_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range serviceEndpoints.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
pageprojectrun := client.PageProjectRun(nil)
pageprojectrun.Load(map[string]any{"id": "example_id", "organization_id": "example", "project_id": "example"}, nil)

// pageprojectrun.Data() now returns the pageprojectrun data from the last load
// pageprojectrun.Match() returns the last match criteria
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
