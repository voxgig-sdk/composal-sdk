import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunUpdate, RunUpdateLoadMatch } from '../ComposalTypes';
declare class RunUpdateEntity extends ComposalEntityBase<RunUpdate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunUpdateEntity): RunUpdateEntity;
    load(this: any, reqmatch?: RunUpdateLoadMatch, ctrl?: Control): Promise<RunUpdateEntity>;
}
export { RunUpdateEntity };
