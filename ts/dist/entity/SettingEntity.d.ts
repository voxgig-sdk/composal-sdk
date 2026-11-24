import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Setting, SettingListMatch } from '../ComposalTypes';
declare class SettingEntity extends ComposalEntityBase<Setting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SettingEntity): SettingEntity;
    list(this: any, reqmatch?: SettingListMatch, ctrl?: Control): Promise<SettingEntity[]>;
}
export { SettingEntity };
