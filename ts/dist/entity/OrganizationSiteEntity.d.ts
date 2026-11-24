import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationSite, OrganizationSiteListMatch, OrganizationSiteCreateData, OrganizationSiteUpdateData, OrganizationSiteRemoveMatch } from '../ComposalTypes';
declare class OrganizationSiteEntity extends ComposalEntityBase<OrganizationSite> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationSiteEntity): OrganizationSiteEntity;
    list(this: any, reqmatch?: OrganizationSiteListMatch, ctrl?: Control): Promise<OrganizationSiteEntity[]>;
    create(this: any, reqdata?: OrganizationSiteCreateData, ctrl?: Control): Promise<OrganizationSiteEntity>;
    update(this: any, reqdata?: OrganizationSiteUpdateData, ctrl?: Control): Promise<OrganizationSiteEntity>;
    remove(this: any, reqmatch?: OrganizationSiteRemoveMatch, ctrl?: Control): Promise<OrganizationSiteEntity>;
}
export { OrganizationSiteEntity };
