import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDeploymentRollback, AppDeploymentRollbackCreateData } from '../ComposalTypes';
declare class AppDeploymentRollbackEntity extends ComposalEntityBase<AppDeploymentRollback> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDeploymentRollbackEntity): AppDeploymentRollbackEntity;
    create(this: any, reqdata?: AppDeploymentRollbackCreateData, ctrl?: Control): Promise<AppDeploymentRollbackEntity>;
}
export { AppDeploymentRollbackEntity };
