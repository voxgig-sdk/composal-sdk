import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationTool, OrganizationToolCreateData } from '../ComposalTypes';
declare class OrganizationToolEntity extends ComposalEntityBase<OrganizationTool> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationToolEntity): OrganizationToolEntity;
    create(this: any, reqdata?: OrganizationToolCreateData, ctrl?: Control): Promise<OrganizationToolEntity>;
}
export { OrganizationToolEntity };
