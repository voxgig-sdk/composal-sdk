import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunnerPoolRunner, RunnerPoolRunnerLoadMatch, RunnerPoolRunnerListMatch, RunnerPoolRunnerCreateData, RunnerPoolRunnerUpdateData, RunnerPoolRunnerPatchData } from '../ComposalTypes';
declare class RunnerPoolRunnerEntity extends ComposalEntityBase<RunnerPoolRunner> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunnerPoolRunnerEntity): RunnerPoolRunnerEntity;
    load(this: any, reqmatch?: RunnerPoolRunnerLoadMatch, ctrl?: Control): Promise<RunnerPoolRunnerEntity>;
    list(this: any, reqmatch?: RunnerPoolRunnerListMatch, ctrl?: Control): Promise<RunnerPoolRunnerEntity[]>;
    create(this: any, reqdata?: RunnerPoolRunnerCreateData, ctrl?: Control): Promise<RunnerPoolRunnerEntity>;
    update(this: any, reqdata?: RunnerPoolRunnerUpdateData, ctrl?: Control): Promise<RunnerPoolRunnerEntity>;
    patch(this: any, reqdata?: RunnerPoolRunnerPatchData, ctrl?: Control): Promise<RunnerPoolRunnerEntity>;
}
export { RunnerPoolRunnerEntity };
