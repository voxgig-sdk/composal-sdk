import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSite, AgentSiteListMatch } from '../ComposalTypes';
declare class AgentSiteEntity extends ComposalEntityBase<AgentSite> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSiteEntity): AgentSiteEntity;
    list(this: any, reqmatch?: AgentSiteListMatch, ctrl?: Control): Promise<AgentSiteEntity[]>;
}
export { AgentSiteEntity };
