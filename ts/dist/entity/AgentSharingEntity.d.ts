import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSharing, AgentSharingLoadMatch } from '../ComposalTypes';
declare class AgentSharingEntity extends ComposalEntityBase<AgentSharing> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSharingEntity): AgentSharingEntity;
    load(this: any, reqmatch?: AgentSharingLoadMatch, ctrl?: Control): Promise<AgentSharingEntity>;
}
export { AgentSharingEntity };
