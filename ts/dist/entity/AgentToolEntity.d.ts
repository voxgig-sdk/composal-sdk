import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentTool, AgentToolListMatch } from '../ComposalTypes';
declare class AgentToolEntity extends ComposalEntityBase<AgentTool> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentToolEntity): AgentToolEntity;
    list(this: any, reqmatch?: AgentToolListMatch, ctrl?: Control): Promise<AgentToolEntity[]>;
}
export { AgentToolEntity };
