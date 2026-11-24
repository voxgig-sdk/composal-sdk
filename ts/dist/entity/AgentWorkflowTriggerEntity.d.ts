import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWorkflowTrigger, AgentWorkflowTriggerLoadMatch, AgentWorkflowTriggerListMatch, AgentWorkflowTriggerUpdateData, AgentWorkflowTriggerRemoveMatch } from '../ComposalTypes';
declare class AgentWorkflowTriggerEntity extends ComposalEntityBase<AgentWorkflowTrigger> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkflowTriggerEntity): AgentWorkflowTriggerEntity;
    load(this: any, reqmatch?: AgentWorkflowTriggerLoadMatch, ctrl?: Control): Promise<AgentWorkflowTriggerEntity>;
    list(this: any, reqmatch?: AgentWorkflowTriggerListMatch, ctrl?: Control): Promise<AgentWorkflowTriggerEntity[]>;
    update(this: any, reqdata?: AgentWorkflowTriggerUpdateData, ctrl?: Control): Promise<AgentWorkflowTriggerEntity>;
    remove(this: any, reqmatch?: AgentWorkflowTriggerRemoveMatch, ctrl?: Control): Promise<AgentWorkflowTriggerEntity>;
}
export { AgentWorkflowTriggerEntity };
