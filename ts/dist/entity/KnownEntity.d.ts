import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Known, KnownLoadMatch } from '../ComposalTypes';
declare class KnownEntity extends ComposalEntityBase<Known> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: KnownEntity): KnownEntity;
    load(this: any, reqmatch?: KnownLoadMatch, ctrl?: Control): Promise<KnownEntity>;
}
export { KnownEntity };
