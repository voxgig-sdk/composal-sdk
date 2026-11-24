import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StaticSiteDeployment, StaticSiteDeploymentLoadMatch, StaticSiteDeploymentListMatch, StaticSiteDeploymentCreateData } from '../ComposalTypes';
declare class StaticSiteDeploymentEntity extends ComposalEntityBase<StaticSiteDeployment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StaticSiteDeploymentEntity): StaticSiteDeploymentEntity;
    load(this: any, reqmatch?: StaticSiteDeploymentLoadMatch, ctrl?: Control): Promise<StaticSiteDeploymentEntity>;
    list(this: any, reqmatch?: StaticSiteDeploymentListMatch, ctrl?: Control): Promise<StaticSiteDeploymentEntity[]>;
    create(this: any, reqdata?: StaticSiteDeploymentCreateData, ctrl?: Control): Promise<StaticSiteDeploymentEntity>;
}
export { StaticSiteDeploymentEntity };
