import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrgInvitation, OrgInvitationLoadMatch, OrgInvitationCreateData } from '../ComposalTypes';
declare class OrgInvitationEntity extends ComposalEntityBase<OrgInvitation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrgInvitationEntity): OrgInvitationEntity;
    load(this: any, reqmatch?: OrgInvitationLoadMatch, ctrl?: Control): Promise<OrgInvitationEntity>;
    create(this: any, reqdata?: OrgInvitationCreateData, ctrl?: Control): Promise<OrgInvitationEntity>;
}
export { OrgInvitationEntity };
