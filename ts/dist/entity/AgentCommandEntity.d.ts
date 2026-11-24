import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentCommand, AgentCommandListMatch } from '../ComposalTypes';
declare class AgentCommandEntity extends ComposalEntityBase<AgentCommand> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentCommandEntity): AgentCommandEntity;
    list(this: any, reqmatch?: AgentCommandListMatch, ctrl?: Control): Promise<AgentCommandEntity[]>;
}
export { AgentCommandEntity };
