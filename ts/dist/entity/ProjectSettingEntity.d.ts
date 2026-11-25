import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectSetting, ProjectSettingListMatch } from '../ComposalTypes';
declare class ProjectSettingEntity extends ComposalEntityBase<ProjectSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectSettingEntity): ProjectSettingEntity;
    list(this: any, reqmatch?: ProjectSettingListMatch, ctrl?: Control): Promise<ProjectSettingEntity[]>;
}
export { ProjectSettingEntity };
