import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { IdentityOrganization, IdentityOrganizationLoadMatch } from '../ComposalTypes';
declare class IdentityOrganizationEntity extends ComposalEntityBase<IdentityOrganization> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: IdentityOrganizationEntity): IdentityOrganizationEntity;
    load(this: any, reqmatch?: IdentityOrganizationLoadMatch, ctrl?: Control): Promise<IdentityOrganizationEntity>;
}
export { IdentityOrganizationEntity };
