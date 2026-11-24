import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryEvent, RepositoryEventCreateData } from '../ComposalTypes';
declare class RepositoryEventEntity extends ComposalEntityBase<RepositoryEvent> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryEventEntity): RepositoryEventEntity;
    create(this: any, reqdata?: RepositoryEventCreateData, ctrl?: Control): Promise<RepositoryEventEntity>;
}
export { RepositoryEventEntity };
