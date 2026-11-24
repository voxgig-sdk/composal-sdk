import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ThreadPreviewAccess, ThreadPreviewAccessLoadMatch, ThreadPreviewAccessCreateData } from '../ComposalTypes';
declare class ThreadPreviewAccessEntity extends ComposalEntityBase<ThreadPreviewAccess> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ThreadPreviewAccessEntity): ThreadPreviewAccessEntity;
    load(this: any, reqmatch?: ThreadPreviewAccessLoadMatch, ctrl?: Control): Promise<ThreadPreviewAccessEntity>;
    create(this: any, reqdata?: ThreadPreviewAccessCreateData, ctrl?: Control): Promise<ThreadPreviewAccessEntity>;
}
export { ThreadPreviewAccessEntity };
