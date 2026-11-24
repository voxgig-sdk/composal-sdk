import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationSandbox, OrganizationSandboxCreateData } from '../ComposalTypes';
declare class OrganizationSandboxEntity extends ComposalEntityBase<OrganizationSandbox> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationSandboxEntity): OrganizationSandboxEntity;
    create(this: any, reqdata?: OrganizationSandboxCreateData, ctrl?: Control): Promise<OrganizationSandboxEntity>;
}
export { OrganizationSandboxEntity };
