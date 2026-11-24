import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionControl, BrowserSessionControlLoadMatch } from '../ComposalTypes';
declare class BrowserSessionControlEntity extends ComposalEntityBase<BrowserSessionControl> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionControlEntity): BrowserSessionControlEntity;
    load(this: any, reqmatch?: BrowserSessionControlLoadMatch, ctrl?: Control): Promise<BrowserSessionControlEntity>;
}
export { BrowserSessionControlEntity };
