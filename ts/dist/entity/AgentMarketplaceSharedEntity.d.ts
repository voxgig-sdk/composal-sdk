import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentMarketplaceShared, AgentMarketplaceSharedLoadMatch, AgentMarketplaceSharedCreateData } from '../ComposalTypes';
declare class AgentMarketplaceSharedEntity extends ComposalEntityBase<AgentMarketplaceShared> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentMarketplaceSharedEntity): AgentMarketplaceSharedEntity;
    load(this: any, reqmatch?: AgentMarketplaceSharedLoadMatch, ctrl?: Control): Promise<AgentMarketplaceSharedEntity>;
    create(this: any, reqdata?: AgentMarketplaceSharedCreateData, ctrl?: Control): Promise<AgentMarketplaceSharedEntity>;
}
export { AgentMarketplaceSharedEntity };
