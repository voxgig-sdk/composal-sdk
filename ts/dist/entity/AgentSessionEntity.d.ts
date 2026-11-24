import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSession, AgentSessionLoadMatch } from '../ComposalTypes';
declare class AgentSessionEntity extends ComposalEntityBase<AgentSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSessionEntity): AgentSessionEntity;
    load(this: any, reqmatch?: AgentSessionLoadMatch, ctrl?: Control): Promise<AgentSessionEntity>;
}
export { AgentSessionEntity };
