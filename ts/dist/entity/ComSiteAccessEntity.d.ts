import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ComSiteAccess, ComSiteAccessLoadMatch, ComSiteAccessCreateData } from '../ComposalTypes';
declare class ComSiteAccessEntity extends ComposalEntityBase<ComSiteAccess> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ComSiteAccessEntity): ComSiteAccessEntity;
    load(this: any, reqmatch?: ComSiteAccessLoadMatch, ctrl?: Control): Promise<ComSiteAccessEntity>;
    create(this: any, reqdata?: ComSiteAccessCreateData, ctrl?: Control): Promise<ComSiteAccessEntity>;
}
export { ComSiteAccessEntity };
