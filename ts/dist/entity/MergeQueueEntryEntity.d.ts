import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MergeQueueEntry, MergeQueueEntryCreateData, MergeQueueEntryRemoveMatch } from '../ComposalTypes';
declare class MergeQueueEntryEntity extends ComposalEntityBase<MergeQueueEntry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MergeQueueEntryEntity): MergeQueueEntryEntity;
    create(this: any, reqdata?: MergeQueueEntryCreateData, ctrl?: Control): Promise<MergeQueueEntryEntity>;
    remove(this: any, reqmatch?: MergeQueueEntryRemoveMatch, ctrl?: Control): Promise<MergeQueueEntryEntity>;
}
export { MergeQueueEntryEntity };
