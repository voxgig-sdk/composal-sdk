import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PatchsetDiff, PatchsetDiffLoadMatch } from '../ComposalTypes';
declare class PatchsetDiffEntity extends ComposalEntityBase<PatchsetDiff> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PatchsetDiffEntity): PatchsetDiffEntity;
    load(this: any, reqmatch?: PatchsetDiffLoadMatch, ctrl?: Control): Promise<PatchsetDiffEntity>;
}
export { PatchsetDiffEntity };
