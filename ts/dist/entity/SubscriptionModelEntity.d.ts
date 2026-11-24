import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SubscriptionModel, SubscriptionModelListMatch } from '../ComposalTypes';
declare class SubscriptionModelEntity extends ComposalEntityBase<SubscriptionModel> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SubscriptionModelEntity): SubscriptionModelEntity;
    list(this: any, reqmatch?: SubscriptionModelListMatch, ctrl?: Control): Promise<SubscriptionModelEntity[]>;
}
export { SubscriptionModelEntity };
