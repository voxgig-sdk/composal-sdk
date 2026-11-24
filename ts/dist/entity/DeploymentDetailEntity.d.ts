import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentDetail, DeploymentDetailListMatch } from '../ComposalTypes';
declare class DeploymentDetailEntity extends ComposalEntityBase<DeploymentDetail> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentDetailEntity): DeploymentDetailEntity;
    list(this: any, reqmatch?: DeploymentDetailListMatch, ctrl?: Control): Promise<DeploymentDetailEntity[]>;
}
export { DeploymentDetailEntity };
