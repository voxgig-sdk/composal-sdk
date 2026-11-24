import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DockerBuilder, DockerBuilderLoadMatch, DockerBuilderListMatch, DockerBuilderCreateData, DockerBuilderUpdateData, DockerBuilderPatchData } from '../ComposalTypes';
declare class DockerBuilderEntity extends ComposalEntityBase<DockerBuilder> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DockerBuilderEntity): DockerBuilderEntity;
    load(this: any, reqmatch?: DockerBuilderLoadMatch, ctrl?: Control): Promise<DockerBuilderEntity>;
    list(this: any, reqmatch?: DockerBuilderListMatch, ctrl?: Control): Promise<DockerBuilderEntity[]>;
    create(this: any, reqdata?: DockerBuilderCreateData, ctrl?: Control): Promise<DockerBuilderEntity>;
    update(this: any, reqdata?: DockerBuilderUpdateData, ctrl?: Control): Promise<DockerBuilderEntity>;
    patch(this: any, reqdata?: DockerBuilderPatchData, ctrl?: Control): Promise<DockerBuilderEntity>;
}
export { DockerBuilderEntity };
