import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingTokenTopUp, BillingTokenTopUpCreateData } from '../ComposalTypes';
declare class BillingTokenTopUpEntity extends ComposalEntityBase<BillingTokenTopUp> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingTokenTopUpEntity): BillingTokenTopUpEntity;
    create(this: any, reqdata?: BillingTokenTopUpCreateData, ctrl?: Control): Promise<BillingTokenTopUpEntity>;
}
export { BillingTokenTopUpEntity };
