import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationSecret, OrganizationSecretLoadMatch, OrganizationSecretListMatch, OrganizationSecretCreateData, OrganizationSecretUpdateData, OrganizationSecretPatchData, OrganizationSecretRemoveMatch } from '../ComposalTypes';
declare class OrganizationSecretEntity extends ComposalEntityBase<OrganizationSecret> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationSecretEntity): OrganizationSecretEntity;
    load(this: any, reqmatch?: OrganizationSecretLoadMatch, ctrl?: Control): Promise<OrganizationSecretEntity>;
    list(this: any, reqmatch?: OrganizationSecretListMatch, ctrl?: Control): Promise<OrganizationSecretEntity[]>;
    create(this: any, reqdata?: OrganizationSecretCreateData, ctrl?: Control): Promise<OrganizationSecretEntity>;
    update(this: any, reqdata?: OrganizationSecretUpdateData, ctrl?: Control): Promise<OrganizationSecretEntity>;
    patch(this: any, reqdata?: OrganizationSecretPatchData, ctrl?: Control): Promise<OrganizationSecretEntity>;
    remove(this: any, reqmatch?: OrganizationSecretRemoveMatch, ctrl?: Control): Promise<OrganizationSecretEntity>;
}
export { OrganizationSecretEntity };
