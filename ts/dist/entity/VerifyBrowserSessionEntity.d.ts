import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { VerifyBrowserSession, VerifyBrowserSessionLoadMatch, VerifyBrowserSessionCreateData, VerifyBrowserSessionRemoveMatch } from '../ComposalTypes';
declare class VerifyBrowserSessionEntity extends ComposalEntityBase<VerifyBrowserSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: VerifyBrowserSessionEntity): VerifyBrowserSessionEntity;
    load(this: any, reqmatch?: VerifyBrowserSessionLoadMatch, ctrl?: Control): Promise<VerifyBrowserSessionEntity>;
    create(this: any, reqdata?: VerifyBrowserSessionCreateData, ctrl?: Control): Promise<VerifyBrowserSessionEntity>;
    remove(this: any, reqmatch?: VerifyBrowserSessionRemoveMatch, ctrl?: Control): Promise<VerifyBrowserSessionEntity>;
}
export { VerifyBrowserSessionEntity };
