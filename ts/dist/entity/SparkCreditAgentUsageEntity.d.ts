import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkCreditAgentUsage, SparkCreditAgentUsageLoadMatch } from '../ComposalTypes';
declare class SparkCreditAgentUsageEntity extends ComposalEntityBase<SparkCreditAgentUsage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkCreditAgentUsageEntity): SparkCreditAgentUsageEntity;
    load(this: any, reqmatch?: SparkCreditAgentUsageLoadMatch, ctrl?: Control): Promise<SparkCreditAgentUsageEntity>;
}
export { SparkCreditAgentUsageEntity };
