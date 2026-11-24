import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtifactImageRepository, ArtifactImageRepositoryLoadMatch, ArtifactImageRepositoryListMatch, ArtifactImageRepositoryCreateData, ArtifactImageRepositoryUpdateData, ArtifactImageRepositoryPatchData, ArtifactImageRepositoryRemoveMatch } from '../ComposalTypes';
declare class ArtifactImageRepositoryEntity extends ComposalEntityBase<ArtifactImageRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtifactImageRepositoryEntity): ArtifactImageRepositoryEntity;
    load(this: any, reqmatch?: ArtifactImageRepositoryLoadMatch, ctrl?: Control): Promise<ArtifactImageRepositoryEntity>;
    list(this: any, reqmatch?: ArtifactImageRepositoryListMatch, ctrl?: Control): Promise<ArtifactImageRepositoryEntity[]>;
    create(this: any, reqdata?: ArtifactImageRepositoryCreateData, ctrl?: Control): Promise<ArtifactImageRepositoryEntity>;
    update(this: any, reqdata?: ArtifactImageRepositoryUpdateData, ctrl?: Control): Promise<ArtifactImageRepositoryEntity>;
    patch(this: any, reqdata?: ArtifactImageRepositoryPatchData, ctrl?: Control): Promise<ArtifactImageRepositoryEntity>;
    remove(this: any, reqmatch?: ArtifactImageRepositoryRemoveMatch, ctrl?: Control): Promise<ArtifactImageRepositoryEntity>;
}
export { ArtifactImageRepositoryEntity };
