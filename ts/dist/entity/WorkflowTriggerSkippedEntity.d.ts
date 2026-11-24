import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkflowTriggerSkipped, WorkflowTriggerSkippedCreateData } from '../ComposalTypes';
declare class WorkflowTriggerSkippedEntity extends ComposalEntityBase<WorkflowTriggerSkipped> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkflowTriggerSkippedEntity): WorkflowTriggerSkippedEntity;
    create(this: any, reqdata?: WorkflowTriggerSkippedCreateData, ctrl?: Control): Promise<WorkflowTriggerSkippedEntity>;
}
export { WorkflowTriggerSkippedEntity };
