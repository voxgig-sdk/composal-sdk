import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppConfigVariable, AppConfigVariableLoadMatch, AppConfigVariableListMatch, AppConfigVariableCreateData, AppConfigVariableUpdateData, AppConfigVariablePatchData, AppConfigVariableRemoveMatch } from '../ComposalTypes';
declare class AppConfigVariableEntity extends ComposalEntityBase<AppConfigVariable> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppConfigVariableEntity): AppConfigVariableEntity;
    load(this: any, reqmatch?: AppConfigVariableLoadMatch, ctrl?: Control): Promise<AppConfigVariableEntity>;
    list(this: any, reqmatch?: AppConfigVariableListMatch, ctrl?: Control): Promise<AppConfigVariableEntity[]>;
    create(this: any, reqdata?: AppConfigVariableCreateData, ctrl?: Control): Promise<AppConfigVariableEntity>;
    update(this: any, reqdata?: AppConfigVariableUpdateData, ctrl?: Control): Promise<AppConfigVariableEntity>;
    patch(this: any, reqdata?: AppConfigVariablePatchData, ctrl?: Control): Promise<AppConfigVariableEntity>;
    remove(this: any, reqmatch?: AppConfigVariableRemoveMatch, ctrl?: Control): Promise<AppConfigVariableEntity>;
}
export { AppConfigVariableEntity };
