import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerHistory, GithubRunnerHistoryLoadMatch } from '../ComposalTypes';
declare class GithubRunnerHistoryEntity extends ComposalEntityBase<GithubRunnerHistory> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerHistoryEntity): GithubRunnerHistoryEntity;
    load(this: any, reqmatch?: GithubRunnerHistoryLoadMatch, ctrl?: Control): Promise<GithubRunnerHistoryEntity>;
}
export { GithubRunnerHistoryEntity };
