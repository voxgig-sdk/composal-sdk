import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CredentialSignInCheck, CredentialSignInCheckCreateData } from '../ComposalTypes';
declare class CredentialSignInCheckEntity extends ComposalEntityBase<CredentialSignInCheck> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CredentialSignInCheckEntity): CredentialSignInCheckEntity;
    create(this: any, reqdata?: CredentialSignInCheckCreateData, ctrl?: Control): Promise<CredentialSignInCheckEntity>;
}
export { CredentialSignInCheckEntity };
