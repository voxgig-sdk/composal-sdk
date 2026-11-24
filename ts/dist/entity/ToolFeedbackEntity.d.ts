import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ToolFeedback, ToolFeedbackLoadMatch, ToolFeedbackCreateData } from '../ComposalTypes';
declare class ToolFeedbackEntity extends ComposalEntityBase<ToolFeedback> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ToolFeedbackEntity): ToolFeedbackEntity;
    load(this: any, reqmatch?: ToolFeedbackLoadMatch, ctrl?: Control): Promise<ToolFeedbackEntity>;
    create(this: any, reqdata?: ToolFeedbackCreateData, ctrl?: Control): Promise<ToolFeedbackEntity>;
}
export { ToolFeedbackEntity };
