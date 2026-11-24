import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AlertRuleEvent, AlertRuleEventLoadMatch, AlertRuleEventListMatch, AlertRuleEventCreateData, AlertRuleEventRemoveMatch } from '../ComposalTypes';
declare class AlertRuleEventEntity extends ComposalEntityBase<AlertRuleEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AlertRuleEventEntity): AlertRuleEventEntity;
    load(this: any, reqmatch?: AlertRuleEventLoadMatch, ctrl?: Control): Promise<AlertRuleEventEntity>;
    list(this: any, reqmatch?: AlertRuleEventListMatch, ctrl?: Control): Promise<AlertRuleEventEntity[]>;
    create(this: any, reqdata?: AlertRuleEventCreateData, ctrl?: Control): Promise<AlertRuleEventEntity>;
    remove(this: any, reqmatch?: AlertRuleEventRemoveMatch, ctrl?: Control): Promise<AlertRuleEventEntity>;
}
export { AlertRuleEventEntity };
