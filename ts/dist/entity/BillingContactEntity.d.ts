import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingContact, BillingContactUpdateData, BillingContactPatchData } from '../ComposalTypes';
declare class BillingContactEntity extends ComposalEntityBase<BillingContact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingContactEntity): BillingContactEntity;
    update(this: any, reqdata?: BillingContactUpdateData, ctrl?: Control): Promise<BillingContactEntity>;
    patch(this: any, reqdata?: BillingContactPatchData, ctrl?: Control): Promise<BillingContactEntity>;
}
export { BillingContactEntity };
