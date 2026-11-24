import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWebPreview, AgentWebPreviewListMatch } from '../ComposalTypes';
declare class AgentWebPreviewEntity extends ComposalEntityBase<AgentWebPreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWebPreviewEntity): AgentWebPreviewEntity;
    list(this: any, reqmatch?: AgentWebPreviewListMatch, ctrl?: Control): Promise<AgentWebPreviewEntity[]>;
}
export { AgentWebPreviewEntity };
