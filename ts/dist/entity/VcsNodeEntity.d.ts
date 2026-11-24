import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcsNode, VcsNodeListMatch } from '../ComposalTypes';
declare class VcsNodeEntity extends ComposalEntityBase<VcsNode> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcsNodeEntity): VcsNodeEntity;
    list(this: any, reqmatch?: VcsNodeListMatch, ctrl?: Control): Promise<VcsNodeEntity[]>;
}
export { VcsNodeEntity };
