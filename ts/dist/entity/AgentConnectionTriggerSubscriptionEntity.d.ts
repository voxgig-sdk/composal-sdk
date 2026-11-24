import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentConnectionTriggerSubscription, AgentConnectionTriggerSubscriptionListMatch, AgentConnectionTriggerSubscriptionCreateData, AgentConnectionTriggerSubscriptionUpdateData, AgentConnectionTriggerSubscriptionPatchData, AgentConnectionTriggerSubscriptionRemoveMatch } from '../ComposalTypes';
declare class AgentConnectionTriggerSubscriptionEntity extends ComposalEntityBase<AgentConnectionTriggerSubscription> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentConnectionTriggerSubscriptionEntity): AgentConnectionTriggerSubscriptionEntity;
    list(this: any, reqmatch?: AgentConnectionTriggerSubscriptionListMatch, ctrl?: Control): Promise<AgentConnectionTriggerSubscriptionEntity[]>;
    create(this: any, reqdata?: AgentConnectionTriggerSubscriptionCreateData, ctrl?: Control): Promise<AgentConnectionTriggerSubscriptionEntity>;
    update(this: any, reqdata?: AgentConnectionTriggerSubscriptionUpdateData, ctrl?: Control): Promise<AgentConnectionTriggerSubscriptionEntity>;
    patch(this: any, reqdata?: AgentConnectionTriggerSubscriptionPatchData, ctrl?: Control): Promise<AgentConnectionTriggerSubscriptionEntity>;
    remove(this: any, reqmatch?: AgentConnectionTriggerSubscriptionRemoveMatch, ctrl?: Control): Promise<AgentConnectionTriggerSubscriptionEntity>;
}
export { AgentConnectionTriggerSubscriptionEntity };
