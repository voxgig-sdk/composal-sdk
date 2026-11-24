import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestSettingDetectComment, PullRequestSettingDetectCommentCreateData } from '../ComposalTypes';
declare class PullRequestSettingDetectCommentEntity extends ComposalEntityBase<PullRequestSettingDetectComment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestSettingDetectCommentEntity): PullRequestSettingDetectCommentEntity;
    create(this: any, reqdata?: PullRequestSettingDetectCommentCreateData, ctrl?: Control): Promise<PullRequestSettingDetectCommentEntity>;
}
export { PullRequestSettingDetectCommentEntity };
