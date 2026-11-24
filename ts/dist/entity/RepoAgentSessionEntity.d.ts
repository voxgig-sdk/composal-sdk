import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoAgentSession, RepoAgentSessionLoadMatch, RepoAgentSessionCreateData, RepoAgentSessionUpdateData, RepoAgentSessionPatchData } from '../ComposalTypes';
declare class RepoAgentSessionEntity extends ComposalEntityBase<RepoAgentSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoAgentSessionEntity): RepoAgentSessionEntity;
    load(this: any, reqmatch?: RepoAgentSessionLoadMatch, ctrl?: Control): Promise<RepoAgentSessionEntity>;
    create(this: any, reqdata?: RepoAgentSessionCreateData, ctrl?: Control): Promise<RepoAgentSessionEntity>;
    update(this: any, reqdata?: RepoAgentSessionUpdateData, ctrl?: Control): Promise<RepoAgentSessionEntity>;
    patch(this: any, reqdata?: RepoAgentSessionPatchData, ctrl?: Control): Promise<RepoAgentSessionEntity>;
}
export { RepoAgentSessionEntity };
