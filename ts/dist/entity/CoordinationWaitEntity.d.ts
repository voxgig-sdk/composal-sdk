import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CoordinationWait, CoordinationWaitListMatch } from '../ComposalTypes';
declare class CoordinationWaitEntity extends ComposalEntityBase<CoordinationWait> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CoordinationWaitEntity): CoordinationWaitEntity;
    list(this: any, reqmatch?: CoordinationWaitListMatch, ctrl?: Control): Promise<CoordinationWaitEntity[]>;
}
export { CoordinationWaitEntity };
