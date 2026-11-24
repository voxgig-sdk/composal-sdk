import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { JobWorkspace, JobWorkspaceListMatch, JobWorkspaceCreateData, JobWorkspaceUpdateData, JobWorkspacePatchData } from '../ComposalTypes';
declare class JobWorkspaceEntity extends ComposalEntityBase<JobWorkspace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: JobWorkspaceEntity): JobWorkspaceEntity;
    list(this: any, reqmatch?: JobWorkspaceListMatch, ctrl?: Control): Promise<JobWorkspaceEntity[]>;
    create(this: any, reqdata?: JobWorkspaceCreateData, ctrl?: Control): Promise<JobWorkspaceEntity>;
    update(this: any, reqdata?: JobWorkspaceUpdateData, ctrl?: Control): Promise<JobWorkspaceEntity>;
    patch(this: any, reqdata?: JobWorkspacePatchData, ctrl?: Control): Promise<JobWorkspaceEntity>;
}
export { JobWorkspaceEntity };
