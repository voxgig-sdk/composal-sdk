import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtifactCacheNamespace, ArtifactCacheNamespaceLoadMatch, ArtifactCacheNamespaceListMatch, ArtifactCacheNamespaceCreateData, ArtifactCacheNamespaceUpdateData, ArtifactCacheNamespacePatchData, ArtifactCacheNamespaceRemoveMatch } from '../ComposalTypes';
declare class ArtifactCacheNamespaceEntity extends ComposalEntityBase<ArtifactCacheNamespace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtifactCacheNamespaceEntity): ArtifactCacheNamespaceEntity;
    load(this: any, reqmatch?: ArtifactCacheNamespaceLoadMatch, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity>;
    list(this: any, reqmatch?: ArtifactCacheNamespaceListMatch, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity[]>;
    create(this: any, reqdata?: ArtifactCacheNamespaceCreateData, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity>;
    update(this: any, reqdata?: ArtifactCacheNamespaceUpdateData, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity>;
    patch(this: any, reqdata?: ArtifactCacheNamespacePatchData, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity>;
    remove(this: any, reqmatch?: ArtifactCacheNamespaceRemoveMatch, ctrl?: Control): Promise<ArtifactCacheNamespaceEntity>;
}
export { ArtifactCacheNamespaceEntity };
