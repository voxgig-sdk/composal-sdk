import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ExplorationMessage, ExplorationMessageCreateData } from '../ComposalTypes';
declare class ExplorationMessageEntity extends ComposalEntityBase<ExplorationMessage> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ExplorationMessageEntity): ExplorationMessageEntity;
    create(this: any, reqdata?: ExplorationMessageCreateData, ctrl?: Control): Promise<ExplorationMessageEntity>;
}
export { ExplorationMessageEntity };
