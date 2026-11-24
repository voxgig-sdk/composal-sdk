import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Gh, GhLoadMatch } from '../ComposalTypes';
declare class GhEntity extends ComposalEntityBase<Gh> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GhEntity): GhEntity;
    load(this: any, reqmatch?: GhLoadMatch, ctrl?: Control): Promise<GhEntity>;
}
export { GhEntity };
