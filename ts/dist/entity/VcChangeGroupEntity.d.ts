import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcChangeGroup, VcChangeGroupLoadMatch, VcChangeGroupListMatch, VcChangeGroupCreateData } from '../ComposalTypes';
declare class VcChangeGroupEntity extends ComposalEntityBase<VcChangeGroup> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcChangeGroupEntity): VcChangeGroupEntity;
    load(this: any, reqmatch?: VcChangeGroupLoadMatch, ctrl?: Control): Promise<VcChangeGroupEntity>;
    list(this: any, reqmatch?: VcChangeGroupListMatch, ctrl?: Control): Promise<VcChangeGroupEntity[]>;
    create(this: any, reqdata?: VcChangeGroupCreateData, ctrl?: Control): Promise<VcChangeGroupEntity>;
}
export { VcChangeGroupEntity };
