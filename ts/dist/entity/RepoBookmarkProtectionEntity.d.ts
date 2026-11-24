import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoBookmarkProtection, RepoBookmarkProtectionLoadMatch, RepoBookmarkProtectionListMatch, RepoBookmarkProtectionCreateData, RepoBookmarkProtectionUpdateData, RepoBookmarkProtectionPatchData, RepoBookmarkProtectionRemoveMatch } from '../ComposalTypes';
declare class RepoBookmarkProtectionEntity extends ComposalEntityBase<RepoBookmarkProtection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoBookmarkProtectionEntity): RepoBookmarkProtectionEntity;
    load(this: any, reqmatch?: RepoBookmarkProtectionLoadMatch, ctrl?: Control): Promise<RepoBookmarkProtectionEntity>;
    list(this: any, reqmatch?: RepoBookmarkProtectionListMatch, ctrl?: Control): Promise<RepoBookmarkProtectionEntity[]>;
    create(this: any, reqdata?: RepoBookmarkProtectionCreateData, ctrl?: Control): Promise<RepoBookmarkProtectionEntity>;
    update(this: any, reqdata?: RepoBookmarkProtectionUpdateData, ctrl?: Control): Promise<RepoBookmarkProtectionEntity>;
    patch(this: any, reqdata?: RepoBookmarkProtectionPatchData, ctrl?: Control): Promise<RepoBookmarkProtectionEntity>;
    remove(this: any, reqmatch?: RepoBookmarkProtectionRemoveMatch, ctrl?: Control): Promise<RepoBookmarkProtectionEntity>;
}
export { RepoBookmarkProtectionEntity };
