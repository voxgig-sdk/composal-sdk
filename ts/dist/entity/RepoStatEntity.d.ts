import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoStat, RepoStatListMatch, RepoStatCreateData } from '../ComposalTypes';
declare class RepoStatEntity extends ComposalEntityBase<RepoStat> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoStatEntity): RepoStatEntity;
    list(this: any, reqmatch?: RepoStatListMatch, ctrl?: Control): Promise<RepoStatEntity[]>;
    create(this: any, reqdata?: RepoStatCreateData, ctrl?: Control): Promise<RepoStatEntity>;
}
export { RepoStatEntity };
