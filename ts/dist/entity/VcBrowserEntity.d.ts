import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VcBrowser, VcBrowserLoadMatch } from '../ComposalTypes';
declare class VcBrowserEntity extends ComposalEntityBase<VcBrowser> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VcBrowserEntity): VcBrowserEntity;
    load(this: any, reqmatch?: VcBrowserLoadMatch, ctrl?: Control): Promise<VcBrowserEntity>;
}
export { VcBrowserEntity };
