import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpacePeerAttachment, SpacePeerAttachmentListMatch, SpacePeerAttachmentCreateData, SpacePeerAttachmentUpdateData, SpacePeerAttachmentPatchData, SpacePeerAttachmentRemoveMatch } from '../ComposalTypes';
declare class SpacePeerAttachmentEntity extends ComposalEntityBase<SpacePeerAttachment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpacePeerAttachmentEntity): SpacePeerAttachmentEntity;
    list(this: any, reqmatch?: SpacePeerAttachmentListMatch, ctrl?: Control): Promise<SpacePeerAttachmentEntity[]>;
    create(this: any, reqdata?: SpacePeerAttachmentCreateData, ctrl?: Control): Promise<SpacePeerAttachmentEntity>;
    update(this: any, reqdata?: SpacePeerAttachmentUpdateData, ctrl?: Control): Promise<SpacePeerAttachmentEntity>;
    patch(this: any, reqdata?: SpacePeerAttachmentPatchData, ctrl?: Control): Promise<SpacePeerAttachmentEntity>;
    remove(this: any, reqmatch?: SpacePeerAttachmentRemoveMatch, ctrl?: Control): Promise<SpacePeerAttachmentEntity>;
}
export { SpacePeerAttachmentEntity };
