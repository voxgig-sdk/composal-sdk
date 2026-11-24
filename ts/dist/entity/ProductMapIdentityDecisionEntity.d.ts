import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapIdentityDecision, ProductMapIdentityDecisionCreateData } from '../ComposalTypes';
declare class ProductMapIdentityDecisionEntity extends ComposalEntityBase<ProductMapIdentityDecision> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapIdentityDecisionEntity): ProductMapIdentityDecisionEntity;
    create(this: any, reqdata?: ProductMapIdentityDecisionCreateData, ctrl?: Control): Promise<ProductMapIdentityDecisionEntity>;
}
export { ProductMapIdentityDecisionEntity };
