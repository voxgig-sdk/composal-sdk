import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DeviceBrowserOperation, DeviceBrowserOperationListMatch, DeviceBrowserOperationCreateData } from '../ComposalTypes';
declare class DeviceBrowserOperationEntity extends ComposalEntityBase<DeviceBrowserOperation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DeviceBrowserOperationEntity): DeviceBrowserOperationEntity;
    list(this: any, reqmatch?: DeviceBrowserOperationListMatch, ctrl?: Control): Promise<DeviceBrowserOperationEntity[]>;
    create(this: any, reqdata?: DeviceBrowserOperationCreateData, ctrl?: Control): Promise<DeviceBrowserOperationEntity>;
}
export { DeviceBrowserOperationEntity };
