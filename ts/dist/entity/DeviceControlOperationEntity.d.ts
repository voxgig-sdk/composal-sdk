import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceControlOperation, DeviceControlOperationLoadMatch, DeviceControlOperationCreateData } from '../ComposalTypes';
declare class DeviceControlOperationEntity extends ComposalEntityBase<DeviceControlOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceControlOperationEntity): DeviceControlOperationEntity;
    load(this: any, reqmatch?: DeviceControlOperationLoadMatch, ctrl?: Control): Promise<DeviceControlOperationEntity>;
    create(this: any, reqdata?: DeviceControlOperationCreateData, ctrl?: Control): Promise<DeviceControlOperationEntity>;
}
export { DeviceControlOperationEntity };
