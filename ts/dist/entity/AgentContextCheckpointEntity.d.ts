import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentContextCheckpoint, AgentContextCheckpointLoadMatch } from '../ComposalTypes';
declare class AgentContextCheckpointEntity extends ComposalEntityBase<AgentContextCheckpoint> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentContextCheckpointEntity): AgentContextCheckpointEntity;
    load(this: any, reqmatch?: AgentContextCheckpointLoadMatch, ctrl?: Control): Promise<AgentContextCheckpointEntity>;
}
export { AgentContextCheckpointEntity };
