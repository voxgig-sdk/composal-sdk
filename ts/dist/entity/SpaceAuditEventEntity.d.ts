import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceAuditEvent, SpaceAuditEventListMatch, SpaceAuditEventCreateData } from '../ComposalTypes';
declare class SpaceAuditEventEntity extends ComposalEntityBase<SpaceAuditEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceAuditEventEntity): SpaceAuditEventEntity;
    list(this: any, reqmatch?: SpaceAuditEventListMatch, ctrl?: Control): Promise<SpaceAuditEventEntity[]>;
    create(this: any, reqdata?: SpaceAuditEventCreateData, ctrl?: Control): Promise<SpaceAuditEventEntity>;
}
export { SpaceAuditEventEntity };
