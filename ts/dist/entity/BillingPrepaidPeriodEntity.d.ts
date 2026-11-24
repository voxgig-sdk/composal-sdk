import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingPrepaidPeriod, BillingPrepaidPeriodLoadMatch } from '../ComposalTypes';
declare class BillingPrepaidPeriodEntity extends ComposalEntityBase<BillingPrepaidPeriod> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingPrepaidPeriodEntity): BillingPrepaidPeriodEntity;
    load(this: any, reqmatch?: BillingPrepaidPeriodLoadMatch, ctrl?: Control): Promise<BillingPrepaidPeriodEntity>;
}
export { BillingPrepaidPeriodEntity };
