import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyEvidence, VerifyEvidenceLoadMatch } from '../ComposalTypes';
declare class VerifyEvidenceEntity extends ComposalEntityBase<VerifyEvidence> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyEvidenceEntity): VerifyEvidenceEntity;
    load(this: any, reqmatch?: VerifyEvidenceLoadMatch, ctrl?: Control): Promise<VerifyEvidenceEntity>;
}
export { VerifyEvidenceEntity };
