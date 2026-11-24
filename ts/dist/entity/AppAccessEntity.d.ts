import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppAccess, AppAccessLoadMatch } from '../ComposalTypes';
declare class AppAccessEntity extends ComposalEntityBase<AppAccess> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppAccessEntity): AppAccessEntity;
    load(this: any, reqmatch?: AppAccessLoadMatch, ctrl?: Control): Promise<AppAccessEntity>;
}
export { AppAccessEntity };
