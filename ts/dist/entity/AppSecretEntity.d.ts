import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppSecret, AppSecretLoadMatch, AppSecretListMatch, AppSecretCreateData, AppSecretUpdateData, AppSecretPatchData, AppSecretRemoveMatch } from '../ComposalTypes';
declare class AppSecretEntity extends ComposalEntityBase<AppSecret> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppSecretEntity): AppSecretEntity;
    load(this: any, reqmatch?: AppSecretLoadMatch, ctrl?: Control): Promise<AppSecretEntity>;
    list(this: any, reqmatch?: AppSecretListMatch, ctrl?: Control): Promise<AppSecretEntity[]>;
    create(this: any, reqdata?: AppSecretCreateData, ctrl?: Control): Promise<AppSecretEntity>;
    update(this: any, reqdata?: AppSecretUpdateData, ctrl?: Control): Promise<AppSecretEntity>;
    patch(this: any, reqdata?: AppSecretPatchData, ctrl?: Control): Promise<AppSecretEntity>;
    remove(this: any, reqmatch?: AppSecretRemoveMatch, ctrl?: Control): Promise<AppSecretEntity>;
}
export { AppSecretEntity };
