import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpacePeer, SpacePeerLoadMatch, SpacePeerListMatch, SpacePeerCreateData, SpacePeerUpdateData, SpacePeerPatchData, SpacePeerRemoveMatch } from '../ComposalTypes';
declare class SpacePeerEntity extends ComposalEntityBase<SpacePeer> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpacePeerEntity): SpacePeerEntity;
    load(this: any, reqmatch?: SpacePeerLoadMatch, ctrl?: Control): Promise<SpacePeerEntity>;
    list(this: any, reqmatch?: SpacePeerListMatch, ctrl?: Control): Promise<SpacePeerEntity[]>;
    create(this: any, reqdata?: SpacePeerCreateData, ctrl?: Control): Promise<SpacePeerEntity>;
    update(this: any, reqdata?: SpacePeerUpdateData, ctrl?: Control): Promise<SpacePeerEntity>;
    patch(this: any, reqdata?: SpacePeerPatchData, ctrl?: Control): Promise<SpacePeerEntity>;
    remove(this: any, reqmatch?: SpacePeerRemoveMatch, ctrl?: Control): Promise<SpacePeerEntity>;
}
export { SpacePeerEntity };
