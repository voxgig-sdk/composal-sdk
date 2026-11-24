import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWritePermission, AgentWritePermissionListMatch, AgentWritePermissionRemoveMatch } from '../ComposalTypes';
declare class AgentWritePermissionEntity extends ComposalEntityBase<AgentWritePermission> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWritePermissionEntity): AgentWritePermissionEntity;
    list(this: any, reqmatch?: AgentWritePermissionListMatch, ctrl?: Control): Promise<AgentWritePermissionEntity[]>;
    remove(this: any, reqmatch?: AgentWritePermissionRemoveMatch, ctrl?: Control): Promise<AgentWritePermissionEntity>;
}
export { AgentWritePermissionEntity };
