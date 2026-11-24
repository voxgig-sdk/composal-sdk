import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Site, SiteListMatch } from '../ComposalTypes';
declare class SiteEntity extends ComposalEntityBase<Site> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SiteEntity): SiteEntity;
    list(this: any, reqmatch?: SiteListMatch, ctrl?: Control): Promise<SiteEntity[]>;
}
export { SiteEntity };
