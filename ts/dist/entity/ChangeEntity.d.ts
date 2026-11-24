import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Change, ChangeLoadMatch } from '../ComposalTypes';
declare class ChangeEntity extends ComposalEntityBase<Change> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeEntity): ChangeEntity;
    load(this: any, reqmatch?: ChangeLoadMatch, ctrl?: Control): Promise<ChangeEntity>;
}
export { ChangeEntity };
