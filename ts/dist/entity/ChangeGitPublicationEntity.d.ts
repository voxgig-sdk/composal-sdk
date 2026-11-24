import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ChangeGitPublication, ChangeGitPublicationLoadMatch, ChangeGitPublicationCreateData } from '../ComposalTypes';
declare class ChangeGitPublicationEntity extends ComposalEntityBase<ChangeGitPublication> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ChangeGitPublicationEntity): ChangeGitPublicationEntity;
    load(this: any, reqmatch?: ChangeGitPublicationLoadMatch, ctrl?: Control): Promise<ChangeGitPublicationEntity>;
    create(this: any, reqdata?: ChangeGitPublicationCreateData, ctrl?: Control): Promise<ChangeGitPublicationEntity>;
}
export { ChangeGitPublicationEntity };
