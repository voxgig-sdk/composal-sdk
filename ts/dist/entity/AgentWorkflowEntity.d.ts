import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWorkflow, AgentWorkflowListMatch, AgentWorkflowCreateData, AgentWorkflowUpdateData } from '../ComposalTypes';
declare class AgentWorkflowEntity extends ComposalEntityBase<AgentWorkflow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkflowEntity): AgentWorkflowEntity;
    list(this: any, reqmatch?: AgentWorkflowListMatch, ctrl?: Control): Promise<AgentWorkflowEntity[]>;
    create(this: any, reqdata?: AgentWorkflowCreateData, ctrl?: Control): Promise<AgentWorkflowEntity>;
    update(this: any, reqdata?: AgentWorkflowUpdateData, ctrl?: Control): Promise<AgentWorkflowEntity>;
}
export { AgentWorkflowEntity };
