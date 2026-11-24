import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentSetting, DeploymentSettingListMatch } from '../ComposalTypes';
declare class DeploymentSettingEntity extends ComposalEntityBase<DeploymentSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentSettingEntity): DeploymentSettingEntity;
    list(this: any, reqmatch?: DeploymentSettingListMatch, ctrl?: Control): Promise<DeploymentSettingEntity[]>;
}
export { DeploymentSettingEntity };
