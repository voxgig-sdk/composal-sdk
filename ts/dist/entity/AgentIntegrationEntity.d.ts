import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentIntegration, AgentIntegrationLoadMatch, AgentIntegrationCreateData, AgentIntegrationRemoveMatch } from '../ComposalTypes';
declare class AgentIntegrationEntity extends ComposalEntityBase<AgentIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentIntegrationEntity): AgentIntegrationEntity;
    load(this: any, reqmatch?: AgentIntegrationLoadMatch, ctrl?: Control): Promise<AgentIntegrationEntity>;
    create(this: any, reqdata?: AgentIntegrationCreateData, ctrl?: Control): Promise<AgentIntegrationEntity>;
    remove(this: any, reqmatch?: AgentIntegrationRemoveMatch, ctrl?: Control): Promise<AgentIntegrationEntity>;
}
export { AgentIntegrationEntity };
