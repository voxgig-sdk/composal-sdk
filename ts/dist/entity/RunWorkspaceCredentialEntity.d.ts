import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunWorkspaceCredential, RunWorkspaceCredentialCreateData } from '../ComposalTypes';
declare class RunWorkspaceCredentialEntity extends ComposalEntityBase<RunWorkspaceCredential> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunWorkspaceCredentialEntity): RunWorkspaceCredentialEntity;
    create(this: any, reqdata?: RunWorkspaceCredentialCreateData, ctrl?: Control): Promise<RunWorkspaceCredentialEntity>;
}
export { RunWorkspaceCredentialEntity };
