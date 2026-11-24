import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationSetting, OrganizationSettingUpdateData } from '../ComposalTypes';
declare class OrganizationSettingEntity extends ComposalEntityBase<OrganizationSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationSettingEntity): OrganizationSettingEntity;
    update(this: any, reqdata?: OrganizationSettingUpdateData, ctrl?: Control): Promise<OrganizationSettingEntity>;
}
export { OrganizationSettingEntity };
