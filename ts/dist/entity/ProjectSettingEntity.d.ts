import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectSetting, ProjectSettingLoadMatch } from '../ComposalTypes';
declare class ProjectSettingEntity extends ComposalEntityBase<ProjectSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectSettingEntity): ProjectSettingEntity;
    load(this: any, reqmatch?: ProjectSettingLoadMatch, ctrl?: Control): Promise<ProjectSettingEntity>;
}
export { ProjectSettingEntity };
