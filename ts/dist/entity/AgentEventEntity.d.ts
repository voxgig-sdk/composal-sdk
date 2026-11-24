import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentEvent, AgentEventListMatch } from '../ComposalTypes';
declare class AgentEventEntity extends ComposalEntityBase<AgentEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentEventEntity): AgentEventEntity;
    list(this: any, reqmatch?: AgentEventListMatch, ctrl?: Control): Promise<AgentEventEntity[]>;
}
export { AgentEventEntity };
