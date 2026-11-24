import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerSetup, GithubRunnerSetupLoadMatch, GithubRunnerSetupCreateData } from '../ComposalTypes';
declare class GithubRunnerSetupEntity extends ComposalEntityBase<GithubRunnerSetup> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerSetupEntity): GithubRunnerSetupEntity;
    load(this: any, reqmatch?: GithubRunnerSetupLoadMatch, ctrl?: Control): Promise<GithubRunnerSetupEntity>;
    create(this: any, reqdata?: GithubRunnerSetupCreateData, ctrl?: Control): Promise<GithubRunnerSetupEntity>;
}
export { GithubRunnerSetupEntity };
