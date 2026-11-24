import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AllocationLog, AllocationLogListMatch } from '../ComposalTypes';
declare class AllocationLogEntity extends ComposalEntityBase<AllocationLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AllocationLogEntity): AllocationLogEntity;
    list(this: any, reqmatch?: AllocationLogListMatch, ctrl?: Control): Promise<AllocationLogEntity[]>;
}
export { AllocationLogEntity };
