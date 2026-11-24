"use strict";
// Composal Ts SDK
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.ComposalSDK = exports.ComposalEntityBase = exports.BaseFeature = exports.sekreto = exports.config = exports.stdutil = void 0;
const AgentEntity_1 = require("./entity/AgentEntity");
const AgentAttachmentEntity_1 = require("./entity/AgentAttachmentEntity");
const AgentAutomationEntity_1 = require("./entity/AgentAutomationEntity");
const AgentAvatarEntity_1 = require("./entity/AgentAvatarEntity");
const AgentCommandEntity_1 = require("./entity/AgentCommandEntity");
const AgentComputerEntity_1 = require("./entity/AgentComputerEntity");
const AgentConnectionEntity_1 = require("./entity/AgentConnectionEntity");
const AgentControlFlowEntity_1 = require("./entity/AgentControlFlowEntity");
const AgentCoordinationEntity_1 = require("./entity/AgentCoordinationEntity");
const AgentEmailEntity_1 = require("./entity/AgentEmailEntity");
const AgentFileEntity_1 = require("./entity/AgentFileEntity");
const AgentInputEntity_1 = require("./entity/AgentInputEntity");
const AgentIntegrationEntity_1 = require("./entity/AgentIntegrationEntity");
const AgentInteractionEntity_1 = require("./entity/AgentInteractionEntity");
const AgentLibraryEntity_1 = require("./entity/AgentLibraryEntity");
const AgentManagerEntity_1 = require("./entity/AgentManagerEntity");
const AgentManagerChoiceEntity_1 = require("./entity/AgentManagerChoiceEntity");
const AgentMarketplaceEntity_1 = require("./entity/AgentMarketplaceEntity");
const AgentMarketplaceSharedEntity_1 = require("./entity/AgentMarketplaceSharedEntity");
const AgentMissionControlEntity_1 = require("./entity/AgentMissionControlEntity");
const AgentOperationEntity_1 = require("./entity/AgentOperationEntity");
const AgentProvisioningEntity_1 = require("./entity/AgentProvisioningEntity");
const AgentPullRequestEntity_1 = require("./entity/AgentPullRequestEntity");
const AgentQuestionEntity_1 = require("./entity/AgentQuestionEntity");
const AgentRepositoryEntity_1 = require("./entity/AgentRepositoryEntity");
const AgentResourceEntity_1 = require("./entity/AgentResourceEntity");
const AgentRoutineEntity_1 = require("./entity/AgentRoutineEntity");
const AgentRunEntity_1 = require("./entity/AgentRunEntity");
const AgentRuntimeEntity_1 = require("./entity/AgentRuntimeEntity");
const AgentSettingEntity_1 = require("./entity/AgentSettingEntity");
const AgentSharingEntity_1 = require("./entity/AgentSharingEntity");
const AgentSiteEntity_1 = require("./entity/AgentSiteEntity");
const AgentSkillEntity_1 = require("./entity/AgentSkillEntity");
const AgentSlackEntity_1 = require("./entity/AgentSlackEntity");
const AgentSubagentEntity_1 = require("./entity/AgentSubagentEntity");
const AgentSubscriptionEntity_1 = require("./entity/AgentSubscriptionEntity");
const AgentTeammateEntity_1 = require("./entity/AgentTeammateEntity");
const AgentTerminalEntity_1 = require("./entity/AgentTerminalEntity");
const AgentThreadEntity_1 = require("./entity/AgentThreadEntity");
const AgentToolEntity_1 = require("./entity/AgentToolEntity");
const AgentVerifyProjectEntity_1 = require("./entity/AgentVerifyProjectEntity");
const AgentWaitEntity_1 = require("./entity/AgentWaitEntity");
const AgentWebhookEntity_1 = require("./entity/AgentWebhookEntity");
const AgentWorkEntity_1 = require("./entity/AgentWorkEntity");
const AgentWorkflowEntity_1 = require("./entity/AgentWorkflowEntity");
const AgentWorkflowProposalEntity_1 = require("./entity/AgentWorkflowProposalEntity");
const AgentWorkflowRunEntity_1 = require("./entity/AgentWorkflowRunEntity");
const AgentWorkflowTriggerEntity_1 = require("./entity/AgentWorkflowTriggerEntity");
const AgentWorkspaceEntity_1 = require("./entity/AgentWorkspaceEntity");
const AgentWritePermissionEntity_1 = require("./entity/AgentWritePermissionEntity");
const AllocationLogEntity_1 = require("./entity/AllocationLogEntity");
const AppEntity_1 = require("./entity/AppEntity");
const AppCdnEntity_1 = require("./entity/AppCdnEntity");
const AppConfigVariableEntity_1 = require("./entity/AppConfigVariableEntity");
const AppDataResourceEntity_1 = require("./entity/AppDataResourceEntity");
const AppDeployEntity_1 = require("./entity/AppDeployEntity");
const AppDeploymentEntity_1 = require("./entity/AppDeploymentEntity");
const AppDeploymentOperationEntity_1 = require("./entity/AppDeploymentOperationEntity");
const AppDeploymentRollbackEntity_1 = require("./entity/AppDeploymentRollbackEntity");
const AppEnvironmentEntity_1 = require("./entity/AppEnvironmentEntity");
const AppLocationEntity_1 = require("./entity/AppLocationEntity");
const AppMetricEntity_1 = require("./entity/AppMetricEntity");
const AppPreviewEntity_1 = require("./entity/AppPreviewEntity");
const AppPreviewProfileEntity_1 = require("./entity/AppPreviewProfileEntity");
const AppRunEntity_1 = require("./entity/AppRunEntity");
const AppSecretEntity_1 = require("./entity/AppSecretEntity");
const AppServiceEntity_1 = require("./entity/AppServiceEntity");
const AppServiceBindingEntity_1 = require("./entity/AppServiceBindingEntity");
const AppServicePlacementEntity_1 = require("./entity/AppServicePlacementEntity");
const AppStorageResourceEntity_1 = require("./entity/AppStorageResourceEntity");
const AttachmentPartEntity_1 = require("./entity/AttachmentPartEntity");
const AutomationEventEntity_1 = require("./entity/AutomationEventEntity");
const AutomationRunEntity_1 = require("./entity/AutomationRunEntity");
const BinaryEntity_1 = require("./entity/BinaryEntity");
const BinaryVersionEntity_1 = require("./entity/BinaryVersionEntity");
const BrowserEgressCandidateEntity_1 = require("./entity/BrowserEgressCandidateEntity");
const BrowserSessionEntity_1 = require("./entity/BrowserSessionEntity");
const BrowserSessionConnectionEntity_1 = require("./entity/BrowserSessionConnectionEntity");
const BrowserSessionControlEntity_1 = require("./entity/BrowserSessionControlEntity");
const BrowserSessionEventEntity_1 = require("./entity/BrowserSessionEventEntity");
const BrowserSessionMediaEntity_1 = require("./entity/BrowserSessionMediaEntity");
const BrowserSessionRecordingEntity_1 = require("./entity/BrowserSessionRecordingEntity");
const BrowserSessionScreenshotEntity_1 = require("./entity/BrowserSessionScreenshotEntity");
const BrowserSessionTaskEntity_1 = require("./entity/BrowserSessionTaskEntity");
const CatalogSelectorEntity_1 = require("./entity/CatalogSelectorEntity");
const CdnDeploymentEntity_1 = require("./entity/CdnDeploymentEntity");
const CdnHostnameEntity_1 = require("./entity/CdnHostnameEntity");
const CdnSpaceEntity_1 = require("./entity/CdnSpaceEntity");
const CdnSpaceObjectEntity_1 = require("./entity/CdnSpaceObjectEntity");
const ConnectionRequestEntity_1 = require("./entity/ConnectionRequestEntity");
const ConnectionSourceEntity_1 = require("./entity/ConnectionSourceEntity");
const CoordinationWaitEntity_1 = require("./entity/CoordinationWaitEntity");
const CredentialSignInCheckEntity_1 = require("./entity/CredentialSignInCheckEntity");
const DataResourceRotateCredentialEntity_1 = require("./entity/DataResourceRotateCredentialEntity");
const DeepScanEntity_1 = require("./entity/DeepScanEntity");
const DeepScanFindingEntity_1 = require("./entity/DeepScanFindingEntity");
const DeepScanFlowEntity_1 = require("./entity/DeepScanFlowEntity");
const DeepScanMappedFlowEntity_1 = require("./entity/DeepScanMappedFlowEntity");
const DeepScanOptionEntity_1 = require("./entity/DeepScanOptionEntity");
const DemoShareEntity_1 = require("./entity/DemoShareEntity");
const DemoShareSegmentEntity_1 = require("./entity/DemoShareSegmentEntity");
const DeploymentDashboardNomadEntity_1 = require("./entity/DeploymentDashboardNomadEntity");
const DeploymentFileEntity_1 = require("./entity/DeploymentFileEntity");
const DomainPathRuleEntity_1 = require("./entity/DomainPathRuleEntity");
const DreamEntity_1 = require("./entity/DreamEntity");
const EnvironmentEntity_1 = require("./entity/EnvironmentEntity");
const EnvironmentDiscoveryRunEntity_1 = require("./entity/EnvironmentDiscoveryRunEntity");
const EnvironmentExplorationEntity_1 = require("./entity/EnvironmentExplorationEntity");
const EnvironmentFirstRunEntity_1 = require("./entity/EnvironmentFirstRunEntity");
const EnvironmentRevisionEntity_1 = require("./entity/EnvironmentRevisionEntity");
const EnvironmentSecretBindingEntity_1 = require("./entity/EnvironmentSecretBindingEntity");
const EnvironmentTestAccountEntity_1 = require("./entity/EnvironmentTestAccountEntity");
const EvidenceEntity_1 = require("./entity/EvidenceEntity");
const ExplorationEntity_1 = require("./entity/ExplorationEntity");
const ExplorationMessageEntity_1 = require("./entity/ExplorationMessageEntity");
const ExplorationReportEntity_1 = require("./entity/ExplorationReportEntity");
const ExplorationScenarioEntity_1 = require("./entity/ExplorationScenarioEntity");
const FindingEntity_1 = require("./entity/FindingEntity");
const GithubConnectionEntity_1 = require("./entity/GithubConnectionEntity");
const HostingAppDomainEntity_1 = require("./entity/HostingAppDomainEntity");
const ImageRepositoryEntity_1 = require("./entity/ImageRepositoryEntity");
const IntegrationEntity_1 = require("./entity/IntegrationEntity");
const InteractionResponseEntity_1 = require("./entity/InteractionResponseEntity");
const InvitationEntity_1 = require("./entity/InvitationEntity");
const JourneyVariantReplayEntity_1 = require("./entity/JourneyVariantReplayEntity");
const KnowledgeEntity_1 = require("./entity/KnowledgeEntity");
const LocalThreadDeliveryEntity_1 = require("./entity/LocalThreadDeliveryEntity");
const LocalThreadOperationEntity_1 = require("./entity/LocalThreadOperationEntity");
const LocationEntity_1 = require("./entity/LocationEntity");
const MeEntity_1 = require("./entity/MeEntity");
const MeEmailEntity_1 = require("./entity/MeEmailEntity");
const MeOnboardingEntity_1 = require("./entity/MeOnboardingEntity");
const MediaFileEntity_1 = require("./entity/MediaFileEntity");
const MemberEntity_1 = require("./entity/MemberEntity");
const MemoryEntity_1 = require("./entity/MemoryEntity");
const MergeRequestEntity_1 = require("./entity/MergeRequestEntity");
const MessagingConversationMessageEntity_1 = require("./entity/MessagingConversationMessageEntity");
const MessagingConversationUploadEntity_1 = require("./entity/MessagingConversationUploadEntity");
const MetricQueryEntity_1 = require("./entity/MetricQueryEntity");
const NetworkConnectionEntity_1 = require("./entity/NetworkConnectionEntity");
const NomadAllocationEntity_1 = require("./entity/NomadAllocationEntity");
const NomadLogEntity_1 = require("./entity/NomadLogEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
const PageEntity_1 = require("./entity/PageEntity");
const PageAgentEntity_1 = require("./entity/PageAgentEntity");
const PageProjectRunEntity_1 = require("./entity/PageProjectRunEntity");
const PagesProjectCredentialEntity_1 = require("./entity/PagesProjectCredentialEntity");
const PagesProjectPersonaEntity_1 = require("./entity/PagesProjectPersonaEntity");
const PagesProjectRunEntity_1 = require("./entity/PagesProjectRunEntity");
const PagesProjectScenarioEntity_1 = require("./entity/PagesProjectScenarioEntity");
const PersonalAccessTokenEntity_1 = require("./entity/PersonalAccessTokenEntity");
const PreviewOperationEntity_1 = require("./entity/PreviewOperationEntity");
const PreviewProfileSecretBindingEntity_1 = require("./entity/PreviewProfileSecretBindingEntity");
const PreviewSecretEntity_1 = require("./entity/PreviewSecretEntity");
const PreviewSharingApprovalEntity_1 = require("./entity/PreviewSharingApprovalEntity");
const ProductMapIdentityDecisionEntity_1 = require("./entity/ProductMapIdentityDecisionEntity");
const ProductMapJourneyEntity_1 = require("./entity/ProductMapJourneyEntity");
const ProductMapJourneyReplayEntity_1 = require("./entity/ProductMapJourneyReplayEntity");
const ProductMapObservationEntity_1 = require("./entity/ProductMapObservationEntity");
const ProductMapQuestionEntity_1 = require("./entity/ProductMapQuestionEntity");
const ProductMapStateEntity_1 = require("./entity/ProductMapStateEntity");
const ProjectEntity_1 = require("./entity/ProjectEntity");
const ProjectAndroidApkEntity_1 = require("./entity/ProjectAndroidApkEntity");
const ProjectCodeMapEntity_1 = require("./entity/ProjectCodeMapEntity");
const ProjectEnvironmentEntity_1 = require("./entity/ProjectEnvironmentEntity");
const ProjectFindingEntity_1 = require("./entity/ProjectFindingEntity");
const ProjectFixtureEntity_1 = require("./entity/ProjectFixtureEntity");
const ProjectIosAppEntity_1 = require("./entity/ProjectIosAppEntity");
const ProjectMessagingConversationEntity_1 = require("./entity/ProjectMessagingConversationEntity");
const ProjectOverviewMetricEntity_1 = require("./entity/ProjectOverviewMetricEntity");
const ProjectOverviewPullRequestEntity_1 = require("./entity/ProjectOverviewPullRequestEntity");
const ProjectProductMapEntity_1 = require("./entity/ProjectProductMapEntity");
const ProjectRecordingEntity_1 = require("./entity/ProjectRecordingEntity");
const ProjectRunPlanEntity_1 = require("./entity/ProjectRunPlanEntity");
const ProjectRunScheduleEntity_1 = require("./entity/ProjectRunScheduleEntity");
const ProjectScenarioOptionEntity_1 = require("./entity/ProjectScenarioOptionEntity");
const ProjectScenarioRowEntity_1 = require("./entity/ProjectScenarioRowEntity");
const ProjectSettingEntity_1 = require("./entity/ProjectSettingEntity");
const PullRequestEntity_1 = require("./entity/PullRequestEntity");
const PullRequestSettingEntity_1 = require("./entity/PullRequestSettingEntity");
const PullRequestSettingAddRepositoryEntity_1 = require("./entity/PullRequestSettingAddRepositoryEntity");
const PullRequestSettingDetectCommentEntity_1 = require("./entity/PullRequestSettingDetectCommentEntity");
const RecorderEntity_1 = require("./entity/RecorderEntity");
const RegistryEntity_1 = require("./entity/RegistryEntity");
const RegistryV2Entity_1 = require("./entity/RegistryV2Entity");
const RelayAgentLocalThreadEntity_1 = require("./entity/RelayAgentLocalThreadEntity");
const ReportReplayEntity_1 = require("./entity/ReportReplayEntity");
const ReportScenarioEntity_1 = require("./entity/ReportScenarioEntity");
const RunScenarioRunEntity_1 = require("./entity/RunScenarioRunEntity");
const RunScheduleOptionEntity_1 = require("./entity/RunScheduleOptionEntity");
const RunSearchEntity_1 = require("./entity/RunSearchEntity");
const RunUpdateEntity_1 = require("./entity/RunUpdateEntity");
const ScenarioRevisionEntity_1 = require("./entity/ScenarioRevisionEntity");
const ScenarioRunLessonEntity_1 = require("./entity/ScenarioRunLessonEntity");
const ScenarioRunScenarioEditEntity_1 = require("./entity/ScenarioRunScenarioEditEntity");
const ServiceEndpointEntity_1 = require("./entity/ServiceEndpointEntity");
const SitePreviewEntity_1 = require("./entity/SitePreviewEntity");
const SlackChannelEntity_1 = require("./entity/SlackChannelEntity");
const SparkAgentLocalThreadEntity_1 = require("./entity/SparkAgentLocalThreadEntity");
const StaticSiteEntity_1 = require("./entity/StaticSiteEntity");
const StaticSiteDeploymentEntity_1 = require("./entity/StaticSiteDeploymentEntity");
const StaticSiteDomainEntity_1 = require("./entity/StaticSiteDomainEntity");
const SubscriptionModelEntity_1 = require("./entity/SubscriptionModelEntity");
const ThreadPreviewEntity_1 = require("./entity/ThreadPreviewEntity");
const VerificationProjectCredentialEntity_1 = require("./entity/VerificationProjectCredentialEntity");
const VerificationProjectPersonaEntity_1 = require("./entity/VerificationProjectPersonaEntity");
const VerificationProjectRunEntity_1 = require("./entity/VerificationProjectRunEntity");
const VerificationProjectScenarioEntity_1 = require("./entity/VerificationProjectScenarioEntity");
const VerifyAppDomainEntity_1 = require("./entity/VerifyAppDomainEntity");
const VerifyBrowserSessionEntity_1 = require("./entity/VerifyBrowserSessionEntity");
const VerifyStaticSiteDomainEntity_1 = require("./entity/VerifyStaticSiteDomainEntity");
const VersionLogEntity_1 = require("./entity/VersionLogEntity");
const WebBotAuthEntity_1 = require("./entity/WebBotAuthEntity");
const WorkflowRunStepEntity_1 = require("./entity/WorkflowRunStepEntity");
const WorkflowRunStopNoticeEntity_1 = require("./entity/WorkflowRunStopNoticeEntity");
const WorkflowTriggerSkippedEntity_1 = require("./entity/WorkflowTriggerSkippedEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const ComposalEntityBase_1 = require("./ComposalEntityBase");
Object.defineProperty(exports, "ComposalEntityBase", { enumerable: true, get: function () { return ComposalEntityBase_1.ComposalEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const sekreto = __importStar(require("./feature/secrets/sekreto"));
exports.sekreto = sekreto;
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class ComposalSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    _secrets;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    secrets() {
        return this._secrets && this._secrets.sekreto();
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
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
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
            spec.headers.accept = 'application/json';
        }
        if (null != this._secrets) {
            try {
                await this._secrets.resolve();
            }
            catch (err) {
                return err instanceof Error ? err : new Error(String(err));
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('ComposalSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('ComposalSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('ComposalSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Agent(entopts) {
        const self = this;
        return new AgentEntity_1.AgentEntity(self, entopts);
    }
    // Entity access: `client.AgentAttachment().list()` / `client.AgentAttachment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAttachment(entopts) {
        const self = this;
        return new AgentAttachmentEntity_1.AgentAttachmentEntity(self, entopts);
    }
    // Entity access: `client.AgentAutomation().list()` / `client.AgentAutomation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAutomation(entopts) {
        const self = this;
        return new AgentAutomationEntity_1.AgentAutomationEntity(self, entopts);
    }
    // Entity access: `client.AgentAvatar().list()` / `client.AgentAvatar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentAvatar(entopts) {
        const self = this;
        return new AgentAvatarEntity_1.AgentAvatarEntity(self, entopts);
    }
    // Entity access: `client.AgentCommand().list()` / `client.AgentCommand().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentCommand(entopts) {
        const self = this;
        return new AgentCommandEntity_1.AgentCommandEntity(self, entopts);
    }
    // Entity access: `client.AgentComputer().list()` / `client.AgentComputer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentComputer(entopts) {
        const self = this;
        return new AgentComputerEntity_1.AgentComputerEntity(self, entopts);
    }
    // Entity access: `client.AgentConnection().list()` / `client.AgentConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentConnection(entopts) {
        const self = this;
        return new AgentConnectionEntity_1.AgentConnectionEntity(self, entopts);
    }
    // Entity access: `client.AgentControlFlow().list()` / `client.AgentControlFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentControlFlow(entopts) {
        const self = this;
        return new AgentControlFlowEntity_1.AgentControlFlowEntity(self, entopts);
    }
    // Entity access: `client.AgentCoordination().list()` / `client.AgentCoordination().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentCoordination(entopts) {
        const self = this;
        return new AgentCoordinationEntity_1.AgentCoordinationEntity(self, entopts);
    }
    // Entity access: `client.AgentEmail().list()` / `client.AgentEmail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentEmail(entopts) {
        const self = this;
        return new AgentEmailEntity_1.AgentEmailEntity(self, entopts);
    }
    // Entity access: `client.AgentFile().list()` / `client.AgentFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentFile(entopts) {
        const self = this;
        return new AgentFileEntity_1.AgentFileEntity(self, entopts);
    }
    // Entity access: `client.AgentInput().list()` / `client.AgentInput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentInput(entopts) {
        const self = this;
        return new AgentInputEntity_1.AgentInputEntity(self, entopts);
    }
    // Entity access: `client.AgentIntegration().list()` / `client.AgentIntegration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentIntegration(entopts) {
        const self = this;
        return new AgentIntegrationEntity_1.AgentIntegrationEntity(self, entopts);
    }
    // Entity access: `client.AgentInteraction().list()` / `client.AgentInteraction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentInteraction(entopts) {
        const self = this;
        return new AgentInteractionEntity_1.AgentInteractionEntity(self, entopts);
    }
    // Entity access: `client.AgentLibrary().list()` / `client.AgentLibrary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentLibrary(entopts) {
        const self = this;
        return new AgentLibraryEntity_1.AgentLibraryEntity(self, entopts);
    }
    // Entity access: `client.AgentManager().list()` / `client.AgentManager().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentManager(entopts) {
        const self = this;
        return new AgentManagerEntity_1.AgentManagerEntity(self, entopts);
    }
    // Entity access: `client.AgentManagerChoice().list()` / `client.AgentManagerChoice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentManagerChoice(entopts) {
        const self = this;
        return new AgentManagerChoiceEntity_1.AgentManagerChoiceEntity(self, entopts);
    }
    // Entity access: `client.AgentMarketplace().list()` / `client.AgentMarketplace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMarketplace(entopts) {
        const self = this;
        return new AgentMarketplaceEntity_1.AgentMarketplaceEntity(self, entopts);
    }
    // Entity access: `client.AgentMarketplaceShared().list()` / `client.AgentMarketplaceShared().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMarketplaceShared(entopts) {
        const self = this;
        return new AgentMarketplaceSharedEntity_1.AgentMarketplaceSharedEntity(self, entopts);
    }
    // Entity access: `client.AgentMissionControl().list()` / `client.AgentMissionControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentMissionControl(entopts) {
        const self = this;
        return new AgentMissionControlEntity_1.AgentMissionControlEntity(self, entopts);
    }
    // Entity access: `client.AgentOperation().list()` / `client.AgentOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentOperation(entopts) {
        const self = this;
        return new AgentOperationEntity_1.AgentOperationEntity(self, entopts);
    }
    // Entity access: `client.AgentProvisioning().list()` / `client.AgentProvisioning().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentProvisioning(entopts) {
        const self = this;
        return new AgentProvisioningEntity_1.AgentProvisioningEntity(self, entopts);
    }
    // Entity access: `client.AgentPullRequest().list()` / `client.AgentPullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentPullRequest(entopts) {
        const self = this;
        return new AgentPullRequestEntity_1.AgentPullRequestEntity(self, entopts);
    }
    // Entity access: `client.AgentQuestion().list()` / `client.AgentQuestion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentQuestion(entopts) {
        const self = this;
        return new AgentQuestionEntity_1.AgentQuestionEntity(self, entopts);
    }
    // Entity access: `client.AgentRepository().list()` / `client.AgentRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRepository(entopts) {
        const self = this;
        return new AgentRepositoryEntity_1.AgentRepositoryEntity(self, entopts);
    }
    // Entity access: `client.AgentResource().list()` / `client.AgentResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentResource(entopts) {
        const self = this;
        return new AgentResourceEntity_1.AgentResourceEntity(self, entopts);
    }
    // Entity access: `client.AgentRoutine().list()` / `client.AgentRoutine().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRoutine(entopts) {
        const self = this;
        return new AgentRoutineEntity_1.AgentRoutineEntity(self, entopts);
    }
    // Entity access: `client.AgentRun().list()` / `client.AgentRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRun(entopts) {
        const self = this;
        return new AgentRunEntity_1.AgentRunEntity(self, entopts);
    }
    // Entity access: `client.AgentRuntime().list()` / `client.AgentRuntime().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentRuntime(entopts) {
        const self = this;
        return new AgentRuntimeEntity_1.AgentRuntimeEntity(self, entopts);
    }
    // Entity access: `client.AgentSetting().list()` / `client.AgentSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSetting(entopts) {
        const self = this;
        return new AgentSettingEntity_1.AgentSettingEntity(self, entopts);
    }
    // Entity access: `client.AgentSharing().list()` / `client.AgentSharing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSharing(entopts) {
        const self = this;
        return new AgentSharingEntity_1.AgentSharingEntity(self, entopts);
    }
    // Entity access: `client.AgentSite().list()` / `client.AgentSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSite(entopts) {
        const self = this;
        return new AgentSiteEntity_1.AgentSiteEntity(self, entopts);
    }
    // Entity access: `client.AgentSkill().list()` / `client.AgentSkill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSkill(entopts) {
        const self = this;
        return new AgentSkillEntity_1.AgentSkillEntity(self, entopts);
    }
    // Entity access: `client.AgentSlack().list()` / `client.AgentSlack().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSlack(entopts) {
        const self = this;
        return new AgentSlackEntity_1.AgentSlackEntity(self, entopts);
    }
    // Entity access: `client.AgentSubagent().list()` / `client.AgentSubagent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSubagent(entopts) {
        const self = this;
        return new AgentSubagentEntity_1.AgentSubagentEntity(self, entopts);
    }
    // Entity access: `client.AgentSubscription().list()` / `client.AgentSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentSubscription(entopts) {
        const self = this;
        return new AgentSubscriptionEntity_1.AgentSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.AgentTeammate().list()` / `client.AgentTeammate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTeammate(entopts) {
        const self = this;
        return new AgentTeammateEntity_1.AgentTeammateEntity(self, entopts);
    }
    // Entity access: `client.AgentTerminal().list()` / `client.AgentTerminal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTerminal(entopts) {
        const self = this;
        return new AgentTerminalEntity_1.AgentTerminalEntity(self, entopts);
    }
    // Entity access: `client.AgentThread().list()` / `client.AgentThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentThread(entopts) {
        const self = this;
        return new AgentThreadEntity_1.AgentThreadEntity(self, entopts);
    }
    // Entity access: `client.AgentTool().list()` / `client.AgentTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentTool(entopts) {
        const self = this;
        return new AgentToolEntity_1.AgentToolEntity(self, entopts);
    }
    // Entity access: `client.AgentVerifyProject().list()` / `client.AgentVerifyProject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentVerifyProject(entopts) {
        const self = this;
        return new AgentVerifyProjectEntity_1.AgentVerifyProjectEntity(self, entopts);
    }
    // Entity access: `client.AgentWait().list()` / `client.AgentWait().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWait(entopts) {
        const self = this;
        return new AgentWaitEntity_1.AgentWaitEntity(self, entopts);
    }
    // Entity access: `client.AgentWebhook().list()` / `client.AgentWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWebhook(entopts) {
        const self = this;
        return new AgentWebhookEntity_1.AgentWebhookEntity(self, entopts);
    }
    // Entity access: `client.AgentWork().list()` / `client.AgentWork().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWork(entopts) {
        const self = this;
        return new AgentWorkEntity_1.AgentWorkEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflow().list()` / `client.AgentWorkflow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflow(entopts) {
        const self = this;
        return new AgentWorkflowEntity_1.AgentWorkflowEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowProposal().list()` / `client.AgentWorkflowProposal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowProposal(entopts) {
        const self = this;
        return new AgentWorkflowProposalEntity_1.AgentWorkflowProposalEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowRun().list()` / `client.AgentWorkflowRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowRun(entopts) {
        const self = this;
        return new AgentWorkflowRunEntity_1.AgentWorkflowRunEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkflowTrigger().list()` / `client.AgentWorkflowTrigger().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkflowTrigger(entopts) {
        const self = this;
        return new AgentWorkflowTriggerEntity_1.AgentWorkflowTriggerEntity(self, entopts);
    }
    // Entity access: `client.AgentWorkspace().list()` / `client.AgentWorkspace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWorkspace(entopts) {
        const self = this;
        return new AgentWorkspaceEntity_1.AgentWorkspaceEntity(self, entopts);
    }
    // Entity access: `client.AgentWritePermission().list()` / `client.AgentWritePermission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentWritePermission(entopts) {
        const self = this;
        return new AgentWritePermissionEntity_1.AgentWritePermissionEntity(self, entopts);
    }
    // Entity access: `client.AllocationLog().list()` / `client.AllocationLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AllocationLog(entopts) {
        const self = this;
        return new AllocationLogEntity_1.AllocationLogEntity(self, entopts);
    }
    // Entity access: `client.App().list()` / `client.App().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    App(entopts) {
        const self = this;
        return new AppEntity_1.AppEntity(self, entopts);
    }
    // Entity access: `client.AppCdn().list()` / `client.AppCdn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppCdn(entopts) {
        const self = this;
        return new AppCdnEntity_1.AppCdnEntity(self, entopts);
    }
    // Entity access: `client.AppConfigVariable().list()` / `client.AppConfigVariable().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppConfigVariable(entopts) {
        const self = this;
        return new AppConfigVariableEntity_1.AppConfigVariableEntity(self, entopts);
    }
    // Entity access: `client.AppDataResource().list()` / `client.AppDataResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDataResource(entopts) {
        const self = this;
        return new AppDataResourceEntity_1.AppDataResourceEntity(self, entopts);
    }
    // Entity access: `client.AppDeploy().list()` / `client.AppDeploy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploy(entopts) {
        const self = this;
        return new AppDeployEntity_1.AppDeployEntity(self, entopts);
    }
    // Entity access: `client.AppDeployment().list()` / `client.AppDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeployment(entopts) {
        const self = this;
        return new AppDeploymentEntity_1.AppDeploymentEntity(self, entopts);
    }
    // Entity access: `client.AppDeploymentOperation().list()` / `client.AppDeploymentOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploymentOperation(entopts) {
        const self = this;
        return new AppDeploymentOperationEntity_1.AppDeploymentOperationEntity(self, entopts);
    }
    // Entity access: `client.AppDeploymentRollback().list()` / `client.AppDeploymentRollback().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppDeploymentRollback(entopts) {
        const self = this;
        return new AppDeploymentRollbackEntity_1.AppDeploymentRollbackEntity(self, entopts);
    }
    // Entity access: `client.AppEnvironment().list()` / `client.AppEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppEnvironment(entopts) {
        const self = this;
        return new AppEnvironmentEntity_1.AppEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.AppLocation().list()` / `client.AppLocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppLocation(entopts) {
        const self = this;
        return new AppLocationEntity_1.AppLocationEntity(self, entopts);
    }
    // Entity access: `client.AppMetric().list()` / `client.AppMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppMetric(entopts) {
        const self = this;
        return new AppMetricEntity_1.AppMetricEntity(self, entopts);
    }
    // Entity access: `client.AppPreview().list()` / `client.AppPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppPreview(entopts) {
        const self = this;
        return new AppPreviewEntity_1.AppPreviewEntity(self, entopts);
    }
    // Entity access: `client.AppPreviewProfile().list()` / `client.AppPreviewProfile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppPreviewProfile(entopts) {
        const self = this;
        return new AppPreviewProfileEntity_1.AppPreviewProfileEntity(self, entopts);
    }
    // Entity access: `client.AppRun().list()` / `client.AppRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppRun(entopts) {
        const self = this;
        return new AppRunEntity_1.AppRunEntity(self, entopts);
    }
    // Entity access: `client.AppSecret().list()` / `client.AppSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppSecret(entopts) {
        const self = this;
        return new AppSecretEntity_1.AppSecretEntity(self, entopts);
    }
    // Entity access: `client.AppService().list()` / `client.AppService().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppService(entopts) {
        const self = this;
        return new AppServiceEntity_1.AppServiceEntity(self, entopts);
    }
    // Entity access: `client.AppServiceBinding().list()` / `client.AppServiceBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppServiceBinding(entopts) {
        const self = this;
        return new AppServiceBindingEntity_1.AppServiceBindingEntity(self, entopts);
    }
    // Entity access: `client.AppServicePlacement().list()` / `client.AppServicePlacement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppServicePlacement(entopts) {
        const self = this;
        return new AppServicePlacementEntity_1.AppServicePlacementEntity(self, entopts);
    }
    // Entity access: `client.AppStorageResource().list()` / `client.AppStorageResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppStorageResource(entopts) {
        const self = this;
        return new AppStorageResourceEntity_1.AppStorageResourceEntity(self, entopts);
    }
    // Entity access: `client.AttachmentPart().list()` / `client.AttachmentPart().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AttachmentPart(entopts) {
        const self = this;
        return new AttachmentPartEntity_1.AttachmentPartEntity(self, entopts);
    }
    // Entity access: `client.AutomationEvent().list()` / `client.AutomationEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AutomationEvent(entopts) {
        const self = this;
        return new AutomationEventEntity_1.AutomationEventEntity(self, entopts);
    }
    // Entity access: `client.AutomationRun().list()` / `client.AutomationRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AutomationRun(entopts) {
        const self = this;
        return new AutomationRunEntity_1.AutomationRunEntity(self, entopts);
    }
    // Entity access: `client.Binary().list()` / `client.Binary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Binary(entopts) {
        const self = this;
        return new BinaryEntity_1.BinaryEntity(self, entopts);
    }
    // Entity access: `client.BinaryVersion().list()` / `client.BinaryVersion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BinaryVersion(entopts) {
        const self = this;
        return new BinaryVersionEntity_1.BinaryVersionEntity(self, entopts);
    }
    // Entity access: `client.BrowserEgressCandidate().list()` / `client.BrowserEgressCandidate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserEgressCandidate(entopts) {
        const self = this;
        return new BrowserEgressCandidateEntity_1.BrowserEgressCandidateEntity(self, entopts);
    }
    // Entity access: `client.BrowserSession().list()` / `client.BrowserSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSession(entopts) {
        const self = this;
        return new BrowserSessionEntity_1.BrowserSessionEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionConnection().list()` / `client.BrowserSessionConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionConnection(entopts) {
        const self = this;
        return new BrowserSessionConnectionEntity_1.BrowserSessionConnectionEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionControl().list()` / `client.BrowserSessionControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionControl(entopts) {
        const self = this;
        return new BrowserSessionControlEntity_1.BrowserSessionControlEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionEvent().list()` / `client.BrowserSessionEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionEvent(entopts) {
        const self = this;
        return new BrowserSessionEventEntity_1.BrowserSessionEventEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionMedia().list()` / `client.BrowserSessionMedia().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionMedia(entopts) {
        const self = this;
        return new BrowserSessionMediaEntity_1.BrowserSessionMediaEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionRecording().list()` / `client.BrowserSessionRecording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionRecording(entopts) {
        const self = this;
        return new BrowserSessionRecordingEntity_1.BrowserSessionRecordingEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionScreenshot().list()` / `client.BrowserSessionScreenshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionScreenshot(entopts) {
        const self = this;
        return new BrowserSessionScreenshotEntity_1.BrowserSessionScreenshotEntity(self, entopts);
    }
    // Entity access: `client.BrowserSessionTask().list()` / `client.BrowserSessionTask().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BrowserSessionTask(entopts) {
        const self = this;
        return new BrowserSessionTaskEntity_1.BrowserSessionTaskEntity(self, entopts);
    }
    // Entity access: `client.CatalogSelector().list()` / `client.CatalogSelector().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CatalogSelector(entopts) {
        const self = this;
        return new CatalogSelectorEntity_1.CatalogSelectorEntity(self, entopts);
    }
    // Entity access: `client.CdnDeployment().list()` / `client.CdnDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnDeployment(entopts) {
        const self = this;
        return new CdnDeploymentEntity_1.CdnDeploymentEntity(self, entopts);
    }
    // Entity access: `client.CdnHostname().list()` / `client.CdnHostname().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnHostname(entopts) {
        const self = this;
        return new CdnHostnameEntity_1.CdnHostnameEntity(self, entopts);
    }
    // Entity access: `client.CdnSpace().list()` / `client.CdnSpace().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnSpace(entopts) {
        const self = this;
        return new CdnSpaceEntity_1.CdnSpaceEntity(self, entopts);
    }
    // Entity access: `client.CdnSpaceObject().list()` / `client.CdnSpaceObject().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnSpaceObject(entopts) {
        const self = this;
        return new CdnSpaceObjectEntity_1.CdnSpaceObjectEntity(self, entopts);
    }
    // Entity access: `client.ConnectionRequest().list()` / `client.ConnectionRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConnectionRequest(entopts) {
        const self = this;
        return new ConnectionRequestEntity_1.ConnectionRequestEntity(self, entopts);
    }
    // Entity access: `client.ConnectionSource().list()` / `client.ConnectionSource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConnectionSource(entopts) {
        const self = this;
        return new ConnectionSourceEntity_1.ConnectionSourceEntity(self, entopts);
    }
    // Entity access: `client.CoordinationWait().list()` / `client.CoordinationWait().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CoordinationWait(entopts) {
        const self = this;
        return new CoordinationWaitEntity_1.CoordinationWaitEntity(self, entopts);
    }
    // Entity access: `client.CredentialSignInCheck().list()` / `client.CredentialSignInCheck().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CredentialSignInCheck(entopts) {
        const self = this;
        return new CredentialSignInCheckEntity_1.CredentialSignInCheckEntity(self, entopts);
    }
    // Entity access: `client.DataResourceRotateCredential().list()` / `client.DataResourceRotateCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DataResourceRotateCredential(entopts) {
        const self = this;
        return new DataResourceRotateCredentialEntity_1.DataResourceRotateCredentialEntity(self, entopts);
    }
    // Entity access: `client.DeepScan().list()` / `client.DeepScan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScan(entopts) {
        const self = this;
        return new DeepScanEntity_1.DeepScanEntity(self, entopts);
    }
    // Entity access: `client.DeepScanFinding().list()` / `client.DeepScanFinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanFinding(entopts) {
        const self = this;
        return new DeepScanFindingEntity_1.DeepScanFindingEntity(self, entopts);
    }
    // Entity access: `client.DeepScanFlow().list()` / `client.DeepScanFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanFlow(entopts) {
        const self = this;
        return new DeepScanFlowEntity_1.DeepScanFlowEntity(self, entopts);
    }
    // Entity access: `client.DeepScanMappedFlow().list()` / `client.DeepScanMappedFlow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanMappedFlow(entopts) {
        const self = this;
        return new DeepScanMappedFlowEntity_1.DeepScanMappedFlowEntity(self, entopts);
    }
    // Entity access: `client.DeepScanOption().list()` / `client.DeepScanOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeepScanOption(entopts) {
        const self = this;
        return new DeepScanOptionEntity_1.DeepScanOptionEntity(self, entopts);
    }
    // Entity access: `client.DemoShare().list()` / `client.DemoShare().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DemoShare(entopts) {
        const self = this;
        return new DemoShareEntity_1.DemoShareEntity(self, entopts);
    }
    // Entity access: `client.DemoShareSegment().list()` / `client.DemoShareSegment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DemoShareSegment(entopts) {
        const self = this;
        return new DemoShareSegmentEntity_1.DemoShareSegmentEntity(self, entopts);
    }
    // Entity access: `client.DeploymentDashboardNomad().list()` / `client.DeploymentDashboardNomad().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentDashboardNomad(entopts) {
        const self = this;
        return new DeploymentDashboardNomadEntity_1.DeploymentDashboardNomadEntity(self, entopts);
    }
    // Entity access: `client.DeploymentFile().list()` / `client.DeploymentFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeploymentFile(entopts) {
        const self = this;
        return new DeploymentFileEntity_1.DeploymentFileEntity(self, entopts);
    }
    // Entity access: `client.DomainPathRule().list()` / `client.DomainPathRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainPathRule(entopts) {
        const self = this;
        return new DomainPathRuleEntity_1.DomainPathRuleEntity(self, entopts);
    }
    // Entity access: `client.Dream().list()` / `client.Dream().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dream(entopts) {
        const self = this;
        return new DreamEntity_1.DreamEntity(self, entopts);
    }
    // Entity access: `client.Environment().list()` / `client.Environment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Environment(entopts) {
        const self = this;
        return new EnvironmentEntity_1.EnvironmentEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentDiscoveryRun().list()` / `client.EnvironmentDiscoveryRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentDiscoveryRun(entopts) {
        const self = this;
        return new EnvironmentDiscoveryRunEntity_1.EnvironmentDiscoveryRunEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentExploration().list()` / `client.EnvironmentExploration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentExploration(entopts) {
        const self = this;
        return new EnvironmentExplorationEntity_1.EnvironmentExplorationEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentFirstRun().list()` / `client.EnvironmentFirstRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentFirstRun(entopts) {
        const self = this;
        return new EnvironmentFirstRunEntity_1.EnvironmentFirstRunEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentRevision().list()` / `client.EnvironmentRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentRevision(entopts) {
        const self = this;
        return new EnvironmentRevisionEntity_1.EnvironmentRevisionEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentSecretBinding().list()` / `client.EnvironmentSecretBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentSecretBinding(entopts) {
        const self = this;
        return new EnvironmentSecretBindingEntity_1.EnvironmentSecretBindingEntity(self, entopts);
    }
    // Entity access: `client.EnvironmentTestAccount().list()` / `client.EnvironmentTestAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EnvironmentTestAccount(entopts) {
        const self = this;
        return new EnvironmentTestAccountEntity_1.EnvironmentTestAccountEntity(self, entopts);
    }
    // Entity access: `client.Evidence().list()` / `client.Evidence().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Evidence(entopts) {
        const self = this;
        return new EvidenceEntity_1.EvidenceEntity(self, entopts);
    }
    // Entity access: `client.Exploration().list()` / `client.Exploration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Exploration(entopts) {
        const self = this;
        return new ExplorationEntity_1.ExplorationEntity(self, entopts);
    }
    // Entity access: `client.ExplorationMessage().list()` / `client.ExplorationMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationMessage(entopts) {
        const self = this;
        return new ExplorationMessageEntity_1.ExplorationMessageEntity(self, entopts);
    }
    // Entity access: `client.ExplorationReport().list()` / `client.ExplorationReport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationReport(entopts) {
        const self = this;
        return new ExplorationReportEntity_1.ExplorationReportEntity(self, entopts);
    }
    // Entity access: `client.ExplorationScenario().list()` / `client.ExplorationScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExplorationScenario(entopts) {
        const self = this;
        return new ExplorationScenarioEntity_1.ExplorationScenarioEntity(self, entopts);
    }
    // Entity access: `client.Finding().list()` / `client.Finding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Finding(entopts) {
        const self = this;
        return new FindingEntity_1.FindingEntity(self, entopts);
    }
    // Entity access: `client.GithubConnection().list()` / `client.GithubConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GithubConnection(entopts) {
        const self = this;
        return new GithubConnectionEntity_1.GithubConnectionEntity(self, entopts);
    }
    // Entity access: `client.HostingAppDomain().list()` / `client.HostingAppDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HostingAppDomain(entopts) {
        const self = this;
        return new HostingAppDomainEntity_1.HostingAppDomainEntity(self, entopts);
    }
    // Entity access: `client.ImageRepository().list()` / `client.ImageRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImageRepository(entopts) {
        const self = this;
        return new ImageRepositoryEntity_1.ImageRepositoryEntity(self, entopts);
    }
    // Entity access: `client.Integration().list()` / `client.Integration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Integration(entopts) {
        const self = this;
        return new IntegrationEntity_1.IntegrationEntity(self, entopts);
    }
    // Entity access: `client.InteractionResponse().list()` / `client.InteractionResponse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InteractionResponse(entopts) {
        const self = this;
        return new InteractionResponseEntity_1.InteractionResponseEntity(self, entopts);
    }
    // Entity access: `client.Invitation().list()` / `client.Invitation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Invitation(entopts) {
        const self = this;
        return new InvitationEntity_1.InvitationEntity(self, entopts);
    }
    // Entity access: `client.JourneyVariantReplay().list()` / `client.JourneyVariantReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    JourneyVariantReplay(entopts) {
        const self = this;
        return new JourneyVariantReplayEntity_1.JourneyVariantReplayEntity(self, entopts);
    }
    // Entity access: `client.Knowledge().list()` / `client.Knowledge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Knowledge(entopts) {
        const self = this;
        return new KnowledgeEntity_1.KnowledgeEntity(self, entopts);
    }
    // Entity access: `client.LocalThreadDelivery().list()` / `client.LocalThreadDelivery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalThreadDelivery(entopts) {
        const self = this;
        return new LocalThreadDeliveryEntity_1.LocalThreadDeliveryEntity(self, entopts);
    }
    // Entity access: `client.LocalThreadOperation().list()` / `client.LocalThreadOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LocalThreadOperation(entopts) {
        const self = this;
        return new LocalThreadOperationEntity_1.LocalThreadOperationEntity(self, entopts);
    }
    // Entity access: `client.Location().list()` / `client.Location().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Location(entopts) {
        const self = this;
        return new LocationEntity_1.LocationEntity(self, entopts);
    }
    // Entity access: `client.Me().list()` / `client.Me().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Me(entopts) {
        const self = this;
        return new MeEntity_1.MeEntity(self, entopts);
    }
    // Entity access: `client.MeEmail().list()` / `client.MeEmail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeEmail(entopts) {
        const self = this;
        return new MeEmailEntity_1.MeEmailEntity(self, entopts);
    }
    // Entity access: `client.MeOnboarding().list()` / `client.MeOnboarding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeOnboarding(entopts) {
        const self = this;
        return new MeOnboardingEntity_1.MeOnboardingEntity(self, entopts);
    }
    // Entity access: `client.MediaFile().list()` / `client.MediaFile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MediaFile(entopts) {
        const self = this;
        return new MediaFileEntity_1.MediaFileEntity(self, entopts);
    }
    // Entity access: `client.Member().list()` / `client.Member().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Member(entopts) {
        const self = this;
        return new MemberEntity_1.MemberEntity(self, entopts);
    }
    // Entity access: `client.Memory().list()` / `client.Memory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Memory(entopts) {
        const self = this;
        return new MemoryEntity_1.MemoryEntity(self, entopts);
    }
    // Entity access: `client.MergeRequest().list()` / `client.MergeRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MergeRequest(entopts) {
        const self = this;
        return new MergeRequestEntity_1.MergeRequestEntity(self, entopts);
    }
    // Entity access: `client.MessagingConversationMessage().list()` / `client.MessagingConversationMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MessagingConversationMessage(entopts) {
        const self = this;
        return new MessagingConversationMessageEntity_1.MessagingConversationMessageEntity(self, entopts);
    }
    // Entity access: `client.MessagingConversationUpload().list()` / `client.MessagingConversationUpload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MessagingConversationUpload(entopts) {
        const self = this;
        return new MessagingConversationUploadEntity_1.MessagingConversationUploadEntity(self, entopts);
    }
    // Entity access: `client.MetricQuery().list()` / `client.MetricQuery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MetricQuery(entopts) {
        const self = this;
        return new MetricQueryEntity_1.MetricQueryEntity(self, entopts);
    }
    // Entity access: `client.NetworkConnection().list()` / `client.NetworkConnection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NetworkConnection(entopts) {
        const self = this;
        return new NetworkConnectionEntity_1.NetworkConnectionEntity(self, entopts);
    }
    // Entity access: `client.NomadAllocation().list()` / `client.NomadAllocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NomadAllocation(entopts) {
        const self = this;
        return new NomadAllocationEntity_1.NomadAllocationEntity(self, entopts);
    }
    // Entity access: `client.NomadLog().list()` / `client.NomadLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NomadLog(entopts) {
        const self = this;
        return new NomadLogEntity_1.NomadLogEntity(self, entopts);
    }
    // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Organization(entopts) {
        const self = this;
        return new OrganizationEntity_1.OrganizationEntity(self, entopts);
    }
    // Entity access: `client.Page().list()` / `client.Page().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Page(entopts) {
        const self = this;
        return new PageEntity_1.PageEntity(self, entopts);
    }
    // Entity access: `client.PageAgent().list()` / `client.PageAgent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageAgent(entopts) {
        const self = this;
        return new PageAgentEntity_1.PageAgentEntity(self, entopts);
    }
    // Entity access: `client.PageProjectRun().list()` / `client.PageProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PageProjectRun(entopts) {
        const self = this;
        return new PageProjectRunEntity_1.PageProjectRunEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectCredential().list()` / `client.PagesProjectCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectCredential(entopts) {
        const self = this;
        return new PagesProjectCredentialEntity_1.PagesProjectCredentialEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectPersona().list()` / `client.PagesProjectPersona().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectPersona(entopts) {
        const self = this;
        return new PagesProjectPersonaEntity_1.PagesProjectPersonaEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectRun().list()` / `client.PagesProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectRun(entopts) {
        const self = this;
        return new PagesProjectRunEntity_1.PagesProjectRunEntity(self, entopts);
    }
    // Entity access: `client.PagesProjectScenario().list()` / `client.PagesProjectScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PagesProjectScenario(entopts) {
        const self = this;
        return new PagesProjectScenarioEntity_1.PagesProjectScenarioEntity(self, entopts);
    }
    // Entity access: `client.PersonalAccessToken().list()` / `client.PersonalAccessToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PersonalAccessToken(entopts) {
        const self = this;
        return new PersonalAccessTokenEntity_1.PersonalAccessTokenEntity(self, entopts);
    }
    // Entity access: `client.PreviewOperation().list()` / `client.PreviewOperation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewOperation(entopts) {
        const self = this;
        return new PreviewOperationEntity_1.PreviewOperationEntity(self, entopts);
    }
    // Entity access: `client.PreviewProfileSecretBinding().list()` / `client.PreviewProfileSecretBinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewProfileSecretBinding(entopts) {
        const self = this;
        return new PreviewProfileSecretBindingEntity_1.PreviewProfileSecretBindingEntity(self, entopts);
    }
    // Entity access: `client.PreviewSecret().list()` / `client.PreviewSecret().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewSecret(entopts) {
        const self = this;
        return new PreviewSecretEntity_1.PreviewSecretEntity(self, entopts);
    }
    // Entity access: `client.PreviewSharingApproval().list()` / `client.PreviewSharingApproval().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PreviewSharingApproval(entopts) {
        const self = this;
        return new PreviewSharingApprovalEntity_1.PreviewSharingApprovalEntity(self, entopts);
    }
    // Entity access: `client.ProductMapIdentityDecision().list()` / `client.ProductMapIdentityDecision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapIdentityDecision(entopts) {
        const self = this;
        return new ProductMapIdentityDecisionEntity_1.ProductMapIdentityDecisionEntity(self, entopts);
    }
    // Entity access: `client.ProductMapJourney().list()` / `client.ProductMapJourney().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapJourney(entopts) {
        const self = this;
        return new ProductMapJourneyEntity_1.ProductMapJourneyEntity(self, entopts);
    }
    // Entity access: `client.ProductMapJourneyReplay().list()` / `client.ProductMapJourneyReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapJourneyReplay(entopts) {
        const self = this;
        return new ProductMapJourneyReplayEntity_1.ProductMapJourneyReplayEntity(self, entopts);
    }
    // Entity access: `client.ProductMapObservation().list()` / `client.ProductMapObservation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapObservation(entopts) {
        const self = this;
        return new ProductMapObservationEntity_1.ProductMapObservationEntity(self, entopts);
    }
    // Entity access: `client.ProductMapQuestion().list()` / `client.ProductMapQuestion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapQuestion(entopts) {
        const self = this;
        return new ProductMapQuestionEntity_1.ProductMapQuestionEntity(self, entopts);
    }
    // Entity access: `client.ProductMapState().list()` / `client.ProductMapState().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProductMapState(entopts) {
        const self = this;
        return new ProductMapStateEntity_1.ProductMapStateEntity(self, entopts);
    }
    // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Project(entopts) {
        const self = this;
        return new ProjectEntity_1.ProjectEntity(self, entopts);
    }
    // Entity access: `client.ProjectAndroidApk().list()` / `client.ProjectAndroidApk().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectAndroidApk(entopts) {
        const self = this;
        return new ProjectAndroidApkEntity_1.ProjectAndroidApkEntity(self, entopts);
    }
    // Entity access: `client.ProjectCodeMap().list()` / `client.ProjectCodeMap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectCodeMap(entopts) {
        const self = this;
        return new ProjectCodeMapEntity_1.ProjectCodeMapEntity(self, entopts);
    }
    // Entity access: `client.ProjectEnvironment().list()` / `client.ProjectEnvironment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectEnvironment(entopts) {
        const self = this;
        return new ProjectEnvironmentEntity_1.ProjectEnvironmentEntity(self, entopts);
    }
    // Entity access: `client.ProjectFinding().list()` / `client.ProjectFinding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectFinding(entopts) {
        const self = this;
        return new ProjectFindingEntity_1.ProjectFindingEntity(self, entopts);
    }
    // Entity access: `client.ProjectFixture().list()` / `client.ProjectFixture().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectFixture(entopts) {
        const self = this;
        return new ProjectFixtureEntity_1.ProjectFixtureEntity(self, entopts);
    }
    // Entity access: `client.ProjectIosApp().list()` / `client.ProjectIosApp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectIosApp(entopts) {
        const self = this;
        return new ProjectIosAppEntity_1.ProjectIosAppEntity(self, entopts);
    }
    // Entity access: `client.ProjectMessagingConversation().list()` / `client.ProjectMessagingConversation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectMessagingConversation(entopts) {
        const self = this;
        return new ProjectMessagingConversationEntity_1.ProjectMessagingConversationEntity(self, entopts);
    }
    // Entity access: `client.ProjectOverviewMetric().list()` / `client.ProjectOverviewMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectOverviewMetric(entopts) {
        const self = this;
        return new ProjectOverviewMetricEntity_1.ProjectOverviewMetricEntity(self, entopts);
    }
    // Entity access: `client.ProjectOverviewPullRequest().list()` / `client.ProjectOverviewPullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectOverviewPullRequest(entopts) {
        const self = this;
        return new ProjectOverviewPullRequestEntity_1.ProjectOverviewPullRequestEntity(self, entopts);
    }
    // Entity access: `client.ProjectProductMap().list()` / `client.ProjectProductMap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectProductMap(entopts) {
        const self = this;
        return new ProjectProductMapEntity_1.ProjectProductMapEntity(self, entopts);
    }
    // Entity access: `client.ProjectRecording().list()` / `client.ProjectRecording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRecording(entopts) {
        const self = this;
        return new ProjectRecordingEntity_1.ProjectRecordingEntity(self, entopts);
    }
    // Entity access: `client.ProjectRunPlan().list()` / `client.ProjectRunPlan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRunPlan(entopts) {
        const self = this;
        return new ProjectRunPlanEntity_1.ProjectRunPlanEntity(self, entopts);
    }
    // Entity access: `client.ProjectRunSchedule().list()` / `client.ProjectRunSchedule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectRunSchedule(entopts) {
        const self = this;
        return new ProjectRunScheduleEntity_1.ProjectRunScheduleEntity(self, entopts);
    }
    // Entity access: `client.ProjectScenarioOption().list()` / `client.ProjectScenarioOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectScenarioOption(entopts) {
        const self = this;
        return new ProjectScenarioOptionEntity_1.ProjectScenarioOptionEntity(self, entopts);
    }
    // Entity access: `client.ProjectScenarioRow().list()` / `client.ProjectScenarioRow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectScenarioRow(entopts) {
        const self = this;
        return new ProjectScenarioRowEntity_1.ProjectScenarioRowEntity(self, entopts);
    }
    // Entity access: `client.ProjectSetting().list()` / `client.ProjectSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectSetting(entopts) {
        const self = this;
        return new ProjectSettingEntity_1.ProjectSettingEntity(self, entopts);
    }
    // Entity access: `client.PullRequest().list()` / `client.PullRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequest(entopts) {
        const self = this;
        return new PullRequestEntity_1.PullRequestEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSetting().list()` / `client.PullRequestSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSetting(entopts) {
        const self = this;
        return new PullRequestSettingEntity_1.PullRequestSettingEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSettingAddRepository().list()` / `client.PullRequestSettingAddRepository().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSettingAddRepository(entopts) {
        const self = this;
        return new PullRequestSettingAddRepositoryEntity_1.PullRequestSettingAddRepositoryEntity(self, entopts);
    }
    // Entity access: `client.PullRequestSettingDetectComment().list()` / `client.PullRequestSettingDetectComment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PullRequestSettingDetectComment(entopts) {
        const self = this;
        return new PullRequestSettingDetectCommentEntity_1.PullRequestSettingDetectCommentEntity(self, entopts);
    }
    // Entity access: `client.Recorder().list()` / `client.Recorder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recorder(entopts) {
        const self = this;
        return new RecorderEntity_1.RecorderEntity(self, entopts);
    }
    // Entity access: `client.Registry().list()` / `client.Registry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Registry(entopts) {
        const self = this;
        return new RegistryEntity_1.RegistryEntity(self, entopts);
    }
    // Entity access: `client.RegistryV2().list()` / `client.RegistryV2().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RegistryV2(entopts) {
        const self = this;
        return new RegistryV2Entity_1.RegistryV2Entity(self, entopts);
    }
    // Entity access: `client.RelayAgentLocalThread().list()` / `client.RelayAgentLocalThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RelayAgentLocalThread(entopts) {
        const self = this;
        return new RelayAgentLocalThreadEntity_1.RelayAgentLocalThreadEntity(self, entopts);
    }
    // Entity access: `client.ReportReplay().list()` / `client.ReportReplay().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportReplay(entopts) {
        const self = this;
        return new ReportReplayEntity_1.ReportReplayEntity(self, entopts);
    }
    // Entity access: `client.ReportScenario().list()` / `client.ReportScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportScenario(entopts) {
        const self = this;
        return new ReportScenarioEntity_1.ReportScenarioEntity(self, entopts);
    }
    // Entity access: `client.RunScenarioRun().list()` / `client.RunScenarioRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunScenarioRun(entopts) {
        const self = this;
        return new RunScenarioRunEntity_1.RunScenarioRunEntity(self, entopts);
    }
    // Entity access: `client.RunScheduleOption().list()` / `client.RunScheduleOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunScheduleOption(entopts) {
        const self = this;
        return new RunScheduleOptionEntity_1.RunScheduleOptionEntity(self, entopts);
    }
    // Entity access: `client.RunSearch().list()` / `client.RunSearch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunSearch(entopts) {
        const self = this;
        return new RunSearchEntity_1.RunSearchEntity(self, entopts);
    }
    // Entity access: `client.RunUpdate().list()` / `client.RunUpdate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RunUpdate(entopts) {
        const self = this;
        return new RunUpdateEntity_1.RunUpdateEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRevision().list()` / `client.ScenarioRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRevision(entopts) {
        const self = this;
        return new ScenarioRevisionEntity_1.ScenarioRevisionEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRunLesson().list()` / `client.ScenarioRunLesson().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRunLesson(entopts) {
        const self = this;
        return new ScenarioRunLessonEntity_1.ScenarioRunLessonEntity(self, entopts);
    }
    // Entity access: `client.ScenarioRunScenarioEdit().list()` / `client.ScenarioRunScenarioEdit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScenarioRunScenarioEdit(entopts) {
        const self = this;
        return new ScenarioRunScenarioEditEntity_1.ScenarioRunScenarioEditEntity(self, entopts);
    }
    // Entity access: `client.ServiceEndpoint().list()` / `client.ServiceEndpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ServiceEndpoint(entopts) {
        const self = this;
        return new ServiceEndpointEntity_1.ServiceEndpointEntity(self, entopts);
    }
    // Entity access: `client.SitePreview().list()` / `client.SitePreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SitePreview(entopts) {
        const self = this;
        return new SitePreviewEntity_1.SitePreviewEntity(self, entopts);
    }
    // Entity access: `client.SlackChannel().list()` / `client.SlackChannel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SlackChannel(entopts) {
        const self = this;
        return new SlackChannelEntity_1.SlackChannelEntity(self, entopts);
    }
    // Entity access: `client.SparkAgentLocalThread().list()` / `client.SparkAgentLocalThread().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SparkAgentLocalThread(entopts) {
        const self = this;
        return new SparkAgentLocalThreadEntity_1.SparkAgentLocalThreadEntity(self, entopts);
    }
    // Entity access: `client.StaticSite().list()` / `client.StaticSite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSite(entopts) {
        const self = this;
        return new StaticSiteEntity_1.StaticSiteEntity(self, entopts);
    }
    // Entity access: `client.StaticSiteDeployment().list()` / `client.StaticSiteDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSiteDeployment(entopts) {
        const self = this;
        return new StaticSiteDeploymentEntity_1.StaticSiteDeploymentEntity(self, entopts);
    }
    // Entity access: `client.StaticSiteDomain().list()` / `client.StaticSiteDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    StaticSiteDomain(entopts) {
        const self = this;
        return new StaticSiteDomainEntity_1.StaticSiteDomainEntity(self, entopts);
    }
    // Entity access: `client.SubscriptionModel().list()` / `client.SubscriptionModel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SubscriptionModel(entopts) {
        const self = this;
        return new SubscriptionModelEntity_1.SubscriptionModelEntity(self, entopts);
    }
    // Entity access: `client.ThreadPreview().list()` / `client.ThreadPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ThreadPreview(entopts) {
        const self = this;
        return new ThreadPreviewEntity_1.ThreadPreviewEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectCredential().list()` / `client.VerificationProjectCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectCredential(entopts) {
        const self = this;
        return new VerificationProjectCredentialEntity_1.VerificationProjectCredentialEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectPersona().list()` / `client.VerificationProjectPersona().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectPersona(entopts) {
        const self = this;
        return new VerificationProjectPersonaEntity_1.VerificationProjectPersonaEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectRun().list()` / `client.VerificationProjectRun().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectRun(entopts) {
        const self = this;
        return new VerificationProjectRunEntity_1.VerificationProjectRunEntity(self, entopts);
    }
    // Entity access: `client.VerificationProjectScenario().list()` / `client.VerificationProjectScenario().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerificationProjectScenario(entopts) {
        const self = this;
        return new VerificationProjectScenarioEntity_1.VerificationProjectScenarioEntity(self, entopts);
    }
    // Entity access: `client.VerifyAppDomain().list()` / `client.VerifyAppDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyAppDomain(entopts) {
        const self = this;
        return new VerifyAppDomainEntity_1.VerifyAppDomainEntity(self, entopts);
    }
    // Entity access: `client.VerifyBrowserSession().list()` / `client.VerifyBrowserSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyBrowserSession(entopts) {
        const self = this;
        return new VerifyBrowserSessionEntity_1.VerifyBrowserSessionEntity(self, entopts);
    }
    // Entity access: `client.VerifyStaticSiteDomain().list()` / `client.VerifyStaticSiteDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifyStaticSiteDomain(entopts) {
        const self = this;
        return new VerifyStaticSiteDomainEntity_1.VerifyStaticSiteDomainEntity(self, entopts);
    }
    // Entity access: `client.VersionLog().list()` / `client.VersionLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VersionLog(entopts) {
        const self = this;
        return new VersionLogEntity_1.VersionLogEntity(self, entopts);
    }
    // Entity access: `client.WebBotAuth().list()` / `client.WebBotAuth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebBotAuth(entopts) {
        const self = this;
        return new WebBotAuthEntity_1.WebBotAuthEntity(self, entopts);
    }
    // Entity access: `client.WorkflowRunStep().list()` / `client.WorkflowRunStep().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowRunStep(entopts) {
        const self = this;
        return new WorkflowRunStepEntity_1.WorkflowRunStepEntity(self, entopts);
    }
    // Entity access: `client.WorkflowRunStopNotice().list()` / `client.WorkflowRunStopNotice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowRunStopNotice(entopts) {
        const self = this;
        return new WorkflowRunStopNoticeEntity_1.WorkflowRunStopNoticeEntity(self, entopts);
    }
    // Entity access: `client.WorkflowTriggerSkipped().list()` / `client.WorkflowTriggerSkipped().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowTriggerSkipped(entopts) {
        const self = this;
        return new WorkflowTriggerSkippedEntity_1.WorkflowTriggerSkippedEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new ComposalSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return ComposalSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Composal' };
    }
    toString() {
        return 'Composal ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.ComposalSDK = ComposalSDK;
const SDK = ComposalSDK;
exports.SDK = SDK;
//# sourceMappingURL=ComposalSDK.js.map