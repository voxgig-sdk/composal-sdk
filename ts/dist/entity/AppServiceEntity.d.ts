import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppService, AppServiceLoadMatch, AppServiceCreateData, AppServiceUpdateData, AppServicePatchData, AppServiceRemoveMatch } from '../ComposalTypes';
declare class AppServiceEntity extends ComposalEntityBase<AppService> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppServiceEntity): AppServiceEntity;
    load(this: any, reqmatch?: AppServiceLoadMatch, ctrl?: Control): Promise<AppServiceEntity>;
    create(this: any, reqdata?: AppServiceCreateData, ctrl?: Control): Promise<AppServiceEntity>;
    update(this: any, reqdata?: AppServiceUpdateData, ctrl?: Control): Promise<AppServiceEntity>;
    patch(this: any, reqdata?: AppServicePatchData, ctrl?: Control): Promise<AppServiceEntity>;
    remove(this: any, reqmatch?: AppServiceRemoveMatch, ctrl?: Control): Promise<AppServiceEntity>;
}
export { AppServiceEntity };
