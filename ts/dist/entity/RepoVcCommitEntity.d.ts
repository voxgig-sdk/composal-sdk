import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoVcCommit, RepoVcCommitListMatch } from '../ComposalTypes';
declare class RepoVcCommitEntity extends ComposalEntityBase<RepoVcCommit> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoVcCommitEntity): RepoVcCommitEntity;
    list(this: any, reqmatch?: RepoVcCommitListMatch, ctrl?: Control): Promise<RepoVcCommitEntity[]>;
}
export { RepoVcCommitEntity };
