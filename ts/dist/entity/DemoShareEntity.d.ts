import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DemoShare, DemoShareLoadMatch } from '../ComposalTypes';
declare class DemoShareEntity extends ComposalEntityBase<DemoShare> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DemoShareEntity): DemoShareEntity;
    load(this: any, reqmatch?: DemoShareLoadMatch, ctrl?: Control): Promise<DemoShareEntity>;
}
export { DemoShareEntity };
