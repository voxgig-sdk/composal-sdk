import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Agent, AgentLoadMatch, AgentListMatch, AgentCreateData, AgentUpdateData, AgentRemoveMatch } from '../ComposalTypes';
declare class AgentEntity extends ComposalEntityBase<Agent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentEntity): AgentEntity;
    load(this: any, reqmatch?: AgentLoadMatch, ctrl?: Control): Promise<AgentEntity>;
    list(this: any, reqmatch?: AgentListMatch, ctrl?: Control): Promise<AgentEntity[]>;
    create(this: any, reqdata?: AgentCreateData, ctrl?: Control): Promise<AgentEntity>;
    update(this: any, reqdata?: AgentUpdateData, ctrl?: Control): Promise<AgentEntity>;
    remove(this: any, reqmatch?: AgentRemoveMatch, ctrl?: Control): Promise<AgentEntity>;
}
export { AgentEntity };
