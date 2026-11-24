import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { StaticSite, StaticSiteLoadMatch, StaticSiteListMatch, StaticSiteCreateData, StaticSiteUpdateData, StaticSitePatchData, StaticSiteRemoveMatch } from '../ComposalTypes';
declare class StaticSiteEntity extends ComposalEntityBase<StaticSite> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: StaticSiteEntity): StaticSiteEntity;
    load(this: any, reqmatch?: StaticSiteLoadMatch, ctrl?: Control): Promise<StaticSiteEntity>;
    list(this: any, reqmatch?: StaticSiteListMatch, ctrl?: Control): Promise<StaticSiteEntity[]>;
    create(this: any, reqdata?: StaticSiteCreateData, ctrl?: Control): Promise<StaticSiteEntity>;
    update(this: any, reqdata?: StaticSiteUpdateData, ctrl?: Control): Promise<StaticSiteEntity>;
    patch(this: any, reqdata?: StaticSitePatchData, ctrl?: Control): Promise<StaticSiteEntity>;
    remove(this: any, reqmatch?: StaticSiteRemoveMatch, ctrl?: Control): Promise<StaticSiteEntity>;
}
export { StaticSiteEntity };
