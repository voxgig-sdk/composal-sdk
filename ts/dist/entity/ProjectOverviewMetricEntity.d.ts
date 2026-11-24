import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectOverviewMetric, ProjectOverviewMetricLoadMatch } from '../ComposalTypes';
declare class ProjectOverviewMetricEntity extends ComposalEntityBase<ProjectOverviewMetric> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectOverviewMetricEntity): ProjectOverviewMetricEntity;
    load(this: any, reqmatch?: ProjectOverviewMetricLoadMatch, ctrl?: Control): Promise<ProjectOverviewMetricEntity>;
}
export { ProjectOverviewMetricEntity };
