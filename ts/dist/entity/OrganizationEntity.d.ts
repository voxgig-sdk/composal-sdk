import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch, OrganizationListMatch, OrganizationCreateData, OrganizationUpdateData, OrganizationPatchData } from '../ComposalTypes';
declare class OrganizationEntity extends ComposalEntityBase<Organization> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<OrganizationEntity>;
    list(this: any, reqmatch?: OrganizationListMatch, ctrl?: Control): Promise<OrganizationEntity[]>;
    create(this: any, reqdata?: OrganizationCreateData, ctrl?: Control): Promise<OrganizationEntity>;
    update(this: any, reqdata?: OrganizationUpdateData, ctrl?: Control): Promise<OrganizationEntity>;
    patch(this: any, reqdata?: OrganizationPatchData, ctrl?: Control): Promise<OrganizationEntity>;
}
export { OrganizationEntity };
