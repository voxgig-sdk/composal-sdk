import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AutomationEvent, AutomationEventUpdateData } from '../ComposalTypes';
declare class AutomationEventEntity extends ComposalEntityBase<AutomationEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AutomationEventEntity): AutomationEventEntity;
    update(this: any, reqdata?: AutomationEventUpdateData, ctrl?: Control): Promise<AutomationEventEntity>;
}
export { AutomationEventEntity };
