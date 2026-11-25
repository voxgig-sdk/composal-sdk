import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyMergeRequest, VerifyMergeRequestLoadMatch, VerifyMergeRequestCreateData } from '../ComposalTypes';
declare class VerifyMergeRequestEntity extends ComposalEntityBase<VerifyMergeRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyMergeRequestEntity): VerifyMergeRequestEntity;
    load(this: any, reqmatch?: VerifyMergeRequestLoadMatch, ctrl?: Control): Promise<VerifyMergeRequestEntity>;
    create(this: any, reqdata?: VerifyMergeRequestCreateData, ctrl?: Control): Promise<VerifyMergeRequestEntity>;
}
export { VerifyMergeRequestEntity };
