import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StatusChange, StatusChangeLoadMatch } from '../ComposalTypes';
declare class StatusChangeEntity extends ComposalEntityBase<StatusChange> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StatusChangeEntity): StatusChangeEntity;
    load(this: any, reqmatch?: StatusChangeLoadMatch, ctrl?: Control): Promise<StatusChangeEntity>;
}
export { StatusChangeEntity };
