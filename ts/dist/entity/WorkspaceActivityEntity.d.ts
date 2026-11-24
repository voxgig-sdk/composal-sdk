import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkspaceActivity, WorkspaceActivityLoadMatch } from '../ComposalTypes';
declare class WorkspaceActivityEntity extends ComposalEntityBase<WorkspaceActivity> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkspaceActivityEntity): WorkspaceActivityEntity;
    load(this: any, reqmatch?: WorkspaceActivityLoadMatch, ctrl?: Control): Promise<WorkspaceActivityEntity>;
}
export { WorkspaceActivityEntity };
