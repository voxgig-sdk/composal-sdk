import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppServiceBinding, AppServiceBindingLoadMatch, AppServiceBindingCreateData, AppServiceBindingUpdateData, AppServiceBindingPatchData, AppServiceBindingRemoveMatch } from '../ComposalTypes';
declare class AppServiceBindingEntity extends ComposalEntityBase<AppServiceBinding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppServiceBindingEntity): AppServiceBindingEntity;
    load(this: any, reqmatch?: AppServiceBindingLoadMatch, ctrl?: Control): Promise<AppServiceBindingEntity>;
    create(this: any, reqdata?: AppServiceBindingCreateData, ctrl?: Control): Promise<AppServiceBindingEntity>;
    update(this: any, reqdata?: AppServiceBindingUpdateData, ctrl?: Control): Promise<AppServiceBindingEntity>;
    patch(this: any, reqdata?: AppServiceBindingPatchData, ctrl?: Control): Promise<AppServiceBindingEntity>;
    remove(this: any, reqmatch?: AppServiceBindingRemoveMatch, ctrl?: Control): Promise<AppServiceBindingEntity>;
}
export { AppServiceBindingEntity };
