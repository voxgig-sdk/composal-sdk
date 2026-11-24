import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OrganizationSubscription, OrganizationSubscriptionCreateData } from '../ComposalTypes';
declare class OrganizationSubscriptionEntity extends ComposalEntityBase<OrganizationSubscription> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OrganizationSubscriptionEntity): OrganizationSubscriptionEntity;
    create(this: any, reqdata?: OrganizationSubscriptionCreateData, ctrl?: Control): Promise<OrganizationSubscriptionEntity>;
}
export { OrganizationSubscriptionEntity };
