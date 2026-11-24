import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentAutomation, AgentAutomationLoadMatch, AgentAutomationListMatch, AgentAutomationUpdateData } from '../ComposalTypes';
declare class AgentAutomationEntity extends ComposalEntityBase<AgentAutomation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentAutomationEntity): AgentAutomationEntity;
    load(this: any, reqmatch?: AgentAutomationLoadMatch, ctrl?: Control): Promise<AgentAutomationEntity>;
    list(this: any, reqmatch?: AgentAutomationListMatch, ctrl?: Control): Promise<AgentAutomationEntity[]>;
    update(this: any, reqdata?: AgentAutomationUpdateData, ctrl?: Control): Promise<AgentAutomationEntity>;
}
export { AgentAutomationEntity };
