import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepositoryAccessResolve, RepositoryAccessResolveLoadMatch } from '../ComposalTypes';
declare class RepositoryAccessResolveEntity extends ComposalEntityBase<RepositoryAccessResolve> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepositoryAccessResolveEntity): RepositoryAccessResolveEntity;
    load(this: any, reqmatch?: RepositoryAccessResolveLoadMatch, ctrl?: Control): Promise<RepositoryAccessResolveEntity>;
}
export { RepositoryAccessResolveEntity };
