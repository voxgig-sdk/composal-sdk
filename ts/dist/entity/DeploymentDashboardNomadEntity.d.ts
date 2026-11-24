import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentDashboardNomad, DeploymentDashboardNomadLoadMatch } from '../ComposalTypes';
declare class DeploymentDashboardNomadEntity extends ComposalEntityBase<DeploymentDashboardNomad> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentDashboardNomadEntity): DeploymentDashboardNomadEntity;
    load(this: any, reqmatch?: DeploymentDashboardNomadLoadMatch, ctrl?: Control): Promise<DeploymentDashboardNomadEntity>;
}
export { DeploymentDashboardNomadEntity };
