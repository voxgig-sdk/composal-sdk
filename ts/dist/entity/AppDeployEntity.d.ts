import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDeploy, AppDeployCreateData } from '../ComposalTypes';
declare class AppDeployEntity extends ComposalEntityBase<AppDeploy> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDeployEntity): AppDeployEntity;
    create(this: any, reqdata?: AppDeployCreateData, ctrl?: Control): Promise<AppDeployEntity>;
}
export { AppDeployEntity };
