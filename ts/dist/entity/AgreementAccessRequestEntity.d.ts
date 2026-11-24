import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgreementAccessRequest, AgreementAccessRequestCreateData } from '../ComposalTypes';
declare class AgreementAccessRequestEntity extends ComposalEntityBase<AgreementAccessRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgreementAccessRequestEntity): AgreementAccessRequestEntity;
    create(this: any, reqdata?: AgreementAccessRequestCreateData, ctrl?: Control): Promise<AgreementAccessRequestEntity>;
}
export { AgreementAccessRequestEntity };
