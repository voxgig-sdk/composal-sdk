import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RoderCodeRepairSetting, RoderCodeRepairSettingListMatch, RoderCodeRepairSettingCreateData } from '../ComposalTypes';
declare class RoderCodeRepairSettingEntity extends ComposalEntityBase<RoderCodeRepairSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RoderCodeRepairSettingEntity): RoderCodeRepairSettingEntity;
    list(this: any, reqmatch?: RoderCodeRepairSettingListMatch, ctrl?: Control): Promise<RoderCodeRepairSettingEntity[]>;
    create(this: any, reqdata?: RoderCodeRepairSettingCreateData, ctrl?: Control): Promise<RoderCodeRepairSettingEntity>;
}
export { RoderCodeRepairSettingEntity };
