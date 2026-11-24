import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeLandingHold, ChangeLandingHoldCreateData } from '../ComposalTypes';
declare class ChangeLandingHoldEntity extends ComposalEntityBase<ChangeLandingHold> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeLandingHoldEntity): ChangeLandingHoldEntity;
    create(this: any, reqdata?: ChangeLandingHoldCreateData, ctrl?: Control): Promise<ChangeLandingHoldEntity>;
}
export { ChangeLandingHoldEntity };
