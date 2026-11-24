import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Memory, MemoryLoadMatch, MemoryListMatch, MemoryCreateData, MemoryRemoveMatch } from '../ComposalTypes';
declare class MemoryEntity extends ComposalEntityBase<Memory> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MemoryEntity): MemoryEntity;
    load(this: any, reqmatch?: MemoryLoadMatch, ctrl?: Control): Promise<MemoryEntity>;
    list(this: any, reqmatch?: MemoryListMatch, ctrl?: Control): Promise<MemoryEntity[]>;
    create(this: any, reqdata?: MemoryCreateData, ctrl?: Control): Promise<MemoryEntity>;
    remove(this: any, reqmatch?: MemoryRemoveMatch, ctrl?: Control): Promise<MemoryEntity>;
}
export { MemoryEntity };
