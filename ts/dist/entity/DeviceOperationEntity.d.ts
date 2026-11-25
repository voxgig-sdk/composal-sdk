import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceOperation, DeviceOperationLoadMatch, DeviceOperationCreateData } from '../ComposalTypes';
declare class DeviceOperationEntity extends ComposalEntityBase<DeviceOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceOperationEntity): DeviceOperationEntity;
    load(this: any, reqmatch?: DeviceOperationLoadMatch, ctrl?: Control): Promise<DeviceOperationEntity>;
    create(this: any, reqdata?: DeviceOperationCreateData, ctrl?: Control): Promise<DeviceOperationEntity>;
}
export { DeviceOperationEntity };
