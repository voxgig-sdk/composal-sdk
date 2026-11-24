import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeGitBranchSubmission, ChangeGitBranchSubmissionCreateData } from '../ComposalTypes';
declare class ChangeGitBranchSubmissionEntity extends ComposalEntityBase<ChangeGitBranchSubmission> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeGitBranchSubmissionEntity): ChangeGitBranchSubmissionEntity;
    create(this: any, reqdata?: ChangeGitBranchSubmissionCreateData, ctrl?: Control): Promise<ChangeGitBranchSubmissionEntity>;
}
export { ChangeGitBranchSubmissionEntity };
