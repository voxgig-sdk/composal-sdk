import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SignalInbound, SignalInboundUpdateData } from '../ComposalTypes';
declare class SignalInboundEntity extends ComposalEntityBase<SignalInbound> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalInboundEntity): SignalInboundEntity;
    update(this: any, reqdata?: SignalInboundUpdateData, ctrl?: Control): Promise<SignalInboundEntity>;
}
export { SignalInboundEntity };
