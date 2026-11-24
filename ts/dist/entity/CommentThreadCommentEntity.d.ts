import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CommentThreadComment, CommentThreadCommentCreateData } from '../ComposalTypes';
declare class CommentThreadCommentEntity extends ComposalEntityBase<CommentThreadComment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CommentThreadCommentEntity): CommentThreadCommentEntity;
    create(this: any, reqdata?: CommentThreadCommentCreateData, ctrl?: Control): Promise<CommentThreadCommentEntity>;
}
export { CommentThreadCommentEntity };
