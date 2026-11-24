import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentCoordination, AgentCoordinationCreateData } from '../ComposalTypes';
declare class AgentCoordinationEntity extends ComposalEntityBase<AgentCoordination> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentCoordinationEntity): AgentCoordinationEntity;
    create(this: any, reqdata?: AgentCoordinationCreateData, ctrl?: Control): Promise<AgentCoordinationEntity>;
}
export { AgentCoordinationEntity };
