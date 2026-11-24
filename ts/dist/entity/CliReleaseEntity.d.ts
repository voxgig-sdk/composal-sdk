import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CliRelease, CliReleaseLoadMatch, CliReleaseCreateData } from '../ComposalTypes';
declare class CliReleaseEntity extends ComposalEntityBase<CliRelease> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CliReleaseEntity): CliReleaseEntity;
    load(this: any, reqmatch?: CliReleaseLoadMatch, ctrl?: Control): Promise<CliReleaseEntity>;
    create(this: any, reqdata?: CliReleaseCreateData, ctrl?: Control): Promise<CliReleaseEntity>;
}
export { CliReleaseEntity };
