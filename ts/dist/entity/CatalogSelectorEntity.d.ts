import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CatalogSelector, CatalogSelectorListMatch } from '../ComposalTypes';
declare class CatalogSelectorEntity extends ComposalEntityBase<CatalogSelector> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CatalogSelectorEntity): CatalogSelectorEntity;
    list(this: any, reqmatch?: CatalogSelectorListMatch, ctrl?: Control): Promise<CatalogSelectorEntity[]>;
}
export { CatalogSelectorEntity };
