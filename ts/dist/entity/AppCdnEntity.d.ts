import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppCdn, AppCdnLoadMatch, AppCdnCreateData, AppCdnUpdateData, AppCdnPatchData, AppCdnRemoveMatch } from '../ComposalTypes';
declare class AppCdnEntity extends ComposalEntityBase<AppCdn> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppCdnEntity): AppCdnEntity;
    load(this: any, reqmatch?: AppCdnLoadMatch, ctrl?: Control): Promise<AppCdnEntity>;
    create(this: any, reqdata?: AppCdnCreateData, ctrl?: Control): Promise<AppCdnEntity>;
    update(this: any, reqdata?: AppCdnUpdateData, ctrl?: Control): Promise<AppCdnEntity>;
    patch(this: any, reqdata?: AppCdnPatchData, ctrl?: Control): Promise<AppCdnEntity>;
    remove(this: any, reqmatch?: AppCdnRemoveMatch, ctrl?: Control): Promise<AppCdnEntity>;
}
export { AppCdnEntity };
