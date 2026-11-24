import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MetronomeWebhook, MetronomeWebhookCreateData } from '../ComposalTypes';
declare class MetronomeWebhookEntity extends ComposalEntityBase<MetronomeWebhook> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MetronomeWebhookEntity): MetronomeWebhookEntity;
    create(this: any, reqdata?: MetronomeWebhookCreateData, ctrl?: Control): Promise<MetronomeWebhookEntity>;
}
export { MetronomeWebhookEntity };
