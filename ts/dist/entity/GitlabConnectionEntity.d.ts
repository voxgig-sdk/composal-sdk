import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GitlabConnection, GitlabConnectionCreateData } from '../ComposalTypes';
declare class GitlabConnectionEntity extends ComposalEntityBase<GitlabConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GitlabConnectionEntity): GitlabConnectionEntity;
    create(this: any, reqdata?: GitlabConnectionCreateData, ctrl?: Control): Promise<GitlabConnectionEntity>;
}
export { GitlabConnectionEntity };
