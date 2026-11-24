import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AutomationRun, AutomationRunCreateData } from '../ComposalTypes';
declare class AutomationRunEntity extends ComposalEntityBase<AutomationRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AutomationRunEntity): AutomationRunEntity;
    create(this: any, reqdata?: AutomationRunCreateData, ctrl?: Control): Promise<AutomationRunEntity>;
}
export { AutomationRunEntity };
