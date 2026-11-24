import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkflowRunStopNotice, WorkflowRunStopNoticeCreateData } from '../ComposalTypes';
declare class WorkflowRunStopNoticeEntity extends ComposalEntityBase<WorkflowRunStopNotice> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkflowRunStopNoticeEntity): WorkflowRunStopNoticeEntity;
    create(this: any, reqdata?: WorkflowRunStopNoticeCreateData, ctrl?: Control): Promise<WorkflowRunStopNoticeEntity>;
}
export { WorkflowRunStopNoticeEntity };
