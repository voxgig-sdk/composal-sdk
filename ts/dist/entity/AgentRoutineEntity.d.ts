import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentRoutine, AgentRoutineListMatch, AgentRoutineUpdateData } from '../ComposalTypes';
declare class AgentRoutineEntity extends ComposalEntityBase<AgentRoutine> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentRoutineEntity): AgentRoutineEntity;
    list(this: any, reqmatch?: AgentRoutineListMatch, ctrl?: Control): Promise<AgentRoutineEntity[]>;
    update(this: any, reqdata?: AgentRoutineUpdateData, ctrl?: Control): Promise<AgentRoutineEntity>;
}
export { AgentRoutineEntity };
