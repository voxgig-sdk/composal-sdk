import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWorkspace, AgentWorkspaceListMatch, AgentWorkspaceUpdateData } from '../ComposalTypes';
declare class AgentWorkspaceEntity extends ComposalEntityBase<AgentWorkspace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkspaceEntity): AgentWorkspaceEntity;
    list(this: any, reqmatch?: AgentWorkspaceListMatch, ctrl?: Control): Promise<AgentWorkspaceEntity[]>;
    update(this: any, reqdata?: AgentWorkspaceUpdateData, ctrl?: Control): Promise<AgentWorkspaceEntity>;
}
export { AgentWorkspaceEntity };
