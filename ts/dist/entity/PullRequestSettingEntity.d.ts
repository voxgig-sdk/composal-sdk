import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestSetting, PullRequestSettingLoadMatch, PullRequestSettingCreateData } from '../ComposalTypes';
declare class PullRequestSettingEntity extends ComposalEntityBase<PullRequestSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestSettingEntity): PullRequestSettingEntity;
    load(this: any, reqmatch?: PullRequestSettingLoadMatch, ctrl?: Control): Promise<PullRequestSettingEntity>;
    create(this: any, reqdata?: PullRequestSettingCreateData, ctrl?: Control): Promise<PullRequestSettingEntity>;
}
export { PullRequestSettingEntity };
