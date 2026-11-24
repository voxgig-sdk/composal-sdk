import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthPasswordReset, AuthPasswordResetCreateData, AuthPasswordResetUpdateData } from '../ComposalTypes';
declare class AuthPasswordResetEntity extends ComposalEntityBase<AuthPasswordReset> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthPasswordResetEntity): AuthPasswordResetEntity;
    create(this: any, reqdata?: AuthPasswordResetCreateData, ctrl?: Control): Promise<AuthPasswordResetEntity>;
    update(this: any, reqdata?: AuthPasswordResetUpdateData, ctrl?: Control): Promise<AuthPasswordResetEntity>;
}
export { AuthPasswordResetEntity };
