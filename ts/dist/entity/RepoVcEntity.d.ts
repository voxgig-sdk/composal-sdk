import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RepoVc, RepoVcLoadMatch, RepoVcCreateData, RepoVcUpdateData } from '../ComposalTypes';
declare class RepoVcEntity extends ComposalEntityBase<RepoVc> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RepoVcEntity): RepoVcEntity;
    load(this: any, reqmatch?: RepoVcLoadMatch, ctrl?: Control): Promise<RepoVcEntity>;
    create(this: any, reqdata?: RepoVcCreateData, ctrl?: Control): Promise<RepoVcEntity>;
    update(this: any, reqdata?: RepoVcUpdateData, ctrl?: Control): Promise<RepoVcEntity>;
}
export { RepoVcEntity };
