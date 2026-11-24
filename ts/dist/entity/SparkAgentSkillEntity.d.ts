import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SparkAgentSkill, SparkAgentSkillListMatch, SparkAgentSkillCreateData } from '../ComposalTypes';
declare class SparkAgentSkillEntity extends ComposalEntityBase<SparkAgentSkill> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SparkAgentSkillEntity): SparkAgentSkillEntity;
    list(this: any, reqmatch?: SparkAgentSkillListMatch, ctrl?: Control): Promise<SparkAgentSkillEntity[]>;
    create(this: any, reqdata?: SparkAgentSkillCreateData, ctrl?: Control): Promise<SparkAgentSkillEntity>;
}
export { SparkAgentSkillEntity };
