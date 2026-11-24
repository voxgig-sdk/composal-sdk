import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubOnboardingImportBatch, GithubOnboardingImportBatchLoadMatch } from '../ComposalTypes';
declare class GithubOnboardingImportBatchEntity extends ComposalEntityBase<GithubOnboardingImportBatch> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubOnboardingImportBatchEntity): GithubOnboardingImportBatchEntity;
    load(this: any, reqmatch?: GithubOnboardingImportBatchLoadMatch, ctrl?: Control): Promise<GithubOnboardingImportBatchEntity>;
}
export { GithubOnboardingImportBatchEntity };
