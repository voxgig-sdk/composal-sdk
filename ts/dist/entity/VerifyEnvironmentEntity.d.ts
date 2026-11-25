import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyEnvironment, VerifyEnvironmentLoadMatch, VerifyEnvironmentCreateData, VerifyEnvironmentUpdateData, VerifyEnvironmentPatchData, VerifyEnvironmentRemoveMatch } from '../ComposalTypes';
declare class VerifyEnvironmentEntity extends ComposalEntityBase<VerifyEnvironment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyEnvironmentEntity): VerifyEnvironmentEntity;
    load(this: any, reqmatch?: VerifyEnvironmentLoadMatch, ctrl?: Control): Promise<VerifyEnvironmentEntity>;
    create(this: any, reqdata?: VerifyEnvironmentCreateData, ctrl?: Control): Promise<VerifyEnvironmentEntity>;
    update(this: any, reqdata?: VerifyEnvironmentUpdateData, ctrl?: Control): Promise<VerifyEnvironmentEntity>;
    patch(this: any, reqdata?: VerifyEnvironmentPatchData, ctrl?: Control): Promise<VerifyEnvironmentEntity>;
    remove(this: any, reqmatch?: VerifyEnvironmentRemoveMatch, ctrl?: Control): Promise<VerifyEnvironmentEntity>;
}
export { VerifyEnvironmentEntity };
