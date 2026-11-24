import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SitePreview, SitePreviewLoadMatch } from '../ComposalTypes';
declare class SitePreviewEntity extends ComposalEntityBase<SitePreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SitePreviewEntity): SitePreviewEntity;
    load(this: any, reqmatch?: SitePreviewLoadMatch, ctrl?: Control): Promise<SitePreviewEntity>;
}
export { SitePreviewEntity };
