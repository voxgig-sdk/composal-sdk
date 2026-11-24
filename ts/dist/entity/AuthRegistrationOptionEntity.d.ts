import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthRegistrationOption, AuthRegistrationOptionListMatch } from '../ComposalTypes';
declare class AuthRegistrationOptionEntity extends ComposalEntityBase<AuthRegistrationOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthRegistrationOptionEntity): AuthRegistrationOptionEntity;
    list(this: any, reqmatch?: AuthRegistrationOptionListMatch, ctrl?: Control): Promise<AuthRegistrationOptionEntity[]>;
}
export { AuthRegistrationOptionEntity };
