import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { JourneyVariantReplay, JourneyVariantReplayCreateData } from '../ComposalTypes';
declare class JourneyVariantReplayEntity extends ComposalEntityBase<JourneyVariantReplay> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: JourneyVariantReplayEntity): JourneyVariantReplayEntity;
    create(this: any, reqdata?: JourneyVariantReplayCreateData, ctrl?: Control): Promise<JourneyVariantReplayEntity>;
}
export { JourneyVariantReplayEntity };
