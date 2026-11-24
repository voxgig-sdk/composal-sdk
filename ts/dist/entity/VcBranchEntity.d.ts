import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcBranch, VcBranchListMatch, VcBranchCreateData, VcBranchRemoveMatch } from '../ComposalTypes';
declare class VcBranchEntity extends ComposalEntityBase<VcBranch> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcBranchEntity): VcBranchEntity;
    list(this: any, reqmatch?: VcBranchListMatch, ctrl?: Control): Promise<VcBranchEntity[]>;
    create(this: any, reqdata?: VcBranchCreateData, ctrl?: Control): Promise<VcBranchEntity>;
    remove(this: any, reqmatch?: VcBranchRemoveMatch, ctrl?: Control): Promise<VcBranchEntity>;
}
export { VcBranchEntity };
