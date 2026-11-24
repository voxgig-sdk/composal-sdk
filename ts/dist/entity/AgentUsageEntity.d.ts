import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentUsage, AgentUsageLoadMatch } from '../ComposalTypes';
declare class AgentUsageEntity extends ComposalEntityBase<AgentUsage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentUsageEntity): AgentUsageEntity;
    load(this: any, reqmatch?: AgentUsageLoadMatch, ctrl?: Control): Promise<AgentUsageEntity>;
}
export { AgentUsageEntity };
