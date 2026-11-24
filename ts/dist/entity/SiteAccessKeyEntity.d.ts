import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SiteAccessKey, SiteAccessKeyListMatch, SiteAccessKeyCreateData, SiteAccessKeyRemoveMatch } from '../ComposalTypes';
declare class SiteAccessKeyEntity extends ComposalEntityBase<SiteAccessKey> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SiteAccessKeyEntity): SiteAccessKeyEntity;
    list(this: any, reqmatch?: SiteAccessKeyListMatch, ctrl?: Control): Promise<SiteAccessKeyEntity[]>;
    create(this: any, reqdata?: SiteAccessKeyCreateData, ctrl?: Control): Promise<SiteAccessKeyEntity>;
    remove(this: any, reqmatch?: SiteAccessKeyRemoveMatch, ctrl?: Control): Promise<SiteAccessKeyEntity>;
}
export { SiteAccessKeyEntity };
