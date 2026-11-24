import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { TaskLease, TaskLeaseCreateData } from '../ComposalTypes';
declare class TaskLeaseEntity extends ComposalEntityBase<TaskLease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: TaskLeaseEntity): TaskLeaseEntity;
    create(this: any, reqdata?: TaskLeaseCreateData, ctrl?: Control): Promise<TaskLeaseEntity>;
}
export { TaskLeaseEntity };
