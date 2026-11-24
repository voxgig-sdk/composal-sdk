import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ImportBranchPolicy, ImportBranchPolicyLoadMatch, ImportBranchPolicyUpdateData, ImportBranchPolicyPatchData } from '../ComposalTypes';
declare class ImportBranchPolicyEntity extends ComposalEntityBase<ImportBranchPolicy> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ImportBranchPolicyEntity): ImportBranchPolicyEntity;
    load(this: any, reqmatch?: ImportBranchPolicyLoadMatch, ctrl?: Control): Promise<ImportBranchPolicyEntity>;
    update(this: any, reqdata?: ImportBranchPolicyUpdateData, ctrl?: Control): Promise<ImportBranchPolicyEntity>;
    patch(this: any, reqdata?: ImportBranchPolicyPatchData, ctrl?: Control): Promise<ImportBranchPolicyEntity>;
}
export { ImportBranchPolicyEntity };
