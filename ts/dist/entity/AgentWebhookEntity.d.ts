import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWebhook, AgentWebhookLoadMatch, AgentWebhookCreateData, AgentWebhookUpdateData } from '../ComposalTypes';
declare class AgentWebhookEntity extends ComposalEntityBase<AgentWebhook> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWebhookEntity): AgentWebhookEntity;
    load(this: any, reqmatch?: AgentWebhookLoadMatch, ctrl?: Control): Promise<AgentWebhookEntity>;
    create(this: any, reqdata?: AgentWebhookCreateData, ctrl?: Control): Promise<AgentWebhookEntity>;
    update(this: any, reqdata?: AgentWebhookUpdateData, ctrl?: Control): Promise<AgentWebhookEntity>;
}
export { AgentWebhookEntity };
