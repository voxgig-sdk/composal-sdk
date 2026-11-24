import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSubscription, AgentSubscriptionLoadMatch, AgentSubscriptionCreateData } from '../ComposalTypes';
declare class AgentSubscriptionEntity extends ComposalEntityBase<AgentSubscription> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSubscriptionEntity): AgentSubscriptionEntity;
    load(this: any, reqmatch?: AgentSubscriptionLoadMatch, ctrl?: Control): Promise<AgentSubscriptionEntity>;
    create(this: any, reqdata?: AgentSubscriptionCreateData, ctrl?: Control): Promise<AgentSubscriptionEntity>;
}
export { AgentSubscriptionEntity };
