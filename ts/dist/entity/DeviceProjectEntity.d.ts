import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceProject, DeviceProjectRemoveMatch } from '../ComposalTypes';
declare class DeviceProjectEntity extends ComposalEntityBase<DeviceProject> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceProjectEntity): DeviceProjectEntity;
    remove(this: any, reqmatch?: DeviceProjectRemoveMatch, ctrl?: Control): Promise<DeviceProjectEntity>;
}
export { DeviceProjectEntity };
