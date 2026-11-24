import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AttachmentPart, AttachmentPartUpdateData } from '../ComposalTypes';
declare class AttachmentPartEntity extends ComposalEntityBase<AttachmentPart> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AttachmentPartEntity): AttachmentPartEntity;
    update(this: any, reqdata?: AttachmentPartUpdateData, ctrl?: Control): Promise<AttachmentPartEntity>;
}
export { AttachmentPartEntity };
