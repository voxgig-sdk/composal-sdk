import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MessagingConversationUpload, MessagingConversationUploadCreateData } from '../ComposalTypes';
declare class MessagingConversationUploadEntity extends ComposalEntityBase<MessagingConversationUpload> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MessagingConversationUploadEntity): MessagingConversationUploadEntity;
    create(this: any, reqdata?: MessagingConversationUploadCreateData, ctrl?: Control): Promise<MessagingConversationUploadEntity>;
}
export { MessagingConversationUploadEntity };
