import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppStorageResource, AppStorageResourceLoadMatch, AppStorageResourceCreateData, AppStorageResourceUpdateData, AppStorageResourcePatchData, AppStorageResourceRemoveMatch } from '../ComposalTypes';
declare class AppStorageResourceEntity extends ComposalEntityBase<AppStorageResource> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppStorageResourceEntity): AppStorageResourceEntity;
    load(this: any, reqmatch?: AppStorageResourceLoadMatch, ctrl?: Control): Promise<AppStorageResourceEntity>;
    create(this: any, reqdata?: AppStorageResourceCreateData, ctrl?: Control): Promise<AppStorageResourceEntity>;
    update(this: any, reqdata?: AppStorageResourceUpdateData, ctrl?: Control): Promise<AppStorageResourceEntity>;
    patch(this: any, reqdata?: AppStorageResourcePatchData, ctrl?: Control): Promise<AppStorageResourceEntity>;
    remove(this: any, reqmatch?: AppStorageResourceRemoveMatch, ctrl?: Control): Promise<AppStorageResourceEntity>;
}
export { AppStorageResourceEntity };
