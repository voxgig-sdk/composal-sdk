import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WebhookGitlab, WebhookGitlabUpdateData } from '../ComposalTypes';
declare class WebhookGitlabEntity extends ComposalEntityBase<WebhookGitlab> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WebhookGitlabEntity): WebhookGitlabEntity;
    update(this: any, reqdata?: WebhookGitlabUpdateData, ctrl?: Control): Promise<WebhookGitlabEntity>;
}
export { WebhookGitlabEntity };
