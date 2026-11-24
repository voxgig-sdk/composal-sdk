import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRelayFileGrant, AgentRelayFileGrantLoadMatch, AgentRelayFileGrantListMatch, AgentRelayFileGrantCreateData, AgentRelayFileGrantRemoveMatch } from '../ComposalTypes';
declare class AgentRelayFileGrantEntity extends ComposalEntityBase<AgentRelayFileGrant> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRelayFileGrantEntity): AgentRelayFileGrantEntity;
    load(this: any, reqmatch?: AgentRelayFileGrantLoadMatch, ctrl?: Control): Promise<AgentRelayFileGrantEntity>;
    list(this: any, reqmatch?: AgentRelayFileGrantListMatch, ctrl?: Control): Promise<AgentRelayFileGrantEntity[]>;
    create(this: any, reqdata?: AgentRelayFileGrantCreateData, ctrl?: Control): Promise<AgentRelayFileGrantEntity>;
    remove(this: any, reqmatch?: AgentRelayFileGrantRemoveMatch, ctrl?: Control): Promise<AgentRelayFileGrantEntity>;
}
export { AgentRelayFileGrantEntity };
