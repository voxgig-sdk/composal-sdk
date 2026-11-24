import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerCache, GithubRunnerCacheCreateData } from '../ComposalTypes';
declare class GithubRunnerCacheEntity extends ComposalEntityBase<GithubRunnerCache> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerCacheEntity): GithubRunnerCacheEntity;
    create(this: any, reqdata?: GithubRunnerCacheCreateData, ctrl?: Control): Promise<GithubRunnerCacheEntity>;
}
export { GithubRunnerCacheEntity };
