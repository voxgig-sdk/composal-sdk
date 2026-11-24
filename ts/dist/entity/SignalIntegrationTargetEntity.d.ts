import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SignalIntegrationTarget, SignalIntegrationTargetListMatch, SignalIntegrationTargetUpdateData } from '../ComposalTypes';
declare class SignalIntegrationTargetEntity extends ComposalEntityBase<SignalIntegrationTarget> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalIntegrationTargetEntity): SignalIntegrationTargetEntity;
    list(this: any, reqmatch?: SignalIntegrationTargetListMatch, ctrl?: Control): Promise<SignalIntegrationTargetEntity[]>;
    update(this: any, reqdata?: SignalIntegrationTargetUpdateData, ctrl?: Control): Promise<SignalIntegrationTargetEntity>;
}
export { SignalIntegrationTargetEntity };
