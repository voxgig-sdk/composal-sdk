import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeComment, ChangeCommentLoadMatch, ChangeCommentCreateData } from '../ComposalTypes';
declare class ChangeCommentEntity extends ComposalEntityBase<ChangeComment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeCommentEntity): ChangeCommentEntity;
    load(this: any, reqmatch?: ChangeCommentLoadMatch, ctrl?: Control): Promise<ChangeCommentEntity>;
    create(this: any, reqdata?: ChangeCommentCreateData, ctrl?: Control): Promise<ChangeCommentEntity>;
}
export { ChangeCommentEntity };
