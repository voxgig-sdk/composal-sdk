import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubAppInstallation, GithubAppInstallationListMatch, GithubAppInstallationCreateData, GithubAppInstallationRemoveMatch } from '../ComposalTypes';
declare class GithubAppInstallationEntity extends ComposalEntityBase<GithubAppInstallation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubAppInstallationEntity): GithubAppInstallationEntity;
    list(this: any, reqmatch?: GithubAppInstallationListMatch, ctrl?: Control): Promise<GithubAppInstallationEntity[]>;
    create(this: any, reqdata?: GithubAppInstallationCreateData, ctrl?: Control): Promise<GithubAppInstallationEntity>;
    remove(this: any, reqmatch?: GithubAppInstallationRemoveMatch, ctrl?: Control): Promise<GithubAppInstallationEntity>;
}
export { GithubAppInstallationEntity };
