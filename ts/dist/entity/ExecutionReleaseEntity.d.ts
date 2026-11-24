import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExecutionRelease, ExecutionReleaseLoadMatch, ExecutionReleaseListMatch, ExecutionReleaseCreateData } from '../ComposalTypes';
declare class ExecutionReleaseEntity extends ComposalEntityBase<ExecutionRelease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExecutionReleaseEntity): ExecutionReleaseEntity;
    load(this: any, reqmatch?: ExecutionReleaseLoadMatch, ctrl?: Control): Promise<ExecutionReleaseEntity>;
    list(this: any, reqmatch?: ExecutionReleaseListMatch, ctrl?: Control): Promise<ExecutionReleaseEntity[]>;
    create(this: any, reqdata?: ExecutionReleaseCreateData, ctrl?: Control): Promise<ExecutionReleaseEntity>;
}
export { ExecutionReleaseEntity };
