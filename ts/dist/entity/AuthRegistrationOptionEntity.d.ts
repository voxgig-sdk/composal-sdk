import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthRegistrationOption, AuthRegistrationOptionLoadMatch } from '../ComposalTypes';
declare class AuthRegistrationOptionEntity extends ComposalEntityBase<AuthRegistrationOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthRegistrationOptionEntity): AuthRegistrationOptionEntity;
    load(this: any, reqmatch?: AuthRegistrationOptionLoadMatch, ctrl?: Control): Promise<AuthRegistrationOptionEntity>;
}
export { AuthRegistrationOptionEntity };
