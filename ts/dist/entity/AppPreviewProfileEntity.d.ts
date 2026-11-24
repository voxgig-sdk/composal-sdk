import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppPreviewProfile, AppPreviewProfileLoadMatch, AppPreviewProfileListMatch, AppPreviewProfileCreateData, AppPreviewProfileUpdateData, AppPreviewProfilePatchData, AppPreviewProfileRemoveMatch } from '../ComposalTypes';
declare class AppPreviewProfileEntity extends ComposalEntityBase<AppPreviewProfile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppPreviewProfileEntity): AppPreviewProfileEntity;
    load(this: any, reqmatch?: AppPreviewProfileLoadMatch, ctrl?: Control): Promise<AppPreviewProfileEntity>;
    list(this: any, reqmatch?: AppPreviewProfileListMatch, ctrl?: Control): Promise<AppPreviewProfileEntity[]>;
    create(this: any, reqdata?: AppPreviewProfileCreateData, ctrl?: Control): Promise<AppPreviewProfileEntity>;
    update(this: any, reqdata?: AppPreviewProfileUpdateData, ctrl?: Control): Promise<AppPreviewProfileEntity>;
    patch(this: any, reqdata?: AppPreviewProfilePatchData, ctrl?: Control): Promise<AppPreviewProfileEntity>;
    remove(this: any, reqmatch?: AppPreviewProfileRemoveMatch, ctrl?: Control): Promise<AppPreviewProfileEntity>;
}
export { AppPreviewProfileEntity };
