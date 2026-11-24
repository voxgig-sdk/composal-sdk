import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SignalSubscription, SignalSubscriptionLoadMatch, SignalSubscriptionCreateData, SignalSubscriptionUpdateData, SignalSubscriptionPatchData, SignalSubscriptionRemoveMatch } from '../ComposalTypes';
declare class SignalSubscriptionEntity extends ComposalEntityBase<SignalSubscription> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalSubscriptionEntity): SignalSubscriptionEntity;
    load(this: any, reqmatch?: SignalSubscriptionLoadMatch, ctrl?: Control): Promise<SignalSubscriptionEntity>;
    create(this: any, reqdata?: SignalSubscriptionCreateData, ctrl?: Control): Promise<SignalSubscriptionEntity>;
    update(this: any, reqdata?: SignalSubscriptionUpdateData, ctrl?: Control): Promise<SignalSubscriptionEntity>;
    patch(this: any, reqdata?: SignalSubscriptionPatchData, ctrl?: Control): Promise<SignalSubscriptionEntity>;
    remove(this: any, reqmatch?: SignalSubscriptionRemoveMatch, ctrl?: Control): Promise<SignalSubscriptionEntity>;
}
export { SignalSubscriptionEntity };
