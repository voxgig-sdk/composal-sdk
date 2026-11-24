import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcsSetting, VcsSettingListMatch } from '../ComposalTypes';
declare class VcsSettingEntity extends ComposalEntityBase<VcsSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcsSettingEntity): VcsSettingEntity;
    list(this: any, reqmatch?: VcsSettingListMatch, ctrl?: Control): Promise<VcsSettingEntity[]>;
}
export { VcsSettingEntity };
