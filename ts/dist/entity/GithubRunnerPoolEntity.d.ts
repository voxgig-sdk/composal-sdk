import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerPool, GithubRunnerPoolListMatch, GithubRunnerPoolCreateData, GithubRunnerPoolUpdateData } from '../ComposalTypes';
declare class GithubRunnerPoolEntity extends ComposalEntityBase<GithubRunnerPool> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerPoolEntity): GithubRunnerPoolEntity;
    list(this: any, reqmatch?: GithubRunnerPoolListMatch, ctrl?: Control): Promise<GithubRunnerPoolEntity[]>;
    create(this: any, reqdata?: GithubRunnerPoolCreateData, ctrl?: Control): Promise<GithubRunnerPoolEntity>;
    update(this: any, reqdata?: GithubRunnerPoolUpdateData, ctrl?: Control): Promise<GithubRunnerPoolEntity>;
}
export { GithubRunnerPoolEntity };
