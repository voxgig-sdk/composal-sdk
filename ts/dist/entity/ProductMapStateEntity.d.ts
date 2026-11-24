import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapState, ProductMapStateLoadMatch, ProductMapStateListMatch } from '../ComposalTypes';
declare class ProductMapStateEntity extends ComposalEntityBase<ProductMapState> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapStateEntity): ProductMapStateEntity;
    load(this: any, reqmatch?: ProductMapStateLoadMatch, ctrl?: Control): Promise<ProductMapStateEntity>;
    list(this: any, reqmatch?: ProductMapStateListMatch, ctrl?: Control): Promise<ProductMapStateEntity[]>;
}
export { ProductMapStateEntity };
