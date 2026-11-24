import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VersionLog, VersionLogListMatch } from '../ComposalTypes';
declare class VersionLogEntity extends ComposalEntityBase<VersionLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VersionLogEntity): VersionLogEntity;
    list(this: any, reqmatch?: VersionLogListMatch, ctrl?: Control): Promise<VersionLogEntity[]>;
}
export { VersionLogEntity };
