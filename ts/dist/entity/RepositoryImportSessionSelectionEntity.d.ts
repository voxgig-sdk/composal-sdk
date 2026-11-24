import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryImportSessionSelection, RepositoryImportSessionSelectionCreateData } from '../ComposalTypes';
declare class RepositoryImportSessionSelectionEntity extends ComposalEntityBase<RepositoryImportSessionSelection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryImportSessionSelectionEntity): RepositoryImportSessionSelectionEntity;
    create(this: any, reqdata?: RepositoryImportSessionSelectionCreateData, ctrl?: Control): Promise<RepositoryImportSessionSelectionEntity>;
}
export { RepositoryImportSessionSelectionEntity };
