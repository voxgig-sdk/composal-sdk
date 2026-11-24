import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentFile, AgentFileLoadMatch } from '../ComposalTypes';
declare class AgentFileEntity extends ComposalEntityBase<AgentFile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentFileEntity): AgentFileEntity;
    load(this: any, reqmatch?: AgentFileLoadMatch, ctrl?: Control): Promise<AgentFileEntity>;
}
export { AgentFileEntity };
