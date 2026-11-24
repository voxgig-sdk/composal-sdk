import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentInteraction, AgentInteractionLoadMatch, AgentInteractionListMatch, AgentInteractionCreateData } from '../ComposalTypes';
declare class AgentInteractionEntity extends ComposalEntityBase<AgentInteraction> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentInteractionEntity): AgentInteractionEntity;
    load(this: any, reqmatch?: AgentInteractionLoadMatch, ctrl?: Control): Promise<AgentInteractionEntity>;
    list(this: any, reqmatch?: AgentInteractionListMatch, ctrl?: Control): Promise<AgentInteractionEntity[]>;
    create(this: any, reqdata?: AgentInteractionCreateData, ctrl?: Control): Promise<AgentInteractionEntity>;
}
export { AgentInteractionEntity };
