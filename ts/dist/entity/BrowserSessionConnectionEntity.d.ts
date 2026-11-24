import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionConnection, BrowserSessionConnectionCreateData } from '../ComposalTypes';
declare class BrowserSessionConnectionEntity extends ComposalEntityBase<BrowserSessionConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionConnectionEntity): BrowserSessionConnectionEntity;
    create(this: any, reqdata?: BrowserSessionConnectionCreateData, ctrl?: Control): Promise<BrowserSessionConnectionEntity>;
}
export { BrowserSessionConnectionEntity };
