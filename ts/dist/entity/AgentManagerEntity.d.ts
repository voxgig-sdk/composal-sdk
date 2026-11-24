import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentManager, AgentManagerCreateData, AgentManagerRemoveMatch } from '../ComposalTypes';
declare class AgentManagerEntity extends ComposalEntityBase<AgentManager> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentManagerEntity): AgentManagerEntity;
    create(this: any, reqdata?: AgentManagerCreateData, ctrl?: Control): Promise<AgentManagerEntity>;
    remove(this: any, reqmatch?: AgentManagerRemoveMatch, ctrl?: Control): Promise<AgentManagerEntity>;
}
export { AgentManagerEntity };
