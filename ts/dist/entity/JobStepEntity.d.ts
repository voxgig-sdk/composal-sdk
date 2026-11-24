import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { JobStep, JobStepLoadMatch, JobStepCreateData, JobStepUpdateData, JobStepPatchData } from '../ComposalTypes';
declare class JobStepEntity extends ComposalEntityBase<JobStep> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: JobStepEntity): JobStepEntity;
    load(this: any, reqmatch?: JobStepLoadMatch, ctrl?: Control): Promise<JobStepEntity>;
    create(this: any, reqdata?: JobStepCreateData, ctrl?: Control): Promise<JobStepEntity>;
    update(this: any, reqdata?: JobStepUpdateData, ctrl?: Control): Promise<JobStepEntity>;
    patch(this: any, reqdata?: JobStepPatchData, ctrl?: Control): Promise<JobStepEntity>;
}
export { JobStepEntity };
