import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubIntegration, GithubIntegrationLoadMatch, GithubIntegrationListMatch } from '../ComposalTypes';
declare class GithubIntegrationEntity extends ComposalEntityBase<GithubIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubIntegrationEntity): GithubIntegrationEntity;
    load(this: any, reqmatch?: GithubIntegrationLoadMatch, ctrl?: Control): Promise<GithubIntegrationEntity>;
    list(this: any, reqmatch?: GithubIntegrationListMatch, ctrl?: Control): Promise<GithubIntegrationEntity[]>;
}
export { GithubIntegrationEntity };
