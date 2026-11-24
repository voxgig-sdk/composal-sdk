import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDeployment, AppDeploymentLoadMatch, AppDeploymentListMatch, AppDeploymentCreateData, AppDeploymentUpdateData, AppDeploymentPatchData, AppDeploymentRemoveMatch } from '../ComposalTypes';
declare class AppDeploymentEntity extends ComposalEntityBase<AppDeployment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDeploymentEntity): AppDeploymentEntity;
    load(this: any, reqmatch?: AppDeploymentLoadMatch, ctrl?: Control): Promise<AppDeploymentEntity>;
    list(this: any, reqmatch?: AppDeploymentListMatch, ctrl?: Control): Promise<AppDeploymentEntity[]>;
    create(this: any, reqdata?: AppDeploymentCreateData, ctrl?: Control): Promise<AppDeploymentEntity>;
    update(this: any, reqdata?: AppDeploymentUpdateData, ctrl?: Control): Promise<AppDeploymentEntity>;
    patch(this: any, reqdata?: AppDeploymentPatchData, ctrl?: Control): Promise<AppDeploymentEntity>;
    remove(this: any, reqmatch?: AppDeploymentRemoveMatch, ctrl?: Control): Promise<AppDeploymentEntity>;
}
export { AppDeploymentEntity };
