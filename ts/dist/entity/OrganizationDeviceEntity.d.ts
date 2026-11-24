import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationDevice, OrganizationDeviceCreateData } from '../ComposalTypes';
declare class OrganizationDeviceEntity extends ComposalEntityBase<OrganizationDevice> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationDeviceEntity): OrganizationDeviceEntity;
    create(this: any, reqdata?: OrganizationDeviceCreateData, ctrl?: Control): Promise<OrganizationDeviceEntity>;
}
export { OrganizationDeviceEntity };
