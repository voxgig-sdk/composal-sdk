import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CheckpointPrepareChunk, CheckpointPrepareChunkCreateData } from '../ComposalTypes';
declare class CheckpointPrepareChunkEntity extends ComposalEntityBase<CheckpointPrepareChunk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CheckpointPrepareChunkEntity): CheckpointPrepareChunkEntity;
    create(this: any, reqdata?: CheckpointPrepareChunkCreateData, ctrl?: Control): Promise<CheckpointPrepareChunkEntity>;
}
export { CheckpointPrepareChunkEntity };
