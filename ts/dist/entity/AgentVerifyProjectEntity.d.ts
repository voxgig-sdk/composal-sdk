import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentVerifyProject, AgentVerifyProjectListMatch, AgentVerifyProjectUpdateData } from '../ComposalTypes';
declare class AgentVerifyProjectEntity extends ComposalEntityBase<AgentVerifyProject> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentVerifyProjectEntity): AgentVerifyProjectEntity;
    list(this: any, reqmatch?: AgentVerifyProjectListMatch, ctrl?: Control): Promise<AgentVerifyProjectEntity[]>;
    update(this: any, reqdata?: AgentVerifyProjectUpdateData, ctrl?: Control): Promise<AgentVerifyProjectEntity>;
}
export { AgentVerifyProjectEntity };
