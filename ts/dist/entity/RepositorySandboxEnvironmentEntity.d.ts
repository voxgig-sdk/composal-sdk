import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositorySandboxEnvironment, RepositorySandboxEnvironmentLoadMatch, RepositorySandboxEnvironmentCreateData } from '../ComposalTypes';
declare class RepositorySandboxEnvironmentEntity extends ComposalEntityBase<RepositorySandboxEnvironment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositorySandboxEnvironmentEntity): RepositorySandboxEnvironmentEntity;
    load(this: any, reqmatch?: RepositorySandboxEnvironmentLoadMatch, ctrl?: Control): Promise<RepositorySandboxEnvironmentEntity>;
    create(this: any, reqdata?: RepositorySandboxEnvironmentCreateData, ctrl?: Control): Promise<RepositorySandboxEnvironmentEntity>;
}
export { RepositorySandboxEnvironmentEntity };
