import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DevicePairing, DevicePairingCreateData } from '../ComposalTypes';
declare class DevicePairingEntity extends ComposalEntityBase<DevicePairing> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DevicePairingEntity): DevicePairingEntity;
    create(this: any, reqdata?: DevicePairingCreateData, ctrl?: Control): Promise<DevicePairingEntity>;
}
export { DevicePairingEntity };
