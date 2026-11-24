import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Device, DeviceLoadMatch, DeviceListMatch, DeviceCreateData } from '../ComposalTypes';
declare class DeviceEntity extends ComposalEntityBase<Device> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceEntity): DeviceEntity;
    load(this: any, reqmatch?: DeviceLoadMatch, ctrl?: Control): Promise<DeviceEntity>;
    list(this: any, reqmatch?: DeviceListMatch, ctrl?: Control): Promise<DeviceEntity[]>;
    create(this: any, reqdata?: DeviceCreateData, ctrl?: Control): Promise<DeviceEntity>;
}
export { DeviceEntity };
