import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LogStreamChunk, LogStreamChunkLoadMatch, LogStreamChunkListMatch, LogStreamChunkCreateData } from '../ComposalTypes';
declare class LogStreamChunkEntity extends ComposalEntityBase<LogStreamChunk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LogStreamChunkEntity): LogStreamChunkEntity;
    load(this: any, reqmatch?: LogStreamChunkLoadMatch, ctrl?: Control): Promise<LogStreamChunkEntity>;
    list(this: any, reqmatch?: LogStreamChunkListMatch, ctrl?: Control): Promise<LogStreamChunkEntity[]>;
    create(this: any, reqdata?: LogStreamChunkCreateData, ctrl?: Control): Promise<LogStreamChunkEntity>;
}
export { LogStreamChunkEntity };
