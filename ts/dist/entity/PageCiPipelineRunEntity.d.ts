import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PageCiPipelineRun, PageCiPipelineRunLoadMatch } from '../ComposalTypes';
declare class PageCiPipelineRunEntity extends ComposalEntityBase<PageCiPipelineRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageCiPipelineRunEntity): PageCiPipelineRunEntity;
    load(this: any, reqmatch?: PageCiPipelineRunLoadMatch, ctrl?: Control): Promise<PageCiPipelineRunEntity>;
}
export { PageCiPipelineRunEntity };
