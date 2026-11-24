import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoAccessToken, RepoAccessTokenListMatch, RepoAccessTokenCreateData, RepoAccessTokenRemoveMatch } from '../ComposalTypes';
declare class RepoAccessTokenEntity extends ComposalEntityBase<RepoAccessToken> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoAccessTokenEntity): RepoAccessTokenEntity;
    list(this: any, reqmatch?: RepoAccessTokenListMatch, ctrl?: Control): Promise<RepoAccessTokenEntity[]>;
    create(this: any, reqdata?: RepoAccessTokenCreateData, ctrl?: Control): Promise<RepoAccessTokenEntity>;
    remove(this: any, reqmatch?: RepoAccessTokenRemoveMatch, ctrl?: Control): Promise<RepoAccessTokenEntity>;
}
export { RepoAccessTokenEntity };
