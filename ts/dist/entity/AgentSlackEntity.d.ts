import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSlack, AgentSlackCreateData } from '../ComposalTypes';
declare class AgentSlackEntity extends ComposalEntityBase<AgentSlack> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSlackEntity): AgentSlackEntity;
    create(this: any, reqdata?: AgentSlackCreateData, ctrl?: Control): Promise<AgentSlackEntity>;
}
export { AgentSlackEntity };
