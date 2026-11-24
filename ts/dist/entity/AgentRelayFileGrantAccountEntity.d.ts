import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRelayFileGrantAccount, AgentRelayFileGrantAccountListMatch } from '../ComposalTypes';
declare class AgentRelayFileGrantAccountEntity extends ComposalEntityBase<AgentRelayFileGrantAccount> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRelayFileGrantAccountEntity): AgentRelayFileGrantAccountEntity;
    list(this: any, reqmatch?: AgentRelayFileGrantAccountListMatch, ctrl?: Control): Promise<AgentRelayFileGrantAccountEntity[]>;
}
export { AgentRelayFileGrantAccountEntity };
