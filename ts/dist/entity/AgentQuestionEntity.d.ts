import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentQuestion, AgentQuestionCreateData } from '../ComposalTypes';
declare class AgentQuestionEntity extends ComposalEntityBase<AgentQuestion> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentQuestionEntity): AgentQuestionEntity;
    create(this: any, reqdata?: AgentQuestionCreateData, ctrl?: Control): Promise<AgentQuestionEntity>;
}
export { AgentQuestionEntity };
