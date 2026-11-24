import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeReviewer, ChangeReviewerListMatch, ChangeReviewerUpdateData } from '../ComposalTypes';
declare class ChangeReviewerEntity extends ComposalEntityBase<ChangeReviewer> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeReviewerEntity): ChangeReviewerEntity;
    list(this: any, reqmatch?: ChangeReviewerListMatch, ctrl?: Control): Promise<ChangeReviewerEntity[]>;
    update(this: any, reqdata?: ChangeReviewerUpdateData, ctrl?: Control): Promise<ChangeReviewerEntity>;
}
export { ChangeReviewerEntity };
