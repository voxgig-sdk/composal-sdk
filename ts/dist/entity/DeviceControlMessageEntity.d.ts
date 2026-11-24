import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceControlMessage, DeviceControlMessageListMatch } from '../ComposalTypes';
declare class DeviceControlMessageEntity extends ComposalEntityBase<DeviceControlMessage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceControlMessageEntity): DeviceControlMessageEntity;
    list(this: any, reqmatch?: DeviceControlMessageListMatch, ctrl?: Control): Promise<DeviceControlMessageEntity[]>;
}
export { DeviceControlMessageEntity };
