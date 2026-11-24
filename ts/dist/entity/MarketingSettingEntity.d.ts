import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MarketingSetting, MarketingSettingLoadMatch } from '../ComposalTypes';
declare class MarketingSettingEntity extends ComposalEntityBase<MarketingSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MarketingSettingEntity): MarketingSettingEntity;
    load(this: any, reqmatch?: MarketingSettingLoadMatch, ctrl?: Control): Promise<MarketingSettingEntity>;
}
export { MarketingSettingEntity };
