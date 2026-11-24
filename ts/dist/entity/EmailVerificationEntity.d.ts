import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EmailVerification, EmailVerificationCreateData } from '../ComposalTypes';
declare class EmailVerificationEntity extends ComposalEntityBase<EmailVerification> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EmailVerificationEntity): EmailVerificationEntity;
    create(this: any, reqdata?: EmailVerificationCreateData, ctrl?: Control): Promise<EmailVerificationEntity>;
}
export { EmailVerificationEntity };
