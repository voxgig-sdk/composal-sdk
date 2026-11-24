import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentMetric, DeploymentMetricListMatch } from '../ComposalTypes';
declare class DeploymentMetricEntity extends ComposalEntityBase<DeploymentMetric> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentMetricEntity): DeploymentMetricEntity;
    list(this: any, reqmatch?: DeploymentMetricListMatch, ctrl?: Control): Promise<DeploymentMetricEntity[]>;
}
export { DeploymentMetricEntity };
