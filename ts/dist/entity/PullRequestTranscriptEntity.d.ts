import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PullRequestTranscript, PullRequestTranscriptListMatch } from '../ComposalTypes';
declare class PullRequestTranscriptEntity extends ComposalEntityBase<PullRequestTranscript> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PullRequestTranscriptEntity): PullRequestTranscriptEntity;
    list(this: any, reqmatch?: PullRequestTranscriptListMatch, ctrl?: Control): Promise<PullRequestTranscriptEntity[]>;
}
export { PullRequestTranscriptEntity };
