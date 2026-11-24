import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Member, MemberListMatch, MemberUpdateData, MemberPatchData, MemberRemoveMatch } from '../ComposalTypes';
declare class MemberEntity extends ComposalEntityBase<Member> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MemberEntity): MemberEntity;
    list(this: any, reqmatch?: MemberListMatch, ctrl?: Control): Promise<MemberEntity[]>;
    update(this: any, reqdata?: MemberUpdateData, ctrl?: Control): Promise<MemberEntity>;
    patch(this: any, reqdata?: MemberPatchData, ctrl?: Control): Promise<MemberEntity>;
    remove(this: any, reqmatch?: MemberRemoveMatch, ctrl?: Control): Promise<MemberEntity>;
}
export { MemberEntity };
