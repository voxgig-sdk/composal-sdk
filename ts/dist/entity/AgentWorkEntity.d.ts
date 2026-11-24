import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWork, AgentWorkCreateData } from '../ComposalTypes';
declare class AgentWorkEntity extends ComposalEntityBase<AgentWork> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkEntity): AgentWorkEntity;
    create(this: any, reqdata?: AgentWorkCreateData, ctrl?: Control): Promise<AgentWorkEntity>;
}
export { AgentWorkEntity };
