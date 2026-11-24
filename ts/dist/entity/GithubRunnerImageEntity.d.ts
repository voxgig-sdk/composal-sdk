import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerImage, GithubRunnerImageLoadMatch, GithubRunnerImageListMatch, GithubRunnerImageCreateData } from '../ComposalTypes';
declare class GithubRunnerImageEntity extends ComposalEntityBase<GithubRunnerImage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerImageEntity): GithubRunnerImageEntity;
    load(this: any, reqmatch?: GithubRunnerImageLoadMatch, ctrl?: Control): Promise<GithubRunnerImageEntity>;
    list(this: any, reqmatch?: GithubRunnerImageListMatch, ctrl?: Control): Promise<GithubRunnerImageEntity[]>;
    create(this: any, reqdata?: GithubRunnerImageCreateData, ctrl?: Control): Promise<GithubRunnerImageEntity>;
}
export { GithubRunnerImageEntity };
