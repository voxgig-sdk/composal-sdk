import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcFile, VcFileListMatch } from '../ComposalTypes';
declare class VcFileEntity extends ComposalEntityBase<VcFile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcFileEntity): VcFileEntity;
    list(this: any, reqmatch?: VcFileListMatch, ctrl?: Control): Promise<VcFileEntity[]>;
}
export { VcFileEntity };
