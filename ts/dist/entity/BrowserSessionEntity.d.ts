import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSession, BrowserSessionLoadMatch, BrowserSessionCreateData, BrowserSessionRemoveMatch } from '../ComposalTypes';
declare class BrowserSessionEntity extends ComposalEntityBase<BrowserSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionEntity): BrowserSessionEntity;
    load(this: any, reqmatch?: BrowserSessionLoadMatch, ctrl?: Control): Promise<BrowserSessionEntity>;
    create(this: any, reqdata?: BrowserSessionCreateData, ctrl?: Control): Promise<BrowserSessionEntity>;
    remove(this: any, reqmatch?: BrowserSessionRemoveMatch, ctrl?: Control): Promise<BrowserSessionEntity>;
}
export { BrowserSessionEntity };
