import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RoderWorkspaceCredential, RoderWorkspaceCredentialCreateData } from '../ComposalTypes';
declare class RoderWorkspaceCredentialEntity extends ComposalEntityBase<RoderWorkspaceCredential> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RoderWorkspaceCredentialEntity): RoderWorkspaceCredentialEntity;
    create(this: any, reqdata?: RoderWorkspaceCredentialCreateData, ctrl?: Control): Promise<RoderWorkspaceCredentialEntity>;
}
export { RoderWorkspaceCredentialEntity };
