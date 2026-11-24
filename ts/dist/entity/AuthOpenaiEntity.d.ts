import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthOpenai, AuthOpenaiLoadMatch } from '../ComposalTypes';
declare class AuthOpenaiEntity extends ComposalEntityBase<AuthOpenai> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthOpenaiEntity): AuthOpenaiEntity;
    load(this: any, reqmatch?: AuthOpenaiLoadMatch, ctrl?: Control): Promise<AuthOpenaiEntity>;
}
export { AuthOpenaiEntity };
