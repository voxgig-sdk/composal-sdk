import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSite, AgentSiteLoadMatch, AgentSiteListMatch, AgentSiteCreateData } from '../ComposalTypes';
declare class AgentSiteEntity extends ComposalEntityBase<AgentSite> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSiteEntity): AgentSiteEntity;
    load(this: any, reqmatch?: AgentSiteLoadMatch, ctrl?: Control): Promise<AgentSiteEntity>;
    list(this: any, reqmatch?: AgentSiteListMatch, ctrl?: Control): Promise<AgentSiteEntity[]>;
    create(this: any, reqdata?: AgentSiteCreateData, ctrl?: Control): Promise<AgentSiteEntity>;
}
export { AgentSiteEntity };
