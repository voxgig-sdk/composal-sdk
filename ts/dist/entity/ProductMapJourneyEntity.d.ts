import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapJourney, ProductMapJourneyLoadMatch, ProductMapJourneyListMatch } from '../ComposalTypes';
declare class ProductMapJourneyEntity extends ComposalEntityBase<ProductMapJourney> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapJourneyEntity): ProductMapJourneyEntity;
    load(this: any, reqmatch?: ProductMapJourneyLoadMatch, ctrl?: Control): Promise<ProductMapJourneyEntity>;
    list(this: any, reqmatch?: ProductMapJourneyListMatch, ctrl?: Control): Promise<ProductMapJourneyEntity[]>;
}
export { ProductMapJourneyEntity };
