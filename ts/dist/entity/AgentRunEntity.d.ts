import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRun, AgentRunLoadMatch } from '../ComposalTypes';
declare class AgentRunEntity extends ComposalEntityBase<AgentRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRunEntity): AgentRunEntity;
    load(this: any, reqmatch?: AgentRunLoadMatch, ctrl?: Control): Promise<AgentRunEntity>;
}
export { AgentRunEntity };
