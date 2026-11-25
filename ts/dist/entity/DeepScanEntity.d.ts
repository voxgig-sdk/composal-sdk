import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScan, DeepScanLoadMatch, DeepScanListMatch, DeepScanCreateData } from '../ComposalTypes';
declare class DeepScanEntity extends ComposalEntityBase<DeepScan> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanEntity): DeepScanEntity;
    load(this: any, reqmatch?: DeepScanLoadMatch, ctrl?: Control): Promise<DeepScanEntity>;
    list(this: any, reqmatch?: DeepScanListMatch, ctrl?: Control): Promise<DeepScanEntity[]>;
    create(this: any, reqdata?: DeepScanCreateData, ctrl?: Control): Promise<DeepScanEntity>;
}
export { DeepScanEntity };
