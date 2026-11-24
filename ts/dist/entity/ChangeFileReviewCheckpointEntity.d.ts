import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeFileReviewCheckpoint, ChangeFileReviewCheckpointCreateData } from '../ComposalTypes';
declare class ChangeFileReviewCheckpointEntity extends ComposalEntityBase<ChangeFileReviewCheckpoint> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeFileReviewCheckpointEntity): ChangeFileReviewCheckpointEntity;
    create(this: any, reqdata?: ChangeFileReviewCheckpointCreateData, ctrl?: Control): Promise<ChangeFileReviewCheckpointEntity>;
}
export { ChangeFileReviewCheckpointEntity };
