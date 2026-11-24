import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDeploymentOperation, AppDeploymentOperationLoadMatch, AppDeploymentOperationListMatch, AppDeploymentOperationCreateData } from '../ComposalTypes';
declare class AppDeploymentOperationEntity extends ComposalEntityBase<AppDeploymentOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDeploymentOperationEntity): AppDeploymentOperationEntity;
    load(this: any, reqmatch?: AppDeploymentOperationLoadMatch, ctrl?: Control): Promise<AppDeploymentOperationEntity>;
    list(this: any, reqmatch?: AppDeploymentOperationListMatch, ctrl?: Control): Promise<AppDeploymentOperationEntity[]>;
    create(this: any, reqdata?: AppDeploymentOperationCreateData, ctrl?: Control): Promise<AppDeploymentOperationEntity>;
}
export { AppDeploymentOperationEntity };
