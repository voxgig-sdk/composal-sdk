import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { JobLogChunk, JobLogChunkListMatch, JobLogChunkCreateData } from '../ComposalTypes';
declare class JobLogChunkEntity extends ComposalEntityBase<JobLogChunk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: JobLogChunkEntity): JobLogChunkEntity;
    list(this: any, reqmatch?: JobLogChunkListMatch, ctrl?: Control): Promise<JobLogChunkEntity[]>;
    create(this: any, reqdata?: JobLogChunkCreateData, ctrl?: Control): Promise<JobLogChunkEntity>;
}
export { JobLogChunkEntity };
