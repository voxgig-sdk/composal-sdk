import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceEnterpriseRelay, DeviceEnterpriseRelayLoadMatch } from '../ComposalTypes';
declare class DeviceEnterpriseRelayEntity extends ComposalEntityBase<DeviceEnterpriseRelay> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceEnterpriseRelayEntity): DeviceEnterpriseRelayEntity;
    load(this: any, reqmatch?: DeviceEnterpriseRelayLoadMatch, ctrl?: Control): Promise<DeviceEnterpriseRelayEntity>;
}
export { DeviceEnterpriseRelayEntity };
