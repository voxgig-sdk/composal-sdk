import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceEnrollmentToken, SpaceEnrollmentTokenLoadMatch, SpaceEnrollmentTokenListMatch, SpaceEnrollmentTokenCreateData, SpaceEnrollmentTokenUpdateData, SpaceEnrollmentTokenPatchData, SpaceEnrollmentTokenRemoveMatch } from '../ComposalTypes';
declare class SpaceEnrollmentTokenEntity extends ComposalEntityBase<SpaceEnrollmentToken> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceEnrollmentTokenEntity): SpaceEnrollmentTokenEntity;
    load(this: any, reqmatch?: SpaceEnrollmentTokenLoadMatch, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity>;
    list(this: any, reqmatch?: SpaceEnrollmentTokenListMatch, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity[]>;
    create(this: any, reqdata?: SpaceEnrollmentTokenCreateData, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity>;
    update(this: any, reqdata?: SpaceEnrollmentTokenUpdateData, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity>;
    patch(this: any, reqdata?: SpaceEnrollmentTokenPatchData, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity>;
    remove(this: any, reqmatch?: SpaceEnrollmentTokenRemoveMatch, ctrl?: Control): Promise<SpaceEnrollmentTokenEntity>;
}
export { SpaceEnrollmentTokenEntity };
