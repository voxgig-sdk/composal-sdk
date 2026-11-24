import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerEgress, GithubRunnerEgressLoadMatch, GithubRunnerEgressCreateData } from '../ComposalTypes';
declare class GithubRunnerEgressEntity extends ComposalEntityBase<GithubRunnerEgress> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerEgressEntity): GithubRunnerEgressEntity;
    load(this: any, reqmatch?: GithubRunnerEgressLoadMatch, ctrl?: Control): Promise<GithubRunnerEgressEntity>;
    create(this: any, reqdata?: GithubRunnerEgressCreateData, ctrl?: Control): Promise<GithubRunnerEgressEntity>;
}
export { GithubRunnerEgressEntity };
