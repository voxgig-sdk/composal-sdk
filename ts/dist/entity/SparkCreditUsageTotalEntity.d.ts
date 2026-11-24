import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkCreditUsageTotal, SparkCreditUsageTotalLoadMatch } from '../ComposalTypes';
declare class SparkCreditUsageTotalEntity extends ComposalEntityBase<SparkCreditUsageTotal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkCreditUsageTotalEntity): SparkCreditUsageTotalEntity;
    load(this: any, reqmatch?: SparkCreditUsageTotalLoadMatch, ctrl?: Control): Promise<SparkCreditUsageTotalEntity>;
}
export { SparkCreditUsageTotalEntity };
