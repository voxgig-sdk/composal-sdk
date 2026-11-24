import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentPullRequest, AgentPullRequestListMatch } from '../ComposalTypes';
declare class AgentPullRequestEntity extends ComposalEntityBase<AgentPullRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentPullRequestEntity): AgentPullRequestEntity;
    list(this: any, reqmatch?: AgentPullRequestListMatch, ctrl?: Control): Promise<AgentPullRequestEntity[]>;
}
export { AgentPullRequestEntity };
