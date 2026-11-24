import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpacePolicy, SpacePolicyLoadMatch, SpacePolicyCreateData, SpacePolicyUpdateData, SpacePolicyPatchData, SpacePolicyRemoveMatch } from '../ComposalTypes';
declare class SpacePolicyEntity extends ComposalEntityBase<SpacePolicy> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpacePolicyEntity): SpacePolicyEntity;
    load(this: any, reqmatch?: SpacePolicyLoadMatch, ctrl?: Control): Promise<SpacePolicyEntity>;
    create(this: any, reqdata?: SpacePolicyCreateData, ctrl?: Control): Promise<SpacePolicyEntity>;
    update(this: any, reqdata?: SpacePolicyUpdateData, ctrl?: Control): Promise<SpacePolicyEntity>;
    patch(this: any, reqdata?: SpacePolicyPatchData, ctrl?: Control): Promise<SpacePolicyEntity>;
    remove(this: any, reqmatch?: SpacePolicyRemoveMatch, ctrl?: Control): Promise<SpacePolicyEntity>;
}
export { SpacePolicyEntity };
