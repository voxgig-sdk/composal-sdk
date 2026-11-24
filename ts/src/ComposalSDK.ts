// Composal Ts SDK

import { AgentEntity } from './entity/AgentEntity'
import { AgentAttachmentEntity } from './entity/AgentAttachmentEntity'
import { AgentAutomationEntity } from './entity/AgentAutomationEntity'
import { AgentAvatarEntity } from './entity/AgentAvatarEntity'
import { AgentCommandEntity } from './entity/AgentCommandEntity'
import { AgentComputerEntity } from './entity/AgentComputerEntity'
import { AgentConnectionEntity } from './entity/AgentConnectionEntity'
import { AgentControlFlowEntity } from './entity/AgentControlFlowEntity'
import { AgentCoordinationEntity } from './entity/AgentCoordinationEntity'
import { AgentEmailEntity } from './entity/AgentEmailEntity'
import { AgentFileEntity } from './entity/AgentFileEntity'
import { AgentInputEntity } from './entity/AgentInputEntity'
import { AgentIntegrationEntity } from './entity/AgentIntegrationEntity'
import { AgentInteractionEntity } from './entity/AgentInteractionEntity'
import { AgentLibraryEntity } from './entity/AgentLibraryEntity'
import { AgentManagerEntity } from './entity/AgentManagerEntity'
import { AgentManagerChoiceEntity } from './entity/AgentManagerChoiceEntity'
import { AgentMarketplaceEntity } from './entity/AgentMarketplaceEntity'
import { AgentMarketplaceSharedEntity } from './entity/AgentMarketplaceSharedEntity'
import { AgentMissionControlEntity } from './entity/AgentMissionControlEntity'
import { AgentOperationEntity } from './entity/AgentOperationEntity'
import { AgentProvisioningEntity } from './entity/AgentProvisioningEntity'
import { AgentPullRequestEntity } from './entity/AgentPullRequestEntity'
import { AgentQuestionEntity } from './entity/AgentQuestionEntity'
import { AgentRepositoryEntity } from './entity/AgentRepositoryEntity'
import { AgentResourceEntity } from './entity/AgentResourceEntity'
import { AgentRoutineEntity } from './entity/AgentRoutineEntity'
import { AgentRunEntity } from './entity/AgentRunEntity'
import { AgentRuntimeEntity } from './entity/AgentRuntimeEntity'
import { AgentSettingEntity } from './entity/AgentSettingEntity'
import { AgentSharingEntity } from './entity/AgentSharingEntity'
import { AgentSiteEntity } from './entity/AgentSiteEntity'
import { AgentSkillEntity } from './entity/AgentSkillEntity'
import { AgentSlackEntity } from './entity/AgentSlackEntity'
import { AgentSubagentEntity } from './entity/AgentSubagentEntity'
import { AgentSubscriptionEntity } from './entity/AgentSubscriptionEntity'
import { AgentTeammateEntity } from './entity/AgentTeammateEntity'
import { AgentTerminalEntity } from './entity/AgentTerminalEntity'
import { AgentThreadEntity } from './entity/AgentThreadEntity'
import { AgentToolEntity } from './entity/AgentToolEntity'
import { AgentVerifyProjectEntity } from './entity/AgentVerifyProjectEntity'
import { AgentWaitEntity } from './entity/AgentWaitEntity'
import { AgentWebhookEntity } from './entity/AgentWebhookEntity'
import { AgentWorkEntity } from './entity/AgentWorkEntity'
import { AgentWorkflowEntity } from './entity/AgentWorkflowEntity'
import { AgentWorkflowProposalEntity } from './entity/AgentWorkflowProposalEntity'
import { AgentWorkflowRunEntity } from './entity/AgentWorkflowRunEntity'
import { AgentWorkflowTriggerEntity } from './entity/AgentWorkflowTriggerEntity'
import { AgentWorkspaceEntity } from './entity/AgentWorkspaceEntity'
import { AgentWritePermissionEntity } from './entity/AgentWritePermissionEntity'
import { AllocationLogEntity } from './entity/AllocationLogEntity'
import { AppEntity } from './entity/AppEntity'
import { AppCdnEntity } from './entity/AppCdnEntity'
import { AppConfigVariableEntity } from './entity/AppConfigVariableEntity'
import { AppDataResourceEntity } from './entity/AppDataResourceEntity'
import { AppDeployEntity } from './entity/AppDeployEntity'
import { AppDeploymentEntity } from './entity/AppDeploymentEntity'
import { AppDeploymentOperationEntity } from './entity/AppDeploymentOperationEntity'
import { AppDeploymentRollbackEntity } from './entity/AppDeploymentRollbackEntity'
import { AppEnvironmentEntity } from './entity/AppEnvironmentEntity'
import { AppLocationEntity } from './entity/AppLocationEntity'
import { AppMetricEntity } from './entity/AppMetricEntity'
import { AppPreviewEntity } from './entity/AppPreviewEntity'
import { AppPreviewProfileEntity } from './entity/AppPreviewProfileEntity'
import { AppRunEntity } from './entity/AppRunEntity'
import { AppSecretEntity } from './entity/AppSecretEntity'
import { AppServiceEntity } from './entity/AppServiceEntity'
import { AppServiceBindingEntity } from './entity/AppServiceBindingEntity'
import { AppServicePlacementEntity } from './entity/AppServicePlacementEntity'
import { AppStorageResourceEntity } from './entity/AppStorageResourceEntity'
import { AttachmentPartEntity } from './entity/AttachmentPartEntity'
import { AutomationEventEntity } from './entity/AutomationEventEntity'
import { AutomationRunEntity } from './entity/AutomationRunEntity'
import { BinaryEntity } from './entity/BinaryEntity'
import { BinaryVersionEntity } from './entity/BinaryVersionEntity'
import { BrowserEgressCandidateEntity } from './entity/BrowserEgressCandidateEntity'
import { BrowserSessionEntity } from './entity/BrowserSessionEntity'
import { BrowserSessionConnectionEntity } from './entity/BrowserSessionConnectionEntity'
import { BrowserSessionControlEntity } from './entity/BrowserSessionControlEntity'
import { BrowserSessionEventEntity } from './entity/BrowserSessionEventEntity'
import { BrowserSessionMediaEntity } from './entity/BrowserSessionMediaEntity'
import { BrowserSessionRecordingEntity } from './entity/BrowserSessionRecordingEntity'
import { BrowserSessionScreenshotEntity } from './entity/BrowserSessionScreenshotEntity'
import { BrowserSessionTaskEntity } from './entity/BrowserSessionTaskEntity'
import { CatalogSelectorEntity } from './entity/CatalogSelectorEntity'
import { CdnDeploymentEntity } from './entity/CdnDeploymentEntity'
import { CdnHostnameEntity } from './entity/CdnHostnameEntity'
import { CdnSpaceEntity } from './entity/CdnSpaceEntity'
import { CdnSpaceObjectEntity } from './entity/CdnSpaceObjectEntity'
import { ConnectionRequestEntity } from './entity/ConnectionRequestEntity'
import { ConnectionSourceEntity } from './entity/ConnectionSourceEntity'
import { CoordinationWaitEntity } from './entity/CoordinationWaitEntity'
import { CredentialSignInCheckEntity } from './entity/CredentialSignInCheckEntity'
import { DataResourceRotateCredentialEntity } from './entity/DataResourceRotateCredentialEntity'
import { DeepScanEntity } from './entity/DeepScanEntity'
import { DeepScanFindingEntity } from './entity/DeepScanFindingEntity'
import { DeepScanFlowEntity } from './entity/DeepScanFlowEntity'
import { DeepScanMappedFlowEntity } from './entity/DeepScanMappedFlowEntity'
import { DeepScanOptionEntity } from './entity/DeepScanOptionEntity'
import { DemoShareEntity } from './entity/DemoShareEntity'
import { DemoShareSegmentEntity } from './entity/DemoShareSegmentEntity'
import { DeploymentDashboardNomadEntity } from './entity/DeploymentDashboardNomadEntity'
import { DeploymentFileEntity } from './entity/DeploymentFileEntity'
import { DomainPathRuleEntity } from './entity/DomainPathRuleEntity'
import { DreamEntity } from './entity/DreamEntity'
import { EnvironmentEntity } from './entity/EnvironmentEntity'
import { EnvironmentDiscoveryRunEntity } from './entity/EnvironmentDiscoveryRunEntity'
import { EnvironmentExplorationEntity } from './entity/EnvironmentExplorationEntity'
import { EnvironmentFirstRunEntity } from './entity/EnvironmentFirstRunEntity'
import { EnvironmentRevisionEntity } from './entity/EnvironmentRevisionEntity'
import { EnvironmentSecretBindingEntity } from './entity/EnvironmentSecretBindingEntity'
import { EnvironmentTestAccountEntity } from './entity/EnvironmentTestAccountEntity'
import { EvidenceEntity } from './entity/EvidenceEntity'
import { ExplorationEntity } from './entity/ExplorationEntity'
import { ExplorationMessageEntity } from './entity/ExplorationMessageEntity'
import { ExplorationReportEntity } from './entity/ExplorationReportEntity'
import { ExplorationScenarioEntity } from './entity/ExplorationScenarioEntity'
import { FindingEntity } from './entity/FindingEntity'
import { GithubConnectionEntity } from './entity/GithubConnectionEntity'
import { HostingAppDomainEntity } from './entity/HostingAppDomainEntity'
import { ImageRepositoryEntity } from './entity/ImageRepositoryEntity'
import { IntegrationEntity } from './entity/IntegrationEntity'
import { InteractionResponseEntity } from './entity/InteractionResponseEntity'
import { InvitationEntity } from './entity/InvitationEntity'
import { JourneyVariantReplayEntity } from './entity/JourneyVariantReplayEntity'
import { KnowledgeEntity } from './entity/KnowledgeEntity'
import { LocalThreadDeliveryEntity } from './entity/LocalThreadDeliveryEntity'
import { LocalThreadOperationEntity } from './entity/LocalThreadOperationEntity'
import { LocationEntity } from './entity/LocationEntity'
import { MeEntity } from './entity/MeEntity'
import { MeEmailEntity } from './entity/MeEmailEntity'
import { MeOnboardingEntity } from './entity/MeOnboardingEntity'
import { MediaFileEntity } from './entity/MediaFileEntity'
import { MemberEntity } from './entity/MemberEntity'
import { MemoryEntity } from './entity/MemoryEntity'
import { MergeRequestEntity } from './entity/MergeRequestEntity'
import { MessagingConversationMessageEntity } from './entity/MessagingConversationMessageEntity'
import { MessagingConversationUploadEntity } from './entity/MessagingConversationUploadEntity'
import { MetricQueryEntity } from './entity/MetricQueryEntity'
import { NetworkConnectionEntity } from './entity/NetworkConnectionEntity'
import { NomadAllocationEntity } from './entity/NomadAllocationEntity'
import { NomadLogEntity } from './entity/NomadLogEntity'
import { OrganizationEntity } from './entity/OrganizationEntity'
import { PageEntity } from './entity/PageEntity'
import { PageAgentEntity } from './entity/PageAgentEntity'
import { PageProjectRunEntity } from './entity/PageProjectRunEntity'
import { PagesProjectCredentialEntity } from './entity/PagesProjectCredentialEntity'
import { PagesProjectPersonaEntity } from './entity/PagesProjectPersonaEntity'
import { PagesProjectRunEntity } from './entity/PagesProjectRunEntity'
import { PagesProjectScenarioEntity } from './entity/PagesProjectScenarioEntity'
import { PersonalAccessTokenEntity } from './entity/PersonalAccessTokenEntity'
import { PreviewOperationEntity } from './entity/PreviewOperationEntity'
import { PreviewProfileSecretBindingEntity } from './entity/PreviewProfileSecretBindingEntity'
import { PreviewSecretEntity } from './entity/PreviewSecretEntity'
import { PreviewSharingApprovalEntity } from './entity/PreviewSharingApprovalEntity'
import { ProductMapIdentityDecisionEntity } from './entity/ProductMapIdentityDecisionEntity'
import { ProductMapJourneyEntity } from './entity/ProductMapJourneyEntity'
import { ProductMapJourneyReplayEntity } from './entity/ProductMapJourneyReplayEntity'
import { ProductMapObservationEntity } from './entity/ProductMapObservationEntity'
import { ProductMapQuestionEntity } from './entity/ProductMapQuestionEntity'
import { ProductMapStateEntity } from './entity/ProductMapStateEntity'
import { ProjectEntity } from './entity/ProjectEntity'
import { ProjectAndroidApkEntity } from './entity/ProjectAndroidApkEntity'
import { ProjectCodeMapEntity } from './entity/ProjectCodeMapEntity'
import { ProjectEnvironmentEntity } from './entity/ProjectEnvironmentEntity'
import { ProjectFindingEntity } from './entity/ProjectFindingEntity'
import { ProjectFixtureEntity } from './entity/ProjectFixtureEntity'
import { ProjectIosAppEntity } from './entity/ProjectIosAppEntity'
import { ProjectMessagingConversationEntity } from './entity/ProjectMessagingConversationEntity'
import { ProjectOverviewMetricEntity } from './entity/ProjectOverviewMetricEntity'
import { ProjectOverviewPullRequestEntity } from './entity/ProjectOverviewPullRequestEntity'
import { ProjectProductMapEntity } from './entity/ProjectProductMapEntity'
import { ProjectRecordingEntity } from './entity/ProjectRecordingEntity'
import { ProjectRunPlanEntity } from './entity/ProjectRunPlanEntity'
import { ProjectRunScheduleEntity } from './entity/ProjectRunScheduleEntity'
import { ProjectScenarioOptionEntity } from './entity/ProjectScenarioOptionEntity'
import { ProjectScenarioRowEntity } from './entity/ProjectScenarioRowEntity'
import { ProjectSettingEntity } from './entity/ProjectSettingEntity'
import { PullRequestEntity } from './entity/PullRequestEntity'
import { PullRequestSettingEntity } from './entity/PullRequestSettingEntity'
import { PullRequestSettingAddRepositoryEntity } from './entity/PullRequestSettingAddRepositoryEntity'
import { PullRequestSettingDetectCommentEntity } from './entity/PullRequestSettingDetectCommentEntity'
import { RecorderEntity } from './entity/RecorderEntity'
import { RegistryEntity } from './entity/RegistryEntity'
import { RegistryV2Entity } from './entity/RegistryV2Entity'
import { RelayAgentLocalThreadEntity } from './entity/RelayAgentLocalThreadEntity'
import { ReportReplayEntity } from './entity/ReportReplayEntity'
import { ReportScenarioEntity } from './entity/ReportScenarioEntity'
import { RunScenarioRunEntity } from './entity/RunScenarioRunEntity'
import { RunScheduleOptionEntity } from './entity/RunScheduleOptionEntity'
import { RunSearchEntity } from './entity/RunSearchEntity'
import { RunUpdateEntity } from './entity/RunUpdateEntity'
import { ScenarioRevisionEntity } from './entity/ScenarioRevisionEntity'
import { ScenarioRunLessonEntity } from './entity/ScenarioRunLessonEntity'
import { ScenarioRunScenarioEditEntity } from './entity/ScenarioRunScenarioEditEntity'
import { ServiceEndpointEntity } from './entity/ServiceEndpointEntity'
import { SitePreviewEntity } from './entity/SitePreviewEntity'
import { SlackChannelEntity } from './entity/SlackChannelEntity'
import { SparkAgentLocalThreadEntity } from './entity/SparkAgentLocalThreadEntity'
import { StaticSiteEntity } from './entity/StaticSiteEntity'
import { StaticSiteDeploymentEntity } from './entity/StaticSiteDeploymentEntity'
import { StaticSiteDomainEntity } from './entity/StaticSiteDomainEntity'
import { SubscriptionModelEntity } from './entity/SubscriptionModelEntity'
import { ThreadPreviewEntity } from './entity/ThreadPreviewEntity'
import { VerificationProjectCredentialEntity } from './entity/VerificationProjectCredentialEntity'
import { VerificationProjectPersonaEntity } from './entity/VerificationProjectPersonaEntity'
import { VerificationProjectRunEntity } from './entity/VerificationProjectRunEntity'
import { VerificationProjectScenarioEntity } from './entity/VerificationProjectScenarioEntity'
import { VerifyAppDomainEntity } from './entity/VerifyAppDomainEntity'
import { VerifyBrowserSessionEntity } from './entity/VerifyBrowserSessionEntity'
import { VerifyStaticSiteDomainEntity } from './entity/VerifyStaticSiteDomainEntity'
import { VersionLogEntity } from './entity/VersionLogEntity'
import { WebBotAuthEntity } from './entity/WebBotAuthEntity'
import { WorkflowRunStepEntity } from './entity/WorkflowRunStepEntity'
import { WorkflowRunStopNoticeEntity } from './entity/WorkflowRunStopNoticeEntity'
import { WorkflowTriggerSkippedEntity } from './entity/WorkflowTriggerSkippedEntity'

export type * from './ComposalTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ComposalEntityBase } from './ComposalEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'
import * as sekreto from './feature/secrets/sekreto'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class ComposalSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  _secrets?: any


  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  
secrets() {
  return this._secrets && this._secrets.sekreto()
}



  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method,
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // A raw request has no point to declare its response type, so it asks
    // for the JSON it reads: an API that negotiates on Accept otherwise
    // answers in its own default format. A caller's own accept wins.
    if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
      spec.headers.accept = 'application/json'
    }

    
if (null != this._secrets) {
  try {
    await this._secrets.resolve()
  }
  catch (err: any) {
    return err instanceof Error ? err : new Error(String(err))
  }
}


    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('ComposalSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('ComposalSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('ComposalSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Agent(entopts?: Record<string, any>) {
    const self = this
    return new AgentEntity(self, entopts)
  }


  // Entity access: `client.AgentAttachment().list()` / `client.AgentAttachment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentAttachment(entopts?: Record<string, any>) {
    const self = this
    return new AgentAttachmentEntity(self, entopts)
  }


  // Entity access: `client.AgentAutomation().list()` / `client.AgentAutomation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentAutomation(entopts?: Record<string, any>) {
    const self = this
    return new AgentAutomationEntity(self, entopts)
  }


  // Entity access: `client.AgentAvatar().list()` / `client.AgentAvatar().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentAvatar(entopts?: Record<string, any>) {
    const self = this
    return new AgentAvatarEntity(self, entopts)
  }


  // Entity access: `client.AgentCommand().list()` / `client.AgentCommand().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentCommand(entopts?: Record<string, any>) {
    const self = this
    return new AgentCommandEntity(self, entopts)
  }


  // Entity access: `client.AgentComputer().list()` / `client.AgentComputer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentComputer(entopts?: Record<string, any>) {
    const self = this
    return new AgentComputerEntity(self, entopts)
  }


  // Entity access: `client.AgentConnection().list()` / `client.AgentConnection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentConnection(entopts?: Record<string, any>) {
    const self = this
    return new AgentConnectionEntity(self, entopts)
  }


  // Entity access: `client.AgentControlFlow().list()` / `client.AgentControlFlow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentControlFlow(entopts?: Record<string, any>) {
    const self = this
    return new AgentControlFlowEntity(self, entopts)
  }


  // Entity access: `client.AgentCoordination().list()` / `client.AgentCoordination().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentCoordination(entopts?: Record<string, any>) {
    const self = this
    return new AgentCoordinationEntity(self, entopts)
  }


  // Entity access: `client.AgentEmail().list()` / `client.AgentEmail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentEmail(entopts?: Record<string, any>) {
    const self = this
    return new AgentEmailEntity(self, entopts)
  }


  // Entity access: `client.AgentFile().list()` / `client.AgentFile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentFile(entopts?: Record<string, any>) {
    const self = this
    return new AgentFileEntity(self, entopts)
  }


  // Entity access: `client.AgentInput().list()` / `client.AgentInput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentInput(entopts?: Record<string, any>) {
    const self = this
    return new AgentInputEntity(self, entopts)
  }


  // Entity access: `client.AgentIntegration().list()` / `client.AgentIntegration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentIntegration(entopts?: Record<string, any>) {
    const self = this
    return new AgentIntegrationEntity(self, entopts)
  }


  // Entity access: `client.AgentInteraction().list()` / `client.AgentInteraction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentInteraction(entopts?: Record<string, any>) {
    const self = this
    return new AgentInteractionEntity(self, entopts)
  }


  // Entity access: `client.AgentLibrary().list()` / `client.AgentLibrary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentLibrary(entopts?: Record<string, any>) {
    const self = this
    return new AgentLibraryEntity(self, entopts)
  }


  // Entity access: `client.AgentManager().list()` / `client.AgentManager().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentManager(entopts?: Record<string, any>) {
    const self = this
    return new AgentManagerEntity(self, entopts)
  }


  // Entity access: `client.AgentManagerChoice().list()` / `client.AgentManagerChoice().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentManagerChoice(entopts?: Record<string, any>) {
    const self = this
    return new AgentManagerChoiceEntity(self, entopts)
  }


  // Entity access: `client.AgentMarketplace().list()` / `client.AgentMarketplace().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentMarketplace(entopts?: Record<string, any>) {
    const self = this
    return new AgentMarketplaceEntity(self, entopts)
  }


  // Entity access: `client.AgentMarketplaceShared().list()` / `client.AgentMarketplaceShared().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentMarketplaceShared(entopts?: Record<string, any>) {
    const self = this
    return new AgentMarketplaceSharedEntity(self, entopts)
  }


  // Entity access: `client.AgentMissionControl().list()` / `client.AgentMissionControl().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentMissionControl(entopts?: Record<string, any>) {
    const self = this
    return new AgentMissionControlEntity(self, entopts)
  }


  // Entity access: `client.AgentOperation().list()` / `client.AgentOperation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentOperation(entopts?: Record<string, any>) {
    const self = this
    return new AgentOperationEntity(self, entopts)
  }


  // Entity access: `client.AgentProvisioning().list()` / `client.AgentProvisioning().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentProvisioning(entopts?: Record<string, any>) {
    const self = this
    return new AgentProvisioningEntity(self, entopts)
  }


  // Entity access: `client.AgentPullRequest().list()` / `client.AgentPullRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentPullRequest(entopts?: Record<string, any>) {
    const self = this
    return new AgentPullRequestEntity(self, entopts)
  }


  // Entity access: `client.AgentQuestion().list()` / `client.AgentQuestion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentQuestion(entopts?: Record<string, any>) {
    const self = this
    return new AgentQuestionEntity(self, entopts)
  }


  // Entity access: `client.AgentRepository().list()` / `client.AgentRepository().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentRepository(entopts?: Record<string, any>) {
    const self = this
    return new AgentRepositoryEntity(self, entopts)
  }


  // Entity access: `client.AgentResource().list()` / `client.AgentResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentResource(entopts?: Record<string, any>) {
    const self = this
    return new AgentResourceEntity(self, entopts)
  }


  // Entity access: `client.AgentRoutine().list()` / `client.AgentRoutine().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentRoutine(entopts?: Record<string, any>) {
    const self = this
    return new AgentRoutineEntity(self, entopts)
  }


  // Entity access: `client.AgentRun().list()` / `client.AgentRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentRun(entopts?: Record<string, any>) {
    const self = this
    return new AgentRunEntity(self, entopts)
  }


  // Entity access: `client.AgentRuntime().list()` / `client.AgentRuntime().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentRuntime(entopts?: Record<string, any>) {
    const self = this
    return new AgentRuntimeEntity(self, entopts)
  }


  // Entity access: `client.AgentSetting().list()` / `client.AgentSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSetting(entopts?: Record<string, any>) {
    const self = this
    return new AgentSettingEntity(self, entopts)
  }


  // Entity access: `client.AgentSharing().list()` / `client.AgentSharing().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSharing(entopts?: Record<string, any>) {
    const self = this
    return new AgentSharingEntity(self, entopts)
  }


  // Entity access: `client.AgentSite().list()` / `client.AgentSite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSite(entopts?: Record<string, any>) {
    const self = this
    return new AgentSiteEntity(self, entopts)
  }


  // Entity access: `client.AgentSkill().list()` / `client.AgentSkill().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSkill(entopts?: Record<string, any>) {
    const self = this
    return new AgentSkillEntity(self, entopts)
  }


  // Entity access: `client.AgentSlack().list()` / `client.AgentSlack().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSlack(entopts?: Record<string, any>) {
    const self = this
    return new AgentSlackEntity(self, entopts)
  }


  // Entity access: `client.AgentSubagent().list()` / `client.AgentSubagent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSubagent(entopts?: Record<string, any>) {
    const self = this
    return new AgentSubagentEntity(self, entopts)
  }


  // Entity access: `client.AgentSubscription().list()` / `client.AgentSubscription().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentSubscription(entopts?: Record<string, any>) {
    const self = this
    return new AgentSubscriptionEntity(self, entopts)
  }


  // Entity access: `client.AgentTeammate().list()` / `client.AgentTeammate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentTeammate(entopts?: Record<string, any>) {
    const self = this
    return new AgentTeammateEntity(self, entopts)
  }


  // Entity access: `client.AgentTerminal().list()` / `client.AgentTerminal().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentTerminal(entopts?: Record<string, any>) {
    const self = this
    return new AgentTerminalEntity(self, entopts)
  }


  // Entity access: `client.AgentThread().list()` / `client.AgentThread().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentThread(entopts?: Record<string, any>) {
    const self = this
    return new AgentThreadEntity(self, entopts)
  }


  // Entity access: `client.AgentTool().list()` / `client.AgentTool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentTool(entopts?: Record<string, any>) {
    const self = this
    return new AgentToolEntity(self, entopts)
  }


  // Entity access: `client.AgentVerifyProject().list()` / `client.AgentVerifyProject().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentVerifyProject(entopts?: Record<string, any>) {
    const self = this
    return new AgentVerifyProjectEntity(self, entopts)
  }


  // Entity access: `client.AgentWait().list()` / `client.AgentWait().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWait(entopts?: Record<string, any>) {
    const self = this
    return new AgentWaitEntity(self, entopts)
  }


  // Entity access: `client.AgentWebhook().list()` / `client.AgentWebhook().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWebhook(entopts?: Record<string, any>) {
    const self = this
    return new AgentWebhookEntity(self, entopts)
  }


  // Entity access: `client.AgentWork().list()` / `client.AgentWork().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWork(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkEntity(self, entopts)
  }


  // Entity access: `client.AgentWorkflow().list()` / `client.AgentWorkflow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWorkflow(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkflowEntity(self, entopts)
  }


  // Entity access: `client.AgentWorkflowProposal().list()` / `client.AgentWorkflowProposal().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWorkflowProposal(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkflowProposalEntity(self, entopts)
  }


  // Entity access: `client.AgentWorkflowRun().list()` / `client.AgentWorkflowRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWorkflowRun(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkflowRunEntity(self, entopts)
  }


  // Entity access: `client.AgentWorkflowTrigger().list()` / `client.AgentWorkflowTrigger().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWorkflowTrigger(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkflowTriggerEntity(self, entopts)
  }


  // Entity access: `client.AgentWorkspace().list()` / `client.AgentWorkspace().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWorkspace(entopts?: Record<string, any>) {
    const self = this
    return new AgentWorkspaceEntity(self, entopts)
  }


  // Entity access: `client.AgentWritePermission().list()` / `client.AgentWritePermission().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentWritePermission(entopts?: Record<string, any>) {
    const self = this
    return new AgentWritePermissionEntity(self, entopts)
  }


  // Entity access: `client.AllocationLog().list()` / `client.AllocationLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AllocationLog(entopts?: Record<string, any>) {
    const self = this
    return new AllocationLogEntity(self, entopts)
  }


  // Entity access: `client.App().list()` / `client.App().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  App(entopts?: Record<string, any>) {
    const self = this
    return new AppEntity(self, entopts)
  }


  // Entity access: `client.AppCdn().list()` / `client.AppCdn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppCdn(entopts?: Record<string, any>) {
    const self = this
    return new AppCdnEntity(self, entopts)
  }


  // Entity access: `client.AppConfigVariable().list()` / `client.AppConfigVariable().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppConfigVariable(entopts?: Record<string, any>) {
    const self = this
    return new AppConfigVariableEntity(self, entopts)
  }


  // Entity access: `client.AppDataResource().list()` / `client.AppDataResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppDataResource(entopts?: Record<string, any>) {
    const self = this
    return new AppDataResourceEntity(self, entopts)
  }


  // Entity access: `client.AppDeploy().list()` / `client.AppDeploy().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppDeploy(entopts?: Record<string, any>) {
    const self = this
    return new AppDeployEntity(self, entopts)
  }


  // Entity access: `client.AppDeployment().list()` / `client.AppDeployment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppDeployment(entopts?: Record<string, any>) {
    const self = this
    return new AppDeploymentEntity(self, entopts)
  }


  // Entity access: `client.AppDeploymentOperation().list()` / `client.AppDeploymentOperation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppDeploymentOperation(entopts?: Record<string, any>) {
    const self = this
    return new AppDeploymentOperationEntity(self, entopts)
  }


  // Entity access: `client.AppDeploymentRollback().list()` / `client.AppDeploymentRollback().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppDeploymentRollback(entopts?: Record<string, any>) {
    const self = this
    return new AppDeploymentRollbackEntity(self, entopts)
  }


  // Entity access: `client.AppEnvironment().list()` / `client.AppEnvironment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppEnvironment(entopts?: Record<string, any>) {
    const self = this
    return new AppEnvironmentEntity(self, entopts)
  }


  // Entity access: `client.AppLocation().list()` / `client.AppLocation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppLocation(entopts?: Record<string, any>) {
    const self = this
    return new AppLocationEntity(self, entopts)
  }


  // Entity access: `client.AppMetric().list()` / `client.AppMetric().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppMetric(entopts?: Record<string, any>) {
    const self = this
    return new AppMetricEntity(self, entopts)
  }


  // Entity access: `client.AppPreview().list()` / `client.AppPreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppPreview(entopts?: Record<string, any>) {
    const self = this
    return new AppPreviewEntity(self, entopts)
  }


  // Entity access: `client.AppPreviewProfile().list()` / `client.AppPreviewProfile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppPreviewProfile(entopts?: Record<string, any>) {
    const self = this
    return new AppPreviewProfileEntity(self, entopts)
  }


  // Entity access: `client.AppRun().list()` / `client.AppRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppRun(entopts?: Record<string, any>) {
    const self = this
    return new AppRunEntity(self, entopts)
  }


  // Entity access: `client.AppSecret().list()` / `client.AppSecret().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppSecret(entopts?: Record<string, any>) {
    const self = this
    return new AppSecretEntity(self, entopts)
  }


  // Entity access: `client.AppService().list()` / `client.AppService().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppService(entopts?: Record<string, any>) {
    const self = this
    return new AppServiceEntity(self, entopts)
  }


  // Entity access: `client.AppServiceBinding().list()` / `client.AppServiceBinding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppServiceBinding(entopts?: Record<string, any>) {
    const self = this
    return new AppServiceBindingEntity(self, entopts)
  }


  // Entity access: `client.AppServicePlacement().list()` / `client.AppServicePlacement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppServicePlacement(entopts?: Record<string, any>) {
    const self = this
    return new AppServicePlacementEntity(self, entopts)
  }


  // Entity access: `client.AppStorageResource().list()` / `client.AppStorageResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppStorageResource(entopts?: Record<string, any>) {
    const self = this
    return new AppStorageResourceEntity(self, entopts)
  }


  // Entity access: `client.AttachmentPart().list()` / `client.AttachmentPart().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AttachmentPart(entopts?: Record<string, any>) {
    const self = this
    return new AttachmentPartEntity(self, entopts)
  }


  // Entity access: `client.AutomationEvent().list()` / `client.AutomationEvent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AutomationEvent(entopts?: Record<string, any>) {
    const self = this
    return new AutomationEventEntity(self, entopts)
  }


  // Entity access: `client.AutomationRun().list()` / `client.AutomationRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AutomationRun(entopts?: Record<string, any>) {
    const self = this
    return new AutomationRunEntity(self, entopts)
  }


  // Entity access: `client.Binary().list()` / `client.Binary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Binary(entopts?: Record<string, any>) {
    const self = this
    return new BinaryEntity(self, entopts)
  }


  // Entity access: `client.BinaryVersion().list()` / `client.BinaryVersion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BinaryVersion(entopts?: Record<string, any>) {
    const self = this
    return new BinaryVersionEntity(self, entopts)
  }


  // Entity access: `client.BrowserEgressCandidate().list()` / `client.BrowserEgressCandidate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserEgressCandidate(entopts?: Record<string, any>) {
    const self = this
    return new BrowserEgressCandidateEntity(self, entopts)
  }


  // Entity access: `client.BrowserSession().list()` / `client.BrowserSession().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSession(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionConnection().list()` / `client.BrowserSessionConnection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionConnection(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionConnectionEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionControl().list()` / `client.BrowserSessionControl().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionControl(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionControlEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionEvent().list()` / `client.BrowserSessionEvent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionEvent(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionEventEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionMedia().list()` / `client.BrowserSessionMedia().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionMedia(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionMediaEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionRecording().list()` / `client.BrowserSessionRecording().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionRecording(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionRecordingEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionScreenshot().list()` / `client.BrowserSessionScreenshot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionScreenshot(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionScreenshotEntity(self, entopts)
  }


  // Entity access: `client.BrowserSessionTask().list()` / `client.BrowserSessionTask().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BrowserSessionTask(entopts?: Record<string, any>) {
    const self = this
    return new BrowserSessionTaskEntity(self, entopts)
  }


  // Entity access: `client.CatalogSelector().list()` / `client.CatalogSelector().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CatalogSelector(entopts?: Record<string, any>) {
    const self = this
    return new CatalogSelectorEntity(self, entopts)
  }


  // Entity access: `client.CdnDeployment().list()` / `client.CdnDeployment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CdnDeployment(entopts?: Record<string, any>) {
    const self = this
    return new CdnDeploymentEntity(self, entopts)
  }


  // Entity access: `client.CdnHostname().list()` / `client.CdnHostname().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CdnHostname(entopts?: Record<string, any>) {
    const self = this
    return new CdnHostnameEntity(self, entopts)
  }


  // Entity access: `client.CdnSpace().list()` / `client.CdnSpace().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CdnSpace(entopts?: Record<string, any>) {
    const self = this
    return new CdnSpaceEntity(self, entopts)
  }


  // Entity access: `client.CdnSpaceObject().list()` / `client.CdnSpaceObject().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CdnSpaceObject(entopts?: Record<string, any>) {
    const self = this
    return new CdnSpaceObjectEntity(self, entopts)
  }


  // Entity access: `client.ConnectionRequest().list()` / `client.ConnectionRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ConnectionRequest(entopts?: Record<string, any>) {
    const self = this
    return new ConnectionRequestEntity(self, entopts)
  }


  // Entity access: `client.ConnectionSource().list()` / `client.ConnectionSource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ConnectionSource(entopts?: Record<string, any>) {
    const self = this
    return new ConnectionSourceEntity(self, entopts)
  }


  // Entity access: `client.CoordinationWait().list()` / `client.CoordinationWait().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CoordinationWait(entopts?: Record<string, any>) {
    const self = this
    return new CoordinationWaitEntity(self, entopts)
  }


  // Entity access: `client.CredentialSignInCheck().list()` / `client.CredentialSignInCheck().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CredentialSignInCheck(entopts?: Record<string, any>) {
    const self = this
    return new CredentialSignInCheckEntity(self, entopts)
  }


  // Entity access: `client.DataResourceRotateCredential().list()` / `client.DataResourceRotateCredential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DataResourceRotateCredential(entopts?: Record<string, any>) {
    const self = this
    return new DataResourceRotateCredentialEntity(self, entopts)
  }


  // Entity access: `client.DeepScan().list()` / `client.DeepScan().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeepScan(entopts?: Record<string, any>) {
    const self = this
    return new DeepScanEntity(self, entopts)
  }


  // Entity access: `client.DeepScanFinding().list()` / `client.DeepScanFinding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeepScanFinding(entopts?: Record<string, any>) {
    const self = this
    return new DeepScanFindingEntity(self, entopts)
  }


  // Entity access: `client.DeepScanFlow().list()` / `client.DeepScanFlow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeepScanFlow(entopts?: Record<string, any>) {
    const self = this
    return new DeepScanFlowEntity(self, entopts)
  }


  // Entity access: `client.DeepScanMappedFlow().list()` / `client.DeepScanMappedFlow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeepScanMappedFlow(entopts?: Record<string, any>) {
    const self = this
    return new DeepScanMappedFlowEntity(self, entopts)
  }


  // Entity access: `client.DeepScanOption().list()` / `client.DeepScanOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeepScanOption(entopts?: Record<string, any>) {
    const self = this
    return new DeepScanOptionEntity(self, entopts)
  }


  // Entity access: `client.DemoShare().list()` / `client.DemoShare().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DemoShare(entopts?: Record<string, any>) {
    const self = this
    return new DemoShareEntity(self, entopts)
  }


  // Entity access: `client.DemoShareSegment().list()` / `client.DemoShareSegment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DemoShareSegment(entopts?: Record<string, any>) {
    const self = this
    return new DemoShareSegmentEntity(self, entopts)
  }


  // Entity access: `client.DeploymentDashboardNomad().list()` / `client.DeploymentDashboardNomad().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeploymentDashboardNomad(entopts?: Record<string, any>) {
    const self = this
    return new DeploymentDashboardNomadEntity(self, entopts)
  }


  // Entity access: `client.DeploymentFile().list()` / `client.DeploymentFile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeploymentFile(entopts?: Record<string, any>) {
    const self = this
    return new DeploymentFileEntity(self, entopts)
  }


  // Entity access: `client.DomainPathRule().list()` / `client.DomainPathRule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainPathRule(entopts?: Record<string, any>) {
    const self = this
    return new DomainPathRuleEntity(self, entopts)
  }


  // Entity access: `client.Dream().list()` / `client.Dream().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Dream(entopts?: Record<string, any>) {
    const self = this
    return new DreamEntity(self, entopts)
  }


  // Entity access: `client.Environment().list()` / `client.Environment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Environment(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentDiscoveryRun().list()` / `client.EnvironmentDiscoveryRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentDiscoveryRun(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentDiscoveryRunEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentExploration().list()` / `client.EnvironmentExploration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentExploration(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentExplorationEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentFirstRun().list()` / `client.EnvironmentFirstRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentFirstRun(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentFirstRunEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentRevision().list()` / `client.EnvironmentRevision().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentRevision(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentRevisionEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentSecretBinding().list()` / `client.EnvironmentSecretBinding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentSecretBinding(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentSecretBindingEntity(self, entopts)
  }


  // Entity access: `client.EnvironmentTestAccount().list()` / `client.EnvironmentTestAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EnvironmentTestAccount(entopts?: Record<string, any>) {
    const self = this
    return new EnvironmentTestAccountEntity(self, entopts)
  }


  // Entity access: `client.Evidence().list()` / `client.Evidence().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Evidence(entopts?: Record<string, any>) {
    const self = this
    return new EvidenceEntity(self, entopts)
  }


  // Entity access: `client.Exploration().list()` / `client.Exploration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Exploration(entopts?: Record<string, any>) {
    const self = this
    return new ExplorationEntity(self, entopts)
  }


  // Entity access: `client.ExplorationMessage().list()` / `client.ExplorationMessage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ExplorationMessage(entopts?: Record<string, any>) {
    const self = this
    return new ExplorationMessageEntity(self, entopts)
  }


  // Entity access: `client.ExplorationReport().list()` / `client.ExplorationReport().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ExplorationReport(entopts?: Record<string, any>) {
    const self = this
    return new ExplorationReportEntity(self, entopts)
  }


  // Entity access: `client.ExplorationScenario().list()` / `client.ExplorationScenario().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ExplorationScenario(entopts?: Record<string, any>) {
    const self = this
    return new ExplorationScenarioEntity(self, entopts)
  }


  // Entity access: `client.Finding().list()` / `client.Finding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Finding(entopts?: Record<string, any>) {
    const self = this
    return new FindingEntity(self, entopts)
  }


  // Entity access: `client.GithubConnection().list()` / `client.GithubConnection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GithubConnection(entopts?: Record<string, any>) {
    const self = this
    return new GithubConnectionEntity(self, entopts)
  }


  // Entity access: `client.HostingAppDomain().list()` / `client.HostingAppDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HostingAppDomain(entopts?: Record<string, any>) {
    const self = this
    return new HostingAppDomainEntity(self, entopts)
  }


  // Entity access: `client.ImageRepository().list()` / `client.ImageRepository().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ImageRepository(entopts?: Record<string, any>) {
    const self = this
    return new ImageRepositoryEntity(self, entopts)
  }


  // Entity access: `client.Integration().list()` / `client.Integration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Integration(entopts?: Record<string, any>) {
    const self = this
    return new IntegrationEntity(self, entopts)
  }


  // Entity access: `client.InteractionResponse().list()` / `client.InteractionResponse().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InteractionResponse(entopts?: Record<string, any>) {
    const self = this
    return new InteractionResponseEntity(self, entopts)
  }


  // Entity access: `client.Invitation().list()` / `client.Invitation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Invitation(entopts?: Record<string, any>) {
    const self = this
    return new InvitationEntity(self, entopts)
  }


  // Entity access: `client.JourneyVariantReplay().list()` / `client.JourneyVariantReplay().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  JourneyVariantReplay(entopts?: Record<string, any>) {
    const self = this
    return new JourneyVariantReplayEntity(self, entopts)
  }


  // Entity access: `client.Knowledge().list()` / `client.Knowledge().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Knowledge(entopts?: Record<string, any>) {
    const self = this
    return new KnowledgeEntity(self, entopts)
  }


  // Entity access: `client.LocalThreadDelivery().list()` / `client.LocalThreadDelivery().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LocalThreadDelivery(entopts?: Record<string, any>) {
    const self = this
    return new LocalThreadDeliveryEntity(self, entopts)
  }


  // Entity access: `client.LocalThreadOperation().list()` / `client.LocalThreadOperation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LocalThreadOperation(entopts?: Record<string, any>) {
    const self = this
    return new LocalThreadOperationEntity(self, entopts)
  }


  // Entity access: `client.Location().list()` / `client.Location().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Location(entopts?: Record<string, any>) {
    const self = this
    return new LocationEntity(self, entopts)
  }


  // Entity access: `client.Me().list()` / `client.Me().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Me(entopts?: Record<string, any>) {
    const self = this
    return new MeEntity(self, entopts)
  }


  // Entity access: `client.MeEmail().list()` / `client.MeEmail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MeEmail(entopts?: Record<string, any>) {
    const self = this
    return new MeEmailEntity(self, entopts)
  }


  // Entity access: `client.MeOnboarding().list()` / `client.MeOnboarding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MeOnboarding(entopts?: Record<string, any>) {
    const self = this
    return new MeOnboardingEntity(self, entopts)
  }


  // Entity access: `client.MediaFile().list()` / `client.MediaFile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MediaFile(entopts?: Record<string, any>) {
    const self = this
    return new MediaFileEntity(self, entopts)
  }


  // Entity access: `client.Member().list()` / `client.Member().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Member(entopts?: Record<string, any>) {
    const self = this
    return new MemberEntity(self, entopts)
  }


  // Entity access: `client.Memory().list()` / `client.Memory().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Memory(entopts?: Record<string, any>) {
    const self = this
    return new MemoryEntity(self, entopts)
  }


  // Entity access: `client.MergeRequest().list()` / `client.MergeRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MergeRequest(entopts?: Record<string, any>) {
    const self = this
    return new MergeRequestEntity(self, entopts)
  }


  // Entity access: `client.MessagingConversationMessage().list()` / `client.MessagingConversationMessage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MessagingConversationMessage(entopts?: Record<string, any>) {
    const self = this
    return new MessagingConversationMessageEntity(self, entopts)
  }


  // Entity access: `client.MessagingConversationUpload().list()` / `client.MessagingConversationUpload().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MessagingConversationUpload(entopts?: Record<string, any>) {
    const self = this
    return new MessagingConversationUploadEntity(self, entopts)
  }


  // Entity access: `client.MetricQuery().list()` / `client.MetricQuery().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MetricQuery(entopts?: Record<string, any>) {
    const self = this
    return new MetricQueryEntity(self, entopts)
  }


  // Entity access: `client.NetworkConnection().list()` / `client.NetworkConnection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NetworkConnection(entopts?: Record<string, any>) {
    const self = this
    return new NetworkConnectionEntity(self, entopts)
  }


  // Entity access: `client.NomadAllocation().list()` / `client.NomadAllocation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NomadAllocation(entopts?: Record<string, any>) {
    const self = this
    return new NomadAllocationEntity(self, entopts)
  }


  // Entity access: `client.NomadLog().list()` / `client.NomadLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NomadLog(entopts?: Record<string, any>) {
    const self = this
    return new NomadLogEntity(self, entopts)
  }


  // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Organization(entopts?: Record<string, any>) {
    const self = this
    return new OrganizationEntity(self, entopts)
  }


  // Entity access: `client.Page().list()` / `client.Page().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Page(entopts?: Record<string, any>) {
    const self = this
    return new PageEntity(self, entopts)
  }


  // Entity access: `client.PageAgent().list()` / `client.PageAgent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PageAgent(entopts?: Record<string, any>) {
    const self = this
    return new PageAgentEntity(self, entopts)
  }


  // Entity access: `client.PageProjectRun().list()` / `client.PageProjectRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PageProjectRun(entopts?: Record<string, any>) {
    const self = this
    return new PageProjectRunEntity(self, entopts)
  }


  // Entity access: `client.PagesProjectCredential().list()` / `client.PagesProjectCredential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PagesProjectCredential(entopts?: Record<string, any>) {
    const self = this
    return new PagesProjectCredentialEntity(self, entopts)
  }


  // Entity access: `client.PagesProjectPersona().list()` / `client.PagesProjectPersona().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PagesProjectPersona(entopts?: Record<string, any>) {
    const self = this
    return new PagesProjectPersonaEntity(self, entopts)
  }


  // Entity access: `client.PagesProjectRun().list()` / `client.PagesProjectRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PagesProjectRun(entopts?: Record<string, any>) {
    const self = this
    return new PagesProjectRunEntity(self, entopts)
  }


  // Entity access: `client.PagesProjectScenario().list()` / `client.PagesProjectScenario().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PagesProjectScenario(entopts?: Record<string, any>) {
    const self = this
    return new PagesProjectScenarioEntity(self, entopts)
  }


  // Entity access: `client.PersonalAccessToken().list()` / `client.PersonalAccessToken().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PersonalAccessToken(entopts?: Record<string, any>) {
    const self = this
    return new PersonalAccessTokenEntity(self, entopts)
  }


  // Entity access: `client.PreviewOperation().list()` / `client.PreviewOperation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PreviewOperation(entopts?: Record<string, any>) {
    const self = this
    return new PreviewOperationEntity(self, entopts)
  }


  // Entity access: `client.PreviewProfileSecretBinding().list()` / `client.PreviewProfileSecretBinding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PreviewProfileSecretBinding(entopts?: Record<string, any>) {
    const self = this
    return new PreviewProfileSecretBindingEntity(self, entopts)
  }


  // Entity access: `client.PreviewSecret().list()` / `client.PreviewSecret().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PreviewSecret(entopts?: Record<string, any>) {
    const self = this
    return new PreviewSecretEntity(self, entopts)
  }


  // Entity access: `client.PreviewSharingApproval().list()` / `client.PreviewSharingApproval().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PreviewSharingApproval(entopts?: Record<string, any>) {
    const self = this
    return new PreviewSharingApprovalEntity(self, entopts)
  }


  // Entity access: `client.ProductMapIdentityDecision().list()` / `client.ProductMapIdentityDecision().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapIdentityDecision(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapIdentityDecisionEntity(self, entopts)
  }


  // Entity access: `client.ProductMapJourney().list()` / `client.ProductMapJourney().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapJourney(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapJourneyEntity(self, entopts)
  }


  // Entity access: `client.ProductMapJourneyReplay().list()` / `client.ProductMapJourneyReplay().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapJourneyReplay(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapJourneyReplayEntity(self, entopts)
  }


  // Entity access: `client.ProductMapObservation().list()` / `client.ProductMapObservation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapObservation(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapObservationEntity(self, entopts)
  }


  // Entity access: `client.ProductMapQuestion().list()` / `client.ProductMapQuestion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapQuestion(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapQuestionEntity(self, entopts)
  }


  // Entity access: `client.ProductMapState().list()` / `client.ProductMapState().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProductMapState(entopts?: Record<string, any>) {
    const self = this
    return new ProductMapStateEntity(self, entopts)
  }


  // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Project(entopts?: Record<string, any>) {
    const self = this
    return new ProjectEntity(self, entopts)
  }


  // Entity access: `client.ProjectAndroidApk().list()` / `client.ProjectAndroidApk().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectAndroidApk(entopts?: Record<string, any>) {
    const self = this
    return new ProjectAndroidApkEntity(self, entopts)
  }


  // Entity access: `client.ProjectCodeMap().list()` / `client.ProjectCodeMap().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectCodeMap(entopts?: Record<string, any>) {
    const self = this
    return new ProjectCodeMapEntity(self, entopts)
  }


  // Entity access: `client.ProjectEnvironment().list()` / `client.ProjectEnvironment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectEnvironment(entopts?: Record<string, any>) {
    const self = this
    return new ProjectEnvironmentEntity(self, entopts)
  }


  // Entity access: `client.ProjectFinding().list()` / `client.ProjectFinding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectFinding(entopts?: Record<string, any>) {
    const self = this
    return new ProjectFindingEntity(self, entopts)
  }


  // Entity access: `client.ProjectFixture().list()` / `client.ProjectFixture().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectFixture(entopts?: Record<string, any>) {
    const self = this
    return new ProjectFixtureEntity(self, entopts)
  }


  // Entity access: `client.ProjectIosApp().list()` / `client.ProjectIosApp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectIosApp(entopts?: Record<string, any>) {
    const self = this
    return new ProjectIosAppEntity(self, entopts)
  }


  // Entity access: `client.ProjectMessagingConversation().list()` / `client.ProjectMessagingConversation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectMessagingConversation(entopts?: Record<string, any>) {
    const self = this
    return new ProjectMessagingConversationEntity(self, entopts)
  }


  // Entity access: `client.ProjectOverviewMetric().list()` / `client.ProjectOverviewMetric().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectOverviewMetric(entopts?: Record<string, any>) {
    const self = this
    return new ProjectOverviewMetricEntity(self, entopts)
  }


  // Entity access: `client.ProjectOverviewPullRequest().list()` / `client.ProjectOverviewPullRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectOverviewPullRequest(entopts?: Record<string, any>) {
    const self = this
    return new ProjectOverviewPullRequestEntity(self, entopts)
  }


  // Entity access: `client.ProjectProductMap().list()` / `client.ProjectProductMap().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectProductMap(entopts?: Record<string, any>) {
    const self = this
    return new ProjectProductMapEntity(self, entopts)
  }


  // Entity access: `client.ProjectRecording().list()` / `client.ProjectRecording().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectRecording(entopts?: Record<string, any>) {
    const self = this
    return new ProjectRecordingEntity(self, entopts)
  }


  // Entity access: `client.ProjectRunPlan().list()` / `client.ProjectRunPlan().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectRunPlan(entopts?: Record<string, any>) {
    const self = this
    return new ProjectRunPlanEntity(self, entopts)
  }


  // Entity access: `client.ProjectRunSchedule().list()` / `client.ProjectRunSchedule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectRunSchedule(entopts?: Record<string, any>) {
    const self = this
    return new ProjectRunScheduleEntity(self, entopts)
  }


  // Entity access: `client.ProjectScenarioOption().list()` / `client.ProjectScenarioOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectScenarioOption(entopts?: Record<string, any>) {
    const self = this
    return new ProjectScenarioOptionEntity(self, entopts)
  }


  // Entity access: `client.ProjectScenarioRow().list()` / `client.ProjectScenarioRow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectScenarioRow(entopts?: Record<string, any>) {
    const self = this
    return new ProjectScenarioRowEntity(self, entopts)
  }


  // Entity access: `client.ProjectSetting().list()` / `client.ProjectSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectSetting(entopts?: Record<string, any>) {
    const self = this
    return new ProjectSettingEntity(self, entopts)
  }


  // Entity access: `client.PullRequest().list()` / `client.PullRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PullRequest(entopts?: Record<string, any>) {
    const self = this
    return new PullRequestEntity(self, entopts)
  }


  // Entity access: `client.PullRequestSetting().list()` / `client.PullRequestSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PullRequestSetting(entopts?: Record<string, any>) {
    const self = this
    return new PullRequestSettingEntity(self, entopts)
  }


  // Entity access: `client.PullRequestSettingAddRepository().list()` / `client.PullRequestSettingAddRepository().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PullRequestSettingAddRepository(entopts?: Record<string, any>) {
    const self = this
    return new PullRequestSettingAddRepositoryEntity(self, entopts)
  }


  // Entity access: `client.PullRequestSettingDetectComment().list()` / `client.PullRequestSettingDetectComment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PullRequestSettingDetectComment(entopts?: Record<string, any>) {
    const self = this
    return new PullRequestSettingDetectCommentEntity(self, entopts)
  }


  // Entity access: `client.Recorder().list()` / `client.Recorder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Recorder(entopts?: Record<string, any>) {
    const self = this
    return new RecorderEntity(self, entopts)
  }


  // Entity access: `client.Registry().list()` / `client.Registry().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Registry(entopts?: Record<string, any>) {
    const self = this
    return new RegistryEntity(self, entopts)
  }


  // Entity access: `client.RegistryV2().list()` / `client.RegistryV2().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RegistryV2(entopts?: Record<string, any>) {
    const self = this
    return new RegistryV2Entity(self, entopts)
  }


  // Entity access: `client.RelayAgentLocalThread().list()` / `client.RelayAgentLocalThread().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RelayAgentLocalThread(entopts?: Record<string, any>) {
    const self = this
    return new RelayAgentLocalThreadEntity(self, entopts)
  }


  // Entity access: `client.ReportReplay().list()` / `client.ReportReplay().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReportReplay(entopts?: Record<string, any>) {
    const self = this
    return new ReportReplayEntity(self, entopts)
  }


  // Entity access: `client.ReportScenario().list()` / `client.ReportScenario().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReportScenario(entopts?: Record<string, any>) {
    const self = this
    return new ReportScenarioEntity(self, entopts)
  }


  // Entity access: `client.RunScenarioRun().list()` / `client.RunScenarioRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RunScenarioRun(entopts?: Record<string, any>) {
    const self = this
    return new RunScenarioRunEntity(self, entopts)
  }


  // Entity access: `client.RunScheduleOption().list()` / `client.RunScheduleOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RunScheduleOption(entopts?: Record<string, any>) {
    const self = this
    return new RunScheduleOptionEntity(self, entopts)
  }


  // Entity access: `client.RunSearch().list()` / `client.RunSearch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RunSearch(entopts?: Record<string, any>) {
    const self = this
    return new RunSearchEntity(self, entopts)
  }


  // Entity access: `client.RunUpdate().list()` / `client.RunUpdate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RunUpdate(entopts?: Record<string, any>) {
    const self = this
    return new RunUpdateEntity(self, entopts)
  }


  // Entity access: `client.ScenarioRevision().list()` / `client.ScenarioRevision().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScenarioRevision(entopts?: Record<string, any>) {
    const self = this
    return new ScenarioRevisionEntity(self, entopts)
  }


  // Entity access: `client.ScenarioRunLesson().list()` / `client.ScenarioRunLesson().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScenarioRunLesson(entopts?: Record<string, any>) {
    const self = this
    return new ScenarioRunLessonEntity(self, entopts)
  }


  // Entity access: `client.ScenarioRunScenarioEdit().list()` / `client.ScenarioRunScenarioEdit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScenarioRunScenarioEdit(entopts?: Record<string, any>) {
    const self = this
    return new ScenarioRunScenarioEditEntity(self, entopts)
  }


  // Entity access: `client.ServiceEndpoint().list()` / `client.ServiceEndpoint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ServiceEndpoint(entopts?: Record<string, any>) {
    const self = this
    return new ServiceEndpointEntity(self, entopts)
  }


  // Entity access: `client.SitePreview().list()` / `client.SitePreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SitePreview(entopts?: Record<string, any>) {
    const self = this
    return new SitePreviewEntity(self, entopts)
  }


  // Entity access: `client.SlackChannel().list()` / `client.SlackChannel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SlackChannel(entopts?: Record<string, any>) {
    const self = this
    return new SlackChannelEntity(self, entopts)
  }


  // Entity access: `client.SparkAgentLocalThread().list()` / `client.SparkAgentLocalThread().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SparkAgentLocalThread(entopts?: Record<string, any>) {
    const self = this
    return new SparkAgentLocalThreadEntity(self, entopts)
  }


  // Entity access: `client.StaticSite().list()` / `client.StaticSite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  StaticSite(entopts?: Record<string, any>) {
    const self = this
    return new StaticSiteEntity(self, entopts)
  }


  // Entity access: `client.StaticSiteDeployment().list()` / `client.StaticSiteDeployment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  StaticSiteDeployment(entopts?: Record<string, any>) {
    const self = this
    return new StaticSiteDeploymentEntity(self, entopts)
  }


  // Entity access: `client.StaticSiteDomain().list()` / `client.StaticSiteDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  StaticSiteDomain(entopts?: Record<string, any>) {
    const self = this
    return new StaticSiteDomainEntity(self, entopts)
  }


  // Entity access: `client.SubscriptionModel().list()` / `client.SubscriptionModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SubscriptionModel(entopts?: Record<string, any>) {
    const self = this
    return new SubscriptionModelEntity(self, entopts)
  }


  // Entity access: `client.ThreadPreview().list()` / `client.ThreadPreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ThreadPreview(entopts?: Record<string, any>) {
    const self = this
    return new ThreadPreviewEntity(self, entopts)
  }


  // Entity access: `client.VerificationProjectCredential().list()` / `client.VerificationProjectCredential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerificationProjectCredential(entopts?: Record<string, any>) {
    const self = this
    return new VerificationProjectCredentialEntity(self, entopts)
  }


  // Entity access: `client.VerificationProjectPersona().list()` / `client.VerificationProjectPersona().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerificationProjectPersona(entopts?: Record<string, any>) {
    const self = this
    return new VerificationProjectPersonaEntity(self, entopts)
  }


  // Entity access: `client.VerificationProjectRun().list()` / `client.VerificationProjectRun().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerificationProjectRun(entopts?: Record<string, any>) {
    const self = this
    return new VerificationProjectRunEntity(self, entopts)
  }


  // Entity access: `client.VerificationProjectScenario().list()` / `client.VerificationProjectScenario().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerificationProjectScenario(entopts?: Record<string, any>) {
    const self = this
    return new VerificationProjectScenarioEntity(self, entopts)
  }


  // Entity access: `client.VerifyAppDomain().list()` / `client.VerifyAppDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerifyAppDomain(entopts?: Record<string, any>) {
    const self = this
    return new VerifyAppDomainEntity(self, entopts)
  }


  // Entity access: `client.VerifyBrowserSession().list()` / `client.VerifyBrowserSession().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerifyBrowserSession(entopts?: Record<string, any>) {
    const self = this
    return new VerifyBrowserSessionEntity(self, entopts)
  }


  // Entity access: `client.VerifyStaticSiteDomain().list()` / `client.VerifyStaticSiteDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VerifyStaticSiteDomain(entopts?: Record<string, any>) {
    const self = this
    return new VerifyStaticSiteDomainEntity(self, entopts)
  }


  // Entity access: `client.VersionLog().list()` / `client.VersionLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VersionLog(entopts?: Record<string, any>) {
    const self = this
    return new VersionLogEntity(self, entopts)
  }


  // Entity access: `client.WebBotAuth().list()` / `client.WebBotAuth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebBotAuth(entopts?: Record<string, any>) {
    const self = this
    return new WebBotAuthEntity(self, entopts)
  }


  // Entity access: `client.WorkflowRunStep().list()` / `client.WorkflowRunStep().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkflowRunStep(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowRunStepEntity(self, entopts)
  }


  // Entity access: `client.WorkflowRunStopNotice().list()` / `client.WorkflowRunStopNotice().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkflowRunStopNotice(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowRunStopNoticeEntity(self, entopts)
  }


  // Entity access: `client.WorkflowTriggerSkipped().list()` / `client.WorkflowTriggerSkipped().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkflowTriggerSkipped(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowTriggerSkippedEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ComposalSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ComposalSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Composal' }
  }

  toString() {
    return 'Composal ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ComposalSDK


export {
  stdutil,
  config,
  sekreto,


  BaseFeature,
  ComposalEntityBase,

  ComposalSDK,
  SDK,
}


export type { DirectResult }
