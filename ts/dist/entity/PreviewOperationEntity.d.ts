import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PreviewOperation, PreviewOperationListMatch } from '../ComposalTypes';
declare class PreviewOperationEntity extends ComposalEntityBase<PreviewOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PreviewOperationEntity): PreviewOperationEntity;
    list(this: any, reqmatch?: PreviewOperationListMatch, ctrl?: Control): Promise<PreviewOperationEntity[]>;
}
export { PreviewOperationEntity };
