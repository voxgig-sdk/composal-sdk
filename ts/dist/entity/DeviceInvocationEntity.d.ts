import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceInvocation, DeviceInvocationCreateData } from '../ComposalTypes';
declare class DeviceInvocationEntity extends ComposalEntityBase<DeviceInvocation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceInvocationEntity): DeviceInvocationEntity;
    create(this: any, reqdata?: DeviceInvocationCreateData, ctrl?: Control): Promise<DeviceInvocationEntity>;
}
export { DeviceInvocationEntity };
