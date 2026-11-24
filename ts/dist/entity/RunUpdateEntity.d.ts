import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunUpdate, RunUpdateListMatch } from '../ComposalTypes';
declare class RunUpdateEntity extends ComposalEntityBase<RunUpdate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunUpdateEntity): RunUpdateEntity;
    list(this: any, reqmatch?: RunUpdateListMatch, ctrl?: Control): Promise<RunUpdateEntity[]>;
}
export { RunUpdateEntity };
