import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullZone, PullZoneListMatch } from '../ComposalTypes';
declare class PullZoneEntity extends ComposalEntityBase<PullZone> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullZoneEntity): PullZoneEntity;
    list(this: any, reqmatch?: PullZoneListMatch, ctrl?: Control): Promise<PullZoneEntity[]>;
}
export { PullZoneEntity };
