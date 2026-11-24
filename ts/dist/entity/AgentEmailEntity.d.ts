import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentEmail, AgentEmailLoadMatch } from '../ComposalTypes';
declare class AgentEmailEntity extends ComposalEntityBase<AgentEmail> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentEmailEntity): AgentEmailEntity;
    load(this: any, reqmatch?: AgentEmailLoadMatch, ctrl?: Control): Promise<AgentEmailEntity>;
}
export { AgentEmailEntity };
