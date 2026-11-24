import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentDetail, DeploymentDetailLoadMatch } from '../ComposalTypes';
declare class DeploymentDetailEntity extends ComposalEntityBase<DeploymentDetail> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentDetailEntity): DeploymentDetailEntity;
    load(this: any, reqmatch?: DeploymentDetailLoadMatch, ctrl?: Control): Promise<DeploymentDetailEntity>;
}
export { DeploymentDetailEntity };
