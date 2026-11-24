import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { App, AppLoadMatch, AppListMatch, AppCreateData, AppUpdateData, AppPatchData, AppRemoveMatch } from '../ComposalTypes';
declare class AppEntity extends ComposalEntityBase<App> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppEntity): AppEntity;
    load(this: any, reqmatch?: AppLoadMatch, ctrl?: Control): Promise<AppEntity>;
    list(this: any, reqmatch?: AppListMatch, ctrl?: Control): Promise<AppEntity[]>;
    create(this: any, reqdata?: AppCreateData, ctrl?: Control): Promise<AppEntity>;
    update(this: any, reqdata?: AppUpdateData, ctrl?: Control): Promise<AppEntity>;
    patch(this: any, reqdata?: AppPatchData, ctrl?: Control): Promise<AppEntity>;
    remove(this: any, reqmatch?: AppRemoveMatch, ctrl?: Control): Promise<AppEntity>;
}
export { AppEntity };
