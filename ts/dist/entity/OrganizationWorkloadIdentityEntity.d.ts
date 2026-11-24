import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationWorkloadIdentity, OrganizationWorkloadIdentityLoadMatch, OrganizationWorkloadIdentityCreateData, OrganizationWorkloadIdentityUpdateData, OrganizationWorkloadIdentityPatchData, OrganizationWorkloadIdentityRemoveMatch } from '../ComposalTypes';
declare class OrganizationWorkloadIdentityEntity extends ComposalEntityBase<OrganizationWorkloadIdentity> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationWorkloadIdentityEntity): OrganizationWorkloadIdentityEntity;
    load(this: any, reqmatch?: OrganizationWorkloadIdentityLoadMatch, ctrl?: Control): Promise<OrganizationWorkloadIdentityEntity>;
    create(this: any, reqdata?: OrganizationWorkloadIdentityCreateData, ctrl?: Control): Promise<OrganizationWorkloadIdentityEntity>;
    update(this: any, reqdata?: OrganizationWorkloadIdentityUpdateData, ctrl?: Control): Promise<OrganizationWorkloadIdentityEntity>;
    patch(this: any, reqdata?: OrganizationWorkloadIdentityPatchData, ctrl?: Control): Promise<OrganizationWorkloadIdentityEntity>;
    remove(this: any, reqmatch?: OrganizationWorkloadIdentityRemoveMatch, ctrl?: Control): Promise<OrganizationWorkloadIdentityEntity>;
}
export { OrganizationWorkloadIdentityEntity };
