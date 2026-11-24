import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectAndroidApk, ProjectAndroidApkCreateData } from '../ComposalTypes';
declare class ProjectAndroidApkEntity extends ComposalEntityBase<ProjectAndroidApk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectAndroidApkEntity): ProjectAndroidApkEntity;
    create(this: any, reqdata?: ProjectAndroidApkCreateData, ctrl?: Control): Promise<ProjectAndroidApkEntity>;
}
export { ProjectAndroidApkEntity };
