import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NetworkingSpace, NetworkingSpaceLoadMatch, NetworkingSpaceCreateData, NetworkingSpaceUpdateData, NetworkingSpacePatchData, NetworkingSpaceRemoveMatch } from '../ComposalTypes';
declare class NetworkingSpaceEntity extends ComposalEntityBase<NetworkingSpace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NetworkingSpaceEntity): NetworkingSpaceEntity;
    load(this: any, reqmatch?: NetworkingSpaceLoadMatch, ctrl?: Control): Promise<NetworkingSpaceEntity>;
    create(this: any, reqdata?: NetworkingSpaceCreateData, ctrl?: Control): Promise<NetworkingSpaceEntity>;
    update(this: any, reqdata?: NetworkingSpaceUpdateData, ctrl?: Control): Promise<NetworkingSpaceEntity>;
    patch(this: any, reqdata?: NetworkingSpacePatchData, ctrl?: Control): Promise<NetworkingSpaceEntity>;
    remove(this: any, reqmatch?: NetworkingSpaceRemoveMatch, ctrl?: Control): Promise<NetworkingSpaceEntity>;
}
export { NetworkingSpaceEntity };
