import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceGrant, DeviceGrantListMatch, DeviceGrantCreateData } from '../ComposalTypes';
declare class DeviceGrantEntity extends ComposalEntityBase<DeviceGrant> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceGrantEntity): DeviceGrantEntity;
    list(this: any, reqmatch?: DeviceGrantListMatch, ctrl?: Control): Promise<DeviceGrantEntity[]>;
    create(this: any, reqdata?: DeviceGrantCreateData, ctrl?: Control): Promise<DeviceGrantEntity>;
}
export { DeviceGrantEntity };
