import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectEnvironment, ProjectEnvironmentLoadMatch, ProjectEnvironmentListMatch, ProjectEnvironmentCreateData, ProjectEnvironmentUpdateData, ProjectEnvironmentPatchData } from '../ComposalTypes';
declare class ProjectEnvironmentEntity extends ComposalEntityBase<ProjectEnvironment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectEnvironmentEntity): ProjectEnvironmentEntity;
    load(this: any, reqmatch?: ProjectEnvironmentLoadMatch, ctrl?: Control): Promise<ProjectEnvironmentEntity>;
    list(this: any, reqmatch?: ProjectEnvironmentListMatch, ctrl?: Control): Promise<ProjectEnvironmentEntity[]>;
    create(this: any, reqdata?: ProjectEnvironmentCreateData, ctrl?: Control): Promise<ProjectEnvironmentEntity>;
    update(this: any, reqdata?: ProjectEnvironmentUpdateData, ctrl?: Control): Promise<ProjectEnvironmentEntity>;
    patch(this: any, reqdata?: ProjectEnvironmentPatchData, ctrl?: Control): Promise<ProjectEnvironmentEntity>;
}
export { ProjectEnvironmentEntity };
