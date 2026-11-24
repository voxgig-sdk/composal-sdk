import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentMarketplace, AgentMarketplaceLoadMatch, AgentMarketplaceCreateData, AgentMarketplaceUpdateData, AgentMarketplacePatchData, AgentMarketplaceRemoveMatch } from '../ComposalTypes';
declare class AgentMarketplaceEntity extends ComposalEntityBase<AgentMarketplace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentMarketplaceEntity): AgentMarketplaceEntity;
    load(this: any, reqmatch?: AgentMarketplaceLoadMatch, ctrl?: Control): Promise<AgentMarketplaceEntity>;
    create(this: any, reqdata?: AgentMarketplaceCreateData, ctrl?: Control): Promise<AgentMarketplaceEntity>;
    update(this: any, reqdata?: AgentMarketplaceUpdateData, ctrl?: Control): Promise<AgentMarketplaceEntity>;
    patch(this: any, reqdata?: AgentMarketplacePatchData, ctrl?: Control): Promise<AgentMarketplaceEntity>;
    remove(this: any, reqmatch?: AgentMarketplaceRemoveMatch, ctrl?: Control): Promise<AgentMarketplaceEntity>;
}
export { AgentMarketplaceEntity };
