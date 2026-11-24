import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapJourneyReplay, ProductMapJourneyReplayLoadMatch, ProductMapJourneyReplayCreateData } from '../ComposalTypes';
declare class ProductMapJourneyReplayEntity extends ComposalEntityBase<ProductMapJourneyReplay> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapJourneyReplayEntity): ProductMapJourneyReplayEntity;
    load(this: any, reqmatch?: ProductMapJourneyReplayLoadMatch, ctrl?: Control): Promise<ProductMapJourneyReplayEntity>;
    create(this: any, reqdata?: ProductMapJourneyReplayCreateData, ctrl?: Control): Promise<ProductMapJourneyReplayEntity>;
}
export { ProductMapJourneyReplayEntity };
