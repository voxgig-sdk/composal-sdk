import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ModelSubscriptionAccountConnection, ModelSubscriptionAccountConnectionLoadMatch, ModelSubscriptionAccountConnectionUpdateData } from '../ComposalTypes';
declare class ModelSubscriptionAccountConnectionEntity extends ComposalEntityBase<ModelSubscriptionAccountConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ModelSubscriptionAccountConnectionEntity): ModelSubscriptionAccountConnectionEntity;
    load(this: any, reqmatch?: ModelSubscriptionAccountConnectionLoadMatch, ctrl?: Control): Promise<ModelSubscriptionAccountConnectionEntity>;
    update(this: any, reqdata?: ModelSubscriptionAccountConnectionUpdateData, ctrl?: Control): Promise<ModelSubscriptionAccountConnectionEntity>;
}
export { ModelSubscriptionAccountConnectionEntity };
