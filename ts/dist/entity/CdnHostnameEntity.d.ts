import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CdnHostname, CdnHostnameLoadMatch, CdnHostnameCreateData, CdnHostnameUpdateData, CdnHostnamePatchData, CdnHostnameRemoveMatch } from '../ComposalTypes';
declare class CdnHostnameEntity extends ComposalEntityBase<CdnHostname> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CdnHostnameEntity): CdnHostnameEntity;
    load(this: any, reqmatch?: CdnHostnameLoadMatch, ctrl?: Control): Promise<CdnHostnameEntity>;
    create(this: any, reqdata?: CdnHostnameCreateData, ctrl?: Control): Promise<CdnHostnameEntity>;
    update(this: any, reqdata?: CdnHostnameUpdateData, ctrl?: Control): Promise<CdnHostnameEntity>;
    patch(this: any, reqdata?: CdnHostnamePatchData, ctrl?: Control): Promise<CdnHostnameEntity>;
    remove(this: any, reqmatch?: CdnHostnameRemoveMatch, ctrl?: Control): Promise<CdnHostnameEntity>;
}
export { CdnHostnameEntity };
