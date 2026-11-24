import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestMagicMerge, PullRequestMagicMergeCreateData } from '../ComposalTypes';
declare class PullRequestMagicMergeEntity extends ComposalEntityBase<PullRequestMagicMerge> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestMagicMergeEntity): PullRequestMagicMergeEntity;
    create(this: any, reqdata?: PullRequestMagicMergeCreateData, ctrl?: Control): Promise<PullRequestMagicMergeEntity>;
}
export { PullRequestMagicMergeEntity };
