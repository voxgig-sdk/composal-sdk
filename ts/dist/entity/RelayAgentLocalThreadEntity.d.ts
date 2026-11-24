import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RelayAgentLocalThread, RelayAgentLocalThreadRemoveMatch } from '../ComposalTypes';
declare class RelayAgentLocalThreadEntity extends ComposalEntityBase<RelayAgentLocalThread> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RelayAgentLocalThreadEntity): RelayAgentLocalThreadEntity;
    remove(this: any, reqmatch?: RelayAgentLocalThreadRemoveMatch, ctrl?: Control): Promise<RelayAgentLocalThreadEntity>;
}
export { RelayAgentLocalThreadEntity };
