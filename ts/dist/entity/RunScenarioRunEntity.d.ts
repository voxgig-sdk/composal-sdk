import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunScenarioRun, RunScenarioRunLoadMatch, RunScenarioRunUpdateData } from '../ComposalTypes';
declare class RunScenarioRunEntity extends ComposalEntityBase<RunScenarioRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunScenarioRunEntity): RunScenarioRunEntity;
    load(this: any, reqmatch?: RunScenarioRunLoadMatch, ctrl?: Control): Promise<RunScenarioRunEntity>;
    update(this: any, reqdata?: RunScenarioRunUpdateData, ctrl?: Control): Promise<RunScenarioRunEntity>;
}
export { RunScenarioRunEntity };
