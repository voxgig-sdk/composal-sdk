import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentSkill, AgentSkillListMatch, AgentSkillCreateData } from '../ComposalTypes';
declare class AgentSkillEntity extends ComposalEntityBase<AgentSkill> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentSkillEntity): AgentSkillEntity;
    list(this: any, reqmatch?: AgentSkillListMatch, ctrl?: Control): Promise<AgentSkillEntity[]>;
    create(this: any, reqdata?: AgentSkillCreateData, ctrl?: Control): Promise<AgentSkillEntity>;
}
export { AgentSkillEntity };
