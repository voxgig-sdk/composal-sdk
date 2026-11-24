import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWorkflowProposal, AgentWorkflowProposalLoadMatch, AgentWorkflowProposalCreateData } from '../ComposalTypes';
declare class AgentWorkflowProposalEntity extends ComposalEntityBase<AgentWorkflowProposal> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWorkflowProposalEntity): AgentWorkflowProposalEntity;
    load(this: any, reqmatch?: AgentWorkflowProposalLoadMatch, ctrl?: Control): Promise<AgentWorkflowProposalEntity>;
    create(this: any, reqdata?: AgentWorkflowProposalCreateData, ctrl?: Control): Promise<AgentWorkflowProposalEntity>;
}
export { AgentWorkflowProposalEntity };
