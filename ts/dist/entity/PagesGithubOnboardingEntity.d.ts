import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesGithubOnboarding, PagesGithubOnboardingLoadMatch } from '../ComposalTypes';
declare class PagesGithubOnboardingEntity extends ComposalEntityBase<PagesGithubOnboarding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesGithubOnboardingEntity): PagesGithubOnboardingEntity;
    load(this: any, reqmatch?: PagesGithubOnboardingLoadMatch, ctrl?: Control): Promise<PagesGithubOnboardingEntity>;
}
export { PagesGithubOnboardingEntity };
