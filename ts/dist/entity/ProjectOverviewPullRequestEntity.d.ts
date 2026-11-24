import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectOverviewPullRequest, ProjectOverviewPullRequestListMatch } from '../ComposalTypes';
declare class ProjectOverviewPullRequestEntity extends ComposalEntityBase<ProjectOverviewPullRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectOverviewPullRequestEntity): ProjectOverviewPullRequestEntity;
    list(this: any, reqmatch?: ProjectOverviewPullRequestListMatch, ctrl?: Control): Promise<ProjectOverviewPullRequestEntity[]>;
}
export { ProjectOverviewPullRequestEntity };
