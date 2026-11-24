import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeTranscript, ChangeTranscriptListMatch } from '../ComposalTypes';
declare class ChangeTranscriptEntity extends ComposalEntityBase<ChangeTranscript> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeTranscriptEntity): ChangeTranscriptEntity;
    list(this: any, reqmatch?: ChangeTranscriptListMatch, ctrl?: Control): Promise<ChangeTranscriptEntity[]>;
}
export { ChangeTranscriptEntity };
