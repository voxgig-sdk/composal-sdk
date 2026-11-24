import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubCiRepository, GithubCiRepositoryLoadMatch, GithubCiRepositoryListMatch, GithubCiRepositoryCreateData, GithubCiRepositoryUpdateData, GithubCiRepositoryPatchData } from '../ComposalTypes';
declare class GithubCiRepositoryEntity extends ComposalEntityBase<GithubCiRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubCiRepositoryEntity): GithubCiRepositoryEntity;
    load(this: any, reqmatch?: GithubCiRepositoryLoadMatch, ctrl?: Control): Promise<GithubCiRepositoryEntity>;
    list(this: any, reqmatch?: GithubCiRepositoryListMatch, ctrl?: Control): Promise<GithubCiRepositoryEntity[]>;
    create(this: any, reqdata?: GithubCiRepositoryCreateData, ctrl?: Control): Promise<GithubCiRepositoryEntity>;
    update(this: any, reqdata?: GithubCiRepositoryUpdateData, ctrl?: Control): Promise<GithubCiRepositoryEntity>;
    patch(this: any, reqdata?: GithubCiRepositoryPatchData, ctrl?: Control): Promise<GithubCiRepositoryEntity>;
}
export { GithubCiRepositoryEntity };
