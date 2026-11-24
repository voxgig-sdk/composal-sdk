import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentMissionControl, AgentMissionControlCreateData } from '../ComposalTypes';
declare class AgentMissionControlEntity extends ComposalEntityBase<AgentMissionControl> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentMissionControlEntity): AgentMissionControlEntity;
    create(this: any, reqdata?: AgentMissionControlCreateData, ctrl?: Control): Promise<AgentMissionControlEntity>;
}
export { AgentMissionControlEntity };
