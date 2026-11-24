import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryImport, RepositoryImportLoadMatch } from '../ComposalTypes';
declare class RepositoryImportEntity extends ComposalEntityBase<RepositoryImport> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryImportEntity): RepositoryImportEntity;
    load(this: any, reqmatch?: RepositoryImportLoadMatch, ctrl?: Control): Promise<RepositoryImportEntity>;
}
export { RepositoryImportEntity };
