import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ContactSubmission, ContactSubmissionCreateData } from '../ComposalTypes';
declare class ContactSubmissionEntity extends ComposalEntityBase<ContactSubmission> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ContactSubmissionEntity): ContactSubmissionEntity;
    create(this: any, reqdata?: ContactSubmissionCreateData, ctrl?: Control): Promise<ContactSubmissionEntity>;
}
export { ContactSubmissionEntity };
