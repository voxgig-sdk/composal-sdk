import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MessagingConversationMessage, MessagingConversationMessageCreateData } from '../ComposalTypes';
declare class MessagingConversationMessageEntity extends ComposalEntityBase<MessagingConversationMessage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MessagingConversationMessageEntity): MessagingConversationMessageEntity;
    create(this: any, reqdata?: MessagingConversationMessageCreateData, ctrl?: Control): Promise<MessagingConversationMessageEntity>;
}
export { MessagingConversationMessageEntity };
