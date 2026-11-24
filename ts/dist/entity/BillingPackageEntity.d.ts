import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingPackage, BillingPackageListMatch } from '../ComposalTypes';
declare class BillingPackageEntity extends ComposalEntityBase<BillingPackage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingPackageEntity): BillingPackageEntity;
    list(this: any, reqmatch?: BillingPackageListMatch, ctrl?: Control): Promise<BillingPackageEntity[]>;
}
export { BillingPackageEntity };
