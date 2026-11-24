import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAgentSite, SparkAgentSiteListMatch } from '../ComposalTypes';
declare class SparkAgentSiteEntity extends ComposalEntityBase<SparkAgentSite> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAgentSiteEntity): SparkAgentSiteEntity;
    list(this: any, reqmatch?: SparkAgentSiteListMatch, ctrl?: Control): Promise<SparkAgentSiteEntity[]>;
}
export { SparkAgentSiteEntity };
