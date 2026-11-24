import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SiteSecret, SiteSecretUpdateData, SiteSecretRemoveMatch } from '../ComposalTypes';
declare class SiteSecretEntity extends ComposalEntityBase<SiteSecret> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SiteSecretEntity): SiteSecretEntity;
    update(this: any, reqdata?: SiteSecretUpdateData, ctrl?: Control): Promise<SiteSecretEntity>;
    remove(this: any, reqmatch?: SiteSecretRemoveMatch, ctrl?: Control): Promise<SiteSecretEntity>;
}
export { SiteSecretEntity };
