import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectRecording, ProjectRecordingLoadMatch, ProjectRecordingCreateData, ProjectRecordingRemoveMatch } from '../ComposalTypes';
declare class ProjectRecordingEntity extends ComposalEntityBase<ProjectRecording> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectRecordingEntity): ProjectRecordingEntity;
    load(this: any, reqmatch?: ProjectRecordingLoadMatch, ctrl?: Control): Promise<ProjectRecordingEntity>;
    create(this: any, reqdata?: ProjectRecordingCreateData, ctrl?: Control): Promise<ProjectRecordingEntity>;
    remove(this: any, reqmatch?: ProjectRecordingRemoveMatch, ctrl?: Control): Promise<ProjectRecordingEntity>;
}
export { ProjectRecordingEntity };
