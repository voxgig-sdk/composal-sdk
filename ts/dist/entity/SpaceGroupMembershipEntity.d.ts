import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceGroupMembership, SpaceGroupMembershipLoadMatch, SpaceGroupMembershipCreateData, SpaceGroupMembershipUpdateData, SpaceGroupMembershipPatchData, SpaceGroupMembershipRemoveMatch } from '../ComposalTypes';
declare class SpaceGroupMembershipEntity extends ComposalEntityBase<SpaceGroupMembership> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceGroupMembershipEntity): SpaceGroupMembershipEntity;
    load(this: any, reqmatch?: SpaceGroupMembershipLoadMatch, ctrl?: Control): Promise<SpaceGroupMembershipEntity>;
    create(this: any, reqdata?: SpaceGroupMembershipCreateData, ctrl?: Control): Promise<SpaceGroupMembershipEntity>;
    update(this: any, reqdata?: SpaceGroupMembershipUpdateData, ctrl?: Control): Promise<SpaceGroupMembershipEntity>;
    patch(this: any, reqdata?: SpaceGroupMembershipPatchData, ctrl?: Control): Promise<SpaceGroupMembershipEntity>;
    remove(this: any, reqmatch?: SpaceGroupMembershipRemoveMatch, ctrl?: Control): Promise<SpaceGroupMembershipEntity>;
}
export { SpaceGroupMembershipEntity };
