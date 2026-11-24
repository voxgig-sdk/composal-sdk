import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Deployment, DeploymentLoadMatch } from '../ComposalTypes';
declare class DeploymentEntity extends ComposalEntityBase<Deployment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentEntity): DeploymentEntity;
    load(this: any, reqmatch?: DeploymentLoadMatch, ctrl?: Control): Promise<DeploymentEntity>;
}
export { DeploymentEntity };
