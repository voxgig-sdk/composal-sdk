import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWorkflowRun, AgentWorkflowRunLoadMatch, AgentWorkflowRunListMatch, AgentWorkflowRunCreateData } from '../ComposalTypes';
declare class AgentWorkflowRunEntity extends ComposalEntityBase<AgentWorkflowRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkflowRunEntity): AgentWorkflowRunEntity;
    load(this: any, reqmatch?: AgentWorkflowRunLoadMatch, ctrl?: Control): Promise<AgentWorkflowRunEntity>;
    list(this: any, reqmatch?: AgentWorkflowRunListMatch, ctrl?: Control): Promise<AgentWorkflowRunEntity[]>;
    create(this: any, reqdata?: AgentWorkflowRunCreateData, ctrl?: Control): Promise<AgentWorkflowRunEntity>;
}
export { AgentWorkflowRunEntity };
