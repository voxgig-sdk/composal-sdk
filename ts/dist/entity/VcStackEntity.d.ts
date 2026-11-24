import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcStack, VcStackLoadMatch, VcStackListMatch, VcStackUpdateData } from '../ComposalTypes';
declare class VcStackEntity extends ComposalEntityBase<VcStack> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcStackEntity): VcStackEntity;
    load(this: any, reqmatch?: VcStackLoadMatch, ctrl?: Control): Promise<VcStackEntity>;
    list(this: any, reqmatch?: VcStackListMatch, ctrl?: Control): Promise<VcStackEntity[]>;
    update(this: any, reqdata?: VcStackUpdateData, ctrl?: Control): Promise<VcStackEntity>;
}
export { VcStackEntity };
