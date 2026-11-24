import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtefactCommentThread, ArtefactCommentThreadListMatch, ArtefactCommentThreadCreateData, ArtefactCommentThreadUpdateData } from '../ComposalTypes';
declare class ArtefactCommentThreadEntity extends ComposalEntityBase<ArtefactCommentThread> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtefactCommentThreadEntity): ArtefactCommentThreadEntity;
    list(this: any, reqmatch?: ArtefactCommentThreadListMatch, ctrl?: Control): Promise<ArtefactCommentThreadEntity[]>;
    create(this: any, reqdata?: ArtefactCommentThreadCreateData, ctrl?: Control): Promise<ArtefactCommentThreadEntity>;
    update(this: any, reqdata?: ArtefactCommentThreadUpdateData, ctrl?: Control): Promise<ArtefactCommentThreadEntity>;
}
export { ArtefactCommentThreadEntity };
