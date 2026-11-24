import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Artifact, ArtifactLoadMatch, ArtifactCreateData, ArtifactUpdateData, ArtifactPatchData, ArtifactRemoveMatch } from '../ComposalTypes';
declare class ArtifactEntity extends ComposalEntityBase<Artifact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtifactEntity): ArtifactEntity;
    load(this: any, reqmatch?: ArtifactLoadMatch, ctrl?: Control): Promise<ArtifactEntity>;
    create(this: any, reqdata?: ArtifactCreateData, ctrl?: Control): Promise<ArtifactEntity>;
    update(this: any, reqdata?: ArtifactUpdateData, ctrl?: Control): Promise<ArtifactEntity>;
    patch(this: any, reqdata?: ArtifactPatchData, ctrl?: Control): Promise<ArtifactEntity>;
    remove(this: any, reqmatch?: ArtifactRemoveMatch, ctrl?: Control): Promise<ArtifactEntity>;
}
export { ArtifactEntity };
