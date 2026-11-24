import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Agreement, AgreementListMatch } from '../ComposalTypes';
declare class AgreementEntity extends ComposalEntityBase<Agreement> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgreementEntity): AgreementEntity;
    list(this: any, reqmatch?: AgreementListMatch, ctrl?: Control): Promise<AgreementEntity[]>;
}
export { AgreementEntity };
