import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubOnboardingImportItem, GithubOnboardingImportItemCreateData } from '../ComposalTypes';
declare class GithubOnboardingImportItemEntity extends ComposalEntityBase<GithubOnboardingImportItem> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubOnboardingImportItemEntity): GithubOnboardingImportItemEntity;
    create(this: any, reqdata?: GithubOnboardingImportItemCreateData, ctrl?: Control): Promise<GithubOnboardingImportItemEntity>;
}
export { GithubOnboardingImportItemEntity };
