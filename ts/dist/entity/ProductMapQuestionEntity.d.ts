import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProductMapQuestion, ProductMapQuestionCreateData } from '../ComposalTypes';
declare class ProductMapQuestionEntity extends ComposalEntityBase<ProductMapQuestion> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProductMapQuestionEntity): ProductMapQuestionEntity;
    create(this: any, reqdata?: ProductMapQuestionCreateData, ctrl?: Control): Promise<ProductMapQuestionEntity>;
}
export { ProductMapQuestionEntity };
