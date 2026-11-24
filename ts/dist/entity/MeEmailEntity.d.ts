import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MeEmail, MeEmailListMatch, MeEmailCreateData, MeEmailUpdateData, MeEmailPatchData, MeEmailRemoveMatch } from '../ComposalTypes';
declare class MeEmailEntity extends ComposalEntityBase<MeEmail> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MeEmailEntity): MeEmailEntity;
    list(this: any, reqmatch?: MeEmailListMatch, ctrl?: Control): Promise<MeEmailEntity[]>;
    create(this: any, reqdata?: MeEmailCreateData, ctrl?: Control): Promise<MeEmailEntity>;
    update(this: any, reqdata?: MeEmailUpdateData, ctrl?: Control): Promise<MeEmailEntity>;
    patch(this: any, reqdata?: MeEmailPatchData, ctrl?: Control): Promise<MeEmailEntity>;
    remove(this: any, reqmatch?: MeEmailRemoveMatch, ctrl?: Control): Promise<MeEmailEntity>;
}
export { MeEmailEntity };
