import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectProductMapComparison, ProjectProductMapComparisonLoadMatch } from '../ComposalTypes';
declare class ProjectProductMapComparisonEntity extends ComposalEntityBase<ProjectProductMapComparison> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectProductMapComparisonEntity): ProjectProductMapComparisonEntity;
    load(this: any, reqmatch?: ProjectProductMapComparisonLoadMatch, ctrl?: Control): Promise<ProjectProductMapComparisonEntity>;
}
export { ProjectProductMapComparisonEntity };
