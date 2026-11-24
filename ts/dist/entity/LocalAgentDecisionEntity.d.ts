import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LocalAgentDecision, LocalAgentDecisionCreateData } from '../ComposalTypes';
declare class LocalAgentDecisionEntity extends ComposalEntityBase<LocalAgentDecision> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LocalAgentDecisionEntity): LocalAgentDecisionEntity;
    create(this: any, reqdata?: LocalAgentDecisionCreateData, ctrl?: Control): Promise<LocalAgentDecisionEntity>;
}
export { LocalAgentDecisionEntity };
