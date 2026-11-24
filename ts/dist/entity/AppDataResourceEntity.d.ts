import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDataResource, AppDataResourceLoadMatch, AppDataResourceCreateData, AppDataResourceUpdateData, AppDataResourcePatchData, AppDataResourceRemoveMatch } from '../ComposalTypes';
declare class AppDataResourceEntity extends ComposalEntityBase<AppDataResource> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDataResourceEntity): AppDataResourceEntity;
    load(this: any, reqmatch?: AppDataResourceLoadMatch, ctrl?: Control): Promise<AppDataResourceEntity>;
    create(this: any, reqdata?: AppDataResourceCreateData, ctrl?: Control): Promise<AppDataResourceEntity>;
    update(this: any, reqdata?: AppDataResourceUpdateData, ctrl?: Control): Promise<AppDataResourceEntity>;
    patch(this: any, reqdata?: AppDataResourcePatchData, ctrl?: Control): Promise<AppDataResourceEntity>;
    remove(this: any, reqmatch?: AppDataResourceRemoveMatch, ctrl?: Control): Promise<AppDataResourceEntity>;
}
export { AppDataResourceEntity };
