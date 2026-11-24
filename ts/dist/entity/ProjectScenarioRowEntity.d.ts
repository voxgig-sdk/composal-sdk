import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectScenarioRow, ProjectScenarioRowListMatch } from '../ComposalTypes';
declare class ProjectScenarioRowEntity extends ComposalEntityBase<ProjectScenarioRow> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectScenarioRowEntity): ProjectScenarioRowEntity;
    list(this: any, reqmatch?: ProjectScenarioRowListMatch, ctrl?: Control): Promise<ProjectScenarioRowEntity[]>;
}
export { ProjectScenarioRowEntity };
