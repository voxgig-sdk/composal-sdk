import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectOverviewMetric, ProjectOverviewMetricListMatch } from '../ComposalTypes';
declare class ProjectOverviewMetricEntity extends ComposalEntityBase<ProjectOverviewMetric> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectOverviewMetricEntity): ProjectOverviewMetricEntity;
    list(this: any, reqmatch?: ProjectOverviewMetricListMatch, ctrl?: Control): Promise<ProjectOverviewMetricEntity[]>;
}
export { ProjectOverviewMetricEntity };
