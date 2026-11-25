import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyPullRequest, VerifyPullRequestLoadMatch, VerifyPullRequestCreateData, VerifyPullRequestRemoveMatch } from '../ComposalTypes';
declare class VerifyPullRequestEntity extends ComposalEntityBase<VerifyPullRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyPullRequestEntity): VerifyPullRequestEntity;
    load(this: any, reqmatch?: VerifyPullRequestLoadMatch, ctrl?: Control): Promise<VerifyPullRequestEntity>;
    create(this: any, reqdata?: VerifyPullRequestCreateData, ctrl?: Control): Promise<VerifyPullRequestEntity>;
    remove(this: any, reqmatch?: VerifyPullRequestRemoveMatch, ctrl?: Control): Promise<VerifyPullRequestEntity>;
}
export { VerifyPullRequestEntity };
