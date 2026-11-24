import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoSetting, RepoSettingListMatch, RepoSettingUpdateData } from '../ComposalTypes';
declare class RepoSettingEntity extends ComposalEntityBase<RepoSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoSettingEntity): RepoSettingEntity;
    list(this: any, reqmatch?: RepoSettingListMatch, ctrl?: Control): Promise<RepoSettingEntity[]>;
    update(this: any, reqdata?: RepoSettingUpdateData, ctrl?: Control): Promise<RepoSettingEntity>;
}
export { RepoSettingEntity };
