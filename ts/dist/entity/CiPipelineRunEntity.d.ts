import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CiPipelineRun, CiPipelineRunLoadMatch, CiPipelineRunListMatch, CiPipelineRunCreateData } from '../ComposalTypes';
declare class CiPipelineRunEntity extends ComposalEntityBase<CiPipelineRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CiPipelineRunEntity): CiPipelineRunEntity;
    load(this: any, reqmatch?: CiPipelineRunLoadMatch, ctrl?: Control): Promise<CiPipelineRunEntity>;
    list(this: any, reqmatch?: CiPipelineRunListMatch, ctrl?: Control): Promise<CiPipelineRunEntity[]>;
    create(this: any, reqdata?: CiPipelineRunCreateData, ctrl?: Control): Promise<CiPipelineRunEntity>;
}
export { CiPipelineRunEntity };
