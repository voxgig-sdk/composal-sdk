import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentEvent, AgentEventLoadMatch } from '../ComposalTypes';
declare class AgentEventEntity extends ComposalEntityBase<AgentEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentEventEntity): AgentEventEntity;
    load(this: any, reqmatch?: AgentEventLoadMatch, ctrl?: Control): Promise<AgentEventEntity>;
}
export { AgentEventEntity };
