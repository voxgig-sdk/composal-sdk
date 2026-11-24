import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationServiceAccount, OrganizationServiceAccountLoadMatch, OrganizationServiceAccountListMatch, OrganizationServiceAccountCreateData, OrganizationServiceAccountUpdateData, OrganizationServiceAccountPatchData, OrganizationServiceAccountRemoveMatch } from '../ComposalTypes';
declare class OrganizationServiceAccountEntity extends ComposalEntityBase<OrganizationServiceAccount> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationServiceAccountEntity): OrganizationServiceAccountEntity;
    load(this: any, reqmatch?: OrganizationServiceAccountLoadMatch, ctrl?: Control): Promise<OrganizationServiceAccountEntity>;
    list(this: any, reqmatch?: OrganizationServiceAccountListMatch, ctrl?: Control): Promise<OrganizationServiceAccountEntity[]>;
    create(this: any, reqdata?: OrganizationServiceAccountCreateData, ctrl?: Control): Promise<OrganizationServiceAccountEntity>;
    update(this: any, reqdata?: OrganizationServiceAccountUpdateData, ctrl?: Control): Promise<OrganizationServiceAccountEntity>;
    patch(this: any, reqdata?: OrganizationServiceAccountPatchData, ctrl?: Control): Promise<OrganizationServiceAccountEntity>;
    remove(this: any, reqmatch?: OrganizationServiceAccountRemoveMatch, ctrl?: Control): Promise<OrganizationServiceAccountEntity>;
}
export { OrganizationServiceAccountEntity };
