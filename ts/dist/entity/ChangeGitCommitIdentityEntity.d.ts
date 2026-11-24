import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeGitCommitIdentity, ChangeGitCommitIdentityLoadMatch, ChangeGitCommitIdentityCreateData } from '../ComposalTypes';
declare class ChangeGitCommitIdentityEntity extends ComposalEntityBase<ChangeGitCommitIdentity> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeGitCommitIdentityEntity): ChangeGitCommitIdentityEntity;
    load(this: any, reqmatch?: ChangeGitCommitIdentityLoadMatch, ctrl?: Control): Promise<ChangeGitCommitIdentityEntity>;
    create(this: any, reqdata?: ChangeGitCommitIdentityCreateData, ctrl?: Control): Promise<ChangeGitCommitIdentityEntity>;
}
export { ChangeGitCommitIdentityEntity };
