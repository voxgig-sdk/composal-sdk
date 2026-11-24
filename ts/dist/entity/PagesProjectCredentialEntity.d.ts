import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesProjectCredential, PagesProjectCredentialListMatch } from '../ComposalTypes';
declare class PagesProjectCredentialEntity extends ComposalEntityBase<PagesProjectCredential> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesProjectCredentialEntity): PagesProjectCredentialEntity;
    list(this: any, reqmatch?: PagesProjectCredentialListMatch, ctrl?: Control): Promise<PagesProjectCredentialEntity[]>;
}
export { PagesProjectCredentialEntity };
