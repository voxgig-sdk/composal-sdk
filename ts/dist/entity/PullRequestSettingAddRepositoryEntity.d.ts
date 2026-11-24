import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestSettingAddRepository, PullRequestSettingAddRepositoryCreateData } from '../ComposalTypes';
declare class PullRequestSettingAddRepositoryEntity extends ComposalEntityBase<PullRequestSettingAddRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestSettingAddRepositoryEntity): PullRequestSettingAddRepositoryEntity;
    create(this: any, reqdata?: PullRequestSettingAddRepositoryCreateData, ctrl?: Control): Promise<PullRequestSettingAddRepositoryEntity>;
}
export { PullRequestSettingAddRepositoryEntity };
