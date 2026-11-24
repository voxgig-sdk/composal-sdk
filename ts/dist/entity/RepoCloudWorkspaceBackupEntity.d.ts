import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoCloudWorkspaceBackup, RepoCloudWorkspaceBackupLoadMatch, RepoCloudWorkspaceBackupCreateData } from '../ComposalTypes';
declare class RepoCloudWorkspaceBackupEntity extends ComposalEntityBase<RepoCloudWorkspaceBackup> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoCloudWorkspaceBackupEntity): RepoCloudWorkspaceBackupEntity;
    load(this: any, reqmatch?: RepoCloudWorkspaceBackupLoadMatch, ctrl?: Control): Promise<RepoCloudWorkspaceBackupEntity>;
    create(this: any, reqdata?: RepoCloudWorkspaceBackupCreateData, ctrl?: Control): Promise<RepoCloudWorkspaceBackupEntity>;
}
export { RepoCloudWorkspaceBackupEntity };
