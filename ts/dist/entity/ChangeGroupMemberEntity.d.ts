import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeGroupMember, ChangeGroupMemberCreateData, ChangeGroupMemberRemoveMatch } from '../ComposalTypes';
declare class ChangeGroupMemberEntity extends ComposalEntityBase<ChangeGroupMember> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeGroupMemberEntity): ChangeGroupMemberEntity;
    create(this: any, reqdata?: ChangeGroupMemberCreateData, ctrl?: Control): Promise<ChangeGroupMemberEntity>;
    remove(this: any, reqmatch?: ChangeGroupMemberRemoveMatch, ctrl?: Control): Promise<ChangeGroupMemberEntity>;
}
export { ChangeGroupMemberEntity };
