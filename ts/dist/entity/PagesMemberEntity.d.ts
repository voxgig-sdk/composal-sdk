import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesMember, PagesMemberListMatch } from '../ComposalTypes';
declare class PagesMemberEntity extends ComposalEntityBase<PagesMember> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesMemberEntity): PagesMemberEntity;
    list(this: any, reqmatch?: PagesMemberListMatch, ctrl?: Control): Promise<PagesMemberEntity[]>;
}
export { PagesMemberEntity };
