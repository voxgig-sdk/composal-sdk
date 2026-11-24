import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeComment, ChangeCommentListMatch, ChangeCommentCreateData } from '../ComposalTypes';
declare class ChangeCommentEntity extends ComposalEntityBase<ChangeComment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeCommentEntity): ChangeCommentEntity;
    list(this: any, reqmatch?: ChangeCommentListMatch, ctrl?: Control): Promise<ChangeCommentEntity[]>;
    create(this: any, reqdata?: ChangeCommentCreateData, ctrl?: Control): Promise<ChangeCommentEntity>;
}
export { ChangeCommentEntity };
