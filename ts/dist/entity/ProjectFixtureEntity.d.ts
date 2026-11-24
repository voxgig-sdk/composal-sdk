import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ProjectFixture, ProjectFixtureLoadMatch, ProjectFixtureListMatch, ProjectFixtureCreateData, ProjectFixtureUpdateData, ProjectFixturePatchData, ProjectFixtureRemoveMatch } from '../ComposalTypes';
declare class ProjectFixtureEntity extends ComposalEntityBase<ProjectFixture> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ProjectFixtureEntity): ProjectFixtureEntity;
    load(this: any, reqmatch?: ProjectFixtureLoadMatch, ctrl?: Control): Promise<ProjectFixtureEntity>;
    list(this: any, reqmatch?: ProjectFixtureListMatch, ctrl?: Control): Promise<ProjectFixtureEntity[]>;
    create(this: any, reqdata?: ProjectFixtureCreateData, ctrl?: Control): Promise<ProjectFixtureEntity>;
    update(this: any, reqdata?: ProjectFixtureUpdateData, ctrl?: Control): Promise<ProjectFixtureEntity>;
    patch(this: any, reqdata?: ProjectFixturePatchData, ctrl?: Control): Promise<ProjectFixtureEntity>;
    remove(this: any, reqmatch?: ProjectFixtureRemoveMatch, ctrl?: Control): Promise<ProjectFixtureEntity>;
}
export { ProjectFixtureEntity };
