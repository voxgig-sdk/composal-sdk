import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSessionRoderHandoff, AgentSessionRoderHandoffCreateData } from '../ComposalTypes';
declare class AgentSessionRoderHandoffEntity extends ComposalEntityBase<AgentSessionRoderHandoff> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSessionRoderHandoffEntity): AgentSessionRoderHandoffEntity;
    create(this: any, reqdata?: AgentSessionRoderHandoffCreateData, ctrl?: Control): Promise<AgentSessionRoderHandoffEntity>;
}
export { AgentSessionRoderHandoffEntity };
