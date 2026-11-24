import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PreviewSecret, PreviewSecretCreateData, PreviewSecretRemoveMatch } from '../ComposalTypes';
declare class PreviewSecretEntity extends ComposalEntityBase<PreviewSecret> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PreviewSecretEntity): PreviewSecretEntity;
    create(this: any, reqdata?: PreviewSecretCreateData, ctrl?: Control): Promise<PreviewSecretEntity>;
    remove(this: any, reqmatch?: PreviewSecretRemoveMatch, ctrl?: Control): Promise<PreviewSecretEntity>;
}
export { PreviewSecretEntity };
