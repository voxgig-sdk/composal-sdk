import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunnerLease, RunnerLeaseListMatch, RunnerLeaseCreateData } from '../ComposalTypes';
declare class RunnerLeaseEntity extends ComposalEntityBase<RunnerLease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunnerLeaseEntity): RunnerLeaseEntity;
    list(this: any, reqmatch?: RunnerLeaseListMatch, ctrl?: Control): Promise<RunnerLeaseEntity[]>;
    create(this: any, reqdata?: RunnerLeaseCreateData, ctrl?: Control): Promise<RunnerLeaseEntity>;
}
export { RunnerLeaseEntity };
