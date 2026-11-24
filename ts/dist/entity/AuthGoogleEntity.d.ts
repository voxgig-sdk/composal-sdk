import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthGoogle, AuthGoogleLoadMatch } from '../ComposalTypes';
declare class AuthGoogleEntity extends ComposalEntityBase<AuthGoogle> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthGoogleEntity): AuthGoogleEntity;
    load(this: any, reqmatch?: AuthGoogleLoadMatch, ctrl?: Control): Promise<AuthGoogleEntity>;
}
export { AuthGoogleEntity };
