import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnectionGrant, AgentConnectionGrantListMatch } from '../ComposalTypes';
declare class AgentConnectionGrantEntity extends ComposalEntityBase<AgentConnectionGrant> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionGrantEntity): AgentConnectionGrantEntity;
    list(this: any, reqmatch?: AgentConnectionGrantListMatch, ctrl?: Control): Promise<AgentConnectionGrantEntity[]>;
}
export { AgentConnectionGrantEntity };
