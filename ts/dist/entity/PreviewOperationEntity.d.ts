import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PreviewOperation, PreviewOperationLoadMatch } from '../ComposalTypes';
declare class PreviewOperationEntity extends ComposalEntityBase<PreviewOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PreviewOperationEntity): PreviewOperationEntity;
    load(this: any, reqmatch?: PreviewOperationLoadMatch, ctrl?: Control): Promise<PreviewOperationEntity>;
}
export { PreviewOperationEntity };
