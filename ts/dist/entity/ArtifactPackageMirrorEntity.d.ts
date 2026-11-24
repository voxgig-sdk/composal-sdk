import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtifactPackageMirror, ArtifactPackageMirrorLoadMatch, ArtifactPackageMirrorCreateData, ArtifactPackageMirrorUpdateData, ArtifactPackageMirrorPatchData, ArtifactPackageMirrorRemoveMatch } from '../ComposalTypes';
declare class ArtifactPackageMirrorEntity extends ComposalEntityBase<ArtifactPackageMirror> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtifactPackageMirrorEntity): ArtifactPackageMirrorEntity;
    load(this: any, reqmatch?: ArtifactPackageMirrorLoadMatch, ctrl?: Control): Promise<ArtifactPackageMirrorEntity>;
    create(this: any, reqdata?: ArtifactPackageMirrorCreateData, ctrl?: Control): Promise<ArtifactPackageMirrorEntity>;
    update(this: any, reqdata?: ArtifactPackageMirrorUpdateData, ctrl?: Control): Promise<ArtifactPackageMirrorEntity>;
    patch(this: any, reqdata?: ArtifactPackageMirrorPatchData, ctrl?: Control): Promise<ArtifactPackageMirrorEntity>;
    remove(this: any, reqmatch?: ArtifactPackageMirrorRemoveMatch, ctrl?: Control): Promise<ArtifactPackageMirrorEntity>;
}
export { ArtifactPackageMirrorEntity };
