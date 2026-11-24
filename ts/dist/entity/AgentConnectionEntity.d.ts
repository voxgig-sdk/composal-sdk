import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnection, AgentConnectionLoadMatch, AgentConnectionListMatch, AgentConnectionCreateData, AgentConnectionUpdateData, AgentConnectionRemoveMatch } from '../ComposalTypes';
declare class AgentConnectionEntity extends ComposalEntityBase<AgentConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionEntity): AgentConnectionEntity;
    load(this: any, reqmatch?: AgentConnectionLoadMatch, ctrl?: Control): Promise<AgentConnectionEntity>;
    list(this: any, reqmatch?: AgentConnectionListMatch, ctrl?: Control): Promise<AgentConnectionEntity[]>;
    create(this: any, reqdata?: AgentConnectionCreateData, ctrl?: Control): Promise<AgentConnectionEntity>;
    update(this: any, reqdata?: AgentConnectionUpdateData, ctrl?: Control): Promise<AgentConnectionEntity>;
    remove(this: any, reqmatch?: AgentConnectionRemoveMatch, ctrl?: Control): Promise<AgentConnectionEntity>;
}
export { AgentConnectionEntity };
