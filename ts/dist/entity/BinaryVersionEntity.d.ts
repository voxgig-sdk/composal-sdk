import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BinaryVersion, BinaryVersionLoadMatch, BinaryVersionListMatch, BinaryVersionCreateData, BinaryVersionRemoveMatch } from '../ComposalTypes';
declare class BinaryVersionEntity extends ComposalEntityBase<BinaryVersion> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BinaryVersionEntity): BinaryVersionEntity;
    load(this: any, reqmatch?: BinaryVersionLoadMatch, ctrl?: Control): Promise<BinaryVersionEntity>;
    list(this: any, reqmatch?: BinaryVersionListMatch, ctrl?: Control): Promise<BinaryVersionEntity[]>;
    create(this: any, reqdata?: BinaryVersionCreateData, ctrl?: Control): Promise<BinaryVersionEntity>;
    remove(this: any, reqmatch?: BinaryVersionRemoveMatch, ctrl?: Control): Promise<BinaryVersionEntity>;
}
export { BinaryVersionEntity };
