import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseStep, LeaseStepUpdateData } from '../ComposalTypes';
declare class LeaseStepEntity extends ComposalEntityBase<LeaseStep> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseStepEntity): LeaseStepEntity;
    update(this: any, reqdata?: LeaseStepUpdateData, ctrl?: Control): Promise<LeaseStepEntity>;
}
export { LeaseStepEntity };
