import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeTranscriptSummary, ChangeTranscriptSummaryListMatch } from '../ComposalTypes';
declare class ChangeTranscriptSummaryEntity extends ComposalEntityBase<ChangeTranscriptSummary> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeTranscriptSummaryEntity): ChangeTranscriptSummaryEntity;
    list(this: any, reqmatch?: ChangeTranscriptSummaryListMatch, ctrl?: Control): Promise<ChangeTranscriptSummaryEntity[]>;
}
export { ChangeTranscriptSummaryEntity };
