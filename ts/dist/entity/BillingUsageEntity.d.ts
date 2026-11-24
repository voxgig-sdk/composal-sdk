import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingUsage, BillingUsageLoadMatch } from '../ComposalTypes';
declare class BillingUsageEntity extends ComposalEntityBase<BillingUsage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingUsageEntity): BillingUsageEntity;
    load(this: any, reqmatch?: BillingUsageLoadMatch, ctrl?: Control): Promise<BillingUsageEntity>;
}
export { BillingUsageEntity };
