import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DockerBuilderSession, DockerBuilderSessionLoadMatch, DockerBuilderSessionCreateData, DockerBuilderSessionRemoveMatch } from '../ComposalTypes';
declare class DockerBuilderSessionEntity extends ComposalEntityBase<DockerBuilderSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DockerBuilderSessionEntity): DockerBuilderSessionEntity;
    load(this: any, reqmatch?: DockerBuilderSessionLoadMatch, ctrl?: Control): Promise<DockerBuilderSessionEntity>;
    create(this: any, reqdata?: DockerBuilderSessionCreateData, ctrl?: Control): Promise<DockerBuilderSessionEntity>;
    remove(this: any, reqmatch?: DockerBuilderSessionRemoveMatch, ctrl?: Control): Promise<DockerBuilderSessionEntity>;
}
export { DockerBuilderSessionEntity };
