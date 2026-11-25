import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesGithubIntegration, PagesGithubIntegrationLoadMatch, PagesGithubIntegrationListMatch } from '../ComposalTypes';
declare class PagesGithubIntegrationEntity extends ComposalEntityBase<PagesGithubIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesGithubIntegrationEntity): PagesGithubIntegrationEntity;
    load(this: any, reqmatch?: PagesGithubIntegrationLoadMatch, ctrl?: Control): Promise<PagesGithubIntegrationEntity>;
    list(this: any, reqmatch?: PagesGithubIntegrationListMatch, ctrl?: Control): Promise<PagesGithubIntegrationEntity[]>;
}
export { PagesGithubIntegrationEntity };
