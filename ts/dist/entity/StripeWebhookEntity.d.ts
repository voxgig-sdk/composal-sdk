import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StripeWebhook, StripeWebhookCreateData } from '../ComposalTypes';
declare class StripeWebhookEntity extends ComposalEntityBase<StripeWebhook> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StripeWebhookEntity): StripeWebhookEntity;
    create(this: any, reqdata?: StripeWebhookCreateData, ctrl?: Control): Promise<StripeWebhookEntity>;
}
export { StripeWebhookEntity };
