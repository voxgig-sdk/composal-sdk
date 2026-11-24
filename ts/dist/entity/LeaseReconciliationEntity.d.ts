import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseReconciliation, LeaseReconciliationCreateData } from '../ComposalTypes';
declare class LeaseReconciliationEntity extends ComposalEntityBase<LeaseReconciliation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseReconciliationEntity): LeaseReconciliationEntity;
    create(this: any, reqdata?: LeaseReconciliationCreateData, ctrl?: Control): Promise<LeaseReconciliationEntity>;
}
export { LeaseReconciliationEntity };
