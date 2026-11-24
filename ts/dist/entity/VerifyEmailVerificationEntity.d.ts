import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyEmailVerification, VerifyEmailVerificationLoadMatch } from '../ComposalTypes';
declare class VerifyEmailVerificationEntity extends ComposalEntityBase<VerifyEmailVerification> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyEmailVerificationEntity): VerifyEmailVerificationEntity;
    load(this: any, reqmatch?: VerifyEmailVerificationLoadMatch, ctrl?: Control): Promise<VerifyEmailVerificationEntity>;
}
export { VerifyEmailVerificationEntity };
