import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionTask, BrowserSessionTaskLoadMatch, BrowserSessionTaskCreateData } from '../ComposalTypes';
declare class BrowserSessionTaskEntity extends ComposalEntityBase<BrowserSessionTask> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionTaskEntity): BrowserSessionTaskEntity;
    load(this: any, reqmatch?: BrowserSessionTaskLoadMatch, ctrl?: Control): Promise<BrowserSessionTaskEntity>;
    create(this: any, reqdata?: BrowserSessionTaskCreateData, ctrl?: Control): Promise<BrowserSessionTaskEntity>;
}
export { BrowserSessionTaskEntity };
