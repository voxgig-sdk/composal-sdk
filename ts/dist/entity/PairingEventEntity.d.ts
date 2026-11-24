import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PairingEvent, PairingEventListMatch } from '../ComposalTypes';
declare class PairingEventEntity extends ComposalEntityBase<PairingEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PairingEventEntity): PairingEventEntity;
    list(this: any, reqmatch?: PairingEventListMatch, ctrl?: Control): Promise<PairingEventEntity[]>;
}
export { PairingEventEntity };
