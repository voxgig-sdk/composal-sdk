import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerificationProjectCredential, VerificationProjectCredentialLoadMatch, VerificationProjectCredentialListMatch, VerificationProjectCredentialCreateData, VerificationProjectCredentialUpdateData, VerificationProjectCredentialPatchData, VerificationProjectCredentialRemoveMatch } from '../ComposalTypes';
declare class VerificationProjectCredentialEntity extends ComposalEntityBase<VerificationProjectCredential> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerificationProjectCredentialEntity): VerificationProjectCredentialEntity;
    load(this: any, reqmatch?: VerificationProjectCredentialLoadMatch, ctrl?: Control): Promise<VerificationProjectCredentialEntity>;
    list(this: any, reqmatch?: VerificationProjectCredentialListMatch, ctrl?: Control): Promise<VerificationProjectCredentialEntity[]>;
    create(this: any, reqdata?: VerificationProjectCredentialCreateData, ctrl?: Control): Promise<VerificationProjectCredentialEntity>;
    update(this: any, reqdata?: VerificationProjectCredentialUpdateData, ctrl?: Control): Promise<VerificationProjectCredentialEntity>;
    patch(this: any, reqdata?: VerificationProjectCredentialPatchData, ctrl?: Control): Promise<VerificationProjectCredentialEntity>;
    remove(this: any, reqmatch?: VerificationProjectCredentialRemoveMatch, ctrl?: Control): Promise<VerificationProjectCredentialEntity>;
}
export { VerificationProjectCredentialEntity };
