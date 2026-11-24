import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ComSiteAccessSession, ComSiteAccessSessionCreateData } from '../ComposalTypes';
declare class ComSiteAccessSessionEntity extends ComposalEntityBase<ComSiteAccessSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ComSiteAccessSessionEntity): ComSiteAccessSessionEntity;
    create(this: any, reqdata?: ComSiteAccessSessionCreateData, ctrl?: Control): Promise<ComSiteAccessSessionEntity>;
}
export { ComSiteAccessSessionEntity };
