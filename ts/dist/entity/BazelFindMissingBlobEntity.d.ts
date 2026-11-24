import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BazelFindMissingBlob, BazelFindMissingBlobCreateData } from '../ComposalTypes';
declare class BazelFindMissingBlobEntity extends ComposalEntityBase<BazelFindMissingBlob> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelFindMissingBlobEntity): BazelFindMissingBlobEntity;
    create(this: any, reqdata?: BazelFindMissingBlobCreateData, ctrl?: Control): Promise<BazelFindMissingBlobEntity>;
}
export { BazelFindMissingBlobEntity };
