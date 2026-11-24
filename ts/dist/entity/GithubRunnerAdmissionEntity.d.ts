import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubRunnerAdmission, GithubRunnerAdmissionCreateData } from '../ComposalTypes';
declare class GithubRunnerAdmissionEntity extends ComposalEntityBase<GithubRunnerAdmission> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubRunnerAdmissionEntity): GithubRunnerAdmissionEntity;
    create(this: any, reqdata?: GithubRunnerAdmissionCreateData, ctrl?: Control): Promise<GithubRunnerAdmissionEntity>;
}
export { GithubRunnerAdmissionEntity };
