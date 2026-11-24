import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MergeResolution, MergeResolutionCreateData } from '../ComposalTypes';
declare class MergeResolutionEntity extends ComposalEntityBase<MergeResolution> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MergeResolutionEntity): MergeResolutionEntity;
    create(this: any, reqdata?: MergeResolutionCreateData, ctrl?: Control): Promise<MergeResolutionEntity>;
}
export { MergeResolutionEntity };
