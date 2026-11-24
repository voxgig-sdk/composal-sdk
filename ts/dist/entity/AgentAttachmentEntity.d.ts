import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentAttachment, AgentAttachmentCreateData } from '../ComposalTypes';
declare class AgentAttachmentEntity extends ComposalEntityBase<AgentAttachment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentAttachmentEntity): AgentAttachmentEntity;
    create(this: any, reqdata?: AgentAttachmentCreateData, ctrl?: Control): Promise<AgentAttachmentEntity>;
}
export { AgentAttachmentEntity };
