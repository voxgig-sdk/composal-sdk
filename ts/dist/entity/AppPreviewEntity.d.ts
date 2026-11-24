import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppPreview, AppPreviewLoadMatch, AppPreviewListMatch, AppPreviewCreateData, AppPreviewUpdateData, AppPreviewPatchData, AppPreviewRemoveMatch } from '../ComposalTypes';
declare class AppPreviewEntity extends ComposalEntityBase<AppPreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppPreviewEntity): AppPreviewEntity;
    load(this: any, reqmatch?: AppPreviewLoadMatch, ctrl?: Control): Promise<AppPreviewEntity>;
    list(this: any, reqmatch?: AppPreviewListMatch, ctrl?: Control): Promise<AppPreviewEntity[]>;
    create(this: any, reqdata?: AppPreviewCreateData, ctrl?: Control): Promise<AppPreviewEntity>;
    update(this: any, reqdata?: AppPreviewUpdateData, ctrl?: Control): Promise<AppPreviewEntity>;
    patch(this: any, reqdata?: AppPreviewPatchData, ctrl?: Control): Promise<AppPreviewEntity>;
    remove(this: any, reqmatch?: AppPreviewRemoveMatch, ctrl?: Control): Promise<AppPreviewEntity>;
}
export { AppPreviewEntity };
