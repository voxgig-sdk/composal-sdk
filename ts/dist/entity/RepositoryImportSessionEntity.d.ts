import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryImportSession, RepositoryImportSessionLoadMatch, RepositoryImportSessionCreateData } from '../ComposalTypes';
declare class RepositoryImportSessionEntity extends ComposalEntityBase<RepositoryImportSession> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryImportSessionEntity): RepositoryImportSessionEntity;
    load(this: any, reqmatch?: RepositoryImportSessionLoadMatch, ctrl?: Control): Promise<RepositoryImportSessionEntity>;
    create(this: any, reqdata?: RepositoryImportSessionCreateData, ctrl?: Control): Promise<RepositoryImportSessionEntity>;
}
export { RepositoryImportSessionEntity };
