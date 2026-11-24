import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoAgentCheckpoint, RepoAgentCheckpointLoadMatch } from '../ComposalTypes';
declare class RepoAgentCheckpointEntity extends ComposalEntityBase<RepoAgentCheckpoint> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoAgentCheckpointEntity): RepoAgentCheckpointEntity;
    load(this: any, reqmatch?: RepoAgentCheckpointLoadMatch, ctrl?: Control): Promise<RepoAgentCheckpointEntity>;
}
export { RepoAgentCheckpointEntity };
