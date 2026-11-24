import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceLogStream, SpaceLogStreamLoadMatch, SpaceLogStreamCreateData } from '../ComposalTypes';
declare class SpaceLogStreamEntity extends ComposalEntityBase<SpaceLogStream> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceLogStreamEntity): SpaceLogStreamEntity;
    load(this: any, reqmatch?: SpaceLogStreamLoadMatch, ctrl?: Control): Promise<SpaceLogStreamEntity>;
    create(this: any, reqdata?: SpaceLogStreamCreateData, ctrl?: Control): Promise<SpaceLogStreamEntity>;
}
export { SpaceLogStreamEntity };
