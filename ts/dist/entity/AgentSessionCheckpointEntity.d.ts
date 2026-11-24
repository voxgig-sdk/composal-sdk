import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSessionCheckpoint, AgentSessionCheckpointLoadMatch, AgentSessionCheckpointCreateData } from '../ComposalTypes';
declare class AgentSessionCheckpointEntity extends ComposalEntityBase<AgentSessionCheckpoint> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSessionCheckpointEntity): AgentSessionCheckpointEntity;
    load(this: any, reqmatch?: AgentSessionCheckpointLoadMatch, ctrl?: Control): Promise<AgentSessionCheckpointEntity>;
    create(this: any, reqdata?: AgentSessionCheckpointCreateData, ctrl?: Control): Promise<AgentSessionCheckpointEntity>;
}
export { AgentSessionCheckpointEntity };
