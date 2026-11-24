import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubAppImportableRepository, GithubAppImportableRepositoryListMatch } from '../ComposalTypes';
declare class GithubAppImportableRepositoryEntity extends ComposalEntityBase<GithubAppImportableRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubAppImportableRepositoryEntity): GithubAppImportableRepositoryEntity;
    list(this: any, reqmatch?: GithubAppImportableRepositoryListMatch, ctrl?: Control): Promise<GithubAppImportableRepositoryEntity[]>;
}
export { GithubAppImportableRepositoryEntity };
