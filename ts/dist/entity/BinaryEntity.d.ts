import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Binary, BinaryLoadMatch, BinaryListMatch, BinaryCreateData } from '../ComposalTypes';
declare class BinaryEntity extends ComposalEntityBase<Binary> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BinaryEntity): BinaryEntity;
    load(this: any, reqmatch?: BinaryLoadMatch, ctrl?: Control): Promise<BinaryEntity>;
    list(this: any, reqmatch?: BinaryListMatch, ctrl?: Control): Promise<BinaryEntity[]>;
    create(this: any, reqdata?: BinaryCreateData, ctrl?: Control): Promise<BinaryEntity>;
}
export { BinaryEntity };
