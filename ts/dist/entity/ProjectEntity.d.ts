import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Project, ProjectLoadMatch, ProjectListMatch, ProjectCreateData, ProjectUpdateData, ProjectPatchData } from '../ComposalTypes';
declare class ProjectEntity extends ComposalEntityBase<Project> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
    load(this: any, reqmatch?: ProjectLoadMatch, ctrl?: Control): Promise<ProjectEntity>;
    list(this: any, reqmatch?: ProjectListMatch, ctrl?: Control): Promise<ProjectEntity[]>;
    create(this: any, reqdata?: ProjectCreateData, ctrl?: Control): Promise<ProjectEntity>;
    update(this: any, reqdata?: ProjectUpdateData, ctrl?: Control): Promise<ProjectEntity>;
    patch(this: any, reqdata?: ProjectPatchData, ctrl?: Control): Promise<ProjectEntity>;
}
export { ProjectEntity };
