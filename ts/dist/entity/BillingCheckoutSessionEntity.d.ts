import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingCheckoutSession, BillingCheckoutSessionCreateData } from '../ComposalTypes';
declare class BillingCheckoutSessionEntity extends ComposalEntityBase<BillingCheckoutSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingCheckoutSessionEntity): BillingCheckoutSessionEntity;
    create(this: any, reqdata?: BillingCheckoutSessionCreateData, ctrl?: Control): Promise<BillingCheckoutSessionEntity>;
}
export { BillingCheckoutSessionEntity };
