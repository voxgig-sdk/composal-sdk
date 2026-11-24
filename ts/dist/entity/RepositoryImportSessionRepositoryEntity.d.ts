import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryImportSessionRepository, RepositoryImportSessionRepositoryListMatch } from '../ComposalTypes';
declare class RepositoryImportSessionRepositoryEntity extends ComposalEntityBase<RepositoryImportSessionRepository> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryImportSessionRepositoryEntity): RepositoryImportSessionRepositoryEntity;
    list(this: any, reqmatch?: RepositoryImportSessionRepositoryListMatch, ctrl?: Control): Promise<RepositoryImportSessionRepositoryEntity[]>;
}
export { RepositoryImportSessionRepositoryEntity };
