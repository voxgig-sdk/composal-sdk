import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationInvitation, OrganizationInvitationCreateData, OrganizationInvitationRemoveMatch } from '../ComposalTypes';
declare class OrganizationInvitationEntity extends ComposalEntityBase<OrganizationInvitation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationInvitationEntity): OrganizationInvitationEntity;
    create(this: any, reqdata?: OrganizationInvitationCreateData, ctrl?: Control): Promise<OrganizationInvitationEntity>;
    remove(this: any, reqmatch?: OrganizationInvitationRemoveMatch, ctrl?: Control): Promise<OrganizationInvitationEntity>;
}
export { OrganizationInvitationEntity };
