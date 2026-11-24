import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScanMappedFlow, DeepScanMappedFlowLoadMatch } from '../ComposalTypes';
declare class DeepScanMappedFlowEntity extends ComposalEntityBase<DeepScanMappedFlow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanMappedFlowEntity): DeepScanMappedFlowEntity;
    load(this: any, reqmatch?: DeepScanMappedFlowLoadMatch, ctrl?: Control): Promise<DeepScanMappedFlowEntity>;
}
export { DeepScanMappedFlowEntity };
