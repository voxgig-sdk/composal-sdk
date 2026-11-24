import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentOperation, AgentOperationLoadMatch, AgentOperationCreateData } from '../ComposalTypes';
declare class AgentOperationEntity extends ComposalEntityBase<AgentOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentOperationEntity): AgentOperationEntity;
    load(this: any, reqmatch?: AgentOperationLoadMatch, ctrl?: Control): Promise<AgentOperationEntity>;
    create(this: any, reqdata?: AgentOperationCreateData, ctrl?: Control): Promise<AgentOperationEntity>;
}
export { AgentOperationEntity };
