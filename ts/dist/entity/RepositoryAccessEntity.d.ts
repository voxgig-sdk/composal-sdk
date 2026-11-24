import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryAccess, RepositoryAccessLoadMatch, RepositoryAccessCreateData } from '../ComposalTypes';
declare class RepositoryAccessEntity extends ComposalEntityBase<RepositoryAccess> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryAccessEntity): RepositoryAccessEntity;
    load(this: any, reqmatch?: RepositoryAccessLoadMatch, ctrl?: Control): Promise<RepositoryAccessEntity>;
    create(this: any, reqdata?: RepositoryAccessCreateData, ctrl?: Control): Promise<RepositoryAccessEntity>;
}
export { RepositoryAccessEntity };
