import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StatusPatchset, StatusPatchsetLoadMatch } from '../ComposalTypes';
declare class StatusPatchsetEntity extends ComposalEntityBase<StatusPatchset> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StatusPatchsetEntity): StatusPatchsetEntity;
    load(this: any, reqmatch?: StatusPatchsetLoadMatch, ctrl?: Control): Promise<StatusPatchsetEntity>;
}
export { StatusPatchsetEntity };
