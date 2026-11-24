import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Transcript, TranscriptLoadMatch, TranscriptListMatch, TranscriptCreateData } from '../ComposalTypes';
declare class TranscriptEntity extends ComposalEntityBase<Transcript> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: TranscriptEntity): TranscriptEntity;
    load(this: any, reqmatch?: TranscriptLoadMatch, ctrl?: Control): Promise<TranscriptEntity>;
    list(this: any, reqmatch?: TranscriptListMatch, ctrl?: Control): Promise<TranscriptEntity[]>;
    create(this: any, reqdata?: TranscriptCreateData, ctrl?: Control): Promise<TranscriptEntity>;
}
export { TranscriptEntity };
