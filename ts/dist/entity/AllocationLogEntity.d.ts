import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AllocationLog, AllocationLogLoadMatch } from '../ComposalTypes';
declare class AllocationLogEntity extends ComposalEntityBase<AllocationLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AllocationLogEntity): AllocationLogEntity;
    load(this: any, reqmatch?: AllocationLogLoadMatch, ctrl?: Control): Promise<AllocationLogEntity>;
}
export { AllocationLogEntity };
