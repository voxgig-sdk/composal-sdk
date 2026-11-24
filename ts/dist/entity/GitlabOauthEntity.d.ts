import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GitlabOauth, GitlabOauthLoadMatch } from '../ComposalTypes';
declare class GitlabOauthEntity extends ComposalEntityBase<GitlabOauth> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GitlabOauthEntity): GitlabOauthEntity;
    load(this: any, reqmatch?: GitlabOauthLoadMatch, ctrl?: Control): Promise<GitlabOauthEntity>;
}
export { GitlabOauthEntity };
