import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScanMappedFlow, DeepScanMappedFlowListMatch } from '../ComposalTypes';
declare class DeepScanMappedFlowEntity extends ComposalEntityBase<DeepScanMappedFlow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanMappedFlowEntity): DeepScanMappedFlowEntity;
    list(this: any, reqmatch?: DeepScanMappedFlowListMatch, ctrl?: Control): Promise<DeepScanMappedFlowEntity[]>;
}
export { DeepScanMappedFlowEntity };
