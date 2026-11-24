import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubCiRepositoryCompatibilityReport, GithubCiRepositoryCompatibilityReportLoadMatch, GithubCiRepositoryCompatibilityReportListMatch } from '../ComposalTypes';
declare class GithubCiRepositoryCompatibilityReportEntity extends ComposalEntityBase<GithubCiRepositoryCompatibilityReport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubCiRepositoryCompatibilityReportEntity): GithubCiRepositoryCompatibilityReportEntity;
    load(this: any, reqmatch?: GithubCiRepositoryCompatibilityReportLoadMatch, ctrl?: Control): Promise<GithubCiRepositoryCompatibilityReportEntity>;
    list(this: any, reqmatch?: GithubCiRepositoryCompatibilityReportListMatch, ctrl?: Control): Promise<GithubCiRepositoryCompatibilityReportEntity[]>;
}
export { GithubCiRepositoryCompatibilityReportEntity };
