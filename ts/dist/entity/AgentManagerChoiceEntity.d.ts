import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentManagerChoice, AgentManagerChoiceListMatch } from '../ComposalTypes';
declare class AgentManagerChoiceEntity extends ComposalEntityBase<AgentManagerChoice> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentManagerChoiceEntity): AgentManagerChoiceEntity;
    list(this: any, reqmatch?: AgentManagerChoiceListMatch, ctrl?: Control): Promise<AgentManagerChoiceEntity[]>;
}
export { AgentManagerChoiceEntity };
