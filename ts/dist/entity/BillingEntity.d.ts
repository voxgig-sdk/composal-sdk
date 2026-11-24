import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch } from '../ComposalTypes';
declare class BillingEntity extends ComposalEntityBase<Billing> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
}
export { BillingEntity };
