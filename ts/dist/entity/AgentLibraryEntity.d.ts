import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentLibrary, AgentLibraryLoadMatch } from '../ComposalTypes';
declare class AgentLibraryEntity extends ComposalEntityBase<AgentLibrary> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentLibraryEntity): AgentLibraryEntity;
    load(this: any, reqmatch?: AgentLibraryLoadMatch, ctrl?: Control): Promise<AgentLibraryEntity>;
}
export { AgentLibraryEntity };
