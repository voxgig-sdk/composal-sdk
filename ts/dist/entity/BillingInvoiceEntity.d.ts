import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingInvoice, BillingInvoiceListMatch } from '../ComposalTypes';
declare class BillingInvoiceEntity extends ComposalEntityBase<BillingInvoice> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingInvoiceEntity): BillingInvoiceEntity;
    list(this: any, reqmatch?: BillingInvoiceListMatch, ctrl?: Control): Promise<BillingInvoiceEntity[]>;
}
export { BillingInvoiceEntity };
