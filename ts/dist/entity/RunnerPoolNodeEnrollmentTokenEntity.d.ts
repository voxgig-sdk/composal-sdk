import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunnerPoolNodeEnrollmentToken, RunnerPoolNodeEnrollmentTokenListMatch, RunnerPoolNodeEnrollmentTokenCreateData } from '../ComposalTypes';
declare class RunnerPoolNodeEnrollmentTokenEntity extends ComposalEntityBase<RunnerPoolNodeEnrollmentToken> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunnerPoolNodeEnrollmentTokenEntity): RunnerPoolNodeEnrollmentTokenEntity;
    list(this: any, reqmatch?: RunnerPoolNodeEnrollmentTokenListMatch, ctrl?: Control): Promise<RunnerPoolNodeEnrollmentTokenEntity[]>;
    create(this: any, reqdata?: RunnerPoolNodeEnrollmentTokenCreateData, ctrl?: Control): Promise<RunnerPoolNodeEnrollmentTokenEntity>;
}
export { RunnerPoolNodeEnrollmentTokenEntity };
