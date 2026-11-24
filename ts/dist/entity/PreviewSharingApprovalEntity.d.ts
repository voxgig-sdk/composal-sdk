import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PreviewSharingApproval, PreviewSharingApprovalListMatch, PreviewSharingApprovalCreateData } from '../ComposalTypes';
declare class PreviewSharingApprovalEntity extends ComposalEntityBase<PreviewSharingApproval> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PreviewSharingApprovalEntity): PreviewSharingApprovalEntity;
    list(this: any, reqmatch?: PreviewSharingApprovalListMatch, ctrl?: Control): Promise<PreviewSharingApprovalEntity[]>;
    create(this: any, reqdata?: PreviewSharingApprovalCreateData, ctrl?: Control): Promise<PreviewSharingApprovalEntity>;
}
export { PreviewSharingApprovalEntity };
