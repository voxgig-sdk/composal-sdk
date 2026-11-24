import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuditEvent, AuditEventListMatch } from '../ComposalTypes';
declare class AuditEventEntity extends ComposalEntityBase<AuditEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuditEventEntity): AuditEventEntity;
    list(this: any, reqmatch?: AuditEventListMatch, ctrl?: Control): Promise<AuditEventEntity[]>;
}
export { AuditEventEntity };
