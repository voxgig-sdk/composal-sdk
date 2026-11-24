import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoAction, RepoActionListMatch } from '../ComposalTypes';
declare class RepoActionEntity extends ComposalEntityBase<RepoAction> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoActionEntity): RepoActionEntity;
    list(this: any, reqmatch?: RepoActionListMatch, ctrl?: Control): Promise<RepoActionEntity[]>;
}
export { RepoActionEntity };
