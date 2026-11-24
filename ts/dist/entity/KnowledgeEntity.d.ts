import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Knowledge, KnowledgeLoadMatch, KnowledgeCreateData, KnowledgeUpdateData, KnowledgePatchData, KnowledgeRemoveMatch } from '../ComposalTypes';
declare class KnowledgeEntity extends ComposalEntityBase<Knowledge> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: KnowledgeEntity): KnowledgeEntity;
    load(this: any, reqmatch?: KnowledgeLoadMatch, ctrl?: Control): Promise<KnowledgeEntity>;
    create(this: any, reqdata?: KnowledgeCreateData, ctrl?: Control): Promise<KnowledgeEntity>;
    update(this: any, reqdata?: KnowledgeUpdateData, ctrl?: Control): Promise<KnowledgeEntity>;
    patch(this: any, reqdata?: KnowledgePatchData, ctrl?: Control): Promise<KnowledgeEntity>;
    remove(this: any, reqmatch?: KnowledgeRemoveMatch, ctrl?: Control): Promise<KnowledgeEntity>;
}
export { KnowledgeEntity };
