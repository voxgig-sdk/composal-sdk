import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Evidence, EvidenceLoadMatch } from '../ComposalTypes';
declare class EvidenceEntity extends ComposalEntityBase<Evidence> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EvidenceEntity): EvidenceEntity;
    load(this: any, reqmatch?: EvidenceLoadMatch, ctrl?: Control): Promise<EvidenceEntity>;
}
export { EvidenceEntity };
