import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BookmarkProtectionRefreshGithubRequiredCheck, BookmarkProtectionRefreshGithubRequiredCheckCreateData } from '../ComposalTypes';
declare class BookmarkProtectionRefreshGithubRequiredCheckEntity extends ComposalEntityBase<BookmarkProtectionRefreshGithubRequiredCheck> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BookmarkProtectionRefreshGithubRequiredCheckEntity): BookmarkProtectionRefreshGithubRequiredCheckEntity;
    create(this: any, reqdata?: BookmarkProtectionRefreshGithubRequiredCheckCreateData, ctrl?: Control): Promise<BookmarkProtectionRefreshGithubRequiredCheckEntity>;
}
export { BookmarkProtectionRefreshGithubRequiredCheckEntity };
