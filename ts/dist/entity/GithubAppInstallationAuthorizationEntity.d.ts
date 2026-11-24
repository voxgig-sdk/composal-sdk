import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubAppInstallationAuthorization, GithubAppInstallationAuthorizationCreateData } from '../ComposalTypes';
declare class GithubAppInstallationAuthorizationEntity extends ComposalEntityBase<GithubAppInstallationAuthorization> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubAppInstallationAuthorizationEntity): GithubAppInstallationAuthorizationEntity;
    create(this: any, reqdata?: GithubAppInstallationAuthorizationCreateData, ctrl?: Control): Promise<GithubAppInstallationAuthorizationEntity>;
}
export { GithubAppInstallationAuthorizationEntity };
