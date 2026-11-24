import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentSecretBinding, EnvironmentSecretBindingListMatch, EnvironmentSecretBindingCreateData, EnvironmentSecretBindingRemoveMatch } from '../ComposalTypes';
declare class EnvironmentSecretBindingEntity extends ComposalEntityBase<EnvironmentSecretBinding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentSecretBindingEntity): EnvironmentSecretBindingEntity;
    list(this: any, reqmatch?: EnvironmentSecretBindingListMatch, ctrl?: Control): Promise<EnvironmentSecretBindingEntity[]>;
    create(this: any, reqdata?: EnvironmentSecretBindingCreateData, ctrl?: Control): Promise<EnvironmentSecretBindingEntity>;
    remove(this: any, reqmatch?: EnvironmentSecretBindingRemoveMatch, ctrl?: Control): Promise<EnvironmentSecretBindingEntity>;
}
export { EnvironmentSecretBindingEntity };
