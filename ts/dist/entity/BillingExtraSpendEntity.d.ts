import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingExtraSpend, BillingExtraSpendUpdateData, BillingExtraSpendPatchData } from '../ComposalTypes';
declare class BillingExtraSpendEntity extends ComposalEntityBase<BillingExtraSpend> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingExtraSpendEntity): BillingExtraSpendEntity;
    update(this: any, reqdata?: BillingExtraSpendUpdateData, ctrl?: Control): Promise<BillingExtraSpendEntity>;
    patch(this: any, reqdata?: BillingExtraSpendPatchData, ctrl?: Control): Promise<BillingExtraSpendEntity>;
}
export { BillingExtraSpendEntity };
