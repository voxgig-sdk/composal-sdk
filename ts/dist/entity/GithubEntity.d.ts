import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Github, GithubLoadMatch } from '../ComposalTypes';
declare class GithubEntity extends ComposalEntityBase<Github> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubEntity): GithubEntity;
    load(this: any, reqmatch?: GithubLoadMatch, ctrl?: Control): Promise<GithubEntity>;
}
export { GithubEntity };
