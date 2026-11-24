import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CdnDeployment, CdnDeploymentLoadMatch, CdnDeploymentCreateData } from '../ComposalTypes';
declare class CdnDeploymentEntity extends ComposalEntityBase<CdnDeployment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CdnDeploymentEntity): CdnDeploymentEntity;
    load(this: any, reqmatch?: CdnDeploymentLoadMatch, ctrl?: Control): Promise<CdnDeploymentEntity>;
    create(this: any, reqdata?: CdnDeploymentCreateData, ctrl?: Control): Promise<CdnDeploymentEntity>;
}
export { CdnDeploymentEntity };
