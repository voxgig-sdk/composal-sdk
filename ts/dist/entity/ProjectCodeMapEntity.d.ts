import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectCodeMap, ProjectCodeMapListMatch, ProjectCodeMapCreateData } from '../ComposalTypes';
declare class ProjectCodeMapEntity extends ComposalEntityBase<ProjectCodeMap> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectCodeMapEntity): ProjectCodeMapEntity;
    list(this: any, reqmatch?: ProjectCodeMapListMatch, ctrl?: Control): Promise<ProjectCodeMapEntity[]>;
    create(this: any, reqdata?: ProjectCodeMapCreateData, ctrl?: Control): Promise<ProjectCodeMapEntity>;
}
export { ProjectCodeMapEntity };
