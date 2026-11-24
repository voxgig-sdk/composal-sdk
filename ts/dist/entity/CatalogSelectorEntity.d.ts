import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CatalogSelector, CatalogSelectorLoadMatch } from '../ComposalTypes';
declare class CatalogSelectorEntity extends ComposalEntityBase<CatalogSelector> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CatalogSelectorEntity): CatalogSelectorEntity;
    load(this: any, reqmatch?: CatalogSelectorLoadMatch, ctrl?: Control): Promise<CatalogSelectorEntity>;
}
export { CatalogSelectorEntity };
