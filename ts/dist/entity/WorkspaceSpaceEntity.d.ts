import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkspaceSpace, WorkspaceSpaceLoadMatch, WorkspaceSpaceListMatch, WorkspaceSpaceCreateData } from '../ComposalTypes';
declare class WorkspaceSpaceEntity extends ComposalEntityBase<WorkspaceSpace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkspaceSpaceEntity): WorkspaceSpaceEntity;
    load(this: any, reqmatch?: WorkspaceSpaceLoadMatch, ctrl?: Control): Promise<WorkspaceSpaceEntity>;
    list(this: any, reqmatch?: WorkspaceSpaceListMatch, ctrl?: Control): Promise<WorkspaceSpaceEntity[]>;
    create(this: any, reqdata?: WorkspaceSpaceCreateData, ctrl?: Control): Promise<WorkspaceSpaceEntity>;
}
export { WorkspaceSpaceEntity };
