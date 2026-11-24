import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PageProjectRun, PageProjectRunLoadMatch } from '../ComposalTypes';
declare class PageProjectRunEntity extends ComposalEntityBase<PageProjectRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageProjectRunEntity): PageProjectRunEntity;
    load(this: any, reqmatch?: PageProjectRunLoadMatch, ctrl?: Control): Promise<PageProjectRunEntity>;
}
export { PageProjectRunEntity };
