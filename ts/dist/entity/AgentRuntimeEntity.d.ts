import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRuntime, AgentRuntimeCreateData } from '../ComposalTypes';
declare class AgentRuntimeEntity extends ComposalEntityBase<AgentRuntime> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRuntimeEntity): AgentRuntimeEntity;
    create(this: any, reqdata?: AgentRuntimeCreateData, ctrl?: Control): Promise<AgentRuntimeEntity>;
}
export { AgentRuntimeEntity };
