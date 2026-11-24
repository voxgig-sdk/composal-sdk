import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesSession, PagesSessionLoadMatch, PagesSessionListMatch, PagesSessionCreateData } from '../ComposalTypes';
declare class PagesSessionEntity extends ComposalEntityBase<PagesSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesSessionEntity): PagesSessionEntity;
    load(this: any, reqmatch?: PagesSessionLoadMatch, ctrl?: Control): Promise<PagesSessionEntity>;
    list(this: any, reqmatch?: PagesSessionListMatch, ctrl?: Control): Promise<PagesSessionEntity[]>;
    create(this: any, reqdata?: PagesSessionCreateData, ctrl?: Control): Promise<PagesSessionEntity>;
}
export { PagesSessionEntity };
