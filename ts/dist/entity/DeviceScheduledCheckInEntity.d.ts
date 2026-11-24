import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceScheduledCheckIn, DeviceScheduledCheckInCreateData } from '../ComposalTypes';
declare class DeviceScheduledCheckInEntity extends ComposalEntityBase<DeviceScheduledCheckIn> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceScheduledCheckInEntity): DeviceScheduledCheckInEntity;
    create(this: any, reqdata?: DeviceScheduledCheckInCreateData, ctrl?: Control): Promise<DeviceScheduledCheckInEntity>;
}
export { DeviceScheduledCheckInEntity };
