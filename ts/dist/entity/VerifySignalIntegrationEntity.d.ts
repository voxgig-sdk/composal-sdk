import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifySignalIntegration, VerifySignalIntegrationCreateData } from '../ComposalTypes';
declare class VerifySignalIntegrationEntity extends ComposalEntityBase<VerifySignalIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifySignalIntegrationEntity): VerifySignalIntegrationEntity;
    create(this: any, reqdata?: VerifySignalIntegrationCreateData, ctrl?: Control): Promise<VerifySignalIntegrationEntity>;
}
export { VerifySignalIntegrationEntity };
