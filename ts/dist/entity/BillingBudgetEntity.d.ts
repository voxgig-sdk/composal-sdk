import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingBudget, BillingBudgetUpdateData, BillingBudgetPatchData } from '../ComposalTypes';
declare class BillingBudgetEntity extends ComposalEntityBase<BillingBudget> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingBudgetEntity): BillingBudgetEntity;
    update(this: any, reqdata?: BillingBudgetUpdateData, ctrl?: Control): Promise<BillingBudgetEntity>;
    patch(this: any, reqdata?: BillingBudgetPatchData, ctrl?: Control): Promise<BillingBudgetEntity>;
}
export { BillingBudgetEntity };
