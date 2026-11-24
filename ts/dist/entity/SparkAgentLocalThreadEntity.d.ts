import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAgentLocalThread, SparkAgentLocalThreadLoadMatch, SparkAgentLocalThreadCreateData, SparkAgentLocalThreadUpdateData } from '../ComposalTypes';
declare class SparkAgentLocalThreadEntity extends ComposalEntityBase<SparkAgentLocalThread> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAgentLocalThreadEntity): SparkAgentLocalThreadEntity;
    load(this: any, reqmatch?: SparkAgentLocalThreadLoadMatch, ctrl?: Control): Promise<SparkAgentLocalThreadEntity>;
    create(this: any, reqdata?: SparkAgentLocalThreadCreateData, ctrl?: Control): Promise<SparkAgentLocalThreadEntity>;
    update(this: any, reqdata?: SparkAgentLocalThreadUpdateData, ctrl?: Control): Promise<SparkAgentLocalThreadEntity>;
}
export { SparkAgentLocalThreadEntity };
