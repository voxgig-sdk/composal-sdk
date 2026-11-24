import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubOnboarding, GithubOnboardingLoadMatch } from '../ComposalTypes';
declare class GithubOnboardingEntity extends ComposalEntityBase<GithubOnboarding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubOnboardingEntity): GithubOnboardingEntity;
    load(this: any, reqmatch?: GithubOnboardingLoadMatch, ctrl?: Control): Promise<GithubOnboardingEntity>;
}
export { GithubOnboardingEntity };
