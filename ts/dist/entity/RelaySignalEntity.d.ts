import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RelaySignal, RelaySignalCreateData } from '../ComposalTypes';
declare class RelaySignalEntity extends ComposalEntityBase<RelaySignal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RelaySignalEntity): RelaySignalEntity;
    create(this: any, reqdata?: RelaySignalCreateData, ctrl?: Control): Promise<RelaySignalEntity>;
}
export { RelaySignalEntity };
