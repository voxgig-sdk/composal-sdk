import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentLog, DeploymentLogListMatch } from '../ComposalTypes';
declare class DeploymentLogEntity extends ComposalEntityBase<DeploymentLog> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentLogEntity): DeploymentLogEntity;
    list(this: any, reqmatch?: DeploymentLogListMatch, ctrl?: Control): Promise<DeploymentLogEntity[]>;
}
export { DeploymentLogEntity };
