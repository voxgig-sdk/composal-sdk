import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnectionDelegation, AgentConnectionDelegationListMatch } from '../ComposalTypes';
declare class AgentConnectionDelegationEntity extends ComposalEntityBase<AgentConnectionDelegation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionDelegationEntity): AgentConnectionDelegationEntity;
    list(this: any, reqmatch?: AgentConnectionDelegationListMatch, ctrl?: Control): Promise<AgentConnectionDelegationEntity[]>;
}
export { AgentConnectionDelegationEntity };
