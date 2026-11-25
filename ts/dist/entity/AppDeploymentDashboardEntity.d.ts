import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AppDeploymentDashboard, AppDeploymentDashboardLoadMatch } from '../ComposalTypes';
declare class AppDeploymentDashboardEntity extends ComposalEntityBase<AppDeploymentDashboard> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AppDeploymentDashboardEntity): AppDeploymentDashboardEntity;
    load(this: any, reqmatch?: AppDeploymentDashboardLoadMatch, ctrl?: Control): Promise<AppDeploymentDashboardEntity>;
}
export { AppDeploymentDashboardEntity };
