import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionEvent, BrowserSessionEventListMatch } from '../ComposalTypes';
declare class BrowserSessionEventEntity extends ComposalEntityBase<BrowserSessionEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionEventEntity): BrowserSessionEventEntity;
    list(this: any, reqmatch?: BrowserSessionEventListMatch, ctrl?: Control): Promise<BrowserSessionEventEntity[]>;
}
export { BrowserSessionEventEntity };
