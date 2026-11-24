import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ConnectionSource, ConnectionSourceListMatch } from '../ComposalTypes';
declare class ConnectionSourceEntity extends ComposalEntityBase<ConnectionSource> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ConnectionSourceEntity): ConnectionSourceEntity;
    list(this: any, reqmatch?: ConnectionSourceListMatch, ctrl?: Control): Promise<ConnectionSourceEntity[]>;
}
export { ConnectionSourceEntity };
