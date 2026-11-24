import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CacheNamespaceEntry, CacheNamespaceEntryLoadMatch, CacheNamespaceEntryCreateData, CacheNamespaceEntryUpdateData, CacheNamespaceEntryPatchData, CacheNamespaceEntryRemoveMatch } from '../ComposalTypes';
declare class CacheNamespaceEntryEntity extends ComposalEntityBase<CacheNamespaceEntry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CacheNamespaceEntryEntity): CacheNamespaceEntryEntity;
    load(this: any, reqmatch?: CacheNamespaceEntryLoadMatch, ctrl?: Control): Promise<CacheNamespaceEntryEntity>;
    create(this: any, reqdata?: CacheNamespaceEntryCreateData, ctrl?: Control): Promise<CacheNamespaceEntryEntity>;
    update(this: any, reqdata?: CacheNamespaceEntryUpdateData, ctrl?: Control): Promise<CacheNamespaceEntryEntity>;
    patch(this: any, reqdata?: CacheNamespaceEntryPatchData, ctrl?: Control): Promise<CacheNamespaceEntryEntity>;
    remove(this: any, reqmatch?: CacheNamespaceEntryRemoveMatch, ctrl?: Control): Promise<CacheNamespaceEntryEntity>;
}
export { CacheNamespaceEntryEntity };
