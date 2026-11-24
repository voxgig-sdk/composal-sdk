import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesBilling, PagesBillingLoadMatch } from '../ComposalTypes';
declare class PagesBillingEntity extends ComposalEntityBase<PagesBilling> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesBillingEntity): PagesBillingEntity;
    load(this: any, reqmatch?: PagesBillingLoadMatch, ctrl?: Control): Promise<PagesBillingEntity>;
}
export { PagesBillingEntity };
