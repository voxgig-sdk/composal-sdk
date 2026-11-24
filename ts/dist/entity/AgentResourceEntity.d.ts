import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentResource, AgentResourceListMatch } from '../ComposalTypes';
declare class AgentResourceEntity extends ComposalEntityBase<AgentResource> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentResourceEntity): AgentResourceEntity;
    list(this: any, reqmatch?: AgentResourceListMatch, ctrl?: Control): Promise<AgentResourceEntity[]>;
}
export { AgentResourceEntity };
