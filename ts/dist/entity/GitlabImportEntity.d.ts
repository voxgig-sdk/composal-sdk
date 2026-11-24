import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GitlabImport, GitlabImportCreateData } from '../ComposalTypes';
declare class GitlabImportEntity extends ComposalEntityBase<GitlabImport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GitlabImportEntity): GitlabImportEntity;
    create(this: any, reqdata?: GitlabImportCreateData, ctrl?: Control): Promise<GitlabImportEntity>;
}
export { GitlabImportEntity };
