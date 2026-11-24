import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceGroup, SpaceGroupLoadMatch, SpaceGroupCreateData, SpaceGroupUpdateData, SpaceGroupPatchData, SpaceGroupRemoveMatch } from '../ComposalTypes';
declare class SpaceGroupEntity extends ComposalEntityBase<SpaceGroup> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceGroupEntity): SpaceGroupEntity;
    load(this: any, reqmatch?: SpaceGroupLoadMatch, ctrl?: Control): Promise<SpaceGroupEntity>;
    create(this: any, reqdata?: SpaceGroupCreateData, ctrl?: Control): Promise<SpaceGroupEntity>;
    update(this: any, reqdata?: SpaceGroupUpdateData, ctrl?: Control): Promise<SpaceGroupEntity>;
    patch(this: any, reqdata?: SpaceGroupPatchData, ctrl?: Control): Promise<SpaceGroupEntity>;
    remove(this: any, reqmatch?: SpaceGroupRemoveMatch, ctrl?: Control): Promise<SpaceGroupEntity>;
}
export { SpaceGroupEntity };
