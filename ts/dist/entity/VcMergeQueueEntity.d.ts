import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcMergeQueue, VcMergeQueueLoadMatch, VcMergeQueueListMatch, VcMergeQueueCreateData, VcMergeQueueUpdateData } from '../ComposalTypes';
declare class VcMergeQueueEntity extends ComposalEntityBase<VcMergeQueue> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcMergeQueueEntity): VcMergeQueueEntity;
    load(this: any, reqmatch?: VcMergeQueueLoadMatch, ctrl?: Control): Promise<VcMergeQueueEntity>;
    list(this: any, reqmatch?: VcMergeQueueListMatch, ctrl?: Control): Promise<VcMergeQueueEntity[]>;
    create(this: any, reqdata?: VcMergeQueueCreateData, ctrl?: Control): Promise<VcMergeQueueEntity>;
    update(this: any, reqdata?: VcMergeQueueUpdateData, ctrl?: Control): Promise<VcMergeQueueEntity>;
}
export { VcMergeQueueEntity };
