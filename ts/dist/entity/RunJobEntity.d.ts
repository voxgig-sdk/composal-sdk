import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunJob, RunJobLoadMatch, RunJobListMatch, RunJobCreateData } from '../ComposalTypes';
declare class RunJobEntity extends ComposalEntityBase<RunJob> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunJobEntity): RunJobEntity;
    load(this: any, reqmatch?: RunJobLoadMatch, ctrl?: Control): Promise<RunJobEntity>;
    list(this: any, reqmatch?: RunJobListMatch, ctrl?: Control): Promise<RunJobEntity[]>;
    create(this: any, reqdata?: RunJobCreateData, ctrl?: Control): Promise<RunJobEntity>;
}
export { RunJobEntity };
