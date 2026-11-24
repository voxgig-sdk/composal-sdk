import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectScenarioOption, ProjectScenarioOptionLoadMatch } from '../ComposalTypes';
declare class ProjectScenarioOptionEntity extends ComposalEntityBase<ProjectScenarioOption> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectScenarioOptionEntity): ProjectScenarioOptionEntity;
    load(this: any, reqmatch?: ProjectScenarioOptionLoadMatch, ctrl?: Control): Promise<ProjectScenarioOptionEntity>;
}
export { ProjectScenarioOptionEntity };
