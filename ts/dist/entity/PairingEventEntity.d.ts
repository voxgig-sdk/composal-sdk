import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PairingEvent, PairingEventLoadMatch } from '../ComposalTypes';
declare class PairingEventEntity extends ComposalEntityBase<PairingEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PairingEventEntity): PairingEventEntity;
    load(this: any, reqmatch?: PairingEventLoadMatch, ctrl?: Control): Promise<PairingEventEntity>;
}
export { PairingEventEntity };
