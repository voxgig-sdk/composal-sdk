import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerificationProjectRun, VerificationProjectRunLoadMatch, VerificationProjectRunListMatch, VerificationProjectRunCreateData } from '../ComposalTypes';
declare class VerificationProjectRunEntity extends ComposalEntityBase<VerificationProjectRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerificationProjectRunEntity): VerificationProjectRunEntity;
    load(this: any, reqmatch?: VerificationProjectRunLoadMatch, ctrl?: Control): Promise<VerificationProjectRunEntity>;
    list(this: any, reqmatch?: VerificationProjectRunListMatch, ctrl?: Control): Promise<VerificationProjectRunEntity[]>;
    create(this: any, reqdata?: VerificationProjectRunCreateData, ctrl?: Control): Promise<VerificationProjectRunEntity>;
}
export { VerificationProjectRunEntity };
