import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestAction, PullRequestActionCreateData } from '../ComposalTypes';
declare class PullRequestActionEntity extends ComposalEntityBase<PullRequestAction> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestActionEntity): PullRequestActionEntity;
    create(this: any, reqdata?: PullRequestActionCreateData, ctrl?: Control): Promise<PullRequestActionEntity>;
}
export { PullRequestActionEntity };
