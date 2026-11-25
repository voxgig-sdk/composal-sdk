import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectPrTesting, ProjectPrTestingLoadMatch } from '../ComposalTypes';
declare class ProjectPrTestingEntity extends ComposalEntityBase<ProjectPrTesting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectPrTestingEntity): ProjectPrTestingEntity;
    load(this: any, reqmatch?: ProjectPrTestingLoadMatch, ctrl?: Control): Promise<ProjectPrTestingEntity>;
}
export { ProjectPrTestingEntity };
