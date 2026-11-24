import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectProductMap, ProjectProductMapLoadMatch, ProjectProductMapCreateData } from '../ComposalTypes';
declare class ProjectProductMapEntity extends ComposalEntityBase<ProjectProductMap> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectProductMapEntity): ProjectProductMapEntity;
    load(this: any, reqmatch?: ProjectProductMapLoadMatch, ctrl?: Control): Promise<ProjectProductMapEntity>;
    create(this: any, reqdata?: ProjectProductMapCreateData, ctrl?: Control): Promise<ProjectProductMapEntity>;
}
export { ProjectProductMapEntity };
