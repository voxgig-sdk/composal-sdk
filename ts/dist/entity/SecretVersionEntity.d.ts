import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SecretVersion, SecretVersionLoadMatch, SecretVersionListMatch, SecretVersionCreateData, SecretVersionUpdateData, SecretVersionPatchData, SecretVersionRemoveMatch } from '../ComposalTypes';
declare class SecretVersionEntity extends ComposalEntityBase<SecretVersion> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SecretVersionEntity): SecretVersionEntity;
    load(this: any, reqmatch?: SecretVersionLoadMatch, ctrl?: Control): Promise<SecretVersionEntity>;
    list(this: any, reqmatch?: SecretVersionListMatch, ctrl?: Control): Promise<SecretVersionEntity[]>;
    create(this: any, reqdata?: SecretVersionCreateData, ctrl?: Control): Promise<SecretVersionEntity>;
    update(this: any, reqdata?: SecretVersionUpdateData, ctrl?: Control): Promise<SecretVersionEntity>;
    patch(this: any, reqdata?: SecretVersionPatchData, ctrl?: Control): Promise<SecretVersionEntity>;
    remove(this: any, reqmatch?: SecretVersionRemoveMatch, ctrl?: Control): Promise<SecretVersionEntity>;
}
export { SecretVersionEntity };
