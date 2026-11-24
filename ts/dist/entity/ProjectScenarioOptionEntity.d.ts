import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectScenarioOption, ProjectScenarioOptionListMatch } from '../ComposalTypes';
declare class ProjectScenarioOptionEntity extends ComposalEntityBase<ProjectScenarioOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectScenarioOptionEntity): ProjectScenarioOptionEntity;
    list(this: any, reqmatch?: ProjectScenarioOptionListMatch, ctrl?: Control): Promise<ProjectScenarioOptionEntity[]>;
}
export { ProjectScenarioOptionEntity };
