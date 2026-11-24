import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StatusCommit, StatusCommitLoadMatch } from '../ComposalTypes';
declare class StatusCommitEntity extends ComposalEntityBase<StatusCommit> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StatusCommitEntity): StatusCommitEntity;
    load(this: any, reqmatch?: StatusCommitLoadMatch, ctrl?: Control): Promise<StatusCommitEntity>;
}
export { StatusCommitEntity };
