import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SignalIntegration, SignalIntegrationLoadMatch, SignalIntegrationListMatch, SignalIntegrationCreateData, SignalIntegrationUpdateData, SignalIntegrationPatchData, SignalIntegrationRemoveMatch } from '../ComposalTypes';
declare class SignalIntegrationEntity extends ComposalEntityBase<SignalIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalIntegrationEntity): SignalIntegrationEntity;
    load(this: any, reqmatch?: SignalIntegrationLoadMatch, ctrl?: Control): Promise<SignalIntegrationEntity>;
    list(this: any, reqmatch?: SignalIntegrationListMatch, ctrl?: Control): Promise<SignalIntegrationEntity[]>;
    create(this: any, reqdata?: SignalIntegrationCreateData, ctrl?: Control): Promise<SignalIntegrationEntity>;
    update(this: any, reqdata?: SignalIntegrationUpdateData, ctrl?: Control): Promise<SignalIntegrationEntity>;
    patch(this: any, reqdata?: SignalIntegrationPatchData, ctrl?: Control): Promise<SignalIntegrationEntity>;
    remove(this: any, reqmatch?: SignalIntegrationRemoveMatch, ctrl?: Control): Promise<SignalIntegrationEntity>;
}
export { SignalIntegrationEntity };
