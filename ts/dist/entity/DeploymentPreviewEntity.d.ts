import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeploymentPreview, DeploymentPreviewListMatch } from '../ComposalTypes';
declare class DeploymentPreviewEntity extends ComposalEntityBase<DeploymentPreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeploymentPreviewEntity): DeploymentPreviewEntity;
    list(this: any, reqmatch?: DeploymentPreviewListMatch, ctrl?: Control): Promise<DeploymentPreviewEntity[]>;
}
export { DeploymentPreviewEntity };
