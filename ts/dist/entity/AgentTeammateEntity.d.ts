import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentTeammate, AgentTeammateListMatch } from '../ComposalTypes';
declare class AgentTeammateEntity extends ComposalEntityBase<AgentTeammate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentTeammateEntity): AgentTeammateEntity;
    list(this: any, reqmatch?: AgentTeammateListMatch, ctrl?: Control): Promise<AgentTeammateEntity[]>;
}
export { AgentTeammateEntity };
