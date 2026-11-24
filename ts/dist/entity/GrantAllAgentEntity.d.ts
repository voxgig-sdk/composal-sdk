import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GrantAllAgent, GrantAllAgentCreateData } from '../ComposalTypes';
declare class GrantAllAgentEntity extends ComposalEntityBase<GrantAllAgent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GrantAllAgentEntity): GrantAllAgentEntity;
    create(this: any, reqdata?: GrantAllAgentCreateData, ctrl?: Control): Promise<GrantAllAgentEntity>;
}
export { GrantAllAgentEntity };
