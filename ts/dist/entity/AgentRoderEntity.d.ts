import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRoder, AgentRoderLoadMatch, AgentRoderCreateData } from '../ComposalTypes';
declare class AgentRoderEntity extends ComposalEntityBase<AgentRoder> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRoderEntity): AgentRoderEntity;
    load(this: any, reqmatch?: AgentRoderLoadMatch, ctrl?: Control): Promise<AgentRoderEntity>;
    create(this: any, reqdata?: AgentRoderCreateData, ctrl?: Control): Promise<AgentRoderEntity>;
}
export { AgentRoderEntity };
