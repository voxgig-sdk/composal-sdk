import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PageAgent, PageAgentLoadMatch, PageAgentCreateData } from '../ComposalTypes';
declare class PageAgentEntity extends ComposalEntityBase<PageAgent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PageAgentEntity): PageAgentEntity;
    load(this: any, reqmatch?: PageAgentLoadMatch, ctrl?: Control): Promise<PageAgentEntity>;
    create(this: any, reqdata?: PageAgentCreateData, ctrl?: Control): Promise<PageAgentEntity>;
}
export { PageAgentEntity };
