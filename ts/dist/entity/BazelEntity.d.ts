import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Bazel, BazelCreateData } from '../ComposalTypes';
declare class BazelEntity extends ComposalEntityBase<Bazel> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelEntity): BazelEntity;
    create(this: any, reqdata?: BazelCreateData, ctrl?: Control): Promise<BazelEntity>;
}
export { BazelEntity };
