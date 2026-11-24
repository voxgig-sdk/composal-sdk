import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkflowRunStep, WorkflowRunStepLoadMatch } from '../ComposalTypes';
declare class WorkflowRunStepEntity extends ComposalEntityBase<WorkflowRunStep> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkflowRunStepEntity): WorkflowRunStepEntity;
    load(this: any, reqmatch?: WorkflowRunStepLoadMatch, ctrl?: Control): Promise<WorkflowRunStepEntity>;
}
export { WorkflowRunStepEntity };
