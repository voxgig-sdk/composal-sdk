import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppAccessJwk, AppAccessJwkLoadMatch } from '../ComposalTypes';
declare class AppAccessJwkEntity extends ComposalEntityBase<AppAccessJwk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppAccessJwkEntity): AppAccessJwkEntity;
    load(this: any, reqmatch?: AppAccessJwkLoadMatch, ctrl?: Control): Promise<AppAccessJwkEntity>;
}
export { AppAccessJwkEntity };
