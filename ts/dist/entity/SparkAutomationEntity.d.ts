import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAutomation, SparkAutomationLoadMatch, SparkAutomationListMatch, SparkAutomationUpdateData } from '../ComposalTypes';
declare class SparkAutomationEntity extends ComposalEntityBase<SparkAutomation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAutomationEntity): SparkAutomationEntity;
    load(this: any, reqmatch?: SparkAutomationLoadMatch, ctrl?: Control): Promise<SparkAutomationEntity>;
    list(this: any, reqmatch?: SparkAutomationListMatch, ctrl?: Control): Promise<SparkAutomationEntity[]>;
    update(this: any, reqdata?: SparkAutomationUpdateData, ctrl?: Control): Promise<SparkAutomationEntity>;
}
export { SparkAutomationEntity };
