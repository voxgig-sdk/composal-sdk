import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeTranscriptSummary, ChangeTranscriptSummaryLoadMatch } from '../ComposalTypes';
declare class ChangeTranscriptSummaryEntity extends ComposalEntityBase<ChangeTranscriptSummary> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeTranscriptSummaryEntity): ChangeTranscriptSummaryEntity;
    load(this: any, reqmatch?: ChangeTranscriptSummaryLoadMatch, ctrl?: Control): Promise<ChangeTranscriptSummaryEntity>;
}
export { ChangeTranscriptSummaryEntity };
