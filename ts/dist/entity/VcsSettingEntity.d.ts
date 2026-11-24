import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcsSetting, VcsSettingLoadMatch } from '../ComposalTypes';
declare class VcsSettingEntity extends ComposalEntityBase<VcsSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcsSettingEntity): VcsSettingEntity;
    load(this: any, reqmatch?: VcsSettingLoadMatch, ctrl?: Control): Promise<VcsSettingEntity>;
}
export { VcsSettingEntity };
