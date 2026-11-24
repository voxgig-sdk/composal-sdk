import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentControlFlow, AgentControlFlowLoadMatch, AgentControlFlowListMatch, AgentControlFlowCreateData } from '../ComposalTypes';
declare class AgentControlFlowEntity extends ComposalEntityBase<AgentControlFlow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentControlFlowEntity): AgentControlFlowEntity;
    load(this: any, reqmatch?: AgentControlFlowLoadMatch, ctrl?: Control): Promise<AgentControlFlowEntity>;
    list(this: any, reqmatch?: AgentControlFlowListMatch, ctrl?: Control): Promise<AgentControlFlowEntity[]>;
    create(this: any, reqdata?: AgentControlFlowCreateData, ctrl?: Control): Promise<AgentControlFlowEntity>;
}
export { AgentControlFlowEntity };
