import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRepository, AgentRepositoryListMatch, AgentRepositoryUpdateData } from '../ComposalTypes';
declare class AgentRepositoryEntity extends ComposalEntityBase<AgentRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRepositoryEntity): AgentRepositoryEntity;
    list(this: any, reqmatch?: AgentRepositoryListMatch, ctrl?: Control): Promise<AgentRepositoryEntity[]>;
    update(this: any, reqdata?: AgentRepositoryUpdateData, ctrl?: Control): Promise<AgentRepositoryEntity>;
}
export { AgentRepositoryEntity };
