import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentTestAccount, EnvironmentTestAccountListMatch, EnvironmentTestAccountUpdateData, EnvironmentTestAccountPatchData } from '../ComposalTypes';
declare class EnvironmentTestAccountEntity extends ComposalEntityBase<EnvironmentTestAccount> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentTestAccountEntity): EnvironmentTestAccountEntity;
    list(this: any, reqmatch?: EnvironmentTestAccountListMatch, ctrl?: Control): Promise<EnvironmentTestAccountEntity[]>;
    update(this: any, reqdata?: EnvironmentTestAccountUpdateData, ctrl?: Control): Promise<EnvironmentTestAccountEntity>;
    patch(this: any, reqdata?: EnvironmentTestAccountPatchData, ctrl?: Control): Promise<EnvironmentTestAccountEntity>;
}
export { EnvironmentTestAccountEntity };
