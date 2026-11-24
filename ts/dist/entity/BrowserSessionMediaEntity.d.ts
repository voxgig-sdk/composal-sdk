import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionMedia, BrowserSessionMediaLoadMatch } from '../ComposalTypes';
declare class BrowserSessionMediaEntity extends ComposalEntityBase<BrowserSessionMedia> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionMediaEntity): BrowserSessionMediaEntity;
    load(this: any, reqmatch?: BrowserSessionMediaLoadMatch, ctrl?: Control): Promise<BrowserSessionMediaEntity>;
}
export { BrowserSessionMediaEntity };
