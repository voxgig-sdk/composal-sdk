import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { GithubApp, GithubAppCreateData } from '../ComposalTypes';
declare class GithubAppEntity extends ComposalEntityBase<GithubApp> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: GithubAppEntity): GithubAppEntity;
    create(this: any, reqdata?: GithubAppCreateData, ctrl?: Control): Promise<GithubAppEntity>;
}
export { GithubAppEntity };
