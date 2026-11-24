import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAgentThread, SparkAgentThreadListMatch, SparkAgentThreadCreateData } from '../ComposalTypes';
declare class SparkAgentThreadEntity extends ComposalEntityBase<SparkAgentThread> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAgentThreadEntity): SparkAgentThreadEntity;
    list(this: any, reqmatch?: SparkAgentThreadListMatch, ctrl?: Control): Promise<SparkAgentThreadEntity[]>;
    create(this: any, reqdata?: SparkAgentThreadCreateData, ctrl?: Control): Promise<SparkAgentThreadEntity>;
}
export { SparkAgentThreadEntity };
