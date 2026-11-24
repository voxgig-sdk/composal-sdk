import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Location, LocationListMatch } from '../ComposalTypes';
declare class LocationEntity extends ComposalEntityBase<Location> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LocationEntity): LocationEntity;
    list(this: any, reqmatch?: LocationListMatch, ctrl?: Control): Promise<LocationEntity[]>;
}
export { LocationEntity };
