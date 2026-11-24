import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnectionSafetyControl, AgentConnectionSafetyControlListMatch } from '../ComposalTypes';
declare class AgentConnectionSafetyControlEntity extends ComposalEntityBase<AgentConnectionSafetyControl> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionSafetyControlEntity): AgentConnectionSafetyControlEntity;
    list(this: any, reqmatch?: AgentConnectionSafetyControlListMatch, ctrl?: Control): Promise<AgentConnectionSafetyControlEntity[]>;
}
export { AgentConnectionSafetyControlEntity };
