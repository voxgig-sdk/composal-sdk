import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MergeRequest, MergeRequestLoadMatch, MergeRequestCreateData } from '../ComposalTypes';
declare class MergeRequestEntity extends ComposalEntityBase<MergeRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MergeRequestEntity): MergeRequestEntity;
    load(this: any, reqmatch?: MergeRequestLoadMatch, ctrl?: Control): Promise<MergeRequestEntity>;
    create(this: any, reqdata?: MergeRequestCreateData, ctrl?: Control): Promise<MergeRequestEntity>;
}
export { MergeRequestEntity };
