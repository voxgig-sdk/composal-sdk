import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Signal, SignalLoadMatch, SignalListMatch, SignalCreateData } from '../ComposalTypes';
declare class SignalEntity extends ComposalEntityBase<Signal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SignalEntity): SignalEntity;
    load(this: any, reqmatch?: SignalLoadMatch, ctrl?: Control): Promise<SignalEntity>;
    list(this: any, reqmatch?: SignalListMatch, ctrl?: Control): Promise<SignalEntity[]>;
    create(this: any, reqdata?: SignalCreateData, ctrl?: Control): Promise<SignalEntity>;
}
export { SignalEntity };
