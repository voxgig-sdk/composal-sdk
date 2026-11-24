import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CommitDiff, CommitDiffLoadMatch } from '../ComposalTypes';
declare class CommitDiffEntity extends ComposalEntityBase<CommitDiff> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CommitDiffEntity): CommitDiffEntity;
    load(this: any, reqmatch?: CommitDiffLoadMatch, ctrl?: Control): Promise<CommitDiffEntity>;
}
export { CommitDiffEntity };
