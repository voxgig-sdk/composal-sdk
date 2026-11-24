import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceSegment, SpaceSegmentLoadMatch, SpaceSegmentListMatch, SpaceSegmentCreateData, SpaceSegmentUpdateData, SpaceSegmentPatchData, SpaceSegmentRemoveMatch } from '../ComposalTypes';
declare class SpaceSegmentEntity extends ComposalEntityBase<SpaceSegment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceSegmentEntity): SpaceSegmentEntity;
    load(this: any, reqmatch?: SpaceSegmentLoadMatch, ctrl?: Control): Promise<SpaceSegmentEntity>;
    list(this: any, reqmatch?: SpaceSegmentListMatch, ctrl?: Control): Promise<SpaceSegmentEntity[]>;
    create(this: any, reqdata?: SpaceSegmentCreateData, ctrl?: Control): Promise<SpaceSegmentEntity>;
    update(this: any, reqdata?: SpaceSegmentUpdateData, ctrl?: Control): Promise<SpaceSegmentEntity>;
    patch(this: any, reqdata?: SpaceSegmentPatchData, ctrl?: Control): Promise<SpaceSegmentEntity>;
    remove(this: any, reqmatch?: SpaceSegmentRemoveMatch, ctrl?: Control): Promise<SpaceSegmentEntity>;
}
export { SpaceSegmentEntity };
