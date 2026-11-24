import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Setting, SettingLoadMatch } from '../ComposalTypes';
declare class SettingEntity extends ComposalEntityBase<Setting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SettingEntity): SettingEntity;
    load(this: any, reqmatch?: SettingLoadMatch, ctrl?: Control): Promise<SettingEntity>;
}
export { SettingEntity };
