import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PageRepoVcCommit, PageRepoVcCommitLoadMatch } from '../ComposalTypes';
declare class PageRepoVcCommitEntity extends ComposalEntityBase<PageRepoVcCommit> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageRepoVcCommitEntity): PageRepoVcCommitEntity;
    load(this: any, reqmatch?: PageRepoVcCommitLoadMatch, ctrl?: Control): Promise<PageRepoVcCommitEntity>;
}
export { PageRepoVcCommitEntity };
