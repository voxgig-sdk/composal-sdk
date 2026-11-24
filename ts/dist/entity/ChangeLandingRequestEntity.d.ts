import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeLandingRequest, ChangeLandingRequestCreateData, ChangeLandingRequestRemoveMatch } from '../ComposalTypes';
declare class ChangeLandingRequestEntity extends ComposalEntityBase<ChangeLandingRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeLandingRequestEntity): ChangeLandingRequestEntity;
    create(this: any, reqdata?: ChangeLandingRequestCreateData, ctrl?: Control): Promise<ChangeLandingRequestEntity>;
    remove(this: any, reqmatch?: ChangeLandingRequestRemoveMatch, ctrl?: Control): Promise<ChangeLandingRequestEntity>;
}
export { ChangeLandingRequestEntity };
