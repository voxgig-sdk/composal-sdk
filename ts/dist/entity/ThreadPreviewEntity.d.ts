import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ThreadPreview, ThreadPreviewCreateData } from '../ComposalTypes';
declare class ThreadPreviewEntity extends ComposalEntityBase<ThreadPreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ThreadPreviewEntity): ThreadPreviewEntity;
    create(this: any, reqdata?: ThreadPreviewCreateData, ctrl?: Control): Promise<ThreadPreviewEntity>;
}
export { ThreadPreviewEntity };
