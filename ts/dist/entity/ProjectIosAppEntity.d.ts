import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectIosApp, ProjectIosAppCreateData } from '../ComposalTypes';
declare class ProjectIosAppEntity extends ComposalEntityBase<ProjectIosApp> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectIosAppEntity): ProjectIosAppEntity;
    create(this: any, reqdata?: ProjectIosAppCreateData, ctrl?: Control): Promise<ProjectIosAppEntity>;
}
export { ProjectIosAppEntity };
