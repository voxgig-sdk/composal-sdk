import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubConnection, GithubConnectionListMatch, GithubConnectionCreateData } from '../ComposalTypes';
declare class GithubConnectionEntity extends ComposalEntityBase<GithubConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubConnectionEntity): GithubConnectionEntity;
    list(this: any, reqmatch?: GithubConnectionListMatch, ctrl?: Control): Promise<GithubConnectionEntity[]>;
    create(this: any, reqdata?: GithubConnectionCreateData, ctrl?: Control): Promise<GithubConnectionEntity>;
}
export { GithubConnectionEntity };
