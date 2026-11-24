import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentProvisioning, AgentProvisioningCreateData } from '../ComposalTypes';
declare class AgentProvisioningEntity extends ComposalEntityBase<AgentProvisioning> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentProvisioningEntity): AgentProvisioningEntity;
    create(this: any, reqdata?: AgentProvisioningCreateData, ctrl?: Control): Promise<AgentProvisioningEntity>;
}
export { AgentProvisioningEntity };
