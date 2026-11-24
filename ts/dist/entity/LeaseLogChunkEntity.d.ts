import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseLogChunk, LeaseLogChunkCreateData } from '../ComposalTypes';
declare class LeaseLogChunkEntity extends ComposalEntityBase<LeaseLogChunk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseLogChunkEntity): LeaseLogChunkEntity;
    create(this: any, reqdata?: LeaseLogChunkCreateData, ctrl?: Control): Promise<LeaseLogChunkEntity>;
}
export { LeaseLogChunkEntity };
