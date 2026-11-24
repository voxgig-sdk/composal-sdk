import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationIdentityCertificate, OrganizationIdentityCertificateLoadMatch, OrganizationIdentityCertificateListMatch, OrganizationIdentityCertificateCreateData, OrganizationIdentityCertificateUpdateData, OrganizationIdentityCertificatePatchData, OrganizationIdentityCertificateRemoveMatch } from '../ComposalTypes';
declare class OrganizationIdentityCertificateEntity extends ComposalEntityBase<OrganizationIdentityCertificate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationIdentityCertificateEntity): OrganizationIdentityCertificateEntity;
    load(this: any, reqmatch?: OrganizationIdentityCertificateLoadMatch, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity>;
    list(this: any, reqmatch?: OrganizationIdentityCertificateListMatch, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity[]>;
    create(this: any, reqdata?: OrganizationIdentityCertificateCreateData, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity>;
    update(this: any, reqdata?: OrganizationIdentityCertificateUpdateData, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity>;
    patch(this: any, reqdata?: OrganizationIdentityCertificatePatchData, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity>;
    remove(this: any, reqmatch?: OrganizationIdentityCertificateRemoveMatch, ctrl?: Control): Promise<OrganizationIdentityCertificateEntity>;
}
export { OrganizationIdentityCertificateEntity };
