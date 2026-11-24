import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentComputer, AgentComputerLoadMatch, AgentComputerCreateData } from '../ComposalTypes';
declare class AgentComputerEntity extends ComposalEntityBase<AgentComputer> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentComputerEntity): AgentComputerEntity;
    load(this: any, reqmatch?: AgentComputerLoadMatch, ctrl?: Control): Promise<AgentComputerEntity>;
    create(this: any, reqdata?: AgentComputerCreateData, ctrl?: Control): Promise<AgentComputerEntity>;
}
export { AgentComputerEntity };
