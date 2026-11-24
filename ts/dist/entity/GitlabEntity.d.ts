import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Gitlab, GitlabLoadMatch, GitlabCreateData } from '../ComposalTypes';
declare class GitlabEntity extends ComposalEntityBase<Gitlab> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GitlabEntity): GitlabEntity;
    load(this: any, reqmatch?: GitlabLoadMatch, ctrl?: Control): Promise<GitlabEntity>;
    create(this: any, reqdata?: GitlabCreateData, ctrl?: Control): Promise<GitlabEntity>;
}
export { GitlabEntity };
