import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentFile, DeploymentFileUpdateData } from '../ComposalTypes';
declare class DeploymentFileEntity extends ComposalEntityBase<DeploymentFile> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentFileEntity): DeploymentFileEntity;
    update(this: any, reqdata?: DeploymentFileUpdateData, ctrl?: Control): Promise<DeploymentFileEntity>;
}
export { DeploymentFileEntity };
