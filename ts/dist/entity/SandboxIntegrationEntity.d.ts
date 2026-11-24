import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SandboxIntegration, SandboxIntegrationLoadMatch, SandboxIntegrationCreateData, SandboxIntegrationUpdateData, SandboxIntegrationPatchData } from '../ComposalTypes';
declare class SandboxIntegrationEntity extends ComposalEntityBase<SandboxIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SandboxIntegrationEntity): SandboxIntegrationEntity;
    load(this: any, reqmatch?: SandboxIntegrationLoadMatch, ctrl?: Control): Promise<SandboxIntegrationEntity>;
    create(this: any, reqdata?: SandboxIntegrationCreateData, ctrl?: Control): Promise<SandboxIntegrationEntity>;
    update(this: any, reqdata?: SandboxIntegrationUpdateData, ctrl?: Control): Promise<SandboxIntegrationEntity>;
    patch(this: any, reqdata?: SandboxIntegrationPatchData, ctrl?: Control): Promise<SandboxIntegrationEntity>;
}
export { SandboxIntegrationEntity };
