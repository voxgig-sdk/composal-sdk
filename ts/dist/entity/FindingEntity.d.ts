import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Finding, FindingLoadMatch, FindingListMatch, FindingUpdateData, FindingPatchData } from '../ComposalTypes';
declare class FindingEntity extends ComposalEntityBase<Finding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: FindingEntity): FindingEntity;
    load(this: any, reqmatch?: FindingLoadMatch, ctrl?: Control): Promise<FindingEntity>;
    list(this: any, reqmatch?: FindingListMatch, ctrl?: Control): Promise<FindingEntity[]>;
    update(this: any, reqdata?: FindingUpdateData, ctrl?: Control): Promise<FindingEntity>;
    patch(this: any, reqdata?: FindingPatchData, ctrl?: Control): Promise<FindingEntity>;
}
export { FindingEntity };
