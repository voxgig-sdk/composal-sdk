import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapObservation, ProductMapObservationLoadMatch } from '../ComposalTypes';
declare class ProductMapObservationEntity extends ComposalEntityBase<ProductMapObservation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapObservationEntity): ProductMapObservationEntity;
    load(this: any, reqmatch?: ProductMapObservationLoadMatch, ctrl?: Control): Promise<ProductMapObservationEntity>;
}
export { ProductMapObservationEntity };
