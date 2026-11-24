import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubPullRequest, GithubPullRequestLoadMatch, GithubPullRequestCreateData } from '../ComposalTypes';
declare class GithubPullRequestEntity extends ComposalEntityBase<GithubPullRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubPullRequestEntity): GithubPullRequestEntity;
    load(this: any, reqmatch?: GithubPullRequestLoadMatch, ctrl?: Control): Promise<GithubPullRequestEntity>;
    create(this: any, reqdata?: GithubPullRequestCreateData, ctrl?: Control): Promise<GithubPullRequestEntity>;
}
export { GithubPullRequestEntity };
