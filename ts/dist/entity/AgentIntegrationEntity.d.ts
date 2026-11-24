import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentIntegration, AgentIntegrationListMatch, AgentIntegrationCreateData } from '../ComposalTypes';
declare class AgentIntegrationEntity extends ComposalEntityBase<AgentIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentIntegrationEntity): AgentIntegrationEntity;
    list(this: any, reqmatch?: AgentIntegrationListMatch, ctrl?: Control): Promise<AgentIntegrationEntity[]>;
    create(this: any, reqdata?: AgentIntegrationCreateData, ctrl?: Control): Promise<AgentIntegrationEntity>;
}
export { AgentIntegrationEntity };
