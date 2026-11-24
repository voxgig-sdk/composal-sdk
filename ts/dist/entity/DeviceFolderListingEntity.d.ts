import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceFolderListing, DeviceFolderListingLoadMatch, DeviceFolderListingCreateData } from '../ComposalTypes';
declare class DeviceFolderListingEntity extends ComposalEntityBase<DeviceFolderListing> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceFolderListingEntity): DeviceFolderListingEntity;
    load(this: any, reqmatch?: DeviceFolderListingLoadMatch, ctrl?: Control): Promise<DeviceFolderListingEntity>;
    create(this: any, reqdata?: DeviceFolderListingCreateData, ctrl?: Control): Promise<DeviceFolderListingEntity>;
}
export { DeviceFolderListingEntity };
