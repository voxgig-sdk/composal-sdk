import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseCache, LeaseCacheCreateData } from '../ComposalTypes';
declare class LeaseCacheEntity extends ComposalEntityBase<LeaseCache> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseCacheEntity): LeaseCacheEntity;
    create(this: any, reqdata?: LeaseCacheCreateData, ctrl?: Control): Promise<LeaseCacheEntity>;
}
export { LeaseCacheEntity };
