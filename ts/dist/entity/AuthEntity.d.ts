import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Auth, AuthLoadMatch, AuthCreateData, AuthRemoveMatch } from '../ComposalTypes';
declare class AuthEntity extends ComposalEntityBase<Auth> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthEntity): AuthEntity;
    load(this: any, reqmatch?: AuthLoadMatch, ctrl?: Control): Promise<AuthEntity>;
    create(this: any, reqdata?: AuthCreateData, ctrl?: Control): Promise<AuthEntity>;
    remove(this: any, reqmatch?: AuthRemoveMatch, ctrl?: Control): Promise<AuthEntity>;
}
export { AuthEntity };
