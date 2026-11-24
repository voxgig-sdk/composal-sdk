import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectFinding, ProjectFindingListMatch } from '../ComposalTypes';
declare class ProjectFindingEntity extends ComposalEntityBase<ProjectFinding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectFindingEntity): ProjectFindingEntity;
    list(this: any, reqmatch?: ProjectFindingListMatch, ctrl?: Control): Promise<ProjectFindingEntity[]>;
}
export { ProjectFindingEntity };
