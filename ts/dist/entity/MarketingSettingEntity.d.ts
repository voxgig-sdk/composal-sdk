import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MarketingSetting, MarketingSettingListMatch } from '../ComposalTypes';
declare class MarketingSettingEntity extends ComposalEntityBase<MarketingSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MarketingSettingEntity): MarketingSettingEntity;
    list(this: any, reqmatch?: MarketingSettingListMatch, ctrl?: Control): Promise<MarketingSettingEntity[]>;
}
export { MarketingSettingEntity };
