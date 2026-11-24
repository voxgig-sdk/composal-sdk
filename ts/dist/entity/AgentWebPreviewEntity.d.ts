import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AgentWebPreview, AgentWebPreviewLoadMatch } from '../ComposalTypes';
declare class AgentWebPreviewEntity extends ComposalEntityBase<AgentWebPreview> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AgentWebPreviewEntity): AgentWebPreviewEntity;
    load(this: any, reqmatch?: AgentWebPreviewLoadMatch, ctrl?: Control): Promise<AgentWebPreviewEntity>;
}
export { AgentWebPreviewEntity };
