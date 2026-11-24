import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Invitation, InvitationListMatch, InvitationCreateData, InvitationRemoveMatch } from '../ComposalTypes';
declare class InvitationEntity extends ComposalEntityBase<Invitation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: InvitationEntity): InvitationEntity;
    list(this: any, reqmatch?: InvitationListMatch, ctrl?: Control): Promise<InvitationEntity[]>;
    create(this: any, reqdata?: InvitationCreateData, ctrl?: Control): Promise<InvitationEntity>;
    remove(this: any, reqmatch?: InvitationRemoveMatch, ctrl?: Control): Promise<InvitationEntity>;
}
export { InvitationEntity };
