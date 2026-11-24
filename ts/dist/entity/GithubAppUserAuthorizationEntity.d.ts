import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubAppUserAuthorization, GithubAppUserAuthorizationCreateData } from '../ComposalTypes';
declare class GithubAppUserAuthorizationEntity extends ComposalEntityBase<GithubAppUserAuthorization> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubAppUserAuthorizationEntity): GithubAppUserAuthorizationEntity;
    create(this: any, reqdata?: GithubAppUserAuthorizationCreateData, ctrl?: Control): Promise<GithubAppUserAuthorizationEntity>;
}
export { GithubAppUserAuthorizationEntity };
