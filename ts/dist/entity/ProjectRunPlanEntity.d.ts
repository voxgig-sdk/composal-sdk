import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectRunPlan, ProjectRunPlanLoadMatch, ProjectRunPlanListMatch, ProjectRunPlanCreateData, ProjectRunPlanUpdateData, ProjectRunPlanPatchData } from '../ComposalTypes';
declare class ProjectRunPlanEntity extends ComposalEntityBase<ProjectRunPlan> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectRunPlanEntity): ProjectRunPlanEntity;
    load(this: any, reqmatch?: ProjectRunPlanLoadMatch, ctrl?: Control): Promise<ProjectRunPlanEntity>;
    list(this: any, reqmatch?: ProjectRunPlanListMatch, ctrl?: Control): Promise<ProjectRunPlanEntity[]>;
    create(this: any, reqdata?: ProjectRunPlanCreateData, ctrl?: Control): Promise<ProjectRunPlanEntity>;
    update(this: any, reqdata?: ProjectRunPlanUpdateData, ctrl?: Control): Promise<ProjectRunPlanEntity>;
    patch(this: any, reqdata?: ProjectRunPlanPatchData, ctrl?: Control): Promise<ProjectRunPlanEntity>;
}
export { ProjectRunPlanEntity };
