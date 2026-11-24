import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Openapi, OpenapiLoadMatch } from '../ComposalTypes';
declare class OpenapiEntity extends ComposalEntityBase<Openapi> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OpenapiEntity): OpenapiEntity;
    load(this: any, reqmatch?: OpenapiLoadMatch, ctrl?: Control): Promise<OpenapiEntity>;
}
export { OpenapiEntity };
