import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSwarm, AgentSwarmLoadMatch, AgentSwarmListMatch, AgentSwarmCreateData, AgentSwarmUpdateData } from '../ComposalTypes';
declare class AgentSwarmEntity extends ComposalEntityBase<AgentSwarm> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSwarmEntity): AgentSwarmEntity;
    load(this: any, reqmatch?: AgentSwarmLoadMatch, ctrl?: Control): Promise<AgentSwarmEntity>;
    list(this: any, reqmatch?: AgentSwarmListMatch, ctrl?: Control): Promise<AgentSwarmEntity[]>;
    create(this: any, reqdata?: AgentSwarmCreateData, ctrl?: Control): Promise<AgentSwarmEntity>;
    update(this: any, reqdata?: AgentSwarmUpdateData, ctrl?: Control): Promise<AgentSwarmEntity>;
}
export { AgentSwarmEntity };
