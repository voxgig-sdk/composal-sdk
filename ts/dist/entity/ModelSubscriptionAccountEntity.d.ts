import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ModelSubscriptionAccount, ModelSubscriptionAccountListMatch, ModelSubscriptionAccountCreateData, ModelSubscriptionAccountUpdateData, ModelSubscriptionAccountPatchData, ModelSubscriptionAccountRemoveMatch } from '../ComposalTypes';
declare class ModelSubscriptionAccountEntity extends ComposalEntityBase<ModelSubscriptionAccount> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ModelSubscriptionAccountEntity): ModelSubscriptionAccountEntity;
    list(this: any, reqmatch?: ModelSubscriptionAccountListMatch, ctrl?: Control): Promise<ModelSubscriptionAccountEntity[]>;
    create(this: any, reqdata?: ModelSubscriptionAccountCreateData, ctrl?: Control): Promise<ModelSubscriptionAccountEntity>;
    update(this: any, reqdata?: ModelSubscriptionAccountUpdateData, ctrl?: Control): Promise<ModelSubscriptionAccountEntity>;
    patch(this: any, reqdata?: ModelSubscriptionAccountPatchData, ctrl?: Control): Promise<ModelSubscriptionAccountEntity>;
    remove(this: any, reqmatch?: ModelSubscriptionAccountRemoveMatch, ctrl?: Control): Promise<ModelSubscriptionAccountEntity>;
}
export { ModelSubscriptionAccountEntity };
