import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Page, PageLoadMatch } from '../ComposalTypes';
declare class PageEntity extends ComposalEntityBase<Page> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageEntity): PageEntity;
    load(this: any, reqmatch?: PageLoadMatch, ctrl?: Control): Promise<PageEntity>;
}
export { PageEntity };
