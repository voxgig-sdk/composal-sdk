import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingSubscription, BillingSubscriptionUpdateData, BillingSubscriptionPatchData } from '../ComposalTypes';
declare class BillingSubscriptionEntity extends ComposalEntityBase<BillingSubscription> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingSubscriptionEntity): BillingSubscriptionEntity;
    update(this: any, reqdata?: BillingSubscriptionUpdateData, ctrl?: Control): Promise<BillingSubscriptionEntity>;
    patch(this: any, reqdata?: BillingSubscriptionPatchData, ctrl?: Control): Promise<BillingSubscriptionEntity>;
}
export { BillingSubscriptionEntity };
