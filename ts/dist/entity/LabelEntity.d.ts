import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Label, LabelListMatch } from '../ComposalTypes';
declare class LabelEntity extends ComposalEntityBase<Label> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LabelEntity): LabelEntity;
    list(this: any, reqmatch?: LabelListMatch, ctrl?: Control): Promise<LabelEntity[]>;
}
export { LabelEntity };
