import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthCli, AuthCliCreateData } from '../ComposalTypes';
declare class AuthCliEntity extends ComposalEntityBase<AuthCli> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthCliEntity): AuthCliEntity;
    create(this: any, reqdata?: AuthCliCreateData, ctrl?: Control): Promise<AuthCliEntity>;
}
export { AuthCliEntity };
