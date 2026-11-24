import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentApp, AgentAppLoadMatch, AgentAppListMatch, AgentAppCreateData } from '../ComposalTypes';
declare class AgentAppEntity extends ComposalEntityBase<AgentApp> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentAppEntity): AgentAppEntity;
    load(this: any, reqmatch?: AgentAppLoadMatch, ctrl?: Control): Promise<AgentAppEntity>;
    list(this: any, reqmatch?: AgentAppListMatch, ctrl?: Control): Promise<AgentAppEntity[]>;
    create(this: any, reqdata?: AgentAppCreateData, ctrl?: Control): Promise<AgentAppEntity>;
}
export { AgentAppEntity };
