import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectRunSchedule, ProjectRunScheduleLoadMatch, ProjectRunScheduleListMatch, ProjectRunScheduleCreateData, ProjectRunScheduleUpdateData, ProjectRunSchedulePatchData } from '../ComposalTypes';
declare class ProjectRunScheduleEntity extends ComposalEntityBase<ProjectRunSchedule> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectRunScheduleEntity): ProjectRunScheduleEntity;
    load(this: any, reqmatch?: ProjectRunScheduleLoadMatch, ctrl?: Control): Promise<ProjectRunScheduleEntity>;
    list(this: any, reqmatch?: ProjectRunScheduleListMatch, ctrl?: Control): Promise<ProjectRunScheduleEntity[]>;
    create(this: any, reqdata?: ProjectRunScheduleCreateData, ctrl?: Control): Promise<ProjectRunScheduleEntity>;
    update(this: any, reqdata?: ProjectRunScheduleUpdateData, ctrl?: Control): Promise<ProjectRunScheduleEntity>;
    patch(this: any, reqdata?: ProjectRunSchedulePatchData, ctrl?: Control): Promise<ProjectRunScheduleEntity>;
}
export { ProjectRunScheduleEntity };
