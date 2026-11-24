import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NetworkConnection, NetworkConnectionCreateData, NetworkConnectionUpdateData, NetworkConnectionPatchData } from '../ComposalTypes';
declare class NetworkConnectionEntity extends ComposalEntityBase<NetworkConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NetworkConnectionEntity): NetworkConnectionEntity;
    create(this: any, reqdata?: NetworkConnectionCreateData, ctrl?: Control): Promise<NetworkConnectionEntity>;
    update(this: any, reqdata?: NetworkConnectionUpdateData, ctrl?: Control): Promise<NetworkConnectionEntity>;
    patch(this: any, reqdata?: NetworkConnectionPatchData, ctrl?: Control): Promise<NetworkConnectionEntity>;
}
export { NetworkConnectionEntity };
