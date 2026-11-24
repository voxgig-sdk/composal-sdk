import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SwarmEvent, SwarmEventListMatch } from '../ComposalTypes';
declare class SwarmEventEntity extends ComposalEntityBase<SwarmEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SwarmEventEntity): SwarmEventEntity;
    list(this: any, reqmatch?: SwarmEventListMatch, ctrl?: Control): Promise<SwarmEventEntity[]>;
}
export { SwarmEventEntity };
