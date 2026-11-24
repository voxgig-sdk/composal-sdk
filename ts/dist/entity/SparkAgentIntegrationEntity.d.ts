import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAgentIntegration, SparkAgentIntegrationListMatch, SparkAgentIntegrationCreateData } from '../ComposalTypes';
declare class SparkAgentIntegrationEntity extends ComposalEntityBase<SparkAgentIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAgentIntegrationEntity): SparkAgentIntegrationEntity;
    list(this: any, reqmatch?: SparkAgentIntegrationListMatch, ctrl?: Control): Promise<SparkAgentIntegrationEntity[]>;
    create(this: any, reqdata?: SparkAgentIntegrationCreateData, ctrl?: Control): Promise<SparkAgentIntegrationEntity>;
}
export { SparkAgentIntegrationEntity };
