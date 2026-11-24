import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Change, ChangeListMatch } from '../ComposalTypes';
declare class ChangeEntity extends ComposalEntityBase<Change> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeEntity): ChangeEntity;
    list(this: any, reqmatch?: ChangeListMatch, ctrl?: Control): Promise<ChangeEntity[]>;
}
export { ChangeEntity };
