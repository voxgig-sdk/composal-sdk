import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWait, AgentWaitCreateData } from '../ComposalTypes';
declare class AgentWaitEntity extends ComposalEntityBase<AgentWait> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWaitEntity): AgentWaitEntity;
    create(this: any, reqdata?: AgentWaitCreateData, ctrl?: Control): Promise<AgentWaitEntity>;
}
export { AgentWaitEntity };
