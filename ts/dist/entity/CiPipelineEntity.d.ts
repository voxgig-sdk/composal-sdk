import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CiPipeline, CiPipelineLoadMatch, CiPipelineListMatch, CiPipelineCreateData } from '../ComposalTypes';
declare class CiPipelineEntity extends ComposalEntityBase<CiPipeline> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CiPipelineEntity): CiPipelineEntity;
    load(this: any, reqmatch?: CiPipelineLoadMatch, ctrl?: Control): Promise<CiPipelineEntity>;
    list(this: any, reqmatch?: CiPipelineListMatch, ctrl?: Control): Promise<CiPipelineEntity[]>;
    create(this: any, reqdata?: CiPipelineCreateData, ctrl?: Control): Promise<CiPipelineEntity>;
}
export { CiPipelineEntity };
