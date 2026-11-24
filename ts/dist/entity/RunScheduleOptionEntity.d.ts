import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunScheduleOption, RunScheduleOptionListMatch } from '../ComposalTypes';
declare class RunScheduleOptionEntity extends ComposalEntityBase<RunScheduleOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunScheduleOptionEntity): RunScheduleOptionEntity;
    list(this: any, reqmatch?: RunScheduleOptionListMatch, ctrl?: Control): Promise<RunScheduleOptionEntity[]>;
}
export { RunScheduleOptionEntity };
