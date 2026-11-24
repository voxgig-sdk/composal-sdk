import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceLocalEvent, DeviceLocalEventCreateData } from '../ComposalTypes';
declare class DeviceLocalEventEntity extends ComposalEntityBase<DeviceLocalEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceLocalEventEntity): DeviceLocalEventEntity;
    create(this: any, reqdata?: DeviceLocalEventCreateData, ctrl?: Control): Promise<DeviceLocalEventEntity>;
}
export { DeviceLocalEventEntity };
