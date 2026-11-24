import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnectionResource, AgentConnectionResourceCreateData } from '../ComposalTypes';
declare class AgentConnectionResourceEntity extends ComposalEntityBase<AgentConnectionResource> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionResourceEntity): AgentConnectionResourceEntity;
    create(this: any, reqdata?: AgentConnectionResourceCreateData, ctrl?: Control): Promise<AgentConnectionResourceEntity>;
}
export { AgentConnectionResourceEntity };
