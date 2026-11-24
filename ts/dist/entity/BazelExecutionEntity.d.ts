import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BazelExecution, BazelExecutionLoadMatch, BazelExecutionCreateData } from '../ComposalTypes';
declare class BazelExecutionEntity extends ComposalEntityBase<BazelExecution> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelExecutionEntity): BazelExecutionEntity;
    load(this: any, reqmatch?: BazelExecutionLoadMatch, ctrl?: Control): Promise<BazelExecutionEntity>;
    create(this: any, reqdata?: BazelExecutionCreateData, ctrl?: Control): Promise<BazelExecutionEntity>;
}
export { BazelExecutionEntity };
