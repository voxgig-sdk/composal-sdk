import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Pairing, PairingLoadMatch, PairingListMatch, PairingCreateData } from '../ComposalTypes';
declare class PairingEntity extends ComposalEntityBase<Pairing> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PairingEntity): PairingEntity;
    load(this: any, reqmatch?: PairingLoadMatch, ctrl?: Control): Promise<PairingEntity>;
    list(this: any, reqmatch?: PairingListMatch, ctrl?: Control): Promise<PairingEntity[]>;
    create(this: any, reqdata?: PairingCreateData, ctrl?: Control): Promise<PairingEntity>;
}
export { PairingEntity };
