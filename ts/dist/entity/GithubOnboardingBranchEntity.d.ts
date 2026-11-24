import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubOnboardingBranch, GithubOnboardingBranchListMatch } from '../ComposalTypes';
declare class GithubOnboardingBranchEntity extends ComposalEntityBase<GithubOnboardingBranch> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubOnboardingBranchEntity): GithubOnboardingBranchEntity;
    list(this: any, reqmatch?: GithubOnboardingBranchListMatch, ctrl?: Control): Promise<GithubOnboardingBranchEntity[]>;
}
export { GithubOnboardingBranchEntity };
