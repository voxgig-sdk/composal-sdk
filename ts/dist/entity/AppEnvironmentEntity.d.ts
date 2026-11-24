import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppEnvironment, AppEnvironmentLoadMatch, AppEnvironmentListMatch, AppEnvironmentCreateData, AppEnvironmentUpdateData, AppEnvironmentPatchData, AppEnvironmentRemoveMatch } from '../ComposalTypes';
declare class AppEnvironmentEntity extends ComposalEntityBase<AppEnvironment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppEnvironmentEntity): AppEnvironmentEntity;
    load(this: any, reqmatch?: AppEnvironmentLoadMatch, ctrl?: Control): Promise<AppEnvironmentEntity>;
    list(this: any, reqmatch?: AppEnvironmentListMatch, ctrl?: Control): Promise<AppEnvironmentEntity[]>;
    create(this: any, reqdata?: AppEnvironmentCreateData, ctrl?: Control): Promise<AppEnvironmentEntity>;
    update(this: any, reqdata?: AppEnvironmentUpdateData, ctrl?: Control): Promise<AppEnvironmentEntity>;
    patch(this: any, reqdata?: AppEnvironmentPatchData, ctrl?: Control): Promise<AppEnvironmentEntity>;
    remove(this: any, reqmatch?: AppEnvironmentRemoveMatch, ctrl?: Control): Promise<AppEnvironmentEntity>;
}
export { AppEnvironmentEntity };
