import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseWorkspace, LeaseWorkspaceUpdateData } from '../ComposalTypes';
declare class LeaseWorkspaceEntity extends ComposalEntityBase<LeaseWorkspace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseWorkspaceEntity): LeaseWorkspaceEntity;
    update(this: any, reqdata?: LeaseWorkspaceUpdateData, ctrl?: Control): Promise<LeaseWorkspaceEntity>;
}
export { LeaseWorkspaceEntity };
