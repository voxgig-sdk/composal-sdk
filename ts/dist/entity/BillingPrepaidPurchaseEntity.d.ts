import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingPrepaidPurchase, BillingPrepaidPurchaseLoadMatch, BillingPrepaidPurchaseListMatch, BillingPrepaidPurchaseCreateData } from '../ComposalTypes';
declare class BillingPrepaidPurchaseEntity extends ComposalEntityBase<BillingPrepaidPurchase> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingPrepaidPurchaseEntity): BillingPrepaidPurchaseEntity;
    load(this: any, reqmatch?: BillingPrepaidPurchaseLoadMatch, ctrl?: Control): Promise<BillingPrepaidPurchaseEntity>;
    list(this: any, reqmatch?: BillingPrepaidPurchaseListMatch, ctrl?: Control): Promise<BillingPrepaidPurchaseEntity[]>;
    create(this: any, reqdata?: BillingPrepaidPurchaseCreateData, ctrl?: Control): Promise<BillingPrepaidPurchaseEntity>;
}
export { BillingPrepaidPurchaseEntity };
