import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentAvatar, AgentAvatarLoadMatch, AgentAvatarCreateData } from '../ComposalTypes';
declare class AgentAvatarEntity extends ComposalEntityBase<AgentAvatar> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentAvatarEntity): AgentAvatarEntity;
    load(this: any, reqmatch?: AgentAvatarLoadMatch, ctrl?: Control): Promise<AgentAvatarEntity>;
    create(this: any, reqdata?: AgentAvatarCreateData, ctrl?: Control): Promise<AgentAvatarEntity>;
}
export { AgentAvatarEntity };
