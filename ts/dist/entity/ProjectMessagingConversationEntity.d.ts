import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectMessagingConversation, ProjectMessagingConversationLoadMatch, ProjectMessagingConversationCreateData, ProjectMessagingConversationUpdateData, ProjectMessagingConversationPatchData } from '../ComposalTypes';
declare class ProjectMessagingConversationEntity extends ComposalEntityBase<ProjectMessagingConversation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectMessagingConversationEntity): ProjectMessagingConversationEntity;
    load(this: any, reqmatch?: ProjectMessagingConversationLoadMatch, ctrl?: Control): Promise<ProjectMessagingConversationEntity>;
    create(this: any, reqdata?: ProjectMessagingConversationCreateData, ctrl?: Control): Promise<ProjectMessagingConversationEntity>;
    update(this: any, reqdata?: ProjectMessagingConversationUpdateData, ctrl?: Control): Promise<ProjectMessagingConversationEntity>;
    patch(this: any, reqdata?: ProjectMessagingConversationPatchData, ctrl?: Control): Promise<ProjectMessagingConversationEntity>;
}
export { ProjectMessagingConversationEntity };
