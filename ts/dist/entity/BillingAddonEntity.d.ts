import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingAddon, BillingAddonUpdateData } from '../ComposalTypes';
declare class BillingAddonEntity extends ComposalEntityBase<BillingAddon> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingAddonEntity): BillingAddonEntity;
    update(this: any, reqdata?: BillingAddonUpdateData, ctrl?: Control): Promise<BillingAddonEntity>;
}
export { BillingAddonEntity };
