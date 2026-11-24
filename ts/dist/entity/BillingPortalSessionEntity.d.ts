import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BillingPortalSession, BillingPortalSessionCreateData } from '../ComposalTypes';
declare class BillingPortalSessionEntity extends ComposalEntityBase<BillingPortalSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BillingPortalSessionEntity): BillingPortalSessionEntity;
    create(this: any, reqdata?: BillingPortalSessionCreateData, ctrl?: Control): Promise<BillingPortalSessionEntity>;
}
export { BillingPortalSessionEntity };
