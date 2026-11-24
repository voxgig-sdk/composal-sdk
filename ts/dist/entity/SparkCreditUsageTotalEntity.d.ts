import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkCreditUsageTotal, SparkCreditUsageTotalListMatch } from '../ComposalTypes';
declare class SparkCreditUsageTotalEntity extends ComposalEntityBase<SparkCreditUsageTotal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkCreditUsageTotalEntity): SparkCreditUsageTotalEntity;
    list(this: any, reqmatch?: SparkCreditUsageTotalListMatch, ctrl?: Control): Promise<SparkCreditUsageTotalEntity[]>;
}
export { SparkCreditUsageTotalEntity };
