import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CodeRuleEvaluation, CodeRuleEvaluationCreateData } from '../ComposalTypes';
declare class CodeRuleEvaluationEntity extends ComposalEntityBase<CodeRuleEvaluation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CodeRuleEvaluationEntity): CodeRuleEvaluationEntity;
    create(this: any, reqdata?: CodeRuleEvaluationCreateData, ctrl?: Control): Promise<CodeRuleEvaluationEntity>;
}
export { CodeRuleEvaluationEntity };
