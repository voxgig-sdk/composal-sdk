import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentThread, AgentThreadListMatch, AgentThreadCreateData } from '../ComposalTypes';
declare class AgentThreadEntity extends ComposalEntityBase<AgentThread> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentThreadEntity): AgentThreadEntity;
    list(this: any, reqmatch?: AgentThreadListMatch, ctrl?: Control): Promise<AgentThreadEntity[]>;
    create(this: any, reqdata?: AgentThreadCreateData, ctrl?: Control): Promise<AgentThreadEntity>;
}
export { AgentThreadEntity };
