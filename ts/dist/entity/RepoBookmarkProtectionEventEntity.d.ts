import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoBookmarkProtectionEvent, RepoBookmarkProtectionEventListMatch } from '../ComposalTypes';
declare class RepoBookmarkProtectionEventEntity extends ComposalEntityBase<RepoBookmarkProtectionEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoBookmarkProtectionEventEntity): RepoBookmarkProtectionEventEntity;
    list(this: any, reqmatch?: RepoBookmarkProtectionEventListMatch, ctrl?: Control): Promise<RepoBookmarkProtectionEventEntity[]>;
}
export { RepoBookmarkProtectionEventEntity };
