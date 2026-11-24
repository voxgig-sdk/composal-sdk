import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { AuthGithub, AuthGithubLoadMatch } from '../ComposalTypes';
declare class AuthGithubEntity extends ComposalEntityBase<AuthGithub> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: AuthGithubEntity): AuthGithubEntity;
    load(this: any, reqmatch?: AuthGithubLoadMatch, ctrl?: Control): Promise<AuthGithubEntity>;
}
export { AuthGithubEntity };
