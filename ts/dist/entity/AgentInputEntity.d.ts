import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentInput, AgentInputCreateData } from '../ComposalTypes';
declare class AgentInputEntity extends ComposalEntityBase<AgentInput> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentInputEntity): AgentInputEntity;
    create(this: any, reqdata?: AgentInputCreateData, ctrl?: Control): Promise<AgentInputEntity>;
}
export { AgentInputEntity };
