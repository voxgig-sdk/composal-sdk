import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Now, NowLoadMatch } from '../ComposalTypes';
declare class NowEntity extends ComposalEntityBase<Now> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NowEntity): NowEntity;
    load(this: any, reqmatch?: NowLoadMatch, ctrl?: Control): Promise<NowEntity>;
}
export { NowEntity };
