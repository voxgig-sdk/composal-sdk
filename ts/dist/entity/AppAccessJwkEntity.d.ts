import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppAccessJwk, AppAccessJwkListMatch } from '../ComposalTypes';
declare class AppAccessJwkEntity extends ComposalEntityBase<AppAccessJwk> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppAccessJwkEntity): AppAccessJwkEntity;
    list(this: any, reqmatch?: AppAccessJwkListMatch, ctrl?: Control): Promise<AppAccessJwkEntity[]>;
}
export { AppAccessJwkEntity };
