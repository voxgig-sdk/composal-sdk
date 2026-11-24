import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceEnterpriseRelay, DeviceEnterpriseRelayListMatch } from '../ComposalTypes';
declare class DeviceEnterpriseRelayEntity extends ComposalEntityBase<DeviceEnterpriseRelay> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceEnterpriseRelayEntity): DeviceEnterpriseRelayEntity;
    list(this: any, reqmatch?: DeviceEnterpriseRelayListMatch, ctrl?: Control): Promise<DeviceEnterpriseRelayEntity[]>;
}
export { DeviceEnterpriseRelayEntity };
