import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SecretGrant, SecretGrantLoadMatch, SecretGrantCreateData, SecretGrantUpdateData, SecretGrantPatchData, SecretGrantRemoveMatch } from '../ComposalTypes';
declare class SecretGrantEntity extends ComposalEntityBase<SecretGrant> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SecretGrantEntity): SecretGrantEntity;
    load(this: any, reqmatch?: SecretGrantLoadMatch, ctrl?: Control): Promise<SecretGrantEntity>;
    create(this: any, reqdata?: SecretGrantCreateData, ctrl?: Control): Promise<SecretGrantEntity>;
    update(this: any, reqdata?: SecretGrantUpdateData, ctrl?: Control): Promise<SecretGrantEntity>;
    patch(this: any, reqdata?: SecretGrantPatchData, ctrl?: Control): Promise<SecretGrantEntity>;
    remove(this: any, reqmatch?: SecretGrantRemoveMatch, ctrl?: Control): Promise<SecretGrantEntity>;
}
export { SecretGrantEntity };
