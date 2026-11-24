import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationApp, OrganizationAppLoadMatch, OrganizationAppUpdateData, OrganizationAppRemoveMatch } from '../ComposalTypes';
declare class OrganizationAppEntity extends ComposalEntityBase<OrganizationApp> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationAppEntity): OrganizationAppEntity;
    load(this: any, reqmatch?: OrganizationAppLoadMatch, ctrl?: Control): Promise<OrganizationAppEntity>;
    update(this: any, reqdata?: OrganizationAppUpdateData, ctrl?: Control): Promise<OrganizationAppEntity>;
    remove(this: any, reqmatch?: OrganizationAppRemoveMatch, ctrl?: Control): Promise<OrganizationAppEntity>;
}
export { OrganizationAppEntity };
