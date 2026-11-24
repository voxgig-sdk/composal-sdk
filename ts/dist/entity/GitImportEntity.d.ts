import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GitImport, GitImportLoadMatch, GitImportCreateData } from '../ComposalTypes';
declare class GitImportEntity extends ComposalEntityBase<GitImport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GitImportEntity): GitImportEntity;
    load(this: any, reqmatch?: GitImportLoadMatch, ctrl?: Control): Promise<GitImportEntity>;
    create(this: any, reqdata?: GitImportCreateData, ctrl?: Control): Promise<GitImportEntity>;
}
export { GitImportEntity };
