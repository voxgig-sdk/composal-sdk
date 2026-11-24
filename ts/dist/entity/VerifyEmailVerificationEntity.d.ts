import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyEmailVerification, VerifyEmailVerificationListMatch } from '../ComposalTypes';
declare class VerifyEmailVerificationEntity extends ComposalEntityBase<VerifyEmailVerification> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyEmailVerificationEntity): VerifyEmailVerificationEntity;
    list(this: any, reqmatch?: VerifyEmailVerificationListMatch, ctrl?: Control): Promise<VerifyEmailVerificationEntity[]>;
}
export { VerifyEmailVerificationEntity };
