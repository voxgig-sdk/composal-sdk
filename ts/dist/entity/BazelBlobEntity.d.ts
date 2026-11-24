import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BazelBlob, BazelBlobLoadMatch, BazelBlobUpdateData } from '../ComposalTypes';
declare class BazelBlobEntity extends ComposalEntityBase<BazelBlob> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelBlobEntity): BazelBlobEntity;
    load(this: any, reqmatch?: BazelBlobLoadMatch, ctrl?: Control): Promise<BazelBlobEntity>;
    update(this: any, reqdata?: BazelBlobUpdateData, ctrl?: Control): Promise<BazelBlobEntity>;
}
export { BazelBlobEntity };
