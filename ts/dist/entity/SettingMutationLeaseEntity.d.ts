import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SettingMutationLease, SettingMutationLeaseCreateData } from '../ComposalTypes';
declare class SettingMutationLeaseEntity extends ComposalEntityBase<SettingMutationLease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SettingMutationLeaseEntity): SettingMutationLeaseEntity;
    create(this: any, reqdata?: SettingMutationLeaseCreateData, ctrl?: Control): Promise<SettingMutationLeaseEntity>;
}
export { SettingMutationLeaseEntity };
