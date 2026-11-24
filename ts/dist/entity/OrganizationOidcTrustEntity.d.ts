import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationOidcTrust, OrganizationOidcTrustLoadMatch, OrganizationOidcTrustCreateData, OrganizationOidcTrustUpdateData, OrganizationOidcTrustPatchData, OrganizationOidcTrustRemoveMatch } from '../ComposalTypes';
declare class OrganizationOidcTrustEntity extends ComposalEntityBase<OrganizationOidcTrust> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationOidcTrustEntity): OrganizationOidcTrustEntity;
    load(this: any, reqmatch?: OrganizationOidcTrustLoadMatch, ctrl?: Control): Promise<OrganizationOidcTrustEntity>;
    create(this: any, reqdata?: OrganizationOidcTrustCreateData, ctrl?: Control): Promise<OrganizationOidcTrustEntity>;
    update(this: any, reqdata?: OrganizationOidcTrustUpdateData, ctrl?: Control): Promise<OrganizationOidcTrustEntity>;
    patch(this: any, reqdata?: OrganizationOidcTrustPatchData, ctrl?: Control): Promise<OrganizationOidcTrustEntity>;
    remove(this: any, reqmatch?: OrganizationOidcTrustRemoveMatch, ctrl?: Control): Promise<OrganizationOidcTrustEntity>;
}
export { OrganizationOidcTrustEntity };
