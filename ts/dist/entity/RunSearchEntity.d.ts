import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunSearch, RunSearchLoadMatch } from '../ComposalTypes';
declare class RunSearchEntity extends ComposalEntityBase<RunSearch> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunSearchEntity): RunSearchEntity;
    load(this: any, reqmatch?: RunSearchLoadMatch, ctrl?: Control): Promise<RunSearchEntity>;
}
export { RunSearchEntity };
