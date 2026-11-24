import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationControl, OrganizationControlCreateData } from '../ComposalTypes';
declare class OrganizationControlEntity extends ComposalEntityBase<OrganizationControl> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationControlEntity): OrganizationControlEntity;
    create(this: any, reqdata?: OrganizationControlCreateData, ctrl?: Control): Promise<OrganizationControlEntity>;
}
export { OrganizationControlEntity };
