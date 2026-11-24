import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubOnboardingImport, GithubOnboardingImportCreateData } from '../ComposalTypes';
declare class GithubOnboardingImportEntity extends ComposalEntityBase<GithubOnboardingImport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubOnboardingImportEntity): GithubOnboardingImportEntity;
    create(this: any, reqdata?: GithubOnboardingImportCreateData, ctrl?: Control): Promise<GithubOnboardingImportEntity>;
}
export { GithubOnboardingImportEntity };
