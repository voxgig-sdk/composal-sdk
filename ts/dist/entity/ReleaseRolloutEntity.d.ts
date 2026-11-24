import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ReleaseRollout, ReleaseRolloutLoadMatch, ReleaseRolloutCreateData } from '../ComposalTypes';
declare class ReleaseRolloutEntity extends ComposalEntityBase<ReleaseRollout> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ReleaseRolloutEntity): ReleaseRolloutEntity;
    load(this: any, reqmatch?: ReleaseRolloutLoadMatch, ctrl?: Control): Promise<ReleaseRolloutEntity>;
    create(this: any, reqdata?: ReleaseRolloutCreateData, ctrl?: Control): Promise<ReleaseRolloutEntity>;
}
export { ReleaseRolloutEntity };
