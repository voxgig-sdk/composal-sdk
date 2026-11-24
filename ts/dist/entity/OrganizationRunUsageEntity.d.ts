import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationRunUsage, OrganizationRunUsageCreateData } from '../ComposalTypes';
declare class OrganizationRunUsageEntity extends ComposalEntityBase<OrganizationRunUsage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationRunUsageEntity): OrganizationRunUsageEntity;
    create(this: any, reqdata?: OrganizationRunUsageCreateData, ctrl?: Control): Promise<OrganizationRunUsageEntity>;
}
export { OrganizationRunUsageEntity };
