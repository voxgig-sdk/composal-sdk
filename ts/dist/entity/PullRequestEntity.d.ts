import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequest, PullRequestLoadMatch, PullRequestCreateData, PullRequestRemoveMatch } from '../ComposalTypes';
declare class PullRequestEntity extends ComposalEntityBase<PullRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestEntity): PullRequestEntity;
    load(this: any, reqmatch?: PullRequestLoadMatch, ctrl?: Control): Promise<PullRequestEntity>;
    create(this: any, reqdata?: PullRequestCreateData, ctrl?: Control): Promise<PullRequestEntity>;
    remove(this: any, reqmatch?: PullRequestRemoveMatch, ctrl?: Control): Promise<PullRequestEntity>;
}
export { PullRequestEntity };
