import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BazelActionResult, BazelActionResultLoadMatch, BazelActionResultUpdateData } from '../ComposalTypes';
declare class BazelActionResultEntity extends ComposalEntityBase<BazelActionResult> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BazelActionResultEntity): BazelActionResultEntity;
    load(this: any, reqmatch?: BazelActionResultLoadMatch, ctrl?: Control): Promise<BazelActionResultEntity>;
    update(this: any, reqdata?: BazelActionResultUpdateData, ctrl?: Control): Promise<BazelActionResultEntity>;
}
export { BazelActionResultEntity };
