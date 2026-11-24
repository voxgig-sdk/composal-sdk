import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Product, ProductCreateData } from '../ComposalTypes';
declare class ProductEntity extends ComposalEntityBase<Product> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductEntity): ProductEntity;
    create(this: any, reqdata?: ProductCreateData, ctrl?: Control): Promise<ProductEntity>;
}
export { ProductEntity };
