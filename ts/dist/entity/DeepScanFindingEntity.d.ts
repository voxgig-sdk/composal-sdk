import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScanFinding, DeepScanFindingListMatch } from '../ComposalTypes';
declare class DeepScanFindingEntity extends ComposalEntityBase<DeepScanFinding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanFindingEntity): DeepScanFindingEntity;
    list(this: any, reqmatch?: DeepScanFindingListMatch, ctrl?: Control): Promise<DeepScanFindingEntity[]>;
}
export { DeepScanFindingEntity };
