import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoStat, RepoStatLoadMatch, RepoStatCreateData } from '../ComposalTypes';
declare class RepoStatEntity extends ComposalEntityBase<RepoStat> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoStatEntity): RepoStatEntity;
    load(this: any, reqmatch?: RepoStatLoadMatch, ctrl?: Control): Promise<RepoStatEntity>;
    create(this: any, reqdata?: RepoStatCreateData, ctrl?: Control): Promise<RepoStatEntity>;
}
export { RepoStatEntity };
