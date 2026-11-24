import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScanFlow, DeepScanFlowCreateData } from '../ComposalTypes';
declare class DeepScanFlowEntity extends ComposalEntityBase<DeepScanFlow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanFlowEntity): DeepScanFlowEntity;
    create(this: any, reqdata?: DeepScanFlowCreateData, ctrl?: Control): Promise<DeepScanFlowEntity>;
}
export { DeepScanFlowEntity };
