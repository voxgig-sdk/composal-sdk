import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserEgressCandidate, BrowserEgressCandidateListMatch } from '../ComposalTypes';
declare class BrowserEgressCandidateEntity extends ComposalEntityBase<BrowserEgressCandidate> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserEgressCandidateEntity): BrowserEgressCandidateEntity;
    list(this: any, reqmatch?: BrowserEgressCandidateListMatch, ctrl?: Control): Promise<BrowserEgressCandidateEntity[]>;
}
export { BrowserEgressCandidateEntity };
