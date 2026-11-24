import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSubagent, AgentSubagentListMatch } from '../ComposalTypes';
declare class AgentSubagentEntity extends ComposalEntityBase<AgentSubagent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSubagentEntity): AgentSubagentEntity;
    list(this: any, reqmatch?: AgentSubagentListMatch, ctrl?: Control): Promise<AgentSubagentEntity[]>;
}
export { AgentSubagentEntity };
