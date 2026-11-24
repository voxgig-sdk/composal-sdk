import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeepScanOption, DeepScanOptionListMatch } from '../ComposalTypes';
declare class DeepScanOptionEntity extends ComposalEntityBase<DeepScanOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeepScanOptionEntity): DeepScanOptionEntity;
    list(this: any, reqmatch?: DeepScanOptionListMatch, ctrl?: Control): Promise<DeepScanOptionEntity[]>;
}
export { DeepScanOptionEntity };
