import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CiRunnerPool, CiRunnerPoolLoadMatch, CiRunnerPoolListMatch, CiRunnerPoolCreateData, CiRunnerPoolUpdateData, CiRunnerPoolPatchData } from '../ComposalTypes';
declare class CiRunnerPoolEntity extends ComposalEntityBase<CiRunnerPool> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CiRunnerPoolEntity): CiRunnerPoolEntity;
    load(this: any, reqmatch?: CiRunnerPoolLoadMatch, ctrl?: Control): Promise<CiRunnerPoolEntity>;
    list(this: any, reqmatch?: CiRunnerPoolListMatch, ctrl?: Control): Promise<CiRunnerPoolEntity[]>;
    create(this: any, reqdata?: CiRunnerPoolCreateData, ctrl?: Control): Promise<CiRunnerPoolEntity>;
    update(this: any, reqdata?: CiRunnerPoolUpdateData, ctrl?: Control): Promise<CiRunnerPoolEntity>;
    patch(this: any, reqdata?: CiRunnerPoolPatchData, ctrl?: Control): Promise<CiRunnerPoolEntity>;
}
export { CiRunnerPoolEntity };
