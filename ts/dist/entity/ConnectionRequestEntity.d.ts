import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ConnectionRequest, ConnectionRequestLoadMatch } from '../ComposalTypes';
declare class ConnectionRequestEntity extends ComposalEntityBase<ConnectionRequest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ConnectionRequestEntity): ConnectionRequestEntity;
    load(this: any, reqmatch?: ConnectionRequestLoadMatch, ctrl?: Control): Promise<ConnectionRequestEntity>;
}
export { ConnectionRequestEntity };
