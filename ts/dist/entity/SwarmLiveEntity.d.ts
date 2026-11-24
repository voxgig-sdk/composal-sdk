import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SwarmLive, SwarmLiveLoadMatch } from '../ComposalTypes';
declare class SwarmLiveEntity extends ComposalEntityBase<SwarmLive> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SwarmLiveEntity): SwarmLiveEntity;
    load(this: any, reqmatch?: SwarmLiveLoadMatch, ctrl?: Control): Promise<SwarmLiveEntity>;
}
export { SwarmLiveEntity };
