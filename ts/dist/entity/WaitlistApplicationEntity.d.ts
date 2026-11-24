import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WaitlistApplication, WaitlistApplicationCreateData } from '../ComposalTypes';
declare class WaitlistApplicationEntity extends ComposalEntityBase<WaitlistApplication> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WaitlistApplicationEntity): WaitlistApplicationEntity;
    create(this: any, reqdata?: WaitlistApplicationCreateData, ctrl?: Control): Promise<WaitlistApplicationEntity>;
}
export { WaitlistApplicationEntity };
