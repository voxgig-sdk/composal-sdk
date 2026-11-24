import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentIntegrationAccount, AgentIntegrationAccountListMatch } from '../ComposalTypes';
declare class AgentIntegrationAccountEntity extends ComposalEntityBase<AgentIntegrationAccount> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentIntegrationAccountEntity): AgentIntegrationAccountEntity;
    list(this: any, reqmatch?: AgentIntegrationAccountListMatch, ctrl?: Control): Promise<AgentIntegrationAccountEntity[]>;
}
export { AgentIntegrationAccountEntity };
